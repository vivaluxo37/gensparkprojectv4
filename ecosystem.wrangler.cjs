module.exports = {
  apps: [{
    name: 'brokeranalysis-dev',
    script: 'npx',
    args: 'wrangler pages dev dist --port 3000 --compatibility-date 2024-09-25 --ip 0.0.0.0',
    cwd: '/home/user/webapp',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    watch: false,
    max_memory_restart: '1G',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    log_file: './logs/wrangler-dev.log',
    out_file: './logs/wrangler-dev-out.log',
    error_file: './logs/wrangler-dev-error.log'
  }]
};