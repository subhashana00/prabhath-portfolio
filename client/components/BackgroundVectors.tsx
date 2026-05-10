import { motion } from 'framer-motion';

const Vector = ({ 
  className, 
  delay = 0, 
  duration = 20, 
  initialRotate = 0 
}: { 
  className: string; 
  delay?: number; 
  duration?: number;
  initialRotate?: number;
}) => (
  <motion.div
    className={`absolute pointer-events-none opacity-[0.03] sm:opacity-[0.05] ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      rotate: [initialRotate, initialRotate + 10, initialRotate],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 0L119.509 80.4908L200 100L119.509 119.509L100 200L80.4908 119.509L0 100L80.4908 80.4908L100 0Z" fill="currentColor" />
    </svg>
  </motion.div>
);

const Square = ({ 
  className, 
  delay = 0, 
  duration = 15,
  initialRotate = 0
}: { 
  className: string; 
  delay?: number; 
  duration?: number;
  initialRotate?: number;
}) => (
  <motion.div
    className={`absolute pointer-events-none opacity-[0.03] sm:opacity-[0.05] ${className}`}
    animate={{
      y: [0, 40, 0],
      rotate: [initialRotate, initialRotate - 15, initialRotate],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    <div className="w-32 h-32 border-4 border-current rounded-3xl" />
  </motion.div>
);

export default function BackgroundVectors() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <Vector className="top-[10%] left-[5%] text-blue-500 w-40 h-40" delay={0} duration={25} initialRotate={15} />
      <Vector className="top-[60%] right-[10%] text-yellow-500 w-64 h-64" delay={2} duration={30} initialRotate={-10} />
      <Vector className="bottom-[10%] left-[15%] text-red-500 w-32 h-32" delay={1} duration={22} initialRotate={45} />
      
      <Square className="top-[40%] right-[5%] text-purple-500" delay={1.5} duration={18} initialRotate={20} />
      <Square className="bottom-[30%] left-[8%] text-green-500" delay={0.5} duration={20} initialRotate={-15} />
      
      {/* Neo-Brutalist Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  );
}
