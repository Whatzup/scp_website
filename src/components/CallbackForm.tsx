import React, { useState } from 'react';
import { Phone, MessageSquare, Loader2, CheckCircle2, RefreshCw, Layers, MapPin, Sparkles, Send, HelpCircle } from 'lucide-react';

export default function CallbackForm() {
  // Form State fields (8 fields exactly as requested)
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectType, setProjectType] = useState('Commercial'); // Residential/Commercial/Industrial
  const [requirementType, setRequirementType] = useState('VRV / VRF System');
  const [cityLocation, setCityLocation] = useState('');
  const [briefRequirement, setBriefRequirement] = useState('');

  // CTA Selected Type state (Get Free Consultation, Request Site Visit, Get HVAC Estimate)
  const [ctaType, setCtaType] = useState<'consultation' | 'visit' | 'estimate'>('consultation');

  // Submit UI states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const requirementTypes = [
    'VRV / VRF System',
    'Ductable AC',
    'Cassette AC',
    'Split AC',
    'Ventilation System',
    'AHU / FCU',
    'HVAC AMC',
    'HVAC Consultancy',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Pre-flight checks
    if (!fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, '').length < 10) {
      setErrorMsg('A valid 10-digit mobile number is required.');
      return;
    }
    if (!projectType) {
      setErrorMsg('Project type is required.');
      return;
    }
    if (!requirementType) {
      setErrorMsg('Requirement type is required.');
      return;
    }
    if (!cityLocation.trim()) {
      setErrorMsg('City / Location is required.');
      return;
    }

    setLoading(true);

    const ctaLabel =
      ctaType === 'consultation'
        ? 'Get Free Consultation'
        : ctaType === 'visit'
        ? 'Request Site Visit'
        : 'Get HVAC Estimate';

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          mobileNumber,
          email: email.trim() || undefined,
          companyName: companyName.trim() || undefined,
          projectType,
          requirementType,
          cityLocation: cityLocation.trim(),
          briefRequirement: briefRequirement.trim() || undefined,
          ctaUsed: ctaLabel,
        }),
      });

      let data: any;
      try {
        const text = await response.text();
        data = JSON.parse(text);
      } catch (err) {
        throw new Error(
          `Vercel Server Connection Notice: Received non-JSON response (HTTP ${response.status}). This usually indicates your Database credential variables (e.g. NEON_DATABASE_URL / DATABASE_URL) are NOT active. Please register environment variables inside Vercel Dashboard under Settings -> Environment Variables.`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form data.');
      }

      setSubmittedLead(data.lead);
      setSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMsg(err.message || 'Connecting to backend database failed. Please see dev console logs.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setMobileNumber('');
    setEmail('');
    setCompanyName('');
    setProjectType('Commercial');
    setRequirementType('VRV / VRF System');
    setCityLocation('');
    setBriefRequirement('');
    setSuccess(false);
    setSubmittedLead(null);
    setErrorMsg('');
  };

  const ctaButtonText =
    ctaType === 'consultation'
      ? 'Get Free Consultation'
      : ctaType === 'visit'
      ? 'Request Site Visit'
      : 'Get HVAC Estimate';

  return (
    <section className="pb-16 pt-6 bg-slate-50" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-blue-50/60 to-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 border border-blue-105/80 overflow-hidden relative shadow-sm">
          
          {/* Backdrop ambient decorations */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#1960a3]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Contextual explanation */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <span className="bg-[#1960a3]/10 text-[#1960a3] font-mono font-black uppercase text-xs px-3.5 py-1.5 rounded-full border border-[#1960a3]/15 tracking-wider inline-block">
                🚀 SYSTEM PERSISTENCE DESK
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002045] font-sans leading-tight">
                Connect Directly into our Live Lead Database
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Fill out our ideal 8-field lead engagement dossier to route your inquiry instantly to our active Daikin and Voltas project coordinators.
              </p>

              {/* Direct call action widgets */}
              <div className="space-y-4 pt-2">
                <a 
                  href="tel:+919906666452"
                  className="flex items-center gap-4 p-3 rounded-2xl border border-dashed border-sky-200/60 bg-white/50 hover:bg-white transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#002045] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                      CALL DIRECT ENROLMENT HELP
                    </p>
                    <p className="font-sans font-extrabold text-base text-primary leading-none mt-1">
                      +91 99066 66452
                    </p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/919906666452"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-2xl border border-dashed border-emerald-300/40 bg-white/50 hover:bg-white transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider font-sans">
                      WHATSAPP SECURE DIRECT
                    </p>
                    <p className="font-sans font-extrabold text-base text-primary leading-none mt-1 flex items-center gap-1.5">
                      Chat Now <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Online</span>
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-150">
              
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-extrabold text-primary font-sans flex items-center gap-2">
                      <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                      Request HVAC Registration Form (8 Fields)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fields marked with * are strictly stored to configure connection.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-150 rounded-xl text-xs text-red-700 font-medium">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  {/* Field Row 1: Contacts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-[#002045] tracking-widest uppercase mb-1.5 font-sans">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] outline-none text-sm text-slate-800 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-[#002045] tracking-widest uppercase mb-1.5 font-sans">
                        Mobile Number *
                      </label>
                      <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-[#1960a3] transition-all">
                        <span className="inline-flex items-center px-3 bg-slate-100 border-r border-slate-200 text-[#002045] text-xs font-bold font-sans">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="Mobile number"
                          className="w-full px-4 py-2.5 bg-slate-55 focus:bg-white outline-none text-sm text-slate-800 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field Row 2: Secondary Contact & Corporate */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-[#002045] tracking-widest uppercase mb-1.5 font-sans">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E.g. customer@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] outline-none text-sm text-slate-800 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-[#002045] tracking-widest uppercase mb-1.5 font-sans">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Or enterprise name"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] outline-none text-sm text-slate-800 font-sans"
                      />
                    </div>
                  </div>

                  {/* Field Row 3: Project Type Selection & Technical Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-[#002045] tracking-widest uppercase mb-1.5 font-sans">
                        Project Type *
                      </label>
                      <div className="grid grid-cols-3 gap-1 bg-slate-50 border border-slate-200 p-1 rounded-xl">
                        {['Residential', 'Commercial', 'Industrial'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setProjectType(type)}
                            className={`py-1.5 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                              projectType === type
                                ? 'bg-[#002045] text-white'
                                : 'text-slate-500 hover:text-[#002045]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-[#002045] tracking-widest uppercase mb-1.5 font-sans">
                        Requirement Type *
                      </label>
                      <select
                        value={requirementType}
                        onChange={(e) => setRequirementType(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] outline-none text-sm text-slate-850 cursor-pointer"
                      >
                        {requirementTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Field Row 4: City / Location */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#002045] tracking-widest uppercase mb-1.5 font-sans">
                      City / Location *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={cityLocation}
                        onChange={(e) => setCityLocation(e.target.value)}
                        placeholder="E.g. Gurugram, Sector 49"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] outline-none text-sm text-slate-800 font-sans"
                      />
                    </div>
                  </div>

                  {/* Field Row 5: Tell us about requirement */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#002045] tracking-widest uppercase mb-1.5 font-sans">
                      Tell us about your requirement
                    </label>
                    <textarea
                      rows={2.5}
                      value={briefRequirement}
                      onChange={(e) => setBriefRequirement(e.target.value)}
                      placeholder="Brief details about area dimension, custom layout, or cooling tonnage targets..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1960a3] outline-none text-sm text-slate-800 font-sans resize-none"
                    />
                  </div>

                  {/* Custom CTA Selector Toggles */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-extrabold text-[#002045] tracking-widest uppercase mb-1 font-sans">
                      Choose Call-to-Action Theme
                    </label>
                    <div className="grid grid-cols-3 gap-2 border border-blue-100 p-1 bg-blue-50/40 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setCtaType('consultation')}
                        className={`text-[10px] font-bold py-2 rounded-lg text-center transition-all cursor-pointer ${
                          ctaType === 'consultation'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-blue-700 hover:bg-blue-100/50'
                        }`}
                      >
                        Free Consultation
                      </button>
                      <button
                        type="button"
                        onClick={() => setCtaType('visit')}
                        className={`text-[10px] font-bold py-2 rounded-lg text-center transition-all cursor-pointer ${
                          ctaType === 'visit'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-blue-700 hover:bg-blue-100/50'
                        }`}
                      >
                        Request Visit
                      </button>
                      <button
                        type="button"
                        onClick={() => setCtaType('estimate')}
                        className={`text-[10px] font-bold py-2 rounded-lg text-center transition-all cursor-pointer ${
                          ctaType === 'estimate'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-blue-700 hover:bg-blue-100/50'
                        }`}
                      >
                        Get Estimate
                      </button>
                    </div>
                  </div>

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0F172A] hover:bg-primary text-white py-4 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1"
                    id="submit-callback-btn"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        Persisting lead to live database...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-emerald-400" />
                        {ctaButtonText}
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-slate-450 leading-relaxed font-sans">
                    Guaranteed spam-free. Submissions are stored encryption-secured on Google Cloud PostgreSQL nodes.
                  </p>
                </form>
              ) : (
                // Success State card
                <div className="p-4 sm:p-6 text-center space-y-6">
                  <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-extrabold text-[#002045] font-sans leading-none">
                      Lead Registered Successfully!
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-sm mx-auto">
                      Hello <span className="font-bold text-slate-800">{submittedLead?.fullName}</span>, your custom request was submitted via CTA: <span className="font-semibold text-blue-600">"{submittedLead?.ctaUsed}"</span>.
                    </p>
                  </div>

                  {/* Lead Summary receipt box */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left text-xs font-sans max-w-sm mx-auto space-y-2.5 shadow-inner">
                    <div className="flex justify-between border-b pb-1.5 border-slate-150 text-slate-400 font-mono text-[10px]">
                      <span>POSTGRES RECORD ID:</span>
                      <span className="font-bold text-slate-850">#{submittedLead?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450">Mobile:</span>
                      <span className="font-mono text-slate-800 font-semibold">+91 {submittedLead?.mobileNumber}</span>
                    </div>
                    {submittedLead?.email && (
                      <div className="flex justify-between">
                        <span className="text-slate-450">Email:</span>
                        <span className="text-slate-800">{submittedLead.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-450">Project Type:</span>
                      <span className="font-medium text-slate-800">{submittedLead?.projectType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450">Requirement:</span>
                      <span className="font-medium text-slate-850 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 text-[10px]">{submittedLead?.requirementType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450">City/Location:</span>
                      <span className="text-slate-800">{submittedLead?.cityLocation}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-150 pt-2 text-[10px] font-mono text-slate-400">
                      <span>STATUS:</span>
                      <span className="text-blue-600 font-bold uppercase">{submittedLead?.status || 'PENDING'}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-2 text-xs font-extrabold text-blue-600 hover:underline flex items-center gap-1 mx-auto cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
