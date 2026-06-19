import React, { useState } from 'react';
import { Layers, MoveHorizontal, CheckCircle2, Award } from 'lucide-react';
import { SAVED_PROJECTS } from '../data';

export default function BeforeAfterGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [activeProject, setActiveProject] = useState(SAVED_PROJECTS[0]);

  // Handle manual position of before/after divider
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const categories = [
    { id: 'all', title: 'Show All' },
    { id: 'Corporate Offices', title: 'Office VRV' },
    { id: 'Hospitals', title: 'Hospital Cleanroom' },
    { id: 'Hotels', title: 'Invisible Hotel VRF' },
    { id: 'Warehouses', title: 'Large Volume Ducting' }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? SAVED_PROJECTS 
    : SAVED_PROJECTS.filter(p => p.industry === activeCategory);

  const handleSelectProject = (proj: any) => {
    setActiveProject(proj);
    setSliderPosition(50); // Reset slider to center
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-gray-100" id="before-after">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#1960a3] font-bold tracking-widest text-[#1960a3] uppercase text-xs sm:text-sm font-mono block">
            VISUAL METRIC PROOF
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002045] font-sans tracking-tight">
            Before & After execution Gallery
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm">
            Drag the sliding divider center-bar back and forth to inspect local heavy-duty installations transition from raw concrete hulls to fully configured state-of-the-art climate plants.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] mx-auto rounded"></div>
        </div>

        {/* Category Vents */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const projects = cat.id === 'all' ? SAVED_PROJECTS : SAVED_PROJECTS.filter(p => p.industry === cat.id);
                if (projects.length > 0) {
                  setActiveProject(projects[0]);
                }
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-[#002045] text-white border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-[#1a365d] hover:bg-slate-100'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Dynamic Sandbox Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: List of active category projects to click */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">
              Select HVAC Project Profile ({filteredProjects.length})
            </h4>
            
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {filteredProjects.map((proj) => {
                const isSelected = activeProject.id === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectProject(proj)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex gap-3 cursor-pointer items-start ${
                      isSelected 
                        ? 'border-[#1960a3] bg-blue-50/50 soft-depth' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isSelected ? 'bg-[#002045] text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {proj.brandUsed === 'Daikin' ? 'DK' : 'VT'}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-extrabold text-[#002045] block leading-tight">{proj.clientName}</span>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">{proj.year}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 block">{proj.location}</span>
                      <span className="inline-block text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded mt-1">
                        {proj.hvacCapacity}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Downloader Widget from Missing competitor features checklist */}
            <div className="mt-4 p-5 bg-gradient-to-br from-[#002045] to-[#1960a3] text-white rounded-2xl space-y-3 soft-depth">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-300" />
                <span className="text-xs font-bold font-mono tracking-widest text-amber-300">COMPETITOR BENCHMARK</span>
              </div>
              <h5 className="font-bold text-sm leading-snug">Download ISO 9001 HVAC Corporate Profile</h5>
              <p className="text-[11px] text-sky-100 leading-snug">
                Request our complete credentials dossier including ISHRAE registration credentials, heavy project lists, and letters of recommendation.
              </p>
              <button 
                onClick={() => {
                  alert("Opening Download Sequence: 'Super_Cool_Projects_Corporate_Profile_2026.pdf' downloaded successfully of size 4.8MB (Authorized Daikin/Voltas Vendor Document).");
                }}
                className="w-full py-2.5 bg-amber-400 text-[#002045] font-extrabold text-xs rounded-lg hover:bg-amber-300 transition-all cursor-pointer shrink-0"
              >
                Download Company Profile PDF
              </button>
            </div>
          </div>

          {/* Right panel: Live Slider Frame with Project Details */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* Interactive Image Slider */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-300 shadow-lg bg-slate-900 select-none">
              
              {/* After Product (Right Side - Full Base) */}
              <div className="absolute inset-0">
                <img 
                  src={activeProject.afterImg} 
                  alt={`${activeProject.clientName} Finished installation`}
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute right-4 bottom-4 bg-[#002045]/80 backdrop-blur-sm border border-sky-400/30 text-sky-300 px-3 py-1 rounded text-xs font-bold tracking-widest">
                  AFTER: FINISHED HVAC PLAN
                </div>
              </div>

              {/* Before Product (Left Side - Cropped Overlap) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden" 
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src={activeProject.beforeImg} 
                  alt={`${activeProject.clientName} Before installation`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="absolute left-4 bottom-4 bg-red-950/80 backdrop-blur-sm border border-red-500/30 text-red-300 px-3 py-1 rounded text-xs font-bold tracking-widest">
                  BEFORE: RAW CONSTRUCTION
                </div>
              </div>

              {/* Slider Partition Line */}
              <div 
                className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-10 flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute w-10 h-10 rounded-full bg-[#002045] text-white border-2 border-white shadow-xl flex items-center justify-center">
                  <MoveHorizontal className="w-5 h-5 text-sky-300 animate-pulse-slow" />
                </div>
              </div>

              {/* Input range over slider for drag behavior */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPosition} 
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                aria-label="Before after slide bar controller"
              />
            </div>

            {/* Project Technical Specifications Profile Block */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap gap-2 items-center justify-between border-b pb-3 border-slate-100">
                <div>
                  <h4 className="text-xl font-black text-[#002045]">{activeProject.clientName}</h4>
                  <span className="text-xs text-slate-500 font-medium">Industry Segment: <strong className="text-slate-700">{activeProject.industry}</strong></span>
                </div>
                <div className="bg-blue-50 text-[#1960a3] border border-blue-100 px-3 py-1 rounded-full text-xs font-bold leading-none shrink-0 font-mono">
                  Certified {activeProject.brandUsed} Partner Build
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-1">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">HVAC CAPACITY</span>
                  <span className="text-sm font-bold text-slate-800">{activeProject.hvacCapacity}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">AREA COVERED</span>
                  <span className="text-sm font-bold text-slate-800">{activeProject.areaCovered}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">PROJECT LIFETIME</span>
                  <span className="text-sm font-bold text-slate-800">{activeProject.duration}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">GEOGRAPHY PLOT</span>
                  <span className="text-sm font-bold text-slate-800">{activeProject.location.split(',')[0]}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-slate-600">
                <p>
                  <strong className="text-[#002045] block text-sm font-bold mb-1">🏗️ Engineering Integration Challenge:</strong>
                  {activeProject.challenges}
                </p>
                <p className="border-t border-slate-100 pt-2">
                  <strong className="text-teal-700 block text-sm font-bold mb-1">💡 Solution & Commissioning Implemented:</strong>
                  {activeProject.solution}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
