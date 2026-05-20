import React from "react";
import Navbar from "../../components/Navbar";

const TermsCondition = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f7f6] py-10 px-4">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">

          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Terms & Conditions
          </h1>

          <div className="space-y-6 text-gray-700 leading-8">

            <p>
              By using Techby, you agree to comply with the following terms and
              conditions.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                User Responsibilities
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate information</li>
                <li>Do not post illegal or prohibited items</li>
                <li>Do not misuse the platform</li>
                <li>Respect buyers and sellers</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Listings
              </h2>

              <p>
                Users are responsible for the products and information they
                post on Techby.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Payments
              </h2>

              <p>
                Payments made for premium listings, boosts, or advertisements
                are non-refundable unless stated otherwise.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Account Suspension
              </h2>

              <p>
                Techby reserves the right to suspend or remove accounts that
                violate platform rules.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Limitation of Liability
              </h2>

              <p>
                Techby only provides a marketplace platform and is not
                responsible for transactions between buyers and sellers.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TermsCondition;