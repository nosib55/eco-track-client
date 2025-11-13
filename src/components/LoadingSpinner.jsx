export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full py-10">
      <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
