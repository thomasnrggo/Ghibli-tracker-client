import axios from 'axios'

// let obj = {
//   emoji_rating: 2,
//   star_rating: 3,
//   user: 1,
//   movie: '0d9ebc22-ce3c-4ff5-bdcc-b7591d1cf9b4',
// }

export const getData = async endpoint => {
  let url = endpoint
  let res = await axios.get(url)
  return res.data
}

export const getFilms = async () => {
  let url = 'https://masterghibli.herokuapp.com/films/'
  let res = await axios.get(url)
  return res.data
}

export const getFilmsDetail = async (id) => {
  let url = `https://masterghibli.herokuapp.com/films/${id}/`
  let res = await axios.get(url)
  return res.data
}

// export const getFilmsDetail = async (id) => {
//   let url = `https://masterghibli.herokuapp.com/ratings/`
//   let res = await axios.post(url, obj)
//   console.log('detail',res.data);
//   return res.data
// }