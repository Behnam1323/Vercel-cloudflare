import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const [uuid, setUuid] = useState('');
  const [config, setConfig] = useState('');
  const [qrData, setQrData] = useState('');

  const generateConfig = () => {
    // تولید UUID یکتا
    const newUuid = require('crypto').randomUUID();
    setUuid(newUuid);
    
    // ساخت کانفیگ VLESS
    // نکته: در حالت مستقیم، path باید /api/ws باشد
    const vlessConfig = `vless://${newUuid}@vercel-vpn-panel.vercel.app:443?type=ws&security=tls&host=vercel-vpn-panel.vercel.app&path=%2Fapi%2Fws#VLESS-Direct`;
    setConfig(vlessConfig);
    setQrData(vlessConfig);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Vercel VPN Panel</h1>
      <p>Generate your VLESS configuration to connect to the internet.</p>
      
      <button 
        onClick={generateConfig} 
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}
      >
        Generate Config
      </button>

      {uuid && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2>UUID: {uuid}</h2>
          <p><strong>Config:</strong></p>
          <textarea 
            value={config} 
            readOnly 
            style={{ width: '100%', height: '50px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <QRCodeSVG value={qrData} size={200} />
          </div>
          <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            اسکن کنید یا کانفیگ را کپی کنید.
          </p>
        </div>
      )}
    </div>
  );
          }
