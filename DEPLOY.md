# 로또 번호 생성기 배포 가이드 (Vercel)

이 프로젝트는 **Next.js**로 제작되었으므로, 제작사인 **Vercel**을 통해 배포하는 것이 가장 쉽고 성능이 좋습니다.

## 1단계: GitHub에 코드 올리기
1.  GitHub(https://github.com)에 로그인하고 **New Repository**를 클릭하여 새 저장소를 만듭니다 (예: `lotto-gen`).
2.  터미널에서 다음 명령어를 입력하여 코드를 GitHub에 올립니다.
    ```bash
    # 현재 프로젝트 폴더에서
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/lotto-gen.git
    git push -u origin main
    ```
    *(위 명령어 중 `YOUR_USERNAME`과 `lotto-gen`은 본인의 GitHub 아이디와 저장소 이름으로 바꿔주세요.)*

## 2단계: Vercel에 배포하기
1.  [Vercel](https://vercel.com)에 접속하여 회원가입/로그인합니다 (GitHub 계정으로 로그인 추천).
2.  대시보드에서 **"Add New..."** -> **"Project"**를 클릭합니다.
3.  **"Import Git Repository"**에서 방금 만든 `lotto-gen` 저장소를 찾아 **Import**를 누릅니다.
4.  설정 화면이 나오면 별도의 수정 없이 **"Deploy"** 버튼을 클릭합니다.
    *   *Framework Preset*: Next.js (자동 감지됨)
    *   *Root Directory*: `./` (자동 감지됨)
5.  약 1~2분 후 배포가 완료되면 폭죽 애니메이션이 나옵니다.
6.  제공된 도메인(예: `lotto-gen.vercel.app`)을 클릭하면 전 세계 어디서든 접속 가능합니다!

## 3단계: 구글 애드센스 설정 (배포 후)
1.  배포된 사이트 주소(URL)를 구글 애드센스 사이트 설정에 추가합니다.
2.  애드센스에서 제공하는 스크립트 코드를 `src/app/layout.tsx`의 `<head>` 태그 안에 넣거나, `AdPlaceholder` 컴포넌트를 실제 광고 코드로 교체합니다.
    *   *주의: 실제 광고 코드를 넣고 다시 GitHub에 Push하면 Vercel이 자동으로 재배포합니다.*

## 참고사항
*   **API Proxy**: 이 프로젝트는 `dhlottery` API를 우회하기 위해 Next.js API Routes를 사용합니다. Vercel은 이를 자동으로 'Serverless Function'으로 변환해주므로 별도 설정 없이 잘 작동합니다.
*   **비용**: Vercel의 Hobby 요금제는 개인 프로젝트에 대해 **무료**입니다.
