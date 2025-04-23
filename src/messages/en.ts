import { Messages } from '@/types/i18n/messages'

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
		options: {
			listings: 'Listings',
			messages: 'Messages',
			payments: 'Payments',
			settings: 'Settings',
			followed: 'Followed',
			logOut: 'Log Out',
		},
	},
	authForm: {
		signIn: 'Sign In',
		signUp: 'Sign Up',
		createAccount: 'Create Account',
		logInWith: `Welcome back! Log in with your social account`,
		registerWith: 'Register with your social account',
		rememberMe: 'Remember Me',
		forgotPassword: 'Forgot Password?',
		orContinueWithEmail: 'or continue with email',
		orWithYoureEmail: 'or with you’re email',
		noAccount: 'No account ? ',
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
		serverDown:
			"Oops! It looks like our servers are down. We're working on getting things back to normal",
	},
}

export default messages
