"use client";

import { useEffect, useRef } from 'react';
import { UploadCloud, ScanSearch, BadgeCheck } from 'lucide-react';
import styles from './HowItWorks.module.css';

const steps = [
    {
        num: "01",
        icon: <UploadCloud size={28} />,
        title: "Share Your Documents",
        desc: "Upload Form 16, bank statements, investment proofs & other income documents securely on WhatsApp or our portal.",
        items: ["Form 16 / Salary Slips", "Bank Statement", "Investment Proofs (80C, 80D)"],
        color: "#0d7c5b"
    },
    {
        num: "02",
        icon: <ScanSearch size={28} />,
        title: "CA Reviews & Prepares",
        desc: "Our expert Chartered Accountant reviews all your documents, optimizes deductions, and prepares your ITR draft within 24 hours.",
        items: ["Tax computation sheet", "Deduction maximization", "Draft ITR sent for approval"],
        color: "#e59f1c"
    },
    {
        num: "03",
        icon: <BadgeCheck size={28} />,
        title: "Filed & Acknowledged",
        desc: "You approve the draft, we file it on the Income Tax portal. ITR-V acknowledgement and refund tracking shared instantly.",
        items: ["ITR e-filed on IT portal", "ITR-V acknowledgement", "Refund status tracking"],
        color: "#3b82f6"
    }
];

export default function HowItWorks() {
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        (entry.target as HTMLElement).style.opacity = '1';
                        (entry.target as HTMLElement).style.transform = 'translateY(0) rotateX(0deg)';
                    }
                });
            },
            { threshold: 0.2 }
        );
        cardsRef.current.forEach((card) => { if (card) observer.observe(card); });
        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.section} id="how-it-works">
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Simple Process</span>
                    <h2 className={styles.heading}>File Your ITR in 3 Easy Steps</h2>
                    <p className={styles.subheading}>
                        From document upload to ITR-V acknowledgement — the entire process takes less than 48 hours.
                    </p>
                </div>

                <div className={styles.stepsGrid}>
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className={styles.stepCard}
                            ref={(el) => { if (el) cardsRef.current[i] = el; }}
                            style={{
                                opacity: 0,
                                transform: 'translateY(40px) rotateX(8deg)',
                                transition: `all 0.6s ease ${i * 0.15}s`,
                                '--step-color': step.color,
                            } as React.CSSProperties}
                        >
                            <div className={styles.stepNumWrapper}>
                                <span className={styles.stepNum}>{step.num}</span>
                                <div className={styles.stepRing}></div>
                            </div>

                            <div className={styles.stepIconBox}>
                                <span className={styles.stepIcon} aria-hidden="true">{step.icon}</span>
                            </div>

                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.desc}</p>

                            <ul className={styles.stepItems}>
                                {step.items.map((item, j) => (
                                    <li key={j}>
                                        <span className={styles.checkDot}></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {i < steps.length - 1 && (
                                <div className={styles.connector}></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <a
                        href="https://wa.me/917828981119?text=Hi,%20I%20want%20to%20start%20my%20ITR%20filing%20process."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Start Filing Today
                    </a>
                    <p className={styles.ctaNote}>Free consultation · No hidden charges · Same-day response</p>
                </div>
            </div>
        </section>
    );
}
