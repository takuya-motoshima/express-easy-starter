const PORT = 3001;

module.exports = {
  apps : [
    {
      name: 'sample',
      script: 'bin/www.js',
      node_args: '-r esm',
      exec_mode: 'cluster_mode',
      watch: '.',
      watch_delay: 3000,
      ignore_watch : [
        'node_modules',
        'public',
        '.git'
      ],
      watch_options: {
        followSymlinks: false,
        usePolling: true
      },
      env: {
        NODE_ENV: 'development',
        PORT
      },
      env_test: {
        NODE_ENV: 'test',
        PORT
      },
      env_production: {
        NODE_ENV: 'production',
        PORT
      }
    }
  ]
};
