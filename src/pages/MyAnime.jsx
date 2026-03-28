import React from "react";
import { getCol } from "../api/firebase";
import Card from "../components/Card";
import { useAuthContext } from "../context/AuthContext";

export default function MyAnime() {
  const [list, setList] = React.useState([]);
  const user = useAuthContext();

  React.useEffect(() => {
    getCol("anime", setList, user);
  }, []);

  const myList = list.map((anime, index) => (
    <Card key={index} anime={anime} id={index} />
  ));

  return (
    <section className="mt-6 px-3 grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {myList}
    </section>
  );
}
