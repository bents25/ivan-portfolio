'use client';

import { Zap, Mail, Linkedin, Briefcase, ChevronUp } from 'lucide-react';

const socialLinks = [
  { icon: Mail, href: 'mailto:siaoivan@gmail.com', label: 'Email', external: false },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ivan-xavier-siao', label: 'LinkedIn', external: true },
  { icon: Briefcase, href: 'https://www.upwork.com/freelancers/~01147a82ca574ff971?mp_source=share', label: 'Upwork', external: true },
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
    <footer className="relative border-t border-white/5 pt-12 pb-8">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#00E5FF] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">Ivan Xavier Siao</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              AI Automation Engineer building intelligent workflows that save businesses hours every week.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white/45 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map(social => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? '_blank' : undefined}
                    rel={social.external ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl glass-card border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#4F46E5]/50 transition-all duration-200"
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
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Ivan Xavier Siao. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">AI Automation Engineer</p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl glass-card border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#4F46E5]/50 transition-all duration-200 group"
            aria-label="Back to top"
          >
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
