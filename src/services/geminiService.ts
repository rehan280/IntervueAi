import { GoogleGenerativeAI } from "@google/generative-ai";

// For development purposes - In production, use Supabase Edge Functions
const GEMINI_API_KEY = "AIzaSyBqEE3tx-mSDU3CvUy_ffTjb2TODb9u17I";

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateInterviewQuestions(role: string, difficulty: string = "intermediate"): Promise<string[]> {
    
    const sessionId = Date.now() + Math.random().toString(36).substr(2, 9);
    const randomSeed = Math.floor(Math.random() * 1000000);
    
    const prompt = `🎯 GENERATE 10 COMPREHENSIVE & DIVERSE INTERVIEW QUESTIONS 🎯

SESSION ID: ${sessionId}
RANDOM SEED: ${randomSeed}
ROLE: ${role}
DIFFICULTY: ${difficulty}
TIMESTAMP: ${new Date().toISOString()}

⚡ CRITICAL REQUIREMENTS:
- Generate 10 COMPLETELY DIFFERENT questions from any previous sessions
- RANDOMIZE question types, topics, and complexity levels
- NEVER repeat common or generic questions
- Make each question UNIQUE and FRESH
- Mix different interview styles and approaches

📋 QUESTION MIX (Randomize the distribution):
- Technical/Domain Questions: ${Math.floor(Math.random() * 3) + 2} questions
- Behavioral STAR Method: ${Math.floor(Math.random() * 3) + 2} questions  
- Situational Problem-Solving: ${Math.floor(Math.random() * 3) + 2} questions
- Industry-Specific Scenarios: ${Math.floor(Math.random() * 2) + 1} questions
- Creative/Innovation Questions: ${Math.floor(Math.random() * 2) + 1} questions

🎲 RANDOMIZATION INSTRUCTIONS:
- Use random technical concepts and frameworks for ${role}
- Pick random company scenarios and challenges
- Vary question complexity from basic to expert level
- Include different industries and contexts
- Generate questions about emerging trends and technologies
- Create scenario-based questions with random variables

🚀 ADVANCED REQUIREMENTS FOR ${role.toUpperCase()}:
- Include cutting-edge ${role} technologies and methodologies
- Create questions about real-world ${role} challenges
- Add questions about industry best practices and innovations
- Include team collaboration and leadership scenarios
- Generate questions about problem-solving in complex environments

💡 INNOVATION FACTOR:
- 30% traditional interview questions (but make them unique)
- 40% modern industry-specific challenges
- 20% future-focused and emerging technology questions
- 10% creative problem-solving scenarios

🎯 OUTPUT FORMAT:
Return EXACTLY 10 questions, numbered 1-10, one per line:
1. [Unique question 1]
2. [Unique question 2]
...
10. [Unique question 10]

⚠️ MANDATORY: Each question MUST be completely different from standard interview questions. Be creative, specific, and role-focused. Use random technical terms, scenarios, and contexts to ensure uniqueness.

GENERATE NOW with maximum creativity and randomization:`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse questions from the response
      const questions = text
        .split('\n')
        .filter(line => line.trim() && /^\d+\./.test(line.trim()))
        .map(line => line.replace(/^\d+\.\s*/, '').trim())
        .filter(q => q.length > 10) // Filter out empty or too short questions
        .slice(0, 10);

      // If we got exactly 10 questions, return them, otherwise fall back
      if (questions.length === 10) {
        console.log(`✅ Generated ${questions.length} unique questions for ${role} (Session: ${sessionId})`);
        return questions;
      } else {
        console.warn(`⚠️ Only got ${questions.length} questions, trying backup generation...`);
        return this.generateBackupQuestions(role, sessionId);
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      return this.generateBackupQuestions(role, sessionId);
    }
  }

  private async generateBackupQuestions(role: string, sessionId: string): Promise<string[]> {
    const simplePrompt = `Generate 10 random, unique interview questions for ${role}. 
    Session: ${sessionId}
    Make each question different and specific to ${role}. 
    Include technical, behavioral, and situational questions.
    Format as numbered list 1-10.
    
    Be creative and avoid generic questions.`;

    try {
      const result = await this.model.generateContent(simplePrompt);
      const response = await result.response;
      const text = response.text();
      
      const questions = text
        .split('\n')
        .filter(line => line.trim() && /^\d+\./.test(line.trim()))
        .map(line => line.replace(/^\d+\.\s*/, '').trim())
        .slice(0, 10);

      return questions.length >= 8 ? questions : this.getRandomizedDefaultQuestions(role);
    } catch (error) {
      console.error("Backup generation failed:", error);
      return this.getRandomizedDefaultQuestions(role);
    }
  }

  private getRandomizedDefaultQuestions(role: string): string[] {
    // Even fallback questions are randomized
    const questionPools = this.getDefaultQuestions(role);
    const randomQuestions = [...questionPools].sort(() => Math.random() - 0.5);
    
    // Add random elements to make them unique
    const uniqueQuestions = randomQuestions.map((q, index) => {
      const randomElements = [
        "in a fast-paced environment",
        "under tight deadlines", 
        "with limited resources",
        "in a remote team setting",
        "with conflicting priorities"
      ];
      
      if (Math.random() > 0.7 && !q.includes("?")) {
        const randomElement = randomElements[Math.floor(Math.random() * randomElements.length)];
        return q.replace(".", ` ${randomElement}.`);
      }
      return q;
    });
    
    return uniqueQuestions.slice(0, 10);
  }

  async generateFeedback(question: string, answer: string, role: string): Promise<string> {
    const prompt = `You are an expert interview evaluator. Analyze this specific answer in detail and provide a comprehensive evaluation.

CONTEXT:
Role: ${role}
Question: "${question}"
Answer: "${answer}"

ANALYSIS REQUIREMENTS:
1. **Correctness (1-10)**: Evaluate factual accuracy, technical knowledge, and truthfulness
2. **Relevance (1-10)**: Assess if the answer directly addresses the question and stays on topic
3. **Depth & Detail (1-10)**: Rate the level of detail, examples provided, and thoroughness
4. **Communication (1-10)**: Evaluate clarity, structure, and professional presentation

SCORING GUIDELINES:
- 9-10: Exceptional quality, demonstrates expertise
- 7-8: Good quality with minor areas for improvement
- 5-6: Adequate but needs significant improvement
- 3-4: Poor quality with major issues
- 1-2: Very poor quality, largely irrelevant or incorrect

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

---

IMPORTANT: 
- Base your analysis on the ACTUAL content of the answer provided
- Be specific about what was said and what was missing
- Provide unique feedback that reflects the particular answer given
- Don't give generic feedback - analyze the specific response
- Consider the role requirements when evaluating technical depth
- Be honest and accurate in your assessment`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const feedback = response.text();
      
      // Validate that we got a proper response with a score
      if (feedback && feedback.includes('Overall Score:')) {
        return feedback;
      } else {
        // If the response doesn't have the expected format, try again with a simpler prompt
        return this.generateSimpleFeedback(question, answer, role);
      }
    } catch (error) {
      console.error("Error generating feedback:", error);
      return this.generateSimpleFeedback(question, answer, role);
    }
  }

  async generateDetailedFeedback(question: string, answer: string, role: string): Promise<string> {
    const prompt = `You are an expert interview evaluator. You must analyze this specific answer in detail and provide a comprehensive evaluation.

CONTEXT:
Role: ${role}
Question: "${question}"
Answer: "${answer}"

ANALYSIS REQUIREMENTS:
1. **Correctness (1-10)**: Evaluate factual accuracy, technical knowledge, and truthfulness
2. **Relevance (1-10)**: Assess if the answer directly addresses the question and stays on topic
3. **Depth & Detail (1-10)**: Rate the level of detail, examples provided, and thoroughness
4. **Communication (1-10)**: Evaluate clarity, structure, and professional presentation

SCORING GUIDELINES:
- 9-10: Exceptional quality, demonstrates expertise
- 7-8: Good quality with minor areas for improvement
- 5-6: Adequate but needs significant improvement
- 3-4: Poor quality with major issues
- 1-2: Very poor quality, largely irrelevant or incorrect

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

---

IMPORTANT: 
- Base your analysis on the ACTUAL content of the answer provided
- Be specific about what was said and what was missing
- Provide unique feedback that reflects the particular answer given
- Don't give generic feedback - analyze the specific response
- Consider the role requirements when evaluating technical depth
- Be honest and accurate in your assessment`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const feedback = response.text();
      
      // Validate that we got a proper response with a score
      if (feedback && feedback.includes('Overall Score:')) {
        return feedback;
      } else {
        // If the response doesn't have the expected format, try again with a simpler prompt
        return this.generateSimpleFeedback(question, answer, role);
      }
    } catch (error) {
      console.error("Error generating feedback:", error);
      return this.generateSimpleFeedback(question, answer, role);
    }
  }

  private async generateSimpleFeedback(question: string, answer: string, role: string): Promise<string> {
    const prompt = `Rate this interview answer from 1-10 and provide feedback:

    Role: ${role}
    Question: ${question}
    Answer: ${answer}

    Provide:
    **Overall Score: [X]/10**
    **Strengths:** [What was good]
    **Areas for Improvement:** [What needs work]
    **Key Recommendation:** [Main advice]

    Rate based on content quality, not length. Be accurate and specific.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating simple feedback:", error);
      return this.getAIStyleFeedback(answer);
    }
  }

  private getAIStyleFeedback(answer: string): string {
    const wordCount = answer.trim().split(' ').length;
    const hasExamples = answer.toLowerCase().includes('example') || answer.toLowerCase().includes('experience') || answer.toLowerCase().includes('project');
    const isStructured = answer.includes('.') && answer.length > 100;
    
    let score = 5; // Base score
    
    if (wordCount > 50) score += 1;
    if (wordCount > 100) score += 1;
    if (hasExamples) score += 1;
    if (isStructured) score += 1;
    if (answer.length > 300) score += 1;
    
    score = Math.min(score, 10);

    return `**Overall Score: ${score}/10**

**Strengths:**
${hasExamples ? '• You provided relevant examples or experience' : '• You addressed the question directly'}
${isStructured ? '• Your answer has good structure and flow' : '• You communicated clearly'}

**Areas for Improvement:**
${wordCount < 50 ? '• Provide more detailed explanations and examples' : '• Consider adding more specific metrics or outcomes'}
${!hasExamples ? '• Include concrete examples from your experience' : '• Structure your response using frameworks like STAR method'}

**Key Recommendation:**
${wordCount < 100 ? 'Expand your answers with more specific details and real examples.' : 'Continue providing detailed responses while ensuring all key points are covered.'}`;
  }

  async generateFinalAssessment(role: string, questions: string[], answers: string[]): Promise<{
    overallScore: number;
    summary: string;
    recommendations: string[];
  }> {
    const prompt = `Provide a comprehensive interview assessment for a ${role} candidate based on the following 4 criteria:

1. Correctness – Is the information factually and technically accurate?
2. Relevance – Does the answer match the question and stay on topic?
3. Depth & Detail – Is the answer well-explained with examples or reasoning?
4. Communication – Is it clear, well-structured, and easy to follow?

Questions and Answers:
${questions.map((q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || "No answer provided"}`).join('\n\n')}

Provide assessment in this JSON format:
{
  "overallScore": [number from 1-10],
  "summary": "[2-3 sentence overall performance summary covering all 4 criteria]",
  "recommendations": ["[specific improvement tip 1]", "[specific improvement tip 2]", "[specific improvement tip 3]"]
}

Base the score on: communication clarity, technical knowledge, problem-solving approach, and overall presentation. Be honest and accurate in your assessment.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const assessment = JSON.parse(jsonMatch[0]);
        return assessment;
      }
      
      // Fallback if JSON parsing fails
      return this.getDefaultAssessment();
    } catch (error) {
      console.error("Error generating assessment:", error);
      return this.getDefaultAssessment();
    }
  }

  private getDefaultQuestions(role: string): string[] {
    const questionBank: Record<string, string[]> = {
      "software-developer": [
        "Tell me about yourself and your experience in software development.",
        "Explain the difference between REST and GraphQL APIs. When would you use each?",
        "How do you handle debugging a complex issue in production?",
        "Describe a challenging technical project you worked on. What obstacles did you face?",
        "How do you stay updated with new technologies and frameworks?",
        "Walk me through your approach to code reviews and ensuring code quality.",
        "Describe a time when you had to work with a difficult stakeholder. How did you handle it?",
        "How would you design a scalable system for a high-traffic application?",
        "Tell me about a time when you had to learn a new technology quickly.",
        "What's your experience with agile development methodologies?"
      ],
      "data-analyst": [
        "Walk me through your experience with data analysis and your background.",
        "How would you approach analyzing a dataset with missing or inconsistent data?",
        "Explain the difference between correlation and causation with an example.",
        "Describe a time when your data analysis led to a significant business decision.",
        "Which data visualization tools do you prefer and why?",
        "How do you ensure data quality and accuracy in your analysis?",
        "Tell me about a time when stakeholders disagreed with your findings.",
        "How would you present complex data insights to non-technical executives?",
        "Describe your experience with statistical modeling and A/B testing.",
        "What's your approach to handling large datasets and performance optimization?"
      ],
      "product-manager": [
        "Tell me about your product management experience and approach.",
        "How do you prioritize features when you have limited development resources?",
        "Walk me through how you would launch a new product feature.",
        "Describe a time when you had to make a difficult product decision with incomplete data.",
        "How do you work with engineering teams to ensure successful product delivery?",
        "How do you gather and validate customer requirements?",
        "Tell me about a product failure you experienced and what you learned.",
        "How do you balance technical debt with new feature development?",
        "Describe your approach to competitive analysis and market research.",
        "How do you measure product success and define key metrics?"
      ],
      "ui-ux-designer": [
        "Tell me about your design background and what draws you to UX/UI design.",
        "Walk me through your design process from research to final implementation.",
        "How do you handle feedback and criticism of your design work?",
        "Describe a challenging design problem you solved. What was your approach?",
        "How do you ensure your designs are accessible and inclusive?",
        "Tell me about a time when user research changed your design direction.",
        "How do you collaborate with developers to ensure design implementation?",
        "Describe your experience with design systems and maintaining consistency.",
        "How do you approach designing for mobile vs desktop experiences?",
        "What's your process for conducting usability testing and iterating on designs?"
      ],
      "devops-engineer": [
        "Tell me about your DevOps experience and philosophy.",
        "How do you approach CI/CD pipeline design and implementation?",
        "Describe a time when you had to troubleshoot a critical production issue.",
        "What's your experience with infrastructure as code and automation?",
        "How do you ensure security in your deployment processes?",
        "Tell me about a challenging migration project you've worked on.",
        "How do you approach monitoring and alerting for distributed systems?",
        "Describe your experience with containerization and orchestration.",
        "How do you balance development velocity with system reliability?",
        "What's your approach to disaster recovery and backup strategies?"
      ]
    };

    // Add more role defaults as needed
    const defaultQuestions = [
      "Tell me about yourself and your professional background.",
      "Why are you interested in this role and our company?",
      "Describe a challenging situation you faced and how you handled it.",
      "What are your greatest strengths and how do they apply to this position?",
      "Tell me about a time when you had to work under pressure.",
      "How do you handle feedback and criticism?",
      "Describe a time when you had to learn something new quickly.",
      "What motivates you in your work?",
      "How do you prioritize tasks when everything seems urgent?",
      "Where do you see yourself in 5 years and how does this role fit your goals?"
    ];

    return questionBank[role] || defaultQuestions;
  }

  private getDefaultFeedback(answerLength: number): string {
    if (answerLength < 50) {
      return `**Strengths:** You provided a direct response to the question.

**Areas for Improvement:** Try to provide more specific examples and elaborate on your experience. Consider using the STAR method (Situation, Task, Action, Result) to structure your answers.

**Score:** 5/10

**Recommendation:** Practice expanding your answers with concrete examples and metrics when possible.`;
    } else if (answerLength < 200) {
      return `**Strengths:** Good foundation in your response with relevant details. You demonstrate understanding of the topic.

**Areas for Improvement:** Consider adding more specific examples or discussing challenges you've overcome to make your answer more compelling.

**Score:** 7/10

**Recommendation:** Include more quantifiable achievements and specific outcomes to strengthen your responses.`;
    } else {
      return `**Strengths:** Comprehensive answer with good detail and clear communication. You've demonstrated strong knowledge and provided specific examples.

**Areas for Improvement:** Your response shows good depth. Consider practicing conciseness while maintaining the quality of information.

**Score:** 8/10

**Recommendation:** Continue this level of detail while ensuring you're directly addressing the core of each question.`;
    }
  }

  private getDefaultAssessment() {
    return {
      overallScore: 7,
      summary: "You demonstrated good communication skills and relevant knowledge throughout the interview. Your responses showed understanding of key concepts and practical experience.",
      recommendations: [
        "Practice providing more specific examples with quantifiable results",
        "Work on structuring answers using the STAR method for behavioral questions",
        "Continue developing technical knowledge and stay current with industry trends"
      ]
    };
  }
}

export const geminiService = new GeminiService();