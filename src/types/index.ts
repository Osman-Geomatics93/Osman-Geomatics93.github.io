// src/types/index.ts
export interface Particle {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

export interface GalleryItem {
  id: number;
  category: string;
  title: string;
  description: string;
  image?: string;
  fallbackImage?: string;
  icon: string;
  subtitle: string;
  tags: string[];
  colors: string;
  downloadLink?: string;
  downloadName?: string;
  fileSize?: string;
  duration?: string;
  videoPath?: string;
}

export interface AnimatedCounterProps {
  end: number;
  duration?: number;
}