import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  style
}) => {
  const cardClass = [
    'overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-primary)] p-6 transition-all duration-200 ease-out',
    hoverable
      ? 'cursor-pointer hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[var(--shadow-lg)]'
      : '',
    className,
  ].join(' ');

  return (
    <div className={cardClass} onClick={onClick} style={style}>
      {children}
    </div>
  );
};
