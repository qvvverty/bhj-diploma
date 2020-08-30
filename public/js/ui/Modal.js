// const e = require("express");

/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Передан пустой элемент');
    }
    this.element = element;
    this.registerEvents();
    // this.open();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const dismissElems = this.element.querySelectorAll('[data-dismiss="modal"]');
    for (const elem of dismissElems) {
      // elem.addEventListener('click', this.onClose);
      elem.onclick = this.onClose;
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose = (e) => {
    e.preventDefault();
    this.close();
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    const dismissElems = this.element.querySelectorAll('[data-dismiss="modal"]');
    for (const elem of dismissElems) {
      // elem.removeEventListener('click', this.onClose);
      elem.onclick = '';
    }
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = '';
  }
}
