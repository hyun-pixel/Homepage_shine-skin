'use strict';

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const icon = (name, small = false) => `<svg aria-hidden="true" class="icon${small ? ' icon-small' : ''}"><use href="#i-${name}"/></svg>`;
const money = value => new Intl.NumberFormat('ko-KR').format(value) + '원';
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const PRODUCT_GROUPS = {care:'스킨케어',makeup:'메이크업',sun:'선케어'};
const PRODUCT_KINDS = {
  "cleanser": {
    "label": "클렌징",
    "group": "care",
    "family": "세안·첫 단계"
  },
  "toner": {
    "label": "토너·미스트",
    "group": "care",
    "family": "세안·첫 단계"
  },
  "lotion": {
    "label": "로션",
    "group": "care",
    "family": "데일리 케어"
  },
  "essence": {
    "label": "세럼·에센스",
    "group": "care",
    "family": "데일리 케어"
  },
  "cream": {
    "label": "크림",
    "group": "care",
    "family": "데일리 케어"
  },
  "mask": {
    "label": "마스크·팩",
    "group": "care",
    "family": "스페셜 케어"
  },
  "cushion": {
    "label": "쿠션",
    "group": "makeup",
    "family": "베이스"
  },
  "foundation": {
    "label": "파운데이션",
    "group": "makeup",
    "family": "베이스"
  },
  "concealer": {
    "label": "컨실러",
    "group": "makeup",
    "family": "베이스"
  },
  "tint": {
    "label": "틴트",
    "group": "makeup",
    "family": "립"
  },
  "lipstick": {
    "label": "립스틱",
    "group": "makeup",
    "family": "립"
  },
  "lipbalm": {
    "label": "립밤",
    "group": "makeup",
    "family": "립"
  },
  "palette": {
    "label": "아이섀도",
    "group": "makeup",
    "family": "아이·치크"
  },
  "brow": {
    "label": "아이브로우",
    "group": "makeup",
    "family": "아이·치크"
  },
  "mascara": {
    "label": "마스카라",
    "group": "makeup",
    "family": "아이·치크"
  },
  "cheek": {
    "label": "블러셔",
    "group": "makeup",
    "family": "아이·치크"
  },
  "suncream": {
    "label": "선크림",
    "group": "sun",
    "family": "외출 준비"
  },
  "suntone": {
    "label": "톤업 선케어",
    "group": "sun",
    "family": "외출 준비"
  },
  "sunstick": {
    "label": "선스틱",
    "group": "sun",
    "family": "외출 준비"
  }
};
const PRODUCTS = [
  {
    "id": "SS01",
    "name": "듀 베일 토너",
    "en": "DEW VEIL TONER",
    "type": "스킨케어",
    "size": "150 mL",
    "price": 28000,
    "description": "가벼운 수분으로 시작하는 첫 번째 케어.",
    "texture": "가벼운 워터 토너",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "산뜻한 수분감",
    "kind": "toner"
  },
  {
    "id": "SS05",
    "name": "워터 젤 크림",
    "en": "WATER GEL CREAM",
    "type": "스킨케어",
    "size": "50 mL",
    "price": 36000,
    "description": "가볍게 펴 발리는 맑은 젤 크림.",
    "texture": "맑은 젤 제형",
    "skins": [
      "지성",
      "복합성"
    ],
    "finish": "가벼운 마무리",
    "kind": "cream"
  },
  {
    "id": "SS06",
    "name": "클리어 젤 클렌저",
    "en": "CLEAR GEL CLEANSER",
    "type": "스킨케어",
    "size": "150 mL",
    "price": 24000,
    "description": "하루의 시작과 끝을 위한 부드러운 젤 세안.",
    "texture": "부드러운 젤",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "산뜻한 세안",
    "kind": "cleanser"
  },
  {
    "id": "SS07",
    "name": "데일리 베일 선케어",
    "en": "DAILY VEIL SUN CARE",
    "type": "선케어",
    "size": "50 mL",
    "price": 32000,
    "description": "매일의 외출 준비에 더하는 가벼운 한 단계.",
    "texture": "가벼운 로션 제형",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "가벼운 마무리",
    "kind": "suncream"
  },
  {
    "id": "SS11",
    "name": "소프트 블룸 치크",
    "en": "SOFT BLOOM CHEEK",
    "type": "컬러 메이크업",
    "size": "5 g",
    "price": 26000,
    "description": "두 볼에 부드럽게 얹는 은은한 생기.",
    "texture": "부드러운 파우더",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "은은한 컬러",
    "shades": [
      "01 로즈 블룸",
      "02 피치 블룸"
    ],
    "kind": "cheek"
  },
  {
    "id": "SS12",
    "name": "데일리 라이트 팔레트",
    "en": "DAILY LIGHT PALETTE",
    "type": "컬러 메이크업",
    "size": "6 g",
    "price": 34000,
    "description": "매일의 눈매에 자연스럽게 어우러지는 네 가지 빛.",
    "texture": "네 가지 파우더 컬러",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "자연스러운 음영",
    "shades": [
      "01 로즈 데이",
      "02 소프트 브라운"
    ],
    "kind": "palette"
  },
  {
    "id": "SS02",
    "name": "듀 드롭 세럼",
    "en": "DEW DROP SERUM",
    "type": "스킨케어",
    "size": "30 mL",
    "price": 38000,
    "description": "수분을 차곡차곡, 산뜻하게 스며드는 세럼.",
    "texture": "촉촉한 워터 세럼",
    "skins": [
      "건성",
      "복합성",
      "중성"
    ],
    "finish": "촉촉한 마무리",
    "kind": "essence"
  },
  {
    "id": "SS08",
    "name": "스킨 글로우 쿠션",
    "en": "SKIN GLOW CUSHION",
    "type": "베이스 메이크업",
    "size": "15 g",
    "price": 42000,
    "description": "피부 본연의 빛을 살리는 가벼운 글로우 베이스.",
    "texture": "가벼운 글로우 쿠션",
    "skins": [
      "건성",
      "복합성",
      "중성"
    ],
    "finish": "은은한 윤기",
    "shades": [
      "17N 포슬린",
      "21N 아이보리",
      "23N 내추럴"
    ],
    "kind": "cushion"
  },
  {
    "id": "SS04",
    "name": "클라우드 리치 크림",
    "en": "CLOUD RICH CREAM",
    "type": "스킨케어",
    "size": "50 mL",
    "price": 42000,
    "description": "부드럽게 감싸는 크림으로 촉촉한 마무리.",
    "texture": "부드러운 리치 크림",
    "skins": [
      "건성",
      "중성"
    ],
    "finish": "편안한 보습감",
    "kind": "cream"
  },
  {
    "id": "SS03",
    "name": "에어 밸런스 로션",
    "en": "AIR BALANCE LOTION",
    "type": "스킨케어",
    "size": "100 mL",
    "price": 32000,
    "description": "가벼운 사용감으로 부담 없이 채우는 수분.",
    "texture": "산뜻한 로션",
    "skins": [
      "지성",
      "복합성"
    ],
    "finish": "가벼운 마무리",
    "kind": "lotion"
  },
  {
    "id": "SS10",
    "name": "글래스 립 틴트",
    "en": "GLASS LIP TINT",
    "type": "컬러 메이크업",
    "size": "4 g",
    "price": 24000,
    "description": "맑은 색과 투명한 윤기로 더하는 작은 포인트.",
    "texture": "맑은 글로시 틴트",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "투명한 광택",
    "shades": [
      "01 로즈 미스트",
      "02 피치 듀",
      "03 베리 글로우"
    ],
    "kind": "tint"
  },
  {
    "id": "SS09",
    "name": "소프트 매트 쿠션",
    "en": "SOFT MATTE CUSHION",
    "type": "베이스 메이크업",
    "size": "15 g",
    "price": 42000,
    "description": "보송한 사용감으로 완성하는 편안한 베이스.",
    "texture": "보송한 소프트 매트",
    "skins": [
      "지성",
      "복합성",
      "중성"
    ],
    "finish": "보송한 마무리",
    "shades": [
      "17N 포슬린",
      "21N 아이보리",
      "23N 내추럴"
    ],
    "kind": "cushion"
  },
  {
    "id": "SS13",
    "name": "멜트 클렌징 밤",
    "en": "MELT CLEANSING BALM",
    "type": "스킨케어",
    "kind": "cleanser",
    "size": "80 g",
    "price": 29000,
    "description": "부드럽게 녹는 밤으로 여유롭게 마무리하는 세안.",
    "texture": "오일로 녹는 밤",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "부드러운 세안"
  },
  {
    "id": "SS14",
    "name": "밀크 베일 미스트",
    "en": "MILK VEIL MIST",
    "type": "스킨케어",
    "kind": "toner",
    "size": "100 mL",
    "price": 26000,
    "description": "고운 안개처럼 가볍게 더하는 밀키한 수분감.",
    "texture": "밀키 워터 미스트",
    "skins": [
      "건성",
      "중성",
      "복합성"
    ],
    "finish": "촉촉한 감촉"
  },
  {
    "id": "SS15",
    "name": "소프트 레이어 에센스",
    "en": "SOFT LAYER ESSENCE",
    "type": "스킨케어",
    "kind": "essence",
    "size": "45 mL",
    "price": 39000,
    "description": "한 겹씩 부드럽게 펴 바르는 맑은 에센스.",
    "texture": "가벼운 젤 에센스",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "매끄러운 수분감"
  },
  {
    "id": "SS16",
    "name": "나이트 듀 슬리핑 마스크",
    "en": "NIGHT DEW SLEEPING MASK",
    "type": "스킨케어",
    "kind": "mask",
    "size": "60 mL",
    "price": 34000,
    "description": "하루 끝, 포근한 젤 크림으로 채우는 나의 시간.",
    "texture": "포근한 젤 크림",
    "skins": [
      "건성",
      "중성",
      "복합성"
    ],
    "finish": "촉촉한 마무리"
  },
  {
    "id": "SS17",
    "name": "톤 베일 선크림",
    "en": "TONE VEIL SUN CREAM",
    "type": "선케어",
    "kind": "suntone",
    "size": "40 mL",
    "price": 33000,
    "description": "은은한 톤을 얹어 산뜻하게 준비하는 외출.",
    "texture": "라벤더빛 크림",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "은은한 톤 표현"
  },
  {
    "id": "SS18",
    "name": "클리어 듀 선스틱",
    "en": "CLEAR DEW SUN STICK",
    "type": "선케어",
    "kind": "sunstick",
    "size": "18 g",
    "price": 28000,
    "description": "작은 파우치에 가볍게 챙기는 스틱 한 가지.",
    "texture": "투명한 밤 스틱",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "가벼운 감촉"
  },
  {
    "id": "SS19",
    "name": "실크 베일 파운데이션",
    "en": "SILK VEIL FOUNDATION",
    "type": "베이스 메이크업",
    "kind": "foundation",
    "size": "30 mL",
    "price": 45000,
    "description": "얇게 펴 바를수록 자연스럽게 이어지는 베이스.",
    "texture": "실키한 리퀴드",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "은은한 새틴",
    "shades": [
      "17N 포슬린",
      "21N 아이보리",
      "23N 내추럴"
    ]
  },
  {
    "id": "SS20",
    "name": "소프트 커버 컨실러",
    "en": "SOFT COVER CONCEALER",
    "type": "베이스 메이크업",
    "kind": "concealer",
    "size": "6 g",
    "price": 22000,
    "description": "필요한 곳에 조금씩 더하는 부드러운 커버.",
    "texture": "크리미한 리퀴드",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "자연스러운 커버",
    "shades": [
      "01 라이트",
      "02 내추럴"
    ]
  },
  {
    "id": "SS21",
    "name": "페탈 벨벳 립스틱",
    "en": "PETAL VELVET LIPSTICK",
    "type": "컬러 메이크업",
    "kind": "lipstick",
    "size": "3.5 g",
    "price": 28000,
    "description": "꽃잎처럼 부드럽게 얹히는 차분한 립 컬러.",
    "texture": "부드러운 벨벳",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "은은한 벨벳 컬러",
    "shades": [
      "01 로즈 페탈",
      "02 누드 베일",
      "03 베리 모브"
    ]
  },
  {
    "id": "SS22",
    "name": "듀 글로우 립밤",
    "en": "DEW GLOW LIP BALM",
    "type": "컬러 메이크업",
    "kind": "lipbalm",
    "size": "3.5 g",
    "price": 19000,
    "description": "한 번의 터치로 가볍게 더하는 맑은 윤기.",
    "texture": "부드러운 밤",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "투명한 윤기",
    "shades": [
      "01 클리어 듀",
      "02 로지 듀"
    ]
  },
  {
    "id": "SS23",
    "name": "소프트 브로우 펜슬",
    "en": "SOFT BROW PENCIL",
    "type": "컬러 메이크업",
    "kind": "brow",
    "size": "0.1 g",
    "price": 16000,
    "description": "섬세한 선으로 나답게 정돈하는 눈썹.",
    "texture": "가느다란 펜슬",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "자연스러운 음영",
    "shades": [
      "01 애쉬 브라운",
      "02 내추럴 브라운"
    ]
  },
  {
    "id": "SS24",
    "name": "페더 래쉬 마스카라",
    "en": "FEATHER LASH MASCARA",
    "type": "컬러 메이크업",
    "kind": "mascara",
    "size": "7 g",
    "price": 25000,
    "description": "오늘의 눈매에 가볍고 또렷한 한 끗.",
    "texture": "부드러운 마스카라",
    "skins": [
      "모든 피부 타입"
    ],
    "finish": "또렷한 눈매",
    "shades": [
      "01 소프트 블랙",
      "02 딥 브라운"
    ]
  }
];
const findProduct = id => PRODUCTS.find(p => p.id === id);
const skinNames = {dry:'건성',oily:'지성',combination:'복합성',normal:'중성',unsure:'모든 피부를 위한'};
const occasionNames = {work:'출근',date:'데이트',weekend:'주말 외출',travel:'여행',special:'특별한 약속'};
const readSaved = (key, fallback) => {try {const value=JSON.parse(localStorage.getItem(key)) ?? fallback;return Array.isArray(fallback)&&!Array.isArray(value)?fallback:value;}catch{return fallback;}};
let wishes = readSaved('shine-skin-wishes', []).filter(id => findProduct(id));
let bag = readSaved('shine-skin-bag', []).filter(item => item && findProduct(item.id) && Number.isInteger(item.qty) && item.qty > 0 && item.qty <= 10 && (!findProduct(item.id).shades || findProduct(item.id).shades.includes(item.shade)));
let currentSkin = 'dry';
let currentOccasion = 'work';
let currentPanel = '';
let selectedProduct = null;
let detailReturn = null;
let panelReturn = null;
let toastTimeout;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionReducedByUser = readSaved('shine-skin-reduce-motion',false) === true;
const panel = $('#panel');
const detail = $('#product-dialog');

function saveState(){
  try{localStorage.setItem('shine-skin-wishes', JSON.stringify(wishes));localStorage.setItem('shine-skin-bag', JSON.stringify(bag));}catch{/* Local interactions also work when browser storage is unavailable. */}
  updateCounts();
  document.dispatchEvent(new CustomEvent('shine-bagchange'));
}
function addBagItem(p,quantity,shade=''){
  if(p.shades&&!p.shades.includes(shade)){toast('색상을 먼저 선택해 주세요.');return false;}
  const existing=bag.find(item=>item.id===p.id&&item.shade===shade);
  if(existing&&existing.qty+quantity>10){toast('한 옵션은 최대 10개까지 담을 수 있어요.');return false;}
  if(existing)existing.qty+=quantity;else bag.push({id:p.id,shade,qty:quantity});
  saveState();toast(`${p.name} · 장바구니에 담았어요.`);return true;
}
function updateCounts(){
  const count = bag.reduce((sum,item) => sum + item.qty, 0);
  $('#wish-count').textContent = wishes.length;$('#wish-count').hidden = !wishes.length;
  $('#cart-count').textContent = count;$('#cart-count').hidden = !count;
  $('[data-panel="wishlist"]').setAttribute('aria-label', `찜한 제품${wishes.length ? ` ${wishes.length}개` : ''}`);
  $('[data-panel="cart"]').setAttribute('aria-label', `장바구니${count ? ` ${count}개` : ''}`);
  $$('[data-wish]').forEach(button => {
    const p = findProduct(button.dataset.wish), active = wishes.includes(p.id);
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-label', `${p.name} ${active ? '찜 해제' : '찜하기'}`);
    const label=button.querySelector('[data-wish-label]');
    if(label)label.textContent=active?'찜한 제품에서 빼기':'찜한 제품에 모으기';
  });
}
function toast(message){
  clearTimeout(toastTimeout);const el = $('#toast');$('span',el).textContent = message;el.hidden = false;
  toastTimeout = setTimeout(() => {el.hidden = true;}, 3200);
}
function toggleWish(id){
  const active = wishes.includes(id);
  wishes = active ? wishes.filter(x => x !== id) : [...wishes,id];saveState();
  toast(active ? '찜한 제품에서 뺐어요.' : '찜한 제품에 담았어요.');
  if(currentPanel === 'wishlist' && panel.open){renderPanel('wishlist');const next=$('[data-wish]',panel)||$('[data-panel="collection"]',panel);next?.focus({preventScroll:true});}
}
function pack(p, extra = ''){return `<span class="product-pack pack-${p.id} ${extra}" role="img" aria-label="${p.name} 제품 사진"></span>`;}
function reasonFor(p){
  if(p.id === 'SS02') return currentSkin === 'unsure' ? '수분 케어부터 시작하기' : `${skinNames[currentSkin]} 피부의 수분 준비`;
  if(p.id === 'SS04') return currentOccasion === 'travel' ? '여행 가방 속 보습 루틴' : '메이크업 전, 촉촉한 마무리';
  if(p.id === 'SS03') return '가벼운 사용감의 수분 케어';
  if(p.id === 'SS08') return currentOccasion === 'date' ? '가까이서도 은은한 글로우' : currentOccasion === 'special' ? '특별한 날의 은은한 빛' : '일상에 어울리는 자연스러운 윤기';
  if(p.id === 'SS09') return currentOccasion === 'travel' ? '가볍게 챙기는 보송한 베이스' : '보송한 사용감을 선호한다면';
  return currentOccasion === 'date' ? '데이트를 위한 로즈빛 포인트' : currentOccasion === 'special' ? '약속을 빛내는 맑은 컬러' : '가볍게 더하는 맑은 생기';
}
function recommendedIds(){
  if(currentSkin === 'oily') return currentOccasion === 'date' || currentOccasion === 'special' ? ['SS10','SS09','SS03'] : ['SS03','SS09','SS10'];
  if(currentSkin === 'combination') return currentOccasion === 'work' || currentOccasion === 'travel' ? ['SS03','SS09','SS10'] : ['SS02','SS08','SS10'];
  if(currentSkin === 'normal') return currentOccasion === 'travel' ? ['SS04','SS09','SS10'] : ['SS02','SS08','SS10'];
  if(currentSkin === 'unsure') return ['SS02','SS08','SS10'];
  return currentOccasion === 'work' || currentOccasion === 'travel' ? ['SS02','SS08','SS04'] : ['SS02','SS08','SS10'];
}
function productCard(p){
  return `<article class="product-card"><span class="card-badge">${p.type}</span><button class="card-stage" data-product="${p.id}" aria-label="${p.name} 제품 정보 보기">${pack(p)}</button><button class="icon-button wish-button" data-wish="${p.id}" aria-pressed="${wishes.includes(p.id)}" aria-label="${p.name} 찜하기">${icon('heart')}</button><div class="card-info"><h4><button class="card-title-button" data-product="${p.id}">${p.name}</button></h4><p class="card-description">${p.description}</p><p class="card-price">${money(p.price)} <span>${p.size}</span></p><div class="card-bottom"><p class="card-reason">${reasonFor(p)}</p><button class="card-open" data-product="${p.id}" aria-label="${p.name} 옵션 선택">${icon('plus',true)}</button></div></div></article>`;
}
function renderRecommendations(announce = false){
  const ids = recommendedIds();
  $('#result-context').textContent = `${currentSkin === 'unsure' ? '가볍게 시작하는' : skinNames[currentSkin] + ' 피부의'} ${occasionNames[currentOccasion]} 루틴`;
  const titles = {
    work:currentSkin === 'oily' || currentSkin === 'combination' ? '산뜻하게 준비하고, 나답게 시작해요.' : '촉촉하게 준비하고, 가볍게 빛나요.',
    date:'가까이서 더 빛나는, 오늘의 조합.',weekend:'가벼운 외출에도, 나다운 빛을.',travel:'낯선 하루에도 익숙한 나의 루틴.',special:'특별한 하루에, 은은한 빛 한 겹.'
  };
  $('#result-title').textContent = titles[currentOccasion];
  $('#product-grid').innerHTML = ids.map(id => productCard(findProduct(id))).join('');
  updateCounts();
  if(announce){
    $('#result-announcement').textContent = `${$('#result-context').textContent}. 추천 제품은 ${ids.map(id => findProduct(id).name).join(', ')}입니다.`;
    if(!reducedMotion.matches&&!motionReducedByUser) $$('#product-grid .product-card').forEach((card,i)=>card.animate([{opacity:.55,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,delay:i*45,easing:'cubic-bezier(.22,1,.36,1)'}));
  }
}
$('#routine-form').addEventListener('change', event => {
  if(event.target.name === 'skin') currentSkin = event.target.value;
  if(event.target.name === 'occasion') currentOccasion = event.target.value;
  renderRecommendations(true);
});
$('#routine-form').addEventListener('reset', () => {currentSkin='dry';currentOccasion='work';renderRecommendations(true);});

function miniProduct(p, mode, item = null, index = 0){
  const details = item ? `${escapeHTML(item.shade || p.size)} · ${money(p.price)}` : `${p.type} · ${p.size}`;
  return `<article class="mini-product"><button class="mini-image" data-product="${p.id}" aria-label="${p.name} 정보 보기">${pack(p)}</button><div class="mini-info"><button data-product="${p.id}">${p.name}</button><p>${details}</p>${!item ? `<strong>${money(p.price)}</strong>` : `<div class="quantity" aria-label="${p.name} 수량"><button data-qty="${index}" data-delta="-1" aria-label="${p.name} 수량 줄이기" ${item.qty<=1?'disabled':''}>${icon('minus')}</button><output aria-label="현재 수량">${item.qty}</output><button data-qty="${index}" data-delta="1" aria-label="${p.name} 수량 늘리기" ${item.qty>=10?'disabled':''}>${icon('plus')}</button></div>`}</div>${mode==='cart'?`<button class="mini-remove" data-remove="${index}" aria-label="${p.name} 장바구니에서 삭제">삭제</button>`:mode==='wishlist'?`<button class="icon-button wish-button" data-wish="${p.id}" aria-pressed="true" aria-label="${p.name} 찜 해제">${icon('heart')}</button>`:`<button class="icon-button" data-product="${p.id}" aria-label="${p.name} 옵션 선택">${icon('plus')}</button>`}</article>`;
}
function emptyState(title, body, symbol){
  return `<div class="empty-state">${icon(symbol)}<h3>${title}</h3><p>${body}</p><button class="button button-primary" data-panel="collection">제품 만나보기 ${icon('arrow',true)}</button></div>`;
}
function renderSearch(value = ''){
  const query = value.trim().toLocaleLowerCase();
  const products = PRODUCTS.filter(p => `${p.name} ${p.en} ${p.type} ${p.skins.join(' ')} ${p.texture}`.toLocaleLowerCase().includes(query));
  $('#search-status').textContent = query ? `${products.length}개의 제품을 찾았어요.` : `지금 만나볼 수 있는 ${PRODUCTS.length}가지 제품`;
  $('#search-results').innerHTML = products.length ? products.map(p=>miniProduct(p,'search')).join('') : '<div class="empty-state"><h3>찾는 제품이 없어요.</h3><p>‘세럼’, ‘쿠션’, ‘립’처럼 검색해 보세요.</p></div>';
}
function renderPanel(type){
  currentPanel = type;
  const titles = {collection:'제품 컬렉션',search:'어떤 빛을 찾으세요?',wishlist:'찜한 제품',cart:'장바구니',menu:'SHINE SKIN',brand:'우리의 빛'};
  $('#panel-title').textContent = titles[type] || 'SHINE SKIN';
  const body = $('#panel-body');
  if(type === 'collection') body.innerHTML = `<p class="panel-description">수분을 채우는 첫 단계부터<br>나만의 빛을 더하는 마지막 터치까지.</p>${PRODUCTS.map(p=>miniProduct(p,type)).join('')}`;
  if(type === 'search'){
    body.innerHTML = `<label class="search-label" for="product-search">제품명 또는 피부 타입</label><div class="search-field"><input type="search" id="product-search" placeholder="세럼, 쿠션, 건성" autocomplete="off" enterkeyhint="search">${icon('search')}</div><p class="search-status" id="search-status" role="status"></p><div id="search-results"></div>`;
    renderSearch();$('#product-search').addEventListener('input', e=>renderSearch(e.target.value));
  }
  if(type === 'wishlist') body.innerHTML = wishes.length ? `<p class="panel-description">마음이 머문 ${wishes.length}개의 제품.<br>나의 루틴에 하나씩 더해보세요.</p>${wishes.map(id=>miniProduct(findProduct(id),type)).join('')}` : emptyState('아직 비어 있는 나의 취향','마음에 드는 제품의 하트를 눌러<br>여기에 모아보세요.','heart');
  if(type === 'cart'){
    const total = bag.reduce((sum,item)=>sum+findProduct(item.id).price*item.qty,0);
    body.innerHTML = bag.length ? `${bag.map((item,i)=>miniProduct(findProduct(item.id),type,item,i)).join('')}<div class="cart-total"><span>제품 합계</span><strong>${money(total)}</strong></div><p class="cart-note">나의 루틴에 담아둔 제품이에요.<br>수량과 옵션을 확인하고, 더 둘러보세요.</p><button class="button button-primary" data-panel="collection" style="width:100%;margin-top:22px">제품 더 둘러보기 ${icon('arrow',true)}</button>` : emptyState('어떤 빛으로 채워볼까요?','내 피부와 오늘의 일정에 어울리는<br>제품부터 만나보세요.','bag');
  }
  if(type === 'menu') body.innerHTML = `<div class="menu-links"><button data-panel="collection">제품 컬렉션 ${icon('arrow')}</button><a href="#routine" data-close-panel>나만의 루틴 ${icon('arrow')}</a><button data-panel="brand">브랜드 이야기 ${icon('arrow')}</button></div><div class="menu-support"><button data-panel="wishlist">찜한 제품</button><button data-panel="cart">장바구니</button></div><p class="hero-signature">YOUR SKIN. YOUR SHINE.</p>`;
  if(type === 'brand') body.innerHTML = `<div class="brand-panel-art"><img src="assets/hero-glass.webp" width="1254" height="1254" alt="SHINE SKIN 세럼과 쿠션의 유리 조형"></div><h3 class="brand-statement">피부에 맞추고,<br>하루에 빛을 더하다.</h3><p class="brand-body">매일의 피부도, 매일의 계획도 조금씩 다르니까요. SHINE SKIN은 피부에 맞는 케어와 오늘을 위한 메이크업을 함께 생각합니다.</p><p class="brand-body">수분을 채우는 순간부터 맑은 색을 더하는 순간까지. 나에게 편안한 조합으로, 나만의 빛을 만나보세요.</p><a class="button button-primary" href="#routine" data-close-panel style="margin-top:30px">내 루틴 찾기 ${icon('arrow',true)}</a>`;
  updateCounts();
}
function syncBodyLock(){document.body.classList.toggle('has-dialog', panel.open || detail.open);}
function openPanel(type, trigger){
  if(!panel.open) panelReturn = trigger || document.activeElement;
  renderPanel(type);
  if(!panel.open) panel.showModal();
  syncBodyLock();$('.menu-toggle').setAttribute('aria-expanded',String(type === 'menu'));
  requestAnimationFrame(()=>{if(type==='search')$('#product-search').focus();else $('#panel-close').focus();});
}
function closePanel(){panel.close();}
panel.addEventListener('close',()=>{currentPanel='';syncBodyLock();$('.menu-toggle').setAttribute('aria-expanded','false');if(panelReturn?.isConnected)panelReturn.focus({preventScroll:true});});
$('#panel-close').addEventListener('click',closePanel);
panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();closePanel();}});
function closeOnBackdrop(dialog,event){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}
panel.addEventListener('click',e=>{if(e.target===panel)closeOnBackdrop(panel,e);});
detail.addEventListener('click',e=>{if(e.target===detail)closeOnBackdrop(detail,e);});

function showProduct(id, trigger){
  const p=findProduct(id);if(!p)return;
  selectedProduct=p;detailReturn=trigger || document.activeElement;
  $('#product-detail').innerHTML = `<div class="detail-layout"><div class="detail-image">${pack(p)}</div><div class="detail-copy"><h2 id="detail-title">${p.name}</h2><p class="detail-description">${p.description}</p><p class="detail-price">${money(p.price)}<span>${p.size}</span></p><ul class="detail-attributes"><li>${p.texture}</li><li>${p.skins.join(' · ')}</li></ul>${p.shades?`<label class="shade-field" for="detail-shade">색상</label><select class="shade-select" id="detail-shade" aria-describedby="detail-shade-error"><option value="">색상을 선택해 주세요</option>${p.shades.map(shade=>`<option>${shade}</option>`).join('')}</select><p class="field-error" id="detail-shade-error" aria-live="polite"></p>`:''}<div class="quantity" aria-label="담을 수량"><button id="detail-minus" aria-label="수량 줄이기" disabled>${icon('minus')}</button><output id="detail-qty" aria-label="현재 수량">1</output><button id="detail-plus" aria-label="수량 늘리기">${icon('plus')}</button></div><button class="button button-primary detail-add" id="detail-add">장바구니에 담기 ${icon('bag',true)}</button><div class="detail-secondary"><button class="text-link" data-wish="${p.id}" aria-pressed="${wishes.includes(p.id)}" aria-label="${p.name} 찜하기">${icon('heart',true)} <span data-wish-label>찜한 제품에 모으기</span></button></div></div></div>`;
  let quantity=1;
  const setQty=delta=>{quantity=Math.min(10,Math.max(1,quantity+delta));$('#detail-qty').textContent=quantity;$('#detail-minus').disabled=quantity<=1;$('#detail-plus').disabled=quantity>=10;};
  $('#detail-minus').addEventListener('click',()=>setQty(-1));$('#detail-plus').addEventListener('click',()=>setQty(1));
  $('#detail-add').addEventListener('click',()=>{
    const shade=$('#detail-shade')?.value || '';
    if(p.shades&&!shade){$('#detail-shade').setAttribute('aria-invalid','true');$('#detail-shade-error').textContent='원하는 색상을 먼저 선택해 주세요.';$('#detail-shade').focus();return;}
    if(!addBagItem(p,quantity,shade))return;detail.close();
    if(panel.open && currentPanel==='cart')renderPanel('cart');
    toast(`${p.name} · 장바구니에 담았어요.`);
  });
  $('#detail-shade')?.addEventListener('change',()=>{$('#detail-shade').removeAttribute('aria-invalid');$('#detail-shade-error').textContent='';});
  $('.detail-copy',detail).insertAdjacentHTML('beforeend',`<a class="detail-full-link" href="#/products/${p.id}">제품 상세 살펴보기</a>`);
  updateCounts();detail.showModal();syncBodyLock();$('#detail-close').focus({preventScroll:true});
}
$('#detail-close').addEventListener('click',()=>detail.close());
detail.addEventListener('close',()=>{syncBodyLock();if(detailReturn?.isConnected)detailReturn.focus({preventScroll:true});else if(panel.open)$('#panel-close').focus({preventScroll:true});});
document.addEventListener('click',event=>{
  const panelTrigger=event.target.closest('[data-panel]');
  if(panelTrigger){openPanel(panelTrigger.dataset.panel,panelTrigger);return;}
  const closeTrigger=event.target.closest('[data-close-panel]');if(closeTrigger){closePanel();return;}
  const productTrigger=event.target.closest('[data-product]');if(productTrigger){showProduct(productTrigger.dataset.product,productTrigger);return;}
  const wishTrigger=event.target.closest('[data-wish]');if(wishTrigger){toggleWish(wishTrigger.dataset.wish);return;}
  const qtyTrigger=event.target.closest('[data-qty]');
  if(qtyTrigger){
    const index=Number(qtyTrigger.dataset.qty),item=bag[index];if(!item)return;
    item.qty=Math.min(10,Math.max(1,item.qty+Number(qtyTrigger.dataset.delta)));saveState();renderPanel('cart');
    const replacement=$(`[data-qty="${index}"][data-delta="${qtyTrigger.dataset.delta}"]`);const next=replacement&&!replacement.disabled?replacement:$(`[data-qty="${index}"]:not(:disabled)`);next?.focus({preventScroll:true});return;
  }
  const removeTrigger=event.target.closest('[data-remove]');
  if(removeTrigger){const index=Number(removeTrigger.dataset.remove);bag.splice(index,1);saveState();renderPanel('cart');toast('장바구니에서 제품을 뺐어요.');const next=$('[data-remove]')||$('[data-panel="collection"]',panel);next?.focus({preventScroll:true});}
});

// One shared playback state for the product film and bounded glass renderer.
let heroVisible=true;
let motionPlaying=true;
const hero=$('.hero'),stage=$('#hero-stage');
function updateMotion(){
  motionPlaying=!motionReducedByUser&&!reducedMotion.matches&&!document.hidden&&heroVisible;
  document.body.classList.toggle('motion-paused',!motionPlaying);
  document.dispatchEvent(new CustomEvent('shine-motionchange',{detail:{playing:motionPlaying}}));
  if(!motionPlaying){stage.style.removeProperty('translate');stage.style.removeProperty('rotate');}
}
reducedMotion.addEventListener('change',updateMotion);
document.addEventListener('visibilitychange',updateMotion);
new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;updateMotion();},{threshold:0}).observe(hero);
hero.addEventListener('pointermove',event=>{
  if(!motionPlaying||event.pointerType!=='mouse'||innerWidth<1024)return;
  const r=hero.getBoundingClientRect(),x=event.clientX/r.width-.5,y=(event.clientY-r.top)/r.height-.5;
  stage.style.translate=`${x*12}px ${y*9}px`;stage.style.rotate=`${-y} ${x} 0 ${Math.hypot(x,y)*2.5}deg`;
});
hero.addEventListener('pointerleave',()=>{stage.style.removeProperty('translate');stage.style.removeProperty('rotate');});
let scrollTick=false;
window.addEventListener('scroll',()=>{if(!scrollTick){scrollTick=true;requestAnimationFrame(()=>{$('#site-header').classList.toggle('scrolled',scrollY>30);scrollTick=false;});}},{passive:true});

renderRecommendations();updateMotion();
