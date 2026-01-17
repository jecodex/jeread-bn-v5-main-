import TrendingIdeas from "../components/sideber/SuggestedFriends";
import LeftSidebar from "../components/sideber/LeftSidebar";
import QuotesPageClient from "./quotes/page";
import GoogleLoginPrompt from "@/components/auth/Google/GoogleLoginPrompt";
import SuggestedFriends from "../components/sideber/SuggestedFriends";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PAGE_SIZE = 5;

// ===============================
// ✨ Load Mixed Feed (posts + notes)
// ===============================
async function getInitialFeed() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/feed`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Feed load failed: ${response.status}`);
    }

    const data = await response.json();

    return {
      feed: data.feed || [],
      hasMore: (data.feed || []).length >= PAGE_SIZE,
      error: null,
    };

  } catch (error) {
    console.error("Error loading feed:", error);
    return {
      feed: [],
      hasMore: false,
      error: error.message,
    };
  }
}
 
// ===============================
// 👥 Right Sidebar Users API
// ===============================
async function getRightSidebarUsers() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/users`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Users load failed: ${res.status}`);
    }

    const data = await res.json();

    return {
      users: data.users || [],
      error: null,
    };
  } catch (error) {
    console.error("Right sidebar users error:", error);
    return {
      users: [],
      error: error.message,
    };
  }
}

// ===============================
// 📌 Metadata
// ===============================
export const metadata = {
  title: "Jeread",
  description: "Discover and share powerful life stories.",
};

// ===============================
// 🏠 HOME PAGE COMPONENT
// ===============================
export default async function Home() {
  const initialData = await getInitialFeed();
  const sidebarData = await getRightSidebarUsers(); // ✅ sidebarData লোড করা হয়েছে

  return (
    <main className="min-h-screen">
      
      <div className="flex justify-center">
        <div className="w-full max-w-6xl mx-auto pt-16 px-4 flex flex-col lg:flex-row gap-6">

          {/* LEFT SIDEBAR */}
          <div className="hidden lg:block lg:w-1/4 lg:sticky lg:top-12">
            <LeftSidebar />
          </div>

          {/* MAIN FEED (QuotesPageClient Handles Mixed Feed) */}
          <div className="w-full lg:w-2/4 lg:-ml-4">
            <QuotesPageClient
              initialFeed={initialData.feed}
              initialHasMore={initialData.hasMore}
              error={initialData.error}
            />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-12"> {/* ✅ sticky যোগ করা হয়েছে */}
            <SuggestedFriends users={sidebarData.users} error={sidebarData.error} />
          </div>
        </div>
      </div>

      {/* GOOGLE LOGIN PROMPT */}
      <div className="lg:w-80 mt-4 lg:mt-20 lg:ml-4">
        <GoogleLoginPrompt />
      </div>

    </main>
  );
}
