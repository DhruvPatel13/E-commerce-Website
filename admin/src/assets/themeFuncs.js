// DARK
const applyDarkTheme = () => {
  document.documentElement.style.setProperty("--greyText", "white");
  document.documentElement.style.setProperty("--borderBlack", "white");
  document.documentElement.style.setProperty("--shadow-rgb", "70, 70, 70");
  document.documentElement.style.setProperty("--borderGrey", "#555");
  document.documentElement.style.setProperty("--background-color", "#111521");
  document.documentElement.style.setProperty("--color", "white");
  document.documentElement.style.setProperty("--inputBackground", "#2f3b549a");
  document.documentElement.style.setProperty("--gradient1", "0, 168, 150");
  document.documentElement.style.setProperty("--gradient2", "123, 237, 159");
  localStorage.setItem("theme", "dark");
};

// LIGHT
const applyLightTheme = () => {
  document.documentElement.style.setProperty("--inputBackground", "#2f3b5417");
  document.documentElement.style.setProperty("--greyText", "#000000a7");
  document.documentElement.style.setProperty("--borderBlack", "black");
  document.documentElement.style.setProperty("--shadow-rgb", "145,145,145");
  document.documentElement.style.setProperty("--borderGrey", "#d3d1d1");
  document.documentElement.style.setProperty(
    "--background-color",
    "whitesmoke"
  );
  document.documentElement.style.setProperty("--color", "black");
  document.documentElement.style.setProperty("--gradient1", "0, 115, 255");
  document.documentElement.style.setProperty("--gradient2", "136, 17, 255");
  localStorage.setItem("theme", "light");
};

export { applyDarkTheme, applyLightTheme };
