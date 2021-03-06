Handler for Ajax forms:
* Listen on the submit event of the form
* Disable the submit button during the handling
* Collects the data of all input fields
* Request the action URL by Ajax request
* Can be extended by offering different events (e.g. help texts on failures)


# Installation

`bower i --save dform`


# Example

```html
<form id="formExample" method="post" action="/example">
  <label for="inputExample" class="sr-only">Example</label>
  <input type="text" id="inputExample" name="example" placeholder="Example" required autofocus>
  <button type="submit" disabled>Submit</button>
</form>

<script src="../src/dform.js"></script>

<script>
  $(function () {
    dform($('#formExample'))
      .on('submit', function () {
        // The submit button is clicked, before the request is sent
      })
      .on('done', function (responseData) {
        // The request finished with a success
      })
      .on('fail', function (jqXHR) {
        // The request finished with a failure
      });
  });
</script>
```
