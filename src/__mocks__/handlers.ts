import { rest } from 'msw'
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const handlers = [
	rest.post(`${apiUrl}/auth/register`, (req, res, ctx) => {
		return res(
			ctx.status(201),
			ctx.json({ message: 'User registered successfully' }),
		)
	}),
	rest.post(`${apiUrl}/auth/login`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({ message: 'Login successful' }),
		)
	}),
]
