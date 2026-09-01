
export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}


export type CreateBookDTO = {
  title: string;
  author: string;
  year: number;
};


export type UpdateBookDTO = Partial<CreateBookDTO>;


export type BookFilters = {
  author?: string;
  title?: string;
  year?: number;
};
