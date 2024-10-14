import { Messages } from '@/app/types/messages'

const messages: Messages = {
	topNav: {
		register: 'Zarejestrój się',
		logIn: 'Zaloguj się',
		newListing: 'Nowe ogłoszenie',
	},
	bottomNav: {
		search: 'Szukaj',
		favorites: 'Ulubione',
		add: 'Dadaj',
		messages: 'Wiadomości',
		account: 'Konto'
	},
	youreAccountBtn: {
		btnLabel: 'Twoje Konto',
		options: {
			listings: 'Ogłoszenia',
			messages: 'Wiadmości',
			payments: 'Płatności',
			settings: 'Ustawienia',
			foloved: 'Obserwowane',
			logOut: 'Wyloguj się',
		},
	},
}

export default messages
