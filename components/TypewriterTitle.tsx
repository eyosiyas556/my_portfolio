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
  
  // Start right away with step 1, ending permanently at 'done'
  const [step, setStep] = useState<1 | 2 | 3 | 'done'>(1);

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
        setStep('done'); // Stops permanently after running once
      }
    }

    return () => clearTimeout(timer);
  }, [text1, text2, text3, step, line1, line2, line3]);

  // Double drop-shadow style string for Tailwind
  const attractiveShadow = "[filter:drop-shadow(0px_2px_2px_#b45309)_drop-shadow(0px_1px_1px_rgba(0,0,0,0.6))]";

  return (
    <div className="w-full flex flex-col justify-start space-y-1.5 md:space-y-2 h-auto md:h-[280px] overflow-hidden select-none pb-3 md:pb-0">
      {/* Line 1: Hey, (Golden with Double Shadow) */}
      <h1 className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-amber-400 ${attractiveShadow}`}>
        <span>{text1}</span>
        {step === 1 && <span className="animate-pulse text-yellow-300 font-bold ml-1">|</span>}
      </h1>

      {/* Line 2: I'm Name (Golden with Double Shadow) */}
      <h1 className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-amber-400 ${attractiveShadow}`}>
        <span>{text2}</span>
        {step === 2 && <span className="animate-pulse text-yellow-300 font-bold ml-1">|</span>}
      </h1>

      {/* Line 3: Title (Slightly darker Golden with Double Shadow) */}
      <h1 className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-amber-500 ${attractiveShadow}`}>
        <span>{text3}</span>
        {step === 3 && <span className="animate-pulse text-amber-400 font-bold ml-1">|</span>}
      </h1>
    </div>
  );
}