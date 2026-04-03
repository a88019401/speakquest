# SpeakQuest: AI-Powered Multimodal English Speaking Feedback

## Project Overview
SpeakQuest is an educational technology prototype designed to revolutionize English speaking practice for junior high school students. By leveraging multimodal AI, the system provides real-time, comprehensive feedback on speech, grammar, and pronunciation, while dynamically generating personalized learning tasks.

## Problem Statement
Traditional English language learning often lacks immediate, personalized feedback for speaking. Students frequently struggle with:
- Fear of making mistakes in front of peers.
- Lack of access to native-level pronunciation guidance.
- Difficulty connecting abstract grammar rules to spoken communication.
- Static curriculum that doesn't adapt to individual progress.

## Proposed Solution
SpeakQuest utilizes a multimodal approach (Text, Audio, and Visual) to create a safe, engaging, and highly adaptive environment. It doesn't just correct; it explains, visualizes, and challenges the learner with context-aware practice missions.

## Core Features
- **Real-time Speech-to-Text Analysis:** Instant transcription of student speech.
- **Intelligent Grammar Correction:** Contextual analysis of errors with clear explanations.
- **Pronunciation Guidance:** Targeted feedback on specific phonemes and words.
- **Multimodal Scaffolding:** Visual hints and image-based comprehension aids.
- **Dynamic Task Generation:** AI-driven "Missions" based on the student's specific performance.
- **Business Strategy Integration:** A built-in Business Model Canvas for academic and entrepreneurial evaluation.

## Technology Stack
- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS (Modern utility-first approach)
- **Animations:** Motion (for smooth, professional transitions)
- **Icons:** Lucide React
- **AI Integration (Conceptual):** Designed for OpenAI API multimodal LLM integration.

## Demo Scenario
1. **Input:** Student says, *"I goed to school yesterday."*
2. **Analysis:** System identifies the irregular verb error ("goed" -> "went").
3. **Feedback:** Corrects the sentence, explains the rule, and provides pronunciation tips for "yesterday".
4. **Visual Aid:** Displays a school-related image to reinforce context.
5. **Missions:** Generates three follow-up tasks: Sentence Correction, Shadowing, and Creative Picture-based sentence construction.

## Business Value
SpeakQuest targets the growing EdTech market by offering a scalable, low-cost alternative to private tutoring. Its value proposition lies in its 24/7 availability, personalized learning paths, and data-driven progress tracking for both students and teachers.

## Course Relevance
- **Multimodal AI:** Demonstrates the integration of audio (speech), text (analysis), and vision (hints) to enhance learning.
- **LLM Applications:** Showcases how Large Language Models can be used for sophisticated grammar correction and creative task generation.
- **Generative AI:** Uses generative models to create unique, personalized practice missions on the fly.
- **Educational Technology:** Applies AI to solve core pedagogical challenges in language acquisition.
- **Human-AI Interaction:** Focuses on a supportive, non-judgmental interface that encourages student engagement.

## Future Work
- Integration with real-time speech-to-text APIs.
- Personalized voice synthesis for shadowing practice.
- Gamification elements (badges, levels, streaks).
- Teacher dashboard for classroom-wide progress monitoring.

## OpenAI Setup
1. Copy `.env.example` to `.env`.
2. Fill `OPENAI_API_KEY` with your OpenAI key.
3. Start the app with `npm run dev` and use the Speaking Lab to send a sentence for live feedback generation.
