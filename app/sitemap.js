// app/sitemap.js
export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bn.jeread.com';
    
    const routes = [
      { url: `${baseUrl}`, lastModified: new Date() },
      { url: `${baseUrl}/posts`, lastModified: new Date() },
    ];
  
    const allPosts = [];
    let page = 1;
    const limit = 100; // API limit per page
    let totalPages = 1;
  
    try {
      do {
        const res = await fetch(`https://apibn.jeread.com/posts?page=${page}&limit=${limit}`);
        const data = await res.json();
  
        allPosts.push(...data.posts); // append posts from this page
        totalPages = data.totalPages; // API must return totalPages or totalCount
        page++;
      } while (page <= totalPages);
  
      const quoteRoutes = allPosts.map(post => ({
        url: `${baseUrl}/posts/${post._id}`,
        lastModified: new Date(post.updated_at || post.created_at),
      }));
  
      return [...routes, ...quoteRoutes];
    } catch (error) {
      console.error('Error generating sitemap:', error);
      return routes;
    }
  }
  
