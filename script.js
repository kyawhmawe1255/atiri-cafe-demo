const tabs = document.querySelectorAll(".tab");
const groups = document.querySelectorAll(".menu-group");
const rows = document.querySelectorAll(".menu-row");
const menuImages = {
  "Acai Bowl": "acai-bowl.png",
  "Smoothie Bowl": "smoothie-bowl.png",
  "Frozen Yoghurt Bowl": "frozen-yoghurt-bowl.png",
  "Cacao Bowl": "cacao-bowl.png",
  "Chai Matcha Brioche Sticks": "chai-matcha-brioche-sticks.png",
  "Coco Brioche Sticks": "coco-brioche-sticks.png",
  "Lavender Ricotta Brioche Sticks": "lavender-ricotta-brioche-sticks.png",
  "Avocado Tofu Croffle": "avocado-tofu-croffle.png",
  "Avocado Salmon Croffle": "avocado-salmon-croffle.png",
  "Dubai Chocolate Croffle": "dubai-chocolate-croffle.png",
  "Egg Benedict": "eggs-benedict.png",
  "Shakshuka": "shakshuka.png",
  "Cilbir": "cilbir.png",
  "Crepe": "crepe.png",
  "Spring Rolls": "spring-rolls.png",
  "Chicken Wings": "chicken-wings.png",
  "Truffle Fries": "truffle-fries.png",
  "Pork Meatball": "pork-meatball.png",
  "Lahphet Thoke": "lahphet-thoke.png",
  "Centella Thoke": "centella-thoke.png",
  "Nan Gyi Thoke": "nan-gyi-thoke.png",
  "Coconut Rice Plate": "coconut-rice-plate.png",
  "Buddha Bowl": "buddha-bowl.png",
  "Poke Bowl": "poke-bowl.png",
  "Truffle Smash Burger": "truffle-smash-burger.png",
  "Burmese Curry": "burmese-curry.png",
  "Thai Panang Curry": "panang-curry.png",
  "Thai Green Curry": "thai-green-curry.png",
  "Ohn No Khauk Swe": "ohn-no-khaukswe.png",
  "Tom Yum": "tom-yum.png",
  "Stir Fried Noodle": "stir-fried-noodle.png",
  "Fried Rice": "fried-rice.png",
  "Fried Fish": "fried-fish.png",
  "Brownie": "brownie.png",
  "Syrok": "syrok.png"
};

const menuDialog = document.createElement("div");
menuDialog.className = "menu-dialog";
menuDialog.setAttribute("role", "dialog");
menuDialog.setAttribute("aria-modal", "true");
menuDialog.setAttribute("aria-hidden", "true");
menuDialog.innerHTML = `
  <div class="menu-dialog-panel" role="document">
    <button class="menu-dialog-close" type="button" aria-label="Close menu item details">X</button>
    <img class="menu-dialog-img" alt="">
    <div class="menu-dialog-body">
      <p class="kicker dark">Menu detail</p>
      <div class="menu-dialog-title">
        <h3></h3>
        <span></span>
      </div>
      <p class="menu-dialog-description"></p>
    </div>
  </div>
`;
document.body.append(menuDialog);

const dialogImage = menuDialog.querySelector(".menu-dialog-img");
const dialogPanel = menuDialog.querySelector(".menu-dialog-panel");
const dialogTitle = menuDialog.querySelector(".menu-dialog-title h3");
const dialogPrice = menuDialog.querySelector(".menu-dialog-title span");
const dialogDescription = menuDialog.querySelector(".menu-dialog-description");
const dialogClose = menuDialog.querySelector(".menu-dialog-close");

function closeMenuDialog() {
  menuDialog.classList.remove("is-open");
  menuDialog.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function openMenuDialog(row) {
  const title = row.querySelector("strong")?.textContent.trim() || "";
  const price = row.querySelector(":scope > span")?.textContent.trim() || "";
  const description = row.querySelector("p")?.textContent.trim() || "Ask us for today's ingredients and preparation.";
  const image = row.querySelector("img")?.src;

  dialogTitle.textContent = title;
  dialogPrice.textContent = price ? `${price} THB` : "";
  dialogDescription.textContent = description;

  if (image) {
    dialogImage.src = image;
    dialogImage.alt = title;
    dialogImage.hidden = false;
    dialogPanel.classList.remove("no-image");
  } else {
    dialogImage.removeAttribute("src");
    dialogImage.alt = "";
    dialogImage.hidden = true;
    dialogPanel.classList.add("no-image");
  }

  menuDialog.classList.add("is-open");
  menuDialog.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  dialogClose.focus();
}

rows.forEach((row) => {
  const title = row.querySelector("strong")?.textContent.trim();
  const image = menuImages[title];

  if (!image) return;

  const thumb = document.createElement("img");
  thumb.className = "menu-thumb";
  thumb.src = `public/assets/atiri-food/${image}`;
  thumb.alt = title;
  thumb.loading = "lazy";
  row.prepend(thumb);
  row.classList.add("has-image");
});

rows.forEach((row) => {
  row.setAttribute("role", "button");
  row.setAttribute("tabindex", "0");
  row.setAttribute("aria-label", `View details for ${row.querySelector("strong")?.textContent.trim() || "this menu item"}`);

  row.addEventListener("click", () => openMenuDialog(row));
  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMenuDialog(row);
    }
  });
});

dialogClose.addEventListener("click", closeMenuDialog);
menuDialog.addEventListener("click", (event) => {
  if (event.target === menuDialog) closeMenuDialog();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuDialog.classList.contains("is-open")) {
    closeMenuDialog();
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    groups.forEach((group) => {
      const matches = filter === "all" || group.dataset.category === filter;
      group.classList.toggle("is-hidden", !matches);
    });

    document.querySelector(".menu-board")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
