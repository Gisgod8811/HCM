"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import jarAnimation from "@/public/jar-shake.json";
import { FortuneCard } from "./FortuneCard";
import { ShareButton } from "./ShareButton";

// Define the structure of the fortune response
interface FortuneData {
  fortune: {
    title: string;
    poem: string;
  };
  hcm_advice: {
    quote: string;
    explanation: string;
    keywords: string[];
    steps: string[];
  };
  nano_banana_prompt: string;
  image?: string;
}

type AppState = "intro" | "shaking" | "result";

export function FortuneTeller() {
  const [appState, setAppState] = useState<AppState>("intro");
  const [fortuneData, setFortuneData] = useState<FortuneData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/tienglac.mp3");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleShake = async () => {
    if (appState === "shaking") return;

    setAppState("shaking");
    setError(null);
    setFortuneData(null);

    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }

    // Min shake time 2 seconds for effect
    const minShakeTime = new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const apiCall = fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Hãy gieo quẻ cho tôi một quẻ tết may mắn. Tôi muốn biết số phận và nhận lời khuyên của Bác Hồ.",
        }),
      });

      const [response] = await Promise.all([apiCall, minShakeTime]);

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setFortuneData(data);
      setAppState("result");

    } catch (err) {
      console.error("Error fetching fortune:", err);
      setError(err instanceof Error ? err.message : "Failed to generate fortune.");
      setAppState("intro");
    } finally {
      // Stop sound
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const reset = () => {
    setAppState("intro");
    setFortuneData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] to-[#FFE5D9] flex flex-col items-center justify-start p-4 overflow-x-hidden relative font-vietnam text-gray-800">

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply z-0"></div>
      <div className="fixed top-0 right-0 p-10 opacity-15 pointer-events-none animate-float z-0">
        <span className="text-9xl text-crimson">🌸</span>
      </div>
      <div className="fixed bottom-0 left-0 p-10 opacity-15 pointer-events-none animate-float z-0" style={{ animationDelay: '2s' }}>
        <span className="text-9xl text-muted-gold">🧧</span>
      </div>

      <AnimatePresence mode="wait">

        {/* STATE: INTRO */}
        {appState === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen"
          >
            {/* Banner - Top Section */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full max-w-2xl mb-4 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src="/AnhBac.jpg"
                alt="Banner"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Main Content Container - Centered vertical axis */}
            <div className="w-full flex justify-center">
              <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-4 w-full max-w-full px-0 lg:px-2">
                
                {/* Center Section - Title & Image & Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="flex-initial flex flex-col items-center justify-center px-4 py-12"
                >
                  {/* Title */}
                  <h1 className="font-playfair text-5xl md:text-6xl font-bold text-crimson mb-1 text-center drop-shadow-md">
                    Gieo Quẻ 2026
                  </h1>
                  <p className="text-lg text-gray-700 mb-6 text-center font-sans">
                    "Lắng nghe lời Bác - Khai mở vận may"
                  </p>

                  {/* Central Image - Interactive with Halo */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer mb-6 relative group transition-all duration-300"
                    onClick={handleShake}
                  >
                    {/* Halo Glow Background */}
                    <motion.div
                      animate={{
                        scale: [1, 1.02, 1],
                        opacity: [0.4, 0.6, 0.4]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 w-72 h-72 rounded-full blur-3xl"
                      style={{
                        background: 'radial-gradient(circle, rgba(139, 30, 30, 0.3) 0%, rgba(245, 199, 106, 0.15) 40%, transparent 70%)',
                      }}
                    ></motion.div>

                    {/* Rotating light effect */}
                    <motion.div
                      animate={{
                        rotate: 360
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 w-72 h-72 rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0%, rgba(245, 199, 106, 0.2) 25%, transparent 50%, rgba(139, 30, 30, 0.15) 75%, transparent 100%)',
                        filter: 'blur(20px)'
                      }}
                    ></motion.div>

                    {/* Main Image Container */}
                    <motion.div
                      animate={{
                        scale: [1, 1.015, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative w-72 h-72 rounded-full overflow-hidden shadow-2xl ring-4 ring-crimson/30 group-hover:ring-crimson/60 transition-all duration-300 flex items-center justify-center bg-white/20 z-10"
                    >
                      <img
                        src="/queboi.png"
                        alt="Queboi"
                        className="w-full h-full object-contain"
                      />
                    </motion.div>

                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-crimson font-bold text-sm z-20">
                      ✨ Nhấn để lắc! ✨
                    </div>
                  </motion.div>

                  {/* Primary CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShake}
                    className="mt-8 px-10 py-4 bg-gradient-to-r from-[#F5C76A] to-[#E8B855] text-[#8B1E1E] font-playfair font-bold text-2xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-[#8B1E1E] relative overflow-hidden group"
                  >
                    <span className="relative z-10">Gieo Quẻ Đầu Năm</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F0C560] to-[#E0A840] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </motion.button>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-red-100/80 text-red-800 rounded-lg text-sm max-w-sm text-center border border-red-300"
                    >
                      {error}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="w-full max-w-2xl px-4 mt-8 lg:hidden"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gradient-to-b from-[#8B1E1E] to-[#6B1515] rounded-2xl p-6 shadow-2xl border-2 border-[#F5C76A] relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-[#F5C76A] opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#F5C76A] opacity-70"></div>
                  <div className="space-y-3 text-center">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="font-sans text-[#F5C76A] text-sm font-semibold leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-lg flex-shrink-0">🌱</span>
                      <span>Xuân về nắng tỏa rạng ngời,</span>
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="font-sans text-[#F5C76A] text-sm font-semibold leading-relaxed"
                    >
                      Ghi ơn nhớ Bác, suốt đời rèn tâm.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="font-sans text-[#F5C76A] text-sm font-semibold leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-lg flex-shrink-0">✨</span>
                      <span>Đạo đức cách mạng âm thầm,</span>
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="font-sans text-[#F5C76A] text-sm font-semibold leading-relaxed"
                    >
                      Trở thành sức mạnh, ươm mầm tương lai.
                    </motion.p>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-[#8B1E1E] to-[#6B1515] rounded-2xl p-6 shadow-2xl border-2 border-[#F5C76A] relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-[#F5C76A] opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#F5C76A] opacity-70"></div>
                  <div className="space-y-3 text-center">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="font-sans text-[#F5C76A] text-sm font-semibold leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-lg flex-shrink-0">📜</span>
                      <span>Soi đường tư tưởng sáng tươi,</span>
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="font-sans text-[#F5C76A] text-sm font-semibold leading-relaxed"
                    >
                      Quyết tâm đổi mới, giúp đời thêm xuân.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="font-sans text-[#F5C76A] text-sm font-semibold leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-lg flex-shrink-0">✨</span>
                      <span>Sáng tạo kiến thức chuyên cần,</span>
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="font-sans text-[#F5C76A] text-sm font-semibold leading-relaxed"
                    >
                      Vươn tầm thế giới, góp phần nước vinh.
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* STATE: SHAKING */}
        {appState === "shaking" && (
          <motion.div
            key="shaking"
            className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full"
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <div className="relative w-80 h-80 mb-6 flex items-center justify-center">
              {/* Jar Animation */}
              <div className="absolute w-full h-full">
                <Lottie
                  animationData={jarAnimation}
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              
              {/* Queboi Image Rising from Jar */}
              <motion.img
                src="/queboi.png"
                alt="Queboi"
                className="absolute w-48 h-48 object-contain drop-shadow-lg"
                initial={{ opacity: 0, y: 80 }}
                animate={{ 
                  opacity: [0, 0, 1, 1],
                  y: [80, 80, 20, 20]
                }}
                transition={{
                  duration: 2.5,
                  times: [0, 0.3, 0.5, 1],
                  ease: "easeOut"
                }}
              />
            </div>
            <motion.h2 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl font-playfair font-bold text-crimson mt-8"
            >
              Đang xin quẻ...
            </motion.h2>
            <p className="text-gray-600 mt-3 font-sans text-lg">Đợi chút nhé, đến khi MU vô địch Ngoại Hạng Anh...</p>
          </motion.div>
        )}

        {/* STATE: RESULT */}
        {appState === "result" && fortuneData && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full flex flex-col items-center pt-8"
          >
            {/* The Card Component to be Captured */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="mb-8 w-full max-w-2xl px-4 transform transition-all hover:scale-[1.02] duration-500"
            >
              <FortuneCard ref={cardRef} data={fortuneData} />
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center pb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={reset}
                className="px-8 py-3 bg-white border-2 border-crimson text-crimson font-bold rounded-full hover:bg-red-50 transition-colors duration-300 shadow-lg"
              >
                Gieo Lại
              </motion.button>
              <ShareButton targetRef={cardRef} />
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Left Couplet - Fixed at Left Edge - Always Visible */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-40 flex-col justify-center z-40 pointer-events-none"
      >
        <div className="bg-gradient-to-b from-[#8B1E1E] to-[#6B1515] rounded-r-2xl p-4 shadow-2xl border-r-2 border-[#F5C76A] relative overflow-hidden h-full flex flex-col justify-center pointer-events-auto">
          {/* Scroll decoration */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#F5C76A] opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#F5C76A] opacity-70"></div>
          
          <div className="space-y-2 text-center max-w-xs mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-[#F5C76A] text-base font-semibold leading-loose"
            >
              🌱 Xuân về nắng tỏa rạng ngời,
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-sans text-[#F5C76A] text-base font-semibold leading-loose"
            >
              Ghi ơn nhớ Bác, suốt đời rèn tâm.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-sans text-[#F5C76A] text-base font-semibold leading-loose"
            >
              ✨ Đạo đức cách mạng âm thầm,
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-sans text-[#F5C76A] text-base font-semibold leading-loose"
            >
              Trở thành sức mạnh, ươm mầm tương lai.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Right Couplet - Fixed at Right Edge - Always Visible */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:flex fixed right-0 top-0 h-screen w-40 flex-col justify-center z-40 pointer-events-none"
      >
        <div className="bg-gradient-to-b from-[#8B1E1E] to-[#6B1515] rounded-l-2xl p-4 shadow-2xl border-l-2 border-[#F5C76A] relative overflow-hidden h-full flex flex-col justify-center pointer-events-auto">
          {/* Scroll decoration */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#F5C76A] opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#F5C76A] opacity-70"></div>
          
          <div className="space-y-2 text-center max-w-xs mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-[#F5C76A] text-base font-semibold leading-loose"
            >
              📜 Soi đường tư tưởng sáng tươi,
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-sans text-[#F5C76A] text-base font-semibold leading-loose"
            >
              Quyết tâm đổi mới, giúp đời thêm xuân.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-sans text-[#F5C76A] text-base font-semibold leading-loose"
            >
              ✨ Sáng tạo kiến thức chuyên cần,
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-sans text-[#F5C76A] text-base font-semibold leading-loose"
            >
              Vươn tầm thế giới, góp phần nước vinh.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
