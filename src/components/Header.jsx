import React from "react";
import SeacrhModal from "../components/SeacrhModal";
import { BsSearch } from "react-icons/bs";
import { PiListHeart } from "react-icons/pi";
import { RiHome2Line } from "react-icons/ri";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { send2Db, getData, getMatch, add } from "../api/firebase";

//
export default function Header() {
  const [isModal, setIsModal] = React.useState(false);
  // getMatch("cities", "country", "China");
  return (
    <>
      <header className="sticky ">
        <div className="text-slate-800 flex justify-between items-center px-2 shadow-lg">
          <Link to="/">
            <img src={logo} alt="" className="w-18" />
          </Link>

          <nav className="flex gap-8 items-center text-xl">
            <Link to="/my-anime">
              <PiListHeart />
            </Link>

            <span
              onClick={() => {
                setIsModal((prev) => !prev);
              }}
            >
              <BsSearch />
            </span>
          </nav>
        </div>
      </header>
      <SeacrhModal isModal={isModal} setIsModal={setIsModal} />
    </>
  );
}
