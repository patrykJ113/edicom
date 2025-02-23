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
		options: {
			listings: 'Ogłoszenia',
			messages: 'Wiadmości',
			payments: 'Płatności',
			settings: 'Ustawienia',
			followed: 'Obserwowane',
			logOut: 'Wyloguj się',
		},
	},
	authForm: {
		signIn: 'Zaloguj się',
		signUp: 'Zarejestruj się',
		createAccount: 'Utwórz konto',
		logInWith: 'Witamy ponownie! Zaloguj się za pomocą konta społecznościowego',
		registerWith: 'Zarejestruj się kontem społecznościowym',
		rememberMe: 'Zapamiętaj mnie',
		forgotPassword: 'Zapomniałeś hasła?',
		orContinueWithEmail: 'lub kontynuuj przez e-mail',
		orWithYoureEmail: 'lub użyj adresu e-mail',
		noAccount: 'Nie masz konta ? ',
		haveAnAccount: 'Masz konto ? ',
		nameRequired: 'Nazwa jest wymagana',
		emailRequired: 'Email jest wymagany',
		emailInvalid: 'Adres e-mail ma nieprawidłowy forma',
		passwordRequired: 'Hasło jest wymagane',
		passwordInvalid: 'Hasło musi mieć 8-16 znaków, zawierać wielką literę, małą literę, cyfrę oraz znak specjalny (np. ! @ # $)',
		name: 'Nazwa',
		password: 'Hasło',
	},
	errors: {
		serverDown:
			'Ups! Wygląda na to, że nasze serwery nie działają. Spróbuj ponownie później',
	},
}

export default messages
