import React from "react";

/**
 * PrivacyPolicy.jsx
 *
 * Drop-in JSX component for your Linktree-style project.
 * TailwindCSS-ready.
 */

export default function PrivacyPolicy({
  siteName = "Mappi.in",
  effectiveDate = "August 14, 2025",
  contactEmail = "rushtamilan@gmail.com",
  businessAddress = "coimbatore, India",
}) {
  return (
    <main className="mx-auto max-w-3xl p-6 md:p-10 text-sm leading-7 text-emerald-700">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-gray-700">
          Effective Date: <span className="font-medium text-gray-700">{effectiveDate}</span>
        </p>
        <p className="mt-1 text-gray-700">
          Last Updated: <span className="font-medium text-gray-700">{effectiveDate}</span>
        </p>
      </header>

      <section className="mb-8 text-gray-700">
        <p>
          This Privacy Policy explains how {siteName} ("we", "our", or "us") collects, uses, and protects your information when you use our website and services. By using our services, you consent to the practices described in this Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Personal information you provide (e.g., name, email, payment details).</li>
          <li>Account credentials for login and authentication.</li>
          <li>Usage data such as clicks, page views, and referral activity.</li>
          <li>Technical data like IP address, device type, and browser information.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>To provide, improve, and personalize our services.</li>
          <li>To process payments, manage subscriptions, and track wallet/referral earnings.</li>
          <li>To send important updates, security alerts, and promotional offers.</li>
          <li>To detect and prevent fraud, abuse, and illegal activities.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Sharing of Information</h2>
        <p className="text-gray-700">
          We may share your information with trusted third parties such as payment processors, analytics providers, and hosting services. We will never sell your personal data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p className="text-gray-700">
          We use industry-standard security measures to protect your data. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Access, correct, or delete your personal information.</li>
          <li>Opt-out of marketing communications.</li>
          <li>Request a copy of the data we hold about you.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time. Significant changes will be posted on this page, and the "Effective Date" will be updated accordingly.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Email: <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
          <li>Address: {businessAddress}</li>
        </ul>
      </section>

      <footer className="text-xs text-gray-700 border-t border-white/10 pt-6">
        <p>By using {siteName}, you acknowledge that you have read and agree to this Privacy Policy.</p>
      </footer>
    </main>
  );
}
