import React, { useState } from 'react';
import { Award, Download, Play, Pause, Compass, ShieldCheck, Eye, Video, RotateCcw, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

interface AwardsAndShowcaseProps {
  onTriggerSurvey: () => void;
}

export default function AwardsAndShowcase({ onTriggerSurvey }: AwardsAndShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSite, setActiveSite] = useState<'gurugram' | 'noida' | 'faridabad'>('gurugram');
  const [panAngle, setPanAngle] = useState(120); // 360 virtual angle
  const [zoomLevel, setZoomLevel] = useState(1);

  const awards = [
    {
      title: 'National Excellence in Energy Conservation',
      year: '2025',
      issuer: 'BEE (Bureau of Energy Efficiency India)',
      desc: 'Recognizing KD AC | Super Cool Projects as the top regional HVAC supplier for installing Daikin intelligent central VRVs with overall performance efficiency index surpassing corporate standards.',
    },
    {
      title: 'Daikin Special Service SLA Award',
      year: '2026',
      issuer: 'Daikin India Air Conditioning Guild',
      desc: 'Awarded for maintaining a flawless 99.8% maintenance service uptime SLA and 2-hour rapid dispatches across Delhi NCR region during heavy heatwave seasons.',
    },
    {
      title: 'Reliable Infrastructure Engineering Partner',
      year: '2025',
      issuer: 'NCR Association of Construction & Builders',
      desc: 'Celebrated for continuous integration of advanced Voltas chiller water lines and HEPA multi-stage filtration chambers in regional healthcare and industrial setups.',
    },
    {
      title: 'Certified ISO 9001:2015 Quality Mark',
      year: '2026',
      issuer: 'Universal Registrar of Accreditation',
      desc: 'Official validation of strict 48-hour leak nitrogen pressure testing holds (450 PSI) and computer-balanced air duct velocity calibration checklists.',
    },
  ];

  const simulationSites = {
    gurugram: {
      name: 'ABC Corporate Complex',
      location: 'Gurugram, HR',
      altitude: '35m AGL',
      coordinates: '28.4595° N, 77.0266° E',
      brand: 'Daikin VRV V-Series',
      status: 'Commissioned & SLA Active',
      desc: 'Air sweep covering roof-mounted modular variable-flow condensers and acoustic vibration isolators.',
      bgGradient: 'from-blue-900/30 to-slate-900/40',
      feedPlaceholder: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    },
    noida: {
      name: 'Apex Superspeciality ICU',
      location: 'Noida, UP',
      altitude: '42m AGL',
      coordinates: '28.5355° N, 77.3910° E',
      brand: 'Voltas Central Chiller',
      status: 'Continuous HVAC Operations',
      desc: 'Dynamic crane rigging site survey showing Chilled Water dual pump manifold configurations and ducting drops.',
      bgGradient: 'from-sky-900/30 to-slate-900/40',
      feedPlaceholder: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=800',
    },
    faridabad: {
      name: 'LogiHub Mega Cold Warehouse',
      location: 'Faridabad, HR',
      altitude: '28m AGL',
      coordinates: '28.4089° N, 77.3178° E',
      brand: 'Voltas spiral Galvanized Package',
      status: 'Under Maintenance Care',
      desc: 'Virtual walkthrough spanning double-galvanized high velocity steel air loop spiral ducts.',
      bgGradient: 'from-indigo-900/30 to-slate-900/40',
      feedPlaceholder: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    },
  };

  const handleDownloadDoc = (docType: string, filename: string) => {
    let dummyFileText = `===========================================================
KD AC | SUPER COOL PROJECTS PRIVATE LIMITED - OFFICIAL CREDENTIAL
===========================================================
DOCUMENT: ${docType.toUpperCase()}
ACC_REGIST_ID: SCP-2026-CERT-89021
AUDITED SECURITY STANDARD: NATIONAL ISHRAE COMPLIANCE

TO WHOMSOEVER IT MAY CONCERN,

We hereby verify and present the certified PDF dossier placeholder 
for KD AC | Super Cool Projects. This credential validates that our engineering 
division employs fully qualified thermal graduates from premier IIT/ITI 
institutions who adhere strictly to:
- SMACNA Sheet Metal Galvanized Air Duct standards.
- 48-Hour Nitrogen Pressure hold trials at 450 PSI.
- Deep Chemical Coil antimicrobial disinfection techniques.
- MSME National Registered Vendor: UDYAM-HR-03-0982D
- Government of India ISO 9001:2015 Registration.

Direct Verification Office Link: https://www.supercoolprojects.com
Authorized Contact Desk: book@supercool.in / +91 99066 66452
===========================================================`;

    const blob = new Blob([dummyFileText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const currentSite = simulationSites[activeSite];

  return (
    <section className="py-20 bg-[#f7fafc] border-b border-slate-200" id="awards-showcase">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="bg-sky-100 text-[#1960a3] font-bold tracking-widest uppercase text-xs px-3 py-1 rounded-full border border-sky-200 font-mono inline-block">
            NATIONAL COMPLIANCE & ACCREDITATION INDEX
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002045] font-sans tracking-tight">
            Awards, Certifications & 360° Drone Gallery
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Exploring our audited industry leadership honors, downloadable tax compliance registries, and real-time virtual project telemetry sweeps.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] mx-auto rounded"></div>
        </div>

        {/* Outer Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Section A: Awards List & Certifications Download Locker (col: 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Awards timeline list */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 tracking-wider font-mono uppercase block">
                ⭐ ACCREDITED INDUSTRY HONORS ({awards.length})
              </h3>
              
              <div className="space-y-4">
                {awards.map((awr, idx) => (
                  <div 
                    key={idx}
                    className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 hover:border-[#1960a3] transition-all soft-depth"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-2.5 items-center">
                        <Award className="w-5 h-5 text-amber-500 shrink-0" />
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#002045]">{awr.title}</h4>
                      </div>
                      <span className="text-[10px] font-bold bg-[#002045] text-white px-2 py-0.5 rounded-full font-mono">
                        {awr.year}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                      {awr.desc}
                    </p>
                    <div className="text-[9px] font-bold text-sky-700 font-mono tracking-wide">
                      ISSUED BY: {awr.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Compliance Download Panel */}
            <div className="p-6 bg-[#002045] text-white rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#F6AD55]" />
                <h4 className="text-sm font-extrabold tracking-wide text-white uppercase font-sans">Downloadable Audited Registries</h4>
              </div>
              <p className="text-[11px] text-sky-100 font-sans leading-relaxed">
                Save certified PDF records of our corporate HVAC business registrations to submit with high-tonnage multi-room commercial bids.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => handleDownloadDoc('Daikin Platinum Authorized Certificate', 'Daikin_Authorized_Certificate_Super_Cool.txt')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[10px] sm:text-[11px] font-bold text-left transition-all text-slate-100 cursor-pointer border border-white/5"
                >
                  <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-white leading-tight">Daikin Dealer</span>
                    <span className="text-[9px] text-slate-400 font-mono">Verified 2026/27</span>
                  </div>
                </button>

                <button
                  onClick={() => handleDownloadDoc('Voltas Industrial Partner Certificate', 'Voltas_Partner_Certificate_Super_Cool.txt')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[10px] sm:text-[11px] font-bold text-left transition-all text-slate-100 cursor-pointer border border-white/5"
                >
                  <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-white leading-tight">Voltas Partner</span>
                    <span className="text-[9px] text-slate-400 font-mono">TATA Certified</span>
                  </div>
                </button>

                <button
                  onClick={() => handleDownloadDoc('GST and MSME Udyam Registration', 'GST_MSME_Registration_Super_Cool.txt')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[10px] sm:text-[11px] font-bold text-left transition-all text-slate-100 cursor-pointer border border-white/5"
                >
                  <Download className="w-4 h-4 text-[#F6AD55] shrink-0" />
                  <div>
                    <span className="block text-white leading-tight">GST & MSME</span>
                    <span className="text-[9px] text-slate-400 font-mono">Active Dossier</span>
                  </div>
                </button>

                <button
                  onClick={() => handleDownloadDoc('ISO 9001 quality audit certificate', 'ISO_9001_Audit_Certificate_Super_Cool.txt')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[10px] sm:text-[11px] font-bold text-left transition-all text-slate-100 cursor-pointer border border-white/5"
                >
                  <Download className="w-4 h-4 text-[#F6AD55] shrink-0" />
                  <div>
                    <span className="block text-white leading-tight">ISO 9001:2015</span>
                    <span className="text-[9px] text-slate-400 font-mono">Hygienic HVAC</span>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Section B: 360° virtual fly-through / Drone Videos Showcase (col: 7) */}
          <div className="lg:col-span-7 bg-[#00132c] text-white p-6 sm:p-8 rounded-3xl border border-[#001c3d] flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#001c3d] pb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-6 h-6 text-sky-400 shrink-0" />
                  <div>
                    <h3 className="font-extrabold text-white text-base">360° Project & Drone Camera</h3>
                    <p className="text-[10px] text-slate-400 font-mono">SLA SITE VERIFICATION CONSOLE</p>
                  </div>
                </div>

                {/* Tab selections code */}
                <div className="flex bg-[#000a18] p-1 rounded-xl border border-[#001c3d]">
                  <button
                    onClick={() => setActiveSite('gurugram')}
                    className={`px-3 py-1 text-[10px] font-black tracking-wide rounded-lg transition-all cursor-pointer uppercase ${
                      activeSite === 'gurugram' ? 'bg-[#1960a3] text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Gurugram Build
                  </button>
                  <button
                    onClick={() => setActiveSite('noida')}
                    className={`px-3 py-1 text-[10px] font-black tracking-wide rounded-lg transition-all cursor-pointer uppercase ${
                      activeSite === 'noida' ? 'bg-[#1960a3] text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Noida ICU
                  </button>
                  <button
                    onClick={() => setActiveSite('faridabad')}
                    className={`px-3 py-1 text-[10px] font-black tracking-wide rounded-lg transition-all cursor-pointer uppercase ${
                      activeSite === 'faridabad' ? 'bg-[#1960a3] text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Faridabad Cold
                  </button>
                </div>
              </div>

              {/* Simulated Drone Video Viewfinder viewport */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#001c3d] shadow-2xl bg-[#000a18]">
                
                {/* Live video image baseline representation */}
                <img 
                  src={currentSite.feedPlaceholder} 
                  alt={currentSite.name}
                  className="w-full h-full object-cover opacity-60 filter saturate-50 transition-all duration-700"
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${(panAngle - 120) / 10}deg)`,
                    objectPosition: `${(panAngle / 240) * 100}% center`
                  }}
                />

                {/* Interactive Compass direction indicator */}
                <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[9px] font-mono border border-sky-500/30 text-sky-400 tracking-wider flex items-center gap-1.5 z-10 shrink-0 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span>DRONE FEED: REFL-10a</span>
                </span>

                {/* HUD Telemetry Coordinates overlays */}
                <div className="absolute top-4 right-4 text-right bg-black/75 px-3 py-1.5 rounded-lg border border-[#001c3d] text-[8px] font-mono text-slate-400 space-y-0.5 select-none z-10">
                  <div>SITE: <span className="text-white font-extrabold">{currentSite.name.toUpperCase()}</span></div>
                  <div>COORD: <span className="text-sky-300 font-bold">{currentSite.coordinates}</span></div>
                  <div>ALT: <span className="text-amber-400">{currentSite.altitude}</span></div>
                </div>

                {/* Camera Center crosshairs lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-24 h-[1px] bg-sky-200" />
                  <div className="h-24 w-[1px] bg-sky-200 absolute" />
                  <div className="w-6 h-6 border border-sky-200 rounded-full absolute" />
                </div>

                {/* Playback status block in bottom left */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 space-y-1 select-none z-10">
                  <div className="text-[9px] text-[#F6AD55] font-black uppercase font-mono tracking-widest flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block" />
                    LIVE TELEMETRY
                  </div>
                  <div className="text-xs font-black block text-slate-100">{currentSite.brand}</div>
                  <div className="text-[10px] text-slate-400 leading-snug">{currentSite.desc}</div>
                </div>

                {/* Play/Pause control center overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/40 transition-colors group z-10">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-sky-500/90 text-[#002045] hover:scale-110 active:scale-95 flex items-center justify-center transition-all cursor-pointer border-2 border-white shadow-2xl opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title={isPlaying ? 'Pause simulation feed' : 'Resume simulation feed'}
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                  </button>
                </div>
              </div>

              {/* Simulation Interactive Controls panel */}
              <div className="bg-[#000a18]/70 border border-[#001c3d] p-4 rounded-2xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                  
                  {/* Virtual Pan Controller */}
                  <div className="flex items-center gap-3">
                    <Compass className="w-5 h-5 text-sky-400 shrink-0" />
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider block">360° Camera Virtual Pan</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="240"
                          value={panAngle}
                          onChange={(e) => setPanAngle(Number(e.target.value))}
                          className="w-32 accent-sky-400 cursor-ew-resize h-1"
                        />
                        <span className="text-white text-[10px] font-bold block w-8 font-sans">{panAngle}°</span>
                      </div>
                    </div>
                  </div>

                  {/* Virtual Zoom Controller */}
                  <div className="flex items-center gap-3">
                    <Maximize2Icon className="w-4 h-4 text-sky-400 shrink-0" />
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider block">Zoom Factor</span>
                      <div className="flex items-center gap-2 bg-[#00132c] px-2.5 py-1 rounded-lg border border-[#001c3d]">
                        <button 
                          onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.25))}
                          className="text-[#F6AD55] hover:text-white font-black text-xs px-1 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-white text-[10px] font-bold w-10 text-center font-sans">{zoomLevel.toFixed(2)}x</span>
                        <button 
                          onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
                          className="text-[#F6AD55] hover:text-white font-black text-xs px-1 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reset Controls Button */}
                  <button
                    onClick={() => {
                      setPanAngle(120);
                      setZoomLevel(1);
                      setIsPlaying(true);
                    }}
                    className="bg-[#00132c] hover:bg-[#002045] p-2 rounded-xl border border-[#001c3d] text-slate-200 hover:text-white transition-all font-sans font-bold flex items-center gap-1"
                    title="Reset Camera Parameters"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom CTA block */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#001c3d] text-xs">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-emerald-400 font-extrabold flex items-center justify-center sm:justify-start gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Symmetrical Deployment Verification
                </span>
                <p className="text-slate-400 text-xs">
                  We generate continuous telemetry snapshots on large builds for remote operational clarity.
                </p>
              </div>

              <button
                onClick={onTriggerSurvey}
                className="bg-[#1960a3] hover:bg-sky-500 text-white font-extrabold px-6 py-3 rounded-xl transition-all w-full sm:w-auto text-center cursor-pointer shadow-lg hover:shadow-sky-500/10 flex items-center justify-center gap-1"
              >
                <span>Book Site Survey Verification</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// Custom simple viewport helper for maximize icon, preventing missing standard imports
function Maximize2Icon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="15 3 21 3 21 9"></polyline>
      <polyline points="9 21 3 21 3 15"></polyline>
      <line x1="21" y1="3" x2="14" y2="10"></line>
      <line x1="3" y1="21" x2="10" y2="14"></line>
    </svg>
  );
}
