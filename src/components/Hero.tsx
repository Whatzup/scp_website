import React, { useState } from 'react';
import { Play, ArrowRight, Check, Star, X, ShieldCheck, ClipboardCheck, Award, Zap } from 'lucide-react';
import Logo from './Logo';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const [videoOpen, setVideoOpen] = useState(false);

  const handleScrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('calculator-section');
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const [accreditationDetail, setAccreditationDetail] = useState<'gst' | 'msme' | null>(null);

  return (
    <header className="relative pt-24 pb-16 md:pt-40 md:pb-28 overflow-hidden bg-[#002045] text-white" id="about">
      {/* Immersive technical background accent mapping */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,#1960a3,transparent_60%)] pointer-events-none opacity-40"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#002522_1px,transparent_1px),linear-gradient(to_bottom,#002522_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Core grid layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero copy */}
          <div className="space-y-6 lg:col-span-7">
            
            {/* OFFICIAL ACCREDITATIONS & BRAND AUTHORIZATIONS */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 pb-2 border-b border-white/5">
              <div className="space-y-2 flex-1">
                <p className="text-[10px] sm:text-xs font-bold text-sky-300 tracking-widest uppercase">
                  ⚙️ OFFICIAL ACCREDITATIONS & BRAND AUTHORIZATIONS
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {/* GST Registered Button */}
                  <button
                    onClick={() => setAccreditationDetail('gst')}
                    className="bg-slate-900/65 border border-slate-700/50 rounded-xl px-3 py-2 flex items-center gap-2.5 hover:bg-slate-900 hover:border-sky-400/40 transition-all text-left group cursor-pointer"
                    id="badge-gst-btn"
                  >
                    <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-400/20 shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black text-slate-100 block leading-tight">GST Registered</span>
                      <span className="text-[9px] text-slate-400 font-medium">100% Tax Compliant (Click for details)</span>
                    </div>
                  </button>

                  {/* MSME Registered Button */}
                  <button
                    onClick={() => setAccreditationDetail('msme')}
                    className="bg-slate-900/65 border border-slate-700/50 rounded-xl px-3 py-2 flex items-center gap-2.5 hover:bg-slate-900 hover:border-sky-400/40 transition-all text-left group cursor-pointer"
                    id="badge-msme-btn"
                  >
                    <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-400/20 shrink-0">
                      <ClipboardCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black text-slate-100 block leading-tight">MSME Registered</span>
                      <span className="text-[9px] text-slate-400 font-medium">Govt Accredited (Click for details)</span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="shrink-0 flex items-center justify-start sm:justify-end">
                <Logo size={100} className="hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.2)]" />
              </div>
            </div>

            {/* National Scope Summary Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-200/10 text-sky-300 border border-sky-400/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-extrabold tracking-widest uppercase text-[10px] font-mono">
                COMMERCIAL • INDUSTRIAL • RESIDENTIAL HVAC Solutions Across India
              </span>
            </div>

            {/* Corporate Positioning Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight font-sans text-white">
              KD AC | Super Cool Projects
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-amber-400 tracking-tight leading-normal" id="main-sub-headline">
              HVAC Engineering & Contracting
            </h2>

            {/* Sub-heading specified word-for-word */}
            <div className="text-[7.5px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base text-[#BEE3F8] font-bold font-mono py-1.5 px-3 bg-slate-900/60 rounded-lg inline-block border border-slate-800/80 whitespace-nowrap">
              Design | Supply | Installation | Testing | Commissioning | AMC Services
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              <strong className="text-white block mb-1">Where Engineering Excellence Meets Climate Control.</strong>
              Delivering world-class HVAC, VRV/VRF, ventilation, and cleanroom solutions with precision, efficiency, and uncompromising quality across India.
            </p>

            {/* Action buttons specified word for word */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-amber-400 text-[#002045] px-8 py-4 rounded-xl font-black text-sm sm:text-base hover:bg-amber-500 active:scale-95 transition-all cursor-pointer shadow-lg shadow-amber-400/15"
                id="hero-book-now-btn"
              >
                Get Free Site Survey
              </button>

              <a
                href="#calculator-section"
                onClick={handleScrollToCalculator}
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-sky-400/30 text-sky-300 font-extrabold text-sm sm:text-base hover:bg-white/5 active:scale-95 transition-all cursor-pointer font-mono"
                id="hero-request-quote-btn"
              >
                Request Quotation
                <ArrowRight className="w-4.5 h-4.5" />
              </a>
            </div>

            {/* Inline Checkmarks stats */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-slate-400 text-xs font-semibold pt-4 border-t border-slate-800/60">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3px]" />
                <span>Authorized Platinum Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3px]" />
                <span>Certified ASHRAE Engineers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3px]" />
                <span>PAN India Service Network</span>
              </div>
            </div>
          </div>

          {/* Right Hero graphics */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Image layout container */}
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10 border border-slate-700/60 relative group">
              <img
                alt="HVAC heavy industrial cooling tower chillers on rooftop"
                className="w-full h-[320px] sm:h-[400px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
              
              {/* Floating emergency badge */}
              <div className="absolute left-4 bottom-4 bg-[#0F172A]/90 p-4 rounded-xl border border-sky-400/20 text-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center text-white font-black shrink-0 relative">
                  <span className="absolute -inset-1 rounded bg-red-400 animate-ping opacity-35"></span>
                  🚨
                </div>
                <div>
                  <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">EMERGENCY BANNER</h5>
                  <p className="text-slate-400 text-[10px]">24×7 Diagnostic ICU & Data Center Hotline</p>
                </div>
              </div>
            </div>

            {/* Floating statistical badges requested on page 1 of PDF */}
            <div className="absolute -top-6 -right-6 bg-amber-400 text-[#002045] px-5 py-4 rounded-2xl shadow-xl font-sans text-center hidden sm:block">
              <span className="text-3xl font-black block tracking-tight">10,000+</span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#002045]/80 block mt-1">TR INSTALLED</span>
            </div>

            <div className="absolute -bottom-6 -right-4 bg-sky-500 text-slate-950 px-5 py-4 rounded-2xl shadow-xl font-sans text-center hidden sm:block">
              <span className="text-2xl font-black block tracking-tight">500+</span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-950/80 block mt-1">PROJECTS COMPLETED</span>
            </div>
          </div>
        </div>

      </div>

      {/* POPUP MODAL FOR ACCREDITATION DETAILS */}
      {accreditationDetail !== null && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[1000] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setAccreditationDetail(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-xl transition-all cursor-pointer"
              id="close-accreditation-modal"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {accreditationDetail === 'gst' ? (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white font-sans leading-tight">GST Registration</h3>
                    <p className="text-[10px] font-mono text-slate-400 tracking-wider">TAX COMPLIANT ENTITY</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-3 py-2 border-b border-slate-800/50 gap-2">
                    <span className="text-slate-400 font-medium">Legal Name:</span>
                    <span className="text-white font-bold col-span-2 text-right">KD AC | Super Cool Projects</span>
                  </div>
                  <div className="grid grid-cols-3 py-2 border-b border-slate-800/50 gap-2">
                    <span className="text-slate-400 font-medium">GSTIN:</span>
                    <span className="text-emerald-400 font-mono font-bold col-span-2 text-right tracking-wide bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block w-max ml-auto">
                      06AVSPJ3528R1ZR
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-2 border-b border-slate-800/50 gap-2">
                    <span className="text-slate-400 font-medium">State Jurisdict.:</span>
                    <span className="text-white font-bold col-span-2 text-right">06 - Haryana / NCR Division</span>
                  </div>
                  <div className="grid grid-cols-3 py-2 border-b border-slate-800/50 gap-2">
                    <span className="text-slate-400 font-medium">Status:</span>
                    <span className="font-extrabold text-[#002045] bg-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] ml-auto w-max tracking-wide">
                      ● ACTIVE & VERIFIED
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-2 border-b border-slate-800/50 gap-2">
                    <span className="text-slate-400 font-medium">Key HSN Code:</span>
                    <span className="text-slate-350 col-span-2 text-right font-mono">
                      998713 (HVAC Installation)
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 text-[10px] text-slate-400 leading-relaxed border border-slate-800">
                  ⚠️ This GSTIN credential is officially registered under the Goods and Services Tax Network (GSTN), Ministry of Finance, Government of India. It validates 100% tax integration for corporate accounting and input tax credit (ITC) claims on SLA contracts.
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
                    <ClipboardCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white font-sans leading-tight">MSME Accreditation</h3>
                    <p className="text-[10px] font-mono text-slate-400 tracking-wider">UDYAM REGISTRATION</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-3 py-2 border-b border-slate-800/50 gap-2">
                    <span className="text-slate-400 font-medium">Enterprise Name:</span>
                    <span className="text-white font-bold col-span-2 text-right">KD AC | Super Cool Projects</span>
                  </div>
                  <div className="grid grid-cols-3 py-2 border-b border-slate-800/50 gap-2">
                    <span className="text-slate-400 font-medium">Udyam No:</span>
                    <span className="text-sky-400 font-mono font-bold col-span-2 text-right tracking-wide bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/20 inline-block w-max ml-auto">
                      UDYAM-DL-03-0145281
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-2 border-b border-slate-800/50 gap-2">
                    <span className="text-slate-400 font-medium">Classification:</span>
                    <span className="text-white font-bold col-span-2 text-right">Small Enterprise (Services)</span>
                  </div>
                  <div className="grid grid-cols-3 py-2 border-b border-slate-800/50 gap-2">
                    <span className="text-slate-400 font-medium">Major Activities:</span>
                    <span className="text-white font-bold col-span-2 text-right">Industrial Heating, Ventilation & AC (HVAC)</span>
                  </div>
                  <div className="grid grid-cols-3 py-2 border-b border-slate-800/50 gap-2">
                    <span className="text-slate-400 font-medium">Key NIC Codes:</span>
                    <span className="text-slate-350 col-span-2 text-right font-mono">
                      43224 & 33129
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 text-[10px] text-slate-400 leading-relaxed border border-slate-800">
                  🛡️ Registered with the Ministry of Micro, Small and Medium Enterprises, Government of India. This certification authorizes statutory benefit entitlements and underscores high-fidelity mechanical procurement compliance.
                </div>
              </div>
            )}
            
            <div className="bg-slate-950/80 px-6 py-4 flex justify-end border-t border-slate-800">
              <button
                onClick={() => setAccreditationDetail(null)}
                className="bg-sky-500 hover:bg-sky-600 text-slate-950 font-sans font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
