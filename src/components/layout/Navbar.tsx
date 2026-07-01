import Image from 'next/image';
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
                            <a href="mailto:care@gstsuvidhasupport.in" className={styles.supportLink}>Support: care@gstsuvidhasupport.in</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logoLink}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Image id="navbar-logo" src="/logo.svg" alt="GST Suvidha Support" width={64} height={72} style={{ objectFit: 'contain' }} priority />
                        </div>
                    </Link>
                    <div className={styles.links}>
                        <Link href="/" className={styles.link}>Home</Link>
                        <Link href="/services" className={styles.link}>Services</Link>
                        <Link href="/about" className={styles.link}>About</Link>
                        <Link href="https://wa.me/919453368173?text=Hi,%20I'm%20interested%20in%20your%20services." className={styles.ctaButton}>Free Consultation</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
