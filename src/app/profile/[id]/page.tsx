export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-8 text-center bg-gray-900/50 rounded-lg border border-gray-700 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-white">User Profile</h1>
        <hr className="my-4 border-gray-700" />
        <div className="flex items-center justify-center space-x-2 text-lg text-gray-300">
          <span>User ID:</span>
          <p className="p-2 rounded bg-indigo-600 text-white font-mono">
            {params.id}
          </p>
        </div>
      </div>
    </div>
  );
}
