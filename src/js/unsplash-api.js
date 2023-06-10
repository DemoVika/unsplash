export class Unsplash {
  #API_KEY = 'gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58';
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #query = '';
  async getPhotos(page) {
    return await fetch(
      `${
        this.#BASE_URL
      }?page=${page}&query=popular&per_page=9&orientation=portrait&client_id=${
        this.#API_KEY
      }`
    )
      .then(response => response.json())
      .catch(error => console.log(error.message));
  }

  async getPhotosByQuery(page) {
    return await fetch(
      `${this.#BASE_URL}?page=${page}&query=${
        this.#query
      }&per_page=9&orientation=portrait&client_id=${this.#API_KEY}`
    )
      .then(response => response.json())
      .catch(error => console.log(error.message));
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
