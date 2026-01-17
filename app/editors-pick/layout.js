import LeftSidebar from "@/components/sideber/LeftSidebar";
import NotesPage from "./page";
import GoogleLoginPrompt from "@/components/auth/Google/GoogleLoginPrompt";
import SuggestedFriends from "@/components/sideber/SuggestedFriends";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  title: "Notes - Jeread",
  description: "Explore and share your personal notes.",
};

// ===============================
// 📝 NOTES PAGE COMPONENT
// ===============================
export default async function NotesPageLayout() {
  const sidebarData = await getRightSidebarUsers();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-center">
        <div className="w-full max-w-6xl mx-auto  px-4 flex flex-col lg:flex-row gap-6">

          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="mt-16">
              <LeftSidebar />
            </div>
          </aside>

          {/* MAIN FEED */}
          <div className="w-full mt-1  lg:w-2/4 lg:-ml-4">
            <NotesPage />
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-16">
              <SuggestedFriends users={sidebarData.users} error={sidebarData.error} />
            </div>
          </aside>

        </div>
      </div>

      {/* GOOGLE LOGIN PROMPT */}
      <div className="fixed bottom-6 right-6 lg:w-80">
        <GoogleLoginPrompt />
      </div>
    </main>
  );
}