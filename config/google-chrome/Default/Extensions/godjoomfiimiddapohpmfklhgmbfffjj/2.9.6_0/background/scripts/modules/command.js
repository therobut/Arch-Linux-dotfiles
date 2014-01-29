// Generated by CoffeeScript 1.6.3
(function() {
  var Command, root;

  Command = (function() {
    function Command() {}

    Command.source = function(msg) {
      var data, src, tab, _i, _len, _ref, _results;
      tab = getTab(arguments);
      _ref = msg.sources.split(",");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        src = _ref[_i];
        src = src.trim();
        if (src.startsWith("@")) {
          src = Option.get('sources_map')[src.slice(1)];
        }
        if (/^(\w+\.)+\w+\//.test(src)) {
          src = src.replace(/(^https?:\/\/)?/, 'http://');
        }
        if (src.startsWith("http")) {
          data = src.match(/js$/) ? "var script = document.createElement('script'); script.setAttribute('src', '" + src + "'); document.body.appendChild(script);" : src.match(/css$/) ? "var script = document.createElement('link'); script.setAttribute('href', '" + src + "'); script.setAttribute('rel', 'stylesheet'); document.body.appendChild(script);" : void 0;
          _results.push(chrome.tabs.executeScript(tab.id, {
            code: data
          }));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Command;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Command = Command;

}).call(this);
