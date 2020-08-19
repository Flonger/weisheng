import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper'
import '@/styl/main.styl'
import '@/common/styl/index.styl'
import './font/iconfont.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'jquery-lazyload'
import 'video.js/dist/video-js.min.css'
import Video from 'video.js'
import 'animate.css'
import { WOW } from 'wowjs'
import Nav from "./components/nav";
import GoTop from "./components/goTop";
import TitleDes from "./components/titleDes";
import FeedbackDialog from './components/dialog'
$(function() {
  const navView = new Nav();
  const goTop = new GoTop();
  const titleDes = new TitleDes();
  new FeedbackDialog().mount(document.querySelector('#feedbackModal'));
  navView.mount(document.querySelector('#nav'));
  goTop.mount(document.querySelector('#goTop'));
  // FeedbackDialog.mount(document.querySelector('#feedbackDialog'));
  titleDes.mount(document.querySelector('#aboutTitle'), 'About Wifi Cash');
  titleDes.mount(document.querySelector('#featuresTitle'), 'Our product Features');
  titleDes.mount(document.querySelector('#getMoneyTitle'), 'Loan Step');
  titleDes.mount(document.querySelector('#repaymentTitle'), 'Repayment Step');
  titleDes.mount(document.querySelector('#evaluateTitle'), 'About Wifi Cash');
  titleDes.mount(document.querySelector('#faqTitle'), 'Q&A');
  titleDes.mount(document.querySelector('#contractTitle'), 'Contact us');
  titleDes.mount(document.querySelector('#partnersTitle'), 'Our partners');
  titleDes.mount(document.querySelector('#mediaTitle'), 'Media');
  const [goTopDom, $document, $home, $navBar] = [$('#goTop'),$(document), $('#Home'),$('#navBar')];
  $document.scroll(function () {
    if ($document.scrollTop() > 300){
      goTopDom.show();
    } else {
      goTopDom.hide();
    }
    if ($document.scrollTop() > 300){
      console.log($navBar);
      $navBar.css("background-color","black")
    } else {
      $navBar.css("background-color","black")
    }
  });
  new Swiper('.swiper-container1',{
    loop:true,
    autoplay:4000,
  });//首页banner轮播

  new Swiper('.swiper-container',{
    loop: true,
    autoplay: 3000,
    observer:true,
    observeParents:true,
    slidesPerColumnFill:'row',
    loopedSlides:8,
    slidesPerView: 4,
    spaceBetween: 0,
    slidesPerColumn: 1,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1
      }
    },
    autoplayDisableOnInteraction: false,
    paginationType: 'custom',
  });
  var player = Video('evaluate_video',{
    muted: true,
    controls : true,
    loop : false,
    preload: 'none',
    fluid:true
    // 更多配置.....
  });
  new WOW().init();
  $("img.lazy").lazyload({
    effect : "fadeIn",
    threshold: 400
  });
});
