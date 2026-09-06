# Ayush SkillBridge Portal

**SIH26044 — Ministry of Ayush — Software / Smart Automation**

Ayush SkillBridge is a judge-friendly prototype of a tripartite digital ecosystem connecting **AYUSH Students, Educational Institutions, and Industry**.

# What this prototype demonstrates

1. **Smart Internship Tracker**
   - Geo-fenced attendance concept
   - Device-bound verification concept
   - Digital clinical / industrial logbook
   - Supervisor approval workflow
   - Verified internship hours

2. **Skill Passport**
   - Verified practical exposure
   - Competency scores
   - Internship history
   - Skill evidence

3. **AI-Matchmaker Placement Engine**
   - Hybrid rules + AI/NLP-ready architecture
   - Explainable match scores
   - Uses job-relevant verified evidence
   - AI recommends; employer makes the final decision

4. **Institution Command Center**
   - Student registry
   - Attendance monitoring
   - Logbook approvals
   - Placement and skill-gap analytics

5. **Industry Workspace**
   - Vacancy management
   - Candidate search
   - Verified activity sign-off
   - AI-assisted matching

6. **Ministry View**
   - Pilot-network overview
   - Industry participation
   - Skill demand intelligence
   - National-style analytics using demo data

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## AI integration

SkillBridge AI is exposed through a Vercel serverless function at `/api/ai`. The browser never receives the OpenAI API key; the function reads `OPENAI_API_KEY` from the server environment and calls the OpenAI Responses API.

Required environment variables:

```text
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-5
```

Never commit the API key to GitHub.

## Vercel deployment

This project is configured for Vercel with a build command that invokes Vite through Node directly. This avoids executable-permission issues with `node_modules/.bin/vite` on the build worker.

Recommended Vercel settings:

- Framework Preset: **Vite**
- Build Command: **`npm run build`**
- Output Directory: **`dist`**
- Node.js: **20+**

In Vercel → Project → Settings → Environment Variables, add:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` = `gpt-5`

After changing environment variables, redeploy.

## Prototype boundary

This is a **demonstration prototype**, not a production government system. It uses demo data and simulated verification flows. Production can add a real backend, PostgreSQL, Flutter mobile, real GPS/device attestation, offline synchronization, RBAC, audit logging, encryption, and government-cloud deployment.

### Demo safety

Never enter real patient-identifying information into the prototype. Clinical examples use anonymized case references only.

## SIH demo story

**Student checks in → practical activity is logged → supervisor approves → verified hours update Skill Passport → AI matches the student to a relevant industry opening → recruiter reviews an explainable match.**

> We are not trying to build the entire national AYUSH ecosystem in the hackathon. We are proving the core digital pipeline that makes it possible: **Verified Internship → Verified Skills → AI-Assisted Matching → Employment.**

## AI safety

The assistant is for platform/career guidance, not medical diagnosis or treatment. Candidate recommendations use job-relevant verified evidence; a human makes the final hiring decision.
