import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const [uuid, setUuid] = useState('');
  const [config, setConfig] = useState('');

  const generateConfig = () => {
    const newUuid = require('uuid').v4();
    setUuid(newUuid);
    
    // ساخت کانفیگ VLESS
    const vlessConfig = `vless://${newUuid}@vercel-vpn-panel.vercel.app:443?type=ws&security=tls&host=vercel-vpn-panel.vercel.app&path=%2Fxray#VLESS-WS`;
    setConfig(vlessConfig);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>VPN Panel</h1>
      <button onClick={generateConfig}>Generate Config</button>
      {uuid && (
        <div>
          <h2>UUID: {uuid}</h2>
          <p>Config:</p>
          <pre>{config}</pre>
          <QRCodeSVG value={config} />
        </div>
      )}
    </div>
  );
  }
