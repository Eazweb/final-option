"use client";

import Button from "@/app/components/button";
import Header from "@/app/components/heading";
import CategoryInput from "@/app/components/inputs/category-input";
import CustomCheckbox from "@/app/components/inputs/custom-checkbox";
import Input from "@/app/components/inputs/input";
import SelectColor from "@/app/components/inputs/select-color";
import TextArea from "@/app/components/inputs/text-area";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
      list: "",
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected!");
    }

    if (!images || images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected image!");
    }

    const handleImageUploads = async () => {
      toast("Creating product, please wait...");
      try {
        for (const item of images) {
          if (item.image) {
            const formData = new FormData();
            formData.append('file', item.image);
            formData.append('upload_preset', 'ml_default');

            console.log('Uploading image:', item.color, item.image);

            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
              {
                method: 'POST',
                body: formData,
              }
            );

            const responseData = await response.json();
            console.log('Upload response:', responseData);

            if (!response.ok) {
              throw new Error(responseData.error?.message || 'Failed to upload image');
            }

            uploadedImages.push({
              ...item,
              image: responseData.secure_url,
            });
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        console.error("Error handling image uploads:", error);
        return toast.error(error.message || "Error handling image uploads");
      }
    };

    await handleImageUploads();

    const list = data.list === "" || data.list === 0 ? data.price : data.list;

    const productData = {
      ...data,
      images: uploadedImages,
      list: list,
    };

    console.log('Submitting product data:', productData);

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong.");
        console.log("Error creating product", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch("category");

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }

      return prev;
    });
  }, []);

  return (
    <>
      <Header title="Add a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="flex w-full gap-3">
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="number"
          required
        />
        <Input
          id="list"
          label="List"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="number"
        />
      </div>
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        register={register}
        label="This product is in stock"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overfolow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }

            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
        <div className="w-full flex flex-col flex-wrap gap-4 mt-5">
          <div>
            <div className="font-bold">
              Select the available product colors and upload their images.
            </div>
            <div className="text-small">
              You must upload an image for each of the color selected otherwise
              your color selection will be ignored.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {colors.map((item, index) => {
              return (
                <SelectColor
                  key={index}
                  item={item}
                  addImageToState={addImageToState}
                  removeImageFromState={removeImageFromState}
                  isProductCreated={isProductCreated}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
