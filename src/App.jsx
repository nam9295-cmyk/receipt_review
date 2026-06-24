import React from 'react';

const reviewLinks = [
  {
    id: 'baemin',
    label: '배달의민족 리뷰 쓰기',
    eyebrow: 'BAEMIN',
    href: 'https://s.baemin.com/dS000CblIB0lg',
  },
  {
    id: 'coupang',
    label: '쿠팡이츠 리뷰 쓰기',
    eyebrow: 'COUPANG EATS',
    href: 'https://web.coupangeats.com/share?storeId=946445',
  },
  {
    id: 'naver',
    label: '네이버 플레이스 리뷰 쓰기',
    eyebrow: 'NAVER PLACE',
    href: 'https://m.place.naver.com/restaurant/1069379954/review/visitor',
  },
];

const steps = [
  ['01', '플랫폼 선택', '주문하신 채널을 골라 리뷰 화면으로 이동해 주세요.'],
  ['02', '리뷰 작성', '짧은 한 줄 리뷰도 괜찮아요. 사진이 있으면 더 좋아요.'],
  ['03', '완료 화면 제시', '작성 완료 화면을 매장 직원에게 보여주세요.'],
  ['04', '선물 수령', '오늘 준비된 생크림 갸또 케이크 맛보기 선물을 드립니다.'],
];

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header" aria-label="Very Good Chocolate 리뷰 이벤트">
        <a className="brand-mark" href="https://verygood-chocolate.com" aria-label="Very Good Chocolate">
          very good
        </a>
        <a className="header-pill" href="#review-links">리뷰 쓰기</a>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <p className="hero-kicker">VERY GOOD CHOCOLATE</p>
          <div className="hero-type" aria-hidden="true">
            <span>REVIEW</span>
            <span>EVENT</span>
          </div>

          <div className="hero-product-wrap" aria-hidden="true">
            <div className="circle-badge">GIFT<br />FOR<br />REVIEW</div>
            <img className="hero-product hero-product-main" src="/cream-gateau-cake.webp" alt="" />
            <span className="mint-label mint-label-one">review</span>
            <span className="mint-label mint-label-two">gift</span>
          </div>

          <div className="hero-copy">
            <h1 id="hero-title">리뷰 남겨주시면<br />생크림 갸또를 맛보실 수 있어요.</h1>
            <p>
              주문하신 플랫폼에서 리뷰를 작성한 뒤, 완료 화면을 직원에게 보여주세요.
              오늘 준비된 생크림 갸또 케이크 맛보기 선물을 드립니다.
            </p>
            <a className="primary-cta" href="#review-links">리뷰 작성하러 가기</a>
          </div>
        </section>

        <section className="review-section" id="review-links" aria-labelledby="review-heading">
          <div className="section-heading">
            <p>CHOOSE YOUR PLATFORM</p>
            <h2 id="review-heading">리뷰 작성하기</h2>
          </div>

          <div className="review-link-list">
            {reviewLinks.map((link) => (
              <a
                key={link.id}
                className={`review-link review-link-${link.id}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{link.eyebrow}</span>
                <strong>{link.label}</strong>
              </a>
            ))}
          </div>

          <p className="receipt-note">
            영수증 QR로 들어오신 손님은 주문하신 채널을 선택해 주세요. 앱이 열리지 않으면 브라우저에서 다시 한 번 눌러주세요.
          </p>
        </section>

        <section className="steps-section" aria-labelledby="steps-heading">
          <div className="section-heading left">
            <p>HOW TO JOIN</p>
            <h2 id="steps-heading">참여 방법</h2>
          </div>
          <div className="step-grid">
            {steps.map(([num, title, desc]) => (
              <article className="step-card" key={num}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="thanks-section" aria-label="감사 인사">
          <p>초콜릿이 필요할 땐 베리굿.</p>
          <h2>정성스러운 리뷰는<br />저희에게 큰 힘이 됩니다.</h2>
          <a className="secondary-cta" href="https://cake.verygood-chocolate.com/" target="_blank" rel="noopener noreferrer">
            케이크 예약 페이지 보기
          </a>
        </section>
      </main>
    </div>
  );
}
