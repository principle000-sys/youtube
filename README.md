# 유튜브 떡상 대본 복제기

성공한 영상의 구조를 분석하여 새로운 주제로 재창조하는 AI 도구입니다.

## 🚀 배포

이 프로젝트는 Vercel에 배포되어 있습니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/principle000-sys/youtube)

## 💻 로컬 실행

**필수 요구사항:** Node.js 18+

1. 의존성 설치:
   ```bash
   npm install
   ```

2. 개발 서버 실행:
   ```bash
   npm run dev
   ```

3. 브라우저에서 `http://localhost:3000` 접속

## 🔑 API Key 설정

- 웹 UI에서 직접 API Key를 입력할 수 있습니다
- "API Key 기억하기" 옵션으로 브라우저에 저장 가능
- API Key는 [Google AI Studio](https://aistudio.google.com/apikey)에서 발급받으세요

## 📦 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 🛠️ 기술 스택

- React 19
- TypeScript
- Vite
- Google Gemini AI
- Tailwind CSS
