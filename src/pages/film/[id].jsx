import React, { useEffect } from 'react';
import Layout from '../../common/components/Layout/Layout';
import Detail from '../../common/components/Detail/Detail';
import films from '../../common/data/films.json';

export default function MovieDetail(props) {
  const [films, setFilms] = useState([]);
  /* 
  useEffect(() => {
    fetch(films)
      .then((Response) => Response.json())
      .then((data) => setFilms(data));
  }, []);

  console.log(films);
 */
  return (
    <>
      <Layout>
        <Detail />
      </Layout>
    </>
  );
}
