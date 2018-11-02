import {expect} from 'chai'
declare const it: Function;

//Примеры юнит тестов

/*
const {parseHistoryItem, parseFileTreeItem} = require("../utils/git");
const {buildFolderUrl, buildFileUrl, buildBreadcrumbs} = require('../utils/navigation');
const {buildObjectUrl} = require('../controllers/filesController').buildObjectUrl;

describe('git.js', () => {
    describe('Commits', () => {

        it("ParseHistoryItem, Парсинг коммита", () => {
            const testString = `d0594f18c5d6376cf5d1857044e5c69cab4bc6e2        Muzikanto       2018-10-16 13:52:39 +0300       add test commit
         8649cc781408c086d2b74e0544e89da6cab832bc        Muzikanto       2018-10-16 13:25:50 +0300       first push`;
            let data;

            data = testString.split('\n').filter(Boolean).map(parseHistoryItem);

            data.forEach((el) => {
                expect(el).to.contain.keys("hash", "author", "timestamp", "msg");
            })
        });

        it("buildFolderUrl, создание url-а", () => {
            expect(buildFolderUrl("d0594f18c5d6376cf5d1857044e5c69cab4bc6e2")).to.be.equal("/files/d0594f18c5d6376cf5d1857044e5c69cab4bc6e2/");
            expect(buildFolderUrl("d0594f18c5d6376cf5d1857044e5c69cab4bc6e2", 'test')).to.be.equal("/files/d0594f18c5d6376cf5d1857044e5c69cab4bc6e2/test");
        });

    });

    function executeGit() {
        return `100644 blob 308e2a1fe9b647621e5b24f2539ef3bdc87f0925    .gitignore
100644 blob ead09676a936eb50ed700dad0d280d65c3df21d8    README.md
100644 blob 70461d5f9009344d9933e889b0448aa3f18d83d9    app.js
040000 tree 152db3caa8a0d01acc76abc9df36e6b432ad1e55    bin
040000 tree c52fa4f12adafae357de1d8748f89787ae30431e    controllers
100644 blob 1e9faa0332c6e9e45df2f9ae2dacdbf8f29ca339    package-lock.json
100644 blob bafb4fb5833408d857f01f6c47466dbffd7a67e4    package.json
040000 tree 6a033b657f10911ad9b65c27c3f9b6fb6130b058    public
040000 tree 981637b44389bf95e0a9ab0e766049ac7c64cfc8    tests
040000 tree 58120222d04bb2fe8ea5e4df63784daafe8bf4b4    utils
040000 tree 4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5    views`
    }

    describe('Files', () => {
        it('parseFileTreeItem, Парсинг данных в коммите', async () => {
            let arr = executeGit()
                .split('\n')
                .filter(Boolean)
                .map(parseFileTreeItem);
            arr.forEach((el) => {
                expect(el).to.contain.keys("type", "path", "hash")
            })
        })
    });

});

describe('navigation.js', () => {
    it('buildFileUrl', () => {
        const parentHash = "hash";
        let path = "path";

        expect(buildFileUrl(parentHash, path)).to.be.equal(`/content/${parentHash}/${path}`)
        expect(buildFileUrl(parentHash)).to.be.equal(`/content/${parentHash}/`)
    });
    it('buildFolderUrl, создание  url-а', () => {
        const parentHash = "hash";
        let path = "path";

        expect(buildFolderUrl(parentHash, path)).to.be.equal(`/files/${parentHash}/${path}`);
        expect(buildFolderUrl(parentHash)).to.be.equal(`/files/${parentHash}/`);
    });
    describe('buildBreadcrumbs, url-ы', () => {

        it('undefined hash', () => {
            const build = buildBreadcrumbs(undefined, undefined);

            expect(build.length).to.equal(1);
            expect(build[0]).to.contain.keys("href", "text");
            expect(build[0].href).to.equal(undefined);
        });

        it('hash, undefined path ', () => {
            const build = buildBreadcrumbs("hash", undefined);

            expect(build.length).to.equal(2);
            expect(build[0]).to.contain.keys("href", "text");
            expect(build[1]).to.contain.keys("href", "text");
            expect(build[0].href).to.equal('/');
            expect(build[1].href).to.equal(undefined);
        });

        it('hash and path', () => {
            const path = "path1/path2";
            const hash = "hash";

            const build = buildBreadcrumbs(hash, path);

            expect(build.length).to.equal(4);
            for (let i = 0; i < path.split('/').length + 1; i++)
                expect(build[i]).to.contain.keys("href", "text");
            expect(build[0].href).to.equal('/');
            expect(build[1].href).to.equal(`/files/${hash}/`);
            expect(build[2].href).to.equal(`/files/${hash}/${path.split('/')[0]}/`);
            expect(build[3].text).to.equal(path.split('/')[1]);
        });
    })
});

describe('filesController.js', () => {
    it('buildObjectUrl, url в зависимости от типа', async () => {
        const hash = "hash",
            path = "path";
        let type = "blob";
        expect(buildObjectUrl(hash, {path, type})).to.be.equal(`/content/${hash}/${path}`);
        type = "tree";
        expect(buildObjectUrl(hash, {path, type})).to.be.equal(`/files/${hash}/${path}`);
        type = "";
        expect(buildObjectUrl(hash, {path, type})).to.be.equal(`#`);
    })
});
*/
