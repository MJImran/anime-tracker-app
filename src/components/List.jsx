import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function List({ anime, list, setList, setIsModal, setAnime }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!anime) {
      setList([]);
      return;
    }
    setIsPending(true);
    fetch(`https://api.jikan.moe/v4/anime?q=${anime}`)
      .then((res) => {
        if (!res.ok) throw new Error("couldn't fetch anime");

        return res.json();
      })
      .then((data) => {
        setList(data.data);

        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [anime]);

  const items = list.map((item, index) => {
    const image = item.images.webp.image_url;
    const episodes = item.episodes;
    const score = item.score;
    const title = item.title_english || item.title;
    const rating = item.rating;
    const isAiring = item.airing ? "airing" : "not airing";

    return (
      <Link
        to={`/anime-details/${item.mal_id}`}
        onClick={() => {
          setIsModal((prev) => !prev);
          setAnime("");
          setList([]);
        }}
        key={index}
      >
        <article
          className="p-4 flex gap-4 text-black bg-slate-400 opacity-90 hover:opacity-100 rounded-md text-sm font-semibold cursor-pointer"
          // onClick={() => console.log(item.title)}
        >
          <img src={image} alt="" className="w-13" />
          <div>
            <p className="mb-3 text-sm font-semibold">{title}</p>
            <ul className="flex gap-2 text-4 item-center">
              <li className="border-2 border-slate-600 rounded-sm p-0.5">
                {rating}
              </li>
              <li>
                {episodes}
                <span className="italic text-xs">
                  {episodes > 1 ? " episodes" : " episode"}
                </span>
              </li>
              <li>
                <span className="italic text-xs"> rating:</span>
                {score}
              </li>
              <li>{isAiring}</li>
            </ul>
          </div>
        </article>
      </Link>
    );
  });
  return (
    <section className="flex flex-col gap-2 self-center w-full overflow-y-scroll no-scrollbar">
      {isPending && (
        <p className="p-4  flex gap-4 text-black bg-slate-400 opacity-90 hover:opacity-100 rounded-md text-sm font-semibold cursor-pointer">
          Loading...
        </p>
      )}
      {error && (
        <p className="p-4 flex text-center gap-4 text-black bg-slate-400 opacity-90 hover:opacity-100 rounded-md text-sm font-semibold cursor-pointer">
          {error}
        </p>
      )}
      {list && items}
    </section>
  );
}
