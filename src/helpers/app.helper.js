// Получение случайного числа в заданном диапазоне
export function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Возвращает имя семян для заполнения формы по уполчанию
export function getSeedName(existingNames = []) {
	//все существующие имена приводим в нижний регистр
	existingNames = existingNames.map((name) => {
		return name.toLowerCase();
	});
	const names = ['Рожь', 'Овес', 'Просо', 'Кукуруза', 'Горох', 'Фасоль', 'Соя'];
	let result = names.find((name) => {
		return !existingNames.includes(name.toLowerCase());
	});
	if(!result) {
		result = 'Фантазия кончилась))'
	}
	return result;
}
