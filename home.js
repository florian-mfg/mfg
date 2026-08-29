const desktopLevels = [5, 4, 3, 2, 1];
const mobileLevels = [2, 1, 5, 4, 3];
let scaleLevel = 0;
let activeIntervals = new Map();

/*
  Project order is controlled here.
  Each project uses _1 as the thumbnail and cycles through _1/_2/_3 on desktop hover.
*/
const projects = [
  {
    page: "project-mfg-collective-memory.html",
    title: "Collective Memory",
    images: ["material/mfg-collective_memory-thumbnail-4.jpg", "material/mfg-collective_memory-thumbnail-2.jpg", "material/mfg-collective_memory-thumbnail-3.jpg"],
  },
   {
    page: "project-mfg-sk.html",
    title: "SKW",
    images: ["material/mfg-sk_1.jpg", "material/mfg-sk_2.jpg", "material/mfg-sk_3.jpg"],
  },
  {
    page: "project-mfg-ime.html",
    title: "IME",
    images: ["material/mfg-ime_1.jpg", "material/mfg-ime_2.jpg", "material/mfg-ime_3.jpg"],
  },
  
  {
    page: "project-mfg-imt.html",
    title: "IMT",
    images: ["material/mfg-imt_1.jpg", "material/mfg-imt_2.jpg", "material/mfg-imt_3.jpg"],
  },
  {
    page: "project-mfg-riff.html",
    title: "Riff",
    images: ["material/mfg_riff_1.jpg", "material/mfg_riff_2.jpg", "material/mfg_riff_3.jpg"],
  },
  {
    page: "project-mfg-fsw.html",
    title: "FSW",
    images: ["material/mfg-fsw_1.jpg", "material/mfg-fsw_2.jpg", "material/mfg-fsw_3.jpg"],
  },
  {
    page: "project-mfg-sences.html",
    title: "SEP",
    images: ["material/mfg_sences_1.jpg", "material/mfg_sences_2.jpg", "material/mfg_sences_3.jpg"],
  },
   {
    page: "project-mfg-cmt.html",
    title: "CMT",
    images: ["material/mfg_cmt_1.jpg", "material/mfg_cmt_2.jpg", "material/mfg_cmt_3.jpg"],
  },
  {
    page: "project-mfg-candleholder.html",
    title: "CHP",
    images: ["material/mfg_candleholder_1.jpg", "material/mfg_candleholder_2.jpg", "material/mfg_candleholder_3.jpg"],
  },
  {
    page: "project-mfg-cm.html",
    title: "CMI",
    images: ["material/mfg_cm_4.jpg", "material/mfg_cm_5.jpg", "material/mfg_cm_6.jpg"],
  },
  
  
  {
    page: "project-mfg-fred.html",
    title: "FIP",
    images: ["material/mfg_fred_1.jpg", "material/mfg_fred_2.jpg", "material/mfg_fred_3.jpg"],
  },
  {
    page: "project-mfg-freiheit-weniger.html",
    title: "Freiheit Weniger",
    images: ["material/mfg_freiheit_weniger_1.jpg", "material/mfg_freiheit_weniger_2.jpg", "material/mfg_freiheit_weniger_3.jpg"],
  },
 
  {
    page: "project-mfg-aufdersuche.html",
    title: "Auf der Suche",
    images: ["material/mfg_aufdersuche_1.jpg", "material/mfg_aufdersuche_2.jpg", "material/mfg_aufdersuche_3.jpg"],
  },
  
  {
    page: "project-mfg-mmb.html",
    title: "MMB",
    images: ["material/mfg_mmb_1.jpg", "material/mfg_mmb_2.jpg", "material/mfg_mmb_3.jpg"],
  },
  {
    page: "project-mfg-tisch.html",
    title: "Tisch",
    images: ["material/mfg_tisch_1.jpg", "material/mfg_tisch_2.jpg", "material/mfg_tisch_3.jpg"],
  },
  {
    page: "project-mfg-orlandiposter.html",
    title: "Orlandi Poster",
    images: ["material/mfg_orlandiposter_1.jpg", "material/mfg_orlandiposter_2.jpg", "material/mfg_orlandiposter_3.jpg"],
  },
  
  
  
  {
    page: "project-mfg-tramtram.html",
    title: "Tramtram",
    images: ["material/mfg_tramtram_1.jpg", "material/mfg_tramtram_2.jpg", "material/mfg_tramtram_3.jpg"],
  },
 {
    page: "project-mfg-stream.html",
    title: "Stream",
    images: ["material/mfg_stream_1.jpg", "material/mfg_stream_2.jpg", "material/mfg_stream_3.jpg"],
  },
  {
    page: "project-mfg-orlandimono.html",
    title: "Orlandi Mono",
    images: ["material/mfg_orlandimono_1.jpg", "material/mfg_orlandimono_2.jpg", "material/mfg_orlandimono_3.jpg"],
  },
 
   
  {
    page: "project-mfg-riff-concept.html",
    title: "Riff Concept",
    images: ["material/mfg_riff_concept_1.jpg", "material/mfg_riff_concept_2.jpg", "material/mfg_riff_concept_3.jpg"],
  },
  
  {
    page: "project-mfg-sms.html",
    title: "SMS",
    images: ["material/mfg_sms_1.jpg", "material/mfg_sms_2.jpg", "material/mfg_sms_3.jpg"],
  },
  {
    page: "project-mfg-nextsteps.html",
    title: "Next Steps",
    images: ["material/mfg_nextsteps_1.jpg", "material/mfg_nextsteps_2.jpg", "material/mfg_nextsteps_3.jpg"],
  },
  
  
  {
    page: "project-mfg-mfg-portfolio.html",
    title: "MFG Portfolio",
    images: ["material/mfg_mfg_portfolio_1.jpg", "material/mfg_mfg_portfolio_2.jpg", "material/mfg_mfg_portfolio_3.jpg"],
  },
  
  
  {
    page: "project-mfg-dgw.html",
    title: "DGW",
    images: ["material/mfg_dgw_1.jpg", "material/mfg_dgw_2.jpg", "material/mfg_dgw_3.jpg"],
  },
  
  
  {
    page: "project-mfg-blu.html",
    title: "Blu",
    images: ["material/mfg_blu_1.jpg", "material/mfg_blu_2.jpg", "material/mfg_blu_3.jpg"],
  },
  
  
  {
    page: "project-mfg-stabitype.html",
    title: "Stabitype",
    images: ["material/mfg_stabitype_1.jpg", "material/mfg_stabitype_2.jpg", "material/mfg_stabitype_3.jpg"],
  },
  
  {
    page: "project-mfg-bsb.html",
    title: "BSB",
    images: ["material/mfg_bsb_1.jpg", "material/mfg_bsb_2.jpg", "material/mfg_bsb_3.jpg"],
  },
];

const grid = document.querySelector("#project-grid");
const scaleButton = document.querySelector("#scale-button");

function renderHomeGrid() {
  grid.innerHTML = projects
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
    const hoverFrames = [0, 1, 2];
    let hoverFrame = 0;

    const showFrame = (nextFrame) => {
      images.forEach((image, index) => image.classList.toggle("is-active", index === nextFrame));
    };

    tile.addEventListener("mouseenter", () => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      hoverFrame = 0;
      showFrame(hoverFrames[hoverFrame]);
      activeIntervals.set(
        tile,
        window.setInterval(() => {
          hoverFrame = (hoverFrame + 1) % hoverFrames.length;
          showFrame(hoverFrames[hoverFrame]);
        }, 800)
      );
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
