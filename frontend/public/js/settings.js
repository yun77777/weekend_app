var app = new Framework7({
  routes: [
    {
      name: 'about',
      path: '/about/',
      url: '../templates/about.html',
    },
    {
      name: 'login',
      path: '/login/',
      url: '../templates/login.html',
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
      url: '../templates/index.html',
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




// var $$ = Dom7;

// $$('.convert-form-to-data').on('click', function(){
//   var formData = app.form.convertToData('#my-form');
//   alert(JSON.stringify(formData));
// });

// $$('.fill-form-from-data').on('click', function(){
//   var formData = {
//     'name': 'John',
//     'email': 'john@doe.com',
//     'gender': 'female',
//     'toggle': ['yes'],
//   }
//   app.form.fillFromData('#my-form', formData);
// });



// var myApp = new Framework7({
//   // Default title for modals
//   modalTitle: 'My App',

//   // If it is webapp, we can enable hash navigation:
//   pushState: true,

//   // Hide and show indicator during ajax requests
//   onAjaxStart: function (xhr) {
//       myApp.showIndicator();
//   },
//   onAjaxComplete: function (xhr) {
//       myApp.hideIndicator();
//   }
// });

var mainView = app.addView('.view-main')

// mainView.router.loadPage('../templates/login.html');
