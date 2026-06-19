import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, X, Award, CheckCircle2 } from 'lucide-react';
import { BRANDS_SHOWCASE } from '../data';

interface DealerShowcaseProps {
  onNavigateToPortal?: (brandId?: string) => void;
}

// Crisp reliable inline vector logos to bypass Wikipedia 403 hotlinking issues
const DaikinLogo = () => (
  <svg viewBox="0 0 140 45" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 8)">
      <path d="M0 25 L16 2 L28 25 Z" fill="#00A3E0" />
      <path d="M8 25 L18 10 L22 25 Z" fill="#E6F7FF" opacity="0.45" />
    </g>
    <text x="36" y="30" fontFamily="'Inter', 'Helvetica Neue', sans-serif" fontWeight="900" fontSize="23" fill="#0054A6" letterSpacing="-0.5">
      DAIKIN
    </text>
  </svg>
);

const VoltasLogo = () => (
  <svg viewBox="0 0 140 45" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="24" fontFamily="'Inter', 'Helvetica Neue', sans-serif" fontWeight="900" fontSize="22" fill="#043265" letterSpacing="0.2">
      VOLTAS
    </text>
    <path 
      d="M3 29 Q 60 36 125 29 Q 60 30 3 29 Z" 
      fill="url(#voltas-swoosh)" 
    />
    <text x="5" y="37" fontFamily="system-ui, monospace" fontWeight="bold" fontSize="6.5" fill="#145293" letterSpacing="1.2">
      A TATA ENTERPRISE
    </text>
    <defs>
      <linearGradient id="voltas-swoosh" x1="3" y1="29" x2="125" y2="29" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

export default function DealerShowcase({ onNavigateToPortal }: DealerShowcaseProps) {
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  return (
    <section className="py-20 bg-slate-100 border-b border-gray-200" id="brands-showcase">
      <div className="max-w-7xl mx-auto px-6">
         
        {/* Intro */}
        <div className="text-center mb-16 space-y-4">
          <span className="bg-[#1960a3]/10 text-[#1960a3] font-black tracking-widest uppercase text-sm sm:text-base px-5 py-2 rounded-full border border-[#1960a3]/20 font-mono inline-block">
            AUTHORIZED DISTRIBUTION
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#002045] font-sans tracking-tight">
            Straight From the Source
          </h2>
          <p className="text-slate-650 max-w-xl mx-auto text-xs sm:text-sm">
            Direct manufacturer partnerships enable us to deliver authentic HVAC systems with factory-backed warranties, better value, and complete peace of mind.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] mx-auto rounded"></div>
        </div>

        {/* Minimal Symmetrical Clickable Grid for Daikin and Voltas with Background Buildings */}
        <p className="text-[10px] font-mono text-slate-400 mb-2 text-center md:hidden flex items-center justify-center gap-1">
          <span>Swipe to view brand certificates</span>
          <span className="animate-pulse">→</span>
        </p>
        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-thin snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-8 max-w-4xl mx-auto">
          {BRANDS_SHOWCASE.map((brand) => (
            <button 
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              className="relative min-w-[240px] w-[82vw] md:w-auto shrink-0 snap-center md:shrink min-h-[300px] rounded-3xl overflow-hidden p-6 sm:p-8 text-left transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group flex flex-col justify-between border border-[#001c3d]/25 cursor-pointer shadow-lg"
            >
              {/* Core Building Image as Background of Tile */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                style={{ backgroundImage: `url(${brand.logo})` }}
              />

              {/* Seamless Dark Overlay for perfect typography safety & logo contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000d1d] via-[#000d1d]/85 to-[#000d1d]/40 group-hover:via-[#000d1d]/90 transition-colors duration-300 pointer-events-none" />

              {/* Dynamic hover color-splash tint to make it highly eye-catching */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mix-blend-color ${
                brand.id === 'daikin' 
                  ? 'bg-gradient-to-tr from-sky-400 to-blue-600' 
                  : 'bg-gradient-to-tr from-emerald-400 to-sky-600'
              }`} />

              {/* Header Layer: Status tag & Authorized credential emblem */}
              <div className="relative flex justify-between items-start gap-4 z-10 w-full">
                <span className={`text-[10px] font-mono font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-sm text-white ${
                  brand.id === 'daikin' ? 'bg-sky-600/90 border border-sky-500/40' : 'bg-amber-600/90 border border-amber-500/40'
                }`}>
                  {brand.id === 'daikin' ? 'Platinum Channel Partner' : 'TATA Enterprise Certified'}
                </span>
                
                <div className="flex items-center gap-1 bg-[#001227]/90 border border-slate-700 px-2.5 py-1 rounded-md text-[9px] font-mono text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>VERIFIED</span>
                </div>
              </div>

              {/* Bottom Layer: Crisp Solid Logo and Text block */}
              <div className="relative z-10 w-full space-y-4 pt-12">
                <div className="flex items-center gap-4">
                  {/* Brand Logo cleanly visible in pristine solid high-contrast container */}
                  <div className="w-28 h-14 rounded-2xl bg-white p-2 flex items-center justify-center shadow-2xl border border-white shrink-0 transition-all duration-300 group-hover:scale-105">
                    {brand.id === 'daikin' ? <DaikinLogo /> : <VoltasLogo />}
                  </div>
                  
                  {/* Title & category */}
                  <div className="min-w-0">
                    <h4 className="text-xl font-black text-white group-hover:text-sky-300 transition-colors tracking-tight">
                      {brand.name} Authorized
                    </h4>
                    <p className="text-[10px] text-slate-300 uppercase tracking-widest font-mono">
                      {brand.certificateNo}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium line-clamp-2 md:line-clamp-none">
                  {brand.description}
                </p>

                {/* Direct verify action line */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-dashed border-slate-700/60 text-xs font-black">
                  <span className="text-slate-400 font-medium text-[10px]">DIRECT COMPRESSOR WARRANTY APPLIES</span>
                  <div className="flex items-center gap-1.5 text-sky-400 font-extrabold group-hover:underline">
                    <span>Inspect Credentials</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

            </button>
          ))}
        </div>

        {/* Swipe Progress Track for Mobile */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-2">
          <span className="text-[10px] font-mono text-slate-400">Swipe</span>
          <div className="w-16 h-1 rounded-full bg-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 bg-[#1960a3] w-1/2 animate-[pulse_1.5s_infinite]" />
          </div>
          <span className="text-[10px] font-mono text-slate-400">to view brand info</span>
        </div>

      </div>

      {/* Local Brand Certificate popover modal */}
      {selectedBrand && (
        <div className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in">
          <div className="bg-[#00132c] rounded-2xl shadow-2xl border-2 border-amber-400 max-w-lg w-full relative p-4 sm:p-8 font-sans text-white max-h-[92vh] flex flex-col overflow-y-auto">
            <button
              onClick={() => setSelectedBrand(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white bg-[#000d1f] w-10 h-10 flex items-center justify-center rounded-full border border-[#002b54] transition-colors cursor-pointer z-50"
              aria-label="Close certificate"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Layout Mockup */}
            <div className="border-4 double border-[#002b54] rounded-xl p-5 sm:p-6 space-y-6 text-center relative overflow-hidden bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#001c3d,transparent_100%)]">
              
              <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-400">CERTIFICATE NO: {selectedBrand.certificateNo}</div>
              
              <Award className="w-14 h-14 text-amber-400 mx-auto shrink-0" />
              
              <div className="space-y-1">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">CERTIFICATE OF PARTNERSHIP</h3>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">AUTHORIZED DISTRIBUTION ENGINE CONTRACT</p>
              </div>

              <div className="w-12 h-0.5 bg-[#002b54] mx-auto"></div>

              <div className="space-y-2 text-slate-300">
                <p className="text-xs">
                  This hereby certifies that our direct enterprise channel partner,
                </p>
                <h4 className="text-base font-black text-white">KD AC | Super Cool Projects Private Ltd</h4>
                <p className="text-xs px-2 leading-relaxed">
                  is fully registered, audited, and approved for sales, design calculations, piping layout, testing, commissioning, and warranty support of <strong className="text-white">{selectedBrand.name}</strong> cooling plants in India.
                </p>
              </div>

              <div className="bg-[#000a18]/40 p-4 rounded-xl border border-[#002b54]/40 text-xs text-slate-200 font-medium text-center space-y-1">
                <span className="font-bold text-amber-400 font-mono text-[9px] block uppercase tracking-wider">SECURED USER INTEREST ENTITLEMENT:</span>
                <div className="flex items-center justify-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{selectedBrand.warrantyText}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4 border-[#001c3d] text-left text-[9px] text-slate-450 font-mono">
                <div>
                  <span className="block font-bold text-slate-400">WARRANTY BACKING:</span>
                  <span>100% Genuine Direct Backed</span>
                </div>
                <div>
                  <span className="block font-bold text-sky-450">GOLD STATUS SECURED:</span>
                  <span>Active Registration Contract 2026</span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-4 font-mono text-[8px] text-slate-500">
                <span>NEW DELHI HEAD OFFICES</span>
                <span className="text-[#38B2AC] font-bold">✓ STAMPED VALID</span>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                onClick={() => setSelectedBrand(null)}
                className="px-6 py-2 bg-slate-900 border border-[#002b54] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all font-sans cursor-pointer"
              >
                Close Certificate Verification
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
