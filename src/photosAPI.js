BASE_URL = 'https://pixabay.com/api/';
API_KEY = '32875962-75e3deeecb029b3447d6e6fc0';

export class PhotoApi {
  page = 1;
  query = '';

  searchPhoto(query) {
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

    // return fetch(
    //   'https://pixabay.com/api/?key=32875962-75e3deeecb029b3447d6e6fc0&q=brit&image_type=photo&orientation=horizontal&safesearch=true'
    // ).then(res => {
    //   console.log(res);
    // });
  }
}
