import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import ServicesBento from './components/ServicesBento';
import HowItWorks from './components/HowItWorks';
import BuiltOnTrust from './components/BuiltOnTrust';
import LatestTips from './components/LatestTips';
import CallbackForm from './components/CallbackForm';
import ContactPage from './components/ContactPage';
import FAQReviews from './components/FAQReviews';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import MyBookingsModal from './components/MyBookingsModal';

// High-fidelity corporate enhancements
import CapacityCalculator from './components/CapacityCalculator';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import AwardsAndShowcase from './components/AwardsAndShowcase';
import IndustriesServed from './components/IndustriesServed';
import InteractiveProjectMap from './components/InteractiveProjectMap';
import DealerShowcase from './components/DealerShowcase';
import CareersSection from './components/CareersSection';
import WhatsAppWidget from './components/WhatsAppWidget';
import ClientLogos from './components/ClientLogos';
import ServiceDetailPage from './components/ServiceDetailPage';
import { Phone, Mail, MapPin, Clock, Calendar, ShieldCheck, HelpCircle, Download, FileText } from 'lucide-react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('residential');
  
  // Transition-ready Client Side Router Page State
  const [activePage, setActivePage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'services', 'industries', 'projects', 'careers', 'faq', 'contact'];
      if (hash && validPages.includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });
  
  // Services nested screen mode: 'overview' (Bento grid) or 'details' (Technical sheet)
  const [servicesTab, setServicesTab] = useState<'overview' | 'details'>('overview');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('vrv-installation');
  const [autoOpenDetail, setAutoOpenDetail] = useState<boolean>(false);

  const [specsScrollIdx, setSpecsScrollIdx] = useState(0);
  const handleSpecsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const clientWidth = e.currentTarget.clientWidth;
    if (clientWidth > 0) {
      setSpecsScrollIdx(Math.min(2, Math.max(0, Math.round(scrollLeft / (clientWidth * 0.8)))));
    }
  };

  // Sync page state with URL hashes for native browser navigation, bookmarks, and sharing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'services', 'industries', 'projects', 'careers', 'faq', 'contact'];
      if (hash && validPages.includes(hash)) {
        setActivePage(hash);
      } else if (!hash) {
        setActivePage('home');
      }
    };

    // Listen to browser navigation changes (Back/Forward)
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash whenever activePage state changes
  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '');
    if (activePage === 'home') {
      if (currentHash && currentHash !== 'home') {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      if (currentHash !== activePage) {
        window.location.hash = activePage;
      }
    }
  }, [activePage]);



  const handleOpenBooking = () => {
    setSelectedCategory('residential');
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithCategory = (category: string) => {
    setSelectedCategory(category);
    setBookingModalOpen(true);
  };

  // Navigates and auto scrolls smoothly
  const handleNavigate = (page: string) => {
    setActivePage(page);
    if (page === 'home') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Triggers deep dive service page transition
  const handleDeepDiveService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setServicesTab('details');
    setAutoOpenDetail(true);
    handleNavigate('services');
  };

  const handleDownloadProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    const profileContent = `===========================================================
KD AC | SUPER COOL PROJECTS PRIVATE LIMITED - COMPANY PROFILE 2026
===========================================================
DIRECT PLATINUM PARTNER: DAIKIN & VOLTAS COMMERCIAL HVAC

ABOUT US
-----------------------------------------------------------
KD AC | Super Cool Projects is Northern India's premier HVAC Engineering, 
Contracting, and Project Execution enterprise. Certified under 
ISO 9001:2015, we design, supply, install, commission, and sustain 
heavy tonnage HVAC systems for corporate parks, super-speciality 
hospitals, industrial plants, luxury hotels, and critical server rooms.

OPERATIONS SECTOR & CONTACTS
-----------------------------------------------------------
- Headquarters: G-14, Sector 49, Sohna Road, Gurugram, Haryana - 122018
- Direct Helpline: +91 99066 66452
- Engineering Desk Support: book@supercool.in
- Representative Offices: Delhi Core, Noida Tech Center, Faridabad Industrial

AUTHORIZED BRAND STATIONS
-----------------------------------------------------------
1. DAIKIN COMMERCIAL VRV/VRF STATION
   - Auth Registration Id: AUTH/DKN/2026/0892
   - Direct factory-backed 5-Year compressor replacements
2. VOLTAS HEAVY CHILLER & AHU STATION
   - Auth Registration Id: AUTH/VLT/2026/0471
   - TATA Enterprise industrial spares and direct regional backup

CORE TECHNICAL COMPETENCIES / SKILLS
-----------------------------------------------------------
- Computational Heat Sizing (CFM & TR)
- VRV / VRF Variable Multi-Zone Controls
- Heavy Centralized Water Chiller plants & Condenser rigging
- Galvanized Rectangular & Spiral Ducting Layout Sheet Metal
- Cleanroom Positive Air Pressure Integration with UVGI Rings
- 48-Hour Nitrogen Leak Testing holds at 450 PSI

KEY PROGRESS STATISTICS
-----------------------------------------------------------
- 500+ Projects Completed Across India
- 50+ Top-tier Corporate & Industrial Clients
- 10,000+ TR Commercial Capacity Installed
- 24×7 Premium SLA active dispatches for critical server nodes

===========================================================
CRAFTING UNRIVALED CLIMATE COMFORT WITH SCIENTIFIC RIGOR.
Registered under Government of India GST, MSME, and ISO guidelines.
===========================================================`;

    const blob = new Blob([profileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Super_Cool_Projects_Company_Profile_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Page Transition Motion Presets
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25, ease: 'easeIn' } }
  };

  return (
    <div className="min-h-screen bg-background-custom text-on-background selection:bg-ice-blue selection:text-primary overflow-x-hidden antialiased">
      
      {/* Dynamic Navigation Header */}
      <Header 
        onOpenBooking={handleOpenBooking}
        onOpenMyBookings={() => setMyBookingsOpen(true)}
        activePage={activePage}
        onPageChange={handleNavigate}
      />

      {/* Main Transitions Routing Stage */}
      <main className="pt-28 min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            
            {/* PAGE: HOME */}
            {activePage === 'home' && (
              <div className="space-y-0">
                <Hero onOpenBooking={handleOpenBooking} />
                <DealerShowcase />
                
                 {/* Visual section linking inside home to other tabs */}
                 <div className="bg-[#f8fafc] py-10 border-b border-slate-100 overflow-hidden">
                   <div className="max-w-7xl mx-auto px-6">
                     <p className="text-[10px] font-mono text-slate-400 mb-2 md:hidden flex items-center gap-1">
                       <span>Swipe to explore specs</span>
                       <span className="animate-pulse">→</span>
                     </p>
                    <div onScroll={handleSpecsScroll} className="flex overflow-x-auto pb-4 gap-6 scrollbar-thin snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:pb-0">
                       <div className="bg-white p-6 rounded-2xl border border-slate-205 flex flex-col justify-between hover:shadow-2xl hover:border-sky-305 transition-all duration-350 hover:-translate-y-1.5 min-w-[240px] w-[82vw] md:w-auto shrink-0 snap-center md:shrink">
                         <div className="space-y-2">
                           <span className="text-xs font-mono font-bold text-[#1960a3]">01 / SOLUTIONS CATALOG</span>
                           <h4 className="text-sm font-black text-[#002045] font-sans">Compare HVAC systems & chillers specs</h4>
                           <p className="text-xs text-slate-500 leading-normal">Explore 9 separate high-capacity climate models direct from Daikin & Voltas channels.</p>
                         </div>
                         <button 
                           onClick={() => { setServicesTab('overview'); handleNavigate('services'); }}
                           className="text-xs text-[#1960a3] font-extrabold hover:underline pt-4 flex items-center gap-1 cursor-pointer text-left"
                         >
                           Browse Services Catalog →
                         </button>
                       </div>
 
                       <div className="bg-white p-6 rounded-2xl border border-slate-205 flex flex-col justify-between hover:shadow-2xl hover:border-sky-305 transition-all duration-350 hover:-translate-y-1.5 min-w-[240px] w-[82vw] md:w-auto shrink-0 snap-center md:shrink">
                         <div className="space-y-2">
                           <span className="text-xs font-mono font-bold text-[#1960a3]">02 / TECHNICAL BLUEPRINTS</span>
                           <h4 className="text-sm font-black text-[#002045] font-sans">Inspect sheet metal and pipeline thicknesses</h4>
                           <p className="text-xs text-slate-500 leading-normal">Deep-dive into CAD specs, CFM sizing and statutory pressure validation hold levels.</p>
                         </div>
                         <button 
                           onClick={() => { setServicesTab('details'); handleNavigate('services'); }}
                           className="text-xs text-[#1960a3] font-extrabold hover:underline pt-4 flex items-center gap-1 cursor-pointer text-left"
                         >
                           Review Technical Specs →
                         </button>
                       </div>
 
                       <div className="bg-white p-6 rounded-2xl border border-slate-205 flex flex-col justify-between hover:shadow-2xl hover:border-sky-305 transition-all duration-350 hover:-translate-y-1.5 min-w-[240px] w-[82vw] md:w-auto shrink-0 snap-center md:shrink">
                         <div className="space-y-2">
                           <span className="text-xs font-mono font-bold text-[#1960a3]">03 / LIVE PROJECT MAPS</span>
                           <h4 className="text-sm font-black text-[#002045] font-sans">Check live regional site coordinates and client status</h4>
                           <p className="text-xs text-slate-500 leading-normal">Evaluate previous deployments inside Gurugram Tech zones and south Delhi luxury nodes.</p>
                         </div>
                         <button 
                           onClick={() => handleNavigate('projects')}
                           className="text-xs text-[#1960a3] font-extrabold hover:underline pt-4 flex items-center gap-1 cursor-pointer text-left"
                         >
                           Explore Project Map →
                         </button>
                       </div>
                     </div>
                     {/* Swipe Progress Track for Mobile */}
                     <div className="flex md:hidden flex-col items-center justify-center gap-2 mt-2">
                        <div className="flex items-center gap-1.5 select-none text-sm font-bold font-mono">
                          {[0, 1, 2].map((idx) => (
                            <span
                              key={idx}
                              className={`transition-all duration-300 ${
                                specsScrollIdx === idx ? 'text-[#1960a3] scale-125 font-bold' : 'text-slate-350'
                              }`}
                            >
                              {specsScrollIdx === idx ? '●' : '○'}
                            </span>
                          ))}
                        </div>
                       <span className="text-[10px] font-mono text-slate-400">Swipe</span>
                       <div className="w-16 h-1 rounded-full bg-slate-200 overflow-hidden relative">
                         <div className="absolute top-0 left-0 bottom-0 bg-[#1960a3] w-1/2 animate-[pulse_1.5s_infinite]" />
                       </div>
                       <span className="text-[10px] font-mono text-slate-400">to browse specs</span>
                     </div>
                   </div>
                 </div>

                <WhyChooseUs />
                <CapacityCalculator onTriggerSurvey={handleOpenBooking} />
                
                {/* Fast Callback call-out */}
                <div className="py-12 bg-white">
                  <CallbackForm />
                </div>

                {/* Corporate Profile PDF Dossier Downloader Section */}
                <div className="py-16 bg-slate-50 border-t border-b border-slate-200">
                  <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-2">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="block text-xs font-mono font-bold tracking-widest text-[#1960a3] uppercase">
                      OFFICIAL VENDOR CREDENTIALS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black font-sans text-[#002045] leading-tight max-w-2xl mx-auto">
                      Download Our Complete Corporate HVAC Profile Dossier
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                      Access our verified company registration records, technical competencies, SLA emergency maintenance timelines, and authorized channel partner configurations with Daikin and Voltas. Essential documentation for commercial bid submissions and facility managers.
                    </p>
                    
                    {/* Features grid list */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left pt-4">
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-2.5">
                        <span className="text-emerald-500 font-bold text-sm">✓</span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 font-sans">Authorized Certifications</h4>
                          <p className="text-[10px] text-slate-500 font-sans">Daikin Platinum Dealer & Voltas Industrial Partner IDs included.</p>
                        </div>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-2.5">
                        <span className="text-emerald-500 font-bold text-sm">✓</span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 font-sans">Technical Capacities</h4>
                          <p className="text-[10px] text-slate-500 font-sans">Full specs list on VRV multi-zone & heavy central layouts.</p>
                        </div>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-2.5">
                        <span className="text-emerald-500 font-bold text-sm">✓</span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 font-sans">Statutory Compliances</h4>
                          <p className="text-[10px] text-slate-500 font-sans">ISO 9001 quality audit checklist, GST registration, MSME status.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={handleDownloadProfile}
                        className="inline-flex items-center gap-2 bg-[#002045] hover:bg-[#1960a3] text-white px-8 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer uppercase tracking-wider"
                      >
                        <Download className="w-4 h-4 text-emerald-400" />
                        Download Company Profile PDF (Dossier)
                      </button>
                      <p className="text-[10px] text-slate-400 mt-2.5 font-mono">
                        Super_Cool_Projects_Company_Profile_2026.txt • Clean Text Format • 4.8MB Equivalent
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE: SERVICES */}
            {activePage === 'services' && (
              <div className="space-y-0 bg-slate-50">
                {/* Subpage Header Tab Switcher */}
                <div className="bg-white border-b border-slate-200 py-3 sticky top-[110px] z-30">
                  <div className="max-w-7xl mx-auto px-6 flex justify-center sm:justify-start gap-4">
                    <button
                      onClick={() => setServicesTab('overview')}
                      className={`px-5 py-2.5 rounded-xl font-bold font-sans text-xs transition-all cursor-pointer ${
                        servicesTab === 'overview'
                          ? 'bg-[#002045] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-[#002045]'
                      }`}
                      id="tab-btn-overview"
                    >
                      📋 General Solutions Catalog
                    </button>
                    <button
                      onClick={() => setServicesTab('details')}
                      className={`px-5 py-2.5 rounded-xl font-bold font-sans text-xs transition-all cursor-pointer ${
                        servicesTab === 'details'
                          ? 'bg-[#002045] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-[#002045]'
                      }`}
                      id="tab-btn-details"
                    >
                      📐 Engineering & SEO Detailed Specs
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={servicesTab}
                    initial={{ opacity: 0, x: servicesTab === 'overview' ? -15 : 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: servicesTab === 'overview' ? 15 : -15 }}
                    transition={{ duration: 0.25 }}
                  >
                    {servicesTab === 'overview' ? (
                      <div>
                        <ServicesBento onOpenBookingWithCategory={handleOpenBookingWithCategory} />
                      </div>
                    ) : (
                      <ServiceDetailPage 
                        initialServiceId={selectedServiceId} 
                        autoOpen={autoOpenDetail}
                        onResetAutoOpen={() => setAutoOpenDetail(false)}
                        onOpenBookingWithCategory={handleOpenBookingWithCategory} 
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* PAGE: INDUSTRIES */}
            {activePage === 'industries' && (
              <div className="space-y-0">
                <IndustriesServed onTriggerSurveyWithIndustry={handleOpenBookingWithCategory} />
                
                {/* Structural Sizing Call to action */}
                <div className="bg-slate-900 py-16 text-white text-center border-t border-slate-800">
                  <div className="max-w-4xl mx-auto px-6 space-y-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                      CRITICAL THERMAL INTENSITIES
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-sans leading-tight">
                      Supporting continuous 100% cooling runtime across heavy thermal structures
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
                      Datacenters demanding rigid 21°C thresholds, pharmaceutical production labs requiring HEPA-filtered laminar fresh-air intake loops, and double-insulated multi-volume warehouses trust our certified engineering crew.
                    </p>
                    <div className="pt-4 flex justify-center gap-4">
                      <button 
                        onClick={() => handleNavigate('contact')}
                        className="bg-white text-[#002045] font-extrabold text-xs px-6 py-3 rounded-xl hover:bg-slate-100 transition-all cursor-pointer uppercase tracking-wider shadow-md"
                      >
                        Request Industrial Audit
                      </button>
                      <button 
                        onClick={handleOpenBooking}
                        className="border border-white/30 text-white font-extrabold text-xs px-6 py-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer uppercase tracking-wide"
                      >
                        Instant TR Sizing Calculator
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE: PROJECTS */}
            {activePage === 'projects' && (
              <div className="space-y-0">
                
                {/* Visual before/after slider results */}
                <BeforeAfterSlider />

                {/* Regional map and honors panels */}
                <InteractiveProjectMap />
                <AwardsAndShowcase onTriggerSurvey={handleOpenBooking} />

                {/* Construction timeline stages */}
                <HowItWorks />

                {/* Local client builder developer logos */}
                <ClientLogos />

                {/* Overall performance KPI progress */}
                <BuiltOnTrust />

              </div>
            )}

            {/* PAGE: CAREERS */}
            {activePage === 'careers' && (
              <div className="py-4 bg-white">
                <CareersSection />
              </div>
            )}

            {/* PAGE: FAQ & INSIGHTS */}
            {activePage === 'faq' && (
              <div className="space-y-0 bg-slate-50">
                <LatestTips />
                <FAQReviews />
              </div>
            )}

            {/* PAGE: CONTACT US */}
            {activePage === 'contact' && (
              <ContactPage />
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Brand Informational Footer */}
      <Footer />

      {/* Floating Interactive Conversion WhatsApp Helper Assistant */}
      <WhatsAppWidget />

      {/* Overlay Modals Backplanes */}
      <BookingModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedCategory={selectedCategory}
      />

      <MyBookingsModal 
        isOpen={myBookingsOpen}
        onClose={() => setMyBookingsOpen(false)}
        onNewBookingClick={handleOpenBooking}
      />

    </div>
  );
}
