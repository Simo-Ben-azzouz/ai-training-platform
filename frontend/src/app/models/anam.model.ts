export interface AskAnamRequest {
  sessionId: string;
  question: string;
}

export interface AskAnamResponse {
  sessionId: string;
  formationId: string;
  question: string;
  sessionToken: string;
}

export interface ChatMessage {
  id: string;
  role: 'learner' | 'trainer' | 'system';
  content: string;
  createdAt: Date;
}
