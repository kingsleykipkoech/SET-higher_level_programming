// Task: logWithTimestamp(message, level)
// Formats current date/time and logs: "[2025-12-10 13:00:00 INFO] message"
function logWithTimestamp(message, level) {
  const time = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`[${time} ${level.toUpperCase()}] ${message}`);
}

logWithTimestamp('Server started', 'info');
logWithTimestamp('Database retry', 'warn');
logWithTimestamp('Connection failed', 'error');

module.exports = { logWithTimestamp };

