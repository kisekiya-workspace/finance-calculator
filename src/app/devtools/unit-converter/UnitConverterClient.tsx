'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Ruler, Weight, Thermometer, Database, ArrowRightLeft, Copy, Check } from 'lucide-react';
import styles from './page.module.css';

import { FAQSchema } from '@/components/ui/FAQSchema';
import { RelatedTools } from '@/components/ui/RelatedTools';
type UnitCategory = 'length' | 'mass' | 'temperature' | 'data';

const CONVERSIONS: Record<UnitCategory, any> = {
  length: {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    millimeters: 0.001,
    miles: 1609.34,
    yards: 0.9144,
    feet: 0.3048,
    inches: 0.0254,
  },
  mass: {
    kilograms: 1,
    grams: 0.001,
    milligrams: 0.000001,
    pounds: 0.453592,
    ounces: 0.0283495,
  },
  temperature: {
    celsius: 'C',
    fahrenheit: 'F',
    kelvin: 'K',
  },
  data: {
    bytes: 1,
    kilobytes: 1024,
    megabytes: 1024**2,
    gigabytes: 1024**3,
    terabytes: 1024**4,
  }
};

export default function UnitConverterClient() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [fromValue, setFromValue] = useState<string>('1');
  const [toValue, setToValue] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const units = Object.keys(CONVERSIONS[category]);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }, [category]);

  useEffect(() => {
    handleConvert();
  }, [fromValue, fromUnit, toUnit, category]);

  const handleConvert = () => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) {
      setToValue('');
      return;
    }

    if (category === 'temperature') {
      let celsius = val;
      if (fromUnit === 'fahrenheit') celsius = (val - 32) * 5/9;
      if (fromUnit === 'kelvin') celsius = val - 273.15;

      let result = celsius;
      if (toUnit === 'fahrenheit') result = (celsius * 9/5) + 32;
      if (toUnit === 'kelvin') result = celsius + 273.15;
      
      setToValue(result.toFixed(2));
      return;
    }

    const fromFactor = CONVERSIONS[category][fromUnit];
    const toFactor = CONVERSIONS[category][toUnit];
    const result = (val * fromFactor) / toFactor;
    
    setToValue(result > 0.00001 ? result.toString() : result.toExponential(4));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(toValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.badge}>Precision Utility</div>
          <h1 className={styles.title}>Unit <span className={styles.accent}>Converter</span></h1>
          <p className={styles.subtitle}>Scientific grade conversion for length, mass, temperature, and digital data.</p>
        </div>
      </header>

      <main className="container section">
        <div className={styles.categoryTabs}>
          <button className={`${styles.tab} ${category === 'length' ? styles.activeTab : ''}`} onClick={() => setCategory('length')}>
            <Ruler size={18} /> Length
          </button>
          <button className={`${styles.tab} ${category === 'mass' ? styles.activeTab : ''}`} onClick={() => setCategory('mass')}>
            <Weight size={18} /> Mass
          </button>
          <button className={`${styles.tab} ${category === 'temperature' ? styles.activeTab : ''}`} onClick={() => setCategory('temperature')}>
            <Thermometer size={18} /> Temp
          </button>
          <button className={`${styles.tab} ${category === 'data' ? styles.activeTab : ''}`} onClick={() => setCategory('data')}>
            <Database size={18} /> Data
          </button>
        </div>

        <div className={styles.converterGrid}>
          <Card className={styles.card}>
            <div className={styles.cardInfo}>From</div>
            <select className={styles.select} value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {Object.keys(CONVERSIONS[category]).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <input 
              type="number"
              className={styles.input}
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              placeholder="Enter value"
            />
          </Card>

          <div className={styles.swapBtn}>
            <ArrowRightLeft size={24} />
          </div>

          <Card className={styles.card}>
            <div className={styles.cardInfo}>To</div>
            <select className={styles.select} value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {Object.keys(CONVERSIONS[category]).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <div className={styles.resultDisplay}>
              <span className={styles.resultValue}>{toValue || '0'}</span>
              {toValue && (
                <button className={styles.copyBtn} onClick={handleCopy}>
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                </button>
              )}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
