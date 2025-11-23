'use client';

import { useEffect, useState } from 'react';

interface LottoData {
    drwNo: number;
    drwNoDate: string;
    drwtNo1: number;
    drwtNo2: number;
    drwtNo3: number;
    drwtNo4: number;
    drwtNo5: number;
    drwtNo6: number;
    bnusNo: number;
    returnValue: string;
}

export default function WinningNumbers() {
    const [data, setData] = useState<LottoData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestLotto = async () => {
            // Calculate approximate round number
            // Start date: 2002-12-07 (Round 1)
            const startDate = new Date('2002-12-07T20:00:00+09:00');
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const round = Math.floor(diffDays / 7) + 1;

            try {
                // Try fetching the calculated round
                let res = await fetch(`/api/lotto?drwNo=${round}`);
                let json = await res.json();

                // If failed (maybe future round not yet drawn), try previous round
                if (json.returnValue === 'fail') {
                    res = await fetch(`/api/lotto?drwNo=${round - 1}`);
                    json = await res.json();
                }

                if (json.returnValue === 'success') {
                    setData(json);
                }
            } catch (error) {
                console.error('Failed to fetch winning numbers', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestLotto();
    }, []);

    const getBallColor = (num: number) => {
        if (num <= 10) return '#fbc400';
        if (num <= 20) return '#69c8f2';
        if (num <= 30) return '#ff7272';
        if (num <= 40) return '#aaaaaa';
        return '#b0d840';
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</div>;
    if (!data) return <div style={{ textAlign: 'center', padding: '20px' }}>당첨 정보를 불러올 수 없습니다.</div>;

    return (
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#555', marginBottom: '0.5rem' }}>
                제 <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>{data.drwNo}</span>회 당첨결과
            </h3>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>({data.drwNoDate} 추첨)</p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {[data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6].map((num, idx) => (
                    <div key={idx} style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: getBallColor(num),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.2)'
                    }}>
                        {num}
                    </div>
                ))}
                <span style={{ fontSize: '1.5rem', color: '#ccc', margin: '0 5px' }}>+</span>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: getBallColor(data.bnusNo),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.2)'
                }}>
                    {data.bnusNo}
                </div>
            </div>
        </div>
    );
}
