export default function SearchBar({ anime, setAnime }) {
  return (
    <input
      className="p-3 shadow-lg rounded-md text-lg font-semibold focus:bg-gray-100 w-full self-center  "
      type="text"
      placeholder="search anime/manga"
      onChange={(e) => setAnime(e.target.value)}
      value={anime}
      autoFocus
      name="anime-input"
    />
  );
}
