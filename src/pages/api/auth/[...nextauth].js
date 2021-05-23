import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Your email here...',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Your password here...',
        },
        async authorize(credentials, req) {
          const user = (credentials, req) => {
            //   Logic to check if the credentials are right and return data to work with
            return null;
          };

          if (user) {
            //   Any user object returned here will be saved in the JSON Web Token. Do not save sensitive data
            return user;
          } else {
            return null;
          }
        },
      },
    }),
  ],
});
