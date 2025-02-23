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
		options: {
			listings: 'options.listings',
			messages: 'options.messages',
			payments: 'options.payments',
			settings: 'options.settings',
			followed: 'options.followed',
			logOut: 'options.logOut',
		},
	},
	authForm: {
		signIn: 'signIn',
		signUp: 'signUp',
		createAccount: 'createAccount',
		logInWith: 'logInWith',
		registerWith: 'registerWith',
		rememberMe: 'rememberMe',
		forgotPassword: 'forgotPassword',
		orContinueWithEmail: 'orContinueWithEmail',
		orWithYoureEmail: 'orWithYoureEmail',
		noAccount: 'noAccount',
		haveAnAccount: 'haveAnAccount',
		nameRequired: 'nameRequired',
		emailRequired: 'emailRequired',
		emailInvalid: 'emailInvalid',
		passwordRequired: 'passwordRequired',
		passwordInvalid: 'passwordInvalid',
		name: 'name',
		password: 'password',
	},
	errors: {
		serverDown: 'serverDown',
	},
}

export default messagesEnum
