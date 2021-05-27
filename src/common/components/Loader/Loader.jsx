import React, { useEffect, useState } from 'react'
import Loader from "react-loader-spinner";
import styles from './Loader.module.scss'

const quotes = [
  {
    quote: "We Each Need To Find Our Own Inspiration. Sometimes That's Not Easy.",
    film: "Kiki's Delivery Service",
    year: "1989"
  },
  {
    quote: "My Heart Is Stronger Now That You're In It.",
    film: "The Secret World Of Arrietty",
    year: "2010"
  },
  {
    quote: "I Love Ponyo Whether She's A Fish, A Human, Or Something In Between.",
    film: "Ponyo",
    year: "2008"
  },
  {
    quote: "Whenever Someone Creates Something With All Of Their Heart, Then That Creation Is Given A Soul.",
    film: "The Cat Returns",
    year: "2002"
  },
  {
    quote: "No Matter How Many Weapons You Have, No Matter How Great Your Technology Might Be, The World Cannot Live Without Love.",
    film: "Castle In The Sky",
    year: "1986"
  },
  {
    quote: "Sometimes You Have To Fight For The Things That Are Worth Fighting For.",
    film: "The Secret World Of Arrietty",
    year: "2010"
  },
  {
    quote: "They Say That The Best Blaze Burns Brightest When Circumstances Are At Their Worst.",
    film: "Howl's Moving Castle",
    year: "2004"
  },
  {
    quote: "Always Believe In Yourself. Do This And No Matter Where You Are, You Will Have Nothing To Fear.",
    film: "The Cat Returns",
    year: "2002"
  },
  {
    quote: "It Doesn’t Really Matter What Color Your Dress Is. What Matters Is The Heart Inside.",
    film: "Kiki's Delivery Service",
    year: "1989"
  },
  {
    quote: "Always Believe In Yourself. Do This And No Matter Where You Are, You Will Have Nothing To Fear.",
    film: "The Cat Returns",
    year: "2002"
  },
  {
    quote: "Everybody, Try Laughing. Then Whatever Scares You Will Go Away!",
    film: "My Neighbor Totoro",
    year: "1988"
  },
  {
    quote: "Life Is Suffering. It Is Hard. The World Is Cursed. But Still, You Find Reasons To Keep On Living.",
    film: "Princess Mononoke",
    year: "1997"
  },
  {
    quote: "Once You've Met Someone, You Never Really Forget Them.",
    film: "Spirited Away",
    year: "2001"
  },
  {
    quote: "Deny Death, And You Deny Life.",
    film: "Tales From Earthsea",
    year: "2006"
  },
]

export default function LoaderComponent(props) {
  const [quote, setQuote] = useState({})

  useEffect(() => {
    let randomQuote = getRandonQuote ()
    console.log(randomQuote);
    setQuote(randomQuote)
  }, [])

  const getRandonQuote = () => {
    let number = Math.floor(Math.random() * (quotes.length - 1 + 1)) + 1;
    return quotes[number]
  }

  return (
    <div className={styles.loader__container}>
      <Loader
        type="BallTriangle"
        color={props.color || "#d1c38b"}
        height={80}
        width={80}
      />
      {quote && (
        <div className={styles.message}>
          <span className={styles.quote}>"{quote.quote || '' }"</span>
          <span className={styles.autor}>{quote.film || ''} - {quote.year}</span>
        </div>
      )}
    </div>
  )
}
