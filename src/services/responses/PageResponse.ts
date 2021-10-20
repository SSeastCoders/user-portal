export interface PageResponse<Type> {
  content: Type[];
  totalPages: number;
  totalElements: number;
}
