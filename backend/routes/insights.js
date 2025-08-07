const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/insights
router.post('/', async (req, res) => {
  const { industry } = req.body;
  if (!industry) {
    return res.status(400).json({ error: 'Industry is required' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key not set in environment' });
  }

  try {
    // Example prompt for Gemini
    const prompt = `Give me a detailed, up-to-date industry insight for the following industry: ${industry}.`;

    // Gemini API endpoint (replace with your actual endpoint if different)
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          key: GEMINI_API_KEY
        }
      }
    );

    // Extract the generated text
    const insight = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No insight generated.';
    res.json({ insight });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch insight from Gemini API', detail: error.response?.data || error.message });
  }
});

module.exports = router;
