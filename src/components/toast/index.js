import './toast.styl'
import template from './toast.html'
export default class  {
  constructor() {
  }
  mount(container){
    container.innerHTML = template;
  }
  append(container,msg) {
    if (container) {
      container.innerHTML = template;
      container.querySelector('.msg-content').innerHTML = msg;
    }
  }
}
