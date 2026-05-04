const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      const hashedPassword = bcrypt.hashSync('password123', 10);
      return knex('users').insert([
        {
          id: 1,
          email: 'test@example.com',
          password: hashedPassword
        },
        {
          id: 2,
          email: 'demo@example.com',
          password: hashedPassword
        }
      ]);
    });
};
