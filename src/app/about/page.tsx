import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Users, Star, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import styles from './about.module.css';

const stats = [
    { icon: <Users size={28} />, value: '50,000+', label: 'Returns Filed' },
    { icon: <Clock size={28} />, value: '48hr', label: 'Avg. Turnaround' },
    { icon: <Star size={28} />, value: '4.9 / 5', label: 'Client Rating' },
    { icon: <MapPin size={28} />, value: '5 Cities', label: 'Offices Across India' },
];

export default function AboutPage() {
    return (
        <main>
            <Navbar />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.overlay}></div>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.breadcrumb}>
                            <Link href="/">Home</Link>
                            <span>›</span>
                            <span>About Us</span>
                        </div>
                        <h1 className={styles.heroTitle}>About GST Suvidha Support</h1>
                        <p className={styles.heroSubtitle}>
                            Leading taxation, SEO, GMB local rankings, and custom web development solutions
                        </p>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className={styles.aboutSection}>
                <div className="container">
                    <div className={styles.aboutWrapper}>
                        <div className={styles.aboutContent}>
                            <h2 className={styles.sectionTitle}>Who We Are</h2>

                            <div className={styles.aboutText}>
                                <p>
                                    <strong>GST Suvidha Support</strong> is a premier professional services firm specialising in taxation compliance, 
                                    Income Tax Return (ITR) filings, GMB setup, local SEO, website QA audits, and custom web development.
                                </p>
                                <p>
                                    We help startups, small businesses, and large enterprises navigate complex tax filings, maintain precise 
                                    financial auditing, execute digital marketing campaigns, and design custom high-performance web platforms.
                                </p>
                                <p>
                                    Our approach combines chartered accounting excellence, SEO & digital marketing expertise, and web development mastery 
                                    — ensuring your business registrations, Google local rankings, and web systems are optimized for maximum growth.
                                </p>
                            </div>
                        </div>

                        <div className={styles.aboutCards}>
                            {stats.map((stat, i) => (
                                <div key={i} className={styles.aboutStatCard}>
                                    <div className={styles.aboutStatIcon}>{stat.icon}</div>
                                    <div>
                                        <span className={styles.aboutStatValue}>{stat.value}</span>
                                        <span className={styles.aboutStatLabel}>{stat.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className={styles.whyChooseSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Why Choose GST Suvidha Support</h2>
                    <div className={styles.whyChooseGrid}>
                        {[
                            { icon: "💼", text: "Chartered Accountants & Web Experts under one roof" },
                            { icon: "📋", text: "100% Tax compliance, accurate e-filings, and GST return setup" },
                            { icon: "💻", text: "Custom static & dynamic web design and app development" },
                            { icon: "🔍", text: "Professional website QA audits to fix 404s, performance, & crashes" },
                            { icon: "📈", text: "Proven GMB Local SEO setup and Google/Meta Ads lead generation" }
                        ].map((point, i) => (
                            <div key={i} className={styles.whyChooseCard}>
                                <span className={styles.whyChooseIcon}>{point.icon}</span>
                                <p className={styles.whyChooseText}>{point.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliance Section */}
            <section className={styles.complianceSection}>
                <div className="container">
                    <div className={styles.complianceWrapper}>
                        <div className={styles.complianceContent}>
                            <h2 className={styles.sectionTitle}>Standards & Best Practices</h2>
                            <p className={styles.complianceText}>
                                Our financial filings and software codebases strictly align with standard frameworks:
                            </p>
                            <ul className={styles.complianceList}>
                                <li><span className={styles.complianceCheck}>✓</span> Income Tax Department & GST portal guidelines</li>
                                <li><span className={styles.complianceCheck}>✓</span> W3C coding standards and modern web architectures</li>
                                <li><span className={styles.complianceCheck}>✓</span> MSME and corporate registry (MCA) frameworks</li>
                                <li><span className={styles.complianceCheck}>✓</span> Secure API development and database encryption</li>
                            </ul>
                        </div>
                        <div className={styles.complianceLogos}>
                            <div className={styles.complianceBadge}>GST / ITR</div>
                            <div className={styles.complianceBadge}>REACT</div>
                            <div className={styles.complianceBadge}>SECURE</div>
                            <div className={styles.complianceBadge}>MSME</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries Section */}
            <section className={styles.industriesSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Who We Work With</h2>
                    <div className={styles.industriesGrid}>
                        {[
                            { name: "Small & Medium Enterprises (SMEs)", icon: "🏢" },
                            { name: "Corporate Organisations", icon: "🏛️" },
                            { name: "Educational Institutions", icon: "🎓" },
                            { name: "Legal Professionals & Investigations", icon: "⚖️" },
                            { name: "Non-Profit & Public Sector Organisations", icon: "🤝" }
                        ].map((ind, i) => (
                            <div key={i} className={styles.industryCard}>
                                <span className={styles.industryIcon}>{ind.icon}</span>
                                <span className={styles.industryName}>{ind.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
