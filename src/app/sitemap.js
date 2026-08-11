import { blogPosts } from '@/data/blog';

export default function sitemap() {
  const baseUrl = 'https://thedaaluminium.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/contact',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
