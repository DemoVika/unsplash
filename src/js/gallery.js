import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { UnsplashAPI } from './unsplash-api';
import { createGallery } from './markup.js';

const unsplashAPI = new UnsplashAPI();

const searchFormEl = document.querySelector('.js-search-form');
searchFormEl.addEventListener('submit', searchPhotos);

const paginationContainerEl = document.getElementById(
  'tui-pagination-container'
);

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  fileExt: false,
});

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

    lightBox.refresh();
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

    lightBox.refresh();
  } catch (error) {
    console.log(error);
  }
}
