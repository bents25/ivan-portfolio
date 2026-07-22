'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Briefcase, ArrowRight, CalendarDays } from 'lucide-react';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}

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
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    description: '+63 950 516 9307',
    href: 'https://api.whatsapp.com/send?phone=639505169307',
    color: '#25D366',
    gradient: 'from-[#25D366] to-[#128C7E]',
    external: true,
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
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 mb-8"
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
          className="glass-card rounded-2xl border border-[#4F46E5]/25 p-6 sm:p-8"
        >
          <p className="text-foreground/50 text-sm mb-6">Ready to get started?</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
            <a
              href="mailto:siaoivan@gmail.com"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl font-semibold text-base"
            >
              <Mail className="w-5 h-5" />
              Send Me a Message
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=639505169307"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 0 20px rgba(37, 211, 102, 0.3)' }}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Message on WhatsApp
            </a>
            {/* Cal.com book-a-call button */}
            <button
              data-cal-link="ivan-siao/30min"
              data-cal-namespace="30min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
              className="btn-outline inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl font-semibold text-base cursor-pointer"
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
