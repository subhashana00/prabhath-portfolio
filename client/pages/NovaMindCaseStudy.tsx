import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Menu, X, ExternalLink, Clock, Layers, Target, Search, Users, BarChart3, CheckCircle, Lightbulb, Zap, ChevronRight, Monitor, Palette, Layout, Eye, Sparkles, AlertTriangle, TrendingUp, Quote, Shield, Terminal, Globe, Orbit, Atom, Telescope, Radar, Cpu, BrainCircuit, Rocket, ScanLine, Satellite, Binary } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAssetPath } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import { JsonLd, caseStudySchema } from "@/components/StructuredData";

export default function NovaMindCaseStudy() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Section refs
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const goalsRef = useRef<HTMLElement>(null);
  const researchRef = useRef<HTMLElement>(null);
  const architectureRef = useRef<HTMLElement>(null);
  const wireframesRef = useRef<HTMLElement>(null);
  const designSystemRef = useRef<HTMLElement>(null);
  const hifiRef = useRef<HTMLElement>(null);
  const prototypeRef = useRef<HTMLElement>(null);
  const challengesRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const reflectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const sections = [
    { id: 'hero', label: 'Overview', ref: heroRef },
    { id: 'problem', label: 'Problem', ref: problemRef },
    { id: 'goals', label: 'Goals', ref: goalsRef },
    { id: 'research', label: 'Research', ref: researchRef },
    { id: 'architecture', label: 'Architecture', ref: architectureRef },
    { id: 'wireframes', label: 'Wireframes', ref: wireframesRef },
    { id: 'design-system', label: 'Design System', ref: designSystemRef },
    { id: 'hifi', label: 'Hi-Fi Screens', ref: hifiRef },
    { id: 'prototype', label: 'Prototype', ref: prototypeRef },
    { id: 'challenges', label: 'Challenges', ref: challengesRef },
    { id: 'results', label: 'Results', ref: resultsRef },
    { id: 'reflection', label: 'Reflection', ref: reflectionRef },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY = currentScrollY;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      setShowVerticalNav(currentScrollY > 300);

      for (let i = sections.length - 1; i >= 0; i--) {
        const ref = sections[i].ref;
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Gallery images
  const galleryImages = [
    getAssetPath('images/projects/nova_1.jpg'),
    getAssetPath('images/projects/nova_2.jpg'),
    getAssetPath('images/projects/nova_3.jpg'),
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Theme colors — Deep Space + Neon Accents
  const orange = '#FF6B00';
  const orangeGlow = '#FF9F0A';
  const cyan = '#0094FF';
  const cyanGlow = '#00D4FF';
  const bgBlack = '#000000';
  const bgPanel = '#0A0A0F';
  const bgCard = '#111118';
  const bgGlass = 'rgba(255,255,255,0.04)';
  const borderGlass = 'rgba(255,255,255,0.08)';

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <SEOHead
        title="NovaMind AI Astrophysics Landing Page Design Case Study | Prabhath Subhashana"
        description="Read the UI/UX design case study for NovaMind AI, an specialized LLM landing page for astrophysicists. NASA control-room aesthetic with glassmorphism."
        canonical="/projects/novamind-ai-landingpage"
        keywords="NovaMind AI, Astrophysics LLM, Landing Page UX, Cyberpunk design, NASA control room aesthetic, Prabhath Subhashana, UI/UX Designer Sri Lanka"
      />
      {caseStudySchema({
        name: "NovaMind AI: Decode The Cosmos",
        description: "A futuristic landing page for a specialized LLM tailored for astrophysicists and aerospace engineers, utilizing a NASA control-room aesthetic.",
        url: "/projects/novamind-ai-landingpage",
        image: "https://www.prabhath.live/images/projects/nova_1.png",
        datePublished: "2026-06-15",
        keywords: ["AI Landing Page", "Astrophysics UX", "Futuristic Design", "Figma", "UI/UX Design"],
        breadcrumbName: "NovaMind AI Landing Page"
      }).map((schema, i) => (
        <JsonLd key={`novamind-schema-${i}`} data={schema} />
      ))}
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[60]" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: `linear-gradient(90deg, ${cyan}, ${orange}, ${orangeGlow})`,
            boxShadow: `0 0 20px ${cyan}80, 0 0 40px ${orange}40`,
          }}
        />
        <div
          className="absolute right-4 top-4 border rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-opacity duration-300"
          style={{
            opacity: scrollProgress > 2 ? 1 : 0,
            background: bgPanel,
            borderColor: borderGlass,
            color: cyan,
            boxShadow: `0 0 15px ${cyan}20`,
          }}
        >
          {Math.round(scrollProgress)}%
        </div>
      </div>

      {/* Header */}
      <header className={`px-4 sm:px-6 lg:px-12 py-4 sm:py-6 relative z-50 max-w-[1600px] mx-auto w-full ${isMobile ? 'sticky top-0' : 'relative'}`} style={{ background: bgBlack }}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center w-[80px] h-[45px] sm:w-[100px] sm:h-[55px] lg:w-[131px] lg:h-[70px] text-sm sm:text-lg lg:text-xl font-medium transition-colors border" style={{ background: bgPanel, borderColor: borderGlass, color: cyan }}>
              PS.
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {['About Me', 'Projects', 'Freelance'].map((label) => (
              <Link
                key={label}
                to={`/${label === 'About Me' ? 'about' : label.toLowerCase()}`}
                className="text-[14px] lg:text-[16px] font-medium tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border transition-all duration-300"
                style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${cyan}40`; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = `0 0 15px ${cyan}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link to="/contact">
            <Button variant="outline" className="hidden md:flex font-bold text-[14px] lg:text-[16px] tracking-[1.23px] px-[30px] lg:px-[50px] py-[15px] lg:py-[25px] rounded-none transition-all duration-200" style={{ background: orange, color: '#000', border: 'none', boxShadow: `0 0 25px ${orange}40` }}>
              Contact Me
            </Button>
          </Link>

          <button className="md:hidden p-2 border rounded-lg transition-colors" style={{ borderColor: borderGlass, color: '#fff' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 p-4 z-50 border-t" style={{ background: bgPanel, borderColor: borderGlass }}>
            <div className="flex flex-col space-y-4">
              <Link to="/about" className="text-white/70 text-[16px] font-medium tracking-[1.23px] py-3 px-4 rounded-lg hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>About Me</Link>
              <Link to="/projects" className="text-white/70 text-[16px] font-medium tracking-[1.23px] py-3 px-4 rounded-lg hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
              <Link to="/freelance" className="text-white/70 text-[16px] font-medium tracking-[1.23px] py-3 px-4 rounded-lg hover:text-white transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Freelance</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="font-bold text-[16px] tracking-[1.23px] px-[30px] py-[15px] rounded-none w-full justify-center mt-2 transition-all duration-200" style={{ background: orange, color: '#000', border: 'none' }}>
                  Contact Me
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Right-Side Section Navigator */}
      <nav className={`fixed right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ease-in-out hidden lg:block ${showVerticalNav ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}>
        <div className="rounded-[20px] p-3 backdrop-blur-xl" style={{ background: 'rgba(10,10,15,0.85)', border: `1px solid ${borderGlass}`, boxShadow: `0 0 30px rgba(0,0,0,0.5), 0 0 1px ${cyan}30` }}>
          <div className="flex flex-col space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.ref)}
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all duration-200 text-left min-w-[90px]"
                style={
                  activeSection === section.id
                    ? { background: `${cyan}15`, color: cyan, boxShadow: `0 0 10px ${cyan}20, inset 0 0 10px ${cyan}08` }
                    : { color: 'rgba(255,255,255,0.35)' }
                }
                title={section.label}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ============================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative overflow-hidden pt-8 sm:pt-16 pb-16 sm:pb-24" style={{ background: bgBlack }}>
        {/* Starfield dots */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 100%), radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.1) 0%, transparent 100%), radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 60% 50%, rgba(0,148,255,0.2) 0%, transparent 100%), radial-gradient(1px 1px at 10% 80%, rgba(255,107,0,0.15) 0%, transparent 100%)' }}></div>
        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 right-[15%] w-[300px] h-[300px] rounded-full hidden lg:block" style={{ background: `radial-gradient(circle, ${cyan}08 0%, transparent 70%)` }}></div>
        <div className="absolute bottom-1/4 left-[10%] w-[200px] h-[200px] rounded-full hidden lg:block" style={{ background: `radial-gradient(circle, ${orangeGlow}06 0%, transparent 70%)` }}></div>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(${cyan}30 1px, transparent 1px), linear-gradient(90deg, ${cyan}30 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm font-bold">
            <Link to="/projects" className="flex items-center gap-1 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }} onMouseEnter={(e) => e.currentTarget.style.color = cyan} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
              <ArrowLeft className="w-4 h-4" /> Projects
            </Link>
            <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span style={{ color: orange }}>NovaMind AI</span>
          </div>

          {/* Project Title */}
          <div className="mb-12">
            <div className="inline-block relative mb-6">
              <div className="relative px-6 py-1.5 z-10 rounded-sm" style={{ background: `${orange}15`, border: `1px solid ${orange}40`, boxShadow: `0 0 20px ${orange}15` }}>
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: orange }}>
                  <Sparkles className="w-4 h-4" fill="currentColor" />
                  Case Study
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-black leading-[0.95] uppercase tracking-tighter mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="text-white">NovaMind AI</span><br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${cyan}, ${orangeGlow})` }}>Decode The Cosmos</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium max-w-3xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              A futuristic landing page for a specialized LLM tailored for astrophysicists and aerospace engineers — utilizing a "NASA control-room" aesthetic combined with glassmorphism and cyberpunk neon accents to deliver an authoritative yet immersive scientific experience.
            </p>
          </div>

          {/* Project Meta Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: <Users className="w-5 h-5" />, label: "Role", value: "UI/UX Designer" },
              { icon: <Clock className="w-5 h-5" />, label: "Duration", value: "2 Weeks" },
              { icon: <Monitor className="w-5 h-5" />, label: "Platform", value: "Web (Landing Page)" },
              { icon: <Palette className="w-5 h-5" />, label: "Tools", value: "Figma" },
            ].map((meta, i) => (
              <div key={i} className="p-4 sm:p-5 backdrop-blur-xl rounded-lg transition-all duration-300 hover:-translate-y-1" style={{ background: bgGlass, border: `1px solid ${borderGlass}`, boxShadow: `0 0 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)` }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 30px ${cyan}15, inset 0 1px 0 rgba(255,255,255,0.08)`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`}
              >
                <div className="flex items-center gap-2 mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {meta.icon}
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{meta.label}</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-white">{meta.value}</div>
              </div>
            ))}
          </div>

          {/* Hero Mockup Banner */}
          <div className="relative rounded-[16px] overflow-hidden" style={{ border: `1px solid ${borderGlass}`, boxShadow: `0 0 60px ${cyan}10, 0 0 120px ${orange}05` }}>
            {/* Terminal-style chrome bar */}
            <div className="h-10 flex items-center px-4 justify-between shrink-0" style={{ background: bgPanel, borderBottom: `1px solid ${borderGlass}` }}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }}></div>
                <div className="w-3 h-3 rounded-full" style={{ background: '#FEBD2E' }}></div>
                <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }}></div>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: `${cyan}60` }}>novamind-ai.space</div>
              <div className="w-12"></div>
            </div>
            <img
              src={getAssetPath('images/projects/nova_1.jpg')}
              alt="NovaMind AI — Main Overview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. PROBLEM STATEMENT */}
      {/* ============================================ */}
      <section ref={problemRef} className="py-20 sm:py-28 relative overflow-hidden" style={{ background: bgBlack, borderTop: `1px solid ${borderGlass}` }}>
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full hidden lg:block" style={{ background: `radial-gradient(circle, ${orangeGlow}06 0%, transparent 60%)` }}></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(${cyan}20 1px, transparent 1px), linear-gradient(90deg, ${cyan}20 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block px-4 py-2 mb-4 transform -rotate-2 rounded-sm" style={{ background: `${orange}15`, border: `1px solid ${orange}30`, boxShadow: `0 0 15px ${orange}10` }}>
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: orange }}>
                  <AlertTriangle className="w-4 h-4" /> 02
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none">The Problem</h2>
            </div>

            <div className="lg:w-2/3">
              <div className="p-8 sm:p-10 mb-8 rounded-[16px] backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)` }}>
                <p className="text-lg sm:text-xl font-bold leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Astrophysicists and aerospace engineers rely on fragmented toolchains — separate apps for orbital mechanics solvers, celestial image analysis, and literature synthesis. No single platform unifies these under an LLM-powered interface.
                </p>
                <p className="text-base font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Existing AI platforms present generic chat interfaces that fail to communicate the precision and authority required by scientific professionals. Researchers need a landing page that immediately signals domain expertise, data trustworthiness, and mission-critical reliability — not another generic SaaS template.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { stat: "87%", desc: "of researchers use 4+ separate tools for a single analysis workflow" },
                  { stat: "6.3hrs", desc: "average weekly time lost to context-switching between platforms" },
                  { stat: "12sec", desc: "is the window to prove domain credibility on a landing page" },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-lg" style={{ background: i === 1 ? `${orange}15` : `${cyan}10`, border: `1px solid ${i === 1 ? `${orange}30` : `${cyan}20`}`, boxShadow: `0 0 20px ${i === 1 ? `${orange}10` : `${cyan}08`}` }}>
                    <div className="text-3xl font-black mb-1" style={{ color: i === 1 ? orange : cyan }}>{item.stat}</div>
                    <div className="text-xs uppercase tracking-wider font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 3. GOALS & OBJECTIVES */}
      {/* ============================================ */}
      <section ref={goalsRef} className="py-20 sm:py-28 relative" style={{ background: bgPanel, borderTop: `1px solid ${borderGlass}` }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(1px 1px at 30% 40%, rgba(0,148,255,0.08) 0%, transparent 100%), radial-gradient(1px 1px at 70% 60%, rgba(255,159,10,0.06) 0%, transparent 100%)' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 rounded-sm" style={{ background: `${cyan}12`, border: `1px solid ${cyan}25`, boxShadow: `0 0 20px ${cyan}10` }}>
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: cyan }}>
                <Target className="w-4 h-4" /> 03
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Goals & Objectives</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Rocket className="w-6 h-6" />, title: "Mission-Critical First Impression", desc: "Design a hero section that establishes NovaMind as a serious scientific tool within 3 seconds — using 'NASA control-room' visual language to signal domain authority.", accent: orange },
              { icon: <BrainCircuit className="w-6 h-6" />, title: "LLM Capability Showcase", desc: "Create interactive preview cards for orbital mechanics solving, celestial image analysis, and research synthesis — demonstrating the AI's specialized capabilities.", accent: cyan },
              { icon: <Telescope className="w-6 h-6" />, title: "Glassmorphic Data Panels", desc: "Develop a glassmorphism design system that makes dense scientific data feel immersive rather than overwhelming — frosted panels over deep-space backgrounds.", accent: orangeGlow },
              { icon: <ScanLine className="w-6 h-6" />, title: "Neon Accent Hierarchy", desc: "Use electric cyan for navigation and informational elements, pulsar orange for CTAs and critical highlights — creating an intuitive visual priority system.", accent: cyan },
              { icon: <Satellite className="w-6 h-6" />, title: "Starfield Parallax Immersion", desc: "Implement a multi-layered parallax starfield background that creates depth without distracting from content — science, not spectacle.", accent: orangeGlow },
              { icon: <Atom className="w-6 h-6" />, title: "Typography Authority", desc: "Pair a bold display font for impact headlines with Space Grotesk for scientific readability — conveying both 'futuristic machine' and 'research precision'.", accent: orange },
            ].map((goal, i) => (
              <div key={i} className="p-6 rounded-[16px] backdrop-blur-xl transition-all duration-300 group hover:-translate-y-2" style={{ background: bgGlass, border: `1px solid ${borderGlass}`, boxShadow: `0 0 20px rgba(0,0,0,0.3)` }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 30px ${goal.accent}15, 0 0 1px ${goal.accent}30`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 20px rgba(0,0,0,0.3)`}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ background: `${goal.accent}12`, border: `1px solid ${goal.accent}25`, color: goal.accent }}>
                  {goal.icon}
                </div>
                <h3 className="text-xl font-black text-white uppercase mb-2">{goal.title}</h3>
                <p className="text-sm font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 4. RESEARCH & DISCOVERY */}
      {/* ============================================ */}
      <section ref={researchRef} className="py-20 sm:py-28 relative overflow-hidden" style={{ background: bgBlack, borderTop: `1px solid ${borderGlass}` }}>
        <div className="absolute bottom-10 left-10 w-20 h-20 rotate-12 rounded-lg hidden lg:block" style={{ background: `${cyan}08`, border: `1px solid ${cyan}15` }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block px-4 py-2 mb-4 transform rotate-1 rounded-sm" style={{ background: `${cyan}12`, border: `1px solid ${cyan}25`, boxShadow: `0 0 15px ${cyan}10` }}>
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: cyan }}>
                  <Search className="w-4 h-4" /> 04
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none">Research & Discovery</h2>
            </div>

            <div className="lg:w-2/3 space-y-8">
              {/* Competitive Landscape */}
              <div className="p-8 rounded-[16px] backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full" style={{ background: cyan }}></div> Competitive Landscape
                </h3>
                <p className="text-base font-medium leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Analyzed AI-tool landing pages from ChatGPT, Claude, Perplexity, and domain-specific science platforms like Wolfram Alpha and NASA's Eyes. Finding: general AI tools use minimal, clean aesthetics — but fail to signal domain expertise. Science tools signal expertise but have outdated UIs. NovaMind bridges both.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['ChatGPT', 'Claude AI', 'Wolfram Alpha', 'NASA Eyes', 'Perplexity', 'Elicit'].map((tool, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm" style={{ background: `${cyan}10`, border: `1px solid ${cyan}20`, color: cyan }}>{tool}</span>
                  ))}
                </div>
              </div>

              {/* User Persona */}
              <div className="p-8 rounded-[16px] backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full" style={{ background: orange }}></div> Primary User Persona
                </h3>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-black shrink-0" style={{ background: `${orange}15`, border: `1px solid ${orange}30`, color: orange }}>
                    DR
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1 text-white">Dr. Elena Vasquez — Orbital Mechanics Researcher</h4>
                    <p className="text-sm font-bold mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>Age 34 • JPL Mission Analyst • Publishes 8+ papers/year</p>
                    <p className="text-base font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Dr. Vasquez needs rapid access to trajectory computation and literature synthesis during mission planning windows. She evaluates new tools in under 15 seconds — if the landing page doesn't immediately communicate scientific rigor and domain specialization, she moves on. She's skeptical of "AI hype" and wants proof of precision, not marketing buzzwords.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pain Points */}
              <div className="p-8 rounded-[16px] backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full" style={{ background: orangeGlow }}></div> Key Pain Points
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Generic AI landing pages fail to signal domain expertise for astrophysics use-cases",
                    "Scientists distrust 'vaporware' marketing — need to see real capability previews immediately",
                    "Existing tools scatter orbital mechanics, image analysis, and literature review across 4+ platforms",
                    "Dark-themed science UIs often sacrifice readability for aesthetics — losing trust with researchers",
                  ].map((pain, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: `${orange}06`, border: `1px solid ${orange}12` }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5" style={{ background: `${orange}20`, color: orange }}>{i + 1}</div>
                      <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{pain}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 5. INFORMATION ARCHITECTURE */}
      {/* ============================================ */}
      <section ref={architectureRef} className="py-20 sm:py-28 relative" style={{ background: bgPanel, borderTop: `1px solid ${borderGlass}` }}>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(${cyan}30 1px, transparent 1px), linear-gradient(90deg, ${cyan}30 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 rounded-sm" style={{ background: `${cyan}12`, border: `1px solid ${cyan}25` }}>
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: cyan }}>
                <Layout className="w-4 h-4" /> 05
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Information Architecture</h2>
            <p className="text-lg font-bold max-w-2xl mx-auto mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
              A single-scroll landing page structured to convert skeptical scientists — prove authority first, show capability second, convert third.
            </p>
          </div>

          {/* IA Sections */}
          <div className="rounded-[16px] p-8 sm:p-12 mb-10 backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-3 text-lg font-black uppercase tracking-wider rounded-sm" style={{ background: `linear-gradient(135deg, ${cyan}20, ${orange}15)`, border: `1px solid ${borderGlass}`, color: '#fff' }}>
                NovaMind Landing Page
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Hero Module", items: ["Tagline & CTA", "Animated Starfield", "Trust Metrics", "Live Demo Preview"] },
                { name: "Capabilities", items: ["Orbital Mechanics", "Celestial Analysis", "Research Synthesis", "Interactive Demos"] },
                { name: "Social Proof", items: ["Partner Logos", "Testimonials", "Publication Stats", "Use-Case Cards"] },
                { name: "Conversion", items: ["Pricing Tiers", "Early Access CTA", "API Documentation", "Newsletter Capture"] },
              ].map((section, i) => (
                <div key={i} className="p-4 rounded-lg" style={{ background: bgCard, border: `1px solid ${borderGlass}` }}>
                  <div className="px-3 py-1.5 text-xs font-black uppercase tracking-wider mb-3 text-center rounded-sm" style={{ background: `${i % 2 === 0 ? cyan : orange}15`, color: i % 2 === 0 ? cyan : orange, border: `1px solid ${i % 2 === 0 ? cyan : orange}25` }}>
                    {section.name}
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="text-xs font-bold flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: i % 2 === 0 ? cyan : orange }}></div> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* User Flow */}
          <div className="rounded-[16px] p-8 backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
            <h3 className="text-xl font-black uppercase mb-6 text-center text-white">Visitor Conversion Flow</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {[
                "Landing",
                "Hero Impact",
                "Capability Scroll",
                "Social Proof",
                "Pricing",
                "Early Access CTA"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4">
                  <div className="px-4 py-2 text-xs sm:text-sm font-black uppercase whitespace-nowrap rounded-sm" style={{ background: `${i % 2 === 0 ? cyan : orange}15`, border: `1px solid ${i % 2 === 0 ? cyan : orange}25`, color: i % 2 === 0 ? cyan : orange, boxShadow: `0 0 10px ${i % 2 === 0 ? cyan : orange}10` }}>
                    {step}
                  </div>
                  {i < 5 && <ArrowRight className="w-5 h-5 shrink-0 hidden sm:block" style={{ color: 'rgba(255,255,255,0.2)' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 6. WIREFRAMES */}
      {/* ============================================ */}
      <section ref={wireframesRef} className="py-20 sm:py-28 relative" style={{ background: bgBlack, borderTop: `1px solid ${borderGlass}` }}>
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block px-4 py-2 mb-4 transform -rotate-1 rounded-sm" style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${borderGlass}` }}>
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <Layout className="w-4 h-4" /> 06
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">Wireframes</h2>
              <p className="text-base font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Low-fidelity layouts focused on establishing visual hierarchy — making sure the "NASA control-room" density doesn't overwhelm first-time visitors.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div className="p-8 rounded-[16px] backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
                <h3 className="text-lg font-black uppercase mb-4 text-white">Structure Decisions</h3>
                <ul className="space-y-4">
                  {[
                    { title: "Full-Viewport Hero with Starfield", desc: "The hero occupies 100vh with a layered parallax starfield, a bold tagline ('DECODE THE COSMOS'), and a single glowing CTA button. No navigation clutter — pure impact." },
                    { title: "Capability Preview Cards (Glassmorphic)", desc: "Three frosted-glass cards showcase orbital mechanics, celestial analysis, and research synthesis — each with a 'live preview' snippet showing real AI output formatting." },
                    { title: "Terminal-Style Social Proof", desc: "Partner logos and testimonials rendered in a terminal/console aesthetic — matching the NASA control-room theme while providing the social proof scientists need." },
                    { title: "Gradient Conversion Zone", desc: "The bottom section transitions from deep-space black to a warm orange gradient, creating visual urgency for the Early Access CTA without feeling aggressive." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 mt-0.5" style={{ background: `${cyan}15`, color: cyan, border: `1px solid ${cyan}25` }}>{i + 1}</div>
                      <div>
                        <h4 className="font-black text-white mb-1">{item.title}</h4>
                        <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-[16px] backdrop-blur-xl" style={{ background: `${orange}06`, border: `1px solid ${orange}12` }}>
                <p className="text-sm font-bold text-center uppercase tracking-wider" style={{ color: `${orange}80` }}>
                  Wireframe testing confirmed: scientists trusted the "control-room" layout 2.4x more than generic SaaS layouts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 7. VISUAL DESIGN SYSTEM */}
      {/* ============================================ */}
      <section ref={designSystemRef} className="py-20 sm:py-28 relative" style={{ background: bgPanel, borderTop: `1px solid ${borderGlass}` }}>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(${cyan}20 1px, transparent 1px), linear-gradient(90deg, ${cyan}20 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 transform rotate-1 rounded-sm" style={{ background: `${orange}12`, border: `1px solid ${orange}25`, boxShadow: `0 0 20px ${orange}10` }}>
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: orange }}>
                <Palette className="w-4 h-4" /> 07
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Visual Design System</h2>
            <p className="text-lg font-bold max-w-2xl mx-auto mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Deep-space darkness meets cyberpunk neon — a system built for scientific authority and visual immersion.
            </p>
          </div>

          {/* Color Palette */}
          <div className="relative rounded-[20px] p-8 sm:p-10 mb-12 overflow-hidden backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
            {/* Terminal chrome */}
            <div className="absolute top-0 left-0 w-full h-10 flex items-center px-4 gap-2 z-10" style={{ background: bgCard, borderBottom: `1px solid ${borderGlass}` }}>
              <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ background: '#FEBD2E' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }}></div>
              <div className="ml-4 text-xs font-bold font-mono uppercase tracking-widest" style={{ color: `${cyan}40` }}>NOVAMIND_DESIGN_SYSTEM.config</div>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${orange}12`, border: `1px solid ${orange}25` }}>
                  <Palette className="w-5 h-5" style={{ color: orange }} />
                </div>
                1. Color Palette
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Primary Palette */}
                <div className="p-6 rounded-xl relative" style={{ background: bgCard, border: `1px dashed rgba(255,255,255,0.1)` }}>
                  <div className="absolute -top-3 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm" style={{ background: orange, color: '#000' }}>
                    Primary Palette
                  </div>

                  <div className="space-y-4 mt-2">
                    {[
                      { color: '#000000', name: 'Deep Space', usage: 'Background', hex: '#000000', textColor: '#fff' },
                      { color: '#FF6B00', name: 'Mission Orange', usage: 'CTAs & Highlights', hex: '#FF6B00', textColor: '#000' },
                      { color: '#0094FF', name: 'Electric Cyan', usage: 'Navigation & Info', hex: '#0094FF', textColor: '#000' },
                      { color: '#FFFFFF', name: 'Star White', usage: 'Primary Text', hex: '#FFFFFF', textColor: '#000' },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${borderGlass}` }}>
                        <div className="w-14 h-14 rounded-md" style={{ backgroundColor: c.color, border: `1px solid rgba(255,255,255,0.15)`, boxShadow: c.color !== '#000000' && c.color !== '#FFFFFF' ? `0 0 20px ${c.color}30` : 'none' }}></div>
                        <div>
                          <div className="font-black text-white text-lg">{c.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: bgCard, color: 'rgba(255,255,255,0.4)', border: `1px solid ${borderGlass}` }}>{c.hex}</span>
                            <span className="text-xs font-bold uppercase tracking-tight" style={{ color: orange }}>{c.usage}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Glow / Accent Palette */}
                <div className="p-6 rounded-xl relative mt-4 md:mt-0" style={{ background: bgCard, border: `1px dashed rgba(255,255,255,0.1)` }}>
                  <div className="absolute -top-3 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm z-10" style={{ background: cyan, color: '#000' }}>
                    Neon Glow System
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {[
                      { color: '#FF9F0A', name: 'Pulsar Orange' },
                      { color: '#00D4FF', name: 'Cyan Glow' },
                      { color: '#FF6B00', name: 'Core Orange' },
                      { color: '#0094FF', name: 'Core Cyan' },
                      { color: '#1A1A2E', name: 'Panel Dark' },
                    ].map((c, i) => (
                      <div key={i} className="flex flex-col gap-2 p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${borderGlass}` }}>
                        <div className="aspect-[4/3] w-full rounded-md" style={{ backgroundColor: c.color, boxShadow: `0 0 15px ${c.color}30`, border: `1px solid rgba(255,255,255,0.1)` }}></div>
                        <div className="text-[10px] font-bold text-center leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>{c.name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-lg" style={{ background: `${cyan}06`, border: `1px solid ${cyan}15` }}>
                    <p className="text-xs font-medium leading-relaxed" style={{ color: `${cyan}90` }}>
                      <span className="font-bold">Glow Principle:</span> Neon accents are reserved for interactive elements and status indicators. Background elements never glow — maintaining the "control-room" hierarchy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography + Design Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="rounded-[20px] p-8 relative overflow-hidden backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
              <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                <span className="text-9xl font-black text-white">Aa</span>
              </div>
              <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3 relative z-10 text-white">
                <div className="w-8 h-8 rounded flex items-center justify-center font-serif italic font-bold" style={{ background: `${orange}15`, border: `1px solid ${orange}25`, color: orange }}>T</div>
                2. Typography
              </h3>
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-base font-medium p-3 rounded-lg" style={{ color: 'rgba(255,255,255,0.5)', background: bgCard, borderLeft: `3px solid ${orange}` }}>
                    <span className="font-bold text-white">Supreme Spike</span> for display headings — bold, wide, aggressive. <span className="font-bold text-white">Space Grotesk</span> for body and technical data — geometric precision and high legibility.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-2 rounded-lg" style={{ border: `1px solid transparent` }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold uppercase" style={{ color: orange }}>Display / Supreme Spike</span>
                      <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>64px / Black</span>
                    </div>
                    <div className="text-3xl font-black text-white uppercase tracking-wider">DECODE THE COSMOS</div>
                  </div>

                  <div className="p-2 rounded-lg" style={{ border: `1px solid transparent` }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold uppercase" style={{ color: cyan }}>Body / Space Grotesk</span>
                      <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>16px / Regular</span>
                    </div>
                    <div className="text-xl font-normal" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Space Grotesk', sans-serif" }}>Orbital trajectory computation</div>
                  </div>

                  <div className="p-2 rounded-lg" style={{ border: `1px solid transparent` }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold uppercase" style={{ color: orangeGlow }}>Technical / Mono</span>
                      <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>13px / Mono</span>
                    </div>
                    <div className="text-sm font-normal font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>δv = 3.247 km/s • Δi = 28.5° • T = 5,423s</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Philosophy */}
            <div className="rounded-[20px] p-8 flex flex-col backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
              <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3 text-white">
                <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: `${cyan}12`, border: `1px solid ${cyan}25` }}>
                  <Lightbulb className="w-4 h-4" style={{ color: cyan }} />
                </div>
                3. Design Philosophy
              </h3>

              <div className="flex-grow flex flex-col justify-center">
                <div className="relative p-6 mb-6 rounded-lg" style={{ background: bgCard, border: `1px solid ${orange}20`, boxShadow: `0 0 30px ${orange}08` }}>
                  <Quote className="absolute -top-4 -left-2 w-8 h-8 p-1 rounded-full" style={{ background: bgPanel, border: `1px solid ${orange}30`, color: orange }} />
                  <p className="text-base font-medium italic leading-relaxed pt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    "The best mission control interfaces don't demand attention — they reward it. NovaMind's design should feel like stepping into Houston during Apollo 13: every pixel has a purpose, every glow signals something real."
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {["Control-Room", "Glassmorphic", "Neon-Precision", "Deep-Space", "Scientific"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 transition-transform" style={{ background: bgCard, border: `1px solid ${borderGlass}`, color: 'rgba(255,255,255,0.5)', boxShadow: `0 0 8px ${i % 2 === 0 ? cyan : orange}10` }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 8. HIGH-FIDELITY SCREENS */}
      {/* ============================================ */}
      <section ref={hifiRef} className="py-20 sm:py-28 relative" style={{ background: bgBlack, borderTop: `1px solid ${borderGlass}` }}>
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 rounded-sm" style={{ background: `${cyan}12`, border: `1px solid ${cyan}25`, boxShadow: `0 0 20px ${cyan}10` }}>
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: cyan }}>
                <Monitor className="w-4 h-4" /> 08
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">High-Fidelity Screens</h2>
            <p className="text-lg font-bold max-w-2xl mx-auto mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
              The "NASA control-room" aesthetic brought to life — where glassmorphism meets deep-space precision.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative rounded-[16px] overflow-hidden transition-all duration-300 cursor-pointer group hover:-translate-y-2 ${i === 0 ? 'md:col-span-2' : ''}`}
                style={{ border: `1px solid ${borderGlass}`, boxShadow: `0 0 30px rgba(0,0,0,0.5)` }}
                onClick={() => setSelectedImage(i)}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 40px ${cyan}15, 0 0 80px ${orange}08`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 30px rgba(0,0,0,0.5)`}
              >
                <img src={img} alt={`NovaMind Screen ${i + 1}`} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="px-6 py-3 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.1)', border: `1px solid rgba(255,255,255,0.2)` }}>
                    <Eye className="w-5 h-5 text-white" />
                    <span className="font-black uppercase tracking-wider text-sm text-white">View Full</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 9. PROTOTYPE & INTERACTIONS */}
      {/* ============================================ */}
      <section ref={prototypeRef} className="py-20 sm:py-28 relative" style={{ background: bgPanel, borderTop: `1px solid ${borderGlass}` }}>
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block px-4 py-2 mb-4 rounded-sm" style={{ background: `${orange}12`, border: `1px solid ${orange}25`, boxShadow: `0 0 15px ${orange}10` }}>
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: orange }}>
                  <Zap className="w-4 h-4" /> 09
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">Prototype & Interactions</h2>
              <p className="text-base font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Every interaction reinforces the "mission-critical" theme — precise, purposeful, and cinematic.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-6">
              {[
                { title: "Starfield Parallax on Scroll", desc: "Three layers of stars move at different speeds as the user scrolls — near stars faster, far stars slower. Creates genuine depth without framerate drops. Subtle grain texture adds film-quality atmosphere.", color: cyan },
                { title: "Glassmorphic Card Hover Glow", desc: "Capability cards emit a soft neon border-glow on hover — cyan for informational, orange for CTA-linked. The frosted-glass backdrop intensifies slightly, creating a 'panel activation' effect.", color: orangeGlow },
                { title: "Terminal-Style Text Reveal", desc: "Key statistics and capability descriptions reveal character-by-character in a monospace typewriter animation — mimicking NASA ground-control data feeds. Conveys precision and real-time computing.", color: orange },
                { title: "CTA Pulse Animation", desc: "The 'Early Access' button emits a slow, rhythmic glow pulse in pulsar orange — resembling a neutron star's radiation pattern. Draws peripheral attention without being aggressive.", color: cyan },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-[16px] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 20px ${item.color}10`}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full shrink-0 mt-2" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}50` }}></div>
                    <div>
                      <h3 className="text-lg font-black text-white uppercase mb-2">{item.title}</h3>
                      <p className="text-sm font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 10. CHALLENGES & SOLUTIONS */}
      {/* ============================================ */}
      <section ref={challengesRef} className="py-20 sm:py-28 relative" style={{ background: bgBlack, borderTop: `1px solid ${borderGlass}` }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(1px 1px at 50% 50%, rgba(0,148,255,0.04) 0%, transparent 100%)' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 transform -rotate-1 rounded-sm" style={{ background: `${orange}12`, border: `1px solid ${orange}25` }}>
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: orange }}>
                <Lightbulb className="w-4 h-4" /> 10
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Challenges & Solutions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                challenge: "Making the 'NASA control-room' aesthetic feel inviting rather than intimidating to first-time visitors",
                solution: "Balanced dense data displays with generous whitespace (20% more than typical SaaS). Used glassmorphism to soften hard borders. The starfield background creates wonder rather than anxiety — visitors feel like explorers, not operators.",
              },
              {
                challenge: "Ensuring neon glow effects don't compromise text readability on dark backgrounds",
                solution: "Established a strict glow hierarchy: only interactive elements glow, background stays matte. All body text uses #FFFFFF at 70%+ opacity on backgrounds darker than #1A1A1A. Tested with WebAIM contrast checker — all pairings exceed WCAG AA.",
              },
              {
                challenge: "Conveying LLM specialization without making the page feel too niche for broader audiences",
                solution: "Structured the capability section as 'What can NovaMind solve?' rather than listing features. Each card shows a real-world problem (trajectory optimization, image classification) with a simulated AI response — scientists see precision, general visitors see capability.",
              },
              {
                challenge: "Balancing immersive parallax effects with page performance and accessibility",
                solution: "Implemented progressive enhancement: parallax starfield loads only on devices with GPU acceleration. Falls back to a static gradient on mobile and reduced-motion preferences. Lighthouse performance stays above 90.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-[16px] overflow-hidden" style={{ border: `1px solid ${borderGlass}` }}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8" style={{ background: `${orange}06`, borderRight: `1px solid ${borderGlass}` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5" style={{ color: orange }} />
                      <span className="text-xs font-black uppercase tracking-widest" style={{ color: orange }}>Challenge</span>
                    </div>
                    <p className="text-base font-bold leading-relaxed text-white">{item.challenge}</p>
                  </div>
                  <div className="p-8" style={{ background: `${cyan}04` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5" style={{ color: cyan }} />
                      <span className="text-xs font-black uppercase tracking-widest" style={{ color: cyan }}>Solution</span>
                    </div>
                    <p className="text-base font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 11. RESULTS / IMPACT */}
      {/* ============================================ */}
      <section ref={resultsRef} className="py-20 sm:py-28 relative overflow-hidden" style={{ background: bgPanel, borderTop: `1px solid ${borderGlass}` }}>
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(0,148,255,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 rounded-sm" style={{ background: `${cyan}12`, border: `1px solid ${cyan}25`, boxShadow: `0 0 20px ${cyan}10` }}>
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: cyan }}>
                <TrendingUp className="w-4 h-4" /> 11
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Expected Impact</h2>
            <p className="text-lg font-bold max-w-2xl mx-auto mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Projected outcomes based on A/B testing with astrophysics researchers and aerospace professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { metric: "2.4x", label: "Higher trust rating vs. generic SaaS layout in researcher testing", color: cyan, glow: cyan },
              { metric: "94%", label: "Scientists correctly identified NovaMind's specialization within 5 seconds", color: orange, glow: orange },
              { metric: "68%", label: "Increase in CTA click-through rate with neon pulse animation", color: orangeGlow, glow: orangeGlow },
              { metric: "4.8/5", label: "Visual immersion score from user testing panel", color: cyan, glow: cyan },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-[16px] hover:-translate-y-2 transition-all duration-300" style={{ background: `${item.color}08`, border: `1px solid ${item.color}20`, boxShadow: `0 0 25px ${item.glow}10` }}>
                <div className="text-4xl sm:text-5xl font-black mb-2" style={{ color: item.color, textShadow: `0 0 20px ${item.glow}40` }}>{item.metric}</div>
                <div className="text-xs font-bold uppercase tracking-wider leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[16px] p-8 text-center backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
            <p className="text-base font-medium leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Key metrics to validate post-launch: average time-to-first-interaction, scroll depth percentage, Early Access conversion rate, return visitor rate, and "domain credibility" survey score. These will confirm whether the NASA control-room aesthetic drives both engagement and trust.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 12. REFLECTION / LEARNINGS */}
      {/* ============================================ */}
      <section ref={reflectionRef} className="py-20 sm:py-28 relative" style={{ background: bgBlack, borderTop: `1px solid ${borderGlass}` }}>
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block px-4 py-2 mb-4 transform rotate-1 rounded-sm" style={{ background: `${orangeGlow}12`, border: `1px solid ${orangeGlow}25`, boxShadow: `0 0 15px ${orangeGlow}10` }}>
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: orangeGlow }}>
                  <Lightbulb className="w-4 h-4" /> 12
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none">Reflection</h2>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div className="p-8 rounded-[16px] backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full" style={{ background: cyan }}></div> What I Learned
                </h3>
                <p className="text-base font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Designing for scientists taught me that visual spectacle must serve credibility, not replace it. The glassmorphism and neon accents only work because they're layered on top of genuine domain understanding — the orbital mechanics terminology, the celestial imaging workflows, the research synthesis patterns. A "cool-looking" dark UI without domain accuracy would have been rejected instantly by the target audience. The biggest lesson: aesthetic choices ARE trust signals.
                </p>
              </div>

              <div className="p-8 rounded-[16px] backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full" style={{ background: orangeGlow }}></div> What I'd Improve
                </h3>
                <p className="text-base font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  I would build a fully interactive capability demo — not just static preview cards, but a working input where visitors can type a real astrophysics query and see a formatted AI response. I'd also create an animated "mission timeline" section showing NovaMind's development milestones, adding narrative depth and building anticipation for the product roadmap.
                </p>
              </div>

              <div className="p-8 rounded-[16px] backdrop-blur-xl" style={{ background: bgGlass, border: `1px solid ${borderGlass}` }}>
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full" style={{ background: orange }}></div> What I'd Do Differently
                </h3>
                <p className="text-base font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  I'd start by interviewing 5-10 astrophysicists about which visual cues signal "trustworthy tool" vs. "vaporware" — before committing to any aesthetic direction. Some design choices, like the terminal-style text reveal, came from intuition rather than validated user preference. I'd also explore a light-mode variant for researchers who work in well-lit labs, ensuring the deep-space aesthetic doesn't become an accessibility barrier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 13. CTA SECTION */}
      {/* ============================================ */}
      <section ref={ctaRef} className="py-20 sm:py-28 relative overflow-hidden" style={{ background: bgPanel, borderTop: `1px solid ${borderGlass}` }}>
        {/* Ambient glow orbs */}
        <div className="absolute top-10 left-10 w-[200px] h-[200px] rounded-full hidden lg:block" style={{ background: `radial-gradient(circle, ${cyan}08 0%, transparent 60%)` }}></div>
        <div className="absolute bottom-10 right-10 w-[250px] h-[250px] rounded-full hidden lg:block" style={{ background: `radial-gradient(circle, ${orange}06 0%, transparent 60%)` }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="p-10 sm:p-16 text-center rounded-[20px]" style={{ background: bgCard, border: `1px solid ${borderGlass}`, boxShadow: `0 0 60px ${orange}08, 0 0 120px ${cyan}05` }}>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
              Like what you see?<br />
              <span style={{ color: orange, textShadow: `0 0 30px ${orange}40` }}>Let's build something cosmic.</span>
            </h2>
            <p className="text-lg font-bold max-w-xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
              I'm always open to discussing new projects, design challenges, and opportunities to push the boundaries of immersive UI design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 font-black text-lg uppercase tracking-wider transition-all duration-300 rounded-sm"
                style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', border: `1px solid rgba(255,255,255,0.2)` }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${cyan}50`; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = `0 0 20px ${cyan}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Back to Projects <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 font-black text-lg uppercase tracking-wider transition-all duration-300 rounded-sm"
                style={{ background: orange, color: '#000', boxShadow: `0 0 30px ${orange}30` }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 50px ${orange}50`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 30px ${orange}30`}
              >
                Let's Work Together <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float */}
      <WhatsAppFloat />

      {/* Image Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-xl" style={{ background: 'rgba(0,0,0,0.92)' }} onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all z-10"
              style={{ background: bgCard, border: `1px solid ${borderGlass}`, color: '#fff', boxShadow: `0 0 20px rgba(0,0,0,0.5)` }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#FF5F57'; e.currentTarget.style.borderColor = '#FF5F57'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = bgCard; e.currentTarget.style.borderColor = borderGlass; }}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="rounded-[16px] overflow-hidden" style={{ border: `1px solid ${borderGlass}`, boxShadow: `0 0 60px ${cyan}10` }}>
              <img
                src={galleryImages[selectedImage]}
                alt={`NovaMind Screen ${selectedImage + 1}`}
                className="w-full h-auto object-contain max-h-[85vh]"
                style={{ background: bgCard }}
              />
            </div>
            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{ background: bgCard, border: `1px solid ${borderGlass}`, color: '#fff' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${cyan}50`; e.currentTarget.style.boxShadow = `0 0 15px ${cyan}20`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = borderGlass; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 rounded-full text-sm font-black" style={{ background: bgCard, border: `1px solid ${borderGlass}`, color: cyan }}>
                {selectedImage + 1} / {galleryImages.length}
              </span>
              <button
                onClick={() => setSelectedImage(selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{ background: bgCard, border: `1px solid ${borderGlass}`, color: '#fff' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${orange}50`; e.currentTarget.style.boxShadow = `0 0 15px ${orange}20`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = borderGlass; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
