# Overview

# Installation

Don't forget to install python (with path variable), node-gyp, roolup and jest in needed. 

npm install -g node-gyp<br>
npm install -g rollup<br>
npm install -g jest

Now you can run: lerna bootstrap

# Intro

The library owliehq/models uses lerna because there is 2 differents packages :<br>
cli : Allow to create a project from scratch with a models module (development in progress)<br>
models : The models engine

I will try to explain quickly how the models engine works.

# Structure

Let's take a look on models structure (packages/models/src)
On root we have the simple point of entry (models.ts) and a file which contains a initialization method (InitializeModelProperties) : This method will be called by the models created by the developper which to want to use models in his project. I will return later on this method's utility.<br>
There is 4 subfolders.

## engine

**models.ts** : Export class Model which will be used by Models written by the developper. This class has a map of ModelProperties and a map of associated propertyValues which can be link with the key.
This class allow to load the schema into the model and export toDatabase and loadFromDatabase functions :<br>
*loadSchema* => for each property create the right modelProperty and set the default value (a getter and a setter hooks will be defined too)
*loadFromDatabase* => This function is used to get a model object from database.<br>
*toDatabase* => This function is used to translate the model into a database safe form.<br>
*populate* => Allow to populate data from an id.
deconstructPath => Used in populate function according to the populate string which is of form 'property1 property2 property3.subproperty1'
inspect => only to fix some console logs 

**modelProperty.ts** => Abstract class which contains functions definitions. All classes in folder modelProperties must redefine abtract functions in this class.
This class contains generic functions too : <br>
*createProperty* => initialize the property

**modelPropertyBuilder.ts** => Builds and returns the ModelProperty according to the setted schema and propertyName. Notice that you can write a property of a model in two ways (except for the type Model which must be written in second way only !):<br>
<code>string_without_options: String</code>

<code>string_with_options: {
	type: String,
	default: null
}</code>

**modelPropertyRegister.ts** => Used in initialization for each type of modelProperty. The function RegisterModelProperty links a modelProperty with a type (String, Array,..)

**callbackRegister.ts** => Registers a callback for the given modelName

## modelProperties
This folder contains all types of ModelProperties.
Each class must redefine the following functions accordingly to the type (Array, Boolean, Date, Map, Model, Number, Object, Set, String): <br>
*createEmptyProperty* => The default value if no defaut value is specified by the developper<br>
*clone* => No need to explain<br>
*toDatabase* => Translates 'value' in a database form and returns it<br>
*fromDatabase* => Translate 'data' from a database form to a property form and returns it

## interfaces
**basicObjects.ts** => Basic interface which allows object navigation for any object type

## utils 
**objectsUtils.ts** => Returns a new Object of the same type as the object passed in argument. Becomes handy when we want to make a new object of a type we don't actually know. Used for create clone of a model.
