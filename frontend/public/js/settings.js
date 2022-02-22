var app = new Framework7({
  routes: [
    {
      name: 'about',
      path: '/about/',
      url: './about.html',
    },
    {
      name: 'index',
      path: '/index/',
      url: './index.html',
      options: {
        animate: false,
      },
    },
    {
      name: 'login',
      path: '/login/',
      url: './login.html',
      options: {
        animate: false,
      },
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