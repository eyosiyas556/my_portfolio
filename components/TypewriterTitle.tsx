'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  fullName: string;
  title: string;
}

export default function TypewriterTitle({ fullName, title }: TypewriterProps) {
  const nameParts = fullName.split(' ');
  const shortName = nameParts.length > 2 ? `${nameParts[0]} ${nameParts[1]}` : fullName;

  const line1 = "Hey,";
  const line2 = `I'm ${shortName}`;
  const line3 = title;

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  
  const [step, setStep] = useState<1 | 2 | 3 | 'pausing' | 'done'>(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop client-side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (step === 'done') return;

    let timer: NodeJS.Timeout;

    if (step === 1) {
      if (text1.length < line1.length) {
        timer = setTimeout(() => setText1(line1.slice(0, text1.length + 1)), 80);
      } else {
        timer = setTimeout(() => setStep(2), 200);
      }
    } else if (step === 2) {
      if (text2.length < line2.length) {
        timer = setTimeout(() => setText2(line2.slice(0, text2.length + 1)), 80);
      } else {
        timer = setTimeout(() => setStep(3), 200);
      }
    } else if (step === 3) {
      if (text3.length < line3.length) {
        timer = setTimeout(() => setText3(line3.slice(0, text3.length + 1)), 70);
      } else {
        // Finished typing all lines
        if (isMobile) {
          setStep('done'); // Stop looping on mobile
        } else {
          timer = setTimeout(() => setStep('pausing'), 3500); // Wait 3.5s before restarting on desktop
        }
      }
    } else if (step === 'pausing') {
      setText1('');
      setText2('');
      setText3('');
      setStep(1);
    }

    return () => clearTimeout(timer);
  }, [text1, text2, text3, step, line1, line2, line3, isMobile]);

  return (
    <div className="w-full flex flex-col justify-start space-y-1.5 md:space-y-2 h-auto md:h-[280px] overflow-hidden select-none pb-3 md:pb-0">
      {/* Line 1: Hey, */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
        <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 dark:from-amber-400 dark:via-yellow-200 dark:to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
          {text1}
        </span>
        {step === 1 && <span className="animate-pulse text-amber-500 font-bold ml-1">|</span>}
      </h1>

      {/* Line 2: I'm Name */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
        <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 dark:from-amber-400 dark:via-yellow-200 dark:to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
          {text2}
        </span>
        {step === 2 && <span className="animate-pulse text-amber-500 font-bold ml-1">|</span>}
      </h1>

      {/* Line 3: Title */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
        <span className="bg-gradient-to-r from-stone-700 via-amber-600 to-stone-900 dark:from-zinc-200 dark:via-amber-200 dark:to-zinc-400 bg-clip-text text-transparent">
          {text3}
        </span>
        {step === 3 && <span className="animate-pulse text-amber-500 font-bold ml-1">|</span>}
      </h1>
    </div>
  );
}