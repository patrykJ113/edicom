export type Messages = {
	topNav: {
		register: string
		logIn: string
		newListing: string
	}
	bottomNav: {
		search: string
		favorites: string
		add: string
		messages: string
		account: string
	}
	yourAccountBtn: {
		options: {
			listings: string
			messages: string
			payments: string
			settings: string
			followed: string
			logOut: string
		}
	}
	authForm: {
		signIn: string
		signUp: string
		createAccount: string
		logInWith: string
		registerWith: string
		rememberMe: string
		forgotPassword: string
		orContinueWithEmail: string
		orWithYoureEmail: string
		noAccount: string
		haveAnAccount: string
		nameRequired: string
		emailRequired: string
		emailInvalid: string
		passwordRequired: string
		passwordInvalid: string
		name: string
		password: string
	}
	errors: {
		serverDown: string
	}
}

export type MessagesEnum = {
	topNav: {
		register: 'register'
		logIn: 'logIn'
		newListing: 'newListing'
	}
	bottomNav: {
		search: 'search'
		favorites: 'favorites'
		add: 'add'
		messages: 'messages'
		account: 'account'
	}
	yourAccountBtn: {
		options: {
			listings: 'options.listings'
			messages: 'options.messages'
			payments: 'options.payments'
			settings: 'options.settings'
			followed: 'options.followed'
			logOut: 'options.logOut'
		}
	}
	authForm: {
		signIn: 'signIn'
		signUp: 'signUp'
		createAccount: 'createAccount'
		logInWith: 'logInWith'
		registerWith: 'registerWith'
		rememberMe: 'rememberMe'
		forgotPassword: 'forgotPassword'
		orContinueWithEmail: 'orContinueWithEmail'
		orWithYoureEmail: 'orWithYoureEmail'
		noAccount: 'noAccount'
		haveAnAccount: 'haveAnAccount'
		nameRequired: 'nameRequired'
		emailRequired: 'emailRequired'
		emailInvalid: 'emailInvalid'
		passwordRequired: 'passwordRequired'
		passwordInvalid: 'passwordInvalid'
		name: 'name'
		password: 'password'
	}
	errors: {
		serverDown: 'serverDown'
	}
}

export type NameSpaceEnum = {
	topNav: 'topNav'
	yourAccountBtn: 'yourAccountBtn'
	bottomNav: 'bottomNav'
	errors: 'errors'
	authForm: 'authForm'
}
