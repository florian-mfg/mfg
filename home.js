const desktopLevels = [5, 4, 3, 2, 1];
const mobileLevels = [1, 2, 3, 4, 5];
let scaleLevel = 0;
let activeIntervals = new Map();

/*
  Project order is controlled here.
  Each project uses _1 as the thumbnail and _2/_3 for the desktop hover cycle.
*/
const projects = [
  // Project 1
  {
    page: "project-mfg-skw.html",
    title: "SKW",
    images: ["material/mfg-sk_1.jpg", "material/mfg-sk_2.jpg", "material/mfg-sk_3.jpg"],
  },
  // Project 2
  {
    page: "project-mfg-food-reduce.html",
    title: "Food Reduce",
    images: ["material/mfg-riff_1.jpg", "material/mfg-riff_2.jpg", "material/mfg-riff_3.jpg"],
  },
  
  // Project 3
  {
    page: "project-mfg-imprint.html",
    title: "Imprint",
    images: ["material/mfg-imprint_1.jpg", "material/mfg-imprint_2.jpg", "material/mfg-imprint_3.jpg"],
  },
  // Project 4
  {
    page: "project-mfg-cm-typo.html",
    title: "CM Typo",
    images: ["material/mfg-cm_typo_1.jpg", "material/mfg-cm_typo_2.jpg", "material/mfg-cm_typo_3.jpg"],
  },
  // Project 5
  {
    page: "project-mfg-orlandi.html",
    title: "Orlandi",
    images: ["material/mfg_orlandi_1.jpg", "material/mfg_orlandi_2.jpg", "material/mfg_orlandi_3.jpg"],
  },
  // Project 6
  {
    page: "project-mfg-candleholder.html",
    title: "Candleholder",
    images: ["material/mfg_candleholder_1.jpg", "material/mfg_candleholder_2.jpg", "material/mfg_candleholder_3.jpg"],
  },
];

const grid = document.querySelector("#project-grid");
const scaleButton = document.querySelector("#scale-button");

function renderHomeGrid() {
  const repeatedProjects = Array.from({ length: 6 }, () => projects).flat();

  grid.innerHTML = repeatedProjects
    .map(
      (project, projectIndex) => `
        <a
          class="project-tile"
          href="${project.page}"
          data-tile-index="${projectIndex}"
          aria-label="View ${project.title}"
        >
          ${project.images
            .map(
              (image, imageIndex) => `
                <img
                  class="project-tile__image ${imageIndex === 0 ? "is-active" : ""}"
                  src="${image}"
                  alt="${project.title}"
                  loading="${projectIndex < 10 ? "eager" : "lazy"}"
                />
              `
            )
            .join("")}
          <span class="project-tile__caption">
            <span>${project.title}</span>
            <span>View Project</span>
          </span>
        </a>
      `
    )
    .join("");

  setupHoverCycling();
}

function setupHoverCycling() {
  document.querySelectorAll(".project-tile").forEach((tile) => {
    const images = Array.from(tile.querySelectorAll(".project-tile__image"));
    let frame = 0;

    const showFrame = (nextFrame) => {
      frame = nextFrame % images.length;
      images.forEach((image, index) => image.classList.toggle("is-active", index === frame));
    };

    tile.addEventListener("mouseenter", () => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      showFrame(1);
      activeIntervals.set(tile, window.setInterval(() => showFrame(frame + 1), 800));
    });

    tile.addEventListener("mouseleave", () => {
      window.clearInterval(activeIntervals.get(tile));
      activeIntervals.delete(tile);
      showFrame(0);
    });
  });
}

function updateScale() {
  document.documentElement.style.setProperty("--columns", desktopLevels[scaleLevel]);
  document.documentElement.style.setProperty("--mobile-columns", mobileLevels[scaleLevel]);
}

scaleButton.addEventListener("click", () => {
  scaleLevel = (scaleLevel + 1) % desktopLevels.length;
  updateScale();
});

renderHomeGrid();
updateScale();
