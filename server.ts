import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize server-side Gemini client lazily
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API route for custom horoscope, panchang explanation, and ritual guides
  app.post("/api/gemini/query", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      
      // Attempt to initialize if not done yet
      if (!ai) {
        const key = process.env.GEMINI_API_KEY;
        if (key && key !== "MY_GEMINI_API_KEY") {
          ai = new GoogleGenAI({
            apiKey: key,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              }
            }
          });
        }
      }

      if (!ai) {
        return res.status(500).json({ 
          error: "Gemini API key is not configured yet. Please configure it in Settings > Secrets." 
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are an expert in Odia Vedic astrology (Panji), Panchang calculations, and Odisha's rich heritage and cultural rituals. Respond in Odia or a clean blend of Odia and English as appropriate. Keep explanations clear, authentic, and deeply grounded in Odisha culture.",
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API Error in Server:", err);
      res.status(500).json({ error: err?.message || "An error occurred while communicating with Gemini API." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Odia Panchang Server running on http://localhost:${PORT}`);
  });
}

startServer();
