# Start with monorepo config

The library has been designed to be an independent npm package. It can be imported into all subprojects with lerna-like tools. [Owlie](https://owlie.xyz) recommends this approach, we're not huge fan of multiplying git repo when we're working on projects divided into several parts (back, front, render engine, etc.)

## Init project

Add a new project to your monorepo tools (lerna, yarn...) named "models" (by default).
Then install our parent package via npm/yarn:

``` bash{13,20,23}
npm install --save @owliehq/models
```

## Create your first model

TODO

## Build models

TODO

## Use in business project

#### Init models

TODO

#### Usage

TODO
