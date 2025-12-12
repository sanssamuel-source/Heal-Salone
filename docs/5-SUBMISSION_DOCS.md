# HEAL Salone - Submission Documents

## 1. Executive Summary

HEAL Salone is a scalable, AI-integrated web platform designed to streamline health emergency reporting in Sierra Leone. By leveraging the high penetration of mobile data among youth, it creates a decentralized surveillance network for health risks, feeding into a centralized government dashboard for rapid response.

## 2. Feasibility Statement

The MVP is fully functional, built on industry-standard technologies (React, Node.js, PostgreSQL). It runs on low-cost cloud infrastructure (Railway/Vercel) costing <$5/month for the prototype phase. Scaling to national level is technically feasible via horizontal scaling of the node clusters and database sharding.

## 3. Community Benefit

- **Empowerment:** Gives citizens a voice in their health infrastructure.
- **Safety:** Rapid alerts on water/sanitation issues protect neighborhoods.
- **Access:** AI assistant provides low-cost initial medical guidance to underserved rural areas.

## 4. Ethics & Safety Analysis

- **Data Privacy:** All medical reports are anonymized at the database level. Direct Patient Identifiers (PII) are encrypted.
- **AI Safety:** The AI model is strictly prompted to provide _guidance_ and specifically disclaimer that it includes "Not Application Medical Advice" (NAMA). It directs urgent cases to physical professionals.
- **Moderation:** Admin tools exist to flag and remove malicious or false reports.

## 5. AI Usage Declaration

This project utilizes Large Language Models (LLM) via the OpenAI API for the "Assistant" feature. The AI is used for:

1.  Natural Language Processing of symptom descriptions.
2.  Providing general health guidelines based on WHO/MoHS protocols.
3.  Translation aid (planned).
    It does **not** make autonomous medical diagnoses.

## 6. Budget (Prototype Phase)

- **Hosting (Railway/Vercel):** $10/mo
- **Domain Name:** $12/year
- **OpenAI API Credits:** $20/mo
- **Marketing/SMS Tests:** $50
- **Total Ask:** $100 Seed Grant

## 7. Risks & Mitigation

- **Risk:** Spam reporting. **Mitigation:** Account verification and rate limiting (implemented).
- **Risk:** AI hallucinations. **Mitigation:** Strict system prompts and hard-coded disclaimers for sensitive keywords (e.g., "suicide", "emergency").
