import { PhotoApi } from './photosAPI';

const photoApi = new PhotoApi();

const refs = {
  formEl: document.querySelector('.search-form'),
  searchBtnEl: document.querySelector('.search-btn'),
  galleryEl: document.querySelector('.gallery'),
};

refs.formEl.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(event) {
  event.preventDefault();
  console.log('hi');

  photoApi.query = event.target.elements.searchQuery.value.trim();

  photoApi
    .searchPhoto()
    .then(data => {
      renderMarkup(data);
    })
    .catch(err => {
      console.log(err);
    });
}

function renderMarkup(photosInfo) {
  console.log('photosInfo', photosInfo);
  const markup = photosInfo.hits.map(el => {
    return `<div class="photo-card">
  <img src="${el.webformatURL}" alt="${el.tag}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${el.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${el.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${el.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${el.downloads}
    </p>
  </div>
</div>`;
  });
  console.log('markup', markup);
  //   .join('');
  // refs.galleryEl.innerHTML = markup;
}
