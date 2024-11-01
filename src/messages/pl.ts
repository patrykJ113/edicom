import { Messages } from '@/types/messages'

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
		account: 'Konto',
	},
	yourAccountBtn: {
		btnLabel: 'Twoje Konto',
		options: {
			listings: 'Ogłoszenia',
			messages: 'Wiadmości',
			payments: 'Płatności',
			settings: 'Ustawienia',
			followed: 'Obserwowane',
			logOut: 'Wyloguj się',
		},
	},
	loginForm: {
		signIn: 'Zaloguj się',
		signUp: 'Zarejestruj się',
		title: 'Zaloguj się',
		titleHint: 'Cześć! Dobrze cię znowu widzieć, tęskniliśmy za tobą',
		rememberMe: 'Zapamiętaj mnie',
		forgotPassword: 'Zapomniałeś hasła?',
		orSignInWith: 'Lub zaloguj się za pomocą',
		dontHaveAnAccount: 'Nie masz konta? ',
		emailHint: 'Email jest wymagany',
		passwordHint:
			'Hasło musi mieć 8-16 znaków, zawierać wielką literę, małą literę, cyfrę oraz znak specjalny (np. ! @ # $)',
		password: 'Hasło',
	},
	registerForm: {
		signIn: 'Zaloguj się',
		signUp: 'Zarejestruj się',
		title: 'Utwórz konto',
		titleHint: 'Zarejestruj się na swoim koncie społecznościowym',
		orWithYoureEmail: 'lub adresu e-mail',
		haveAnAccount: 'Masz konto ? ',
		emailHint: 'Email jest wymagany',
		passwordHint:
			'Hasło musi mieć 8-16 znaków, zawierać wielką literę, małą literę, cyfrę oraz znak specjalny (np. ! @ # $)',
		password: 'Hasło',
	},
}

export default messages
