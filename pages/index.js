import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const [uuid, setUuid] = useState('');
  const [config, setConfig] = useState('');
  const [qrData, setQrData] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 🔴 این آدرس را به دامنه خودت تغییر بده
  // مثال: 'vercel-vpn-panel.vercel.app'
  const WORKER_DOMAIN = 'vcf.ebrahimiannaser645.workers.dev'; 

  const generateConfig = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // تولید UUID جدید (استاندارد v4)
      const newUuid = crypto.randomUUID();
      setUuid(newUuid);
      
      // ساخت کانفیگ VLESS
      // type=ws: وب‌اساکت
      // security=tls: برای پورت 443
      // path=/xray: مسیر باید با Worker هماهنگ باشد (اینجا فرض بر root است)
      const path = encodeURIComponent('/'); 
      const vlessConfig = `vless://${newUuid}@${WORKER_DOMAIN}:443?type=ws&security=tls&path=${path}#VLESS-${newUuid.substring(0, 4)}`;
      
      setConfig(vlessConfig);
      setQrData(vlessConfig);
    } catch (err) {
      setError('Error generating config: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '500px', width: '90%', padding: '24px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px', background: 'linear-gradient(90deg, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🚀 Vercel Xray Panel
        </h1>
        
        {error && <div style={{ color: '#ef4444', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

        <button 
          onClick={generateConfig} 
          disabled={isLoading}
          style={{ width: '100%', padding: '14px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? 'Generating...' : 'Generate Config'}
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
              <div style={{ background: 'white', padding: '10px', borderRadius: '12px', display: 'inline-block' }}>
                <QRCodeSVG value={qrData} size={200} />
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>Scan with V2RayNG / Clash</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
