import { useState } from 'react';
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
import { Phone, Mail, MapPin, Clock, Calendar, ShieldCheck, HelpCircle } from 'lucide-react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('residential');
  
  // Transition-ready Client Side Router Page State
  const [activePage, setActivePage] = useState<string>('home');
  
  // Services nested screen mode: 'overview' (Bento grid) or 'details' (Technical sheet)
  const [servicesTab, setServicesTab] = useState<'overview' | 'details'>('overview');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('vrv-installation');
  const [autoOpenDetail, setAutoOpenDetail] = useState<boolean>(false);



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
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Triggers deep dive service page transition
  const handleDeepDiveService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setServicesTab('details');
    setAutoOpenDetail(true);
    handleNavigate('services');
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
                <div className="bg-[#f8fafc] py-10 border-b border-slate-100">
                  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all">
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

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all">
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

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all">
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
                </div>

                <WhyChooseUs />
                <CapacityCalculator onTriggerSurvey={handleOpenBooking} />
                
                {/* Fast Callback call-out */}
                <div className="py-12 bg-white">
                  <CallbackForm />
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
