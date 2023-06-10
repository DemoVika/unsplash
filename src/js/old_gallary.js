import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { Unsplash } from './unsplash-api';

const formEl = document.querySelector('.js-search-form');
const listEl = document.querySelector('.js-gallery');

const options = {
  totalItems: 0,
  itemsPerPage: 9,
  visiblePages: 5,
  page: 1,
};

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();
console.log(page);

const service = new Unsplash();

service.getPhotos(page).then(({ total, results }) => {
  pagination.reset(total);
  const gallery = markUp(results);
  listEl.insertAdjacentHTML('afterbegin', gallery);
});

function markUp(images) {
  return images
    .map(
      image =>
        `<li class="gallery__item"> <img class="gallery-img"src='${image.urls.small}' alt='${image.alt_description}'/> </li>`
    )
    .join('');
}

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const { query } = event.target.elements;
  const reserchValue = query.value.trim();

  service.query = reserchValue;

  pagination.off('afterMove', slidePage);

  pagination.off('afterMove', getByQuery);

  service.getPhotosByQuery(page).then(({ total, results }) => {
    listEl.innerHTML = '';
    const gallery = markUp(results);
    listEl.insertAdjacentHTML('afterbegin', gallery);
  });
  pagination.on('afterMove', getByQuery);
});

function slidePage(event) {
  console.log(event.page);
  service.getPhotos(event.page).then(({ results }) => {
    const gallery = markUp(results);
    listEl.innerHTML = '';
    listEl.insertAdjacentHTML('afterbegin', gallery);
  });
}

pagination.on('afterMove', slidePage);

function getByQuery(event) {
  console.log(event.page);
  service.getPhotosByQuery(event.page).then(({ results }) => {
    const gallery = markUp(results);
    listEl.innerHTML = '';
    listEl.insertAdjacentHTML('afterbegin', gallery);
  });
}
