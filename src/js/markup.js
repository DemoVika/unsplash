const galleryEl = document.querySelector('.js-gallery');

export function createGallery(images) {
  galleryEl.innerHTML = images
    .map(image => {
      return `
    <li class="gallery__item">
      <a class="gallery-link" href="${image.urls.regular}">
        <img class="gallery-image" src="${image.urls.small}" alt="${image.alt_description}" loading="lazy" />
      </a>
    </li>
    `;
    })
    .join('');
}
