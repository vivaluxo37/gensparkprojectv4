module.exports = {
  apps: [{
    name: 'brokeranalysis-dev',
    script: 'npx',
    args: 'wrangler pages dev dist --port 3000 --compatibility-date 2024-09-25',
    cwd: '/home/user/webapp',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    watch: false,
    max_memory_restart: '1G',
    log_file: './logs/wrangler.log',
    out_file: './logs/wrangler-out.log',
    error_file: './logs/wrangler-error.log'
  }]
};