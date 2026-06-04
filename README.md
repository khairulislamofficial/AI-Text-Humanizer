# AI Text Humanizer

A web application that converts AI-generated text into natural, human-like writing that bypasses AI detection tools like ZeroGPT, Grammarly, and GPTZero.

## Features

- **Advanced Anti-Detection**: Sophisticated prompt engineering to achieve ~20% AI detection score
- **Google AI Studio Integration**: Uses Gemini 2.5 Flash model via Google AI Studio API
- **Vercel Optimized**: Edge Runtime for zero cold start, serverless deployment
- **Low Dependency**: Zero backend dependencies - only Next.js, React, and Tailwind CSS
- **Real-time Streaming**: Token-by-token response streaming for instant feedback
- **Multiple Humanization Levels**: Light, Medium, and Strong modes
- **Privacy Focused**: No data storage - all processing is ephemeral

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Setup

Create a `.env.local` file in the root directory with your Google AI Studio API key:

```env
GOOGLE_AI_API_KEY=your_google_ai_studio_api_key_here
```

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

## How It Works

1. Input AI-generated text into the textarea
2. Select humanization level (Light/Medium/Strong)
3. Click "Humanize" to send request to Google AI Studio API
4. Receive streaming response with humanized text
5. Copy or download the result

The "Strong" level uses advanced techniques to bypass AI detectors:
- Perplexity manipulation through strategic word variation
- Burstiness maximization with extreme sentence/paragraph length variation
- Controlled grammatical "imperfections" that mimic human writing
- Style inconsistency and personal voice injection
- Formatting variations and AI-pattern suppression

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

When deploying to Vercel, add your `GOOGLE_AI_API_KEY` to the Environment Variables in your project settings.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
