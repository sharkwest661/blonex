// src/components/shared/PostCard/index.ts
export { default as PostCard } from "./PostCard";
export { default } from "./PostCard";
export type { PostCardProps } from "./PostCard";

// ✅ Re-export central types for convenience, removing local Post type
export type { PostCardData, PostFeature } from "@/types/post.types";
