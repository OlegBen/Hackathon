# Pull Request
- Сделать Fork репозитория
- git clone <Ссылка на ваш репозиторий>
- cd Hackathon
- git remote add upstream https://github.com/Muzikanto/Hackathon.git
- git fetch upstream
- git checkout -b "Имя фичи"
- - Делаете изменения
- - git push origin "Имя фичи"
- [Хотите запушить в проект изменения](https://github.com/Muzikanto/Hackathon/pulls)
- new pull request
- base "Имя фичи" <- compare "мастер"

# Start
```
git clone https://github.com/Muzikanto/Hackathon.git
npm i
npm run dev
npm start 
listen on localhost:5000
 
npm run ts //Start typescript watcher `Backand files`
npm run dev //Start webpack development watcher `Frontend files`
npm run prod //Start webpack production watcher `Frontend files`
```

## Tests
```
npm i --global --production windows-build-tools 
`run vpn`
npm i -g selenium-standalone
./node_modules/.bin/selenium-standalone install
npm i -g hermione
npm i -g hermione-plugins-muz

npm run selenium
npm start
npm run hermione
```

## Deploying to Heroku
```
$ heroku auth:token
$ git push heroku master
$ heroku open
```
