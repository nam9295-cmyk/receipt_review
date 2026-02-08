import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Wifi, Instagram } from 'lucide-react';

const fortunes = [
  "당 충전이 필요한 날!",
  "행운의 색은 핑크!",
  "0칼로리 당첨!",
  "오늘은 달콤한 하루가 될 거예요!",
  "초콜릿 먹고 힘내세요!"
];

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1705659282075-20fb873b6924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzA1MTUwNjl8&ixlib=rb-4.1.0&q=80&w=1080",
    name: "두바이 쫀득 쿠키",
    description: "이스탄불 카다이프의 바삭함!",
    tag: "NEW"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzA1MTUwNzB8&ixlib=rb-4.1.0&q=80&w=1080",
    name: "리얼 초콜릿 라떼",
    description: ""
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1611394094568-c956c6eadd6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzA1MTUwNzF8&ixlib=rb-4.1.0&q=80&w=1080",
    name: "발렌타인 한정 패키지",
    description: ""
  }
];

const reviews = [
  "\"인생 쿠키를 만났어요. 두바이 쿠키 식감 대박!\" ⭐⭐⭐⭐⭐",
  "\"패키지가 너무 고급스러워서 선물용으로 딱입니다.\"",
  "\"매장 분위기가 너무 좋아요. 또 올게요!\""
];

export default function App() {
  const [fortune, setFortune] = useState("오늘의 초콜릿 운세 🍫");
  const [isRevealed, setIsRevealed] = useState(false);

  const handleFortuneClick = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
    setIsRevealed(true);
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
            alt="Delicious Chocolate Chip Cookie"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Subtle Overlay for Readability */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Content Overlay - Top Aligned */}
          <div className="absolute inset-0 flex flex-col justify-between items-center pt-16 pb-8 px-6 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 w-full"
            >
              <h1 className="text-[32px] font-bold text-[#FFFDF5] tracking-tight drop-shadow-lg">
                REVIEW EVENT
              </h1>
              <p className="text-lg text-[#FFFDF5] font-medium leading-relaxed drop-shadow-lg">
                영수증 인증하고,<br />
                <span className="font-bold text-[#EDC5C4]">토니쿠키</span> 받아가세요!
              </p>
            </motion.div>

            <motion.button
              onClick={() => window.open(
                "https://m.place.naver.com/restaurant/1069379954/review/visitor",
                "_blank"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(62, 39, 35, 0.4)", // Slightly darken on hover
                borderColor: "rgba(255, 255, 255, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-[#3E2723]/30 backdrop-blur-md border border-white/30 rounded-xl flex justify-center items-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 group"
            >
              <span className="text-white text-base font-bold drop-shadow-md group-hover:text-[#FFFDF5]">영수증 리뷰 쓰고 쿠키 받기</span>
            </motion.button>
          </div>
        </section>

        {/* Game Section */}
        <section className="w-full px-6 py-8 bg-[#FAF6F1]">
          <div className="w-full bg-[#FFF0F0] border border-[#EDC5C4] rounded-2xl p-6 flex flex-col gap-4 items-center shadow-sm">
            <h2 className="text-xl font-bold text-[#3E2723] text-center">{fortune}</h2>
            <motion.button
              onClick={handleFortuneClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#EDC5C4] px-6 py-3 rounded-full shadow-md hover:bg-[#E6B0AF] transition-colors"
            >
              <span className="text-[#3E2723] text-sm font-semibold">
                {isRevealed ? "다시 뽑기" : "운세 뽑기"}
              </span>
            </motion.button>
          </div>
        </section>

        {/* New & Best Section */}
        <section className="w-full py-6 flex flex-col gap-5 bg-[#FAF6F1]">
          <div className="px-6">
            <h2 className="text-[24px] font-bold text-[#3E2723]">New & Best</h2>
            <p className="text-sm text-[#8D6E63] mt-1">지금 가장 핫한 디저트</p>
          </div>
          <div className="w-full overflow-x-auto flex gap-4 px-6 pb-6 snap-x scrollbar-hide">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="min-w-[180px] flex flex-col gap-3 snap-start"
                whileHover={{ y: -5 }}
              >
                <div className="w-[180px] h-[220px] rounded-xl bg-[#D7CCC8] overflow-hidden relative shadow-md">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.tag && (
                    <div className="absolute top-3 left-3 bg-[#3E2723] px-2.5 py-1 rounded-full text-[#EDC5C4] text-[10px] font-bold tracking-wider">
                      {product.tag}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#3E2723]">{product.name}</h3>
                  {product.description && (
                    <p className="text-xs text-[#8D6E63] mt-1 truncate">{product.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="w-full px-6 py-8 flex flex-col gap-5 bg-[#FAF6F1]">
          <h2 className="text-[24px] font-bold text-[#3E2723]">What People Say</h2>
          <div className="flex flex-col gap-4">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-full p-5 bg-white rounded-xl shadow-sm border border-[#EAE0D5]"
              >
                <p className="text-sm text-[#4E342E] font-medium leading-relaxed">{review}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full px-6 py-10 flex flex-col gap-6 items-center bg-[#FAF6F1]">
          <div className="w-full h-px bg-[#EAE0D5]" />
          <div className="flex gap-4 text-[#8D6E63] text-xs font-medium">
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-[#3E2723] transition-colors"><Instagram size={14} /> Instagram</span>
            <span>·</span>
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-[#3E2723] transition-colors"><ShoppingBag size={14} /> SmartStore</span>
            <span>·</span>
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-[#3E2723] transition-colors"><Wifi size={14} /> WiFi</span>
          </div>
          <p className="text-[10px] text-[#D7CCC8] text-center">
            © 2024 Receipt Review Event. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
}