// app/books/page.js (Server Component)
import BookDisplayClient from './BookDisplayClient';

export const metadata = {
  title: 'My Library',
  description: 'Discover and create amazing books. Save, share, and collaborate on your favorite reads.',
  keywords: ['books', 'library', 'reading', 'create', 'share'],
  openGraph: {
    title: 'My Library',
    description: 'Discover and create amazing books',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Library',
    description: 'Discover and create amazing books',
  }
};

// You can fetch initial data here if needed
async function getInitialData() {
  // Example: fetch saved books, user data, etc.
  // const savedBooks = await fetchSavedBooks();
  // const userBooks = await fetchUserBooks();
  
  return {
    initialBooks: {
      saved: [],
      created: [],
      drafts: [],
      shared: []
    }
  };
}

export default async function BooksPage() {
  // Fetch any initial server-side data
  const initialData = await getInitialData();

  return (
    <div>
      {/* Any server-rendered content can go here */}
      <BookDisplayClient initialData={initialData} />
    </div>
  );
}