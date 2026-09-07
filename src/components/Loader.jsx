export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#532AAA] border-t-[#00C0A9]" />

      <h1 className="mt-6 text-3xl font-bold">
        <span className="text-[#532AAA]">Work</span>
        <span className="text-[#00C0A9]">Up</span>
      </h1>

      <p className="mt-3 animate-pulse text-gray-500">
        Loading...
      </p>
    </div>
  );
}