import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const drwNo = searchParams.get('drwNo');

    if (!drwNo) {
        return NextResponse.json({ error: 'Round number (drwNo) is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`);

        if (!response.ok) {
            throw new Error('Failed to fetch from dhlottery');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching lotto data:', error);
        return NextResponse.json({ error: 'Failed to fetch lotto data' }, { status: 500 });
    }
}
