import template from './mainNav.html'
import './index.styl'
export default class  {
  mount(container){
    container.innerHTML = template;
    $('.nav-item > a').click(function () {
      if ($($(this).attr("href")).offset()){
        $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top-66 +"px"}, 300);
      }
    });
    $('#feedbackBtn').on('click',function () {
      $('#feedbackModal').modal("show")
    })
  }
}
