'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerParent = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/**
 * Reveal a block of words with a stagger, used for headlines.
 */
export function WordsReveal({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <Tag className={className}>
      {reduce ? (
        text
      ) : (
        <motion.span
          variants={staggerParent(0.08, delay)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="inline-block"
        >
          {words.map((w, i) => (
            <span key={i} className="reveal-line">
              <motion.span
                variants={fadeUp}
                className="inline-block"
                style={{ willChange: 'transform, opacity' }}
              >
                {w}
                {i < words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </motion.span>
      )}
    </Tag>
  );
}

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export { motion };
