import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import styles from './legal.module.css';

export default function PrivacyPage() {
    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Privacy Policy</h1>
                    <p className={styles.meta}>Last updated: 4 February 2026</p>

                    <section>
                        <h2>1. Introduction</h2>
                        <p>GST Suvidha Support ("we", "our", "us") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, and protect your information in accordance with applicable data protection regulations.</p>
                        <p>GST Suvidha Support is the data controller responsible for your personal data. If you have any questions about this policy, please contact us at care@gstsuvidhasupport.in.</p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <p>We collect and process the following types of personal data:</p>
                        <ul>
                            <li><strong>Identity Data:</strong> Name, company name, job role</li>
                            <li><strong>Contact Data:</strong> Email address, telephone number, billing address</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
                            <li><strong>Usage Data:</strong> How you use our website, tools, and services</li>
                            <li><strong>Service Data:</strong> Taxation documents, GST logs, application specifications, API integrations</li>
                            <li><strong>Marketing Data:</strong> Your preferences for receiving communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>We process your personal data for the following purposes:</p>
                        <ul>
                            <li>To provide professional taxation, ITR, GST filings, and business compliance support</li>
                            <li>To build and deploy custom web, mobile, and software applications</li>
                            <li>To communicate with you about your projects, filings, and our services</li>
                            <li>To improve our website, checker tools, and software services</li>
                            <li>To comply with legal, financial, and tax regulatory requirements</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Legal Basis for Processing</h2>
                        <p>We process your data to fulfill our agreements with you, comply with legal/tax obligations, or based on your consent where applicable.</p>
                    </section>

                    <section>
                        <h2>5. Data Sharing and Disclosure</h2>
                        <p>We may share your personal data with IT service providers, government/tax portals (for GST/ITR filing compliance), payment processors, or professional advisors when required.</p>
                        <p>We do not sell your personal data to third parties.</p>
                    </section>

                    <section>
                        <h2>6. Data Retention</h2>
                        <p>We retain your personal data and corporate records only for as long as necessary to fulfill legal, accounting, tax, or software development agreements.</p>
                    </section>

                    <section>
                        <h2>7. Your Data Protection Rights</h2>
                        <p>You have the right to request access to, rectification of, or erasure of your personal data. To exercise these rights, contact us at care@gstsuvidhasupport.in.</p>
                    </section>

                    <section>
                        <h2>8. Cookies and Tracking Technologies</h2>
                        <p>Our website uses cookies to improve your experience. For detailed information about the cookies we use and your choices, please see our Cookie Policy.</p>
                    </section>

                    <section>
                        <h2>9. Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal data and source code against unauthorized access, alteration, or disclosure.</p>
                    </section>

                    <section>
                        <h2>10. Contact Us</h2>
                        <p>If you have questions about this Privacy Policy or wish to exercise your data protection rights:</p>
                        <address>
                            <strong>GST Suvidha Support</strong><br />
                            Email: care@gstsuvidhasupport.in<br />
                            Location: Aud-234, Siddheshwar Nagar, Kalpi Bridge Colony, Near Morar Police Station, Gwalior - 474007
                        </address>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
