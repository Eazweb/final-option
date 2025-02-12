import React from "react";
import { Phone, Mail, CheckCircle2 } from "lucide-react";
import BenefitsAccordion from "./Accordian";
import TextArea from "../components/inputs/text-area";

const ResellerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-10 flex items-center justify-center">
        {/* <img
          src="/api/placeholder/1920/1080"
          alt="Skincare Products"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        /> */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-medium text-primary mb-6">
            Become a Medimetics Reseller
          </h1>
          <p className="text-xl text-gray-800 mb-8">
            Join our mission to provide dermatologist-recommended skincare that
            delivers guaranteed results
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 ">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            At Medimetics, we believe in empowering individuals to share our
            high-quality skincare solutions with others. Whether you're an
            influencer, a skincare enthusiast, or an entrepreneur, our reseller
            program is the perfect opportunity to expand your reach and offer
            real skincare solutions to your community.
          </p>
        </div>

        {/* Benefits Grid */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              title: "Competitive Commissions",
              description:
                "Earn attractive commissions on every sale you make through our program",
              icon: (
                <img
                  src="/api/placeholder/64/64"
                  alt="Commission"
                  className="mx-auto mb-4"
                />
              ),
            },
            {
              title: "Exclusive Products",
              description:
                "Get access to special product offers and early releases",
              icon: (
                <img
                  src="/api/placeholder/64/64"
                  alt="Products"
                  className="mx-auto mb-4"
                />
              ),
            },
            {
              title: "Dedicated Support",
              description: "Receive ongoing support from our experienced team",
              icon: (
                <img
                  src="/api/placeholder/64/64"
                  alt="Support"
                  className="mx-auto mb-4"
                />
              ),
            },
            {
              title: "Marketing Materials",
              description:
                "Access professional marketing resources to boost your sales",
              icon: (
                <img
                  src="/api/placeholder/64/64"
                  alt="Marketing"
                  className="mx-auto mb-4"
                />
              ),
            },
          ].map((benefit, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                {benefit.icon}
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div> */}

            <BenefitsAccordion/>

        {/* Contact Form Section */}
        {/* <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Get Started</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input placeholder="First Name" className="w-full" />
              <Input placeholder="Last Name" className="w-full" />
            </div>
            <Input
              type="email"
              placeholder="Email Address"
              className="w-full"
            />
            <Input type="tel" placeholder="Phone Number" className="w-full" />
            <TextArea
              placeholder="Tell us about your business or experience"
              className="w-full"
            />
            <div className="flex justify-center">
              <Button size="lg" className="w-full md:w-auto">
                Submit Application
              </Button>
            </div>
          </div>
        </div> */}

        {/* Contact Information */}
        <div className="text-center mt-12 pb-10">
          <p className="text-gray-600">Have questions? Contact us directly:</p>
          <p>Here is our Contact number: 91 1555 7179</p>
        </div>
      </div>
    </div>
  );
};

export default ResellerPage;