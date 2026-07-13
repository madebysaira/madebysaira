import { motion } from 'framer-motion';

/**
 * Reveal — lightweight scroll-triggered entrance.
 * Fades + rises content into view once, as the user scrolls.
 * Respects reduced-motion via Framer's built-in handling and stays
 * visible permanently (viewport once) so content is never hidden.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  className = '',
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
