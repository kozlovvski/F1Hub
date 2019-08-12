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
      return "#FFF500";
    case "Toro Rosso":
      return "#469BFF";
    case "Alfa Romeo":
      return "#9B0000"
    case "Racing Point":
      return "#F596C8"
    case "Haas F1 Team":
      return "#bd9e57"
    case "Williams":
      return "#eee"
    default: 
      return "#ccc";
  }
};

export default getConstructorColor;
