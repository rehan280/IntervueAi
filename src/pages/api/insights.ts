import type { NextApiRequest, NextApiResponse } from 'next';
import { geminiService } from '../../services/geminiService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { industry, subIndustry } = req.body;
  if (!industry || !subIndustry) {
    return res.status(400).json({ error: 'Missing industry or subIndustry' });
  }

  try {
    const prompt = `Provide a detailed, up-to-date industry insight report for the following:
Industry: ${industry}
Sub-Industry: ${subIndustry}

Include:
- Current trends
- Key challenges
- Opportunities
- Emerging technologies
- Salary and job market outlook
- Any relevant statistics or data

Be concise, actionable, and use bullet points where helpful.`;

    const result = await geminiService.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.status(200).json({ insight: text });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate insight' });
  }
}
