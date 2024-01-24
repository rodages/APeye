export type ApiError = {
  statusCode: number;
  service: string;
  correlationId: string;
  error: string;
};

export type PagedResponse<T> = {
  pageNumber: number;
  pageSize: number;
  results: T[];
  totalResults: number;
  _links: {
    current: Link;
    self: Link;
    next?: Link;
  };
};

export type Link = {
  href: string;
};
