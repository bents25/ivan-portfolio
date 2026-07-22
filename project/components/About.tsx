'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Workflow, Bot, Cpu, Globe, FileSpreadsheet, Zap, Database, Mail,
  Code, MessageSquare, Settings, Building,
} from 'lucide-react';

const skills = [
  { label: 'n8n', icon: Workflow, color: '#FF6B35' },
  { label: 'Workflow Automation', icon: Settings, color: '#4F46E5' },
  { label: 'OpenAI', icon: Bot, color: '#10B981' },
  { label: 'Google Gemini', icon: Cpu, color: '#4285F4' },
  { label: 'Groq', icon: Zap, color: '#F59E0B' },
  { label: 'REST APIs', icon: Globe, color: '#00E5FF' },
  { label: 'Webhooks', icon: Code, color: '#8B5CF6' },
  { label: 'Google Workspace', icon: Building, color: '#EA4335' },
  { label: 'Google Sheets', icon: FileSpreadsheet, color: '#34A853' },
  { label: 'Prompt Engineering', icon: MessageSquare, color: '#4F46E5' },
  { label: 'AI Agents', icon: Database, color: '#00E5FF' },
  { label: 'Business Process Automation', icon: Mail, color: '#22C55E' },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4F46E5]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00E5FF] text-sm font-semibold tracking-widest uppercase mb-3 block">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold">
            The Engineer{' '}
            <span className="text-gradient-primary">Behind</span>{' '}
            the Automation
          </h2>
        </motion.div>

        {/* Top row: photo + bio */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-12 items-start mb-16">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-full lg:h-[340px] rounded-2xl overflow-hidden">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-[#4F46E5]/40 z-10" />
              <div className="absolute -inset-2 bg-gradient-to-br from-[#4F46E5]/30 via-transparent to-[#00E5FF]/20 rounded-3xl blur-xl -z-10" />
              <Image
                src="/images/portfolio/portfolio_image.png"
                alt="Ivan Xavier Siao — AI Automation Engineer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 288px, 340px"
                priority
              />
              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/30 to-transparent z-10" />
            </div>

            {/* Name card below photo */}
            <div className="mt-4 glass-card rounded-xl px-5 py-3 border border-foreground/10 w-full text-center lg:text-left">
              <div className="font-bold text-foreground text-base">Ivan Xavier Siao</div>
              <div className="text-[#00E5FF] text-sm">AI Automation Engineer</div>
            </div>
          </motion.div>

          {/* Bio + highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-5 text-foreground/60 text-base leading-relaxed mb-8">
              <p>
                I specialize in building AI-powered automation systems using n8n and modern AI models.
                My focus is creating practical workflows that eliminate repetitive tasks, improve operational
                efficiency, and help businesses respond faster to customers.
              </p>
              <p>
                From AI sales pipelines to customer support agents and industry-specific assistants,
                I enjoy designing automations that solve real business problems through intelligent
                workflow engineering.
              </p>
              <p>
                Every system I build is production-ready — with proper error handling, monitoring,
                and documentation so your team can maintain it with confidence.
              </p>
            </div>

            {/* Highlight boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: 'n8n Expert', label: 'Primary Platform' },
                { value: 'OpenAI & Gemini', label: 'AI Models' },
                { value: 'Webhook APIs', label: 'Integration Method' },
                { value: '24/7 Systems', label: 'Deployment Target' },
              ].map(item => (
                <div key={item.label} className="glass-card rounded-xl p-4 border border-foreground/8">
                  <div className="text-foreground font-semibold text-sm">{item.value}</div>
                  <div className="text-foreground/40 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#00E5FF] text-sm font-semibold tracking-widest uppercase mb-6 block text-center">
            Technical Skills
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {skills.map((skill, index) => (
              <SkillCard key={skill.label} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="glass-card-hover rounded-xl p-4 text-center cursor-default"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
        style={{ background: skill.color + '20', border: `1px solid ${skill.color}30` }}
      >
        <Icon className="w-5 h-5" style={{ color: skill.color }} />
      </div>
      <span className="text-foreground/75 text-xs font-medium leading-tight block">
        {skill.label}
      </span>
    </motion.div>
  );
}
