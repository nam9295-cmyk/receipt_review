# Very Good Receipt QR Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement this plan task-by-task. Track progress with the checkboxes in this document.

**Goal:** 기존 `reciept` 프로젝트를 재사용하여 배달 리뷰 이벤트용 모바일 QR 랜딩페이지를 만들고, 정식 주소 `receipt.verygood-chocolate.com`으로 이전하며 기존 오타 주소를 안전하게 301 리다이렉트한다.

**Architecture:** 현재 프로젝트의 프레임워크와 배포 방식을 유지한다. 화면은 하나의 Receipt Landing Page와 재사용 가능한 섹션 컴포넌트로 나누고, 채널·문구·링크·이미지 경로는 콘텐츠 설정 파일에서 관리한다. `/b`, `/c`, `/s`, `/levain`이 같은 화면을 렌더링하며 URL에서 유입 채널만 해석한다.

**Tech Stack:** 기존 저장소의 프레임워크·빌드 도구, Cloudflare Pages, 정적 이미지 WebP/JPG, 기존 또는 GA4 호환 이벤트 분석. 프레임워크 마이그레이션과 신규 백엔드는 사용하지 않는다.

## Global Constraints

- 프로덕션 정식 주소는 `https://receipt.verygood-chocolate.com/`이다.
- 기존 `https://reciept.verygood-chocolate.com/`은 삭제하지 않고 301 이동용으로 유지한다.
- 기존 주소의 경로와 쿼리 문자열을 새 주소에 보존한다.
- 모바일 360~430px 화면을 최우선으로 구현한다.
- 리뷰 평점이나 긍정 리뷰를 강요하는 문구를 사용하지 않는다.
- 핵심 제품·알레르기·이벤트 정보는 이미지가 아닌 HTML 텍스트로 제공한다.
- 사용자 제작 이미지가 늦게 전달되어도 레이아웃·기능 구현과 테스트를 완료할 수 있어야 한다.
- 한국 공식 사이트와 케이크 예약사이트의 기존 운영에는 변경을 가하지 않는다.
- 프레임워크·라우터·CSS 체계는 기존 프로젝트 방식을 우선한다.
- 1차 범위에는 로그인, 쿠폰, CMS, 주문번호 연동, 리뷰 수집 백엔드를 포함하지 않는다.

---

## 1. 구현 전 저장소 조사

### 목적

기존 프로젝트를 살리면서 필요한 부분만 고치기 위해 현재 구조와 배포 설정을 먼저 기록한다. 조사 단계에서 프레임워크 교체나 대규모 리팩터링을 제안하지 않는다.

### 작업

- [ ] 프로젝트 루트에서 아래 명령을 실행한다.

```bash
pwd
find . -maxdepth 2 -type f \
  \( -name 'package.json' -o -name 'vite.config.*' -o -name 'next.config.*' \
     -o -name 'astro.config.*' -o -name 'wrangler.toml' -o -name '_redirects' \
     -o -name 'README*' \) -print
```

- [ ] `package.json`이 있으면 스크립트와 의존성을 확인한다.

```bash
cat package.json
```

- [ ] 현재 페이지의 진입 파일, 전역 스타일, 라우팅, 로고·폰트·푸터 위치를 찾는다.

```bash
grep -R "reciept\|receipt\|very good\|router\|Routes" -n src app pages public 2>/dev/null | head -200
```

- [ ] Git 상태와 최근 변경을 확인한다.

```bash
git status --short
git log --oneline -10
```

- [ ] 아래 내용을 `docs/receipt-current-state.md`에 20줄 이내로 기록한다.

```text
- Framework / version
- Build command
- Output directory
- Production branch
- Current page entry file
- Current global style file
- Current analytics
- Cloudflare Pages project name
- Reusable logo/footer/font assets
- Files that will be modified
```

### 완료 기준

- 기존 프로젝트가 어떤 명령으로 빌드되는지 확인됐다.
- 화면·스타일·라우팅 진입점이 확인됐다.
- 신규 프레임워크 설치 없이 구현 가능한 경로가 정리됐다.

### 커밋

```bash
git add docs/receipt-current-state.md
git commit -m "docs: document current receipt landing project"
```

---

## 2. 콘텐츠·채널 설정 분리

### 목표

문구와 링크를 UI 코드에 흩어놓지 않고 한 파일에서 관리한다. 배민·쿠팡이츠 링크가 바뀌어도 컴포넌트를 수정하지 않는다.

### 권장 파일

기존 프로젝트가 `src`를 사용한다는 전제의 경로다. 다른 구조라면 같은 책임을 가진 디렉터리에 동일한 이름으로 배치한다.

```text
src/content/receiptContent.ts
src/lib/receiptChannel.ts
src/lib/receiptAnalytics.ts
```

JavaScript 프로젝트라면 확장자만 `.js`로 바꾸고 구조와 export 이름은 유지한다.

### `receiptContent` 인터페이스

```ts
export type ReceiptChannel = 'baemin' | 'coupangeats' | 'store' | 'direct';

export interface ReceiptLink {
  label: string;
  href: string;
}

export interface ReceiptContent {
  campaign: 'review-cookie-2026';
  product: 'mini-levain-cookie';
  reviewLinks: Record<ReceiptChannel, ReceiptLink | null>;
  cakeUrl: string;
  krSiteUrl: string;
  mapUrl: string;
  instagramUrl: string;
  assetBase: '/images/receipt';
}
```

### 초기 운영값

직접 리뷰 화면으로 가는 안정적인 URL을 확인하기 전까지 리뷰 링크는 `null`로 두고 안내형 UI를 사용한다. 페이지는 이 상태로도 완전하게 동작해야 한다.

```ts
export const receiptContent: ReceiptContent = {
  campaign: 'review-cookie-2026',
  product: 'mini-levain-cookie',
  reviewLinks: {
    baemin: null,
    coupangeats: null,
    store: null,
    direct: null,
  },
  cakeUrl: 'https://cake.verygood-chocolate.com/',
  krSiteUrl: 'https://kr.verygood-chocolate.com/',
  mapUrl: 'https://kr.verygood-chocolate.com/#location',
  instagramUrl: 'https://www.instagram.com/verygood_chocolate/',
  assetBase: '/images/receipt',
};
```

실제 배달앱 리뷰 링크를 검증한 뒤 `baemin`, `coupangeats` 항목만 `ReceiptLink`로 교체한다. 링크를 넣기 전과 넣은 후 모두 테스트한다.

### 채널 해석 규칙

```ts
export function resolveReceiptChannel(pathname: string): ReceiptChannel {
  if (pathname === '/b' || pathname.startsWith('/baemin')) return 'baemin';
  if (pathname === '/c' || pathname.startsWith('/coupangeats')) return 'coupangeats';
  if (pathname === '/s' || pathname.startsWith('/store')) return 'store';
  return 'direct';
}
```

### 테스트 케이스

- [ ] `/b`는 `baemin`
- [ ] `/c`는 `coupangeats`
- [ ] `/s`는 `store`
- [ ] `/levain`은 `direct`
- [ ] 알 수 없는 경로는 `direct`
- [ ] 쿼리 문자열 유무와 무관하게 pathname으로 해석

### 리뷰 링크 미설정 처리

`reviewLinks[channel]`이 `null`이면 CTA를 죽은 링크로 만들지 않는다. 아래 안내 카드로 대체한다.

```text
주문한 배달앱의 주문내역에서
주문 선택 → 리뷰 쓰기로 참여할 수 있어요.
```

### 완료 기준

- 채널별 문구와 링크가 설정 파일에서 변경된다.
- UI 컴포넌트가 플랫폼 이름을 하드코딩하지 않는다.
- 모든 채널 해석 테스트가 통과한다.

### 커밋

```bash
git add src/content/receiptContent.* src/lib/receiptChannel.* tests 2>/dev/null || true
git commit -m "feat: add receipt campaign content and channel resolver"
```

---

## 3. 페이지 골격과 라우팅

### 목표

`/b`, `/c`, `/s`, `/levain`, `/`에서 동일한 랜딩페이지를 렌더링하고 채널만 달리한다.

### 권장 파일 구조

```text
src/pages/ReceiptLandingPage.tsx
src/components/receipt/ReceiptHeader.tsx
src/components/receipt/ReceiptHero.tsx
src/components/receipt/ProductStory.tsx
src/components/receipt/ProductDetails.tsx
src/components/receipt/ReviewSection.tsx
src/components/receipt/CakeSection.tsx
src/components/receipt/AboutSection.tsx
src/components/receipt/ReceiptFooter.tsx
src/components/receipt/ResponsiveImage.tsx
src/styles/receipt.css
```

기존 프로젝트가 단일 파일 구조라 하더라도 위 책임 단위로 나눈다. 단, 기존 공용 `Header`, `Footer`, `Button`, `Container`가 충분히 비슷하면 새로 만들지 말고 재사용한다.

### 페이지 컴포넌트 데이터 흐름

```text
window.location.pathname
        ↓
resolveReceiptChannel(pathname)
        ↓
ReceiptLandingPage(channel)
        ↓
Hero / Review / Analytics에 channel 전달
```

### 구현 규칙

- [ ] 홈 `/`은 `/levain`으로 강제 이동하지 않고 같은 페이지를 렌더링한다.
- [ ] SPA 라우터가 이미 있으면 기존 라우터에 4개 경로를 등록한다.
- [ ] 라우터가 없으면 `window.location.pathname`으로 채널을 판별하고 단일 페이지를 유지한다.
- [ ] 존재하지 않는 경로도 캠페인 페이지를 렌더링하되 채널은 `direct`로 처리한다.
- [ ] canonical은 항상 `/levain`으로 설정한다.

### 완료 기준

아래 주소를 로컬에서 직접 새로고침해도 404가 발생하지 않는다.

```text
/
/levain
/b
/c
/s
```

### 커밋

```bash
git add src public package.json 2>/dev/null || true
git commit -m "feat: add receipt landing routes and page structure"
```

---

## 4. 브랜드 토큰과 모바일 레이아웃

### 목표

한국 공식 사이트와 연결되는 아이보리·초콜릿 컬러, Work Sans 계열 타이포그래피, 넓은 여백을 구현한다.

### CSS 변수

```css
:root {
  --receipt-bg: #F4F0E8;
  --receipt-surface: #FFFDF8;
  --receipt-text: #211A17;
  --receipt-muted: #786F68;
  --receipt-line: #D8CEC2;
  --receipt-chocolate: #5A3827;
  --receipt-chocolate-dark: #2A1C16;
  --receipt-focus: #8A5A3B;
  --receipt-content: 1120px;
  --receipt-reading: 600px;
  --receipt-mobile-padding: 20px;
}
```

### 필수 레이아웃 규칙

- [ ] `body` 배경은 `--receipt-bg`.
- [ ] 모바일 본문 좌우 패딩은 20px.
- [ ] 섹션 상하 여백은 모바일 72px, 768px 이상 112px.
- [ ] 버튼 높이는 최소 52px.
- [ ] 320px에서 가로 스크롤이 없어야 한다.
- [ ] 콘텐츠 최대 폭은 모바일 600px, 데스크톱 섹션 1120px.
- [ ] 섹션 제목은 짧은 영문 대문자와 한글 본문 조합.
- [ ] 카드 모서리는 최대 8px이며 과도한 pill 형태를 금지한다.

### 반응형 테스트 폭

```text
320 × 700
360 × 800
390 × 844
430 × 932
768 × 1024
1440 × 1000
```

### 완료 기준

- 지정 폭에서 텍스트 잘림과 가로 스크롤이 없다.
- 모바일 CTA가 한 손으로 누르기 충분한 크기다.
- 데스크톱에서 콘텐츠가 지나치게 늘어나지 않는다.

### 커밋

```bash
git add src/styles src/components 2>/dev/null || true
git commit -m "style: establish very good receipt visual system"
```

---

## 5. 히어로와 동적 영수증 메타

### 목표

사용자가 QR 접속 직후 5초 안에 주문 감사·선물·제품명을 이해하게 한다.

### 필수 표시

```text
VERY GOOD RECEIPT
THANK YOU FOR YOUR ORDER
오늘의 선물은 베리굿 미니 르뱅쿠키입니다.
DATE / CHANNEL / GIFT
```

### 날짜 함수

```ts
export function formatReceiptDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\. /g, '.')
    .replace(/\.$/, '');
}
```

출력 예: `2026.08.03`

### 이미지 폴백

영수증 이미지가 없거나 로드에 실패하면 다음 HTML 카드가 표시된다.

```text
VERY GOOD CHOCOLATE
MINI LEVAIN COOKIE × 1
TODAY'S GIFT ₩0
ENJOY YOUR VERY GOOD MOMENT
```

이미지 로딩 실패로 깨진 아이콘을 노출하지 않는다.

### 테스트

- [ ] 서울 시간 기준 날짜 형식이 `YYYY.MM.DD`다.
- [ ] 각 채널 라벨이 정확하다.
- [ ] 이미지 오류 시 HTML 폴백이 표시된다.
- [ ] 영수증 이미지는 장식 이미지로 `alt=""`다.

### 커밋

```bash
git add src public tests 2>/dev/null || true
git commit -m "feat: build receipt hero with channel metadata"
```

---

## 6. 르뱅쿠키 제품 정보

### 목표

무료 증정품의 가치를 올리고 고객이 제품을 안전하게 먹을 수 있도록 한다.

### 섹션 구성

1. `OUR LEVAIN COOKIE`
2. 쿠키 히어로 이미지
3. 제품 설명
4. 특징 3개
5. 쿠키 단면 이미지
6. 맛있게 먹는 법·보관 방법·알레르기 아코디언

### 아코디언 접근성

각 버튼은 아래 구조를 따른다.

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="receipt-detail-storage"
>
  보관 방법
</button>
<div id="receipt-detail-storage" hidden>
  ...
</div>
```

### 중요 검수

- [ ] 알레르기 문구를 실제 레시피와 제조 표기 기준으로 운영자가 최종 확인한다.
- [ ] 이미지 안 문구와 HTML 문구가 충돌하지 않는다.
- [ ] 전자레인지 안내는 제품 테스트 후 초 단위를 최종 확정한다.
- [ ] 아코디언은 마우스·터치·키보드로 작동한다.

### 커밋

```bash
git add src/components/receipt src/content public/images/receipt 2>/dev/null || true
git commit -m "feat: add levain cookie story and product details"
```

---

## 7. 리뷰 CTA와 안전한 링크 처리

### 목표

유입 채널에 맞는 리뷰 CTA를 표시하면서 평점 강요 없이 솔직한 후기를 요청한다.

### UI 상태

#### 링크가 있는 채널

- 플랫폼명 표시
- 활성 CTA
- 이벤트 제공 고지
- 리뷰 작성 간단 안내

#### 링크가 없는 채널

- 비활성 버튼을 보여주지 않는다.
- 주문내역에서 리뷰 쓰기로 이동하는 2단계 안내를 표시한다.
- 배민·쿠팡이츠 선택 링크가 모두 설정돼 있으면 두 개의 보조 버튼을 제공할 수 있다.

### 외부 링크 보안

새 탭을 사용하는 링크에만 아래 속성을 적용한다.

```html
rel="noopener noreferrer"
```

기본 모바일 흐름은 같은 탭 이동이다.

### 테스트

- [ ] `/b`에서는 배민 CTA만 우선 표시된다.
- [ ] `/c`에서는 쿠팡이츠 CTA만 우선 표시된다.
- [ ] `/s`와 `/levain`은 중립 안내를 표시한다.
- [ ] `null`, 빈 문자열, 잘못된 URL에서 죽은 CTA가 표시되지 않는다.
- [ ] 이벤트 제공 고지가 CTA 바로 아래에 보인다.

### 커밋

```bash
git add src/components/receipt src/content tests 2>/dev/null || true
git commit -m "feat: add channel-aware review call to action"
```

---

## 8. 케이크·공식 사이트·매장 연결

### 목표

리뷰 이후 고객의 관심을 케이크 예약과 한국 매장으로 확장한다.

### 링크

```text
Cake: https://cake.verygood-chocolate.com/
Official KR: https://kr.verygood-chocolate.com/
```

지도와 인스타그램 주소는 기존 한국 사이트의 실제 링크를 확인해 `receiptContent`에 입력한다.

### CTA 우선순위

1. 케이크 둘러보기
2. 베리굿 메뉴 보기
3. 매장 위치 보기
4. Instagram

### 추적 파라미터

외부 사이트가 UTM을 사용 중이면 아래 값을 추가한다.

```text
utm_source=receipt_qr
utm_medium=offline_qr
utm_campaign=review_cookie_2026
utm_content=baemin | coupangeats | store | direct
```

링크를 생성하는 함수는 기존 쿼리 문자열을 유지하면서 UTM을 추가해야 한다.

### 테스트

- [ ] 채널별 `utm_content`가 정확하다.
- [ ] 기존 쿼리 문자열이 있는 URL을 깨뜨리지 않는다.
- [ ] 클릭 영역 전체가 링크다.
- [ ] 내부 카피와 이동 목적지가 일치한다.

### 커밋

```bash
git add src/components/receipt src/lib src/content tests 2>/dev/null || true
git commit -m "feat: connect receipt campaign to cake and store sites"
```

---

## 9. 이벤트 분석

### 목표

별도 백엔드 없이 페이지 유입과 주요 CTA 클릭을 측정한다.

### 이벤트 인터페이스

```ts
export type ReceiptEventName =
  | 'receipt_view'
  | 'review_cta_click'
  | 'cake_cta_click'
  | 'kr_site_click'
  | 'map_click'
  | 'instagram_click'
  | 'product_info_open';

export interface ReceiptEventPayload {
  channel: ReceiptChannel;
  campaign: 'review-cookie-2026';
  product: 'mini-levain-cookie';
  destination?: string;
  section?: string;
}

export function trackReceiptEvent(
  name: ReceiptEventName,
  payload: ReceiptEventPayload,
): void;
```

### 구현 우선순위

1. 기존 프로젝트에 분석 도구가 있으면 동일 도구를 사용한다.
2. 기존 분석이 없고 GA4 측정 ID가 준비돼 있으면 환경변수로 연결한다.
3. 분석 설정이 없으면 개발·프리뷰에서 콘솔 디버그만 하고 페이지 동작을 막지 않는다.

권장 환경변수:

```text
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Next.js 등 다른 프레임워크면 동일 의미의 public 환경변수 이름으로 매핑한다.

### 중복 방지

`receipt_view`는 `sessionStorage` 키로 같은 세션에서 한 번만 전송한다.

```text
verygood.receipt.review-cookie-2026.viewed
```

### 개인정보 원칙

- 주문번호 수집 금지
- 이름·전화번호·배달 주소 수집 금지
- QR 자체에 개인 식별값 삽입 금지
- 이벤트에는 채널·캠페인·클릭 대상만 기록

### 테스트

- [ ] 같은 세션에서 `receipt_view`가 한 번만 호출된다.
- [ ] CTA별 이벤트 이름이 정확하다.
- [ ] 분석 스크립트가 없어도 오류 없이 링크 이동이 된다.

### 커밋

```bash
git add src/lib src/components tests .env.example 2>/dev/null || true
git commit -m "feat: track receipt qr campaign interactions"
```

---

## 10. 이미지 자산과 성능

### 목표

사용자 제작 이미지를 교체하기 쉽게 만들고 배달 고객의 모바일 환경에서도 빠르게 표시한다.

### 자산 경로

```text
public/images/receipt/receipt-main.webp
public/images/receipt/levain-hero.webp
public/images/receipt/levain-detail.webp
public/images/receipt/cake-feature.webp
public/images/receipt/store-feature.webp
public/images/receipt/og-receipt.jpg
```

### 이미지 전달 전 임시 상태

실제 사진이 없을 때는 텍스트가 들어간 임시 AI 이미지나 외부 이미지를 사용하지 않는다. 고정 비율의 중립 배경 블록과 파일명 라벨을 개발 모드에서만 표시한다.

### 최적화 기준

- [ ] 첫 화면 이미지 300KB 이하
- [ ] 초기 로드 이미지 총합 900KB 이하
- [ ] 비핵심 이미지 lazy load
- [ ] 모든 이미지에 width·height 또는 aspect-ratio 지정
- [ ] 쿠키·케이크 이미지에 적절한 alt 제공
- [ ] 영수증 장식 이미지는 빈 alt

### Lighthouse 목표

모바일 프로덕션 빌드 기준:

```text
Performance ≥ 90
Accessibility ≥ 95
Best Practices ≥ 95
SEO 항목은 noindex 정책을 제외하고 오류 없음
CLS < 0.1
LCP < 2.5s
```

### 커밋

```bash
git add public/images src/components 2>/dev/null || true
git commit -m "perf: optimize receipt landing media loading"
```

---

## 11. 메타데이터·접근성·모션

### 메타데이터

```text
Title: 오늘의 선물, 미니 르뱅쿠키 | 베리굿초콜릿
Description: 베리굿 주문과 함께 받은 미니 르뱅쿠키의 이야기와 제품 정보, 케이크 예약과 매장 소식을 확인해 보세요.
Robots: noindex,follow
Canonical: https://receipt.verygood-chocolate.com/levain
```

### 접근성 체크

- [ ] `html lang="ko"`
- [ ] 건너뛰기 링크 또는 명확한 main landmark
- [ ] heading 순서 `h1 → h2 → h3`
- [ ] 포커스 링 표시
- [ ] 버튼 최소 44×44px
- [ ] 색상만으로 채널·상태를 구분하지 않음
- [ ] 아코디언 ARIA 적용
- [ ] 이미지 대체 텍스트 검수

### 모션

- 등장 모션은 `opacity`와 최대 12px 이동만 사용한다.
- `prefers-reduced-motion: reduce`에서는 모션을 제거한다.
- 스크롤을 강제로 가로채지 않는다.

### 커밋

```bash
git add src public 2>/dev/null || true
git commit -m "feat: add receipt metadata and accessibility polish"
```

---

## 12. 자동·수동 테스트

### 자동 테스트

최소 테스트 대상:

1. `resolveReceiptChannel`
2. 날짜 형식
3. UTM 링크 생성
4. 분석 이벤트 중복 방지
5. 리뷰 링크 null 처리
6. 이미지 오류 폴백

프로젝트에 테스트 도구가 없으면 기존 빌드에 맞는 가장 가벼운 도구를 추가한다. React/Vite라면 Vitest와 Testing Library를 우선한다. 이미 Jest가 있으면 Jest를 유지한다.

### 빌드 검증

```bash
npm run lint
npm run test -- --run
npm run build
```

스크립트 이름이 다르면 `package.json`에 정의된 동일 목적 명령을 사용한다.

### 수동 모바일 테스트

각 주소에서 확인한다.

```text
https://<preview-domain>/b
https://<preview-domain>/c
https://<preview-domain>/s
https://<preview-domain>/levain
```

체크 항목:

- [ ] 채널 라벨과 리뷰 CTA 일치
- [ ] 리뷰 CTA 실제 이동
- [ ] 케이크·공식 사이트·지도·인스타 이동
- [ ] 뒤로 가기 정상 동작
- [ ] 새로고침 시 404 없음
- [ ] 이미지 실패 시 레이아웃 유지
- [ ] 320px 가로 스크롤 없음
- [ ] iPhone Safari의 safe area 문제 없음
- [ ] Android Chrome에서 폰트와 버튼 정상
- [ ] 느린 4G에서 첫 콘텐츠가 빠르게 표시

### QR 실물 테스트

- [ ] 배민용 QR이 `/b`로 연결된다.
- [ ] 쿠팡이츠용 QR이 `/c`로 연결된다.
- [ ] iPhone 기본 카메라에서 인식된다.
- [ ] Android 기본 카메라에서 인식된다.
- [ ] 실제 인쇄 크기 22~25mm에서 인식된다.
- [ ] QR 주변 흰 여백이 확보된다.

### 커밋

```bash
git add tests docs package.json 2>/dev/null || true
git commit -m "test: cover receipt landing flows and qr routes"
```

---

## 13. Cloudflare Pages 프리뷰 배포

### 목표

프로덕션 도메인을 바꾸기 전에 프리뷰 URL에서 전체 흐름을 검수한다.

### 작업

- [ ] 기능 브랜치를 생성한다.

```bash
git switch -c feat/receipt-qr-landing
```

이미 기능 브랜치에서 작업 중이면 새 브랜치를 중복 생성하지 않는다.

- [ ] 원격 저장소에 push하여 Cloudflare Pages 프리뷰 배포를 만든다.

```bash
git push -u origin feat/receipt-qr-landing
```

- [ ] 프리뷰에서 `/b`, `/c`, `/s`, `/levain` 새로고침을 테스트한다.
- [ ] 실제 모바일 기기에서 QR을 스캔한다.
- [ ] 분석 도구는 프리뷰 데이터를 프로덕션과 구분한다.

### 완료 기준

- 모든 경로가 프리뷰에서 200 응답 또는 정상 SPA fallback을 제공한다.
- 프로덕션 주소를 건드리지 않고 사용자 검수가 가능하다.

---

## 14. 정식 도메인 연결

### 원칙

새 프로젝트를 만들지 않고 현재 Cloudflare Pages 프로젝트에 `receipt.verygood-chocolate.com`을 정식 사용자 지정 도메인으로 추가한다.

### Cloudflare 작업 순서

1. Cloudflare Dashboard → Workers & Pages
2. 기존 receipt 프로젝트 선택
3. Custom domains → Set up a domain
4. `receipt.verygood-chocolate.com` 입력
5. 활성화 완료 및 인증서 발급 확인
6. DNS에서 자동 생성된 CNAME·프록시 상태 확인

Cloudflare Pages 사용자 지정 도메인은 Pages 프로젝트의 Custom domains 절차를 통해 먼저 연결한다. DNS 레코드만 수동으로 추가하고 Pages에 도메인을 등록하지 않는 방식은 사용하지 않는다.

### 확인 명령

```bash
curl -I https://receipt.verygood-chocolate.com/
curl -I https://receipt.verygood-chocolate.com/b
curl -I https://receipt.verygood-chocolate.com/c
```

기대 결과:

- HTTPS 정상
- 인증서 오류 없음
- 최종 페이지 200
- canonical은 `/levain`

---

## 15. 기존 오타 도메인 301 리다이렉트

### 목표

기존 QR·공유 링크를 살리면서 모든 트래픽을 올바른 철자의 새 주소로 보낸다.

### 권장 방식

Cloudflare zone-level **Single Redirect** 또는 **Bulk Redirect**를 사용한다. Pages 프로젝트의 `_redirects` 파일은 도메인 간 이동 용도로 사용하지 않는다.

### Single Redirect 설정

```text
Rule name: reciept-to-receipt
Incoming requests: Wildcard pattern
Request URL: http*://reciept.verygood-chocolate.com/*
Target URL: https://receipt.verygood-chocolate.com/${2}
Status code: 301
Preserve query string: Enabled
```

이 패턴의 `${1}`은 `http` 또는 `https`의 `*` 부분이고 `${2}`가 경로 splat이므로 대상 경로에 `${2}`를 사용한다.

### 테스트 표

| 기존 요청 | 기대 최종 주소 |
|---|---|
| `http://reciept.verygood-chocolate.com/` | `https://receipt.verygood-chocolate.com/` |
| `https://reciept.verygood-chocolate.com/b` | `https://receipt.verygood-chocolate.com/b` |
| `https://reciept.verygood-chocolate.com/c?test=1` | `https://receipt.verygood-chocolate.com/c?test=1` |
| `https://reciept.verygood-chocolate.com/levain` | `https://receipt.verygood-chocolate.com/levain` |

### 확인 명령

```bash
curl -I http://reciept.verygood-chocolate.com/b
curl -I 'https://reciept.verygood-chocolate.com/c?test=1'
```

기대 결과:

```text
HTTP 301
Location: https://receipt.verygood-chocolate.com/b
```

두 번째 요청은 `?test=1`을 유지해야 한다.

### 주의

- 기존 `reciept` DNS를 바로 삭제하지 않는다.
- 리다이렉트 확인 전 기존 Pages custom domain을 제거하지 않는다.
- 브라우저 캐시 때문에 301 테스트가 혼동될 수 있으므로 `curl -I`와 시크릿 창을 함께 사용한다.

---

## 16. 프로덕션 전환과 롤백

### 전환 순서

- [ ] 디자인·카피 최종 검수
- [ ] 실제 이미지 5종 적용
- [ ] 리뷰·지도·인스타 링크 적용
- [ ] 알레르기·보관 문구 제조 기준 확인
- [ ] 프로덕션 빌드 성공
- [ ] 프리뷰 모바일 테스트 성공
- [ ] `receipt` custom domain 활성화
- [ ] `reciept` → `receipt` 301 활성화
- [ ] QR 실물 테스트
- [ ] 배민·쿠팡이츠용 QR 최종 인쇄

### 롤백 기준

아래 문제가 발생하면 Cloudflare Pages의 이전 성공 배포로 즉시 롤백한다.

- 주요 주소 404
- 모바일 CTA 작동 불가
- 리뷰 링크가 잘못된 플랫폼으로 연결
- 페이지가 빈 화면으로 표시
- 이미지 때문에 레이아웃이 심하게 깨짐

도메인 301 규칙은 새 사이트가 정상 제공되는 상태에서만 유지한다. 새 사이트 장애가 길어지면 리다이렉트를 일시 중지하고 기존 주소에 마지막 정상 배포를 다시 제공한다.

---

## 17. 최종 인수 조건

### 기능

- [ ] `/b`, `/c`, `/s`, `/levain`, `/`가 모두 열린다.
- [ ] 배민·쿠팡이츠 채널 표시와 CTA가 정확하다.
- [ ] 리뷰 링크 미설정 상태가 안전하게 처리된다.
- [ ] 케이크·공식 사이트·지도·인스타 링크가 정상이다.
- [ ] 이벤트 분석이 페이지를 방해하지 않는다.

### 디자인

- [ ] `receipt-design.md`의 섹션 순서를 따른다.
- [ ] 한국 공식 사이트와 타이포그래피·여백·색감이 연결된다.
- [ ] 영수증 콘셉트가 과도하게 장난스럽지 않다.
- [ ] 실제 이미지가 없어도 구조 검수가 가능하다.

### 품질

- [ ] lint·test·build 통과
- [ ] Lighthouse 목표 충족 또는 미달 사유 기록
- [ ] 320px에서 가로 스크롤 없음
- [ ] 키보드·스크린리더 기본 접근성 확보
- [ ] 새 주소 HTTPS 정상
- [ ] 기존 주소 301과 경로·쿼리 보존 확인

### 운영

- [ ] 배민 QR은 `/b`
- [ ] 쿠팡이츠 QR은 `/c`
- [ ] QR 원본 파일과 인쇄용 파일을 별도 보관
- [ ] 운영자가 링크와 카피를 한 설정 파일에서 수정 가능
- [ ] README에 도메인·QR 경로·이미지 교체 방법 기록

---

## 18. README에 추가할 운영 안내

```markdown
## Receipt QR Campaign

Production: https://receipt.verygood-chocolate.com/
Canonical: https://receipt.verygood-chocolate.com/levain

QR routes:
- Baemin: /b
- Coupang Eats: /c
- Store/Test: /s

Content and external links:
- src/content/receiptContent.ts

Images:
- public/images/receipt/

Legacy domain:
- https://reciept.verygood-chocolate.com/
- Redirected permanently to the correct receipt subdomain.
```

---

## 19. 구현 순서 요약

```text
현재 프로젝트 조사
→ 콘텐츠·채널 설정 분리
→ 페이지 골격·라우팅
→ 모바일 디자인 토큰
→ 영수증 히어로
→ 쿠키 제품 정보
→ 리뷰 CTA
→ 케이크·매장 연결
→ 분석
→ 이미지·성능
→ 접근성·메타
→ 테스트
→ Cloudflare 프리뷰
→ receipt 도메인 연결
→ reciept 301 리다이렉트
→ 실제 QR 인쇄 검수
```

---

## 20. 공식 참고 문서

- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Cloudflare URL forwarding: https://developers.cloudflare.com/rules/url-forwarding/
- Redirect to another hostname: https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-different-hostname/
- Bulk Redirect parameters: https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/parameters/
