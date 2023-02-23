// Описаний в документації
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let timeUpdateJSON = '';
let currentTime = 0;

// При роботі плеєра виконується запис до сховища з інтервалом 1 сек
player.on(
  'timeupdate',
  throttle(timeUpdate, 1000)
);

// Відстеження оновлення сторінки та завантаження із сховища данних
document.addEventListener('DOMContentLoaded', event => {
  try {
    currentTime =
      JSON.parse(localStorage.getItem('videoplayer-current-time')).seconds || 0;
  } catch (error) {
    console.log('Збережений час некоректний'); // "SyntaxError"
  }
  console.log(currentTime);
  player.setCurrentTime(currentTime);
});

// Функція запису до сховища
function timeUpdate(timeupdate) {timeUpdateJSON = JSON.stringify(timeupdate);
localStorage.setItem('videoplayer-current-time', timeUpdateJSON);}