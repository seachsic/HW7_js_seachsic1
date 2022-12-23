import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const galleryMarkup = makeGalleryMarkup(galleryItems);
gallery.insertAdjacentHTML('beforeend', galleryMarkup);
gallery.addEventListener('click', openInstanceModal);

function makeGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
};

const instance = basicLightbox.create(
  `<img src="" />`,
  {
    onShow: () => {
      console.log('add listener ');
      document.addEventListener('keydown', escBtnClose);
    },
    onClose: () => {
      console.log('remove listener ');
      document.removeEventListener('keydown', escBtnClose);
    },
  }
);

function escBtnClose(e) {
  if (e.code === 'Escape') {
    instance.close();
  }
};

function openInstanceModal(e) {
  e.preventDefault();
  instance.element().querySelector('img').src = e.target.dataset.source;
  instance.show();
};