# SpeakQuest: AI-Powered English Speaking Feedback System

SpeakQuest is a full-stack educational web application designed to help junior high school students improve their English speaking skills through real-time AI feedback and personalized practice missions.

## 🚀 Features

- **Real-Time Analysis**: Powered by OpenAI GPT-4o to provide grammar corrections, detailed explanations, and pronunciation tips.
- **Visual Scaffolding**: Contextual images generated based on the student's input to aid comprehension.
- **Adaptive Missions**: AI-generated follow-up tasks tailored to the student's specific mistakes.
- **Modern UI/UX**: A clean, presentation-ready interface built with React, Tailwind CSS, and Motion.
- **Business Strategy**: Includes a built-in Business Model Canvas and Course Relevance analysis for academic presentations.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide-React, Motion.
- **Backend**: Node.js, Express.js, OpenAI Node SDK.
- **Development**: tsx (for running TypeScript server).

## 📋 Prerequisites

- Node.js (v18 or higher)
- An OpenAI API Key

## ⚙️ Setup Instructions

1. **Clone the repository** (or download the source).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your OpenAI API key:
     ```env
     OPENAI_API_KEY=your_actual_api_key_here
     ```
4. **Run the application**:
   ```bash
   npm run dev
   ```
   - This command will start both the Express backend and the Vite frontend.
   - Open your browser to `http://localhost:3000`.

## 🎓 Academic Context

This project was developed as a midterm presentation for a graduate-level course. It explores the following themes:
- **Multimodal AI**: Combining text, speech (conceptual), and vision for enhanced L2 acquisition.
- **LLM Applications**: Practical implementation of Large Language Models in educational technology.
- **Generative AI**: Using AI to create dynamic, personalized educational content.
- **Human-AI Interaction**: Designing supportive interfaces that lower the "Affective Filter" in language learning.

## 📄 License

This project is for educational purposes.
