export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center w-full py-12 gap-3"
    >
      <div
        className="
          w-10 h-10 rounded-full animate-spin
          border-4 border-green-600 border-t-transparent
          dark:border-green-400
        "
      />
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}
