import { SearchX } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No items found." }: EmptyStateProps) {
  return (
    <div className="glass rounded-2xl p-16 text-center animate-fade-in max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <div className="glass-strong rounded-full p-4">
          <SearchX className="w-8 h-8 text-teal-600" />
        </div>
      </div>
      <p className="text-teal-800 text-lg font-medium">{message}</p>
    </div>
  );
}
