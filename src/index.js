import { PhotoApi } from './photosAPI';

const refs = {
  formEl: document.querySelector('.search-form'),
  searchBtnEl: document.querySelector('.search-btn'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.js-load-more'),
};

refs.formEl.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

const photoApi = new PhotoApi();

function onSearchFormSubmit(event) {
  event.preventDefault();
  // console.log('hi');

  photoApi.query = event.target.elements.searchQuery.value.trim();

  photoApi
    .searchPhoto()
    .then(data => {
      console.log('data', data);
      // console.log('look', data.results);
      refs.galleryEl.innerHTML = renderMarkup(data.hits);
      // console.log('look', renderMarkup(data.hits));
      refs.loadMoreBtn.classList.remove('.is-hidden');
    })
    .catch(err => {
      console.log(err);
    });
}

function onLoadMoreBtnClick(e) {
  photoApi.page += 1;
  photoApi.searchPhoto();
}

function renderMarkup(data) {
  // console.log('photosInfo', data.hits[0].likes);
  // console.log(data.hits);
  const markup = data
    .map(el => {
      return `<div class="photo-card">
     <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width = "300"  class = "photo-card-img" />
     <div class="info">
     <p class="info-item">
      <b>Likes </b><span class="info-item-el">${el.likes}</span>
  
    </p>
    <p class="info-item">
      <b>Views </b><span class="info-item-el">${el.views}</span>
    </p>
    <p class="info-item">
      <b>Comments </b><span class="info-item-el">${el.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads </b><span class="info-item-el">${el.downloads}</span>
    </p>
  </div>
</div>`;
    })
    .join('');
  // refs.galleryEl.innerHTML = markup;
  return markup;
  // console.log('markup', markup);
}
