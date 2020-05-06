const cartButton = document.querySelector("#cart-button"); // получили кнопку "корзина"
const modal = document.querySelector(".modal"); // получаем скрытое модальное окно
const close = document.querySelector(".close"); // получаем кнопку "закрыть" модльного окна

cartButton.addEventListener("click", toggleModal); // слушатель на кнопку корзина
close.addEventListener("click", toggleModal); // слушатель на кнопку закрыть

function toggleModal() { // при срабатывании слушателя
  modal.classList.toggle("is-open"); // добавляет-убирает класс "is-open"
}

// ============= day 1 ================


// =========== работа с формой авторизации ===========

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
