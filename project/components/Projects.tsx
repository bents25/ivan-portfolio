'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Zap, Target, CheckCircle, TrendingUp } from 'lucide-react';
import type { Project } from '@/types/project';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4F46E5]/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00E5FF] text-sm font-semibold tracking-widest uppercase mb-3 block">
            Featured Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Automation{' '}
            <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Real-world AI automation systems that solve genuine business problems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col gap-10"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={cardVariants}
      className="glass-card rounded-2xl overflow-hidden border border-white/8 hover:border-[#4F46E5]/40 transition-all duration-500 group"
    >
      <div className={`grid lg:grid-cols-2 gap-0 ${isEven ? '' : 'lg:grid-flow-dense'}`}>
        {/* Image */}
        <div className={`relative h-64 sm:h-80 lg:h-auto overflow-hidden ${isEven ? '' : 'lg:col-start-2'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 to-[#00E5FF]/10 z-10 opacity-60" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
          {/* Category badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#4F46E5]/80 text-white backdrop-blur-sm border border-[#4F46E5]/50">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`p-8 lg:p-10 flex flex-col justify-between ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              {project.title}
            </h3>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              {project.shortDescription}
            </p>

            {/* Problem / Solution */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="glass-card rounded-xl p-4 border border-red-500/15">
                <div className="flex items-center gap-2 text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  <Target className="w-3 h-3" />
                  Problem
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{project.problem}</p>
              </div>
              <div className="glass-card rounded-xl p-4 border border-[#22C55E]/15">
                <div className="flex items-center gap-2 text-[#22C55E] text-xs font-semibold uppercase tracking-wide mb-2">
                  <Zap className="w-3 h-3" />
                  Solution
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-[#4F46E5]/15 text-[#4F46E5] border border-[#4F46E5]/25"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-[#00E5FF] text-sm font-semibold hover:text-white transition-colors group/btn"
          >
            <ExternalLink className="w-4 h-4" />
            {expanded ? 'Hide' : 'View'} Workflow Details
            {expanded
              ? <ChevronUp className="w-4 h-4 group-hover/btn:translate-y-[-2px] transition-transform" />
              : <ChevronDown className="w-4 h-4 group-hover/btn:translate-y-[2px] transition-transform" />
            }
          </button>
        </div>
      </div>

      {/* Expanded section */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="border-t border-white/8 p-8 lg:p-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Features */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#4F46E5]" />
                Workflow Features
              </h4>
              <ul className="space-y-2">
                {project.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-[#4F46E5] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Impact */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                Business Impact
              </h4>
              <ul className="space-y-2">
                {project.impact.map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture summary */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00E5FF]" />
                Workflow Architecture
              </h4>
              <div className="glass-card rounded-xl p-4 border border-[#00E5FF]/15">
                <div className="flex flex-wrap gap-2">
                  {project.features.map((step, idx) => (
                    <div key={step} className="flex items-center gap-1">
                      <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">
                        {step}
                      </span>
                      {idx < project.features.length - 1 && (
                        <span className="text-[#00E5FF]/40 text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
