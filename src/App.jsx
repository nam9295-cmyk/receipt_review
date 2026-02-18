import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Gift, Sparkles, RotateCcw, Cookie, Check, Globe, MapPin, Code, Instagram } from 'lucide-react';
import confetti from 'canvas-confetti';

const fortunes = [
  // Normal (60%) - 10 items
  { text: "당 충전이 필요한 순간! 초콜릿 하나 어때요?", tier: "Normal" },
  { text: "오늘의 행운 컬러는 '밀크 브라운' 입니다.", tier: "Normal" },
  { text: "작은 달콤함이 큰 행복을 가져다 줄 거예요.", tier: "Normal" },
  { text: "근심 걱정은 녹여버리고, 초콜릿처럼 부드러운 하루!", tier: "Normal" },
  { text: "커피와 함께하면 행복이 두 배가 됩니다.", tier: "Normal" },
  { text: "기분 전환에는 역시 달달한 게 최고죠!", tier: "Normal" },
  { text: "오늘 하루, 당신은 누구보다 빛나고 있어요 ✨", tier: "Normal" },
  { text: "잠시 쉬어가세요. 달콤한 휴식이 필요해요.", tier: "Normal" },
  { text: "좋은 예감이 드네요! 즐거운 일이 생길 거예요.", tier: "Normal" },
  { text: "소소한 즐거움을 놓치지 마세요!", tier: "Normal" },

  // Rare (30%) - 5 items
  { text: "🎉 축하해요! 오늘은 정말 운이 좋은 날이네요!", tier: "Rare" },
  { text: "인생 쿠키를 만날 확률 99.9%! 놓치지 마세요.", tier: "Rare" },
  { text: "뜻밖의 선물이 당신을 기다리고 있어요 🎁", tier: "Rare" },
  { text: "달콤한 마법이 당신의 하루를 감싸줄 거예요.", tier: "Rare" },
  { text: "귀인의 도움을 받게 될 지도 몰라요!", tier: "Rare" },

  // Legendary (10%) - 1 items (Winner)
  { text: "축하합니다! 0.1% 행운 당첨! 이 화면을 직원에게 보여주시면 특별한 선물을 즉시 드립니다! ✨", tier: "Legendary" },
];

// Weighted Random Selection Helper
const getRandomFortune = () => {
  const rand = Math.random() * 100;
  if (rand < 10) { // 10% for Legendary
    return fortunes.filter(f => f.tier === "Legendary")[0];
  } else if (rand < 40) { // 30% for Rare (10 + 30)
    return fortunes.filter(f => f.tier === "Rare")[Math.floor(Math.random() * 5)];
  } else { // 60% for Normal
    return fortunes.filter(f => f.tier === "Normal")[Math.floor(Math.random() * 10)];
  }
};

const products = [
  {
    id: 101, // New ID for Dubai Cookie
    image: "/dubai.webp",
    name: "두바이 쫀득쿠키",
    description: "쇼콜라티에가 만드는 진짜 두쫀쿠!",
    tag: "NEW"
  },
  {
    id: 102, // New ID for Dubai Chocolate
    image: "/dubai_choc.webp",
    name: "두바이 초콜릿",
    description: "백화점 팝업 완판의 신화",
    tag: "BEST"
  },
  {
    id: 1,
    image: "/canele.webp",
    name: "canelé",
    description: "겉바속쫀, 프랑스 발로나를 담다.",
    tag: "NEW"
  },
  {
    id: 2,
    image: "/chocolat.webp",
    name: "dark chocolat",
    description: "진짜 초콜릿으로 만든 초코음료. 100%에 도전해보세요.",
    tag: "BEST"
  },
  {
    id: 3,
    image: "/detox.webp",
    name: "cacao detox water",
    description: "카카오닙이랑 블랜딩된 디톡스 티",
    tag: "NEW"
  },
  {
    id: 4,
    image: "/levein.webp",
    name: "levein cookie",
    description: "유기농 사탕수수 원당으로 만든 뉴욕스타일 겉바 속촉",
    tag: "BEST"
  },
  {
    id: 5,
    image: "/matcha.webp",
    name: "matcha chocolat",
    description: "진짜 초콜릿과 말차의 만남.",
    tag: "NEW"
  },
  {
    id: 6,
    image: "/snow.webp",
    name: "toni cookie snow ball",
    description: "겉은 눈처럼 보송보송, 속은 사르르",
    tag: "EVENT"
  }
];

const reviews = [
  {
    id: "user**",
    date: "25.2.4.수 방문",
    content: "바쁜 일상에서 스트레스가 극에 달했을 때 달달함이 필요해서 눈여겨보다 들렀어요 소문대로 초콜릿 맛이 좋고, 깊었고 공간도 조용하고 아늑해서 음료한잔 하며 생각에 잠겨 쉬기 좋 았어요 대구에 이런 초콜릿 전문점 찾기 힘든데 보물같은 곳 이에요. 선물하기도 좋은 다양한 제품들도 있네요^^ 다음에 지 인에 선물해보고싶네요",
    keywords: ["디저트가 맛있어요", "특별한 메뉴가 있어요", "친절해요"],
    stars: 5
  },
  {
    id: "swee**",
    date: "25.2.6.금 방문",
    content: "커피도 쿠키도 초콜렛도 너무 맛있었어요! 사장님도 친절하시고 카페 분위기도 편안하고 좋아요. 곧 발렌타인인데 특별한 초콜렛 선물하기에 딱 좋아보여요!",
    keywords: ["선물하기 좋아요", "포장이 깔끔해요", "가성비가 좋아요"],
    stars: 5
  },
  {
    id: "choc**",
    date: "24.2.5.수 방문",
    content: "매장 분위기가 너무 좋아요. 달달한 초콜릿 라떼랑 쿠키 조합이 환상적이네요. 당 충전 제대로 하고 갑니다!",
    keywords: ["인테리어가 멋져요", "커피가 맛있어요", "사진이 잘 나와요"],
    stars: 5
  }
];

export default function App() {
  const [fortune, setFortune] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [coins, setCoins] = useState(5);
  const [showDock, setShowDock] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const reviewSection = document.getElementById('review-section');
    if (reviewSection) {
      if (latest > reviewSection.offsetTop - window.innerHeight + 100) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    }
  });

  const handleFortuneClick = () => {
    if (coins <= 0) return;
    setCoins(prev => prev - 1);
    setIsDrawing(true);

    // 1.5초 후 결과 공개 (슬롯머신 연출)
    setTimeout(() => {
      const randomFortune = getRandomFortune();
      setFortune(randomFortune);
      setIsDrawing(false);
      setIsRevealed(true);

      if (randomFortune.tier === "Legendary") {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#F48FB1', '#FFFFFF']
        });
      }
    }, 1500);
  };

  const resetFortune = () => {
    setIsRevealed(false);
    setFortune(null);
    setIsVerified(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#EAE0D5] flex justify-center items-start font-['Outfit',_sans-serif]">
      {/* Mobile Container */}
      <div className="w-full max-w-[480px] flex flex-col relative bg-[#FAF6F1] shadow-xl min-h-screen">

        {/* Hero Section */}
        <section className="relative w-full h-[480px] overflow-hidden">
          {/* Background Image */}
          <img
            src="/hero-bg.webp"
            alt="Granola Gift"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Subtle Overlay for Readability */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between items-center pt-12 pb-8 px-6 text-center z-10">
            {/* Top: Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center w-full"
            >
              <h1 className="text-[42px] font-bold text-[#FFFDF5] tracking-tight drop-shadow-lg leading-none">
                REVIEW EVENT
              </h1>
            </motion.div>

            {/* Bottom: Description & Button */}
            <div className="flex flex-col items-center gap-6 w-full">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg text-[#FFFDF5] font-medium leading-relaxed drop-shadow-lg"
              >
                영수증 인증하고,<br />
                <span className="font-bold text-[#EDC5C4]">그래놀라</span> 받아가세요!
              </motion.p>

              <motion.button
                onClick={() => window.open(
                  "https://m.place.naver.com/restaurant/1069379954/review/visitor",
                  "_blank"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(62, 39, 35, 0.4)",
                  borderColor: "rgba(255, 255, 255, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-[#3E2723]/30 backdrop-blur-md border border-white/30 rounded-xl flex justify-center items-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 group"
              >
                <span className="text-white text-base font-bold drop-shadow-md group-hover:text-[#FFFDF5]">영수증 리뷰 쓰고 그래놀라 받기</span>
              </motion.button>
            </div>
          </div>
        </section>

        {/* Game Section - Fortune Gacha */}
        <section className="w-full px-6 py-8 bg-[#FAF6F1]">
          <div className="w-full bg-[#FFF0F0] border border-[#EDC5C4] rounded-2xl p-6 flex flex-col gap-4 items-center shadow-sm min-h-[220px] justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isRevealed && !isDrawing && (
                <motion.div
                  key="idle"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex flex-col items-center gap-3 relative z-10 w-full"
                >
                  {coins > 0 ? (
                    <>
                      <h2 className="text-xl font-bold text-[#3E2723] text-center">오늘의 달콤한 운세는?</h2>
                      <div className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full border border-[#EDC5C4]/50">
                        <span className="text-sm font-bold text-[#8D6E63]">남은 기회:</span>
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={coins}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            className="text-sm font-bold text-[#3E2723]"
                          >
                            {coins}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-sm font-bold text-[#3E2723]">/ 5</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleFortuneClick}
                        disabled={isDrawing || coins <= 0}
                        className="px-8 py-4 bg-[#EF9A9A] text-white rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-[#E57373] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Cookie size={20} />
                        운세 뽑기 ({coins}코인)
                      </motion.button>
                      <p className="mt-4 text-xs text-[#8D6E63] font-medium animate-pulse">
                        ✨ 0.1% 확률로 특별한 선물이 기다리고 있어요! ✨
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-[#3E2723] text-center mb-1">오늘의 운세를<br />모두 확인하셨습니다</h2>
                      <p className="text-sm text-[#8D6E63] text-center mb-4">내일 다시 도전해 주세요! 🍪</p>

                      <div className="flex flex-col gap-2 w-full max-w-[240px]">
                        {/* Social buttons removed as per user request */}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {isDrawing && (
                <motion.div
                  key="drawing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFF0F0] z-20"
                >
                  <div className="relative h-[80px] overflow-hidden w-full text-center py-2 before:absolute before:inset-0 before:z-10 before:bg-gradient-to-b before:from-[#FFF0F0] before:via-transparent before:to-[#FFF0F0]">
                    <motion.div
                      animate={{ y: [0, -1200] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.2, // Faster speed for "crazy" rolling
                        ease: "linear"
                      }}
                      className="flex flex-col gap-4 text-4xl font-bold text-[#EDC5C4]/50 blur-[1px]"
                    >
                      {/* Duplicate list for infinite scroll illusion */}
                      {[...Array(30)].map((_, i) => (
                        <span key={i}>? ? ? ? ?</span>
                      ))}
                    </motion.div>
                  </div>
                  <p className="text-[#3E2723] font-bold mt-2 animate-pulse text-sm">운명을 확인하는 중...</p>
                </motion.div>
              )}

              {isRevealed && fortune && (
                <motion.div
                  key="result"
                  initial={{ y: 50, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="flex flex-col items-center text-center w-full relative z-30"
                >
                  {/* Background Effects based on Tier */}
                  <div className="absolute inset-0 flex justify-center items-center -z-10 pointer-events-none">
                    {fortune.tier === 'Legendary' && (
                      <motion.div
                        animate={{ rotate: 360, scale: [1, 1.5, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-[300px] h-[300px] bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 rounded-full blur-3xl opacity-40"
                      />
                    )}
                    {fortune.tier === 'Rare' && (
                      <motion.div
                        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-[250px] h-[250px] bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-full blur-3xl opacity-30"
                      />
                    )}
                  </div>

                  <div className="relative mb-2">
                    {fortune.tier === 'Legendary' && (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-yellow-400 blur-md opacity-60 rounded-full"
                        />
                        <Sparkles size={56} className="text-yellow-500 relative z-10 drop-shadow-[0_0_15px_rgba(234,179,8,1)]" />
                      </>
                    )}
                    {fortune.tier === 'Rare' && (
                      <Gift size={48} className="text-pink-400 relative z-10 drop-shadow-md" />
                    )}
                    {fortune.tier === 'Normal' && (
                      <Cookie size={48} className="text-[#8D6E63] relative z-10" />
                    )}
                  </div>

                  <motion.div
                    className={`
                      relative p-6 rounded-xl w-full max-w-[280px] backdrop-blur-sm border-2
                      ${fortune.tier === 'Legendary' ? 'bg-yellow-50/90 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)]' : ''}
                      ${fortune.tier === 'Rare' ? 'bg-pink-50/90 border-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.3)]' : ''}
                      ${fortune.tier === 'Normal' ? 'bg-white/80 border-[#EDC5C4] shadow-sm' : ''}
                    `}
                  >
                    <div className={`
                      text-xs font-bold mb-2 tracking-widest uppercase flex justify-center items-center gap-1
                      ${fortune.tier === 'Legendary' ? 'text-yellow-600' : ''}
                      ${fortune.tier === 'Rare' ? 'text-pink-500' : ''}
                      ${fortune.tier === 'Normal' ? 'text-[#8D6E63]' : ''}
                    `}>
                      <span className="px-2 py-0.5 rounded-full border border-current opacity-80">
                        {fortune.tier}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#3E2723] break-keep leading-snug">
                      {fortune.text}
                    </h3>
                  </motion.div>

                  {/* Wrapper for buttons to prevent layout shift */}
                  <div className="mt-6 h-[40px] flex items-center justify-center w-full">
                    {fortune.tier === 'Legendary' ? (
                      !isVerified ? (
                        <motion.button
                          onClick={() => setIsVerified(true)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-[#3E2723] text-[#EDC5C4] px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2"
                        >
                          <Check size={16} />
                          직원 확인
                        </motion.button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[#3E2723] font-bold flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg border border-green-300"
                        >
                          <Check size={16} className="text-green-600" />
                          <span className="text-green-800 text-sm">확인 완료</span>
                        </motion.div>
                      )
                    ) : (
                      <motion.button
                        onClick={resetFortune}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ rotate: 180, transition: { duration: 0.5 } }}
                        className="flex items-center gap-2 text-[#8D6E63] hover:text-[#3E2723] transition-colors text-sm font-medium"
                      >
                        <RotateCcw size={18} />
                        <span>다시 뽑기</span>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Instagram Promotion Section */}
        <section className="w-full px-6 py-10 bg-[#FAF6F1]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => window.open("https://instagram.com/verygood_chocolate", "_blank")}
            className="w-full p-5 rounded-2xl relative overflow-hidden cursor-pointer group"
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-lg z-0 transition-colors duration-300 group-hover:bg-white/60" />

            {/* Instagram Gradient Border */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                border: '2px solid',
                borderImageSource: 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',
                borderImageSlice: 1,
                clipPath: 'inset(0 round 1rem)' // 16px radius for rounded-2xl
              }}
            />

            <div className="relative z-20 flex items-center justify-between gap-4">
              {/* Left: Icon/Logo */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px] shadow-md flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <Instagram size={28} className="text-[#E1306C]" />
                  </div>
                </div>

                {/* Center: Text */}
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[#3E2723] font-bold text-lg truncate">@verygood_chocolate</h3>
                    <div className="bg-blue-500 rounded-full p-[2px]">
                      <Check size={8} className="text-white" strokeWidth={4} />
                    </div>
                  </div>
                  <p className="text-[#8D6E63] text-xs font-medium truncate">
                    인스타그램 팔로우 하고 게릴라 이벤트 소식을 받아보세요 🍫
                  </p>
                </div>
              </div>

              {/* Right: Button */}
              <button className="px-5 py-2 bg-[#3E2723] text-white text-sm font-bold rounded-full shadow-md group-hover:bg-[#5D4037] transition-colors whitespace-nowrap">
                Follow
              </button>
            </div>
          </motion.div>
        </section>

        {/* New & Best Section */}
        <section className="w-full py-8 flex flex-col gap-6 bg-[#FAF6F1]">
          <div className="px-6">
            <h2 className="text-[26px] font-bold text-[#3E2723] tracking-tight">New & Best</h2>
            <p className="text-sm text-[#8D6E63] mt-1 font-medium">지금 가장 핫한 디저트 컬렉션</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="w-full overflow-x-auto flex gap-5 px-6 pb-8 snap-x scrollbar-hide"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 12 } }
                }}
                className="min-w-[200px] flex flex-col gap-4 snap-start group cursor-default"
                whileHover={{ y: -8 }}
              >
                <div className="w-[200px] h-[240px] rounded-2xl bg-[#D7CCC8] overflow-hidden relative shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />

                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-[#EDC5C4] px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-[#3E2723] text-[10px] font-bold tracking-widest uppercase">
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-[#3E2723] leading-tight group-hover:text-[#FAAB26] transition-colors">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-xs text-[#8D6E63] font-medium tracking-wide leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  {/* Buy button removed as per user request */}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Review Section - Naver Style */}
        <section id="review-section" className="w-full px-6 py-10 flex flex-col gap-6 bg-white">
          <div className="flex flex-col gap-1">
            <h2 className="text-[22px] font-bold text-[#242424] tracking-tight">방문자 리뷰</h2>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-bold text-[#242424] text-lg">4.98</span>
              <span className="text-[#8D6E63] text-xs">/ 5</span>
              <div className="flex gap-0.5 ml-2 text-[#FFC107]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", damping: 20 }}
                className="w-full p-5 bg-[#F8F9FA] rounded-[18px] border border-[#F0F0F0] flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
              >
                {/* Header: User Info */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#242424] text-[13px]">{review.id}</span>
                      <span className="text-[11px] text-[#8F8F8F] font-normal">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.stars)].map((_, i) => (
                        <svg key={i} width="10" height="10" viewBox="0 0 14 14" fill="#FFC107">
                          <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-[14px] text-[#424242] leading-relaxed font-normal break-keep">
                  {review.content}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {review.keywords.map((keyword, i) => (
                    <span key={i} className="px-2.5 py-1.5 bg-white border border-[#E0E0E0] text-[#666666] text-[11px] rounded-[6px] font-medium flex items-center gap-1 shadow-sm">
                      <Check size={10} className="text-[#8D6E63]" strokeWidth={3} />
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="w-full flex justify-center mt-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button className="w-full py-3.5 border border-[#E0E0E0] rounded-xl text-[#424242] text-sm font-bold bg-white hover:bg-[#F8F9FA] transition-colors flex justify-center items-center gap-2">
              <span>네이버 리뷰 전체보기</span>
              <span className="text-[#8F8F8F] text-xs font-normal">→</span>
            </button>
          </motion.div>
        </section>

        {/* Global Navigation Dock */}
        <AnimatePresence>
          {showDock && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="flex items-center gap-2 px-2 py-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                {/* Global Site */}
                <motion.button
                  onClick={() => window.open("https://verygood-chocolate.com", "_blank")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white/40 hover:bg-white/60 transition-colors gap-0.5"
                >
                  <Globe size={18} className="text-[#3E2723]" />
                  <span className="text-[9px] font-bold text-[#3E2723]">Global</span>
                </motion.button>

                {/* Korean Site */}
                <motion.button
                  onClick={() => window.open("https://kr.verygood-chocolate.com", "_blank")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white/40 hover:bg-white/60 transition-colors gap-0.5"
                >
                  <MapPin size={18} className="text-[#3E2723]" />
                  <span className="text-[9px] font-bold text-[#3E2723]">Korea</span>
                </motion.button>

                {/* Portfolio */}
                <motion.button
                  onClick={() => window.open("https://jd26.pages.dev/", "_blank")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 px-3 h-12 rounded-full bg-[#3E2723] text-[#FFFDF5] shadow-lg relative overflow-hidden group"
                >
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"
                  />
                  <Code size={16} />
                  <span className="text-xs font-bold whitespace-nowrap pr-1">Directed by John</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>



      </div>
    </div>
  );
}