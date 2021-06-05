import axios from 'axios';

export const getData = async (endpoint) => {
  let url = endpoint;
  let res = await axios.get(url);
  return res.data;
};

export const getFilms = async () => {
  let url = 'https://masterghibli.herokuapp.com/films/';
  let res = await axios.get(url);
  return res.data;
};

export const getFilmsDetail = async (id) => {
  let url = `https://masterghibli.herokuapp.com/films/${id}/`;
  let res = await axios.get(url);
  return res.data;
};

export const getFilmsByUser = async (id) => {
  let url = `https://masterghibli.herokuapp.com/ratings/?user=${id}`;
  let res = await axios.get(url);
  return res.data;
};

export const checkFilmRating = async (user, movie) => {
  let url = `https://masterghibli.herokuapp.com/ratings/?user=${user}&movie=${movie}`;
  let res = await axios.get(url);
  return res.data;
};

export const saveFilmRate = async (rate) => {
  let url = 'https://masterghibli.herokuapp.com/ratings/';

  const ratingExists = await axios
    .get(
      `https://masterghibli.herokuapp.com/ratings/?user=${rate.user}&movie=${rate.movie}`
    )
    .then(({ data }) => data);

  if (ratingExists.length === 0) {
    let res = await axios.post(url, { ...rate });

    return res.data;
  }

  let res = await axios.put(
    `https://masterghibli.herokuapp.com/ratings/${ratingExists[0].id}/`,
    { ...rate }
  );

  return res.data;
};

export const updateFilmRate = async (rate) => {
  let url = 'https://masterghibli.herokuapp.com/ratings/';
  let res = await axios.put(url, rate);
  return res.data;
};

export const postSendScore = async (payLoad) => {
  let url = 'https://masterghibli.herokuapp.com/ratings/';

  const ratingExists = await axios
    .get(
      `https://masterghibli.herokuapp.com/ratings/?user=${payLoad.user}&movie=${payLoad.movie}`
    )
    .then(({ data }) => data);

  if (ratingExists.length === 0) {
    let res = await axios.post(url, {
      emoji_rating: payLoad.emojiRating,
      star_rating: payLoad.startRating,
      watched: payLoad.watched,
      user: payLoad.user,
      movie: payLoad.movie,
    });

    return res.data;
  }

  let res = await axios.put(url, {
    emoji_rating: payLoad.emojiRating,
    star_rating: payLoad.startRating,
    watched: payLoad.watched,
    user: payLoad.user,
    movie: payLoad.movie,
  });

  return res.data;
};
