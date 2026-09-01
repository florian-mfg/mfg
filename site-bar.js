const siteBar = document.querySelector(".site-bar");

if (siteBar) {
  const directionThreshold = 8;
  const projectBackIcon = siteBar.querySelector(".project-back__icon");
  const projectPage = document.querySelector(".project-page");
  let lastScrollY = Math.max(window.scrollY, 0);
  let distanceInDirection = 0;
  let lastDirection = 0;
  let ticking = false;

  if (projectBackIcon) {
    projectBackIcon.loading = "eager";
    projectBackIcon.fetchPriority = "high";
    projectBackIcon.decoding = "sync";
  }

  function updateSiteBar() {
    const currentScrollY = Math.max(window.scrollY, 0);
    const scrollDelta = currentScrollY - lastScrollY;
    const direction = Math.sign(scrollDelta);
    const viewportBottom = window.visualViewport
      ? window.visualViewport.offsetTop + window.visualViewport.height
      : window.innerHeight;
    const isAtPageEnd = projectPage
      ? projectPage.getBoundingClientRect().bottom <= viewportBottom + 4
      : currentScrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;

    siteBar.classList.toggle("is-at-page-end", isAtPageEnd);

    if (isAtPageEnd && projectPage) {
      siteBar.style.setProperty("--page-end-arrow-top", `${projectPage.offsetTop + projectPage.offsetHeight}px`);
    }

    if (isAtPageEnd) {
      siteBar.classList.remove("is-hidden");
      distanceInDirection = 0;
      lastDirection = 0;
    } else if (currentScrollY === 0) {
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

  function requestUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateSiteBar);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("load", requestUpdate);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", requestUpdate);
  }

  if (projectPage && "ResizeObserver" in window) {
    new ResizeObserver(requestUpdate).observe(projectPage);
  }

  updateSiteBar();
}
