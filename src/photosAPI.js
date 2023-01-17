BASE_URL = 'https://pixabay.com/api/';
API_KEY = '32875962-75e3deeecb029b3447d6e6fc0';

export class PhotoApi {
  constructor() {
    this.page = 1;
    this.query = '';
  }

  searchPhoto() {
    const params = new URLSearchParams({
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      key: API_KEY,
      page: this.page,
      per_page: 40,
    });

    return fetch(`${BASE_URL}?${params}`).then(res => {
      if (!res.ok) {
        throw res.status;
      }
      return res.json();
    });
  }
}
