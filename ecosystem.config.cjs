module.exports = {
  apps: [
    {
      name: 'webapp-dev',
      script: 'npm',
      args: 'run dev:sandbox',
      cwd: '/home/user/webapp',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      log_file: '/home/user/webapp/logs/webapp.log',
      error_file: '/home/user/webapp/logs/error.log',
      out_file: '/home/user/webapp/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z'
    }
  ]
};