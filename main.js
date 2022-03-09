$(document).ready(function () {

  // search by film title
    var a = $('#request');
    a.hide(0);
    a.find('a').attr('href', 'javascript:;').html('');
    var b = $('#progress');
    b.hide(0);
    var c = $('#response');
    c.hide(0);
    c.find('pre').html('');
  
    // search by film title button
    $('#movie-title-button').click(function () {
      var c = $("#movie-title :input").filter(function (index, element) {
          return $(element).val() != "";
      }).serialize();
      console.log(c);
      var d = 'http://www.omdbapi.com/?' + c;
      var e = $('#request');
      e.find('a').attr('href', d).html(d);
      var f = $('#progress');
      f.show('slow');
      var g = $('#response');
      //var t = $('input:hidden[name=g-recaptcha-response]').val();
      $.ajax({
          type: 'GET',
          dataType: 'text',
          // URL for API request using my generated API key & the movie name 
          url: 'http://www.omdbapi.com/?apikey=37db681f&' + c,
          // url: 'https://www.omdbapi.com/?apikey=1a59b8e9&' + c + '&token=' + t,
          statusCode: {
              403: function () {
                  g.find('pre').html('HTTP 403 Forbidden!')
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

  // reset button
    $('#movie-reset').click(function () {
        var a = $('#request');
        a.hide('slow');
        a.find('a').attr('href', 'javascript:;').html('');
        var b = $('#progress');
        b.hide('slow');
        var c = $('#response');
        c.find('table').empty()
        c.hide('slow');
        c.find('pre').html('');
    });
  });