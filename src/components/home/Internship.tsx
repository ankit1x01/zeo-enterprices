import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import styles from './Internship.module.css';

export default function Internship() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.wrapper}>
                    {/* Left Column: Content */}
                    <div className={styles.content}>
                        <span className={styles.label}>PRACTICAL TRAINING PROGRAM</span>
                        <h2 className={styles.heading}>Launch Your Career in Tax, Marketing or IT</h2>

                        <p className={styles.description}>
                            Join our expert-led programs covering GST/ITR compliance, company registrations, 
                            web design & development, GMB local SEO, Meta/Google ads, and WhatsApp campaign automation.
                        </p>

                        <div className={styles.highlights}>
                            <div className={styles.listCol}>
                                <h4 className={styles.listTitle}>Taxation Focus:</h4>
                                <ul className={styles.list}>
                                    <li><Check size={18} className={styles.checkIcon} /> GST & ITR E-Filing & Audits</li>
                                    <li><Check size={18} className={styles.checkIcon} /> Company Registration (Pvt Ltd/LLP)</li>
                                    <li><Check size={18} className={styles.checkIcon} /> Tally Prime & Balance Sheets</li>
                                    <li><Check size={18} className={styles.checkIcon} /> Import Export (IEC) & FSSAI Licensing</li>
                                </ul>
                            </div>

                            <div className={styles.listCol}>
                                <h4 className={styles.listTitle}>IT & Digital Focus:</h4>
                                <ul className={styles.list}>
                                    <li><Check size={18} className={styles.checkIcon} /> Static & Dynamic Web design (React/Next)</li>
                                    <li><Check size={18} className={styles.checkIcon} /> Website QA Bug & Performance Audits</li>
                                    <li><Check size={18} className={styles.checkIcon} /> Local SEO & GMB profile optimization</li>
                                    <li><Check size={18} className={styles.checkIcon} /> Google/Meta Ads & WhatsApp Campaigns</li>
                                </ul>
                            </div>
                        </div>

                        <Link href="/internship" className={styles.ctaButton}>
                            Explore Internship Program <ArrowRight size={20} />
                        </Link>
                    </div>

                    {/* Right Column: Image Cards */}
                    <div className={styles.visuals}>
                        <div className={styles.imageCard}>
                            <img src="/student-success.png" alt="Student Success Stories" />
                            <div className={styles.cardOverlay}>
                                <h3>Student Success Stories</h3>
                                <div className={styles.cardArrow}>→</div>
                            </div>
                        </div>

                        <div className={styles.imageCard}>
                            <img src="/training-facility.png" alt="Training Facilities" />
                            <div className={styles.cardOverlay}>
                                <h3>Training Facilities</h3>
                                <div className={styles.cardArrow}>→</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
