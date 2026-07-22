'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Briefcase, ArrowRight, CalendarDays } from 'lucide-react';

function OnlineJobsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L2 7l10 5 10-5-10-5z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  );
}

const links = [
  {
    icon: Mail,
    label: 'Email',
    description: 'siaoivan@gmail.com',
    href: 'mailto:siaoivan@gmail.com',
    color: '#4F46E5',
    gradient: 'from-[#4F46E5] to-[#6366f1]',
    external: false,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    description: 'Connect professionally',
    href: 'https://www.linkedin.com/in/ivan-xavier-siao',
    color: '#0A66C2',
    gradient: 'from-[#0A66C2] to-[#0077B5]',
    external: true,
  },
  {
    icon: Briefcase,
    label: 'Upwork',
    description: 'Hire on Upwork',
    href: 'https://www.upwork.com/freelancers/~01147a82ca574ff971?mp_source=share',
    color: '#14A800',
    gradient: 'from-[#14A800] to-[#22C55E]',
    external: true,
  },
  {
    icon: OnlineJobsIcon,
    label: 'OnlineJobs.ph',
    description: 'View my profile',
    href: 'https://www.onlinejobs.ph/jobseekers/info/4092762',
    color: '#0EA5E9',
    gradient: 'from-[#0EA5E9] to-[#0284C7]',
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4F46E5]/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#4F46E5]/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#00E5FF] text-sm font-semibold tracking-widest uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Let&apos;s Build Your Next{' '}
            <span className="text-gradient-primary">Automation</span>
          </h2>
          <p className="text-foreground/55 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Whether you need AI-powered customer support, lead qualification, CRM automation,
            or a custom workflow, I&apos;d be happy to discuss your project.
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8"
        >
          {links.map(link => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group glass-card-hover rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-3 text-center"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  style={{ boxShadow: `0 0 20px ${link.color}30` }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm sm:text-base">{link.label}</div>
                  <div className="text-foreground/45 text-xs sm:text-sm mt-1">{link.description}</div>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: link.color }}>
                  Connect <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            );
          })}
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl border border-[#4F46E5]/25 p-8"
        >
          <p className="text-foreground/50 text-sm mb-6">Ready to get started?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:siaoivan@gmail.com"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base"
            >
              <Mail className="w-5 h-5" />
              Send Me a Message
            </a>
            {/* Cal.com book-a-call button */}
            <button
              data-cal-link="ivan-siao/30min"
              data-cal-namespace="30min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
              className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base cursor-pointer"
            >
              <CalendarDays className="w-5 h-5" />
              Book a Free Call
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
