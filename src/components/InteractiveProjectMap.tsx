import React, { useState } from 'react';
import { MapPin, Building, ToggleLeft, Layers, ZoomIn, CheckCircle } from 'lucide-react';
import { MAP_PINS_DATA, MapPin as PinType } from '../data';

export default function InteractiveProjectMap() {
  const [selectedPin, setSelectedPin] = useState<PinType>(MAP_PINS_DATA[1]); // Default to Gurugram HQs
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  return (
    <section className="py-20 bg-[#00132c] text-white relative overflow-hidden" id="project-map">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#001c3d_1px,transparent_1px),linear-gradient(to_bottom,#001c3d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="bg-blue-500/10 text-sky-400 font-extrabold tracking-widest uppercase text-xs px-3 py-1 rounded-full border border-sky-500/20">
            GEOGRAPHIC COVERAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight">
            Interactive Project Blueprint Map
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Click on any pulsing district coordinate node to view active installation metrics, local capacity, and major commercial projects delivered.
          </p>
          <div className="w-16 h-1 bg-sky-400 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#000a18]/80 p-6 sm:p-10 rounded-3xl border border-[#001c3d] backdrop-blur-md">
          
          {/* Left panel: Custom High Fidelity Map Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            <div className="relative w-full max-w-[500px] aspect-[4/3] bg-gradient-to-br from-[#00132c] to-[#000a18] rounded-2xl border border-[#001c3d] p-6 flex flex-col justify-between soft-depth overflow-hidden">
              <div className="absolute top-4 left-4 bg-[#001c3d]/80 px-2.5 py-1 rounded text-[10px] font-mono tracking-widest text-sky-400 flex items-center gap-1.5 border border-white/10">
                <span className="w-2 h-2 rounded bg-sky-400 animate-ping"></span>
                LIVE NCR SATELLITE PLOT
              </div>

              {/* Decorative SVG Map Contour simulating Delhi NCR */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" fill="none">
                {/* Outer Haryana/NCR Boundaries */}
                <path d="M15,40 C25,25 45,15 65,22 C75,25 85,35 88,48 C92,62 82,85 68,90 C50,96 28,92 18,75 C12,65 10,50 15,40 Z" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2,2"/>
                {/* Yamuna River layout simulation */}
                <path d="M52,5 C54,18 50,32 55,48 C58,56 66,70 65,85 C64,92 61,98 60,100" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.6"/>
              </svg>

              {/* District coordinate buttons relative placement */}
              {MAP_PINS_DATA.map((pin) => {
                const isSelected = selectedPin.id === pin.id;
                const isHovered = hoveredPin === pin.id;
                return (
                  <button
                     key={pin.id}
                     onClick={() => setSelectedPin(pin)}
                     onMouseEnter={() => setHoveredPin(pin.id)}
                     onMouseLeave={() => setHoveredPin(null)}
                     className="absolute transition-all transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                     style={{ left: `${pin.coordinates.x}%`, top: `${pin.coordinates.y}%` }}
                     id={`map-node-${pin.id}`}
                  >
                    {/* Ring Pulse layer */}
                    <span className={`absolute -inset-4 rounded-full transition-all duration-700 ${
                       isSelected 
                         ? 'bg-sky-400/30 scale-125 animate-pulse' 
                         : 'bg-transparent group-hover:bg-white/10 group-hover:scale-110'
                    }`}></span>

                    {/* Outer glow ring */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                       isSelected 
                         ? 'bg-sky-400 text-slate-950 scale-110 shadow-[0_0_15px_rgba(56,189,248,0.5)]' 
                         : 'bg-[#001c3d] text-slate-300 border border-[#001c3d] group-hover:bg-[#1960a3] group-hover:text-white'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>

                    {/* Tiny Floating text labels */}
                    <div className={`absolute left-10 top-1/2 -translate-y-1/2 bg-[#000a18]/90 text-[10px] font-bold px-2 py-0.5 rounded border border-[#001c3d] pointer-events-none transition-all ${
                       isSelected || isHovered 
                         ? 'opacity-100 translate-x-2' 
                         : 'opacity-40 translate-x-0'
                    }`}>
                      {pin.name}
                    </div>
                  </button>
                );
              })}

              <div className="mt-auto flex justify-between items-end border-t border-[#001c3d]/60 pt-4 z-10">
                <span className="text-[10px] text-slate-500 font-mono">DRAFT COORDINATOR: WGS84</span>
                <span className="text-[10px] text-sky-400/80 font-mono">PAN INDIA OFFICE CARRIERS</span>
              </div>
            </div>
          </div>

          {/* Right panel: Active Region details display */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#00132c] border border-[#001c3d] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-sky-400 font-bold tracking-widest uppercase font-mono">ACTIVE DISTRICT ZONE</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-sans mt-0.5">{selectedPin.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-[#001c3d]/80 py-4 font-mono">
                <div>
                  <span className="text-slate-500 text-[11px] block uppercase">PROJECTS COMPLETED</span>
                  <span className="text-2xl font-extrabold text-amber-400">{selectedPin.projectsCount}+</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block uppercase text-right">ISRE COVERAGE</span>
                  <span className="text-xs font-bold text-teal-400 block text-right mt-1 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 font-sans">
                    FULLY REGISTERED
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-slate-500 text-xs block font-bold tracking-wider">PROJECT HIGHLIGHT SPOTLIGHT</span>
                  <p className="text-slate-200 text-sm font-semibold pl-3 border-l-2 border-sky-400">
                    {selectedPin.highlightProject}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>Certified ASHRAE system balancing on-site layouts verified.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>Immediate 120-minute SLA field coordinator dispatch.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>Daikin VRV V-Series and Voltas chillers stock ready at regional depot.</span>
                  </div>
                </div>
              </div>

              <a
                href="#booking-section"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('booking-section');
                  if (target) {
                    window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
                  }
                }}
                className="block text-center mt-6 w-full py-3.5 bg-sky-500 text-slate-950 font-extrabold text-sm rounded-xl hover:bg-sky-400 transition-all cursor-pointer shadow-md shadow-sky-500/15"
              >
                Request Regional Estimate for {selectedPin.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
