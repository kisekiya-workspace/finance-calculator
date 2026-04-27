import React from 'react';

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
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      {label && <label className="text-[0.85rem] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">{label}</label>}
      <div
        className={[
          'flex items-center overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-white px-4 transition-all duration-200 focus-within:border-[var(--primary)] focus-within:ring-4 focus-within:ring-[var(--primary)]/10 dark:bg-[var(--bg-secondary)]',
          error ? '!border-red-500 focus-within:ring-red-500/10' : '',
        ].join(' ')}
      >
        {prefix && <span className="mr-3 flex select-none items-center text-[var(--text-tertiary)]">{prefix}</span>}
        <input
          className="flex-1 bg-transparent py-3.5 text-base font-medium text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
          {...props}
        />
        {suffix && <span className="ml-3 flex select-none items-center text-[var(--text-tertiary)]">{suffix}</span>}
      </div>
      {error && <p className="mt-1 text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
};
