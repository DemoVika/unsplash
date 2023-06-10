import Axios from 'axios';

export class UnsplashAPI {
  #API_KEY = 'gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58';
  #BASE_URL = 'https://api.unsplash.com';
  #query = 'popular';

  #axiosInstance = Axios.create({
    baseURL: this.#BASE_URL,
    params: {
      per_page: 20,
      orientation: 'portrait',
      client_id: this.#API_KEY,
    },
  });

  async getPhotos(page = 1, query = this.#query) {
    const params = { params: { page, query } };

    return await this.#axiosInstance
      .get('/search/photos', params)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  /**
   * @param {string} newQuery
   */
  set query(newQuery) {
    this.#query = newQuery;
  }
}
