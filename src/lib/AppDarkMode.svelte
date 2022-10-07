<script lang="ts">
  let isDark = localStorage.getItem("color-theme") === "dark";

  const toggleTheme = () => {
    localStorage.setItem("color-theme", isDark ? "light" : "dark");
    isDark = window.document.documentElement.classList.toggle("dark");
  };
</script>

<slot {isDark} {toggleTheme} />
