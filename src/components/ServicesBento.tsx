import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, X, Check, Award, Flame, Snowflake, Sparkles } from 'lucide-react';

interface ServicesBentoProps {
  onOpenBookingWithCategory: (category: string) => void;
}

interface ServiceDetail {
  id: string;
  title: string;
  image: string;
  desc: string;
  benefits: string[];
  specs: string; // Detail for the popover modal
  cfmRate: string;
}

export default function ServicesBento({ onOpenBookingWithCategory }: ServicesBentoProps) {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const services: ServiceDetail[] = [
    {
      id: 'vrv-vrf',
      title: 'VRV / VRF Systems',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400',
      desc: 'Variable refrigerant volume systems delivering independent modular climate zones with up to 45% electricity conservation.',
      benefits: [
        'Zoned temperature control matching room occupancy',
        'Direct energy reduction (inverter speed scrolls)',
        'Extremely quiet indoor operation (< 19 dB)'
      ],
      cfmRate: 'Variable auto CFM',
      specs: 'Daikin VRV V-Series & Voltas Scroll VRF engineering layouts. Copper piping hold tested up to 48 hours under 450 PSI dry nitrogen code. Ideal for offices and luxury residences.'
    },
    {
      id: 'ducted-ac',
      title: 'Ducted AC',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400',
      desc: 'Uniform high-volume cool air dissemination through low-profile ceiling conduits paired with aesthetic linear diffusers.',
      benefits: [
        '100% invisible cooling hidden in ceiling voids',
        'Perfect symmetrical air circulation',
        'Heavy-duty hot summer protection'
      ],
      cfmRate: '600 - 2,400 CFM',
      specs: 'Fabricated galvanized iron (GI) conduits with 12mm thermal nitrile rubber insulation coating to prevent condensation dripping.'
    },
    {
      id: 'cassette-ac',
      title: 'Cassette AC',
      image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400',
      desc: 'Universal 360-degree round-flow air distribution ceiling units perfect for commercial shops, cafes, and open offices.',
      benefits: [
        'Multi-directional 4-way ambient air sweep',
        'Built-in high lift condensate drain pumps',
        'Elegant low-profile architectural ceiling integration'
      ],
      cfmRate: '400 - 1,500 CFM',
      specs: 'Modern Daikin and Voltas Multi-split inverter cassette installations. Direct hookup to outdoor multi-condenser panels.'
    },
    {
      id: 'chillers',
      title: 'Chillers',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400',
      desc: 'High-tonnage scroll and screw chilled water networks designed for mass scale corporate parks, retail malls, and hospitals.',
      benefits: [
        'Lowest operational cost per Ton above 100 TR',
        'Redundant water pumps for 100% continuous runtime',
        'Precise HVAC load matching'
      ],
      cfmRate: 'Exceeding 5,000 CFM',
      specs: 'Voltas central scroll chiller installations coupled with high-efficiency fan coil units (FCU) and custom condenser cooling towers.'
    },
    {
      id: 'package-units',
      title: 'Package Units',
      image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=400',
      desc: 'Self-contained rooftop or side-mounted single-cabinet HVAC units ideal for open halls, bank branches, and warehouses.',
      benefits: [
        'All cooling components built in one single cabinet',
        'No refrigerant piping required at construction site',
        'Highly versatile ductable static pressures'
      ],
      cfmRate: '1,200 - 4,500 CFM',
      specs: 'Voltas and Daikin outdoor-grade weatherproofed packages with scroll compressors, factory tested and charged with R-410A gas.'
    },
    {
      id: 'ahu-systems',
      title: 'AHU Systems',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400',
      desc: 'Double-skinned Air Handling Units engineered for positive air pressures, hospital cleanrooms, and surgical ICU wings.',
      benefits: [
        'Pre-fitted with certified 3-stage HEPA filters',
        'Integrated UVGI light rings for bacteria destruction',
        'Precise absolute fresh-air intake indexing'
      ],
      cfmRate: '1,500 - 15,000 CFM',
      specs: 'Fully compliant with clinical air standards. Rigid polyurethane foam insulated panels paired with spark-proof blowers.'
    },
    {
      id: 'ventilation-systems',
      title: 'Ventilation Systems',
      image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=400',
      desc: 'Heavy mechanical air extraction systems designed for basements, industrial warehouses, and toxic factory exhaust.',
      benefits: [
        'Rapid room freshness replenishment rate',
        'Positive basement air displacement',
        'High humidity extraction indices'
      ],
      cfmRate: '2,000 - 30,000 CFM',
      specs: 'Axial-flow fan rigs coupled with fire-rated steel fire dampers, compliant with National Building Code (NBC) safety controls.'
    },
    {
      id: 'cleanroom-hvac',
      title: 'Clean Room HVAC',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
      desc: 'Ultra-low particle count cleanroom setups with terminal HEPA modules designed for pharma plants, solar labs, and micro-electronics.',
      benefits: [
        'Maintains absolute Class 100 to Class 10,000 rating',
        'Strict relative humidity regulation within ±2% limit',
        'Symmetrical laminar fresh air currents'
      ],
      cfmRate: 'Up to 25,000 CFM',
      specs: 'Double insulated duct arrays with zero static friction, terminal custom HEPA registers, real-time particle sensors.'
    },
    {
      id: 'industrial-cooling',
      title: 'Industrial Cooling',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400',
      desc: 'Specialized low-temperature process cooling networks, chemical machinery coolant jackets, and factory floor blast units.',
      benefits: [
        'Steady thermal output within ±0.5°C threshold',
        'Heavy dust-tolerant filter cages',
        'Corrosion resistant copper fins'
      ],
      cfmRate: 'High Static Pressure',
      specs: 'Chemical process thermal calculation designs. Direct expansion evaporator setups or secondary glycol loop piping installation.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-gray-100" id="services">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro Header */}
        <div className="mb-16 max-w-3xl space-y-4">
          <span className="text-[#1960a3] font-bold tracking-widest uppercase text-xs sm:text-sm font-sans block">
            INDUSTRIAL & COMMERCIAL CATALOGUE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002045] font-sans leading-tight block">
            Comprehensive HVAC Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We deliver highly robust, compliant thermal execution. Every service layout is drafted by ISHRAE certified engineers utilizing high-integrity parts from TATA Voltas and Daikin networks.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] rounded"></div>
        </div>

        {/* 9 Card Grid - responsive 2 columns layout */}
        <p className="text-[10px] font-mono text-slate-400 mb-2 md:hidden flex items-center gap-1">
          <span>Swipe to explore services catalog</span>
          <span className="animate-pulse">→</span>
        </p>
        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-thin snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-8">
          {services.map((srv) => (
            <div 
              key={srv.id} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group min-w-[240px] w-[82vw] md:w-auto shrink-0 snap-center md:shrink"
            >
              {/* Product Visual */}
              <div className="relative h-48 overflow-hidden bg-slate-100 border-b border-slate-100 shrink-0">
                <img 
                  src={srv.image} 
                  alt={srv.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
                
                {/* Visual Label */}
                <span className="absolute top-3 left-3 bg-[#002045]/90 text-[9px] font-mono font-bold tracking-wider text-sky-300 py-1 px-2.5 rounded border border-sky-400/20 uppercase z-10">
                  {srv.cfmRate}
                </span>
              </div>

              {/* Text Description */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-[#002045] tracking-tight group-hover:text-[#1960a3] transition-colors">{srv.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed min-h-[48px]">{srv.desc}</p>
                </div>

                {/* Benefits Bullet Points */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {srv.benefits.map((b, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-start text-[10.5px] text-slate-600 leading-snug">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More & Inquire Actions (Request Quote) */}
                <div className="pt-4 flex gap-2">
                  <button 
                    onClick={() => setSelectedService(srv)}
                    className="flex-1 py-3 text-center border border-slate-300 rounded-xl hover:bg-slate-50 text-slate-600 font-bold text-[11px] transition-all cursor-pointer"
                    id={`learn-more-${srv.id}`}
                  >
                    Learn Specs
                  </button>
                  <button 
                    onClick={() => onOpenBookingWithCategory(srv.title)}
                    className="flex-1 py-3 text-center bg-[#002045] text-white rounded-xl hover:bg-slate-800 font-extrabold text-[11px] transition-all cursor-pointer shadow-md shadow-[#002045]/15 uppercase tracking-wide border-2 border-transparent"
                    id={`inquire-${srv.id}`}
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe Progress Track for Mobile */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-2">
          <span className="text-[10px] font-mono text-slate-400">Swipe</span>
          <div className="w-16 h-1 rounded-full bg-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 bg-[#1960a3] w-1/2 animate-[pulse_1.5s_infinite]" />
          </div>
          <span className="text-[10px] font-mono text-slate-400">to browse systems</span>
        </div>

      </div>

      {/* Services Specification Popover Info Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-sky-200 max-w-md w-full relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-50 p-1.5 rounded-full transition-colors"
              id="close-srv-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 bg-[#002045] text-white space-y-1">
              <div className="flex items-center gap-1.5">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-[10px] font-bold font-mono tracking-widest text-[#BEE3F8] uppercase">DAIKIN & VOLTAS SPECIFICATION</span>
              </div>
              <h4 className="text-xl font-bold font-sans">{selectedService.title}</h4>
              <p className="text-xs text-sky-300 font-mono">Commissioning velocity index: {selectedService.cfmRate}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedService.specs}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
                <span className="font-bold text-slate-700 block text-xs">🛠️ Engineering Gateway Checklists:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500">✓</span>
                    <span>ASHRAE Standard</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500">✓</span>
                    <span>WGS84 Coordinates</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500">✓</span>
                    <span>450 PSI Pressure</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500">✓</span>
                    <span>0% Leak Verified</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end gap-2 px-6">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-xs font-bold hover:bg-slate-100"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  const srvId = selectedService.id;
                  setSelectedService(null);
                  onOpenBookingWithCategory(srvId);
                }}
                className="px-5 py-2 bg-amber-400 text-[#002045] rounded-lg text-xs font-bold hover:bg-amber-500 active:scale-95 transition-all"
              >
                Request Free Survey
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
