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
		orSignInWith: string
		dontHaveAnAccount: string
		emailHint: string
		passwordHint: string
		password: string
	}
	registerForm: {
		signIn: string
		signUp: string
		title: string
		titleHint: string
		orSignUpWith: string
		alreadyHaveAnAccount: string
		emailHint: string
		passwordHint: string
		password: string
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
		orSignInWith: 'orSignInWith'
		dontHaveAnAccount: 'dontHaveAnAccount'
		emailHint: 'emailHint'
		passwordHint: 'passwordHint'
		password: 'password'
	}
	registerForm: {
		signIn: 'signIn'
		signUp: 'signUp'
		title: 'title'
		titleHint: 'titleHint'
		orSignUpWith: 'orSignUpWith'
		alreadyHaveAnAccount: 'alreadyHaveAnAccount'
		emailHint: 'emailHint'
		passwordHint: 'passwordHint'
		password: 'password'
	}
}

export type NameSpaceEnum = {
	topNav: 'topNav'
	yourAccountBtn: 'yourAccountBtn'
	bottomNav: 'bottomNav'
	loginForm: 'loginForm'
	registerForm: 'registerForm'
}
