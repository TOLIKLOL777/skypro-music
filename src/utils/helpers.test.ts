import { formatTime, getTimePanel } from './helpers';

describe('formatTime', () => {
  it('Добавление нуля если секунд < 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });
  it('Форматирует время меньше минуты < 1 минуты', () => {
    expect(formatTime(35)).toBe('0:35');
  });
  it('Обрабатывает 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
  it('Обрабатывает время > 10 минут', () => {
    expect(formatTime(665)).toBe('11:05');
  });
  it('Обрабатывает некоректный вывод времени', () => {
    expect(formatTime(-1)).toBe('0:00');
    expect(formatTime(NaN)).toBe('0:00');
  });
});

describe('getTimePanel', () => {
  it('Добавление нуля если секунд < 10', () => {
    expect(getTimePanel(35, 61)).toBe('0:35 / 1:01');
  });
  it('Форматирует время меньше минуты < 1 минуты', () => {
    expect(getTimePanel(13, 125)).toBe('0:13 / 2:05');
  });
  it('Обрабатывает 0 секунд', () => {
    expect(getTimePanel(0, 1)).toBe('0:00 / 0:01');
  });
  it('Обрабатывает время > 10 минут', () => {
    expect(getTimePanel(665, 667)).toBe('11:05 / 11:07');
  });
  it('Обрабатывает некоректный вывод времени', () => {
    expect(getTimePanel(-1, -1)).toBe('0:00 / 0:00');
    expect(getTimePanel(NaN, NaN)).toBe('0:00 / 0:00');
  });
});
