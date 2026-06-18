import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './About.module.css';

export default function About() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.wrapper}>
                    {/* Content Column */}
                    <div className={styles.content}>
                        <h2 className={styles.heading}>Who We Are</h2>

                        <div className={styles.textBlock}>
                            <p>
                                Zio Enterprises is a premier CA firm specialising in Income Tax Return (ITR) e-filing, GST compliance, and tax planning for individuals, businesses, and NRIs.
                            </p>
                            <p>
                                We have helped over 50,000 taxpayers maximize refunds and stay fully compliant — with expert filing for ITR-1 through ITR-7, GST registration, MSME setup, and company incorporation.
                            </p>
                            <p>
                                Our team of Chartered Accountants combines deep tax law expertise with modern digital workflows, ensuring your returns are filed accurately, on time, and always in your best financial interest.
                            </p>
                        </div>

                        <Link href="/about" className={styles.link}>
                            Learn more about Zio Enterprises <ArrowRight size={18} className={styles.linkIcon} />
                        </Link>
                    </div>

                    {/* Image Cards Column */}
                    <div className={styles.images}>
                        {/* Card 1 */}
                        <div className={styles.imageCard}>
                            <img src="/team-meeting.png" alt="Our Experts" />
                            <div className={styles.imageOverlay}>
                                <h3>Our Experts</h3>
                                <div className={styles.arrowBox}>→</div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className={styles.imageCard}>
                            <img src="/india-operations.png" alt="Pan-India Tax & IT Services" />
                            <div className={styles.imageOverlay}>
                                <h3>Pan-India Services</h3>
                                <div className={styles.arrowBox}>→</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
