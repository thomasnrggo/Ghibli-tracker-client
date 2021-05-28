
<h1 align="center">
  <br>
  <a href="#"><img src="https://imgur.com/PUJsZj1.png" alt="Markdownify" width="500"></a>
  <br>
  Studio Ghibli Tracker
  <br>
</h1>

<h4 align="center">Track and rate your favorite movies from <a href="https://ghibli.fandom.com/wiki/Ghibli_Wiki">Studio Ghibli</a></h4>

<!-- <p align="center">
  <a href="https://badge.fury.io/js/electron-markdownify">
    <img src="https://badge.fury.io/js/electron-markdownify.svg"
         alt="Gitter">
  </a>

  <a href="https://gitter.im/amitmerchant1990/electron-markdownify"><img src="https://badges.gitter.im/amitmerchant1990/electron-markdownify.svg"></a>

  <a href="https://saythanks.io/to/amitmerchant1990">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>

  <a href="https://www.paypal.me/AmitMerchant">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p> -->

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#demo">Demo</a> •
  <a href="#specifications">Specifications</a> •
  <a href="#credits">Credits</a> •
  <a href="#collaborators">Collaborators</a>
</p>

![Website screenshot](https://imgur.com/qjhMjWr.png)

## Key Features

- Register to the platform with your email, Twitter, or Facebook account.
- Browse for your favorite movies listed on the homepage.
- Sort the movie list by year, duration, Rotten Tomatoes audience Score, star rate, and emojis.
- See detailed information about each movie.
- You can track the movies you've watched by checking them as "seen".
- In your profile, you can view the average star rating you've made.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/thomasnrggo/Ghibli-tracker-client.git

# Go into the repository
$ cd ghibli-tracker-client

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## Demo

[Ghibli Tracker](https://ghibli-tracker-client.vercel.app/)

## Specifications

### Inputs

#### Text

- In order to use the global styles for text fields you need to do the following pattern:

```html
<div className="input__container">
    <label htmlFor="email" className="input__label">
        Label name
        <input
            type="email"
            name="email"
            id="email"
            className="input"
            placeholder="Your email here..."
        />
    </label>
</div>
```

- If you want to use the styles for success and error state just add the class `.input-error` or `.input-success` to the `.input__container` div:

```html
<div className="input__container input-success">
```

- There's also a helper text if you want to share some instructions to the user. Just add under the `<label>` tag a `<p className="input__helper">` tag with the specified class like this: 

```html
<div className="input__container">
    <label htmlFor="email" className="input__label">
        Label name
        <input
            type="email"
            name="email"
            id="email"
            className="input"
            placeholder="Your email here..."
        />
    </label>

    <p className="input__helper">Your helper text here.</p>
</div>
```

## Credits

This site uses the following open source packages:

- [React.js 17](https://reactjs.org/) • Building the UI
- [Next.js 10.2](https://nextjs.org/) • Managing performance and SEO with SSR and SSG
- [Jest 26.6](https://jestjs.io/) • Testing
- [Vercel](https://vercel.com/) • Deployment

With the supervision of [Erik Ochoa](https://twitter.com/Elyager), Academic Coach at [Platzi Master](https://platzi.com/master/)

## Collaborators

This app was created with 💚 by:

> Anthony Gonzalez &nbsp;&middot;&nbsp;
> [thomasnrggo.com](https://thomasnrggo.com) &nbsp;&middot;&nbsp;
> Web Designer &nbsp;&middot;&nbsp;
> Frontend Developer &nbsp;&middot;&nbsp;
> GitHub [@thomasnrggo](https://github.com/thomasnrggo) &nbsp;&middot;&nbsp;
> Twitter [@thomasnrggo](https://twitter.com/thomasnrggo)

> Juan Daniel Martínez &nbsp;&middot;&nbsp;
> [juanda.dev](https://juanda.dev) &nbsp;&middot;&nbsp;
> Frontend Developer &nbsp;&middot;&nbsp;
> GitHub [@juandadev](https://github.com/juandadev) &nbsp;&middot;&nbsp;
> Twitter [@juanda_dev_](https://twitter.com/juanda_dev_)

> Jonathan Reyes &nbsp;&middot;&nbsp;
> Frontend Developer