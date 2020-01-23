# Test

You can test your model package. 
For example you can create the following init test (in test/src location)

<code>
import UserModels, { User } from '../../src/myproject-models'<br><br>
/**<br>
 * Init test<br>
 */<br>
describe('Init test', () => {<br>
&ensp;it('works if we can Initialize the library', () => {<br>
&ensp;&ensp;let result = true<br>
&ensp;&ensp;try {<br>
&ensp;&ensp;&ensp;UserModels.initialize()<br>
&ensp;&ensp;} catch (error) {<br>
&ensp;&ensp;&ensp;result = false<br>
&ensp;&ensp;&ensp;console.log(error)<br>
&ensp;&ensp;}<br>
&ensp;&ensp;expect(result).toBeTruthy()<br>
&ensp;})<br>
&ensp;it('works if we can create a User Model', () => {<br>
&ensp;&ensp;let result = true<br>
&ensp;&ensp;try {<br>
&ensp;&ensp;&ensp;new User()<br>
&ensp;&ensp;} catch (error) {<br>
&ensp;&ensp;&ensp;result = false<br>
&ensp;&ensp;&ensp;console.log(error)<br>
&ensp;&ensp;}<br>
&ensp;&ensp;expect(result).toBeTruthy()<br>
&ensp;})<br>
})<br>
</code>
