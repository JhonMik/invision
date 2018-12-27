require('./database.js').then(function () {
  const app = require('./app.js');
  app.listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  });
});
