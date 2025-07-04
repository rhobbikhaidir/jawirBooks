export interface GutendexAuthor {
    name: string;
    birth_year: number | null;
    death_year: number | null;
  }


  export interface GutendexBook {
    id: number;
    title: string;
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean;
    media_type: string;
    authors: GutendexAuthor[];
    translators: GutendexAuthor[];
    download_count: number;
    formats: Record<string, string>;
    summaries: string[];
  }

  export interface GutendexResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: GutendexBook[];
  }


  export type PartialListBooks = {
    page: string;
    search?: string;
  }

  export type PartialDetail = {
    id: string;
  }