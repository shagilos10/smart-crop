import React, { useState } from "react";

const HelpAndSupportPage = () => {
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleIssueChange = (e) => setIssue(e.target.value);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for contacting support
    console.log({ email, issue });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for feedback
    console.log({ feedback });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Help & Support</h2>

      {/* FAQ Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold">How can I reset my password?</p>
            <p className="text-gray-600">
              To reset your password, click on the "Forgot Password" link on the login page and follow the instructions.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">How do I contact customer support?</p>
            <p className="text-gray-600">
              You can contact customer support by filling out the contact form below or emailing us directly at support@company.com.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">How can I update my profile information?</p>
            <p className="text-gray-600">
              You can update your profile information by going to the Settings page and editing your account details.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Support Form */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Issue Description</label>
            <textarea
              value={issue}
              onChange={handleIssueChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your issue"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      {/* Troubleshooting Guides */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Troubleshooting Guides</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold">App not loading?</p>
            <p className="text-gray-600">
              Try closing the app and restarting your device. If the issue persists, check your internet connection or reinstall the app.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Can't reset password?</p>
            <p className="text-gray-600">
              Ensure you're entering the correct email associated with your account. If you've forgotten your email, please contact support.
            </p>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Give Us Your Feedback</h3>
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Feedback</label>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="We'd love to hear your thoughts"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </section>

      {/* Additional Contact Info */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Additional Contact Information</h3>
        <p className="text-gray-600">
          For urgent issues, you can reach us directly at:
        </p>
        <p className="text-gray-600">Phone: 1-800-123-4567</p>
        <p className="text-gray-600">Email: support@company.com</p>
      </section>
    </div>
  );
};

export default HelpAndSupportPage;
