"use client";

import { useEffect, useState } from "react";
import Heading from "../components/heading";
import Input from "../components/inputs/input";
import HorizontalLine from "../components/horizontal-line";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged In");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>;
  }

  return (
    <>
      <Heading title="Sign in to Medimetics" custom="mb-1" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
        required
      />
      <Button
        label={isLoading ? "Loading" : "Login"}
        onClick={handleSubmit(onSubmit)}
      />
      {/* <HorizontalLine or />
      <Button
        icon={AiOutlineGoogle}
        label="Continue with Google"
        onClick={() => signIn("google")}
        outline
      /> */}
      <p className="text-sm">
        Do not have an account?{" "}
        <Link href={"/register"} className="underline">
          Sign Up
        </Link>
        .
      </p>
    </>
  );
};

export default LoginForm;
