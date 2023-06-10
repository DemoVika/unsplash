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
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination(paginationContainerEl, options);
// let page = pagination.getCurrentPage();

pagination.on('afterMove', event => {
  unsplashAPI.getPhotos(event.page).then(({ results }) => {
    console.log('Get photos...');
    createGallery(results);
  });
});

unsplashAPI.getPhotos().then(({ total, results }) => {
  console.log('Initial page...', total);

  pagination.reset(total);

  createGallery(results);
});

function searchPhotos(e) {
  console.log('searchPhotos...');

  e.preventDefault();

  const query = searchFormEl.elements.query.value;
  unsplashAPI.query = query.trim();

  searchFormEl.reset();

  unsplashAPI.getPhotos(query).then(({ total, results }) => {
    pagination.reset(total);

    createGallery(results);
  });
}