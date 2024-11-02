import { Messages } from '@/types/messages'

const messages: Messages = {
	topNav: {
		register: 'Register',
		logIn: 'Log in',
		newListing: 'New Listing',
	},
	bottomNav: {
		search: 'Search',
		favorites: 'Favorites',
		add: 'Add',
		messages: 'Messages',
		account: 'Account',
	},
	yourAccountBtn: {
		btnLabel: "You're Account",
		options: {
			listings: 'Listings',
			messages: 'Messages',
			payments: 'Payments',
			settings: 'Settings',
			followed: 'Followed',
			logOut: 'Log Out',
		},
	},
	loginForm: {
		signIn: 'Sing In',
		signUp: 'Sing Up',
		title: 'Sign In',
		titleHint: `Hi! Welcome back, you've been missed`,
		rememberMe: 'Remember Me',
		forgotPassword: 'Forgot Password?',
		orSignInWith: 'Or Sign In with',
		dontHaveAnAccount: `Don't have an account? `,
		emailHint: 'email is required',
		passwordHint: `Password must be 8-16 characters, include an uppercase letter, 
						lowercase letter, number, and special character (e.g., ! @ # $)`,
		password: 'Password',
	},
	registerForm: {
		signIn: 'Sing In',
		signUp: 'Sign Up',
		title: 'Create Account',
		titleHint: 'Register with your social account',
		orWithYoureEmail: 'or with you’re email',
		haveAnAccount: 'Have an account ? ',
		nameRequired: 'Name is required',
		emailRequired: 'E-mail is required',
		emailInvalid: 'E-mail is invalid',
		passwordRequired: 'Password is required',
		passwordInvalid: `Password must be 8-16 characters, include an uppercase letter, 
		lowercase letter, number, and special character (e.g., ! @ # $)`,
		name: 'Name',
		password: 'Password',
	},
}

export default messages
