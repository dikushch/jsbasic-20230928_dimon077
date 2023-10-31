import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner"></nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `);

    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.ribbonInner.append(...(this.categories.map(({ id, name }) => createElement(`<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`))));

    this.leftArrow = this.elem.querySelector('.ribbon__arrow_left');
    this.rightArrow = this.elem.querySelector('.ribbon__arrow_right');
    this.activeItem = null;

    this.elem.addEventListener('click', (event) => {
      this.initiCarousel(event);
      this.selectCategory(event);
    });
  }

  initiCarousel = (event) => {
    if (!event.target.closest('.ribbon__arrow')) return;

    if (event.target.closest('.ribbon__arrow_right')) {
      this.ribbonInner.scrollBy(350, 0);
    } else if (event.target.closest('.ribbon__arrow_left')) {
      this.ribbonInner.scrollBy(-350, 0);
    }

    this.hideButton();
  }

  hideButton = () => {
    this.ribbonInner.scrollLeft == 0 ? this.leftArrow.classList.remove('ribbon__arrow_visible') : this.leftArrow.classList.add('ribbon__arrow_visible');

    let scrollRight = this.ribbonInner.scrollWidth - this.ribbonInner.scrollLeft - this.ribbonInner.clientWidth;

    scrollRight < 1 ? this.rightArrow.classList.remove('ribbon__arrow_visible') : this.rightArrow.classList.add('ribbon__arrow_visible');
  }

  selectCategory = (event) => {
    let link = event.target.closest('.ribbon__item');

    if (link) {
      event.preventDefault();
      if (link != this.activeItem && this.activeItem) {
        this.activeItem.classList.remove('ribbon__item_active');
        this.activeItem = link;
        link.classList.add('ribbon__item_active');
      } else {
        this.activeItem = link;
        link.classList.add('ribbon__item_active');
      }

      let addEvent = new CustomEvent('ribbon-select', {
        detail: link.dataset.id,
        bubbles: true
      });
      this.elem.dispatchEvent(addEvent);
    }
  }
}