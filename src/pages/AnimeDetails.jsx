import React from "react";
import { useParams } from "react-router-dom";
import { send2Db, getData, getMatch, add } from "../api/firebase";
import { FaRegHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

export default function AnimeDetails() {
  const [animeDetails, setAnimeDetails] = React.useState({});
  const [isTrue, setIsTrue] = React.useState(true);
  const [more, setMore] = React.useState(false);
  const params = useParams();

  React.useEffect(() => {
    async function getAnime() {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${params.id}`);
        if (!res.ok) throw new Error("couldn't fetch anime");
        const data = await res.json();

        setAnimeDetails(data.data);
        setIsTrue(false);
      } catch (err) {
        console.error("an error occured");
      }
    }
    getAnime();
  }, [params]);

  return isTrue ? (
    <div>not yet</div>
  ) : (
    <article className="p-4 flex flex-col gap-4 justify-center px-6 rounded-md text-sm font-semibold">
      <div className="h-100 w-[90vw] overflow-hidden">
        <img
          src={animeDetails.images.jpg.large_image_url}
          alt="anime image"
          className="w-full"
        />
      </div>
      <div className="w-full flex gap-4 items-center">
        <button className="w-4/5 bg-green-500 py-3 text-base uppercase">
          add to list <span className="font-semibold text-xl">+</span>
        </button>
        <button className="w-2/6 bg-blue-500 flex items-center justify-center text-2xl py-3 grow">
          <FaRegHeart />
        </button>
      </div>
      <div>
        <p className="mb-3 text-2xl font-bold text-green-900">
          {animeDetails.title}
        </p>
        <ul className="flex gap-5 text-base item-center capitalize">
          <li className="">{animeDetails.year}</li>
          <li className="">{animeDetails.rating.substring(0, 6)}</li>
          <li>
            {animeDetails.episodes}
            <span className="">
              {animeDetails.episodes > 1 ? " episodes" : " episode"}
            </span>
          </li>
          <li>
            <span className=""> score: </span>
            {animeDetails.score}
          </li>
          <li>{animeDetails.isAiring ? "Airing" : "Not airing"}</li>
        </ul>
        <div className="bg-gray-300 p-2 text-base font-medium tracking-wide leading-[1.8]">
          {more
            ? animeDetails.synopsis
            : animeDetails.synopsis.substring(0, 300)}
          <span className="text-blue-900" onClick={() => setMore(!more)}>
            {more ? "read less" : "read more"}
          </span>
        </div>
      </div>
    </article>
  );
}
