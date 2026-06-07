# Changelog — AI Text Humanizer

> **IMPORTANT:** From now on, every change made to this system must be documented in this file.  
> Whenever a file is modified, a new feature is added, or anything is removed — add an entry below  
> under the next version header. This keeps a clear history of what changed and why.

All changes made to transform this project from a basic Next.js starter into a working AI Text Humanizer.

## [2.0.0] — 2026-06-07

### Project Restructuring — src/, assets/, tests/, docs/

**What changed:**
- Moved all source code (`app/`, `components/`, `lib/`) into `src/` directory
- Updated `tsconfig.json` paths from `"@/*": ["./*"]` to `"@/*": ["./src/*"]` so imports resolve correctly
- Created `assets/` directory with `logo.svg` placeholder and `images/` subdirectory
- Created `tests/` directory with test structure placeholder
- Created `docs/` directory and moved `CHANGELOG.md` there
- Moved full documentation (`README.md`) to `docs/`
- Created `docs/presentations.md` for PPT files

**Why:** Organize project into a clean, professional structure: source code in `src/`, static assets in `assets/`, tests in `tests/`, and documentation in `docs/`.

| Action | Details |
|--------|---------|
| Moved → src/ | `app/`, `components/`, `lib/` |
| Created | `assets/` (logo, images) |
| Created | `tests/` (unit, integration, API) |
| Created | `docs/` (changelog, docs, presentations) |
| Updated | `tsconfig.json` path mapping |

## [1.1.0] — 2026-06-07

### Changed Model: Gemini 2.5 Flash → Gemini 3.5 Flash

**Files modified:** `lib/openrouter.ts`, `app/page.tsx`, `README.md`

**What changed:**
- Updated model identifier from `gemini-2.5-flash` to `gemini-3.5-flash` in the API wrapper
- Updated UI header text to show the correct model name
- Updated README references

**Why:** User requested to use the newer Gemini 3.5 Flash model for improved performance and quality.

## [1.0.0] — 2026-06-07

### 1. Enhanced Anti-Detection Prompt (`lib/prompts.ts`)

**Before (original "strong" prompt):**
- Basic instructions: vary sentences, use contractions, avoid certain words
- Short and generic, lacked specific anti-detection techniques

**After (rewritten "strong" prompt):**
- Detailed, step-by-step instructions targeting AI detector weaknesses
- Specific techniques included:
  - Vary sentence length and structure (fragments to complex)
  - Use contractions at a specific rate (50-70%)
  - Add conversational elements (hesitations, opinions, asides)
  - Mix formal and informal vocabulary for realism
  - Introduce 1-2 subtle grammatical imperfections per paragraph
  - Vary paragraph length unpredictably
  - Avoid robotic pattern words
- Target: ~20% AI detection score on ZeroGPT, Grammarly, GPTZero

**Why:** The original prompt was too basic. AI detectors look for specific statistical patterns (perplexity, burstiness). The new prompt explicitly instructs the AI to break those patterns.

---

### 2. Switched AI Provider — OpenRouter → Google AI Studio (`lib/openrouter.ts`)

**Before (OpenRouter API):**
- Called `https://openrouter.ai/api/v1/chat/completions`
- Used Auth header with `OPENROUTER_API_KEY`
- Model: `meta-llama/llama-3-70b-instruct`
- Had frequencyPenalty + presencePenalty parameters (unsupported by Gemini)

**After (Google AI Studio API):**
- Calls `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent`
- Uses API key as query parameter
- Model: `gemini-2.5-flash`
- Removed unsupported parameters (frequencyPenalty, presencePenalty)
- Kept supported parameters: temperature=0.7, topP=0.9
- Environment variable renamed: `GOOGLE_AI_API_KEY`

**Why:** User requested Google AI Studio API key specifically. The Gemini model is free and provides excellent quality. We removed parameters that the Gemini API doesn't support to fix the 400 error.

---

### 3. Updated Environment Variables (`.env.local`)

**Before:**
```

```

**Why:** Changed from OpenRouter to Google AI Studio API key as requested.

---

### 4. Updated .gitignore (`.gitignore`)

git 
```

**After:**
```
# env files (containing secrets - DO NOT COMMIT)
.env.local
.env.*.local
```

**Why:** The old pattern `.env*` was too broad (would miss some patterns). Now explicitly ignores `.env.local` and `.env.*.local` to protect the API key from being committed.

---

### 5. Rewrote README (`README.md`)

**Before:** Generic Next.js boilerplate readme

**After:** Comprehensive project documentation including:
- Project description (AI Text Humanizer)
- Features list (anti-detection, Gemini integration, Vercel optimization)
- Environment setup instructions
- How It Works section with step-by-step guide
- Anti-detection techniques explained
- Vercel deployment instructions with env variable guidance

**Why:** The original README was the default Next.js template. Users need clear documentation on how to set up and use the actual project.

---

### 6. Updated UI Header (`app/page.tsx`)

**Before:**
```
Powered by OpenRouter
```

**After:**
```
Powered by Google Gemini 2.5 Flash
```

**Why:** The UI still showed OpenRouter even though we switched to Google AI Studio.

---

### 7. Renamed Variable for Clarity (`app/api/humanize/route.ts`)

**Before:**
```typescript
const openRouterRes = await streamHumanize(...)
```

**After:**
```typescript
const aiResponse = await streamHumanize(...)
```

**Why:** The variable name still referenced OpenRouter, which no longer exists. Changed to generic name.

---

### 8. Removed Extra Files

**Removed:**
- `AGENTS.md` (opencode-specific, not needed for project)
- `CLAUDE.md` (opencode-specific, not needed for project)
- `ai-text-humanizer-system-plan.md` (documentation file, moved to CHANGELOG.md)

**Why:** These files contained opencode/development configurations not needed by the actual running system.

---

### 9. Created This File (`CHANGELOG.md`)

**Why:** User requested a single file documenting all changes made, so they can easily understand what was modified and why.

---

## Files Modified (Summary)

| File | Change |
|------|--------|
| `lib/openrouter.ts` | Rewrote from OpenRouter → Google AI Studio API |
| `lib/prompts.ts` | Enhanced "strong" prompt with anti-detection techniques |
| `.env.local` | Changed API key variable from OPENROUTER → GOOGLE_AI |
| `.gitignore` | Made env file patterns more explicit |
| `README.md` | Rewrote from boilerplate to project documentation |
| `app/page.tsx` | Updated "Powered by" text |
| `app/api/humanize/route.ts` | Renamed variable for clarity |
| `CHANGELOG.md` | **New** — This file |

## Files Removed

| File | Reason |
|------|--------|
| `AGENTS.md` | opencode config, not needed for system |
| `CLAUDE.md` | opencode config, not needed for system |
| `ai-text-humanizer-system-plan.md` | Documentation — information consolidated into CHANGELOG.md |

---

## Deployment Notes

For Vercel deployment:
1. Set `GOOGLE_AI_API_KEY` in Project Settings → Environment Variables
2. Framework: Next.js (auto-detected)
3. No additional npm packages needed
4. Edge Runtime enabled (zero cold start)
