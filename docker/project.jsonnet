local upOptionsDev = ['--remove-orphans', '--force-recreate', '--build'];

{
    targets: {
        'compose-dev-local': {
            executor: 'std:commands',
            options: {
                commands: [
                    {
                        program: 'docker',
                        arguments: [
                            'compose',
                            '-f',
                            'docker-compose.dev-local.yml',
                            'up',
                        ] + upOptionsDev
                    }
                ] 
            }
        },
        'compose-dev-docker': {
            executor: 'std:commands',
            options: {
                commands: [
                    {
                        program: 'docker',
                        arguments: [
                            'compose',
                            '-f',
                            'docker-compose.dev-docker.yml',
                            'up',
                        ] + upOptionsDev,
                        environment: {
                            WORKSPACE_ROOT: '{{ root }}',
                            CONFIG_PATH: '{{ root}}/{{ workspace.projects.api.path }}/configuration/dev-docker.json'
                        }
                    }
                ]
            }
        }
    }
}