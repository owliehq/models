# Types

## Types allowed

You can use one a the following types for an attribute of the model :
String, Number, Boolean, Date, Object, Array, Set, Map, Model

## Syntax

There are two ways to write attribute of a model :<br>
<code>name: String</code><br>
or<br>
<code>
name: {<br>
&ensp;type: String,<br>
&ensp;default: null<br>
}
</code>

Exception for the type Model which need to use the detailled syntax (see author in the following example<br>
<code>
const ArticleSchema = {<br>
&ensp;/** The article unique ID */<br>
&ensp;id: {<br>
&ensp;&ensp;type: Number,<br>
&ensp;&ensp;default: null<br>
&ensp;},<br>
&ensp;/**The article name*/<br>
&ensp;name: {<br>
&ensp;&ensp;type: String,<br>
&ensp;&ensp;default: null<br>
&ensp;},<br>
&ensp;author: {<br>
&ensp;&ensp;type: Model,<br>
&ensp;&ensp;model: Author,<br>
&ensp;&ensp;reference: true<br>
&ensp;}<br>
}
</code>
