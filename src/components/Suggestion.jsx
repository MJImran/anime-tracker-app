import { useState, useEffect } from "react";
import Card from "./Card";

export default function Suggestion() {
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/top/anime?sfw`)
      .then((res) => {
        if (!res.ok) throw new Error("couldn't fetch anime");
        return res.json();
      })
      .then((data) => {
        setSuggestion(data.data);
        // console.log(suggestion);

        // setIsPending(false);
        // setError(null);
      })
      .catch((err) => {
        // console.log(err);
        // setIsPending(false);
        // setError(err.message);
      });
  }, []);

  const suggestions = suggestion.map((anime, index) => (
    <Card key={index} anime={anime} id={index} />
  ));

  return (
    <>
      {/* <h3 className="font-semibold text-sm">top anime</h3> */}
      <section className="mt-6 px-3 grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {suggestions}
      </section>
    </>
  );
}
