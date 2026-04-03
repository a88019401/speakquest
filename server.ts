import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API Routes
app.post('/api/analyze', async (req, res) => {
  const { sentence } = req.body;

  if (!sentence) {
    return res.status(400).json({ error: 'Sentence is required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ 
      error: 'OPENAI_API_KEY is not configured on the server. Please add it to your .env file.' 
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an English speaking coach for junior high school students. 
          Analyze the provided sentence and return a JSON object with the following structure:
          {
            "transcript": "the original sentence",
            "corrected": "the corrected version of the sentence",
            "explanation": "a simple, supportive explanation of any grammar issues, suitable for a 13-15 year old",
            "pronunciation": ["focus word 1 with IPA", "focus word 2 with IPA"],
            "tasks": [
              { "title": "Task 1 Name", "description": "Short description of practice task" },
              { "title": "Task 2 Name", "description": "Short description of practice task" },
              { "title": "Task 3 Name", "description": "Short description of practice task" }
            ],
            "imageKeyword": "a single noun representing the context of the sentence for an image search"
          }
          If the sentence is already correct, keep the corrected version the same and provide encouraging feedback in the explanation.
          Always return exactly 3 tasks.`
        },
        {
          role: "user",
          content: sentence
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    // Add a placeholder image URL based on the keyword
    const imageKeyword = result.imageKeyword || 'learning';
    result.imageUrl = `https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop&sig=${encodeURIComponent(imageKeyword)}`;
    
    res.json(result);
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze sentence' });
  }
});

// Vite Middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SpeakQuest Server running at http://localhost:${PORT}`);
  });
}

setupVite();
