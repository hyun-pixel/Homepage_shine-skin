'use strict';
(() => {
  const view=$('#page-view'),home=$('#main'),filterDialog=$('#filter-dialog'),imageDialog=$('#image-dialog');
  const categories={all:'전체 제품',...PRODUCT_GROUPS};
  const pageSize=12;
  const textureFor=p=>group(p)==='makeup'?'makeup-texture.webp':'texture-editorial.webp';
  const group=p=>PRODUCT_KINDS[p.kind].group;
  const metadata={
  "SS01": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "travel",
      "special"
    ],
    "use": "세안 후 적당량을 덜어 피부 결을 따라 부드럽게 펴 발라주세요.",
    "story": "가벼운 수분으로 열어가는 아침과 저녁. 다음 케어를 시작하기 전, 맑은 감촉을 더해보세요."
  },
  "SS02": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "travel",
      "special"
    ],
    "use": "토너 다음 단계에 적당량을 덜어 얼굴에 고르게 펴 발라주세요.",
    "story": "맑은 워터 제형을 피부 위에 차곡차곡. 촉촉한 사용감을 좋아하는 날의 첫 선택입니다."
  },
  "SS03": {
    "occasions": [
      "work",
      "weekend",
      "travel"
    ],
    "use": "토너 또는 세럼 다음 단계에 적당량을 부드럽게 펴 발라주세요.",
    "story": "가볍게 흐르는 로션의 감촉. 무겁지 않은 마무리를 좋아한다면 일상 루틴에 더해보세요."
  },
  "SS04": {
    "occasions": [
      "work",
      "date",
      "travel",
      "special"
    ],
    "use": "스킨케어 마지막 단계에 적당량을 덜어 피부 위에 부드럽게 펴 발라주세요.",
    "story": "부드러운 크림이 감싸는 포근한 순간. 풍부한 감촉과 촉촉한 마무리를 선호하는 피부를 위한 선택입니다."
  },
  "SS05": {
    "occasions": [
      "work",
      "weekend",
      "travel"
    ],
    "use": "스킨케어 마지막 단계에 적당량을 가볍게 펴 발라주세요.",
    "story": "맑고 가벼운 젤의 감촉. 산뜻한 사용감으로 하루를 준비하고 싶을 때 만나보세요."
  },
  "SS06": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "travel",
      "special"
    ],
    "use": "젖은 손에 적당량을 덜어 얼굴을 부드럽게 마사지한 후 미온수로 충분히 헹궈주세요.",
    "story": "하루를 시작하고 마무리하는 세안. 부드러운 젤 제형으로 나만의 케어 시간을 열어보세요."
  },
  "SS07": {
    "occasions": [
      "work",
      "weekend",
      "travel"
    ],
    "use": "기초 케어 후 외출 준비 단계에 얼굴에 고르게 펴 발라주세요.",
    "story": "문밖으로 나서기 전, 루틴에 더하는 가벼운 한 단계. 편안한 로션 제형으로 외출을 준비하세요."
  },
  "SS08": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "special"
    ],
    "use": "퍼프에 적당량을 묻혀 얼굴 안쪽에서 바깥쪽으로 가볍게 두드려주세요.",
    "story": "피부 본연의 빛을 살리는 은은한 글로우. 가까이서 보아도 자연스러운 표현을 좋아하는 날에."
  },
  "SS09": {
    "occasions": [
      "work",
      "weekend",
      "travel"
    ],
    "use": "퍼프에 적당량을 묻혀 얼굴에 가볍게 두드리며 고르게 펴 발라주세요.",
    "story": "자연스러운 베이스에 보송한 감촉을 더해보세요. 가벼운 표현을 선호하는 날의 선택입니다."
  },
  "SS10": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "travel",
      "special"
    ],
    "use": "입술 안쪽부터 얇게 바른 뒤 원하는 만큼 색을 더해주세요.",
    "story": "맑은 색과 투명한 윤기가 만나는 순간. 나의 하루에 어울리는 작은 컬러 포인트를 찾아보세요."
  },
  "SS11": {
    "occasions": [
      "date",
      "weekend",
      "special"
    ],
    "use": "브러시로 소량을 덜어 두 볼에 가볍게 쓸어주며 색을 더해주세요.",
    "story": "부드러운 파우더에 담은 은은한 생기. 오늘의 메이크업에 로즈빛 한 겹을 얹어보세요."
  },
  "SS12": {
    "occasions": [
      "work",
      "date",
      "special"
    ],
    "use": "브러시나 손끝에 소량을 묻혀 밝은 색부터 눈두덩에 부드럽게 펴 발라주세요.",
    "story": "네 가지 색이 만드는 일상의 음영. 담백한 베이지부터 차분한 로즈까지, 나만의 조합으로 표현하세요."
  },
  "SS13": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "travel",
      "special"
    ],
    "use": "마른 손에 소량을 덜어 얼굴을 마사지하고, 물을 조금 더해 부드럽게 풀어준 뒤 충분히 헹궈주세요.",
    "story": "외출을 마친 뒤 천천히 녹이는 클렌징 밤. 하루의 메이크업을 정리하는 나만의 시간을 만나보세요."
  },
  "SS14": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "travel",
      "special"
    ],
    "use": "눈을 감고 얼굴에서 조금 떨어뜨려 고르게 뿌린 뒤 가볍게 흡수시켜 주세요.",
    "story": "바쁜 아침에도, 잠깐의 휴식에도. 밀키한 안개를 한 겹 더해 나만의 촉촉한 감촉을 이어가세요."
  },
  "SS15": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "travel",
      "special"
    ],
    "use": "토너 다음 단계에 적당량을 덜어 얼굴에 얇게 펴 발라주세요.",
    "story": "피부 위에 가볍게 쌓는 맑은 한 겹. 로션이나 크림을 더하기 전 부드러운 감촉으로 루틴을 이어가세요."
  },
  "SS16": {
    "occasions": [
      "work",
      "weekend",
      "travel",
      "special"
    ],
    "use": "저녁 케어 마지막에 얇게 펴 바르고, 다음 날 아침 평소처럼 세안해 주세요.",
    "story": "하루를 마무리하는 조용한 순간. 포근한 젤 크림을 펴 바르며 나만의 저녁 루틴을 완성해 보세요."
  },
  "SS17": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "special"
    ],
    "use": "기초 케어 후 외출 준비 단계에 고르게 펴 발라주세요.",
    "story": "문밖으로 나서기 전 얹는 은은한 라벤더빛. 가벼운 베이스 표현을 좋아하는 날의 외출 준비입니다."
  },
  "SS18": {
    "occasions": [
      "work",
      "weekend",
      "travel"
    ],
    "use": "외출 준비 단계에 내용물을 조금씩 올려 피부에 부드럽게 펴 발라주세요.",
    "story": "작은 가방에도 들어가는 둥근 스틱. 익숙한 감촉을 챙겨 나만의 외출 루틴을 이어가세요."
  },
  "SS19": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "special"
    ],
    "use": "소량을 덜어 얼굴 안쪽에서 바깥쪽으로 얇게 펴 바르고, 필요한 부분에는 얇게 덧발라주세요.",
    "story": "얇은 한 겹으로 시작하는 실키한 베이스. 담백하게, 또는 조금 더 정교하게 오늘의 표현을 조절해 보세요."
  },
  "SS20": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "travel",
      "special"
    ],
    "use": "원하는 부위에 소량을 얹고 손끝이나 퍼프로 경계를 가볍게 펴주세요.",
    "story": "필요한 곳에만 더하는 작은 터치. 나의 피부 표현을 편안하게 정돈해 보세요."
  },
  "SS21": {
    "occasions": [
      "work",
      "date",
      "special"
    ],
    "use": "입술 안쪽부터 얇게 바르고 원하는 색감에 맞춰 겹쳐 발라주세요.",
    "story": "차분한 로즈부터 깊은 모브까지. 부드러운 벨벳 감촉으로 오늘의 표정을 골라보세요."
  },
  "SS22": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "travel",
      "special"
    ],
    "use": "입술 위에 가볍게 펴 바르고 필요할 때 한 겹 더해주세요.",
    "story": "부담 없이 더하는 맑은 윤기. 컬러를 쉬고 싶은 날에도 나만의 작은 터치는 이어집니다."
  },
  "SS23": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "travel",
      "special"
    ],
    "use": "눈썹 결을 따라 빈 부분부터 짧은 선을 그리듯 채워주세요.",
    "story": "한 올씩 그려가는 자연스러운 음영. 오늘의 눈썹을 나에게 어울리는 선으로 정돈해 보세요."
  },
  "SS24": {
    "occasions": [
      "work",
      "date",
      "weekend",
      "special"
    ],
    "use": "속눈썹 뿌리부터 끝 방향으로 가볍게 쓸어 올려주세요.",
    "story": "눈매에 더하는 또렷한 한 끗. 부드러운 블랙과 차분한 브라운 중 오늘의 컬러를 선택하세요."
  }
};
  let compared=[...new Set(readSaved('shine-skin-compare',[]).filter(id=>findProduct(id)))].slice(0,3);
  let recent=[...new Set(readSaved('shine-skin-recent',[]).filter(id=>findProduct(id)))].slice(0,20);
  let checkoutData=null,accountData=null,lastHash=location.hash||'#top',lastShop='#/shop';
  const scrolls=new Map();
  history.scrollRestoration='manual';
  const persist=()=>{try{localStorage.setItem('shine-skin-compare',JSON.stringify(compared));localStorage.setItem('shine-skin-recent',JSON.stringify(recent));}catch{}};
  const route=()=>{const raw=location.hash.slice(1);const [path,query='']=raw.split('?');return {path:path||'top',params:new URLSearchParams(query)};};
  const shopHash=params=>'#/shop'+(params.toString()?'?'+params.toString():'');
  function go(hash){if(hash===location.hash)renderRoute();else location.hash=hash;}
  function closeOverlays(){if(panel.open)panel.close();if(detail.open)detail.close();if(filterDialog.open)filterDialog.close();if(imageDialog.open)imageDialog.close();$$('.nav-dropdown[open]').forEach(d=>d.open=false);}
  const crumbs=(label,extra='')=>`<nav class="breadcrumbs" aria-label="현재 위치"><a href="#top">홈</a><span aria-hidden="true">/</span>${extra}<span aria-current="page">${escapeHTML(label)}</span></nav>`;
  const title=(heading,description='',action='')=>`<div class="page-heading"><div><h1 tabindex="-1">${heading}</h1>${description?`<p>${description}</p>`:''}</div>${action}</div>`;
  const empty=(heading,copy,symbol='bag')=>`<div class="surface empty-page">${icon(symbol)}<h2>${heading}</h2><p>${copy}</p><a href="#/shop" class="button button-primary">전체 제품 보기 ${icon('arrow',true)}</a></div>`;
  const compareButton=p=>`<button class="compare-choice" data-compare="${p.id}" aria-pressed="${compared.includes(p.id)}">${icon('compare',true)} ${compared.includes(p.id)?'비교에 담음':'비교 담기'}</button>`;
  function card(p,headingLevel=2){return `<article class="store-card"><a class="store-card-image" href="#/products/${p.id}" aria-label="${p.name} 상세 보기">${pack(p)}</a><button class="icon-button wish-button" data-wish="${p.id}" aria-pressed="${wishes.includes(p.id)}" aria-label="${p.name} 찜하기">${icon('heart')}</button><div class="store-card-body"><p class="store-card-type">${p.type}</p><h${headingLevel}><a href="#/products/${p.id}">${p.name}</a></h${headingLevel}><p class="store-card-description">${p.description}</p><p class="store-card-price">${money(p.price)} <span>${p.size}</span></p><div class="store-card-actions">${compareButton(p)}<button class="quick-open" data-quick="${p.id}" aria-label="${p.name} 옵션 선택">${icon('plus',true)}</button></div></div></article>`;}
  function syncCompare(){
    $$('[data-compare]').forEach(b=>{const active=compared.includes(b.dataset.compare);b.setAttribute('aria-pressed',String(active));b.innerHTML=icon('compare',true)+(active?' 비교에 담음':' 비교 담기');});
    const dock=$('#compare-dock'),path=route().path;dock.hidden=!compared.length||['/compare','/checkout','/account'].includes(path)||(innerWidth<640&&(path==='/cart'||path.startsWith('/products/')));
    dock.innerHTML=`<span>비교함 <strong>${compared.length}</strong> / 3</span><button data-clear-compare>비우기</button><a class="button button-primary" href="#/compare">제품 비교하기 ${icon('arrow',true)}</a>`;
    document.body.classList.toggle('has-compare',!dock.hidden);
  }
  function toggleCompare(id){if(!findProduct(id))return;if(compared.includes(id))compared=compared.filter(x=>x!==id);else{if(compared.length===3){toast('최대 3개까지 비교할 수 있어요. 비교함에서 하나를 빼주세요.');return;}compared.push(id);}persist();syncCompare();if(route().path==='/compare')renderCompare();toast(compared.includes(id)?'비교함에 담았어요.':'비교함에서 뺐어요.');}
  const originalCounts=updateCounts;
  updateCounts=function(){originalCounts();syncCompare();};
  const originalRenderPanel=renderPanel;
  renderPanel=function(type){originalRenderPanel(type);const body=$('#panel-body');
    if(type==='cart'&&bag.length)body.insertAdjacentHTML('beforeend','<div class="panel-cart-links"><a class="button button-primary" href="#/cart">장바구니 자세히 보기 '+icon('arrow',true)+'</a><a class="button button-secondary" href="#/checkout">비회원 주문 내용 입력</a></div>');
    if(type==='search')body.insertAdjacentHTML('beforeend','<a class="text-link panel-search-all" href="#/shop" id="search-all-link">검색·필터로 더 살펴보기 '+icon('arrow',true)+'</a>');
    if(type==='menu')body.innerHTML=mobileCatalogue();
  };
  const originalRenderSearch=renderSearch;
  renderSearch=function(value=''){originalRenderSearch(value);const link=$('#search-all-link');if(link)link.href=shopHash(new URLSearchParams(value.trim()?{q:value.trim()}:{}));};

  function filterFields(params,prefix){return `<div class="filter-field"><label for="${prefix}-skin">피부 타입</label><select id="${prefix}-skin" name="skin"><option value="">모든 피부</option>${Object.entries(skinNames).filter(([k])=>k!=='unsure').map(([k,v])=>`<option value="${k}" ${params.get('skin')===k?'selected':''}>${v}</option>`).join('')}</select></div><div class="filter-field"><label for="${prefix}-occasion">오늘의 계획</label><select id="${prefix}-occasion" name="occasion"><option value="">모든 상황</option>${Object.entries(occasionNames).map(([k,v])=>`<option value="${k}" ${params.get('occasion')===k?'selected':''}>${v}</option>`).join('')}</select></div>`;}
  function shopProducts(params){const q=(params.get('q')||'').trim().toLowerCase(),category=categories[params.get('category')]?params.get('category'):'all',kind=PRODUCT_KINDS[params.get('kind')]?params.get('kind'):'',skin=params.get('skin'),occasion=params.get('occasion');let items=PRODUCTS.filter(p=>(category==='all'||group(p)===category)&&(!kind||p.kind===kind)&&(!skin||p.skins.includes(skinNames[skin])||p.skins.includes('모든 피부 타입'))&&(!occasion||metadata[p.id].occasions.includes(occasion))&&(!q||`${p.name} ${p.en} ${p.type} ${p.texture} ${p.finish}`.toLowerCase().includes(q)));
    const sort=params.get('sort');if(sort==='low')items.sort((a,b)=>a.price-b.price);else if(sort==='high')items.sort((a,b)=>b.price-a.price);else if(sort==='name')items.sort((a,b)=>a.name.localeCompare(b.name,'ko'));else items.sort((a,b)=>a.id.localeCompare(b.id));return items;
  }
  function renderShopResults(params){const items=shopProducts(params),pages=Math.max(1,Math.ceil(items.length/pageSize)),page=Math.min(pages,Math.max(1,Number.parseInt(params.get('page'),10)||1));$('#shop-count').textContent=items.length+'개의 제품';$('#shop-grid').innerHTML=items.length?items.slice((page-1)*pageSize,page*pageSize).map(p=>card(p)).join(''):empty('조건에 맞는 제품이 없어요.','검색어를 바꾸거나 조건을 조정해 보세요. 전체 제품을 다시 볼 수도 있어요.','search');
    $('#shop-pagination').innerHTML=pages>1?Array.from({length:pages},(_,i)=>{const p=new URLSearchParams(params);p.set('page',i+1);return `<a href="${shopHash(p)}" ${page===i+1?'aria-current="page"':''} aria-label="${i+1}페이지">${i+1}</a>`;}).join(''):'';updateCounts();
  }
  function syncShopLinks(params){for(const [selector,key]of [['.category-nav a','category'],['.subcategory-nav a','kind']])$$(selector).forEach(a=>{const value=new URLSearchParams(a.hash.split('?')[1]||'').get(key),next=new URLSearchParams(params);next.delete('page');if(key==='category')next.delete('kind');value?next.set(key,value):next.delete(key);a.href=shopHash(next);});}
  function patchShop(patch){const {params}=route();Object.entries(patch).forEach(([k,v])=>v?params.set(k,String(v)):params.delete(k));params.delete('page');history.replaceState(null,'',shopHash(params));lastHash=location.hash;lastShop=location.hash;renderShopResults(params);syncShopLinks(params);}
  function renderShop(params){const category=categories[params.get('category')]?params.get('category'):'all';if(PRODUCT_KINDS[params.get('kind')]&&category!=='all'&&PRODUCT_KINDS[params.get('kind')].group!==category)params.delete('kind');const kind=PRODUCT_KINDS[params.get('kind')]?params.get('kind'):'';view.innerHTML=`<div class="page-inner">${crumbs('제품 컬렉션')}${title(kind?PRODUCT_KINDS[kind].label:category==='all'?'나의 빛을 고르는 시간.':categories[category],category==='all'?'피부에 닿는 감촉부터 오늘의 마무리까지.<br>나에게 어울리는 제품을 찾아보세요.':'나의 피부와 오늘의 취향에 맞는 한 가지.<br>감촉과 마무리를 나란히 살펴보세요.')}<div class="shop-search field"><label for="shop-query">제품 검색</label><input id="shop-query" type="search" maxlength="100" placeholder="제품명, 제형, 사용감으로 찾아보세요" value="${escapeHTML((params.get('q')||'').slice(0,100))}" autocomplete="off">${icon('search')}</div><nav class="category-nav" aria-label="제품 분류">${Object.entries(categories).map(([k,v])=>{const p=new URLSearchParams(params);k==='all'?p.delete('category'):p.set('category',k);p.delete('page');p.delete('kind');return `<a href="${shopHash(p)}" ${category===k?'aria-current="page"':''}>${v}</a>`;}).join('')}</nav>${kindNavigation(params,category)}<div class="shop-layout"><aside class="shop-filters" aria-label="제품 필터"><h2>나에게 맞춰 보기</h2>${filterFields(params,'side')}<button class="filter-reset" data-reset-filters>조건 초기화</button></aside><section aria-label="제품 목록"><div class="shop-toolbar"><p id="shop-count" class="shop-count" role="status"></p><button class="filter-open" data-open-filter>${icon('filter',true)} 필터</button><label class="sr-only" for="shop-sort">제품 정렬</label><select id="shop-sort" class="sort-select"><option value="recommended">추천순</option><option value="low">낮은 가격순</option><option value="high">높은 가격순</option><option value="name">이름순</option></select></div><div class="shop-grid" id="shop-grid"></div><nav class="pagination" id="shop-pagination" aria-label="제품 목록 페이지"></nav></section></div></div>`;$('#shop-sort').value=['low','high','name'].includes(params.get('sort'))?params.get('sort'):'recommended';renderShopResults(params);lastShop=location.hash;
    $('#shop-query').addEventListener('input',e=>patchShop({q:e.target.value.slice(0,100)}));$('#shop-sort').addEventListener('change',e=>patchShop({sort:e.target.value}));$$('.shop-filters select').forEach(s=>s.addEventListener('change',()=>patchShop({[s.name]:s.value})));
  }
  function showFilters(){const {params}=route();$('#filter-form').innerHTML=filterFields(params,'sheet')+'<button class="button button-primary" type="submit">결과 보기 '+icon('arrow',true)+'</button><button class="filter-reset" type="button" data-reset-filter-draft>조건 초기화</button>';filterDialog.showModal();document.body.classList.add('has-dialog');}
  function renderProduct(id){const p=findProduct(id);if(!p){renderMissing();return;}recent=[id,...recent.filter(x=>x!==id)].slice(0,20);persist();const m=metadata[id];view.innerHTML=`<div class="page-inner">${crumbs(p.name,'<a href="#/shop">제품</a><span aria-hidden="true">/</span>')}<div class="product-page-top"><div class="product-gallery"><button class="product-photo" id="product-photo" data-zoom="${id}" aria-label="${p.name} 이미지 확대">${pack(p)}</button><div class="gallery-tabs" role="group" aria-label="제품 이미지 선택"><button data-gallery="product" aria-pressed="true">제품</button><button data-gallery="texture" aria-pressed="false">제형과 감촉</button></div></div><section class="product-info" aria-labelledby="product-title"><p class="product-category">${p.type} · ${p.size}</p><h1 id="product-title" tabindex="-1">${p.name}</h1><p class="product-english">${p.en}</p><p class="product-description">${p.description}</p><p class="product-price">${money(p.price)}<span>${p.size}</span></p><div class="inline-tags"><span>${p.texture}</span><span>${p.finish}</span></div><form id="product-order" novalidate>${p.shades?`<div class="field"><label for="product-shade">색상 선택</label><select id="product-shade" name="shade" required aria-describedby="product-shade-error"><option value="">색상을 선택해 주세요</option>${p.shades.map(x=>`<option value="${x}">${x}</option>`).join('')}</select><p id="product-shade-error" class="field-error" aria-live="polite"></p></div>`:''}<div class="product-quantity"><span>수량</span><div class="quantity"><button type="button" data-product-qty="-1" aria-label="수량 줄이기" disabled>${icon('minus')}</button><output id="product-quantity" aria-label="현재 수량">1</output><button type="button" data-product-qty="1" aria-label="수량 늘리기">${icon('plus')}</button></div></div><p class="buy-total"><span>총 상품 금액</span><strong id="product-total">${money(p.price)}</strong></p><div class="buy-actions"><button class="button button-secondary" type="submit" name="action" value="cart">장바구니에 담기</button><button class="button button-primary" type="submit" name="action" value="buy">바로 구매 ${icon('arrow',true)}</button></div></form><div class="product-secondary"><button data-wish="${p.id}" aria-pressed="${wishes.includes(id)}" aria-label="${p.name} 찜하기">${icon('heart',true)} <span data-wish-label>찜한 제품에 모으기</span></button>${compareButton(p)}</div></section></div><section class="product-story"><img src="assets/${textureFor(p)}" width="1536" height="1024" alt="${group(p)==='makeup'?'로즈 컬러·베이지 베이스·파우더의 감촉':'워터와 크림의 제형 이미지'}" loading="lazy"><div><h2>${p.finish},<br>나의 취향으로.</h2><p>${m.story}</p><p class="product-occasions"><span>이런 날 함께해요</span>${m.occasions.map(k=>occasionNames[k]).join(' · ')}</p></div></section><section class="product-facts"><h2 class="section-title">조금 더 자세히.</h2><dl><dt>용량</dt><dd>${p.size}</dd><dt>제형</dt><dd>${p.texture}</dd><dt>마무리</dt><dd>${p.finish}</dd><dt>피부 타입</dt><dd>${p.skins.join(' · ')}</dd><dt>사용 방법</dt><dd>${m.use}</dd><dt>사용 시 참고</dt><dd>눈에 직접 닿지 않도록 사용하고, 피부에 불편함이 느껴지면 사용을 멈춰주세요.</dd></dl></section><section class="product-related"><h2 class="section-title">함께 고르는 루틴.</h2><div class="shop-grid">${PRODUCTS.filter(x=>x.id!==id).sort((a,b)=>(group(a)===group(p)?-1:1)-(group(b)===group(p)?-1:1)).slice(0,3).map(p=>card(p,3)).join('')}</div></section><a class="text-link" href="${lastShop}" style="margin-top:36px">제품 목록으로 돌아가기 ${icon('arrow',true)}</a></div>`;
    let qty=1;$$('[data-product-qty]').forEach(b=>b.addEventListener('click',()=>{qty=Math.min(10,Math.max(1,qty+Number(b.dataset.productQty)));$('#product-quantity').textContent=qty;$('#product-total').textContent=money(p.price*qty);$('[data-product-qty="-1"]').disabled=qty===1;$('[data-product-qty="1"]').disabled=qty===10;syncPurchaseBar();}));
    $('#product-shade')?.addEventListener('change',()=>{$('#product-shade').removeAttribute('aria-invalid');$('#product-shade-error').textContent='';});
    $('#product-order').addEventListener('submit',e=>{e.preventDefault();const shade=$('#product-shade')?.value||'';if(p.shades&&!shade){$('#product-shade-error').textContent='원하는 색상을 먼저 선택해 주세요.';$('#product-shade').setAttribute('aria-invalid','true');$('#product-shade').focus();return;}if(addBagItem(p,qty,shade)&&e.submitter?.value==='buy')go('#/checkout');});updateCounts();syncPurchaseBar();
  }
  function renderSaved(params){const tab=params.get('tab')==='recent'?'recent':'wishes',ids=tab==='recent'?recent:wishes;view.innerHTML=`<div class="page-inner">${crumbs('나의 관심 제품')}${title('마음이 머문 빛.','찜한 제품과 최근 본 제품을 한곳에서 다시 만나보세요.')}<div class="saved-tabs"><a class="tab-link" href="#/saved" ${tab==='wishes'?'aria-current="page"':''}>찜한 제품 ${wishes.length}</a><a class="tab-link" href="#/saved?tab=recent" ${tab==='recent'?'aria-current="page"':''}>최근 본 제품 ${recent.length}</a></div>${ids.length?`<div class="saved-toolbar"><span>${ids.length}개의 제품</span>${tab==='recent'?'<button class="text-button" data-clear-recent>최근 본 기록 지우기</button>':''}</div><div class="shop-grid">${ids.map(id=>card(findProduct(id))).join('')}</div>`:empty(tab==='recent'?'아직 둘러본 제품이 없어요.':'아직 찜한 제품이 없어요.',tab==='recent'?'제품 상세를 둘러보면 여기에 모아드려요.':'마음에 드는 제품의 하트를 눌러 여기에 모아보세요.','heart')}</div>`;updateCounts();}
  function renderCompare(){const ps=compared.map(findProduct);view.innerHTML=`<div class="page-inner">${crumbs('제품 비교')}${title('나란히 두고, 나에게 맞게.','제형과 마무리, 용량과 가격까지.<br>최대 3개 제품을 나란히 비교해 보세요.','<a href="#/shop" class="text-link">다른 제품 고르기 '+icon('plus',true)+'</a>')}${ps.length?`<p class="compare-hint">표를 좌우로 움직여 제품을 나란히 확인하세요.</p><div class="compare-scroll" tabindex="0" role="region" aria-label="제품 비교 표, 가로로 이동해 모든 제품을 확인할 수 있습니다"><table class="compare-table"><caption class="sr-only">${ps.length}개 제품의 동일 항목 비교</caption><thead><tr><th scope="col">제품</th>${ps.map(p=>`<th scope="col"><div class="compare-product"><button class="text-button" data-compare-remove="${p.id}" aria-label="${p.name} 비교에서 제거">제거</button>${pack(p)}<h2>${p.name}</h2><a class="button button-primary small-button" href="#/products/${p.id}">상세 보기 ${icon('arrow',true)}</a></div></th>`).join('')}</tr></thead><tbody>${[['가격',p=>money(p.price)],['용량',p=>p.size],['제형',p=>p.texture],['마무리',p=>p.finish],['피부 타입',p=>p.skins.join(' · ')],['추천 상황',p=>metadata[p.id].occasions.map(k=>occasionNames[k]).join(' · ')],['색상',p=>p.shades?p.shades.join(' / '):'색상 선택 없음']].map(([label,value])=>`<tr><th scope="row">${label}</th>${ps.map(p=>`<td>${value(p)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:empty('비교하고 싶은 제품을 골라보세요.','제품의 ‘비교 담기’를 눌러<br>최대 3개 제품의 차이를 확인하세요.','compare')}</div>`;syncCompare();}
  const selectedItems=()=>bag.filter(item=>item.selected!==false);
  const subtotal=items=>items.reduce((sum,item)=>sum+findProduct(item.id).price*item.qty,0);
  function syncPurchaseBar(){
    const path=route().path,bar=$('#mobile-purchase-bar');let html='';
    if(path.startsWith('/products/')){const p=findProduct(path.split('/')[2]),qty=Number($('#product-quantity')?.textContent||1);if(p)html='<div><span>총 상품 금액</span><strong>'+money(p.price*qty)+'</strong></div><button class="button button-primary" data-quick="'+p.id+'">옵션 선택 '+icon('arrow',true)+'</button>';}
    else if(path==='/cart'&&bag.length){const items=selectedItems();html='<div><span>상품 금액 합계</span><strong>'+money(subtotal(items))+'</strong></div><a href="#/checkout" class="button button-primary" '+(items.length?'':'aria-disabled="true" data-no-selection')+'>주문하기 '+icon('arrow',true)+'</a>';}
    else if(path==='/checkout'&&selectedItems().length){html='<div><span>상품 금액 합계</span><strong>'+money(subtotal(selectedItems()))+'</strong></div>'+($('#checkout-form')?'<button class="button button-primary" type="submit" form="checkout-form">주문 내용 확인</button>':'<button class="button button-primary" type="button" disabled aria-describedby="checkout-availability">결제하기</button>');}
    bar.innerHTML=html;bar.hidden=!html;document.body.classList.toggle('has-purchase-bar',Boolean(html));
  }
  function summary(items,action=''){return `<aside class="order-summary surface"><h2>나의 선택</h2>${items.map(item=>{const p=findProduct(item.id);return `<div class="order-mini">${pack(p)}<div><h3>${p.name}</h3><p>${escapeHTML(item.shade||p.size)} · ${item.qty}개</p></div></div>`;}).join('')}<p class="summary-row"><span>선택한 제품</span><span>${items.reduce((n,i)=>n+i.qty,0)}개</span></p><p class="summary-row total"><span>상품 금액 합계</span><strong>${money(subtotal(items))}</strong></p>${action}<p class="subtle">배송비를 제외한 상품 금액이에요.</p></aside>`;}
  function renderCart(){const items=selectedItems();view.innerHTML=`<div class="page-inner">${crumbs('장바구니')}${title('나의 루틴에 담긴 빛.','선택한 옵션과 수량을 한 번 더 확인해 주세요.')}${bag.length?`<div class="cart-layout"><section class="cart-list surface" aria-label="장바구니 제품"><div class="cart-all"><label class="check-label"><input id="cart-select-all" type="checkbox" ${items.length===bag.length?'checked':''}> 전체 선택 (${items.length}/${bag.length})</label></div>${bag.map((item,i)=>{const p=findProduct(item.id);return `<article class="cart-row"><input class="cart-check" type="checkbox" data-cart-select="${i}" ${item.selected!==false?'checked':''} aria-label="${p.name} 주문 선택">${pack(p)}<div class="cart-item-copy"><h2><a href="#/products/${p.id}">${p.name}</a></h2><p>${p.size} · ${money(p.price)}</p>${p.shades?`<label class="sr-only" for="cart-shade-${i}">${p.name} 색상</label><select id="cart-shade-${i}" data-cart-shade="${i}">${p.shades.map(s=>`<option ${s===item.shade?'selected':''}>${s}</option>`).join('')}</select>`:''}<div class="quantity"><button data-cart-qty="${i}" data-delta="-1" aria-label="${p.name} 수량 줄이기" ${item.qty===1?'disabled':''}>${icon('minus',true)}</button><output aria-label="${p.name} 수량">${item.qty}</output><button data-cart-qty="${i}" data-delta="1" aria-label="${p.name} 수량 늘리기" ${item.qty===10?'disabled':''}>${icon('plus',true)}</button></div></div><div class="cart-row-end"><button class="text-button" data-cart-remove="${i}" aria-label="${p.name} 삭제">삭제</button><strong>${money(p.price*item.qty)}</strong></div></article>`;}).join('')}</section>${summary(items,`<a href="#/checkout" class="button button-primary" ${items.length?'':'aria-disabled="true" tabindex="-1" data-no-selection'}>비회원 주문하기 ${icon('arrow',true)}</a><a href="#/shop" class="text-link">다른 제품도 둘러보기</a>`)}</div>`:empty('장바구니가 비어 있어요.','나의 피부와 오늘의 일정에 어울리는<br>제품부터 만나보세요.')}</div>`;$('#cart-select-all')?.addEventListener('change',e=>{bag.forEach(i=>i.selected=e.target.checked);saveState();renderCart();$('#cart-select-all').focus({preventScroll:true});});syncPurchaseBar();}
  function field(name,label,type='text',placeholder='',help='',required=true){return `<div class="field"><label for="${name}">${label}${required?'':' (선택)'}</label><input id="${name}" name="${name}" type="${type}" placeholder="${placeholder}" ${required?'required':''} ${name==='postal'?'inputmode="numeric" maxlength="5"':type==='tel'?'inputmode="tel" maxlength="20"':type==='password'?'maxlength="64"':name==='note'?'maxlength="120"':'maxlength="100"'} autocomplete="off" aria-describedby="${name}-error${help?' '+name+'-help':''}">${help?`<p class="field-help" id="${name}-help">${help}</p>`:''}<p class="field-error" id="${name}-error" aria-live="polite"></p></div>`;}
  function validate(form){let first=null;form.querySelectorAll('input').forEach(input=>{let error='';const value=input.value.trim();if(input.required&&!value)error=({name:'이름을 입력해 주세요.',email:'이메일을 입력해 주세요.',password:'비밀번호를 입력해 주세요.',passwordAgain:'비밀번호를 한 번 더 입력해 주세요.',receiver:'받으실 분의 이름을 입력해 주세요.',phone:'연락처를 입력해 주세요.',postal:'우편번호를 입력해 주세요.',address:'주소를 입력해 주세요.'})[input.name]||'이 항목을 입력해 주세요.';else if(value&&input.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))error='이메일 주소를 다시 확인해 주세요.';else if(value&&input.type==='tel'&&!/^\d{9,11}$/.test(value.replace(/[\s()-]/g,'')))error='연락 가능한 전화번호를 입력해 주세요.';else if(input.name==='postal'&&!/^\d{5}$/.test(value))error='우편번호 다섯 자리를 입력해 주세요.';else if(input.name==='password'&&(!/[A-Za-z]/.test(value)||!/[0-9]/.test(value)||value.length<8))error='영문과 숫자를 포함해 8자 이상 입력해 주세요.';else if(input.name==='passwordAgain'&&input.value!==form.elements.password.value)error='비밀번호가 서로 달라요. 다시 확인해 주세요.';const message=$('#'+input.name+'-error',form);if(message)message.textContent=error;if(error){input.setAttribute('aria-invalid','true');if(!first)first=input;}else input.removeAttribute('aria-invalid');});if(first){first.focus();return false;}return true;}
  function fill(form,data){if(!data)return;Object.entries(data).forEach(([name,value])=>{const input=form.elements.namedItem(name);if(input&&typeof value==='string')input.value=value;});}
  function checkoutSteps(review){return `<nav class="checkout-steps" aria-label="주문 단계"><span>장바구니</span><span ${review?'':'aria-current="step"'}>정보 입력</span><span ${review?'aria-current="step"':''}>주문 내용 확인</span></nav>`;}
  function renderCheckout(review=false){const items=selectedItems();if(!items.length){view.innerHTML=`<div class="page-inner">${crumbs('주문')}${title('나의 주문')}${empty('주문할 제품을 먼저 골라주세요.','장바구니에 제품을 담고 주문할 항목을 선택해 주세요.')}</div>`;return;}if(review&&!checkoutData){renderCheckout();return;}
    const data=checkoutData;const action=review?'<button class="button button-primary" type="button" disabled aria-describedby="checkout-availability">결제하기</button><p class="completion-note subtle" id="checkout-availability">결제는 현재 이용할 수 없어요. 입력한 내용은 수정할 수 있어요.</p>':'<button class="button button-primary" type="submit" form="checkout-form">주문 내용 확인 '+icon('arrow',true)+'</button>';
    const form=review?`<div><section class="review-block surface"><div><h2>받으실 분</h2><button class="text-button" data-edit-checkout>수정</button></div><p>${escapeHTML(data.receiver)} · ${escapeHTML(data.phone)}</p><p>(${escapeHTML(data.postal)}) ${escapeHTML(data.address)}<br>${escapeHTML(data.addressDetail)}</p>${data.note?`<p class="subtle">요청사항: ${escapeHTML(data.note)}</p>`:''}</section><section class="review-block surface"><div><h2>결제수단</h2><button class="text-button" data-edit-checkout>수정</button></div><p>${escapeHTML(data.payment)}</p><p class="subtle">선택한 상품과 배송 정보를 다시 확인해 주세요.</p></section><a class="text-link" href="#/cart">장바구니로 돌아가기 ${icon('arrow',true)}</a></div>`:`<form id="checkout-form" novalidate><section class="form-section surface"><h2>배송 정보</h2><div class="field-row">${field('receiver','받으실 분','text','이름')}${field('phone','연락처','tel','010-0000-0000')}</div>${field('postal','우편번호','text','우편번호 5자리')}${field('address','주소','text','도로명 또는 지번 주소')}${field('addressDetail','상세 주소','text','건물명, 동·호수','',false)}${field('note','배송 요청사항','text','요청사항을 입력해 주세요','',false)}</section><section class="form-section surface"><h2>결제수단 선택</h2><div class="payment-options"><label class="payment-option"><input type="radio" name="payment" value="신용·체크카드" checked> 신용·체크카드</label><label class="payment-option"><input type="radio" name="payment" value="간편결제"> 간편결제</label></div></section></form>`;
    view.innerHTML=`<div class="page-inner">${crumbs('주문 내용 확인')}${title(review?'마지막으로, 나의 선택을.':'내일의 루틴을 준비하며.','회원가입 없이 주문 내용을 확인할 수 있어요.')}${checkoutSteps(review)}<div class="checkout-layout">${form}${summary(items,action)}</div></div>`;
    if(!review){const formEl=$('#checkout-form');fill(formEl,data);formEl.addEventListener('submit',e=>{e.preventDefault();if(!validate(formEl))return;checkoutData=Object.fromEntries(new FormData(formEl));renderCheckout(true);$('h1',view).focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});});}syncPurchaseBar();
  }
  function renderAccount(params,review=false){const signup=params.get('mode')==='signup';if(review&&!accountData)return renderAccount(params);const form=review?`<h1 tabindex="-1">입력 내용을 확인해 주세요.</h1><p class="subtle">${signup?escapeHTML(accountData.name)+'님, ':''}${signup?'가입':'로그인'}에 사용할 이메일이에요.</p><div class="review-block" style="padding:24px 0;margin:0"><p>${escapeHTML(accountData.email)}</p><p class="subtle">비밀번호는 화면에 표시하지 않아요.</p></div><button class="button button-primary" type="button" disabled aria-describedby="account-availability">${signup?'가입 완료':'로그인'}</button><p class="completion-note subtle" id="account-availability">${signup?'회원가입':'로그인'}은 현재 이용할 수 없어요. 입력한 내용은 수정할 수 있어요.</p><button class="text-button" data-edit-account style="width:100%;margin-top:12px">입력 내용 수정</button>`:`<h1 tabindex="-1">${signup?'나만의 빛을 시작하세요.':'다시 만나는 나의 빛.'}</h1><nav class="account-tabs" aria-label="계정 메뉴"><a href="#/account" ${signup?'':'aria-current="page"'}>로그인</a><a href="#/account?mode=signup" ${signup?'aria-current="page"':''}>회원가입</a></nav><form id="account-form" novalidate>${signup?field('name','이름','text','이름을 입력해 주세요'):''}${field('email','이메일','email','name@example.com')}${field('password','비밀번호','password','비밀번호 입력','영문과 숫자를 포함해 8자 이상 입력해 주세요.')}${signup?field('passwordAgain','비밀번호 확인','password','비밀번호를 한 번 더 입력해 주세요'):''}<button type="button" class="text-button" data-show-password aria-pressed="false" aria-controls="password${signup?' passwordAgain':''}">비밀번호 보기</button><button class="button button-primary" type="submit">입력 내용 확인 ${icon('arrow',true)}</button></form><a class="text-link" href="#/shop">제품 먼저 둘러보기</a>`;
    view.innerHTML=`<div class="page-inner">${crumbs(signup?'회원가입':'로그인')}<div class="account-layout"><div class="account-art" aria-hidden="true"><p>오늘의 나에게,<br>조금 더 나답게.</p></div><section class="account-box surface">${form}</section></div></div>`;
    if(!review){const f=$('#account-form');fill(f,accountData);f.addEventListener('submit',e=>{e.preventDefault();if(!validate(f))return;accountData={name:f.elements.name?.value||'',email:f.elements.email.value};f.querySelectorAll('input[type="password"]').forEach(i=>i.value='');renderAccount(params,true);$('h1',view).focus({preventScroll:true});});}
  }

  function renderMissing(){view.innerHTML=`<div class="page-inner">${title('찾는 페이지가 없어요.')}<p class="subtle">제품 컬렉션에서 다시 살펴보세요.</p><a class="button button-primary" href="#/shop" style="margin-top:28px">제품 만나보기</a></div>`;}
  function renderRoute(){const {path,params}=route();if(path==='/brand'){history.replaceState(null,'','#brand');renderRoute();return;}const isHome=!path.startsWith('/');scrolls.set(lastHash,scrollY);closeOverlays();if(path!=='/checkout')checkoutData=null;if(path!=='/account')accountData=null;home.hidden=!isHome;view.hidden=isHome;document.body.classList.toggle('inner-page',!isHome);syncNavigation();lastHash=location.hash||'#top';
    if(isHome){document.title='SHINE SKIN — 피부에 맞추고, 하루에 빛을 더하다';syncCompare();syncPurchaseBar();const target=['routine','help','top','brand'].includes(path)?$('#'+path):$('#top');requestAnimationFrame(()=>{target?.scrollIntoView({behavior:'instant',block:'start'});if(path==='brand')$('#brand-title')?.focus({preventScroll:true});});return;}
    if(path==='/shop')renderShop(params);else if(path.startsWith('/products/'))renderProduct(path.split('/')[2]);else if(path==='/compare')renderCompare();else if(path==='/saved')renderSaved(params);else if(path==='/cart')renderCart();else if(path==='/checkout')renderCheckout();else if(path==='/account')renderAccount(params);else renderMissing();
    document.title=($('h1',view)?.textContent||'SHINE SKIN')+' | SHINE SKIN';syncCompare();syncPurchaseBar();requestAnimationFrame(()=>{window.scrollTo({top:scrolls.get(location.hash)||0,behavior:'instant'});$('h1',view)?.focus({preventScroll:true});});
  }
  document.addEventListener('click',e=>{
    const target=e.target.closest('button,a');if(!target)return;
    if(target.classList.contains('skip-link')){e.preventDefault();const main=home.hidden?view:home;main.focus({preventScroll:true});main.scrollIntoView({behavior:'instant',block:'start'});return;}
    if(target.hasAttribute('data-no-selection')){e.preventDefault();toast('주문할 제품을 선택해 주세요.');return;}
    if(target.closest('#panel')&&target.matches('a[href^="#"]')){e.preventDefault();go(target.getAttribute('href'));return;}
    if(target.matches('a[href="#brand"]')){e.preventDefault();go('#brand');return;}
    const type=target.dataset.panel;
    if(['collection','brand','wishlist'].includes(type)){e.preventDefault();e.stopImmediatePropagation();go(type==='collection'?'#/shop':type==='brand'?'#brand':'#/saved');return;}
    if(target.dataset.quick){e.preventDefault();e.stopImmediatePropagation();showProduct(target.dataset.quick,target);if(route().path==='/products/'+target.dataset.quick){const select=$('#detail-shade'),shade=$('#product-shade')?.value;if(select&&shade)select.value=shade;const qty=Number($('#product-quantity')?.textContent||1);for(let i=1;i<qty;i++)$('#detail-plus').click();}return;}
    if(target.dataset.product&&!target.classList.contains('card-open')){e.preventDefault();e.stopImmediatePropagation();go('#/products/'+target.dataset.product);return;}
    if(target.dataset.compare){toggleCompare(target.dataset.compare);return;}
    if(target.dataset.compareRemove){compared=compared.filter(id=>id!==target.dataset.compareRemove);persist();renderCompare();return;}
    if(target.hasAttribute('data-clear-compare')){compared=[];persist();syncCompare();return;}
    if(target.hasAttribute('data-clear-recent')){recent=[];persist();renderSaved(route().params);return;}
    if(target.hasAttribute('data-open-filter')){showFilters();return;}
    if(target.hasAttribute('data-close-filter')){filterDialog.close();return;}
    if(target.hasAttribute('data-reset-filter-draft')){$$('#filter-form select').forEach(s=>s.value='');return;}
    if(target.hasAttribute('data-reset-filters')){$$('.shop-filters select').forEach(s=>s.value='');patchShop({skin:'',occasion:''});return;}
    if(target.dataset.gallery){const productId=route().path.split('/')[2],p=findProduct(productId);if(!p)return;$$('[data-gallery]').forEach(b=>b.setAttribute('aria-pressed',String(b===target)));$('#product-photo').innerHTML=target.dataset.gallery==='product'?pack(p):`<img src="assets/${textureFor(p)}" alt="${p.type}의 제형과 감촉">`;$('#product-photo').dataset.zoomMode=target.dataset.gallery;return;}
    if(target.dataset.zoom){const p=findProduct(target.dataset.zoom);$('#zoom-content').innerHTML=target.dataset.zoomMode==='texture'?`<img src="assets/${textureFor(p)}" alt="제형과 감촉 확대">`:pack(p);imageDialog.showModal();document.body.classList.add('has-dialog');return;}
    if(target.hasAttribute('data-close-image')){imageDialog.close();return;}
    if(target.dataset.cartQty){const i=Number(target.dataset.cartQty);if(!bag[i])return;bag[i].qty=Math.max(1,Math.min(10,bag[i].qty+Number(target.dataset.delta)));saveState();renderCart();$(`[data-cart-qty="${i}"][data-delta="${target.dataset.delta}"]:not(:disabled)`)?.focus({preventScroll:true});return;}
    if(target.hasAttribute('data-cart-remove')){bag.splice(Number(target.dataset.cartRemove),1);saveState();renderCart();toast('장바구니에서 제품을 뺐어요.');return;}
    if(target.hasAttribute('data-edit-checkout')){renderCheckout();return;}
    if(target.hasAttribute('data-edit-account')){renderAccount(route().params);return;}
    if(target.hasAttribute('data-show-password')){const inputs=$$('#account-form input').filter(i=>i.name.startsWith('password')),show=inputs[0]?.type==='password';inputs.forEach(i=>i.type=show?'text':'password');target.textContent=show?'비밀번호 숨기기':'비밀번호 보기';target.setAttribute('aria-pressed',String(show));return;}
  },true);
  document.addEventListener('change',e=>{
    const t=e.target;
    if(t.hasAttribute('data-cart-select')){bag[Number(t.dataset.cartSelect)].selected=t.checked;saveState();renderCart();$(`[data-cart-select="${t.dataset.cartSelect}"]`)?.focus({preventScroll:true});}
    if(t.hasAttribute('data-cart-shade')){const i=Number(t.dataset.cartShade),item=bag[i],other=bag.findIndex((x,j)=>j!==i&&x.id===item.id&&x.shade===t.value);if(other>=0){if(bag[other].qty+item.qty>10){t.value=item.shade;toast('같은 옵션은 최대 10개까지 담을 수 있어요.');return;}bag[other].qty+=item.qty;bag[other].selected=bag[other].selected!==false||item.selected!==false;bag.splice(i,1);}else item.shade=t.value;saveState();renderCart();}
  });
  document.addEventListener('input',e=>{if(e.target.matches('#account-form input,#checkout-form input')){e.target.removeAttribute('aria-invalid');const err=$('#'+e.target.name+'-error');if(err)err.textContent='';}});
  $('#filter-form').addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));filterDialog.close();patchShop(data);$('[data-open-filter]')?.focus({preventScroll:true});});
  for(const dialog of [filterDialog,imageDialog]){dialog.addEventListener('click',e=>{if(e.target===dialog)closeOnBackdrop(dialog,e);});dialog.addEventListener('close',()=>document.body.classList.remove('has-dialog'));}
  for(const dialog of [panel,detail,filterDialog,imageDialog])dialog.addEventListener('keydown',e=>{
    if(e.key!=='Tab')return;
    const controls=[...dialog.querySelectorAll('a[href],button,summary,input,select,textarea,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);
    const first=controls[0],last=controls.at(-1);
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.nav-dropdown'))$$('.nav-dropdown[open]').forEach(d=>d.open=false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.nav-dropdown[open]').forEach(d=>{if(d.contains(document.activeElement))$('summary',d).focus();d.open=false;});});
  const originalWish=toggleWish;toggleWish=function(id){originalWish(id);if(route().path==='/saved'&&route().params.get('tab')!=='recent')renderSaved(route().params);};
  panel.addEventListener('close',()=>{
    if(route().path==='/cart')renderCart();
    if(route().path==='/checkout'){
      const form=$('#checkout-form'),review=!form&&Boolean(checkoutData);
      if(form)checkoutData=Object.fromEntries(new FormData(form));
      renderCheckout(review);
    }
  });
  const motionSwitch=$('#reduce-motion');
  function syncMotionSwitch(){motionSwitch.checked=motionReducedByUser||reducedMotion.matches;motionSwitch.disabled=reducedMotion.matches;}
  motionSwitch.addEventListener('change',()=>{motionReducedByUser=motionSwitch.checked;try{localStorage.setItem('shine-skin-reduce-motion',JSON.stringify(motionReducedByUser));}catch{}updateMotion();syncMotionSwitch();});
  reducedMotion.addEventListener('change',syncMotionSwitch);syncMotionSwitch();
  matchMedia('(max-width:639px)').addEventListener('change',syncCompare);

  function catalogueHref(category,kind=''){return shopHash(new URLSearchParams({...category==='all'?{}:{category},...kind?{kind}:{}}));}
  function catalogueFamilies(category){const result={};Object.entries(PRODUCT_KINDS).filter(([,k])=>k.group===category).forEach(([key,k])=>{(result[k.family]||=[]).push([key,k]);});return result;}
  function catalogueLinks(category){return Object.entries(catalogueFamilies(category)).map(([name,entries])=>'<section class="mega-column"><h3>'+name+'</h3><ul>'+entries.map(([key,k])=>'<li><a href="'+catalogueHref(category,key)+'">'+k.label+'<span>'+PRODUCTS.filter(p=>p.kind===key).length+'</span></a></li>').join('')+'</ul></section>').join('');}
  function desktopCatalogue(category){const choices={care:['SS14','가볍게 더하는 밀키한 한 겹.'],makeup:['SS21','오늘의 표정을 고르는 컬러.'],sun:['SS18','문밖으로, 가볍게.']},[id,copy]=choices[category],p=findProduct(id);return '<div class="mega-intro"><h2>'+categories[category]+'</h2><p>'+PRODUCTS.filter(p=>group(p)===category).length+'가지 감촉과 마무리</p><a class="text-link" href="'+catalogueHref(category)+'">전체 보기 '+icon('arrow',true)+'</a></div><div class="mega-link-groups">'+catalogueLinks(category)+'</div><a class="mega-feature" href="#/products/'+id+'"><div>'+pack(p)+'</div><p>'+p.name+'</p><span>'+copy+'</span></a>';}
  function mobileCatalogue(){return '<nav class="mobile-catalogue" aria-label="모바일 제품 메뉴"><a class="mobile-all" href="#/shop">전체 제품 <span>24</span>'+icon('arrow')+'</a>'+Object.entries(PRODUCT_GROUPS).map(([category,label])=>'<details class="mobile-category" name="mobile-catalogue"><summary>'+label+'<span>'+PRODUCTS.filter(p=>group(p)===category).length+'</span>'+icon('plus')+'</summary><div><a class="mobile-group-all" href="'+catalogueHref(category)+'">'+label+' 전체 보기 '+icon('arrow',true)+'</a>'+catalogueLinks(category)+'</div></details>').join('')+'<div class="mobile-main-links"><a href="#routine">나만의 루틴 '+icon('arrow')+'</a><a href="#brand">브랜드 이야기 '+icon('arrow')+'</a></div><div class="mobile-utility-links"><a href="#/saved">찜한 제품</a><a href="#/saved?tab=recent">최근 본 제품</a><a href="#/compare">제품 비교</a><a href="#/cart">장바구니</a><a href="#/account">로그인·회원가입</a></div></nav>';}
  function kindNavigation(params,category){if(category==='all')return '';const all=new URLSearchParams(params);all.delete('kind');all.delete('page');return '<nav class="subcategory-nav" aria-label="'+categories[category]+' 세부 분류"><a href="'+shopHash(all)+'" '+(!params.get('kind')?'aria-current="page"':'')+'>전체</a>'+Object.entries(PRODUCT_KINDS).filter(([,kind])=>kind.group===category).map(([key,kind])=>{const next=new URLSearchParams(all);next.set('kind',key);return '<a href="'+shopHash(next)+'" '+(params.get('kind')===key?'aria-current="page"':'')+'>'+kind.label+'</a>';}).join('')+'</nav>';}
  function syncNavigation(){const {path,params}=route(),category=params.get('category')||'all';$$('.desktop-nav>[data-nav-group]').forEach(el=>el.classList.toggle('nav-current',path==='/shop'&&el.dataset.navGroup===category));$$('.desktop-nav a[href]').forEach(a=>{if(a.getAttribute('href')===(location.hash||'#top'))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
  $$('.desktop-nav .nav-dropdown').forEach(menu=>{const category=menu.dataset.navGroup;$('.mega-menu',menu).innerHTML=desktopCatalogue(category);let leaveTimer,hoverOpened=false;$('summary',menu).addEventListener('click',e=>{if(e.detail>0&&hoverOpened){e.preventDefault();hoverOpened=false;}});menu.addEventListener('toggle',()=>{if(menu.open)$$('.desktop-nav .nav-dropdown').filter(other=>other!==menu).forEach(other=>other.open=false);});menu.addEventListener('pointerenter',()=>{clearTimeout(leaveTimer);if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!menu.open){hoverOpened=true;menu.open=true;}});menu.addEventListener('pointerleave',()=>{leaveTimer=setTimeout(()=>{if(!menu.contains(document.activeElement))menu.open=false;},180);});menu.addEventListener('focusout',e=>{if(menu.contains(e.relatedTarget))return;setTimeout(()=>{if(!menu.contains(document.activeElement)&&!menu.matches(':hover'))menu.open=false;},0);});});
  matchMedia('(max-width:1199px)').addEventListener('change',()=>$$('.desktop-nav .nav-dropdown').forEach(menu=>menu.open=false));

  window.addEventListener('hashchange',renderRoute);
  renderRoute();
})();
