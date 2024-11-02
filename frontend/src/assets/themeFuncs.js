const setThemeProperties = (themeSettings) => {
  Object.keys(themeSettings).forEach((key) => {
    document.documentElement.style.setProperty(key, themeSettings[key]);
  });
};

const applyDarkTheme = () => {
  const darkThemeSettings = {
    "--greyText": "white",
    "--borderBlack": "white",
    "--shadow-rgb": "70, 70, 70",
    "--borderGrey": "#555",
    "--background-color": "#111521",
    "--color": "white",
    "--inputBackground": "#2f3b549a",
    "--gradient1": "0, 168, 150",
    "--gradient2": "123, 237, 159",
  };
  setThemeProperties(darkThemeSettings);
  localStorage.setItem("theme", "dark");
};

const applyLightTheme = () => {
  const lightThemeSettings = {
    "--greyText": "#000000a7",
    "--borderBlack": "black",
    "--shadow-rgb": "145,145,145",
    "--borderGrey": "#d3d1d1",
    "--background-color": "whitesmoke",
    "--color": "black",
    "--inputBackground": "#2f3b5417",
    "--gradient1": "0, 115, 255",
    "--gradient2": "136, 17, 255",
  };
  setThemeProperties(lightThemeSettings);
  localStorage.setItem("theme", "light");
};

export { applyDarkTheme, applyLightTheme };
