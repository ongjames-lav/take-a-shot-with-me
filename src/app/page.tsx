'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Animation variants
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pawPrintAnimation = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: [0.3, 0.5, 0.3],
    scale: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background with decorative elements - Ensure it's behind other content */}
      <div className="absolute inset-0 z-0" style={{ position: 'absolute' }}>
        {/* Use the uploaded background image */}
        <Image
          src="/assets/images/bg.svg"
          alt="Playful background illustration"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />

        {/* Decorative paw prints - Keep or adjust based on new background */}
        {/* Add your decorative paw prints and circles here if needed */}
         <motion.div
           className="absolute top-1/4 left-1/4 w-12 h-12 opacity-30 bg-orange-500 rounded-full"
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.8, 1, 0.8] }}
           transition={{
             duration: 3,
             repeat: Infinity,
             ease: "easeInOut"
           }}
         />
         <motion.div
           className="absolute bottom-1/3 right-1/4 w-8 h-8 opacity-30 bg-orange-500 rounded-full"
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.8, 1, 0.8] }}
           transition={{
             duration: 3,
             repeat: Infinity,
             ease: "easeInOut",
             delay: 1
           }}
         />
         <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-orange-100 rounded-full opacity-50 blur-xl" />
         <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-orange-100 rounded-full opacity-50 blur-xl" />
      </div>

      {/* Main Content - Centered using flexbox, adjusted spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4"
        style={{ minHeight: '80vh' }} // Ensure content container takes up significant height for centering
      >
        {/* Title with adjusted styling and positioning */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-4xl md:text-6xl font-bold"
          style={{
            color: '#ffcf72', // Text color
            textShadow: '-1px -1px 0 #7c321b, 1px -1px 0 #7c321b, -1px 1px 0 #7c321b, 1px 1px 0 #7c321b', // Outline effect
            fontSize: 'min(10vw, 80px)',
            fontFamily: 'Michegar, sans-serif', // Applied Michegar font
            marginBottom: '40px' // Increased space below the title to push illustration down
          }}
        >
          take a shot w/ me {/* Lowercase text */}
        </motion.h1>

        {/* Main Illustration Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative w-full max-w-2xl mx-auto aspect-square rounded-3xl shadow-lg overflow-hidden mb-12"
        >
          {/* Placeholder for your custom illustration */}
            <div className="relative w-full h-full flex items-center justify-center">
              <p className="text-gray-500 text-lg">Your Custom Illustration Goes Here</p>
            </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
           <motion.div
             className="absolute -inset-4 bg-orange-100 rounded-full blur-xl opacity-50"
             animate={{
               scale: [1, 1.1, 1],
               opacity: [0.5, 0.3, 0.5],
             }}
             transition={{
               duration: 2,
               repeat: Infinity,
               ease: "easeInOut"
             }}
           />
          <Button
            size="lg"
            onClick={() => router.push('/camera')}
            className="shadow-lg relative z-10"
          >
            START
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
