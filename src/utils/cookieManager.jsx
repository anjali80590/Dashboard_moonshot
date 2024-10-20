export const savePreferences = (prefs) => {
  localStorage.setItem("dashboardPrefs", JSON.stringify(prefs));
};

export const loadPreferences = () => {
  const prefs = localStorage.getItem("dashboardPrefs");
  return prefs ? JSON.parse(prefs) : null;
};
