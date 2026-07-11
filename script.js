const mainImage = document.getElementById("main-image");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    thumbs.forEach((item) => item.classList.remove("active"));
    thumb.classList.add("active");
    mainImage.src = thumb.src;
  });
});

let quantity = 1;

const quantityText = document.getElementById("quantity");

document.getElementById("plus-btn").addEventListener("click", () => {
  quantity++;
  quantityText.textContent = quantity;
});

document.getElementById("minus-btn").addEventListener("click", () => {
  if (quantity <= 1) return;

  quantity--;

  quantityText.textContent = quantity;
});

const colors = document.querySelectorAll(".choose-color-btn");

colors.forEach((color) => {
  color.addEventListener("click", () => {
    colors.forEach((btn) => btn.classList.remove("active"));

    color.classList.add("active");

    localStorage.setItem(
      "selectedColor",
      [...color.classList].find((cls) => cls !== "choose-color-btn" && cls !== "active"),
    );
  });
});

const savedColor = localStorage.getItem("selectedColor");

if (savedColor) {
  colors.forEach((btn) => {
    btn.classList.remove("active");

    if (btn.classList.contains(savedColor)) {
      btn.classList.add("active");
    }
  });
}

const sizes = document.querySelectorAll(".choose-size-box");

sizes.forEach((size) => {
  size.addEventListener("click", () => {
    sizes.forEach((item) => item.classList.remove("active-size"));

    size.classList.add("active-size");

    localStorage.setItem("selectedSize", size.innerText.trim());
  });
});

const savedSize = localStorage.getItem("selectedSize");

if (savedSize) {
  sizes.forEach((size) => {
    if (size.innerText.trim() === savedSize) {
      size.classList.add("active-size");
    } else {
      size.classList.remove("active-size");
    }
  });
}

const toast = document.getElementById("toast");

const addCart = document.getElementById("add-cart");

addCart.addEventListener("click", () => {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
});

const wishlist = document.querySelector(".wishlist");

wishlist.addEventListener("click", () => {
  wishlist.classList.toggle("liked");

  localStorage.setItem("wishlist", wishlist.classList.contains("liked"));
});

if (localStorage.getItem("wishlist") === "true") {
  wishlist.classList.add("liked");
}

mainImage.addEventListener("mousemove", (e) => {
  const x = (e.offsetX / mainImage.clientWidth) * 100;

  const y = (e.offsetY / mainImage.clientHeight) * 100;

  mainImage.style.transformOrigin = `${x}% ${y}%`;

  mainImage.style.transform = "scale(1.8)";
});

mainImage.addEventListener("mouseleave", () => {
  mainImage.style.transform = "scale(1)";
});

document.querySelector(".share-btn")?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(location.href);

    toast.textContent = "Link Copied";

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      toast.textContent = "Added To Cart";
    }, 2000);
  } catch {}
});

const cartCount = document.getElementById("cart-count");

let cart = Number(localStorage.getItem("cartCount")) || 0;

cartCount.textContent = cart;

addCart?.addEventListener("click", () => {
  cart += quantity;

  cartCount.textContent = cart;

  localStorage.setItem("cartCount", cart);
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll(".heart-svg").forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("active");
  });
});

const cards = document.querySelector(".cards-div");

const left = document.querySelector(".left-arrow");

const right = document.querySelector(".right-arrow");

left?.addEventListener("click", () => {
  cards.scrollBy({
    left: -340,
    behavior: "smooth",
  });
});

right?.addEventListener("click", () => {
  cards.scrollBy({
    left: 340,
    behavior: "smooth",
  });
});

let autoSlide = setInterval(() => {
  cards?.scrollBy({
    left: 340,
    behavior: "smooth",
  });

  if (cards.scrollLeft + cards.clientWidth >= cards.scrollWidth - 10) {
    cards.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }
}, 4000);

cards?.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

cards?.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    cards.scrollBy({
      left: 340,
      behavior: "smooth",
    });

    if (cards.scrollLeft + cards.clientWidth >= cards.scrollWidth - 10) {
      cards.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, 4000);
});

window.addEventListener("scroll", () => {
  document.querySelector("header").classList.toggle("sticky", window.scrollY > 80);
});

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");

    ripple.className = "ripple";

    ripple.style.left = e.offsetX + "px";

    ripple.style.top = e.offsetY + "px";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

document.querySelectorAll("img").forEach((img) => {
  img.draggable = false;
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
const cards = [...document.querySelectorAll(".card")];

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 18;

    const rotateX = (y / rect.height - 0.5) * -18;

    card.style.transform = `
perspective(900px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)
`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const productImage = document.getElementById("main-image");

productImage?.addEventListener("dblclick", () => {
  productImage.classList.toggle("fullscreen");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    productImage.classList.remove("fullscreen");
  }
});

const notificationBtn = document.querySelector(".notification-btn");

notificationBtn?.addEventListener("click", () => {
  toast.textContent = "No New Notifications";

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");

    toast.textContent = "Added To Cart";
  }, 1800);
});

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.transform = "translateY(-2px)";
  });

  link.addEventListener("mouseleave", () => {
    link.style.transform = "";
  });
});

const price = document.querySelector(".current-price");

const originalPrice = Number(price.textContent.replace("$", ""));

function updatePrice() {
  const total = (originalPrice * quantity).toFixed(2);

  price.textContent = `$${total}`;
}

document.getElementById("plus-btn")?.addEventListener("click", updatePrice);

document.getElementById("minus-btn")?.addEventListener("click", updatePrice);

document.querySelectorAll(".dress-price").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.color = "#5D3FD3";
  });

  item.addEventListener("mouseleave", () => {
    item.style.color = "";
  });
});

const progress = document.querySelector(".recommend-fill");

if (progress) {
  let width = 0;

  const interval = setInterval(() => {
    width++;

    progress.style.width = width + "%";

    if (width >= 93) {
      clearInterval(interval);
    }
  }, 12);
}

document.querySelectorAll(".choose-size-box").forEach((box) => {
  box.addEventListener("mouseenter", () => {
    box.style.transform = "scale(1.05)";
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "";
  });
});

document.querySelectorAll(".choose-color-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.2)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("quantity", quantity);
});

const savedQuantity = Number(localStorage.getItem("quantity"));

if (savedQuantity) {
  quantity = savedQuantity;

  quantityText.textContent = quantity;

  updatePrice();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});
