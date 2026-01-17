// app/chat/page.js
export default function ChatHomePage() {
  return (
    <div className="flex-1 max-w-7xl items-center justify-center bg-gray-50 dark:bg-gray-900 h-full md:flex hidden">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-blue-600 dark:text-blue-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2 dark:text-white">Welcome to Messages</h2>
        <p className="text-gray-600 dark:text-gray-400">Select a conversation from the sidebar or start a new one to begin messaging</p>
      </div>
    </div>
  );
}