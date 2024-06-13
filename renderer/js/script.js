// const { ipcRenderer } = require("electron");

// Some JavaScript to load the image and show the form. There is no actual backend functionality. This is just the UI
const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

function loadImage(e) {
  const file = e.target.files[0];
  if(!isFileImage(file)) {
    alertError("Please select an image");
    return;
  }

  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function() {
    widthInput.value = this.width;
    heightInput.value = this.height;
  }
  console.log("success");
  form.style.display = "block";
  filename.innerText = file.name;
  outputPath.innerText = path.join(os.homedir(), "/Desktop/shrankimages");
}

function isFileImage(file) {
  const acceptedImageTypes = ["image/gif","image/png", "image/jpeg"];
  return file && acceptedImageTypes.includes(file["type"]);
}

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center"
    }
  })
}

function sendImage(e) {
  e.preventDefault();
  const width = widthInput.value;
  const height = heightInput.value;
  const imgPath = img.files[0].path;
  if(!img.files[0]) {
    alertError("Please upload an image");
    return;
  }
  if(width === "" || height === "") {
    alertError("Please fill in height and width");
  }
  ipcRenderer.send("image:resize", {
    imgPath,
    width,
    height
  })
}

ipcRenderer.on("image:done", () => {
  alertSuccess(`Image resized to ${widthInput.value} x ${heightInput.value}`)
})

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center"
    }
  })
}

img.addEventListener("change", loadImage);
form.addEventListener("submit", sendImage);


// const form = document.querySelector('#img-form');

// function loadImage(e) {
//   const file = e.target.files[0];

//   if (!isFileImage(file)) {
//       alert('Please select an image file');
//         return;
//   }

//   form.style.display = 'block';
//   document.querySelector(
//     '#filename'
//   ).innerHTML = file.name;
// }

// function isFileImage(file) {
//     const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
//     return file && acceptedImageTypes.includes(file['type'])
// }

// document.querySelector('#img').addEventListener('change', loadImage);
