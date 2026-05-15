import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'site-data.json');

export const defaultSiteData = {
  brand: {
    legalName: 'Vaaman Texprint Private Limited',
    shortName: 'Vaaman Texprint',
    tagline: 'Engineering excellence in textile processing',
  },
  images: {
    heroHome:
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=2400&q=80',
    heroAbout:
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=2400&q=80',
    heroProducts:
      'https://images.unsplash.com/photo-1465120232534-6129eec94400?auto=format&fit=crop&w=2400&q=80',
    heroInfrastructure:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80',
    heroContact:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2400&q=80',
    textileDetail:
      'https://images.unsplash.com/photo-1618415510828-92d0ccd8c22a?auto=format&fit=crop&w=1600&q=80',
    factoryFloor:
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=80',
    infrastructureCapability:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
  },
  company: {
    heroEyebrow: 'Vaaman Texprint Private Limited',
    heroHeading: 'Engineering Excellence in Textile Processing',
    heroSubtext:
      'Premium textile dyeing, processing, and manufacturing from Telangana — built for global quality, consistency, and scale.',
    about:
      'Vaaman Texprint Private Limited is a leading textile processing and manufacturing company based in Telangana, India, specializing in dyeing and processing of various fabric categories including cotton, polyester blends, viscose, lyocell, and cotton lycra.',
    background:
      'The company began with cotton–polyester processing and expanded systematically into multiple fabric categories.',
    vision:
      'To satisfy customers and meet global standards with superior quality and on-time delivery.',
    counters: [
      { label: 'Years Experience', numeric: 18, suffix: '+', duration: 1.6 },
      { label: 'Advanced Infrastructure', numeric: 10, suffix: '+', duration: 1.4 },
      { label: 'Global Quality Standards', numeric: 100, suffix: '%', duration: 1.8 },
      { label: 'Modern Machinery', numeric: 11, suffix: '+', duration: 1.5 },
    ],
    contact: {
      lines: [
        'Vaaman Texprint Private Limited',
        '3-96, Sy No. 171/A,',
        'Chinnaravirala,',
        'Hayathnagar,',
        'Rangareddy,',
        'Telangana – 501505',
      ],
      addressDisplay:
        'Vaaman Texprint Private Limited, 3-96, Sy No. 171/A, Chinnaravirala, Hayathnagar, Rangareddy, Telangana – 501505',
      phone: '9383847947',
      email: 'sales@vaaman.co',
      contactPerson: 'Marketing — Suresh Nouniya',
    },
    ctaHeading: 'Partner with a trusted textile manufacturing expert',
    ctaSubtext: 'Share your fabric class, program volumes, and quality benchmarks.',
  },
  whyChooseUs: [
    {
      title: 'Modern Infrastructure',
      description: 'Purpose-built production zones designed for flow, safety, and repeatable quality.',
    },
    {
      title: 'Advanced Textile Machinery',
      description: 'Industrial lines engineered for singeing, mercerizing, padding, stenters, printing, and finishing.',
    },
    {
      title: 'Quality Assurance',
      description: 'Measured checks for shade integrity, hand-feel, dimensional stability, and defect prevention.',
    },
    {
      title: 'Timely Delivery',
      description: 'Planning and execution aligned to dispatch commitments — without compromising standards.',
    },
    {
      title: 'Global Standard Processing',
      description: 'Processes tuned for consistency, fastness, and performance demanded by export programs.',
    },
    {
      title: 'Experienced Manufacturing Team',
      description: 'Operators and technical leadership with deep textile manufacturing expertise across fabric categories.',
    },
  ],
  homeProductPreviews: [
    {
      title: 'Cotton Fabric Processing',
      description: 'Preparation through finishing tuned for natural fibre behaviour and premium shade depth.',
    },
    {
      title: 'Polyester Cotton Processing',
      description: 'Blend-aware treatments designed for durability, stable hand-feel, and uniform dye uptake.',
    },
    {
      title: 'Viscose Fabric Processing',
      description: 'Careful handling for regenerated fibres with moisture-aware processing discipline.',
    },
    {
      title: 'Lyocell Processing',
      description: 'Precision programmes built for clean surfaces, refined hand-feel, and elevated colour clarity.',
    },
    {
      title: 'Cotton Lycra Processing',
      description: 'Stretch-aware processing engineered to protect recovery, seams, surface appearance, and uniform colour.',
    },
    {
      title: 'Dyeing & Finishing',
      description: 'Repeatable colour pipelines with finishing built for end-use performance and consistent fastness.',
    },
    {
      title: 'Textile Printing',
      description: 'Rotary workflows for sharp definition, fine repeats, and production-scale reliability.',
    },
    {
      title: 'Industrial Fabric Processing',
      description: 'Processing pathways aligned to technical specifications, stability, and downstream performance.',
    },
  ],
  products: [
    {
      id: 'dyeing',
      title: 'Dyeing',
      summary: 'Controlled colour science for repeatable shades and robust fastness.',
      body: 'Our dyeing approach emphasizes recipe discipline and machine parameters matched to fibre class.',
      features: ['Recipe-controlled pipelines', 'Fibre-specific curves', 'Shade consistency focus'],
    },
    {
      id: 'textile-processing',
      title: 'Textile Processing',
      summary: 'End-to-end preparation and treatment sequences.',
      body: 'From desizing and scouring through specialized treatments for dyeing, printing, or finishing.',
      features: ['Sequenced treatments', 'Throughput planning', 'Defect prevention mindset'],
    },
    {
      id: 'cotton',
      title: 'Cotton Processing',
      summary: 'Natural-fibre expertise with emphasis on handle and lustre.',
      body: 'Cotton programmes balance cleaning, bleaching, and dye uptake.',
      features: ['Natural fibre expertise', 'Handle & lustre control', 'Lot traceability'],
    },
    {
      id: 'polyester-cotton',
      title: 'Polyester Cotton Processing',
      summary: 'Blend-aware parameters for even dye distribution.',
      body: 'Polycot workflows account for differential dye affinity and thermal sensitivity.',
      features: ['Blend-aware recipes', 'Thermal discipline', 'Durability-oriented finishing'],
    },
    {
      id: 'viscose',
      title: 'Viscose Fabric Processing',
      summary: 'Low-tension, moisture-aware handling for regenerated cellulosics.',
      body: 'Viscose processing emphasizes gentle mechanical action and controlled chemistry.',
      features: ['Gentle mechanical profiles', 'Moisture control', 'Surface quality focus'],
    },
    {
      id: 'lyocell',
      title: 'Lyocell Processing',
      summary: 'Precision processing for premium hand-feel and colour clarity.',
      body: 'Lyocell programmes prioritize fibrillation control and finishing selection.',
      features: ['Fibrillation awareness', 'Premium finishing paths', 'Aesthetic clarity'],
    },
    {
      id: 'cotton-lycra',
      title: 'Cotton Lycra Processing',
      summary: 'Stretch constructions processed with recovery in mind.',
      body: 'Elastane-inclusive fabrics are run with tension discipline and heat management.',
      features: ['Tension discipline', 'Recovery protection', 'Uniform colour fields'],
    },
    {
      id: 'printing',
      title: 'Textile Printing',
      summary: 'Rotary printing for bold graphics at production scale.',
      body: 'Printing operations supported by robust preparation and finishing.',
      features: ['Rotary production mindset', 'Repeat precision', 'Finishing integration'],
    },
    {
      id: 'finishing',
      title: 'Fabric Finishing',
      summary: 'Final treatments that define hand-feel and performance.',
      body: 'Finishing stabilizes dimensions and aligns fabric performance to specification.',
      features: ['Dimensional stability', 'Performance alignment', 'Premium touch control'],
    },
  ],
  machinery: [
    { name: 'Osthoff Senge Singeing Machine', note: 'Surface fibre control for clean dye uptake' },
    { name: 'Dhall CBR Machine', note: 'Continuous bleaching range preparation' },
    { name: 'Menzel Mercerizer', note: 'Mercerizing for lustre, strength, and dye affinity' },
    { name: 'Menzel Maxi Squeezer', note: 'Controlled expression for even wet pickup' },
    { name: 'Kuster Padding Machines', note: 'Precision padding for consistent chemical application' },
    { name: '4 Bowl and 5 Bowl Calendars', note: 'Calendering for finish, gloss, and fabric stability' },
    { name: 'Monforts Stenter', note: 'Heat-setting and finishing with width control' },
    { name: 'Hi-Tech Stenter', note: 'Advanced stentering for critical dimensional programs' },
    { name: 'Stork Rotary Printing Machine', note: 'High-definition rotary printing at production scale' },
    { name: 'Dhall Soaper', note: 'Washing sequences for fastness and cleanliness' },
    { name: 'Dhall Zero-Zero Machines', note: 'Specialized finishing and treatment support' },
  ],
  timeline: [
    { year: 'Foundations', title: 'Processing roots', detail: 'Started with cotton–polyester processing.' },
    { year: 'Expansion', title: 'Multi-fibre capability', detail: 'Extended into viscose, lyocell, cotton lycra.' },
    { year: 'Today', title: 'Industrial scale', detail: 'Integrated machinery lines with export-oriented quality.' },
  ],
  infrastructureHighlights: [
    'Production planning aligned to dispatch commitments',
    'Singeeing, mercerizing, and continuous ranges',
    'Padding, exhaust dyeing, polyester dyeing',
    'Rotary printing and finishing lines',
  ],
  infrastructureCapability: {
    title: 'For best quality and quantity production',
    body: 'Each line is operated within documented parameters — so approvals translate into repeatable bulk performance with skilled workers, experienced staff, dedicated officers, and full support of management.',
  },
  pages: {
    products: {
      eyebrow: 'Products',
      title: 'Processing disciplines each tuned to fibre behaviour',
      subtitle: 'Preprocess, dyeing, printing and finishing',
      sectionEyebrow: 'Programmes',
      sectionTitle: 'Nine specialist programmes — one quality bar',
      sectionSubtitle: 'Select a programme to understand how we engineer outcomes for your fabric class.',
    },
    infrastructure: {
      eyebrow: 'Infrastructure',
      title: 'For best quality and quantity production',
    },
  },
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultSiteData, null, 2), 'utf8');
  }
}

export function readSiteData() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

export function writeSiteData(data) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  return data;
}

export { DATA_FILE, DATA_DIR };
