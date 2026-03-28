import React from "react";
import SeacrhModal from "../components/SeacrhModal";
import { ImSearch } from "react-icons/im";
import { PiListHeartBold, PiUserBold } from "react-icons/pi";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/journal.png";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";
import { backgroundColor, textColor, iconStyle } from "../api/util";
import { useAuthContext } from "../context/AuthContext";

//
export default function Header() {
  const [isModal, setIsModal] = React.useState(false);
  const user = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      {/* <header className="sticky"> */}
      <div
        className={`sticky text-plum-800 flex justify-between items-center h-20 pr-8 md:h-26 md:py-10`}
      >
        <Link to="/">
          <div className="w-26 md:w-40">
            <img src={logo} alt="" className="w-full" />
          </div>
        </Link>

        <nav className="flex gap-9 items-center sm:gap-15 lg:gap-19 ">
          {user && (
            <Link to="/my-anime">
              <PiListHeartBold className={`${iconStyle}`} />
            </Link>
          )}

          {!user && (
            <Link to="/login">
              <PiUserBold className={`${iconStyle}`} />
            </Link>
          )}

          <span
            onClick={() => {
              setIsModal((prev) => !prev);
            }}
          >
            <ImSearch className={`${iconStyle}`} />
          </span>

          {user && (
            <span
              onClick={() => {
                signOut(auth);
                navigate("/login");
              }}
            >
              <FaSignOutAlt className={`${iconStyle}`} />
            </span>
          )}
        </nav>
      </div>
      {/* </header> */}
      <SeacrhModal isModal={isModal} setIsModal={setIsModal} />
    </>
  );
}
