import React from "react";
import SeacrhModal from "../components/SeacrhModal";
import { ImSearch } from "react-icons/im";
import { PiListHeartBold, PiUserBold } from "react-icons/pi";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/animejournal-logo.jpeg";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";
import { backgroundColor, textColor } from "../api/util";
import { useAuthContext } from "../context/AuthContext";

//
export default function Header() {
  const [isModal, setIsModal] = React.useState(false);
  const user = useAuthContext();

  return (
    <>
      <header className="sticky">
        <div className="text-plum-800 flex justify-between items-center px-6 py-1.5 shadow-lg">
          <Link to="/">
            <img src={logo} alt="" className="w-20" />
          </Link>

          <nav className="flex gap-8 items-center text-xl">
            {user && (
              <Link to="/my-anime">
                <PiListHeartBold className={"text-violet-950"} />
              </Link>
            )}

            <Link to="/login">
              <PiUserBold className="text-violet-950" />
            </Link>

            <span
              onClick={() => {
                setIsModal((prev) => !prev);
              }}
            >
              <ImSearch className="text-violet-950" />
            </span>

            {user && (
              <span
                onClick={() => {
                  signOut(auth);
                  console.log("user signed out");
                }}
              >
                <FaSignOutAlt className="text-violet-950" />
              </span>
            )}
          </nav>
        </div>
      </header>
      <SeacrhModal isModal={isModal} setIsModal={setIsModal} />
    </>
  );
}
