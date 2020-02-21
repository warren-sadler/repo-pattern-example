module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    transform: {
        '^.+\\.ts': 'ts-jest',
    },
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.ts',
    moduleFileExtensions: ['ts', 'js','json', 'node'],
}