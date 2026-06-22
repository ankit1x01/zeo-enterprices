import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <header className={styles.header}>
            {/* Top Bar - Utility Links */}
            <div className={styles.topBar}>
                <div className={styles.container}>
                    <div className={styles.topRight}>
                        <div className={styles.support}>
                            <a href="mailto:support@gstsuvidhasupport.com" className={styles.supportLink}>Support: support@gstsuvidhasupport.com</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logoLink}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="var(--secondary-gss)" />
                                <path d="M2 16L16 23L30 16" stroke="var(--accent-gss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 23L16 30L30 23" stroke="var(--secondary-gss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '0.5px', fontFamily: '"Montserrat", sans-serif' }}>
                                GST <span style={{ color: 'var(--secondary-gss)' }}>Suvidha Support</span>
                            </span>
                        </div>
                    </Link>
                    <div className={styles.links}>
                        <Link href="/" className={styles.link}>Home</Link>
                        <Link href="/services" className={styles.link}>Services</Link>
                        <Link href="/about" className={styles.link}>About</Link>
                        <Link href="https://wa.me/917828981119?text=Hi,%20I'm%20interested%20in%20your%20services." className={styles.ctaButton}>Free Consultation</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
