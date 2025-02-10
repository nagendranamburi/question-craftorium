
export interface Question {
  id: string;
  title: string;
  description: string;
  answer: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export type FormData = Omit<Question, 'id'>;
