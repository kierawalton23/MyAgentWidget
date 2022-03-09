const customerMessages = [];

  $(document).ready(function () {
    lpTag.agentSDK.init();
    
    var updateCallback = function(data) {
      var value = data.newValue;
      value.forEach( item => {
        if(item.source == 'visitor') {
          customerMessages.push(item.text);
        }
      });
      console.log("customer messages: ", customerMessages);
    };

    // chatTranscript is an SDK sub category
      var pathToData = "chatTranscript.lines";

    // binding: first receive callback w existing data & then receive updates of current data
      lpTag.agentSDK.bind(pathToData, updateCallback);

      $('#consumer-last-message').click(function () {
        var c = "t="+customerMessages[customerMessages.length - 1];
        console.log(c);
        var d = 'http://www.omdbapi.com/?' + c;
        var e = $('#request');
        e.find('a').attr('href', d).html(d);
        var f = $('#progress');
        f.show('slow');
        var g = $('#response');
        var t = $('input:hidden[name=g-recaptcha-response]').val();
        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: 'http://www.omdbapi.com/?apikey=37db681f&' + c,
            // url: 'https://www.omdbapi.com/?apikey=1a59b8e9&' + c + '&token=' + t,
            statusCode: {
                403: function () {
                    g.find('pre').html('HTTP 403 Forbidden!')
                    notify.setAlertMessageRed("Error getting data");
                }
            },
            success: function (a) {
                g.find('table').empty();
                var data = JSON.parse(a);
                const keys = Object.keys(data);
                keys.forEach(key => {
                  if (key == 'Ratings') {
                    g.find('table').append(`<tr><td><strong>${key}</strong></td></tr>`);
                    const ratings = data[key];
                    ratings.forEach(rating => {
                      g.find('table').append(`<tr><td><strong>- ${rating.Source}</strong></td></tr><tr><td>${rating.Value}</td></tr>`);
                    });
                  } else {
                    g.find('table').append(`<tr><td><strong>${key}</strong></td></tr><tr><td>${data[key]}</td></tr>`);
                  }
                });
            },
            complete: function () {
                f.hide();
                g.show('slow')
            }
        })
      });
  });