import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import { UnsplashAPI } from './unsplash-api';
import { createGallery } from './markup.js';

const unsplashAPI = new UnsplashAPI();

const searchFormEl = document.querySelector('.js-search-form');
searchFormEl.addEventListener('submit', searchPhotos);

const paginationContainerEl = document.getElementById(
  'tui-pagination-container'
);

const options = {
  totalItems: 0,
  itemsPerPage: 16,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination(paginationContainerEl, options);

pagination.on('afterMove', event => {
  unsplashAPI.getPhotos(event.page).then(({ results }) => {
    createGallery(results);
  });
});

getPhotos();

function searchPhotos(e) {
  e.preventDefault();

  const query = searchFormEl.elements.query.value;
  unsplashAPI.query = query.trim();

  searchFormEl.reset();

  getPhotos();
}

async function getPhotos() {
  try {
    const { total, results } = await unsplashAPI.getPhotos();
    pagination.reset(total);

    createGallery(results);
  } catch (error) {
    console.log(error);
  }
}
