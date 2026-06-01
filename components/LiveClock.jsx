'use client';
import { useEffect, useState } from 'react';

export default function LiveClock({ tz = 'America/Sao_Paulo', label = 'SÃO PAULO' }) {
  const [t, setT] = useState(null);
  useEffect(() => {
    setT(new Date());
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = t
    ? new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz, hour12: false }).format(t)
    : '--:--:--';
  return (
    <span className="hud-clock" suppressHydrationWarning>
      <span className="hud-dot" />
      {label} <span className="hud-mono">{fmt}</span>
    </span>
  );
}
