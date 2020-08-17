import template from './goTop.html'
export default class  {
  mount(container){
    container.innerHTML = template;
    $('.goTop_btn').click(function () {
      $("html, body").animate({scrollTop: 0}, 300);
    })
  }
}
