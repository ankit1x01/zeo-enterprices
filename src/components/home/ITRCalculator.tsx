"use client";

import { useState } from 'react';
import { Calculator, MessageSquare, ArrowRight, FileText, IndianRupee, Check, Briefcase, Store, TrendingUp, Globe, Stethoscope } from 'lucide-react';
import styles from './ITRCalculator.module.css';

const itrForms: Record<string, { form: string; desc: string; docs: string[] }> = {
    salary: {
        form: "ITR-1 (Sahaj)",
        desc: "For salaried individuals with income from salary, one house property, and interest. Simplest form with fastest processing.",
        docs: ["Form 16 (Part A & B)", "Bank statement", "Interest certificates (FD/SB)", "Investment proofs (80C, 80D)"]
    },
    business: {
        form: "ITR-4 (Sugam)",
        desc: "For small business owners and freelancers opting for presumptive income scheme under Sections 44AD / 44ADA.",
        docs: ["Profit & Loss account", "Balance sheet", "GST returns (if applicable)", "Bank statement", "Aadhar & PAN"]
    },
    capital: {
        form: "ITR-2",
        desc: "For individuals with capital gains from stocks, mutual funds, or property sale, along with salary/other income.",
        docs: ["Form 16", "Capital gains statement (broker)", "Property sale deed", "Bank statements", "Investment proofs"]
    },
    nri: {
        form: "ITR-2 / ITR-3",
        desc: "For Non-Resident Indians with India-sourced income. Special DTAA benefits and foreign asset disclosure rules apply.",
        docs: ["Passport copy", "NRE/NRO account statements", "TDS certificates", "Foreign income proof", "Form 67 (if DTAA claimed)"]
    },
    professional: {
        form: "ITR-3",
        desc: "For professionals like doctors, lawyers, architects with business/profession income. Requires P&L and balance sheet.",
        docs: ["P&L and Balance Sheet", "Professional receipts", "Expenses vouchers", "Investment proofs", "GST returns"]
    }
};

const TAX_SLABS_NEW = [
    { upto: 300000, rate: 0 },
    { upto: 600000, rate: 0.05 },
    { upto: 900000, rate: 0.10 },
    { upto: 1200000, rate: 0.15 },
    { upto: 1500000, rate: 0.20 },
    { upto: Infinity, rate: 0.30 }
];

function calcTaxNewRegime(income: number): number {
    let tax = 0;
    let prev = 0;
    for (const slab of TAX_SLABS_NEW) {
        if (income <= prev) break;
        const taxable = Math.min(income, slab.upto) - prev;
        tax += taxable * slab.rate;
        prev = slab.upto;
    }
    return Math.max(0, tax);
}

function calcTaxOldRegime(income: number, deductions: number): number {
    const taxableIncome = Math.max(0, income - deductions - 50000);
    const slabs = [
        { upto: 250000, rate: 0 },
        { upto: 500000, rate: 0.05 },
        { upto: 1000000, rate: 0.20 },
        { upto: Infinity, rate: 0.30 }
    ];
    let tax = 0, prev = 0;
    for (const slab of slabs) {
        if (taxableIncome <= prev) break;
        const taxable = Math.min(taxableIncome, slab.upto) - prev;
        tax += taxable * slab.rate;
        prev = slab.upto;
    }
    return Math.max(0, tax);
}

function TaxGauge({ savedPercent }: { savedPercent: number }) {
    const r = 44;
    const circ = 2 * Math.PI * r;
    const offset = circ - (Math.min(savedPercent, 100) / 100) * circ;
    const gaugeColor = savedPercent > 60 ? '#4ade80' : savedPercent > 30 ? '#e59f1c' : '#f87171';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <svg width="110" height="110" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                <circle
                    cx="50" cy="50" r={r} fill="none"
                    stroke={gaugeColor}
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    transform="rotate(-90 50 50)"
                    style={{
                        transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1), stroke 0.5s ease',
                        filter: `drop-shadow(0 0 6px ${gaugeColor})`
                    }}
                />
                <text x="50" y="47" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="Montserrat, sans-serif">
                    {Math.round(Math.min(savedPercent, 100))}%
                </text>
                <text x="50" y="62" textAnchor="middle" fill="#94a3b8" fontSize="8" letterSpacing="0.5">
                    TAX SAVED
                </text>
            </svg>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
                vs. no planning
            </span>
        </div>
    );
}

export default function ITRCalculator() {
    const [incomeType, setIncomeType] = useState<keyof typeof itrForms>('salary');
    const [grossIncome, setGrossIncome] = useState(800000);
    const [deductions80C, setDeductions80C] = useState(150000);
    const [deductions80D, setDeductions80D] = useState(25000);
    const [tdsDeducted, setTdsDeducted] = useState(40000);

    const totalDeductions = Math.min(150000, deductions80C) + deductions80D;
    const oldTax = calcTaxOldRegime(grossIncome, totalDeductions);
    const newTax = calcTaxNewRegime(grossIncome);
    const betterRegime = newTax <= oldTax ? 'new' : 'old';
    const finalTax = Math.min(oldTax, newTax);
    const cess = finalTax * 0.04;
    const totalTaxLiability = finalTax + cess;
    const refundOrPayable = tdsDeducted - totalTaxLiability;

    const maxTax = calcTaxNewRegime(grossIncome) * 1.04;
    const savedPercent = maxTax > 0 ? Math.max(0, ((maxTax - totalTaxLiability) / maxTax) * 100) : 0;

    const { form, desc, docs } = itrForms[incomeType];

    const getWhatsAppUrl = () => {
        const msg = `Hi GST Suvidha Support! I used your ITR calculator.
Income Type: ${incomeType.toUpperCase()}
Gross Income: ₹${grossIncome.toLocaleString('en-IN')}
80C Deductions: ₹${deductions80C.toLocaleString('en-IN')}
80D Deductions: ₹${deductions80D.toLocaleString('en-IN')}
TDS Deducted: ₹${tdsDeducted.toLocaleString('en-IN')}
Estimated ${refundOrPayable >= 0 ? 'Refund' : 'Payable'}: ₹${Math.abs(Math.round(refundOrPayable)).toLocaleString('en-IN')}
Recommended Form: ${form}

Please help me file my ITR.`;
        return `https://wa.me/917828981119?text=${encodeURIComponent(msg)}`;
    };

    const fmt = (n: number) => `₹${Math.abs(Math.round(n)).toLocaleString('en-IN')}`;

    return (
        <section className={styles.section} id="itr-calculator">
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Free Tool</span>
                    <h2 className={styles.heading}>ITR Filing Estimator</h2>
                    <p className={styles.subheading}>
                        Find your applicable ITR form, estimate your tax liability, and see if you&apos;re due a refund — in seconds.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Input Panel */}
                    <div className={styles.inputPanel}>
                        <h3 className={styles.panelTitle}>
                            <Calculator size={20} />
                            Your Income Details
                        </h3>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Income Source Type</label>
                            <div className={styles.typeGrid}>
                                {(Object.keys(itrForms) as Array<keyof typeof itrForms>).map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setIncomeType(type)}
                                        className={`${styles.typeBtn} ${incomeType === type ? styles.activeType : ''}`}
                                    >
                                        {type === 'salary' && <Briefcase size={16} />}
                                        {type === 'business' && <Store size={16} />}
                                        {type === 'capital' && <TrendingUp size={16} />}
                                        {type === 'nri' && <Globe size={16} />}
                                        {type === 'professional' && <Stethoscope size={16} />}
                                        <span>{type === 'salary' ? 'Salaried' : type === 'business' ? 'Business' : type === 'capital' ? 'Capital Gains' : type === 'nri' ? 'NRI' : 'Professional'}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                                Gross Annual Income
                                <span className={styles.fieldValue}>{fmt(grossIncome)}</span>
                            </label>
                            <input
                                type="range"
                                min={100000} max={5000000} step={50000}
                                value={grossIncome}
                                onChange={e => setGrossIncome(Number(e.target.value))}
                                className={styles.slider}
                            />
                            <div className={styles.sliderRange}><span>₹1L</span><span>₹50L</span></div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                                Section 80C Investments
                                <span className={styles.fieldValue}>{fmt(deductions80C)}</span>
                            </label>
                            <input
                                type="range"
                                min={0} max={150000} step={5000}
                                value={deductions80C}
                                onChange={e => setDeductions80C(Number(e.target.value))}
                                className={styles.slider}
                            />
                            <div className={styles.sliderRange}><span>₹0</span><span>₹1.5L (max)</span></div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                                Section 80D Health Insurance
                                <span className={styles.fieldValue}>{fmt(deductions80D)}</span>
                            </label>
                            <input
                                type="range"
                                min={0} max={75000} step={5000}
                                value={deductions80D}
                                onChange={e => setDeductions80D(Number(e.target.value))}
                                className={styles.slider}
                            />
                            <div className={styles.sliderRange}><span>₹0</span><span>₹75K</span></div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>
                                TDS Already Deducted
                                <span className={styles.fieldValue}>{fmt(tdsDeducted)}</span>
                            </label>
                            <input
                                type="range"
                                min={0} max={500000} step={5000}
                                value={tdsDeducted}
                                onChange={e => setTdsDeducted(Number(e.target.value))}
                                className={styles.slider}
                            />
                            <div className={styles.sliderRange}><span>₹0</span><span>₹5L</span></div>
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className={styles.resultPanel}>
                        {/* ITR Form Recommendation */}
                        <div className={styles.formCard}>
                            <div className={styles.formCardHeader}>
                                <FileText size={20} />
                                <span>Recommended ITR Form</span>
                            </div>
                            <div className={styles.formName}>{form}</div>
                            <p className={styles.formDesc}>{desc}</p>
                        </div>

                        {/* Tax Summary */}
                        <div className={styles.taxSummary}>
                            <div className={styles.taxRow}>
                                <span>Old Regime Tax</span>
                                <strong>{fmt(oldTax + oldTax * 0.04)}</strong>
                            </div>
                            <div className={styles.taxRow}>
                                <span>New Regime Tax</span>
                                <strong>{fmt(newTax + newTax * 0.04)}</strong>
                            </div>
                            <div className={styles.taxRowHighlight}>
                                <span>Better Regime</span>
                                <strong className={styles.regimeBadge}>
                                    {betterRegime === 'new' ? 'New Regime ✓' : 'Old Regime ✓'}
                                </strong>
                            </div>
                            <div className={styles.taxDivider}></div>
                            <div className={styles.taxRowHighlight}>
                                <span>Total Tax Liability</span>
                                <strong>{fmt(totalTaxLiability)}</strong>
                            </div>
                            <div className={styles.taxRowHighlight}>
                                <span>TDS Deducted</span>
                                <strong>−{fmt(tdsDeducted)}</strong>
                            </div>
                        </div>

                        {/* SVG Tax Savings Gauge */}
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
                            <TaxGauge savedPercent={savedPercent} />
                        </div>

                        {/* Refund / Payable */}
                        <div className={`${styles.resultBox} ${refundOrPayable >= 0 ? styles.refund : styles.payable}`}>
                            <IndianRupee size={18} />
                            <div>
                                <p className={styles.resultLabel}>
                                    {refundOrPayable >= 0 ? 'Estimated Tax Refund' : 'Tax Payable'}
                                </p>
                                <p className={styles.resultAmount}>{fmt(refundOrPayable)}</p>
                            </div>
                        </div>

                        {/* Documents */}
                        <div className={styles.docsSection}>
                            <p className={styles.docsTitle}>Documents Required:</p>
                            <ul className={styles.docsList}>
                                {docs.map((doc, i) => (
                                    <li key={i}>
                                        <Check size={13} />
                                        <span>{doc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                            <MessageSquare size={18} />
                            <span>File My ITR on WhatsApp</span>
                            <ArrowRight size={16} />
                        </a>

                        <p className={styles.disclaimer}>
                            *Estimates based on standard tax slabs. Final tax is subject to CA review. AY 2024–25.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
