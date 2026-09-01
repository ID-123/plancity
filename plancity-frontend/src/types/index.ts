export type Role = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventImage {
  id: string;
  url: string;
  order: number;
  eventId?: string;
}

export interface Event {
  id: string;
  name: string;
  description: string | null;
  date: string;
  location: string;
  price: number;
  capacity: number;
  categoryId: string;
  category: Category;
  images: EventImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiErrorBody {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export interface EventPayload {
  name: string;
  description?: string;
  date: string;
  location: string;
  price: number;
  capacity: number;
  categoryId: string;
  images?: string[];
}

export interface CategoryPayload {
  name: string;
  description?: string;
}
