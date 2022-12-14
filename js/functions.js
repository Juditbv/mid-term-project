const urlsImgProjects = [
  "https://drive.google.com/uc?export=view&id=1a-7rFlxvHg0g6yfl7hAVksayYQkJzk1b",
  "https://drive.google.com/uc?export=view&id=1Vg3OCJ0t9R26v0p7Q5xX8eGOJcnZuU9n",
  "https://drive.google.com/uc?export=view&id=1KfqL-SDNn7t4ZTsH5hrMF5DRG3NBBl1r",
  "https://drive.google.com/uc?export=view&id=13Gzge02yovXAhEC-BR6_KpxcufcToTsR",
  "https://drive.google.com/uc?export=view&id=16rKQVZ9g4QZluatqPMqL_7zZjrZOacd-",
  "https://drive.google.com/uc?export=view&id=18ZwmbDNoL2dhIApXMrfMTmyjUCinDYjq",
];
const formContactPage = document.querySelector("#contactPage");
const projectsHome = document.querySelector("#cardsProjectsRecent");
const projectsProject = document.querySelector("#cardsProjectsOther");
const menuMob = document.querySelector(".menu-mobile");
const button = document.querySelector(".button-burger");

const getImageUrl = (number) => urlsImgProjects[number - 1];

if (projectsHome) {
  window.addEventListener("load", () => {
    addPostsCards(0, 3).then((html) => (projectsHome.innerHTML = html));
  });
} else if (projectsProject) {
  window.addEventListener("load", () => {
    const postId = getUrlParam("post");
    addContentPost(postId).then((content) => {
      document.querySelector("#projectBody").innerHTML = content;
    });
    addPostsCards(3, 6).then((html) => {
      projectsProject.innerHTML = html;
    });
  });
}

function addPostsCards(start, end) {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_end=${end}`
  )
    .then((response) => response.json())
    .then((res) => {
      let data = "";
      res.forEach((post) => {
        const linkCard = `../pages/project.html?post=${post.id}`;
        data += `
         <div class="card card-project">
          <img
            src="${getImageUrl(post.id)}"
            alt="${post.title} featured image"
          />
          <div class="card-content flex">
          <div>
          <h4>${post.title}</h4>
          <p class="card-body">
            ${post.body.split(" ", 4).join(" ")}...
          </p>
          </div>
          <a id="linkToProject" href=${linkCard}>Learn more</a>
          </div>
        </div>
        `;
      });
      return data;
    })
    .catch((error) => console.log(error));
}

function addContentPost(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json())
    .then(
      (content) =>
        `
         <div class="flex header-post">
        <div>
          <h1>${content.title}</h1>
          <h4>${content.body.split(" ", 4).join(" ")}</h4>
        </div>
        <p class="text-lead-regular date-completed">
          Completed on
          <span class="text-meta">${content.id}/10/22</span>
        </p>
      </div>
      <div class="img-project margin-medium-top">
        <img
          src="${getImageUrl(content.id)}"
          alt="Featured image project"
        />
        <img
          src="${getImageUrl(content.id)}"
          alt="Featured image project"
        />
      </div>
        <p class="margin-small-top">
          ${content.body}
        </p>
        `
    )
    .catch((error) => console.log(error));
}

function getUrlParam(paramName) {
  const params = new URLSearchParams(document.location.search);
  return params.get(paramName);
}

if (formContactPage) {
  document.querySelector("#contactPage").addEventListener("submit", addPost);
  function addPost(form) {
    form.preventDefault();

    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone").value;
    let message = document.querySelector("#message").value;

    fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json, text/plain",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        body: message,
      }),
    })
      .then((response) => response.json())
      .then((formData) => console.log(formData))
      .then(() => {
        let message = `<div id="formMessageOk" class="flex">
        <h6 class="text-small">Thanks for your message!</h6>
      </div>`;
        document.querySelector("#formMessage").innerHTML = message;
      })
      .catch(() => {
        let message = `<div id="formMessageKo" class="flex">
        <h6 class="text-small">Something went wrong, try it again!</h6>
      </div>`;
        document.querySelector("#formMessage").innerHTML = message;
      });

    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#message").value = "";
  }
}

const displayMenu = () => {
  menuMob.toggleAttribute("active");
  button.toggleAttribute("active");
};
document.querySelector(".button-burger").addEventListener("click", displayMenu);

const outMobileMenu = () => {
  menuMob.removeAttribute("active");
  button.removeAttribute("active");
};
window.addEventListener("resize", outMobileMenu);
