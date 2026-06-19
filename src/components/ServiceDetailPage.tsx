import React from 'react';
import { 
  Wrench, 
  Settings2, 
  ShieldCheck, 
  Compass, 
  Layers, 
  Thermometer, 
  Zap, 
  FileCheck2, 
  FlameKindling,
  Sparkles,
  ArrowRight,
  Calculator,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceDetailSpec {
  id: string;
  title: string;
  badge: string;
  brief: string;
  machinery: string;
  materials: string;
  standards: string;
  warranty: string;
  timeline: string;
  capacityRange: string;
  heatLoadFormula: string;
  copperPipeThickness: string;
  ductSteelGauge: string;
  ncrDeployments: string[];
  challengesSolved: string;
  highlightProject: string;
}

const SERVICE_SPECS: Record<string, ServiceDetailSpec> = {
  'vrv-installation': {
    id: 'vrv-installation',
    title: 'Daikin VRV V-Series & Multi-Zone Systems',
    badge: 'Variable Refrigerant Volume',
    brief: 'High-efficiency modular climate grids delivering independent temperature maintenance to over 64 indoor terminals simultaneously.',
    machinery: 'Daikin VRV X & H-Series Variable Speed scroll compressors with high-density inverter drive control loops.',
    materials: 'Deoxidized High-Phosphorus (D-HP) seamless copper tubes (99.9% pure) insulated with nitrile foam rubber.',
    standards: 'ISHRAE Standard 12:2020 & ASHRAE Standard 15 compliance. Nitrogen holding pressure hold confirmed at 450 PSI (31 Bar) for 48 hours.',
    warranty: '5-Year official registrable Daikin OEM compressor replacement backup + 1-Year comprehensive rigging warranty.',
    timeline: '30 to 45 Days (including architectural integration, piping, pressure test, and fine vacuum operations).',
    capacityRange: '8 HP to 120 HP per modular condenser setup.',
    heatLoadFormula: 'Q = MCFM × 1.08 × ΔT (Fahrenheit conversion index matched for multi-stage zoning)',
    copperPipeThickness: '0.8mm to 1.2mm nominal gauge verified via micro-calipers.',
    ductSteelGauge: 'Non-applicable (Direct refrigerant expander terminal grid)',
    ncrDeployments: [
      'DLF Horizon Hub A (45 VRF nodes, Gurugram)',
      'Okhla Tech Offices Phase II (80 TR, Delhi)',
      'Faridabad Platinum Villas Blocks (120 HP total grid)'
    ],
    challengesSolved: 'Independent temperature control in offices with heavily varying glass solar heat gains. Successfully cut electricity bills by 35% compared to constant-speed reciprocating systems.',
    highlightProject: 'Horizon Corporate Suites Block C (280 HP Daikin VRV, 35 Days Execution)'
  },
  'ducting-services': {
    id: 'ducting-services',
    title: 'Galvanized Duct Fabrication & Air Distribution',
    badge: 'Galvanized Sheet Metal Layouts',
    brief: 'Computerized-drafted sheet metal air-distribution layouts designed with minimum friction loss and zero condensation dripping risk.',
    machinery: 'Universal high-efficiency silent Centrifugal double-inlet blowers paired with noise attenuator chambers.',
    materials: 'Lock-forming Quality (LFQ) galvanized sheet steel (Zinc coating 120g/sqm) coated with 12mm thick Class O Nitrile Rubber Insulation.',
    standards: 'SMACNA (Sheet Metal and Air Conditioning Contractors National Association) thickness classes & ISHRAE Duct Standards.',
    warranty: '2-Year complete leakage support + lifetime structural integrity warranty on hangers and drop rods.',
    timeline: '25 to 40 Days (including site CAD mapping, rigging fabrication, mounting, insulation layout, and CFD airflow checks).',
    capacityRange: '1,500 CFM to 45,000 CFM static pressure designs.',
    heatLoadFormula: 'Hanger Spacing = L_spacing ≤ 2.4 meters (per SMACNA hanging and rigging code)',
    copperPipeThickness: 'Non-applicable (Air distribution layout)',
    ductSteelGauge: '24 Gauge (for ducts ≤ 750mm width) and 22 Gauge (for wider ducts) hot-dip galvanized.',
    ncrDeployments: [
      'Sonipat Logistics Mega Terminal (35,000 CFM delivery)',
      'Connaught Place Gourmet Hub (Galvanized Rectangular, Delhi)',
      'Noida Sector 63 Apparel House (Positive air supply ducting)'
    ],
    challengesSolved: 'Preventing sweat condensation dripping in high-humidity open cafes. Designed with double insulation barriers and vapor-tight foil joint sealing.',
    highlightProject: 'National Cold Chain Logistics Hub (45,000 CFM insulated duct network, 30 Days)'
  },
  'chiller-installation': {
    id: 'chiller-installation',
    title: 'Central Scroll & Screw Chilled Water Plants',
    badge: 'Heavy Centralized Chillers',
    brief: 'Massive thermal regulators engineered for multi-acre corporate hubs, mega healthcare centers, and industrial manufacturing plants.',
    machinery: 'Voltas Heavy-Duty water-cooled or air-cooled Screw Chiller assemblies with stepless capacity controls.',
    materials: 'Carbon steel delivery pipe racks, brass-fitted condenser tubes, heavy-gauge steel frame vibration dampers.',
    standards: 'AHRI certified performance metrics, ASME Section VIII compliance, and ASHRAE Guideline 22 validation.',
    warranty: '2-Year mechanical core assembly backup + guaranteed SLA quarterly chiller chemical washing loops.',
    timeline: '60 to 90 Days (including heavy chiller rigging, foundation casting, chilled water loop piping, pump alignment, and testing).',
    capacityRange: '100 TR to 1500 TR massive centralized grids.',
    heatLoadFormula: 'Chilled Water GPM = (Tons of Cooling × 24) / Chilled Water Temp Difference (ΔT)',
    copperPipeThickness: 'Solid seamless schedule-40 pipe conduits with anti-corrosion paints.',
    ductSteelGauge: 'Non-applicable (Chilled water loop distribution through Fan Coil units)',
    ncrDeployments: [
      'Metro Super-Speciality Wing (450 TR Voltas, Faridabad)',
      'Pacific Tech Center Hub (600 TR double redundant grid, Noida)',
      'Gurugram Grand Resort Complex (2x 300 TR Air-Cooled screw)'
    ],
    challengesSolved: 'Heavy mud stagnation inside heat exchanger tubes. Solved by integrating self-cleaning debris grid filters and a constant chemical dosing system.',
    highlightProject: 'Pacific Tech Center (600 TR Double Redundant Chiller Network, 75 Days)'
  },
  'amc-services': {
    id: 'amc-services',
    title: 'SLA-Driven AMC & Quality Preventive Maintenance',
    badge: 'Preventive SLA Services',
    brief: 'Rigorous quarterly compliance checkups, chemical coil washes, and 4-hour active breakdown dispatches for high-uptime NCR server rooms.',
    machinery: 'Systematic technical tools including micron-calibrated vacuum pumps, CFM anemometers, electronic leak sensors, and current data logs.',
    materials: 'Eco-safe chemical coil cleaning solvents, genuine Daikin/Voltas manufacturer spares, authentic DuPont R-410A refrigerants.',
    standards: 'ISHRAE standard maintenance practices, ASHRAE safety ventilation limits, and Bureau of Energy Efficiency (BEE) tracking.',
    warranty: '100% genuine parts guarantee. Continuous 12-month coverage program covering gas charges and motor burns.',
    timeline: 'Quarterly continuous schedules + 4-Hour emergency breakdown reaction time across Noida, Delhi, Gurugram.',
    capacityRange: 'Supports commercial capacities from 10 TR to 2000 TR continuous loops.',
    heatLoadFormula: 'EE Ratio = (Cooling BTU output) / (Wattage Electrical input) - audited quarterly',
    copperPipeThickness: 'Systematic leak brazing with 1.2mm thick copper sleeve sleeves.',
    ductSteelGauge: 'Leak assessments conducted on existing GI layouts under positive air pressure.',
    ncrDeployments: [
      'Noida Tech Zone Server Node 4 (Constant 100% cooling AMC)',
      'Faridabad Central Prep Laboratory blocks (Sterile air AMC)',
      'DLF CyberCity HQ executive bays (Quarterly PM loop)'
    ],
    challengesSolved: 'Unplanned heating breakdowns causing heavy trading workstation outages. Solved via preventive heat-map scans and quarterly contactor updates.',
    highlightProject: 'HyperScale Server Node 4B (100% uptime guaranteed, 4-hour breakdown SLA)'
  },
  'commercial-hvac': {
    id: 'commercial-hvac',
    title: 'Custom Commercial Integrated HVAC Layouts',
    badge: 'Commercial Complexes',
    brief: 'Aesthetic, low-profile and high-performance cooling layouts custom engineered for high-street shops, luxury cafes, and schools.',
    machinery: 'High-static inverter-driven underceiling or cassette modules with dynamic fresh-air bypass gates.',
    materials: 'Vibration isolators, double-skinned acoustic damper louvers, flexible non-combustible sound attenuation connectors.',
    standards: 'National Building Code (NBC) Fire Safety guidelines, ISHRAE thermal comfort criteria for commercial zoning.',
    warranty: '3-Year comprehensive compressor backup + immediate priority AMC dispatch access.',
    timeline: '35 to 50 Days (staged deployment matching structural builder milestone deadlines).',
    capacityRange: '25 TR to 250 TR multi-split networks.',
    heatLoadFormula: 'Zonal Cooling Load = Sola Gain + Occupancy Load + Lighting BTUs + Gaseous air charge',
    copperPipeThickness: '0.9mm deoxidized copper with chemical barrier tapes.',
    ductSteelGauge: '24 Gauge galvanized iron conduits for secondary ceiling runs.',
    ncrDeployments: [
      'Nouveau CP Fashion Retail (Aesthetic cassette arrays, Delhi)',
      'Delhi Public Campus block labs (Double-split duct systems)',
      'Gurugram High-Street Commercial Hub (150 TR multi-zone VRV)'
    ],
    challengesSolved: 'Drafty high-velocity air flows causing customer discomfort. Solved via 4-way round-flow diffusers and micro-velocity registers.',
    highlightProject: 'NouveauCP High-Street Outlet (45 TR Cassette system, completed in 14 days)'
  },
  'industrial-hvac': {
    id: 'industrial-hvac',
    title: 'Severe-Duty Industrial Cooling & Climate Controls',
    badge: 'Industrial & Heavy Tonnage',
    brief: 'Double-skinned Air Washers and heavy packaged evaporators built to tolerate high particulate loads inside warehouses.',
    machinery: 'Heavy Voltas Double-Skinned Air Handling Units paired with coarse pre-filters and high-pressure blowers.',
    materials: 'High-alloy carbon steel frames, rust-resistant aluminum fins, heavy anti-static synthetic fiber filter media.',
    standards: 'ASHRAE Sandard 62.1 Ventilation index verification, EN 1822 particulate air standards Class G4.',
    warranty: '5-Year robust industrial shell support + direct line factory technical engineer supervision.',
    timeline: '45 to 70 Days (rigging crane maneuvers, structural calculations matching logistics layouts).',
    capacityRange: '150 TR to 1500 TR industrial climate systems.',
    heatLoadFormula: 'Sensible Heat Ratio (SHR) = Sensible Heat / Total Heat (optimized for high relative humidity zones)',
    copperPipeThickness: '1.2mm heavy wall thickness conduit holding refrigerant pools.',
    ductSteelGauge: '20 Gauge ultra-rigid reinforced steel sheets.',
    ncrDeployments: [
      'TATA Logistics Depot (Bilaspur, 400 TR Packaged grid)',
      'Faridabad Rubber Vulcanizing factory (High-exhaust ventilation)',
      'Sonipat Industrial Cargo center (Heavy packaged evaporators)'
    ],
    challengesSolved: 'Severe dust stagnation clogging fine air filters within 48 hours. Solved via automated wash-out coarse pre-filter grids and exhaust extractors.',
    highlightProject: 'Bilaspur Logistics Depot (300 TR Packaged ducting, finished on 40-day scale)'
  }
};

interface ServiceDetailPageProps {
  initialServiceId?: string;
  autoOpen?: boolean;
  onResetAutoOpen?: () => void;
  onOpenBookingWithCategory: (category: string) => void;
}

export default function ServiceDetailPage({ 
  initialServiceId, 
  autoOpen, 
  onResetAutoOpen, 
  onOpenBookingWithCategory 
}: ServiceDetailPageProps) {
  const [activeServiceId, setActiveServiceId] = React.useState<string>('vrv-installation');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const currentSpec = SERVICE_SPECS[activeServiceId] || SERVICE_SPECS['vrv-installation'];

  // Handle outside deep dive transitions with autoOpen guard
  React.useEffect(() => {
    if (initialServiceId) {
      setActiveServiceId(initialServiceId);
      if (autoOpen) {
        setIsOpen(true);
        if (onResetAutoOpen) {
          onResetAutoOpen();
        }
      }
    }
  }, [initialServiceId, autoOpen, onResetAutoOpen]);

  const serviceTabs = [
    { id: 'vrv-installation', name: 'VRV/VRF Systems', icon: Settings2 },
    { id: 'ducting-services', name: 'Galvanized Ducting', icon: Compass },
    { id: 'chiller-installation', name: 'Heavy Chillers', icon: Layers },
    { id: 'amc-services', name: 'SLA AMC Support', icon: ShieldCheck },
    { id: 'commercial-hvac', name: 'Commercial Systems', icon: Thermometer },
    { id: 'industrial-hvac', name: 'Industrial HVAC', icon: Wrench },
  ];

  return (
    <div className="bg-[#f8fafc] py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page title and description */}
        <div className="text-center mb-12 space-y-4">
          <span className="bg-blue-100 text-[#002045] font-black tracking-widest uppercase text-xs px-3 py-1 rounded-full border border-blue-200 font-mono inline-block">
            Engineering Specifications Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002045] font-sans tracking-tight">
            Detailed Service Specifications
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm">
            Select a specialized core service below to audit computerized CAD schematics, installation compliance, nitrogen pressure thresholds, and regional NCR projects data.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] mx-auto rounded"></div>
        </div>

        {/* Vertical Layout Service Catalog List */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {serviceTabs.map((tab) => {
            const TabIcon = tab.icon;
            const tabSpec = SERVICE_SPECS[tab.id];
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveServiceId(tab.id);
                  setIsOpen(true);
                }}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white text-left transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group cursor-pointer hover:border-[#1960a3]/50 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Visual decoration backdrop glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#1960a3]/5 to-transparent opacity-[0.02] group-hover:opacity-[0.06] blur-2xl pointer-events-none" />
                
                <div className="flex items-start gap-4 flex-1 w-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#1960a3]/10 text-[#1960a3] group-hover:bg-[#1960a3] group-hover:text-white transition-all duration-300 shrink-0">
                    <TabIcon className="w-5 h-5" />
                  </div>
                  
                  <div className="space-y-1 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-sans font-black text-sm sm:text-base text-[#002045] tracking-tight group-hover:text-[#1960a3] transition-colors">
                        {tab.name}
                      </h3>
                      <span className="text-[9px] font-mono font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                        {tabSpec.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none">
                      {tabSpec.brief}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 text-xs font-black text-[#1960a3] md:border-l md:border-dashed md:border-slate-200 md:pl-6 pt-3 md:pt-0 w-full md:w-auto mt-2 md:mt-0">
                  <span className="group-hover:underline">Analyze Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>

        {/* High-fidelity Spec Sheet Modal Popup Overlay */}
        <AnimatePresence>
          {isOpen && currentSpec && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Glassmorphic Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-[#001026]/85 backdrop-blur-md cursor-zoom-out"
              />

              {/* Floating Specification Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-[#00132c] text-white w-full max-w-3xl rounded-3xl border border-[#002b54] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] z-10"
              >
                
                {/* Ambient backdrop decorations */}
                <div className="absolute top-0 right-0 w-84 h-84 bg-gradient-to-br from-[#1960a3]/20 to-transparent opacity-10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-84 h-84 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-10 blur-3xl pointer-events-none" />

                {/* Modal Header */}
                <div className="relative px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-[#001c3d] flex items-center justify-between z-10">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest bg-emerald-950 text-emerald-400 border border-emerald-900/40 px-3 py-1 rounded-full uppercase">
                        {currentSpec.badge}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white font-sans tracking-tight pt-1">
                      {currentSpec.title} Specs
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-10 h-10 rounded-full border border-[#002b54] bg-[#000a18] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:bg-slate-800"
                      aria-label="Close specs dossier"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Scrollable Contents */}
                <div className="relative px-6 sm:px-8 py-6 space-y-6 overflow-y-auto custom-scrollbar flex-1 z-10">
                  
                  {/* Brief Description */}
                  <p className="text-xs sm:text-sm font-sans font-medium text-slate-300 leading-relaxed bg-[#000a18]/60 border border-[#001c3d] p-4 rounded-xl border-l-4 border-l-[#1960a3]">
                    "{currentSpec.brief}"
                  </p>

                  {/* Specification Parameters Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="p-4 bg-[#000a18]/40 border border-[#001c3d] rounded-xl space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                        ⚙️ ACTIVES MACHINERY & UNITS
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans font-semibold">
                        {currentSpec.machinery}
                      </p>
                    </div>

                    <div className="p-4 bg-[#000a18]/40 border border-[#001c3d] rounded-xl space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                        🧊 ENGINEERING MATERIALS GAUGE
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans font-semibold">
                        {currentSpec.materials}
                      </p>
                    </div>

                    <div className="p-4 bg-[#000a18]/40 border border-[#001c3d] rounded-xl space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                        📏 SIZING COMPLIANCE & VOLTAGE/PRESSURE CODES
                      </span>
                      <p className="text-xs text-sky-400 font-mono leading-relaxed font-bold">
                        {currentSpec.standards}
                      </p>
                    </div>

                    <div className="p-4 bg-[#000a18]/40 border border-[#001c3d] rounded-xl space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                        ⏱️ COMMISSIONING EXPECTED TIMELINE
                      </span>
                      <p className="text-xs text-slate-200 font-sans leading-relaxed font-extrabold">
                        🚀 {currentSpec.timeline}
                      </p>
                    </div>

                    <div className="p-4 bg-[#000a18]/40 border border-[#001c3d] rounded-xl space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                        🧮 THERMAL LOAD SIZING FORMULA
                      </span>
                      <code className="text-[10px] text-pink-400 font-bold block font-mono bg-pink-950/20 p-2 rounded border border-pink-900/30">
                        {currentSpec.heatLoadFormula}
                      </code>
                    </div>

                    <div className="p-4 bg-[#000a18]/40 border border-[#001c3d] rounded-xl space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                        📋 COMPRESSOR & OEM SERVICE WARRANTY
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans font-semibold">
                        {currentSpec.warranty}
                      </p>
                    </div>

                    {currentSpec.copperPipeThickness !== 'Non-applicable' && (
                      <div className="p-4 bg-[#000a18]/40 border border-[#001c3d] rounded-xl space-y-1.5">
                        <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                          🔋 SEAMLESS COPPER WIRE THICKNESS GAUGE
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans font-semibold">
                          {currentSpec.copperPipeThickness}
                        </p>
                      </div>
                    )}

                    {currentSpec.ductSteelGauge !== 'Non-applicable' && (
                      <div className="p-4 bg-[#000a18]/40 border border-[#001c3d] rounded-xl space-y-1.5">
                        <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                          💨 GALVANIZED STEEL SHEET GAUGE RATING
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans font-semibold">
                          {currentSpec.ductSteelGauge}
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Guaranteed NCR Regional Active Deployments */}
                  <div className="bg-[#000a18]/60 p-5 rounded-2xl border border-[#001c3d] space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1960a3] animate-ping" />
                      <h4 className="text-[10px] font-bold text-slate-350 uppercase tracking-wider font-mono">
                        Active NCR Regional Core Deployments
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentSpec.ncrDeployments.map((dep, dIdx) => (
                        <div key={dIdx} className="bg-[#00132c] border border-[#002b54] p-3 rounded-xl text-xs font-sans font-medium text-slate-200">
                          📍 {dep}
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#001c3d]">
                      <span className="text-[9px] text-[#F6AD55] font-mono font-bold block uppercase tracking-wider">
                        ⚠️ Heavy Challenges Overcome
                      </span>
                      <p className="text-xs text-slate-350 leading-relaxed font-sans mt-0.5">
                        {currentSpec.challengesSolved}
                      </p>
                    </div>

                    {/* Highlight Box Case Study */}
                    <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🏆</span>
                        <div>
                          <h5 className="text-[10px] font-black text-emerald-400 font-sans uppercase tracking-tight">Highlight Project Build</h5>
                          <p className="text-xs text-slate-250 font-semibold font-sans mt-0.5">{currentSpec.highlightProject}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onOpenBookingWithCategory(currentSpec.title);
                          setIsOpen(false);
                        }}
                        className="w-full sm:w-auto px-4 py-2 bg-[#1960a3] hover:bg-sky-500 text-white font-extrabold text-[10px] rounded-lg uppercase tracking-wider transition-all shadow-sm shrink-0 cursor-pointer text-center"
                      >
                        Inspect Site
                      </button>
                    </div>

                  </div>

                </div>

                {/* Modal Footer */}
                <div className="relative px-6 sm:px-8 py-5 border-t border-[#001c3d] bg-[#000d1f] flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-405" />
                    <span>Authorized Carrier Direct supply is verified valid.</span>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        onOpenBookingWithCategory(currentSpec.title);
                        setIsOpen(false);
                      }}
                      className="bg-[#1960a3] hover:bg-sky-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all w-full sm:w-auto text-center cursor-pointer shadow-lg hover:shadow-sky-500/10 flex items-center justify-center gap-1.5 uppercase tracking-wider"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Request Thermal Audit</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
