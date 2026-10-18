# SHINE SKIN

푸른 아이리스 배경과 리퀴드 글래스를 사용한 여성 화장품 브랜드 홈페이지입니다. 정적 HTML·CSS·JavaScript로 제작했으며, 필요한 이미지·영상·글꼴을 프로젝트에 포함했습니다.

## 로컬 실행

Python 3가 설치된 환경에서 저장소 폴더를 열고 실행합니다.

```sh
python -m http.server 8080 --bind 127.0.0.1 --directory outputs
```

- [홈페이지](http://127.0.0.1:8080/shine-skin/)
- [PC·모바일 비교](http://127.0.0.1:8080/SHINE_SKIN_PREVIEW.html)
- [기획·디자인 검토 문서](http://127.0.0.1:8080/SHINE_SKIN_REVIEW.html)

별도 패키지 설치·환경변수·외부 API 연결은 필요하지 않습니다. 기존 작업용 미리보기의 54067 포트 대신 위 실행 예시는 8080 포트를 사용합니다.

## Vercel 배포

저장소 루트의 `vercel.json`에서 홈페이지가 있는 `outputs/shine-skin`을 공개 폴더로 지정합니다. 별도 빌드 과정은 없습니다. 배포 후 홈페이지는 도메인의 `/`에서 열리며 상품 상세는 `/#/products/SS08`처럼 이동합니다.

Vercel 프로젝트의 **Settings → Build and Deployment**에서 **Root Directory**는 저장소 루트인 `.`으로 유지합니다. **Framework Preset**은 **Other**, **Build Command**는 빈 값, **Output Directory**는 `outputs/shine-skin`이며 이 세 값은 `vercel.json`에서 지정합니다. 설정 파일이 포함된 최신 커밋을 배포해야 적용됩니다.

도메인 첫 화면이 404이고 `/outputs/shine-skin/index.html`만 열린다면 저장소 전체가 공개된 상태입니다. 위 공개 폴더 설정으로 홈페이지·이미지·영상·글꼴을 도메인 바로 아래에 배치할 수 있습니다. 기획 문서와 검수용 비교 화면은 홈페이지 공개 폴더 밖에 두며 로컬에서 확인합니다.

Git 연동이 켜져 있으면 `main`에 푸시할 때 자동으로 재배포될 수 있습니다. 수동 재배포는 **Deployments → 최신 커밋의 배포 → ⋯ → Redeploy**에서 진행합니다. 배포 후 `/`, `/#/shop`, `/#/products/SS08`과 영상·이미지 로딩을 확인합니다.

## 구성

- `outputs/shine-skin/`: 홈페이지 소스·이미지·영상·글꼴
- [PRD](outputs/SHINE_SKIN_PRD.md), [디자인 명세서](outputs/SHINE_SKIN_DESIGN_SPEC.md), [결정 기록](outputs/SHINE_SKIN_DECISION_LOG.md)
- [와이어프레임](outputs/SHINE_SKIN_WIREFRAMES.html), [최종 검수 기록](outputs/SHINE_SKIN_FINAL_QA.md)
- `DESIGN.md`·`.impeccable/design.json`: 기존 디자인 기준
- `work/final-qa/`: 선별한 검수 결과와 재실행 가능한 소스 검사

홈 추천, 24종 상품 탐색·상세, 검색·필터, 찜·비교, 장바구니, 주문·계정의 입력 확인 화면을 포함합니다. 실제 결제·주문 접수·로그인·회원 생성은 연결하지 않았습니다. 상품·가격·이미지는 내부 디자인 제안이며 실제 판매 정보로 확인된 내용이 아닙니다.

## 검수

PC·모바일의 54개 배치와 43개 실제 조작을 확인했습니다. 실제 휴대전화·Safari·운영 서비스 연결 등 미확인 범위는 최종 검수 기록에 구분했습니다. 기록에 있는 Git·배포 상태는 각 검수 당시의 상태입니다.

Node.js가 설치되어 있으면 다음 검사도 실행할 수 있습니다.

```sh
node work/final-qa/check.cjs
node work/test-hero-ripples.cjs
```

글꼴 이용 조건은 `outputs/shine-skin/fonts/`에, 시각 자산의 제작 기록은 `outputs/shine-skin/ASSET_MANIFEST.json`과 각 자산의 JSON에 있습니다. 작업용 원본·백업·로컬 도구는 Git에 포함하지 않습니다. GitHub Pages 등 공개 웹 호스팅은 별도로 설정해야 합니다.
