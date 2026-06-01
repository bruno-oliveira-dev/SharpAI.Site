// components/ui/cinematic-landing-hero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Grain overlay */
  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
  }

  /* HUD grid */
  .bg-grid-theme {
    background-size: 56px 56px;
    background-image:
      linear-gradient(to right, rgba(255,107,0,0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,107,0,0.06) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
  }

  /* ── TEXTOS FORA DO CARD ── */
  .text-3d-matte {
    color: var(--color-foreground);
    text-shadow:
      0 10px 30px rgba(255,107,0,0.15),
      0 2px 4px rgba(0,0,0,0.6);
  }

  .text-silver-matte {
    background: linear-gradient(170deg, #FF6B00 0%, #F2F2F4 45%, #00E5FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 8px 20px rgba(255,107,0,0.3))
      drop-shadow(0px 2px 4px rgba(0,0,0,0.8));
  }

  /* ── TEXTOS DENTRO DO CARD ── */
  .text-card-silver-matte {
    background: linear-gradient(170deg, #FF6B00 0%, #F2F2F4 55%, #00E5FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 10px 24px rgba(255,107,0,0.5))
      drop-shadow(0px 4px 8px rgba(0,0,0,0.9));
  }

  /* ── CARD PRINCIPAL ── */
  .premium-depth-card {
    background: linear-gradient(145deg, #12100E 0%, #08080A 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.95),
      0 0 0 1px rgba(255,107,0,0.12),
      inset 0 1px 0 rgba(255,107,0,0.08),
      inset 0 -2px 4px rgba(0,0,0,0.9);
    position: relative;
  }

  /* Reflexo dinâmico laranja/ciano */
  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255,107,0,0.07) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Borda luminosa laranja no topo do card */
  .premium-depth-card::before {
    content: '';
    position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,107,0,0.5), transparent);
    z-index: 1;
  }

  /* ── MOCKUP DE DISPOSITIVO ── */
  .device-bezel {
    background-color: #0C0C0C;
    box-shadow:
      inset 0 0 0 2px #2A2A2A,
      inset 0 0 0 6px #080808,
      0 40px 80px -15px rgba(0,0,0,0.95),
      0 0 0 1px rgba(255,107,0,0.1);
    transform-style: preserve-3d;
  }

  .hardware-btn {
    background: linear-gradient(90deg, #303030 0%, #141414 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.08);
    border-left: 1px solid rgba(255,255,255,0.04);
  }

  .screen-glare {
    background: linear-gradient(120deg, rgba(255,107,0,0.04) 0%, rgba(255,255,255,0) 40%);
  }

  /* Widgets HUD dentro da tela */
  .widget-depth {
    background: linear-gradient(180deg, rgba(255,107,0,0.04) 0%, rgba(0,0,0,0.2) 100%);
    box-shadow:
      0 8px 16px rgba(0,0,0,0.4),
      inset 0 1px 0 rgba(255,107,0,0.08),
      inset 0 -1px 1px rgba(0,0,0,0.6);
    border: 1px solid rgba(255,107,0,0.08);
  }

  /* Badges flutuantes */
  .floating-ui-badge {
    background: linear-gradient(135deg, rgba(255,107,0,0.08) 0%, rgba(0,0,0,0.6) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 0 0 1px rgba(255,107,0,0.2),
      0 20px 40px -8px rgba(0,0,0,0.8),
      inset 0 1px 0 rgba(255,107,0,0.15);
  }

  /* ── BOTÕES CTA ── */
  .btn-modern-light, .btn-modern-dark {
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  /* Botão primário: laranja SharpAI */
  .btn-modern-light {
    background: linear-gradient(180deg, #FF6B00 0%, #B84F00 100%);
    color: #FFFFFF;
    box-shadow:
      0 0 0 1px rgba(255,107,0,0.3),
      0 2px 4px rgba(0,0,0,0.4),
      0 12px 24px -4px rgba(255,107,0,0.4),
      inset 0 1px 1px rgba(255,180,100,0.4),
      inset 0 -3px 6px rgba(0,0,0,0.3);
  }
  .btn-modern-light:hover {
    transform: translateY(-3px);
    box-shadow:
      0 0 0 1px rgba(255,107,0,0.4),
      0 6px 12px -2px rgba(255,107,0,0.3),
      0 20px 40px -6px rgba(255,107,0,0.5),
      inset 0 1px 1px rgba(255,180,100,0.4),
      inset 0 -3px 6px rgba(0,0,0,0.3);
  }
  .btn-modern-light:active {
    transform: translateY(1px);
    background: linear-gradient(180deg, #B84F00 0%, #8A3A00 100%);
    box-shadow: 0 0 0 1px rgba(255,107,0,0.2), inset 0 3px 6px rgba(0,0,0,0.4);
  }

  /* Botão secundário: escuro com borda ciano */
  .btn-modern-dark {
    background: linear-gradient(180deg, #15151A 0%, #0F0F12 100%);
    color: #00E5FF;
    box-shadow:
      0 0 0 1px rgba(0,229,255,0.25),
      0 2px 4px rgba(0,0,0,0.8),
      0 12px 24px -4px rgba(0,0,0,0.9),
      inset 0 1px 0 rgba(0,229,255,0.1);
  }
  .btn-modern-dark:hover {
    transform: translateY(-3px);
    background: linear-gradient(180deg, #1E1E24 0%, #15151A 100%);
    box-shadow:
      0 0 0 1px rgba(0,229,255,0.4),
      0 6px 12px -2px rgba(0,229,255,0.1),
      0 20px 32px -6px rgba(0,0,0,1),
      inset 0 1px 0 rgba(0,229,255,0.15);
  }
  .btn-modern-dark:active {
    transform: translateY(1px);
    background: #0F0F12;
    box-shadow: 0 0 0 1px rgba(0,229,255,0.15), inset 0 3px 8px rgba(0,0,0,0.9);
  }

  /* Progress ring */
  .progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }

  /* Scanline sutil dentro da tela */
  .screen-scanlines {
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0,0,0,0.08) 3px,
      rgba(0,0,0,0.08) 4px
    );
    pointer-events: none;
  }

  /* Status dot pulsante laranja */
  .status-dot-orange {
    width: 6px; height: 6px; border-radius: 50%;
    background: #FF6B00;
    box-shadow: 0 0 8px rgba(255,107,0,0.9);
    animation: pulse-orange 2s ease-in-out infinite;
  }
  @keyframes pulse-orange {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(255,107,0,0.9); }
    50%       { opacity: 0.6; box-shadow: 0 0 4px rgba(255,107,0,0.4); }
  }

  /* Linha de log animada */
  .log-line {
    font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
    font-size: 9px;
    line-height: 1.6;
    letter-spacing: 0.02em;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export function CinematicHero({
  brandName = "SharpAI",
  tagline1 = "Engenharia que pensa,",
  tagline2 = "código que entrega.",
  cardHeading = "IA em produção, não em tese.",
  cardDescription = (
    <>
      <span className="font-semibold" style={{ color: "#FF6B00" }}>SharpAI</span>{" "}
      é um estúdio de engenharia de IA e automação. Sistemas testáveis,
      observáveis e em produção — para times que medem deploy, não slides.
    </>
  ),
  metricValue = 40,
  metricLabel = "Sistemas · Produção",
  ctaHeading = "Pronto para construir?",
  ctaDescription = "Aceitando 2 projetos por trimestre. Diagnóstico em 5 dias, spike funcional em 2 semanas, produto em produção em 8.",
  primaryCtaLabel = "Iniciar projeto",
  primaryCtaHref = "#contato",
  secondaryCtaLabel = "Ver cases",
  secondaryCtaHref = "#trabalho",
  className,
  ...props
}: CinematicHeroProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12, rotationX: -yVal * 12,
            ease: "power3.out", duration: 1.2,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(requestRef.current); };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set(".text-track",    { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days",     { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card",     { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper",   { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days",  { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", end: "+=7000",
          pin: true, scrub: 1, anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.15, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget",  { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring",     { strokeDashoffset: 50, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val",       { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge",{ y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text",{ x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text",{ x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "28px" : "36px",
          ease: "expo.inOut", duration: 1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);
    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />

      {/* ── CAMADA 1: Taglines ── */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        {/* Label HUD acima */}
        <div className="gsap-reveal text-track mb-6 flex items-center gap-2 text-xs tracking-[0.22em] uppercase" style={{ color: "#FF6B00", fontFamily: "'JetBrains Mono', monospace" }}>
          <span className="status-dot-orange" />
          Estúdio · SP · Aceitando projetos
        </div>
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      {/* ── CAMADA 2: CTAs finais ── */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        {/* Rótulo HUD */}
        <div className="mb-6 flex items-center gap-2 text-xs tracking-[0.2em] uppercase" style={{ color: "#FF6B00", fontFamily: "'JetBrains Mono', monospace" }}>
          <span className="status-dot-orange" />
          [ 03 / Próximo passo ]
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
          {ctaHeading}
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed" style={{ color: "#8A8A95" }}>
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Botão primário laranja */}
          <a
            href={primaryCtaHref}
            className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ focusRingColor: "#FF6B00" } as React.CSSProperties}
          >
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-lg font-bold tracking-tight">{primaryCtaLabel}</span>
          </a>
          {/* Botão secundário ciano */}
          <a
            href={secondaryCtaHref}
            className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-lg font-bold tracking-tight">{secondaryCtaLabel}</span>
          </a>
        </div>
      </div>

      {/* ── CAMADA 3: Card principal ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[28px] md:rounded-[36px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* ── DIREITA / TOPO mobile: Nome da marca ── */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte">
                {brandName}
              </h2>
            </div>

            {/* ── CENTRO: Mockup do dispositivo ── */}
            <div
              className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center scale-[0.65] md:scale-[0.85] lg:scale-100">

                {/* Bezel do dispositivo */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] device-bezel flex flex-col will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Botões físicos */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0" aria-hidden="true" />

                  {/* Tela */}
                  <div
                    className="absolute inset-[6px] rounded-[2.5rem] overflow-hidden text-white z-10"
                    style={{ background: "#07080A", boxShadow: "inset 0 0 20px rgba(0,0,0,1)" }}
                  >
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />
                    <div className="absolute inset-0 screen-scanlines z-30 pointer-events-none opacity-30" aria-hidden="true" />

                    {/* Dynamic Island */}
                    <div
                      className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3"
                      style={{ boxShadow: "inset 0 -1px 2px rgba(255,107,0,0.1)" }}
                    >
                      <div className="status-dot-orange" />
                    </div>

                    {/* Interface do Agent Monitor */}
                    <div className="relative w-full h-full pt-12 px-4 pb-6 flex flex-col">

                      {/* Header */}
                      <div className="phone-widget flex justify-between items-center mb-5">
                        <div className="flex flex-col">
                          <span className="text-[9px] tracking-[0.2em] uppercase font-bold mb-0.5 log-line" style={{ color: "#FF6B00" }}>
                            [ Agent Monitor ]
                          </span>
                          <span className="text-base font-bold tracking-tight" style={{ color: "#F2F2F4" }}>
                            prod · v2.1.0
                          </span>
                        </div>
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs border"
                          style={{
                            background: "rgba(255,107,0,0.1)",
                            borderColor: "rgba(255,107,0,0.25)",
                            color: "#FF6B00",
                          }}
                        >
                          S/
                        </div>
                      </div>

                      {/* Progress ring: SLA */}
                      <div className="phone-widget relative w-40 h-40 mx-auto flex items-center justify-center mb-5" style={{ filter: "drop-shadow(0 12px 20px rgba(255,107,0,0.25))" }}>
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(255,107,0,0.07)" strokeWidth="10" />
                          <circle className="progress-ring" cx="80" cy="80" r="64" fill="none" stroke="#FF6B00" strokeWidth="10" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter" style={{ color: "#F2F2F4" }}>0</span>
                          <span className="text-[8px] uppercase tracking-[0.12em] font-bold mt-0.5 log-line" style={{ color: "rgba(255,107,0,0.6)" }}>
                            {metricLabel}
                          </span>
                        </div>
                      </div>

                      {/* Build log */}
                      <div className="space-y-2">
                        <div className="phone-widget widget-depth rounded-xl p-2.5 flex items-start gap-2.5">
                          <div
                            className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: "#FF6B00", boxShadow: "0 0 6px rgba(255,107,0,0.8)" }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="log-line truncate" style={{ color: "#FF6B00" }}>
                              deploy(prod): v2.1.0 → healthy
                            </p>
                            <p className="log-line" style={{ color: "rgba(242,242,244,0.3)" }}>18:42 · 99.97% uptime</p>
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-xl p-2.5 flex items-start gap-2.5">
                          <div
                            className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: "#00E5FF", boxShadow: "0 0 6px rgba(0,229,255,0.7)" }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="log-line truncate" style={{ color: "#00E5FF" }}>
                              eval(copilot): 94% pass
                            </p>
                            <p className="log-line" style={{ color: "rgba(242,242,244,0.3)" }}>18:31 · 312 runs</p>
                          </div>
                        </div>
                      </div>

                      {/* Home indicator */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] rounded-full" style={{ background: "rgba(255,107,0,0.2)" }} />
                    </div>
                  </div>
                </div>

                {/* Badge flutuante esquerda: Deploy */}
                <div className="floating-badge absolute flex top-8 left-[-12px] lg:left-[-72px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center border flex-shrink-0"
                    style={{ background: "rgba(255,107,0,0.1)", borderColor: "rgba(255,107,0,0.3)" }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="#FF6B00" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm font-bold tracking-tight" style={{ color: "#F2F2F4" }}>Deploy · healthy</p>
                    <p className="text-[10px] lg:text-xs font-medium log-line" style={{ color: "rgba(255,107,0,0.6)" }}>99.97% SLA · 90d</p>
                  </div>
                </div>

                {/* Badge flutuante direita: Eval */}
                <div className="floating-badge absolute flex bottom-14 lg:bottom-24 right-[-12px] lg:right-[-72px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center border flex-shrink-0"
                    style={{ background: "rgba(0,229,255,0.08)", borderColor: "rgba(0,229,255,0.25)" }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="#00E5FF" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm font-bold tracking-tight" style={{ color: "#F2F2F4" }}>Eval · 94% pass</p>
                    <p className="text-[10px] lg:text-xs font-medium log-line" style={{ color: "rgba(0,229,255,0.6)" }}>312 runs · agente</p>
                  </div>
                </div>

              </div>
            </div>

            {/* ── ESQUERDA / BAIXO mobile: Copy da marca ── */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              {/* Label HUD */}
              <div className="mb-3 text-[10px] tracking-[0.22em] uppercase log-line" style={{ color: "#FF6B00" }}>
                [ 01 / Sobre ]
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-5 tracking-tight" style={{ color: "#F2F2F4" }}>
                {cardHeading}
              </h3>
              <p className="hidden md:block text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none" style={{ color: "rgba(242,242,244,0.55)" }}>
                {cardDescription}
              </p>
              {/* Mini stats */}
              <div className="hidden lg:flex items-center gap-6 mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,107,0,0.12)" }}>
                <div>
                  <div className="text-2xl font-black" style={{ color: "#FF6B00" }}>40+</div>
                  <div className="text-[10px] tracking-widest uppercase log-line" style={{ color: "rgba(242,242,244,0.35)" }}>sistemas</div>
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ color: "#00E5FF" }}>99.8%</div>
                  <div className="text-[10px] tracking-widest uppercase log-line" style={{ color: "rgba(242,242,244,0.35)" }}>SLA</div>
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ color: "#F2F2F4" }}>12</div>
                  <div className="text-[10px] tracking-widest uppercase log-line" style={{ color: "rgba(242,242,244,0.35)" }}>clientes recorrentes</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
