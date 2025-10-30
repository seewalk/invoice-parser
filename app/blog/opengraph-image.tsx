/**
 * ============================================================================
 * OG IMAGE FOR BLOG INDEX PAGE
 * ============================================================================
 * 
 * General Open Graph image for /blog landing page.
 */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Elektroluma Blog - Invoice Automation Insights';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '80px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            ⚡
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            Elektroluma
          </div>
        </div>

        {/* Main Heading */}
        <div
          style={{
            display: 'flex',
            fontSize: 80,
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            maxWidth: '900px',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          Invoice Automation Blog
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.4,
            textAlign: 'center',
            maxWidth: '800px',
            marginTop: '32px',
          }}
        >
          Expert insights on invoice processing, automation, and accounting best practices
        </div>

        {/* Footer Stats */}
        <div
          style={{
            display: 'flex',
            gap: '60px',
            marginTop: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              65+
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Articles
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              AI-Powered
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Solutions
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 48,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              UK
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Focused
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}