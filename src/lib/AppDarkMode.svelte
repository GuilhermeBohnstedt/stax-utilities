<script lang="ts">
  let isDark = localStorage.getItem("color-theme") === "dark";

  const toggleTheme = () => {
    localStorage.setItem("color-theme", isDark ? "dark" : "light");
    isDark = window.document.documentElement.classList.toggle("dark");
  };
</script>

<svelte:head>
  <script>
    if (window) {
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? window.document.documentElement.classList.add("dark")
        : window.document.documentElement.classList.remove("dark");
    }
  </script>
</svelte:head>

<slot {isDark} {toggleTheme} />
