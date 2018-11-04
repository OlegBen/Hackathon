describe('Makeup', () => {
    const resumeId = '5bdea2e3af53920428a569fe';
    const vacancyId = '5bddfebe11d3b30d4811de2d';

    it('login', function () {
        return this.browser
            .url('/login')
            .assertView('login','body')
    });
    it('register', function () {
        return this.browser
            .url('/register')
            .assertView('register','body')
    });

    it('Authorize', function () {
        return this.browser
            .url('/login')
            .setValue('#email', 'test_user@mail.ru')
            .setValue('#password', '12345')
            .click('#submit')
            .expectText('.main__navbar-right > li:first-child > a', 'TESTUSER');
    });

    it('frontPage', function () {
        return this.browser
            .url('/')
            .assertView('frontPage','body')
    });
    it('list_resume', function () {
        return this.browser
            .url('/list_resume')
            .assertView('list_resume','body')
    });
    it('resume', function () {
        return this.browser
            .url(`/list_resume/${resumeId}`)
            .assertView('resume','body')
    });
    it('resumeAdmin', function () {
        return this.browser
            .url(`/list_resume/${resumeId}?admin=true`)
            .assertView('resumeAdmin','body')
    });
    it('list_vacancy', function () {
        return this.browser
            .url('/list_vacancy')
            .assertView('list_vacancy','body')
    });
    it('vacancy', function () {
        return this.browser
            .url(`/list_vacancy/${vacancyId}`)
            .assertView('vacancy','body')
    });
    it('vacancyAdmin', function () {
        return this.browser
            .url(`/list_vacancy/${vacancyId}?admin=true`)
            .assertView('vacancyaAmin','body')
    });
    it('admin_panel', function () {
        return this.browser
            .url('/admin_panel')
            .assertView('admin_panel','body')
    });
    it('user_page', function () {
        return this.browser
            .url('/user_page')
            .assertView('user_page','body')
    });
    it('create_vacancy', function () {
        return this.browser
            .url('/create_vacancy')
            .assertView('create_vacancy','body')
    });
    it('create_resume', function () {
        return this.browser
            .url('/create_resume')
            .assertView('create_resume','body')
    });
    it('history_search', function () {
        return this.browser
            .url('/history_search')
            .assertView('history_search','body')
    });

});