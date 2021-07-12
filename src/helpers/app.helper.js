// Получение случайного числа в заданном диапазоне
export function getRandomInRange(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}