// Generated by CoffeeScript 1.6.3
(function() {
  var Url, root;

  Url = (function() {
    var fixUrl, search,
      _this = this;

    function Url() {}

    Url.tabopen = function() {
      return Url.open(false, true);
    };

    desc(Url.tabopen, "Same as `o`, but open URLs or search in a new tab");

    Url.openWithDefault = function() {
      return Url.open(true, false);
    };

    desc(Url.openWithDefault, "Same as `o`, Open URLs or search (edit current URL)");

    Url.tabopenWithDefault = function() {
      return Url.open(true, true);
    };

    desc(Url.tabopenWithDefault, "Same as `o`, but open URLs or search in a new tab (edit current URL)");

    Url.open = function(with_default, new_tab) {
      var content, title;
      title = (new_tab ? 'TabOpen: ' : 'Open: ');
      content = (with_default ? location.href : getSelected() || '');
      return Dialog.start({
        title: title,
        content: content,
        search: search,
        newtab: new_tab
      });
    };

    desc(Url.open, "Open URLs or search");

    Url.open.options = {
      noautocomplete: {
        description: "Disable autocomplete",
        example: "set noautocomplete"
      },
      searchengines: {
        description: "JSON of search engines",
        example: 'set searchengines={"google":"http://www.google.com/search?q={{keyword}}", "yahoo":"http://search.yahoo.com/search?p={{keyword}}"}'
      },
      defaultsearch: {
        description: "Default search engine name",
        example: 'set defaultsearch=yahoo'
      },
      autocomplete_prev: {
        description: "Select previous result",
        example: 'set autocomplete_prev=<Up>'
      },
      autocomplete_next: {
        description: "Select next result",
        example: 'set autocomplete_prev=<Down>'
      },
      autocomplete_next_10: {
        description: "Select next 10th result",
        example: 'set autocomplete_prev=<Tab>'
      },
      autocomplete_prev_10: {
        description: "Select previous 10th result",
        example: 'set autocomplete_prev=<S-Tab>'
      }
    };

    search = function(keyword) {
      return Post({
        action: "Tab.autoComplete",
        keyword: keyword,
        default_urls: fixUrl(keyword)
      });
    };

    Url.fixRelativePath = function(url) {
      var path, pathname, _i, _len, _ref;
      if (/:\/\//.test(url)) {
        return url;
      }
      if (/^\//.test(url)) {
        return document.location.origin + url;
      }
      if (url.match(/\/?\.\.$/)) {
        url += '/';
      }
      pathname = document.location.origin + document.location.pathname.replace(/\/+/g, '/');
      _ref = url.split('..');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        if (path.match(/^\//)) {
          pathname = pathname.replace(/\/[^\/]*\/?$/, '') + path;
        } else if (path.match(/^.\//)) {
          pathname = pathname.replace(/\/$/, '') + path.replace(/^.\//, '/');
        }
      }
      return pathname;
    };

    fixUrl = function(url_str) {
      var keyword, name, result, searchengines, url, urls, _i, _len;
      urls = url_str.split(", ");
      result = [];
      for (_i = 0, _len = urls.length; _i < _len; _i++) {
        url = urls[_i];
        url = url.trim();
        if (/:\/\//.test(url)) {
          result.push(url);
        } else if ((/^\//.test(url) || /^\.\.?\/?/.test(url)) && /^\s*\S+\s*$/.test(url)) {
          result.push(Url.fixRelativePath(url));
        } else if (/\w+\.\w+/.test(url) && !/\s/.test(url)) {
          result.push("" + (url.match("://") ? "" : "http://") + url);
        } else if (/local(host)?($|\/|\:)/.test(url)) {
          result.push("" + (url.match("://") ? "" : "http://") + url);
        } else {
          searchengines = Option.get('searchengines');
          name = url.replace(/^(\S+)\s.*$/, "$1");
          keyword = encodeURIComponent(url.replace(/^\S+\s+(.*)$/, "$1"));
          if (searchengines[name]) {
            result.push(searchengines[name].replace("{{keyword}}", keyword));
            break;
          }
          url = encodeURIComponent(url);
          result.push(Option.default_search_url(url));
        }
      }
      return result;
    };

    Url.parent = function() {
      var hostname, hostnames, i, pathname, pathnames, port, _i, _ref;
      pathnames = location.pathname.split('/');
      hostnames = location.hostname.split('.');
      for (i = _i = 0, _ref = times(); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (pathnames.length <= 1) {
          if (hostnames.length > 2) {
            hostnames.shift();
          }
        } else {
          pathnames.pop();
        }
      }
      hostname = hostnames.join('.');
      pathname = pathnames.join('/');
      port = (location.port ? ':' + location.port : '');
      return Post({
        action: "Tab.openUrl",
        url: "" + location.protocol + "//" + hostname + port + pathname
      });
    };

    desc(Url.parent, "Go to parent {count} URL");

    Url.root = function() {
      return location.pathname = '/';
    };

    desc(Url.root, "Go to the root of the website");

    Url.tabReferer = function() {
      return Url.referer(true);
    };

    desc(Url.tabReferer, "Same as `gr`, But open in new tab");

    Url.referer = function(newtab) {
      if (newtab == null) {
        newtab = false;
      }
      if (document.referrer) {
        return Post({
          action: "openOrSelectUrl",
          url: document.referrer,
          newtab: newtab,
          selected: true
        });
      }
    };

    desc(Url.referer, "Go to the referer");

    Url.decrement = function() {
      return Url.increment(-1);
    };

    desc(Url.decrement, "Decrement the last number in URL by {count}");

    Url.increment = function(dirction) {
      var after, before, count, newNumber, newNumberStr, number, _ref;
      count = times() * (dirction || 1);
      if (document.location.href.match(/(.*?)(\d+)(\D*)$/)) {
        _ref = [RegExp.$1, RegExp.$2, RegExp.$3], before = _ref[0], number = _ref[1], after = _ref[2];
        newNumber = parseInt(number, 10) + count;
        newNumberStr = String(newNumber > 0 ? newNumber : 0);
        if (number.match(/^0/)) {
          while (newNumberStr.length < number.length) {
            newNumberStr = "0" + newNumberStr;
          }
        }
        return Post({
          action: "Tab.openUrl",
          url: before + newNumberStr + after
        });
      }
    };

    desc(Url.increment, "Increment the last number in URL by {count}");

    Url.viewSourceNewTab = function() {
      return Url.viewSource(true);
    };

    desc(Url.viewSourceNewTab, "View source code in new tab");

    Url.viewSource = function(newTab) {
      return Post({
        action: "Tab.toggleViewSource",
        newtab: newTab
      });
    };

    desc(Url.viewSource, "View source code in current tab");

    Url.shortUrl = function(msg) {
      if (msg != null ? msg.url : void 0) {
        Clipboard.copy(msg.url);
        return CmdBox.set({
          title: "[Copied] Shortened URL: " + msg.url,
          timeout: 4000
        });
      } else {
        CmdBox.set({
          title: 'Shortening current URL',
          timeout: 4000
        });
        return Post({
          action: "shortUrl"
        });
      }
    };

    desc(Url.shortUrl, "Copy shorten URL to clipboard, the URL is shortened by `http://goo.gl`, You can use your account after grand auth in option page");

    Url.openFromClipboardAndFocusNewTab = function() {
      return Url.openFromClipboard(true, true);
    };

    desc(Url.openFromClipboardAndFocusNewTab, "Same as `p`, but open selected text or clipboard content in new tab and active it");

    Url.openFromClipboardNewTab = function() {
      return Url.openFromClipboard(true);
    };

    desc(Url.openFromClipboardNewTab, "Same as `p`, but open selected text or clipboard content in new tab");

    Url.openFromClipboard = function(new_tab, selected) {
      var selected_value;
      if (new_tab == null) {
        new_tab = false;
      }
      if (selected == null) {
        selected = false;
      }
      selected_value = getSelected();
      if (selected_value !== "") {
        return Post({
          action: "Tab.openUrl",
          url: fixUrl(selected_value),
          newtab: new_tab,
          selected: selected
        });
      } else {
        return Post({
          action: "Tab.openFromClipboard",
          newtab: new_tab,
          selected: selected
        });
      }
    };

    desc(Url.openFromClipboard, "Open selected text or clipboard content in current tab. If not a valid URL, make a search");

    return Url;

  }).call(this);

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Url = Url;

}).call(this);
