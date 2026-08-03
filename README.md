# Very Good Chocolate — Receipt QR 랜딩

배달 주문에 함께 동봉되는 미니 르뱅쿠키 안내와 외부 리뷰 링크를 제공하는 정적 React/Vite 페이지입니다.

## 개발

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview -- --host 0.0.0.0
```

## 경로

- `/` 또는 `/levain`: 배달의민족·쿠팡이츠 선택 화면
- `/b`: 배달의민족 CTA만 표시
- `/c`: 쿠팡이츠 CTA만 표시
- `/s`: 네이버 플레이스 CTA 표시

경로 분기는 React Router 없이 `src/receiptContent.js`의 `resolveChannel()`에서 처리합니다.

## 운영 전 확인

- `src/receiptContent.js`의 제품명·알레르기·보관 안내가 실제 제품 포장과 일치하는지 확인합니다.
- 현재 히어로는 기존 `public/levein.webp`를 임시 사용합니다. 실제 증정 미니 쿠키 사진을 확보하면 `public/images/receipt/mini-levain-hero.webp`로 교체하고 `src/App.jsx`의 이미지 경로와 alt를 함께 확인합니다.
- 배민·쿠팡이츠 링크가 실제 리뷰 진입 경로인지 iPhone·Android에서 확인합니다.
- 현재 운영 주소와 canonical은 기존 오타 도메인 `https://reciept.verygood-chocolate.com/`을 유지합니다. 정식 `https://receipt.verygood-chocolate.com/`은 DNS·리디렉션 확인 전까지 QR과 canonical에 사용하지 않습니다.
- 고객 주문번호·전화번호·리뷰 내용을 이 페이지에서 수집하지 않습니다.

## 주요 파일

- `src/App.jsx`: 페이지 구조와 섹션
- `src/receiptContent.js`: 제품 안내, 외부 링크, pathname별 CTA
- `src/index.css`: 영수증 에디토리얼 디자인과 반응형 레이아웃
- `index.html`: 제목, 설명, canonical, `noindex,follow` 메타데이터
