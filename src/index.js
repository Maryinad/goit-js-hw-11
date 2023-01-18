import { PhotoApi } from './photosAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formEl: document.querySelector('.search-form'),
  searchBtnEl: document.querySelector('.search-btn'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.js-load-more'),
};

refs.formEl.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

const photoApi = new PhotoApi();

async function onSearchFormSubmit(event) {
  event.preventDefault();
  // console.log('hi');
  refs.searchBtnEl.disabled = true;

  photoApi.query = event.target.elements.searchQuery.value.trim();
  photoApi.page = 1;

  try {
    const { data } = await photoApi.searchPhoto(); // const response = {data} деструкторизация
    console.log(data);
    if (data.hits.length === 0) {
      Notify.warning('Sorry, not found this image');
      refs.searchBtnEl.disabled = false;
      event.target.reset();
      refs.galleryEl.innerHTML = '';
      refs.loadMoreBtn.classList.add('js-is-hidden');
      return;
    }
    if (data.total >= 40) {
      refs.loadMoreBtn.classList.remove('js-is-hidden');
    }
    refs.galleryEl.innerHTML = renderMarkup(data.hits);
  } catch (err) {
    console.log(err);
  }

  refs.searchBtnEl.disabled = false;
  simpLightbox.refresh();

  // ---------------- then/catch-------------

  // photoApi
  //   .searchPhoto()
  //   .then(({ data }) => {
  //     // console.log(data);
  //     if (data.hits.length === 0) {
  //       Notify.warning('Sorry, not found this image');
  //       event.target.reset();
  //       refs.galleryEl.innerHTML = '';
  //       refs.loadMoreBtn.classList.add('js-is-hidden');
  //       return;
  //     }
  //     if (data.total >= 40) {
  //       refs.loadMoreBtn.classList.remove('js-is-hidden');
  //     }
  //     // console.log('data', data);
  //     // console.log('look', data.results);
  //     refs.galleryEl.innerHTML = renderMarkup(data.hits);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  //   .finally(() => {
  //     refs.searchBtnEl.disabled = false;
  //     simpLightbox.refresh();
  //   });
}

let simpLightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
});

async function onLoadMoreBtnClick(e) {
  photoApi.page += 1;

  try {
    const { data } = await photoApi.searchPhoto(); //response
    refs.galleryEl.insertAdjacentHTML('beforeend', renderMarkup(data.hits));
    Notify.info(`Hooray! We found ${data.totalHits} images.`);

    simpLightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (data.hits.length === 0) {
      refs.loadMoreBtn.classList.add('js-is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    console.log(err);
  }
}

function renderMarkup(data) {
  // console.log('photosInfo', data.hits[0].likes);
  // console.log(data.hits);
  const markup = data
    .map(el => {
      return `<div class="photo-card">
       <a class="photo-card-item" href="${el.largeImageURL}">
      <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width = "300"  class = "photo-card-img" />
      </a>
    
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
