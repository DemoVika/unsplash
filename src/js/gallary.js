import { Unsplash } from './unsplash-api';

const formEl = document.querySelector('.js-search-form');
const listEl = document.querySelector('.js-gallery');

const service = new Unsplash();
console.log(service.getPhotos(1));

service.getPhotos(1).then(({ total, results }) => {
  const gallary = markUp(results);
  listEl.insertAdjacentHTML('afterbegin', gallary);
});

function markUp(images) {
  return images
    .map(
      image =>
        `<li class="gallery__item"> <img class="gallery-img"src='${image.urls.small}' alt='${image.alt_description}'/> </li>`
    )
    .join('');
}
