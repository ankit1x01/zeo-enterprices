import { Users, Zap, FileCheck, Lock, TrendingUp } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

export default function WhyChooseUs() {
    const features = [
        {
            icon: <Users size={28} />,
            title: "CA-Assisted Filing",
            text: "Every ITR is reviewed and filed by a qualified Chartered Accountant, not software alone."
        },
        {
            icon: <Zap size={28} />,
            title: "48-Hour Turnaround",
            text: "From document submission to ITR-V acknowledgement — typically completed within 48 hours."
        },
        {
            icon: <FileCheck size={28} />,
            title: "Maximum Refund",
            text: "We apply all applicable deductions (80C, 80D, HRA, LTA) to legally minimize your tax and maximize refund."
        },
        {
            icon: <Lock size={28} />,
            title: "Data Security",
            text: "Your financial documents are handled with bank-level confidentiality and never shared with third parties."
        },
        {
            icon: <TrendingUp size={28} />,
            title: "Transparent Pricing",
            text: "Flat-fee ITR filing plans with zero hidden charges. Know what you pay before you start."
        }
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.heading}>Why File With Zio Enterprises?</h2>
                    <div className={styles.accentLine}></div>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.text}>{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
