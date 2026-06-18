import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.mainGrid}>
                    {/* Brand Section */}
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logoLink}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="var(--secondary-gss)" />
                                    <path d="M2 16L16 23L30 16" stroke="var(--accent-gss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 23L16 30L30 23" stroke="var(--secondary-gss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '0.5px', fontFamily: '"Montserrat", sans-serif' }}>
                                    Zio <span style={{ color: 'var(--secondary-gss)' }}>Enterprises</span>
                                </span>
                            </div>
                        </Link>
                        <p className={styles.description}>
                            Your premium partner for taxation filings, GST & ITR returns, corporate registrations, custom software engineering, GMB local SEO, and digital marketing solutions.
                        </p>
                        
                        {/* Address/Contact Details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-light-muted)' }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                <MapPin size={16} style={{ color: 'var(--accent-gss)', marginTop: '4px', flexShrink: 0 }} />
                                <span>Offices: Indore, Bhopal, Pune, Bangalore, Gwalior | Main: Siddheshwar Nagar, Gwalior</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Phone size={16} style={{ color: 'var(--accent-gss)', flexShrink: 0 }} />
                                <span>+91-7828981119, +91-8517828981</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Mail size={16} style={{ color: 'var(--accent-gss)', flexShrink: 0 }} />
                                <span>ziopvt@zohomail.in</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className={styles.links}>
                        {/* Col 1 */}
                        <div className={styles.col}>
                            <h4 className={styles.colTitle}>Services</h4>
                            <ul>
                                <li><Link href="/services#gst-compliance">GST Return Filing</Link></li>
                                <li><Link href="/services#company-registration">Company Registration</Link></li>
                                <li><Link href="/services#direct-tax">ITR & Tax Planning</Link></li>
                                <li><Link href="/services#it-development">Web & App Dev</Link></li>
                            </ul>
                        </div>

                        {/* Col 2 */}
                        <div className={styles.col}>
                            <h4 className={styles.colTitle}>Company</h4>
                            <ul>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/about#why-us">Why Choose Us</Link></li>
                                <li><Link href="/contact">Contact Us</Link></li>
                                <li><span className={styles.disabledLink}>Careers (Soon)</span></li>
                            </ul>
                        </div>

                        {/* Col 3 */}
                        <div className={styles.col}>
                            <h4 className={styles.colTitle}>Digital & SEO</h4>
                            <ul>
                                <li><Link href="/services#gmb-seo">Google GMB Setup</Link></li>
                                <li><Link href="/services#digital-marketing">Meta & Google Ads</Link></li>
                                <li><Link href="/services#qa-audits">Website QA Audits</Link></li>
                                <li><Link href="/services#whatsapp-marketing">WhatsApp Campaigns</Link></li>
                            </ul>
                        </div>

                        {/* Col 4 */}
                        <div className={styles.col}>
                            <h4 className={styles.colTitle}>Legal</h4>
                            <ul>
                                <li><Link href="/privacy">Privacy Policy</Link></li>
                                <li><Link href="/terms">Terms of Service</Link></li>
                                <li><Link href="/cookies">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p>&copy; {new Date().getFullYear()} Zio Enterprises. All rights reserved.</p>
                    <div className={styles.bottomLinks}>
                        <Link href="/privacy">Privacy</Link>
                        <span className={styles.separator}>|</span>
                        <Link href="/terms">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
