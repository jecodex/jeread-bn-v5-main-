import PostCard from "@/components/Modal/PostCard";
import LeftSidebar from "@/components/sideber/LeftSidebar";

// Utility function to remove HTML tags from a string
function stripHtmlTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

// Example of generating metadata
export async function generateMetadata({ params }) {
  const { id } = params;

  // Fetch the post data to generate metadata
  const post = await fetch(`https://jeread-v2-api.vercel.app/posts/${id}`, {
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
  console.log("id", id);

  const post = await fetch(`https://jeread-v2-api.vercel.app/posts/${id}`, {
    cache: "no-store",
  });
  const data = await post.json();

  return (
   <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto mt-2">
      <div className="flex flex-col  max-w-screen-xl mx-auto ">
        <div className="lg:mt-20">
          <PostCard
            author={data.author}
            content={data.content}
            date={data.updated_at}
            likes={data.likes}
            comments={data.comments}
            postId={id}
            views={data.views}
            authorName={data.author.name}
            authorId={data.author._id}
            authorProfilePicture={data.author.profile_picture}
            authorUsername={data.author.username}
            
          />
        </div>
      </div>
    </div>
  );
}
