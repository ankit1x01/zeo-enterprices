import { ArrowRight, Users, Star, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import styles from './About.module.css';

const stats = [
    { icon: <Users size={26} />, value: '50,000+', label: 'Taxpayers Served' },
    { icon: <Star size={26} />, value: '4.9 / 5', label: 'Client Rating' },
    { icon: <MapPin size={26} />, value: '5 Cities', label: 'Pan-India Presence' },
    { icon: <Clock size={26} />, value: '48hr', label: 'Avg. Turnaround' },
];

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
                                GST Suvidha Support is a premier CA firm specialising in Income Tax Return (ITR) e-filing, GST compliance, and tax planning for individuals, businesses, and NRIs.
                            </p>
                            <p>
                                We have helped over 50,000 taxpayers maximize refunds and stay fully compliant — with expert filing for ITR-1 through ITR-7, GST registration, MSME setup, and company incorporation.
                            </p>
                            <p>
                                Our team of Chartered Accountants combines deep tax law expertise with modern digital workflows, ensuring your returns are filed accurately, on time, and always in your best financial interest.
                            </p>
                        </div>

                        <Link href="/about" className={styles.link}>
                            Learn more about GST Suvidha Support <ArrowRight size={18} className={styles.linkIcon} />
                        </Link>
                    </div>

                    {/* Stats Column */}
                    <div className={styles.statsGrid}>
                        {stats.map((stat, i) => (
                            <div key={i} className={styles.statCard}>
                                <div className={styles.statIcon}>{stat.icon}</div>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
