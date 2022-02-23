function initLogin() {
    $.get("../login.html", function (data) {
        // $(".relatedProductPopup .content-block").html(data);
        $('.app-content').append(data);

    });
}


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
