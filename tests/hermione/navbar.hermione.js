describe('Navbar', () => {
    it('BrandClick', function () {
        return this.browser
            .url('/')
            .click('.main__navbar-brand')
            .expectUrl('/')
    });
    it('LoginClick', function () {
        return this.browser
            .url('/')
            .click('.main__navbar-right > li:first-child > a')
            .expectUrl('/login')
    });
    it('RegisterClick', function () {
        return this.browser
            .url('/')
            .click('.main__navbar-right > li:last-child > a')
            .expectUrl('/register')
    });
});