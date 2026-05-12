import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Menu, X, Phone, MapPin, Linkedin, Github, Send, MessageCircle, User, AtSign, Zap, ArrowRight, CheckCircle, AlertCircle, Sparkles, Star } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Footer, BehanceIcon } from "@/components/Footer";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const { toast } = useToast();

  // Track mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_svj8159';
  const EMAILJS_TEMPLATE_ID = 'template_9eyn2g2'; // Your actual template ID
  const EMAILJS_PUBLIC_KEY = 'xfcSxIEp781KPUHcp'; // Your actual public key

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation check
    if (!formData.firstName || !formData.email || !formData.subject || !formData.message) {
      toast({
        variant: "destructive",
        title: "Please fill in required fields",
        description: "First Name, Email, Subject, and Message are required.",
        className: "border-4 border-black bg-[#FCF9F8] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[20px] font-bold text-[16px] tracking-[1.23px] p-6 text-black",
        duration: 4000,
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        className: "border-4 border-black bg-[#FCF9F8] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[20px] font-bold text-[16px] tracking-[1.23px] p-6 text-black",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`.trim(),
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Prabhath Subhashana', // Your name
        reply_to: formData.email,
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);

      // Success toast
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        className: "border-4 border-black bg-[#007BFF] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[20px] font-bold text-[16px] tracking-[1.23px] p-6",
        duration: 5000,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      console.error('EmailJS error:', error);
      if (error && typeof error === 'object') {
        console.error('Error status:', error.status);
        console.error('Error text:', error.text);
      }

      let errorMessage = "Something went wrong. Please try again or contact me directly via email.";
      let errorTitle = "Failed to send message";

      // Provide specific error messages based on error type
      if (error?.status === 400) {
        errorTitle = "Configuration Error";
        errorMessage = "EmailJS configuration issue. Please check the public key and template ID.";
      } else if (error?.status === 422) {
        errorTitle = "Template Error";
        errorMessage = "Email template not found. Please create the 'template_contact' template in EmailJS.";
      } else if (error?.status === 403) {
        errorTitle = "Authentication Error";
        errorMessage = "Invalid EmailJS credentials. Please check your public key.";
      } else if (error?.status === 412) {
        errorTitle = "Precondition Failed";
        errorMessage = "EmailJS could not verify the request. This often means the Public Key is missing or invalid.";
      }

      // Error toast
      toast({
        variant: "destructive",
        title: errorTitle,
        description: errorMessage,
        className: "border-4 border-black bg-[#FCF9F8] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[20px] font-bold text-[16px] tracking-[1.23px] p-6 text-black",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Custom Behance Icon moved to Footer.tsx

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`bg-[#FCF9F8] px-4 sm:px-6 lg:px-12 py-4 sm:py-6 relative z-50 max-w-[1600px] mx-auto w-full ${isMobile ? 'sticky top-0' : 'relative'
        }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center w-[80px] h-[45px] sm:w-[100px] sm:h-[55px] lg:w-[131px] lg:h-[70px] bg-black text-white text-sm sm:text-lg lg:text-xl font-medium hover:bg-[#007BFF] transition-colors">
              PS.
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link
              to="/about"
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              About Me
            </Link>
            <Link
              to="/projects"
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Projects
            </Link>
            <Link
              to="/freelance"
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Freelance
            </Link>
          </nav>

          {/* Desktop Contact Button */}
          <Link to="/contact">
            <Button
              variant="outline"
              className="hidden md:flex text-white font-bold text-[14px] lg:text-[16px] tracking-[1.23px] px-[30px] lg:px-[50px] py-[15px] lg:py-[25px] rounded-none border-3 border-black bg-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#FFDE59] hover:text-black transition-all duration-200"
            >
              Contact Me
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-[#FCF9F8] border-t-2 border-black p-4 z-50 shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col space-y-4">
              <Link
                to="/about"
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Me
              </Link>
              <Link
                to="/projects"
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/freelance"
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Freelance
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="text-white font-bold text-[16px] tracking-[1.23px] px-[30px] py-[15px] rounded-none w-full justify-center mt-2 border-3 border-black bg-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#FFDE59] hover:text-black transition-all duration-200"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Contact Content Section - Neo-Brutalist Redesign */}
      <section className="bg-[#FCF9F8] py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-[#FFDE59] rounded-full border-4 border-black hidden lg:block animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#FF9F9F] border-4 border-black transform rotate-12 hidden lg:block"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-100 rounded-full opacity-50 -z-10 pointer-events-none blur-3xl"></div>

        <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-1 bg-[#FFDE59] transform -rotate-2 border-2 border-black shadow-[4px_4px_0_0_#000]"></div>
                <div className="relative bg-white border-2 border-black px-4 py-1 flex items-center gap-2 transform rotate-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-black uppercase tracking-widest">Open For Work</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black leading-none text-black mb-6">
                GET IN <span className="relative inline-block text-[#007BFF]">TOUCH
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-black" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-base sm:text-lg font-bold text-gray-700 max-w-xl mx-auto border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000] rotate-1">
                Have a project in mind? Let's discuss how we can bring your annoying competitors to tears.
              </p>
            </div>

            {/* Main Contact Grid */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">

              {/* Contact Information Card */}
              <div className="lg:col-span-5 bg-[#FFDE59] border-4 border-black rounded-[20px] shadow-[8px_8px_0_0_#000] p-8 lg:p-10 group hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 transition-all duration-300 relative">
                {/* Decorative Pin */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-black z-20 shadow-sm"></div>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-200/50 -z-10 rotate-45"></div>

                <div className="mb-8 relative z-10">
                  <h2 className="text-3xl font-black text-black mb-2 uppercase italic">Contact Info</h2>
                  <div className="h-2 w-24 bg-black mb-4"></div>
                  <p className="text-sm font-bold text-black/80 leading-relaxed">
                    I'm currently available for freelance work. If you have a project that needs some creative injection, get in touch.
                  </p>
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Email */}
                  <a href="mailto:prabathsubashana18@gmail.com" className="flex items-center gap-4 group/item bg-white border-3 border-black p-4 rounded-xl shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-[#007BFF] border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:rotate-6 transition-transform">
                      <Mail className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-black uppercase tracking-wider text-black/60 mb-0.5">Email Me</h3>
                      <p className="text-sm sm:text-base font-bold text-black break-all">prabathsubashana18@gmail.com</p>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </a>

                  {/* Phone */}
                  <a href="tel:+94716903566" className="flex items-center gap-4 group/item bg-white border-3 border-black p-4 rounded-xl shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-[#FF9F9F] border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:-rotate-6 transition-transform">
                      <Phone className="w-6 h-6 text-black" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-black uppercase tracking-wider text-black/60 mb-0.5">Call Me</h3>
                      <p className="text-base font-bold text-black">+94 716 903 566</p>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/94716903566?text=Hi%20Prabhath!%20I'd%20like%20to%20discuss%20a%20project%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group/item bg-white border-3 border-black p-4 rounded-xl shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-[#25D366] border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:rotate-6 transition-transform">
                      <WhatsAppIcon className="w-6 h-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-black uppercase tracking-wider text-black/60 mb-0.5">WhatsApp</h3>
                      <p className="text-base font-bold text-black">Chat on WhatsApp</p>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4 bg-white/50 border-3 border-black/20 p-4 rounded-xl">
                    <div className="w-12 h-12 bg-white border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-black" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-black uppercase tracking-wider text-black/60 mb-0.5">Location</h3>
                      <p className="text-sm font-bold text-black">Gampaha, Sri Lanka</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t-3 border-black border-dashed">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-black uppercase">Stalk Me</h3>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://linkedin.com/in/prabhath-subhashana-6b694a20a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border-3 border-black rounded-lg flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-y-1"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="https://behance.net/prabathsubasha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border-3 border-black rounded-lg flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-y-1"
                        title="Behance"
                      >
                        <BehanceIcon className="w-5 h-5" />
                      </a>
                      <a
                        href="https://github.com/subhashana00"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border-3 border-black rounded-lg flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-1"
                        title="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Card */}
              <div className="lg:col-span-7 bg-white border-4 border-black rounded-[20px] shadow-[8px_8px_0_0_#000] p-8 lg:p-10 relative group hover:shadow-[12px_12px_0_0_#000] transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <MessageCircle className="w-32 h-32 transform rotate-12" />
                </div>

                <div className="mb-8 relative z-10">
                  <h2 className="text-3xl font-black text-black mb-2 uppercase italic">Send a Message</h2>
                  <div className="h-2 w-32 bg-[#007BFF] mb-4"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {/* Name Fields */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Input
                          required
                          placeholder="YOUR NAME"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="border-3 border-black rounded-none focus:ring-0 focus:border-black h-12 pl-10 shadow-[4px_4px_0_0_#ccc] focus:shadow-[6px_6px_0_0_#007BFF] transition-all text-base font-bold bg-gray-50 focus:bg-white placeholder:text-gray-400 placeholder:font-medium"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-black transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                        Last Name
                      </label>
                      <div className="relative group">
                        <Input
                          placeholder="LAST NAME"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="border-3 border-black rounded-none focus:ring-0 focus:border-black h-12 pl-10 shadow-[4px_4px_0_0_#ccc] focus:shadow-[6px_6px_0_0_#007BFF] transition-all text-base font-bold bg-gray-50 focus:bg-white placeholder:text-gray-400 placeholder:font-medium"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-black transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Input
                        type="email"
                        required
                        placeholder="HELLO@EXAMPLE.COM"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-3 border-black rounded-none focus:ring-0 focus:border-black h-12 pl-10 shadow-[4px_4px_0_0_#ccc] focus:shadow-[6px_6px_0_0_#007BFF] transition-all text-base font-bold bg-gray-50 focus:bg-white placeholder:text-gray-400 placeholder:font-medium"
                      />
                      <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-black transition-colors" />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Input
                        required
                        placeholder="PROJECT COLLABORATION"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="border-3 border-black rounded-none focus:ring-0 focus:border-black h-12 pl-4 shadow-[4px_4px_0_0_#ccc] focus:shadow-[6px_6px_0_0_#007BFF] transition-all text-base font-bold bg-gray-50 focus:bg-white placeholder:text-gray-400 placeholder:font-medium"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Textarea
                        required
                        rows={5}
                        placeholder="TELL ME ABOUT YOUR PROJECT..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="border-3 border-black rounded-none focus:ring-0 focus:border-black resize-none min-h-[140px] shadow-[4px_4px_0_0_#ccc] focus:shadow-[6px_6px_0_0_#007BFF] transition-all text-base font-bold p-4 bg-gray-50 focus:bg-white placeholder:text-gray-400 placeholder:font-medium"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white border-4 border-black h-14 text-lg font-black uppercase tracking-widest shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 active:shadow-[2px_2px_0_0_#000] active:translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed group transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mr-3" />
                          LAUNCHING...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Freelance Services CTA */}
            <div className="mt-16 lg:mt-24">
              <div className="relative bg-[#000] rounded-[20px] p-1">
                <div className="bg-[#A0E7E5] border-4 border-black rounded-[16px] p-8 lg:p-12 text-center relative overflow-hidden group hover:bg-[#F0A500] transition-colors duration-500">

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                  <div className="relative z-10">
                    <div className="inline-block bg-white border-3 border-black p-3 rounded-full mb-6 shadow-[4px_4px_0_0_#000] group-hover:rotate-12 transition-transform duration-300">
                      <Zap className="w-8 h-8 text-black" fill="currentColor" />
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 uppercase tracking-tighter">
                      Ready to Scale Up?
                    </h3>

                    <p className="text-base sm:text-lg font-bold text-black/80 mb-8 max-w-2xl mx-auto border-2 border-black bg-white/50 p-2 inline-block rotate-1">
                      Explore my comprehensive freelance services and find the perfect package for your business needs.
                    </p>

                    <div className="flex justify-center">
                      <Link
                        to="/freelance"
                        className="inline-flex items-center gap-3 bg-white text-black border-4 border-black shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-y-1 px-8 py-4 font-black text-lg uppercase tracking-wider transition-all duration-300"
                      >
                        View Services <ArrowRight className="w-6 h-6" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Toaster />
    </div>
  );
}
