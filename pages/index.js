import { useState } from 'react';

export default function Home() {
  const [uuid, setUuid] = useState('');
  const [config, setConfig] = useState('');
  const [copied, setCopied] = useState(false);
  const [protocol, setProtocol] = useState('vless');

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuid = generateUUID();
    setUuid(newUuid);
    
    // 🔴 آدرس دامنه Vercel خودت را اینجا دقیق وارد کن
    const domain = "vcf.ebrahimiannaser645.workers.dev";
    
    let newConfig = '';
    
    if (protocol === 'vless') {
      newConfig = `vless://${newUuid}@${domain}:443?type=ws&security=tls&path=/&encryption=none#${newUuid.substring(0, 4)}`;
    } else if (protocol === 'trojan') {
      // Trojan usually requires a password, we use UUID as password here
      newConfig = `trojan://${newUuid}@${domain}:443?type=ws&security=tls&path=/#${newUuid.substring(0, 4)}`;
    } else {
      // VMess needs base64 encoding which is complex in pure client-side without libraries
      // For simplicity, we stick to VLESS/Trojan in this simple UI
      alert("VMess requires a complex base64 config string. Please use VLESS or Trojan.");
      return;
    }

    setConfig(newConfig);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Xray Vercel Panel</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <button 
          onClick={() => setProtocol('vless')} 
          style={{ padding: '10px 20px', border: protocol === 'vless' ? '2px solid #0070f3' : '1px solid #555', background: protocol === 'vless' ? '#0070f3' : '#333', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
        >VLESS</button>
        <button 
          onClick={() => setProtocol('trojan')} 
          style={{ padding: '10px 20px', border: protocol === 'trojan' ? '2px solid #0070f3' : '1px solid #555', background: protocol === 'trojan' ? '#0070f3' : '#333', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
        >Trojan</button>
      </div>

      <button 
        onClick={handleGenerate} 
        style={{ width: '100%', padding: '15px', fontSize: '18px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' }}
      >
        Generate Config
      </button>

      {uuid && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#2a2a2a', borderRadius: '8px', border: '1px solid #444' }}>
          <h3>UUID</h3>
          <p style={{ wordBreak: 'break-all', fontFamily: 'monospace', color: '#aaa' }}>{uuid}</p>

          <h3>{protocol.toUpperCase()} Config</h3>
          <textarea 
            value={config} 
            readOnly 
            style={{ width: '100%', height: '80px', marginBottom: '10px', padding: '10px', backgroundColor: '#111', color: '#0f0', border: '1px solid #555', borderRadius: '5px' }} 
          />
          <button 
            onClick={copyToClipboard} 
            style={{ padding: '10px 20px', backgroundColor: '#555', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
          >
            {copied ? 'Copied! ✅' : 'Copy Config'}
          </button>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(config)}`} 
              alt="QR Code" 
              style={{ border: '1px solid #555', borderRadius: '8px' }}
            />
            <p style={{ marginTop: '10px', color: '#888' }}>Scan with V2RayNG / Surfboard</p>
          </div>
        </div>
      )}
    </div>
  );
    }
