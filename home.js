const desktopLevels = [5, 4, 3];
const mobileLevels = [3, 2, 1];
let scaleLevel = window.matchMedia("(max-width: 700px)").matches ? 1 : 0;
let activeIntervals = new Map();

/*
  Project order is controlled here.
  Each project uses _1 as the thumbnail and cycles through _1/_2/_3 on desktop hover.
*/
const projects = [
  {
    page: "project-mfg-anisotropy.html",
    title: "ARA",
    images: ["material/mfg-anisotropy-thumbnail-1.jpg", "material/mfg-anisotropy-thumbnail-2.jpg", "material/mfg-anisotropy-thumbnail-3.jpg"],
  },
  {
    page: "project-mfg-collective-memory.html",
    title: "CMT",
    images: ["material/mfg-collective_memory-thumbnail-4.jpg", "material/mfg-collective_memory-thumbnail-2.jpg", "material/mfg-collective_memory-thumbnail-3.jpg"],
  },
   {
    page: "project-mfg-sk.html",
    title: "SKW",
    images: ["material/mfg-sk_1.jpg", "material/mfg-sk_2.jpg", "material/mfg-sk_3.jpg"],
  },
  {
    page: "project-mfg-imp.html",
    title: "IMP",
    images: ["material/mfg-ime_1.jpg", "material/mfg-ime_2.jpg", "material/mfg-ime_3.jpg"],
  },
  
  {
    page: "project-mfg-imt.html",
    title: "IMT",
    images: ["material/mfg-imt_1.jpg", "material/mfg-imt_2.jpg", "material/mfg-imt_3.jpg"],
  },
  {
    page: "project-mfg-riff.html",
    title: "RFI",
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
    images: ["projects/mfg-sences-poster-1.jpg", "projects/mfg-sences-poster-8.jpg", "projects/mfg-sences-poster-2.jpg"],
  },
   {
    page: "project-mfg-cmt.html",
    title: "CMT",
    images: ["projects/mfg-cmt-2.jpg", "projects/mfg-cmt-5.jpg", "projects/mfg-cmt-11.jpg"],
  },
  {
    page: "project-mfg-candleholder.html",
    title: "CHP",
    images: ["material/mfg_candleholder_1.jpg", "material/mfg_candleholder_2.jpg", "material/mfg_candleholder_3.jpg"],
  },
  {
    page: "project-mfg-orlandimono.html",
    title: "OMT",
    images: ["projects/mfg-orlandi_mono-1.jpg", "projects/mfg-orlandi_mono-2.jpg", "projects/mfg-orlandi_mono-3.jpg"],
  },
  {
    page: "project-mfg-cmi.html",
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
    title: "FWE",
    images: ["material/mfg-freiheit-21.jpg", "material/mfg-freiheit-22.jpg", "material/mfg-freiheit-23.jpg"],
  },
 
  {
    page: "project-mfg-aufdersuche.html",
    title: "ASW",
    images: ["projects/mfg-aufdersuche-1.jpg", "projects/mfg-aufdersuche-5.jpg", "projects/mfg-aufdersuche-6.jpg"],
  },
  
  {
    page: "project-mfg-mmb.html",
    title: "MBA",
    images: ["material/mfg-mmb-4-thumb.jpg", "material/mfg-mmb-2-thumb.jpg", "material/mfg-mmb-3-thumb.jpg"],
  },
   {
    page: "project-mfg-bsb.html",
    title: "BSI",
    images: ["projects/mfg-bsb-1.jpg", "projects/mfg-bsb-18.jpg", "projects/mfg-bsb-3.jpg"],
  },
  {
    page: "project-mfg-tisch.html",
    title: "CTP",
    images: ["material/mfg_tisch_1.jpg", "material/mfg_tisch_2.jpg", "material/mfg_tisch_3.jpg"],
  },
  {
    page: "project-mfg-orlandiposter.html",
    title: "OMP",
    images: ["material/mfg_orlandiposter_1.jpg", "material/mfg_orlandiposter_2.jpg", "projects/mfg-orlandi_mono_specimen-3.jpg"],
  },
      
  {
    page: "project-mfg-tramtram.html",
    title: "TTT",
    images: ["material/mfg_tramtram_1.jpg", "material/mfg_tramtram_2.jpg", "material/mfg_tramtram_3.jpg"],
  },
  {
    page: "project-mfg-sms.html",
    title: "SMW",
    images: ["projects/mfg-sms-33.jpg", "projects/mfg-sms-35.jpg", "projects/mfg-sms-34.jpg"],
  },
 {
    page: "project-mfg-stream.html",
    title: "STW",
    images: ["material/mfg-stream-2-thumb.jpg", "material/mfg-stream-1-thumb.jpg", "material/mfg-stream-3-thumb.jpg"],
  },

  {
    page: "project-mfg-productivityguide.html",
    title: "PGM",
    images: ["projects/mfg-productivityguide-7.jpg", "projects/mfg-productivityguide-6.jpg", "projects/mfg-productivityguide-3.jpg"],
  },
  
   
  {
    page: "project-mfg-riff-concept.html",
    title: "RFC",
    images: ["projects/mfg-rfc-10.jpg", "projects/mfg-rfc-5.jpg", "projects/mfg-rfc-3.jpg"],
  },
  
  

  {
    page: "project-mfg-nextsteps.html",
    title: "NSW",
    images: ["projects/mfg-nextsteps-13.jpg", "projects/mfg-nextsteps-4.jpg", "projects/mfg-nextsteps-5.jpg"],
  },

  // 
   
  {
    page: "project-mfg-dgw.html",
    title: "DWE",
    images: ["projects/mfg-wahrnehmung-thumb.jpg", "projects/mfg-wahrnehmung-3.jpg", "projects/mfg-wahrnehmung-6.jpg"],
  },
    
  {
    page: "project-mfg-blu.html",
    title: "BLI",
    images: ["projects/mfg-blu-1.jpg", "projects/mfg-blu-3.jpg", "projects/mfg-blu-5.jpg"],
  },
  {
    page: "project-mfg-kleineschritte.html",
    title: "KSP",
    images: ["projects/mfg-kleineschritte-1.jpg", "projects/mfg-kleineschritte-3.jpg", "projects/mfg-kleineschritte-2.jpg"],
  },
  {
    page: "project-mfg-portfolio_web_I.html",
    title: "MPW-I",
    images: ["projects/mfg-portfolio_web_first-4.jpg", "projects/mfg-portfolio_web_first-5.jpg", "projects/mfg-portfolio_web_first-6.jpg"],
  },
  {
    page: "project-mfg-portfolio_web_II.html",
    title: "MPW-II",
    images: ["projects/mfg-portfolio_web_first-4.jpg", "projects/mfg-portfolio_web_first-5.jpg", "projects/mfg-portfolio_web_first-6.jpg"],
  },


  // {
  //   page: "project-mfg-stabitype.html",
  //   title: "STT",
  //   images: ["material/mfg_stabitype_1.jpg", "material/mfg_stabitype_2.jpg", "material/mfg_stabitype_3.jpg"],
  // },
  
  
  
 
];

const grid = document.querySelector("#project-grid");
const scaleButtons = Array.from(document.querySelectorAll(".site-bar__scale-option"));
const homeViewKey = "mfg-home-view";

function readHomeView() {
  try {
    // History keeps each landing-page visit separate when using Back/Forward.
    let view = window.history.state?.[homeViewKey];
    const referrer = document.referrer ? new URL(document.referrer) : null;
    const returningFromProject = referrer && projects.some(
      (project) => new URL(project.page, window.location.href).href === referrer.href
    );

    if (!view && returningFromProject) {
      view = JSON.parse(window.sessionStorage.getItem(homeViewKey));
    }

    if (view && Number.isFinite(view.scrollY) && view.scrollY >= 0 &&
        Number.isInteger(view.scaleLevel) && view.scaleLevel >= 0 &&
        view.scaleLevel < desktopLevels.length) {
      return view;
    }
  } catch {
    // Navigation still works when browser storage is unavailable.
  }
  return null;
}

function saveHomeView() {
  const view = { scrollY: Math.max(0, window.scrollY), scaleLevel };
  try {
    window.history.replaceState({ ...window.history.state, [homeViewKey]: view }, "");
  } catch {
    // Session storage can still preserve the view if history is unavailable.
  }
  try {
    window.sessionStorage.setItem(homeViewKey, JSON.stringify(view));
  } catch {
    // Browser Back can still restore the current history entry.
  }
}

const savedHomeView = readHomeView();
if (savedHomeView) {
  scaleLevel = savedHomeView.scaleLevel;
  window.history.scrollRestoration = "manual";
}

grid.addEventListener("click", (event) => {
  if (event.target.closest(".project-tile")) saveHomeView();
});
window.addEventListener("pagehide", saveHomeView);
window.addEventListener("pageshow", (event) => {
  // A cached page already has its original layout and scroll position.
  if (!event.persisted && savedHomeView) {
    window.scrollTo({ top: savedHomeView.scrollY, left: 0, behavior: "instant" });
  }
});

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

  scaleButtons.forEach((button, index) => {
    const isSelected = index === scaleLevel;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

scaleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    scaleLevel = Number(button.dataset.scale);
    updateScale();
  });
});

renderHomeGrid();
updateScale();
