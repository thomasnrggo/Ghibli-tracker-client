import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../common/components/Layout/Layout';
import Detail from '../../common/components/Detail/Detail';
import EspecificDetail from '../../common/components/EspecificDetail/EspecificDetail';
import Repertorie from '../../common/components/Repertorie/Repertorie';
import {getFilmsDetail} from '../../common/utils/services'

export default function MovieDetail(props) {
  const [films, setFilms] = useState([]);
  const [movie, setMovie] = useState({});
  const router = useRouter();
  const {id} = router.query


  var config = {
    headers: { 'Access-Control-Allow-Origin': '*' },
  };

  // const {
  //   query: { id },
  // } = useRouter();

  /* console.log('ffffffffffffffffffpp' + id); */
  // const getFilms = async () => {
  //   let res = await axios.get(
  //     `https://masterghibli.herokuapp.com/films/`,
  //     config
  //   );
  //   return res.data;
  // };
  const getFilms = async () => {
    let url = `https://masterghibli.herokuapp.com/films/${id}/`
    let res = await axios.get(url)
    console.log('detail',res.data);
    return res.data
  }

  useEffect(() => {
    // let getMovie = async () => {
    //   let res = await axios.get(`https://masterghibli.herokuapp.com/films`)
    //   console.log('OJO',res.data);
    //   return res.data
    // }
    // getMovie()


    getFilmsDetail(id)
    // getFilms()
    //   .then((res) => {
    //     setFilms(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [id]);

  /*   let buscarFilms = films.find(function (edad) {
    return edad.id == id;
  }); */

  /*   const renderFilm = () => {
    let allFilms = films;
  

    allFilms.map((film) => {
      if (film.id === id) {
        setMovie(film);
      }
    });
  };

  if (!movie) {
    return null;
  } */
  return (
    <>
      <Layout>
        {/*  {renderFilm()} */}
        <Detail />
        <EspecificDetail />
        <Repertorie />
      </Layout>
    </>
  );
}
