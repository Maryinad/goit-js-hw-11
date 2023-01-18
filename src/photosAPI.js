import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32875962-75e3deeecb029b3447d6e6fc0';

export class PhotoApi {
  constructor() {
    this.page = 1;
    this.query = '';
  }

  searchPhoto() {
    const searchParams = {
      params: {
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        key: API_KEY,
        page: this.page,
        per_page: 40,
      },
    };
    // const params = new URLSearchParams({
    //   q: this.query,
    //   image_type: 'photo',
    //   orientation: 'horizontal',
    //   safesearch: true,
    //   key: API_KEY,
    //   page: this.page,
    //   per_page: 40,
    // });

    return axios.get(`${BASE_URL}`, searchParams);

    // return fetch(`${BASE_URL}?${params}`).then(res => {
    //   if (!res.ok) {
    //     throw res.status;
    //   }
    //   return res.json();
    // });
  }
}
