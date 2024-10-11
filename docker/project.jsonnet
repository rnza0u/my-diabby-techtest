local modes = {
  'dev-local': {
    composeFile: 'docker-compose.dev-local.yml',
    env: {},
  },
  'dev-docker': {
    composeFile: 'docker-compose.dev-docker.yml',
    env: {
      WORKSPACE_ROOT: '{{ root }}',
      CONFIG_PATH: '{{ root}}/{{ workspace.projects.api.path }}/configuration/dev-docker.json',
      UID: '{{ shell "id -u" trim=true }}',
    },
  },
};

local upTargets = {
  [name + '-up']: {
    executor: 'std:commands',
    options: {
      commands: [
        {
          program: 'docker',
          arguments: [
            'compose',
            '-f',
            modes[name].composeFile,
            'up',
            '--remove-orphans',
            '--force-recreate',
            '--build',
          ],
          environment: modes[name].env,
        },
      ],
    },
  } for name in std.objectFields(modes)
};

local downTargets = {
  [name + '-clean']: {
    executor: 'std:commands',
    options: {
      commands: [
        {
          program: 'docker',
          arguments: [
            'compose',
            '-f',
            modes[name].composeFile,
            'down',
            '--volumes',
            '--remove-orphans'
          ],
          environment: modes[name].env,
        },
      ],
    },
  } for name in std.objectFields(modes)
};

{
  targets: upTargets + downTargets,
}
