import React from 'react';
import styles from './SEOSection.module.css';

interface SEOSectionProps {
  title: string;
  description: string;
  howToUse: string[];
  formula?: string;
  benefits: string[];
}

export const SEOSection: React.FC<SEOSectionProps> = ({
  title,
  description,
  howToUse,
  formula,
  benefits
}) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <h2 className={styles.heading}>About {title}</h2>
          <p className={styles.text}>{description}</p>
          
          <div className={styles.grid}>
            <div className={styles.box}>
              <h3 className={styles.subheading}>How to Use</h3>
              <ul className={styles.list}>
                {howToUse.map((step, i) => <li key={i}>{step}</li>)}
              </ul>
            </div>
            
            <div className={styles.box}>
              <h3 className={styles.subheading}>Benefits</h3>
              <ul className={styles.list}>
                {benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
              </ul>
            </div>
          </div>

          {formula && (
            <div className={styles.formulaBox}>
              <h3 className={styles.subheading}>Mathematical Formula</h3>
              <code className={styles.code}>{formula}</code>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
