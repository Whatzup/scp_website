import React, { useState } from 'react';
import { Clock, Bolt, Check, X, ShieldCheck, Zap, Thermometer, Award, Navigation, Calendar, Settings2, Heart, ArrowRight, BookOpen } from 'lucide-react';

export default function WhyChooseUs() {
  const [showTips, setShowTips] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const whyChooseItems = [
    {
      id: 'daikin',
      title: 'Authorized Daikin Dealer',
      desc: 'Official direct Platinum channel partner. Full factory warrantee backup & direct priority dispatch for VRV systems.',
      icon: Award,
      badge: 'Platinum Partner',
      bullets: [
        'Direct procurement with 100% genuine QR-scannable warranty validation codes.',
        'Platinum channel priority access to Daikin\'s advanced VRV systems, chillers, and cassettes.',
        'Expert sizing and piping layout calculation supported directly by Daikin factory engineers.',
        'Specialized installation training certified annually at Daikin\'s state-of-the-art academy.'
      ]
    },
    {
      id: 'voltas',
      title: 'Authorized Voltas Dealer',
      desc: 'TATA Enterprise alliance. Direct industrial product pricing, genuine spare parts loop, and factory engineer backup.',
      icon: ShieldCheck,
      badge: 'TATA Enterprise',
      bullets: [
        'Direct-from-factory TATA Enterprise industrial pricing contracts with zero distributor markups.',
        'Full factory backing with access to genuine Voltas spare parts and copper loop replacements.',
        'Priority resolution channel directly tied to Voltas North India regional technical service team.',
        'Certified execution of high-volume Voltas commercial air washers and ducted units.'
      ]
    },
    {
      id: 'survey',
      title: 'Site Survey & Load Sizing',
      desc: 'Formally-drafted heat load calculation reports with accurate CFM/Tonnage ratios, completely free pre-booking.',
      icon: Navigation,
      badge: 'Scientific Rigor',
      bullets: [
        'Multi-point infrared thermal load analysis to register room insulation & solar heat gain factors.',
        'Fully computerized heat load sheets calculating the standard heat ingress in BTU per hour.',
        'Direct CFM (Cubic Feet per Minute) balancing recommendations to avoid dead zones.',
        'Sizing calculations done under ASHRAE / ISHRAE guidelines to prevent equipment over-tonnage.'
      ]
    },
    {
      id: 'installation',
      title: 'End-to-End Installation',
      desc: 'In-house rigging crew, computerized duct metal layouts, and nitrogen pressure holds up to 450 PSI hold verified.',
      icon: Settings2,
      badge: 'Zero-contracting',
      bullets: [
        '100% in-house rigging and piping technicians — no third-party subcontractors used.',
        'Multi-day nitrogen dry pressure holds testing up to 450 PSI to guarantee leakproof refrigeration loops.',
        'Precision CNC pre-fabricated galvanized iron duct layouts for minimal static pressure drop.',
        'High-grade fire-retardant nitrile rubber insulation wrapping to prevent condensation.'
      ]
    },
    {
      id: 'amc',
      title: 'AMC & Maintenance',
      desc: 'Structured Quarterly maintenance SLA. 4-hour breakdown responses active across NCR corporate regions.',
      icon: Calendar,
      badge: '24/7 Support',
      bullets: [
        'Guaranteed 4-hour breakdown response with direct ticket dispatch in NCR.',
        'Quarterly preventive SLA visits including coil chemical treatment and system status analysis.',
        'Comprehensive refrigerant top-up tracking and electrical current load logging at each cycle.',
        'Energy audit report included annually to track continuous cooling performance stats.'
      ]
    },
    {
      id: 'engineers',
      title: 'Experienced HVAC Engineers',
      desc: 'Supervised exclusively by ISHRAE certified engineers with combined decades executing mega commercial layouts.',
      icon: Bolt,
      badge: 'Staff Expertise',
      bullets: [
        'Led by senior engineers holding prestigious ISHRAE and ASHRAE active credentials.',
        'Over 550 successful mega-scale blueprints executed across commercial plazas & industrial sites.',
        'Thorough safety and rigging certifications strictly maintained by our safety coordinators.',
        'Advanced knowledge in modern variable refrigerant volume (VRV) layout structures.'
      ]
    },
    {
      id: 'delivery',
      title: 'On-Time Project Delivery',
      desc: 'Gantt-tracked milestone coordination. Strict SLA penalties to guarantee absolute on-time cooling handover.',
      icon: Clock,
      badge: '100% On-Time',
      bullets: [
        'Gantt-chart project scheduling mapped during kickoff and checked in weekly sprints.',
        'Transparent SLA clause detailing standard credit penances if schedules are delayed.',
        'Direct site managers assigned to coordinate on-site with civil work contractors.',
        'Pre-fabricated material runs executed ahead of time to eliminate supply-chain waiting periods.'
      ]
    },
    {
      id: 'pan-india',
      title: 'PAN India Service',
      desc: 'Symmetrical dispatch offices in Delhi, Noida, Mumbai, and Bengaluru to coordinate regional infrastructure.',
      icon: Zap,
      badge: 'National Scale',
      bullets: [
        'Central engineering command offices in Delhi, Noida, Mumbai, and Bengaluru.',
        'Regional material storage hubs ensuring on-site parts availability.',
        'Cross-regional mobilization capabilities for enterprise clients with multiple projects.',
        'Centralized cloud support system ensuring uniform service quality nationwide.'
      ]
    }
  ];

  const smartTips = [
    {
      title: 'Set thermostat to 24°C',
      desc: 'Each degree below 24°C increases your electricity consumption metrics by approximately 6%. 24°C is the commercial sweet spot for optimal compressor power draw.',
      icon: Thermometer
    },
    {
      title: 'Use ceiling fans in tandem',
      desc: 'Ceiling fans create a wind-chill cooling effect that makes the interior temperature feel 2 degrees cooler without stressing the AC unit.',
      icon: Clock
    },
    {
      title: 'Maintain door and window thermal seals',
      desc: 'Tiny leaks in window rubber profiles allow warm air to bleed inside, forcing your AC to run extended cooling seasons. Seal them with affordable foam tapes.',
      icon: ShieldCheck
    },
    {
      title: 'Wash standard filters twice a month',
      desc: 'Clean filters maximize the air density intake of the blower fan, reducing the starting current stress of the indoor unit by 15%.',
      icon: Zap
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="bg-emerald-100 text-[#002045] font-black tracking-widest uppercase text-xs px-3 py-1 rounded-full border border-emerald-200 font-mono inline-block">
            UNRECONCILED CREDENTIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#002045] font-sans tracking-tight">
            Why KD AC | Super Cool Projects?
          </h2>
          <p className="text-slate-650 max-w-2xl mx-auto text-sm sm:text-base">
            Discover why Northern India’s top architects, luxury resort developers, and cloud computing operations trust our mechanical team.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] mx-auto rounded"></div>
        </div>

        {/* 8-Grid of Verified Credentials */}
        <p className="text-[10px] font-mono text-slate-400 mb-2 md:hidden flex items-center gap-1">
          <span>Swipe to see our credentials</span>
          <span className="animate-pulse">→</span>
        </p>
        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-thin snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:pb-0">
          {whyChooseItems.map((item) => {
            const IconComp = item.icon;
            return (
              <button 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-2xl border border-slate-205 p-6 flex flex-col justify-between hover:shadow-2xl hover:border-sky-305 transition-all duration-350 cursor-pointer group hover:-translate-y-1.5 relative overflow-hidden text-left min-w-[280px] w-[80vw] md:w-auto shrink-0 snap-center md:shrink"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100 to-transparent -mr-6 -mt-6 rounded-full group-hover:scale-125 transition-transform" />
                
                <div className="space-y-4 relative z-10 w-full">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#002045]/5 text-[#1960a3] flex items-center justify-center group-hover:bg-[#002045] group-hover:text-white transition-all duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-sans font-extrabold text-sm sm:text-base text-[#002045] group-hover:text-[#1960a3] transition-colors flex items-center gap-1.5">
                      <span className="text-emerald-500 shrink-0">✅</span>
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed min-h-[64px]">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-450 font-mono relative z-10 w-full">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Verified Partner</span>
                  </div>
                  <span className="text-[#1960a3] font-bold group-hover:underline flex items-center gap-0.5">
                    Details <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Call to action & Efficiency Guideline Anchor */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
              <Bolt className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#002045] font-sans">Looking for high energy-efficiency operation tips?</h4>
              <p className="text-xs text-slate-500 font-sans mt-0.5">Explore our guidelines, designed to help you reduce corporate electricity bills by up to 25%.</p>
            </div>
          </div>
          <button
            onClick={() => setShowTips(true)}
            className="w-full sm:w-auto bg-[#002045] hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer uppercase tracking-wider shadow-md text-center"
            id="open-smart-tips-btn"
          >
            Open Smart Tips Guide
          </button>
        </div>

      </div>

      {/* Energy Tips Popover Modal */}
      {showTips && (
        <div className="fixed inset-0 bg-[#002045]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-sky-100 max-w-lg w-full relative max-h-[90vh] flex flex-col overflow-y-auto">
            <button
              onClick={() => setShowTips(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-slate-100 w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer z-50"
              id="close-tips-modal-btn"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-6 bg-[#002045] text-white">
              <div className="flex items-center gap-2">
                <Bolt className="w-6 h-6 text-[#F6AD55] fill-[#F6AD55]" />
                <h4 className="text-base font-bold font-sans">Commercial Energy Efficiency Guide</h4>
              </div>
              <p className="text-xs text-sky-300 mt-1">Direct practices to reduce heavy tonnage electricity bills</p>
            </div>
            
            <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto">
              {smartTips.map((tip, idx) => {
                const IconComp = tip.icon;
                return (
                  <div key={idx} className="flex gap-4 p-3.5 border border-slate-100 bg-slate-50/50 rounded-xl hover:bg-slate-50">
                    <div className="text-[#1960a3] shrink-0 pt-0.5">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-extrabold text-xs text-[#002045] font-sans uppercase tracking-tight">{tip.title}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end px-6">
              <button
                onClick={() => setShowTips(false)}
                className="px-5 py-2 bg-[#002045] text-white rounded-xl font-bold text-xs hover:bg-[#1960a3] active:scale-95 transition-all text-center cursor-pointer"
              >
                Understood!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Credential Details Popover Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-[#00132c]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-sky-100 max-w-lg w-full relative max-h-[90vh] flex flex-col overflow-y-auto">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-slate-100 w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer z-50"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-100 space-y-2">
              <span className="text-[10px] font-mono font-black tracking-widest uppercase bg-emerald-50 text-emerald-700 border border-emerald-150 px-2.5 py-1 rounded">
                SECURED SYSTEM STANDARD: {selectedItem.badge}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#002045] text-white flex items-center justify-center shrink-0">
                  {React.createElement(selectedItem.icon, { className: "w-5 h-5" })}
                </div>
                <h4 className="text-lg font-black text-[#002045] font-sans">{selectedItem.title}</h4>
              </div>
            </div>

            {/* Modal Content - Bullet Points */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed font-sans italic">
                "{selectedItem.desc}"
              </p>
              
              <div className="space-y-3.5 pt-2">
                <h5 className="text-[10px] font-mono font-bold tracking-wider text-slate-450 uppercase">Technical Credentials & Audited Specs:</h5>
                <ul className="space-y-3">
                  {selectedItem.bullets.map((bullet: string, idx: number) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-700 leading-relaxed font-sans">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 bg-emerald-50 rounded-full p-0.5 border border-emerald-100" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end px-6">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-[#002045] text-white rounded-xl font-bold text-xs hover:bg-[#1960a3] active:scale-95 transition-all text-center cursor-pointer"
              >
                Close Specifics
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
