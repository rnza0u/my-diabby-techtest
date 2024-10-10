{
    targets: {
        install: {
            executor: 'std:commands',
            options: {
                commands: [
                    'npm install'
                ]
            },
            cache: {
                invalidateWhen: {
                    inputChanges: ['package.json'],
                    outputChanges: ['package-lock.json']
                }
            }
        },
        source: {
            cache: {
                invalidateWhen: {
                    inputChanges: ['src/**', 'tsconfig*.json']
                }
            }
        },
        serve: {
            executor: 'std:commands',
            options: {
                commands: [
                    'npm run start:dev'
                ]
            },
            dependencies: ['install', 'source']
        },
        build: {
            executor: 'std:commands',
            options: {
                commands: [
                    'npm run build'
                ]
            },
            cache: {
                invalidateWhen: {
                    outputChanges: ['dist/**']
                }
            },
            dependencies: ['install', 'source']
        }
    }
}