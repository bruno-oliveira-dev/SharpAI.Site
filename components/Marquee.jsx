'use client';
import { memo } from 'react';

function Marquee({ items, speed = 28, direction = 'left', className = '', separator = '—' }) {
  const all = [...items, ...items, ...items];
  const anim = direction === 'right' ? 'marquee-r' : 'marquee-l';
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ animation: `${anim} ${speed}s linear infinite` }}>
        {all.map((w, i) => (
          <span key={i} className="marquee-item">
            <span>{w}</span>
            <span className="marquee-sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(Marquee);
