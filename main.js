$(document).ready(function () {

  // reset button
  $('#movie-reset').click(function () {
    var a = $('#request');
    a.empty()
    var c = $('#response');
    c.find('table').empty()
  });

  // search by film title
    var a = $('#request');
    a.find('a').attr('href', 'javascript:;').html('');
    var c = $('#response');
  
    // search by film title button
    $('#movie-title-button').click(function () {
      var c = $("#movie-title :input").filter(function (index, element) {
          return $(element).val() != "";
      }).serialize();
      console.log(c);
      var d = 'http://www.omdbapi.com/?' + c;
      var e = $('#request');
      e.find('a').attr('href', d).html(d);
      var g = $('#response');
      var t = $('input:hidden[name=g-recaptcha-response]').val();
      $.ajax({
          type: 'GET',
          dataType: 'text',
          // URL for API request using my generated API key & the movie name 
          url: 'https://www.omdbapi.com/?apikey=37db681f&' + c + '&token=' + t,
          
          // populating the table with the data on success
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