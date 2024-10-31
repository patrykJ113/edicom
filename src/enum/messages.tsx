import { MessagesEnum } from '../types/messages'

const messagesEnum: MessagesEnum = {
	topNav: {
		register: 'register',
		logIn: 'logIn',
		newListing: 'newListing',
	},
	bottomNav: {
		search: 'search',
		favorites: 'favorites',
		add: 'add',
		messages: 'messages',
		account: 'account',
	},
	yourAccountBtn: {
		btnLabel: 'btnLabel',
		options: {
			listings: 'options.listings',
			messages: 'options.messages',
			payments: 'options.payments',
			settings: 'options.settings',
			followed: 'options.followed',
			logOut: 'options.logOut',
		},
	},
	loginForm: {
		signIn: 'signIn',
		signUp: 'signUp',
		title: 'title',
		titleHint: 'titleHint',
		rememberMe: 'rememberMe',
		forgotPassword: 'forgotPassword',
		orSignInWith: 'orSignInWith',
		dontHaveAnAccount: 'dontHaveAnAccount',
		emailHint: 'emailHint',
		passwordHint: 'passwordHint',
		password: 'password'
	},
	registerForm: {
		signIn: 'signIn',
		signUp: 'signUp',
		title: 'title',
		titleHint: 'titleHint',
		orSignUpWith: 'orSignUpWith',
		alreadyHaveAnAccount: 'alreadyHaveAnAccount',
		emailHint: 'emailHint',
		passwordHint: 'passwordHint',
		password: 'password'
	},
}

export default messagesEnum
