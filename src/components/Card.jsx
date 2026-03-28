import React from "react";
import { Link } from "react-router-dom";

export default function Card({ anime }) {
  // console.log(anime.mal_id);

  const image = anime.images.webp.image_url;
  const episodes = anime.episodes;
  const score = anime.score;
  const title = anime.title_english || anime.title;
  const rating = anime.rating;
  const isAiring = anime.airing ? "airing" : "not airing";
  return (
    <Link to={`/anime-details/${anime.mal_id}`}>
      <figure className="h-67 flex flex-col items-center p-1 rounded-lg">
        <img src={image} alt="" className="h-4/5 rounded-lg" />
        <p className="text-sm text-center">{title}</p>
      </figure>
    </Link>
  );
}
