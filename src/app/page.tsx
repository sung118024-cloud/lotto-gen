'use client';

import LottoGenerator from '@/components/LottoGenerator';
import WinningNumbers from '@/components/WinningNumbers';
import KakaoAdFit from '@/components/KakaoAdFit';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Responsive Container */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        padding: '2rem 1rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>

        {/* Left Ad (Desktop Only) */}
        <aside className="desktop-ad">
          <div style={{ position: 'sticky', top: '2rem' }}>
            <KakaoAdFit unit="DAN-EaVEMlrnSzBUF2lT" width={160} height={600} />
          </div>
        </aside>

        {/* Main Content */}
        <div style={{ flex: 1, maxWidth: '800px', width: '100%' }}>
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#333',
              marginBottom: '0.5rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              Lotto 6/45
            </h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              행운의 번호를 생성하고 당첨 결과를 확인하세요
            </p>
          </header>

          {/* Top Ad (Mobile Only) */}
          <div className="mobile-ad" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            <KakaoAdFit unit="DAN-9ctCyY0uRHWIh1Oy" width={320} height={100} />
          </div>

          <WinningNumbers />
          <LottoGenerator />

          <section style={{
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            textAlign: 'left'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📊 과학적인 확률 기반 생성
            </h2>
            <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '1rem' }}>
              단순한 랜덤이 아닙니다. <strong>2002년부터 현재까지의 모든 역대 당첨 데이터</strong>를 분석하여,
              통계적으로 더 자주 당첨된 번호에 <strong>가중치</strong>를 부여했습니다.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, color: '#666', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>✅ <strong>빅데이터 분석:</strong> 1회부터 최신 회차까지의 당첨 빈도 반영</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ <strong>가중치 알고리즘:</strong> 자주 나온 번호는 더 높은 확률로 등장</li>
              <li>✅ <strong>황금 밸런스:</strong> 통계와 무작위성의 조화</li>
            </ul>
          </section>

          {/* Bottom Ad (Mobile Only) */}
          <div className="mobile-ad" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <KakaoAdFit unit="DAN-9ctCyY0uRHWIh1Oy" width={320} height={100} />
          </div>

          <footer style={{ textAlign: 'center', marginTop: '4rem', color: '#888', fontSize: '0.8rem' }}>
            <p>© {new Date().getFullYear()} Lotto Generator. All rights reserved.</p>
            <p style={{ marginTop: '0.5rem' }}>
              * 본 사이트에서 생성된 번호는 무작위로 추출된 것이며, 실제 당첨을 보장하지 않습니다.
            </p>
          </footer>
        </div>

        {/* Right Ad (Desktop Only) */}
        <aside className="desktop-ad">
          <div style={{ position: 'sticky', top: '2rem' }}>
            <KakaoAdFit unit="DAN-EaVEMlrnSzBUF2lT" width={160} height={600} />
          </div>
        </aside>

      </div>

      {/* Global Styles for Media Queries */}
      <style jsx global>{`
        .desktop-ad { display: none; }
        .mobile-ad { display: block; }

        @media (min-width: 1024px) {
          .desktop-ad { display: block; }
          .mobile-ad { display: none; }
        }
      `}</style>
    </main>
  );
}
