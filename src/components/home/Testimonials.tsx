import { Star, Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        name: "Priya Sharma",
        city: "Indore",
        itrType: "ITR-1 (Salaried)",
        refund: "₹18,400",
        rating: 5,
        text: "Filed my ITR within 24 hours of submitting Form 16. Got my refund in just 3 weeks. The CA explained every deduction in detail — never felt so confident about my taxes.",
        initials: "PS",
        color: "#0d7c5b",
    },
    {
        name: "Rahul Verma",
        city: "Bhopal",
        itrType: "ITR-2 (Capital Gains)",
        refund: "₹31,200",
        rating: 5,
        text: "Had mutual fund redemptions and was confused about which form to use. GST Suvidha Support's CA sorted it out in one call, computed LTCG correctly, and filed everything same day. Highly recommend!",
        initials: "RV",
        color: "#facc15",
    },
    {
        name: "Anjali Patel",
        city: "Pune",
        itrType: "Business ITR-4 + GST",
        refund: "Saved ₹42,000 in tax",
        rating: 5,
        text: "Running a small design studio. They handled my ITR-4 under 44ADA and 3 months of GST returns. Pricing is clear, no surprises, and they reply within the hour on WhatsApp.",
        initials: "AP",
        color: "#3b82f6",
    },
    {
        name: "Suresh Nair",
        city: "Bangalore",
        itrType: "NRI ITR-2",
        refund: "₹55,800",
        rating: 5,
        text: "Filed NRI return with DTAA claim on UAE salary. GST Suvidha Support handled Form 67, TRC, and coordination with my employer. First time I got full TDS refund without any notice from IT department.",
        initials: "SN",
        color: "#8b5cf6",
    },
    {
        name: "Meera Joshi",
        city: "Gwalior",
        itrType: "ITR-1 (First-time filer)",
        refund: "₹9,600",
        rating: 5,
        text: "First time filing taxes — was completely lost. They patiently explained everything, sent a document checklist on WhatsApp, and filed in under 4 hours. Refund arrived in 2 weeks!",
        initials: "MJ",
        color: "#f97316",
    },
    {
        name: "Vikram Singh",
        city: "Indore",
        itrType: "ITR-3 + Company Reg",
        refund: "Saved ₹78,000 in tax",
        rating: 5,
        text: "Got my Pvt Ltd incorporated, GST registration, and ITR-3 filed in the same week. The business plan pricing is worth every rupee. These guys are fast and genuinely knowledgeable.",
        initials: "VS",
        color: "#06b6d4",
    },
];

function StarRating({ count }: { count: number }) {
    return (
        <div className={styles.stars}>
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} size={14} fill="#facc15" stroke="none" />
            ))}
        </div>
    );
}

export default function Testimonials() {
    return (
        <section className={styles.section} id="reviews">
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Client Reviews</span>
                    <h2 className={styles.heading}>Trusted by Taxpayers Across India</h2>
                    <div className={styles.aggregate}>
                        <div className={styles.aggStars}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={20} fill="#facc15" stroke="none" />
                            ))}
                        </div>
                        <span className={styles.aggScore}>4.9 / 5</span>
                        <span className={styles.aggCount}>from 2,400+ verified filers</span>
                    </div>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className={styles.card}
                            style={{ '--t-color': t.color } as React.CSSProperties}
                        >
                            <Quote size={28} className={styles.quoteIcon} />
                            <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
                            <div className={styles.cardFooter}>
                                <div
                                    className={styles.avatar}
                                    style={{ borderColor: t.color }}
                                >
                                    {t.initials}
                                </div>
                                <div className={styles.authorInfo}>
                                    <span className={styles.name}>{t.name}</span>
                                    <span className={styles.meta}>{t.city} · {t.itrType}</span>
                                </div>
                                <div className={styles.refundBadge}>
                                    <StarRating count={t.rating} />
                                    <span className={styles.refundAmt}>{t.refund}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
