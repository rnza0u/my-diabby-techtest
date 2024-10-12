local modes = {
  'dev-local': {
    addr: '127.0.0.1',
    port: '4000',
  },
  'dev-docker': {
    addr: '0.0.0.0',
    port: '80',
  },
  'e2e-local': {
    addr: '127.0.0.1',
    port: '4000',
  },
};

local serveTargets = {
  ['serve-' + name]: {
    executor: 'std:commands',
    options: {
      commands: [
        {
          program: './node_modules/.bin/ng',
          arguments: ['serve', '--port', modes[name].port, '--host', modes[name].addr],
        },
      ],
    },
    dependencies: ['install', 'source'],
  }
  for name in std.objectFields(modes)
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
          filesMissing: ['node_modules'],
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
    },
    clean: {
      executor: 'std:commands',
      options: {
        commands: [
          'rm -rf node_modules .angular dist',
        ],
      },
    },
  } + serveTargets,
}
