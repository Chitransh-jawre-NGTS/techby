import React from "react";
import Navbar from "../../components/Navbar";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f7f6] py-10 px-4">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">

          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-gray-700 leading-8">

            <p>
              Techby respects your privacy and is committed to protecting your
              personal information.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Information We Collect
              </h2>

              <p>
                We may collect your name, email address, phone number,
                location, profile image, and listing information when you use
                our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                How We Use Your Information
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>To provide marketplace services</li>
                <li>To improve user experience</li>
                <li>To manage listings and accounts</li>
                <li>To provide customer support</li>
                <li>To prevent fraud and abuse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Data Security
              </h2>

              <p>
                We use reasonable security practices to protect user data.
                However, no internet transmission is fully secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Third-Party Services
              </h2>

              <p>
                We may use third-party services such as payment gateways,
                analytics tools, and authentication providers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Changes To Policy
              </h2>

              <p>
                Techby may update this privacy policy at any time without prior
                notice.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;