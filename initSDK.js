const consumerMessage = [];

// code onlyruns once DOM is ready for JS code to operate
  $(document).ready(function () {
    lpTag.agentSDK.init();
    
    var updateCallback = function(data) {
      var value = data.newValue;
      value.forEach( item => {
        consumerMessage.push(item.text);
      });
      console.log("messages from consumer: ", consumerMessage);
    };

    // chatTranscript is an SDK sub category
      var pathToData = "chatTranscript.lines";

    // binding: first receive callback w existing data & then receive updates of current data
      lpTag.agentSDK.bind(pathToData, updateCallback);

      $('#consumer-last-message').click(function () {
        var c = "t="+consumerMessage[consumerMessage.length - 1];
        console.log(c);
        var d = 'http://www.omdbapi.com/?' + c;
        var e = $('#request');
        e.find('a').attr('href', d).html(d);
        var f = $('#progress');
        var g = $('#response');
        var t = $('input:hidden[name=g-recaptcha-response]').val();
        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: 'https://www.omdbapi.com/?apikey=37db681f&' + c + '&token=' + t,
           
            success: function (a) {
                g.find('table').empty();
                var data = JSON.parse(a);
                const keys = Object.keys(data);
                keys.forEach(key => {
                  g.find('table').append(`<tr><td>${key}</td></tr><tr><td>${data[key]}</td></tr>`);
                });
            }
        })
      });
  });