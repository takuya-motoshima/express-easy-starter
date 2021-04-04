import 'module-alias/register';
import app from '../app';
import Debug from 'debug';
import http from 'http';

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string|number): number|string|boolean {
  const port = parseInt(val + '', 10);
  // named pipe
  if (isNaN(port)) return val;

  // port number
  if (port >= 0) return port;
  return false;
}

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Debugger
const debug = Debug('app');

// Listen on provided port, on all network interfaces.
server.listen(port);

// Event listener for HTTP server "error" event.
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
});

// Event listener for HTTP server "listening" event.
server.on('listening', () => {
  function bind() {
    const addr = server.address();
    if (addr === null) return '';
    else if (typeof addr === 'string') return `pipe ${addr}`;
    else if ('port' in addr) return `port ${addr.port}`;
  }
  debug(`Listening on ${bind()}`);
});