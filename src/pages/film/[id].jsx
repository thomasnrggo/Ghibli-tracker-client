import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../common/components/Layout/Layout';
import Detail from '../../common/components/Detail/Detail';
import EspecificDetail from '../../common/components/EspecificDetail/EspecificDetail';
import Repertorie from '../../common/components/Repertorie/Repertorie';

export default function MovieDetail(props) {
  const [films, setFilms] = useState([]);
  const [movie, setMovie] = useState({});

  var config = {
    headers: { 'Access-Control-Allow-Origin': '*' },
  };

  const {
    query: { id },
  } = useRouter();

  /* console.log('ffffffffffffffffffpp' + id); */
  const getFilms = async () => {
    let res = await axios.get(
      `https://masterghibli.herokuapp.com/films/`,
      config
    );
    return res.data;
  };

  useEffect(() => {
    getFilms()
      .then((res) => {
        setFilms(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
