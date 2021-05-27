import NextAuth from 'next-auth';
import { session } from 'next-auth/client';
import Providers from 'next-auth/providers';
import users from '../../../common/data/userDBExample.json';

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const response = users;
        const user = response.find((item) => credentials.email === item.email);

        if (user) {
          console.log(`User logged: ${user.username}`);
          return user;
        }
      } catch (e) {
        const { message } = e.response.data;

        throw new Error(`${message}&email=${credentials.email}`);
      }
    },
  }),
  Providers.Facebook({
    name: 'Facebook',
    clientId: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
  }),
];

const options = {
  providers,
};

export default (req, res) => NextAuth(req, res, options);
