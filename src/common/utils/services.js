import axios from 'axios'

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