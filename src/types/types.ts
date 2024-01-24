export interface BookToAdd {
    title: string;
    author: string;
    genre: string;
    description: string;
}

export interface Book extends BookToAdd {
    id: number;
}
