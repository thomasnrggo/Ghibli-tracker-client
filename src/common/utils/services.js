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

export const postSendScore = async (payLoad) => {
  let url = 'https://masterghibli.herokuapp.com/ratings/';
  let res = await axios.post(url, {
    emoji_rating: payLoad.emojiRating,
    star_rating: payLoad.startRating,
    watched: payLoad.watched,
    user: payLoad.user,
    movie: payLoad.movie,
  });
  return res;
};
