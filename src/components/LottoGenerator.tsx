'use client';

import { useState, useEffect } from 'react';

import { getWeightedRandomNumber } from '@/lib/lotto-stats';
import KakaoAdFit from './KakaoAdFit';

export default function LottoGenerator() {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Ad State
    const [showAd, setShowAd] = useState(false);
    const [canCloseAd, setCanCloseAd] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showAd && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setCanCloseAd(true);
        }
        return () => clearInterval(timer);
    }, [showAd, timeLeft]);

    const handleGenerateClick = () => {
        setShowAd(true);
        setCanCloseAd(false);
        setTimeLeft(3);
    };

    const handleCloseAd = () => {
        setShowAd(false);
        startGeneration();
    };

    const startGeneration = () => {
        setIsGenerating(true);

        // Animation effect
        let intervalCount = 0;
        const interval = setInterval(() => {
            // For animation, just use simple random
            const tempNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1);
            setNumbers(tempNumbers);
            intervalCount++;

            if (intervalCount > 10) {
                clearInterval(interval);

                // Final numbers using Weighted Algorithm
                const newNumbers = new Set<number>();
                while (newNumbers.size < 6) {
                    const num = getWeightedRandomNumber(newNumbers);
                    newNumbers.add(num);
                }
                setNumbers(Array.from(newNumbers).sort((a, b) => a - b));
                setIsGenerating(false);
            }
        }, 50);
    };

    const getBallColor = (num: number) => {
        if (num <= 10) return '#fbc400'; // Yellow
        if (num <= 20) return '#69c8f2'; // Blue
        if (num <= 30) return '#ff7272'; // Red
        if (num <= 40) return '#aaaaaa'; // Gray
        return '#b0d840'; // Green
    };

    return (
        <>
            {/* Interstitial Ad Modal */}
            {showAd && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '2rem',
                        borderRadius: '16px',
                        maxWidth: '400px',
                        width: '100%',
                        textAlign: 'center',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                    }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#333' }}>
                            잠시만 기다려주세요...
                        </h3>
                        <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            번호를 정밀 분석 중입니다.
                        </p>

                        <div style={{ margin: '0 auto 1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <KakaoAdFit unit="DAN-853ZpXquPwh8qIxA" width={320} height={100} />
                        </div>

                        <button
                            onClick={handleCloseAd}
                            disabled={!canCloseAd}
                            style={{
                                padding: '0.8rem 2rem',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                color: '#fff',
                                backgroundColor: canCloseAd ? '#2196F3' : '#ccc',
                                border: 'none',
                                borderRadius: '50px',
                                cursor: canCloseAd ? 'pointer' : 'not-allowed',
                                transition: 'background-color 0.3s',
                                width: '100%'
                            }}
                        >
                            {canCloseAd ? '번호 확인하기' : `${timeLeft}초 후 확인 가능`}
                        </button>
                    </div>
                </div>
            )}

            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 'bold', color: '#333' }}>로또 번호 생성기</h2>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {numbers.length > 0 ? (
                        numbers.map((num, idx) => (
                            <div key={idx} style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: getBallColor(num),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.2)'
                            }}>
                                {num}
                            </div>
                        ))
                    ) : (
                        <div style={{ color: '#888', padding: '1rem' }}>버튼을 눌러 행운의 번호를 확인하세요!</div>
                    )}
                </div>

                <button
                    onClick={handleGenerateClick}
                    disabled={isGenerating}
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        backgroundColor: isGenerating ? '#ccc' : '#4CAF50',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: isGenerating ? 'not-allowed' : 'pointer',
                        transition: 'transform 0.1s',
                        boxShadow: '0 4px 0 #388E3C'
                    }}
                    onMouseDown={(e) => !isGenerating && (e.currentTarget.style.transform = 'translateY(4px)', e.currentTarget.style.boxShadow = 'none')}
                    onMouseUp={(e) => !isGenerating && (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = '0 4px 0 #388E3C')}
                    onMouseLeave={(e) => !isGenerating && (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = '0 4px 0 #388E3C')}
                >
                    {isGenerating ? '생성 중...' : '번호 생성하기'}
                </button>
            </div>
        </>
    );
}
