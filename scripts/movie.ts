/**
 * Třída reprezentující jeden seriál/film získaný z TVMaze API.
 */
export interface Show {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  } | null;
  rating?: {
    average: number | null; // Přidáno pro zobrazení hodnocení
  };
  summary?: string; // Přidáno pro popis filmu
}

/**
 * Struktura odpovědi z TVMaze API, kde každý objekt má 'score' a 'show'.
 */
export interface ApiResponse {
  score: number;
  show: Show;
}
