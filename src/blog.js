import 'bootstrap/dist/css/bootstrap.min.css'
import '@/common/styl/index.styl'
import '@/styl/blog.styl'
import '@/components/nav/index'
import './font/iconfont.css'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min'
import { template } from "./utils";
import {sendBlogListApi} from "./api/blogAPI";
import LoadingSpinner from './components/loading'
$(function() {
  const newsListNode = document.querySelector('#newsList');
  let newsListTemplate = document.querySelector('#news_tmpl').innerHTML;
  let loading = new LoadingSpinner(document.querySelector('.loadingSpinner'));
  loading.mount().show();
  let params = {
    totalPage : null
  };
  let listQuery = {
    currentPage: 1,
    pageSize: 15
  };
  function getNewsHandler([data,node, temp = newsListNode]) {
    $(temp).empty();
   if (data){
     temp.innerHTML = template(node)(data)
   }
  }
  sendBlogListApi(listQuery).then( res => {
    loading.hide();
    params.totalPage = res.page;
    getNewsHandler([res, newsListTemplate]);
    //推荐
    getNewsHandler([res,document.querySelector('#popular_tmpl').innerHTML, document.querySelector('#popularList')]);
    // 分页的
    document.querySelector('#pagination').innerHTML = template(document.querySelector('#pagination_tmpl').innerHTML)(res.page);

    const pageItemNode = document.querySelectorAll('.page-item-node');
    for (let i = 0, len = pageItemNode.length; i < len; i++){
      if (i+1 === listQuery.currentPage) {
        $(pageItemNode[i]).addClass('active');
      }
      pageItemNode[i].addEventListener('click',function () {
        loading.show();
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        listQuery.currentPage = i+1;
        sendBlogListApi(listQuery).then( res => {
          loading.hide();
          getNewsHandler([res, newsListTemplate]);
          window.scrollTo(0,0)
        })
      })
    }
    $('.prev').on('click',function () {
      if (listQuery.currentPage === 1){
        return false
      } else {
        loading.show();
        listQuery.currentPage --;
        $(this).siblings().removeClass('active');
        $(this).siblings().eq(listQuery.currentPage -1).addClass('active');
        sendBlogListApi(listQuery).then( res => {
          loading.hide();
          getNewsHandler([res, newsListTemplate]);
          window.scrollTo(0,0)
        })
      }
    });
    $('.next').on('click',function () {
      if (params.totalPage === listQuery.currentPage){
        return false
      } else {
        loading.show();
        listQuery.currentPage ++;
        $(this).siblings().removeClass('active');
        $(this).siblings().eq(listQuery.currentPage).addClass('active');
        sendBlogListApi(listQuery).then( res => {
          loading.hide();
          getNewsHandler([res, newsListTemplate]);
          window.scrollTo(0,0)
        })
      }
    })
  });
});
