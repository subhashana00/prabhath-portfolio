import React, { useState, useEffect, useRef } from 'react';
import { getAssetPath } from "@/lib/utils";
import { Sparkles, ArrowUpRight, X, ChevronLeft, ChevronRight, Eye, Layers, PenTool, Palette } from "lucide-react";

const DesignCarousel = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ["All", "Poster", "Banner", "UI", "Editorial"];

  const items = [
    {
      id: 1,
      image: getAssetPath("images/projects/poster-design1-1.jpg"),
      name: "Poster Design",
      desc: "Creative poster visualization with bold colors and dynamic composition.",
      category: "Poster",
      color: "#FF6B6B",
      span: "col-span-1 row-span-2",
      size: "tall"
    },
    {
      id: 8,
      image: getAssetPath("images/projects/fest_1.png"),
      name: "UI Design",
      desc: "Creative UI/UX design exploration for event management.",
      category: "UI",
      color: "#007BFF",
      span: "col-span-2 row-span-1",
      size: "wide"
    },
    {
      id: 2,
      image: getAssetPath("images/projects/poster-design2-1.jpg"),
      name: "Event Poster",
      desc: "Modern event promotion design with striking typography.",
      category: "Poster",
      color: "#FFDE59",
      span: "col-span-1 row-span-1",
      size: "normal"
    },
    {
      id: 4,
      image: getAssetPath("images/projects/banner-design2-1.jpg"),
      name: "Web Banner",
      desc: "Digital marketing banner layout with conversion-focused design.",
      category: "Banner",
      color: "#A0E7E5",
      span: "col-span-1 row-span-1",
      size: "normal"
    },
    {
      id: 5,
      image: getAssetPath("images/projects/magazine-cover-1.jpg"),
      name: "Magazine Cover",
      desc: "Editorial layout and typography for print media.",
      category: "Editorial",
      color: "#B8C0FF",
      span: "col-span-1 row-span-2",
      size: "tall"
    },
    {
      id: 6,
      image: getAssetPath("images/projects/banner-design-1.jpg"),
      name: "Promo Banner",
      desc: "Advertising campaign visual for brand awareness.",
      category: "Banner",
      color: "#FF9F9F",
      span: "col-span-2 row-span-1",
      size: "wide"
    },
    {
      id: 3,
      image: getAssetPath("images/projects/poster-design3-1.jpg"),
      name: "Artistic Poster",
      desc: "Abstract artistic composition with experimental form.",
      category: "Poster",
      color: "#FFDE59",
      span: "col-span-1 row-span-1",
      size: "normal"
    },
    {
      id: 7,
      image: getAssetPath("images/projects/typographic-poster-1.jpg"),
      name: "Typography",
      desc: "Experimental typographic design pushing boundaries.",
      category: "Editorial",
      color: "#FF6B6B",
      span: "col-span-1 row-span-1",
      size: "normal"
    }
  ];

  const filteredItems = activeFilter === "All" 
    ? items 
    : items.filter(item => item.category === activeFilter);

  // Intersection observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };
  const prevLightbox = () => setLightboxIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length);
  const nextLightbox = () => setLightboxIndex((i) => (i + 1) % filteredItems.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, filteredItems.length]);

  const marqueeText = "GRAPHIC DESIGN • UI DESIGN • POSTERS • BANNERS • TYPOGRAPHY • EDITORIAL • ";

  const categoryIcons: Record<string, React.ReactNode> = {
    "All": <Layers className="w-3.5 h-3.5" />,
    "Poster": <PenTool className="w-3.5 h-3.5" />,
    "Banner": <ArrowUpRight className="w-3.5 h-3.5" />,
    "UI": <Sparkles className="w-3.5 h-3.5" />,
    "Editorial": <Palette className="w-3.5 h-3.5" />,
  };

  return (
    <>
    <section ref={sectionRef} className="py-16 sm:py-24 bg-[#1A1A2E] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      </div>
      
      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-[8%] w-20 h-20 border-[3px] border-[#FFDE59]/30 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-32 right-[6%] w-14 h-14 bg-[#FF6B6B]/20 rotate-45 border-[3px] border-[#FF6B6B]/30 hidden lg:block"></div>
      <div className="absolute top-1/2 left-[3%] w-3 h-3 bg-[#A0E7E5] rounded-full hidden sm:block animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-[30%] right-[12%] w-4 h-4 border-2 border-[#B8C0FF]/40 rounded-full hidden sm:block"></div>
      <div className="absolute bottom-[20%] left-[15%] w-6 h-6 border-2 border-[#FFDE59]/20 rotate-12 hidden lg:block"></div>

      {/* === INFINITE MARQUEE TITLE === */}
      <div className="relative mb-12 sm:mb-16 overflow-hidden border-y-[3px] border-white/10 py-4 sm:py-6 bg-black/20 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white/[0.08] uppercase tracking-wider mx-0 select-none flex-shrink-0">
              {marqueeText}
            </span>
          ))}
        </div>
        {/* Overlay title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFDE59] border-[3px] border-black rounded-full mb-3 sm:mb-4 shadow-[4px_4px_0_0_#000] transform -rotate-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Visual Playground</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
              GRAPHIC <span className="text-[#FFDE59]">&</span> UI DESIGNS
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-[1600px] relative z-10">
        
        {/* === FILTER TABS + COUNTER === */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-[3px] border-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[3px_3px_0_0_#000] hover:shadow-[5px_5px_0_0_#000] hover:-translate-y-0.5 ${
                  activeFilter === cat
                    ? 'bg-[#FFDE59] text-black scale-105'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>
          
          {/* Counter badge */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm border-[3px] border-white/20 rounded-full px-5 py-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#A0E7E5] rounded-full animate-pulse"></div>
              <span className="text-white/70 font-bold text-sm">
                <span className="text-white text-lg font-black">{filteredItems.length}</span> works
              </span>
            </div>
          </div>
        </div>

        {/* === BENTO GRID === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 auto-rows-[220px] sm:auto-rows-[250px] lg:auto-rows-[240px]">
          {filteredItems.map((item, index) => {
            const gridClass = 
              item.size === 'tall' ? 'sm:row-span-2' :
              item.size === 'wide' ? 'sm:col-span-2' :
              '';
            
            return (
              <div
                key={item.id}
                className={`${gridClass} group relative cursor-pointer transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100 + 300}ms` : '0ms' }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => openLightbox(index)}
              >
                {/* Shadow layer */}
                <div 
                  className="absolute inset-0 rounded-[20px] sm:rounded-[24px] transition-all duration-500"
                  style={{ 
                    backgroundColor: item.color, 
                    transform: hoveredCard === item.id 
                      ? 'translate(8px, 8px)' 
                      : 'translate(5px, 5px)',
                  }}
                ></div>

                {/* Card */}
                <div 
                  className={`absolute inset-0 border-[3px] border-black rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#0D0D1A] transition-all duration-500 ${
                    hoveredCard === item.id ? '-translate-x-[2px] -translate-y-[2px]' : ''
                  }`}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredCard === item.id ? 'scale-110 brightness-50' : 'scale-100 brightness-75'
                    }`}
                    loading="lazy"
                  />

                  {/* Always-visible label at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <span 
                          className="inline-block text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-0.5 rounded-full border-2 border-black mb-2 shadow-[2px_2px_0_0_#000]"
                          style={{ backgroundColor: item.color, color: '#000' }}
                        >
                          {item.category}
                        </span>
                        <h3 className="text-white font-black text-base sm:text-lg lg:text-xl leading-tight tracking-tight">
                          {item.name}
                        </h3>
                      </div>
                      <div 
                        className={`flex-shrink-0 w-10 h-10 rounded-full border-[3px] border-black flex items-center justify-center shadow-[3px_3px_0_0_#000] transition-all duration-300 ${
                          hoveredCard === item.id 
                            ? 'opacity-100 translate-y-0 rotate-0' 
                            : 'opacity-0 translate-y-4 rotate-45'
                        }`}
                        style={{ backgroundColor: item.color }}
                      >
                        <Eye className="w-4 h-4 text-black" />
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay content */}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 ${
                      hoveredCard === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className={`text-center transform transition-all duration-500 ${
                      hoveredCard === item.id ? 'translate-y-0 scale-100' : 'translate-y-6 scale-95'
                    }`}>
                      <p className="text-white/90 text-sm sm:text-base font-medium max-w-[280px] mx-auto leading-relaxed mb-4">
                        {item.desc}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full border-[3px] border-black font-black text-xs uppercase tracking-wider shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 transition-all duration-200">
                        <Eye className="w-3.5 h-3.5" />
                        View Full
                      </div>
                    </div>
                  </div>

                  {/* Corner number tag */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <div 
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[3px] border-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0_0_#000] transition-all duration-300 ${
                        hoveredCard === item.id ? 'rotate-12 scale-110' : ''
                      }`}
                      style={{ backgroundColor: item.color }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* === BOTTOM DECORATIVE BAR === */}
        <div className={`mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-[3px] w-12 sm:w-20 bg-[#FFDE59]"></div>
            <p className="text-white/50 font-bold text-xs sm:text-sm uppercase tracking-[0.2em]">
              Crafted with Passion
            </p>
            <div className="h-[3px] w-12 sm:w-20 bg-[#FFDE59]"></div>
          </div>
          <div className="flex items-center gap-2">
            {["#FF6B6B", "#FFDE59", "#A0E7E5", "#B8C0FF", "#FF9F9F"].map((color, i) => (
              <div 
                key={i} 
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]"
                style={{ backgroundColor: color, animationDelay: `${i * 200}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee keyframes injected via style tag */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>

    {/* === LIGHTBOX MODAL === */}
    {lightboxOpen && (
      <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={closeLightbox}>
        {/* Close */}
        <button 
          onClick={closeLightbox}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-12 h-12 bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-[#FF6B6B] transition-colors"
        >
          <X className="w-5 h-5 text-black" strokeWidth={3} />
        </button>

        {/* Navigation Arrows */}
        <button 
          onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-[#FFDE59] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-black" strokeWidth={3} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-[#FFDE59] transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-black" strokeWidth={3} />
        </button>

        {/* Image + Info */}
        <div className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <div className="relative rounded-[20px] overflow-hidden border-[3px] border-white/20 shadow-2xl">
            <img
              src={filteredItems[lightboxIndex]?.image}
              alt={filteredItems[lightboxIndex]?.name}
              className="max-h-[70vh] w-auto object-contain rounded-[18px]"
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span 
              className="inline-block text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full border-2 border-black shadow-[3px_3px_0_0_#000]"
              style={{ backgroundColor: filteredItems[lightboxIndex]?.color }}
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
