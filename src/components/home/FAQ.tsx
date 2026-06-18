"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
    {
        q: "What is the last date to file ITR for AY 2025-26?",
        a: "The due date for filing ITR for Assessment Year 2025-26 (Financial Year 2024-25) is July 31, 2025 for individuals, HUFs, and businesses not requiring audit. For audit cases, the deadline is October 31, 2025. Filing after the due date attracts a penalty of ₹1,000 to ₹5,000 under Section 234F.",
    },
    {
        q: "Which ITR form should I use for my salary income?",
        a: "If your income is only from salary, one house property, and interest — file ITR-1 (Sahaj). If you have capital gains from stocks or mutual funds, or multiple house properties, file ITR-2. Freelancers and self-employed professionals should use ITR-4 (Sugam) under presumptive taxation, or ITR-3 for detailed accounts.",
    },
    {
        q: "What happens if I miss the ITR filing deadline?",
        a: "You can still file a Belated Return up to December 31, 2025. A penalty of ₹5,000 (or ₹1,000 if income is below ₹5L) applies under Section 234F. You also lose the ability to carry forward capital losses to future years. Interest under Section 234A is also charged on unpaid tax.",
    },
    {
        q: "How do I claim HRA exemption in my ITR?",
        a: "HRA exemption is computed under Section 10(13A): the minimum of (a) actual HRA received, (b) 50% of basic salary if in metro cities / 40% for non-metros, or (c) rent paid minus 10% of salary. You need rent receipts and landlord's PAN if annual rent exceeds ₹1 lakh. Our CA team handles the calculation automatically.",
    },
    {
        q: "Is it mandatory to file ITR if income is below ₹2.5 lakhs?",
        a: "Technically not mandatory, but strongly recommended if you want to claim a TDS refund, apply for a visa, take a home loan, or carry forward losses. Also mandatory if you have foreign assets or income, or if you are a company/firm regardless of income level.",
    },
    {
        q: "What documents do I need to file ITR?",
        a: "For salaried individuals: Form 16 (Part A & B), bank statements, interest certificates, investment proofs (80C, 80D), home loan statement (for HRA/interest deduction). For business: P&L account, balance sheet, GST returns. For capital gains: broker-generated capital gains statement. Our team sends you a tailored document checklist on WhatsApp.",
    },
    {
        q: "What is the difference between Old and New Tax Regime?",
        a: "The Old Regime allows deductions (80C, 80D, HRA, LTA etc.) but has higher tax slabs. The New Regime (default from FY 2023-24) has lower slab rates but no major deductions except standard deduction of ₹75,000. Our ITR calculator above compares both automatically and recommends the better regime for your income profile.",
    },
    {
        q: "How long does it take to get a tax refund after filing ITR?",
        a: "After e-verification of the return, refunds are typically credited within 20-45 days. If your ITR is selected for processing under Section 143(1), a notice may delay it slightly. We track your refund status and follow up with the IT department on your behalf if there are any issues.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className={styles.section} id="faq">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(f => ({
                            "@type": "Question",
                            "name": f.q,
                            "acceptedAnswer": { "@type": "Answer", "text": f.a },
                        })),
                    }),
                }}
            />

            <div className="container">
                <div className={styles.layout}>
                    <div className={styles.left}>
                        <span className={styles.label}>FAQs</span>
                        <h2 className={styles.heading}>Common ITR Filing Questions</h2>
                        <p className={styles.subtext}>
                            Can&apos;t find what you&apos;re looking for? Our CA team answers queries within the hour on WhatsApp.
                        </p>
                        <a
                            href="https://wa.me/917828981119?text=Hi%2C%20I%20have%20a%20question%20about%20ITR%20filing."
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.waBtn}
                        >
                            Ask a CA on WhatsApp →
                        </a>
                    </div>

                    <div className={styles.accordionCol}>
                        {faqs.map((faq, i) => (
                            <div key={i} className={`${styles.item} ${open === i ? styles.openItem : ''}`}>
                                <button
                                    className={styles.question}
                                    onClick={() => setOpen(open === i ? null : i)}
                                    aria-expanded={open === i}
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown
                                        size={20}
                                        className={styles.chevron}
                                        style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    />
                                </button>
                                <div
                                    className={styles.answer}
                                    style={{ maxHeight: open === i ? '400px' : '0' }}
                                >
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
