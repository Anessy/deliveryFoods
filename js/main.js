'use strict';

const cartButton = document.querySelector("#cart-button"); // получили кнопку "корзина"
const modal = document.querySelector(".modal"); // получаем скрытое модальное окно
const close = document.querySelector(".close"); // получаем кнопку "закрыть" модльного окна

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
const restaurantTitle = document.querySelector('.restaurant-title'); // название ресторана
const rating = document.querySelector('.rating'); // рейтинг ресторана
const minPrice = document.querySelector('.price'); // минимальная цена ресторана 
const category = document.querySelector('.category'); // категория ресторана
const inputSearch = document.querySelector('.input-search'); // строка поиска товаров
const modalBody = document.querySelector('.modal-body'); // тело корзины
const modalPrice = document.querySelector('.modal-pricetag'); // общая сумма покупок в корзине 
const cart = JSON.parse(localStorage.getItem('gloDelivaryCart')) || []; // массив для товаров в корзине покупок (JSON.parse - перевод со строки в массив); (|| [] - защита от  null)
const buttonClearCart = document.querySelector('.clear-cart'); // кнопка "отменить" в корзине

const  saveCart = function() { // ф-ция записи корзины в localStorage
  localStorage.setItem('gloDelivaryCart', JSON.stringify(cart) ) // переводим наш объект корзины в строку
}; 

let login = localStorage.getItem('gloDelivery'); // получение имя пользователя из памяти

            // ============================= day 3 ===============================================
            // ==================== работа с базой данных ========================================  
            const getData = async function(url) { // функция, которая делает запрос на сервер. async - делает ее асинхронной
              const response = await fetch(url); // получили данные в ответ на запрос
              if  (!response.ok) { // проверка, был ли запрос удачным
                throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`); // ошибка - сбрасывает выполнение ф-ции и выводит указанное сообщение
              }
              return await response.json();
            } ; 

           
            

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open"); // добавляет-убирает класс "is-open"
};

const closeAuth = document.querySelector('.close-auth'); // получили кнопку закрытия модального окна автоизации

// === когда пользователь авторизован или не авторизован : ===

function authorized() { // когда пользователь авторизован

  function logOut() {// ф-ция при нажатии на кнопку выйти
    login = ''; 
    
    localStorage.removeItem('gloDelivery'); // удалить данные из памяти, если пользов. нажал "выйти"

    buttonAuth.style.display = ''; // если не автоизованы - вернуться к тому, что прописано в html
    buttonOut.style.display = ''; // есди не авторизованы - 
    userName.style.display = ''; // есди не авторизованы - 
    cartButton.style.display = 'none'; // сделали невидимой корзину покупок

    buttonOut.removeEventListener('click', logOut); // очистка события, чтобы ф-ция запускалась 1 раз

    checkAuth();
  };

  userName.textContent = login;

  console.log('Авторизован');
  buttonAuth.style.display = 'none'; // если автоизованы - спрятать кнопку "войти"
  buttonOut.style.display = 'flex'; // есди авторизованы - показать кнопку "выйти"
  userName.style.display = 'inline'; // есди авторизованы - показать имя пользователя
  cartButton.style.display = 'flex'; // сделали видимой корзину покупок
  buttonOut.addEventListener('click', logOut); // при клике на кнопку "выйти"
}; 

function notAuthorized() { // когда пользователь не авторизован

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



// ============================= day 2 ===============================================
// ================== работа карточками ресторанов ===================================

const cardsRestaurants = document.querySelector('.cards-restaurants'); // блок карточкой ресторана
const containerPromo = document.querySelector('.container-promo'); // блок с промо
const restaurants = document.querySelector('.restaurants'); // блок со всеми ресторанами
const menu = document.querySelector('.menu'); // блок с меню ресторана
const logo = document.querySelector('.logo'); // логотип картинка
const cardsMenu = document.querySelector('.cards-menu'); // меню ресторана 

function createCardResttaurant(restaurant) { // ф-ция по созданию карточек ресторанов
  
  const { 
    image, 
    kitchen, 
    name, 
    price, 
    stars, 
    products, 
    time_of_delivery: timeOfDelivery
  } = restaurant; // проводим деструктуризацию restaurant

  

  const card = `
    <a class="card card-restaurant" 
    data-products="${products}"
    data-info="${[name, price, stars, kitchen]}">
      <img src="${image}" alt="image" class="card-image"/>
       <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            ${stars}
          </div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
          </div>
        </div>
    </a>` ;// переменная с версткой карточки

    cardsRestaurants.insertAdjacentHTML('beforeend', card); // метод для вставки элементов на страницу
};

function openGoods(event){ // ф-ция для открытия карточек ресторанов. Чтобы определить, на какую карточку мы кликнули использ event
  const target = event.target; // получаем элемент, на который кликнули 
  const restaurant = target.closest('.card-restaurant'); // поднимается вверх по родителям, пока не дойдет до нужного (вся карточка)

  if (restaurant) { // проверяем кликнули на карточку или мимо

    if (login) { // проверка, залогинился ли пользоатель

      const info = restaurant.dataset.info.split(',');
      const [name, price, stars, kitchen] = info; 

      containerPromo.classList.add('hide');  // скрыть блоки, которые сейчас на странице
      restaurants.classList.add('hide'); // скрыть блоки, которые сейчас на странице
      menu.classList.remove('hide'); // показать блок с меню ресторана, удалив класс hide
      cardsMenu.textContent = ''; // очищаем меню ресторана, чтобы не было повторов при втором заходе

      restaurantTitle.textContent = name; 
      rating.textContent = stars; 
      minPrice.textContent = 'От ' + price + ' ₽'; 
      category.textContent = kitchen;

      getData(`./db/${restaurant.dataset.products}`).then(function(data){
        data.forEach(createCardGood);
      });
      
    } else { // если пользователь не авторизовался, то вызываем окно авторизации
      toggleModalAuth();
    }
  }
};

function createCardGood(goods){

  const { description, id, image, name, price } = goods; 

  const card = document.createElement('div'); // создаем тег div 
  card.className = 'card'; // добавили созданному div класс card
  card.insertAdjacentHTML('beforeend',  `
      <img src="${image}" alt="${name}" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">${description}
          </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart" id="${id}">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">${price} ₽</strong>
        </div>
      </div>
  `); // вставляем верстку в наш div

  cardsMenu.insertAdjacentElement('beforeend', card); // вставляем созданную карточку с продуктом в меню ресторана
};

function addToCart(event){ // ф-ция добавления товаров в корзину 
  const target = event.target; // получили то, на что кликнули (с помощью события event)
  const buttonAddToCart = target.closest('.button-add-cart'); // поднимается вверх по родителям, пока не дойдет до нужного (на случай, если мы кликнули на надписи или картинке внутри кнопки)
  if (buttonAddToCart) { // если нажали на кнопку добавления в корзину
    const card = target.closest('.card'); // получили всю карточку, товар из которой хотим добавить в корзину
    const title = card.querySelector('.card-title-reg').textContent; // получили название блюда из карточки
    const cost = card.querySelector('.card-price-bold').textContent; // получили цену товара из карточки 
    const id = buttonAddToCart.id; // в createCardGood получили и присвоили id кнопке. Здесь его получили
   
    const food = cart.find(function(item){ // find - ищет элемент в массиве корзины cart по заданному совпадению
      return item.id === id; // если id совпадают, возвращаем его в food
    }); 

    if (food) { // если есть совпадение в корзине
      food.count += 1; // увеличиваем количество на 1 
    } else { // если такой еди в корзине нет 
        cart.push({ // в корзину добавляем объект с выбранным блюдом 
        id: id, 
        title: title, 
        cost: cost,
        count: 1 // количество таких блюд в корзине 
      }); 
    }    
    console.log(cart);
    saveCart();
  }
};

function renderCart() { // формирует список товаров в корзине
  modalBody.textContent = ''; // обнулили верстку корзины 
  cart.forEach(function({ id, title, cost, count }){ // перебираем все элементы которые добавлялись в корзину в addToCart(). Деструктурируем их 
    const itemCart = `
    <div class="food-row">
					<span class="food-name">${title}</span>
					<strong class="food-price">${cost}</strong>
					<div class="food-counter">
						<button class="counter-button counter-minus" data-id=${id}>-</button>
						<span class="counter">${count}</span>
						<button class="counter-button counter-plus " data-id=${id}>+</button>
					</div>
				</div>
    `; // верстка корзины 
    modalBody.insertAdjacentHTML('afterbegin', itemCart); // вставляем верстку в корзину
  });
const totalPrice = cart.reduce(function(result, item){ // общая сумма покупок в корзине
  return result + (parseFloat(item.cost) * item.count); // parseFloat - перебирает строку. Если число, записывает, нет - прекращает 
}, 0);  // 0 - значение по умолчанию
modalPrice.textContent = totalPrice + ' ₽'; // вывели в верстку общуу стоимость товаров в корзине
};

function changeCount(event) { // ф-ция изменения кол-ва блюд в корзине +/-
  const target = event.target;  

  if (target.classList.contains('counter-button')){ // если у места, по которотому кликнули есть указанный класс (нажали на кнопку +/-)
    const food = cart.find(function(item){ // ищем нужный id
      return item.id === target.dataset.id; // возвращаем id, если он равен тому, что уже есть в корзине
    });
    if (target.classList.contains('counter-minus')) { // если у места, куда мы кликнули есть указанный класс, то
      food.count--; // изменили количество блюд в корзине
      if (food.count === 0) { // если кол-ва блюд в корзине равна 0
        cart.splice(cart.indexOf(food), 1); // удалить товар из карточки
      }
    };
    if (target.classList.contains('counter-plus')) { // если у места, куда мы кликнули есть указанный класс, то
      food.count++; // изменили количество блюд в корзине
    }; 
    renderCart();
  };
};

function init() {
  getData('./db/partners.json').then(function(data){ // ф-ция получения данных по запросу. then вызывает ф-цию после получения данных. data - полученные данные (массив)
    data.forEach(createCardResttaurant); // сработает столько раз, сколько элементов у полученного массива data (то есть, мы получаем 6 карточек ресторанов)
  }); 

  buttonClearCart.addEventListener('click', function(){ // на кнопку "отменить" в корзине
    cart.length = 0; // очистить корзину 
    renderCart();
  }); 

  cardsMenu.addEventListener('click', addToCart); // при клике добавить товар в корзину
  cartButton.addEventListener("click", function(){ // слушатель на кнопку корзина
    renderCart();
    toggleModal(); 
   }); 
  close.addEventListener("click", toggleModal); // слушатель на кнопку закрыть
  cardsRestaurants.addEventListener('click', openGoods);

  modalBody.addEventListener('click', changeCount); // изменения количества блюд в корзине +/-

  inputSearch.addEventListener('keydown', function(event){ // ф-ция обработчик поиска товаров на странице
    if (event.keyCode === 13) { // если нажали клавишу Enter
      const target = event.target; // значение события (получим слово, введенное в input)
      const value = target.value.toLowerCase(); // значение введенное в input

      const goods = []; // пустой массив для отфильстрованных по поиску товаров
      getData('./db/partners.json').then(function(data){ // data - получили в массиве все наши рестораны 
        const products = data.map(function(item){ // map - перебирает циклом все элементы из data и возвращает по одному
          return item.products; // из каждого элемента возвращаем только products
        }); 
        products.forEach(function(product){ // перебираем каждый жлемент массива
          getData(`./db/${product}`).then(function(){
            goods.push(...data); // используем sprad оператор ... - распаковываем массив в строку. ТЕПЕРЬ мы собрали все товары всех ресторанов в один большой объект
          
            const searchGoods = goods.filter(function(item){ // filter - запускается сколько раз, сколько элементов в goods
              return item.name.toLowerCase().includes(value); // проверяем содержит ли название блюда то, что было введено в input поиска
            });

            containerPromo.classList.add('hide');  // скрыть блоки, которые сейчас на странице
            restaurants.classList.add('hide'); // скрыть блоки, которые сейчас на странице
            menu.classList.remove('hide'); // показать блок с меню ресторана, удалив класс hide
            cardsMenu.textContent = ''; // очищаем меню ресторана, чтобы не было повторов при втором заходе

            restaurantTitle.textContent = 'Результат поиска'; 
            rating.textContent = ''; 
            minPrice.textContent = ''; 
            category.textContent = '';

            return searchGoods;
          
          }).then(function(data){
            data.forEach(createCardGood);
          })
          
        });
      });
    }
  });

  logo.addEventListener('click', function(){ // при клике на лого, вернуть все, как было, до клика на карточку ресторана
    containerPromo.classList.remove('hide');  
    restaurants.classList.remove('hide'); 
    menu.classList.add('hide'); 
  });

  checkAuth(); 
};
init();


