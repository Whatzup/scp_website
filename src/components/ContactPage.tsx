import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  Building, 
  Send, 
  Briefcase, 
  Loader2, 
  RefreshCw, 
  ArrowRight, 
  Award,
  Lock
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('vrv-vrf');
  const [region, setRegion] = useState('gurugram');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [assignedEngineer, setAssignedEngineer] = useState('');

  const engineersList = [
    'Er. Abhinav Sharma (VRV Specialist)',
    'Er. Rachel Geller (Chiller Systems Expert)',
    'Er. Mohammad Yusuf (SLA Operations Head)',
    'Er. Sandeep Mittal (Static Pressure & Ducts)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || phone.length !== 10) return;

    setLoading(true);

    try {
      const getProjectTypeName = (typeCode: string) => {
        switch (typeCode) {
          case 'vrv-vrf': return 'Multi-Zone VRV/VRF Systems';
          case 'chiller': return 'High-Volume Chiller Plants';
          case 'ducted': return 'High-Static Ducted AC';
          case 'cassette': return 'Commercial Cassette AC';
          case 'amc-sla': return 'Annual AMC Contracts';
          case 'others': return 'Other Air-Conditioning';
          default: return typeCode;
        }
      };

      const getRegionName = (regCode: string) => {
        switch (regCode) {
          case 'gurugram': return 'Gurugram';
          case 'south-delhi': return 'South Delhi';
          case 'noida': return 'Noida Tech Zone';
          case 'other-ncr': return 'Other Delhi NCR';
          default: return regCode;
        }
      };

      const mappedProjType = getProjectTypeName(projectType);
      const mappedRegion = getRegionName(region);

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name.trim(),
          mobileNumber: phone.trim(),
          email: email.trim() || undefined,
          companyName: company.trim() || 'Private Individual Operations',
          projectType: 'Commercial', // Broad categorisation for routing
          requirementType: mappedProjType,
          cityLocation: mappedRegion,
          approximateArea: 'Not Specified',
          briefRequirement: message.trim() || undefined,
          ctaUsed: 'Get Free Consultation',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit mechanical consultation query.');
      }

      const generatedId = 'SCP-TKT-' + data.lead.id;
      const randomEngineer = engineersList[data.lead.id % engineersList.length];

      const newRequest = {
        id: generatedId,
        name: data.lead.fullName,
        company: data.lead.companyName || 'Private Individual Operations',
        phone: `+91 ${data.lead.mobileNumber}`,
        email: data.lead.email || 'Not Provided',
        projectType: data.lead.requirementType,
        region: data.lead.cityLocation,
        message: data.lead.briefRequirement || '',
        assignedEngineer: randomEngineer,
        status: data.lead.status,
        createdAt: data.lead.createdAt
      };

      try {
        const existing = JSON.parse(localStorage.getItem('super_cool_callbacks') || '[]');
        localStorage.setItem('super_cool_callbacks', JSON.stringify([newRequest, ...existing]));
      } catch (err) {
        console.error('Local persistence save failed', err);
      }

      setTicketId(generatedId);
      setAssignedEngineer(randomEngineer);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Connecting to backend database failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setCompany('');
    setProjectType('vrv-vrf');
    setRegion('gurugram');
    setMessage('');
    setSuccess(false);
    setTicketId('');
  };

  return (
    <div className="py-16 bg-[#f8fafc] sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro */}
        <div className="text-center mb-16 space-y-4">
          <span className="bg-[#1960a3]/10 text-[#1960a3] font-black tracking-widest uppercase text-xs sm:text-sm px-4 py-1.5 rounded-full border border-[#1960a3]/20 font-mono inline-block">
            NCR MECHANICAL HUB
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002045] font-sans tracking-tight">
            Connect With Our Engineering Desk
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            Have a custom query about high-tonnage multi-zone layouts, cassette systems, or customized quarterly AMC SLAs? Connect with our team of specialists.
          </p>
          <div className="w-16 h-1 bg-[#1960a3] mx-auto rounded"></div>
        </div>

        {/* Dynamic Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left panel: Enterprise Request System (Col 7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Visual Header */}
                <div className="border-b border-slate-100 pb-5 space-y-1">
                  <h3 className="text-lg font-black text-[#002045] font-sans flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#1960a3] shrink-0" />
                    Submit High-Volume Sizing Query
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fields with * are strictly required to authorize dispatch callbacks.
                  </p>
                </div>

                {/* Symmetrical Inline Row Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-[#002045] tracking-widest uppercase mb-2 font-mono">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Devadiga"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] focus:ring-2 focus:ring-[#1960a3]/10 transition-all outline-none text-xs sm:text-sm text-slate-800 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-[#002045] tracking-widest uppercase mb-2 font-mono">
                      CORPORATE / COMPANY
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. DLF Plaza Offices"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] focus:ring-2 focus:ring-[#1960a3]/10 transition-all outline-none text-xs sm:text-sm text-slate-800 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-[#002045] tracking-widest uppercase mb-2 font-mono">
                      PHONE NUMBER (10-DIGIT) *
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-[#1960a3] focus-within:ring-2 focus-within:ring-[#1960a3]/10 transition-all">
                      <span className="inline-flex items-center px-3 bg-slate-100 border-r border-slate-200 text-[#002045] font-black text-xs sm:text-sm select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="e.g. 98122 XXXXX"
                        className="w-full px-4 py-3 bg-slate-50 focus:bg-white outline-none text-xs sm:text-sm text-slate-800 font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-[#002045] tracking-widest uppercase mb-2 font-mono">
                      WORK EMAIL ID
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. facilities@corporatelink.in"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] focus:ring-2 focus:ring-[#1960a3]/10 transition-all outline-none text-xs sm:text-sm text-slate-800 font-sans"
                    />
                  </div>
                </div>

                {/* Sizing specifics drop-downs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-[#002045] tracking-widest uppercase mb-2 font-mono">
                      SYSTEM CATEGORY
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] outline-none text-xs sm:text-sm text-slate-800 font-sans cursor-pointer"
                    >
                      <option value="vrv-vrf">Multi-Zone Daikin VRV/VRF Systems</option>
                      <option value="chiller">High-Volume Water/Air Cooled Chiller Plants</option>
                      <option value="ducted">High-Static Ducted AC Units (TATA Voltas)</option>
                      <option value="cassette">Commercial Cassette AC layout Layouts</option>
                      <option value="amc-sla">Preventive Maintenance Annual AMC Contract</option>
                      <option value="others">Other Air-Conditioning Work/Repairs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-[#002045] tracking-widest uppercase mb-2 font-mono">
                      NCR TARGET REGION
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] outline-none text-xs sm:text-sm text-slate-800 font-sans cursor-pointer"
                    >
                      <option value="gurugram">Gurugram (Sohna Rd & CyberCity Hub)</option>
                      <option value="south-delhi">South Delhi (Okhla & Nehru Place)</option>
                      <option value="noida">Noida Tech Zone (Sector 62 & Greater Noida)</option>
                      <option value="other-ncr">Other regions inside Delhi NCR</option>
                    </select>
                  </div>
                </div>

                {/* Custom comment box */}
                <div>
                  <label className="block text-[10px] font-black text-[#002045] tracking-widest uppercase mb-2 font-mono">
                    PROJECT PROFILE OR ENQUIRY DESCRIPTION
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe area dimension, tonnage requested, or active HVAC breakdown issues..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] focus:ring-2 focus:ring-[#1960a3]/10 transition-all outline-none text-xs sm:text-sm text-slate-800 font-sans resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#002045] text-white py-4 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#1960a3] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying Consultation Status...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Get Free Consultation</span>
                    </>
                  )}
                </button>

                {/* Secured Privacy Warning banner */}
                <div className="flex gap-2.5 items-center p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[10px] text-emerald-800 font-mono">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>SECURE GATEWAY: 100% spam-free. Your data is encrypted and used only for mechanical consultation.</span>
                </div>

              </form>
            ) : (
              // Stunning customized visual dispatch sheet
              <div className="p-4 sm:p-6 text-center space-y-6">
                <div className="mx-auto w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-black text-[#002045] font-sans leading-none">
                    Mechanical Consultation Authorized!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Hello <strong className="text-slate-850 font-bold">{name}</strong>, your query regarding our <span className="font-semibold text-slate-800">{projectType.toUpperCase()}</span> system has been routed to our direct NCR operations team.
                  </p>
                </div>

                {/* Printable looking job ticket block */}
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-5 rounded-2xl max-w-md mx-auto text-left font-mono text-xs space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#1960a3] text-white text-[8px] px-3 py-0.5 rounded-bl font-bold">
                    PRIORITY DISPATCHED
                  </div>
                  
                  <div className="flex justify-between border-b pb-2 border-slate-205">
                    <span className="text-slate-450 uppercase">TICKET STATUS:</span>
                    <span className="text-emerald-600 font-bold">QUEUED & ACTIVE</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-450 uppercase">TRACKING NO:</span>
                    <span className="font-bold text-[#002045]">{ticketId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-450 uppercase">ESTIMATED WAIT:</span>
                    <span className="font-bold text-amber-600">Under 4 Minutes</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-450 uppercase">REGION DIRECTORY:</span>
                    <span className="font-bold text-slate-700">{region.toUpperCase()}</span>
                  </div>

                  <div className="border-t pt-2 mt-2 border-slate-205 flex flex-col gap-1">
                    <span className="text-slate-450 text-[10px]">MONITORING ENGINEER ASSIGNED:</span>
                    <span className="font-black text-[#1960a3] flex items-center gap-1.5 pt-0.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {assignedEngineer}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-450 font-mono italic max-w-xs mx-auto">
                  A verification automated call code has been dispatched to your active cellular phone node <strong>+91 {phone}</strong>.
                </p>

                <div className="pt-4 border-t border-slate-100 flex justify-center">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-lg transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Submit another mechanical query</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right panel: Active Hotline & Regional directory (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 24/7 SLA Hotline support box */}
            <div className="bg-[#002045] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden border border-[#00142a]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1960a3]/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Symmetrical glowing status indicator */}
              <div className="flex justify-between items-center z-10 relative">
                <span className="text-[9px] bg-amber-400 text-[#002045] font-mono font-black px-2.5 py-1 rounded uppercase tracking-wider block">
                  🚨 24x7 EMERGENCY WORK DESK
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-[10px] text-emerald-300 font-mono font-bold">ONLINE</span>
                </div>
              </div>

              <div className="space-y-2 z-10 relative">
                <h4 className="font-extrabold font-sans text-xl text-white">Direct SLA Breakdown Hotline</h4>
                <p className="text-xs text-sky-200 leading-relaxed">
                  Enterprise server room cold-chain fails or commercial VRV multi-breakdowns are dispatched on a high-velocity priority grid.
                </p>
              </div>

              {/* Seamless Action Buttons */}
              <div className="space-y-3 z-10 relative">
                <a 
                  href="tel:+919906666452" 
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all group group-hover:scale-[1.01]"
                >
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-left font-sans">
                    <p className="text-[9px] text-slate-300 uppercase tracking-widest font-mono">CALL DIRECT HELPLINE</p>
                    <p className="text-sm font-black text-white group-hover:text-amber-400 transition-colors mt-0.5">+91 99066 66452</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white ml-auto transition-transform group-hover:translate-x-1" />
                </a>

                <a 
                  href="mailto:book@supercool.in" 
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all group group-hover:scale-[1.01]"
                >
                  <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                  <div className="text-left font-sans">
                    <p className="text-[9px] text-slate-300 uppercase tracking-widest font-mono">SECURE DISPATCH MAIL</p>
                    <p className="text-sm font-black text-white group-hover:text-sky-305 transition-colors mt-0.5">book@supercool.in</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white ml-auto transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Symmetrical Physical stations Directory block */}
            <div className="border border-slate-200 bg-white p-6 sm:p-8 rounded-3xl space-y-6">
              
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <h4 className="font-sans font-black text-[#002045] text-base">NCR Physical Stations</h4>
                <span className="text-[9px] font-mono bg-sky-50 text-sky-600 border border-sky-100 px-2 py-0.5 rounded uppercase font-bold">
                  3 ACTIVE STATIONS
                </span>
              </div>

              {/* List of stations */}
              <div className="space-y-6 text-xs text-slate-705 leading-relaxed">
                
                {/* Hub 1 */}
                <div className="space-y-2 group">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-slate-900 font-sans text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#1960a3] rounded-full" />
                      1. Gurugram Headquarters
                    </p>
                    <span className="text-[9px] font-mono text-slate-400">MAIN LABS</span>
                  </div>
                  <p className="text-slate-500 pl-3 flex gap-2 items-start">
                    <MapPin className="w-4 h-4 text-[#1960a3] shrink-0 mt-0.5" />
                    <span>G-14, Sector 49, Sohna Road, Gurugram, Haryana - 122018</span>
                  </p>
                  <div className="pl-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> Mon - Sat: 09:00 - 18:30
                    </span>
                    <span className="text-[#1960a3]">Ext: 101 (VRV Desk)</span>
                  </div>
                </div>

                {/* Hub 2 */}
                <div className="space-y-2 group border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-slate-900 font-sans text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#1960a3] rounded-full" />
                      2. South Delhi Station Hub
                    </p>
                    <span className="text-[9px] font-mono text-slate-400">DISPATCH depot</span>
                  </div>
                  <p className="text-slate-500 pl-3 flex gap-2 items-start">
                    <MapPin className="w-4 h-4 text-[#1960a3] shrink-0 mt-0.5" />
                    <span>A-45, Okhla Core Industrial Area, Phase II, New Delhi - 110020</span>
                  </p>
                  <div className="pl-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> Mon - Sat: 08:30 - 19:00
                    </span>
                    <span className="text-[#1960a3]">Ext: 105 (Commercial)</span>
                  </div>
                </div>

                {/* Hub 3 */}
                <div className="space-y-2 group border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-slate-900 font-sans text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#1960a3] rounded-full" />
                      3. Noida Technology Hub
                    </p>
                    <span className="text-[9px] font-mono text-slate-400">SLA DESK</span>
                  </div>
                  <p className="text-slate-500 pl-3 flex gap-2 items-start">
                    <MapPin className="w-4 h-4 text-[#1960a3] shrink-0 mt-0.5" />
                    <span>Plot 8, Tech Zone B, Sector 62, Noida, Uttar Pradesh - 201301</span>
                  </p>
                  <div className="pl-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> 24x7 SLA support
                    </span>
                    <span className="text-[#1960a3]">Ext: 110 (Premium)</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
