import server from './src/server.js';

const PORT = 3001;
const HOST = '127.0.0.1';

server.listen(PORT, () => {
  console.log(`Serving in : http://${HOST}:${PORT}`);
});
