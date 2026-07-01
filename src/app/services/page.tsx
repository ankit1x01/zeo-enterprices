import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import {
    Building2,
    Receipt,
    Briefcase,
    Landmark,
    Globe,
    FileText,
    MessageSquare
} from 'lucide-react';
import ServicesExplorer from './ServicesExplorer';
import styles from './services.module.css';

export default function ServicesPage() {
    const categories = [
        {
            id: "direct-tax",
            title: "Income Tax & ITR Filing",
            icon: <Briefcase size={32} />,
            items: [
                "Individual Tax Return Filing (ITR-1 & ITR-2)",
                "Business & Professional Tax Returns (ITR-3 & ITR-4)",
                "Tax Planning, Optimization & Saving Advisory",
                "Income Tax Notice Management & Response Drafting",
                "TDS / TCS Return E-Filing & Reconciliation",
                "Advance Tax Calculation & Reminders",
                "Capital Gains Tax Advisory (Equity, Property, Crypto)"
            ]
        },
        {
            id: "gst-compliance",
            title: "GST Compliance & Setup",
            icon: <Receipt size={32} />,
            items: [
                "GST Registration (Certificate in 5-7 Days)",
                "Monthly/Quarterly Return Filing (GSTR-1 & GSTR-3B)",
                "GST Input Tax Credit (ITC) Reconciliation",
                "GST Final Return (GSTR-10), Cancellation & Surrenders",
                "Pending Return Clearing & Penalty Appeals",
                "E-Way Bill System Setup & Training Support"
            ]
        },
        {
            id: "company-registration",
            title: "Company & Gov Registration",
            icon: <Building2 size={32} />,
            items: [
                "Private Limited Company (Pvt Ltd) & LLP Incorporation",
                "One Person Company (OPC) & Partnership Setups",
                "MSME Udyam Scheme Registration",
                "NGO & Section 8 Non-Profit Trust Setup",
                "FSSAI Food Safety Licensing (Basic, State, Central)",
                "Import Export Code (IEC Code) Registration",
                "Class 3 Digital Signature Certificates (DSC) Issuance"
            ]
        },
        {
            id: "it-development",
            title: "Website Design & Development",
            icon: <Globe size={32} />,
            items: [
                "Static & Dynamic Responsive Website Design",
                "Custom Web Applications & SaaS MVPs",
                "E-Commerce Store Setup (Shopify, WooCommerce)",
                "Amazon, Flipkart, Myntra, Meesho Seller Onboarding",
                "Free Domain name, SSL & Hosting Server Configuration",
                "Payment Gateway Integration & WhatsApp API Setup"
            ]
        },
        {
            id: "gmb-seo",
            extraAnchorId: "digital-marketing",
            title: "Google My Business & SEO",
            icon: <Landmark size={32} />,
            items: [
                "Google My Business (GMB) Listing Creation & Setup",
                "GMB Verification & Maps Local Ranking SEO",
                "GMB Profile Suspension Removal & Recovery Services",
                "On-Page, Off-Page, and Content Keyword SEO Research",
                "Meta Ads (Facebook/Instagram Lead Generation Campaigns)",
                "Google Search, Display & local Call Campaigns"
            ]
        },
        {
            id: "qa-audits",
            extraAnchorId: "whatsapp-marketing",
            title: "QA Audits & WhatsApp Campaigns",
            icon: <FileText size={32} />,
            items: [
                "Website QA Audits to fix 404s, page freezes & crashes",
                "Page Load Speed & Mobile responsiveness audits",
                "QA Audits start at just ₹404/url with full reporting",
                "Bulk WhatsApp Marketing Campaign Tool Setup",
                "Send bulk WhatsApp images, videos, PDFs & interactive buttons",
                "Meta-Approved bulk campaigns (Never Ban mechanisms)"
            ]
        }
    ];

    return (
        <main>
            <Navbar />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroHeading}>Our Services</h1>
                    <p className={styles.heroSubheading}>
                        Professional financial tax filings, GMB local SEO, website QA audits, 
                        and custom web solutions delivered by CA and IT experts.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.content}>
                <div className="container">
                    <ServicesExplorer categories={categories} />

                    {/* WhatsApp Support CTA Card */}
                    <div className={styles.ctaCard}>
                        <h2>Need Assistance with Registration or Filings?</h2>
                        <p>Speak to our representative directly for instant quotes and documents requirements checklists.</p>
                        <a 
                            href="https://wa.me/919453368173?text=Hi,%20I'm%20interested%20in%20your%20taxation%20and%20compliance%20services." 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.ctaButton}
                        >
                            <MessageSquare size={20} />
                            <span>Chat on WhatsApp (+91-9453368173)</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
