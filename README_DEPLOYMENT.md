# Ayush SkillBridge — Deployment Notes

## Vercel
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Serverless AI endpoint: `/api/ai`

## Required environment variables
```text
OPENAI_API_KEY=your_actual_key
OPENAI_MODEL=gpt-5
```

Never commit the API key.

## Local
```bash
npm install
npm run dev
```

To test the Vercel serverless function locally:
```bash
npx vercel dev
```

## Production
Import this GitHub repository into Vercel, configure the environment variables, and deploy.
