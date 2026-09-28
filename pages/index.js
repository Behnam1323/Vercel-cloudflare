import React, { useState } from 'react';

// تابع تولید UUID ساده
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// تابع تبدیل URL به QR Code (استفاده از API عمومی گوگل برای سادگی)
function getQRCodeUrl(data) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
}

export default function Home() {
  const [uuid, setUuid] = useState('');
  const [config, setConfig] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    // کمی تاخیر برای نمایش حالت لودینگ
    setTimeout(() => {
      const newUuid = generateUUID();
      setUuid(newUuid);
      
      // آدرس دامنه Vercel خودت را اینجا بنویس
      const domain = "vcf.ebrahimiannaser645.workers.dev"; 
      
      // ساخت کانفیگ VLESS
      const path = encodeURIComponent('/');
      const newConfig = `vless://${newUuid}@${domain}:443?type=ws&security=tls&path=${path}#VLESS-${newUuid.substring(0, 4)}`;
      
      setConfig(newConfig);
      setQrUrl(getQRCodeUrl(newConfig));
      setLoading(false);
    }, 500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '500px', width: '100%', padding: '24px', background: '#1e293b', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px', color: '#60a5fa' }}>🚀 Vercel VPN Panel</h1>
        
        <button 
          onClick={handleGenerate} 
          disabled={loading}
          style={{ width: '100%', padding: '14px', background: loading ? '#475569' : '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Generating...' : 'Generate Config'}
        </button>

        {uuid && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#94a3b8' }}>UUID</label>
              <input type="text" value={uuid} readOnly style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#cbd5e1', fontFamily: 'monospace' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#94a3b8' }}>VLESS Config</label>
              <textarea 
                value={config} 
                readOnly 
                style={{ width: '100%', height: '80px', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#cbd5e1', fontFamily: 'monospace', resize: 'vertical' }} 
              />
              <button onClick={() => copyToClipboard(config)} style={{ width: '100%', padding: '12px', background: '#334155', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>
                {copied ? '✅ Copied!' : '📋 Copy Config'}
              </button>
            </div>

            <div style={{ textAlign: 'center' }}>
              {qrUrl && <img src={qrUrl} alt="QR Code" style={{ borderRadius: '12px', border: '4px solid white' }} />}
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>Scan with V2RayNG / Clash</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
    }
