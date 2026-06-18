"use client";

import { useEffect, useRef } from 'react';
import { FileText, Zap, CheckCircle2, MapPin, Star } from 'lucide-react';
import styles from './StatsStrip.module.css';

const stats = [
    { num: 50000, suffix: '+', label: 'Returns Filed', icon: <FileText size={22} /> },
    { num: 48, suffix: 'hr', label: 'Avg Turnaround', icon: <Zap size={22} /> },
    { num: 100, suffix: '%', label: 'Accuracy Rate', icon: <CheckCircle2 size={22} /> },
    { num: 5, suffix: '+', label: 'Cities Served', icon: <MapPin size={22} /> },
    { num: 4.9, suffix: '/5', label: 'Client Rating', icon: <Star size={22} />, isDecimal: true },
];

export default function StatsStrip() {
    const numsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const animated = useRef(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated.current) {
                    animated.current = true;
                    numsRef.current.forEach((el, i) => {
                        if (!el) return;
                        const stat = stats[i];
                        const isDecimal = stat.isDecimal;
                        const duration = 1800;
                        const start = performance.now();

                        const tick = (now: number) => {
                            const elapsed = now - start;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            const current = stat.num * eased;
                            el.textContent = isDecimal
                                ? current.toFixed(1)
                                : Math.floor(current).toLocaleString('en-IN');
                            if (progress < 1) {
                                requestAnimationFrame(tick);
                            } else {
                                el.textContent = isDecimal
                                    ? stat.num.toFixed(1)
                                    : stat.num.toLocaleString('en-IN');
                            }
                        };

                        requestAnimationFrame(tick);
                    });
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={styles.strip}>
            <div className="container">
                <div className={styles.grid}>
                    {stats.map((stat, i) => (
                        <div key={i} className={styles.stat}>
                            <span className={styles.icon} aria-hidden="true">{stat.icon}</span>
                            <div className={styles.numRow}>
                                <span
                                    ref={el => { numsRef.current[i] = el; }}
                                    className={styles.num}
                                >
                                    {stat.isDecimal ? '0.0' : '0'}
                                </span>
                                <span className={styles.suffix}>{stat.suffix}</span>
                            </div>
                            <span className={styles.label}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
