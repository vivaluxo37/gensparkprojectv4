module.exports = {
  apps: [
    {
      name: 'webapp-dev-fixed',
      script: 'npm',
      args: 'run dev:sandbox -- --assets=dist --d1=brokeranalysis-production --local --ip 0.0.0.0 --port 3000',
      cwd: '/home/user/webapp',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      log_file: '/home/user/webapp/logs/webapp-fixed.log',
      error_file: '/home/user/webapp/logs/error-fixed.log',
      out_file: '/home/user/webapp/logs/out-fixed.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z'
    }
  ]
};