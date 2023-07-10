export enum BookStatus {
  draft = "draft",
  published = "published",
  pending = "pending",
}

export interface IBook {
  id?: number;
  title: string;
  status: BookStatus;
}
