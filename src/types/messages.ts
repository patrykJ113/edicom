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
		btnLabel: string
		options: {
			listings: string
			messages: string
			payments: string
			settings: string
			followed: string
			logOut: string
		}
	}
	loginForm: {
		signIn: string
		signUp: string
		title: string
		titleHint: string
		rememberMe: string
		forgotPassword: string
		orContinueWithEmail: string
		noAccount: string
		emailRequired: string
		emailInvalid: string
		passwordRequired: string
		passwordInvalid: string
		password: string
	}
	registerForm: {
		signIn: string
		signUp: string
		title: string
		titleHint: string
		orWithYoureEmail: string
		haveAnAccount: string
		nameRequired: string
		emailRequired: string
		emailInvalid: string
		passwordRequired: string
		passwordInvalid: string
		password: string
		name: string
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
		btnLabel: 'btnLabel'
		options: {
			listings: 'options.listings'
			messages: 'options.messages'
			payments: 'options.payments'
			settings: 'options.settings'
			followed: 'options.followed'
			logOut: 'options.logOut'
		}
	}
	loginForm: {
		signIn: 'signIn'
		signUp: 'signUp'
		title: 'title'
		titleHint: 'titleHint'
		rememberMe: 'rememberMe'
		forgotPassword: 'forgotPassword'
		orContinueWithEmail: 'orContinueWithEmail'
		noAccount: 'noAccount'
		emailRequired: 'emailRequired'
		emailInvalid: 'emailInvalid'
		passwordRequired: 'passwordRequired'
		passwordInvalid: 'passwordInvalid'
		password: 'password'
	}
	registerForm: {
		signIn: 'signIn'
		signUp: 'signUp'
		title: 'title'
		titleHint: 'titleHint'
		orWithYoureEmail: 'orWithYoureEmail'
		haveAnAccount: 'haveAnAccount'
		nameRequired: 'nameRequired'
		emailRequired: 'emailRequired'
		emailInvalid: 'emailInvalid'
		passwordRequired: 'passwordRequired'
		passwordInvalid: 'passwordInvalid'
		password: 'password'
		name: 'name'
	}
	errors: {
		serverDown: 'serverDown'
	}
}

export type NameSpaceEnum = {
	topNav: 'topNav'
	yourAccountBtn: 'yourAccountBtn'
	bottomNav: 'bottomNav'
	loginForm: 'loginForm'
	registerForm: 'registerForm'
	errors: 'errors'
}
