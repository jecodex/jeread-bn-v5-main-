import AuthorCard from "@/components/Card/AuthorCard";
import PostCard from "@/components/Modal/PostCard";
// Utility function to remove HTML tags from a string
function stripHtmlTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

// Example of generating metadata
export async function generateMetadata({ params }) {
  const { id } = params;

  // Fetch the post data to generate metadata
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const post = await fetch(`${apiUrl}/posts/${id}`, {
    cache: "no-store",
  });
  const data = await post.json();

  // Remove HTML tags from the questiontext
  const strippedText = stripHtmlTags(data.questiontext || data.content || "");

  return {
    title: strippedText || "Jeread Page", // Fall back title
    description: strippedText.substring(0, 150) || "Jeread Description", // Fall back description
    // You can add more metadata properties here if needed
  };
}

export default async function Posts({ params }) {
  const { id } = params;

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const post = await fetch(`${apiUrl}/posts/${id}`, {
    cache: "no-store",
  });
  const data = await post.json();

  return (
    <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto mt-16">
      <div className="flex flex-col  max-w-screen-xl mx-auto ">
          <PostCard
            author={data.author}
            content={data.content}
            date={data.updated_at}
            likes={data.likes}
            comments={data.comments}
            backgroundImage={data.backgroundImage}
            views={data.views}
            postId={data._id}
            
            
      />
        <AuthorCard author={data.author} />
        </div> 
    </div>
  );
}
