import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import users from '../../../common/data/userDBExample.json';

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      const response = users;
      const user = response.find((item) => credentials.email === item.email);

      if (user) {
        console.log('Logged');
        return user;
      } else {
        return null;
      }
    },
  }),
];

const options = {
  providers,
};

export default (req, res) => NextAuth(req, res, options);
