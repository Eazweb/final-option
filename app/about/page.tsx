import React from 'react';
import Image from 'next/image';
import { Calendar, Microscope, ShieldCheck } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-8">
              About <span className="font-medium">Medimetics</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-12">
              <Calendar className="w-5 h-5" />
              <span>Launched June 18, 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          {/* Mission Statement */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-700 mb-8">
              Medimetics is a skincare brand dedicated to science-backed, result-oriented solutions. 
              Founded by <span className="font-medium">DRx Mankirat Singh</span>, we focus on delivering 
              dermatologist-recommended products that effectively tackle acne, pigmentation, and other skin concerns.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="flex items-start gap-4">
              <div className="bg-[#a7c957] bg-opacity-10 p-3 rounded-xl">
                <Microscope className="w-6 h-6 text-[#a7c957]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Science-Backed</h3>
                <p className="text-gray-600">Research-driven formulations for proven results</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#a7c957] bg-opacity-10 p-3 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-[#a7c957]" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Guaranteed Results</h3>
                <p className="text-gray-600">Committed to visible transformation</p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-medium mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our mission is simple—to provide guaranteed results and help you achieve healthy, glowing skin.
              At Medimetics, we believe skincare is not just about products; it's about confidence, 
              self-care, and visible transformation.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With real customer success stories and proven formulations, we ensure that every product 
              meets the highest standards of quality and effectiveness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
