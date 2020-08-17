import dom from './pagination.html'
import {template} from "../../utils";
export default class  {
  constructor(container,params) {
    this.container = container;
    this.params = params;
  }
  mount(){
    this.container.innerHTML = dom;
    this.container.querySelector('.commentPagination').innerHTML = template(this.container.querySelector('#pagination_tmpl').innerHTML)(this.params);
    return this;
  }
  activeHandler(currentPage,callback) {
    const pageItemNode = document.querySelectorAll('.page-item-node');
    const self = this;
    for (let i = 0, len = pageItemNode.length; i < len; i++){
      if (i+1 === currentPage) {
        $(pageItemNode[i]).addClass('active');
      }
      pageItemNode[i].addEventListener('click',function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        self.params.currentPage = i+1;
        callback(i+1);
      });
    }
  }
  prev(callback) {
    const self = this;
    $('.prev').on('click',function () {
      if (self.params.currentPage === 1){
        return false
      } else {
        self.params.currentPage --;
        $(this).siblings().removeClass('active');
        $(this).siblings().eq(self.params.currentPage -1).addClass('active');
        callback(self.params.currentPage);
      }
    });
  }
  next(callback) {
    const self = this;
    $('.next').on('click',function () {
      if (self.params.totalPage === self.params.currentPage){
        return false
      } else {
        self.params.currentPage ++;
        $(this).siblings().removeClass('active');
        $(this).siblings().eq(self.params.currentPage).addClass('active');
        callback(self.params.currentPage)
      }
    })
  }
}
