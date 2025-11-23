'use client';

import { useEffect, useRef } from 'react';

interface KakaoAdFitProps {
    unit: string;
    width: number;
    height: number;
    disabled?: boolean;
}

export default function KakaoAdFit({ unit, width, height, disabled = false }: KakaoAdFitProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (disabled) return;
        if (!containerRef.current) return;

        // Clear previous content to prevent duplicate ads
        containerRef.current.innerHTML = '';

        // Create <ins> tag
        const ins = document.createElement('ins');
        ins.className = 'kakao_ad_area';
        ins.style.display = 'none';
        ins.setAttribute('data-ad-unit', unit);
        ins.setAttribute('data-ad-width', width.toString());
        ins.setAttribute('data-ad-height', height.toString());

        // Create <script> tag
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = '//t1.daumcdn.net/kas/static/ba.min.js';

        // Append to container
        containerRef.current.appendChild(ins);
        containerRef.current.appendChild(script);

        // Cleanup is handled by clearing innerHTML on next run
    }, [unit, width, height, disabled]);

    if (disabled) return null;

    return (
        <div
            ref={containerRef}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                margin: '0 auto',
                overflow: 'hidden' // Prevent layout shift
            }}
        />
    );
}
