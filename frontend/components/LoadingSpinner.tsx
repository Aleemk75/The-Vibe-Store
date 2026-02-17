export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 animate-fade-in">
      <div className="relative">
        <div
          className="w-16 h-16 rounded-full border-4 border-teal-200 border-t-teal-500 animate-spin"
          aria-hidden
        />
        <div
          className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-r-teal-400 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1s" }}
        />
      </div>
      <p className="text-teal-700 text-base font-medium">Loading items...</p>
    </div>
  );
}
