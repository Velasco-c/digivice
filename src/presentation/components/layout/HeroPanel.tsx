import { motion, type Variants } from 'framer-motion';
import { Icon } from '@/presentation/components/ui/Icon';
import { formatNumber } from '@/shared/utils/format';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.075, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const TECH = ['React 19', 'TypeScript', 'Vite', 'Framer Motion'];

export function HeroPanel({ totalElements }: { totalElements: number }) {
  const total = totalElements || 1488;

  return (
    <motion.section
      className="hero"
      aria-labelledby="hero-title"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.p className="eyebrow" variants={itemVariants}>
        <span className="eyebrow__dot" />
        DIGITAL MONSTER SYSTEM
        <span className="eyebrow__slash">//</span>
        V2.0
      </motion.p>

      <motion.h1 className="hero__title" id="hero-title" variants={itemVariants}>
        Tu Digivice,
        <br />
        <span className="gradient-text">reimaginado</span>.
      </motion.h1>

      <motion.p className="hero__copy" variants={itemVariants}>
        Explora <strong>{formatNumber(total)}</strong> Digimon en una interfaz retro con
        búsqueda instantánea, fichas de escaneo y microinteracciones. Todo en vivo desde la
        Digi&nbsp;API.
      </motion.p>

      <motion.div className="hero__metrics" variants={itemVariants}>
        <div className="metric">
          <strong>{formatNumber(total)}</strong>
          <span>DIGIMON INDEXADOS</span>
        </div>
        <div className="metric">
          <strong className="metric__live">
            <i /> LIVE
          </strong>
          <span>DIGI-API v1</span>
        </div>
      </motion.div>

      <motion.ul className="tech-list" variants={itemVariants} aria-label="Tecnologías utilizadas">
        {TECH.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </motion.ul>

      <motion.div className="hero__cue" variants={itemVariants}>
        <span className="hero__cue-key">
          <Icon name="play" size={10} />
          START
        </span>
        <span>ABRE EL BUSCADOR DESDE EL DISPOSITIVO</span>
      </motion.div>
    </motion.section>
  );
}
