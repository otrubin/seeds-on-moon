<template>
  <div class="add-year">
    <modal-window :isVisible="showAddYearWindow" @close="onCloseWindow">
      <div class="add-year-form">
        <select
          v-model="selectedYear"
          class="form-control"
          data-error-name="year"
          @focus="onFocus"
        >
          <option disabled value="">Выберите год</option>
          <option>{{ firstYear }}</option>
          <option disabled value="">...</option>
          <option>{{ lastYear }}</option>
        </select>

        <h3>Заполните урожайность семян в выбранном году</h3>
        <div class="seeds">
          <div class="seed" v-for="(value, seed, index) in seeds" :key="index">
            <div class="form-group">
              <label>{{ seed }}</label>
              <input
                v-model="seeds[seed]"
                type="text"
                class="form-control"
                :data-error-name="seed"
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
          <button @click="onAddYear" class="btn btn-success btn-add-year">
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
 * Компонент AddYear отвечает за добавление нового типа семян
 */

import ModalWindow from "./ModalWindow.vue";

import { mapGetters, mapActions } from "vuex";
import { getYearsErrors } from "../helpers/validate.helper";

export default {
  name: "AddYear",
  components: {
    ModalWindow,
  },
  data() {
    return {
      showAddYearWindow: false, // управление показом модального окна
      errors: {}, // объект ошибок, заполняется при валидации
      selectedYear: "",
      lastYear: "",
      firstYear: "",
      seeds: {},
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
    ...mapActions(["addYear"]),
    /* метод закрытия модального окна */
    onCloseWindow() {
      this.showAddYearWindow = false;
    },
    onAddYear() {
      // вызываем хелпер для валидации введенных пользователем данных
      const errors = getYearsErrors({
        year: this.selectedYear,
        data: this.seeds,
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
      } else {
        // если ошибок нет
        this.onCloseWindow();
        this.addYear(this._makeYear());
      }
    },
    add() {
      this.seeds = this.getData.series.reduce((acc, item) => {
        acc[item.name] = "";
        return acc;
      }, {});
      const lastYear = this.getData.categories[
        this.getData.categories.length - 1
      ];
      this.lastYear = +lastYear + 1;
      const firstYear = this.getData.categories[0];
      this.firstYear = +firstYear - 1;
      this.showAddYearWindow = true;
      this._resetFormState();
    },
    onFocus(event) {
      event.target.classList.remove("danger-control");
    },
    _makeYear() {
      return {
        year: this.selectedYear,
        firstYear: this.selectedYear == this.firstYear, //признак добавление года в начало списка лет
        seeds: this.seeds,
      };
    },
    _resetFormState() {
      this.errors = {};
      this.$el.querySelectorAll("[data-error-name]").forEach((el) => {
        el.classList.remove("danger-control");
      });
    },
  },
};
</script>

<style scoped>
.add-year h3 {
  color: #333;
  font-size: 1.3rem;
  margin: 2rem auto 1rem;
}
.add-year-form select {
  max-width: 300px;
  margin: 20px auto 0;
}
.add-year-form .year .form-group {
  margin-bottom: 0;
}
.add-year-form .seeds {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.add-year-form .seed {
  max-width: 120px;
  margin-bottom: 20px;
}
.add-year-form footer {
  padding: 30px 0 0;
  display: flex;
  justify-content: flex-end;
}
.add-year-form .btn-add-year {
  margin-right: 10px;
}
.add-year-form .errors li {
  font-size: 0.9rem;
  color: red;
}
</style>
