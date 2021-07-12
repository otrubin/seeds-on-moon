<template>
  <div class="add-seed-type">
    <modal-window ref="AddSeedTypeModalWindow">
      <div class="add-seed-type-form">
        <h3>Укажите название семян:</h3>
        <div class="form-group">
          <label>Название не должно повторятся</label>
          <input
            type="text"
            v-model="seedName"
            class="form-control"
            data-error-name="name"
            @focus="onFocus"
          />
        </div>

        <h3>Заполните урожайность по годам:</h3>
        <div class="years">
          <div
            class="year"
            v-for="(value, year, index) in seedData"
            :key="index"
          >
            <div class="form-group">
              <label>{{ year }} г.</label>
              <input
                v-model="seedData[year]"
                type="text"
                class="form-control"
                :data-error-name="year"
                @focus="onFocus"
              />
            </div>
          </div>
        </div>

        <ul class="errors">
          <li v-for="(error, index) in errorMessages" :key="index">
            {{ error }}
          </li>
        </ul>

        <footer>
          <button @click="onAddSeedType" class="btn btn-success btn-add-seed">
            Сохранить
          </button>
          <button @click="onCloseWindow" class="btn btn-secondary">
            Отменить
          </button>
        </footer>
      </div>
    </modal-window>
  </div>
</template>

<script>
/**
 * Компонент AddSeedType отвечает за добавление нового типа семян
 */

import ModalWindow from "./ModalWindow.vue";

import { mapGetters, mapActions } from "vuex";
import { getSeedTypeErrors } from "../helpers/validate.helper";
import { getRandomInRange } from "../helpers/app.helper";

export default {
  name: "AddSeedType",
  components: {
    ModalWindow,
  },
  data() {
    return {
      seedName: "", // имя типа семян
      seedData: {}, // данные урожайности по годам
      errors: {}, // объект ошибок, заполняется при валидации
      isFirstShowing: true, //первый показ формы, надо показать демо данные
    };
  },
  computed: {
    ...mapGetters(["getData"]),

    /* свойство для отображений ошибок валидации */
    errorMessages() {
      return Object.values(this.errors);
    },
  },
  methods: {
    ...mapActions(["addSeedSeries"]),

    /* метод закрытия модального окна */
    onCloseWindow() {
      this.$refs.AddSeedTypeModalWindow.hide();
    },

    /* метод-событие добавления нового типа семян */
    onAddSeedType() {
      // вызываем хелпер для валидации введенных пользователем данных
      const errors = getSeedTypeErrors({
        name: this.seedName,
        data: this.seedData,
      });
      // если есть ошибки, отображаем их и подсвечиваем неверно заполненные поля
      if (errors) {
        this.errors = errors;
        for (let key in errors) {
          let el = document.querySelector(`[data-error-name="${key}"]`);
          if (el) {
            el.classList.add("danger-control");
          }
        }
        // если ошибок нет
      } else {
        // закрываем окно
        this.onCloseWindow();
        // вызываем экшен добавления типа семян из vuex
        this.addSeedSeries(this._makeSeedSeries());
      }
    },

    /* Показываем модальное окно с формой добавления типа семян */
    add() {
      this.seedData = this.getData.categories.reduce((acc, item) => {
        acc[item] = "";
        return acc;
      }, {});
      // Сбрасываем состояние формы
      this._resetFormState();
      // если это первый показ окна, заполняем поля ввода тестовыми данными
      if (this.isFirstShowing) {
        this.seedName = "Рожь";
        for (let key in this.seedData) {
          this.seedData[key] = getRandomInRange(5, 20);
        }
        this.isFirstShowing = false;
      }
      // показываем окно
      this.$refs.AddSeedTypeModalWindow.show();
    },

    /* При фокусировке сбрасываем признак ошибки для поля ввода */
    onFocus(event) {
      event.target.classList.remove("danger-control");
    },

    /* Формируем объект серии (см. /store/mosk.js) для передачи в экшен vuex */
    _makeSeedSeries() {
      const keys = Object.keys(this.seedData);
      keys.sort((key1, key2) => key1 - key2);
      const data = keys.reduce((acc, key) => {
        acc.push(+this.seedData[key]);
        return acc;
      }, []);
      return { name: this.seedName, data };
    },

    /* Сброс состояния элементов формы */
    _resetFormState() {
      this.errors = {};
      this.seedName = "";
      this.$el.querySelectorAll("[data-error-name]").forEach((el) => {
        el.classList.remove("danger-control");
      });
    },
  },
};
</script>

<style scoped>
.add-seed-type-form h3 {
  color: #333;
  margin: 2rem auto 1rem;
}
.add-seed-type-form .years {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.add-seed-type-form .year {
  max-width: 100px;
  margin-bottom: 20px;
}

.add-seed-type-form .year .form-group {
  margin-bottom: 0;
}

.add-seed-type-form footer {
  padding: 30px 0 0;
  display: flex;
  justify-content: flex-end;
}

.add-seed-type-form .btn-add-seed {
  margin-right: 10px;
}

.add-seed-type-form .errors li {
  font-size: 0.9rem;
  color: red;
}
</style>
