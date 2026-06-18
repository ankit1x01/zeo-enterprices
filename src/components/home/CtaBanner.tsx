import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './CtaBanner.module.css';

export default function CtaBanner() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <h2 className={styles.heading}>Accelerate Your Business with Zio Enterprises</h2>
                        <p className={styles.text}>
                            Whether you need GST/ITR filing, GMB local SEO, website QA audits, 
                            or custom web development — our CA & IT experts are here to help.
                        </p>
                    </div>

                    <div className={styles.action}>
                        <Link href="/contact" className={styles.button}>
                            Get in Touch with Our Experts <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
