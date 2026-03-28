import { useState } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import useDebounce from "../hooks/useDebounce";
import { IoMdClose } from "react-icons/io";

export default function SeacrhModal({ isModal, setIsModal }) {
  const [anime, setAnime] = useState("");
  const [list, setList] = useState([]);
  const debouncedSearchValue = useDebounce(anime, 1000);
  const height = list.length >= 1 && isModal ? "7/10" : "fit";

  return (
    isModal && (
      <div className="p-2 fixed top-0 right-0 left-0 bottom-0 bg-slate-300/70 flex justify-center backdrop-blur-md ">
        <section
          className={`mt-15 mb-20 rounded-sm flex flex-col gap-6 h-${height} mx-auto w-full md:w-4/5 lg:w-3/5 shadow-lg p-3 items-center relative`}
        >
          <button
            onClick={() => {
              setIsModal((prev) => !prev);
              setAnime("");
              setList([]);
            }}
            className="absolute -top-12 right-0 font-bold  h-10 w-10 text-slate-600 text-2xl md:text-4xl cursor-pointer "
          >
            <IoMdClose />
          </button>
          <div className="rounded-md w-full self-center">
            <SearchBar anime={anime} setAnime={setAnime} />
          </div>
          {isModal ? (
            <List
              anime={debouncedSearchValue}
              setAnime={setAnime}
              list={list}
              setList={setList}
              setIsModal={setIsModal}
            />
          ) : (
            <div>nothing</div>
          )}
        </section>
      </div>
    )
  );
}
