const urlsImgProjects = [
  "https://drive.google.com/uc?export=view&id=1a-7rFlxvHg0g6yfl7hAVksayYQkJzk1b",
  "https://drive.google.com/uc?export=view&id=1Vg3OCJ0t9R26v0p7Q5xX8eGOJcnZuU9n",
  "https://drive.google.com/uc?export=view&id=1KfqL-SDNn7t4ZTsH5hrMF5DRG3NBBl1r",
  "https://drive.google.com/uc?export=view&id=13Gzge02yovXAhEC-BR6_KpxcufcToTsR",
  "https://drive.google.com/uc?export=view&id=16rKQVZ9g4QZluatqPMqL_7zZjrZOacd-",
  "https://drive.google.com/uc?export=view&id=18ZwmbDNoL2dhIApXMrfMTmyjUCinDYjq",
];
const getImageUrl = (number) => urlsImgProjects[number - 1];

function addPostsCards(start, end) {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_end=${end}`
  )
    .then((response) => response.json())
    .then((res) => {
      let data = "";
      res.forEach((post) => {
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
          <a id="linkToProject" href="../pages/project.html">Learn more</a>
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
          alt="Blurred image"
        />
      </div>
        <p class="margin-small-top">
          ${content.body}
        </p>
        `
    )
    .catch((error) => console.log(error));
}
