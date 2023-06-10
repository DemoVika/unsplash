const galleryEl = document.querySelector('.js-gallery');

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `
    <li class="gallery__item">
      <img class="gallery-img" src="${image.urls.small}" alt="${image.alt_description}" loading="lazy" />
    </li>
    `;
    })
    .join('');

  galleryEl.innerHTML = markup;
}
