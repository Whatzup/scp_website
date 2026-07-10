import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, FileSpreadsheet, Play, Pause, ChevronLeft, ChevronRight, 
  Maximize2, Minimize2, Eye, ShieldCheck, Building, Utensils, 
  GraduationCap, Briefcase, Cpu, Warehouse, Factory, Phone, Mail, 
  MapPin, Clock, Award, CheckCircle2, ChevronRightSquare, HardHat,
  Sparkles, Layers
} from 'lucide-react';
import jsPDF from 'jspdf';

// Slide Deck types
interface Slide {
  id: number;
  title: string;
  theme: 'dark' | 'light';
  category: string;
  content: React.ReactNode;
}

export default function CompanyProfileDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Auto-play timer
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Handle Fullscreen
  const toggleFullscreen = () => {
    const element = document.getElementById('presentation-container');
    if (!element) return;

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen to fullscreen exit change events
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // PDF generator function with absolute coordinates and gorgeous high-fidelity design blocks!
  const handleDownloadPdfPresentation = async () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [800, 450], // 16:9 slide size ratio
      });

      const pagesCount = slidesDataText.length;

      slidesDataText.forEach((slide, index) => {
        if (index > 0) {
          doc.addPage([800, 450], 'landscape');
        }

        const isDark = slide.theme === 'dark';
        
        // 1. Draw Page Background
        if (isDark) {
          doc.setFillColor(6, 26, 51); // Deep Navy
          doc.rect(0, 0, 800, 450, 'F');
          
          // Draw subtle stylish geometric shapes on background
          doc.setFillColor(11, 41, 79);
          doc.rect(500, 0, 300, 450, 'F');
        } else {
          doc.setFillColor(248, 250, 252); // Soft Light Blue/Grey Slate
          doc.rect(0, 0, 800, 450, 'F');
          
          // Draw bright accent color block on the left/top border
          doc.setFillColor(25, 96, 163); // Sky Blue
          doc.rect(0, 0, 15, 450, 'F');
          
          doc.setFillColor(255, 124, 26); // Accent orange thin line at the top
          doc.rect(0, 0, 800, 6, 'F');
        }

        // 2. Draw Header
        if (index > 0) {
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(10);
          if (isDark) {
            doc.setTextColor(56, 189, 248); // sky-400
            doc.text(slide.category.toUpperCase(), 40, 35);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.text(slide.title, 40, 60);
          } else {
            doc.setTextColor(25, 96, 163); // primary-600
            doc.text(slide.category.toUpperCase(), 45, 35);
            doc.setTextColor(0, 32, 69); // dark navy
            doc.setFontSize(22);
            doc.text(slide.title, 45, 60);
          }

          // Thin header underline divider
          doc.setDrawColor(isDark ? 30 : 226, isDark ? 41 : 232, isDark ? 59 : 240);
          doc.setLineWidth(1);
          doc.line(40, 75, 760, 75);
        }

        // 3. Draw Body contents depending on slide index
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(isDark ? 200 : 70);

        if (index === 0) {
          // COVER SLIDE (Slide 1)
          // Large circle logo badge
          doc.setFillColor(25, 96, 163);
          doc.circle(100, 120, 35, 'F');
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(24);
          doc.setTextColor(255, 255, 255);
          doc.text('SC', 82, 128);

          // Title
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(36);
          doc.text('SUPER COOL PROJECT', 160, 115);
          doc.setFontSize(12);
          doc.setTextColor(56, 189, 248);
          doc.text('https://kd-ac-scp.vercel.app/', 160, 138);

          // Subtitle / Catchphrase
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(28);
          doc.setTextColor(255, 255, 255);
          doc.text('Reliable cooling for commercial spaces.', 80, 210);

          // Services Pill list
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(15);
          doc.setTextColor(203, 213, 225);
          doc.text('Sales   |   Installation   |   Service   |   Project Execution', 80, 245);

          // Two big credential badges
          doc.setFillColor(15, 76, 129);
          doc.rect(80, 280, 220, 45, 'F');
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(255, 255, 255);
          doc.text('Daikin Authorized Dealer', 110, 306);

          doc.setFillColor(22, 101, 142);
          doc.rect(320, 280, 220, 45, 'F');
          doc.text('Voltas Authorized Dealer', 350, 306);

          // Orange decoration line separating
          doc.setFillColor(255, 124, 26);
          doc.rect(0, 442, 800, 8, 'F');

          // Footer info
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(12);
          doc.setTextColor(148, 163, 184);
          doc.text('Gurugram, Haryana   |   Mob: 9718145302', 80, 380);

        } else if (index === 1) {
          // COMPANY SNAPSHOT (Slide 2)
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(14);
          doc.setTextColor(51, 65, 85);
          doc.text('Super Cool Project supports Commercial, Hospitality, Institutional and Industrial clients', 45, 110);
          doc.text('with professional AC Sales, AC Installation, and full-cycle Service.', 45, 128);

          // 4 Stats Blocks (horizontal row)
          const stats = [
            { label: '7+ yrs', desc: 'Industry experience', color: [25, 96, 163] },
            { label: '2018', desc: 'Established', color: [255, 124, 26] },
            { label: '2', desc: 'Authorized brands', color: [25, 150, 203] },
            { label: 'Micro', desc: 'Enterprise FY 2025-26', color: [16, 185, 129] }
          ];

          stats.forEach((st, i) => {
            const x = 45 + i * 180;
            doc.setFillColor(st.color[0], st.color[1], st.color[2]);
            doc.rect(x, 160, 160, 110, 'F');
            
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(26);
            doc.setTextColor(255, 255, 255);
            doc.text(st.label, x + 15, 205);

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(241, 245, 249);
            doc.text(st.desc, x + 15, 240);
          });

          // Highlight projects note
          doc.setFillColor(226, 232, 240);
          doc.rect(45, 300, 710, 75, 'F');
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(15, 23, 42);
          doc.text('Core Physical Deliveries Sited:', 60, 325);
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(11);
          doc.setTextColor(71, 85, 105);
          doc.text('- Limewood Stay Hotel (Sector 38 VRV High-volume plant execution)', 60, 345);
          doc.text('- MOD Avenue Hotel (DLF Phase 3) & ONE STAYZ (Sector 70, Medanta block)', 60, 360);

        } else if (index === 2) {
          // WE SUPPORT (Slide 3)
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(15);
          doc.setTextColor(15, 23, 42);
          doc.text('Complete Commercial HVAC support tailored for below client segments with Sales & Service:', 45, 105);

          const sectors = [
            { title: 'Commercial Spaces', desc: 'Cabins, boardrooms, shopping retail malls, server centers, and high-rise office clusters requiring balanced zoning.', color: [25, 96, 163] },
            { title: 'Hospitality Outlets', desc: 'SLA priority 24/7 cooling for executive hotel rooms, resorts, lobbies, open-deck cafes, and heavy-sensible heat commercial kitchens.', color: [255, 124, 26] },
            { title: 'Industrial Units', desc: 'High static ventilation ducts, air washers, and robust exhaust scrubbers for warehousing, cleanroom, and factory zones.', color: [16, 185, 129] },
            { title: 'Institutional Complexes', desc: 'Strict low-noise dBA designs and high indoor air quality (IAQ) filtration grids for schools, medical centers, and college libraries.', color: [25, 150, 203] }
          ];

          sectors.forEach((sec, i) => {
            const x = 45 + (i % 2) * 360;
            const y = 140 + Math.floor(i / 2) * 120;

            doc.setFillColor(255, 255, 255);
            doc.rect(x, y, 340, 100, 'F');
            doc.setDrawColor(226, 232, 240);
            doc.rect(x, y, 340, 100, 'S');

            // Left colored bar indicator
            doc.setFillColor(sec.color[0], sec.color[1], sec.color[2]);
            doc.rect(x, y, 8, 100, 'F');

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(0, 32, 69);
            doc.text(sec.title, x + 25, y + 30);

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(10.5);
            doc.setTextColor(71, 85, 105);
            
            // Multi-line split
            const splitLines = doc.splitTextToSize(sec.desc, 290);
            doc.text(splitLines, x + 25, y + 50);
          });

        } else if (index === 3) {
          // SELECTED GALLERY (Slide 4)
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(12);
          doc.setTextColor(203, 213, 225);
          doc.text('We design and commission real commercial HVAC projects across Gurugram, Delhi, and Noida.', 40, 105);

          const photos = [
            { name: 'ONE STAYZ', type: 'Sector 70, Hospitality VRV (60 TR)' },
            { name: 'Lime Wood Stay', type: 'Sector 57, Guest Stay Cooling (85 TR)' },
            { name: 'MOD Avenue', type: 'Cyber City area, Ducted Packaged (50 TR)' },
            { name: 'Shree Ram Dhaba', type: 'Sector 48, Kitchen Exhaust & AC (40 TR)' },
            { name: 'Zakir Husain College', type: 'Delhi Core, Institutional VRV (120 TR)' },
            { name: 'Hotel Limon', type: 'Gurugram Town, Commercial VRV Systems' }
          ];

          photos.forEach((ph, i) => {
            const x = 40 + (i % 3) * 245;
            const y = 135 + Math.floor(i / 3) * 125;

            // Simulated photo cards
            doc.setFillColor(15, 33, 59);
            doc.rect(x, y, 230, 110, 'F');
            doc.setDrawColor(30, 58, 95);
            doc.rect(x, y, 230, 110, 'S');

            // Overlay label
            doc.setFillColor(255, 124, 26);
            doc.rect(x, y, 5, 110, 'F');

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(12.5);
            doc.setTextColor(255, 255, 255);
            doc.text(ph.name, x + 15, y + 45);

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(148, 163, 184);
            doc.text(ph.type, x + 15, y + 68);

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(16, 185, 129);
            doc.text('● VERIFIED ACTIVE', x + 15, y + 88);
          });

        } else if (index === 4) {
          // PRODUCT PORTFOLIO (Slide 5)
          const prods = [
            { name: 'Cassette AC', desc: 'Daikin Premium Multi-Direction flow recessed cassettes for silent office layouts.' },
            { name: 'Tower AC', desc: 'Heavy floor-standing column cabinets matching lobbies and massive showrooms.' },
            { name: 'Ductable AC', desc: 'Centralized high-static concealed units matched with linear ceiling air vents.' },
            { name: 'Commercial AC', desc: 'Multi-split centralized condensers handling continuous duty-cycle demands.' },
            { name: 'Voltas VRV / VRF', desc: 'Tata Enterprise multi-circuit variable refrigerant flow platforms for energy audit benchmarks.' },
            { name: 'Air Washer & Scrubbers', desc: 'Evaporative large volume ventilation & grease exhaust hood systems.' }
          ];

          prods.forEach((pr, i) => {
            const x = 45 + (i % 3) * 245;
            const y = 110 + Math.floor(i / 3) * 135;

            doc.setFillColor(255, 255, 255);
            doc.rect(x, y, 230, 115, 'F');
            doc.setDrawColor(226, 232, 240);
            doc.rect(x, y, 230, 115, 'S');

            doc.setFillColor(25, 96, 163);
            doc.rect(x, y, 230, 4, 'F');

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(0, 32, 69);
            doc.text(pr.name, x + 15, y + 28);

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(9.5);
            doc.setTextColor(100, 116, 139);
            const lines = doc.splitTextToSize(pr.desc, 200);
            doc.text(lines, x + 15, y + 48);

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(255, 124, 26);
            doc.text('Sales, Laying & Commissioning', x + 15, y + 98);
          });

        } else if (index === 5) {
          // ACHIEVEMENTS (Slide 6)
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(13);
          doc.setTextColor(203, 213, 225);
          doc.text('Key hallmarks of our engineering capabilities and commercial reliability:', 40, 105);

          const achs = [
            { label: 'Multiple', sub: 'Hotel & Guest House Projects successfully active in Gurugram.' },
            { label: '5+ Sectors', sub: 'Serving Commercial, Hospitality, Industrial, Residential & Institutional sites.' },
            { label: 'Daikin Premium', sub: 'Authorized Sales, Sizing, Pipeline Designing and Commissioning.' },
            { label: 'Voltas Channel', sub: 'Commercial Variable Refrigerant Flow & Heavy Scroll Chiller platforms.' }
          ];

          achs.forEach((ac, i) => {
            const x = 40 + (i % 2) * 365;
            const y = 140 + Math.floor(i / 2) * 110;

            doc.setFillColor(15, 33, 59);
            doc.rect(x, y, 350, 90, 'F');
            doc.setDrawColor(30, 58, 95);
            doc.rect(x, y, 350, 90, 'S');

            doc.setFillColor(16, 185, 129);
            doc.rect(x, y, 6, 90, 'F');

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(15);
            doc.setTextColor(255, 255, 255);
            doc.text(ac.label, x + 20, y + 32);

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(148, 163, 184);
            const lines = doc.splitTextToSize(ac.sub, 310);
            doc.text(lines, x + 20, y + 52);
          });

          // Footer note on Micro Enterprise status
          doc.setFillColor(11, 41, 79);
          doc.rect(40, 360, 715, 45, 'F');
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(255, 124, 26);
          doc.text('Enterprise Registration Status:', 55, 385);
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(11);
          doc.setTextColor(255, 255, 255);
          doc.text('Government of India Registered MSME Micro Enterprise for FY 2025-26.', 230, 385);

        } else if (index === 6) {
          // WORKING PROCESS (Slide 7)
          const steps = [
            { num: '1', title: 'Discuss', desc: 'Understanding requirements, tonnage calculation, and thermal load survey.' },
            { num: '2', title: 'Visit', desc: 'Physical inspection of ceiling clearance, duct runs, and condenser load nodes.' },
            { num: '3', title: 'Recommend', desc: 'Tailoring customized heat charts, energy audits, and itemized equipment quotas.' },
            { num: '4', title: 'Install', desc: 'Supervised pipeline laying, double insulated copper, silver welding and pressure test.' },
            { num: '5', title: 'Support', desc: 'Continuous preventive AMC SLA scheduling and maintenance protection.' }
          ];

          steps.forEach((st, i) => {
            const x = 45 + i * 142;
            doc.setFillColor(255, 255, 255);
            doc.rect(x, 120, 130, 190, 'F');
            doc.setDrawColor(226, 232, 240);
            doc.rect(x, 120, 130, 190, 'S');

            doc.setFillColor(25, 96, 163);
            doc.circle(x + 65, 160, 20, 'F');
            
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(255, 255, 255);
            doc.text(st.num, x + 61, 165);

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(0, 32, 69);
            doc.text(st.title, x + 15, 200);

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(9.5);
            doc.setTextColor(100, 116, 139);
            const lines = doc.splitTextToSize(st.desc, 105);
            doc.text(lines, x + 12, 220);
          });

          // Bottom guarantee line
          doc.setFillColor(239, 246, 255);
          doc.rect(45, 335, 710, 50, 'F');
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(25, 96, 163);
          doc.text('Transparent coordination at every stage reduces technical delays, layout errors, and installation confusions.', 75, 365);

        } else if (index === 7) {
          // SERVICES (Slide 8)
          const srvs = [
            { num: '01', title: 'Consultation', d: 'Comprehensive heat sizing charts, solar gain evaluation, and dBA acoustic limit plans.' },
            { num: '02', title: 'AC Sales', d: 'Genuine OEM equipment direct from Daikin and Voltas factory inventories with full warranties.' },
            { num: '03', title: 'Installation', d: 'Concealed ductables, double insulation copper piping, heavy condenser trusses, and wall slotting.' },
            { num: '04', title: 'VRV Support', d: 'Multi-split high tonnage systems with variable refrigerant smart loads for massive clubhouses.' },
            { num: '05', title: 'Maintenance', d: 'Dedicated high pressure water coil washing, chemical scale removals, and electrical node audits.' },
            { num: '06', title: 'AC Repairs', d: 'Fast diagnosis of refrigerant pressures, compressor relays, sensor issues, and blower overhauls.' }
          ];

          srvs.forEach((sr, i) => {
            const x = 45 + (i % 3) * 245;
            const y = 110 + Math.floor(i / 3) * 140;

            doc.setFillColor(255, 255, 255);
            doc.rect(x, y, 230, 120, 'F');
            doc.setDrawColor(226, 232, 240);
            doc.rect(x, y, 230, 120, 'S');

            // Top orange bar
            doc.setFillColor(255, 124, 26);
            doc.rect(x, y, 230, 4, 'F');

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(25, 96, 163);
            doc.text(sr.num, x + 15, 28 + y);

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(0, 32, 69);
            doc.text(sr.title, x + 40, 28 + y);

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(9.5);
            doc.setTextColor(100, 116, 139);
            const lines = doc.splitTextToSize(sr.d, 200);
            doc.text(lines, x + 15, 48 + y);
          });

        } else if (index === 8) {
          // WHY CHOOSE US? (Slide 9)
          // 2 Columns
          // Left: Before -> During -> After
          doc.setFillColor(255, 255, 255);
          doc.rect(45, 110, 335, 270, 'F');
          doc.setDrawColor(226, 232, 240);
          doc.rect(45, 110, 335, 270, 'S');

          doc.setFillColor(25, 96, 163);
          doc.rect(45, 110, 335, 30, 'F');
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(13);
          doc.setTextColor(255, 255, 255);
          doc.text('CLEAN PROCESS, BETTER OUTCOME', 65, 130);

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(0, 32, 69);
          doc.text('1. BEFORE:', 65, 175);
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(10.5);
          doc.setTextColor(71, 85, 105);
          doc.text('Site review, product fitment, route planning', 145, 175);

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(255, 124, 26);
          doc.text('2. DURING:', 65, 225);
          doc.setFont('Helvetica', 'normal');
          doc.text('Neat physical laying, vacuum holds, Nitrogen pressure testing', 145, 225);

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(16, 185, 129);
          doc.text('3. AFTER:', 65, 275);
          doc.setFont('Helvetica', 'normal');
          doc.text('Clean handover, electrical charts, maintenance guides', 145, 275);

          // Right Column: Value Props
          const items = [
            { title: 'Authorized Brands Only', desc: 'Direct factory channels of Daikin Platinum & Voltas Commercial.' },
            { title: 'Neat Installation Finish', desc: 'Rigid pipe supports, insulated channels, and complete sealing.' },
            { title: 'Responsive 24/7 SLA Support', desc: 'Rapid priority technicians dispatched for critical server nodes.' }
          ];

          items.forEach((item, i) => {
            const y = 110 + i * 90;
            doc.setFillColor(255, 255, 255);
            doc.rect(400, y, 355, 80, 'F');
            doc.setDrawColor(226, 232, 240);
            doc.rect(400, y, 355, 80, 'S');

            doc.setFillColor(25, 96, 163);
            doc.rect(400, y, 5, 80, 'F');

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(0, 32, 69);
            doc.text(item.title, 420, y + 28);

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(100, 116, 139);
            doc.text(item.desc, 420, y + 48);
          });

        } else if (index === 9) {
          // INDUSTRIES (Slide 10)
          const inds = [
            { name: 'Hotels', use: 'Guest rooms, lobbies, central air handling loops.' },
            { name: 'Restaurants', use: 'Cozy dining climate control matched with powerful kitchen hoods.' },
            { name: 'Institutions', use: 'Ultra-silent classrooms, lecture theaters, and exam rooms.' },
            { name: 'Corporate Offices', use: 'Multi-zone VRVs to allow individual thermal levels.' },
            { name: 'Retail Showrooms', use: 'Load-adaptive cooling matching morning vs crowd peaks.' },
            { name: 'Industrial Sites', use: 'Evaporative air washers, exhaust grids, and production ducting.' }
          ];

          inds.forEach((ind, i) => {
            const x = 45 + (i % 3) * 245;
            const y = 120 + Math.floor(i / 3) * 130;

            doc.setFillColor(255, 255, 255);
            doc.rect(x, y, 230, 110, 'F');
            doc.setDrawColor(226, 232, 240);
            doc.rect(x, y, 230, 110, 'S');

            doc.setFillColor(255, 124, 26);
            doc.circle(x + 25, y + 30, 15, 'F');

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(255, 255, 255);
            doc.text(ind.name.charAt(0), x + 20, y + 34);

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(13.5);
            doc.setTextColor(0, 32, 69);
            doc.text(ind.name, x + 50, y + 34);

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(9.5);
            doc.setTextColor(100, 116, 139);
            const lines = doc.splitTextToSize(ind.use, 200);
            doc.text(lines, x + 15, y + 60);
          });

        } else if (index === 10) {
          // PORTFOLIO REFERENCES (Slide 11)
          const refs = [
            { name: 'Lime Wood Stay', loc: 'Sector 57, Gurugram', load: '85 TR Daikin VRVs' },
            { name: 'Hotel Limon', loc: 'Sohna Road, Gurugram', load: '70 TR VRF Systems' },
            { name: 'One Stayz Hotel', loc: 'Sector 38, near Medanta', load: '60 TR Centralized VRVs' },
            { name: 'MOD Avenue', loc: 'DLF Phase 3, Cyber Area', load: '50 TR Ductable ACs' },
            { name: 'Shree Ram Dhaba', loc: 'CD Chowk, Sector 48', load: '40 TR High-Static ductable' },
            { name: 'Zakir Husain College', loc: 'Jawaharlal Nehru Marg, Delhi', load: '120 TR VRV V-Series' }
          ];

          refs.forEach((ref, i) => {
            const x = 45 + (i % 3) * 245;
            const y = 110 + Math.floor(i / 3) * 140;

            doc.setFillColor(255, 255, 255);
            doc.rect(x, y, 230, 115, 'F');
            doc.setDrawColor(226, 232, 240);
            doc.rect(x, y, 230, 115, 'S');

            doc.setFillColor(25, 96, 163);
            doc.rect(x, y, 230, 4, 'F');

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(13.5);
            doc.setTextColor(0, 32, 69);
            doc.text(ref.name, x + 15, y + 25);

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(10.5);
            doc.setTextColor(71, 85, 105);
            doc.text(`Location: ${ref.loc}`, x + 15, y + 48);
            doc.text(`Tonnage: ${ref.load}`, x + 15, y + 68);

            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(9.5);
            doc.setTextColor(16, 185, 129);
            doc.text('✓ Handed Over & Commissioned', x + 15, y + 95);
          });

        } else if (index === 11) {
          // CONTACT US (Slide 12)
          // Draw 2 Address Boxes and helpline list
          doc.setFillColor(15, 33, 59);
          doc.rect(40, 110, 350, 150, 'F');
          doc.setDrawColor(30, 58, 95);
          doc.rect(40, 110, 350, 150, 'S');

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(13);
          doc.setTextColor(255, 255, 255);
          doc.text('HEAD OFFICE', 55, 135);
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(10.5);
          doc.setTextColor(148, 163, 184);
          doc.text('FF-18 Signature Global, The Signum 36,', 55, 160);
          doc.text('Sector 36 Sohna Road, Dhunela, Haryana', 55, 178);

          doc.setFont('Helvetica', 'bold');
          doc.setTextColor(255, 255, 255);
          doc.text('2ND OFFICE', 55, 212);
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(148, 163, 184);
          doc.text('H Block 1159, Sector 57,', 55, 230);
          doc.text('Gurugram, Haryana - 122003', 55, 245);

          // Right Info Box
          doc.setFillColor(11, 41, 79);
          doc.rect(410, 110, 350, 150, 'F');
          doc.rect(410, 110, 350, 150, 'S');

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(15);
          doc.setTextColor(255, 255, 255);
          doc.text('Direct Contacts:', 430, 135);

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(12);
          doc.setTextColor(226, 232, 240);
          doc.text('Mob: 9718145302', 430, 165);
          doc.text('Email: supercoolproject03@gmail.com', 430, 188);
          doc.text('GST No: 06AVSPJ3528R1ZR', 430, 210);

          // Call to action at bottom
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(22);
          doc.setTextColor(255, 255, 255);
          doc.text('Let us support your next HVAC requirement.', 40, 315);

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(13);
          doc.setTextColor(56, 189, 248);
          doc.text('Submit your site blueprints today for a custom computational TR sizing report.', 40, 345);

        } else if (index === 12) {
          // THANK YOU (Slide 13)
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(48);
          doc.setTextColor(0, 32, 69);
          doc.text('Thank You', 270, 210);

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(14);
          doc.setTextColor(71, 85, 105);
          doc.text('Super Cool Project  •  Reliable cooling for commercial spaces.', 190, 250);

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(25, 96, 163);
          doc.text('Contact No: 9718145302  •  Email: supercoolproject03@gmail.com', 190, 280);
        }

        // Draw Slide number on all pages
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(isDark ? 100 : 150);
        doc.text(`Page ${index + 1} of ${pagesCount}`, 720, 425);
        
        doc.setFont('Helvetica', 'normal');
        doc.text('SUPER COOL PROJECT COMPANY PROFILE', 40, 425);
      });

      // Save PDF file
      doc.save('Super_Cool_Project_Company_Profile_2026.pdf');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-5 border-slate-150">
        <div>
          <span className="text-[#1960a3] font-bold tracking-widest text-xs uppercase font-mono block mb-1">
            OFFICIAL COMPANY PRESENTATION
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002045] tracking-tight">
            Super Cool Project Profile
          </h3>
          <p className="text-xs text-slate-500 max-w-2xl mt-1 leading-relaxed">
            Browse through the verified company profile slides detailing our Authorized Daikin & Voltas dealerships, client sectors, real engineering workflows, and on-site Gurugram portfolios.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleDownloadPdfPresentation}
            disabled={isGeneratingPdf}
            className="flex items-center gap-1.5 bg-[#1960a3] hover:bg-[#002045] disabled:bg-slate-350 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all uppercase tracking-wide"
          >
            <Download className="w-3.5 h-3.5" />
            {isGeneratingPdf ? 'Creating PDF...' : 'Download Deck (PDF)'}
          </button>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 border border-slate-205 hover:bg-slate-50 text-[#002045] font-extrabold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all uppercase tracking-wide"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Full Screen View
          </button>
        </div>
      </div>

      {/* Presentation Stage */}
      <div 
        id="presentation-container" 
        className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-xl select-none ${
          isFullscreen ? 'fixed inset-0 z-[100] w-screen h-screen rounded-none border-none' : 'bg-[#061a33]'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-full flex flex-col justify-between p-6 sm:p-12 ${
              slides[currentSlide].theme === 'dark' 
                ? 'bg-gradient-to-br from-[#061a33] via-[#0c2445] to-[#041122] text-white' 
                : 'bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9] text-[#002045]'
            }`}
          >
            {/* Upper Slide metadata header */}
            <div className="flex justify-between items-center text-xs border-b pb-3 border-slate-200/20">
              <span className={`font-mono font-bold tracking-widest uppercase ${
                slides[currentSlide].theme === 'dark' ? 'text-sky-400' : 'text-[#1960a3]'
              }`}>
                {slides[currentSlide].category}
              </span>
              <span className="font-mono text-slate-400 font-bold">
                Slide {currentSlide + 1} / {slides.length}
              </span>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-center py-4">
              {slides[currentSlide].content}
            </div>

            {/* Bottom Brand Watermark */}
            <div className="flex justify-between items-center text-[10px] font-mono border-t pt-3 border-slate-200/15">
              <span className={slides[currentSlide].theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                SUPER COOL PROJECT  •  AUTHORIZED DEALER
              </span>
              <span className="text-[#ff7c1a] font-bold">
                MOB: 9718145302
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Float Controls Overlay */}
        <div className="absolute bottom-16 right-6 sm:right-12 z-10 flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-xl text-white">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-1 hover:text-sky-300 transition-colors"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-sky-300 transition-colors"
            title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="p-1 hover:text-sky-300 transition-colors"
            title="Next Slide (Right Arrow / Spacebar)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="w-px h-4 bg-slate-500/50" />

          <button
            onClick={toggleFullscreen}
            className="p-1 hover:text-sky-300 transition-colors"
            title={isFullscreen ? 'Exit Full Screen' : 'View Full Screen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slider Thumbnails Indicator */}
      <div className="flex flex-wrap items-center justify-center gap-2 py-2">
        {slides.map((sl, index) => (
          <button
            key={sl.id}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-lg p-1 text-center cursor-pointer ${
              currentSlide === index 
                ? 'bg-[#1960a3] text-white font-bold scale-110 shadow-md ring-2 ring-sky-300' 
                : 'bg-white hover:bg-slate-100 border border-slate-200 text-[#002045] text-[10px]'
            }`}
          >
            <span className="block px-2 text-[10px] uppercase font-mono font-black">{index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Flat Slide Content Declarations mimicking the slide PDF uploaded by user with extreme structural precision
const slides: Slide[] = [
  {
    id: 1,
    title: 'Super Cool Project',
    theme: 'dark',
    category: 'Welcome Presentation',
    content: (
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[#1960a3] flex items-center justify-center font-bold text-2xl text-white shadow-md border-2 border-white/20">
            SC
          </div>
          <div className="text-left">
            <h1 className="text-2xl sm:text-5xl font-black tracking-tight leading-none text-white">
              SUPER COOL PROJECT
            </h1>
            <span className="text-xs sm:text-sm font-mono text-sky-400 block mt-1.5">
              https://kd-ac-scp.vercel.app/
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl sm:text-4xl font-extrabold text-white leading-snug">
            Professional HVAC Solutions. <br className="hidden sm:inline" />
            <span className="text-sky-300">Reliable cooling for commercial spaces.</span>
          </h2>
          <p className="text-slate-300 font-medium text-xs sm:text-base">
            Sales &nbsp;|&nbsp; AC Installation &nbsp;|&nbsp; Custom Duct Sizing &nbsp;|&nbsp; SLA Engineering Handover
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3.5 pt-4">
          <span className="bg-blue-900/60 border border-sky-400/30 text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Daikin Authorized Dealer
          </span>
          <span className="bg-amber-900/40 border border-amber-500/30 text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            Voltas Authorized Dealer
          </span>
        </div>

        <p className="text-slate-400 text-[11px] sm:text-xs font-mono pt-4">
          HQ: Gurugram, Haryana &nbsp;•&nbsp; Engineering Desk: 9718145302
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: 'A Dependable HVAC Partner',
    theme: 'light',
    category: 'Company Snapshot',
    content: (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-2xl font-black text-[#002045]">
            Corporate Snapshot & Capabilities
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Super Cool Project supports Commercial, Hospitality, Institutional and Industrial clients with factory-authorized AC Sales, bespoke on-site technical layout designing, structured duct installation, and robust maintenance SLAs.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-[#1960a3] p-4 rounded-2xl text-white shadow-md">
            <span className="block text-xl sm:text-3xl font-black">7+ yrs</span>
            <span className="block text-[10px] uppercase tracking-wider text-sky-200 mt-1">Industry Experience</span>
          </div>
          <div className="bg-[#ff7c1a] p-4 rounded-2xl text-white shadow-md">
            <span className="block text-xl sm:text-3xl font-black">2018</span>
            <span className="block text-[10px] uppercase tracking-wider text-orange-200 mt-1">Established Year</span>
          </div>
          <div className="bg-[#1996cb] p-4 rounded-2xl text-white shadow-md">
            <span className="block text-xl sm:text-3xl font-black">2</span>
            <span className="block text-[10px] uppercase tracking-wider text-sky-100 mt-1">Authorized Brands</span>
          </div>
          <div className="bg-[#10b981] p-4 rounded-2xl text-white shadow-md">
            <span className="block text-xl sm:text-3xl font-black">Micro</span>
            <span className="block text-[10px] uppercase tracking-wider text-emerald-100 mt-1">Enterprise Status</span>
          </div>
        </div>

        {/* Highlighting properties info card */}
        <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-xl text-xs text-slate-700 flex gap-2">
          <ShieldCheck className="w-5 h-5 text-[#1960a3] shrink-0" />
          <div>
            <strong>Verified Corporate Portfolios:</strong> Deployed heavy-capacity multi-compressor plants across premium locations including <strong>Limewood Stay Hotel</strong> (Sector 38 VRV ducting), <strong>MOD Avenue</strong> (Cyber Area), and <strong>ONE STAYZ Hotel</strong>.
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'Complete HVAC Support',
    theme: 'light',
    category: 'We Support',
    content: (
      <div className="space-y-5 max-w-5xl mx-auto">
        <h4 className="text-sm sm:text-lg font-bold text-slate-800">
          Professional AC Sales & Installation Solutions across 4 critical industries:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1960a3] flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-[#002045]">Commercial Spaces</h5>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                High tonnage ductable cassette arrays optimized for open floor corporate zones, showrooms, and multi-tier IT office corridors.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-[#ff7c1a] flex items-center justify-center shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-[#002045]">Hospitality Outlets</h5>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Continuous duty climate control for restaurant chains, lobbies, and positive-exhaust kitchen hoods against clay ovens.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#10b981] flex items-center justify-center shrink-0">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-[#002045]">Industrial & Warehousing</h5>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Large volume airflow distribution, robust multi-stage evaporative air washers, and industrial exhaust scrubbers.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-[#002045]">Institutional Complexes</h5>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Low decibel (dBA) ultra-quiet VRV structures specifically designed for library rooms, examination zones, and universities.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: 'On-Site Execution Showcase',
    theme: 'dark',
    category: 'Selected Project Gallery',
    content: (
      <div className="space-y-4 max-w-5xl mx-auto">
        <p className="text-slate-300 text-xs sm:text-sm">
          A partial photographic checklist of verified active installations. Click corresponding tabs in the app to inspect technical briefs.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-black text-white">ONE STAYZ HOTEL</span>
            <span className="text-[10px] text-sky-400 mt-1">Sector 70 Gurugram</span>
            <span className="inline-block bg-sky-950 text-sky-300 text-[9px] font-bold px-2 py-0.5 rounded-md mt-2 w-max">60 TR VRV Platform</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-black text-white">LIMEWOOD STAY HOTEL</span>
            <span className="text-[10px] text-sky-400 mt-1">Sector 38 Gurugram</span>
            <span className="inline-block bg-sky-950 text-sky-300 text-[9px] font-bold px-2 py-0.5 rounded-md mt-2 w-max">85 TR Daikin Plant</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-black text-white">MOD AVENUE HOTEL</span>
            <span className="text-[10px] text-sky-400 mt-1">DLF Phase 3 Gurugram</span>
            <span className="inline-block bg-sky-950 text-sky-300 text-[9px] font-bold px-2 py-0.5 rounded-md mt-2 w-max">50 TR Ductable AC</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-black text-white">SHREE RAM DHABA</span>
            <span className="text-[10px] text-sky-400 mt-1">Sector 48 Gurugram</span>
            <span className="inline-block bg-sky-950 text-sky-300 text-[9px] font-bold px-2 py-0.5 rounded-md mt-2 w-max">40 TR Ductable Kitchen Exhaust</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-black text-white">ZAKIR HUSAIN COLLEGE</span>
            <span className="text-[10px] text-sky-400 mt-1">Jawaharlal Nehru Marg, Delhi</span>
            <span className="inline-block bg-sky-950 text-sky-300 text-[9px] font-bold px-2 py-0.5 rounded-md mt-2 w-max">120 TR VRV V-Series</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-black text-white">HOTEL LIMON</span>
            <span className="text-[10px] text-sky-400 mt-1">Gurugram Town Area</span>
            <span className="inline-block bg-sky-950 text-sky-300 text-[9px] font-bold px-2 py-0.5 rounded-md mt-2 w-max">70 TR Commercial AC</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: 'Bespoke Engineering Product Line',
    theme: 'light',
    category: 'Product Portfolio',
    content: (
      <div className="space-y-4 max-w-5xl mx-auto">
        <h4 className="text-sm sm:text-base font-bold text-[#002045]">
          Heavy-duty cooling equipment supplied, designed, and fully maintained:
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-xs text-[#002045] block">Concealed Cassette AC</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Daikin 4-direction ceiling flow modules.</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-xs text-[#002045] block">Heavy Tower AC</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Floor standing high-volume lobbies cooling.</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-xs text-[#002045] block">High-Static Ductable AC</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Concealed duct runs for customized zoning.</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-xs text-[#002045] block">Commercial Chiller Lines</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Voltas Scroll chillers and liquid loops.</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-xs text-[#002045] block">Variable VRV / VRF Systems</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Daikin VRV V platforms for optimal COP load shares.</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-xs text-[#002045] block">Air Washers & Scrubbers</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Heavy industrial filters and kitchen hood fans.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: 'Hallmarks of Our Work',
    theme: 'dark',
    category: 'Achievements',
    content: (
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm font-bold text-white block">Multiple Hotels Served</strong>
              <p className="text-xs text-slate-400 mt-1">
                Completed major mechanical laying, copper brazing and terminal commissionings for boutique guest blocks and luxury sites in Gurugram.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm font-bold text-white block">5+ Major Sectors Sited</strong>
              <p className="text-xs text-slate-400 mt-1">
                Demonstrated competencies across commercial spaces, hotels, institutional libraries, industrial units, and luxury high-rise societies.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm font-bold text-white block">Daikin Platinum Authorized</strong>
              <p className="text-xs text-slate-400 mt-1">
                Factory certified pipelines layouts, nitrogen vacuum testing controls, and genuine Daikin parts replacement warranties.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm font-bold text-white block">Voltas Commercial Support</strong>
              <p className="text-xs text-slate-400 mt-1">
                Authorized supply partner for Voltas heavy ductable AC package structures and on-site repair configurations.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#11294a] border border-sky-500/30 p-3 rounded-xl text-center text-xs text-sky-200">
          📍 Registered Government of India <strong>Micro Enterprise (MSME)</strong> for the FY 2025-26 duration.
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: 'From Inquiry to Commissioning',
    theme: 'light',
    category: 'Working Process',
    content: (
      <div className="space-y-5 max-w-5xl mx-auto">
        <p className="text-slate-600 text-xs sm:text-sm text-center">
          Transparent, structural planning coordination at every layout stage to completely remove structural delays.
        </p>

        <div className="grid grid-cols-5 gap-3 pt-2">
          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center relative">
            <span className="w-7 h-7 rounded-full bg-[#1960a3] text-white flex items-center justify-center mx-auto text-xs font-black">1</span>
            <strong className="text-xs text-[#002045] block mt-2">Discuss</strong>
            <p className="text-[9px] text-slate-450 mt-1 leading-tight">Identify total sensible heat & CFM Sizing plans.</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center relative">
            <span className="w-7 h-7 rounded-full bg-[#1960a3] text-white flex items-center justify-center mx-auto text-xs font-black">2</span>
            <strong className="text-xs text-[#002045] block mt-2">Visit</strong>
            <p className="text-[9px] text-slate-450 mt-1 leading-tight">Inspect ceiling clearances and duct paths.</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center relative">
            <span className="w-7 h-7 rounded-full bg-[#1960a3] text-white flex items-center justify-center mx-auto text-xs font-black">3</span>
            <strong className="text-xs text-[#002045] block mt-2">Recommend</strong>
            <p className="text-[9px] text-slate-450 mt-1 leading-tight">Draft layout drafts and custom equipment options.</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center relative">
            <span className="w-7 h-7 rounded-full bg-[#1960a3] text-white flex items-center justify-center mx-auto text-xs font-black">4</span>
            <strong className="text-xs text-[#002045] block mt-2">Install</strong>
            <p className="text-[9px] text-slate-450 mt-1 leading-tight">Double-insulated pipes laying & silver welding.</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center relative">
            <span className="w-7 h-7 rounded-full bg-[#1960a3] text-white flex items-center justify-center mx-auto text-xs font-black">5</span>
            <strong className="text-xs text-[#002045] block mt-2">Support</strong>
            <p className="text-[9px] text-slate-450 mt-1 leading-tight">On-site scheduled AMC audits and warranty covers.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: 'Commercial HVAC Solutions Catalog',
    theme: 'light',
    category: 'Our Services',
    content: (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-[#1960a3]">
          <strong className="text-xs text-[#002045] block">1. Technical Consultation</strong>
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">CFM mapping calculations, sound decibel optimization layouts and solar thermal audits.</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-[#1960a3]">
          <strong className="text-xs text-[#002045] block">2. HVAC Sizing & Sales</strong>
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Direct factory sourcing of certified Daikin & Voltas equipment, skipping intermediate dealer markups.</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-[#1960a3]">
          <strong className="text-xs text-[#002045] block">3. Custom AC Installation</strong>
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Professional pipe trenching, silver welding, structural mounts and flawless indoor grill settings.</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-[#ff7c1a]">
          <strong className="text-xs text-[#002045] block">4. Multi-Zone VRV Support</strong>
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Advanced variable volume loops designed for clubhouses, executive hotels and complex floor profiles.</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-[#ff7c1a]">
          <strong className="text-xs text-[#002045] block">5. Scheduled AMC Audits</strong>
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Coil high pressure washouts, scale removal, pressure checks and electrical relay protections.</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-[#ff7c1a]">
          <strong className="text-xs text-[#002045] block">6. Fast Breakdown Support</strong>
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Leak checks, sensor relays overhaul, fan blower corrections and urgent on-site engineer dispatch.</p>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: 'Clean Process. Better Outcome.',
    theme: 'light',
    category: 'Why Choose Us?',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <strong className="text-[#002045] block border-b pb-2 text-sm">3-Stage Engineering Timeline</strong>
            <div className="space-y-3.5 mt-3 text-xs">
              <p>
                <strong className="text-[#1960a3]">1. BEFORE:</strong> Site review, physical blueprint fitment survey and copper pipes layout mapping.
              </p>
              <p>
                <strong className="text-[#ff7c1a]">2. DURING:</strong> Certified silver welding, 450 PSI nitrogen pressure hold, and electronic vacuum testing.
              </p>
              <p>
                <strong className="text-[#10b981]">3. AFTER:</strong> Computerized airflow balancing, electric diagram handovers and maintenance tutorials.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 flex flex-col justify-between">
          <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            <strong className="text-xs text-[#002045] block">✓ Authorized Brand Partnerships</strong>
            <p className="text-[10px] text-slate-600 mt-0.5">Sourcing directly via Daikin Platinum and Voltas channels. Full warranties active.</p>
          </div>
          <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100">
            <strong className="text-xs text-[#002045] block">✓ Complete Commissioning Reports</strong>
            <p className="text-[10px] text-slate-600 mt-0.5">We measure and catalog airflow velocities, air dump balance and thermal ratings for transparency.</p>
          </div>
          <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
            <strong className="text-xs text-[#002045] block">✓ Responsive Maintenance Desk</strong>
            <p className="text-[10px] text-slate-600 mt-0.5">Helpline is directly monitored by senior mechanical managers to ensure prompt SLAs.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: 'Targeted High-Efficiency Solutions',
    theme: 'light',
    category: 'Industries Served',
    content: (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">H</div>
          <div>
            <strong className="text-xs text-[#002045] block">Hotels & Motels</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Guest rooms and massive lobbies.</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-[#ff7c1a] flex items-center justify-center shrink-0 font-bold text-xs">R</div>
          <div>
            <strong className="text-xs text-[#002045] block">Restaurants & Cafes</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Dining spaces & exhaust systems.</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#10b981] flex items-center justify-center shrink-0 font-bold text-xs">I</div>
          <div>
            <strong className="text-xs text-[#002045] block">Institutions & Labs</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Quiet classrooms & libraries.</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 font-bold text-xs">O</div>
          <div>
            <strong className="text-xs text-[#002045] block">Corporate Offices</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Zoned VRVs for open floors.</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs">S</div>
          <div>
            <strong className="text-xs text-[#002045] block">Showrooms & Retail</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Crowd-adaptive cooling structures.</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-bold text-xs">W</div>
          <div>
            <strong className="text-xs text-[#002045] block">Industrial Units</strong>
            <p className="text-[10px] text-slate-500 mt-0.5">Evaporative coolers & ventilators.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: 'On-Site Commissioning List',
    theme: 'light',
    category: 'Selected Work References',
    content: (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <strong className="text-xs text-[#002045] block font-extrabold">Lime Wood Stay</strong>
          <span className="text-[9px] text-slate-400 block font-mono">Sector 57, Gurugram</span>
          <span className="inline-block text-[9px] bg-sky-50 text-[#1960a3] px-2 py-0.5 rounded font-black mt-2">85 TR Daikin VRV Layouts</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <strong className="text-xs text-[#002045] block font-extrabold">Hotel Limon</strong>
          <span className="text-[9px] text-slate-400 block font-mono">Gurugram Town Area</span>
          <span className="inline-block text-[9px] bg-sky-50 text-[#1960a3] px-2 py-0.5 rounded font-black mt-2">70 TR Commercial VRF</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <strong className="text-xs text-[#002045] block font-extrabold">One Stayz Hotel</strong>
          <span className="text-[9px] text-slate-400 block font-mono">Sector 38 Near Medanta</span>
          <span className="inline-block text-[9px] bg-sky-50 text-[#1960a3] px-2 py-0.5 rounded font-black mt-2">60 TR Centralized VRV</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <strong className="text-xs text-[#002045] block font-extrabold">MOD Avenue Hotel</strong>
          <span className="text-[9px] text-slate-400 block font-mono">Cyber Area, DLF Phase 3</span>
          <span className="inline-block text-[9px] bg-sky-50 text-[#1960a3] px-2 py-0.5 rounded font-black mt-2">50 TR Ductable Package AC</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <strong className="text-xs text-[#002045] block font-extrabold">Shree Ram Dhaba</strong>
          <span className="text-[9px] text-slate-400 block font-mono">Sector 48 Gurugram</span>
          <span className="inline-block text-[9px] bg-sky-50 text-[#1960a3] px-2 py-0.5 rounded font-black mt-2">40 TR Ductable AC & Fans</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <strong className="text-xs text-[#002045] block font-extrabold">Zakir Husain College</strong>
          <span className="text-[9px] text-slate-400 block font-mono">Jawaharlal Nehru Marg, Delhi</span>
          <span className="inline-block text-[9px] bg-sky-50 text-[#1960a3] px-2 py-0.5 rounded font-black mt-2">120 TR VRV V-Series Installation</span>
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: 'Contact Us',
    theme: 'dark',
    category: 'SLA Support Desk',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="space-y-4">
          <h4 className="text-xl sm:text-3xl font-extrabold text-white">
            Let us support your next HVAC project.
          </h4>
          <p className="text-slate-300 text-xs sm:text-sm">
            Reach out directly for customized thermal blueprints, CFM Sizing reviews, and certified channel quotations.
          </p>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex gap-2.5">
              <Phone className="w-4 h-4 text-[#ff7c1a] shrink-0 mt-0.5" />
              <span><strong>Mob / Hotline:</strong> 9718145302</span>
            </div>
            <div className="flex gap-2.5">
              <Mail className="w-4 h-4 text-[#ff7c1a] shrink-0 mt-0.5" />
              <span><strong>Email:</strong> supercoolproject03@gmail.com</span>
            </div>
            <div className="flex gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>GST Reg No:</strong> 06AVSPJ3528R1ZR</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-4">
          <div>
            <strong className="text-white block mb-1">HEAD OFFICE:</strong>
            <p className="text-slate-400 leading-normal">
              FF-18 Signature Global, The Signum 36,<br />
              Sector 36 Sohna Road, Dhunela,<br />
              Gurugram, Haryana
            </p>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <strong className="text-white block mb-1">2ND OFFICE / CORRESPONDENCE:</strong>
            <p className="text-slate-400 leading-normal">
              H Block 1159, Sector 57,<br />
              Gurugram, Haryana - 122003
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 13,
    title: 'Slide Deck Complete',
    theme: 'light',
    category: 'Summary',
    content: (
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#002045]">
          Thank You
        </h2>
        <p className="text-slate-600 text-xs sm:text-base max-w-lg mx-auto">
          We look forward to partnering on your commercial buildings comfort, HVAC energy balance, and air filtration.
        </p>
        <span className="inline-block bg-blue-50 text-[#1960a3] border border-blue-100 px-4 py-1 rounded-full text-xs font-mono font-bold">
          Super Cool Project  •  Authorized Daikin & Voltas Channels
        </span>
      </div>
    )
  }
];

// Pure text representations of slides metadata for pdf rendering
const slidesDataText = [
  { theme: 'dark', category: 'Welcome Presentation', title: 'SUPER COOL PROJECT' },
  { theme: 'light', category: 'Company Snapshot', title: 'A Dependable HVAC Partner' },
  { theme: 'light', category: 'We Support', title: 'Complete HVAC Support' },
  { theme: 'dark', category: 'Selected Project Gallery', title: 'On-Site Execution Showcase' },
  { theme: 'light', category: 'Product Portfolio', title: 'Bespoke Engineering Product Line' },
  { theme: 'dark', category: 'Achievements', title: 'Hallmarks of Our Work' },
  { theme: 'light', category: 'Working Process', title: 'From Inquiry to Commissioning' },
  { theme: 'light', category: 'Our Services', title: 'Commercial HVAC Solutions Catalog' },
  { theme: 'light', category: 'Why Choose Us?', title: 'Clean Process. Better Outcome.' },
  { theme: 'light', category: 'Industries Served', title: 'Targeted High-Efficiency Solutions' },
  { theme: 'light', category: 'Selected Work References', title: 'On-Site Commissioning List' },
  { theme: 'dark', category: 'SLA Support Desk', title: 'Contact Us' },
  { theme: 'light', category: 'Summary', title: 'Slide Deck Complete' }
];
