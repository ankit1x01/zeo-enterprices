import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import styles from './legal.module.css';

export default function CookiesPage() {
    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Cookie Policy</h1>
                    <p className={styles.meta}>Last updated: 4 February 2026</p>

                    <section>
                        <h2>1. What Are Cookies?</h2>
                        <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences, understanding how you use our site, and improving our services.</p>
                    </section>

                    <section>
                        <h2>2. How We Use Cookies</h2>
                        <p>Zio Enterprises uses cookies for the following purposes:</p>
                        <ul>
                            <li>To enable essential website functionality</li>
                            <li>To remember your preferences and settings</li>
                            <li>To analyze website traffic and user behavior</li>
                            <li>To improve website performance and user experience</li>
                            <li>To provide personalized content and marketing (with consent)</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Types of Cookies We Use</h2>

                        <h3>3.1 Strictly Necessary Cookies</h3>
                        <p>These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.</p>
                        <p><strong>Legal basis:</strong> Legitimate interest (no consent required under UK GDPR)</p>
                        <p>Examples: Session cookies, cookie consent preferences, security tokens</p>

                        <h3>3.2 Functional Cookies</h3>
                        <p>These cookies allow us to remember choices you make (such as your user name, language, or region) and provide enhanced, more personal features.</p>
                        <p><strong>Legal basis:</strong> Consent or legitimate interest</p>
                        <p>Examples: Theme preferences (dark/light mode), language settings, form data</p>

                        <h3>3.3 Analytics Cookies</h3>
                        <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website performance and content.</p>
                        <p><strong>Legal basis:</strong> Consent required</p>
                        <p>Examples: Google Analytics (when used), page view tracking, session duration</p>

                        <h3>3.4 Marketing Cookies</h3>
                        <p>These cookies track your browsing habits to enable us to show advertising which is more likely to be of interest to you. They may be used to build a profile of your interests and show relevant content on other sites.</p>
                        <p><strong>Legal basis:</strong> Explicit consent required</p>
                        <p>Examples: Social media pixels, remarketing tags, advertising cookies</p>
                    </section>

                    <section>
                        <h2>4. Cookie Duration</h2>
                        <p>We use two types of cookies based on duration:</p>
                        <ul>
                            <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                            <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period (typically up to 12 months) or until you delete them</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Third-Party Cookies</h2>
                        <p>We may use third-party services that set cookies on our website. These include:</p>
                        <ul>
                            <li>Google Analytics (for website analytics)</li>
                            <li>LinkedIn, Twitter, YouTube (for social media integration)</li>
                            <li>Payment processors (for secure transactions)</li>
                        </ul>
                        <p>These third parties have their own privacy policies. We recommend reviewing them to understand how they use cookies.</p>
                    </section>

                    <section>
                        <h2>6. Managing Your Cookie Preferences</h2>
                        <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences through:</p>

                        <h3>Cookie Consent Banner</h3>
                        <p>When you first visit our website, you'll see a cookie consent banner allowing you to accept or reject non-essential cookies. You can change your preferences at any time by clicking the cookie settings link in the footer.</p>

                        <h3>Browser Settings</h3>
                        <p>Most web browsers allow you to control cookies through their settings. You can:</p>
                        <ul>
                            <li>Block all cookies</li>
                            <li>Accept only first-party cookies</li>
                            <li>Delete cookies when you close your browser</li>
                            <li>View and delete individual cookies</li>
                        </ul>
                        <p>Visit www.allaboutcookies.org for detailed guidance on managing cookies in different browsers.</p>
                        <p>Please note: Blocking or deleting cookies may impact your experience on our website, and some features may not function properly.</p>
                    </section>

                    <section>
                        <h2>7. Changes to This Cookie Policy</h2>
                        <p>We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. Please check this page regularly to stay informed about our use of cookies.</p>
                    </section>

                    <section>
                        <h2>8. Contact Us</h2>
                        <p>If you have questions about our use of cookies:</p>
                        <address>
                            <strong>Zio Enterprises</strong><br />
                            Email: ziopvt@zohomail.in<br />
                        </address>
                    </section>

                    <section>
                        <h2>9. More Information</h2>
                        <p>For more information about privacy and data protection:</p>
                        <ul>
                            <li>Read our <a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
