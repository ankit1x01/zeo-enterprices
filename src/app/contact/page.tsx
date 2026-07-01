import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Mail, MapPin, Phone } from 'lucide-react';
import styles from './contact.module.css';
import Interactive3DGlobe from '@/components/contact/Interactive3DGlobe';

export default function ContactPage() {
    return (
        <main>
            <Navbar />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroHeading}>Get In Touch</h1>
                    <p className={styles.heroSubheading}>
                        Let's discuss how we can help with your tax compliance, GMB SEO & Web development needs
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.wrapper}>
                        {/* Info Column */}
                        <div className={styles.infoCol}>
                            <h2 className={styles.infoTitle}>Contact Information</h2>
                            <p className={styles.infoText}>
                                Reach out to our team for a professional discussion about your taxation, SEO rankings, QA audits, or web development needs.
                            </p>

                            <div className={styles.contactDetails}>
                                <div className={styles.contactItem}>
                                    <div className={styles.iconBox}><Mail size={24} /></div>
                                    <div>
                                        <h4 className={styles.itemLabel}>Email</h4>
                                        <a href="mailto:care@gstsuvidhasupport.in" className={styles.itemLink}>care@gstsuvidhasupport.in</a>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.iconBox}><Phone size={24} /></div>
                                    <div>
                                        <h4 className={styles.itemLabel}>Phone</h4>
                                        <a href="tel:+919453368173" className={styles.itemLink}>+91-9453368173</a>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.iconBox}><MapPin size={24} /></div>
                                    <div>
                                        <h4 className={styles.itemLabel}>Location</h4>
                                        <p className={styles.itemText}>Offices: Indore, Bhopal, Pune, Bangalore, Gwalior | Main: Siddheshwar Nagar, Gwalior</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.emergencyBox}>
                                <h4>Need Immediate Assistance?</h4>
                                <p>For urgent taxation queries, SEO rankings or web code issues:</p>
                                <a href="mailto:care@gstsuvidhasupport.in">care@gstsuvidhasupport.in</a>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className={styles.formCol}>
                            <form className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Full Name *</label>
                                    <input type="text" id="name" name="name" required placeholder="John Doe" />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email Address *</label>
                                    <input type="email" id="email" name="email" required placeholder="john@company.com" />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" placeholder="+91 ..." />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="org">Organisation Name</label>
                                    <input type="text" id="org" name="org" placeholder="Company Ltd." />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="service">Service Interest</label>
                                    <select id="service" name="service">
                                        <option value="">Select a service...</option>
                                        <option value="itr">Income Tax & ITR Filing</option>
                                        <option value="gst">GST Returns & Setup</option>
                                        <option value="company">Company & FSSAI Registration</option>
                                        <option value="web">Website Development & QA</option>
                                        <option value="gmb">GMB Setup & Local SEO</option>
                                        <option value="marketing">Meta & Google Ads</option>
                                        <option value="whatsapp">WhatsApp Bulk Campaigns</option>
                                        <option value="internship">Internship Program</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Message *</label>
                                    <textarea id="message" name="message" rows={5} required placeholder="How can we help you?"></textarea>
                                </div>

                                <button type="submit" className={styles.submitButton}>Send Message →</button>
                            </form>
                        </div>
                    </div>

                    {/* Interactive 3D Globe Map Section */}
                    <div style={{ marginTop: '5rem' }}>
                        <Interactive3DGlobe />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
