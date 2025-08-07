import axios from 'axios';

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class DirectGeminiService {
  private apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCUU5SkCDqqiSIQbPBHhhrQaoPTTHJyOEA';
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  async analyzeAnswer(question: string, answer: string, role: string): Promise<string> {
    const prompt = `You're an interview coach.

Evaluate the following answer to an interview question and give:

1. A score out of 10 for each of the following categories:
   - Correctness (Did the answer reflect accurate and logical understanding?)
   - Relevance (Did it directly answer the question?)
   - Depth & Detail (Was the answer insightful and supported by examples?)
   - Communication (Was it clear, structured, and professional?)

2. Provide overall strengths based on the categories scored above.

3. Point out areas of improvement **only based on weaknesses**.

4. Give a key recommendation based on the overall rating.

5. Detect and include the **word count** and **character count** of the answer.

6. Adapt the tone of your feedback to the overall rating:
   - 1–3: Very weak
   - 4–6: Needs improvement
   - 7–8: Good but can improve
   - 9–10: Excellent, near interview-ready (400+ characters, detailed examples, professional)

CONTEXT:
Role: ${role}
Question: "${question}"

User's answer: 
"""
${answer}
"""

DYNAMIC SCORING GUIDELINES:
- 1-3: Very weak (less than 50 characters, no examples, unclear)
- 4-6: Needs improvement (50-200 characters, basic response, minimal detail)
- 7-8: Good but can improve (200-400 characters, good examples, well-structured)
- 9-10: Excellent, near interview-ready (400+ characters, detailed examples, professional)

PROVIDE DETAILED ANALYSIS IN THIS EXACT FORMAT:

---
**Overall Score: [X]/10**

**Detailed Scoring:**
✅ Correctness: [X]/10 - [Specific analysis of factual accuracy]
🎯 Relevance: [X]/10 - [Specific analysis of how well it addresses the question]
📚 Depth & Detail: [X]/10 - [Specific analysis of examples and thoroughness]
💬 Communication: [X]/10 - [Specific analysis of clarity and structure]

**Strengths:**
• [Specific strength 1 based on the actual answer]
• [Specific strength 2 based on the actual answer]
• [Specific strength 3 based on the actual answer]

**Areas for Improvement:**
• [Specific improvement 1 based on actual gaps in the answer]
• [Specific improvement 2 based on actual gaps in the answer]
• [Specific improvement 3 based on actual gaps in the answer]

**Key Recommendation:**
[One specific, actionable tip based on the biggest gap identified in this particular answer]

**Detailed Analysis:**
[2-3 sentences providing deeper insight into the answer quality, specific examples of what was good/bad, and how it could be improved]

(Word count: [X], Characters: [X])

---

IMPORTANT: 
- Base your analysis on the ACTUAL content of the answer provided
- Use DYNAMIC scoring based on answer length and quality
- Short answers (less than 50 characters) should get 1-3/10
- Medium answers (50-200 characters) should get 4-6/10
- Long, detailed answers (200+ characters) should get 7-10/10
- Provide RATING-BASED feedback appropriate to the score level`;

    try {
      console.log("Calling Gemini API with:", { question, answer, role });
      
      // Using axios imported at the top level
      const response = await axios.post(this.baseUrl, {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": this.apiKey
        }
      });

      console.log("Gemini API Response:", response.data);
      
      const analysis = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!analysis || analysis.includes("No response")) {
        throw new Error("No valid analysis received from AI");
      }
      
      return analysis;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      // Return a detailed fallback analysis based on the answer content
      return this.generateFallbackAnalysis(question, answer, role);
    }
  }

  // Guidelines for analysis:
  // - Be specific about what was said and what was missing
  // - Provide unique feedback that reflects the particular answer given
  // - Don't give generic feedback - analyze the specific response
  // - Consider the role requirements when evaluating technical depth
  // - Be honest and accurate in your assessment
  // - ALWAYS provide the detailed scoring format above
  // - Include word count and character count in the analysis
  
  async analyzeAnswerWithFetch(question: string, answer: string, role: string): Promise<string> {
    const prompt = `You're an interview coach.

Evaluate the following answer to an interview question and give:

1. A score out of 10 for each of the following categories:
   - Correctness (Did the answer reflect accurate and logical understanding?)
   - Relevance (Did it directly answer the question?)
   - Depth & Detail (Was the answer insightful and supported by examples?)
   - Communication (Was it clear, structured, and professional?)

2. Provide overall strengths based on the categories scored above.

3. Point out areas of improvement **only based on weaknesses**.

4. Give a key recommendation based on the overall rating.

5. Detect and include the **word count** and **character count** of the answer.

6. Adapt the tone of your feedback to the overall rating:
   - 1–3: Very weak
   - 4–6: Needs improvement
   - 7–8: Good but can improve
   - 9–10: Excellent, near interview-ready (400+ characters, detailed examples, professional)

CONTEXT:
Role: ${role}
Question: "${question}"

User's answer: 
"""
${answer}
"""

DYNAMIC SCORING GUIDELINES:
- 1-3: Very weak (less than 50 characters, no examples, unclear)
- 4-6: Needs improvement (50-200 characters, basic response, minimal detail)
- 7-8: Good but can improve (200-400 characters, good examples, well-structured)
- 9-10: Excellent (400+ characters, detailed examples, professional)`;

    try {
      console.log("Calling Gemini API with:", { question, answer, role });
      
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": this.apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Gemini API Response:", data);
      
      const analysis = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!analysis || analysis.includes("No response")) {
        throw new Error("No valid analysis received from AI");
      }
      
      return analysis;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      // Return a detailed fallback analysis based on the answer content
      return this.generateFallbackAnalysis(question, answer, role);
    }
  }

  private generateFallbackAnalysis(question: string, answer: string, role: string): string {
    const wordCount = answer.trim().split(' ').length;
    const charCount = answer.trim().length;
    const hasExamples = answer.toLowerCase().includes('example') || answer.toLowerCase().includes('experience') || answer.toLowerCase().includes('project') || answer.toLowerCase().includes('worked') || answer.toLowerCase().includes('team');
    const isStructured = answer.includes('.') && answer.length > 100;
    const isRelevant = answer.toLowerCase().includes(question.toLowerCase().split(' ')[0]) || answer.length > 50;
    const hasTechnicalTerms = answer.toLowerCase().includes('react') || answer.toLowerCase().includes('javascript') || answer.toLowerCase().includes('api') || answer.toLowerCase().includes('database') || answer.toLowerCase().includes('algorithm');
    
    // Dynamic scoring based on length and quality
    let overallScore = 1; // Start with minimum score
    
    // Length-based scoring
    if (charCount < 10) overallScore = 1;
    else if (charCount < 20) overallScore = 2;
    else if (charCount < 50) overallScore = 3;
    else if (charCount < 100) overallScore = 4;
    else if (charCount < 200) overallScore = 5;
    else if (charCount < 300) overallScore = 6;
    else if (charCount < 400) overallScore = 7;
    else if (charCount < 500) overallScore = 8;
    else if (charCount < 600) overallScore = 9;
    else overallScore = 10;
    
    // Quality adjustments
    if (hasExamples) overallScore = Math.min(overallScore + 2, 10);
    if (isStructured) overallScore = Math.min(overallScore + 1, 10);
    if (hasTechnicalTerms) overallScore = Math.min(overallScore + 1, 10);
    if (wordCount > 50) overallScore = Math.min(overallScore + 1, 10);
    if (wordCount > 100) overallScore = Math.min(overallScore + 1, 10);
    
    // Penalties for poor quality
    if (charCount < 20 && !isRelevant) overallScore = Math.max(overallScore - 2, 1);
    if (charCount < 50 && !hasExamples) overallScore = Math.max(overallScore - 1, 1);
    
    // Ensure score is between 1-10
    overallScore = Math.min(overallScore, 10);
    overallScore = Math.max(overallScore, 1);

    // Individual criterion scores based on overall score
    const correctness = Math.max(overallScore - (hasExamples ? 0 : 1), 1);
    const relevance = Math.max(overallScore - (isRelevant ? 0 : 1), 1);
    const depth = Math.max(overallScore - (wordCount > 50 ? 0 : 2), 1);
    const communication = Math.max(overallScore - (isStructured ? 0 : 1), 1);

    // Dynamic feedback based on score
    let strength1, strength2, strength3;
    let improvement1, improvement2, improvement3;
    let recommendation, detailedAnalysis;

    if (overallScore >= 9) {
      strength1 = "Exceptional detail and thoroughness";
      strength2 = "Outstanding use of specific examples and metrics";
      strength3 = "Professional, well-structured communication";
      improvement1 = "Consider adding industry-specific context";
      improvement2 = "Include more technical depth if applicable";
      improvement3 = "Add quantifiable business impact";
      recommendation = "Excellent answer! This is interview-ready. Consider minor enhancements.";
      detailedAnalysis = "This is an outstanding answer that demonstrates expert-level communication and relevant experience. The response is comprehensive and well-structured.";
    } else if (overallScore >= 8) {
      strength1 = "Excellent detail and thoroughness";
      strength2 = "Strong use of specific examples";
      strength3 = "Well-structured and professional communication";
      improvement1 = "Consider adding quantifiable results";
      improvement2 = "Include more technical depth";
      improvement3 = "Add industry-specific context";
              recommendation = "Excellent answer! Consider adding specific metrics and industry context to make it perfect.";
      detailedAnalysis = "This is a high-quality answer that demonstrates strong communication skills and relevant experience. The response is well-structured and includes good examples.";
    } else if (overallScore >= 7) {
      strength1 = "Good communication and clarity";
      strength2 = "Relevant to the question asked";
      strength3 = "Adequate detail provided";
      improvement1 = "Add more specific examples and experiences";
      improvement2 = "Use the STAR method for better structure";
      improvement3 = "Include quantifiable results and metrics";
      recommendation = "Good answer! Add specific examples using the STAR method (Situation, Task, Action, Result) to make it excellent.";
      detailedAnalysis = "This is a solid answer that addresses the question well. It could be enhanced with more specific examples and structured using the STAR method.";
    } else if (overallScore >= 6) {
      strength1 = "Addresses the question adequately";
      strength2 = "Clear communication";
      strength3 = "Basic understanding shown";
      improvement1 = "Provide much more detail and specific examples";
      improvement2 = "Use concrete experiences from your background";
      improvement3 = "Structure your response with clear points";
      recommendation = "Adequate answer. Expand significantly with specific examples.";
      detailedAnalysis = "This answer shows basic understanding but needs much more detail and specific examples to be effective.";
    } else if (overallScore >= 4) {
      strength1 = "Addresses the question directly";
      strength2 = "Clear communication";
      strength3 = "Basic understanding shown";
      improvement1 = "Provide much more detail and specific examples";
      improvement2 = "Use concrete experiences from your background";
      improvement3 = "Structure your response with clear points";
      recommendation = "Needs significant improvement. Expand your answer with specific examples and experiences from your background.";
      detailedAnalysis = "This answer shows basic understanding but needs much more detail and specific examples to be effective.";
    } else if (overallScore >= 2) {
      strength1 = "Brief response";
      strength2 = "Direct answer";
      strength3 = "Clear intent";
      improvement1 = "Provide much more detail and explanation";
      improvement2 = "Include specific examples and experiences";
      improvement3 = "Use the STAR method for comprehensive responses";
      recommendation = "This answer is too brief. Provide detailed responses with specific examples and experiences.";
      detailedAnalysis = "This answer is very brief and lacks the detail needed for an effective interview response. Consider expanding significantly.";
    } else {
      strength1 = "Minimal response";
      strength2 = "Basic attempt";
      strength3 = "Shows effort";
      improvement1 = "Provide comprehensive detail and explanation";
      improvement2 = "Include specific examples and experiences";
      improvement3 = "Use the STAR method for comprehensive responses";
      recommendation = "This answer needs major improvement. Provide detailed responses with specific examples and experiences.";
      detailedAnalysis = "This answer is extremely brief and lacks the detail needed for an effective interview response. Consider expanding significantly.";
    }

    return `---
**Overall Score: ${overallScore}/10**

**Detailed Scoring:**
✅ Correctness: ${correctness}/10 - ${hasExamples ? 'Includes relevant examples and experience' : 'Lacks specific examples and concrete details'}
🎯 Relevance: ${relevance}/10 - ${isRelevant ? 'Directly addresses the question asked' : 'Could be more focused on the specific question'}
📚 Depth & Detail: ${depth}/10 - ${wordCount > 100 ? 'Provides good detail and thoroughness' : 'Needs much more detail and specific examples'}
💬 Communication: ${communication}/10 - ${isStructured ? 'Well-structured and clear' : 'Could be better organized and more concise'}

**Strengths:**
• ${strength1}
• ${strength2}
• ${strength3}

**Areas for Improvement:**
• ${improvement1}
• ${improvement2}
• ${improvement3}

**Key Recommendation:**
${recommendation}

**Detailed Analysis:**
${detailedAnalysis} Your answer has ${charCount} characters and ${wordCount} words. ${charCount < 50 ? 'This is too brief for an effective interview response.' : charCount < 200 ? 'This provides adequate length but could include more specific examples.' : 'This provides good length and detail for an interview response.'} ${hasExamples ? 'Good use of examples and experience.' : 'Consider adding more concrete examples from your experience.'}

(Word count: ${wordCount}, Characters: ${charCount})

---`;
  }
}

export const directGeminiService = new DirectGeminiService();