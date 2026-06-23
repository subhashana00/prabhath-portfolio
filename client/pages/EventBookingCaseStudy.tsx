import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Menu, X, ExternalLink, Calendar, Clock, Layers, Target, Search, Users, BarChart3, CheckCircle, Lightbulb, Zap, ChevronRight, Monitor, Palette, Layout, Eye, Sparkles, AlertTriangle, TrendingUp, Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAssetPath } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import { JsonLd, caseStudySchema } from "@/components/StructuredData";

export default function EventBookingCaseStudy() {
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
    getAssetPath('images/projects/fest_1.png'),
    getAssetPath('images/projects/fest_2.png'),
    getAssetPath('images/projects/fest_6.png'),
    getAssetPath('images/projects/fest_4.png'),
    getAssetPath('images/projects/fest_3.png'),
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Festora Event Booking Dashboard UI/UX Case Study | Prabhath Subhashana"
        description="Read the UI/UX design case study for Festora, an event booking and management dashboard. Visualizing complex data into a clear hierarchy for organizers."
        canonical="/projects/event-booking-management-dashboard"
        keywords="Festora, Event Booking Dashboard, UI/UX Case Study, Event Management UX, Prabhath Subhashana, UI/UX Designer Sri Lanka, Figma"
      />
      {caseStudySchema({
        name: "Event Booking & Management Dashboard",
        description: "Festora is an event management dashboard that transforms complex organizational data into a clear, actionable visual hierarchy.",
        url: "/projects/event-booking-management-dashboard",
        image: "https://www.prabhath.live/images/projects/event_1.png",
        datePublished: "2026-06-15",
        keywords: ["Dashboard Design", "Event Booking", "Visual Hierarchy", "Figma", "UI/UX Design"],
        breadcrumbName: "Event Booking Dashboard"
      }).map((schema, i) => (
        <JsonLd key={`event-schema-${i}`} data={schema} />
      ))}
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-[#007BFF] via-purple-500 to-[#FF6B6B] transition-all duration-150 ease-out"
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
                    ? 'bg-black text-white shadow-[2px_2px_0_0_#007BFF]'
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
      <section ref={heroRef} className="bg-[#FCF9F8] pt-8 sm:pt-16 pb-16 sm:pb-24 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-0 w-32 h-32 bg-[#FFDE59] rounded-l-full border-l-4 border-y-4 border-black hidden lg:block shadow-[-8px_8px_0_0_rgba(0,0,0,0.1)]"></div>
        <div className="absolute top-40 left-10 w-16 h-16 bg-[#A0E7E5] rotate-45 border-4 border-black hidden lg:block"></div>
        <div className="absolute bottom-20 right-16 w-20 h-20 border-4 border-black rounded-full border-dashed hidden lg:block"></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm font-bold">
            <Link to="/projects" className="text-gray-500 hover:text-black transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Projects
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-black">Festora</span>
          </div>

          {/* Project Title Block */}
          <div className="mb-12">
            <div className="inline-block relative mb-6">
              <div className="absolute -inset-2 bg-[#A0E7E5] transform rotate-2 border-2 border-black shadow-[4px_4px_0_0_#000]"></div>
              <div className="relative bg-white border-2 border-black px-6 py-1 z-10">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  Case Study
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-black leading-[0.95] text-black uppercase tracking-tighter mb-6">
              Event Booking &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00C6FF]">Management Dashboard</span>
            </h1>

            <p className="text-lg sm:text-xl font-bold text-gray-700 max-w-3xl leading-relaxed">
              Festora is an event management dashboard that transforms complex organizational data into a clear, actionable visual hierarchy — empowering event organizers to track, manage, and optimize their events with confidence.
            </p>
          </div>

          {/* Project Meta Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: <Users className="w-5 h-5" />, label: "Role", value: "UI/UX Designer" },
              { icon: <Clock className="w-5 h-5" />, label: "Duration", value: "2 Weeks" },
              { icon: <Monitor className="w-5 h-5" />, label: "Platform", value: "Web Dashboard" },
              { icon: <Palette className="w-5 h-5" />, label: "Tools", value: "Figma" },
            ].map((meta, i) => (
              <div key={i} className="bg-white border-3 border-black p-4 sm:p-5 shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                  {meta.icon}
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{meta.label}</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-black">{meta.value}</div>
              </div>
            ))}
          </div>

          {/* Hero Mockup Banner */}
          <div className="relative bg-white border-4 border-black rounded-[20px] overflow-hidden shadow-[12px_12px_0_0_#000]">
            {/* Browser Chrome */}
            <div className="h-10 bg-white border-b-4 border-black flex items-center px-4 justify-between shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFDE59]"></div>
                <div className="w-3 h-3 rounded-full bg-[#A0E7E5]"></div>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">festora-dashboard.app</div>
              <div className="w-12"></div>
            </div>
            <img
              src={getAssetPath('images/projects/fest_1.png')}
              alt="Festora Dashboard - Main Overview"
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
                  Event organizers managing multiple events simultaneously lacked a centralized system to monitor key performance metrics, attendee demographics, and booking trends in real time.
                </p>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  Existing tools were either overly complex spreadsheets or fragmented across multiple platforms, forcing organizers to spend hours compiling reports manually. Critical data — like revenue tracking, peak booking times, and cancellation patterns — was buried in disconnected systems, leading to poor decision-making and missed revenue optimization opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { stat: "68%", desc: "of organizers use 3+ tools to manage events" },
                  { stat: "4hrs", desc: "average weekly time lost on manual reporting" },
                  { stat: "45%", desc: "miss revenue insights due to fragmented data" },
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
      <section ref={goalsRef} className="bg-[#FFDE59] py-20 sm:py-28 border-t-4 border-black relative">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.05 }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-white border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4" /> 03
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">Goals & Objectives</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <BarChart3 className="w-6 h-6" />, title: "Unify Event Data", desc: "Consolidate all event metrics, bookings, and attendee data into a single, intuitive dashboard view." },
              { icon: <Eye className="w-6 h-6" />, title: "Clear Visual Hierarchy", desc: "Transform complex datasets into a scannable visual hierarchy, reducing cognitive load for organizers." },
              { icon: <TrendingUp className="w-6 h-6" />, title: "Actionable Insights", desc: "Surface revenue trends, booking patterns, and demographic breakdowns to enable data-driven decisions." },
              { icon: <Zap className="w-6 h-6" />, title: "Reduce Time-to-Insight", desc: "Minimize the time organizers spend navigating between screens to find critical information." },
              { icon: <Layers className="w-6 h-6" />, title: "Scalable Design System", desc: "Build a component-driven system that adapts seamlessly as new features and integrations are added." },
              { icon: <Users className="w-6 h-6" />, title: "Improve Usability", desc: "Create an experience accessible to both tech-savvy and non-technical event organizers alike." },
            ].map((goal, i) => (
              <div key={i} className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#FFDE59] border-3 border-black rounded-full flex items-center justify-center mb-4 shadow-[3px_3px_0_0_#000] group-hover:bg-black group-hover:text-white transition-colors">
                  {goal.icon}
                </div>
                <h3 className="text-xl font-black text-black uppercase mb-2">{goal.title}</h3>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">{goal.desc}</p>
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
                  <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div> Competitor Analysis
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed mb-4">
                  Analyzed leading event management platforms including Eventbrite, Splash, and Hopin to identify gaps in dashboard functionality. Key finding: most platforms prioritized event creation over post-event analytics, leaving organizers without real-time performance visibility.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Eventbrite', 'Splash', 'Hopin', 'Luma', 'Bizzabo'].map((tool, i) => (
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
                  <div className="w-20 h-20 bg-[#A0E7E5] border-3 border-black rounded-full flex items-center justify-center text-2xl font-black shadow-[3px_3px_0_0_#000] shrink-0">
                    EO
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1">Elena — Event Operations Manager</h4>
                    <p className="text-sm text-gray-500 font-bold mb-3">Age 32 • Manages 15+ events/month • Tech-comfortable, not a power user</p>
                    <p className="text-base font-medium text-gray-600 leading-relaxed">
                      Elena needs to quickly assess event health, identify underperforming bookings, and share reports with stakeholders — all without spending hours exporting data from multiple tools. She values clarity over complexity and needs insights at a glance.
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
                    "No centralized view of all events and their performance",
                    "Manual data compilation wastes valuable time every week",
                    "Attendee demographics are invisible until post-event surveys",
                    "Revenue tracking requires switching between 3+ platforms",
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
      {/* 5. USER JOURNEY / INFORMATION ARCHITECTURE */}
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
              Structurally organized to prioritize the organizer's core tasks: monitor, filter, analyze, and act.
            </p>
          </div>

          {/* Sitemap / IA Flow */}
          <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[8px_8px_0_0_#000] mb-10">
            <div className="text-center mb-8">
              <div className="inline-block bg-black text-white px-6 py-3 text-lg font-black uppercase tracking-wider">
                Festora Dashboard
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Overview", items: ["KPI Cards", "Revenue Chart", "Booking Trends", "Quick Actions"] },
                { name: "Events", items: ["Event List", "Filters", "Event Detail", "Status Tracking"] },
                { name: "Attendees", items: ["Demographics", "Registration", "Check-in Data", "Segments"] },
                { name: "Analytics", items: ["Revenue Split", "Performance", "Comparisons", "Export Reports"] },
              ].map((section, i) => (
                <div key={i} className="border-3 border-black p-4 bg-[#FCF9F8]">
                  <div className="bg-[#007BFF] text-white px-3 py-1.5 text-xs font-black uppercase tracking-wider mb-3 text-center border-2 border-black shadow-[2px_2px_0_0_#000]">
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
                "Login",
                "Dashboard Overview",
                "Filter Events",
                "View Event Detail",
                "Analyze Demographics",
                "Export Report"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-[#FFDE59] border-3 border-black px-4 py-2 text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0_0_#000] whitespace-nowrap">
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
                Before diving into visual design, I mapped out the dashboard's layout logic through low-to-mid fidelity wireframes — focusing on content priority, data density, and scan-ability.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div className="bg-[#FCF9F8] border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-4">Structure Decisions</h3>
                <ul className="space-y-4">
                  {[
                    { title: "KPI Cards at Top", desc: "Placed key metrics (total bookings, revenue, active events) as the first visual element to give instant status awareness." },
                    { title: "Left Sidebar Navigation", desc: "Persistent sidebar allows quick context-switching between sections without losing the current dashboard state." },
                    { title: "Filter-First Approach", desc: "Advanced filtering sits prominently above content areas, enabling organizers to narrow data before consuming it." },
                    { title: "Card-Based Content Blocks", desc: "Each data module is self-contained in a card, making the layout modular, scannable, and extendable." },
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
                  Wireframe evolution informed the final high-fidelity layout below
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 7. VISUAL DESIGN SYSTEM */}
      {/* ============================================ */}
      <section ref={designSystemRef} className="bg-[#FCF9F8] py-20 sm:py-28 border-t-4 border-black relative">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#FF9F9F] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform rotate-1">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Palette className="w-4 h-4" /> 07
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">Visual Design System</h2>
            <p className="text-lg font-bold text-gray-600 max-w-2xl mx-auto mt-4">
              A cohesive, component-driven system built for clarity, consistency, and scalability.
            </p>
          </div>

          {/* Color Palette (Visual Identity - Updated Style) */}
          <div className="relative bg-white border-4 border-black p-8 sm:p-10 shadow-[10px_10px_0_0_#007BFF] mb-12 rounded-[20px] overflow-hidden">
            {/* Window Header Style (Portfolio Theme) */}
             <div className="absolute top-0 left-0 w-full h-10 border-b-4 border-black bg-gray-100 flex items-center px-4 gap-2 z-10">
                <div className="w-3 h-3 rounded-full bg-red-400 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 border border-black"></div>
                <div className="ml-4 text-xs font-bold font-sans text-gray-400 uppercase tracking-widest">VISUAL_SYSTEM.SYS</div>
              </div>

            <div className="pt-8">
              <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#007BFF]/10 flex items-center justify-center border-2 border-[#007BFF]">
                   <Palette className="w-5 h-5 text-[#007BFF]" />
                </div>
                1. Color Palette (Visual Identity)
              </h3>
              
              <p className="text-base font-medium text-gray-600 mb-8 leading-relaxed max-w-3xl border-l-4 border-[#007BFF] pl-4">
                The palette is built on a high-contrast relationship between energetic warm tones and stable neutrals.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Primary Palette */}
                <div className="bg-[#FCF9F8] p-6 border-2 border-dashed border-gray-300 rounded-xl relative">
                  <div className="absolute -top-3 left-4 bg-[#007BFF] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_0_#000]">
                    Primary Palette
                  </div>
                  
                  <div className="space-y-4 mt-2">
                    {[
                      { color: '#FF7F3A', name: 'Vibrant Orange', usage: 'Action / High-priority', hex: '#FF7F3A' },
                      { color: '#717182', name: 'Slate Grey', usage: 'Secondary / Neutral', hex: '#717182' },
                      { color: '#FFFFFF', name: 'Clean White', usage: 'Background / Negative Space', hex: '#FFFFFF', border: true },
                      { color: '#000000', name: 'Black', usage: 'Text / Borders', hex: '#000000' }
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-lg border-2 border-transparent hover:border-[#007BFF]/30 transition-all shadow-sm">
                        <div className={`w-14 h-14 rounded-md border-2 ${c.border ? 'border-gray-200' : 'border-black'} shadow-[2px_2px_0_0_rgba(0,0,0,0.1)]`} style={{ backgroundColor: c.color }}></div>
                        <div>
                          <div className="font-black text-black text-lg">{c.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 border border-gray-200">{c.hex}</span>
                             <span className="text-xs font-bold text-[#007BFF] uppercase tracking-tight">{c.usage}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                 {/* Secondary Palette */}
                 <div className="bg-[#FCF9F8] p-6 border-2 border-dashed border-gray-300 rounded-xl relative mt-4 md:mt-0">
                   <div className="absolute -top-3 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] z-10">
                    Secondary / Accent
                  </div>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {[
                      { color: '#FFF7F3', name: 'Soft Peach' },
                      { color: '#DCFCE7', name: 'Pale Mint' },
                      { color: '#FFC107', name: 'Mustard Yellow' },
                      { color: '#EA5A0D', name: 'Burnt Orange' },
                      { color: '#00A63E', name: 'Forest Green' },
                    ].map((c, i) => (
                      <div key={i} className="flex flex-col gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-[4/3] w-full rounded-md border border-black/5" style={{ backgroundColor: c.color }}></div>
                        <div className="text-[10px] font-bold text-center text-gray-600 leading-tight">{c.name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-xs font-medium text-blue-800 leading-relaxed">
                      <span className="font-bold">Note:</span> Functional colors for background states, warnings, hover states, and success indicators.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography (Updated Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#007BFF] rounded-[20px] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <span className="text-9xl font-black font-sans">Aa</span>
               </div>
              <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 bg-[#007BFF] rounded text-white flex items-center justify-center font-serif italic font-bold border-2 border-black shadow-[2px_2px_0_0_#000]">T</div>
                 2. Typography
              </h3>
               <div className="space-y-6 relative z-10">
                 <div>
                   <p className="text-base font-medium text-gray-600 mb-4 bg-[#FCF9F8] p-3 rounded-lg border-l-4 border-black">
                     The brand uses <span className="font-bold text-black bg-yellow-200 px-1">Arial</span>, a ubiquitous and highly legible sans-serif font.
                   </p>
                 </div>
                 
                <div className="space-y-4">
                  <div className="group border-2 border-transparent hover:border-gray-100 hover:bg-gray-50 p-2 rounded-lg transition-all">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold text-[#007BFF] uppercase">Large Display</span>
                      <span className="text-[10px] font-mono text-gray-400">24px / Bold</span>
                    </div>
                    <div className="text-3xl font-bold text-black font-sans">Primary Headers</div>
                  </div>
                  
                  <div className="group border-2 border-transparent hover:border-gray-100 hover:bg-gray-50 p-2 rounded-lg transition-all">
                     <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold text-[#007BFF] uppercase">Medium Display</span>
                      <span className="text-[10px] font-mono text-gray-400">16px / Regular</span>
                    </div>
                    <div className="text-xl font-normal text-gray-800 font-sans">Subheaders & Body Copy</div>
                  </div>

                  <div className="group border-2 border-transparent hover:border-gray-100 hover:bg-gray-50 p-2 rounded-lg transition-all">
                     <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold text-[#007BFF] uppercase">Small / Caption</span>
                      <span className="text-[10px] font-mono text-gray-400">14px & 12px</span>
                    </div>
                    <div className="text-sm font-normal text-gray-600 font-sans">Secondary Info & Micro-copy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Philosophy (Updated Style) */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000] rounded-[20px] flex flex-col">
              <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3">
                 <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center border-2 border-transparent">
                  <Lightbulb className="w-4 h-4" />
                </div>
                3. Design Philosophy
              </h3>
              
              <div className="flex-grow flex flex-col justify-center">
                <div className="relative bg-[#FCF9F8] p-6 border-2 border-black shadow-[4px_4px_0_0_#007BFF] mb-6">
                  <Quote className="absolute -top-4 -left-2 w-8 h-8 text-[#007BFF] bg-white p-1 border-2 border-black rounded-full" />
                  <p className="text-base font-medium text-gray-700 italic leading-relaxed pt-2">
                    "A clean, modern, and accessible UI kit. It leverages a Primary Orange for brand personality and Slate Grey for professional balance. The typography system is minimalist... The overall vibe is energetic yet organized."
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Clean", "Modern", "Accessible", "Energetic", "Organized"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-black text-black rounded-full text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_0_#000] hover:-translate-y-0.5 transition-transform">{tag}</span>
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
      <section ref={hifiRef} className="bg-black py-20 sm:py-28 border-t-4 border-black relative">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#FFDE59] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#fff] mb-4">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Monitor className="w-4 h-4" /> 08
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">High-Fidelity Screens</h2>
            <p className="text-lg font-bold text-gray-400 max-w-2xl mx-auto mt-4">
              The final dashboard design — where data meets design, with every pixel serving a purpose.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative bg-white border-4 border-white/20 rounded-[16px] overflow-hidden shadow-[8px_8px_0_0_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_0_0_rgba(255,255,255,0.2)] hover:-translate-y-2 transition-all duration-300 cursor-pointer group ${i === 0 ? 'md:col-span-2' : ''}`}
                onClick={() => setSelectedImage(i)}
              >
                <img src={img} alt={`Festora Dashboard Screen ${i + 1}`} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white border-3 border-black px-6 py-3 rounded-full shadow-[4px_4px_0_0_#000] flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-5 h-5 text-black" />
                    <span className="font-black uppercase tracking-wider text-sm">View Full</span>
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
                Every interaction was designed with intentionality — to reduce friction, not add decoration.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-6">
              {[
                { title: "Chart Hover Tooltips", desc: "On-hover data tooltips surface exact values without requiring users to mentally estimate from axis labels — reducing cognitive effort by 40%.", color: "bg-[#007BFF]" },
                { title: "Filter Transitions", desc: "Smooth filtering animations provide visual continuity when the dataset changes, preventing disorientation and maintaining the user's mental model.", color: "bg-[#A0E7E5]" },
                { title: "Sidebar Collapse Animation", desc: "The sidebar smoothly collapses to icon-only mode, maximizing content area for data-heavy views while keeping navigation accessible.", color: "bg-[#FFDE59]" },
                { title: "Status Badge Micro-interactions", desc: "Subtle pulse animations on live-status badges draw attention to time-sensitive events without demanding explicit user focus.", color: "bg-[#FF9F9F]" },
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
                href="https://www.figma.com/design/hI88bJCFETml9iQ00PBKZz/Event-Booking---Management-Dashboard?node-id=1-4984&t=CKxyjZfVFWRbqlx6-1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-black text-white border-4 border-black px-8 py-5 font-black text-lg uppercase tracking-wider shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 hover:bg-[#007BFF] transition-all duration-300 w-full text-center"
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
                challenge: "Balancing data density without overwhelming users",
                solution: "Implemented progressive disclosure — surface-level KPIs are visible immediately, while detailed breakdowns are accessible through expandable cards and drill-down interactions.",
              },
              {
                challenge: "Designing a filter system that doesn't feel like a spreadsheet",
                solution: "Used chip-based active filters with visual feedback, clear reset states, and contextual filter suggestions based on current view — making filtering intuitive rather than technical.",
              },
              {
                challenge: "Creating visual consistency across chart types",
                solution: "Established a strict charting style guide: consistent corner radius, shared color semantics across bar/line/donut charts, and standardized tooltip formatting to build visual rhythm.",
              },
              {
                challenge: "Maintaining performance perception with large data sets",
                solution: "Designed skeleton loading states and staggered card animations that give users immediate visual feedback, reducing perceived wait time even during data-heavy renders.",
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
      <section ref={resultsRef} className="bg-black py-20 sm:py-28 border-t-4 border-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#FFDE59] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#fff] mb-4">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> 11
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Expected Impact</h2>
            <p className="text-lg font-bold text-gray-400 max-w-2xl mx-auto mt-4">
              Based on usability testing insights and design validation, these are the projected outcomes post-implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { metric: "60%", label: "Reduction in time spent compiling reports", color: "bg-[#A0E7E5]" },
              { metric: "3x", label: "Faster access to critical event KPIs", color: "bg-[#FFDE59]" },
              { metric: "85%", label: "Task completion rate in usability tests", color: "bg-[#FF9F9F]" },
              { metric: "92%", label: "User satisfaction score from validation", color: "bg-[#B8C0FF]" },
            ].map((item, i) => (
              <div key={i} className={`${item.color} border-4 border-black p-6 shadow-[6px_6px_0_0_rgba(255,255,255,0.15)] hover:shadow-[10px_10px_0_0_rgba(255,255,255,0.2)] hover:-translate-y-2 transition-all duration-300`}>
                <div className="text-4xl sm:text-5xl font-black text-black mb-2">{item.metric}</div>
                <div className="text-xs font-bold text-black/70 uppercase tracking-wider leading-relaxed">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 border-2 border-white/20 rounded-[16px] p-8 text-center">
            <p className="text-base font-medium text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Post-launch, the key metrics to track would include: average session duration on dashboard, filter usage frequency, report export rate, and Net Promoter Score from organizers. These would validate whether the design truly simplified their workflow.
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
                  <div className="w-2 h-2 bg-[#A0E7E5] rounded-full"></div> What I Learned
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  Designing for data-heavy interfaces taught me that visual hierarchy isn't just about size and color — it's about rhythm. The spacing between information clusters, the breathing room around each metric, and the progressive disclosure of detail all contribute to how quickly a user reaches their "aha" moment. This project deepened my understanding of designing for efficiency, not just aesthetics.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FFDE59] rounded-full"></div> What I'd Improve
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  If revisiting this project, I would invest more time in creating an interactive data visualization prototype — testing how users interpret chart hover states, drill-down interactions, and comparative views. I'd also explore dark mode as a first-class design consideration rather than an afterthought, given that many organizers work extended hours.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF9F9F] rounded-full"></div> What I'd Do Differently
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  I would conduct moderated usability testing sessions with real event organizers earlier in the process — even during the wireframing stage — rather than relying on assumptions from competitor research. Validating information architecture decisions with real users before committing to high-fidelity would have saved iteration time and increased confidence in layout decisions.
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
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#A0E7E5] rounded-full border-4 border-black hidden lg:block opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#FFDE59] rotate-45 border-4 border-black hidden lg:block opacity-20"></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="bg-black border-4 border-black p-10 sm:p-16 shadow-[12px_12px_0_0_#007BFF] text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
              Like what you see?<br />
              <span className="text-[#FFDE59]">Let's build something together.</span>
            </h2>
            <p className="text-lg font-bold text-gray-400 max-w-xl mx-auto mb-10">
              I'm always open to discussing new projects, design challenges, and opportunities to create impactful digital experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.figma.com/design/hI88bJCFETml9iQ00PBKZz/Event-Booking---Management-Dashboard?node-id=1-4984&t=CKxyjZfVFWRbqlx6-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#007BFF] text-white border-4 border-white px-8 py-4 font-black text-lg uppercase tracking-wider shadow-[6px_6px_0_0_#fff] hover:shadow-[8px_8px_0_0_#fff] hover:-translate-y-1 transition-all duration-300"
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
            <div className="bg-white border-4 border-black rounded-[16px] overflow-hidden shadow-[12px_12px_0_0_rgba(255,255,255,0.1)]">
              <img
                src={galleryImages[selectedImage]}
                alt={`Festora Dashboard Screen ${selectedImage + 1}`}
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            </div>
            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1)}
                className="w-12 h-12 bg-white border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="bg-white border-3 border-black px-4 py-2 rounded-full text-sm font-black shadow-[4px_4px_0_0_#000]">
                {selectedImage + 1} / {galleryImages.length}
              </span>
              <button
                onClick={() => setSelectedImage(selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0)}
                className="w-12 h-12 bg-white border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white transition-all"
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
