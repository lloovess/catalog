export interface Platform {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  features: string[];
  courseCategories?: string[];
}
