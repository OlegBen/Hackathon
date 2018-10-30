describe('Makeup', () => {
    it('FrontPage', function () {
        return this.browser
            .url('/')
            .assertView('frontPageBody', 'body');
    });
    it('Login', function () {
        return this.browser
            .url('/login')
            .assertView('loginBody', 'body');
    });
    it('Register', function () {
        return this.browser
            .url('/register')
            .assertView('registerBody', 'body');
    });
    it('Auth-Navbar', function () {
        return this.browser
            .url('/login')
            .setValue('#email', 'test_user1@mail.ru')
            .setValue('#password', '12345')
            .click('#submit')
            .assertView('authNavbar', 'body')
            .click('.main__navbar-right > li:last-child > a')
    })
});