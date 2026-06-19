import React from 'react';
import { Building2, School, ShoppingBag, Landmark, Briefcase, Zap } from 'lucide-react';

export default function ClientLogos() {
  const categories = [
    {
      group: 'Trusted Developers & Builders',
      desc: 'Executing massive mechanical HVAC piping and external chiller foundations with direct safety compliance.',
      logos: [
        { name: 'Skyline Infra Group', icon: Building2, sub: 'Gurugram' },
        { name: 'Rajhans Developers', icon: Landmark, sub: 'Noida Blocks' },
        { name: 'Apex Estate Partners', icon: Building2, sub: 'NCR Regions' }
      ]
    },
    {
      group: 'Retail Stores & High-Street Shops',
      desc: 'Installing variable-throw aesthetic cassette systems with minimum noise levels and draftless air distribution.',
      logos: [
        { name: 'Nouveau Couture', icon: ShoppingBag, sub: 'Connaught Place' },
        { name: 'The Gourmet Plaza', icon: ShoppingBag, sub: 'Sohna Road' },
        { name: 'Maximus Hubs', icon: Landmark, sub: 'Mall of India' }
      ]
    },
    {
      group: 'Corporate Head Offices',
      desc: 'Seamless multi-zone Daikin VRV climate networks offering customized temperature panels to each office bay.',
      logos: [
        { name: 'Zenith Tech Labs', icon: Briefcase, sub: 'DLF CyberCity' },
        { name: 'Indo Ventures Pvt Ltd', icon: Briefcase, sub: 'Okhla Phase III' },
        { name: 'Vanguard Systems', icon: Zap, sub: 'Noida Sector 62' }
      ]
    },
    {
      group: 'Academic Institutes & Schools',
      desc: 'Energy Recovery Ventilator (ERV) fresh air circulation units guaranteeing healthy CO2 levels inside class laboratories.',
      logos: [
        { name: 'St. Xavier Tech Wing', icon: School, sub: 'Faridabad Campus' },
        { name: 'Faridabad Central Prep', icon: School, sub: 'Main Block' },
        { name: 'Greenfield Academic Center', icon: School, sub: 'Delhi Labs' }
      ]
    }
  ];

  return (
    <section className="py-20 bg-[#f8fafc] border-b border-slate-200" id="client-logos">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="bg-amber-100 text-[#002045] font-black tracking-widest uppercase text-xs px-3 py-1 rounded-full border border-amber-200 font-mono inline-block">
            Validation of Service
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#002045] font-sans tracking-tight">
            Trusted By Local Clients
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            From prominent housing developers to local boutique retail stores, we provide symmetrical engineering excellence for both tiny and heavy environments.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] mx-auto rounded"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 hover:shadow-lg transition-transform hover:-translate-y-0.5 duration-300"
            >
              <div className="space-y-1.5 border-b border-slate-100 pb-4">
                <h3 className="font-sans font-black text-base text-[#002045] tracking-tight flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#1960a3] rounded-full shrink-0" />
                  <span>{cat.group}</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {cat.desc}
                </p>
              </div>

              {/* Individual Client Cards inside */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cat.logos.map((logo, lIdx) => {
                  const Icon = logo.icon;
                  return (
                    <div 
                      key={lIdx} 
                      className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl hover:border-sky-300 hover:bg-white transition-all duration-300 text-left cursor-default group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-[#1960a3] flex items-center justify-center shrink-0 group-hover:bg-[#002045] group-hover:text-white transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-slate-800 font-sans truncate tracking-tight">
                          {logo.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-mono font-semibold truncate uppercase">
                          {logo.sub}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Direct Quote Footer badge */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-sans font-medium">
            *All local site permissions held safely. Fully authorized Daikin & Voltas certifications validation active.
          </p>
        </div>

      </div>
    </section>
  );
}
