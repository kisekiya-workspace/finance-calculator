import React from 'react';
import styles from './Card.module.css';

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
    styles.card,
    hoverable ? styles.hoverable : '',
    className
  ].join(' ');

  return (
    <div className={cardClass} onClick={onClick} style={style}>
      {children}
    </div>
  );
};
