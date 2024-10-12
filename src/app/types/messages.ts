export type Messages = {
	'navigation': {
		register: string
		logIn: string
		newListing: string
	}
	'youreAccountBtn': {
		btnLabel: string
		options: {
			listings: string
			messages: string
			payments: string
			settings: string
			foloved: string
			logOut: string
		}
	}
}

export type MessagesEnum = {
	'navigation': {
		register: 'register'
		logIn: 'logIn'
		newListing: 'newListing'
	}
	'youreAccountBtn': {
		btnLabel: 'btnLabel'
		options: {
			listings: 'options.listings'
			messages: 'options.messages'
			payments: 'options.payments'
			settings: 'options.settings'
			foloved: 'options.foloved'
			logOut: 'options.logOut'
		}
	}
}

export type NameSpaceEnum = {
	navigation: 'navigation'
	youreAccountBtn: 'youreAccountBtn'
}

