import React from 'react';
import styles from './Input.module.css';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  prefix,
  suffix,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.inputWrapper} ${error ? styles.inputError : ''}`}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input className={styles.input} {...props} />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
