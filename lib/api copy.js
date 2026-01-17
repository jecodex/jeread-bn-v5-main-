export async function fetchBooksFromAPI() {
  try {
    const response = await fetch("https://jefine-v6-api.vercel.app/posts"); // আপনার API URL দিন
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.books; // ধরে নিচ্ছি API থেকে `{ books: [...] }` ফরম্যাটে ডাটা আসবে
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
