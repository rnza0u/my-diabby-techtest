local modes = {
    'local': {
        addr: '127.0.0.1',
        port: '4000'
    },
    'docker': {
        addr: '0.0.0.0',
        port: '80'
    }
};

local serveTargets = {
  ['serve-' + name]: {
    executor: 'std:commands',
    options: {
      commands: [
        {
          program: './node_modules/.bin/ng',
          arguments: ['serve', '--port', modes[name].port, '--host', modes[name].addr]
        },
      ],
    },
    dependencies: ['install', 'source'],
  }
  for name in ['local', 'docker']
};

{
  targets: {
    install: {
      executor: 'std:commands',
      options: {
        commands: [
          'npm install',
        ],
      },
      cache: {
        invalidateWhen: {
          inputChanges: ['package.json'],
          outputChanges: ['package-lock.json'],
        },
      },
    },
    source: {
      cache: {
        invalidateWhen: {
          inputChanges: [
            'src/**',
            'angular.json',
            'tsconfig*.json',
          ],
        },
      },
    }
  } + serveTargets,
}
