const getConstructorColor = name => {
  switch (name) {
    case "Mercedes":
      return "#00D2BE";
    case "Ferrari":
      return "#DC0000";
    case "Red Bull":
      return "#1E41FF";
    case "McLaren":
      return "#FF8700";
    case "Renault":
    case "Lotus F1":
    case "Lotus":
      return "#FFF500";
    case "Toro Rosso":
      return "#469BFF";
    case "Alfa Romeo":
    case "Sauber":
      return "#9B0000"
    case "Racing Point":
    case "Force India":
      return "#F596C8"
    case "Haas F1 Team":
      return "#bd9e57"
    case "Williams":
      return "#eee"
    case "Brawn GP":
    case "Brawn":
      return "#65e05e"
    case "Manor Marussia":
    case "Marussia":
      return "#ff5252"
    case "Caterham":
      return "#0a590f"
    case "HRT":
      return "#706406"
    case "Virgin":
      return "#580870"
    case "BMW Sauber":
      return "#06125c"
    default: 
      return "#ccc";
  }
};

export default getConstructorColor;
