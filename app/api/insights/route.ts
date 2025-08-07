import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { industry, subIndustry } = await req.json();
  if (!industry) {
    return NextResponse.json({ error: 'Industry is required' }, { status: 400 });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'Gemini API key not set in environment' }, { status: 500 });
  }

  try {
    const prompt = `Give me a detailed, up-to-date, and actionable industry insight for the following industry: ${industry}${subIndustry ? `, specifically in the sub-industry: ${subIndustry}` : ''}.`;

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );

    const data = await response.json();
    const insight = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No insight generated.';
    return NextResponse.json({ insight });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch insight from Gemini API', detail: error.message }, { status: 500 });
  }
}

