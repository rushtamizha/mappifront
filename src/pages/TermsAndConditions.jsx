import React from "react";

export default function TermsAndConditions({
  siteName = "Mappi.in",
  effectiveDate = "August 14, 2025",
  contactEmail = "rushtamilan@gmail.com",
  businessAddress = "coimbatore, India",
  governingLaw = "Laws of India",
  jurisdiction = "Courts of coimbatore, Tamil Nadu",
}) {
  const sections = [
    { id: "eligibility", title: "1. Eligibility" },
    { id: "services", title: "2. Services Provided" },
    { id: "accounts", title: "3. Accounts & User Responsibilities" },
    { id: "subscriptions", title: "4. Subscriptions & Payments" },
    { id: "wallet", title: "5. Wallet & Referral Program" },
    { id: "ip", title: "6. Intellectual Property" },
    { id: "termination", title: "7. Termination" },
    { id: "liability", title: "8. Limitation of Liability" },
    { id: "thirdparty", title: "9. Third‑Party Services" },
    { id: "changes", title: "10. Changes to the Terms" },
    { id: "law", title: "11. Governing Law & Jurisdiction" },
    { id: "contact", title: "12. Contact Us" },
  ];

  return (
    <main className="mx-auto max-w-3xl p-6 md:p-10 text-sm leading-7 text-emerald-700">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Terms & Conditions</h1>
        <p className="mt-2 text-gray-900">
          Effective Date: <span className="font-medium text-gray-900">{effectiveDate}</span>
        </p>
        <p className="mt-1 text-gray-900">
          Last Updated: <span className="font-medium text-gray-900">{effectiveDate}</span>
        </p>
      </header>

      <section className="mb-8">
        <p className="text-gray-900">
          These Terms and Conditions ("Terms") govern your access to and use of <span className="font-semibold">{siteName}</span> ("we", "our", or "us"). By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree, you must not use our services.
        </p>
      </section>

      <nav className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <h2 className="text-base font-semibold mb-2">Table of contents</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside">
          {sections.map((s) => (
            <li key={s.id}>
              <a className="hover:underline" href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="eligibility" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">1. Eligibility</h3>
        <p className="text-gray-700">
          You must be at least 13 years old (or the age of digital consent in your jurisdiction) to use the services. If you are under 18, you may use the platform only with the consent and supervision of a parent or legal guardian. You represent that you have the authority to agree to these Terms.
        </p>
      </section>

      <section id="services" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">2. Services Provided</h3>
        <p className="text-gray-700">
          We provide tools for creating public profile pages with links, analytics, referrals, wallet features, and paid subscriptions (e.g., Free/Pro/Premium tiers). We may improve, modify, or discontinue features at any time with or without notice.
        </p>
      </section>

      <section id="accounts" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">3. Accounts & User Responsibilities</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Provide accurate registration information and keep credentials confidential.</li>
          <li>Do not use the platform for unlawful, harmful, or abusive activities.</li>
          <li>Do not upload or share content that is illegal, infringing, defamatory, obscene, or violates third‑party rights.</li>
          <li>You are responsible for activity under your account. Notify us immediately of unauthorized use.</li>
        </ul>
      </section>

      <section id="subscriptions" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">4. Subscriptions & Payments</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Paid plans provide additional features and limits as described on our pricing page.</li>
          <li>Payments are processed by third‑party gateways. Fees are non‑refundable except where required by law or our Refund Policy.</li>
          <li>We may suspend or terminate access to paid features for unpaid or disputed charges.</li>
        </ul>
      </section>

      <section id="wallet" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">5. Wallet & Referral Program</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Wallet balances can be used for eligible purchases or withdrawals per our Withdrawal Policy and KYC requirements (if any).</li>
          <li>Referral commissions accrue only when referral conditions are met and verified. Fraudulent or abusive activity may lead to forfeiture and account action.</li>
          <li>We may modify or discontinue the referral program at any time.</li>
        </ul>
      </section>

      <section id="ip" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">6. Intellectual Property</h3>
        <p className="text-gray-700">
          The platform, including software, design, logos, text, and graphics, is owned by us or our licensors and protected by intellectual property laws. You retain ownership of content you upload but grant us a worldwide, non‑exclusive, royalty‑free license to host, display, and distribute such content in connection with the services and your public profile.
        </p>
      </section>

      <section id="termination" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">7. Termination</h3>
        <p className="text-gray-700">
          We may suspend or terminate your account immediately for violations of these Terms, legal requirements, or harmful activities. Upon termination, access to your account and associated content may cease. Any outstanding amounts remain payable.
        </p>
      </section>

      <section id="liability" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">8. Limitation of Liability</h3>
        <p className="text-gray-700">
          To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill. Our aggregate liability for claims relating to the services will not exceed the amount you paid to us in the 12 months preceding the event giving rise to the claim, if any.
        </p>
      </section>

      <section id="thirdparty" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">9. Third‑Party Services</h3>
        <p className="text-gray-700">
          The platform may integrate with third‑party services (e.g., payment processors like Razorpay or LG‑Pay, hosting like Cloudinary). Your use of such services is subject to their respective terms and privacy policies.
        </p>
      </section>

      <section id="changes" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">10. Changes to the Terms</h3>
        <p className="text-gray-700">
          We may update these Terms from time to time. Material changes will be indicated by updating the “Effective Date” above. Your continued use of the services after changes become effective constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section id="law" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">11. Governing Law & Jurisdiction</h3>
        <p className="text-gray-700">
          These Terms are governed by {governingLaw}. Any disputes will be subject to the exclusive jurisdiction of {jurisdiction}.
        </p>
      </section>

      <section id="contact" className="mb-16">
        <h3 className="text-xl font-semibold mb-2">12. Contact Us</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Email: <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
          <li>Address: {businessAddress}</li>
        </ul>
      </section>

      <footer className="text-xs text-gray-500 border-t border-white/10 pt-6">
        <p>
          By using {siteName}, you acknowledge that you have read and agree to these Terms & Conditions.
        </p>
      </footer>
    </main>
  );
}
