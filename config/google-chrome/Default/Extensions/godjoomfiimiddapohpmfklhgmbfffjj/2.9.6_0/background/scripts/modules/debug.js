// Generated by CoffeeScript 1.6.3
(function() {
  var Debug, root;

  Debug = function(str) {
    var error;
    if ($.isPlainObject(str) && str['message']) {
      str = str['message'];
    }
    if ((typeof str === 'object') && str.hasOwnProperty('stack') && str.hasOwnProperty('message')) {
      str = "" + str.message + "\n\n" + str.stack;
    }
    if ($.isFunction(str)) {
      str = str.toString();
    }
    $.post(getLocalServerUrl(), JSON.stringify({
      method: "print_messages",
      messages: str
    }));
    try {
      if (Tab.now_tab) {
        return runScript({
          code: "console.log(\"" + (str.replace(/\"/g, '\\"')) + "\")"
        }, Tab.now_tab);
      }
    } catch (_error) {
      error = _error;
      return console.log(error);
    }
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Debug = Debug;

}).call(this);
