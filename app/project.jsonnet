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
            invalidateWhen: {
                inputChanges: [
                    'src/**', 
                    'angular.json',
                    'tsconfig*.json'
                ]
            }
        },
        serve: {
            executor: 'std:commands',
            options: {
                commands: [
                    './node_modules/.bin/ng serve'
                ]
            }
        }
    }
}