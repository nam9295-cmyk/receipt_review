# Very Good Receipt QR Landing Page — Design Specification

- 문서 버전: 1.0
- 작성일: 2026-08-03
- 대상 페이지: `https://receipt.verygood-chocolate.com/`
- 기존 프로젝트: `https://reciept.verygood-chocolate.com/` 코드베이스 재사용
- 핵심 캠페인: 배달의민족·쿠팡이츠 리뷰 이벤트용 미니 르뱅쿠키 증정
- 제작 원칙: 모바일 우선, 빠른 이해, 자연스러운 브랜드 탐색, 과도하지 않은 리뷰 유도

---

## 1. 프로젝트 한 줄 정의

배달 주문과 함께 받은 미니 르뱅쿠키를 **“무료 서비스”가 아니라 “베리굿이 건네는 작은 선물”**로 느끼게 하고, 쿠키 정보 → 솔직한 리뷰 → 케이크 예약 → 한국 매장 소개로 자연스럽게 연결하는 모바일 QR 랜딩페이지다.

---

## 2. 목표와 우선순위

### 2.1 사용자 목표

1. QR을 찍은 즉시 어떤 선물을 받았는지 이해한다.
2. 르뱅쿠키의 특징·보관·알레르기 정보를 확인한다.
3. 부담 없이 배달앱 리뷰 화면으로 이동한다.
4. 베리굿의 케이크와 매장을 새롭게 발견한다.

### 2.2 비즈니스 목표

1. 리뷰 이벤트 참여율과 QR 접속률을 측정한다.
2. 배민과 쿠팡이츠 유입을 구분한다.
3. 케이크 예약사이트 클릭을 늘린다.
4. 배달 고객에게 베리굿을 단순 배달 브랜드가 아닌 초콜릿·디저트 전문점으로 기억시킨다.

### 2.3 콘텐츠 우선순위

`선물의 만족감 → 쿠키 신뢰 → 솔직한 리뷰 → 케이크 발견 → 매장 기억`

첫 화면부터 리뷰·케이크·인스타그램 버튼을 한꺼번에 노출하지 않는다. 고객이 선물을 이해한 뒤 다음 행동을 선택하도록 순차적으로 보여준다.

---

## 3. 핵심 콘셉트

### A VERY GOOD RECEIPT

실제 종이 영수증을 그대로 흉내 내기보다, **패션 브랜드의 에디토리얼 영수증 + 베리굿의 따뜻한 디저트 사진**을 결합한다.

핵심 표현:

- `VERY GOOD RECEIPT`
- `THANK YOU FOR YOUR ORDER`
- `MINI LEVAIN COOKIE × 1`
- `TODAY'S GIFT  ₩0`
- `ENJOY YOUR VERY GOOD MOMENT`

영수증 그래픽은 사용자가 직접 제작한다. 페이지는 영수증 이미지에 모든 정보를 의존하지 않으며, 핵심 문구와 제품 정보는 반드시 HTML 텍스트로도 제공한다.

---

## 4. 기존 브랜드와의 연결

### 4.1 한국 공식 사이트에서 이어받을 요소

- 짧은 영문 대문자 섹션 제목
- 넓은 상하 여백
- 아이보리·오프화이트 기반의 차분한 배경
- 검정에 가까운 초콜릿 컬러의 타이포그래피
- 제품 사진이 중심이 되는 편집형 레이아웃
- `very good` 소문자 로고
- 외부 이동 버튼의 `↗` 표현
- 간결한 푸터와 브랜드·매장 연결

### 4.2 케이크 사이트와의 연결

- 케이크 CTA는 별도의 쇼핑몰 광고처럼 보이지 않게 한다.
- `VERY GOOD CAKE`라는 독립 섹션으로 구성한다.
- CTA 문구는 첫 노출에서 `케이크 주문하기`보다 부담이 적은 `케이크 둘러보기 ↗`를 사용한다.
- 이동 주소는 `https://cake.verygood-chocolate.com/`으로 통일한다.

### 4.3 이 페이지에서만 사용하는 개성

- 점선 구분선
- 영수증 번호·날짜·채널처럼 보이는 작은 메타 정보
- `₩0` 선물 표시
- 얇은 모노스페이스 숫자
- 절취선처럼 보이는 섹션 전환

영수증 요소를 너무 많이 사용하면 저가 프로모션 페이지처럼 보일 수 있으므로, 점선·번호·가격 표시는 히어로와 일부 구분선에만 제한한다.

---

## 5. 정보 구조와 이동 흐름

```text
QR 스캔
  ↓
1. VERY GOOD RECEIPT — 주문 감사와 오늘의 선물
  ↓
2. OUR LEVAIN COOKIE — 쿠키 정보·보관·알레르기
  ↓
3. HOW WAS YOUR ORDER? — 배달앱 리뷰 CTA
  ↓
4. VERY GOOD CAKE — 케이크 예약사이트 발견
  ↓
5. ABOUT VERY GOOD — 공식 한국 사이트·매장·인스타그램
  ↓
6. 브랜드 푸터
```

### 채널별 진입 주소

인쇄되는 QR은 짧고 구분하기 쉬운 주소를 사용한다.

- 배달의민족: `https://receipt.verygood-chocolate.com/b`
- 쿠팡이츠: `https://receipt.verygood-chocolate.com/c`
- 매장·공용 테스트: `https://receipt.verygood-chocolate.com/s`
- 대표 주소: `https://receipt.verygood-chocolate.com/levain`

모든 주소는 같은 페이지를 렌더링하고 내부 채널 값만 다르게 설정한다.

- `/b` → `baemin`
- `/c` → `coupangeats`
- `/s` → `store`
- `/levain` 또는 알 수 없는 경로 → `direct`

---

## 6. 모바일 화면 상세 설계

## 6.1 글로벌 헤더

### 구성

- 좌측 또는 중앙: `very good` 로고
- 우측: 메뉴 버튼을 두지 않는다.
- 높이: 56px
- 배경: 페이지 배경과 동일
- 스크롤 시 고정하지 않는다.

### 이유

짧은 캠페인 페이지에서 고정 메뉴는 화면을 차지하고 사용 흐름을 분산시킨다. 페이지 내 탐색보다 순차 스크롤을 우선한다.

---

## 6.2 히어로 — VERY GOOD RECEIPT

### 화면 구성

1. 작은 라벨: `VERY GOOD RECEIPT`
2. 큰 제목: `THANK YOU FOR YOUR ORDER`
3. 한글 메시지
4. 사용자가 만든 영수증 이미지
5. 쿠키 제품 이미지 또는 영수증 이미지 안의 제품 컷
6. 스크롤 안내

### 확정 카피

```text
VERY GOOD RECEIPT

THANK YOU FOR YOUR ORDER

오늘도 베리굿을 선택해 주셔서 감사합니다.
주문과 함께 작은 초콜릿 선물을 보내드렸어요.

오늘의 선물은
베리굿 미니 르뱅쿠키입니다.
```

영수증 이미지 안 권장 문구:

```text
VERY GOOD CHOCOLATE
ORDER COMPLETE

MINI LEVAIN COOKIE     × 1
TODAY'S GIFT            ₩0

ENJOY YOUR
VERY GOOD MOMENT
```

채널 메타는 HTML로 이미지 아래에 작게 표시한다.

```text
DATE      2026.08.03
CHANNEL   BAEMIN
GIFT      MINI LEVAIN COOKIE
```

`DATE`는 실제 접속 날짜를 `YYYY.MM.DD` 형식으로 표시한다. `CHANNEL`은 `BAEMIN`, `COUPANG EATS`, `STORE`, `DIRECT` 중 하나다.

### 레이아웃

- 섹션 상단 여백: 32px
- 텍스트 최대 폭: 420px
- 영수증 이미지 최대 폭: 390px
- 모바일 좌우 패딩: 20px
- 이미지 아래 여백: 24px

---

## 6.3 제품 소개 — OUR LEVAIN COOKIE

### 확정 카피

```text
OUR LEVAIN COOKIE

작지만 진하게.

겉은 살짝 바삭하고,
속은 촉촉하고 부드럽게 구운
베리굿의 미니 르뱅쿠키입니다.

진한 초콜릿과 고소한 견과류를 담아
작은 한 개에도 충분한 만족을 만들었습니다.
```

### 특징 카드

```text
01  RICH CHOCOLATE
진한 초콜릿 풍미

02  SOFT & CHEWY
촉촉하고 쫀득한 식감

03  HANDMADE
베리굿에서 직접 만든 쿠키
```

### 제품 정보 아코디언

아코디언은 기본적으로 닫혀 있고 한 번에 여러 항목을 열 수 있다.

1. `맛있게 드시는 방법`
   - 바로 드시면 촉촉하고 부드러운 식감을 즐길 수 있습니다.
   - 포장이 차갑거나 쿠키가 단단해졌다면 전자레인지에 5~10초 정도 데워 드세요.

2. `보관 방법`
   - 당일 섭취를 권장합니다.
   - 바로 드시지 않을 경우 밀봉하여 서늘한 곳에 보관하세요.
   - 장기 보관 안내는 실제 제품 기준으로 운영자가 최종 수정한다.

3. `알레르기 정보`
   - 제품에 실제 사용되는 원재료 기준 문구를 운영자가 최종 입력한다.
   - 기본 표시 영역에는 `밀·우유·달걀·대두·견과류 함유`를 사용하되, 배포 전 제조 레시피와 교차 확인한다.

알레르기 문구는 이미지 안에 넣지 않고 반드시 선택·확대 가능한 HTML 텍스트로 제공한다.

---

## 6.4 리뷰 — HOW WAS YOUR ORDER?

### 확정 카피

```text
HOW WAS YOUR ORDER?

오늘의 베리굿은 어떠셨나요?
맛있게 드셨다면 솔직한 경험을 남겨주세요.
짧은 한 줄도 베리굿에 큰 힘이 됩니다.
```

### 이벤트 고지

```text
미니 르뱅쿠키는 리뷰 이벤트 참여 고객께
무료로 제공되는 제품입니다.
좋았던 점과 아쉬웠던 점 모두 솔직하게 들려주세요.
```

### 채널별 CTA

- `baemin`: `배달의민족에서 리뷰 남기기 ↗`
- `coupangeats`: `쿠팡이츠에서 리뷰 남기기 ↗`
- `store` 또는 `direct`: `주문한 배달앱에서 리뷰 남기기`

직접 리뷰 화면으로 연결되는 안정적인 딥링크가 없으면, 앱 또는 매장 페이지로 이동시킨 뒤 아래 보조 안내를 보여준다.

```text
주문내역 → 주문 선택 → 리뷰 쓰기에서 참여할 수 있어요.
```

### 금지 표현

- `별점 5점 부탁드려요`
- `좋은 리뷰만 남겨주세요`
- `5점 리뷰 작성 시 제공`
- 부정적 의견을 제한하는 표현

CTA 버튼은 페이지 내에서 가장 강한 대비를 사용하되, 배민 민트나 쿠팡이츠 블루를 전체 브랜드 색으로 사용하지 않는다. 플랫폼 컬러는 작은 아이콘 또는 라벨에만 허용한다.

---

## 6.5 케이크 — VERY GOOD CAKE

### 확정 카피

```text
VERY GOOD CAKE

특별한 날에도,
초콜릿이 생각나는 날에도.

베리굿의 케이크는 예약 주문으로
정성껏 준비합니다.
```

### 구성

- 대표 케이크 이미지 1장
- 짧은 설명
- CTA `케이크 둘러보기 ↗`
- 링크: `https://cake.verygood-chocolate.com/`

CTA 클릭 시 새 탭을 사용하지 않는다. 모바일에서는 자연스러운 한 화면 이동이 더 편하다.

---

## 6.6 브랜드·매장 — ABOUT VERY GOOD

### 확정 카피

```text
ABOUT VERY GOOD

초콜릿이 생각날 땐, 베리굿!

베리굿초콜릿은 대구 수성구에 있는
수제 초콜릿과 디저트 전문점입니다.

초콜릿 음료부터 케이크, 쿠키와 디저트까지
초콜릿으로 만드는 다양한 즐거움을 소개합니다.
```

### CTA

- `베리굿 메뉴 보기 ↗` → `https://kr.verygood-chocolate.com/`
- `매장 위치 보기 ↗` → 기존 한국 공식 사이트의 지도 링크 또는 네이버 지도
- `Instagram ↗` → 기존 공식 인스타그램

버튼 3개를 같은 강도로 보이지 않게 한다.

1. 기본 버튼: 베리굿 메뉴 보기
2. 텍스트 링크: 매장 위치 보기
3. 텍스트 링크: Instagram

---

## 6.7 푸터

```text
very good

chocolate, very good memories.

OFFICIAL KR ↗
CAKE RESERVATION ↗
INSTAGRAM ↗

주식회사 베리굿
대구광역시 수성구 상록로11길 13, 1층
```

사업자 정보는 한국 공식 사이트의 최신 푸터 데이터와 동일하게 유지한다. 가능하면 별도 상수 파일로 관리하여 수정 지점을 한 곳으로 만든다.

---

## 7. 텍스트 와이어프레임

```text
┌─────────────────────────────┐
│         very good           │
├─────────────────────────────┤
│ VERY GOOD RECEIPT           │
│ THANK YOU FOR YOUR ORDER    │
│ 주문 감사 메시지            │
│                             │
│      [영수증 이미지]         │
│                             │
│ DATE / CHANNEL / GIFT       │
│          SCROLL ↓           │
├ · · · · · · · · · · · · · ┤
│ OUR LEVAIN COOKIE           │
│ 작지만 진하게.              │
│      [쿠키 제품 이미지]      │
│ 제품 설명                    │
│ 01 / 02 / 03 특징           │
│ [맛있게 먹는 법]             │
│ [보관 방법]                  │
│ [알레르기 정보]              │
├─────────────────────────────┤
│ HOW WAS YOUR ORDER?         │
│ 리뷰 안내                    │
│ [배달앱 리뷰 버튼]            │
│ 이벤트 제공 고지             │
├─────────────────────────────┤
│ VERY GOOD CAKE              │
│      [케이크 이미지]         │
│ [케이크 둘러보기 ↗]          │
├─────────────────────────────┤
│ ABOUT VERY GOOD             │
│      [매장/브랜드 이미지]     │
│ [메뉴 보기 ↗]                │
│ 위치 보기 ↗  Instagram ↗    │
├─────────────────────────────┤
│ very good                   │
│ chocolate, very good...     │
└─────────────────────────────┘
```

---

## 8. 디자인 토큰

기존 프로젝트에 동일한 브랜드 토큰이 있으면 기존 값을 우선한다. 없을 때 아래 값을 기본값으로 사용한다.

### 색상

```css
--color-bg: #F4F0E8;
--color-surface: #FFFDF8;
--color-text: #211A17;
--color-muted: #786F68;
--color-line: #D8CEC2;
--color-chocolate: #5A3827;
--color-chocolate-dark: #2A1C16;
--color-focus: #8A5A3B;
```

### 타이포그래피

- 영문·숫자: `Work Sans`, system sans-serif
- 한글: `Pretendard`, `Apple SD Gothic Neo`, sans-serif
- 영수증 숫자·메타: `IBM Plex Mono` 또는 시스템 monospace

```css
--font-display: "Work Sans", sans-serif;
--font-body: "Pretendard", "Apple SD Gothic Neo", sans-serif;
--font-mono: "IBM Plex Mono", monospace;
```

### 크기

- Hero title: `clamp(36px, 10vw, 64px)`
- Section title: `clamp(28px, 7vw, 44px)`
- Korean lead: `20px / 1.55`
- Body: `16px / 1.75`
- Caption: `12px / 1.5`
- CTA: `15px / 1`

### 간격

- 모바일 좌우 패딩: 20px
- 태블릿 이상 좌우 패딩: 32px
- 섹션 상하 여백: 모바일 72px, 데스크톱 112px
- 카드 간격: 12px
- 버튼 높이: 최소 52px
- 터치 영역: 최소 44×44px

### 모서리와 선

- 이미지·카드 반경: 0~8px
- 지나치게 둥근 카드 디자인은 사용하지 않는다.
- 구분선: 1px 실선 또는 `4px 6px` 점선

---

## 9. 이미지 자산 계약

사용자가 아래 파일을 제작해 전달한다. 개발자는 파일이 아직 없어도 동일한 비율의 중립 배경 플레이스홀더로 구현을 완료한다.

| 용도 | 파일명 | 권장 원본 크기 | 화면 비율 | 포맷 | 비고 |
|---|---|---:|---:|---|---|
| 영수증 메인 | `receipt-main.webp` | 1200×1600 | 3:4 | WebP | 투명 배경 PNG도 허용 |
| 르뱅쿠키 히어로 | `levain-hero.webp` | 1400×1200 | 7:6 | WebP | 기존 배민·쿠팡 상세컷 활용 가능 |
| 쿠키 단면 | `levain-detail.webp` | 1200×1200 | 1:1 | WebP | 속재료와 촉촉함 강조 |
| 케이크 CTA | `cake-feature.webp` | 1400×1200 | 7:6 | WebP | 파베 또는 대표 케이크 |
| 매장·브랜드 | `store-feature.webp` | 1200×900 | 4:3 | WebP | 실제 매장 또는 진열 컷 |
| 공유 이미지 | `og-receipt.jpg` | 1200×630 | 1.91:1 | JPG | 링크 공유용 |

권장 경로:

```text
/public/images/receipt/receipt-main.webp
/public/images/receipt/levain-hero.webp
/public/images/receipt/levain-detail.webp
/public/images/receipt/cake-feature.webp
/public/images/receipt/store-feature.webp
/public/images/receipt/og-receipt.jpg
```

### 이미지 처리 규칙

- `width`와 `height` 속성을 명시하여 레이아웃 이동을 방지한다.
- 첫 화면 핵심 이미지만 우선 로드한다.
- 나머지 이미지는 `loading="lazy"`를 사용한다.
- AVIF를 자동 생성할 수 있는 빌드 환경이면 AVIF → WebP 순서로 제공한다.
- 첫 화면 이미지 목표 용량: 300KB 이하
- 전체 초기 전송 이미지 목표: 900KB 이하
- 대체 텍스트는 제품과 장면을 짧고 구체적으로 설명한다.

권장 대체 텍스트:

- 영수증: 빈 `alt=""` 처리. 동일 정보가 HTML에 있으므로 장식 이미지로 취급한다.
- 쿠키 히어로: `베리굿 미니 르뱅쿠키`
- 쿠키 단면: `초콜릿과 견과류가 보이는 미니 르뱅쿠키 단면`
- 케이크: 실제 제품명으로 작성
- 매장: `대구 수성구 베리굿초콜릿 매장`

---

## 10. 반응형 규칙

### 320~479px

- 한 열 구성
- 좌우 20px
- 영수증 이미지 너비 `min(100%, 390px)`
- CTA 전체 폭
- 특징 카드 세로 배치

### 480~767px

- 전체 콘텐츠 최대 폭 600px
- 특징 카드 3열 허용
- 이미지와 텍스트는 대부분 한 열 유지

### 768px 이상

- 전체 배경은 넓게 유지하되 본문 최대 폭 1120px
- 제품·케이크·매장 섹션은 이미지와 텍스트 2열
- 영수증 히어로는 텍스트와 이미지 2열 또는 중앙 에디토리얼 구성
- 모바일 콘텐츠 순서와 의미는 변경하지 않는다.

---

## 11. 인터랙션과 모션

- 스크롤 등장 효과는 `opacity + translateY 12px`, 300~450ms만 사용한다.
- 영수증 이미지를 과도하게 흔들거나 회전시키지 않는다.
- 버튼 hover는 색상과 1~2px 이동 정도로 제한한다.
- `prefers-reduced-motion: reduce`에서는 모든 등장·스크롤 모션을 제거한다.
- 아코디언은 `aria-expanded`, 키보드 조작, 포커스 표시를 지원한다.

---

## 12. 분석 이벤트

아래 이벤트 이름을 고정한다.

| 이벤트 | 발생 조건 | 주요 속성 |
|---|---|---|
| `receipt_view` | 페이지 최초 표시 | `channel`, `path`, `campaign` |
| `review_cta_click` | 리뷰 CTA 클릭 | `channel`, `destination` |
| `cake_cta_click` | 케이크 CTA 클릭 | `channel`, `destination` |
| `kr_site_click` | 공식 한국 사이트 클릭 | `channel` |
| `map_click` | 매장 위치 클릭 | `channel` |
| `instagram_click` | 인스타그램 클릭 | `channel` |
| `product_info_open` | 제품 정보 아코디언 열기 | `channel`, `section` |

캠페인 기본값:

```text
campaign = review-cookie-2026
product = mini-levain-cookie
```

동일 세션에서 `receipt_view`는 한 번만 기록한다. 외부 링크 이벤트를 기록한 뒤 이동이 지연되지 않도록 `sendBeacon` 또는 분석 도구의 비동기 전송을 사용한다.

---

## 13. 접근성

- 텍스트 대비는 WCAG AA 수준을 목표로 한다.
- 모든 CTA는 키보드로 접근 가능해야 한다.
- 포커스 링을 제거하지 않는다.
- 영수증 이미지 안 문구를 핵심 정보의 유일한 출처로 사용하지 않는다.
- `lang="ko"`를 설정하고 영문 장식 문구는 필요 시 `lang="en"`을 사용한다.
- 버튼과 링크를 시각적으로 구분한다.
- 오류나 미설정 링크는 비활성 버튼으로 숨기지 않고, 사용자에게 실행 가능한 대체 안내를 보여준다.

---

## 14. SEO·공유 설정

이 페이지는 검색 유입보다 QR 캠페인이 목적이므로 기본 정책은 `noindex, follow`다.

```html
<meta name="robots" content="noindex,follow" />
<link rel="canonical" href="https://receipt.verygood-chocolate.com/levain" />
```

페이지 제목:

```text
오늘의 선물, 미니 르뱅쿠키 | 베리굿초콜릿
```

설명:

```text
베리굿 주문과 함께 받은 미니 르뱅쿠키의 이야기와 제품 정보, 케이크 예약과 매장 소식을 확인해 보세요.
```

Open Graph:

- `og:title`: `A VERY GOOD GIFT — 미니 르뱅쿠키`
- `og:description`: 위 메타 설명과 동일
- `og:image`: `/images/receipt/og-receipt.jpg`
- `og:url`: 대표 주소

`/b`, `/c`, `/s`, `/levain`은 모두 같은 canonical을 사용한다.

---

## 15. 비범위

이번 1차 제작에서 제외한다.

- 로그인·회원가입
- 쿠키 직접 구매·장바구니
- 리뷰 작성 내용을 페이지 내부에서 수집
- 쿠폰 발급 시스템
- 복잡한 CMS
- 배달 주문번호와 고객 개인정보 연동
- 여러 제품을 선택하는 범용 이벤트 플랫폼
- 과도한 3D·WebGL 효과

향후 다른 증정 제품이 추가되면 콘텐츠 데이터만 교체해 `/granola`, `/lemon-cake` 등으로 확장한다.

---

## 16. 디자인 완료 조건

- [ ] 360px 폭에서 첫 화면만 보고 주문 감사와 미니 르뱅쿠키 선물을 이해할 수 있다.
- [ ] 리뷰 CTA보다 선물·쿠키 정보가 먼저 보인다.
- [ ] 배민·쿠팡이츠 채널에 따라 CTA와 채널 표시가 바뀐다.
- [ ] 케이크 사이트와 공식 한국 사이트가 서로 다른 우선순위로 명확히 연결된다.
- [ ] 핵심 정보가 이미지 안에만 존재하지 않는다.
- [ ] 영수증 콘셉트가 브랜드 사진보다 강해지지 않는다.
- [ ] 사용자 제작 이미지가 없어도 플레이스홀더로 레이아웃 검수가 가능하다.
- [ ] 320px·390px·430px·768px·1440px에서 가로 스크롤이 없다.
- [ ] 모션 감소 설정과 키보드 포커스가 동작한다.
- [ ] 리뷰 제공 고지가 CTA 인근에 노출된다.

---

## 17. 참고 주소

- 한국 공식 사이트: https://kr.verygood-chocolate.com/
- 케이크 예약사이트: https://cake.verygood-chocolate.com/
- 기존 오타 주소: https://reciept.verygood-chocolate.com/
- 신규 정식 주소: https://receipt.verygood-chocolate.com/
