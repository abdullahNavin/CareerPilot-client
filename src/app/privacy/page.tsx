import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | CareerPilot AI",
  description: "Learn how CareerPilot AI collects, uses, and protects your personal data.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly, such as your name, email address, career profile data, resume uploads, and any content you create on our platform. We also collect usage data including pages visited, features used, session duration, and device information through cookies and analytics tools.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your information to: provide and improve the CareerPilot AI platform; personalize AI-generated career recommendations; send service notifications, product updates, and marketing communications (with your consent); analyze usage trends to develop new features; and ensure the security and integrity of our systems.`,
  },
  {
    title: "3. AI Processing of Your Data",
    content: `CareerPilot AI uses your resume content, career preferences, and interaction history to generate personalized career advice, resume analysis, roadmaps, and interview coaching. This data is processed by our AI models and third-party AI providers under strict data processing agreements. We do not sell this data to third parties.`,
  },
  {
    title: "4. Data Sharing",
    content: `We do not sell your personal data. We may share your information with trusted third-party service providers who assist in operating our platform (e.g., cloud hosting, analytics, payment processing), all bound by confidentiality agreements. We may also disclose data when required by law.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain your account data for as long as your account is active. Resume uploads and AI-generated results are retained for 12 months from your last interaction. You may request deletion of your data at any time by contacting support@careerpilot.ai.`,
  },
  {
    title: "6. Your Rights",
    content: `Depending on your jurisdiction, you may have rights to: access your personal data; correct inaccuracies; request deletion; object to or restrict processing; and data portability. To exercise these rights, contact us at privacy@careerpilot.ai.`,
  },
  {
    title: "7. Cookies",
    content: `We use essential cookies for authentication, functional cookies for preferences, and analytics cookies to understand usage. You can manage your cookie preferences in your browser settings. Disabling certain cookies may affect platform functionality.`,
  },
  {
    title: "8. Security",
    content: `We implement industry-standard security measures including TLS encryption in transit, AES-256 encryption at rest, role-based access controls, and regular security audits. However, no method of transmission over the internet is 100% secure.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on our platform. Your continued use of CareerPilot AI after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "10. Contact Us",
    content: `For privacy-related questions or to exercise your rights, contact our Data Protection Officer at privacy@careerpilot.ai or write to CareerPilot AI, Inc., 548 Market St, San Francisco, CA 94104.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
      <div className="space-y-4 pb-8 border-b border-border">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: May 10, 2026</p>
        <p className="text-muted-foreground leading-relaxed">
          CareerPilot AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
        </p>
      </div>

      <div className="space-y-10">
        {SECTIONS.map((section, i) => (
          <div key={i} className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-border text-sm text-muted-foreground flex gap-4">
        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
      </div>
    </div>
  );
}
