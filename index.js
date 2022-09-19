const getPostsHome = () => {
  fetch("https://jsonplaceholder.typicode.com/posts?_start=0&_end=3")
    .then((response) => response.json())
    .then((response) => {
      let data = "";
      response.forEach((post) => {
        data += `
         <div class="card card-project">
          <img
            src="${getDifferentImage()}"
            alt="Project image"
          />
          <h4 id="titleProjectCard" class="card-title">Simplify</h4>
          <p id="bodyProjectCard" class="card-body-project">
            Ui design & App development
          </p>
          <a id="linkToProject" href="./pages/project.html">Learn more</a>
        </div>
        `;
      });

      document.querySelector("#cardsProjects").innerHTML = data;
    })
    .catch((error) => console.log(error));
};

document.querySelector("#clients").addEventListener("load", getPostsHome);
