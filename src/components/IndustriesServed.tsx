import React, { useState } from 'react';
import { 
  Briefcase, 
  Factory, 
  Building2, 
  HeartPulse, 
  ShoppingBag, 
  Utensils, 
  GraduationCap, 
  Home, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  Gauge, 
  Settings, 
  Zap,
  Building,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IndustriesServedProps {
  onTriggerSurveyWithIndustry: (industry: string) => void;
}

export default function IndustriesServed({ onTriggerSurveyWithIndustry }: IndustriesServedProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [scrollIdx, setScrollIdx] = useState(0);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const clientWidth = e.currentTarget.clientWidth;
    if (clientWidth > 0) {
      setScrollIdx(Math.min(industries.length - 1, Math.max(0, Math.round(scrollLeft / (clientWidth * 0.8)))));
    }
  };

  const industries = [
    {
      id: 'offices',
      title: 'Corporate Offices',
      emoji: '🏢',
      icon: Briefcase,
      color: 'from-blue-500 to-sky-600',
      system: 'Daikin VRV V-Series & Multi-Zone Cassettes',
      airQuality: 'PM2.5 Multi-Stage Air Scrubber Filters',
      typicalCapacity: '30 TR to 250 TR Assemblies',
      ncrDeployments: '42 Active Sites (DLF CyberCity, Sohna Rd, Noida)',
      keyMetric: 'Avg 30% Year-on-Year electricity savings by utilizing automatic occupancy-based VRV zone throttling.',
      challengesSolved: 'Independent temperature tuning for glass-facade peripheral areas vs internal high density team zones with zero sound levels (>21dB).',
      highlightProject: 'ABC Corporate Complex (50 TR Daikin VRV, 20k Sq Ft, 45 Days Completion)'
    },
    {
      id: 'factories',
      title: 'Factories & Industrials',
      emoji: '🏭',
      icon: Factory,
      color: 'from-amber-500 to-orange-600',
      system: 'Voltas High-Velocity Galvanized Ducted Packages',
      airQuality: 'Positive Pressure Heavy Ingress Dust Barriers',
      typicalCapacity: '80 TR to 600 TR Heat Mitigation Blocks',
      ncrDeployments: '28 Active Sites (IMT Manesar, Faridabad, Ghaziabad)',
      keyMetric: 'Engineered condensers with intelligent scale prevention to operate continuously inside harsh 50°C NCR ambient summers.',
      challengesSolved: 'Rapid thermal recovery over heavy machinery, chemical fume positive displacement, and extreme raw ceiling height insulation calculations.',
      highlightProject: 'LogiHub Mega Cold Chain (250 TR Voltas, 85k Sq Ft, 75 Days Completion)'
    },
    {
      id: 'hotels',
      title: 'Hotels & Resorts',
      emoji: '🏨',
      icon: Building,
      color: 'from-purple-500 to-indigo-600',
      system: 'Acoustic-Damped VRF & Central Chillers',
      airQuality: 'Odour Suppression Carbon-活性炭 filtration',
      typicalCapacity: '50 TR to 300 TR Quiet Comfort systems',
      ncrDeployments: '19 Active Sites (Sector 29 Gurugram, Greater Noida)',
      keyMetric: 'Integrated Central Heat Recovery Ventilation (HRV) reclaiming up to 70% thermal energy from toilet exhausts.',
      challengesSolved: 'Maintaining flawless indoor luxury architecture with zero machine hiss, slot diffusers blended seamlessly with ceiling moldings.',
      highlightProject: 'Grand Regency Luxury Resort (80 TR Daikin VRF, 32k Sq Ft, 40 Days Completion)'
    },
    {
      id: 'hospitals',
      title: 'Hospitals & ICUs',
      emoji: '🏥',
      icon: HeartPulse,
      color: 'from-emerald-500 to-teal-600',
      system: 'Voltas Water Chillers with Cleanroom Air Handling Units',
      airQuality: '99.97% HEPA Filtration with Active inline UVGI Rings',
      typicalCapacity: '100 TR to 450 TR Cleanroom manifolds',
      ncrDeployments: '15 Active Sites (Noida superspeciality, Okhla)',
      keyMetric: 'Guarantees sterile continuous air cycle displacement maintaining precise positive pressures under ASHRAE clinical standards.',
      challengesSolved: 'Zero pathogen recirculation, emergency power transfer auto-restart in < 6 seconds, and rigid cleanroom pressure seals.',
      highlightProject: 'Apex Superspeciality Hospital (120 TR Chiller & AHU, 45k Sq Ft, 60 Days Completion)'
    },
    {
      id: 'retail',
      title: 'Retail Stores & Malls',
      emoji: '🏬',
      icon: ShoppingBag,
      color: 'from-pink-500 to-rose-600',
      system: 'Compact High-Throw cassettes & Slimline hideaways',
      airQuality: 'High-Volume Dust Settlers & Odor Absorber loops',
      typicalCapacity: '15 TR to 120 TR Single units',
      ncrDeployments: '34 Active Sites (Mall of India, Greater Kailash)',
      keyMetric: 'Variable-capacity cooling dynamically syncing matching system pressure output with early-morning vs peak weekend evening crowd density.',
      challengesSolved: 'Countering immense radiant thermal energy fields from large storefront glass panels and open door air barriers.',
      highlightProject: 'Prime Arcade Retail Block (60 TR Cassette Systems, 18k Sq Ft, 30 Days)'
    },
    {
      id: 'restaurants',
      title: 'Restaurants & Kitchens',
      emoji: '🍽',
      icon: Utensils,
      color: 'from-red-500 to-orange-500',
      system: 'Dedicated Scrubbed Kitchen Exhaust + Positive Fresh Air Makeup',
      airQuality: 'Grease Trap Interceptors & Multi-stage Exhaust Hoods',
      typicalCapacity: '10 TR to 45 TR Focused flow systems',
      ncrDeployments: '22 Active Sites (Connaught Place, Golf Course Rd)',
      keyMetric: 'Tailored negative pressure environment preventing greasy kitchen fumes or strong spice spices from bleeding to dining rooms.',
      challengesSolved: 'Balancing air pressure so dining area entry doors operate effortlessly, providing high-speed draftless comfort near cooking burners.',
      highlightProject: 'Nouveau Fine Dining Bistro (25 TR Daikin Cassettes, 5k Sq Ft, 20 Days)'
    },
    {
      id: 'schools',
      title: 'Schools & Colleges',
      emoji: '🏫',
      icon: GraduationCap,
      color: 'from-cyan-500 to-blue-600',
      system: 'Intelligent VRVs & Recovery Fresh Air (ERV) units',
      airQuality: 'High-Volume Oxygen Replacement & CO2 scrubbers',
      typicalCapacity: '25 TR to 180 TR Campus grids',
      ncrDeployments: '12 Active Sites (Faridabad Academy, Greater Noida Univ)',
      keyMetric: 'Boosts structural oxygen to 15 CFM per student, lowering indoor CO2 to keep young students alert, healthy, and focused.',
      challengesSolved: 'Engineering highly durable child-proof flush wall panels and ensuring room sound standards never exceed 35dB.',
      highlightProject: 'Delhi Public Campus Labs Block (75 TR Daikin, 24k Sq Ft, 35 Days)'
    },
    {
      id: 'warehouses',
      title: 'Warehouses & Logistics',
      emoji: '📦',
      icon: Building,
      color: 'from-[#002045] to-[#1960a3]',
      system: 'Voltas Heavy-Duty Ductable Packaged Units & Heavy Air Washers',
      airQuality: 'Coarse Dust Pre-Filters & High Velocity Air Blowers',
      typicalCapacity: '150 TR to 800 TR Thermal Regulators',
      ncrDeployments: '17 Active Sites (Bilaspur Logistic Hub, Sonipat)',
      keyMetric: 'Continuous temperature and humidity maintenance across vast single-volume spaces preventing moisture damage to stocks.',
      challengesSolved: 'Delivering micro-climate distribution across multi-tier racking heights exceeding 15 meters without thermal stagnation.',
      highlightProject: 'National Cold Cargo Depot (400 TR Voltas Packaged Ductable, 120k Sq Ft, 90 Days)'
    },
    {
      id: 'datacenters',
      title: 'Data Centers',
      emoji: '🔌',
      icon: Settings,
      color: 'from-blue-600 to-indigo-800',
      system: 'Precision Air Conditioning (PAC) & Double Redundant VRFs',
      airQuality: 'NEMA Class particulate filters, gaseous pollutant filters',
      typicalCapacity: '200 TR to 1500 TR Redundant grids',
      ncrDeployments: '11 Active Sites (Noida Tech Zone, Gurugram Cyber Hub)',
      keyMetric: 'Flawless 100% continuous runtime. Dual automatic backup transfers guaranteeing cooling recovery in 4 seconds.',
      challengesSolved: 'Maintaining constant 21°C dry-bulb threshold and rigid 50% relative humidity under high density server chassis grids.',
      highlightProject: 'HyperScale Server Node 4B (600 TR Daikin Precision PAC, 40k Sq Ft, 70 Days)'
    },
    {
      id: 'residential',
      title: 'Residential Projects & Villas',
      emoji: '🏘',
      icon: Home,
      color: 'from-teal-500 to-sky-700',
      system: 'Daikin Premium VRV Home & Whisper Slim Ducts',
      airQuality: 'Hygienic Dehumidification & PM1.0 Micro-dust Traps',
      typicalCapacity: '5 TR to 35 TR Multi-room layouts',
      ncrDeployments: '65+ Premium NCR Villas & Penthouse Builds',
      keyMetric: 'Conceals bulkiness of conventional cooling blocks: single outdoor variable condenser feeds up to 14 discrete quiet indoor rooms.',
      challengesSolved: 'Delivering luxurious, silent, invisible floor-to-ceiling thermal comfort without modifying heritage villa facades.',
      highlightProject: 'CyberCity Luxury Penthouse Suite (12 TR Daikin Home system, 6k Sq Ft, 15 Days)'
    }
  ];

  const current = selectedIdx !== null ? industries[selectedIdx] : null;

  return (
    <section className="py-20 bg-[#f8fafc] border-b border-slate-200" id="industries">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center mb-16 space-y-4">
          <span className="bg-amber-100 text-[#002045] font-black tracking-widest uppercase text-xs px-3 py-1 rounded-full border border-amber-200 font-mono inline-block">
            Facilities Engineered
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#002045] font-sans tracking-tight">
            Industries We Serve
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Large clients need to know whether an engineering contractor has real experience in their specific sector. Select an industry to review our dedicated engineering dossier.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] mx-auto rounded"></div>
        </div>

        {/* 2-Column Modern Grid Layout */}
        <p className="text-[10px] font-mono text-slate-400 mb-2 md:hidden flex items-center gap-1">
          <span>Swipe to explore industries</span>
          <span className="animate-pulse">→</span>
        </p>
        <div onScroll={handleScroll} className="flex overflow-x-auto pb-4 gap-6 scrollbar-thin snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-6">
          {industries.map((ind, idx) => {
            const IconComp = ind.icon;
            
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIdx(idx)}
                className="p-6 rounded-2xl border border-slate-205 bg-white text-left transition-all duration-350 relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-sky-305 hover:shadow-2xl hover:-translate-y-1.5 min-w-[240px] w-[82vw] md:w-auto shrink-0 snap-center md:shrink"
              >
                {/* Subtle colored background backdrop glow on hover */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${ind.color} opacity-[0.02] group-hover:opacity-[0.06] blur-2xl transition-opacity pointer-events-none`} />
                
                <div className="space-y-4 w-full">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#1960a3]/10 text-[#1960a3] group-hover:bg-[#1960a3] group-hover:text-white transition-all duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-2xl select-none bg-slate-50 p-1.5 rounded-lg border border-slate-100 group-hover:scale-110 transition-transform">{ind.emoji}</span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-sans font-black text-base text-[#002045] tracking-tight group-hover:text-[#1960a3] transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {ind.challengesSolved}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-4 border-t border-dashed border-slate-100 text-[11px] font-extrabold mt-6 w-full text-[#1960a3]">
                  <span>Analyze Case Studies & Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Swipe Progress Track for Mobile with Indicators */}
        <div className="flex md:hidden flex-col items-center justify-center gap-2 mt-2">
          <div className="flex items-center gap-1.5 select-none text-sm font-bold font-mono">
            {industries.map((ind, idx) => (
              <span
                key={ind.id}
                className={`transition-all duration-300 ${
                  scrollIdx === idx ? 'text-[#1960a3] scale-125 font-bold' : 'text-slate-350'
                }`}
              >
                {scrollIdx === idx ? '●' : '○'}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-400">Swipe</span>
            <div className="w-16 h-1 rounded-full bg-slate-200 overflow-hidden relative">
              <div className="absolute top-0 left-0 bottom-0 bg-[#1960a3] w-1/2 animate-[pulse_1.5s_infinite]" />
            </div>
            <span className="text-[10px] font-mono text-slate-400">to explore industries</span>
          </div>
        </div>

        {/* High-fidelity Modal Overlay Blueprint container */}
        <AnimatePresence>
          {selectedIdx !== null && current && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Dark Glassmorphism Backdrop Blur */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedIdx(null)}
                className="absolute inset-0 bg-[#001026]/85 backdrop-blur-md cursor-zoom-out"
              />

              {/* Floating Content Sheet */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-[#00132c] text-white w-full max-w-2xl rounded-3xl border border-[#002b54] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
              >
                
                {/* Fancy top corner mesh glow matching category */}
                <div className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br ${current.color} opacity-20 blur-3xl`} />
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-[#1960a3]/10 opacity-5 blur-3xl" />

                {/* Header with Title and Close Button */}
                <div className="relative z-10 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-[#001c3d] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl bg-[#000a18] p-2.5 rounded-xl border border-[#001c3d] shadow-lg select-none">
                      {current.emoji}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-extrabold">Engineering Dossier</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-sans font-black text-white">{current.title} Specifications</h3>
                    </div>
                  </div>
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedIdx(null)}
                    className="w-10 h-10 rounded-full border border-[#002b54] bg-[#000a18] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:bg-slate-800"
                    aria-label="Close dossier"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Interactive Body (Scrollable if view-port is compact) */}
                <div className="relative z-10 px-6 sm:px-8 py-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                  
                  {/* Grid technical parameters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="p-3.5 bg-[#000a18]/70 border border-[#001c3d] rounded-xl space-y-1">
                      <span className="text-[9px] text-slate-400 block font-mono font-bold">RECOMMENDED COOLING PLANT</span>
                      <span className="text-xs font-black text-sky-400 block">{current.system}</span>
                    </div>

                    <div className="p-3.5 bg-[#000a18]/70 border border-[#001c3d] rounded-xl space-y-1">
                      <span className="text-[9px] text-amber-400 block font-mono font-bold">TYPICAL DISPLACEMENT LOAD</span>
                      <span className="text-xs font-black text-amber-400 block font-sans">{current.typicalCapacity}</span>
                    </div>

                    <div className="p-3.5 bg-[#000a18]/70 border border-[#001c3d] rounded-xl space-y-1 sm:col-span-2">
                      <span className="text-[9px] text-slate-400 block font-mono font-bold">AIR PURIFICATION & QUALITY COMPLIANCE</span>
                      <span className="text-xs font-semibold text-slate-200 block">{current.airQuality}</span>
                    </div>

                    <div className="p-3.5 bg-[#000a18]/70 border border-[#001c3d] rounded-xl space-y-1 sm:col-span-2">
                      <span className="text-[9px] text-teal-400 block font-mono font-bold">VERIFIED DELHI NCR COMPLETED CONTRACTS</span>
                      <span className="text-xs font-bold text-teal-300 block">📍 {current.ncrDeployments}</span>
                    </div>

                  </div>

                  {/* Energy/Tech Highlight gauge box */}
                  <div className="p-4 bg-[#001e3d]/40 rounded-xl border border-[#002b54] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-sans uppercase text-[10px] tracking-wide">Key Tech & Energy Performance Metrics</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                      {current.keyMetric}
                    </p>
                  </div>

                  {/* Project success benchmark section */}
                  <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-900/40 space-y-1.5">
                    <span className="text-[9px] text-emerald-400 font-mono uppercase tracking-widest font-black block">PREVIOUS SUCCESSFUL BENCHMARK BUILD</span>
                    <span className="text-xs font-black block text-slate-100">🏆 {current.highlightProject}</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                      {current.challengesSolved}
                    </p>
                  </div>

                </div>

                {/* Fixed Footer with CTA Action block */}
                <div className="relative z-10 px-6 sm:px-8 py-5 border-t border-[#001c3d] bg-[#000d1f] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 text-center sm:text-left">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>3D thermal load sizing included.</span>
                  </div>
                  <button
                    onClick={() => {
                      onTriggerSurveyWithIndustry(current.title);
                      setSelectedIdx(null);
                    }}
                    className="bg-[#1960a3] hover:bg-sky-500 active:scale-95 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all w-full sm:w-auto text-center cursor-pointer shadow-lg hover:shadow-sky-500/10 flex items-center justify-center gap-1.5 uppercase tracking-wider"
                  >
                    <span>Request {current.emoji} Scope</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
