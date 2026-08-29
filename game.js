(function () {
  const FACINGS = [
    { id: "n", label: "Nord", vx: 0, vy: -1, left: "Ouest", zone: "nw" },
    { id: "e", label: "Est", vx: 1, vy: 0, left: "Nord", zone: "ne" },
    { id: "s", label: "Sud", vx: 0, vy: 1, left: "Est", zone: "se" },
    { id: "w", label: "Ouest", vx: -1, vy: 0, left: "Sud", zone: "sw" }
  ];

  const ZONE_LABELS = {
    nw: "Haut-Gauche",
    ne: "Haut-Droite",
    sw: "Bas-Gauche",
    se: "Bas-Droite"
  };

  const DUNGEON_NAMES = [
    "Catacombes — niv. 2",
    "Tour Oubliée — niv. 3",
    "La Fosse — niv. 1",
    "Hall des Morts — niv. 1",
    "Repaire du Ver — niv. 2",
    "Temple de la Vipère Noire",
    "Donjon de l'Écorcheur — niv. 2",
    "Prison de la Haine — niv. 2",
    "Passage Cristallin",
    "Pierre-Monde — niv. 1",
    "Caserne",
    "Prison — niv. 1"
  ];

  const overlay = document.getElementById("game-overlay");
  const launcher = document.getElementById("game-launcher");
  const canvas = document.getElementById("dungeon-canvas");
  const feedback = document.getElementById("game-feedback");
  const nextBtn = document.getElementById("game-next");
  const nameEl = document.getElementById("game-dungeon-name");
  const scoreEl = document.getElementById("game-score");
  const zoneBtns = [...document.querySelectorAll("#game-zones button")];

  const stats = loadStats();
  const state = {
    dungeon: null,
    revealed: false,
    locked: false,
    streak: 0,
    visible: new Set()
  };

  function loadStats() {
    try {
      return JSON.parse(localStorage.getItem("d2r_tile_stats")) || { best: 0, hits: 0, total: 0 };
    } catch {
      return { best: 0, hits: 0, total: 0 };
    }
  }

  function saveStats() {
    localStorage.setItem("d2r_tile_stats", JSON.stringify(stats));
  }

  function rand(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  function carveRect(grid, x, y, w, h) {
    const H = grid.length;
    const W = grid[0].length;
    for (let j = y; j < y + h; j++) {
      for (let i = x; i < x + w; i++) {
        if (j > 0 && j < H - 1 && i > 0 && i < W - 1) grid[j][i] = 1;
      }
    }
  }

  function carveDisk(grid, x, y, r) {
    for (let j = y - r; j <= y + r; j++) {
      for (let i = x - r; i <= x + r; i++) {
        if (Math.abs(i - x) + Math.abs(j - y) <= r) {
          if (grid[j] && grid[j][i] !== undefined && j > 0 && j < grid.length - 1 && i > 0 && i < grid[0].length - 1) {
            grid[j][i] = 1;
          }
        }
      }
    }
  }

  function carveCorridor(grid, x1, y1, x2, y2) {
    let x = x1;
    let y = y1;
    const horizFirst = Math.random() < 0.5;
    if (horizFirst) {
      while (x !== x2) {
        carveDisk(grid, x, y, 1);
        x += Math.sign(x2 - x);
      }
      while (y !== y2) {
        carveDisk(grid, x, y, 1);
        y += Math.sign(y2 - y);
      }
    } else {
      while (y !== y2) {
        carveDisk(grid, x, y, 1);
        y += Math.sign(y2 - y);
      }
      while (x !== x2) {
        carveDisk(grid, x, y, 1);
        x += Math.sign(x2 - x);
      }
    }
    carveDisk(grid, x2, y2, 1);
  }

  function quadrantBox(W, H, zone) {
    const mx = Math.floor(W / 2);
    const my = Math.floor(H / 2);
    const pad = 2;
    if (zone === "nw") return { x0: pad, y0: pad, x1: mx - 2, y1: my - 2 };
    if (zone === "ne") return { x0: mx + 2, y0: pad, x1: W - pad - 1, y1: my - 2 };
    if (zone === "sw") return { x0: pad, y0: my + 2, x1: mx - 2, y1: H - pad - 1 };
    return { x0: mx + 2, y0: my + 2, x1: W - pad - 1, y1: H - pad - 1 };
  }

  function generateDungeon() {
    const W = 34;
    const H = 34;
    const grid = Array.from({ length: H }, () => Array(W).fill(0));
    const facing = FACINGS[rand(0, 3)];
    const q = quadrantBox(W, H, facing.zone);

    let ex;
    let ey;
    const jitter = rand(-2, 2);
    if (facing.id === "n") {
      ex = clamp(Math.floor(W / 2) + jitter, 10, W - 11);
      ey = H - 3;
    } else if (facing.id === "s") {
      ex = clamp(Math.floor(W / 2) + jitter, 10, W - 11);
      ey = 2;
    } else if (facing.id === "e") {
      ex = 2;
      ey = clamp(Math.floor(H / 2) + jitter, 10, H - 11);
    } else {
      ex = W - 3;
      ey = clamp(Math.floor(H / 2) + jitter, 10, H - 11);
    }

    let cx = ex;
    let cy = ey;
    for (let i = 0; i < 6; i++) {
      carveDisk(grid, cx, cy, 1);
      cx += facing.vx;
      cy += facing.vy;
    }

    const tx = rand(q.x0 + 1, q.x1 - 1);
    const ty = rand(q.y0 + 1, q.y1 - 1);

    let x = cx;
    let y = cy;
    for (let step = 0; step < 260; step++) {
      carveDisk(grid, x, y, Math.random() < 0.2 ? 2 : 1);
      if (Math.random() < 0.7) {
        if (Math.random() < 0.55) x += Math.sign(tx - x) || rand(-1, 1);
        else y += Math.sign(ty - y) || rand(-1, 1);
      } else {
        if (Math.random() < 0.5) x += rand(-1, 1);
        else y += rand(-1, 1);
      }
      x = clamp(x, 2, W - 3);
      y = clamp(y, 2, H - 3);
    }

    carveRect(grid, tx - 2, ty - 2, 5, 4);
    carveCorridor(grid, cx, cy, tx, ty);

    for (let r = 0; r < 7; r++) {
      const rw = rand(3, 6);
      const rh = rand(3, 5);
      carveRect(grid, rand(2, W - rw - 3), rand(2, H - rh - 3), rw, rh);
    }

    for (let d = 0; d < 3; d++) {
      let dx = cx + rand(-2, 2);
      let dy = cy + rand(-2, 2);
      for (let s = 0; s < 40; s++) {
        dx = clamp(dx + rand(-1, 1), 2, W - 3);
        dy = clamp(dy + rand(-1, 1), 2, H - 3);
        carveDisk(grid, dx, dy, 1);
      }
    }

    for (let j = 3; j < H - 3; j++) {
      for (let i = 3; i < W - 3; i++) {
        if (!grid[j][i]) continue;
        let n = 0;
        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            if (grid[j + oy][i + ox]) n++;
          }
        }
        if (n === 9 && Math.random() < 0.04) grid[j][i] = 0;
      }
    }

    carveDisk(grid, ex, ey, 1);
    carveDisk(grid, tx, ty, 2);
    grid[ey][ex] = 1;
    grid[ty][tx] = 1;

    const visible = computeVisible(grid, ex, ey, 8);

    return {
      grid,
      W,
      H,
      entrance: { x: ex, y: ey },
      exit: { x: tx, y: ty },
      facing,
      correctZone: facing.zone,
      title: DUNGEON_NAMES[rand(0, DUNGEON_NAMES.length - 1)],
      visible
    };
  }

  function computeVisible(grid, sx, sy, maxDist) {
    const vis = new Set();
    const q = [[sx, sy, 0]];
    vis.add(key(sx, sy));
    while (q.length) {
      const [x, y, d] = q.shift();
      if (d >= maxDist) continue;
      const nbs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      for (const [ox, oy] of nbs) {
        const nx = x + ox;
        const ny = y + oy;
        const k = key(nx, ny);
        if (vis.has(k) || !grid[ny] || grid[ny][nx] !== 1) continue;
        vis.add(k);
        q.push([nx, ny, d + 1]);
      }
    }
    return vis;
  }

  function isFloor(d, x, y) {
    return d.grid[y] && d.grid[y][x] === 1;
  }

  function isSeen(d, x, y) {
    return state.revealed || d.visible.has(key(x, y));
  }

  function layoutCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: rect.width, h: rect.height };
  }

  function draw() {
    if (!state.dungeon) return;
    const d = state.dungeon;
    const { ctx, w, h } = layoutCanvas();
    const pad = 10;
    const cell = Math.min((w - pad * 2) / d.W, (h - pad * 2) / d.H);
    const ox = (w - cell * d.W) / 2;
    const oy = (h - cell * d.H) / 2;

    ctx.fillStyle = "#090607";
    ctx.fillRect(0, 0, w, h);

    for (let y = 0; y < d.H; y++) {
      for (let x = 0; x < d.W; x++) {
        if (!isFloor(d, x, y) || !isSeen(d, x, y)) continue;
        const shade = 22 + ((x * 13 + y * 7) % 10);
        ctx.fillStyle = `rgb(${shade + 18},${shade},${shade - 4})`;
        ctx.fillRect(ox + x * cell, oy + y * cell, cell + 0.5, cell + 0.5);
      }
    }

    ctx.lineWidth = Math.max(1.2, cell * 0.18);
    ctx.lineCap = "square";
    ctx.strokeStyle = "#d05632";
    ctx.beginPath();
    for (let y = 0; y < d.H; y++) {
      for (let x = 0; x < d.W; x++) {
        if (!isFloor(d, x, y) || !isSeen(d, x, y)) continue;
        const px = ox + x * cell;
        const py = oy + y * cell;
        if (!isFloor(d, x, y - 1) || !isSeen(d, x, y - 1)) {
          ctx.moveTo(px, py);
          ctx.lineTo(px + cell, py);
        }
        if (!isFloor(d, x, y + 1) || !isSeen(d, x, y + 1)) {
          ctx.moveTo(px, py + cell);
          ctx.lineTo(px + cell, py + cell);
        }
        if (!isFloor(d, x - 1, y) || !isSeen(d, x - 1, y)) {
          ctx.moveTo(px, py);
          ctx.lineTo(px, py + cell);
        }
        if (!isFloor(d, x + 1, y) || !isSeen(d, x + 1, y)) {
          ctx.moveTo(px + cell, py);
          ctx.lineTo(px + cell, py + cell);
        }
      }
    }
    ctx.stroke();

    const doorX = ox + d.entrance.x * cell + cell / 2;
    const doorY = oy + d.entrance.y * cell + cell / 2;
    ctx.save();
    ctx.translate(doorX, doorY);
    ctx.fillStyle = "#3a2a12";
    ctx.strokeStyle = "#e8c97a";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.rect(-cell * 0.7, -cell * 0.35, cell * 1.4, cell * 0.7);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    drawPlayer(ctx, doorX, doorY, d.facing, cell);

    if (state.revealed) {
      const sx = ox + d.exit.x * cell + cell / 2;
      const sy = oy + d.exit.y * cell + cell / 2;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.fillStyle = "#f0d48a";
      ctx.strokeStyle = "#fff6d0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -cell * 0.55);
      ctx.lineTo(cell * 0.45, cell * 0.35);
      ctx.lineTo(-cell * 0.45, cell * 0.35);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#1a1008";
      ctx.font = `${Math.max(9, cell * 0.55)}px Cinzel, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("▼", 0, -cell * 0.2);
      ctx.restore();

      ctx.strokeStyle = "rgba(232, 201, 122, .55)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w / 2, 8);
      ctx.lineTo(w / 2, h - 8);
      ctx.moveTo(8, h / 2);
      ctx.lineTo(w - 8, h / 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = "rgba(201, 163, 90, .85)";
    ctx.font = "11px Cinzel, serif";
    ctx.textAlign = "center";
    ctx.fillText("N", w / 2, 14);
    ctx.fillText("S", w / 2, h - 8);
    ctx.fillText("O", 12, h / 2 + 4);
    ctx.fillText("E", w - 12, h / 2 + 4);

    if (!state.revealed) {
      ctx.fillStyle = "rgba(8, 6, 8, .18)";
      ctx.fillRect(0, 0, w, h);
    }
  }

  function drawPlayer(ctx, x, y, facing, cell) {
    const ang = Math.atan2(facing.vy, facing.vx) + Math.PI / 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.shadowColor = "#8cf0ff";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#f4f7ff";
    ctx.beginPath();
    ctx.moveTo(0, -cell * 0.85);
    ctx.lineTo(cell * 0.38, cell * 0.45);
    ctx.lineTo(0, cell * 0.18);
    ctx.lineTo(-cell * 0.38, cell * 0.45);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function updateScore() {
    scoreEl.textContent = `Série ${state.streak} · Record ${stats.best} · ${stats.hits}/${stats.total}`;
  }

  function startRound() {
    state.dungeon = generateDungeon();
    state.revealed = false;
    state.locked = false;
    nameEl.textContent = state.dungeon.title;
    feedback.hidden = true;
    feedback.className = "game-feedback";
    nextBtn.hidden = true;
    zoneBtns.forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("is-correct", "is-wrong");
    });
    updateScore();
    requestAnimationFrame(draw);
  }

  function guess(zone) {
    if (state.locked || !state.dungeon) return;
    state.locked = true;
    state.revealed = true;
    const ok = zone === state.dungeon.correctZone;
    stats.total += 1;
    if (ok) {
      stats.hits += 1;
      state.streak += 1;
      stats.best = Math.max(stats.best, state.streak);
    } else {
      state.streak = 0;
    }
    saveStats();
    updateScore();

    zoneBtns.forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.zone === state.dungeon.correctZone) btn.classList.add("is-correct");
      if (btn.dataset.zone === zone && !ok) btn.classList.add("is-wrong");
    });

    const d = state.dungeon;
    feedback.hidden = false;
    feedback.className = `game-feedback ${ok ? "is-win" : "is-lose"}`;
    feedback.textContent = ok
      ? `Juste. Couloir vers le ${d.facing.label} → 90° gauche = ${d.facing.left}, donc ${ZONE_LABELS[d.correctZone]}.`
      : `Raté. Tu as visé ${ZONE_LABELS[zone]}. La sortie est ${ZONE_LABELS[d.correctZone]} (couloir vers le ${d.facing.label}, 90° gauche).`;
    nextBtn.hidden = false;
    draw();
  }

  function openGame() {
    overlay.hidden = false;
    document.body.classList.add("game-open");
    startRound();
  }

  function closeGame() {
    overlay.hidden = true;
    document.body.classList.remove("game-open");
  }

  launcher.addEventListener("click", openGame);
  document.getElementById("game-close").addEventListener("click", closeGame);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeGame();
  });
  nextBtn.addEventListener("click", startRound);
  zoneBtns.forEach((btn) => {
    btn.addEventListener("click", () => guess(btn.dataset.zone));
  });
  document.addEventListener("keydown", (e) => {
    if (overlay.hidden) return;
    if (e.key === "Escape") closeGame();
  });
  window.addEventListener("resize", () => {
    if (!overlay.hidden) draw();
  });

  updateScore();
})();
