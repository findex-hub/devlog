# 다국어 자동 번역 방안

## 개요

한국어로 작성한 블로그 포스트를 자동으로 다른 언어(영어 등)로 번역하여 다국어 콘텐츠를 생성하는 방안을 정리합니다.

---

## 방안 1: AI API를 활용한 빌드 타임 번역 (권장)

### 구조

```
data/blog/my-post.mdx (ko, 원본)
  ↓ 빌드 스크립트 실행
data/blog/my-post.en.mdx (en, 자동 생성)
```

### 구현 방법

1. **번역 스크립트** (`scripts/translate-posts.ts`) 작성
2. 한국어 원본 `.mdx` 파일을 읽어서 frontmatter와 본문을 분리
3. OpenAI GPT-4 또는 Anthropic Claude API를 호출하여 번역
4. 번역된 내용을 `{slug}.en.mdx` 파일로 저장
5. `contentlayer`가 빌드 시 자동으로 언어별 파일을 인식

### 예시 스크립트

```typescript
// scripts/translate-posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const BLOG_DIR = path.join(process.cwd(), 'data/blog')
const TARGET_LANG = 'en'

async function translatePost(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content: body } = matter(content)

  // 이미 번역 파일이 존재하면 스킵
  const translatedPath = filePath.replace('.mdx', `.${TARGET_LANG}.mdx`)
  if (fs.existsSync(translatedPath)) return

  const prompt = `
다음 한국어 블로그 포스트를 영어로 번역해 주세요.
- 코드 블록은 번역하지 마세요
- 기술 용어는 원래 영어 표현을 유지하세요
- frontmatter의 title, summary만 번역하세요
- 자연스럽고 전문적인 톤을 유지하세요

---
${body}
`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  })

  const translatedBody = response.choices[0].message.content
  const translatedFrontmatter = {
    ...frontmatter,
    language: TARGET_LANG,
    // title, summary는 별도 번역 API 호출로 처리
  }

  const output = matter.stringify(translatedBody || '', translatedFrontmatter)
  fs.writeFileSync(translatedPath, output)
  console.log(`✅ Translated: ${path.basename(filePath)}`)
}

// 실행
const files = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.mdx') && !f.includes('.en.'))

for (const file of files) {
  await translatePost(path.join(BLOG_DIR, file))
}
```

### 장점
- 번역 품질이 높음 (GPT-4, Claude 수준)
- 기술 콘텐츠에 최적화 가능 (프롬프트 커스터마이징)
- 빌드 전에 한 번만 실행하면 됨

### 단점
- API 비용 발생 (포스트당 약 $0.01~$0.05)
- 번역 후 수동 검수가 필요할 수 있음

---

## 방안 2: GitHub Actions 자동화

### 워크플로우

```yaml
# .github/workflows/translate.yml
name: Auto Translate Posts

on:
  push:
    paths:
      - 'data/blog/**/*.mdx'

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run translation script
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: npx tsx scripts/translate-posts.ts

      - name: Commit translated files
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/blog/*.en.mdx
          git diff --staged --quiet || git commit -m "chore: auto-translate posts"
          git push
```

### 장점
- 완전 자동화 (한국어 포스트 push → 영어 번역 자동 생성)
- 번역 파일이 git에 커밋되어 추적 가능

---

## 방안 3: DeepL API (대안)

DeepL은 기술 문서 번역 품질이 좋고, 무료 티어(월 50만 자)를 제공합니다.

```typescript
import * as deepl from 'deepl-node'

const translator = new deepl.Translator(process.env.DEEPL_API_KEY!)

const result = await translator.translateText(
  body,
  'ko',
  'en-US',
  { preserveFormatting: true }
)
```

---

## 적용 순서

1. `siteMetadata.enabledLocales`에 `'en'` 추가: `['ko', 'en']`
2. 번역 스크립트 작성 및 테스트
3. GitHub Actions 워크플로우 설정 (선택)
4. 번역된 콘텐츠 검수 프로세스 수립

---

## 비용 추정

| 방안 | 월 비용 (포스트 10개 기준) |
|------|---------------------------|
| OpenAI GPT-4o | ~$0.50 |
| Anthropic Claude | ~$0.30 |
| DeepL Free | 무료 (50만 자 이내) |
| DeepL Pro | $5.49/월 |

---

## 권장사항

**방안 1 (AI API) + 방안 2 (GitHub Actions)**를 조합하는 것을 권장합니다.

- 한국어 포스트를 push하면 자동으로 영어 버전이 생성됨
- 번역 품질이 높고, 기술 용어 처리가 우수
- 필요시 번역 파일을 수동으로 수정할 수 있음
