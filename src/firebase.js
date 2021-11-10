import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import secrets from './secrets';

firebase.initializeApp(secrets.firebase);

export const database = firebase.database();
export const auth = firebase.auth();
