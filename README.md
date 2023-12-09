
# Проект "PROSEPT"

Задача: разработка решения, которое автоматизирует процесс сопоставления товаров сторонних дилеров с товарами заказчика.

[**Ссылка на сайт**](https://prediction-service.ddns.net)




## Authors

- [Красноруцкий Кирилл](https://github.com/Red-Handed-Guy) - Разработка страницы разметки товров `/main, /stats`
- [Богдан Исаченко](https://github.com/Doctorian-Bogdan) - Разработка страниц авторизации `/auth`, статистики `/stats`, просмотра `/table`

## Installation

1) Скачать архив с ветки `main`

2) Установить зависимости командой 
```bash
  npm ci
```
3) Создать в корневой папке `frontend` проекта `.env` файл, прописав в нем путь для запросов к backend части приложения `REACT_APP_BASE_URL`. Это необходимо для запуска приложения в режиме `production`

Пример записи:
```bash
  REACT_APP_BASE_URL=http://127.0.0.1/api
```
4) Собрать билд командой 
```bash
  npm run build
```
5) Запустить билд командой
```bash
  npm run start
```
## Tech Stack

HTML5, CSS3, JS, React (18.2.0), Redux (4.2.1/ toolkit 1.9.7)





## Materials

1) **Libraries** 

- [React](https://react.dev/)
- [Redux/toolkit](https://redux.js.org/)

2) **Fonts**
- [DIN Pro](https://fonts-online.ru/fonts/din-pro/download)

3) **SVG**

- иконка коннекта https://www.onlinewebfonts.com/icon/413185
- иконка дисконнекта https://www.svgrepo.com/svg/332321/disconnect
- иконка ссылки https://www.svgrepo.com/svg/510970/external-link
- иконка красного креста https://ru.m.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Red_X.svg
- иконка часов https://www.svgrepo.com/svg/31585/time-left
- лого Prosept https://prosept.ru/
