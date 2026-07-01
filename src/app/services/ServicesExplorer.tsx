'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import styles from './services.module.css';

export type ServiceCategory = {
    id: string;
    title: string;
    icon: React.ReactNode;
    items: string[];
    extraAnchorId?: string;
};

export default function ServicesExplorer({ categories }: { categories: ServiceCategory[] }) {
    const [query, setQuery] = useState('');
    const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(categories.map((c) => c.id)));
    const [activeId, setActiveId] = useState(categories[0]?.id);
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const normalizedQuery = query.trim().toLowerCase();

    const filtered = useMemo(() => {
        if (!normalizedQuery) return categories.map((cat) => ({ ...cat, items: cat.items }));
        return categories
            .map((cat) => ({
                ...cat,
                items: cat.items.filter((item) => item.toLowerCase().includes(normalizedQuery)),
            }))
            .filter((cat) => cat.items.length > 0);
    }, [categories, normalizedQuery]);

    const totalMatches = useMemo(() => filtered.reduce((sum, cat) => sum + cat.items.length, 0), [filtered]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
        );

        Object.values(sectionRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [filtered.length]);

    const toggleCategory = (id: string) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const scrollToCategory = (id: string) => {
        const el = sectionRefs.current[id];
        if (el) {
            setOpenIds((prev) => new Set(prev).add(id));
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {/* Quick Nav */}
            <div className={styles.quickNav}>
                <div className="container">
                    <div className={styles.quickNavInner}>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => scrollToCategory(cat.id)}
                                className={`${styles.quickNavPill} ${activeId === cat.id ? styles.quickNavPillActive : ''}`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className={styles.searchWrapper}>
                <Search size={20} className={styles.searchIcon} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search services — e.g. GST registration, ITR, website audit..."
                    className={styles.searchInput}
                />
                {query && (
                    <button type="button" onClick={() => setQuery('')} className={styles.searchClear} aria-label="Clear search">
                        <X size={18} />
                    </button>
                )}
            </div>

            {query && (
                <p className={styles.searchResultCount}>
                    {totalMatches} {totalMatches === 1 ? 'service' : 'services'} found for &ldquo;{query}&rdquo;
                </p>
            )}

            {query && filtered.length === 0 && (
                <div className={styles.noResults}>
                    No services match &ldquo;{query}&rdquo;. Try a different keyword, or{' '}
                    <a href="https://wa.me/919453368173" target="_blank" rel="noopener noreferrer">ask us on WhatsApp</a>.
                </div>
            )}

            {filtered.map((cat) => {
                const isOpen = openIds.has(cat.id) || Boolean(normalizedQuery);
                return (
                    <div
                        key={cat.id}
                        id={cat.id}
                        ref={(el) => { sectionRefs.current[cat.id] = el; }}
                        className={styles.categorySection}
                    >
                        {cat.extraAnchorId && <span id={cat.extraAnchorId} className={styles.anchorSpacer} />}
                        <button
                            type="button"
                            className={styles.categoryHeader}
                            onClick={() => toggleCategory(cat.id)}
                            aria-expanded={isOpen}
                        >
                            <div className={styles.categoryIcon}>{cat.icon}</div>
                            <h2 className={styles.categoryTitle}>{cat.title}</h2>
                            <span className={styles.categoryCount}>{cat.items.length}</span>
                            <ChevronDown size={22} className={`${styles.categoryChevron} ${isOpen ? styles.categoryChevronOpen : ''}`} />
                        </button>

                        {isOpen && (
                            <div className={styles.serviceGrid}>
                                {cat.items.map((item, i) => (
                                    <div key={i} className={styles.serviceItem}>
                                        <ChevronRight size={20} className={styles.itemIcon} />
                                        <span className={styles.itemText}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
}
