
export interface Category {
  id: string;
  name: string;
  logo_url: string;
  _count?: {
    questions: number;
  };
}
