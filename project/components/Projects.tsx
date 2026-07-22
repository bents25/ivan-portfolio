'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Zap, Target, CheckCircle, TrendingUp, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import type { Project } from '@/types/project';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export default function Projects({ projects }: { projects: Project[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useState({ x: 0, y: 0 });

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex(prev => (prev === null ? null : (prev + 1) % projects.length));
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [projects.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex(prev => (prev === null ? null : (prev - 1 + projects.length) % projects.length));
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [projects.length]);

  const zoomIn = useCallback(() => setZoom(z => Math.min(z + ZOOM_STEP, MAX_ZOOM)), []);
  const zoomOut = useCallback(() => {
    setZoom(z => {
      const newZoom = Math.max(z - ZOOM_STEP, MIN_ZOOM);
      if (newZoom === 1) setPan({ x: 0, y: 0 });
      return newZoom;
    });
  }, []);
  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage, zoomIn, zoomOut, resetZoom]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    setIsDragging(true);
    dragStart[1]({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart[0].x, y: e.clientY - dragStart[0].y });
  };

  const handleMouseUp = () => setIsDragging(false);

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
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
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
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onImageClick={() => setLightboxIndex(index)}
            />
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Top bar: close + zoom controls */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {/* Zoom controls */}
              <div className="flex items-center gap-1 glass-card border border-white/15 rounded-full p-1">
                <button
                  onClick={zoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-white/60 text-xs font-medium px-1 min-w-[3rem] text-center tabular-nums">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={resetZoom}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full glass-card border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev / Next buttons */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-card border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-card border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image container */}
            <div
              className="relative w-full h-full sm:w-[90vw] sm:h-[85vh] sm:rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
                  style={{
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  }}
                >
                  <Image
                    src={projects[lightboxIndex].image}
                    alt={projects[lightboxIndex].title}
                    fill
                    className="object-contain p-4 sm:p-8"
                    sizes="100vw"
                    priority
                    draggable={false}
                  />
                </div>
              </motion.div>
            </div>

            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-center px-4 max-w-md" onClick={(e) => e.stopPropagation()}>
              <p className="text-white/80 text-sm font-medium">
                {projects[lightboxIndex].title}
              </p>
              <p className="text-white/40 text-xs mt-1">
                {lightboxIndex + 1} / {projects.length}
                {zoom > 1 && <span className="ml-2">· {Math.round(zoom * 100)}% · Drag to pan</span>}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onImageClick }: { project: Project; index: number; onImageClick: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={cardVariants}
      className="glass-card rounded-2xl overflow-hidden border border-foreground/8 hover:border-[#4F46E5]/40 transition-all duration-500 group"
    >
      <div className={`grid lg:grid-cols-2 gap-0 ${isEven ? '' : 'lg:grid-flow-dense'}`}>
        {/* Image — clickable */}
        <div className={`relative h-64 sm:h-80 lg:h-auto overflow-hidden cursor-pointer ${isEven ? '' : 'lg:col-start-2'}`} onClick={onImageClick}>
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
          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-white/15 text-white/70 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn className="w-3.5 h-3.5" />
            Click to view full size
          </div>
        </div>

        {/* Content */}
        <div className={`p-8 lg:p-10 flex flex-col justify-between ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
              {project.title}
            </h3>
            <p className="text-foreground/60 text-base leading-relaxed mb-6">
              {project.shortDescription}
            </p>

            {/* Problem / Solution */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="glass-card rounded-xl p-4 border border-red-500/15">
                <div className="flex items-center gap-2 text-red-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  <Target className="w-3 h-3" />
                  Problem
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed">{project.problem}</p>
              </div>
              <div className="glass-card rounded-xl p-4 border border-[#22C55E]/15">
                <div className="flex items-center gap-2 text-[#22C55E] text-xs font-semibold uppercase tracking-wide mb-2">
                  <Zap className="w-3 h-3" />
                  Solution
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed">{project.solution}</p>
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
            className="flex items-center gap-2 text-[#00E5FF] text-sm font-semibold hover:text-foreground transition-colors group/btn"
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
        <div className="border-t border-foreground/8 p-8 lg:p-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Features */}
            <div>
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#4F46E5]" />
                Workflow Features
              </h4>
              <ul className="space-y-2">
                {project.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/60">
                    <CheckCircle className="w-4 h-4 text-[#4F46E5] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Impact */}
            <div>
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                Business Impact
              </h4>
              <ul className="space-y-2">
                {project.impact.map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/60">
                    <CheckCircle className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture summary */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00E5FF]" />
                Workflow Architecture
              </h4>
              <div className="glass-card rounded-xl p-4 border border-[#00E5FF]/15">
                <div className="flex flex-wrap gap-2">
                  {project.features.map((step, idx) => (
                    <div key={step} className="flex items-center gap-1">
                      <span className="text-xs text-foreground/50 bg-foreground/5 px-2 py-1 rounded">
                        {step}
                      </span>
                      {idx < project.features.length - 1 && (
                        <span className="flow-arrow text-xs font-bold">→</span>
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
