module.exports = {
  apps: [{
    name: 'brokeranalysis-vite-dev',
    script: 'npm',
    args: 'run dev',
    cwd: '/home/user/webapp',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    watch: false,
    max_memory_restart: '1G',
    log_file: './logs/vite-dev.log',
    out_file: './logs/vite-dev-out.log',
    error_file: './logs/vite-dev-error.log'
  }]
};