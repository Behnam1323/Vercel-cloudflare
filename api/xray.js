export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.headers['upgrade'] !== 'websocket') {
    return new Response('Upgrade required', { status: 400 });
  }

  const { socket, response } = new WebSocketPair();
  socket.accept();

  socket.addEventListener('message', async (event) => {
    const data = new Uint8Array(await event.data.arrayBuffer());
    // پردازش داده‌ها
  });

  return new Response(null, {
    status: 101,
    webSocket: socket,
  });
}
