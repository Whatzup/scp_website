import React, { useState, useEffect } from 'react';
import { ShieldCheck, HelpCircle, ArrowRight, CheckCircle2, TrendingUp, Trophy } from 'lucide-react';

export default function BuiltOnTrust() {
  const [counters, setCounters] = useState({
    projects: 100,
    clients: 10,
    tr: 500,
    pros: 2,
    years: 1,
    uptime: 90
  });

  // Dynamic ticking animation on component load
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) => {
        const next = { ...prev };
        let finished = true;
        
        if (next.projects < 500) { next.projects += 20; finished = false; }
        if (next.clients < 50) { next.clients += 2; finished = false; }
        if (next.tr < 10000) { next.tr += 400; finished = false; }
        if (next.pros < 20) { next.pros += 1; finished = false; }
        if (next.years < 10) { next.years += 1; finished = false; }
        
        if (finished) {
          clearInterval(interval);
          return { projects: 500, clients: 50, tr: 10000, pros: 20, years: 10, uptime: 100 };
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: `${counters.projects}+`, label: 'Projects Completed', text: 'Spanning heavy industrial, pharma and corporate contracts.' },
    { value: `${counters.clients}+`, label: 'Commercial Clients', text: 'Including top hotels, DLF corporate parks and hospital chains.' },
    { value: `${counters.tr.toLocaleString()}+`, label: 'TR Installed', text: 'Estimated total Tons representing extreme cooling power.' },
    { value: `${counters.pros}+`, label: 'HVAC Professionals', text: 'ASHRAE / ISHRAE certified full-time design engineers.' },
    { value: `${counters.years}+ Years`, label: 'Experience', text: 'Serving Northern India with precision engineering layouts.' },
    { value: '24×7', label: 'Dynamic Support', text: 'SLA-backed priority emergency hotline for critical units.' }
  ];

  const valueGuarantees = [
    { title: 'Authorized Dealer', desc: 'Direct partnership with Daikin and Voltas factories' },
    { title: 'Certified Engineers', desc: 'In-house ASHRAE custom layout calculations' },
    { title: 'Professional Installation', desc: 'Double insulated copper and nitrogen hold tests' },
    { title: 'Warranty Support', desc: 'Directly backed by executive factory certificate' },
    { title: 'AMC Services', desc: '0% downtime priority quarterly seasonal support' },
    { title: 'PAN India Support', desc: 'Symmetrical dispatch capabilities across key hubs' }
  ];

  return (
    <section className="py-20 bg-[#00132c] border-b border-[#000a18] text-white relative overflow-hidden" id="trust">
      {/* Visual background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#1960a3,transparent_45%)] opacity-35 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Why instant trust block as specified in PDF */}
        <div className="bg-[#000a18]/80 p-5 rounded-2xl border border-[#001c3d] text-center text-xs text-sky-300 font-bold mb-16 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto soft-depth">
          <span className="bg-sky-500/10 border border-sky-400/20 px-2 py-0.5 rounded text-[10px] text-sky-300 uppercase tracking-widest font-mono">
            INSTANT TRUST SIGNAL
          </span>
          <span>"Why: Creates instant trust within 5 seconds for enterprise commercial HVAC procurers."</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive stats counters */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-amber-400 font-extrabold tracking-widest uppercase text-xs block font-mono">
              COMPREHENSIVE NUMBERS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-sans text-white tracking-tight">
              Our Track Record In Numbers
            </h3>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              KD AC | Super Cool Projects delivers proven engineering capability. We are the preferred HVAC contractors for commercial offices, schools, and hospitals because we stick to deadlines.
            </p>

            {/* Grid of counter elements */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#000a18]/60 p-5 rounded-2xl border border-[#001c3d] hover:border-[#1960a3]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-amber-400 block font-mono">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold text-white block mt-1">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-snug mt-2">
                    {stat.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Why Choose Super Cool Projects list */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#000a18] border border-[#001c3d] rounded-3xl space-y-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h4 className="text-lg font-bold">Why Choose KD AC | Super Cool Projects</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {valueGuarantees.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#00132c] border border-[#001c3d]/80 hover:bg-[#00132c]/40 transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <span className="text-xs font-extrabold text-slate-200 block">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-500 block leading-snug mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Micro warning notice from authorized dealer guidelines */}
            <div className="border-t border-[#001c3d] pt-4 flex gap-3 items-center text-xs text-slate-400">
              <ShieldCheck className="w-10 h-10 text-sky-400 shrink-0" />
              <p className="leading-snug">
                <strong>Executive Notice:</strong> Sourcing equipment from authorized channels secures validated warranty indices up to 5 full years.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
