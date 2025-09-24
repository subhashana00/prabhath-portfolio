import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the correct asset path with base URL
 */
export function getAssetPath(path: string): string {
  const baseUrl = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path if it exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure base URL ends with slash
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  return cleanBaseUrl + cleanPath;
}
