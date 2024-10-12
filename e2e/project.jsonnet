{
    targets: {
        'run-local': {
            executor: 'std:commands',
            options: {
                commands: [
                    {
                        program: './node_modules/.bin/playwright',
                        arguments: ['test'],
                        environment: {
                            DB_HOST: '127.0.0.1',
                            DB_PORT: '4002',
                            DB_USERNAME: 'postgres',
                            DB_PASSWORD: 'postgres',
                            DB_POSTGRES: 'postgres',
                            DB_DATABASE: 'e2e',
                            APP_ORIGIN: 'http://127.0.0.1:4000'
                        }
                    }
                ]
            }
        },
        clean: {
            executor: 'std:commands',
            options: {
                commands: ['rm -rf node_modules playwright-report test-results']
            }
        }
    }
}