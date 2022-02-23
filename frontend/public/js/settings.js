var app = new Framework7({
  routes: [
    {
      name: 'signup',
      path: '/signup/',
      url: './signup.html',
    },
    {
      name: 'index',
      path: '/',
      url: './index.html',
      options: {
        animate: false,
      },
      on: {
        pageAfterIn: function test (e, page) {
          // do something after page gets into the view
        },
        pageInit: function (e, page) {
          initLogin();
        },
      }
    },
    {
      name: 'index',
      path: '/index/',
      url: './index.html',
      options: {
        animate: false,
      },
      on: {
        pageAfterIn: function test (e, page) {
          // do something after page gets into the view
        },
        pageInit: function (e, page) {
          initLogin();
        },
      }
    },
    {
      name: 'login',
      path: '/login/',
      url: './login.html',
      options: {
        animate: false,
      },
      on: {
        pageAfterIn: function test (e, page) {
          // do something after page gets into the view
        },
        pageInit: function (e, page) {
          initLogin();
        },
      }
    },
    {
      name: 'users',
      path: '/users/',
      templateUrl: './pages/users.html',
      options: {
        context: {
          users: ['John Doe', 'Vladimir Kharlampidi', 'Timo Ernst'],
        },
      },
      on: {
        pageAfterIn: function test (e, page) {
          // do something after page gets into the view
        },
        pageInit: function (e, page) {
          // do something when page initialized
        },
      }
    },
    // Default route, match to all pages (e.g. 404 page)
    // {
    //   path: '(.*)',
    //   url: './pages/404.html',
    // },
  ],
});


var mainView = app.views.create('.view-main');


var $$ = Dom7;

$$('.convert-form-to-data').on('click', function(){
  var formData = app.form.convertToData('#my-form');
  alert(JSON.stringify(formData));
});

$$('.fill-form-from-data').on('click', function(){
  var formData = {
    'name': 'John',
    'email': 'john@doe.com',
    'gender': 'female',
    'toggle': ['yes'],
  }
  app.form.fillFromData('#my-form', formData);
});