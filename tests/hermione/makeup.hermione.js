describe('Makeup', () => {
    it('FrontPage', function () {
        return this.browser
            .url('/')
            .assertView('plain', 'body');
    });
    it('Login', function () {
        return this.browser
            .url('/login')
            .assertView('plain', 'body');
    });
    it('Register', function () {
        return this.browser
            .url('/register')
            .assertView('plain', 'body');
    });
});