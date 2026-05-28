const stage = document.querySelector("#rings-stage");
const ringSources = [stage.dataset.ringOne, stage.dataset.ringTwo];
const rings = [];
let nextRingId = 0;
const ignoredCollisionPairs = new Set();
const maxRings = 16;

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

function collisionKey(ring, otherRing) {
  return ring.id < otherRing.id ? `${ring.id}:${otherRing.id}` : `${otherRing.id}:${ring.id}`;
}

function addRing(sourceIndex, x, y, vx, vy, wasTouchingBorder = false) {
  if (rings.length >= maxRings) return;

  const image = document.createElement("img");
  image.className = "rings-page__mark";
  image.src = ringSources[sourceIndex];
  image.alt = "";
  image.setAttribute("aria-hidden", "true");
  stage.appendChild(image);

  const ring = {
    id: nextRingId,
    element: image,
    sourceIndex,
    x,
    y,
    vx,
    vy,
    size: ringSize(),
    wasTouchingBorder,
  };

  nextRingId += 1;
  rings.push(ring);
  return ring;
}

function duplicateRing(ring) {
  if (rings.length >= maxRings) return;

  const nextSourceIndex = ring.sourceIndex === 0 ? 1 : 0;

  const duplicate = addRing(
    nextSourceIndex,
    ring.x,
    ring.y,
    ring.vx * -0.72 + randomBetween(-0.28, 0.28),
    ring.vy * -0.72 + randomBetween(-0.28, 0.28),
    true
  );

  if (duplicate) {
    ignoredCollisionPairs.add(collisionKey(ring, duplicate));
  }
}

function bounceTouchingRings() {
  for (let index = 0; index < rings.length; index += 1) {
    for (let nextIndex = index + 1; nextIndex < rings.length; nextIndex += 1) {
      const ring = rings[index];
      const otherRing = rings[nextIndex];
      const ringCenterX = ring.x + ring.size / 2;
      const ringCenterY = ring.y + ring.size / 2;
      const otherCenterX = otherRing.x + otherRing.size / 2;
      const otherCenterY = otherRing.y + otherRing.size / 2;
      let dx = otherCenterX - ringCenterX;
      let dy = otherCenterY - ringCenterY;
      let distance = Math.hypot(dx, dy);
      const minDistance = (ring.size + otherRing.size) / 2;
      const key = collisionKey(ring, otherRing);

      if (distance >= minDistance) {
        ignoredCollisionPairs.delete(key);
        continue;
      }

      if (ignoredCollisionPairs.has(key)) continue;

      if (distance === 0) {
        dx = 1;
        dy = 0;
        distance = 1;
      }

      const normalX = dx / distance;
      const normalY = dy / distance;
      const overlap = minDistance - distance;

      ring.x -= (normalX * overlap) / 2;
      ring.y -= (normalY * overlap) / 2;
      otherRing.x += (normalX * overlap) / 2;
      otherRing.y += (normalY * overlap) / 2;

      const relativeVx = otherRing.vx - ring.vx;
      const relativeVy = otherRing.vy - ring.vy;
      const speedTowardEachOther = relativeVx * normalX + relativeVy * normalY;

      if (speedTowardEachOther >= 0) continue;

      ring.vx += speedTowardEachOther * normalX;
      ring.vy += speedTowardEachOther * normalY;
      otherRing.vx -= speedTowardEachOther * normalX;
      otherRing.vy -= speedTowardEachOther * normalY;
    }
  }
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

  bounceTouchingRings();

  rings.forEach((ring) => {
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
  ignoredCollisionPairs.clear();
  nextRingId = 0;

  addRing(0, Math.min(area.width * 0.18, area.width - size), Math.min(area.height * 0.28, area.height - size), 0.82, 0.58);
  addRing(1, Math.min(area.width * 0.68, area.width - size), Math.min(area.height * 0.2, area.height - size), -0.62, 0.74);
}

startRings();
