// app/profile/[id]/page.js (Server Component)
import { notFound } from 'next/navigation';
import ProfileClient from './ProfileClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// Server-side data fetching
async function getUserData(id) {
  try {
    const postsRes = await fetch(`${API_BASE_URL}/posts/user/${id}?page=1`, {
      cache: 'no-store',
    });
    
    if (!postsRes.ok) {
      return null;
    }
    
    return await postsRes.json();
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}

async function getFollowersCount(id) {
  try {
    const followersRes = await fetch(`${API_BASE_URL}/api/followers/${id}`, {
      cache: 'no-store',
    });
    
    if (followersRes.ok) {
      const followersData = await followersRes.json();
      return followersData.count || 0;
    }
    return 0;
  } catch (error) {
    console.error('Failed to fetch followers data:', error);
    return 0;
  }
}

export default async function ProfilePage({ params }) {
  const { id } = params;
  
  // Fetch initial data on server
  const [userData, followersCount] = await Promise.all([
    getUserData(id),
    getFollowersCount(id)
  ]);

  // Handle not found
  if (!userData || !userData.posts?.length) {
    notFound();
  }

  const user = userData.posts[0]?.author || {
    name: "Unknown User",
    bio: "No bio available", 
    profile_picture: "/avatar.png"
  };

  const initialData = {
    posts: userData.posts || [],
    user,
    followersCount,
    totalPages: userData.totalPages || 1,
    totalPosts: userData.totalPosts || 0,
    currentPage: userData.currentPage || 1,
  };

  return (
    <ProfileClient 
      userId={id} 
      initialData={initialData}
    />
  );
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { id } = params;
  const userData = await getUserData(id);
  
  if (!userData || !userData.posts?.length) {
    return {
      title: 'Profile Not Found',
    };
  }

  const user = userData.posts[0]?.author;
  
  return {
    title: `${user?.name || 'User'}`,
    description: user?.bio || 'View user profile and posts',
  };

}
