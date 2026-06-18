"use client";

import { useState } from 'react';
import { Check, HelpCircle, ArrowRight, MessageSquare, Building2, Utensils, ShoppingCart, Laptop, Heart } from 'lucide-react';
import styles from './InteractiveChecker.module.css';

interface Recommendation {
    name: string;
    type: 'Mandatory' | 'Recommended';
    desc: string;
    docs: string[];
}

export default function InteractiveChecker() {
    const [profile, setProfile] = useState<'startup' | 'food' | 'retail' | 'service' | 'ngo'>('startup');
    const [turnoverOver20L, setTurnoverOver20L] = useState(false);
    const [interstate, setInterstate] = useState(false);
    const [hasEmployees, setHasEmployees] = useState(false);
    const [needSubsidy, setNeedSubsidy] = useState(false);

    // Dynamic calculations
    const getRecommendations = (): Recommendation[] => {
        const list: Recommendation[] = [];

        // Profile base recommendations
        if (profile === 'startup') {
            list.push({
                name: 'Private Limited / LLP Incorporation',
                type: 'Recommended',
                desc: 'Highly recommended for startups looking to raise equity funds, limit liability, and establish credibility.',
                docs: ['PAN card of directors', 'Aadhar card', 'Electricity bill of office', 'Rent agreement / NOC']
            });
        } else if (profile === 'ngo') {
            list.push({
                name: 'Section 8 Company / Trust Registration',
                type: 'Mandatory',
                desc: 'Register as a non-profit company or trust to avail tax exemptions under Section 80G/12A.',
                docs: ['PAN card of members', 'Aadhar card', 'Rent agreement', 'Objective guidelines']
            });
        }

        // FSSAI criteria
        if (profile === 'food') {
            list.push({
                name: 'FSSAI Food License / Registration',
                type: 'Mandatory',
                desc: 'Compulsory for any business processing, serving, packing, or trading food items.',
                docs: ['Photo of applicant', 'Aadhar / Voter ID', 'Proof of business address', 'List of food categories']
            });
        }

        // GST criteria
        if (turnoverOver20L || interstate || profile === 'retail') {
            list.push({
                name: 'GST Registration',
                type: turnoverOver20L || interstate ? 'Mandatory' : 'Recommended',
                desc: turnoverOver20L || interstate 
                    ? 'Legally mandatory due to turnover exceeding ₹20 Lakhs limit or interstate commerce.'
                    : 'Highly recommended for input tax credit claims and doing business with registered buyers.',
                docs: ['PAN card of business', 'Aadhar card of promoter', 'Electricity bill / Rent agreement', 'Bank statement / Cancelled cheque']
            });
        }

        // MSME criteria
        if (needSubsidy || profile === 'startup' || profile === 'service') {
            list.push({
                name: 'MSME Udyam Registration',
                type: needSubsidy ? 'Mandatory' : 'Recommended',
                desc: 'Unlock government subsidy schemes (like PMEGP loan subsidies up to 35%), cheaper collateral-free bank loans, and protection against delayed payments.',
                docs: ['Aadhar Card', 'PAN Card of entity', 'Bank details']
            });
        }

        // EPFO/ESIC criteria
        if (hasEmployees) {
            list.push({
                name: 'EPFO & ESIC Compliance Setup',
                type: 'Mandatory',
                desc: 'Mandatory registration and monthly filing if you employ personnel, securing employee provident funds and health insurance.',
                docs: ['Company PAN & Certificate', 'Employee KYC details', 'Digital Signature (DSC)', 'Bank details']
            });
        }

        // Default addition if empty
        if (list.length === 0) {
            list.push({
                name: 'Shop & Establishment / Trade License',
                type: 'Recommended',
                desc: 'General commercial registration required to open bank current accounts and operate locally.',
                docs: ['Promoter PAN & Aadhar', 'Shop photo with signboard', 'Rent agreement / Property tax bill']
            });
        }

        return list;
    };

    const recommendations = getRecommendations();

    const getWhatsAppUrl = () => {
        const text = `Hi Zio Enterprises, I used your Business Compliance Checker.
Profile: ${profile.toUpperCase()}
Turnover >20L: ${turnoverOver20L ? 'Yes' : 'No'}
Interstate: ${interstate ? 'Yes' : 'No'}
Employees: ${hasEmployees ? 'Yes' : 'No'}
Need Subsidy: ${needSubsidy ? 'Yes' : 'No'}

Please assist me in setting up: ${recommendations.map(r => r.name).join(', ')}.`;
        return `https://wa.me/917828981119?text=${encodeURIComponent(text)}`;
    };

    return (
        <section className={styles.section} id="compliance-checker">
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Interactive Tools</span>
                    <h2 className={styles.heading}>Business Compliance & Setup Checker</h2>
                    <p className={styles.subheading}>
                        Answer a few questions about your business to dynamically find required government registrations, documentation lists, and compliance obligations.
                    </p>
                    <div className={styles.accentLine}></div>
                </div>

                <div className={styles.grid}>
                    {/* Input Control Box */}
                    <div className={styles.controlBox}>
                        <h3 className={styles.boxTitle}>1. Choose Business Profile</h3>
                        <div className={styles.profilesGrid}>
                            <button 
                                onClick={() => setProfile('startup')}
                                className={`${styles.profileBtn} ${profile === 'startup' ? styles.activeProfile : ''}`}
                            >
                                <Building2 size={22} />
                                <span>Startup / Private Ltd</span>
                            </button>
                            <button 
                                onClick={() => setProfile('food')}
                                className={`${styles.profileBtn} ${profile === 'food' ? styles.activeProfile : ''}`}
                            >
                                <Utensils size={22} />
                                <span>Food Business</span>
                            </button>
                            <button 
                                onClick={() => setProfile('retail')}
                                className={`${styles.profileBtn} ${profile === 'retail' ? styles.activeProfile : ''}`}
                            >
                                <ShoppingCart size={22} />
                                <span>Trader / Retailer</span>
                            </button>
                            <button 
                                onClick={() => setProfile('service')}
                                className={`${styles.profileBtn} ${profile === 'service' ? styles.activeProfile : ''}`}
                            >
                                <Laptop size={22} />
                                <span>Service / IT Firm</span>
                            </button>
                            <button 
                                onClick={() => setProfile('ngo')}
                                className={`${styles.profileBtn} ${profile === 'ngo' ? styles.activeProfile : ''}`}
                            >
                                <Heart size={22} />
                                <span>NGO / Section 8</span>
                            </button>
                        </div>

                        <h3 className={styles.boxTitle} style={{ marginTop: '2.5rem' }}>2. Specify Operations</h3>
                        <div className={styles.optionsList}>
                            <label className={styles.optionLabel}>
                                <input 
                                    type="checkbox" 
                                    checked={turnoverOver20L}
                                    onChange={(e) => setTurnoverOver20L(e.target.checked)}
                                />
                                <div className={styles.optionText}>
                                    <strong>Turnover exceeds ₹20 Lakhs/year?</strong>
                                    <span>Triggers mandatory GST threshold registration in India.</span>
                                </div>
                            </label>

                            <label className={styles.optionLabel}>
                                <input 
                                    type="checkbox" 
                                    checked={interstate}
                                    onChange={(e) => setInterstate(e.target.checked)}
                                />
                                <div className={styles.optionText}>
                                    <strong>Selling products/services interstate?</strong>
                                    <span>Requires immediate GST registration, regardless of turnover limit.</span>
                                </div>
                            </label>

                            <label className={styles.optionLabel}>
                                <input 
                                    type="checkbox" 
                                    checked={hasEmployees}
                                    onChange={(e) => setHasEmployees(e.target.checked)}
                                />
                                <div className={styles.optionText}>
                                    <strong>Do you employ staff/workers?</strong>
                                    <span>Requires EPFO and ESIC registrations for employee social security.</span>
                                </div>
                            </label>

                            <label className={styles.optionLabel}>
                                <input 
                                    type="checkbox" 
                                    checked={needSubsidy}
                                    onChange={(e) => setNeedSubsidy(e.target.checked)}
                                />
                                <div className={styles.optionText}>
                                    <strong>Need Bank loans or PMEGP subsidies?</strong>
                                    <span>Avail MSME Udyam to access government loan benefits.</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Recommendations Box */}
                    <div className={styles.resultBox}>
                        <div className={styles.resultHeader}>
                            <h3 className={styles.resultTitle}>Recommended Registrations</h3>
                            <span className={styles.counter}>{recommendations.length} Services Identified</span>
                        </div>

                        <div className={styles.recommendationsList}>
                            {recommendations.map((rec, index) => (
                                <div key={index} className={styles.recCard}>
                                    <div className={styles.recHeader}>
                                        <h4 className={styles.recName}>{rec.name}</h4>
                                        <span className={`${styles.badge} ${rec.type === 'Mandatory' ? styles.mandatory : styles.recommended}`}>
                                            {rec.type}
                                        </span>
                                    </div>
                                    <p className={styles.recDesc}>{rec.desc}</p>
                                    
                                    <div className={styles.docsSection}>
                                        <span className={styles.docsHeading}>Required Documents:</span>
                                        <ul className={styles.docsList}>
                                            {rec.docs.map((doc, dIdx) => (
                                                <li key={dIdx}>
                                                    <Check size={14} className={styles.checkIcon} />
                                                    <span>{doc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.actionSection}>
                            <a 
                                href={getWhatsAppUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.ctaBtn}
                            >
                                <MessageSquare size={20} />
                                <span>Get Registered on WhatsApp</span>
                                <ArrowRight size={18} />
                            </a>
                            <p className={styles.disclaimer}>
                                *Instant setup with CA, legal & software experts. Zero hidden fees. Contact us at +91-7828981119.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
