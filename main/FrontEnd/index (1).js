import { initRouter } from "./router/index.js";
import { isAuthenticated } from "./utils/auth.js";

// Initialize router and make it globally accessible
const router = initRouter();
window.router = router;

document.addEventListener("DOMContentLoaded", () => {
  // Check authentication and navigate accordingly
  const currentPath = window.location.pathname;
  
  if (isAuthenticated()) {
    router.navigate(currentPath);
  } else {
    router.navigate("/login");
  }

  router.navigate(currentPath === '/' ? "/login" : currentPath);

  // Handle SPA links globally
  // This will handle all data-link elements throughout the app
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      router.navigate(link.getAttribute("href"));
    }
  });
});
