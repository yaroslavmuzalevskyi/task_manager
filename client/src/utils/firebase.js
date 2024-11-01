// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
	authDomain: 'task-manager-2392d.firebaseapp.com',
	projectId: 'task-manager-2392d',
	storageBucket: 'task-manager-2392d.appspot.com',
	messagingSenderId: '1055018304877',
	appId: '1:1055018304877:web:a79a59478a96b6eddd4664'
}

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
export const app = initializeApp(firebaseConfig)
