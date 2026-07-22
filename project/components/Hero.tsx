'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

function WorkflowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = { x: number; y: number; vx: number; vy: number; radius: number; opacity: number; color: string };
    type Node = { x: number; y: number; label: string; pulse: number; color: string };

    const nodes: Node[] = [
      { x: 0.1, y: 0.3, label: 'Trigger', pulse: 0, color: '#4F46E5' },
      { x: 0.25, y: 0.55, label: 'AI Model', pulse: Math.PI * 0.5, color: '#00E5FF' },
      { x: 0.4, y: 0.25, label: 'Enrich', pulse: Math.PI, color: '#4F46E5' },
      { x: 0.55, y: 0.6, label: 'CRM', pulse: Math.PI * 1.5, color: '#22C55E' },
      { x: 0.7, y: 0.3, label: 'Email', pulse: 0.3, color: '#00E5FF' },
      { x: 0.85, y: 0.55, label: 'Follow-up', pulse: Math.PI * 0.8, color: '#4F46E5' },
      { x: 0.15, y: 0.72, label: 'Webhook', pulse: Math.PI * 1.2, color: '#22C55E' },
      { x: 0.47, y: 0.78, label: 'Qualify', pulse: Math.PI * 0.3, color: '#00E5FF' },
      { x: 0.78, y: 0.72, label: 'Score', pulse: Math.PI * 1.7, color: '#4F46E5' },
    ];

    const edges = [
      [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [4, 5],
      [1, 6], [6, 7], [7, 3], [4, 8], [8, 5],
    ];

    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? '#4F46E5' : '#00E5FF',
    }));

    let animFrame = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animFrame++;

      const isDark = document.documentElement.classList.contains('dark');
      const labelColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(79,70,229,0.65)';
      const edgeColor = isDark ? 'rgba(79,70,229,0.15)' : 'rgba(79,70,229,0.25)';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      const w = canvas.width;
      const h = canvas.height;

      edges.forEach(([from, to]) => {
        const a = nodes[from];
        const b = nodes[to];
        const x1 = a.x * w, y1 = a.y * h;
        const x2 = b.x * w, y2 = b.y * h;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = edgeColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        const progress = ((animFrame * 0.4 + from * 30 + to * 20) % 100) / 100;
        const px = x1 + (x2 - x1) * progress;
        const py = y1 + (y2 - y1) * progress;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00E5FF';
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      nodes.forEach(node => {
        const x = node.x * w;
        const y = node.y * h;
        const t = animFrame * 0.02 + node.pulse;
        const pulse = Math.sin(t) * 0.3 + 0.7;

        const grd = ctx.createRadialGradient(x, y, 0, x, y, 28);
        grd.addColorStop(0, node.color + '30');
        grd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.globalAlpha = pulse;
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = node.color + 'CC';
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        ctx.font = '10px system-ui';
        ctx.fillStyle = labelColor;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, x, y + 22);
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none', opacity: 'var(--canvas-opacity)' }}
    />
  );
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 sm:py-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 40%, var(--hero-gradient-1), transparent)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 70% 60%, var(--hero-gradient-2), transparent)` }} />
      </div>

      {/* Workflow animation canvas */}
      <WorkflowCanvas />

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#4F46E5]/30 mb-8 text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-foreground/70">Available for new projects</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
        >
          I Build{' '}
          <span className="text-gradient-primary">AI Automation</span>
          <br />
          Systems That Save Businesses
          <br />
          <span className="text-gradient-accent">Hours Every Week</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-foreground/60 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
        >
          I design intelligent workflows using AI and n8n to automate lead qualification,
          customer support, CRM updates, email communication, and business operations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToProjects}
            className="btn-primary px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 group"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={scrollToContact}
            className="btn-outline px-8 py-4 rounded-xl font-semibold text-base"
          >
            Let&apos;s Work Together
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-8 sm:gap-12"
        >
          {[
            { value: '4+', label: 'AI Systems Built' },
            { value: '100%', label: 'Workflow Automation' },
            { value: '24/7', label: 'Systems Running' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gradient-primary">{stat.value}</div>
              <div className="text-foreground/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
