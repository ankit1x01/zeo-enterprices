import { Check, Zap, Star, Building2, MessageSquare } from 'lucide-react';
import styles from './Pricing.module.css';

const plans = [
    {
        name: "Starter",
        subtitle: "Salaried Individual",
        price: "499",
        badge: null,
        color: "#0d7c5b",
        form: "ITR-1 (Sahaj)",
        turnaround: "48 hours",
        features: [
            "ITR-1 filing (salary + 1 house property)",
            "Form 16 based computation",
            "Standard deduction applied",
            "Basic 80C/80D deductions",
            "ITR-V acknowledgement",
            "Email & WhatsApp support",
        ],
        notIncluded: ["Capital gains", "Business income", "GST filing"],
        cta: "Get Started",
        icon: <Zap size={22} />,
    },
    {
        name: "Professional",
        subtitle: "Salaried + Investments",
        price: "999",
        badge: "Most Popular",
        color: "#facc15",
        form: "ITR-2",
        turnaround: "36 hours",
        features: [
            "ITR-2 filing (salary + capital gains)",
            "Stocks, MF & property capital gains",
            "Multiple house properties",
            "All deductions 80C to 80U",
            "Old vs new regime comparison",
            "Refund follow-up support",
            "Priority CA review",
        ],
        notIncluded: ["Business/profession income", "GST filing"],
        cta: "Most Popular — Start Filing",
        icon: <Star size={22} />,
    },
    {
        name: "Business",
        subtitle: "Freelancer / Business Owner",
        price: "2,499",
        badge: "Complete Package",
        color: "#3b82f6",
        form: "ITR-3 / ITR-4 + GST",
        turnaround: "72 hours",
        features: [
            "ITR-3 or ITR-4 (Sugam) filing",
            "Business P&L preparation",
            "Presumptive income (44AD/44ADA)",
            "GST registration + 3 months filing",
            "MSME Udyam registration",
            "Tax planning for next AY",
            "Dedicated CA manager",
            "Phone + WhatsApp support",
        ],
        notIncluded: [],
        cta: "Talk to a CA First",
        icon: <Building2 size={22} />,
    },
];

export default function Pricing() {
    return (
        <section className={styles.section} id="pricing">
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Simple Pricing</span>
                    <h2 className={styles.heading}>Transparent ITR Filing Plans</h2>
                    <p className={styles.subheading}>
                        Flat fees, no hidden charges. Know exactly what you pay before you start.
                    </p>
                </div>

                <div className={styles.grid}>
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`${styles.card} ${plan.badge === 'Most Popular' ? styles.featured : ''}`}
                            style={{ '--plan-color': plan.color } as React.CSSProperties}
                        >
                            {plan.badge && (
                                <div className={styles.badgeStrip}>{plan.badge}</div>
                            )}

                            <div className={styles.cardTop}>
                                <div className={styles.planIcon}>{plan.icon}</div>
                                <div>
                                    <h3 className={styles.planName}>{plan.name}</h3>
                                    <p className={styles.planSubtitle}>{plan.subtitle}</p>
                                </div>
                            </div>

                            <div className={styles.priceRow}>
                                <span className={styles.currency}>₹</span>
                                <span className={styles.price}>{plan.price}</span>
                                <span className={styles.perFiling}>/filing</span>
                            </div>

                            <div className={styles.formTag}>
                                <span>{plan.form}</span>
                                <span className={styles.turnaround}>⚡ {plan.turnaround}</span>
                            </div>

                            <div className={styles.divider} />

                            <ul className={styles.featureList}>
                                {plan.features.map((f, j) => (
                                    <li key={j} className={styles.featureItem}>
                                        <span className={styles.checkIcon}><Check size={14} /></span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                                {plan.notIncluded.map((f, j) => (
                                    <li key={`x-${j}`} className={`${styles.featureItem} ${styles.excluded}`}>
                                        <span className={styles.crossIcon}>✕</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={`https://wa.me/919453368173?text=Hi%2C%20I%20want%20to%20file%20my%20ITR%20under%20the%20${encodeURIComponent(plan.name)}%20plan%20(${encodeURIComponent(plan.form)}).`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.ctaBtn}
                            >
                                <MessageSquare size={16} />
                                {plan.cta}
                            </a>
                        </div>
                    ))}
                </div>

                <p className={styles.note}>
                    All plans include ITR-V acknowledgement & data security. GST @ 18% applicable. Need a custom plan?{' '}
                    <a href="https://wa.me/919453368173" target="_blank" rel="noopener noreferrer">Chat with us →</a>
                </p>
            </div>
        </section>
    );
}
