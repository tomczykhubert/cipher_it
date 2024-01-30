import React from "react";
export default function Navbar() {
  const MENU = [
    {
      title: "Szyfr cezara",
      link: "caesar",
    },
    {
      title: "Szyfr polibiusza",
      link: "polybius",
    },
    {
      title: "Szyfr homofoniczny",
      link: "homophonic",
    },
    {
      title: "Szyfr Tritemiusza",
      link: "trithemius",
    },
  ];
  return (
    <div className="navbar">
      <div className="navbar-links">
        {MENU.map((menuItem) => {
          return (
            <a
              key={menuItem.link + "ID"}
              href={menuItem.link}
              className="navbar-link"
            >
              {menuItem.title}
            </a>
          );
        })}
      </div>
      <div className="logo-div">
        <div className="web-name">CipherIT</div>
        <img src="logo.svg" alt="CipherIT logo" className="logo" />
      </div>
    </div>
  );
}
