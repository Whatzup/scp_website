import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingDown, ArrowRight, ShieldCheck, Zap, Receipt, Landmark } from 'lucide-react';

interface CapacityCalculatorProps {
  onTriggerSurvey: () => void;
}

export default function CapacityCalculator({ onTriggerSurvey }: CapacityCalculatorProps) {
  // Capacity inputs
  const [area, setArea] = useState<number>(3500);
  const [buildingType, setBuildingType] = useState<string>('Corporate Office');
  const [occupancy, setOccupancy] = useState<number>(15);

  // Energy ROI inputs
  const [operatingHours, setOperatingHours] = useState<number>(12); // hours per day
  const [powerCost, setPowerCost] = useState<number>(9); // ₹ per kWh

  // Calculations for TR (Tons of Refrigeration)
  let baseAreaFactor = 450; // default sq ft per TR
  if (buildingType === 'Data Center') baseAreaFactor = 155;
  if (buildingType === 'Restaurant / Kitchen') baseAreaFactor = 230;
  if (buildingType === 'Hospital / Clinic') baseAreaFactor = 320;
  if (buildingType === 'Corporate Office') baseAreaFactor = 370;
  if (buildingType === 'Hotel / Resort') baseAreaFactor = 400;
  if (buildingType === 'Warehouse / Factory') baseAreaFactor = 650;
  if (buildingType === 'Luxury Residence') baseAreaFactor = 480;

  const areaTR = area / baseAreaFactor;
  const occupancyTR = occupancy * 0.033; // 400 BTU/hr per person, 12,000 BTU = 1 TR
  const rawTR = areaTR + occupancyTR;
  const recommendedTR = Math.round(rawTR * 2) / 2; // Round to nearest 0.5 TR

  // Calculations for Energy Savings (Comparison of 3-Star fixed speed vs Intelligent VRV/VRF)
  // TR * 3.517 kW of cooling power
  // Non-VRV system averages 1.3 kW of electricity input per TR at peak load
  // VRV system averages 0.78 kW of electricity input per TR because of inverter load balancing over time
  const nonVrvLoadKw = recommendedTR * 1.25;
  const vrvLoadKw = recommendedTR * 0.76;

  // Annual usage in kWh
  const nonVrvAnnualKwh = nonVrvLoadKw * operatingHours * 300; // Assuming 300 business cooling days
  const vrvAnnualKwh = vrvLoadKw * operatingHours * 300;

  const annualNonVrvCost = nonVrvAnnualKwh * powerCost;
  const annualVrvCost = vrvAnnualKwh * powerCost;
  const annualSavings = annualNonVrvCost - annualVrvCost;

  // EMI Financing Simulation
  // Estimated system cost: recommendedTR * ₹85,000 (Daikin/Voltas industrial standards)
  const estimatedSystemCost = recommendedTR * 80000;
  const downPayment = estimatedSystemCost * 0.2;
  const principalAmount = estimatedSystemCost - downPayment;
  const flatInterest = 0.095; // 9.5% flat commercial HVAC lease interest
  const monthsVal = 24; 
  const totalInterest = principalAmount * flatInterest * (monthsVal / 12);
  const monthlyEmi = Math.round((principalAmount + totalInterest) / monthsVal);

  const paybackYears = Number((estimatedSystemCost / annualSavings).toFixed(1.5));

  return (
    <section className="py-20 bg-white" id="calculator-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="bg-emerald-50 text-success-teal font-bold tracking-widest uppercase text-xs px-3 py-1 rounded-full border border-teal-100">
            ENGINEERING METRICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002045] font-sans tracking-tight">
            HVAC Load & Energy Savings Sandbox
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm">
            Model your building footprint, occupancy density, and tariff metrics in real time to estimate thermal capacity requirements and EMI lease financing parameters.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] mx-auto rounded"></div>
        </div>

        {/* Content Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Capacity Calculator Inputs */}
          <div className="lg:col-span-4 bg-[#f7fafc] border border-slate-200 p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[#002045] font-extrabold text-lg mb-6 border-b pb-3 border-slate-200">
                <Calculator className="w-6 h-6 text-[#1960a3]" />
                <h3 className="font-sans">1. Thermal Footprint</h3>
              </div>

              <div className="space-y-4">
                {/* Area input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Floor Area (Square Feet)
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full accent-secondary mb-2"
                  />
                  <div className="flex justify-between items-center bg-white border px-3 py-2 rounded-lg text-sm">
                    <span className="font-mono text-slate-500">Selected:</span>
                    <strong className="text-slate-800 font-extrabold">{area.toLocaleString()} Sq Ft</strong>
                  </div>
                </div>

                {/* Building type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Facility / Building Type
                  </label>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none text-slate-800"
                  >
                    <option value="Corporate Office">Corporate Office</option>
                    <option value="Hospital / Clinic">Hospital / Clinic</option>
                    <option value="Hotel / Resort">Hotel / Resort</option>
                    <option value="Warehouse / Factory">Warehouse / Factory</option>
                    <option value="Restaurant / Kitchen">Restaurant / Kitchen</option>
                    <option value="Data Center">Data Center (High Critical Density)</option>
                    <option value="Luxury Residence">Luxury Residence</option>
                  </select>
                </div>

                {/* Occupancy */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Peak Occupancy (Persons)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={occupancy}
                      onChange={(e) => setOccupancy(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none text-slate-800 font-mono font-bold"
                    />
                    <span className="text-xs text-slate-400 shrink-0">People</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro details panel */}
            <div className="bg-white/80 p-4 border border-slate-200/60 rounded-xl text-xs text-slate-500 leading-relaxed font-sans">
              <span className="font-bold text-slate-700 block mb-1">💡 ISHRAE Design Factors:</span>
              <span>Data Centers require higher air recycling indices (airflow rates) to vent high thermal heat loads from processors. Estimating Area / 155 Sq Ft per TR.</span>
            </div>
          </div>

          {/* Card 2: Technical Outputs & Suggested Equipment */}
          <div className="lg:col-span-4 bg-[#002045] text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-transparent hover:border-[#1960a3] transition-all">
            
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sky-400 font-extrabold text-lg border-b pb-3 border-sky-950">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse-slow" />
                <h3 className="font-sans">2. Estimated TR Loading</h3>
              </div>

              {/* Big Tonnage Counter display */}
              <div className="space-y-1 text-center py-4 bg-[#000a18]/45 rounded-xl border border-sky-950">
                <span className="text-xs text-sky-300 font-mono tracking-widest block uppercase">RECOMMENDED CAPACITY</span>
                <span className="text-4xl sm:text-5xl font-black text-amber-400 font-sans tracking-tight">
                  {recommendedTR.toFixed(1)} <span className="text-lg">TR</span>
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">({(recommendedTR * 12000).toLocaleString()} BTU/hour nominal cooling)</span>
              </div>

              {/* Sizing Recommendations details */}
              <div className="space-y-3 text-sm">
                <h4 className="font-bold text-sky-300 uppercase text-xs tracking-wider">SUGGESTED EQUIPMENT PLAN</h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300 bg-[#00132c]/60 p-2 rounded">
                    <span>Applicable standard base:</span>
                    <span className="font-mono">{areaTR.toFixed(2)} TR</span>
                  </div>
                  <div className="flex justify-between text-slate-300 bg-[#00132c]/60 p-2 rounded">
                    <span>Human body BTU coefficient additions:</span>
                    <span className="font-mono">+{occupancyTR.toFixed(2)} TR</span>
                  </div>
                  <div className="flex justify-between text-slate-300 bg-[#00132c]/60 p-2 rounded">
                    <span>Optimal setup configuration:</span>
                    <span className="font-bold text-teal-400">
                      {recommendedTR >= 50 
                        ? 'Central scroll-chiller plant series' 
                        : recommendedTR >= 12 
                        ? 'Multi-Zone Variable Flow VRV'
                        : 'Integrated hidden light ducted units'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onTriggerSurvey}
              className="mt-6 w-full py-3.5 bg-amber-400 text-[#002045] font-extrabold text-sm rounded-xl hover:bg-amber-300 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-lg shadow-amber-400/10"
              id="calculator-request-blue-btn"
            >
              Request Detailed HVAC Design
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          {/* Card 3: Energy Savings & ROI Sandbox (Plus EMI Lease financing) */}
          <div className="lg:col-span-4 bg-[#000a18] text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-[#001c3d]">
            
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-teal-400 font-extrabold text-lg border-b pb-3 border-[#001c3d]">
                <TrendingDown className="w-6 h-6 text-emerald-400" />
                <h3 className="font-sans">3. Savings & EMI Lease financing</h3>
              </div>

              {/* Energy inputs mini controllers */}
              <div className="grid grid-cols-2 gap-4 pb-2 border-b border-[#001c3d]">
                <div>
                  <label className="text-[10px] text-slate-400 block font-bold mb-1 uppercase">USAGE HRS/DAY</label>
                  <select 
                    value={operatingHours} 
                    onChange={(e) => setOperatingHours(Number(e.target.value))}
                    className="w-full bg-[#00132c] text-slate-200 py-1.5 border border-[#001c3d] rounded text-xs px-2 outline-none"
                  >
                    <option value="8">8 Hours</option>
                    <option value="12">12 Hours (Commercial standard)</option>
                    <option value="18">18 Hours (Double shift)</option>
                    <option value="24">24 Hours (Server/Hospital)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block font-bold mb-1 uppercase">GRID TARIFF (₹/KWH)</label>
                  <select 
                    value={powerCost} 
                    onChange={(e) => setPowerCost(Number(e.target.value))}
                    className="w-full bg-[#00132c] text-slate-200 py-1.5 border border-[#001c3d] rounded text-xs px-2 outline-none"
                  >
                    <option value="7">₹7.00 / kWh</option>
                    <option value="9">₹9.00 / Commercial</option>
                    <option value="12">₹12.00 / Peak Season</option>
                  </select>
                </div>
              </div>

              {/* Annual Savings block */}
              <div className="space-y-2">
                <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wider">ANNUAL ELECTRICITY SAVINGS (CLASSIC VS VRV)</span>
                <div className="flex items-center justify-between bg-emerald-950/20 p-3 rounded-lg border border-emerald-900/60">
                   <div className="flex items-center gap-2 text-emerald-400">
                    <Zap className="w-5 h-5 animate-bounce" />
                    <span className="text-md sm:text-lg font-black text-emerald-400 font-mono">₹{Math.round(annualSavings).toLocaleString()}/yr</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-300 font-extrabold px-2 py-0.5 rounded border border-emerald-500/20 font-sans">
                    42% Power Cut
                  </span>
                </div>
              </div>

              {/* Rent EMI Finance Tool block */}
              <div className="space-y-2 bg-[#00132c]/80 p-4 rounded-xl border border-[#001c3d]">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#F6AD55] font-extrabold tracking-wider font-mono font-sans">HVAC LEASE FINANCE OPTION</span>
                  <span className="text-[9px] bg-[#F6AD55]/10 text-[#F6AD55] font-extrabold px-1.5 py-0.5 rounded border border-[#F6AD55]/20 font-sans">9.5% FLAT IRR</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#001c3d]">
                  <span className="text-slate-400 text-xs">Estimated System Capital:</span>
                  <span className="font-bold text-slate-200 font-mono text-xs">₹{Math.round(estimatedSystemCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#001c3d]">
                  <span className="text-slate-400 text-xs">Downpayment (20%):</span>
                  <span className="font-bold text-slate-200 font-mono text-xs">₹{Math.round(downPayment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#BEE3F8] font-bold text-xs">Estimated Monthly EMI (24 Mo):</span>
                  <span className="text-[#BEE3F8] font-extrabold font-mono text-sm">₹{monthlyEmi.toLocaleString()} / mo</span>
                </div>
              </div>
            </div>

            {/* Quick Note about ESG carbon index reduction */}
            <p className="text-[10.5px] text-slate-500 italic leading-snug border-t border-[#00132c] pt-3 text-center">
              * Savings carbon mitigation metrics equivalent to planting approximately {Math.round(annualSavings / 2153)} broad-leaf trees annually according to standard Bureau of Energy Efficiency (BEE) data.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
