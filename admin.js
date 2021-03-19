const submitForm = document.getElementById("submit-form");
const url = "https://striveschool-api.herokuapp.com/api/movies/";
const auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZTIxMjg5YzI2ZjAwMTU3ZjljMjIiLCJpYXQiOjE2MTYxNTkzMjEsImV4cCI6MTYxNzM2ODkyMX0.yycemhDdGvZmUnZJG5XvODHnYE6r8qVICvGVeMacRtQ";
const handleSubmit = async (event) => {
  event.preventDefault();

  let myMovie = {
    name: document.getElementById("name-input").value,
    description: document.getElementById("description-input").value,
    category: document.getElementById("category-input").value,
    imageUrl: document.getElementById("image-url-input").value,
  };

  //console.log(myMovie);
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(myMovie),
    });
    if (response.ok) {
      alert("Event was created successfully");
    } else {
      console.log(response.body);
      alert("something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

const editOrDeleteDiv = document.getElementById("editordelete");
const categorySwitch = document.getElementById("category-switch");

const fetchCollection = async () => {
  try {
    let response = await fetch(url + `${categorySwitch.value}`, {
      headers: {
        Authorization: auth,
      },
    });
    console.log(response);
    let data = await response.json();
    console.log("category", categorySwitch.value);
    console.log("data", data);

    data.forEach((item) => {
      editOrDeleteDiv.innerHTML = "";
      const itemDiv = document.createElement("div");
      editOrDeleteDiv.appendChild(itemDiv);
      itemDiv.classList.add("d-flex", "w-100", "border", "align-items-center");
      itemDiv.setAttribute("id", `${item._id}`);
      const itemName = document.createElement("h6");
      itemDiv.appendChild(itemName);
      itemName.innerHTML = `Movie name: <span class="font-weight-normal">${item.name}</span>`;
      itemName.classList.add("flex-grow-1");
      const buttonsDiv = document.createElement("div");
      itemDiv.appendChild(buttonsDiv);
      itemDiv.classList.add("d-flex");
      const editButton = document.createElement("a");
      const deleteButton = document.createElement("button");
      buttonsDiv.appendChild(editButton);
      buttonsDiv.appendChild(deleteButton);
      editButton.innerText = "Edit";
      deleteButton.innerText = "Delete";
      editButton.classList.add("btn", "btn-primary", "mx-2");
      deleteButton.classList.add("btn", "btn-danger", "mx-2");
      deleteButton.onclick = handleDelete;
      editButton.setAttribute("href", `edit.html?category=${categorySwitch.value}&id=${item._id}`);
    });
  } catch (error) {}
};

const handleDelete = async (event) => {
  const id = event.target.parentNode.parentNode.id;
  try {
    let response = await fetch(url + id, {
      method: "DELETE",
      headers: {
        Authorization: auth,
      },
    });
    if (response.ok) {
      alert("movie deleted successfully");
    } else {
      alert("something went wrong with the deletion process");
    }
  } catch (error) {}
};
categorySwitch.onchange = fetchCollection;
window.onload = fetchCollection;
