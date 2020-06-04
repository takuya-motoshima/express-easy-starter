module.exports = {
  apps : [
    {
      name: 'app',
      script: 'bin/www.js',
      node_args: '-r esm',
      exec_mode: 'cluster_mode',
      watch: '.',
      watch_delay: 1000,
      ignore_watch : ['node_modules'],
      watch_options: {
        followSymlinks: false
      },
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      env_test: {
        NODE_ENV: 'test',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};
