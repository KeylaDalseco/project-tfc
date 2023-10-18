const user = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const userWithoutPassword = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
};

const wrongPassUser = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin'
};

const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };
const invalidPasswordLoginBody = { email: 'jondoe@email.com', password: 'Jon' };
const invalidEmailLoginBody = { email: 'invalid_email', password: 'JonDoe' };
const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

export {
  user,
  userWithoutPassword,
  invalidEmailLoginBody,
  invalidPasswordLoginBody,
  validLoginBody,
  wrongPassUser,
  userRegistered,
};
