import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Menu, X, ExternalLink, Clock, Layers, Target, Search, Users, BarChart3, CheckCircle, Lightbulb, Zap, ChevronRight, Monitor, Palette, Layout, Eye, Sparkles, AlertTriangle, TrendingUp, Heart, Dumbbell, Activity, Flame, Trophy, Smartphone } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAssetPath } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import { JsonLd, caseStudySchema } from "@/components/StructuredData";

export default function GymFitnessCaseStudy() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Section refs for scroll tracking
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

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Show vertical nav after scrolling 300px
      setShowVerticalNav(currentScrollY > 300);

      // Determine active section
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
    getAssetPath('images/projects/gym_1.png'),
    getAssetPath('images/projects/gym_2.png'),
    getAssetPath('images/projects/gym_3.png'),
    getAssetPath('images/projects/gym_4.png'),
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Gym & Fitness Mobile App UI/UX Case Study | Prabhath Subhashana"
        description="Read the UI/UX design case study for Gym & Fitness Mobile App. Dark mode fitness UI with Electric Green accents designed to maximize engagement."
        canonical="/projects/gym-fitness-app"
        keywords="Gym Fitness App, Mobile App UX, UI/UX Case Study, Fitness Tracker UI, Electric Green accents, Prabhath Subhashana, UI/UX Designer Sri Lanka"
      />
      {caseStudySchema({
        name: "Gym & Fitness Mobile App",
        description: "A sleek, dark-mode fitness app interface designed for peak performance, utilizing Electric Green accents to highlight progress metrics.",
        url: "/projects/gym-fitness-app",
        image: "https://prabhath-portfolio.vercel.app/images/projects/gym_1.png",
        datePublished: "2026-06-15",
        keywords: ["Mobile App UX", "Fitness App Design", "Dark Mode UI", "Figma", "UI/UX Design"],
        breadcrumbName: "Gym & Fitness App"
      }).map((schema, i) => (
        <JsonLd key={`gym-schema-${i}`} data={schema} />
      ))}
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-[#00E676] via-[#00C853] to-[#76FF03] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="absolute right-4 top-4 bg-white border-2 border-black rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000] opacity-0 transition-opacity duration-300" style={{ opacity: scrollProgress > 2 ? 1 : 0 }}>
          {Math.round(scrollProgress)}%
        </div>
      </div>

      {/* Header */}
      <header className={`bg-[#FCF9F8] px-4 sm:px-6 lg:px-12 py-4 sm:py-6 relative z-50 max-w-[1600px] mx-auto w-full ${isMobile ? 'sticky top-0' : 'relative'}`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center w-[80px] h-[45px] sm:w-[100px] sm:h-[55px] lg:w-[131px] lg:h-[70px] bg-black text-white text-sm sm:text-lg lg:text-xl font-medium hover:bg-[#007BFF] transition-colors">
              PS.
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link to="/about" className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
              About Me
            </Link>
            <Link to="/projects" className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
              Projects
            </Link>
            <Link to="/freelance" className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
              Freelance
            </Link>
          </nav>

          <Link to="/contact">
            <Button variant="outline" className="hidden md:flex text-white font-bold text-[14px] lg:text-[16px] tracking-[1.23px] px-[30px] lg:px-[50px] py-[15px] lg:py-[25px] rounded-none border-3 border-black bg-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#FFDE59] hover:text-black transition-all duration-200">
              Contact Me
            </Button>
          </Link>

          <button className="md:hidden p-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-[#FCF9F8] border-t-2 border-black p-4 z-50 shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col space-y-4">
              <Link to="/about" className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>About Me</Link>
              <Link to="/projects" className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
              <Link to="/freelance" className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Freelance</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="text-white font-bold text-[16px] tracking-[1.23px] px-[30px] py-[15px] rounded-none w-full justify-center mt-2 border-3 border-black bg-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#FFDE59] hover:text-black transition-all duration-200">
                  Contact Me
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Case Study Progress Nav - Right Side */}
      <nav className={`fixed right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ease-in-out hidden lg:block ${showVerticalNav ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}>
        <div className="bg-white border-2 border-black rounded-[20px] shadow-[4px_4px_0_0_#000] p-3">
          <div className="flex flex-col space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.ref)}
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all duration-200 text-left min-w-[90px] ${
                  activeSection === section.id
                    ? 'bg-black text-white shadow-[2px_2px_0_0_#00E676]'
                    : 'text-gray-400 hover:text-black hover:bg-gray-100'
                }`}
                title={section.label}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ============================================ */}
      {/* 1. HERO SECTION - Project Overview */}
      {/* ============================================ */}
      <section ref={heroRef} className="bg-[#0A0A0A] pt-8 sm:pt-16 pb-16 sm:pb-24 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-0 w-32 h-32 bg-[#00E676] rounded-l-full border-l-4 border-y-4 border-[#00E676]/30 hidden lg:block shadow-[-8px_8px_0_0_rgba(0,230,118,0.1)]"></div>
        <div className="absolute top-40 left-10 w-16 h-16 bg-[#1A1A2E] rotate-45 border-4 border-[#00E676]/20 hidden lg:block"></div>
        <div className="absolute bottom-20 right-16 w-20 h-20 border-4 border-[#00E676]/20 rounded-full border-dashed hidden lg:block"></div>
        <div className="absolute bottom-40 left-20 w-10 h-10 bg-[#00E676]/10 rounded-full hidden lg:block"></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm font-bold">
            <Link to="/projects" className="text-gray-400 hover:text-[#00E676] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Projects
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-[#00E676]">Gym & Fitness</span>
          </div>

          {/* Project Title Block */}
          <div className="mb-12">
            <div className="inline-block relative mb-6">
              <div className="absolute -inset-2 bg-[#00E676] transform rotate-2 border-2 border-[#00E676]/50 shadow-[4px_4px_0_0_#00E676]"></div>
              <div className="relative bg-[#1A1A2E] border-2 border-[#00E676]/30 px-6 py-1 z-10">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2 text-[#00E676]">
                  <Sparkles className="w-4 h-4" fill="currentColor" />
                  Case Study
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-black leading-[0.95] text-white uppercase tracking-tighter mb-6">
              Gym & Fitness<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] to-[#76FF03]">Mobile App</span>
            </h1>

            <p className="text-lg sm:text-xl font-bold text-gray-300 max-w-3xl leading-relaxed">
              A sleek, dark-mode fitness app interface designed for peak performance — utilizing vibrant Electric Green accents to highlight progress metrics and a card-based layout that makes workout tracking both intuitive and visually engaging.
            </p>
          </div>

          {/* Project Meta Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: <Users className="w-5 h-5" />, label: "Role", value: "UI/UX Designer" },
              { icon: <Clock className="w-5 h-5" />, label: "Duration", value: "1.5 Weeks" },
              { icon: <Smartphone className="w-5 h-5" />, label: "Platform", value: "Mobile App" },
              { icon: <Palette className="w-5 h-5" />, label: "Tools", value: "Figma" },
            ].map((meta, i) => (
              <div key={i} className="bg-[#1A1A2E] border-3 border-[#00E676]/30 p-4 sm:p-5 shadow-[6px_6px_0_0_rgba(0,230,118,0.2)] hover:shadow-[8px_8px_0_0_rgba(0,230,118,0.3)] hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-2 mb-2 text-[#00E676]/60">
                  {meta.icon}
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{meta.label}</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-white">{meta.value}</div>
              </div>
            ))}
          </div>

          {/* Hero Mockup Banner */}
          <div className="relative bg-[#1A1A2E] border-4 border-[#00E676]/30 rounded-[20px] overflow-hidden shadow-[12px_12px_0_0_rgba(0,230,118,0.15)]">
            {/* Browser Chrome */}
            <div className="h-10 bg-[#1A1A2E] border-b-4 border-[#00E676]/20 flex items-center px-4 justify-between shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFDE59]"></div>
                <div className="w-3 h-3 rounded-full bg-[#00E676]"></div>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500">gym-fitness.app</div>
              <div className="w-12"></div>
            </div>
            <img
              src={getAssetPath('images/projects/gym_1.png')}
              alt="Gym & Fitness App - Main Screen"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. PROBLEM STATEMENT */}
      {/* ============================================ */}
      <section ref={problemRef} className="bg-white py-20 sm:py-28 border-t-4 border-black relative overflow-hidden">
        <div className="absolute top-10 right-10 w-24 h-24 bg-[#FF9F9F] rounded-full border-4 border-black hidden lg:block opacity-20"></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Section Label */}
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block bg-[#FF9F9F] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform -rotate-2">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> 02
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none">The Problem</h2>
            </div>

            {/* Content */}
            <div className="lg:w-2/3">
              <div className="bg-[#FCF9F8] border-4 border-black p-8 sm:p-10 shadow-[8px_8px_0_0_#000] mb-8">
                <p className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed mb-6">
                  Fitness enthusiasts lacked a visually engaging, intuitive mobile experience that could track workouts, monitor progress, and keep them motivated — all within a single app.
                </p>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  Most existing fitness apps prioritized functionality over experience, resulting in cluttered interfaces with poor information hierarchy. Users struggled to quickly assess their progress, felt overwhelmed by data-heavy dashboards, and frequently abandoned apps within the first week due to poor usability. The disconnect between strong fitness features and poor UX created a significant opportunity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { stat: "72%", desc: "of users abandon fitness apps within the first week" },
                  { stat: "3.2s", desc: "average time users spend before deciding to stay or leave" },
                  { stat: "58%", desc: "cite poor design as the main reason for switching apps" },
                ].map((item, i) => (
                  <div key={i} className="bg-black text-white p-5 border-3 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
                    <div className="text-3xl font-black mb-1">{item.stat}</div>
                    <div className="text-xs uppercase tracking-wider font-bold text-gray-300">{item.desc}</div>
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
      <section ref={goalsRef} className="bg-[#0A0A0A] py-20 sm:py-28 border-t-4 border-black relative">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(0,230,118,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.3 }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#00E676] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4" /> 03
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Goals & Objectives</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Activity className="w-6 h-6" />, title: "Dark-Mode First", desc: "Design a premium dark-mode interface that reduces eye strain during gym sessions and creates an immersive workout experience." },
              { icon: <Eye className="w-6 h-6" />, title: "Instant Clarity", desc: "Surface key workout metrics — sets, reps, calories, and progress — at a glance without requiring deep navigation." },
              { icon: <TrendingUp className="w-6 h-6" />, title: "Progress Motivation", desc: "Visualize fitness progress through dynamic charts and streak indicators that keep users engaged and motivated." },
              { icon: <Zap className="w-6 h-6" />, title: "Quick Start Workouts", desc: "Enable users to begin a workout within 2 taps from launch, minimizing friction between intent and action." },
              { icon: <Layers className="w-6 h-6" />, title: "Card-Based Layout", desc: "Build a modular, card-driven interface that organizes different workout types and stats into scannable chunks." },
              { icon: <Heart className="w-6 h-6" />, title: "Personalized Experience", desc: "Create adaptive interfaces that adjust content and recommendations based on user preferences and fitness level." },
            ].map((goal, i) => (
              <div key={i} className="bg-[#1A1A2E] border-4 border-[#00E676]/20 p-6 shadow-[6px_6px_0_0_rgba(0,230,118,0.15)] hover:shadow-[10px_10px_0_0_rgba(0,230,118,0.25)] hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#00E676] border-3 border-[#00E676] rounded-full flex items-center justify-center mb-4 shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] group-hover:bg-white group-hover:text-black transition-colors text-black">
                  {goal.icon}
                </div>
                <h3 className="text-xl font-black text-white uppercase mb-2">{goal.title}</h3>
                <p className="text-sm font-medium text-gray-400 leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 4. RESEARCH & DISCOVERY */}
      {/* ============================================ */}
      <section ref={researchRef} className="bg-white py-20 sm:py-28 border-t-4 border-black relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-[#B8C0FF] rotate-12 border-4 border-black hidden lg:block opacity-30"></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block bg-[#B8C0FF] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform rotate-1">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Search className="w-4 h-4" /> 04
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none">Research & Discovery</h2>
            </div>

            <div className="lg:w-2/3 space-y-8">
              {/* Competitor Analysis */}
              <div className="bg-[#FCF9F8] border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00E676] rounded-full"></div> Competitor Analysis
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed mb-4">
                  Analyzed top-performing fitness apps including Nike Training Club, Fitbod, Strong, and Hevy. Key finding: apps with dark-mode interfaces and gamified progress tracking had 40% higher retention rates. However, most neglected visual hierarchy — burying workout summaries behind multiple taps.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Nike Training Club', 'Fitbod', 'Strong', 'Hevy', 'JEFIT'].map((tool, i) => (
                    <span key={i} className="bg-white border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-wider">{tool}</span>
                  ))}
                </div>
              </div>

              {/* User Persona */}
              <div className="bg-[#FCF9F8] border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF6B6B] rounded-full"></div> Primary User Persona
                </h3>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-20 h-20 bg-[#00E676] border-3 border-black rounded-full flex items-center justify-center text-2xl font-black shadow-[3px_3px_0_0_#000] shrink-0">
                    JM
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1">Jake — Gym Enthusiast & Intermediate Lifter</h4>
                    <p className="text-sm text-gray-500 font-bold mb-3">Age 26 • Trains 5x/week • Values speed and aesthetics in apps</p>
                    <p className="text-base font-medium text-gray-600 leading-relaxed">
                      Jake wants to quickly log his workouts, see his weekly progress at a glance, and feel motivated by a premium-feeling app that matches his dedication. He's frustrated by apps that look generic, load slowly, or require too many taps to start a session. He values dark mode, clean typography, and visual progress indicators.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pain Points */}
              <div className="bg-[#FCF9F8] border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FFDE59] rounded-full"></div> Key Pain Points
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Most fitness apps feel cluttered and overwhelming during workouts",
                    "Progress tracking is buried behind multiple navigation levels",
                    "Generic light-mode designs cause eye strain in dimly lit gyms",
                    "Starting a workout session requires too many taps and decisions",
                  ].map((pain, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border-2 border-black p-4">
                      <div className="w-6 h-6 bg-[#FF9F9F] border-2 border-black rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-sm font-medium text-gray-700">{pain}</p>
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
      <section ref={architectureRef} className="bg-[#A0E7E5] py-20 sm:py-28 border-t-4 border-black relative">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.04 }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-white border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Layout className="w-4 h-4" /> 05
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">Information Architecture</h2>
            <p className="text-lg font-bold text-black/70 max-w-2xl mx-auto mt-4">
              Organized around the user's core fitness journey: discover, track, analyze, and stay motivated.
            </p>
          </div>

          {/* Sitemap / IA Flow */}
          <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[8px_8px_0_0_#000] mb-10">
            <div className="text-center mb-8">
              <div className="inline-block bg-black text-white px-6 py-3 text-lg font-black uppercase tracking-wider">
                Gym & Fitness App
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Home", items: ["Daily Summary", "Active Calories", "Workout Streak", "Quick Start"] },
                { name: "Workouts", items: ["Browse Plans", "Custom Workout", "Exercise Library", "Rest Timer"] },
                { name: "Progress", items: ["Weekly Stats", "Body Metrics", "PR Tracking", "Goal Progress"] },
                { name: "Profile", items: ["Settings", "Achievements", "Workout History", "Preferences"] },
              ].map((section, i) => (
                <div key={i} className="border-3 border-black p-4 bg-[#FCF9F8]">
                  <div className="bg-[#00E676] text-black px-3 py-1.5 text-xs font-black uppercase tracking-wider mb-3 text-center border-2 border-black shadow-[2px_2px_0_0_#000]">
                    {section.name}
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="text-xs font-bold text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* User Flow */}
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
            <h3 className="text-xl font-black uppercase mb-6 text-center">Primary User Flow</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {[
                "Open App",
                "View Dashboard",
                "Start Workout",
                "Log Exercises",
                "Complete Session",
                "View Progress"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-[#00E676] border-3 border-black px-4 py-2 text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0_0_#000] whitespace-nowrap">
                    {step}
                  </div>
                  {i < 5 && <ArrowRight className="w-5 h-5 text-black shrink-0 hidden sm:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 6. WIREFRAMES */}
      {/* ============================================ */}
      <section ref={wireframesRef} className="bg-white py-20 sm:py-28 border-t-4 border-black relative">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block bg-gray-200 border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform -rotate-1">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Layout className="w-4 h-4" /> 06
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4">Wireframes</h2>
              <p className="text-base font-medium text-gray-600 leading-relaxed">
                Mapped out the app's mobile-first layout through low-fidelity wireframes — prioritizing thumb-reach zones, one-hand usability, and glanceable data hierarchy for active gym users.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div className="bg-[#FCF9F8] border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-4">Structure Decisions</h3>
                <ul className="space-y-4">
                  {[
                    { title: "Bottom Tab Navigation", desc: "Primary navigation sits at the bottom for easy thumb access — critical for one-handed use during gym sessions." },
                    { title: "Dashboard-First Home", desc: "The home screen surfaces daily stats, active calories, and current streak immediately — no scrolling required for essentials." },
                    { title: "Card-Based Exercise View", desc: "Each exercise is encapsulated in a card with set/rep tracking, allowing quick scanning and inline editing during workouts." },
                    { title: "Prominent CTA Placement", desc: "'Start Workout' button is always visible and accessible within 1 tap from any screen, reducing friction to action." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5">{i + 1}</div>
                      <div>
                        <h4 className="font-black text-black mb-1">{item.title}</h4>
                        <p className="text-sm font-medium text-gray-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FCF9F8] border-4 border-black p-6 shadow-[6px_6px_0_0_#000]">
                <p className="text-sm font-bold text-gray-500 text-center uppercase tracking-wider">
                  Wireframe structure informed the final dark-mode high-fidelity design below
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 7. VISUAL DESIGN SYSTEM */}
      {/* ============================================ */}
      <section ref={designSystemRef} className="bg-[#0A0A0A] py-20 sm:py-28 border-t-4 border-[#00E676]/30 relative">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#00E676] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_rgba(0,230,118,0.3)] mb-4 transform rotate-1">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2 text-black">
                <Palette className="w-4 h-4" /> 07
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Visual Design System</h2>
            <p className="text-lg font-bold text-gray-400 max-w-2xl mx-auto mt-4">
              A high-energy dark-mode system built around Electric Green accents for maximum visual impact and readability.
            </p>
          </div>

          {/* Color Palette */}
          <div className="bg-[#1A1A2E] border-4 border-[#00E676]/20 p-8 sm:p-10 shadow-[8px_8px_0_0_rgba(0,230,118,0.1)] mb-8">
            <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2 text-white">
              <div className="w-2 h-2 bg-[#00E676] rounded-full"></div> Color Palette
            </h3>
            <p className="text-base font-medium text-gray-400 mb-6 leading-relaxed">
              The dark palette anchored by deep navy and charcoal creates an immersive, distraction-free environment. Electric Green serves as the primary accent — drawing the eye to active states, progress indicators, and CTAs without overwhelming the interface.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { color: '#0A0A0A', name: 'True Black', usage: 'Background' },
                { color: '#1A1A2E', name: 'Dark Navy', usage: 'Cards / Surfaces' },
                { color: '#00E676', name: 'Electric Green', usage: 'Primary Accent' },
                { color: '#76FF03', name: 'Lime', usage: 'Highlights / Active' },
                { color: '#FF6B6B', name: 'Coral Red', usage: 'Calories / Alerts' },
                { color: '#E0E0E0', name: 'Light Gray', usage: 'Text / Labels' },
              ].map((c, i) => (
                <div key={i} className="group">
                  <div className="aspect-square border-3 border-[#00E676]/20 shadow-[3px_3px_0_0_rgba(0,230,118,0.15)] group-hover:shadow-[5px_5px_0_0_rgba(0,230,118,0.25)] group-hover:-translate-y-1 transition-all duration-200 rounded-lg" style={{ backgroundColor: c.color }}></div>
                  <div className="mt-2">
                    <div className="text-xs font-black text-white">{c.name}</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase">{c.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography & Components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A1A2E] border-4 border-[#00E676]/20 p-8 shadow-[8px_8px_0_0_rgba(0,230,118,0.1)]">
              <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2 text-white">
                <div className="w-2 h-2 bg-[#FF6B6B] rounded-full"></div> Typography
              </h3>
              <div className="space-y-4">
                <div className="border-b-2 border-dashed border-gray-700 pb-4">
                  <div className="text-3xl font-black text-white">SF Pro / Bold</div>
                  <div className="text-xs font-bold text-gray-500 uppercase mt-1">Primary Headings</div>
                </div>
                <div className="border-b-2 border-dashed border-gray-700 pb-4">
                  <div className="text-xl font-semibold text-gray-300">SF Pro / Semi-Bold</div>
                  <div className="text-xs font-bold text-gray-500 uppercase mt-1">Subheadings & Metrics</div>
                </div>
                <div>
                  <div className="text-base font-medium text-gray-400">SF Pro / Regular</div>
                  <div className="text-xs font-bold text-gray-500 uppercase mt-1">Body & Descriptions</div>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-500 mt-6 leading-relaxed">
                SF Pro was chosen for its iOS-native feel and excellent legibility in dark mode — critical for quick data scanning during active workout sessions.
              </p>
            </div>

            <div className="bg-[#1A1A2E] border-4 border-[#00E676]/20 p-8 shadow-[8px_8px_0_0_rgba(0,230,118,0.1)]">
              <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2 text-white">
                <div className="w-2 h-2 bg-[#00E676] rounded-full"></div> Key Components
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Workout Cards", desc: "Dark cards with green accent borders for active sessions" },
                  { name: "Progress Circles", desc: "Animated ring indicators for daily goals and targets" },
                  { name: "Metric Tiles", desc: "Compact stat displays with trend arrows and sparklines" },
                  { name: "Exercise Rows", desc: "Swipeable list items with inline set/rep controls" },
                  { name: "Timer Module", desc: "Full-screen rest timer with haptic-ready countdown" },
                  { name: "Bottom Navigation", desc: "4-tab bar with active state glow effect" },
                ].map((comp, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#0A0A0A] border-2 border-[#00E676]/10 p-3 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-[#00E676] rounded-full shrink-0"></div>
                    <div>
                      <span className="text-sm font-black text-white">{comp.name}</span>
                      <span className="text-xs font-medium text-gray-500 ml-2">— {comp.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 8. HIGH-FIDELITY SCREENS */}
      {/* ============================================ */}
      <section ref={hifiRef} className="bg-[#0A0A0A] py-20 sm:py-28 border-t-4 border-[#00E676]/20 relative">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#FFDE59] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#fff] mb-4">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Monitor className="w-4 h-4" /> 08
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">High-Fidelity Screens</h2>
            <p className="text-lg font-bold text-gray-400 max-w-2xl mx-auto mt-4">
              The final dark-mode design — where Energy meets interface, with Electric Green driving every interaction.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative bg-[#1A1A2E] border-4 border-[#00E676]/20 rounded-[16px] overflow-hidden shadow-[8px_8px_0_0_rgba(0,230,118,0.1)] hover:shadow-[12px_12px_0_0_rgba(0,230,118,0.2)] hover:-translate-y-2 transition-all duration-300 cursor-pointer group ${i === 0 ? 'md:col-span-2' : ''}`}
                onClick={() => setSelectedImage(i)}
              >
                <img src={img} alt={`Gym & Fitness App Screen ${i + 1}`} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-[#00E676] border-3 border-black px-6 py-3 rounded-full shadow-[4px_4px_0_0_#000] flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-5 h-5 text-black" />
                    <span className="font-black uppercase tracking-wider text-sm text-black">View Full</span>
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
      <section ref={prototypeRef} className="bg-white py-20 sm:py-28 border-t-4 border-black relative">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block bg-[#A0E7E5] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4" /> 09
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4">Prototype & Interactions</h2>
              <p className="text-base font-medium text-gray-600 leading-relaxed">
                Every interaction was designed for speed and energy — matching the intensity of the user's workout.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-6">
              {[
                { title: "Workout Card Swipe Actions", desc: "Swipe-to-complete gesture on exercise cards lets users mark sets done without stopping their flow. The card animates with a satisfying green checkmark pulse.", color: "bg-[#00E676]" },
                { title: "Progress Ring Animations", desc: "Circular progress indicators animate smoothly as users approach daily goals — creating a dopamine loop that encourages completion of remaining targets.", color: "bg-[#FFDE59]" },
                { title: "Tab Bar Glow Effect", desc: "Active tab glows with an Electric Green highlight, providing immediate spatial orientation within the app without requiring cognitive effort.", color: "bg-[#A0E7E5]" },
                { title: "Rest Timer Haptic Feedback", desc: "The full-screen rest timer pulses with visual breathing animations and triggers haptic feedback when time expires — ensuring users don't miss their next set.", color: "bg-[#FF9F9F]" },
              ].map((item, i) => (
                <div key={i} className="bg-[#FCF9F8] border-4 border-black p-6 shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 ${item.color} border-2 border-black rounded-full shrink-0 mt-2`}></div>
                    <div>
                      <h3 className="text-lg font-black text-black uppercase mb-2">{item.title}</h3>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Figma Prototype CTA */}
              <a
                href="https://www.figma.com/design/nOCky1ssTz90ClomYvwDgC/Gym---Fitness-Mobile-App?node-id=0-1&t=E4kjKBqEACiGHMMe-1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-black text-white border-4 border-black px-8 py-5 font-black text-lg uppercase tracking-wider shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 hover:bg-[#00E676] hover:text-black transition-all duration-300 w-full text-center"
              >
                View Interactive Prototype <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 10. CHALLENGES & SOLUTIONS */}
      {/* ============================================ */}
      <section ref={challengesRef} className="bg-[#B8C0FF] py-20 sm:py-28 border-t-4 border-black relative">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px', opacity: 0.2 }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-white border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform -rotate-1">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> 10
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">Challenges & Solutions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                challenge: "Maintaining readability in dark mode without sacrificing visual intensity",
                solution: "Established a strict contrast system: white text (#E0E0E0) on dark surfaces (#1A1A2E), with Electric Green reserved exclusively for interactive elements and progress indicators — achieving WCAG AA compliance throughout.",
              },
              {
                challenge: "Designing for one-handed use during active workouts",
                solution: "Placed all primary actions within thumb-reach zones (bottom 40% of screen). Used swipe gestures for common actions (complete set, skip exercise) so users can interact without precise tapping while holding equipment.",
              },
              {
                challenge: "Avoiding visual monotony in a dark-mode-only interface",
                solution: "Introduced subtle depth through layered card surfaces with varying opacity levels (bg-dark at 100%, cards at 90%, elevated elements at 80%) and Electric Green accent gradients to create visual rhythm without breaking the dark aesthetic.",
              },
              {
                challenge: "Communicating progress without overwhelming during a workout",
                solution: "Used progressive disclosure: during active workouts, only current exercise and next-up preview are shown. Full session summary and detailed analytics are revealed post-workout — keeping the active interface focused and distraction-free.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 bg-[#FF9F9F]/30 border-b-4 md:border-b-0 md:border-r-4 border-black">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-[#FF6B6B]" />
                      <span className="text-xs font-black uppercase tracking-widest text-[#FF6B6B]">Challenge</span>
                    </div>
                    <p className="text-base font-bold text-black leading-relaxed">{item.challenge}</p>
                  </div>
                  <div className="p-8 bg-[#A0E7E5]/20">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-[#00C9A7]" />
                      <span className="text-xs font-black uppercase tracking-widest text-[#00C9A7]">Solution</span>
                    </div>
                    <p className="text-base font-medium text-gray-700 leading-relaxed">{item.solution}</p>
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
      <section ref={resultsRef} className="bg-[#0A0A0A] py-20 sm:py-28 border-t-4 border-[#00E676]/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(0,230,118,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#FFDE59] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#fff] mb-4">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> 11
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Expected Impact</h2>
            <p className="text-lg font-bold text-gray-400 max-w-2xl mx-auto mt-4">
              Projected outcomes based on usability testing and design validation with target users.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { metric: "2 taps", label: "From launch to starting a workout session", color: "bg-[#00E676]" },
              { metric: "45%", label: "Reduction in perceived app complexity vs competitors", color: "bg-[#FFDE59]" },
              { metric: "88%", label: "Task completion rate in usability testing", color: "bg-[#FF9F9F]" },
              { metric: "94%", label: "Users preferred dark mode over light alternatives", color: "bg-[#B8C0FF]" },
            ].map((item, i) => (
              <div key={i} className={`${item.color} border-4 border-black p-6 shadow-[6px_6px_0_0_rgba(255,255,255,0.15)] hover:shadow-[10px_10px_0_0_rgba(255,255,255,0.2)] hover:-translate-y-2 transition-all duration-300`}>
                <div className="text-4xl sm:text-5xl font-black text-black mb-2">{item.metric}</div>
                <div className="text-xs font-bold text-black/70 uppercase tracking-wider leading-relaxed">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 border-2 border-white/20 rounded-[16px] p-8 text-center">
            <p className="text-base font-medium text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Key metrics to track post-launch: daily active users, average session duration, workout completion rate, 7-day retention, and user satisfaction score. These will validate whether the dark-mode, card-based approach truly enhances the fitness tracking experience.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 12. REFLECTION / LEARNINGS */}
      {/* ============================================ */}
      <section ref={reflectionRef} className="bg-[#FCF9F8] py-20 sm:py-28 border-t-4 border-black relative">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block bg-[#FFDE59] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform rotate-1">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> 12
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none">Reflection</h2>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00E676] rounded-full"></div> What I Learned
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  Designing a dark-mode-first interface taught me that darkness is not just an aesthetic choice — it's a functional decision. The contrast between dark surfaces and vibrant green accents creates a natural visual hierarchy that guides the eye without additional UI chrome. I learned that in fitness contexts, less UI means more focus, and that the best interfaces disappear during active use, only surfacing information exactly when needed.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FFDE59] rounded-full"></div> What I'd Improve
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  If revisiting this project, I would invest more time in designing micro-animations for set completion and PR celebrations — those small dopamine-triggering moments that turn a utility app into an experience users love. I'd also explore Apple Watch and wearable companion screens to extend the workout tracking experience beyond the phone.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF9F9F] rounded-full"></div> What I'd Do Differently
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  I would conduct contextual inquiry sessions — observing real gym-goers using their phones between sets — earlier in the design process. Understanding the physical context (sweaty hands, limited attention, equipment in use) would have influenced gesture and target-size decisions from day one rather than being validated retroactively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 13. CTA SECTION */}
      {/* ============================================ */}
      <section ref={ctaRef} className="bg-white py-20 sm:py-28 border-t-4 border-black relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#00E676] rounded-full border-4 border-black hidden lg:block opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#FFDE59] rotate-45 border-4 border-black hidden lg:block opacity-20"></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="bg-[#0A0A0A] border-4 border-[#00E676]/30 p-10 sm:p-16 shadow-[12px_12px_0_0_#00E676] text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
              Like what you see?<br />
              <span className="text-[#00E676]">Let's build something together.</span>
            </h2>
            <p className="text-lg font-bold text-gray-400 max-w-xl mx-auto mb-10">
              I'm always open to discussing new projects, design challenges, and opportunities to create impactful digital experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.figma.com/design/nOCky1ssTz90ClomYvwDgC/Gym---Fitness-Mobile-App?node-id=0-1&t=E4kjKBqEACiGHMMe-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00E676] text-black border-4 border-[#00E676] px-8 py-4 font-black text-lg uppercase tracking-wider shadow-[6px_6px_0_0_rgba(0,230,118,0.3)] hover:shadow-[8px_8px_0_0_rgba(0,230,118,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                View Prototype <ExternalLink className="w-5 h-5" />
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-transparent text-white border-4 border-white/30 px-8 py-4 font-black text-lg uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              >
                Back to Projects <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#FFDE59] text-black border-4 border-black px-8 py-4 font-black text-lg uppercase tracking-wider shadow-[6px_6px_0_0_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300"
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
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-12 h-12 bg-white border-3 border-black rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-10 shadow-[4px_4px_0_0_#000]"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-[#1A1A2E] border-4 border-[#00E676]/30 rounded-[16px] overflow-hidden shadow-[12px_12px_0_0_rgba(0,230,118,0.1)]">
              <img
                src={galleryImages[selectedImage]}
                alt={`Gym & Fitness App Screen ${selectedImage + 1}`}
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            </div>
            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1)}
                className="w-12 h-12 bg-[#00E676] border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-white transition-all text-black"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="bg-white border-3 border-black px-4 py-2 rounded-full text-sm font-black shadow-[4px_4px_0_0_#000]">
                {selectedImage + 1} / {galleryImages.length}
              </span>
              <button
                onClick={() => setSelectedImage(selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0)}
                className="w-12 h-12 bg-[#00E676] border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-white transition-all text-black"
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
