const actionChangeTheme = (node: HTMLElement, parameters?: any): SvelteActionReturnType => {
  let isDark = localStorage.getItem("color-theme") === "dark";

  const handleClick = (event: MouseEvent) => {
    localStorage.setItem("color-theme", isDark ? "light" : "dark");
    isDark = window.document.documentElement.classList.toggle("dark");
  };

  node.addEventListener("click", handleClick);

  return {
    destroy: () => {
      node.removeEventListener("click", handleClick);
    },
  };
};

export default actionChangeTheme;
