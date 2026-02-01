"use client";

import { ReactNode } from "react";

interface FortuneModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function FortuneModal({ isOpen, onClose, children }: FortuneModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Vintage Scroll Card */}
      <div className="relative w-full max-w-2xl animate-fade-in-scale">
        {/* Outer vintage frame */}
        <div className="vintage-scroll rounded-none border-8 border-muted-gold shadow-2xl overflow-hidden">
          {/* Decorative top border with pattern */}
          <div className="h-12 bg-gradient-to-b from-deep-red via-crimson to-creamy border-b-4 border-muted-gold flex items-center justify-center">
            <div className="text-2xl">✦ ✦ ✦</div>
          </div>

          {/* Content area with lotus background */}
          <div className="relative p-8 lotus-bg">
            {/* Header Section */}
            <div className="border-b-2 border-dashed border-muted-gold pb-6 mb-6 text-center">
              {/* Title rendered from children - wrapped content area */}
              <div className="mb-4">{children}</div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="mt-6 w-full bg-gradient-to-r from-crimson to-deep-red hover:from-deep-red hover:to-crimson text-creamy font-playfair font-bold py-3 px-6 rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-muted-gold"
            >
              ✓ Cảm ơn Bác
            </button>
          </div>

          {/* Decorative bottom border */}
          <div className="h-8 bg-gradient-to-t from-muted-gold to-transparent border-t-4 border-muted-gold flex items-center justify-center">
            <div className="text-lg">🪷</div>
          </div>
        </div>
      </div>
    </div>
  );
}
