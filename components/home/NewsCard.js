import Image from 'next/image'
import styles from '../../styles/components/home/NewsCard.module.css';
import React, { useState, useRef, useEffect } from "react";

export default function NewsCard(props) {
  console.log("NewsCard props: ", props);
  const newsArticle = useRef(props.article);
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  const displayDate = (date) => {
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  };


  useEffect(() => {
    newsArticle.current.innerHTML = props.article;
  }, [props.article]);

  return (
    <div className={styles.main}>
      <h3>{`${displayDate(props.date)} - ${props.title}`}</h3>
      
      {props.image &&
        <Image src={props.image} alt="Image of News"></Image>
      }
      {props.article &&  
        <>
          <div ref={newsArticle} />
        </>
      }
    </div>
  );
}