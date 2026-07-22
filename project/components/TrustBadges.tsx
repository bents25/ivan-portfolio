'use client';

import { motion } from 'framer-motion';

const badges = [
  'AI Automation',
  'n8n',
  'OpenAI',
  'Google Gemini',
  'Groq',
  'Google Workspace',
  'Gmail',
  'Google Sheets',
  'Webhook APIs',
  'CRM Automation',
  'Workflow Automation',
  'REST APIs',
  'Prompt Engineering',
  'AI Agents',
];

export default function TrustBadges() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4F46E5]/3 to-transparent" />
      <hr className="section-divider mb-12 mx-8" />

      <div className="max-w-6xl mx-auto px-4 text-center mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-foreground/40 text-sm font-medium tracking-widest uppercase"
        >
          Technologies &amp; Integrations
        </motion.p>
      </div>

      {/* Marquee row 1 */}
      <div className="relative overflow-hidden mb-4">
        <div className="flex gap-4 animate-[marquee_30s_linear_infinite]" style={{ width: 'max-content' }}>
          {[...badges, ...badges].map((badge, i) => (
            <BadgeChip key={`r1-${i}`} label={badge} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 reversed */}
      <div className="relative overflow-hidden">
        <div className="flex gap-4 animate-[marquee_25s_linear_infinite_reverse]" style={{ width: 'max-content' }}>
          {[...badges.slice(5), ...badges, ...badges.slice(0, 5)].map((badge, i) => (
            <BadgeChip key={`r2-${i}`} label={badge} accent />
          ))}
        </div>
      </div>

      <hr className="section-divider mt-12 mx-8" />

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

function BadgeChip({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap glass-card border transition-colors ${
        accent
          ? 'border-[#00E5FF]/20 text-[#00E5FF]/80'
          : 'border-[#4F46E5]/25 text-foreground/70'
      }`}
    >
      {label}
    </span>
  );
}
