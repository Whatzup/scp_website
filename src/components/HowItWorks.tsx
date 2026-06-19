import React, { useState } from 'react';
import { 
  ClipboardList, 
  MapPin, 
  Compass, 
  Calculator, 
  CheckCircle2, 
  Truck, 
  Wrench, 
  Gauge, 
  FileCheck, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const STEPS = [
  {
    id: '01',
    title: 'Requirement Gathering',
    brief: 'We analyze your facility temperature profiles, occupancy loads, and architectural layouts.',
    detail: 'Deep technical audits with development managers to define concrete cooling loads, zoning requirements, sound level goals, and strict energy budgets.',
    icon: ClipboardList
  },
  {
    id: '02',
    title: 'Site Survey',
    brief: 'Physical analysis of structural ceiling heights, duct pathways, and ambient exhaust areas.',
    detail: 'Our senior mechanical teams evaluate concrete slab load capacities, external weather zones, electrical supplies, and potential structural clashes.',
    icon: MapPin
  },
  {
    id: '03',
    title: 'HVAC Design',
    brief: 'Custom CAD layouts drafting accurate CFM/Tonnage ratios and airflow pathways.',
    detail: 'We design complete duct paths, airflow balances, fresh-air integration metrics, and optimize pipe routing to keep ceiling heights maximized.',
    icon: Compass
  },
  {
    id: '04',
    title: 'Quotation',
    brief: 'Fully transparent itemized Bill of Quantities showing direct factory-dealer pricing.',
    detail: 'Includes comprehensive details on raw machinery costs, copper piping gauges, insulation indices, ducting steel gauges, and direct technical labor fees.',
    icon: Calculator
  },
  {
    id: '05',
    title: 'Approval',
    brief: 'Legal contracting of timelines, warranty terms, and corporate SLA baselines.',
    detail: 'Coordination of legal frameworks, milestone payment logs, structural safety regulations, and authentic brand warranty certificates.',
    icon: FileCheck
  },
  {
    id: '06',
    title: 'Procurement',
    brief: 'Direct OEM dispatch of Daikin and Voltas heavy machinery to ensure pristine status.',
    detail: 'Direct logistics monitoring. Sourcing brand new equipment with factory seals, thick copper pipes, acoustic insulation, and performance grills.',
    icon: Truck
  },
  {
    id: '07',
    title: 'Installation',
    brief: 'Superb rigging and layout fabrication managed strictly by certified HVAC engineers.',
    detail: 'Precision layout assembly, premium vibration isolators, double-welded hangers, seamless pressure joints, and flawless aesthetic finishing.',
    icon: Wrench
  },
  {
    id: '08',
    title: 'Testing & Commissioning',
    brief: '48-hour high-pressure nitrogen holds, micron vacuums, and CFM anemometer checks.',
    detail: 'Pressure tests held up to 450 PSI, vacuum drawn safely under 500 microns, current draw balancing metrics, and room temperature mappings.',
    icon: Gauge
  },
  {
    id: '09',
    title: 'Handover',
    brief: 'System commissioning, operation training, and detailed as-built documents delivery.',
    detail: 'Supply of full operations catalogs, as-built layout CAD blueprints, single-line wiring diagrams, and training for in-house maintenance teams.',
    icon: CheckCircle2
  },
  {
    id: '10',
    title: 'AMC Support',
    brief: 'Quarterly compliance maintenance loops and premier rapid breakdown response.',
    detail: 'Scheduled inspections, filter cleaning, chemical coil washing, continuous refrigerant monitoring to guarantee 100% cooling uptime year-round.',
    icon: ShieldAlert
  }
];

export default function HowItWorks() {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const currentStep = STEPS[activeStepIdx];

  return (
    <section className="py-20 bg-white border-b border-slate-200" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title and Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="bg-sky-100 text-[#002045] font-black tracking-widest uppercase text-xs px-3 py-1 rounded-full border border-sky-200 font-mono inline-block">
            Milestones of Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#002045] font-sans tracking-tight">
            Our Systematic Construction Process
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Professional clients demand accountability. Here is how we execute projects from initial briefing to continuous life-time AMC.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] mx-auto rounded"></div>
        </div>

        {/* 10-Step Split Interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Compact 10 timeline buttons scroll (span 5) */}
          <div className="lg:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
            {STEPS.map((step, idx) => {
              const IconComp = step.icon;
              const isSelected = activeStepIdx === idx;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`w-full flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all duration-300 relative group cursor-pointer ${
                    isSelected 
                      ? 'border-[#1960a3] bg-[#00132c] text-white shadow-lg' 
                      : 'border-slate-100 bg-[#f8fafc] text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  id={`btn-step-${step.id}`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                    isSelected ? 'bg-[#1960a3] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step.id}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs sm:text-sm font-extrabold font-sans truncate ${
                      isSelected ? 'text-white' : 'text-[#002045]'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-[11px] truncate leading-normal ${
                      isSelected ? 'text-sky-300' : 'text-slate-500'
                    }`}>
                      {step.brief}
                    </p>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-sky-400 translate-x-1' : 'text-slate-300 opacity-0 group-hover:opacity-100'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right panel: Active Step Dynamic Presentation Card (span 7) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-8 min-h-[480px] flex flex-col justify-between relative overflow-hidden">
            {/* Visual background aesthetics */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-transparent -mr-12 -mt-12 rounded-full pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              
              {/* Card Header metadata */}
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-[#1960a3] text-4xl sm:text-5xl select-none leading-none opacity-80">
                  STAGE {currentStep.id}
                </span>
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-[#1960a3] shadow-sm">
                  {React.createElement(currentStep.icon, { className: 'w-6 h-6' })}
                </div>
              </div>

              {/* Title and Narrative */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-black text-[#002045] font-sans tracking-tight">
                  {currentStep.title}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium bg-slate-100 p-4 rounded-xl border-l-4 border-[#1960a3]">
                  "{currentStep.brief}"
                </p>
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    Deep-Dive Action Plan :
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {currentStep.detail}
                  </p>
                </div>
              </div>

              {/* Symmetrical Professionalism Checklist */}
              <div className="space-y-2 pt-4 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                  SLA Deliverables & Checks :
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>Direct engineering tracking log</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>Pre-work safety clearance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>Computerized site compliance report</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>100% genuine spares guarantee</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Dynamic Next Step Prompt Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 animate-spin" />
                <span className="text-xs text-slate-500 font-sans">
                  Guaranteed compliance with ISHRAE & ASHRAE standards.
                </span>
              </div>
              
              {activeStepIdx < STEPS.length - 1 ? (
                <button
                  onClick={() => setActiveStepIdx(prev => prev + 1)}
                  className="w-full sm:w-auto bg-[#002045] hover:bg-[#1960a3] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-sm"
                  id="btn-next-step"
                >
                  <span>Stage {STEPS[activeStepIdx + 1].id} Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveStepIdx(0)}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-sm"
                  id="btn-restart-steps"
                >
                  <span>Restart Process Flow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
