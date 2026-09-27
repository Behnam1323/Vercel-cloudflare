import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const [uuid, setUuid] = useState('');
  const [config, setConfig] = useState('');
  const [qrData, setQrData] = useState('');
  const [copied, setCopied] = useState(false);

  // 🔴 مهم: آدرس Cloudflare Worker خودت را اینجا وارد کن
  // مثال: 'your-worker.your-subdomain.workers.dev'
  const WORKER_DOMAIN = 'vcf.ebrahimiannaser645.workers.dev'; 

  const generateConfig = () => {
    // تولید UUID یکتا
    const newUuid = require('crypto').randomUUID();
    setUuid(newUuid);
    
    // ساخت کانفیگ VLESS over WebSocket برای Cloudflare
    // path=%2F یعنی مسیر روت (/)
    const vlessConfig = `vless://${newUuid}@${WORKER_DOMAIN}:443?type=ws&security=tls&host=${WORKER_DOMAIN}&path=%2F#VLESS-Cloudflare-${newUuid.substring(0, 4)}`;
    
    setConfig(vlessConfig);
    setQrData(vlessConfig);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#0f172a', // رنگ پس‌زمینه تیره (Dark Mode)
      minHeight: '100vh',
      color: '#e2e8f0'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          background: 'linear-gradient(90deg, #60a5fa, #a855f7)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>
          🚀 Vercel Xray Panel
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Free VPN Config Generator
        </p>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          onClick={generateConfig} 
          style={{ 
            padding: '14px 32px', 
            fontSize: '16px', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          Generate Config
        </button>
      </div>

      {uuid && (
        <div style={{ 
          marginTop: '20px', 
          padding: '24px', 
          backgroundColor: '#1e293b', 
          borderRadius: '16px', 
          border: '1px solid #334155' 
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#60a5fa', fontSize: '18px' }}>
            ✅ Config Generated
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#cbd5e1' }}>UUID</label>
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#0f172a', 
              borderRadius: '8px', 
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              fontSize: '13px',
              border: '1px solid #334155'
            }}>
              {uuid}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#cbd5e1' }}>VLESS Config</label>
            <textarea 
              value={config} 
              readOnly 
              style={{ 
                width: '100%', 
                height: '100px', 
                padding: '12px', 
                borderRadius: '8px', 
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#94a3b8',
                fontFamily: 'monospace',
                fontSize: '12px',
                resize: 'vertical'
              }}
            />
            <button 
              onClick={() => copyToClipboard(config)}
              style={{ 
                marginTop: '12px', 
                padding: '10px 20px', 
                backgroundColor: '#334155', 
                color: '#e2e8f0', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {copied ? '✅ Copied!' : '📋 Copy Config'}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ 
              backgroundColor: '#fff', 
              padding: '10px', 
              borderRadius: '12px', 
              display: 'inline-block' 
            }}>
              <QRCodeSVG value={qrData} size={200} />
            </div>
          </div>
          
          <p style={{ marginTop: '15px', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
            Scan QR code with V2RayNG, Clash Meta, or Sing-box apps.
          </p>
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: '#475569' }}>
        <p>Powered by Vercel & Cloudflare</p>
      </div>
    </div>
  );
    }
