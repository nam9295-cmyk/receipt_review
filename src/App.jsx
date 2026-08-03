import { campaign, campaignLink, resolveChannel } from './receiptContent';

function ExternalArrow() {
  return <span className="external-arrow" aria-hidden="true">↗</span>;
}

function ReviewLink({ link }) {
  return (
    <a
      className={`review-link review-link-${link.id}`}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="platform-logo" aria-hidden="true">{link.logo}</span>
      <span className="platform-text">
        <span className="platform-eyebrow">{link.eyebrow}</span>
        <strong>{link.label}</strong>
        <em>{link.instruction}</em>
      </span>
      <span className="platform-arrow" aria-hidden="true"><ExternalArrow /></span>
    </a>
  );
}

const productInfo = [
  ['제품 구성', campaign.product.mainProduct],
  ['초코 르뱅', campaign.product.chocolateProduct],
  ['증정용', campaign.product.reviewProduct],
  ['원재료', campaign.product.ingredients],
  ['알레르기', campaign.product.allergenNote],
  ['보관·소비기한', campaign.product.storageNote],
];

export default function App() {
  const channel = resolveChannel(window.location.pathname);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">본문으로 건너뛰기</a>

      <header className="site-header" aria-label="Very Good Chocolate 쿠키 안내">
        <a
          className="brand-mark"
          href={campaignLink(campaign.brandUrl, 'header-brand')}
          aria-label="Very Good Chocolate 공식 사이트"
        >
          very good
        </a>
        <a className="header-pill" href="#review-links">리뷰 남기기</a>
      </header>

      <main id="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <p className="hero-kicker">VERY GOOD CHOCOLATE</p>
          <div className="hero-type" aria-hidden="true">
            <span>REVIEW</span>
            <span>EVENT</span>
          </div>

          <div className="hero-product-wrap" aria-hidden="true">
            <div className="circle-badge">A VERY<br />GOOD<br />GIFT</div>
            <img className="hero-product hero-product-main" src="/levein.webp" alt="" width="800" height="800" fetchPriority="high" decoding="async" />
            <span className="mint-label mint-label-one">cookie</span>
            <span className="mint-label mint-label-two">thank you</span>
          </div>

          <div className="hero-copy">
            <h1 id="hero-title">주문해주셔서 고마워요.<br />미니 르뱅쿠키 하나 같이 보낼게요.</h1>
            <p>
              쿠키 정보는 아래에서 확인해 주세요.<br />
              리뷰는 주문하신 곳에서 편하게 남겨주세요.
            </p>
            <a className="primary-cta" href="#product-info">쿠키 정보 보기</a>
          </div>
        </section>

        <section className="product-section" id="product-info" aria-labelledby="product-heading">
          <div className="section-heading left">
            <p>COOKIE INFO</p>
            <h2 id="product-heading">쿠키는 이렇게<br />준비했어요.</h2>
          </div>

          <div className="product-overview">
            <article className="product-info-card">
              <p className="card-kicker">THE COOKIES</p>
              <h3>{campaign.product.name}</h3>
              <dl className="product-spec-list">
                {productInfo.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className="nutrition-card">
              <p className="card-kicker">NUTRITION INFORMATION</p>
              <h3>영양정보</h3>
              <div className="nutrition-table-wrap">
                <table className="nutrition-table">
                  <caption className="sr-only">르뱅쿠키, 초코 르뱅쿠키, 25g 증정용 미니 쿠키의 영양정보</caption>
                  <thead>
                    <tr>
                      <th scope="col">항목</th>
                      <th scope="col">르뱅<br />90g</th>
                      <th scope="col">초코<br />90g</th>
                      <th scope="col">미니<br />25g</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaign.product.nutrition.map(([label, main, chocolate, mini]) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        <td>{main}</td>
                        <td>{chocolate}</td>
                        <td>{mini}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </section>

        <section className="review-section" id="review-links" aria-labelledby="review-heading">
          <div className="section-heading">
            <p>YOUR REVIEW</p>
            <h2 id="review-heading">주문은 어떠셨나요?<br />편하게 남겨주세요.</h2>
          </div>

          <div className="channel-note">
            <span>{channel.label}</span>
            <span aria-hidden="true">·</span>
            <span>리뷰를 남길 곳을 골라주세요</span>
          </div>

          <div className="review-link-list">
            {channel.links.map((link) => <ReviewLink key={link.id} link={link} />)}
          </div>

          <p className="review-notice">{campaign.reviewNotice}</p>
        </section>

        <section className="thanks-section" aria-labelledby="thanks-heading">
          <p>SEE YOU AGAIN</p>
          <h2 id="thanks-heading">다음에도<br />베리굿에서 만나요.</h2>
          <div className="thanks-links">
            <a className="secondary-cta" href={campaignLink(campaign.cakeUrl, 'cake')} target="_blank" rel="noopener noreferrer">
              케이크 예약하기 <ExternalArrow />
            </a>
            <a className="secondary-cta" href={campaignLink(campaign.locationUrl, 'location')} target="_blank" rel="noopener noreferrer">
              매장 위치 보기 <ExternalArrow />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-block">
            <a href={campaignLink(campaign.brandUrl, 'footer-brand')} aria-label="Very Good Chocolate 공식 사이트로 이동">very good</a>
            <span>쿠키도 맛있게 드세요</span>
          </div>
          <div className="footer-meta">
            <div className="footer-links">
              <a href={campaignLink(campaign.brandUrl, 'footer-site')} target="_blank" rel="noopener noreferrer">
                공식 사이트 <ExternalArrow />
              </a>
              <a href={campaignLink(campaign.instagramUrl, 'instagram')} target="_blank" rel="noopener noreferrer">
                Instagram <ExternalArrow />
              </a>
            </div>
            <address>대구광역시 수성구 상록로11길 13 1층 베리굿초콜릿</address>
            <p className="footer-legal">
              주식회사 베리굿 · 대표 천정민<br />
              사업자등록번호 850-81-02950 · 통신판매업신고 2023-DaeguDalseo-1940
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
