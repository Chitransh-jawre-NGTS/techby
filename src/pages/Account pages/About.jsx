import React from "react";
import Navbar from "../../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f7f6] py-10 px-4">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">

          <div className="mb-8">

            <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center text-4xl mb-5">
              🚀
            </div>

            <h1 className="text-4xl font-bold text-gray-800">
              About Techby
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              India’s modern marketplace for buying & selling products easily.
            </p>
          </div>

          <div className="space-y-6 text-gray-700 leading-8">

            <p>
              Techby is a trusted online marketplace where users can buy,
              sell, and discover products near them quickly and safely.
            </p>

            <p>
              Our mission is to make local buying and selling simple,
              affordable, and accessible for everyone.
            </p>

            <p>
              Users can post listings for mobiles, vehicles, properties,
              electronics, furniture, fashion, jobs, and much more.
            </p>

            <p>
              We focus on:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

              <div className="bg-green-50 rounded-2xl p-5">
                <h3 className="font-bold text-green-700 text-lg">
                  Safe Marketplace
                </h3>

                <p className="text-sm mt-2 text-gray-600">
                  We work continuously to provide a secure and trusted platform.
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5">
                <h3 className="font-bold text-green-700 text-lg">
                  Easy Listing
                </h3>

                <p className="text-sm mt-2 text-gray-600">
                  Post products within minutes using our simple listing process.
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5">
                <h3 className="font-bold text-green-700 text-lg">
                  Local Connections
                </h3>

                <p className="text-sm mt-2 text-gray-600">
                  Connect directly with buyers and sellers nearby.
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5">
                <h3 className="font-bold text-green-700 text-lg">
                  Better Visibility
                </h3>

                <p className="text-sm mt-2 text-gray-600">
                  Boost listings and reach more buyers using premium features.
                </p>
              </div>

            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mt-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Contact Us
              </h2>

              <p>Email: support@techby.in</p>

              <p>Phone: +91 9876543210</p>

              <p>India</p>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default About;