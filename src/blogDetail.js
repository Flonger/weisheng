import 'bootstrap/dist/css/bootstrap.min.css'
import '@/common/styl/index.styl'
import '@/styl/blogDetail.styl'
import '@/components/nav/index'
import './font/iconfont.css'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min'
import $md5 from 'js-md5'
import {GetRequest} from '@/utils'
import { template } from "./utils";
import {sendNewsDetailApi, getCommentAPI, sendAddCommentAPI, userLoginAPI} from "./api/blogDetailAPI";
import Toast from './components/toast'
import LoadingSpinner from './components/loading'
import { MVVM } from "./common/js";
import Pagination from "./components/pagination/pagination";

$(function () {
  let newId = GetRequest().n;
  let toast = new Toast();
  let loading = new LoadingSpinner(document.querySelector('.loadingSpinner'));
  loading.mount().show();

  let commentListTemplate = document.querySelector('#commentList_box_tmpl').innerHTML;
   const vm = new MVVM({
     el: "#app",
     data: {
       article: {
       },
       loginParams: {
         phone : '',
         password: '',
         newId
       },
       commentParams: {
         newId,
         content: ''
       },
       getCommentParams: {
         newId,
         currentPage: 1,
         pageSize: 10
       },
       commentPage: {
         totalNumber: 0
       }
     },
     methods: {
       newDetailAPI() {
         sendNewsDetailApi(newId).then(res =>{
           vm.article = res.data;
           $('.articleImg').attr({src: vm.article.imageUrl})
         });
         return Promise.resolve();
       },
       getCurrentCommentAPI() {
         getCommentAPI(vm.getCommentParams).then( res => { // 获得当前评论
           loading.hide();
           if (res.data) vm.commentPage = res.page;
           if (!vm.commentPage.totalNumber){ vm.commentPage.totalNumber = 0; return false;}
           vm.$options.methods.tempUtils([res,commentListTemplate, document.querySelector('#commentList_box')]);
           if (!vm.commentPagination){
             vm.commentPagination = new Pagination(document.querySelector('.commentPagination'),vm.commentPage).mount();
             vm.commentPagination.activeHandler( vm.getCommentParams.currentPage,function (currentPage) {
               loading.show();
               vm.getCommentParams.currentPage = currentPage;
               vm.$options.methods.getCurrentCommentAPI()
             });
             // 上一页
             vm.commentPagination.prev(function (currentPage) {
               loading.show();
               vm.getCommentParams.currentPage = currentPage;
               vm.$options.methods.getCurrentCommentAPI()
             });
             // 下一页
             vm.commentPagination.next(function (currentPage) {
               loading.show();
               vm.getCommentParams.currentPage = currentPage;
               vm.$options.methods.getCurrentCommentAPI()
             })
           }
         })
       },
       tempUtils([ data,node, temp ]) {
         $(temp).empty();
         if (data){
           temp.innerHTML = template(node)(data)
         }
       },
       commentHandler() {
         let forms = document.getElementsByClassName('needs-validation');
         Array.prototype.filter.call(forms, function(form) {
             if (form.checkValidity() !== false) {
               loading.show();
               sendAddCommentAPI(vm.commentParams).then(res => { // 添加评论
                 loading.hide();
                 if (res.code === 203){
                   toast.append(document.querySelector('#toast'),res.message);
                   $('#loginModal').modal('show');
                 } else {
                   vm.$options.methods.getCurrentCommentAPI();
                   toast.append(document.querySelector('#toast'),'success');
                 }
               })
             }
             form.classList.add('was-validated');
         });
       },
       loginHandler() {
          window.open("https://play.google.com/store/apps/details?id=com.panshi.ipaisa")
       },
       registerHandler() { // 登陆
         let forms = document.getElementsByClassName('login-validation');
         Array.prototype.filter.call(forms, function(form) {
           if (form.checkValidity() !== false) {
             loading.show();
             vm.loginParams.password = $md5(vm.loginParams.password);
             userLoginAPI(vm.loginParams).then(res => {
               loading.hide();
               $('#loginModal').modal('hide');
               toast.append(document.querySelector('#toast'),'success');
               vm.$options.methods.commentHandler();
             }).catch( error => {
               loading.hide();
             })
           }
           form.classList.add('was-validated');
         });
       }
     }
   });
      vm.$options.methods.newDetailAPI().then( () => {
        vm.$options.methods.getCurrentCommentAPI()
      });
});
