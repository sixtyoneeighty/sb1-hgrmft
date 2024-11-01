import React from 'react';
import { Brain, Code, LineChart, Lock, Palette, Workflow } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';

const services = [
  {
    icon: Brain,
    title: 'Custom AI Development',
    description: 'Full-spectrum AI solutions tailored to your unique business needs.',
    features: [
      'Multi-model expertise (Claude, GPT, Gemini, Llama)',
      'Integration with existing systems',
      'Scalable architecture design',
      'Performance optimization',
      'Custom training and fine-tuning',
      'Continuous improvement cycles'
    ]
  },
  {
    icon: LineChart,
    title: 'Strategic AI Consulting',
    description: 'Expert guidance to transform your business with AI technology.',
    features: [
      'Business process analysis',
      'AI opportunity assessment',
      'Technology stack planning',
      'Implementation roadmap',
      'ROI projection and tracking',
      'Knowledge transfer and training'
    ]
  },
  {
    icon: Code,
    title: 'Technical Implementation',
    description: 'Robust development and integration services for seamless AI adoption.',
    features: [
      'System architecture design',
      'API development and integration',
      'Performance optimization',
      'Scalability planning',
      'Technical documentation',
      'Code quality assurance'
    ]
  },
  {
    icon: Lock,
    title: 'Security & Compliance',
    description: 'Ensuring your AI solutions meet the highest security standards.',
    features: [
      'Security assessment',
      'Compliance planning',
      'Data protection measures',
      'Access control systems',
      'Audit trail implementation',
      'Regular security updates'
    ]
  },
  {
    icon: Workflow,
    title: 'Process Automation',
    description: 'Streamline operations with intelligent automation solutions.',
    features: [
      'Workflow analysis',
      'Custom automation scripts',
      'Integration with existing tools',
      'Performance monitoring',
      'Error handling',
      'Automated reporting'
    ]
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive interfaces for AI-powered solutions.',
    features: [
      'User interface design',
      'Experience optimization',
      'Responsive layouts',
      'Accessibility compliance',
      'Visual consistency',
      'Interactive prototypes'
    ]
  }
];

export default function Services() {
  return (
    <div className="pt-24 pb-16">
      <PageHeader
        title="Our Services"
        subtitle="We're currently accepting a select number of projects - not because we're trying to be exclusive, but because we believe every client deserves our full attention and best work."
        className="mb-16"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
}