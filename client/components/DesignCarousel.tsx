import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from "@/lib/utils";
import { Sparkles, ArrowUpRight, X, ChevronLeft, ChevronRight, Eye, MoveRight, PenTool, Code2, Palette, Layers, Smartphone, Globe, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Static data outside component — never recreated on re-render ──
const CATEGORIES = ["All", "Poster", "Banner", "UI", "Editorial"];

const ALL_ITEMS = [
  { id: 1, image: getAssetPath("images/projects/poster-design1-1.jpg"),   name: "Poster Design",   category: "Poster",   accent: "#FF6B6B" },
  { id: 8, image: getAssetPath("images/projects/fest_1.png"),              name: "UI Design",       category: "UI",       accent: "#007BFF" },
  { id: 2, image: getAssetPath("images/projects/poster-design2-1.jpg"),    name: "Event Poster",    category: "Poster",   accent: "#FFDE59" },
  { id: 4, image: getAssetPath("images/projects/banner-design2-1.jpg"),    name: "Web Banner",      category: "Banner",   accent: "#A0E7E5" },
  { id: 5, image: getAssetPath("images/projects/magazine-cover-1.jpg"),    name: "Magazine Cover",  category: "Editorial",accent: "#B8C0FF" },
  { id: 6, image: getAssetPath("images/projects/banner-design-1.jpg"),     name: "Promo Banner",    category: "Banner",   accent: "#FF9F9F" },
  { id: 3, image: getAssetPath("images/projects/poster-design3-1.jpg"),    name: "Artistic Poster", category: "Poster",   accent: "#FFDE59" },
  { id: 7, image: getAssetPath("images/projects/typographic-poster-1.jpg"),name: "Typography",     category: "Editorial",accent: "#FF6B6B" },
];

const DesignCarousel = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Refs for GSAP
  const sectionRef    = useRef<HTMLElement>(null);
  const tagRef        = useRef<HTMLDivElement>(null);
  const headingRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef   = useRef<HTMLParagraphElement>(null);
  const filterRowRef  = useRef<HTMLDivElement>(null);
  const cardsRowRef    = useRef<HTMLDivElement>(null);
  const bottomBarRef   = useRef<HTMLDivElement>(null);
  const scrollRef      = useRef<HTMLDivElement>(null);
  const servicesRowRef = useRef<HTMLDivElement>(null);

  // Stable memoized filter — only recomputes when activeFilter changes
  const filteredItems = useMemo(
    () => activeFilter === "All" ? ALL_ITEMS : ALL_ITEMS.filter(item => item.category === activeFilter),
    [activeFilter]
  );

  // ── GSAP SCROLL ANIMATIONS ──────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Badge tag — clip reveal from left
      if (tagRef.current) {
        gsap.fromTo(tagRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: tagRef.current, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // 2. Heading — word-by-word stagger (split by line)
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 60, opacity: 0, skewY: 3 },
          {
            y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 87%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // 3. Subtitle — fade slide
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15,
            scrollTrigger: { trigger: subtitleRef.current, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // 4. Filter pills — stagger pop-in from below
      if (filterRowRef.current) {
        const pills = filterRowRef.current.querySelectorAll('button');
        gsap.fromTo(pills,
          { y: 20, opacity: 0, scale: 0.85 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.5, ease: 'back.out(1.7)', stagger: 0.07,
            scrollTrigger: { trigger: filterRowRef.current, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // 5. Services row — stagger from below with scale
      if (servicesRowRef.current) {
        const chips = servicesRowRef.current.querySelectorAll('.service-chip');
        gsap.fromTo(chips,
          { y: 40, opacity: 0, scale: 0.88 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.55, ease: 'back.out(1.5)', stagger: 0.08,
            scrollTrigger: { trigger: servicesRowRef.current, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // 6. Cards — staggered slide-up with slight rotation
      if (cardsRowRef.current) {
        const cards = cardsRowRef.current.querySelectorAll('.design-card');
        gsap.fromTo(cards,
          { y: 80, opacity: 0, scale: 0.92, rotateZ: 1.5 },
          {
            y: 0, opacity: 1, scale: 1, rotateZ: 0,
            duration: 0.75, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRowRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // 5b. Subtle parallax on card images while scrolling
        const cardImgs = cardsRowRef.current.querySelectorAll<HTMLElement>('.card-img');
        cardImgs.forEach(img => {
          gsap.matchMedia().add('(min-width: 768px)', () => {
            gsap.fromTo(img,
              { yPercent: -8 },
              {
                yPercent: 8, ease: 'none',
                scrollTrigger: {
                  trigger: img.closest('.design-card') as Element,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.5,
                }
              }
            );
          });
        });
      }

      // 6. Bottom bar — fade up
      if (bottomBarRef.current) {
        gsap.fromTo(bottomBarRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: bottomBarRef.current, start: 'top 92%', toggleActions: 'play none none reverse' }
          }
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate cards when filter changes
  useEffect(() => {
    if (!cardsRowRef.current) return;
    const cards = cardsRowRef.current.querySelectorAll('.design-card');
    gsap.fromTo(cards,
      { y: 40, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.07 }
    );
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    setTimeout(updateScrollState, 100);
  }, [activeFilter]);

  // ── SCROLL STATE ────────────────────────────────────────────────────────────
  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, []); // scrollRef.current never changes — only attach listener once

  const scrollStrip = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' });
  };

  // ── LIGHTBOX ────────────────────────────────────────────────────────────────
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };
  const prevLightbox = () => setLightboxIndex(i => (i - 1 + filteredItems.length) % filteredItems.length);
  const nextLightbox = () => setLightboxIndex(i => (i + 1) % filteredItems.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, filteredItems.length]);

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <>
      <section ref={sectionRef} className="py-16 sm:py-24 bg-[#FCF9F8] relative overflow-hidden">

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] relative z-10">

          {/* ── HEADER ── */}
          <div className="mb-10 sm:mb-14">

            {/* Title block */}
            <div className="mb-6 sm:mb-8">
              <div ref={tagRef} className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-[4px_4px_0_0_#FFDE59]">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFDE59]" />
                Visual Playground
              </div>

              <h2 ref={headingRef} className="text-3xl sm:text-5xl lg:text-[58px] font-black text-black leading-none tracking-tight mb-3">
                Graphic &amp; <span className="relative inline-block">
                  UI Designs
                  <span className="absolute bottom-0.5 left-0 w-full h-2.5 sm:h-3 bg-[#FFDE59] -z-10 rounded" />
                </span>
              </h2>

              <p ref={subtitleRef} className="text-sm sm:text-base font-medium text-gray-600 max-w-sm border-l-4 border-black pl-4">
                A curated showcase of posters, banners, editorial layouts, and UI explorations.
              </p>
            </div>

            {/* Filter pills + works count — single row, horizontally scrollable on mobile */}
            <div className="flex items-center justify-between gap-3">
              <div
                ref={filterRowRef}
                className="flex gap-2 overflow-x-auto"
                style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`flex-none inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-2 border-black font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 ${
                      activeFilter === cat
                        ? 'bg-black text-white shadow-[3px_3px_0_0_#FFDE59] -translate-y-0.5'
                        : 'bg-white text-black shadow-[3px_3px_0_0_#000] hover:shadow-[5px_5px_0_0_#000] hover:-translate-y-1'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex-none flex items-center gap-1.5 text-sm font-bold text-gray-500">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                <span className="text-black text-base sm:text-lg font-black">{filteredItems.length}</span>
                <span className="hidden sm:inline">works</span>
              </div>
            </div>
          </div>

          {/* ── SERVICES STRIP ── */}
          <div ref={servicesRowRef} className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 w-8 bg-black" />
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-gray-500">What I do</p>
            </div>
            {/* 2-col on mobile → 3-col on sm → 6-col on lg */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              {[
                { icon: <PenTool className="w-4 h-4" />,    label: 'UI/UX Design',       sub: 'Figma · Prototyping',  bg: '#007BFF', text: '#fff' },
                { icon: <Sparkles className="w-4 h-4" />,   label: 'Product Design',      sub: 'Research · Strategy', bg: '#FFDE59', text: '#000' },
                { icon: <Palette className="w-4 h-4" />,    label: 'Graphic Design',      sub: 'Posters · Banners',   bg: '#FF6B6B', text: '#fff' },
                { icon: <Layers className="w-4 h-4" />,     label: 'Branding',            sub: 'Logo · Style Guides', bg: '#B8C0FF', text: '#000' },
                { icon: <Smartphone className="w-4 h-4" />, label: 'Mobile App Design',   sub: 'iOS · Android UI',    bg: '#A0E7E5', text: '#000' },
                { icon: <Globe className="w-4 h-4" />,      label: 'Web Design',          sub: 'Responsive · Modern', bg: '#FF9F9F', text: '#000' },
              ].map((svc, i) => (
                <div
                  key={i}
                  className="service-chip group flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-white border-2 border-black rounded-xl sm:rounded-2xl p-3 shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] hover:shadow-[5px_5px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                >
                  {/* Icon bubble */}
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: svc.bg, color: svc.text }}
                  >
                    {svc.icon}
                  </div>
                  {/* Labels */}
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-black text-black leading-tight mb-0.5 truncate">{svc.label}</p>
                    <p className="text-[9px] sm:text-[10px] font-medium text-gray-400 leading-none truncate hidden sm:block">{svc.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── HORIZONTAL SCROLL STRIP ── */}
          <div className="relative" ref={cardsRowRef}>

            {/* Left arrow */}
            <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FCF9F8] to-transparent z-10 flex items-center justify-start transition-opacity duration-300 pointer-events-none ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={() => scrollStrip('left')}
                className="pointer-events-auto w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0_0_#000] hover:bg-black hover:text-white transition-colors ml-1"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Right arrow */}
            <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FCF9F8] to-transparent z-10 flex items-center justify-end transition-opacity duration-300 pointer-events-none ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={() => scrollStrip('right')}
                className="pointer-events-auto w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0_0_#000] hover:bg-black hover:text-white transition-colors mr-1"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable row */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                .scroll-strip::-webkit-scrollbar { display: none; }
                .design-card { will-change: transform, opacity; }
                .card-img { will-change: transform; }
              `}</style>

              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="design-card group flex-none w-[230px] sm:w-[280px] md:w-[320px] cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0_0_#000] group-hover:shadow-[10px_10px_0_0_#000] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300">

                    {/* Image with parallax target */}
                    <div className="relative h-[180px] sm:h-[210px] md:h-[240px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="card-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="w-5 h-5 text-black" />
                        </div>
                      </div>
                      {/* Number badge */}
                      <div
                        className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-[10px] shadow-[2px_2px_0_0_#000]"
                        style={{ backgroundColor: item.accent }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Accent stripe */}
                    <div className="h-1.5 w-full" style={{ backgroundColor: item.accent }} />

                    {/* Card footer */}
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <span
                          className="inline-block text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-md border border-black mb-1.5"
                          style={{ backgroundColor: item.accent + '33', color: '#000' }}
                        >
                          {item.category}
                        </span>
                        <h3 className="font-black text-black text-sm leading-tight">{item.name}</h3>
                      </div>
                      <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Scroll hint — hidden on mobile */}
              <div className="hidden sm:flex flex-none w-[120px] lg:w-[140px] items-center justify-center">
                <div className="text-center space-y-3 opacity-40">
                  <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center mx-auto">
                    <MoveRight className="w-5 h-5 text-black" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-black">Scroll</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div ref={bottomBarRef} className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t-2 border-black">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-12 bg-black" />
              <p className="text-black font-bold text-xs uppercase tracking-[0.2em]">Crafted with Passion</p>
              <div className="h-0.5 w-12 bg-black" />
            </div>
            <div className="flex items-center gap-2">
              {["#FF6B6B", "#FFDE59", "#A0E7E5", "#B8C0FF", "#FF9F9F"].map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border-2 border-black shadow-[2px_2px_0_0_#000]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-[#FF6B6B] transition-colors"
          >
            <X className="w-5 h-5 text-black" strokeWidth={3} />
          </button>

          <button
            onClick={e => { e.stopPropagation(); prevLightbox(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-[#FFDE59] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-black" strokeWidth={3} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); nextLightbox(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-[#FFDE59] transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-black" strokeWidth={3} />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center gap-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <img
                src={filteredItems[lightboxIndex]?.image}
                alt={filteredItems[lightboxIndex]?.name}
                className="max-h-[70vh] w-auto object-contain rounded-2xl"
              />
            </div>
            <div className="flex items-center gap-3">
              <span
                className="inline-block text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-lg border-2 border-black shadow-[3px_3px_0_0_#fff]"
                style={{ backgroundColor: filteredItems[lightboxIndex]?.accent }}
              >
                {filteredItems[lightboxIndex]?.category}
              </span>
              <h3 className="text-white font-black text-lg sm:text-xl">
                {filteredItems[lightboxIndex]?.name}
              </h3>
              <span className="text-white/40 font-mono text-sm">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignCarousel;
