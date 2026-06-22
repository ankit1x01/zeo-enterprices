import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { 
    CheckCircle, 
    Building2, 
    Receipt, 
    Briefcase, 
    Landmark, 
    Globe, 
    FileText,
    Code,
    Laptop
} from 'lucide-react';
import styles from './internship.module.css';

export default function InternshipPage() {
    const domains = [
        {
            title: "GST Filing & Compliance",
            icon: <Receipt size={28} />,
            duration: "4-8 Weeks",
            skills: "GST registrations, GSTR-1 & GSTR-3B monthly filings, cancellations, surrenders, and late fee reconciliation",
            tools: "GST Portal, E-Way Bill System"
        },
        {
            title: "Direct Taxation (ITR)",
            icon: <Briefcase size={28} />,
            duration: "4-8 Weeks",
            skills: "ITR-1 to ITR-4 filing, TDS returns, crypto tax calculations, and tax notice management",
            tools: "Income Tax E-filing Portal"
        },
        {
            title: "Corporate Setup & Licensing",
            icon: <Building2 size={28} />,
            duration: "4-6 Weeks",
            skills: "Incorporating Private Limited companies/LLPs, MSME Udyam setup, FSSAI food licensing, and Import Export (IEC) registrations",
            tools: "MCA Portal, FSSAI FoSCoS, DGFT Portal"
        },
        {
            title: "Website Design & Development",
            icon: <Globe size={28} />,
            duration: "4-8 Weeks",
            skills: "Designing static & dynamic websites, responsive landing pages, UI/UX prototyping, and domain+hosting setups",
            tools: "Next.js, React, VS Code, Git, CSS Modules"
        },
        {
            title: "GMB Local SEO & Ads",
            icon: <Code size={28} />,
            duration: "6-8 Weeks",
            skills: "Google My Business profile creation, map verifications, suspension removal, local SEO ranking, and Google/Meta Ads lead campaigns",
            tools: "Google Business Profile, Ads Manager"
        },
        {
            title: "QA Audits & E-Commerce",
            icon: <Laptop size={28} />,
            duration: "8-12 Weeks",
            skills: "QA site testing (resolving 404s, page crashes, slow loading), and e-commerce seller onboarding for Amazon/Flipkart",
            tools: "Browser DevTools, Amazon Seller Central, Flipkart Partner Panel"
        }
    ];

    const benefits = [
        "Live client file case studies (GST/ITR filings, web design & marketing)",
        "Hands-on training with government portals & professional SEO/dev tools",
        "Direct mentorship from experienced CAs, SEO analysts, and Web Engineers",
        "Practical understanding of accounting software & Git/Ads workflows",
        "Official Internship Certificate and recommendation letters",
        "Career placement and reference support within GST Suvidha Support"
    ];

    return (
        <main>
            <Navbar />

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroHeading}>Taxation, SEO & IT Development Internship</h1>
                    <p className={styles.heroSubheading}>
                        Gain real-world finance compliance, local SEO, or web development experience under CA & IT mentors
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className={styles.overview}>
                <div className="container">
                    <p className={styles.overviewText}>
                        Our practical training program, derived from GST Suvidha Support's proven compliance services, local SEO campaigns, and custom web development practices,
                        equips finance, commerce, and IT students with the skills required to thrive in modern accounting and digital technology firms.
                    </p>
                </div>
            </section>

            {/* Domains Grid */}
            <section className={styles.domains}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Internship Domains</h2>

                    <div className={styles.grid}>
                        {domains.map((domain, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardTitle}>
                                        <span className={styles.cardIcon}>{domain.icon}</span>
                                        {domain.title}
                                    </div>
                                    <span className={styles.durationBadge}>{domain.duration}</span>
                                </div>

                                <div className={styles.cardSection}>
                                    <span className={styles.cardLabel}>Key Skills</span>
                                    <p className={styles.cardText}>{domain.skills}</p>
                                </div>

                                {domain.tools && (
                                    <div className={styles.cardSection}>
                                        <span className={styles.cardLabel}>Main Systems / Portals</span>
                                        <p className={styles.cardText}>{domain.tools}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className={styles.benefits}>
                <div className="container">
                    <h2 className={styles.benefitsTitle}>Program Benefits</h2>

                    <div className={styles.benefitsGrid}>
                        {benefits.map((benefit, i) => (
                            <div key={i} className={styles.benefitItem}>
                                <CheckCircle size={24} className={styles.benefitIcon} />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.ctaContainer}>
                        <a href="/contact" className={styles.applyButton}>Apply for Internship</a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
