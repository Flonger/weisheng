import template from './feedbackDialog.html'
import Toast from '../toast'
import { MVVM } from "../../common/js";
import AsyncValidator from 'async-validator'
import {feedbackRules} from "../../utils/mainValidate";
import { sendFeedbackApi } from "../../api/feedback";
import { md5Encrypt } from "../../utils";
// import './index.styl'
export default class  {
  mount(container){
    container.innerHTML = template;
    new MVVM({
      el:container,
      data: {
        feedbackInfo: {
          type: '',
          opinionPhone:'',
          opinion: '',
          mobileType: 3,
          versionNumber:'1.0'
        },
        signMsg: ''
      },
      methods: {
        seedFeedback() {
          // const feedback = document.getElementById('feedback').contentWindow;
          // feedback.seedFeedbackHandler();
          if (!this.AsyncValidator){
            this.AsyncValidator = new AsyncValidator(feedbackRules)
          }
          let toastMsg = new Toast();
          this.AsyncValidator.validate(this.feedbackInfo, (errors, fields) => {
            if (!errors) {
              this.signMsg = md5Encrypt(this.feedbackInfo);
              sendFeedbackApi(this.feedbackInfo, this.signMsg).then( res => {
                $('#feedbackModal').modal('hide');
                toastMsg.append(document.querySelector('#toast'),'Submit successfully')
              })
            } else {
              toastMsg.append(document.querySelector('#toast'),errors[0].message+'');
            }
          });
        }
      }
    })
  }
}
