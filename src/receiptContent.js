const tracking = {
  source: 'receipt',
  medium: 'qr',
  campaign: 'levain',
};

export function campaignLink(url, content = 'generic') {
  const target = new URL(url);
  target.searchParams.set('utm_source', tracking.source);
  target.searchParams.set('utm_medium', tracking.medium);
  target.searchParams.set('utm_campaign', tracking.campaign);
  target.searchParams.set('utm_content', content);
  return target.toString();
}

const reviewLinks = {
  baemin: {
    id: 'baemin',
    eyebrow: 'BAEMIN',
    logo: '배민',
    label: '배달의민족 리뷰 남기기',
    instruction: '주문내역에서 베리굿 주문을 찾아 리뷰를 남겨주세요.',
    href: campaignLink('https://s.baemin.com/dS000CblIB0lg', 'baemin'),
  },
  coupang: {
    id: 'coupang',
    eyebrow: 'COUPANG EATS',
    logo: 'EATS',
    label: '쿠팡이츠 리뷰 남기기',
    instruction: '주문내역에서 베리굿 주문을 찾아 리뷰를 남겨주세요.',
    href: campaignLink('https://web.coupangeats.com/share?storeId=946445', 'coupang'),
  },
  naver: {
    id: 'naver',
    eyebrow: 'NAVER PLACE',
    logo: 'N',
    label: '네이버 리뷰 남기기',
    instruction: '방문자 리뷰에 베리굿 후기를 남겨주세요.',
    href: campaignLink('https://m.place.naver.com/restaurant/1069379954/review/visitor', 'naver'),
  },
};

export const campaign = {
  brandUrl: 'https://kr.verygood-chocolate.com/',
  cakeUrl: 'https://cake.verygood-chocolate.com/',
  locationUrl: 'https://map.naver.com/p/entry/place/1069379954',
  instagramUrl: 'https://www.instagram.com/verygood_chocolate/',
  product: {
    name: '르뱅쿠키 / 초코 르뱅쿠키',
    allergenNote: '밀, 계란, 우유, 대두가 들어가요. 포장지의 알레르기 표시도 확인해 주세요.',
    storageNote: '보관 방법과 소비기한은 포장지에서 확인해 주세요.',
    mainProduct: '르뱅쿠키: 90g 1개 · 12개분 레시피',
    chocolateProduct: '초코 르뱅쿠키: 90g 1개 · 기본 레시피에 카카오파우더 20g을 더해요.',
    reviewProduct: '증정용: 미니 르뱅쿠키 25g 1개 · 초코 르뱅쿠키는 증정하지 않아요.',
    ingredients: '르뱅: 밀가루, 다크초콜릿(코코아매스 48%), 사탕수수원당, 무염버터, 계란\n초코: 밀가루, 다크초콜릿(코코아매스 48%), 사탕수수원당, 무염버터, 계란, 카카오파우더',
    nutrition: [
      ['열량', '약 405 kcal', '약 413 kcal', '약 112 kcal'],
      ['탄수화물', '약 49.1 g', '약 49.8 g', '약 13.5 g'],
      ['당류', '약 28.8 g', '약 28.8 g', '약 7.9 g'],
      ['단백질', '약 5.0 g', '약 5.4 g', '약 1.4 g'],
      ['지방', '약 20.7 g', '약 21.0 g', '약 5.7 g'],
      ['포화지방', '약 12.9 g', '약 13.2 g', '약 3.6 g'],
      ['나트륨', '약 160 mg', '약 161 mg', '약 44 mg'],
    ],
  },
  reviewNotice: '쿠키는 리뷰와 상관없이 주문하신 분께 함께 보내드려요.',
};

const channelConfig = {
  baemin: {
    key: 'baemin',
    label: '배달의민족',
    links: [reviewLinks.baemin],
  },
  coupang: {
    key: 'coupang',
    label: '쿠팡이츠',
    links: [reviewLinks.coupang],
  },
  naver: {
    key: 'naver',
    label: '네이버 플레이스',
    links: [reviewLinks.naver],
  },
  direct: {
    key: 'direct',
    label: '리뷰 남기기',
    links: [reviewLinks.baemin, reviewLinks.coupang, reviewLinks.naver],
  },
};

export function resolveChannel(pathname = '/') {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/b') return channelConfig.baemin;
  if (path === '/c') return channelConfig.coupang;
  if (path === '/s') return channelConfig.naver;
  return channelConfig.direct;
}
