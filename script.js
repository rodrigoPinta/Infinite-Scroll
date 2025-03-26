const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
// get api key

let count = 5;
const apiKey = "RzCBSwGKHBMVVcTK9ssd7xNJfvGdWVh4DGbAeUW7lhw";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check image loaders
function imageLoaded() {
  imagesLoaded++;
  if ((imagesLoaded = totalImages)) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

// helper function to set attributes on DOM elements
//??

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links and photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // create anchor element to link to unsplash;
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create image for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.atl_description,
    });

    // event listener, check when each is finished loading;

    img.addEventListener("load", imageLoaded);
    // put img inside archor element and both inside image container element;
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos com unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //error
  }
}

// checkto see if scrolling near bottom of page, Load More Photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
