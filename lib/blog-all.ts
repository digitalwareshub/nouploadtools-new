import { blogPosts as existingBlogPosts, type BlogPost } from './blog';
import { additionalBlogPosts } from './blog-extra';

export type { BlogPost } from './blog';

export const blogPosts: BlogPost[] = [...existingBlogPosts, ...additionalBlogPosts];
