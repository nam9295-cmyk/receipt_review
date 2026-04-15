import React from 'react';
import { motion } from 'framer-motion';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-background text-on-background antialiased pb-24 font-body">
      <main className="max-w-md mx-auto">
        {/* Hero Header */}
        <section className="relative h-[480px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt="프리미엄 다크 초콜릿 트러플과 아몬드 클러스터"
            src="/almond_hero.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
            <p className="font-label text-primary-container text-[#d4ada1] uppercase tracking-[0.2em] text-xs font-extrabold mb-2">단독 혜택</p>
            <h1 className="text-3xl text-white font-black leading-tight mb-4 font-headline">리뷰 이벤트: 아몬드 초코볼 맛보기 증정!</h1>
            <p className="font-body text-[#f8f3ec] text-sm font-medium opacity-90">정성스러운 후기를 남겨주시는 분들께 달콤한 선물을 드립니다.</p>
          </div>
        </section>

        {/* Event Prize Intro */}
        <section className="px-6 -mt-12 relative z-10">
          <div className="bg-surface-container-lowest rounded-lg p-6 shadow-[0_12px_32px_rgba(68,42,34,0.06)] flex items-center gap-6">
            <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0 rotate-3 transform border border-outline-variant/30">
              <img
                className="w-full h-full object-cover"
                alt="수제 아몬드 초코볼"
                src="/almond_2ea.webp"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-1 font-headline">달콤한 한 입의 행복</h3>
              <p className="text-secondary text-xs leading-relaxed font-body">최상급 통아몬드를 로스팅한 후 벨기에 프리미엄 다크초콜릿으로 코팅한, 베리굿만의 시그니처 초코볼을 직접 경험해보세요.</p>
            </div>
          </div>
        </section>

        {/* Review Platform Buttons */}
        <section className="px-6 py-12 flex flex-col gap-4">
          <div className="text-center mb-4">
            <p className="font-label text-secondary uppercase tracking-widest text-[10px] font-black mb-2">STEP 01. 플랫폼 선택</p>
            <h2 className="text-2xl text-primary font-bold font-headline">리뷰 작성하기</h2>
          </div>

          <motion.button
            onClick={() => window.open("https://s.baemin.com/dS000CblIB0lg", "_blank")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#2AC1BC] hover:bg-[#25aca8] text-white font-bold py-4 px-6 rounded-lg shadow-md transition-all flex items-center justify-center gap-3"
          >
            <span className="text-sm font-body">배달의민족 리뷰 쓰기</span>
          </motion.button>

          <motion.button
            onClick={() => window.open("https://web.coupangeats.com/share?storeId=946445&dishId&key=b34c7725-a690-4872-953f-ce648229c5f1", "_blank")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#00A5E4] hover:bg-[#0094cd] text-white font-bold py-4 px-6 rounded-lg shadow-md transition-all flex items-center justify-center gap-3"
          >
            <span className="text-sm font-body">쿠팡이츠 리뷰 쓰기</span>
          </motion.button>

          <motion.button
            onClick={() => window.open("https://m.place.naver.com/restaurant/1069379954/review/visitor", "_blank")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#03C75A] hover:bg-[#02b351] text-white font-bold py-4 px-6 rounded-lg shadow-md transition-all flex items-center justify-center gap-3"
          >
            <span className="text-sm font-body">네이버플레이스 리뷰 쓰기</span>
          </motion.button>

          <p className="text-on-surface-variant text-[11px] text-center mt-4 font-medium opacity-70 font-body">리뷰 작성 후 직원에게 화면을 보여주시면 선물을 드립니다.</p>
        </section>

        {/* Customer Reviews */}
        <section className="px-6 pb-12">
          <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-4">
            <div>
              <h2 className="text-2xl text-primary font-bold font-headline">고객 후기</h2>
              <p className="font-label text-secondary text-[10px] uppercase font-bold tracking-tighter">인증된 소셜 리뷰</p>
            </div>
            <span className="material-symbols-outlined text-secondary opacity-30 text-4xl">format_quote</span>
          </div>
          <div className="space-y-6">
            {/* Card 1: Baedal Minjok */}
            <div className="bg-surface-container-lowest p-6 rounded-lg relative overflow-hidden border border-outline-variant/10">
              <div className="absolute top-4 right-4 bg-surface-container-low px-2 py-1 rounded text-[10px] font-black font-label text-secondary">배달의민족</div>
              <div className="flex gap-1 text-[#FFB800] mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="text-on-surface text-sm font-medium italic leading-relaxed mb-4">"초코볼이 정말 환상적이에요. 바삭하고 너무 달지 않아서 딱 좋네요. 강력 추천합니다!"</p>
              <div className="font-label text-outline text-[10px] font-bold">사용자: SweetTooth99</div>
            </div>
            {/* Card 2: Coupang Eats */}
            <div className="bg-surface-container-lowest p-6 rounded-lg relative overflow-hidden border border-outline-variant/10">
              <div className="absolute top-4 right-4 bg-surface-container-low px-2 py-1 rounded text-[10px] font-black font-label text-secondary">쿠팡이츠</div>
              <div className="flex gap-1 text-[#FFB800] mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
              </div>
              <p className="text-on-surface text-sm font-medium italic leading-relaxed mb-4">"동네 최고의 수제 초콜릿 샵이에요. 포장부터가 선물 받는 기분입니다. 또 주문할게요."</p>
              <div className="font-label text-outline text-[10px] font-bold">사용자: ChocoLover_KR</div>
            </div>
            {/* Card 3: Naver */}
            <div className="bg-surface-container-lowest p-6 rounded-lg relative overflow-hidden border border-outline-variant/10">
              <div className="absolute top-4 right-4 bg-surface-container-low px-2 py-1 rounded text-[10px] font-black font-label text-secondary">네이버</div>
              <div className="flex gap-1 text-[#FFB800] mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="text-on-surface text-sm font-medium italic leading-relaxed mb-4">"아몬드 초코볼은 친구들에게 선물할 때마다 반응이 최고예요! 다들 너무 좋아해요."</p>
              <div className="font-label text-outline text-[10px] font-bold">사용자: DailyArtisan</div>
            </div>
          </div>
        </section>

        {/* Brand Trust / Footer */}
        <section className="bg-surface-container-highest/30 py-16 px-6 text-center border-t border-outline-variant/20">
          <h2 className="text-xl font-bold text-primary mb-2 font-headline">품질에 대한 우리의 약속</h2>
          <p className="text-on-surface-variant text-xs leading-relaxed mb-8 max-w-xs mx-auto font-body">
            초콜릿이 필요할 땐 베리굿!
          </p>
          <div className="flex justify-center gap-4">
            <a className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform" href="#!">
              <span className="material-symbols-outlined">camera</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform" href="#!">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform" href="#!">
              <span className="material-symbols-outlined">language</span>
            </a>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-[#f8f3ec]/80 backdrop-blur-xl shadow-[0_-12px_32px_rgba(68,42,34,0.06)] rounded-t-lg">
        <button className="flex flex-col items-center justify-center text-secondary p-2 hover:scale-105 transition-transform active:duration-200 bg-transparent border-none">
          <span className="material-symbols-outlined">event</span>
          <span className="font-label text-[10px] font-bold uppercase tracking-tighter">이벤트</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-full w-12 h-12 mb-1 hover:scale-105 transition-transform active:duration-200 border-none shadow-md">
          <span className="material-symbols-outlined">rate_review</span>
        </button>
        <button className="flex flex-col items-center justify-center text-secondary p-2 hover:scale-105 transition-transform active:duration-200 bg-transparent border-none">
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="font-label text-[10px] font-bold uppercase tracking-tighter">주문</span>
        </button>
        <button className="flex flex-col items-center justify-center text-secondary p-2 hover:scale-105 transition-transform active:duration-200 bg-transparent border-none">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label text-[10px] font-bold uppercase tracking-tighter">프로필</span>
        </button>
      </nav>
    </div>
  );
}