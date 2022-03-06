/* exported notify */
// eslint-disable-next-line no-redeclare
// eslint-disable-next-line no-unused-vars
const notify = function() {

    function setAlertMessageDone() {
      setSuccessMsg('alert');
    }
  
    function setAlertMessageRed(alertText) {
      setAlertMsg('alert', alertText);
    }
  
    function setSuccessMsg(elementId) {
      var msg = 'success';
      var element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = msg;
        element.style = 'color : green';
        setTimeout(function () {
          element.innerHTML = '';
        }, 3000);
      }
    }
  
    function setAlertMsg(elementId, msg) {
      var element = document.getElementById(elementId);
      element.innerHTML = msg;
      element.style = 'color : red';
    }
  
    function removeAlertMsg() {
      var element = document.getElementById('alert');
      setTimeout(function () {
        element.innerHTML = '';
      }, 3000);
    }
  
    return {
      setAlertMessageDone: setAlertMessageDone,
      setAlertMessageRed: setAlertMessageRed,
      removeAlertMsg: removeAlertMsg
    };
  }();