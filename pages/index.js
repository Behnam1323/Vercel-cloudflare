import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const [uuid, setUuid] = useState('');
  const [config, setConfig] = useState('');
  const [qrData, setQrData] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🔴 آدرس Cloudflare Worker خود را اینجا وارد کنید
  // مثال: 'my-vpn-worker.your-subdomain.workers.dev'
  const WORKER_DOMAIN = 'vcf.ebrahimiannaser645.workers.dev'; 

  const generateConfig = async () => {
    setIsLoading(true);
    
const generate = () => {
    // تولید UUID ساده
    const newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    
    // ساخت کانفیگ VLESS
    // type=ws: استفاده از وب‌اساکت برای عبور از فیلترینگ
    // path=/ : مسیر اصلی
    const vlessConfig = `vless://${newUuid}@${WORKER_DOMAIN}:443?type=ws&security=tls&host=${WORKER_DOMAIN}&path=%2F#VLESS-${newUuid.substring(0, 4)}`;
    
    setConfig(vlessConfig);
    setQrData(vlessConfig);
    setIsLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🚀 Vercel Xray Panel</h1>
        
        <button 
          className="btn-primary" 
          onClick={generateConfig} 
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Config'}
        </button>

        {uuid && (
          <div style={{ marginTop: '20px' }}>
            
            {/* UUID Section */}
            <div className="input-group">
              <label>UUID</label>
              <input type="text" value={uuid} readOnly />
            </div>

            {/* Config Section */}
            <div className="input-group">
              <label>VLESS Config</label>
              <textarea value={config} readOnly />
              <button className="btn-secondary" onClick={() => copyToClipboard(config)}>
                {copied ? '✅ Copied!' : '📋 Copy Config'}
              </button>
            </div>

            {/* QR Code Section */}
            <div className="qr-container">
              <div className="qr-box">
                <QRCodeSVG value={qrData} size={200} />
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>
                Scan with V2RayNG / Clash / Sing-box
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
            }
