interface AnalysisRequest {
  question: string;
  answer: string;
  role: string;
}

interface AnalysisResponse {
  analysis: string;
}

export class AnalysisService {
  private baseUrl = 'http://localhost:5000';

  async analyzeAnswer(question: string, answer: string, role: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
          role
        } as AnalysisRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AnalysisResponse = await response.json();
      return data.analysis;
    } catch (error) {
      console.error('Error analyzing answer:', error);
      throw new Error('Failed to analyze answer. Please try again.');
    }
  }
}

export const analysisService = new AnalysisService(); 