// Описаний в документації
import throttle from 'lodash.throttle';

let feedback = {};
let currentTextForm = {};
let currentTextFormJSON = '';
let localStorageTextForm = {
  email: '',
  textarea: '',
};

const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');
const formEl = document.querySelector('form');

//Функція, яка під час submit форми очищує сховище і поля форми, а також виводить у консоль об'єкт з полями email, message та їхніми поточними значеннями.
function handleButtonClick(event) {
  event.preventDefault();
  feedback.email = inputEl.value;
  feedback.textarea = textareaEl.value;
  console.log(feedback);
  inputEl.value = '';
  textareaEl.value = '';
  localStorage.clear();
}

//Прослуховування форми на наявність input та submit
formEl.addEventListener('submit', handleButtonClick);
formEl.addEventListener('input', throttle(setLocalStorage, 500));

//Функція що зберігає данні у localStorage
function setLocalStorage() {
  currentTextForm.email = inputEl.value;
  currentTextForm.textarea = textareaEl.value;
  currentTextFormJSON = JSON.stringify(currentTextForm);
  console.log(currentTextFormJSON);
  localStorage.setItem('feedback-form-state', currentTextFormJSON);
}

// Відстеження оновлення сторінки та завантаження із сховища данних
document.addEventListener('DOMContentLoaded', event => {
  try {
    localStorageTextForm = JSON.parse(
      localStorage.getItem('feedback-form-state') || {}
    );
  } catch (error) {
    console.log('Данні некоректні або відсутні');
  }
  console.log(localStorageTextForm);
  inputEl.value = localStorageTextForm.email;
  textareaEl.value = localStorageTextForm.textarea;
});
