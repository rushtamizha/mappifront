import React from "react";

export default function RefundPolicy({
  siteName = "Mappi.in",
  effectiveDate = "August 14, 2025",
  contactEmail = "rushtamilan@gmail.com",
  businessAddress = "coimbatore, India",
  governingLaw = "Laws of India",
  jurisdiction = "Courts of coimbatore, Tamil Nadu",
}) {
  return (
    <main className="mx-auto max-w-3xl p-6 md:p-10 text-sm leading-7 text-emerald-700">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Refund Policy</h1>
        <p className="mt-2 text-gray-900">
          Effective Date: <span className="font-medium text-gray-200">{effectiveDate}</span>
        </p>
      </header>

      <section className="mb-8">
        <p className="text-gray-900">
          This Refund Policy explains the terms under which you may request a refund for purchases
          or subscriptions made through <span className="font-semibold">{siteName}</span>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Eligibility for Refund</h2>
        <p className="text-gray-900">
          We offer a full refund if a refund request is made within <span className="font-semibold">24 hours</span> of purchase or subscription activation.  
          To qualify:
        </p>
        <ul className="list-disc list-inside text-gray-900 space-y-2 mt-2">
          <li>The request must be made within 24 hours of the original payment timestamp.</li>
          <li>You must provide your payment receipt or transaction ID.</li>
          <li>The refund request must be sent from the email associated with your account.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Non-Refundable Situations</h2>
        <ul className="list-disc list-inside text-gray-900 space-y-2">
          <li>Requests made after 24 hours from the purchase time.</li>
          <li>Accounts found in violation of our Terms & Conditions.</li>
          <li>Charges from third-party services linked through {siteName}.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Refund Processing</h2>
        <p className="text-gray-900">
          Approved refunds will be processed to your original payment method within 7–10 business days.  
          Depending on your bank or payment provider, it may take additional time for funds to appear.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Contact Us</h2>
        <ul className="list-disc list-inside text-gray-900 space-y-2">
          <li>Email: <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
          <li>Address: {businessAddress}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Governing Law</h2>
        <p className="text-gray-900">
          This Refund Policy is governed by {governingLaw}. Any disputes will be handled exclusively by {jurisdiction}.
        </p>
      </section>

      <footer className="text-xs text-gray-900 border-t border-white/10 pt-6">
        <p>
          By making a purchase on {siteName}, you acknowledge that you have read and agree to this Refund Policy.
        </p>
      </footer>
    </main>
  );
}
