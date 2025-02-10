
export interface Question {
  id: string;
  title: string;
  description: string;
  answer: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  code_example?: string;
}

export type FormData = Omit<Question, 'id'>;
