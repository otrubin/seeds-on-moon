import store from "../store/index";

/**
 * Возвращает false если нет ошибок для переданного имени семян
 * иначе возвращает текст ошибки
 *
 * @param {String} seedName
 * @returns {Boolean}
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

function _getSeedYearDataError(seedYearData, year) {
  if (!seedYearData.trim()) {
    return `Для ${year} года не указаны данные.`;
  }
  seedYearData = +seedYearData;
  if (isNaN(seedYearData)) {
    return `Для ${year} года введите число`;
  }
  return false;
}

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
