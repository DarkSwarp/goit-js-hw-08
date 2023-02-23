// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';


console.log(galleryItems);
const galleryBox = document.querySelector('.gallery');

// Створення розмітки галереї

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<a class = "gallery__item" href = "${original}" target = "_self"><img class = "gallery__image" src = "${preview}" alt = "${description}"></a>`
  )
  .join('');
galleryBox.insertAdjacentHTML('beforeend', galleryMarkup);
const lightbox = new SimpleLightbox('.gallery a', {
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
