import './loading.styl'
import template from './loading.html'
export default class  {
  constructor(container) {
    this.container = container
  }
  mount(){
    this.container.innerHTML = template;
    this.container.style = "none";
    return this;
  }
  show() {
    this.container.style.display = "block";
  }
  hide() {
    this.container.style.display = "none"
  }
}
