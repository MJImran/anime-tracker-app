import { useState, useEffect } from "react";
import Card from "./Card";
import { backgroundColor, textColor, iconStyle } from "../api/util";

export default function Suggestion() {
  const [suggestion, setSuggestion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const [];

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.jikan.moe/v4/top/anime?sfw`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setSuggestion(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const suggestions = suggestion.map((anime, index) => (
    <Card key={index} anime={anime} id={index} />
  ));

  return (
    <>
      {isLoading && (
        <section className="flex grow-1 items-center justify-center w-4/5 h=[50vh]">
          Loading...
        </section>
      )}
      {!isLoading && error && (
        <section className="flex grow-1 items-center justify-center w-4/5 h=[50vh]">
          {error}
        </section>
      )}
      {!isLoading && !error && (
        <section
          className={`${backgroundColor} px-3 py-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8`}
        >
          {suggestions}
        </section>
      )}
    </>
  );
}
