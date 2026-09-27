import { WebSocketServer, WebSocket } from 'ws';

let wss;

export default function handler(req, res) {
  // بررسی اینکه آیا درخواست WebSocket است
  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
    res.socket.server.on('upgrade', (request, socket, head) => {
      if (!wss) {
        wss = new WebSocketServer({ noServer: true });
        wss.on('connection', handleConnection);
      }
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });
    return;
  }
  return res.status(200).json({ status: 'ws-server-ready' });
}

function handleConnection(ws) {
  console.log('Client connected to Vercel WebSocket');
  
  ws.on('message', (message) => {
    // اینجا می‌توانید منطق Xray را اضافه کنید
    // یا ترافیک را به یک سرور خارجی بفرستید
    console.log('Received data from client');
    ws.send(Buffer.from('Pong')); // تست ارتباط
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
}
