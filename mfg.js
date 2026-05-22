const stage = document.querySelector("#rings-stage");
const ringSources = [stage.dataset.ringOne, stage.dataset.ringTwo];
const rings = [];
const maxRings = 20;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function ringSize() {
  return window.matchMedia("(max-width: 700px)").matches ? 92 : Math.min(150, Math.max(90, window.innerWidth * 0.1));
}

function bounds() {
  const bar = document.querySelector(".site-bar");
  const barHeight = bar ? bar.offsetHeight : 0;

  return {
    width: stage.clientWidth,
    height: Math.max(stage.clientHeight - barHeight, 120),
  };
}

function addRing(sourceIndex, x, y, vx, vy, wasTouchingBorder = false) {
  if (rings.length >= maxRings) return;

  const image = document.createElement("img");
  image.className = "rings-page__mark";
  image.src = ringSources[sourceIndex];
  image.alt = "";
  image.setAttribute("aria-hidden", "true");
  stage.appendChild(image);

  rings.push({
    element: image,
    sourceIndex,
    x,
    y,
    vx,
    vy,
    size: ringSize(),
    wasTouchingBorder,
  });
}

function duplicateRing(ring) {
  if (rings.length >= maxRings) return;

  const nextSourceIndex = ring.sourceIndex === 0 ? 1 : 0;

  addRing(
    nextSourceIndex,
    ring.x,
    ring.y,
    ring.vx * -0.72 + randomBetween(-0.28, 0.28),
    ring.vy * -0.72 + randomBetween(-0.28, 0.28),
    true
  );
}

function moveRings(now) {
  const area = bounds();

  rings.forEach((ring) => {
    ring.size = ringSize();
    ring.x += ring.vx;
    ring.y += ring.vy;

    let touchedBorder = false;

    if (ring.x <= 0) {
      ring.x = 0;
      ring.vx = Math.abs(ring.vx);
      touchedBorder = true;
    }

    if (ring.x + ring.size >= area.width) {
      ring.x = area.width - ring.size;
      ring.vx = -Math.abs(ring.vx);
      touchedBorder = true;
    }

    if (ring.y <= 0) {
      ring.y = 0;
      ring.vy = Math.abs(ring.vy);
      touchedBorder = true;
    }

    if (ring.y + ring.size >= area.height) {
      ring.y = area.height - ring.size;
      ring.vy = -Math.abs(ring.vy);
      touchedBorder = true;
    }

    if (touchedBorder && !ring.wasTouchingBorder) {
      duplicateRing(ring);
    }

    ring.wasTouchingBorder = touchedBorder;
    ring.element.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
  });

  requestAnimationFrame(moveRings);
}

function startRings() {
  resetRings();
  requestAnimationFrame(moveRings);
}

function resetRings() {
  const area = bounds();
  const size = ringSize();

  stage.innerHTML = "";
  rings.length = 0;

  addRing(0, Math.min(area.width * 0.18, area.width - size), Math.min(area.height * 0.28, area.height - size), 0.82, 0.58);
  addRing(1, Math.min(area.width * 0.68, area.width - size), Math.min(area.height * 0.2, area.height - size), -0.62, 0.74);
}

startRings();
