import React from "react";
import { Link } from "react-router";

function Button(props) {
  return (
    <div className="relative text-center group">
      <div className=" aria-hidden absolute -inset-0.5 bg-linear-to-r from-orange-200 via-red-400 to-pink-600 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300"></div>
      <Link to={"/experience"}>
        <button className="relative font-science-gothic px-5 py-3 bg-black rounded-xl w-full group-hover:text-cyan-200 transition transition-300">
          {props.children}
        </button>
      </Link>
    </div>
  );
}

export default Button;
