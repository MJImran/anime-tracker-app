import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { add2Db } from "../api/firebase";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
import { useAuthContext } from "../context/AuthContext";
import {
  primaryColor,
  backgroundColor,
  textColor,
  iconStyle,
} from "../api/util";

export default function AnimeDetails() {
  const [animeDetails, setAnimeDetails] = React.useState({});
  const [hasAdded, setHasAdded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [more, setMore] = React.useState(false);
  const params = useParams();
  const user = useAuthContext();

  React.useEffect(() => {
    async function getAnime() {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${params.id}`);
        if (!res.ok) throw new Error("couldn't fetch anime");
        const data = await res.json();

        setAnimeDetails(data.data);
        setIsLoading(false);
      } catch (err) {
        console.error("an error occured");
      }
    }
    getAnime();
  }, [params]);

  return isLoading ? (
    <div className="flex grow-1 items-center justify-center w-4/5 h=[50vh]">
      Loading...
    </div>
  ) : (
    <article
      className={`${backgroundColor} flex flex-col gap-4 justify-center rounded-md text-sm font-semibold items-center py-4`}
    >
      <div className="h-120 w-[90vw] overflow-hidden rounded-xl">
        <img
          src={animeDetails.images.jpg.large_image_url}
          alt="anime image"
          className="w-full"
        />
      </div>
      <div className="w-full px-4 flex flex-col">
        <p className="mb-2 text-2xl font-bold text-green-900 tracking-tight">
          {animeDetails.title_english || animeDetails.title}
        </p>
        <div className="flex gap-4 justify-between">
          <ul className="flex text-base tracking-wide font-semibold  gap-2 item-center capitalize w-5/6">
            <li className={`bg${primaryColor} p-3`}>
              {animeDetails.rating.substring(0, 6)}
            </li>
            <li className="flex gap-1 items-center">
              <FaStar className="inline" />
              {animeDetails.score}
            </li>
            <li className="flex items-center">
              <RxDotFilled className="inline" />
              {animeDetails.year}
            </li>

            <li className="flex items-center">
              <RxDotFilled className="inline" />
              {`${animeDetails.episodes} ${animeDetails.episodes > 1 ? " episodes" : " episode"}`}

              {}
            </li>

            {/* <li>{animeDetails.isAiring ? "Airing" : "Not airing"}</li> */}
          </ul>
          <button>
            <FaRegHeart className="text-2xl" />
          </button>
        </div>
        <button
          className="w-full rounded-4xl bg-green-500 py-3 text-base uppercase cursor-pointer"
          onClick={() => {
            if (user) {
              add2Db(
                "anime",
                { ...animeDetails, isInList: true, uid: user.uid },
                setHasAdded,
              );
            } else {
              alert("login to add");
              // return navigate("/login");
            }
          }}
        >
          {hasAdded ? "remove from list" : "add to list"}
        </button>
      </div>
      <div className="px-4">
        <div className="p-2 text-base font-medium tracking-normal leading-[1.8]">
          {more
            ? animeDetails.synopsis
            : animeDetails.synopsis.substring(0, 302)}
          <span className="text-blue-900" onClick={() => setMore(!more)}>
            {more ? " read less" : " read more"}
          </span>
        </div>
      </div>
    </article>
  );
}
