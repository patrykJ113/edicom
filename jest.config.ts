import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
	dir: './',
})

const config: Config = {
	clearMocks: true,
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@messages/(.*)$': '<rootDir>/src/messages/$1',
		'^@components/(.*)$': '<rootDir>/src/app/components/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@state/(.*)$': '<rootDir>/src/state/$1'
	},
}

export default createJestConfig(config)
