'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

const CREDENTIALS = [
  { icon: '✦', text: 'Award-Winning Aesthetic Clinic' },
  { icon: '✦', text: '5,000+ Patients Treated' },
  { icon: '✦', text: 'Expert Medical Practitioners' },
  { icon: '✦', text: 'Batumi\'s Premier Aesthetic Clinic' },
  { icon: '✦', text: 'International Medical Standards' },
  { icon: '✦', text: 'Certified Aesthetic Procedures' },
];

export function PressBar() {
  const shouldReduceMotion = useReducedMotion();
  const doubled = [...CREDENTIALS, ...CREDENTIALS];

  return (
    <div
      className="bg-[#1c1c1c] py-3.5 overflow-hidden"
      aria-label="Clinic credentials"
    >
      <div className="flex">
        <motion.div
          className="flex shrink-0 gap-12 items-center"
          animate={shouldReduceMotion ? {} : { x: ['0%', '-50%'] }}
          transition={shouldReduceMotion ? {} : {
            duration: 28,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-5 shrink-0">
              <span className="text-[#b5453a] text-[10px]">{item.icon}</span>
              <span className="text-[0.5625rem] tracking-[0.2em] uppercase
                text-white/50 whitespace-nowrap font-light">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
