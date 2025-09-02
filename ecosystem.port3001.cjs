module.exports = {
  apps: [
    {
      name: 'webapp-dev-3001',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=brokeranalysis-production --local --ip 0.0.0.0 --port 3001',
      cwd: '/home/user/webapp',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      log_file: '/home/user/webapp/logs/webapp-3001.log',
      error_file: '/home/user/webapp/logs/error-3001.log',
      out_file: '/home/user/webapp/logs/out-3001.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z'
    }
  ]
};