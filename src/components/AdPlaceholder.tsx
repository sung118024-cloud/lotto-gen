'use client';

interface AdPlaceholderProps {
    format: 'vertical' | 'horizontal';
    className?: string;
    slotId?: string; // For future real AdSense slot ID
}

export default function AdPlaceholder({ format, className = '', slotId = '0000000000' }: AdPlaceholderProps) {
    const isVertical = format === 'vertical';

    return (
        <div className={className} style={{
            width: isVertical ? '160px' : '100%',
            height: isVertical ? '600px' : '100px',
            backgroundColor: '#f0f0f0',
            border: '1px dashed #ccc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: '0.8rem',
            margin: '1rem auto',
            overflow: 'hidden'
        }}>
            <span style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Google AdSense</span>
            <span>{isVertical ? '160 x 600' : 'Responsive / 320x100'}</span>
            {/* 
        In production, replace this div with the actual <ins> tag script.
        Example:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slotId}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
        </div>
    );
}
