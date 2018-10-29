describe('Post', () => {
    it('Authorize', function () {
        return this.browser
            .url('/login')
            .setValue('#email', 'v89911112@mail.ru')
            .setValue('#password', '12345')
            .click('#submit')
            .assertView('check_auth', '.main__navbar-right > li:first-child > a')
    });
    it('Logout', function () {
        return this.browser
            .url('/login')
            .setValue('#email', 'v89911112@mail.ru')
            .setValue('#password', '12345')
            .click('#submit')
            .click('.main__navbar-right > li:last-child > a')
            .assertView('check_logout', '.main__navbar-right > li:first-child > a')
    });
});