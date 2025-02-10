import React from "react";

const page = () => {
  return (
    <div className="w-[90%] mx-auto max-w-[600px] min-h-screen">
      <h1 className="text-4xl  text-center mt-10">Shipping Policies</h1>
      <p className="text-lg font-thin mt-5">
        Shipping Policy was last updated on 3rd February 2025 <br /> <br />{" "}
        Thank you for shopping at Medimetics <br /> <br />
      </p>
      <p className="text-lg font-thin">
        Please carefully review our Shipping & Delivery Policy when purchasing
        our products. This policy will apply to any order you place with us.
        <br />
        <br />
        <span className="font-semibold">
          {" "}
          Delivery timeline - <br /> 3-5 days in India <br /> 9-11 days outside
          India
        </span>{" "}
        <br />
        <br />
        <div className="font-semibold">
          {" "}
          Delivery Charges - <br /> INR 50 in India <br /> INR 2650/Kg for
          outside India{" "}
        </div>
        <br />
        <br />
      </p>

      <p className="text-lg font-thin mt-4">
        <br />
        You can contact us by sending us an email:{" "}
        <span className="font-semibold">medimetics6@gmail.com</span> or by
        calling on our support number :{" "}
        <span className="font-semibold">+91 9115557179</span>
      </p>
    </div>
  );
};

export default page;
