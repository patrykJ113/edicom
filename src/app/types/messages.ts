export type Messages = {
	'topNav': {
		register: string
		logIn: string
		newListing: string
	}
	'bottomNav': {
		search: string,
		favorites: string,
		add: string,
		messages: string,
		account: string,
	},
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
	'topNav': {
		register: 'register'
		logIn: 'logIn'
		newListing: 'newListing'
	}
	'bottomNav': {
		search: 'search'
		favorites: 'favorites'
		add: 'add'
		messages: 'messages'
		account: 'account'
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
	topNav: 'topNav'
	youreAccountBtn: 'youreAccountBtn'
	bottomNav: 'bottomNav'
}

