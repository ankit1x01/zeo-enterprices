import { Check } from 'lucide-react';
import styles from './Compliance.module.css';

export default function Compliance() {
    const deadlines = [
        { date: "31 Jul", year: "2025", label: "Individual & Salaried ITR Deadline", badge: "ITR-1 / ITR-2", highlight: true },
        { date: "31 Oct", year: "2025", label: "Businesses & Audit Cases ITR Deadline", badge: "ITR-3 / ITR-4", highlight: false },
        { date: "31 Dec", year: "2025", label: "Belated / Revised ITR Last Date", badge: "Revised Return", highlight: false },
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.wrapper}>
                    {/* Content Column */}
                    <div className={styles.content}>
                        <h2 className={styles.heading}>ITR Filing Standards & Compliance</h2>
                        <p className={styles.intro}>
                            Filing ITR before the due date avoids penalties and keeps your financial records clean. Zio&apos;s CA team ensures timely and accurate compliance:
                        </p>

                        <ul className={styles.list}>
                            <li>
                                <Check size={20} className={styles.check} />
                                <span><strong>100% Accuracy Guarantee:</strong> Every return is reviewed by a qualified CA before submission to the Income Tax Department portal.</span>
                            </li>
                            <li>
                                <Check size={20} className={styles.check} />
                                <span><strong>Maximum Deductions Applied:</strong> We claim all eligible deductions under 80C, 80D, 80G, HRA, LTA, and carry-forward losses to minimize your tax outgo.</span>
                            </li>
                            <li>
                                <Check size={20} className={styles.check} />
                                <span><strong>Refund Follow-up Support:</strong> We monitor your refund status on the IT portal and assist with any notices, intimations, or reissue requests.</span>
                            </li>
                            <li>
                                <Check size={20} className={styles.check} />
                                <span><strong>Penalty Avoidance:</strong> Late ITR filing attracts ₹1,000–₹5,000 penalty under Section 234F. We keep you ahead of deadlines every year.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Deadlines Column */}
                    <div className={styles.badges}>
                        <p className={styles.deadlineTitle}>AY 2025–26 Filing Deadlines</p>
                        {deadlines.map((d, i) => (
                            <div key={i} className={`${styles.badgeBox} ${d.highlight ? styles.highlightBox : ''}`}>
                                <div className={styles.badgeDate}>
                                    <span className={styles.dateDay}>{d.date}</span>
                                    <span className={styles.dateYear}>{d.year}</span>
                                </div>
                                <div className={styles.badgeInfo}>
                                    <span className={styles.badgeLabel}>{d.label}</span>
                                    <span className={styles.badgeTag}>{d.badge}</span>
                                </div>
                                <div className={styles.glowLine}></div>
                            </div>
                        ))}
                        <div className={styles.urgencyNote}>
                            <span>⚡</span> File early to get faster refunds and avoid last-minute rush.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
