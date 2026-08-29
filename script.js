const ACT_META = {
  1: { name: "L'Œil Aveugle", boss: "Andariel · Campement des Rogues" },
  2: { name: "Le Secret des Vizjerei", boss: "Duriel · Lut Gholein" },
  3: { name: "La Porte Infernale", boss: "Mephisto · Kurast" },
  4: { name: "Le Fléau", boss: "Diablo · Pandémonium" },
  5: { name: "Seigneur de la Destruction", boss: "Baal · Harrogath" }
};

const LEGACY_TITLES = [
  "Lande Sanglante ➔ Hautes-Terres de Tamoe",
  "La Tour Oubliée (Niveaux 1 à 4)",
  "La Fosse",
  "Caserne & Prison",
  "Catacombes (Andarielle)",
  "Les Égouts (Radament)",
  "Désert (Collines, Oasis, Ville Oubliée)",
  "Hall des Morts (Cube Horadrique)",
  "Repaire du Ver (Bâton)",
  "Temple de la Vipère Noire (Amulette)",
  "Sanctuaire des Arcanes",
  "Tombeaux de Tal Rasha (Duriel)",
  "Jungle (Forêt, Grand Marais, Écorcheur)",
  "Caverne de l'Araignée (Œil de Khalim)",
  "Donjon de l'Écorcheur (Cerveau)",
  "Villes de Kurust",
  "Prison de la Haine (Mephisto)",
  "Steppes & Plaies du Désespoir",
  "Rivière de Feu & Sanctuaire du Chaos",
  "Collines & Hautes Glaces",
  "Passage Cristallin / Chemin des Anciens",
  "Corridors du Martyre (Nihlathak)",
  "Pierre-Monde (Baal)"
];

const TITLE_ALIASES = {
  "Villes de Kurust": "Villes de Kurast (Tome + Cœur)"
};

const stepsData = [
  {
    act: 1,
    title: "Le Repaire du Mal",
    desc: "Lande Sanglante : suis la route, le Den est presque toujours collé au chemin.",
    nav: "ROUTE",
    quests: [
      {
        name: "Le Repaire du Mal",
        npc: "Akara",
        reward: "+1 compétence · reset des skills chez Akara",
        todo: "Vide le Den (tous les monstres). Reviens parler à Akara."
      }
    ]
  },
  {
    act: 1,
    title: "Blood Raven — Cimetière",
    desc: "Plaines Gelées : la sortie vers le Cimetière est toujours près d'un coin. Cryptes = GAUCHE jusqu'au coffre (optionnel).",
    nav: "COIN",
    quests: [
      {
        name: "Le Cimetière des Sœurs",
        npc: "Kashya",
        reward: "Mercenaires Rogue débloqués",
        todo: "Tue Blood Raven dans le Cimetière. Parle à Kashya, puis Akara."
      }
    ]
  },
  {
    act: 1,
    title: "À la recherche de Cain",
    desc: "Champ de Pierres : suis la route. Arbres cairn = portail vers Tristram. Bois Obscur : le Relais et l'Arbre d'Inifuss sont aléatoires — cherche les camps.",
    nav: "ROUTE",
    quests: [
      {
        name: "À la recherche de Cain",
        npc: "Akara → Deckard Cain",
        reward: "Identification gratuite chez Cain",
        todo: "Ramasse le Parchemin d'Inifuss (arbre dans le Bois Obscur) → Akara. Active les cairns du Champ de Pierres, sauve Cain à Tristram (en haut à gauche de la map fixe)."
      }
    ]
  },
  {
    act: 1,
    title: "Lande Sanglante ➔ Hautes-Terres de Tamoe",
    desc: "Suis la route en terre. Marais Noir → Tamoe : la sortie n'est jamais en bas-gauche. Portail du Cloître = toujours le gros mur en haut-droite.",
    nav: "ROUTE",
    quests: []
  },
  {
    act: 1,
    title: "La Tour Oubliée (Niveaux 1 à 4)",
    desc: "Tourne à GAUCHE depuis le couloir d'entrée. Niveau 5 = 2 layouts fixes, Comtesse au fond. Salle à piliers = super coffre.",
    nav: "GAUCHE",
    quests: [
      {
        name: "La Tour Oubliée",
        npc: "Journal / Comtesse",
        reward: "Runes (clé de la Comtesse plus tard)",
        todo: "Optionnel en campagne. Tue la Comtesse au niv. 5 si tu farm des runes.",
        optional: true
      }
    ]
  },
  {
    act: 1,
    title: "La Fosse",
    desc: "Depuis le Relais du Cloître Extérieur, suis la route vers le bas-gauche. Niveau 1 = GAUCHE. Niveau 2 = layout fixe.",
    nav: "GAUCHE",
    quests: [
      {
        name: "La Fosse",
        npc: "—",
        reward: "Zone de farm (pas de quête)",
        todo: "Skip en campagne. Utile plus tard pour le loot niv. 85.",
        optional: true
      }
    ]
  },
  {
    act: 1,
    title: "Caserne & Prison",
    desc: "Caserne = tout droit OU gauche (un côté = Maillet, l'autre = Prison). Prison 1 : Relais = GAUCHE, suite = TOUT DROIT. Prison 2 = TOUT DROIT. Prison 3 = GAUCHE.",
    nav: "VARIABLE",
    quests: [
      {
        name: "Les Outils du Métier",
        npc: "Charsi",
        reward: "Imbue (arme/armure rare)",
        todo: "Ramasse le Maillet Horadrique dans la Caserne (pièce de The Smith). Ramène-le à Charsi. Imbue un item blanc 4 slots plus tard, pas ton starter."
      }
    ]
  },
  {
    act: 1,
    title: "Catacombes (Andariel)",
    desc: "Niv. 1 : pas de règle fiable. Niv. 2 depuis le Relais = DROITE (horaire). Niv. 3 = GAUCHE. Niv. 4 = fixe, Andariel au fond.",
    nav: "GAUCHE",
    quests: [
      {
        name: "Sœurs à l'abattoir",
        npc: "Cain / Warriv",
        reward: "Passage vers l'Acte II",
        todo: "Tue Andariel. Retourne en ville, parle à Warriv pour Lut Gholein. Prends le Relais niv. 2 avant le boss."
      }
    ]
  },
  {
    act: 2,
    title: "Les Égouts (Radament)",
    desc: "Pas de 90° au niv. 1. Entre par les quais (sud, au bord de l'eau), pas la trappe près de Greiz. Cherche gauche ET droite de cette entrée. Niv. 2 : TOUT DROIT = descendre, GAUCHE = Relais. Niv. 3 : GAUCHE pour Radament.",
    nav: "PAS 90°",
    quests: [
      {
        name: "L'Antre de Radament",
        npc: "Atma",
        reward: "+1 compétence (Livre) · prix réduits en ville",
        todo: "Tue Radament au niv. 3, ramasse le Livre de Compétence. Parle à Atma."
      }
    ]
  },
  {
    act: 2,
    title: "Désert (Collines, Oasis, Ville Oubliée)",
    desc: "Vise les COINS. Entrée et sortie jamais du même côté. Un mur en L (long + court) = cul-de-sac. Un cran dans la falaise = pas la sortie. Relais et donjons (Hall, Ver) sont aléatoires.",
    nav: "COINS (Éviter L)",
    quests: []
  },
  {
    act: 2,
    title: "Hall des Morts (Cube Horadrique)",
    desc: "Niveaux 1 et 2 = GAUCHE. Niv. 2 : Relais = TOUT DROIT. Niv. 3 = GAUCHE, coffre dans la pièce du fond (Bloodwitch).",
    nav: "GAUCHE",
    quests: [
      {
        name: "Le Bâton Horadrique — Cube",
        npc: "Cain / Drognan",
        reward: "Cube Horadrique",
        todo: "Ouvre le coffre au niv. 3. Garde le Cube en inventaire pour toute la campagne."
      }
    ]
  },
  {
    act: 2,
    title: "Repaire du Ver (Bâton)",
    desc: "EXCEPTION : niv. 1 et 2 = DROITE (horaire). Niv. 3 = TOUT DROIT, coffre au fond (Coldworm).",
    nav: "DROITE",
    quests: [
      {
        name: "Le Bâton Horadrique — Bâton des Rois",
        npc: "Cain",
        reward: "Bâton des Rois",
        todo: "Ramasse le Bâton dans le coffre du niv. 3. Ne le transmute pas tout de suite : il te faut aussi l'Amulette."
      }
    ]
  },
  {
    act: 2,
    title: "Temple de la Vipère Noire (Amulette)",
    desc: "Vallée des Serpents = fixe, temple au centre. Niv. 1 = GAUCHE. Niv. 2 = autel au centre (fixe).",
    nav: "GAUCHE",
    quests: [
      {
        name: "Le Soleil terni",
        npc: "Drognan / Atma",
        reward: "Le soleil revient (accès Palais)",
        todo: "Entre dans le Temple : ça déclenche l'éclipse. Tue les vipères / Fangskin, ramasse l'Amulette de Vipère. Parle à Drognan, puis Jerhyn pour le Palais."
      },
      {
        name: "Assembler le Bâton Horadrique",
        npc: "Cube",
        reward: "Bâton Horadrique (orifice du tombeau)",
        todo: "Dans le Cube : Bâton des Rois + Amulette de Vipère = Bâton Horadrique."
      }
    ]
  },
  {
    act: 2,
    title: "Sanctuaire des Arcanes",
    desc: "4 branches. Priorité à la branche plate (sans escaliers ni portails). L'Invocateur est aléatoire sur l'une des 4.",
    nav: "BRANCHE PLATE",
    quests: [
      {
        name: "Le Sanctuaire des Arcanes / L'Invocateur",
        npc: "Cain",
        reward: "Journal de Horazon · symbole du vrai tombeau",
        todo: "Tue l'Invocateur. Le symbole MANQUANT (journal de quête ou mur derrière lui) = le vrai tombeau de Tal Rasha."
      }
    ]
  },
  {
    act: 2,
    title: "Tombeaux de Tal Rasha (Duriel)",
    desc: "Les 7 tombeaux sont toujours dans le même ordre. Dans le bon tombeau = GAUCHE jusqu'à l'orifice. Chambre de Tal Rasha = fixe.",
    nav: "GAUCHE",
    quests: [
      {
        name: "Les Sept Tombeaux",
        npc: "Jerhyn / Meshif",
        reward: "Passage vers l'Acte III",
        todo: "Plante le Bâton Horadrique dans l'orifice. Tue Duriel. Parle à Tyrael, puis Jerhyn, puis Meshif."
      }
    ]
  },
  {
    act: 3,
    title: "Jungle (Forêt, Grand Marais, Écorcheur)",
    desc: "Suis le bord NORD de la rivière, cap NORD-EST. Camps = Relais / donjons. Tas d'or au sol = tu es près de la sortie vers Kurast.",
    nav: "NORD-EST",
    quests: [
      {
        name: "L'Oiseau d'or",
        npc: "Meshif → Alkor",
        reward: "Potion de Vie (+20 vie permanente)",
        todo: "Si un unique drop la Figurine de Jade : Meshif (bateau) → Alkor. À faire dès que tu l'as.",
        optional: true
      },
      {
        name: "La Lame de l'ancienne religion",
        npc: "Ormus / Asheara",
        reward: "Anneau magique (Ormus) · mercs Kurast",
        todo: "Plante le Gidbinn dans le camp de l'Écorcheur (autel). Survive la vague, ramasse le Gidbinn, ramène-le à Ormus."
      }
    ]
  },
  {
    act: 3,
    title: "Caverne de l'Araignée (Œil de Khalim)",
    desc: "Layout « assez fixe » : coffre toujours sur le mur bas-gauche. Spirale si tu n'as pas Téléport.",
    nav: "BAS-GAUCHE",
    quests: [
      {
        name: "La Volonté de Khalim — Œil",
        npc: "Cain / Ormus",
        reward: "Œil de Khalim",
        todo: "Ouvre le coffre doré. Garde l'Œil pour le Cube (avec Cerveau, Cœur, Fléau)."
      }
    ]
  },
  {
    act: 3,
    title: "Donjon de l'Écorcheur (Cerveau)",
    desc: "Niveaux 1 et 2 = GAUCHE. Niveau 3 = 6 mazes fixes : identifie ta tuile d'entrée puis file au coffre.",
    nav: "GAUCHE",
    quests: [
      {
        name: "La Volonté de Khalim — Cerveau",
        npc: "Cain",
        reward: "Cerveau de Khalim",
        todo: "Coffre doré au niv. 3. Ne pas confondre avec le Swampy Pit (optionnel)."
      }
    ]
  },
  {
    act: 3,
    title: "Villes de Kurast (Tome + Cœur)",
    desc: "Lower Kurast → Bazar : coin haut ou droite. Bazar : sortie = coin OPPOSÉ à l'entrée. Upper Kurast : sortie au milieu du bord haut-droite. Égouts : 4 entrées (Bazar + Upper). Le levier (Icehawk) est souvent au bord ; le coffre scintillant et la trappe sont à 90° l'un de l'autre.",
    nav: "COIN OPPOSÉ",
    quests: [
      {
        name: "Le Tome de Lam Esen",
        npc: "Alkor",
        reward: "+5 à toutes les caractéristiques",
        todo: "Temple en Ruine dans le Bazar (Battlemaid Sarina). Ramasse le Tome, parle à Alkor. Ne skip pas."
      },
      {
        name: "La Volonté de Khalim — Cœur",
        npc: "Cain",
        reward: "Cœur de Khalim",
        todo: "Égouts de Kurast niv. 1 : trouve le levier (chauve-souris unique). Niv. 2 = pièce fixe, coffre à GAUCHE de l'entrée."
      }
    ]
  },
  {
    act: 3,
    title: "Prison de la Haine (Mephisto)",
    desc: "Travincal = fixe, Conseil en haut-droite. Durance 1 = GAUCHE. Durance 2 : Relais = GAUCHE, suite = TOUT DROIT. Depuis le Relais, niv. 3 = GAUCHE. Niv. 3 = fixe, super coffre au fond.",
    nav: "GAUCHE",
    quests: [
      {
        name: "Le Temple noirci",
        npc: "Ormus / Cain",
        reward: "Fléau de Khalim · orbe détruite",
        todo: "Tue le Conseil. Ramasse le Fléau. Cube : Œil + Cerveau + Cœur + Fléau = Volonté de Khalim. Frappe l'orbe Compelling."
      },
      {
        name: "Le Gardien",
        npc: "Cain",
        reward: "Pierre d'âme de Mephisto · portail Acte IV",
        todo: "Tue Mephisto. Ramasse la Pierre d'âme. Prends le Relais Durance 2 avant."
      }
    ]
  },
  {
    act: 4,
    title: "Steppes & Plaies du Désespoir",
    desc: "Steppes : entrée sur le bord haut-gauche, sortie sur 3 spots (coin gauche ou 2 près du coin droit). Plaies : Izual a une marque distincte dans la lave. Ville des Damnés : Relais collé aux escaliers vers la Rivière.",
    nav: "BORDURES",
    quests: [
      {
        name: "L'Ange déchu",
        npc: "Tyrael",
        reward: "+2 compétences",
        todo: "Tue Izual dans les Plaies du Désespoir. Parle à Tyrael. Ne skip pas."
      }
    ]
  },
  {
    act: 4,
    title: "Rivière de Feu & Sanctuaire du Chaos",
    desc: "Toujours vers le Haut-Droite (Nord-Est). Une branche mène à la Forge, l'autre au Relais. Sanctuaire = presque fixe, 3 bras à 2 variantes. Ouvre les 5 sceaux.",
    nav: "HAUT-DROITE",
    quests: [
      {
        name: "La Forge des Enfers",
        npc: "Cain / Halbu",
        reward: "Runes (selon difficulté)",
        todo: "Tue Hephasto, pose la Pierre de Mephisto sur la Forge, frappe avec le marteau. Ramasse les runes."
      },
      {
        name: "La Fin de la Terreur",
        npc: "Tyrael",
        reward: "Portail Acte V",
        todo: "Sceaux : Vizier, Infector, Grand Vizier → Diablo. Parle à Tyrael."
      }
    ]
  },
  {
    act: 5,
    title: "Collines & Hautes Glaces",
    desc: "Avance Haut-Gauche. Reste sur le bord nord pour éviter les barricades. Eldritch + Relais = juste après l'entrée des Hautes Glaces.",
    nav: "HAUT-GAUCHE",
    quests: [
      {
        name: "Le Siège d'Harrogath",
        npc: "Larzuk",
        reward: "Socket gratuit (Larzuk)",
        todo: "Tue Shenk en fin de Collines Sanglantes. Parle à Larzuk. Socket un item 0 trou, pas n'importe quoi."
      },
      {
        name: "Sauvetage sur le Mont Arreat",
        npc: "Qual-Kehk",
        reward: "Runes · mercs Barbares",
        todo: "Casse les 3 cages de barbares dans les Hautes Glaces (barricades). Parle à Qual-Kehk."
      }
    ]
  },
  {
    act: 5,
    title: "Passage Cristallin / Chemin des Anciens",
    desc: "Depuis l'entrée : zone suivante = GAUCHE · donjon secondaire = TOUT DROIT · Relais = DROITE. Frozen River (Anya) = 4 layouts. Sommet d'Arreat = fixe.",
    nav: "GAUCHE",
    quests: [
      {
        name: "Prison de Glace",
        npc: "Malah / Anya",
        reward: "+10 toutes résistances (permanent) · scroll de TP ville",
        todo: "Trouve Anya gelée dans la Rivière Gelée (TOUT DROIT depuis l'entrée du Passage). Potion de Malah → libère Anya → Malah. Ne skip pas."
      },
      {
        name: "Le Rite de Passage",
        npc: "Qual-Kehk",
        reward: "Accès Pierre-Monde",
        todo: "Tue les 3 Anciens au Sommet. Ils drop ton niveau : vide l'inventaire avant."
      }
    ]
  },
  {
    act: 5,
    title: "Corridors du Martyre (Nihlathak)",
    desc: "Portail d'Anya en ville → Temple de Nihlathak (fixe, Pindleskin en haut-droite). Halls of Vaught : Nihlathak est dans le bras qui a des YEUX sur le mur.",
    nav: "YEUX MURAUX",
    quests: [
      {
        name: "Trahison à Harrogath",
        npc: "Anya",
        reward: "Personalize (nom sur un item)",
        todo: "Tue Nihlathak avant qu'il pose trop de Corpse Explosion. Parle à Anya. Optionnel mais le reward est unique.",
        optional: true
      }
    ]
  },
  {
    act: 5,
    title: "Pierre-Monde (Baal)",
    desc: "Niv. 1 et 3 = aléatoires. Niv. 2 depuis le Relais = DROITE. Trône = fixe. Tu peux kiter les vagues hors de la salle.",
    nav: "DROITE",
    quests: [
      {
        name: "La Veille de la Destruction",
        npc: "Tyrael",
        reward: "Fin de campagne · accès Nightmare / Hell",
        todo: "Tue les 5 vagues, puis Baal dans la Chambre. Parle à Tyrael."
      }
    ]
  }
];

const app = document.getElementById("app");
const progressFill = document.getElementById("progress-fill");
const progressCount = document.getElementById("progress-count");
const progressLabel = document.getElementById("progress-label");
const progressBar = document.getElementById("progress-bar");

let checkedSteps = loadChecked();

function loadChecked() {
  try {
    const raw = JSON.parse(localStorage.getItem("d2r_checked_steps")) || [];
    if (!raw.length) return [];
    if (typeof raw[0] === "number") {
      return raw
        .map((i) => LEGACY_TITLES[i])
        .filter(Boolean)
        .map((title) => TITLE_ALIASES[title] || title);
    }
    return raw.map((title) => TITLE_ALIASES[title] || title);
  } catch {
    return [];
  }
}

function badgeClass(nav) {
  if (nav.includes("TOUT DROIT")) return "badge-straight";
  if (nav.includes("DROITE") && !nav.includes("GAUCHE")) return "badge-right";
  if (nav.includes("GAUCHE")) return "badge-left";
  if (nav.includes("ROUTE") || nav.includes("BORDURES") || nav.includes("COINS") || nav.includes("COIN")) return "badge-route";
  return "badge-other";
}

function getRoman(num) {
  return { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" }[num];
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderQuests(quests) {
  if (!quests || quests.length === 0) {
    return `<p class="step-quest-empty">Pas de quête ici — tu traverses juste la zone.</p>`;
  }
  return quests.map((q) => `
    <div class="step-quest${q.optional ? " is-optional" : ""}">
      <div class="step-quest__head">
        <span class="step-quest__tag">${q.optional ? "Optionnel" : "Quête"}</span>
        <strong>${escapeHtml(q.name)}</strong>
      </div>
      <p class="step-quest__meta"><span>PNJ</span> ${escapeHtml(q.npc)} <span>Récompense</span> ${escapeHtml(q.reward)}</p>
      <p class="step-quest__todo">${escapeHtml(q.todo)}</p>
    </div>
  `).join("");
}

function updateProgress(filterAct) {
  const relevant = filterAct === "all"
    ? stepsData
    : stepsData.filter((s) => s.act === parseInt(filterAct, 10));

  const done = relevant.filter((step) => checkedSteps.includes(step.title)).length;
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

    const doneInAct = actSteps.filter((step) => checkedSteps.includes(step.title)).length;
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
        <h2 id="act-${actNum}">Acte ${getRoman(actNum)} — ${escapeHtml(meta.name)}</h2>
        <p>${escapeHtml(meta.boss)}</p>
      </div>
      <div class="act-progress">${doneInAct}/${actSteps.length}</div>
    `;
    actSection.appendChild(header);

    actSteps.forEach((step) => {
      const isChecked = checkedSteps.includes(step.title);
      const stepId = `step-${stepsData.indexOf(step)}`;

      const stepEl = document.createElement("div");
      stepEl.className = `step-item${isChecked ? " completed" : ""}`;
      stepEl.innerHTML = `
        <input type="checkbox" id="${stepId}" ${isChecked ? "checked" : ""} aria-label="${escapeHtml(step.title)}">
        <div class="step-content">
          <div class="step-top">
            <label class="step-title" for="${stepId}">${escapeHtml(step.title)}</label>
            <span class="badge ${badgeClass(step.nav)}">${escapeHtml(step.nav)}</span>
          </div>
          ${renderQuests(step.quests)}
          <div class="step-path">
            <span>Chemin</span>
            <p>${escapeHtml(step.desc)}</p>
          </div>
        </div>
      `;

      stepEl.querySelector("input").addEventListener("change", () => toggleStep(step.title));
      actSection.appendChild(stepEl);
    });

    app.appendChild(actSection);
  });

  updateProgress(filterAct);
}

function toggleStep(title) {
  if (checkedSteps.includes(title)) {
    checkedSteps = checkedSteps.filter((t) => t !== title);
  } else {
    checkedSteps.push(title);
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
