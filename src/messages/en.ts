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
		titleHint: `Welcome back! Log in with your social account`,
		rememberMe: 'Remember Me',
		forgotPassword: 'Forgot Password?',
		orContinueWithEmail: 'or continue with email',
		noAccount: 'No account ? ',
		emailRequired: 'Email is required',
		emailInvalid: 'Email address has the wrong format',
		passwordRequired: 'Password is required',
		passwordInvalid: `Password must be 8-16 characters, include an uppercase letter, 
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
		emailInvalid: 'Email address has the wrong format',
		passwordRequired: 'Password is required',
		passwordInvalid: `Password must be 8-16 characters, include an uppercase letter, 
		lowercase letter, number, and special character (e.g., ! @ # $)`,
		name: 'Name',
		password: 'Password',
	},
	errors: {
		serverDown: 'Oops! It looks like our servers are down. We\'re working on getting things back to normal'
	}
}

export default messages
