'use client';

import { useEffect, useRef } from 'react';

type ParticleType = 'spark' | 'streak' | 'glow';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: ParticleType;
  rotation: number;
  rotationSpeed: number;
  life: number;      // 0–1, where 0 = born, 1 = faded out
  lifeSpeed: number; // how fast it ages
}

function createParticle(canvas: HTMLCanvasElement, type: ParticleType): Particle {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: type === 'spark'  ? 1 + Math.random() * 2
        : type === 'streak' ? 0.8 + Math.random() * 1.2
        : 3 + Math.random() * 5,
    speedY: type === 'glow'  ? 0.15 + Math.random() * 0.3
           : type === 'streak' ? 0.4 + Math.random() * 0.8
           : 0.3 + Math.random() * 0.6,
    speedX: (Math.random() - 0.5) * (type === 'streak' ? 0.8 : 0.25),
    opacity: type === 'glow' ? 0.04 + Math.random() * 0.06
           : type === 'spark' ? 0.4 + Math.random() * 0.4
           : 0.15 + Math.random() * 0.2,
    type,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
    life: 0,
    lifeSpeed: 0.0008 + Math.random() * 0.0012,
  };
}

function drawSpark(ctx: CanvasRenderingContext2D, p: Particle, alpha: number) {
  // 4-pointed star shape
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = `rgba(210, 170, 90, ${p.opacity})`;   // warm gold
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const outer = p.size * 2;
    const inner = p.size * 0.6;
    if (i === 0) ctx.moveTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
    else ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
    const halfAngle = angle + Math.PI / 4;
    ctx.lineTo(Math.cos(halfAngle) * inner, Math.sin(halfAngle) * inner);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawStreak(ctx: CanvasRenderingContext2D, p: Particle, alpha: number) {
  // Elongated line with tapered ends
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation + Math.PI / 4); // 45° angle
  ctx.globalAlpha = alpha;
  const gradient = ctx.createLinearGradient(0, -p.size * 12, 0, p.size * 12);
  gradient.addColorStop(0, 'rgba(210, 170, 90, 0)');
  gradient.addColorStop(0.5, `rgba(255, 220, 140, ${p.opacity})`);
  gradient.addColorStop(1, 'rgba(210, 170, 90, 0)');
  ctx.strokeStyle = gradient;
  ctx.lineWidth = p.size;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, -p.size * 12);
  ctx.lineTo(0, p.size * 12);
  ctx.stroke();
  ctx.restore();
}

function drawGlow(ctx: CanvasRenderingContext2D, p: Particle, alpha: number) {
  // Soft radial glow
  const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
  gradient.addColorStop(0, `rgba(255, 230, 160, ${p.opacity * alpha})`);
  gradient.addColorStop(0.5, `rgba(200, 150, 80, ${p.opacity * alpha * 0.4})`);
  gradient.addColorStop(1, 'rgba(180, 130, 60, 0)');
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle pool — fewer total, more visual variety
    const particles: Particle[] = [
      ...Array.from({ length: 8 }, () => createParticle(canvas, 'spark')),
      ...Array.from({ length: 6 }, () => createParticle(canvas, 'streak')),
      ...Array.from({ length: 5 }, () => createParticle(canvas, 'glow')),
    ];

    // Randomize starting Y positions so they're not all at the bottom at once
    particles.forEach(p => { p.y = Math.random() * canvas.height; });

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Move
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.life += p.lifeSpeed;

        // Fade in/out based on life (0→0.2 fade in, 0.8→1.0 fade out)
        const alpha = p.life < 0.2 ? p.life / 0.2
                    : p.life > 0.8 ? (1 - p.life) / 0.2
                    : 1;

        // Draw
        if (p.type === 'spark')  drawSpark(ctx, p, alpha);
        if (p.type === 'streak') drawStreak(ctx, p, alpha);
        if (p.type === 'glow')   drawGlow(ctx, p, alpha);

        // Recycle when off-screen or fully aged
        if (p.y < -30 || p.x < -30 || p.x > canvas.width + 30 || p.life >= 1) {
          const types: ParticleType[] = ['spark', 'streak', 'glow'];
          particles[i] = createParticle(canvas, types[i % 3]);
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}
