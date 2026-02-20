export default function PrivacyPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto prose">
          <h1 className="text-4xl font-display font-bold text-prestige-navy mb-8">
            Privacy Policy
          </h1>
          
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-prestige-navy mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              Prestige Realty ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-prestige-navy mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Personal information (name, email, phone number)</li>
              <li>Property inquiry details</li>
              <li>Usage data and analytics</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-prestige-navy mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use collected information for:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Responding to your inquiries</li>
              <li>Providing property information</li>
              <li>Improving our services</li>
              <li>Marketing communications (with consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-prestige-navy mb-4">4. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information. However, no method
              of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-prestige-navy mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-prestige-navy mb-4">6. Contact Us</h2>
            <p className="text-gray-700">
              For questions about this Privacy Policy, contact us at:
              <br />
              Email: privacy@prestigerealty.com
              <br />
              Phone: +91 98765 43210
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}





