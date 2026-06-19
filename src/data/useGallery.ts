import { useQuery } from "@tanstack/react-query";
import { fetchGallery, GalleryItem } from "./api";

export function useGallery() {
  return useQuery<GalleryItem[]>({
    queryKey: ["gallery"],
    queryFn: fetchGallery,
    staleTime: 60_000,
  });
}