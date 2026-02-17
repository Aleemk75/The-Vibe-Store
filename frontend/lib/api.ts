import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ItemsResponse {
  items: Item[];
  pagination: PaginationInfo;
}

export interface FetchItemsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export async function fetchItems(params?: FetchItemsParams): Promise<ItemsResponse> {
  const queryParams: Record<string, string | number> = {};
  if (params?.search) queryParams.search = params.search.trim();
  if (params?.page) queryParams.page = params.page;
  if (params?.limit) queryParams.limit = params.limit;
  
  const { data } = await axios.get<ItemsResponse>(`${API_BASE}/api/items`, {
    params: queryParams,
    timeout: 10000,
  });
  return data;
}
