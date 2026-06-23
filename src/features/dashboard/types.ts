export type Analytics = {
  total: number;
  byStatus: { OPEN: number; IN_PROGRESS: number; RESOLVED: number };
  categoryDistribution: {
    category: string;
    count: number;
    percentage: number;
  }[];
  recent: FeedbackItem[];
};

export type FeedbackItem = {
  id: string;
  category: string;
  comment: string;
  email: string | null;
  status: string;
  createdAt: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Filters = {
  search: string;
  category: string;
  status: string;
  page: number;
};