import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import styles from './legal.module.css';

export default function TermsPage() {
    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Website Terms and Conditions</h1>
                    <p className={styles.meta}>Last updated: 4 February 2026</p>

                    <section>
                        <h2>1. Introduction</h2>
                        <p>These terms and conditions govern your use of the GST Suvidha Support website. By using this website, you accept these terms and conditions in full. If you disagree with any part of these terms, you must not use our website.</p>
                    </section>

                    <section>
                        <h2>2. About GST Suvidha Support</h2>
                        <p>
                            <strong>Company Name:</strong> GST Suvidha Support<br />
                            <strong>Jurisdiction:</strong> India<br />
                            <strong>Email:</strong> care@gstsuvidhasupport.in<br />
                        </p>
                    </section>

                    <section>
                        <h2>3. License to Use Website</h2>
                        <p>Unless otherwise stated, GST Suvidha Support and/or its licensors own the intellectual property rights in the website and material on the website. You may:</p>
                        <ul>
                            <li>View pages from our website in a web browser</li>
                            <li>Download pages for caching in a web browser</li>
                            <li>Print pages from the website for personal use</li>
                        </ul>
                        <p>You must not:</p>
                        <ul>
                            <li>Republish material from this website without attribution</li>
                            <li>Sell, rent, or sub-license material from the website</li>
                            <li>Reproduce or duplicate material for commercial purposes</li>
                            <li>Redistribute content from GST Suvidha Support (except as permitted by social sharing)</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Acceptable Use</h2>
                        <p>You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website. You must not:</p>
                        <ul>
                            <li>Use the website in any way that is unlawful, illegal, fraudulent or harmful</li>
                            <li>Use the website to transmit or send unsolicited commercial communications</li>
                            <li>Use the website for any purposes related to marketing without express consent</li>
                            <li>Use data mining, robots, screen scraping, or similar data gathering tools</li>
                            <li>Attempt to gain unauthorized access to our systems or networks</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. User-Generated Content</h2>
                        <p>If you submit any content to our website (through contact forms, comments, or otherwise), you grant GST Suvidha Support a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish and distribute such content for business purposes.</p>
                        <p>You warrant that any content you submit does not infringe any third-party intellectual property rights and complies with applicable laws.</p>
                    </section>

                    <section>
                        <h2>6. Third-Party Links</h2>
                        <p>Our website may contain links to third-party websites and services. These links are provided for your convenience only. We have no control over third-party websites and accept no responsibility for their content, privacy policies, or practices. Visiting third-party sites is at your own risk.</p>
                    </section>

                    <section>
                        <h2>7. Limitation of Liability</h2>
                        <p>To the extent permitted by law:</p>
                        <ul>
                            <li>The website is provided "as is" without any representations or warranties, express or implied</li>
                            <li>We will not be liable for any loss or damage arising from your use of the website, including (but not limited to) indirect or consequential loss</li>
                            <li>We do not guarantee the accuracy, completeness, or timeliness of information on the website</li>
                        </ul>
                        <p>Nothing in these terms excludes or limits liability for any liability that cannot be excluded under applicable law.</p>
                    </section>

                    <section>
                        <h2>8. Data Protection and Privacy</h2>
                        <p>Your use of our website is also governed by our Privacy Policy. We process personal data in accordance with applicable regulations. For information about cookies, please see our Cookie Policy.</p>
                    </section>

                    <section>
                        <h2>9. Professional Services</h2>
                        <p>These website terms are separate from our professional services agreements, which govern the provision of taxation compliance, ITR filings, and IT development services.</p>
                    </section>

                    <section>
                        <h2>10. Indemnity</h2>
                        <p>You agree to indemnify and hold harmless GST Suvidha Support, its directors, employees, and agents from any claims, losses, damages, and expenses (including legal fees) arising from your breach of these terms or misuse of the website.</p>
                    </section>

                    <section>
                        <h2>11. Breaches of These Terms</h2>
                        <p>If you breach these terms, we may take one or more of the following actions:</p>
                        <ul>
                            <li>Issue a warning</li>
                            <li>Suspend or terminate your access to the website</li>
                            <li>Block computers using your IP address from accessing the website</li>
                            <li>Commence legal proceedings against you</li>
                        </ul>
                    </section>

                    <section>
                        <h2>12. Variations</h2>
                        <p>We may revise these terms from time to time. Revised terms will apply from the date of publication on this website. Please check this page regularly to ensure you are familiar with the current version.</p>
                    </section>

                    <section>
                        <h2>13. Severability</h2>
                        <p>If any provision of these terms is found to be invalid or unenforceable by a court, the remaining provisions shall continue in full force and effect.</p>
                    </section>

                    <section>
                        <h2>14. Entire Agreement</h2>
                        <p>These terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and GST Suvidha Support relating to your use of this website.</p>
                    </section>

                    <section>
                        <h2>15. Governing Law and Jurisdiction</h2>
                        <p>These terms are governed by and construed in accordance with the laws of India. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts in Gwalior, India.</p>
                    </section>

                    <section>
                        <h2>16. Contact Information</h2>
                        <p>If you have any questions about these terms:</p>
                        <address>
                            <strong>GST Suvidha Support</strong><br />
                            Email: care@gstsuvidhasupport.in<br />
                        </address>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
