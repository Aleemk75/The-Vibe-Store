"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Item } from "@/lib/api";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [favorited, setFavorited] = useState(false);

  return (
    <article
      className="glass glass-hover rounded-xl overflow-hidden group cursor-pointer animate-scale-in flex flex-col h-full"
      style={{ animationFillMode: "backwards" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image block – wireframe: large rectangle on top */}
      <div className="relative h-40 w-full overflow-hidden bg-white/30 flex-shrink-0">
        {item.image && !imageError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-teal-100/50">
            <span className="text-4xl opacity-50">📦</span>
          </div>
        )}
      </div>

      {/* Content – title, subtitle/description, then price + star (wireframe) */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-teal-900 line-clamp-1 mb-0.5">
          {item.name}
        </h3>
        <p className="text-sm text-teal-700/75 line-clamp-2 leading-snug flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between pt-3 mt-auto">
          <p className="text-lg font-bold text-teal-700">
            ${item.price.toFixed(2)}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFavorited((f) => !f);
            }}
            className="p-1.5 rounded-lg border border-white/60 bg-white/40 hover:bg-white/60 text-teal-700 transition-all duration-300 hover:scale-110"
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              className={`w-5 h-5 ${favorited ? "fill-amber-400 text-amber-500" : ""}`}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
