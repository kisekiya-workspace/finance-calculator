'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Ruler, Weight, Thermometer, Database, ArrowRightLeft, Copy, Check } from 'lucide-react';


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
    <div className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
      <header className="bg-[radial-gradient(circle_at_100%_0%,rgba(37,99,235,0.05)_0%,transparent_50%)] py-16 text-center md:py-32">
        <div className="container">
          <div className="mb-8 inline-block rounded-full bg-[var(--primary-light)] px-4 py-2 text-[0.8125rem] font-bold uppercase tracking-widest text-[var(--primary)]">Precision Utility</div>
          <h1 className="mb-6 text-[2.5rem] font-black tracking-tight md:text-[3.5rem]">Unit <span className="text-[var(--primary)]">Converter</span></h1>
          <p className="mx-auto max-w-[650px] text-xl text-[var(--text-secondary)]">Scientific grade conversion for length, mass, temperature, and digital data.</p>
        </div>
      </header>

      <main className="container section">
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <button className={`flex cursor-pointer items-center gap-2 rounded-full border px-6 py-3 text-[0.9375rem] font-bold transition-all ${category === 'length' ? 'border-[var(--primary)] bg-[var(--primary)] text-white hover:text-white dark:bg-[var(--primary)]' : 'border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] dark:bg-[var(--bg-secondary)]'}`} onClick={() => setCategory('length')}>
            <Ruler size={18} /> Length
          </button>
          <button className={`flex cursor-pointer items-center gap-2 rounded-full border px-6 py-3 text-[0.9375rem] font-bold transition-all ${category === 'mass' ? 'border-[var(--primary)] bg-[var(--primary)] text-white hover:text-white dark:bg-[var(--primary)]' : 'border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] dark:bg-[var(--bg-secondary)]'}`} onClick={() => setCategory('mass')}>
            <Weight size={18} /> Mass
          </button>
          <button className={`flex cursor-pointer items-center gap-2 rounded-full border px-6 py-3 text-[0.9375rem] font-bold transition-all ${category === 'temperature' ? 'border-[var(--primary)] bg-[var(--primary)] text-white hover:text-white dark:bg-[var(--primary)]' : 'border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] dark:bg-[var(--bg-secondary)]'}`} onClick={() => setCategory('temperature')}>
            <Thermometer size={18} /> Temp
          </button>
          <button className={`flex cursor-pointer items-center gap-2 rounded-full border px-6 py-3 text-[0.9375rem] font-bold transition-all ${category === 'data' ? 'border-[var(--primary)] bg-[var(--primary)] text-white hover:text-white dark:bg-[var(--primary)]' : 'border-[var(--border)] bg-white text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] dark:bg-[var(--bg-secondary)]'}`} onClick={() => setCategory('data')}>
            <Database size={18} /> Data
          </button>
        </div>



        <div className="mx-auto grid max-w-[900px] grid-cols-1 items-center gap-8 md:grid-cols-[1fr_60px_1fr]">
          <Card className="flex flex-col gap-4 !p-5 md:!p-8">
            <div className="text-[0.75rem] font-extrabold uppercase tracking-widest text-[var(--text-tertiary)]">From</div>
            <select className="w-full cursor-pointer rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-base font-semibold capitalize text-[var(--text-primary)] outline-none" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {Object.keys(CONVERSIONS[category]).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <input 
              type="number"
              className="w-full rounded-md border border-[var(--border)] bg-white p-5 text-2xl font-extrabold text-[var(--text-primary)] outline-none dark:bg-[var(--bg-secondary)]"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              placeholder="Enter value"
            />
          </Card>

          <div className="mx-auto flex h-[60px] w-[60px] rotate-90 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] md:rotate-0">
            <ArrowRightLeft size={24} />
          </div>

          <Card className="flex flex-col gap-4 !p-5 md:!p-8">
            <div className="text-[0.75rem] font-extrabold uppercase tracking-widest text-[var(--text-tertiary)]">To</div>
            <select className="w-full cursor-pointer rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-base font-semibold capitalize text-[var(--text-primary)] outline-none" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {Object.keys(CONVERSIONS[category]).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <div className="flex items-center justify-between rounded-md bg-[#1e293b] p-5">
              <span className="break-all text-2xl font-extrabold text-white">{toValue || '0'}</span>
              {toValue && (
                <button className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border-none bg-white/10 text-white transition-all hover:bg-white/20" onClick={handleCopy}>
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
