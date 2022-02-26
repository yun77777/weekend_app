initLogin();
function initLogin() {
  $.get("../templates/signup.html", function (data) {
    $('.page').append(data);
  });
}

$(document).on('click', '.login', function () {
  fetch('http://localhost:5000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        email: $('input[name="email"]').val(),
        password: $('input[name="password"]').val()
      }
    })
  });

});


$(document).on('click', '.join', function () {
  fetch('http://3.37.69.211:5000/user/login', {
    // fetch('http://localhost:5000/user/login', {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        email: $('input[name="email"]').val(),
        name: $('input[name="name"]').val(),
        password: $('input[name="password"]').val()
      }
    })
  })
  .then(res => res.json())
  .then(res => {
    console.log('res@:',res);
  });

});


$(document).on('click', '.goBack', function () {
  mainView.router.back();
});


$(document).on('click', '.pageBtn', function () {
  const page = $(this).data('page');
  mainView.router.loadPage('../templates/' + page + '.html');

});

$(document).on('click', '.signUpBtn', function () {
  $.get("../signup.html", function (data) {
    // $(".relatedProductPopup .content-block").html(data);
    $('.app-content').append(data);
  });
});


$(document).on('click', '.loginBtn', function () {
  $.get("../login.html", function (data) {
    // $(".relatedProductPopup .content-block").html(data);
    $('.app-content').append(data);
  });
});

$(document).on('click', '.submitBtn', function () {
  alert('submit')
});
