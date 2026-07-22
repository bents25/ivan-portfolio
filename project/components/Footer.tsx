'use client';

import { Zap, Mail, Linkedin, Briefcase, ChevronUp } from 'lucide-react';

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

const socialLinks = [
  { icon: Mail, href: 'mailto:siaoivan@gmail.com', label: 'Email', external: false },
  { icon: WhatsAppIcon, href: 'https://wa.me/639505169307', label: 'WhatsApp', external: true },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ivan-xavier-siao', label: 'LinkedIn', external: true },
  { icon: Briefcase, href: 'https://www.upwork.com/freelancers/~01147a82ca574ff971?mp_source=share', label: 'Upwork', external: true },
  { icon: OnlineJobsIcon, href: 'https://www.onlinejobs.ph/jobseekers/info/4092762', label: 'OnlineJobs.ph', external: true },
];

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'Automation Process' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-foreground/5 pt-12 pb-8">
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#00E5FF] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-foreground">Ivan Xavier Siao</span>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed mb-4">
              AI Automation Specialist building intelligent workflows that save businesses hours every week.
            </p>
            <a
              href="https://wa.me/639505169307"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground text-sm transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              +63 950 516 9307
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-foreground/70 text-sm font-semibold uppercase tracking-wide mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-foreground/45 hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-foreground/70 text-sm font-semibold uppercase tracking-wide mb-4">Connect</h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map(social => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? '_blank' : undefined}
                    rel={social.external ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl glass-card border border-foreground/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-[#4F46E5]/50 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <hr className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/30 text-sm">
            &copy; {new Date().getFullYear()} Ivan Xavier Siao. All rights reserved.
          </p>
          <p className="text-foreground/20 text-xs">AI Automation Specialist</p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl glass-card border border-foreground/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-[#4F46E5]/50 transition-all duration-200 group"
            aria-label="Back to top"
          >
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
