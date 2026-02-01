import React from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2 } from 'lucide-react';

interface ShareButtonProps {
    targetRef: React.RefObject<HTMLElement | null>;
    fileName?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ targetRef, fileName = 'que-tet-2026.png' }) => {
    const handleShare = async () => {
        if (targetRef.current === null) return;

        try {
            const dataUrl = await toPng(targetRef.current, { cacheBust: true, pixelRatio: 2 });

            // Create a link to download
            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to capture image:', err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-muted-gold to-yellow-600 text-white font-playfair font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 active:scale-95"
        >
            <Download className="w-5 h-5" />
            <span>Lưu Quẻ Về Máy</span>
        </button>
    );
};
