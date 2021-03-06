function dform(formElement) {
  var eventEmitter = {
    on: function(name, handler) {
      this[name] = this[name] || [];
      this[name].push(handler);
      return this;
    },
    trigger: function(name, event) {
      if (this[name]) {
        this[name].map(function(handler) {
          handler(event);
        });
      }
      return this;
    },
  };
  var submitElement = formElement.find('[type=submit]');
  var inputElements = formElement.find('input, select');
  formElement.submit(function(event) {
    event.preventDefault();
    submitElement.attr('disabled', 'disabled');
    var formData = {};
    $.each(inputElements, function(_, element) {
      element = $(element);
      var name = element.attr('name');
      if (name) {
        formData[name] = element.val();
      }
    });
    eventEmitter.trigger('submit');
    $[formElement.attr('method')](formElement.attr('action'), formData)
      .always(function() {
        submitElement.removeAttr('disabled', 'disabled');
      })
      .done(function(responseData) {
        eventEmitter.trigger('done', responseData);
      })
      .fail(function(jqXHR) {
        eventEmitter.trigger('fail', jqXHR);
      });
  });
  submitElement.removeAttr('disabled', 'disabled');
  return eventEmitter;
}
