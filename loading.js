(() => {
  const page = document.querySelector('.loading-page');
  const button = page.querySelector('button');
  const progress = page.querySelector('[role="progressbar"]');
  // Returning visitors keep their project-grid position.
  const navigation = performance.getEntriesByType('navigation')[0];
  const referrer = document.referrer && new URL(document.referrer);
  const showIntro = new URLSearchParams(location.search).has('intro');
  if (!showIntro && (navigation?.type === 'back_forward' || (referrer && referrer.origin === location.origin))) return;

  page.hidden = false;
  document.documentElement.classList.add('is-loading');
  const started = performance.now();
  let target = 0;
  let current = 0;
  let loaded = false;
  let finished = false;

  function animate(now) {
    const limit = loaded ? Math.max(current, Math.min(100, (now - started) / 12)) : target;
    current += (limit - current) * .09;
    if (loaded && limit === 100 && current > 99.8) current = 100;
    const displayed = Math.floor(current);
    progress.textContent = `${displayed}/100`;
    progress.setAttribute('aria-valuenow', String(displayed));
    if (current < 100) {
      requestAnimationFrame(animate);
    } else {
      finished = true;
      button.disabled = false;
      button.setAttribute('aria-label', 'Enter project overview');
      page.classList.add('is-ready');
      window.setTimeout(() => { progress.hidden = true; }, 2000);
    }
  }
  requestAnimationFrame(animate);

  document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('body > main');
    const nav = document.querySelector('.site-bar');
    content.inert = true;
    nav.inert = true;
    // Only the initial preview for each project gates entry to the overview.
    const images = [...content.querySelectorAll('.project-tile__image.is-active')];
    let settled = 0;
    const previewsReady = images.map(image => new Promise(resolve => {
      const update = () => {
        target = 100 * (++settled / images.length);
        resolve();
      };
      if (image.complete) update();
      else {
        image.addEventListener('load', update, { once: true });
        image.addEventListener('error', update, { once: true });
      }
    }));
    Promise.all(previewsReady).then(() => { loaded = true; });
    button.addEventListener('click', () => {
      if (!finished) return;
      finished = false;
      button.disabled = true;
      const completeTransition = () => {
        if (page.hidden) return;
        page.hidden = true;
        document.documentElement.classList.remove('is-loading');
        content.inert = false;
        nav.inert = false;
        const firstProject = content.querySelector('a');
        firstProject?.focus({ preventScroll: true });
      };
      page.addEventListener('transitionend', (event) => {
        if (event.target === page && event.propertyName === 'opacity') completeTransition();
      });
      page.classList.add('is-leaving');
      // Also finish if the browser suppresses transition events.
      window.setTimeout(completeTransition,
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 250);
    });
  }, { once: true });
})();
