'use strict';

const cartButton = document.querySelector("#cart-button"); // получили кнопку "корзина"
const modal = document.querySelector(".modal"); // получаем скрытое модальное окно
const close = document.querySelector(".close"); // получаем кнопку "закрыть" модльного окна

cartButton.addEventListener("click", toggleModal); // слушатель на кнопку корзина
close.addEventListener("click", toggleModal); // слушатель на кнопку закрыть

function toggleModal() { // при срабатывании слушателя
  modal.classList.toggle("is-open"); // добавляет-убирает класс "is-open"
}

// ============================= day 1 ===============================================
// ================== работа с формой авторизации ====================================

const buttonAuth = document.querySelector('.button-auth'); // получили кнопку "войти"
const modalAuth = document.querySelector('.modal-auth'); // получили модальное окно авторизации
const logInForm = document.querySelector('#logInForm'); // внутренности формы авторизации
const loginInput = document.querySelector('#login'); // логин формы вводаы
const userName = document.querySelector('.user-name'); // span с именем пользователя
const buttonOut = document.querySelector('.button-out'); // кнопка выхода

let login = localStorage.getItem('gloDelivery'); // получение имя пользователя из памяти

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open"); // добавляет-убирает класс "is-open"
};

const closeAuth = document.querySelector('.close-auth'); // получили кнопку закрытия модального окна автоизации

// === когда пользователь авторизован или не авторизован : ===

function authorized() {

  function logOut() {// ф-ция при нажатии на кнопку выйти
    login = ''; 
    
    localStorage.removeItem('gloDelivery'); // удалить данные из памяти, если пользов. нажал "выйти"

    buttonAuth.style.display = ''; // если не автоизованы - вернуться к тому, что прописано в html
    buttonOut.style.display = ''; // есди не авторизованы - 
    userName.style.display = ''; // есди не авторизованы - 

    buttonOut.removeEventListener('click', logOut); // очистка события, чтобы ф-ция запускалась 1 раз

    checkAuth();
  };

  userName.textContent = login;

  console.log('Авторизован');
  buttonAuth.style.display = 'none'; // если автоизованы - спрятать кнопку "войти"
  buttonOut.style.display = 'block'; // есди авторизованы - показать кнопку "выйти"
  userName.style.display = 'inline'; // есди авторизованы - показать имя пользователя

  buttonOut.addEventListener('click', logOut); // при клике на кнопку "выйти"
}; 

function notAuthorized() {

  function logIn(event) {
    event.preventDefault(); // отменить автоматическую перезагрузку страницы по умолчанию.
    if (loginInput.value !== '') {
      login = loginInput.value; // сохранили значение логина
      localStorage.setItem('gloDelivery', login); // setItem - добавляет свойство и значание в память

      toggleModalAuth(); // спрятать модальное окно
    } else {
      alert ('Введите имя пользователя!');
    }

    
    buttonAuth.removeEventListener('click', toggleModalAuth); // очистка событий, чтобы ф-ция запускалась 1 раз
    closeAuth.removeEventListener('click', toggleModalAuth); 
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset(); // обнуление поля логина
    checkAuth(); // проверка, произошла ли авторизация
  };

  buttonAuth.addEventListener('click', toggleModalAuth); 
  closeAuth.addEventListener('click', toggleModalAuth); 
  logInForm.addEventListener('submit', logIn); // submit - это событие отправки данных 
};


function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
};

checkAuth(); 

// ============================= day 2 ===============================================
// ================== работа карточками ресторанов ===================================

const cardsRestaurants = document.querySelector('.cards-restaurants'); // блок карточкой ресторана
const containerPromo = document.querySelector('.container-promo'); // блок с промо
const restaurants = document.querySelector('.restaurants'); // блок со всеми ресторанами
const menu = document.querySelector('.menu'); // блок с меню ресторана
const logo = document.querySelector('.logo'); // логотип картинка
const cardsMenu = document.querySelector('.cards-menu'); // меню ресторана 

function createCardResttaurant() { // ф-ция по созданию карточек ресторанов
  
  const card = `
    <a class="card card-restaurant"> 
      <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
       <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Тануки</h3>
          <span class="card-tag tag">60 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 1 200 ₽</div>
          <div class="category">Суши, роллы</div>
          </div>
        </div>
    </a>` ;// переменная с версткой карточки

    cardsRestaurants.insertAdjacentHTML('beforeend', card); // метод для вставки элементов на страницу
};

createCardResttaurant();
createCardResttaurant();
createCardResttaurant();

function openGoods(event){ // ф-ция для открытия карточек ресторанов. Чтобы определить, на какую карточку мы кликнули использ event
  const target = event.target; // получаем элемент, на который кликнули 
  const restaurant = target.closest('.card-restaurant'); // поднимается вверх по родителям, пока не дойдет до нужного (вся карточка)

  if (restaurant) { // проверяем кликнули на карточку или мимо
    containerPromo.classList.add('hide');  // скрыть блоки, которые сейчас на странице
    restaurants.classList.add('hide'); // скрыть блоки, которые сейчас на странице
    menu.classList.remove('hide'); // показать блок с меню ресторана, удалив класс hide

    cardsMenu.textContent = ''; // очищаем меню ресторана, чтобы не было повторов при втором заходе

    createCardGood(); // ф-ция для создания карточек с едой в ресторане
    createCardGood();
    createCardGood();
    createCardGood();
  }
  
};

function createCardGood(){
  const card = document.createElement('div'); // создаем тег div 
  card.className = 'card'; // добавили созданному div класс card
  card.insertAdjacentHTML('beforeend',  `
      <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">Пицца Везувий</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
            «Халапенье», соус «Тобаско», томаты.
          </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">545 ₽</strong>
        </div>
      </div>
  `); // вставляем верстку в наш div

  cardsMenu.insertAdjacentElement('beforeend', card); // вставляем созданную карточку с продуктом в меню ресторана
};

cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function(){ // при клике на лого, вернуть все, как было, до клика на карточку ресторана
  containerPromo.classList.remove('hide');  
  restaurants.classList.remove('hide'); 
  menu.classList.add('hide'); 
});

// ф-ция для формирования карточек блюд в ресторане

