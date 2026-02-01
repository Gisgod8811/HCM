import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface FortuneData {
    fortune: {
        title: string;
        poem: string;
    };
    hcm_advice: {
        quote: string;
        explanation: string;
        keywords: string[];
        steps: string[];
    };
    image?: string;
}

interface FortuneCardProps {
    data: FortuneData;
}

// ForwardRef is needed for html-to-image to capture this component
export const FortuneCard = forwardRef<HTMLDivElement, FortuneCardProps>(({ data }, ref) => {
    return (
        <div
            ref={ref}
            className="bg-white p-8 rounded-sm shadow-2xl max-w-2xl mx-auto border-8 border-double border-muted-gold relative overflow-hidden"
            style={{ minHeight: '800px' }} // Ensure consistent height for image
        >
            {/* Background Watermark/Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                <span className="text-9xl">🪷</span>
            </div>

            {/* Header */}
            <div className="text-center mb-6 relative z-10">
                <div className="inline-block bg-crimson text-creamy px-4 py-1 rounded-full text-xs font-bold font-vietnam tracking-widest mb-2 uppercase">
                    Quẻ Đầu Năm 2026
                </div>
                <h2 className="font-playfair text-5xl font-bold text-crimson mb-2">{data.fortune.title}</h2>
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-muted-gold to-transparent"></div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Left: Poem & Image */}
                <div className="space-y-4">
                    {/* Image */}
                    <div className="relative aspect-square rounded-sm overflow-hidden border-2 border-muted-gold shadow-md group">
                        {data.image ? (
                            <img
                                src={data.image}
                                alt="Fortune AI Art"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center italic text-gray-500">
                                No Image Available
                            </div>
                        )}
                        {/* Overlay Decoration */}
                        <div className="absolute inset-0 border-4 border-crimson/10 m-1 rounded-sm pointer-events-none"></div>
                    </div>

                    <div className="bg-crimson/5 p-4 rounded-sm border-l-4 border-crimson">
                        <p className="font-vietnam italic text-gray-800 text-center whitespace-pre-wrap leading-relaxed font-semibold text-lg">
                            {data.fortune.poem}
                        </p>
                    </div>
                </div>

                {/* Right: HCM Advice */}
                <div className="bg-gradient-to-br from-muted-gold/10 to-transparent p-5 rounded-sm flex flex-col justify-center border border-muted-gold/30">
                    <h3 className="font-playfair font-bold text-crimson text-xl mb-3 flex items-center">
                        <span className="mr-2">💡</span> Lời Bác Dặn
                    </h3>
                    <blockquote className="font-playfair italic text-2xl text-gray-900 mb-4 leading-normal">
                        "{data.hcm_advice.quote}"
                    </blockquote>

                    <div className="space-y-3">
                        <div>
                            <span className="font-bold text-crimson text-sm uppercase">Ý nghĩa:</span>
                            <p className="text-base font-vietnam text-gray-700 leading-snug mt-1">
                                {data.hcm_advice.explanation}
                            </p>
                        </div>
                        <div>
                            <span className="font-bold text-crimson text-sm uppercase">Hành động:</span>
                            <ul className="text-base font-vietnam text-gray-700 mt-1 list-disc list-inside">
                                {data.hcm_advice.steps.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Keywords Footer */}
            <div className="flex flex-wrap gap-2 justify-center relative z-10">
                {data.hcm_advice.keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-muted-gold text-crimson text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">
                        #{kw}
                    </span>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="font-playfair text-muted-gold text-xs italic">
                    Gieo quẻ đầu năm cùng Trường Giang - Chúc bạn một năm mới an khang thịnh vượng!
                </p>
            </div>
        </div>
    );
});

FortuneCard.displayName = 'FortuneCard';
