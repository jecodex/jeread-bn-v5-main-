
export default async function NestedLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {children}
    </div>
  );
}
