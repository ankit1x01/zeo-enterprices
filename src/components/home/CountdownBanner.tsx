"use client";

import { useEffect, useState } from 'react';
import { AlertTriangle, Calendar } from 'lucide-react';
import styles from './CountdownBanner.module.css';

function useCountdown(targetDate: string) {
    const calculate = () => {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const diff = Math.max(0, target - now);
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
            expired: diff === 0,
        };
    };

    const [time, setTime] = useState(calculate);

    useEffect(() => {
        const id = setInterval(() => setTime(calculate()), 1000);
        return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetDate]);

    return time;
}

export default function CountdownBanner() {
    const { days, hours, minutes, seconds, expired } = useCountdown('2025-07-31T23:59:59');

    const urgencyClass = days < 7 ? styles.critical : days < 30 ? styles.warning : styles.normal;

    if (expired) {
        return (
            <div className={`${styles.banner} ${styles.critical}`}>
                <span className={styles.icon}><AlertTriangle size={16} /></span>
                <span className={styles.text}>
                    ITR filing deadline has passed. File a <strong>Belated Return</strong> to avoid ₹5,000 penalty.
                </span>
                <a
                    href="https://wa.me/919453368173?text=Hi%2C%20I%20missed%20the%20ITR%20deadline.%20Please%20help%20me%20file%20a%20belated%20return."
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bannerCta}
                >
                    File Belated ITR →
                </a>
            </div>
        );
    }

    return (
        <div className={`${styles.banner} ${urgencyClass}`}>
            <span className={styles.icon}><Calendar size={16} /></span>
            <span className={styles.text}>
                <strong>ITR Filing Deadline (AY 2025–26):</strong> July 31, 2025 — file before it&apos;s too late!
            </span>
            <div className={styles.timer}>
                <div className={styles.unit}>
                    <span className={styles.num}>{String(days).padStart(2, '0')}</span>
                    <span className={styles.unitLabel}>Days</span>
                </div>
                <span className={styles.colon}>:</span>
                <div className={styles.unit}>
                    <span className={styles.num}>{String(hours).padStart(2, '0')}</span>
                    <span className={styles.unitLabel}>Hrs</span>
                </div>
                <span className={styles.colon}>:</span>
                <div className={styles.unit}>
                    <span className={styles.num}>{String(minutes).padStart(2, '0')}</span>
                    <span className={styles.unitLabel}>Min</span>
                </div>
                <span className={styles.colon}>:</span>
                <div className={styles.unit}>
                    <span className={styles.num}>{String(seconds).padStart(2, '0')}</span>
                    <span className={styles.unitLabel}>Sec</span>
                </div>
            </div>
            <a
                href="https://wa.me/919453368173?text=Hi%2C%20I%20want%20to%20file%20my%20ITR%20before%20the%20July%2031%20deadline."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bannerCta}
            >
                File Now →
            </a>
        </div>
    );
}
