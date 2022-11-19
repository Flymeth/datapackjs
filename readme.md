# DatapackJS

> A Javascript librairy to create awesome datapacks!

## Where did this idea comes from

DatapackJS is the answer of a big datapack that 75% of the code are the same.
I really like creating some cool datapacks, and recently I had a big datapack to create for a personnal project, and inside, their was a lot of same commands (like to teleport players).
So I asked to me: Isn't there have a solution to avoid this fu**** copy/pasting of same code ? Then I remembered than I've always wanted to create my own programming language and so... that's not what i did!
Instead I created a javascript librairy that uses classes to make everything that can be done with datapacks!

## Use the library

You can get the librairy and start making your own datapack by following this simples steps:

### Create a project

```apache
npm init -y
```

### Install the librairy

```apache
npm i --s @flymeth/datapackjs
```

### Start using it

```js
const {default: DatapackJS} = require('datapackjs')
const dp = new DatapackJS({
    name: "hello world",
    description: "my first datapack using javascript",
    namespace: "hw",
    version: "1.19"
})
// And so on...
```

Pro tip: Go to the [documentation](https://flymeth.github.io/datapackjs/web/modules.html) before start using it!
