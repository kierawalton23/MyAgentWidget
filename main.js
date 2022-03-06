$(document).ready(function () {

    var a = $('#search-by-title-request');
    a.hide(0);
    a.find('a').attr('href', 'javascript:;').html('');
    var b = $('#search-by-title-progress');
    b.hide(0);
    var c = $('#search-by-title-response');
    c.hide(0);
    c.find('pre').html('');
  
    $('#search-by-title-button').click(function () {
      var c = $("#search-by-title-form :input").filter(function (index, element) {
          return $(element).val() != "";
      }).serialize();
      console.log(c);
      var d = 'http://www.omdbapi.com/?' + c;
      var e = $('#search-by-title-request');
      e.find('a').attr('href', d).html(d);
      //e.show('slow');
      var f = $('#search-by-title-progress');
      f.show('slow');
      var g = $('#search-by-title-response');
      var t = $('input:hidden[name=g-recaptcha-response]').val();
      $.ajax({
          type: 'GET',
          dataType: 'text',
          url: 'https://www.omdbapi.com/?apikey=1a59b8e9&' + c + '&token=' + t,
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
              
              //g.find('pre').html(a.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
          },
          complete: function () {
              f.hide();
              g.show('slow')
          }
      })
    });
  
    $('#search-by-title-reset').click(function () {
        var a = $('#search-by-title-request');
        a.hide('slow');
        a.find('a').attr('href', 'javascript:;').html('');
        var b = $('#search-by-title-progress');
        b.hide('slow');
        var c = $('#search-by-title-response');
        c.find('table').empty()
        c.hide('slow');
        c.find('pre').html('');
    });
  });