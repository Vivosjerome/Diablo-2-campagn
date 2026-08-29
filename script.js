const ACT_META = {
  1: { name: "L'Œil Aveugle", boss: "Andariel · Campement des Rogues" },
  2: { name: "Le Secret des Vizjerei", boss: "Duriel · Lut Gholein" },
  3: { name: "La Porte Infernale", boss: "Mephisto · Kurast" },
  4: { name: "Le Fléau", boss: "Diablo · Pandémonium" },
  5: { name: "Seigneur de la Destruction", boss: "Baal · Harrogath" }
};

const stepsData = [
  {
    act: 1,
    title: "Lande Sanglante ➔ Hautes-Terres de Tamoe",
    desc: "Suis simplement la route en terre. Elle mène aux sorties de zones.",
    nav: "ROUTE"
  },
  {
    act: 1,
    title: "La Tour Oubliée (Niveaux 1 à 4)",
    desc: "Tourne à GAUCHE depuis le couloir d'entrée. (Niveau 5 = disposition fixe).",
    nav: "GAUCHE"
  },
  {
    act: 1,
    title: "La Fosse",
    desc: "Depuis le Relais du Cloître, suis la route vers le bas-gauche. Niveau 1 = GAUCHE.",
    nav: "GAUCHE"
  },
  {
    act: 1,
    title: "Caserne & Prison",
    desc: "Caserne = Tout droit / Gauche. Prison 1 & 3 = GAUCHE. Prison 2 = TOUT DROIT.",
    nav: "VARIABLE"
  },
  {
    act: 1,
    title: "Catacombes (Andarielle)",
    desc: "Niveau 2 = GAUCHE depuis le Relais. Niveau 3 = GAUCHE. Niveau 4 = Fixe.",
    nav: "GAUCHE"
  },
  {
    act: 2,
    title: "Les Égouts (Radament)",
    desc: "Prends l'entrée Sud au bord de la mer. Niveau 2 souvent juste à côté.",
    nav: "ENTRÉE MER"
  },
  {
    act: 2,
    title: "Désert (Collines, Oasis, Ville Oubliée)",
    desc: "Vise les COINS. Si la falaise fait un mur en L (angle droit plat), c'est un cul-de-sac !",
    nav: "COINS (Éviter L)"
  },
  {
    act: 2,
    title: "Hall des Morts (Cube Horadrique)",
    desc: "Niveaux 1 et 2 = GAUCHE. Niveau 3 = Coffre dans la pièce du fond.",
    nav: "GAUCHE"
  },
  {
    act: 2,
    title: "Repaire du Ver (Bâton)",
    desc: "EXCEPTION ! Niveaux 1 et 2 = DROITE. Niveau 3 = TOUT DROIT.",
    nav: "DROITE"
  },
  {
    act: 2,
    title: "Temple de la Vipère Noire (Amulette)",
    desc: "Niveau 1 = GAUCHE. Niveau 2 = Autel au centre.",
    nav: "GAUCHE"
  },
  {
    act: 2,
    title: "Sanctuaire des Arcanes",
    desc: "4 branches. Prends en priorité la branche plate (sans escaliers ni portails).",
    nav: "BRANCHE PLATE"
  },
  {
    act: 2,
    title: "Tombeaux de Tal Rasha (Duriel)",
    desc: "Prends le tombeau avec le symbole manquant dans le journal. Une fois dedans = GAUCHE.",
    nav: "GAUCHE"
  },
  {
    act: 3,
    title: "Jungle (Forêt, Grand Marais, Écorcheur)",
    desc: "Suis le bord NORD de la rivière en montant vers le NORD-EST.",
    nav: "NORD-EST"
  },
  {
    act: 3,
    title: "Caverne de l'Araignée (Œil de Khalim)",
    desc: "Le coffre se trouve toujours sur le mur bas-gauche.",
    nav: "BAS-GAUCHE"
  },
  {
    act: 3,
    title: "Donjon de l'Écorcheur (Cerveau)",
    desc: "Niveaux 1 et 2 = GAUCHE. Niveau 3 = Carte fixe à 6 variantes.",
    nav: "GAUCHE"
  },
  {
    act: 3,
    title: "Villes de Kurust",
    desc: "La sortie se trouve dans le coin opposé à là où tu es rentré.",
    nav: "COIN OPPOSÉ"
  },
  {
    act: 3,
    title: "Prison de la Haine (Mephisto)",
    desc: "Niveau 2 = Tourne à GAUCHE en sortant du Relais.",
    nav: "GAUCHE"
  },
  {
    act: 4,
    title: "Steppes & Plaies du Désespoir",
    desc: "Les passages n'apparaissent qu'à 3 ou 4 spots fixes le long des murs extérieurs.",
    nav: "BORDURES"
  },
  {
    act: 4,
    title: "Rivière de Feu & Sanctuaire du Chaos",
    desc: "Avance toujours vers le Haut-Droite (Nord-Est). Sanctuaire = Fixe.",
    nav: "HAUT-DROITE"
  },
  {
    act: 5,
    title: "Collines & Hautes Glaces",
    desc: "Avance vers le Haut-Gauche. Reste sur le bord nord pour éviter les murs.",
    nav: "HAUT-GAUCHE"
  },
  {
    act: 5,
    title: "Passage Cristallin / Chemin des Anciens",
    desc: "Depuis l'entrée : Zone suivante = GAUCHE | Donjon secondaire = TOUT DROIT | Relais = DROITE.",
    nav: "GAUCHE"
  },
  {
    act: 5,
    title: "Corridors du Martyre (Nihlathak)",
    desc: "Look mural : Nihlathak est uniquement dans le bras qui a des YEUX dessinés sur le mur.",
    nav: "YEUX MURAUX"
  },
  {
    act: 5,
    title: "Pierre-Monde (Baal)",
    desc: "Niveau 2 = DROITE (depuis le Relais). Niveaux 1 et 3 = Aléatoires.",
    nav: "DROITE"
  }
];

const app = document.getElementById("app");
const progressFill = document.getElementById("progress-fill");
const progressCount = document.getElementById("progress-count");
const progressLabel = document.getElementById("progress-label");
const progressBar = document.getElementById("progress-bar");

let checkedSteps = JSON.parse(localStorage.getItem("d2r_checked_steps")) || [];

function badgeClass(nav) {
  if (nav.includes("TOUT DROIT")) return "badge-straight";
  if (nav.includes("DROITE") && !nav.includes("GAUCHE")) return "badge-right";
  if (nav.includes("GAUCHE")) return "badge-left";
  if (nav.includes("ROUTE") || nav.includes("BORDURES") || nav.includes("COINS")) return "badge-route";
  return "badge-other";
}

function getRoman(num) {
  return { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" }[num];
}

function updateProgress(filterAct) {
  const relevant = filterAct === "all"
    ? stepsData
    : stepsData.filter((s) => s.act === parseInt(filterAct, 10));

  const done = relevant.filter((_, i) => {
    const globalIdx = stepsData.indexOf(relevant[i]);
    return checkedSteps.includes(globalIdx);
  }).length;

  const total = relevant.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  progressCount.textContent = `${done} / ${total}`;
  progressFill.style.width = `${pct}%`;
  progressBar.setAttribute("aria-valuenow", String(pct));
  progressLabel.textContent = filterAct === "all"
    ? "Campagne"
    : `Acte ${getRoman(parseInt(filterAct, 10))}`;
}

function render(filterAct = "all") {
  app.innerHTML = "";
  const acts = filterAct === "all" ? [1, 2, 3, 4, 5] : [parseInt(filterAct, 10)];

  acts.forEach((actNum) => {
    const actSteps = stepsData.filter((s) => s.act === actNum);
    if (actSteps.length === 0) return;

    const doneInAct = actSteps.filter((step) =>
      checkedSteps.includes(stepsData.indexOf(step))
    ).length;
    const complete = doneInAct === actSteps.length;

    const actSection = document.createElement("section");
    actSection.className = `act-section act-${actNum}${complete ? " is-complete" : ""}`;
    actSection.setAttribute("aria-labelledby", `act-${actNum}`);

    const meta = ACT_META[actNum];
    const header = document.createElement("div");
    header.className = "act-header";
    header.innerHTML = `
      <div class="act-numeral">${getRoman(actNum)}</div>
      <div>
        <h2 id="act-${actNum}">Acte ${getRoman(actNum)} — ${meta.name}</h2>
        <p>${meta.boss}</p>
      </div>
      <div class="act-progress">${doneInAct}/${actSteps.length}</div>
    `;
    actSection.appendChild(header);

    actSteps.forEach((step) => {
      const globalIdx = stepsData.indexOf(step);
      const isChecked = checkedSteps.includes(globalIdx);

      const stepEl = document.createElement("div");
      stepEl.className = `step-item${isChecked ? " completed" : ""}`;
      stepEl.innerHTML = `
        <input type="checkbox" id="step-${globalIdx}" ${isChecked ? "checked" : ""} aria-label="${step.title}">
        <div class="step-content">
          <div class="step-top">
            <label class="step-title" for="step-${globalIdx}">${step.title}</label>
            <span class="badge ${badgeClass(step.nav)}">${step.nav}</span>
          </div>
          <div class="step-desc">${step.desc}</div>
        </div>
      `;

      stepEl.querySelector("input").addEventListener("change", () => toggleStep(globalIdx));
      actSection.appendChild(stepEl);
    });

    app.appendChild(actSection);
  });

  updateProgress(filterAct);
}

function toggleStep(index) {
  if (checkedSteps.includes(index)) {
    checkedSteps = checkedSteps.filter((i) => i !== index);
  } else {
    checkedSteps.push(index);
  }
  localStorage.setItem("d2r_checked_steps", JSON.stringify(checkedSteps));
  render(document.querySelector(".filter-btn.active").dataset.act);
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    e.currentTarget.classList.add("active");
    render(e.currentTarget.dataset.act);
  });
});

document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Réinitialiser l'avancement de la campagne ?")) {
    checkedSteps = [];
    localStorage.removeItem("d2r_checked_steps");
    render(document.querySelector(".filter-btn.active").dataset.act);
  }
});

render();
