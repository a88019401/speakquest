/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Image as ImageIcon, 
  BookOpen, 
  Target, 
  Award, 
  ChevronRight, 
  Play, 
  Info,
  Layout,
  Users,
  Zap,
  Globe,
  TrendingUp,
  Briefcase,
  DollarSign,
  Layers,
  Handshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'landing' | 'practice' | 'canvas';

interface FeedbackData {
  transcript: string;
  corrected: string;
  explanation: string;
  pronunciation: string[];
  imageUrl: string;
  tasks: {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

interface OpenAIResponsePayload {
  transcript: string;
  corrected: string;
  explanation: string;
  pronunciation: string[];
  tasks: {
    title: string;
    description: string;
  }[];
}

// --- Mock Data ---
const MOCK_FEEDBACK: FeedbackData = {
  transcript: "I goed to school yesterday.",
  corrected: "I went to school yesterday.",
  explanation: "The verb 'go' is irregular. Its past tense is 'went', not 'goed'.",
  pronunciation: ["yesterday (/ˈjestədeɪ/)", "school (/skuːl/)"],
  imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
  tasks: [
    {
      id: 1,
      title: "Sentence Correction",
      description: "Rewrite three sentences using the irregular past tense of 'go', 'eat', and 'see'.",
      icon: <CheckCircle2 className="w-5 h-5 text-blue-500" />
    },
    {
      id: 2,
      title: "Shadowing Practice",
      description: "Listen to the correct pronunciation and repeat 'I went to school yesterday' five times.",
      icon: <Mic className="w-5 h-5 text-purple-500" />
    },
    {
      id: 3,
      title: "Picture Description",
      description: "Look at the school image and describe what you did there using the past tense.",
      icon: <ImageIcon className="w-5 h-5 text-green-500" />
    }
  ]
};

const TASK_ICONS = [
  <CheckCircle2 className="w-5 h-5 text-blue-500" />,
  <Mic className="w-5 h-5 text-purple-500" />,
  <ImageIcon className="w-5 h-5 text-green-500" />
];

const toFeedbackData = (payload: OpenAIResponsePayload, fallbackInput: string): FeedbackData => {
  return {
    transcript: payload.transcript?.trim() || fallbackInput,
    corrected: payload.corrected?.trim() || fallbackInput,
    explanation: payload.explanation?.trim() || 'Great try! Keep practicing sentence patterns and verb forms.',
    pronunciation: payload.pronunciation?.length ? payload.pronunciation : MOCK_FEEDBACK.pronunciation,
    imageUrl: MOCK_FEEDBACK.imageUrl,
    tasks: (payload.tasks?.length ? payload.tasks : MOCK_FEEDBACK.tasks).slice(0, 3).map((task, index) => ({
      id: index + 1,
      title: task.title,
      description: task.description,
      icon: TASK_ICONS[index] || <Target className="w-5 h-5 text-indigo-500" />
    }))
  };
};

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => setPage('landing')}
      >
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <Mic className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          SpeakQuest
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <button 
          onClick={() => setPage('landing')}
          className={`text-sm font-medium transition-colors ${currentPage === 'landing' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
        >
          Home
        </button>
        <button 
          onClick={() => setPage('practice')}
          className={`text-sm font-medium transition-colors ${currentPage === 'practice' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
        >
          Demo
        </button>
        <button 
          onClick={() => setPage('canvas')}
          className={`text-sm font-medium transition-colors ${currentPage === 'canvas' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
        >
          Business Model
        </button>
      </div>
      <button 
        onClick={() => setPage('practice')}
        className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Try Demo
      </button>
    </div>
  </nav>
);

const LandingPage = ({ onStart }: { onStart: () => void }) => (
  <div className="pt-24 pb-16">
    {/* Hero Section */}
    <section className="max-w-7xl mx-auto px-4 text-center mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
          AI-Powered English Learning
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Master English Speaking <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
            With Multimodal AI
          </span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          The next-generation speaking companion for junior high students. 
          Real-time feedback, visual scaffolding, and personalized missions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
          >
            Start Your Quest <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            Watch Video <Play className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </section>

    {/* How It Works */}
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-600">A seamless loop of speaking, learning, and growing.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Mic className="w-8 h-8 text-indigo-600" />,
              title: "Speak Naturally",
              desc: "Talk to the AI about daily topics or specific prompts. Our multimodal engine captures every nuance."
            },
            {
              icon: <Zap className="w-8 h-8 text-amber-500" />,
              title: "Instant Analysis",
              desc: "Get immediate feedback on grammar, pronunciation, and fluency powered by advanced LLMs."
            },
            {
              icon: <Target className="w-8 h-8 text-rose-500" />,
              title: "Personalized Missions",
              desc: "AI generates follow-up tasks specifically designed to fix your unique speaking weaknesses."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Why It Matters */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">
              Bridging the Gap in <br />
              Language Acquisition
            </h2>
            <div className="space-y-6">
              {[
                { title: "Safe Environment", desc: "Students can practice without fear of judgment, building confidence privately." },
                { title: "Multimodal Scaffolding", desc: "Visual and textual hints help students connect sounds to meaning faster." },
                { title: "Scalable Tutoring", desc: "Provides high-quality speaking feedback that was previously only available via expensive 1-on-1 tutors." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="aspect-square bg-gradient-to-br from-indigo-100 to-violet-100 rounded-[4rem] flex items-center justify-center p-12">
              <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-sm transform rotate-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="font-bold text-slate-800">Mission Accomplished!</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-indigo-600"
                  />
                </div>
                <p className="text-sm text-slate-500">You've mastered the past tense of irregular verbs. Keep it up!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const PracticePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState(MOCK_FEEDBACK.transcript);
  const [errorMessage, setErrorMessage] = useState('');
  const [feedback, setFeedback] = useState<FeedbackData>(MOCK_FEEDBACK);

  const handleStartRecording = async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) {
      setErrorMessage('Please enter a sentence first so OpenAI can analyze it.');
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      setErrorMessage('OPENAI_API_KEY is missing. Add it to your environment before using the analysis feature.');
      return;
    }

    setErrorMessage('');
    setShowFeedback(false);
    setIsRecording(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsRecording(false);
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          input: [
            {
              role: 'system',
              content: `You are an English speaking coach for teenagers.
Return only structured JSON for the analysis result.
Focus on grammar correction, short explanation, pronunciation focus words, and three practice missions.`
            },
            {
              role: 'user',
              content: `Analyze this learner sentence: "${trimmedInput}"`
            }
          ],
          text: {
            format: {
              type: 'json_schema',
              name: 'speakquest_feedback',
              strict: true,
              schema: {
                type: 'object',
                properties: {
                  transcript: { type: 'string' },
                  corrected: { type: 'string' },
                  explanation: { type: 'string' },
                  pronunciation: {
                    type: 'array',
                    items: { type: 'string' },
                    minItems: 2,
                    maxItems: 4
                  },
                  tasks: {
                    type: 'array',
                    minItems: 3,
                    maxItems: 3,
                    items: {
                      type: 'object',
                      properties: {
                        title: { type: 'string' },
                        description: { type: 'string' }
                      },
                      required: ['title', 'description'],
                      additionalProperties: false
                    },
                  }
                },
                required: ['transcript', 'corrected', 'explanation', 'pronunciation', 'tasks'],
                additionalProperties: false
              }
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const outputText = typeof data.output_text === 'string' ? data.output_text.trim() : '';
      if (!outputText) {
        throw new Error('OpenAI returned an empty response.');
      }

      const payload = JSON.parse(outputText) as OpenAIResponsePayload;
      setFeedback(toFeedbackData(payload, trimmedInput));
      setShowFeedback(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(`OpenAI request failed: ${message}`);
      setFeedback(MOCK_FEEDBACK);
      setShowFeedback(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 max-w-5xl mx-auto px-4">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Speaking Lab</h1>
        <p className="text-slate-600">Try the demo: Say "I goed to school yesterday."</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Interaction Panel */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 h-full flex flex-col items-center justify-center text-center">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 transition-all duration-500 ${isRecording ? 'bg-rose-50 scale-110' : 'bg-indigo-50'}`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${isRecording ? 'bg-rose-500 shadow-lg shadow-rose-200' : 'bg-indigo-600 shadow-lg shadow-indigo-200'}`}>
                <Mic className={`w-10 h-10 text-white ${isRecording ? 'animate-pulse' : ''}`} />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {isRecording ? 'Listening...' : showFeedback ? 'Ready for next trial' : 'Tap to Speak'}
            </h3>
            <p className="text-slate-500 mb-8 max-w-xs">
              {isRecording ? 'Speak clearly into your microphone.' : 'Practice your sentence and get instant AI feedback.'}
            </p>

            <div className="w-full mb-6 text-left">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                Practice Sentence
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={3}
                className="w-full border border-slate-200 rounded-2xl p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Type what the student said..."
              />
            </div>

            {!isRecording && !loading && (
              <button 
                onClick={handleStartRecording}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
              >
                {showFeedback ? 'Analyze Again' : 'Analyze with OpenAI'}
              </button>
            )}

            {loading && (
              <div className="flex items-center gap-3 text-indigo-600 font-bold">
                <RefreshCw className="w-6 h-6 animate-spin" />
                Analyzing Speech...
              </div>
            )}

            {errorMessage && (
              <p className="mt-4 text-sm text-rose-500 font-medium">{errorMessage}</p>
            )}
          </div>
        </div>

        {/* Feedback Panel */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!showFeedback ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] h-full flex flex-col items-center justify-center p-12 text-slate-400"
              >
                <Info className="w-12 h-12 mb-4" />
                <p className="text-center font-medium">Your AI feedback will appear here after you speak.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Transcript & Correction */}
                <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Analysis</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-1"><AlertCircle className="w-5 h-5 text-rose-500" /></div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">You said:</p>
                        <p className="text-lg font-medium text-slate-800 line-through decoration-rose-300">"{feedback.transcript}"</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">AI Corrected:</p>
                        <p className="text-lg font-bold text-indigo-600">"{feedback.corrected}"</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <p className="text-sm text-indigo-900 leading-relaxed">
                      <span className="font-bold">Grammar Tip:</span> {feedback.explanation}
                    </p>
                  </div>
                </div>

                {/* Pronunciation & Visual */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Mic className="w-4 h-4 text-indigo-600" /> Pronunciation
                    </h4>
                    <ul className="space-y-3">
                      {feedback.pronunciation.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                          <Play className="w-3 h-3 text-indigo-400" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 overflow-hidden">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-indigo-600" /> Visual Context
                    </h4>
                    <img 
                      src={feedback.imageUrl} 
                      alt="Context" 
                      className="w-full h-24 object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Missions */}
                <div className="bg-indigo-900 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold flex items-center gap-2">
                      <Target className="w-6 h-6 text-indigo-300" /> Practice Missions
                    </h4>
                    <span className="text-xs font-bold bg-indigo-800 px-3 py-1 rounded-full text-indigo-200">3 NEW TASKS</span>
                  </div>
                  <div className="space-y-4">
                    {feedback.tasks.map((task) => (
                      <motion.div 
                        key={task.id}
                        whileHover={{ x: 5 }}
                        className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-start gap-4 cursor-pointer hover:bg-white/20 transition-all"
                      >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                          {task.icon}
                        </div>
                        <div>
                          <h5 className="font-bold mb-1">{task.title}</h5>
                          <p className="text-sm text-indigo-100/80">{task.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const BusinessModelCanvas = () => (
  <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
    <div className="mb-12 text-center">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Strategy</h1>
      <p className="text-slate-600 italic">SpeakQuest: Academic-Business Framework</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Key Partners */}
      <div className="md:row-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-indigo-600 mb-4 flex items-center gap-2"><Handshake className="w-5 h-5" /> Key Partners</h3>
        <ul className="text-sm text-slate-600 space-y-3">
          <li>• Educational Publishers (Content)</li>
          <li>• Junior High Schools (B2B)</li>
          <li>• AI Research Labs (Gemini/LLM)</li>
          <li>• Cloud Infrastructure Providers</li>
        </ul>
      </div>

      {/* Key Activities */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-indigo-600 mb-4 flex items-center gap-2"><Zap className="w-5 h-5" /> Key Activities</h3>
        <ul className="text-sm text-slate-600 space-y-3">
          <li>• AI Model Fine-tuning</li>
          <li>• UX Design for Kids</li>
          <li>• Content Generation</li>
        </ul>
      </div>

      {/* Value Propositions */}
      <div className="md:row-span-2 bg-indigo-50 p-6 rounded-3xl shadow-md border border-indigo-100">
        <h3 className="font-bold text-indigo-700 mb-4 flex items-center gap-2"><Award className="w-5 h-5" /> Value Propositions</h3>
        <ul className="text-sm text-indigo-900 space-y-3">
          <li>• <span className="font-bold">Personalized:</span> 1-on-1 feedback at scale.</li>
          <li>• <span className="font-bold">Safe:</span> Judgment-free speaking practice.</li>
          <li>• <span className="font-bold">Multimodal:</span> Visual/Audio/Text integration.</li>
          <li>• <span className="font-bold">Adaptive:</span> Dynamic mission generation.</li>
        </ul>
      </div>

      {/* Customer Relationships */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-indigo-600 mb-4 flex items-center gap-2"><Users className="w-5 h-5" /> Relationships</h3>
        <ul className="text-sm text-slate-600 space-y-3">
          <li>• Automated Personalized Support</li>
          <li>• Student Communities</li>
          <li>• Teacher Dashboards</li>
        </ul>
      </div>

      {/* Customer Segments */}
      <div className="md:row-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-indigo-600 mb-4 flex items-center gap-2"><Globe className="w-5 h-5" /> Customer Segments</h3>
        <ul className="text-sm text-slate-600 space-y-3">
          <li>• Junior High Students (ESL/EFL)</li>
          <li>• Public/Private Schools</li>
          <li>• Parents seeking EdTech solutions</li>
          <li>• Self-directed adult beginners</li>
        </ul>
      </div>

      {/* Key Resources */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-indigo-600 mb-4 flex items-center gap-2"><Layers className="w-5 h-5" /> Key Resources</h3>
        <ul className="text-sm text-slate-600 space-y-3">
          <li>• Proprietary Feedback Algorithms</li>
          <li>• Educational Content Database</li>
          <li>• Skilled Engineering Team</li>
        </ul>
      </div>

      {/* Channels */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-indigo-600 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Channels</h3>
        <ul className="text-sm text-slate-600 space-y-3">
          <li>• Web/Mobile App Stores</li>
          <li>• School District Sales</li>
          <li>• Social Media (Education focus)</li>
        </ul>
      </div>

      {/* Cost Structure */}
      <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-indigo-600 mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5" /> Cost Structure</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
          <div>• AI API Usage Costs</div>
          <div>• R&D / Engineering</div>
          <div>• Marketing & Sales</div>
          <div>• Server Maintenance</div>
        </div>
      </div>

      {/* Revenue Streams */}
      <div className="md:col-span-3 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-indigo-600 mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5" /> Revenue Streams</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
          <div>• Freemium Subscription (B2C)</div>
          <div>• Institutional Licensing (B2B)</div>
          <div>• Premium Content Packs</div>
          <div>• API Licensing for Publishers</div>
        </div>
      </div>
    </div>

    {/* Course Relevance Section */}
    <div className="mt-16 bg-slate-900 rounded-[3rem] p-12 text-white">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold mb-8">Course Relevance</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {[
            { title: "Multimodal AI", desc: "Integrates speech (audio), text (analysis), and vision (scaffolding) for holistic learning." },
            { title: "LLM Applications", desc: "Utilizes Large Language Models for sophisticated grammar parsing and contextual feedback." },
            { title: "Generative AI", desc: "Dynamically creates unique practice missions based on individual student performance." },
            { title: "Human-AI Interaction", desc: "Focuses on a supportive, non-judgmental interface to lower the 'Affective Filter' in L2 acquisition." }
          ].map((item, i) => (
            <div key={i}>
              <h4 className="text-indigo-400 font-bold mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('landing');

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main>
        <AnimatePresence mode="wait">
          {page === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LandingPage onStart={() => setPage('practice')} />
            </motion.div>
          )}
          
          {page === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PracticePage />
            </motion.div>
          )}

          {page === 'canvas' && (
            <motion.div
              key="canvas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BusinessModelCanvas />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Mic className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">SpeakQuest</span>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-sm">© 2026 SpeakQuest AI. Academic Midterm Prototype.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
