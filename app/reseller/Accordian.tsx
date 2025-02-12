import React from 'react';

import { PlusCircle, MinusCircle, DollarSign, Package, HeadphonesIcon, Megaphone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const BenefitsAccordion = () => {
  const benefits = [
    {
      value: "commission",
      title: "Competitive Commissions",
      description: "Earn attractive commissions on every sale you make through our program. Our competitive commission structure rewards your hard work and dedication. As you grow your sales, you'll have the opportunity to earn even more through our tiered commission system.",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      value: "products",
      title: "Exclusive Products",
      description: "Get access to special product offers and early releases. As a reseller, you'll be among the first to know about new product launches and have exclusive access to limited edition items. This gives you a competitive edge in the market and allows you to offer unique products to your customers.",
      icon: <Package className="h-6 w-6" />,
    },
    {
      value: "support",
      title: "Dedicated Support",
      description: "Receive ongoing support from our experienced team. Our dedicated support team is always ready to assist you with product information, sales strategies, and technical support. We provide regular training sessions and one-on-one coaching to help you succeed.",
      icon: <HeadphonesIcon className="h-6 w-6" />,
    },
    {
      value: "marketing",
      title: "Marketing Materials",
      description: "Access professional marketing resources to boost your sales. We provide you with high-quality images, product descriptions, social media templates, and promotional materials. These resources are designed to help you effectively market our products and grow your business.",
      icon: <Megaphone className="h-6 w-6" />,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Why Become a Reseller?</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {benefits.map((benefit) => (
          <AccordionItem
            key={benefit.value}
            value={benefit.value}
            className="border rounded-lg px-4 hover:bg-gray-50 transition-colors"
          >
            <AccordionTrigger className="py-4">
              <div className="flex items-center gap-3 text-left">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {benefit.icon}
                </div>
                <span className="text-xl font-semibold">{benefit.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="py-4 px-2">
              <p className="text-gray-600 leading-relaxed pl-14">
                {benefit.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default BenefitsAccordion;