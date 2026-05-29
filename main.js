document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });


const productionItems = [
  {
    image: "images/cleenkitchen.png",
    number: "01",
    title: "Виробнича кухня",
    text: "Організований простір для стабільної підготовки великих обсягів щодня.",
    alt: "Виробнича кухня",
  },
  {
    image: "images/plebsworking.png",
    number: "02",
    title: "Команда за роботою",
    text: "Кухарі працюють за єдиною системою, щоб результат був стабільним кожного дня.",
    alt: "Команда за роботою",
  },
  {
    image: "images/cleenkitchen.png",
    number: "03",
    title: "Професійне обладнання",
    text: "Сучасна техніка допомагає підтримувати якість, температуру та ритм виробництва.",
    alt: "Професійне обладнання",
  },
  {
    image: "images/cleenkitchen.png",
    number: "04",
    title: "Чистота та контроль",
    text: "Порядок, санітарія та контроль безпеки — частина щоденної роботи.",
    alt: "Чистота та контроль",
  },
  {
    image: "images/kontrðlprocesif.png",
    number: "05",
    title: "Комплектація",
    text: "Акуратна комплектація, контроль видачі та підготовка замовлень до доставки.",
    alt: "Комплектація",
  },
];

const productionPhotoStage = document.querySelector(".production-photo-stage");
const productionPhoto = document.querySelector("#production-photo");
const productionNumber = document.querySelector("#production-number");
const productionTitle = document.querySelector("#production-title");
const productionText = document.querySelector("#production-text");
const productionTabs = document.querySelectorAll(".production-tab");
const productionThumbs = document.querySelectorAll(".production-thumb");
const productionPrev = document.querySelector("#production-prev");
const productionNext = document.querySelector("#production-next");
const productionDots = document.querySelectorAll(".production-mobile-dots span");

let activeProductionIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function updateProductionUI(index) {
  const item = productionItems[index];

  activeProductionIndex = index;

  productionPhotoStage.classList.add("switching");

  setTimeout(() => {
    productionPhoto.src = item.image;
    productionPhoto.alt = item.alt;
    productionNumber.textContent = item.number;
    productionTitle.textContent = item.title;
    productionText.textContent = item.text;

    productionTabs.forEach((tab) => {
      tab.classList.toggle("active", Number(tab.dataset.index) === index);
    });

    productionThumbs.forEach((thumb) => {
      thumb.classList.toggle("active", Number(thumb.dataset.index) === index);
    });

    productionDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });

    productionPhotoStage.classList.remove("switching");
  }, 160);
}

function nextProductionItem() {
  const nextIndex = (activeProductionIndex + 1) % productionItems.length;
  updateProductionUI(nextIndex);
}

function prevProductionItem() {
  const prevIndex =
    (activeProductionIndex - 1 + productionItems.length) %
    productionItems.length;

  updateProductionUI(prevIndex);
}

if (productionPhotoStage && productionPhoto) {
  productionTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      updateProductionUI(Number(tab.dataset.index));
    });
  });

  productionThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      updateProductionUI(Number(thumb.dataset.index));
    });
  });

  if (productionNext) {
    productionNext.addEventListener("click", nextProductionItem);
  }

  if (productionPrev) {
    productionPrev.addEventListener("click", prevProductionItem);
  }

  productionPhotoStage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  productionPhotoStage.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;

    if (touchStartX - touchEndX > 50) {
      nextProductionItem();
    }

    if (touchEndX - touchStartX > 50) {
      prevProductionItem();
    }
  });

  updateProductionUI(0);
}



});