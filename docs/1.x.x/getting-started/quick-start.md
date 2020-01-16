# Quick start

## Installation

You need to create a dedicated typescript project for using the owlie models. For this example we will name it simply models.
You can use TypeScript library starter (https://github.com/alexjoverm/typescript-library-starter) or whatever you want.
Then you need to install owlie models dependency

``` bash{13,20,23}
npm install --save @owliehq/models
```

## Initialization

Now edit models.ts at the root of src package.

<code>
import { initialize } from './initialization'<br>
export * from './models/index'<br>
import { registerCallbacks } from '@owliehq/models'<br><br>
export default {<br>
&ensp;initialize,<br>
&ensp;registerCallbacks<br>
}
</code>

Then create intialization.ts at the same location

<code>
import { InitializeModelProperties } from '@owliehq/models'<br>
import * as Models from './models/index'<br><br>
/** Initializes the models */<br>
export function initialize() {<br>
&ensp;// Init owlie modelProperties<br>
&ensp;InitializeModelProperties()<br>
}
</code>

That's all for the initialization

## Create first model

Create a folder "models" in src location to store the models you will create.

Let's create a model "user" for example. Create user.ts file in models folder.

<code>
import { Model } from '@owliehq/models'<br><br>
// The schema used for creating a User<br>
const UserSchema = {<br>
&ensp;/** The user unique ID */<br>
&ensp;id: {<br>
&ensp;&ensp;type: Number,<br>
&ensp;&ensp;default: null<br>
&ensp;},<br>
&ensp;/** The user email */<br>
&ensp;email: {<br>
&ensp;&ensp;type: String,<br>
&ensp;&ensp;default: null<br>
&ensp;},<br>
&ensp;/** The user first name */<br>
&ensp;firstName: {<br>
&ensp;&ensp;type: String,<br>
&ensp;&ensp;default: null<br>
&ensp;},<br>
&ensp;/** The user last name */<br>
&ensp;lastName: {<br>
&ensp;&ensp;type: String,<br>
&ensp;&ensp;default: null<br>
&ensp;}<br>
}<br><br>
/**
 Represents a user's infos containing its email,etc... (see UserSchema for details)
 */<br><br>
export class User extends Model {<br>
&ensp;constructor() {<br>
&ensp;&ensp;super()<br>
&ensp;&ensp;this.loadSchema(UserSchema)<br>
&ensp;}<br>
}
</code>

See [Types](../../../../1.x.x/types/types.html) section for details about all types managed by Owlie models.

## Build

Don't forget to build your lib when you have finished to create all models wou want.

``` bash{13,20,23}
npm run build
```

## Installation in project

If your new models lib in on code repository, you simply have to install it in your project.

``` bash{13,20,23}
npm install --save models
```


With lerna, no need to upload the lib in code repository
Create the model in a package.
Use the following commands anywhere you want to use your package models (in front package for example)

``` bash{13,20,23}
lerna add models --scope=front
```

Be aware that lerna add will add a dependency "models" in front package.json. So you cannot install a new dependency with npm in front directly.
Use lerna to add a new dependency in the desired package :

``` bash{13,20,23}
lerna add some-external-lib-to-add --scope=front
```

Tips: You can add the following command in your lerna root package.json file. Useful for somebody who get the project for the first time. It will build the model, add the model in front package and install all external dependency

``` bash{13,20,23}
"fullboot": "cd packages/models2 & npm install & npm run build & cd ../.. & lerna bootstrap & lerna add models2 --scope=front"
```

## Initialization in project

Just call initialize function on boot of your project<br>
<code>
import models from 'models'<br><br>
models.initialize()
</code>


## Use model

Now you can use your models in your project :<br>
<code>
import { User } from 'models'<br><br>
// to transform a database object to a model<br>
let user = new User()<br>
user.loadFromDatabase(userObjectFromDatabase)<br><br>
// to transform a model to a database object<br>
let user = new User()<br>
user.setFirstName("John")<br>
...<br>
user.toDatabase() //can be store to database<br>
</code>

