import store from "../store/index";

/*
ВАЛИДАЦИЯ ПРИ ДОБАВЛЕНИИ НОВОГО ТИПА СЕМЯН
*/

/**
 * Возвращает false если нет ошибок для переданного имени семян
 * иначе возвращает текст ошибки
 *
 * @param {String} seedName
 * @returns {(Boolean|String)}
 */
function _getSeedNameError(seedName) {
  if (!seedName.trim()) {
    return `Укажите название для типа семян.`;
  }
  const isNameUsed = Boolean(
    store.getters.getData.series.find((item) => {
      return item.name.toLowerCase() === seedName.toLowerCase();
    })
  );
  if (isNameUsed) {
    return `Название "${seedName}" уже используется.`;
  }
  return false;
}

/**
 * Возвращает false если нет ошибок для значения урожайности
 * иначе возвращает текст ошибки
 *
 * @param {String} seedName
 * @returns {(Boolean|String)}
 */
function _getSeedYearDataError(seedYearData, year) {
  if (!seedYearData.trim()) {
    return `Для ${year} года не указаны данные.`;
  }
  if (!Number.isInteger(+seedYearData)) {
    return `Для ${year} года введите целое число`;
  }
  return false;
}

/**
 * Валидация данных при добавлении типа семян
 * Возвращает false если нет ошибок
 * иначе возвращает объект, у которого ключи имя типа семян и значения лет
 * значения каждого ключа - текст ошибки
 *
 * @param {Object} validateData
 * @returns {(Boolean|Object)}
 */
export function getSeedTypeErrors(validateData) {
  const result = {};
  const seedNameError = _getSeedNameError(validateData.name);
  if (seedNameError) {
    result.name = seedNameError;
  }
  for (let year in validateData.data) {
    const seedYearDataError = _getSeedYearDataError(
      validateData.data[year],
      year
    );
    if (seedYearDataError) {
      result[year] = seedYearDataError;
    }
  }
  return Object.keys(result).length ? result : false;
}

/*
ВАЛИДАЦИЯ ПРИ ДОБАВЛЕНИИ ГОДА
*/

/**
 * Возвращает false если год выбран
 * иначе возвращает текст ошибки
 *
 * @param {String} year
 * @returns {(Boolean|String)}
 */
 function _getYearError(year) {
  return year ? false : `Выберите год.`;
}

/**
 * Возвращает false если нет ошибок для значения урожайности
 * иначе возвращает текст ошибки
 *
 * @param {String} seedData
 * @param {String} seedType
 * @returns {(Boolean|String)}
 */
 function _getSeedDataError(seedData, seedType) {
  if (!seedData.trim()) {
    return `Для "${seedType}" не указаны данные.`;
  }
  if (!Number.isInteger(+seedData)) {
    return `Для "${seedType}" введите целое число`;
  }
  return false;
}

/**
 * Валидация данных при добавлении года
 * Возвращает false если нет ошибок
 * иначе возвращает объект, у которого ключи год и тип семян
 * значения каждого ключа - текст ошибки
 *
 * @param {Object} validateData
 * @returns {(Boolean|Object)}
 */
export function getYearsErrors(validateData) {
  const result = {};
  const yearError = _getYearError(validateData.year);
  if (yearError) {
    result.year = yearError;
  }
  for (let seedType in validateData.data) {
    const seedDataError = _getSeedDataError(
      validateData.data[seedType],
      seedType
    );
    if (seedDataError) {
      result[seedType] = seedDataError;
    }
  }
  return Object.keys(result).length ? result : false;
}
