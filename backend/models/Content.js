import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  hero: {
    heading: { type: String, default: 'Engineering Excellence in Textile Processing' },
    subtext: { type: String, default: 'Over 22 years of expertise in dyeing, processing, and manufacturing high-quality fabrics.' },
    backgroundImage: { type: String, default: '' }
  },
  about: {
    title: { type: String, default: 'About Vaaman Texprint' },
    description: { type: String, default: 'Vaaman Texprint Private Limited is an active, 22-year-old textile manufacturing company based in Telangana, India, specializing in dyeing, processing, and manufacturing wearing apparel. Established in 2004, the company is located in Hayathnagar, Rangareddy district.' },
    image: { type: String, default: '' }
  },
  counters: [
    {
      label: { type: String, default: 'Years Experience' },
      value: { type: Number, default: 22 }
    },
    {
      label: { type: String, default: 'Authorized Capital' },
      value: { type: String, default: '₹4 Cr' }
    },
    {
      label: { type: String, default: 'Infrastructure' },
      value: { type: String, default: 'Industrial Grade' }
    }
  ],
  infrastructure: {
    title: { type: String, default: 'Our Infrastructure' },
    description: { type: String, default: 'State-of-the-art manufacturing facilities equipped with modern technology.' },
    images: [{ type: String }]
  },
  whyChooseUs: {
    title: { type: String, default: 'Why Choose Us' },
    features: [
      {
        title: { type: String, default: 'Experienced Team' },
        description: { type: String, default: 'Highly skilled professionals with decades of industry experience.' }
      },
      {
        title: { type: String, default: 'Quality Assurance' },
        description: { type: String, default: 'Rigorous quality control processes ensuring premium output.' }
      },
      {
        title: { type: String, default: 'Scalable Production' },
        description: { type: String, default: 'Capacity to handle large-scale production requirements.' }
      },
      {
        title: { type: String, default: 'Compliance & Standards' },
        description: { type: String, default: 'Adherence to industry standards and environmental regulations.' }
      }
    ]
  }
}, { timestamps: true });

export default mongoose.model('Content', contentSchema);
