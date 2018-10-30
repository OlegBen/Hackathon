const {expect} = require('chai');



//Плохие примеры интег. тестов :(

/*
const {buildFolderUrl, buildFileUrl} = require("../utils/navigation");

let file, hash;

describe('Главная страница', () => {
    it('Должна появится', function () {
        return this.browser
            .url('/')
            .checkExists('.breadcrumbs')
            .assertView('header', '.breadcrumbs')
    });
    it('Проверить есть ли коммиты', function () {
        return this.browser
            .url('/')
            .getText('.commit:first-child > .commit__link > a')
            .then((_hash) => {
                if (_hash)
                    hash = _hash;
                expect(_hash).to.not.equal(undefined);
            })
    });
    it('Должна появиться страница с файлами по клику', function () {
        return this.browser
            .url("/")
            .click(".commit:first-child > .commit__link > a")
            .expectUrl(buildFolderUrl(hash))
    });
});

describe('Страница коммитов', () => {
    it('Открывается ли страница', function () {
        if (hash) {
            return this.browser
                .url(buildFolderUrl(hash))
                .assertView('header', '.breadcrumbs')
        }
        else console.log("hash or file undefined")
    });
    it('Проверить есть ли файлы в коммите', function () {
        if (hash) {
            return this.browser
                .url(buildFolderUrl(hash))
                .getText('.content')
                .then((text) => {
                    let files = text.split('\n');
                    if (files.length > 0)
                        file = files[0]
                })
        } else console.log("hash  undefined")
    });
    it('Открыть страницу файла по клику', function () {
        if (hash && file) {
            return this.browser
                .url(buildFolderUrl(hash))
                .click(".content > ul > li > a")
                .expectUrl(buildFileUrl(hash, file))
        }
        else console.log("hash or file undefined")
    });
    it('Возврат на главную страницу по клику в header-е', function () {
        if (hash) {
            return this.browser
                .url(buildFolderUrl(hash))
                .click(".breadcrumbs > a")
                .expectUrl('/')

        } else console.log("hash undefined")
    });
});

describe('Страница файлов', () => {
    it('Открывается ли страница', function () {
        if (hash && file) {
            return this.browser
                .url(buildFileUrl(hash, file))
                .assertView('header', '.breadcrumbs')
        }
        else console.log("hash or file undefined")
    });
    it('Возврат на главную страницу по клику в header-е', function () {
        if (hash && file) {
            return this.browser
                .url(buildFolderUrl(hash, file))
                .click(".breadcrumbs > a:first-child")
                .expectText('.breadcrumbs', "HISTORY")
        } else console.log("hash or file undefined")
    });
    it('Возврат на  страницу коммита по клику в header-е', function () {
        if (hash && file) {
            return this.browser
                .url(buildFolderUrl(hash, file))
                .click(".breadcrumbs > a:last-child")
                .expectText('.breadcrumbs', "HISTORY / ROOT")
        } else console.log("hash or file undefined")
    });
});

describe('Page 404', () => {
    it('Not Found', function () {
        if (hash && file) {
            return this.browser
                .url("/notFoundPage404")
                .assertView('body', 'body')
        }
    });
});
 */