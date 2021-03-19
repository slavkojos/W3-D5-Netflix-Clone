const url = "https://striveschool-api.herokuapp.com/api/movies/";
const auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZTIxMjg5YzI2ZjAwMTU3ZjljMjIiLCJpYXQiOjE2MTYxNTkzMjEsImV4cCI6MTYxNzM2ODkyMX0.yycemhDdGvZmUnZJG5XvODHnYE6r8qVICvGVeMacRtQ";
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let category = urlParams.get("category");
console.log(category);
const fetchProduct = async () => {
  try {
    let response = await fetch(`${url}horror/${id}`, {
      headers: {
        Authorization: auth,
      },
    });
    console.log(response);
    let data = await response.json();
    console.log(data);
    let myMovie = {
      name: document.getElementById("name-input"),
      description: document.getElementById("description-input"),
      category: document.getElementById("category-input"),
      imageUrl: document.getElementById("image-url-input"),
    };
    myMovie.name.value = data.name;
    myMovie.description.value = data.description;
    myMovie.category.value = data.category;
    myMovie.imageUrl.value = data.imageUrl;
  } catch (error) {}
};

const handleSubmit = async (event) => {
  event.preventDefault();
  let myMovie = {
    name: document.getElementById("name-input").value,
    description: document.getElementById("description-input").value,
    category: document.getElementById("category-input").value,
    imageUrl: document.getElementById("image-url-input").value,
  };
  console.log(myMovie);
  try {
    let response = await fetch(url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(myMovie),
    });
    if (response.ok) {
      alert("Event was edited successfully");
    } else {
      console.log(response.body);
      alert("something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};
window.onload = fetchProduct;
