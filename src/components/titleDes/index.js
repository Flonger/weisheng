import template from './titleDes.html'
import './index.styl'
export default class  {
  mount(container, des){
    container.innerHTML = template;
    container.querySelector('.des').innerHTML = des
  }
}
