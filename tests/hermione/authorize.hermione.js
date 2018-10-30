const {User} = require('../../models/user');

User.register('TestNick', 'test_user1@mail.ru', '12345');
User.deleteUser('test_user2@mail.ru', '12345');

describe('Post', () => {
    it('Authorize', function () {
        return this.browser
            .url('/login')
            .setValue('#email', 'test_user1@mail.ru')
            .setValue('#password', '12345')
            .click('#submit')
            .expectText('.main__navbar-right > li:first-child > a', 'TESTNICK');
    });

    it('Logout', function () {
        return this.browser
            .url('/login')
            .setValue('#email', 'test_user1@mail.ru')
            .setValue('#password', '12345')
            .click('#submit')
            .click('.main__navbar-right > li:last-child > a')
            .assertView('logout', '.main__navbar-right > li:first-child > a');
    });

    it('Register', function () {
        return this.browser
            .url('/register')
            .setValue('#nick', 'TestNick2')
            .setValue('#email', 'test_user2@mail.ru')
            .setValue('#password', '12345')
            .setValue('#password_repeat', '12345')
            .click('#submit')
            .expectText('.main__navbar-right > li:first-child > a', 'TESTNICK2')
            .click('.main__navbar-right > li:last-child > a')
    });
});
