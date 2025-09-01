export default {
  apps: [{
    name: 'brokeranalysis-sandbox',
    script: 'npm',
    args: 'run dev:sandbox',
    cwd: '/home/user/webapp',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    watch: false,
    ignore_watch: ['node_modules', '.git', 'dist'],
    max_memory_restart: '1G',
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z'
  }]
};