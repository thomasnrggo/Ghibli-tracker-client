import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const user = await axios
          .get('https://masterghibli.herokuapp.com/profiles/')
          .then(({ data }) =>
            data.find((user) => credentials.email === user.email)
          );

        if (user) {
          if (credentials.password === user.password)
            return {
              id: user.id,
              username: user.username,
              name: user.first_name,
              email: user.email,
              image: user.avatar_url,
            };
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
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.picture.data.url,
      };
    },
  }),
  Providers.Twitter({
    name: 'Twitter',
    clientId: process.env.TWITTER_ID,
    clientSecret: process.env.TWITTER_SECRET,
    profile(profile) {
      return {
        id: profile.id,
        username: profile.screen_name,
        name: profile.name,
        email: profile.email,
        image: profile.profile_image_url_https,
      };
    },
  }),
];

const callbacks = {
  async signIn(user, account, profile) {
    const { email, name, image, id } = user;

    const options = {
      credentials: () => true,
      facebook: async () => {
        const userDB = await axios
          .get('https://masterghibli.herokuapp.com/profiles/')
          .then(({ data }) => data.find((user) => email === user.email));

        if (!userDB) {
          const username = name.split(' ');

          axios
            .post('https://masterghibli.herokuapp.com/profiles/', {
              username: `${username[0].toLowerCase()}${id}`,
              first_name: name,
              avatar_url: image,
              email: email,
            })
            .catch((err) => console.log(err.message));
        }
      },
      twitter: async () => {
        const userDB = await axios
          .get('https://masterghibli.herokuapp.com/profiles/')
          .then(({ data }) => data.find((user) => email === user.email));

        if (!userDB) {
          axios
            .post('https://masterghibli.herokuapp.com/profiles/', {
              username: user.username,
              first_name: name,
              avatar_url: image,
              email: email,
            })
            .catch((err) => console.log(err.message));
        }
      },
    };

    options[account.provider || account.type]();
  },
  async jwt(token, user) {
    if (user) {
      const { accessToken } = user;

      token.accessToken = accessToken;
    }

    return token;
  },
  async session(session, token) {
    session.accessToken = token.accessToken;

    return session;
  },
};

const options = {
  providers,
  callbacks,
};

export default (req, res) => NextAuth(req, res, options);
