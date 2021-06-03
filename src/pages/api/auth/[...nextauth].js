import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        // const response = users;
        // const user = response.find((item) => credentials.email === item.email);

        // if (user) {
        //   console.log(`User logged: ${user.username}`);
        //   return user;
        // }

        const user = await axios
          .get('https://masterghibli.herokuapp.com/profiles/')
          .then(({ data }) =>
            data.find((user) => credentials.email === user.email)
          );

        if (user) {
          if (credentials.password === user.password) return user;
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
    profile(profile) {
      console.log(profile);
      return profile;
    },
  }),
  Providers.Twitter({
    name: 'Twitter',
    clientId: process.env.TWITTER_ID,
    clientSecret: process.env.TWITTER_SECRET,
    profile(profile) {
      console.log(profile);
      return profile;
    },
  }),
];

const callbacks = {
  async signIn(user, account, profile) {},
  async jwt(token, user, account, profile, isNewUser) {
    if (user) {
      const { accessToken } = user;

      token.accessToken = accessToken;
    }

    return token;
  },
  async session(session, user) {
    session.accessToken = user.accessToken;

    return session;
  },
};

const options = {
  providers,
};

export default (req, res) => NextAuth(req, res, options);
