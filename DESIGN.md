---
name: SHINE SKIN
description: 푸른 아이리스 배경과 액체 제품 영상 위에 떠 있는 Pearl Light Glass
colors:
  primary: "#1e5969"
  primary-hover: "#174957"
  background: "#d1e6f0"
  hero-ground: "#b9dce9"
  ink: "#17313a"
  muted: "#526976"
  ice: "#d9eff5"
  silver: "#cad9e0"
  edge: "rgba(255,255,255,.82)"
  focus: "#226b81"
  white: "#ffffff"
  glass: "rgba(227,245,253,.29)"
  secondary: "#f2f8fa"
  secondary-hover: "#e0eff5"
  field-border: "#718c99"
typography:
  display:
    fontFamily: "'S-Core Dream', sans-serif"
    fontSize: "clamp(38px,3.4vw,50px)"
    fontWeight: 300
    lineHeight: 1.32
    letterSpacing: "-.035em"
  headline:
    fontFamily: "'S-Core Dream', sans-serif"
    fontSize: "48px"
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: "-.025em"
  title:
    fontFamily: "Pretendard, 'Malgun Gothic', sans-serif"
    fontSize: "19px"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Pretendard, 'Malgun Gothic', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: "Pretendard, 'Malgun Gothic', sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "Pretendard, 'Malgun Gothic', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  wordmark:
    fontFamily: "'S-Core Dream', sans-serif"
    fontSize: "23px"
    fontWeight: 400
    letterSpacing: ".055em"
rounded:
  field: "14px"
  card-mobile: "20px"
  caption: "22px"
  card: "24px"
  panel: "28px"
  dialog: "32px"
  container: "40px"
  title-pane: "38px"
  film: "42px"
  rear-pane: "46px"
  pill: "100px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  2xl: "32px"
  3xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "14px 25px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "14px 25px"
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover}"
  button-icon:
    textColor: "{colors.ink}"
    size: "44px"
    rounded: "50%"
  input-search:
    backgroundColor: "#fff8"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "14px 48px 14px 16px"
  navigation:
    textColor: "{colors.ink}"
    padding: "0"
  choice:
    backgroundColor: "#edf8ff55"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
  choice-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
  product-card:
    backgroundColor: "rgba(241,250,255,.63)"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  title-glass:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.title-pane}"
    padding: "36px"
    width: "100%"
  header-glass:
    backgroundColor: "linear-gradient(115deg,rgba(248,253,255,.39),rgba(211,234,249,.23))"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  routine-glass:
    backgroundColor: "linear-gradient(125deg,#eaf8ff63,#f2fbff42 60%,#d5efff52)"
    textColor: "{colors.ink}"
    rounded: "{rounded.container}"
  product-film:
    backgroundColor: "#b4d5ee"
    rounded: "{rounded.film}"
  dialog:
    backgroundColor: "rgba(246,251,253,.96)"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
---

# Design System: SHINE SKIN

## Overview

**Creative North Star: "Pearl Light Glass"**

승인된 **Pearl Light Glass**를 기준으로 밀크 화이트, 아이스 블루, 실버와 진주빛 굴절을 사용한다. v2에서는 큰 푸른 아이리스 꽃잎의 사진 배경이 투명 표면 뒤에 분명히 보이고, 제목 유리 안에서도 같은 꽃 형태가 변형되어 이어진다. 앞뒤 유리 면 위의 세럼·쿠션 영상에는 맑은 액체가 제품 앞뒤를 흐른다. 선택·가격·설명은 어두운 청록 글자로 읽힌다.

이 문서는 사용자 피드백을 반영하고 검토를 마친 v2 재질과 v3 배치 시안에서 추출한 시각 체계다. 이후 페이지도 같은 색·글꼴·재질·모션 언어를 잇는다. 현재 구현은 헤더·히어로·추천 영역과 그 안의 로컬 패널이며, 첫 화면의 구체적인 배치와 후속 범위는 `work/preview-surface-brief.md` 및 `PRODUCT.md`가 맡는다. 이 문서와 `.impeccable/design.json`은 배포 화면 밖의 내부 작업 기준이다.

**Key Characteristics:**

- 푸른 아이리스 사진이 보이는 차가운 바탕, 어두운 청록의 정보와 선택 상태.
- 배경을 변형하는 제목 유리, 앞뒤 깊이가 있는 제품 면과 맑은 액체 영상.
- S-Core Dream의 가는 제목과 Pretendard의 명료한 정보 계층.
- 풍부한 움직임과 기기 움직임 감소·화면 밖 정지 동작.

## Colors

큰 푸른 꽃잎의 사진과 차가운 블루가 넓은 바탕을 만들고 밀크 화이트·실버·진주빛이 제품과 유리 경계를 연결한다. 정확한 값은 위 frontmatter가 기준이며 뒤에 로드되는 glass-v2.css의 유효한 덮어쓰기를 포함한다. styles.css에 남은 v1 흰 바탕·공통 유리 값은 v2 표면의 기준으로 복원하지 않는다.

### Primary

- **Deep Glass Teal** (`primary`): 주요 CTA, 선택한 피부·상황, 찜 상태와 수량 배지.
- **Deep Glass Teal Hover** (`primary-hover`): 마우스가 있는 기기의 주요 CTA와 선택 칩 반응.
- **Clear Focus Teal** (`focus`): 키보드로 이동할 때 보이는 윤곽.

### Neutral

- **Iris Ice Ground** (`background`): 본문과 추천 섹션의 푸른 바탕. **Iris Hero Ground** (`hero-ground`)는 히어로 사진이 로드되기 전의 바탕이다.
- **Deep Teal Ink** (`ink`): 제목, 제품명, 가격과 기본 조작.
- **Blue Gray Text** (`muted`): 사용감 설명과 선택 조건 등 보조 정보.
- **Ice Blue** (`ice`)·**Silver Mist** (`silver`): CSS 루트에 선언된 보조 팔레트. 현재는 그라데이션과 이미지의 인접 색이 주로 보이므로 사용 비율을 새로 규정하지 않는다.
- **Milk White** (`white`)·**Glass Fill** (`glass`)·**Light Glass Edge** (`edge`): 제목 유리의 반투명 채움, 기본 밝은 경계, 주요 버튼 안의 글자. 헤더·추천·캡션은 각 컴포넌트의 v2 채움과 경계 값을 우선한다.
- **Cool Secondary** (`secondary`, `secondary-hover`): CSS에 정의된 보조 버튼의 표면과 hover. 현재 HTML/JS에서는 이 변형을 사용하지 않는다.
- **Blue Gray Field Border** (`field-border`): 검색창과 옵션 선택 필드의 경계.

**The Pearl Light Rule.** 밝은 밀크 화이트·아이스 블루·실버의 세계와 유리 뒤로 보이는 사진 배경을 유지하고, 선택과 주요 행동에는 청록을 사용한다.

## Typography

**Display Font:** S-Core Dream, sans-serif fallback.  
**Body Font:** Pretendard, Malgun Gothic, sans-serif fallback.

가는 제목과 단정한 정보 글꼴이 제품 조형의 무게와 균형을 이룬다. 한국어는 단어 단위 줄바꿈(`word-break: keep-all`)을 기본으로 하고 넘치는 문자열에는 `overflow-wrap: anywhere`가 적용된다. 제목에는 `text-wrap: balance`를 사용한다.

### Hierarchy

- **Display:** 히어로 두 줄 제목. 데스크톱 clamp(38px,3.4vw,50px), 1024–1199px는 36px, 태블릿 clamp(36px,5.2vw,44px), 모바일 clamp(28px,8.2vw,36px), 374px 이하는 28px. 모바일 line-height 1.38, letter-spacing -.04em.
- **Headline:** 추천 섹션 제목. 데스크톱은 `headline`; 1023px 이하 40px, 639px 이하 34px, 374px 이하 31px이다.
- **Title:** 카드 제품명은 `title`. 최종 모바일 크기는 17px, 374px 이하 15px이다. 추천 결과 제목은 22px/500, 모바일은 18px, 작은 화면은 16px이다.
- **Body:** `body`가 기본이다. 히어로 설명은 데스크톱 17px/1.8, 1024–1199px는 15px, 태블릿은 16px, 모바일은 14px/1.8이다. 카드 설명은 데스크톱 13px/1.6, 모바일 12px/1.7, 작은 화면 11px이다.
- **Action / Label:** 버튼과 선택 칩은 `action`·`label`을 따른다. 모바일 히어로 주요 버튼은 13px, 374px 이하에서는 12px이며 선택 칩은 12px이다. 가격·수량은 `tabular-nums`로 숫자 폭을 맞춘다.
- **Wordmark:** `wordmark`를 사용하며 639px 이하 17px, 374px 이하 15px로 줄어든다.

현재 파일은 `outputs/shine-skin/fonts/`의 Pretendard Regular/Medium 공식 WOFF2와 S-Core Dream 3 Light/4 Regular 원본 OTF다. 로컬 Pretendard TTF는 Chromium의 `Bad glyph flag`로 거부되어 사용하지 않는다. `font-display: swap`, `font-synthesis: none`이 적용된다. CSS에서 500–800을 선언해도 Pretendard는 동일한 Medium 파일, S-Core Dream의 400–800은 동일한 Regular 파일로 연결되므로 별도의 Bold 파일이 있는 것으로 해석하지 않는다. 출처와 이용 조건은 같은 폴더의 `NOTICE.md`·`PRETENDARD-LICENSE.txt`에 있다.

**The Two Voices Rule.** 제목과 워드마크는 S-Core Dream, 설명·상품 정보·조작은 Pretendard를 사용한다.

## Layout

내용 컨테이너의 최대 폭은 1280px이다. 좌우 여백은 데스크톱 `clamp(32px,4.5vw,64px)`, 1023px 이하 32px, 639px 이하 20px, 374px 이하 16px이다. 보이는 배치에는 위 spacing 값과 28px·36px 간격도 사용한다. 모든 간격을 단일 수열로 강제하지 않는다.

3차 히어로는 1024px 이상에서 두 열 그리드(.94fr / 1.06fr)와 40–64px 간격을 사용한다. 두 전면은 겹치지 않고 뒤쪽 유리만 깊이를 만든다. 제목은 열 너비 100%·안쪽 36px·위로 16px 광학 보정, 영상은 열 안에서 최대 640px·1도 기울기다. hero-layout은 min-height:clamp(760px,100svh,960px), 안쪽 위 144px·아래 88px다. 1024–1199px는 간격 32px·제목 안쪽 30px 26px·위 136px·아래 80px·최소 높이 760px다. 640–1023px는 자연 높이 세로 흐름, 간격 32px, 제목 88%·최대 620px, 영상 82%·최대 580px·오른쪽 정렬이다. 모바일은 제목→영상 순서, 간격 24px, 위 110px·아래 56px, 제목 안쪽 24px 20px, 영상 폭 calc(100% - 6px)·최대 460px다. 374px 이하 제목 좌우 여백은 18px이다. 이 구성은 이번 히어로에만 적용한다.

추천 상품은 데스크톱·태블릿에서 3열, 639px 이하에서 가로형 카드의 1열이다. 모바일 카드 내부는 이미지 약 35%와 정보 영역이며 374px 이하에서는 이미지 약 34%다. 이 구조는 읽기 우선순위를 위해 구현되고 검토된 **현 시안의 제안**이다. 초기 계획의 2열을 바꾼 사실을 보존하며, 후속 화면 전반을 재설계할 권한으로 확대하지 않는다. 분류 배지는 이미지 버튼이 아닌 카드에 고정되어 320·390px에서 온전한 단어로 보인다.

고정 헤더는 데스크톱에서 위 20px·좌우 32px·높이 76px, 모바일에서 위/좌우 12px·높이 62px이다. 1023px 이하에서는 주요 메뉴를 메뉴 버튼으로 전환한다. 앵커 이동은 고정 헤더를 피하도록 기본 116px, 모바일 92px의 스크롤 여백을 둔다. 우측 패널은 데스크톱 490px이며 뷰포트 여백을 남기고, 제품 대화상자는 데스크톱 850px의 2열에서 모바일 1열로 변한다.

## Elevation & Depth

v2의 깊이는 보이는 사진 배경, 같은 배경을 표본화·변형하는 제목 유리, 밝은 이중 경계, 안쪽 반사광과 푸른 그림자, 제품 영상과 앞뒤 유리 면을 함께 사용한다. 헤더는 blur(13px) saturate(125%), 제목 면은 CSS blur(8px) saturate(118%), 추천 면은 blur(14px) saturate(115%)다. 모바일 헤더는 blur(10px) saturate(120%), 추천은 blur(10px)이다.

제목 패널 크기의 WebGL은 히어로와 같은 아이리스 이미지를 좌표에 맞춰 다시 그린다. 가장자리 변형 범위는 약 19px, 중앙은 약한 다중 표본 흐림과 31% 밝은 블루 혼합으로 읽기를 지킨다. 캔버스 alpha는 .94다. 제품 앞면은 rotateY(-6deg) rotateX(2deg), 무대는 1도, 후면은 -4도로 겹친다. 모바일은 앞면 원근 기울임을 없앤다.

### Shadow Vocabulary

- **Header Glass:** inset 0 2px 2px #ffffffe0,inset 0 -2px 2px #6f9eb640,0 16px 36px #224b6526. 스크롤 시 inset 0 1px 2px #fff,0 12px 36px #24496526.
- **Title Glass:** inset 2px 2px 3px #ffffffc9,inset -2px -3px 3px #7195b139,0 26px 60px #244c6b2b.
- **Product Film / Rear Pane:** inset 0 0 0 3px #ffffff45,0 25px 60px #254c7040 / inset 0 2px 3px #ffffffc9,0 24px 55px #305a7e3d.
- **Product Caption:** inset 1px 1px 3px #fff,inset -1px -1px 2px #7d9eb950,0 16px 36px #183f6233.
- **Routine Container:** inset 2px 2px 3px #ffffffe6,inset -2px -2px 3px #7395b44a,0 25px 60px #294e6d29.
- **Primary Action:** 기본 0 8px 24px #2257671a. 히어로의 더 구체적인 규칙은 inset 0 1px 0 #ffffff30,0 8px 20px #1b475331이며 hover에도 우선한다.
- **Card Rest / Hover:** inset 0 1px 1px #fff,0 10px 24px #21435e0b / 0 16px 30px #2a4c6926. hover 가능한 기기에서만 5px 들어 올린다.
- **Dialog:** 0 24px 80px #17313a2e. 배경은 #15394f45와 blur(10px)다.

**The Material Truth Rule.** 제목 유리는 실제로 같은 배경 이미지의 좌표를 표본화·변형한다. 제품·액체의 형태와 움직임은 사진·영상 자산, 화면의 앞뒤 면은 CSS 원근 배치가 담당한다. 이는 완전한 물리 광학이나 자유 회전하는 전체 3D 장면이 아니다. v1의 단순 흰 유리·전체 히어로 빛 무늬·반복 제품 부유를 현재 재질 기준으로 복원하지 않는다.

## Shapes

헤더·주요 버튼·선택 칩·수량 조작은 긴 알약 형태다. 상품 카드는 부드러운 직사각형, 추천 컨테이너와 패널은 더 큰 둥근 모서리를 사용한다. 위 rounded 값은 데스크톱의 기준이며 모바일 추천 컨테이너는 26px, 우측 패널과 제품 대화상자는 24px로 줄어든다. 경계는 보통 1px이며 투명/흰 선과 옅은 블루 선이 표면을 구분한다.

제목 면의 모서리는 데스크톱 38px·모바일 30px, 제품 앞면은 42px·모바일 30px, 후면은 46px·모바일 33px다. 맑은 액체의 곡선과 물방울은 제품 영상·정지 자산의 실제 형태이며 CSS 도형으로 복제하지 않는다. v1의 장식 궤도·구슬·광원은 현재 히어로 마크업에 없다. 인터페이스 아이콘은 기본 22px, 작은 아이콘 18px, 1.5px 둥근 획의 SVG로 통일한다.

## Components

### Buttons

주요 행동은 청록 알약 버튼으로 선명하게 보인다. 기본 최소 높이 56px, 모바일 51px이며 정확한 색·간격은 frontmatter를 따른다. 히어로 모바일 버튼은 안쪽 12px 18px, 374px 이하 좌우 15px다. hover 가능한 기기에서는 주요 버튼을 2px 올리고 색·그림자를 바꾼다. 활성화 순간에는 0.98배로 눌린다. 보조 버튼은 CSS에 밝은 표면과 옅은 블루 경계로 정의되어 있지만 현재 마크업에는 사용처가 없다. 실제 보조 행동에 쓰는 텍스트 링크는 hover 밑줄로 반응한다.

아이콘 버튼은 원형 44×44px이다. 최종 수정은 모바일 헤더·찜·옵션 열기 버튼에도 44px 조작 영역을 유지한다. 수량 버튼은 현재 구현에서 40px이며 별도로 기록한다.

### Chips

피부 타입과 일정은 실제 radio 입력과 label로 묶인다. 선택하지 않은 상태는 #edf8ff55 표면과 #87a8bc 경계, 선택 상태는 청록 채움과 흰 글자다. 기본 높이 46px, 모바일 44px이며 선택·키보드 포커스는 각각 독립적으로 보인다. 모바일 피부 선택은 4칸 그리드와 두 칸을 차지하는 ‘잘 모르겠어요’로 재배치된다.

### Cards / Containers

카드는 큰 제품 이미지, 분류, 제품명, 사용감, 가격·용량, 추천 이유, 찜·옵션 열기로 구성한다. 기본 정보 여백은 좌우 24px·아래 23px이며 모바일 정보 영역은 카드의 오른쪽 열에 놓인다. 분류 배지의 카드 기준 위치와 우측 찜 버튼의 자리를 유지한다. 현재 카탈로그에는 투명 3×2 아틀라스의 제품 이미지 **6개**가 있고, 추천은 각 조건마다 3개를 보여 준다. 전체 계획의 12개가 모두 구현된 것은 아니다.

추천 결과 제목이 먼저 나오고 그 아래에 선택한 피부·일정 문맥이 표시된다. 추천 유리 뒤에는 같은 아이리스 사진을 70% 불투명도의 더 조용한 층으로 잇고 v1 halo는 숨긴다. 상품 카드는 rgba(241,250,255,.63), hover는 #eff9ffdb 표면이다. 조건 변경 시 제목·제품·이유와 보조기기용 결과 알림이 함께 바뀐다.

### Inputs / Fields

검색창은 반투명 흰 표면·블루 회색 경계·둥근 모서리로 구성하고 최소 높이 54px, 오른쪽 SVG 검색 아이콘을 사용한다. 눈에 보이는 label과 결과 수/빈 상태 안내를 유지한다. 제품 색상은 현재 native select(최소 높이 48px)이며 별도의 가짜 드롭다운이 없다. 현재 구현에 없는 오류·검증 스타일을 확정된 토큰으로 만들지 않는다.

모든 button·a·input에는 3px 포커스 윤곽과 5px 바깥 간격이 적용된다. radio의 보이는 label에는 4px 간격, 검색 필드에는 3px 간격이 적용된다. 첫 항목에는 본문 바로가기 링크가 있고, 장식은 보조기기에서 숨기며 제품 이미지에는 이름을 제공한다.

### Navigation

떠 있는 유리 헤더의 워드마크, 주요 메뉴, 검색·찜·장바구니가 동일한 청록 계열로 묶인다. 헤더는 흰색 39%→블루 23% 그라데이션과 밝은 이중 경계를 사용하고 스크롤 시 rgba(226,244,252,.74)로 읽기를 보강한다. 모바일 기본 면은 linear-gradient(115deg,#ecfaff8c,#dbedff4d)다. 데스크톱 메뉴는 15px, 최소 높이 44px이며 hover 시 아래 선이 왼쪽부터 나타난다. 메뉴 버튼은 실제 열린 상태를 `aria-expanded`로 표시한다. 작은 화면에서 숨겨진 찜 기능은 메뉴 패널에서 접근할 수 있다.

### Product Caption / Dialog / Motion

히어로의 제품 캡션과 하단 안내·정지 버튼은 2026-10-17 사용자 요청으로 제거했다. 제품 정보는 추천 카드·제품 목록에서 연다. 검색·메뉴·찜·장바구니는 기존 native dialog와 키보드·닫기·포커스 복귀 동작을 유지한다.

제품 장면은 6.041667초·24fps·무음·반복 재생 H.264 영상 하나다. 데스크톱은 960×960·2,544,183 bytes, 640px 미만은 같은 장면의 640×640·1,273,255 bytes이며 모두 yuv420p·faststart다. 영상 준비 후 350ms opacity 전환으로 포스터 위에 나타난다. 제품 형태·라벨·카메라를 유지하면서 액체 윤곽이 달라지는 장면이다. v1의 8초 제품 부유·제품 입장·장식 구슬·광원 이동과 약 30fps 전체 히어로 빛 무늬는 현재 장면에서 대체됐다.

제목 패널의 굴절 렌더는 최소 50ms(최대 약 20fps 갱신 간격)로 제한하고 픽셀 비율 상한은 데스크톱 1.25·640px 미만 1이다. 실제 기기의 전달 fps를 보장하지 않는다. 제목·본문·CTA는 반복해서 흔들지 않으며 기존 0.9–1초 입장, 추천 교체(300ms·카드 간 45ms), 패널 입장(300ms)은 유지한다. 마우스 포인터 깊이는 폭 1024px 이상에서만 제품 무대에 적용한다.

사용자 요청으로 히어로의 수동 정지 버튼을 제거했다. 이전 버튼의 저장 선호는 더 이상 읽지 않는다. 기기 움직임 감소 설정, 화면 밖·비활성 탭 정지와 데이터 절약·영상 실패 대체는 유지한다. prefers-reduced-motion에서는 영상 요청과 반복 효과를 끄며 설정을 실행 중 바꾸어도 영상·굴절이 함께 정지·재개한다. 화면 밖·비활성 탭에서는 일시 정지하고 다시 보이면 재개한다. prefers-reduced-motion에서는 영상 요청을 시작하지 않고 정지 장면을 유지하며 자동 반복·포인터 깊이·실질적인 CSS 전환을 끈다. saveData에서는 영상 요청을 시작하지 않는다. 영상 재생·디코딩 실패 시 정지 포스터가 남고 WebGL 미지원·셰이더 실패·컨텍스트 손실 시 캔버스를 숨겨 사진 배경·CSS 유리 경계·본문을 유지한다.

저장소 사용 불가 시 현재 방문의 메모리 상태로 작동한다. 배경 흐림 미지원 시 헤더 #e8f6fbe8·제목 #dceef4cf·추천 #e4f3facf 대체 면을 사용하며 캡션·대화상자는 기존 밝은 대체 면을 유지한다. 외부 전송·실제 결제·계정 연결은 현재 시안에 없다. 영상·이미지·글꼴은 로컬 파일이며 실행 중 생성 API를 호출하지 않는다.

현재 배경은 iris-backdrop-v2.webp, 제품 정지는 liquid-poster-v2.webp이며 정확한 생성 프롬프트는 각 .webp.json에 있다. 영상 프롬프트·생성 작업·예상 10.5크레딧·직접 원본에서 인코딩한 두 규격은 assets/hero-liquid-v2.mp4.json에 기록한다. 영상 원본은 work/v2-originals/hero-liquid-source.mp4에 보존한다. 기존 hero-glass.webp는 v1 출처 자료이며 현재 히어로가 아니다. 6개 상품의 투명 product-atlas.webp와 원본 알파·프롬프트·ASSET_MANIFEST.json 출처 기록은 유지한다. 상품·가격·패키지는 설계 제안이며 실제 효능·제조·실적의 근거로 쓰지 않는다.

fresh review(work/v2-finish-review.md)의 disposition은 ship이며 현재 세 영역 수정 범위에서 material fixes는 없다. 제공된 16개 기능 검사·10개 영상/유리 검사와 1440·1024·768·390·320px의 가로 넘침 없음·글꼴 로드 결과를 근거로 한다. 검토자는 UI 캡처 9개와 실제 원본 영상 디코딩 프레임 4개를 확인했으며 연속 재생의 부드러움은 직접 관찰하지 않았다. 실제 휴대전화·Safari·저성능 기기·느린 네트워크 확인은 남아 있다. 이번 문서 병합에서는 추가 캡처나 재검수를 실행하지 않았다.

## Do's and Don'ts

### Do:

- Do 보이는 아이리스 배경·제목의 배경 변형·앞뒤 유리 면·큰 제품 장면을 이후 화면에서도 같은 밝은 세계로 이어간다.
- Do 현재 제공한 로컬 글꼴 파일과 실제 제공되는 굵기를 사용한다.
- Do SVG의 동일한 획 체계와 조작 요소의 보이는 키보드 포커스를 유지한다.
- Do 추천 제목 아래에 선택 조건을 표시하고, 분류 배지는 카드 기준에 두어 온전한 단어로 읽히게 한다.
- Do 기기 움직임 감소·데이터 절약 시 영상 회피, 화면 밖 정지, 영상·WebGL·저장소·배경 흐림의 대체 동작을 보존한다.
- Do 이미지·영상 교체 시 원본·정확한 생성 프롬프트·출처·영상 인코딩 기록과 상품 아틀라스의 투명 알파를 함께 보존한다.

### Don't:

- Don't 승인된 밀크 화이트·아이스 블루·실버를 크림색·금색·어두운 바탕으로 바꾸지 않는다.
- Don't 제품·액체를 CSS 도형으로 대체하거나 배경 흐림·좌표 변형을 완전한 물리 광학 또는 전체 3D 공간이라고 기록하지 않는다.
- Don't ↺·↗·✧·↑ 같은 글자 기호를 조작 아이콘으로 섞지 않는다.
- Don't 작은 화면의 분류명을 축소·말줄임으로 숨기거나 좁은 이미지 버튼 안에 다시 가두지 않는다.
- Don't 첫 시안의 모바일 가로형 카드 제안을 모든 후속 페이지의 재설계 권한으로 확대하지 않는다.
- Don't 계획된 상품·페이지·결제·계정 연결이 이미 구현됐다고 표시하지 않는다.
