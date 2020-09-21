import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div id="menu">
      <NavLink
        to="/songs"
        className="menuOption"
        activeStyle={{
          fontWeight: "bold",
          color: "white",
        }}
      >
        Songs
      </NavLink>
      <NavLink
        to="/playlists"
        className="menuOption"
        activeStyle={{
          fontWeight: "bold",
          color: "white",
        }}
      >
        Playlists
      </NavLink>
      <NavLink
        to="/artists"
        className="menuOption"
        activeStyle={{
          fontWeight: "bold",
          color: "white",
        }}
      >
        Artists
      </NavLink>
      <NavLink
        to="/albums"
        className="menuOption"
        activeStyle={{
          fontWeight: "bold",
          color: "white",
        }}
      >
        Albums
      </NavLink>
    </div>
  );
}
