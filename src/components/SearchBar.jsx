export default function SearchBar({ anime, setAnime }) {
  return (
    <input
      className="p-4 md:p-10 shadow-lg rounded-md text-lg sm:text-4xl font-semibold focus:bg-gray-100 w-full self-center"
      type="text"
      placeholder="search anime/manga"
      onChange={(e) => setAnime(e.target.value)}
      value={anime}
      autoFocus
      name="anime-input"
    />
  );
}
