const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".responsive");
const navbar = document.querySelector(".navbar");
let open = false;

// Hamburger Menu
const resOpen = () => {
  setTimeout(() => {
    menu.style.display = "block";
  }, 300);
  navbar.style.height = "30vh";
  navbar.style.transition = "height 0.5s ease-in-out";
};
const resClose = () => {
  menu.style.display = "none";
  navbar.style.height = "10vh";
  navbar.style.transition = "height 0.5s ease-in-out";
};
hamburger.addEventListener("click", () => {
  open = !open;
  if (open) {
    resOpen();
  } else {
    resClose();
  }
});
document.querySelectorAll(".responsive li").forEach((link) => {
  link.addEventListener("click", () => {
    resClose();
  });
});

// Typewriter effect
class TypeWriter {
  constructor(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new TypeWriter(txtElement, words, wait);
}

// Mail function
var form = document.querySelector(".form");
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.querySelector("#status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      //   console.log(response);
      status.innerHTML = "Thanks for your submission!";
      status.classList.add("success");
      form.reset();
    })
    .catch((error) => {
      //   console.log(error);
      status.innerHTML = "Oops! There was a problem submitting your form";
      status.classList.add("error");
    });
}
form.addEventListener("submit", handleSubmit);
