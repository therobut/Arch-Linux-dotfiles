// Generated by CoffeeScript 1.6.3
(function() {
  var Buffer, root,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Buffer = (function() {
    var getMatchedTabs;

    function Buffer() {}

    getMatchedTabs = function(tabs, keyword) {
      var regexp, tab, _i, _len, _results;
      if (/^\d+$/.test(keyword)) {
        return [tabs[Number(keyword) - 1]];
      } else {
        regexp = new RegExp(keyword, "i");
        _results = [];
        for (_i = 0, _len = tabs.length; _i < _len; _i++) {
          tab = tabs[_i];
          if (regexp.test(tab.url) || regexp.test(tab.title)) {
            _results.push(tab);
          }
        }
        return _results;
      }
    };

    Buffer.gotoFirstMatch = function(msg) {
      var keyword, tab, _ref;
      _ref = [getTab(arguments), msg.keyword], tab = _ref[0], keyword = _ref[1];
      return chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
        return Tab.select(getMatchedTabs(tabs, keyword)[0]);
      });
    };

    Buffer.deleteMatch = function(msg) {
      var keyword, tab, _ref;
      _ref = [getTab(arguments), msg.keyword], tab = _ref[0], keyword = _ref[1];
      return chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
        var _i, _len, _ref1, _results;
        _ref1 = getMatchedTabs(tabs, keyword);
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          tab = _ref1[_i];
          _results.push(Tab.close(tab));
        }
        return _results;
      });
    };

    Buffer.deleteNotMatch = function(msg) {
      var keyword, tab, _ref;
      _ref = [getTab(arguments), msg.keyword], tab = _ref[0], keyword = _ref[1];
      return chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
        var matched_tabs, _i, _len, _results;
        matched_tabs = getMatchedTabs(tabs, keyword);
        _results = [];
        for (_i = 0, _len = tabs.length; _i < _len; _i++) {
          tab = tabs[_i];
          if (__indexOf.call(matched_tabs, tab) < 0) {
            _results.push(Tab.close(tab));
          }
        }
        return _results;
      });
    };

    return Buffer;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Buffer = Buffer;

}).call(this);
