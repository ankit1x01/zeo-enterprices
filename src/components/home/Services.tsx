import { ArrowRight, FileText, Building2, TrendingUp, Users, Calculator, Globe } from 'lucide-react';
import Link from 'next/link';
import styles from './Services.module.css';
import TiltCard from './TiltCard';

export default function Services() {
    const services = [
        {
            icon: <FileText size={32} />,
            label: "ITR-1 / ITR-2",
            title: "Salaried & Individual ITR",
            description: "Accurate ITR-1 (Sahaj) and ITR-2 filing for salaried employees with Form 16, house property income, and capital gains. Maximum refund guaranteed.",
            link: "/services#itr-filing",
            color: "#0d7c5b"
        },
        {
            icon: <Calculator size={32} />,
            label: "ITR-3 / ITR-4",
            title: "Business & Freelancer ITR",
            description: "ITR-3 for business/profession income and ITR-4 (Sugam) for presumptive income under Sections 44AD, 44ADA. Includes bookkeeping support.",
            link: "/services#business-itr",
            color: "#e59f1c"
        },
        {
            icon: <Building2 size={32} />,
            label: "GST",
            title: "GST Registration & Filing",
            description: "End-to-end GST support: new registration, monthly GSTR-1 & 3B filing, ITC reconciliation, annual return, and GST audit compliance.",
            link: "/services#gst-compliance",
            color: "#3b82f6"
        },
        {
            icon: <TrendingUp size={32} />,
            label: "Planning",
            title: "Tax Planning & Savings",
            description: "Strategic tax planning under Sections 80C, 80D, 80G, HRA, LTA and more. Save up to ₹2.5L in tax every year with expert guidance.",
            link: "/services#tax-planning",
            color: "#8b5cf6"
        },
        {
            icon: <Globe size={32} />,
            label: "NRI",
            title: "NRI Tax Filing",
            description: "Specialized ITR filing for Non-Resident Indians — DTAA benefits, foreign income disclosure, FEMA compliance, and repatriation advice.",
            link: "/services#nri-tax",
            color: "#06b6d4"
        },
        {
            icon: <Users size={32} />,
            label: "Business",
            title: "Company Registration",
            description: "Private Limited, LLP, OPC incorporation. Includes PAN, TAN, bank current account, GST registration, and Startup India recognition.",
            link: "/services#company-registration",
            color: "#f97316"
        }
    ];

    return (
        <section className={styles.section} id="services">
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>What We Offer</span>
                    <h2 className={styles.heading}>ITR Filing & Tax Services</h2>
                    <p className={styles.subheading}>
                        Expert CA-assisted filing for every taxpayer profile — salaried, freelancer, business owner, or NRI.
                    </p>
                </div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <TiltCard key={index} className={styles.card}>
                            <div className={styles.iconWrapper} style={{ '--card-color': service.color } as React.CSSProperties}>
                                {service.icon}
                            </div>
                            <span className={styles.cardLabel}>{service.label}</span>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDescription}>{service.description}</p>
                            <Link href={service.link} className={styles.cardLink}>
                                Learn more <ArrowRight size={16} className={styles.linkIcon} />
                            </Link>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
