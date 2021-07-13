# Тестовое задание "График урожайности семян на луне"

Демо: https://portfolio.easyservs.ru/seeds-on-moon/

При открытии страницы, первоначально, строится график из 3-х видов семян и сведений об урожайности за 4-года.

## Управление

**Кнопка "Добавить вид семян"** открывает модальное окно, где требуется указать название вида семян и урожайность (шт./м2) для каждого года существующего периода.

_При показе модального окна, все поля заполняются автоматически._

Ограничения:

- Имя вида семян не должно повторяться.
- Урожайность вводить целыми числами.

Если ограничения нарушены, добавление вида семян не произойдет, будут показаны сообщения об ошибках, неправильно заполненные поля будут иметь красную рамку.

**Кнопка "Добавить год"** открывает модальное окно, где требуется выбрать год для добавления и указать урожайность (шт./м2) для каждого существующего вида семян для этого года.

_При показе модального окна, поля урожайности заполняются автоматически, а год нужно выбрать._

_Не обработана ситуация, когда первоначально периода нет, поскольку в тестовом задании это не продемонстрировать._

Ограничения:

- Нельзя ввести произвольный год, можно выбрать год перед началом или после существующего периода.
- Урожайность вводить целыми числами.

Если ограничения нарушены, добавление года не произойдет, будут показаны сообщения об ошибках, неправильно заполненные поля будут иметь красную рамку.

## Технические подробности реализации задания

- При выполнении задания использовались Vue + vuex, библиотека https://www.highcharts.com/.
- Код проекта реализован в кодировке UTF-8, отступы выполнены пробелами.
- Цвет для вида семян не задавался, поскольку библиотека highcharts генерирует график с разными цветами.
- Использовались однофайловые компоненты Vue (Vue CLI не использовался).
- Использовался препроцессор SCSS
- Использовался сборщик Webpack + babel. При сборке скрипты JS и стили CSS собираются, в файлы (app.js и app.css) и минифицируются.
- Есть возможность запустить webpack-dev-server
  - Команда запуска dev-сервера: _npm run start_
  - Команда сборки проекта: _npm run build_
- После сборки проекта файлы находятся в каталоге /dist и запускаются локально без веб-сервера.
- Функциональные части кода имеют комментарии на русском языке.

## Развертывание проекта

1. git clone https://github.com/otrubin/seeds-on-moon.git
2. cd ./seeds-on-moon
3. npm install
