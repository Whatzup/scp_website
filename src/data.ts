import { FAQItem, Article, Review } from './types';

export interface ProjectSection {
  id: string;
  clientName: string;
  location: string;
  industry: string;
  hvacCapacity: string;
  brandUsed: 'Daikin' | 'Voltas';
  areaCovered: string;
  duration: string;
  challenges: string;
  solution: string;
  beforeImg: string;
  afterImg: string;
  year: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  certifications: string[];
  image: string;
  description: string;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  type: string;
  experience: string;
  location: string;
  description: string;
  requirements: string[];
}

export interface MapPin {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // Percentage coordinate for an elegant SVG mapping
  projectsCount: number;
  highlightProject: string;
}

export const INDUSTRIES_SERVE = [
  { id: 'offices', title: 'Corporate Offices', desc: 'Custom thermal zones for energy compliance & productivity.', icon: 'Briefcase' },
  { id: 'itparks', title: 'IT Parks', desc: '24×7 server thermal security & density-adaptive airflows.', icon: 'Cpu' },
  { id: 'hospitals', title: 'Hospitals', desc: 'Positive air pressure, HEPA filtration, & cleanroom control.', icon: 'HeartPulse' },
  { id: 'hotels', title: 'Hotels', desc: 'Individual guest comfort controls & heavy centralized chiller plants.', icon: 'Building' },
  { id: 'schools', title: 'Schools & Colleges', desc: 'High Fresh Air Ventilation (IAQ) for healthy alert classrooms.', icon: 'GraduationCap' },
  { id: 'restaurants', title: 'Restaurants', desc: 'Negative pressure kitchen exhaust paired with rapid dining cooling.', icon: 'Utensils' },
  { id: 'retail', title: 'Retail Stores', desc: 'Load-adaptive cooling matching morning vs evening crowd densities.', icon: 'ShoppingBag' },
  { id: 'warehouses', title: 'Warehouses', desc: 'Large volume air distribution with destratification fans.', icon: 'Warehouse' },
  { id: 'factories', title: 'Factories', desc: 'High-temperature mitigation & localized process cooling loops.', icon: 'Factory' },
  { id: 'datacenters', title: 'Data Centers', desc: 'Precision close-control units (CCU) for absolute temperature margins.', icon: 'Server' },
  { id: 'residential', title: 'Luxury Residences', desc: 'Acoustic-damped ductless VRVs for flawless invisible luxury.', icon: 'Home' }
];

export const BRANDS_SHOWCASE = [
  {
    id: 'daikin',
    name: 'Daikin',
    status: 'Authorized Daikin Platinum Dealer',
    badge: 'Genuine Equipment & Manufacturer Warranty Assured',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400', // Sourced high quality corporate style
    certificateNo: 'AUTH/DKN/2026/0892',
    warrantyText: 'Up to 5 Years Compressor Warranty directly backed by Daikin India.',
    description: 'Direct authorization for sales, custom system design, precision engineering, testing, commissioning, and specialized VRV/VRF AMC services.'
  },
  {
    id: 'voltas',
    name: 'Voltas',
    status: 'Authorized Voltas Commercial Partner',
    badge: 'TATA Enterprise Quality Assurance',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
    certificateNo: 'AUTH/VLT/2026/0471',
    warrantyText: 'Voltas certified on-site warranty Support and genuine OEM spares replacement.',
    description: 'Fully certified to design, supply, install and service high-tonnage package units, ducted systems, and custom scroll chillers.'
  }
];

export const SAVED_PROJECTS: ProjectSection[] = [
  {
    id: 'proj-1',
    clientName: 'ABC Corporate Office',
    location: 'Gurugram, Haryana',
    industry: 'Corporate Offices',
    hvacCapacity: '50 TR VRV Systems',
    brandUsed: 'Daikin',
    areaCovered: '20,000 Sq Ft',
    duration: '45 Days',
    year: '2025',
    challenges: 'Deploying high-efficiency cooling spanning three active work levels with zero noise transmission to executive boardrooms and maintaining a tight 45-day deadline during corporate operations.',
    solution: 'Designed and installed modular Daikin VRV V-Series systems with advanced vibration isolators, acoustically insulated supply ducts, and touch-pad centralized controllers with auto-zone throttling.',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800', // Industrial construction messy
    afterImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' // Beautiful modern corporate office
  },
  {
    id: 'proj-2',
    clientName: 'Apex Superspeciality Hospital',
    location: 'Noida, Uttar Pradesh',
    industry: 'Hospitals',
    hvacCapacity: '120 TR Chiller Plant & AHU units',
    brandUsed: 'Voltas',
    areaCovered: '45,000 Sq Ft',
    duration: '60 Days',
    year: '2026',
    challenges: 'Providing positive air pressure, strict HEPA level dust containment, and maintaining 22°C (±1°C) precision temperature thresholds for surgical ICU rooms continuously.',
    solution: 'Engineered a redundant dual-pump Voltas Chiller system integrated with custom Air Handling Units (AHU). Configured a double-skin acoustic chamber with high pressure UVGI (Ultraviolet) disinfection rings in the ducting.',
    beforeImg: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=800', // Unfinished plant room
    afterImg: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800' // Clean hospital hallway environment
  },
  {
    id: 'proj-3',
    clientName: 'Grand Regency Luxury Resort',
    location: 'Ghaziabad, UP NCR',
    industry: 'Hotels',
    hvacCapacity: '80 TR VRF Systems',
    brandUsed: 'Daikin',
    areaCovered: '32,000 Sq Ft',
    duration: '40 Days',
    year: '2025',
    challenges: 'Aesthetic constraints of heritage ceiling arches. All indoor cassette and duct units had to be completely invisible with elegant linear slot diffusers matching luxury wall trim elements.',
    solution: 'Custom low-profile concealed ceiling duct units from Daikin. Installed quiet 19dB(A) indoor models with remote control zoning and smart room occupancy card switches to save up to 35% empty power loads.',
    beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800', // Raw concrete beams
    afterImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800' // Gorgeous finished resort lobby
  },
  {
    id: 'proj-4',
    clientName: 'LogiHub Mega Cold Chain & Warehouse',
    location: 'Faridabad, Haryana',
    industry: 'Warehouses',
    hvacCapacity: '250 TR Industrial Cooling & Ducting',
    brandUsed: 'Voltas',
    areaCovered: '85,000 Sq Ft',
    duration: '75 Days',
    year: '2026',
    challenges: 'Extremely high heat load from steel roof structure and the strict necessity to maintain uniform cold temperatures across a massive column-free 8-meter high clear workspace.',
    solution: 'Designed custom high-velocity Voltas package units coupled with massive double-galvanized spiral ducts. Installed 6 destratification energy-saver roof fans to recycle ambient cooling layers efficiently.',
    beforeImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800', // Metal frame welding
    afterImg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800' // Huge organized warehouse distribution center
  },
  {
    id: 'proj-5',
    clientName: 'Shreeram Dhaba',
    location: 'CD Chowk, Opposite Omaxe Mall, Badshahpur Sohna Rd, Sector 48, Gurugram, Haryana 122018',
    industry: 'Hotels',
    hvacCapacity: '40 TR Ductable Air Conditioning Units',
    brandUsed: 'Daikin',
    areaCovered: '18,000 Sq Ft',
    duration: '25 Days',
    year: '2026',
    challenges: 'High ambient heat from kitchen clay ovens/furnaces, massive kitchen exhaust turbulence, and constant high-density customer footfall. Standard pre-existing systems suffered from thermal short-circuiting.',
    solution: 'Engineered high-static pressure Daikin Ductable AC units coupled with variable-frequency kitchen hood scrubbers. Formulated a low-velocity fresh air dilution corridor supplying filtered air smoothly under zero-noise guidelines.',
    beforeImg: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800', // rustic kitchen layout / industrial space
    afterImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' // premium finished dining hall
  },
  {
    id: 'proj-6',
    clientName: 'Jumpoline Tulip Violet Society',
    location: 'Sector 69, Gurugram, Haryana 122101',
    industry: 'Societies',
    hvacCapacity: '75 TR VRV Systems',
    brandUsed: 'Voltas',
    areaCovered: '28,000 Sq Ft',
    duration: '35 Days',
    year: '2025',
    challenges: 'The society clubhouse, main banquet facilities, multi-sport complex, and tech library wanted custom energy logs and billing modules. Noise limits inside the premium library area were constrained to less than 25dB.',
    solution: 'Designed and installed high-COP Voltas VRV systems integrated with individual smart power proportional managers (PPM). Implemented noise-muffling canvas duct adapters and anti-vibration mounts to eliminate hydraulic pump murmur.',
    beforeImg: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800', // high building construction
    afterImg: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800' // modern sports complex / premium lounge
  }
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Requirement Analysis', desc: 'Our senior consultants evaluate structural drawings, conduct solar heat gain mapping, and determine the exact CFM & TR values.' },
  { step: '02', title: 'Site Inspection & Survey', desc: 'Expert physical survey of duct corridors, outdoor condenser load structures, ceiling clearance heights, and power entry ports.' },
  { step: '03', title: 'Custom HVAC Engineering', desc: 'Our in-house design office drafts detailed 3D AutoCAD/Revit layouts, conducts air loop simulations, and chooses the optimal VRV/Chiller model.' },
  { step: '04', title: 'Itemized Proposal & Quote', desc: 'Uncompromisingly transparent billing without hidden margins. Every pipe length, outdoor unit frame, and damper control itemized.' },
  { step: '05', title: 'Client Engineering Review', desc: 'Collaborative walk-through of the design blueprints to verify zoning, user terminal placements, and energy-conservation variables.' },
  { step: '06', title: 'Direct Factory Procurement', desc: 'Equipment sourced directly from authorized Daikin and Voltas factories with individual serial numbers registered for official warranties.' },
  { step: '07', title: 'Precision On-Site Installation', desc: 'Conducted by certified engineers. Focus on double insulated copper, professional silver brazing, and rigid ceiling hangers.' },
  { step: '08', title: 'Rigorous Pressure Testing', desc: 'Mandatory 48-hour 450 PSI nitrogen pressure holding test followed by electronic vacuum testing down to 500 microns to secure 0% leak risk.' },
  { step: '09', title: 'Commissioning & Handover', desc: 'Balancing air dampers using computerized anemometers. Handover of final drawings, electrical charts, maintenance manuals, and operator guidance.' },
  { step: '10', title: '24×7 Premium AMC Support', desc: 'Continuous priority scheduling under annual maintenance contracts to verify operating pressures, prevent scale coils, and guarantee zero downtime.' }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Er. Amit Sharma',
    role: 'Founder & Managing Director',
    experience: '25+ Years in Thermal Infrastructure',
    certifications: ['ASHRAE Life Member', 'B.Tech Mechanical (IIT Delhi)', 'ISRE Licensed'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    description: 'Pioneered industrial-scale HVAC consulting in Northern India. Former Chief Design Engineer for global infrastructure projects.'
  },
  {
    id: 'team-2',
    name: 'Sanjay Nair',
    role: 'Lead HVAC Design Specialist',
    experience: '15+ Years in VRV/VRF Systems',
    certifications: ['Daikin Certified VRV Master Coach', 'M.Tech Thermal Engineering', 'ISHRAE Active Council Member'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    description: 'Expert in complex computational fluid dynamics (CFD) simulation and structural air balancing for Multi-Story office parks.'
  },
  {
    id: 'team-3',
    name: 'Rajesh Khanna',
    role: 'Senior Project Execution Manager',
    experience: '12+ Years in Commercial HVAC Construction',
    certifications: ['PMP® Certified Master', 'ASNT NDT Level II Coordinator', 'OSHA Safety Professional'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    description: 'Supervises raw on-site installations, chiller crane rigging, and coordinates multiphase vendor schedules with zero downtime.'
  },
  {
    id: 'team-4',
    name: 'Gurpreet Singh',
    role: 'Site Ducting Chief Inspector',
    experience: '8+ Years in Heavy Duty Metal Ventilation',
    certifications: ['SMACNA Duct Design Specialist', 'Safety Rigging Level III'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    description: 'Ensures the build and layout of every dynamic damper and spiral galvanized duct exceeds SMACNA air leaks guidelines.'
  },
  {
    id: 'team-5',
    name: 'Mohammad Salim',
    role: 'Master Chiller & Electrical Lead',
    experience: '10+ Years in Chilled Water Systems',
    certifications: ['Voltas Authorized Commissioning Expert', 'Advanced Electrical Controls Cert'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    description: 'Handles the fine electric panel configurations, compressor scroll diagnostics, and water loop flow alignment.'
  }
];

export const CAREER_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'car-1',
    title: 'Lead HVAC Project Engineer',
    type: 'Full-Time (On-Site)',
    experience: '5+ Years in Commercial Site Management',
    location: 'NCR Headquarters, Gurugram',
    description: 'Supervise multi-room VRV installation contracts, coordinate manual drafts with execution teams, and ensure ASHRAE quality guidelines.',
    requirements: [
      'B.Tech / Diploma in Mechanical Engineering',
      'Strong proficiency representing VRV piping blueprints on AutoCAD',
      'Past experience leading team crews for Daikin or Voltas equipment installations',
      'Excellent client relationship communication and progress reporting skills'
    ]
  },
  {
    id: 'car-2',
    title: 'Technical HVAC Maintenance Sales Engineer',
    type: 'Full-Time (Hybrid)',
    experience: '3+ Years in B2B AMC Contracts Sales',
    location: 'NCR Headquarters, Gurugram',
    description: 'Develop commercial industrial Annual Maintenance Contract (AMC) pitches, analyze thermal scope for corporate parks, and submit custom pricing matrices.',
    requirements: [
      'Experience in technical sales specifically for chillers, VRF, or large ducting installations',
      'Capable of conducting basic refrigeration loading estimates for site surveys',
      'Familiar with Northern India corporate, hotel, and school client structures'
    ]
  },
  {
    id: 'car-3',
    title: 'Senior Master HVAC Welder & Brazing Technician',
    type: 'Full-Time (Field)',
    experience: '6+ Years in High Pressure Copper Brazing',
    location: 'Delhi NCR Region',
    description: 'Execute high-precision copper line brazing, vacuum tests, and troubleshooting of nitrogen pressure holding setups.',
    requirements: [
      'ITI Certification in AC & Refrigeration Mechanics',
      'Excellent physical skill for high-elevation copper brazing and safe rigging work',
      'Demonstrated expertise detecting hairline gas leaks with electronic halogen detectors'
    ]
  },
  {
    id: 'car-4',
    title: 'Site Logistics & Installation Supervisor',
    type: 'Full-Time (Field)',
    experience: '4+ Years in Air Conditioning Projects Care',
    location: 'Noida / Greater Noida Projects Hub',
    description: 'Govern on-site safety rules, coordinate timely delivery of dampers, units and insulation coils, and organize technician shifts.',
    requirements: [
      'Experience in supervising sub-contracted AC mechanics',
      'Fluency with on-site worker safety protocols and materials tracking spreadsheets',
      'Fast problem-solving capability dealing with site clearance hurdles'
    ]
  }
];

export const MAP_PINS_DATA: MapPin[] = [
  { id: 'pin-delhi', name: 'Delhi Core', coordinates: { x: 45, y: 38 }, projectsCount: 162, highlightProject: 'Parliament Library Annex / Apex Hotel' },
  { id: 'pin-gurgaon', name: 'Gurugram HQs', coordinates: { x: 25, y: 65 }, projectsCount: 202, highlightProject: 'Shreeram Dhaba (Sector 48) & Tulip Violet Society (Sector 69)' },
  { id: 'pin-noida', name: 'Noida Tech Center', coordinates: { x: 70, y: 50 }, projectsCount: 114, highlightProject: 'Apex Superspeciality ICU (120 TR Chiller)' },
  { id: 'pin-faridabad', name: 'Faridabad Industrial', coordinates: { x: 60, y: 80 }, projectsCount: 84, highlightProject: 'LogiHub cold storage (250 TR Package)' },
  { id: 'pin-ghaziabad', name: 'Ghaziabad Town', coordinates: { x: 80, y: 25 }, projectsCount: 52, highlightProject: 'Grand Regency Resort (80 TR VRF)' }
];

export const CLIENT_LOGOS = [
  { name: 'TATA Enterprise Group', category: 'Builders & Hotels', logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200' },
  { name: 'Aegis Healthcare', category: 'Hospitals', logoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=200' },
  { name: 'Novotel Resorts Inc', category: 'Hotels & Hospitality', logoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=200' },
  { name: 'DLF Commercial', category: 'Corporate Offices', logoUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=200' },
  { name: 'Amity Academic Group', category: 'Schools & Colleges', logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200' }
];

export const PREMIUM_TESTIMONIALS = [
  {
    id: 'test-1',
    clientName: 'Suresh Singhania',
    company: 'Singhania Real Estates & Builders',
    projectType: 'Commercial Mall Central Cooling',
    rating: 5,
    comment: 'KD AC | Super Cool Projects completed a massive 300 TR VRV installation across 4 retail blocks in record time. Zero complaints, flawless air-balancing diagnostics, and Daikin platinum standards. They are now our exclusive nationwide partners!',
    date: '2026-05-18'
  },
  {
    id: 'test-2',
    clientName: 'Dr. Shruti Goel',
    company: 'Apex Multi-Speciality Clinics',
    projectType: 'Hospital Chiller & HEPA Integration',
    rating: 5,
    comment: 'In healthcare, air purity is life. KD AC | Super Cool Projects engineered our positive-pressure hospital wing operating theaters. The UVGI modules and strict temperature logs they generated were highly praised during ISO audits.',
    date: '2026-06-02'
  },
  {
    id: 'test-3',
    clientName: 'Ranjeet Kapoor',
    company: 'Grand Regency Hotels & Banquets',
    projectType: 'Luxury Hotel VRF & Silent Ducting',
    rating: 5,
    comment: 'Their execution of invisible linear-slot diffusers to maintain aesthetic grandeur for our heritage ballrooms was stellar. Extremely quiet systems (under 20 dB). Guests enjoy extreme comfort without seeing any bulky equipment.',
    date: '2026-06-11'
  },
  {
    id: 'test-4',
    clientName: 'Anil Agrawal',
    company: 'LogiHub cold storage systems',
    projectType: 'Industrial Heavy Package Plant',
    rating: 5,
    comment: 'Sourcing genuine equipment with a guaranteed manufacturer warranty over local subcontractors made a high-leverage difference. Their 10-step execution process is incredibly structured. Perfect maintenance AMC uptime during 47°C Delhi summer.',
    date: '2026-06-14'
  }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    rating: 5,
    comment: 'Quick help when our cooling stopped suddenly during the heaviest heatwave! The technician arrived in under an hour.',
    serviceType: 'Home AC Care',
    date: '2026-06-15'
  },
  {
    id: '2',
    name: 'Amina Sheikh',
    rating: 5,
    comment: 'Super professional service. They deep cleaned our multi-split office units over the weekend. Highly recommend the MSME AMC package!',
    serviceType: 'Office Support',
    date: '2026-06-12'
  },
  {
    id: '3',
    name: 'Vikram Singh',
    rating: 4,
    comment: 'Very polite crew. They explained why our gas pressure was low, fixed the leak on the spot, and tested everything properly before leaving.',
    serviceType: 'General AC Repair',
    date: '2026-06-10'
  },
  {
    id: '4',
    name: 'Neha Sharma',
    rating: 5,
    comment: 'Highly transparent pricing and helpful advice. The smart eco-tips actually helped lower our electricity bill this month.',
    serviceType: 'Home AC Care',
    date: '2026-06-08'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Services',
    question: 'What is the commercial difference between VRF and VRV air conditioning systems?',
    answer: 'Technically, VRV (Variable Refrigerant Volume) is a registered trademark of Daikin, whereas VRF (Variable Refrigerant Flow) is the generic industry term used by Voltas and other brands. Both systems operate on variable-speed inverter compressors, delivering high-performance customized flow to individual spatial zones, cutting energy use by up to 40% compared to standard package units.'
  },
  {
    id: 'faq-2',
    category: 'Pricing',
    question: 'Why should a commercial project choose an authorized direct dealer over a local contractor?',
    answer: 'Buying from an Authorized Platinum Dealer like KD AC | Super Cool Projects guarantees 100% genuine equipment straight from the factories, preserves valid manufacturer-backed warranties (up to 5 years), and ensures design layout calculations are verified under national ISHRAE guidelines. Local contractors often use counterfeit tubing or improper gauges, voiding product warranty safety.'
  },
  {
    id: 'faq-3',
    category: 'Emergency',
    question: 'Do you offer certified 24×7 emergency cooling restoration for server rooms or ICUs?',
    answer: 'Yes! Under our Priority Commercial AMC, we provide guaranteed SLA-backed 2-hour response dispatches across Delhi NCR. Certified mechanics with complete gas charge kits are stationed on standby specifically for continuous data center and pharmaceutical storage security.'
  },
  {
    id: 'faq-4',
    category: 'Maintenance',
    question: 'What items are certified in your 10-step HVAC quality assurance checklist?',
    answer: 'Our installation timeline encompasses rigorous 48-hour high-pressure nitrogen tests (450 PSI) to verify copper lock integrity, micron vacuuming (down to 500 microns) to prevent system contamination, and computerized airflow balancing. We also hand over complete AutoCAD commissioning files.'
  },
  {
    id: 'faq-5',
    category: 'Services',
    question: 'How do you handle AMC services for multi-locational offices across India?',
    answer: 'KD AC | Super Cool Projects handles standardized national HVAC AMC packages. Through our unified client portal, facility managers track quotation status, download tax invoices, schedule preventive visits, and monitor live troubleshooting progress for all branch locations in real time.'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'blog-vrv-vrf',
    category: 'ENGINEERING ADVICE',
    title: 'VRV vs VRF Systems: The Definitive Commercial Comparison',
    description: 'Understand the specific trademark differences, energy efficiency parameters, and brand installations for modern commercial architecture.',
    readTime: '6 min read',
    date: 'June 18, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    content: `When designing the cooling thermal load for a multi-story office or high-end residential complex, selecting the fluid mechanics paradigm is crucial. You will primarily compare VRV vs VRF.

### Trademark vs Generic Nomenclature
- **VRV (Variable Refrigerant Volume)**: Registered trademark of Daikin, who pioneered this variable-flow compression technology in 1982. It has matured across 5 generations with smart self-healing copper oil return cycles.
- **VRF (Variable Refrigerant Flow)**: The universal term used by all other HVAC brands (Voltas, Lloyd, Carrier, Hitachi). It operates on identical inverter compressor throttles, but the oil recovery algorithms and interface links differ.

### Efficiency Comparison
Standard package ACs run an all-or-nothing binary duty cycle. VRV/VRF systems continuously fine-tune the exact quantity of refrigerant flowing to individual indoor units, matching actual heat dissipation in real time. 
This dynamic balancing delivers up to **45% energy savings** for north-facing offices that receive zero direct radiation compared to southern zones.`
  },
  {
    id: 'blog-daikin-voltas',
    category: 'BRAND COMPARISON',
    title: 'Daikin vs Voltas: Which HVAC Partner Fits Your Next Project?',
    description: 'We tear down performance, raw compressor durability, and warranty support of these two cooling titans.',
    readTime: '5 min read',
    date: 'June 15, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    content: `Choosing between a Daikin Platinum solution or a robust Voltas setup depends on your operational parameters, localized budget constraints, and aesthetic tolerances.

### Daikin: The Premium Standard
- **Best For**: Invisible premium residential ceiling ducts, heavy multi-zone VRVs, complex variable layouts.
- **Key Advantage**: Exceptional energy efficiency indexes (ISEER), extremely low decibel footprint (down to 19 dB - silent as a whisper), and top-tier micro-climate controls.
- **Investment Level**: Higher initial cost balanced by lower monthly electric meter draw.

### Voltas: The Heavy Duty Champion
- **Best For**: High tonnage centralized chiller networks, industrial ducting plants, sturdy MSME budgets, factories.
- **Key Advantage**: Outstanding cooling performance in extreme 48°C ambient conditions. Durable robust parts designed with Tatas heritage to absorb heavy electric sags.
- **Investment Level**: Highly competitive and cost-efficient pricing with affordable OEM component supply.`
  },
  {
    id: 'blog-hvac-cost',
    category: 'BUDGETING CORNER',
    title: 'HVAC Cost Estimation Guidelines For Large Commercial Buildings',
    description: 'A comprehensive engineering guide breakdown of costs per square foot for ducting, package chillers, and VRVs.',
    readTime: '8 min read',
    date: 'June 10, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    content: `How much does commercial HVAC installation run across India? Designing commercial facilities requires understanding hidden cost elements.

### Cost Breakdown per Ton (TR)
1. **Daikin VRV System**: Typically costs ₹75,000 to ₹95,000 per TR inclusive of high-efficiency outdoor units, copper layouts, and intelligent centralized panels. Includes premium quiet cassette vents.
2. **Voltas Centralized Chiller Net**: Averages ₹60,000 to ₹80,000 per TR. Highly optimal for hyper-scale structures exceeding 100,000 Sq Ft like hospitals and IT parks.
3. **Heavy Ducting Work**: Spiral or rectangular galvanized sheet metal fabrication costs approximately ₹150 to ₹250 per square meter of duct surface, varying with insulation thickness.`
  }
];

export const SERVICE_CATEGORIES = [
  { id: 'residential', name: 'Residential AC Care', price: 'Free Survey', icon: 'Home' },
  { id: 'commercial', name: 'Commercial Solutions', price: 'Custom Quote', icon: 'Building' },
  { id: 'amc', name: 'Annual Maintenance Contracts (AMC)', price: 'SLA Sized', icon: 'ShieldCheck' },
  { id: 'repair', name: 'On-Demand Diagnostics', price: '₹499 Visiting', icon: 'Wrench' },
  { id: 'vrv-vrf', name: 'VRV / VRF Variable Systems', price: 'Custom Quote', icon: 'Award' },
  { id: 'ducted-ac', name: 'Ducted Air Conditioning', price: 'Custom Sizing', icon: 'Award' },
  { id: 'chillers', name: 'Chilled Water Systems', price: 'Custom Sizing', icon: 'Award' },
  { id: 'ahu-install', name: 'Air Handling Unit Rigging', price: 'Custom Quote', icon: 'Award' },
  { id: 'ventilation', name: 'Ventilation Mechanical Extraction', price: 'Custom Quote', icon: 'Award' },
  { id: 'industrial-cooling', name: 'Process Chillers & Low Temp', price: 'Custom Sizing', icon: 'Award' },
  { id: 'retrofitting', name: 'HVAC Energy Retrofitting', price: 'Custom Quote', icon: 'Award' },
  { id: 'amc-services', name: 'Annual SLA Maintenance Pack', price: 'SLA Sized', icon: 'Award' }
];
