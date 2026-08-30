const siteBar = document.querySelector(".site-bar");

if (siteBar) {
  const directionThreshold = 8;
  let lastScrollY = Math.max(window.scrollY, 0);
  let distanceInDirection = 0;
  let lastDirection = 0;
  let ticking = false;

  function updateSiteBar() {
    const currentScrollY = Math.max(window.scrollY, 0);
    const scrollDelta = currentScrollY - lastScrollY;
    const direction = Math.sign(scrollDelta);
    const isAtPageEnd = currentScrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    const projectPage = document.querySelector(".project-page");

    siteBar.classList.toggle("is-at-page-end", isAtPageEnd);

    if (isAtPageEnd && projectPage) {
      siteBar.style.setProperty("--page-end-arrow-top", `${projectPage.offsetTop + projectPage.offsetHeight}px`);
    }

    if (currentScrollY === 0) {
      siteBar.classList.remove("is-hidden");
      distanceInDirection = 0;
      lastDirection = 0;
    } else if (direction !== 0) {
      if (direction !== lastDirection) {
        distanceInDirection = 0;
        lastDirection = direction;
      }

      distanceInDirection += Math.abs(scrollDelta);

      if (distanceInDirection >= directionThreshold) {
        siteBar.classList.toggle("is-hidden", direction > 0);
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateSiteBar);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", updateSiteBar);

  updateSiteBar();
}
