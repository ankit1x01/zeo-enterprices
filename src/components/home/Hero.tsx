'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FileText, Lock, Zap, Check } from 'lucide-react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';
import Interactive3DHero from './Interactive3DHero';

export default function Hero() {
    useEffect(() => {
        const triggerEntrance = () => {
            if (!document.body.classList.contains('loading-active')) {
                // Staggered slide-up for left content
                gsap.fromTo('.hero-entrance-item', 
                    { opacity: 0, y: 35 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1.1, 
                        stagger: 0.08, 
                        ease: 'power3.out',
                        clearProps: 'all' // Clear styles after animation completes
                    }
                );

                // Smooth fade and slide-left for right-side visual
                gsap.fromTo('.hero-entrance-visual',
                    { opacity: 0, x: 40, scale: 0.95 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1.4,
                        ease: 'power4.out',
                        clearProps: 'all'
                    }
                );

                observer.disconnect();
            }
        };

        // MutationObserver to watch document.body for class list changes
        const observer = new MutationObserver(triggerEntrance);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        // Run immediately if loader has already finished or is not mounted
        triggerEntrance();

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.gridOverlay}></div>
            <div className={styles.gradientOverlay}></div>
            <Interactive3DHero />

            <div className={styles.wrapper}>
                <div className={styles.layout}>
                    {/* Left Content */}
                    <div className={styles.content}>
                        <div className={`${styles.badge} hero-entrance-item`}>
                            <span className={styles.badgeDot}></span>
                            Trusted ITR E-Filing Partner
                        </div>

                        <h1 className={`${styles.title} hero-entrance-item`}>
                            File Your ITR.<br />
                            <span className={styles.titleHighlight}>Maximize Your Refund.</span>
                        </h1>

                        <p className={`${styles.subtitle} hero-entrance-item`}>
                            Expert-assisted Income Tax Return filing for salaried, business, freelancer & NRI taxpayers. Accurate, fast, and 100% online — filed by CAs.
                        </p>

                        <div className={`${styles.actions} hero-entrance-item`}>
                            <a href="https://wa.me/919453368173?text=Hi,%20I%20want%20to%20file%20my%20ITR%20with%20GST%20Suvidha%20Support." className="btn btn-primary" target="_blank" rel="noopener noreferrer">File My ITR Now</a>
                            <Link href="/services" className="btn btn-secondary">View Plans</Link>
                        </div>

                        <div className={`${styles.stats} hero-entrance-item`}>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>50K+</span>
                                <span className={styles.statLabel}>Returns Filed</span>
                            </div>
                            <div className={styles.statDivider}></div>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>48hr</span>
                                <span className={styles.statLabel}>Turnaround</span>
                            </div>
                            <div className={styles.statDivider}></div>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>100%</span>
                                <span className={styles.statLabel}>Accuracy</span>
                            </div>
                        </div>
                    </div>

                    {/* Right — 3D ITR Dashboard Card */}
                    <div className={`${styles.visual} hero-entrance-visual`}>
                        <div className={styles.cardScene}>
                            <div className={styles.dashCard}>
                                <div className={styles.dashHeader}>
                                    <span className={styles.dashIcon}><FileText size={22} /></span>
                                    <div>
                                        <p className={styles.dashTitle}>ITR Filing Status</p>
                                        <p className={styles.dashSub}>AY 2024–25</p>
                                    </div>
                                    <span className={styles.dashBadge}>Live</span>
                                </div>
                                <div className={styles.dashDivider}></div>
                                <div className={styles.dashRow}>
                                    <span>Form Type</span><strong>ITR-1 (Sahaj)</strong>
                                </div>
                                <div className={styles.dashRow}>
                                    <span>Gross Income</span><strong>₹8,40,000</strong>
                                </div>
                                <div className={styles.dashRow}>
                                    <span>Deductions (80C)</span><strong>−₹1,50,000</strong>
                                </div>
                                <div className={styles.dashDivider}></div>
                                <div className={styles.dashRefundRow}>
                                    <span>Estimated Refund</span>
                                    <strong className={styles.refundAmt}>+₹24,500</strong>
                                </div>
                                <div className={styles.dashProgress}>
                                    <div className={styles.progressTrack}>
                                        <div className={styles.progressFill}></div>
                                    </div>
                                    <span className={styles.progressLabel}>Filed & Verified</span>
                                </div>
                            </div>

                            {/* Floating chips */}
                            <div className={`${styles.floatChip} ${styles.chip1}`}>
                                <Check size={13} /> Form 16 Uploaded
                            </div>
                            <div className={`${styles.floatChip} ${styles.chip2}`}>
                                <Lock size={13} /> Bank-grade Security
                            </div>
                            <div className={`${styles.floatChip} ${styles.chip3}`}>
                                <Zap size={13} /> Same-day Filing
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
