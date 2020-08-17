function validateFeedback(rule, value, callback) {
  if (!/^[0-9]{10}$/.test(value)) {
    callback({message :'Wrong format of mobile phone number'})
  } else {
    callback();
  }
}
export const feedbackRules = {
  type: [{required: true, message: 'please select category'}],
  opinionPhone: [
    {required: true, message: 'please enter mobile'},
    {trigger: 'blur', validator: validateFeedback}
  ],
  opinion: [{required: true, message: 'please enter feedback and Suggestions'}]
};
