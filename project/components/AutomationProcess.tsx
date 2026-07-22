'use client';

import { motion } from 'framer-motion';
import {
  Search, PenTool, Brain, Code2, FlaskConical, Rocket, BarChart3,
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'Understanding your business processes, pain points, and automation opportunities.',
    color: '#4F46E5',
  },
  {
    icon: PenTool,
    title: 'Workflow Design',
    description: 'Mapping out the complete automation logic, data flow, and decision trees.',
    color: '#00E5FF',
  },
  {
    icon: Brain,
    title: 'AI Logic',
    description: 'Selecting and configuring AI models, crafting prompts, and structuring outputs.',
    color: '#8B5CF6',
  },
  {
    icon: Code2,
    title: 'Development',
    description: 'Building the automation in n8n with all integrations, APIs, and error handling.',
    color: '#4F46E5',
  },
  {
    icon: FlaskConical,
    title: 'Testing',
    description: 'Thorough testing with real data, edge cases, and failure scenarios.',
    color: '#00E5FF',
  },
  {
    icon: Rocket,
    title: 'Deployment',
    description: 'Deploying to production, configuring webhooks, and ensuring reliability.',
    color: '#22C55E',
  },
  {
    icon: BarChart3,
    title: 'Optimization',
    description: 'Monitoring performance, refining AI prompts, and improving efficiency over time.',
    color: '#F59E0B',
  },
];

export default function AutomationProcess() {
  return (
    <section id="process" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00E5FF]/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-[#00E5FF] text-sm font-semibold tracking-widest uppercase mb-3 block">
            How I Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Automation{' '}
            <span className="text-gradient-accent">Process</span>
          </h2>
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
            A structured approach from discovery to deployed, optimized automation.
          </p>
        </motion.div>

        {/* Timeline — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-[2px] mx-[calc(100%/14)]"
            style={{ background: 'linear-gradient(90deg, transparent, #4F46E5, #00E5FF, #22C55E, transparent)' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <ProcessStep key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center lg:gap-0 group"
    >
      {/* Step number + icon */}
      <div className="relative flex flex-col items-center">
        {/* Number badge */}
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-background border border-foreground/20 flex items-center justify-center z-10">
          <span className="text-[9px] font-bold text-foreground/50">{index + 1}</span>
        </div>

        {/* Icon circle */}
        <div
          className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center glass-card border group-hover:scale-110 transition-all duration-300 relative z-10"
          style={{
            borderColor: step.color + '40',
            boxShadow: `0 0 20px ${step.color}20`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: step.color }} />
          {/* Glow on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: `0 0 25px ${step.color}40`, background: `${step.color}10` }}
          />
        </div>

        {/* Connector arrow (mobile) */}
        <div className="lg:hidden w-[2px] h-6 mt-2" style={{ background: step.color + '40' }} />
      </div>

      <div className="mt-4 lg:mt-5 px-1">
        <h3 className="text-sm font-bold text-foreground mb-2">{step.title}</h3>
        <p className="text-foreground/45 text-xs leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}
