const urlsImgProjects = [
  "https://drive.google.com/uc?export=view&id=1a-7rFlxvHg0g6yfl7hAVksayYQkJzk1b",
  "https://drive.google.com/uc?export=view&id=1Vg3OCJ0t9R26v0p7Q5xX8eGOJcnZuU9n",
  "https://drive.google.com/uc?export=view&id=1KfqL-SDNn7t4ZTsH5hrMF5DRG3NBBl1r",
  "https://drive.google.com/uc?export=view&id=13Gzge02yovXAhEC-BR6_KpxcufcToTsR",
  "https://drive.google.com/uc?export=view&id=16rKQVZ9g4QZluatqPMqL_7zZjrZOacd-",
  "https://drive.google.com/uc?export=view&id=18ZwmbDNoL2dhIApXMrfMTmyjUCinDYjq",
];
const getImageUrl = (number) => urlsImgProjects[number - 1];

function addPostsHome(start, end) {
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_end=${end}`
  )
    .then((response) => response.json())
    .then((res) => {
      let data = "";
      // console.log(res);
      res.forEach((post) => {
        data += `
         <div class="card card-project">
          <img
            src="${getImageUrl(post.id)}"
            alt="${post.title} featured image"
          />
          <h4 class="card-title">${post.title}</h4>
          <p class="card-body-project">
            ${post.body.split(" ", 4).join(" ")}...
          </p>
          <a id="linkToProject" href="./pages/project.html">Learn more</a>
        </div>
        `;
      });
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
}
