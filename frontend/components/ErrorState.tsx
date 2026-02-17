import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="glass rounded-2xl p-16 text-center animate-fade-in max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <div className="glass-strong rounded-full p-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
      </div>
      <p className="text-teal-800 text-lg font-medium mb-6">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="glass-strong px-6 py-3 rounded-xl hover:bg-teal-100 text-teal-800 font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto border-teal-200"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
}
