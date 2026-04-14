'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronUp, ChevronDown, Plus, Trash2, Copy, Code, Download, Layers, Move, Settings2, Columns, Rows } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RelatedTools } from '@/components/ui/RelatedTools';
import styles from './LayoutGenerator.module.css';

import { FAQSchema } from '@/components/ui/FAQSchema';
type GridArea = {
  id: string; // internal tracking ID
  name: string; // semantic dev name e.g. "header", "sidebar"
  colStart: number;
  rowStart: number;
  colEnd: number;
  rowEnd: number;
};

export default function LayoutGeneratorClient({ title, color }: { title?: string, color?: string }) {
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(5);
  const [colDefs, setColDefs] = useState<string[]>([]);
  const [rowDefs, setRowDefs] = useState<string[]>([]);
  const [gap, setGap] = useState(8);
  const [areas, setAreas] = useState<GridArea[]>([]);
  const [nextId, setNextId] = useState(1);

  // Initialize/Update definitions when count changes
  useEffect(() => {
    setColDefs(prev => {
      const next = [...prev];
      if (next.length < columns) {
        for (let i = next.length; i < columns; i++) next.push('1fr');
      } else if (next.length > columns) {
        return next.slice(0, columns);
      }
      return next;
    });
  }, [columns]);

  useEffect(() => {
    setRowDefs(prev => {
      const next = [...prev];
      if (next.length < rows) {
        for (let i = next.length; i < rows; i++) next.push('minmax(60px, auto)');
      } else if (next.length > rows) {
        return next.slice(0, rows);
      }
      return next;
    });
  }, [rows]);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('toolioz_layout_state');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setColumns(data.columns);
        setRows(data.rows);
        setGap(data.gap);
        setAreas(data.areas);
        setNextId(data.nextId);
        if (data.colDefs) setColDefs(data.colDefs);
        if (data.rowDefs) setRowDefs(data.rowDefs);
      } catch (e) {
        console.error("Failed to load layout state", e);
      }
    }
  }, []);

  useEffect(() => {
    const state = { columns, rows, gap, areas, nextId, colDefs, rowDefs };
    localStorage.setItem('toolioz_layout_state', JSON.stringify(state));
  }, [columns, rows, gap, areas, nextId, colDefs, rowDefs]);
  
  // Dragging state
  const [activeDrag, setActiveDrag] = useState<{ id: string, newColEnd: number, newRowEnd: number } | null>(null);
  
  const handleCreateArea = (col: number, row: number) => {
    // Prevent creating if an area completely covers this single cell (optional, but good UX)
    const isCovered = areas.some(a => 
      col >= a.colStart && col < a.colEnd && 
      row >= a.rowStart && row < a.rowEnd
    );
    if (isCovered) return;

    setAreas(prev => [...prev, {
      id: nextId.toString(),
      name: `box-${nextId}`, // default generated semantic name
      colStart: col,
      rowStart: row,
      colEnd: col + 1,
      rowEnd: row + 1
    }]);
    setNextId(prev => prev + 1);
  };

  const handleDeleteArea = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setAreas(prev => prev.filter(a => a.id !== id));
  };

  const handleRenameArea = (id: string, newName: string) => {
    setAreas(prev => prev.map(a => a.id === id ? { ...a, name: newName.replace(/[^a-zA-Z0-9_-]/g, '') } : a));
  };

  const resetGrid = () => {
    setAreas([]);
    setNextId(1);
  };

  const startResize = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Capture pointer to handle aggressive drags
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const area = areas.find(a => a.id === id);
    if (!area) return;
    
    const initialColEnd = area.colEnd;
    const initialRowEnd = area.rowEnd;

    setActiveDrag({ id, newColEnd: area.colEnd, newRowEnd: area.rowEnd });

    const onMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      // Cell width is 100px, height is 60px
      const colGrowth = Math.round(deltaX / (100 + gap));
      const rowGrowth = Math.round(deltaY / (60 + gap));

      let newColEnd = initialColEnd + colGrowth;
      let newRowEnd = initialRowEnd + rowGrowth;

      // Bound within grid
      newColEnd = Math.max(area.colStart + 1, Math.min(newColEnd, columns + 1));
      newRowEnd = Math.max(area.rowStart + 1, Math.min(newRowEnd, rows + 1));

      setActiveDrag({ id, newColEnd, newRowEnd });
    };

    const onUp = (upEvent: PointerEvent) => {
      (upEvent.target as HTMLElement).releasePointerCapture?.(upEvent.pointerId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      
      setActiveDrag(current => {
        if (current) {
          setAreas(prev => prev.map(a => 
            a.id === id ? { ...a, colEnd: current.newColEnd, rowEnd: current.newRowEnd } : a
          ));
        }
        return null;
      });
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };


  // Number spinner components matching screenshot specs
  const NumberInput = ({ label, value, setter }: { label: string, value: number, setter: (v: number) => void }) => (
    <div className={styles.controlGroup}>
      <label className={styles.controlLabel}>{label}</label>
      <div className={styles.controlInputWrapper}>
        <input 
          type="number" 
          className={styles.controlInput} 
          value={value} 
          onChange={(e) => setter(Number(e.target.value) || 1)}
          min={1} max={20}
        />
        <div className={styles.spinnerArrows}>
          <ChevronUp size={12} color="#1a1b1e" onClick={() => setter(Math.min(value + 1, 20))} />
          <ChevronDown size={12} color="#1a1b1e" onClick={() => setter(Math.max(value - 1, 1))} />
        </div>
      </div>
    </div>
  );

  // Generate code panels
  const [showCode, setShowCode] = useState<'html' | 'css' | null>(null);

  const generateHTML = () => {
    let html = `<!-- Responsive CSS Grid Layout -->\n`;
    html += `<section class="grid-layout" id="main-grid-layout">\n`;
    areas.forEach((a) => {
      const safeName = a.name.toLowerCase() || `item-${a.id}`;
      html += `  <article class="grid-item ${safeName}-area" id="${safeName}">\n`;
      html += `    <!-- ${a.name} Content -->\n`;
      html += `  </article>\n`;
    });
    html += `</section>`;
    return html;
  };

  const generateCSS = () => {
    let css = `/* --- Grid Container Setup --- */\n`;
    css += `.grid-layout {\n`;
    css += `  display: grid;\n`;
    css += `  grid-template-columns: ${colDefs.join(' ')};\n`;
    css += `  grid-template-rows: ${rowDefs.join(' ')};\n`;
    css += `  gap: ${gap}px;\n`;
    css += `}\n\n`;
    
    css += `/* --- Base Grid Item Styles --- */\n`;
    css += `.grid-item {\n`;
    css += `  background: rgba(255, 255, 255, 0.05);\n`;
    css += `  border: 1px solid rgba(255, 255, 255, 0.1);\n`;
    css += `  border-radius: 8px;\n`;
    css += `  padding: 1rem;\n`;
    css += `}\n\n`;

    css += `/* --- Grid Placement & Overlapping Controls --- */\n`;
    areas.forEach((a, index) => {
      const safeName = a.name.toLowerCase() || `item-${a.id}`;
      css += `.${safeName}-area {\n`;
      css += `  grid-column: ${a.colStart} / ${a.colEnd};\n`;
      css += `  grid-row: ${a.rowStart} / ${a.rowEnd};\n`;
      css += `  z-index: ${10 + index}; /* Determines stack order on overlap */\n`;
      css += `}\n\n`;
    });

    css += `/* --- Mobile Responsive Fallback --- */\n`;
    css += `@media (max-width: 768px) {\n`;
    css += `  .grid-layout {\n`;
    css += `    display: flex;\n`;
    css += `    flex-direction: column;\n`;
    css += `  }\n`;
    css += `}\n`;
    
    return css;
  };

  // Build tracks
  const tracks = [];
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= columns; c++) {
      tracks.push({ c, r });
    }
  }

  const containerStyle = {
    // For the UI, we visualize 1fr as roughly 100px and auto as 100px to maintain editability
    gridTemplateColumns: colDefs.map(d => d.includes('fr') || d === 'auto' ? '100px' : d).join(' '),
    gridTemplateRows: rowDefs.map(d => d.includes('fr') || d === 'auto' ? '60px' : d).join(' '),
    gap: `${gap}px`
  };

  const updateColDef = (index: number, val: string) => {
    setColDefs(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const updateRowDef = (index: number, val: string) => {
    setRowDefs(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  return (
    <div className={styles.appContainer}>
      
      <main className={styles.workspace}>
        {/* SEO Semantic Header Structure */}
        <header className={styles.seoHeader}>
          <h1 className={styles.title} id="layout-generator-title">Advanced CSS Grid Builder</h1>
          <p className={styles.description} id="layout-generator-desc">
            Construct semantic, pixel-perfect CSS Grid layouts with overlapping hierarchy control. Drag tracks visually and export robust, responsive HTML5 templates in seconds.
          </p>
        </header>

        {/* Top Controls */}
        <section className={styles.controlsHeader} aria-labelledby="grid-settings">
          <NumberInput label="Columns" value={columns} setter={setColumns} />
          <NumberInput label="Rows" value={rows} setter={setRows} />
          <NumberInput label="Gap(px)" value={gap} setter={setGap} />
        </section>

        {/* Track Editors */}
        <div className={styles.canvasScrollWrapper}>
          <div className={styles.trackEditorTop} style={{ gridTemplateColumns: containerStyle.gridTemplateColumns, gap: containerStyle.gap }}>
            {colDefs.map((def, i) => (
              <input key={`col-def-${i}`} className={styles.trackDefInput} value={def} onChange={(e) => updateColDef(i, e.target.value)} title={`Column ${i+1}`} />
            ))}
          </div>
          
          <div className={styles.canvasPivot}>
            <div className={styles.trackEditorLeft} style={{ gridTemplateRows: containerStyle.gridTemplateRows, gap: containerStyle.gap }}>
              {rowDefs.map((def, i) => (
                <input key={`row-def-${i}`} className={styles.trackDefInput} value={def} onChange={(e) => updateRowDef(i, e.target.value)} title={`Row ${i+1}`} />
              ))}
            </div>

            {/* CSS Grid Canvas */}
            <div className={styles.gridCanvasContainer} style={containerStyle}>
              {tracks.map((cell, idx) => (
                <div 
                  key={`track-${idx}`}
                  className={styles.trackCell}
                  style={{ gridColumn: `${cell.c} / ${cell.c + 1}`, gridRow: `${cell.r} / ${cell.r + 1}` }}
                  onClick={() => handleCreateArea(cell.c, cell.r)}
                >
                  +
                </div>
              ))}

              {areas.map(area => (
                <div 
                  key={`area-${area.id}`}
                  className={styles.gridArea}
                  id={`visual-area-${area.id}`}
                  style={{ 
                    gridColumn: `${area.colStart} / ${area.colEnd}`, 
                    gridRow: `${area.rowStart} / ${area.rowEnd}` 
                  }}
                >
                  <input 
                    type="text"
                    className={styles.areaNameInput}
                    value={area.name}
                    onChange={(e) => handleRenameArea(area.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="class-name"
                    aria-label="Grid Area CSS Class Name"
                  />
                  <div 
                    className={styles.deleteBtn} 
                    onClick={(e) => handleDeleteArea(e, area.id)}
                    aria-label="Delete Area"
                    role="button"
                    tabIndex={0}
                  >
                    <X size={12} />
                  </div>
                  <div 
                    className={styles.resizeHandle} 
                    onPointerDown={(e) => startResize(e, area.id)} 
                  />
                </div>
              ))}

              {activeDrag && (
                <div 
                  className={styles.ghostArea}
                  style={{
                    gridColumn: `${areas.find(a => a.id === activeDrag.id)?.colStart} / ${activeDrag.newColEnd}`,
                    gridRow: `${areas.find(a => a.id === activeDrag.id)?.rowStart} / ${activeDrag.newRowEnd}`,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actionsRow} style={{ maxWidth: columns * 100 + (columns - 1) * gap }}>
           <button className={styles.resetBtn} onClick={resetGrid}>Reset</button>
        </div>

        <div className={styles.outputRow}>
          <button className={styles.outputBtn} onClick={() => setShowCode(showCode === 'html' ? null : 'html')}>Copy HTML</button>
          <button className={styles.outputBtn} onClick={() => setShowCode(showCode === 'css' ? null : 'css')}>Copy CSS</button>
        </div>

        {showCode && (
          <div className={styles.modalBackdrop} onClick={() => setShowCode(null)}>
            <div className={styles.codeModal} onClick={e => e.stopPropagation()}>
              <button className={styles.closeCodeBtn} onClick={() => setShowCode(null)}>
                 <X size={20} />
              </button>
              <pre>
                {showCode === 'html' ? generateHTML() : generateCSS()}
              </pre>
            </div>
          </div>
        )}

        <RelatedTools currentToolId="layout-generator" categoryId="devtools" />
      </main>
      <Footer />
    </div>
  );
}
