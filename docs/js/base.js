// jQuery formatted selector to search for focusable items
var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

// store the item that has focus before opening the modal window
var focusedElementBeforeModal;
var state = 'closed';
function setFocusToFirstItemInModal(obj){
  // get list of all children elements in given object
  var o = obj.find('*');

  // set the focus to the first keyboard focusable item
  o.filter(focusableElementsString).filter(':visible').first().focus();
}

function toggleDrawer(target){
  // toggle the visibility of the nav and overlay
  $(target.data.t).toggleClass("visible");
  if ( target.data.t == "#main-nav" ){
    $("body").toggleClass("nav-open");  
  }
  // Set the aria attributes for showing/hiding appropriate content
  $(target.data.t).attr('aria-hidden', $(target.data.t).attr('aria-hidden') == 'false' ? 'true' : 'false');
  $("#content").attr('aria-hidden', $(target.data.t).attr('aria-hidden') == 'false' ? 'true' : 'false');
  
  // attach an event listener to redirect the tab to the modal window.
  $('body').on('focusin', '#content', function(){
    setFocusToFirstItemInModal($(target.data.t));
  });
  
  focusedElementBeforeModal = jQuery(':focus');
  if ( state == 'closed' ){
    setFocusToFirstItemInModal($("target")); 
    state = 'opened';
  } else{
    focusedElementBeforeModal.focus();
    state = 'closed';
  }
  return false;
}

function trapEscapeKey(obj, evt) {
  // if escape pressed
  if (evt.which == 27) {
    // get list of all children elements in given object
    var o = obj.find('*');
    // get list of focusable items
    
    var cancelElement;
    cancelElement = o.filter(['.menu_toggle', '.search_toggle']);

    // close the modal window
    cancelElement.click();
    evt.preventDefault();
  }
  return false;
}

// Click events...
$(".menu_toggle, #overlay").on("click", { t: "#main-nav" }, toggleDrawer);
$(".search_toggle").on("click", { t: "#search" }, toggleDrawer);
// Trap the escape key...
$('#main-nav, #search').keydown(function(event) {
  trapEscapeKey($(this), event);
});
/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

!function(a, b) {
    "function" == typeof define && define.amd ? define("bloodhound", ["jquery"], function(c) {
        return a.Bloodhound = b(c)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.Bloodhound = b(jQuery)
}(this, function(a) {
    var b = function() {
            "use strict";
            return {
                isMsie: function() {
                    return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
                },
                isBlankString: function(a) {
                    return !a || /^\s*$/.test(a)
                },
                escapeRegExChars: function(a) {
                    return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                isString: function(a) {
                    return "string" == typeof a
                },
                isNumber: function(a) {
                    return "number" == typeof a
                },
                isArray: a.isArray,
                isFunction: a.isFunction,
                isObject: a.isPlainObject,
                isUndefined: function(a) {
                    return "undefined" == typeof a
                },
                isElement: function(a) {
                    return !(!a || 1 !== a.nodeType)
                },
                isJQuery: function(b) {
                    return b instanceof a
                },
                toStr: function(a) {
                    return b.isUndefined(a) || null === a ? "" : a + ""
                },
                bind: a.proxy,
                each: function(b, c) {
                    function d(a, b) {
                        return c(b, a)
                    }
                    a.each(b, d)
                },
                map: a.map,
                filter: a.grep,
                every: function(b, c) {
                    var d = !0;
                    return b ? (a.each(b, function(a, e) {
                        return (d = c.call(null, e, a, b)) ? void 0 : !1
                    }), !!d) : d
                },
                some: function(b, c) {
                    var d = !1;
                    return b ? (a.each(b, function(a, e) {
                        return (d = c.call(null, e, a, b)) ? !1 : void 0
                    }), !!d) : d
                },
                mixin: a.extend,
                identity: function(a) {
                    return a
                },
                clone: function(b) {
                    return a.extend(!0, {}, b)
                },
                getIdGenerator: function() {
                    var a = 0;
                    return function() {
                        return a++
                    }
                },
                templatify: function(b) {
                    function c() {
                        return String(b)
                    }
                    return a.isFunction(b) ? b : c
                },
                defer: function(a) {
                    setTimeout(a, 0)
                },
                debounce: function(a, b, c) {
                    var d,
                        e;
                    return function() {
                        var f,
                            g,
                            h = this,
                            i = arguments;
                        return f = function() {
                            d = null, c || (e = a.apply(h, i))
                        }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), e
                    }
                },
                throttle: function(a, b) {
                    var c,
                        d,
                        e,
                        f,
                        g,
                        h;
                    return g = 0, h = function() {
                        g = new Date, e = null, f = a.apply(c, d)
                    }, function() {
                        var i = new Date,
                            j = b - (i - g);
                        return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f
                    }
                },
                stringify: function(a) {
                    return b.isString(a) ? a : JSON.stringify(a)
                },
                noop: function() {}
            }
        }(),
        c = "0.11.1",
        d = function() {
            "use strict";
            function a(a) {
                return a = b.toStr(a), a ? a.split(/\s+/) : []
            }
            function c(a) {
                return a = b.toStr(a), a ? a.split(/\W+/) : []
            }
            function d(a) {
                return function(c) {
                    return c = b.isArray(c) ? c : [].slice.call(arguments, 0), function(d) {
                        var e = [];
                        return b.each(c, function(c) {
                            e = e.concat(a(b.toStr(d[c])))
                        }), e
                    }
                }
            }
            return {
                nonword: c,
                whitespace: a,
                obj: {
                    nonword: d(c),
                    whitespace: d(a)
                }
            }
        }(),
        e = function() {
            "use strict";
            function c(c) {
                this.maxSize = b.isNumber(c) ? c : 100, this.reset(), this.maxSize <= 0 && (this.set = this.get = a.noop)
            }
            function d() {
                this.head = this.tail = null
            }
            function e(a, b) {
                this.key = a, this.val = b, this.prev = this.next = null
            }
            return b.mixin(c.prototype, {
                set: function(a, b) {
                    var c,
                        d = this.list.tail;
                    this.size >= this.maxSize && (this.list.remove(d), delete this.hash[d.key], this.size--), (c = this.hash[a]) ? (c.val = b, this.list.moveToFront(c)) : (c = new e(a, b), this.list.add(c), this.hash[a] = c, this.size++)
                },
                get: function(a) {
                    var b = this.hash[a];
                    return b ? (this.list.moveToFront(b), b.val) : void 0
                },
                reset: function() {
                    this.size = 0, this.hash = {}, this.list = new d
                }
            }), b.mixin(d.prototype, {
                add: function(a) {
                    this.head && (a.next = this.head, this.head.prev = a), this.head = a, this.tail = this.tail || a
                },
                remove: function(a) {
                    a.prev ? a.prev.next = a.next : this.head = a.next, a.next ? a.next.prev = a.prev : this.tail = a.prev
                },
                moveToFront: function(a) {
                    this.remove(a), this.add(a)
                }
            }), c
        }(),
        f = function() {
            "use strict";
            function c(a, c) {
                this.prefix = ["__", a, "__"].join(""), this.ttlKey = "__ttl__", this.keyMatcher = new RegExp("^" + b.escapeRegExChars(this.prefix)), this.ls = c || h, !this.ls && this._noop()
            }
            function d() {
                return (new Date).getTime()
            }
            function e(a) {
                return JSON.stringify(b.isUndefined(a) ? null : a)
            }
            function f(b) {
                return a.parseJSON(b)
            }
            function g(a) {
                var b,
                    c,
                    d = [],
                    e = h.length;
                for (b = 0; e > b; b++)
                    (c = h.key(b)).match(a) && d.push(c.replace(a, ""));
                return d
            }
            var h;
            try {
                h = window.localStorage, h.setItem("~~~", "!"), h.removeItem("~~~")
            } catch (i) {
                h = null
            }
            return b.mixin(c.prototype, {
                _prefix: function(a) {
                    return this.prefix + a
                },
                _ttlKey: function(a) {
                    return this._prefix(a) + this.ttlKey
                },
                _noop: function() {
                    this.get = this.set = this.remove = this.clear = this.isExpired = b.noop
                },
                _safeSet: function(a, b) {
                    try {
                        this.ls.setItem(a, b)
                    } catch (c) {
                        "QuotaExceededError" === c.name && (this.clear(), this._noop())
                    }
                },
                get: function(a) {
                    return this.isExpired(a) && this.remove(a), f(this.ls.getItem(this._prefix(a)))
                },
                set: function(a, c, f) {
                    return b.isNumber(f) ? this._safeSet(this._ttlKey(a), e(d() + f)) : this.ls.removeItem(this._ttlKey(a)), this._safeSet(this._prefix(a), e(c))
                },
                remove: function(a) {
                    return this.ls.removeItem(this._ttlKey(a)), this.ls.removeItem(this._prefix(a)), this
                },
                clear: function() {
                    var a,
                        b = g(this.keyMatcher);
                    for (a = b.length; a--;)
                        this.remove(b[a]);
                    return this
                },
                isExpired: function(a) {
                    var c = f(this.ls.getItem(this._ttlKey(a)));
                    return b.isNumber(c) && d() > c ? !0 : !1
                }
            }), c
        }(),
        g = function() {
            "use strict";
            function c(a) {
                a = a || {}, this.cancelled = !1, this.lastReq = null, this._send = a.transport, this._get = a.limiter ? a.limiter(this._get) : this._get, this._cache = a.cache === !1 ? new e(0) : h
            }
            var d = 0,
                f = {},
                g = 6,
                h = new e(10);
            return c.setMaxPendingRequests = function(a) {
                g = a
            }, c.resetCache = function() {
                h.reset()
            }, b.mixin(c.prototype, {
                _fingerprint: function(b) {
                    return b = b || {}, b.url + b.type + a.param(b.data || {})
                },
                _get: function(a, b) {
                    function c(a) {
                        b(null, a), k._cache.set(i, a)
                    }
                    function e() {
                        b(!0)
                    }
                    function h() {
                        d--, delete f[i], k.onDeckRequestArgs && (k._get.apply(k, k.onDeckRequestArgs), k.onDeckRequestArgs = null)
                    }
                    var i,
                        j,
                        k = this;
                    i = this._fingerprint(a), this.cancelled || i !== this.lastReq || ((j = f[i]) ? j.done(c).fail(e) : g > d ? (d++, f[i] = this._send(a).done(c).fail(e).always(h)) : this.onDeckRequestArgs = [].slice.call(arguments, 0))
                },
                get: function(c, d) {
                    var e,
                        f;
                    d = d || a.noop, c = b.isString(c) ? {
                        url: c
                    } : c || {}, f = this._fingerprint(c), this.cancelled = !1, this.lastReq = f, (e = this._cache.get(f)) ? d(null, e) : this._get(c, d)
                },
                cancel: function() {
                    this.cancelled = !0
                }
            }), c
        }(),
        h = window.SearchIndex = function() {
            "use strict";
            function c(c) {
                c = c || {}, c.datumTokenizer && c.queryTokenizer || a.error("datumTokenizer and queryTokenizer are both required"), this.identify = c.identify || b.stringify, this.datumTokenizer = c.datumTokenizer, this.queryTokenizer = c.queryTokenizer, this.reset()
            }
            function d(a) {
                return a = b.filter(a, function(a) {
                    return !!a
                }), a = b.map(a, function(a) {
                    return a.toLowerCase()
                })
            }
            function e() {
                var a = {};
                return a[i] = [], a[h] = {}, a
            }
            function f(a) {
                for (var b = {}, c = [], d = 0, e = a.length; e > d; d++)
                    b[a[d]] || (b[a[d]] = !0, c.push(a[d]));
                return c
            }
            function g(a, b) {
                var c = 0,
                    d = 0,
                    e = [];
                a = a.sort(), b = b.sort();
                for (var f = a.length, g = b.length; f > c && g > d;)
                    a[c] < b[d] ? c++ : a[c] > b[d] ? d++ : (e.push(a[c]), c++, d++);
                return e
            }
            var h = "c",
                i = "i";
            return b.mixin(c.prototype, {
                bootstrap: function(a) {
                    this.datums = a.datums, this.trie = a.trie
                },
                add: function(a) {
                    var c = this;
                    a = b.isArray(a) ? a : [a], b.each(a, function(a) {
                        var f,
                            g;
                        c.datums[f = c.identify(a)] = a, g = d(c.datumTokenizer(a)), b.each(g, function(a) {
                            var b,
                                d,
                                g;
                            for (b = c.trie, d = a.split(""); g = d.shift();)
                                b = b[h][g] || (b[h][g] = e()), b[i].push(f)
                        })
                    })
                },
                get: function(a) {
                    var c = this;
                    return b.map(a, function(a) {
                        return c.datums[a]
                    })
                },
                search: function(a) {
                    var c,
                        e,
                        j = this;
                    return c = d(this.queryTokenizer(a)), b.each(c, function(a) {
                        var b,
                            c,
                            d,
                            f;
                        if (e && 0 === e.length)
                            return !1;
                        for (b = j.trie, c = a.split(""); b && (d = c.shift());)
                            b = b[h][d];
                        return b && 0 === c.length ? (f = b[i].slice(0), void (e = e ? g(e, f) : f)) : (e = [], !1)
                    }), e ? b.map(f(e), function(a) {
                        return j.datums[a]
                    }) : []
                },
                all: function() {
                    var a = [];
                    for (var b in this.datums)
                        a.push(this.datums[b]);
                    return a
                },
                reset: function() {
                    this.datums = {}, this.trie = e()
                },
                serialize: function() {
                    return {
                        datums: this.datums,
                        trie: this.trie
                    }
                }
            }), c
        }(),
        i = function() {
            "use strict";
            function a(a) {
                this.url = a.url, this.ttl = a.ttl, this.cache = a.cache, this.prepare = a.prepare, this.transform = a.transform, this.transport = a.transport, this.thumbprint = a.thumbprint, this.storage = new f(a.cacheKey)
            }
            var c;
            return c = {
                data: "data",
                protocol: "protocol",
                thumbprint: "thumbprint"
            }, b.mixin(a.prototype, {
                _settings: function() {
                    return {
                        url: this.url,
                        type: "GET",
                        dataType: "json"
                    }
                },
                store: function(a) {
                    this.cache && (this.storage.set(c.data, a, this.ttl), this.storage.set(c.protocol, location.protocol, this.ttl), this.storage.set(c.thumbprint, this.thumbprint, this.ttl))
                },
                fromCache: function() {
                    var a,
                        b = {};
                    return this.cache ? (b.data = this.storage.get(c.data), b.protocol = this.storage.get(c.protocol), b.thumbprint = this.storage.get(c.thumbprint), a = b.thumbprint !== this.thumbprint || b.protocol !== location.protocol, b.data && !a ? b.data : null) : null
                },
                fromNetwork: function(a) {
                    function b() {
                        a(!0)
                    }
                    function c(b) {
                        a(null, e.transform(b))
                    }
                    var d,
                        e = this;
                    a && (d = this.prepare(this._settings()), this.transport(d).fail(b).done(c))
                },
                clear: function() {
                    return this.storage.clear(), this
                }
            }), a
        }(),
        j = function() {
            "use strict";
            function a(a) {
                this.url = a.url, this.prepare = a.prepare, this.transform = a.transform, this.transport = new g({
                    cache: a.cache,
                    limiter: a.limiter,
                    transport: a.transport
                })
            }
            return b.mixin(a.prototype, {
                _settings: function() {
                    return {
                        url: this.url,
                        type: "GET",
                        dataType: "json"
                    }
                },
                get: function(a, b) {
                    function c(a, c) {
                        b(a ? [] : e.transform(c))
                    }
                    var d,
                        e = this;
                    if (b)
                        return a = a || "", d = this.prepare(a, this._settings()), this.transport.get(d, c)
                },
                cancelLastRequest: function() {
                    this.transport.cancel()
                }
            }), a
        }(),
        k = function() {
            "use strict";
            function d(d) {
                var e;
                return d ? (e = {
                    url: null,
                    ttl: 864e5,
                    cache: !0,
                    cacheKey: null,
                    thumbprint: "",
                    prepare: b.identity,
                    transform: b.identity,
                    transport: null
                }, d = b.isString(d) ? {
                    url: d
                } : d, d = b.mixin(e, d), !d.url && a.error("prefetch requires url to be set"), d.transform = d.filter || d.transform, d.cacheKey = d.cacheKey || d.url, d.thumbprint = c + d.thumbprint, d.transport = d.transport ? h(d.transport) : a.ajax, d) : null
            }
            function e(c) {
                var d;
                if (c)
                    return d = {
                        url: null,
                        cache: !0,
                        prepare: null,
                        replace: null,
                        wildcard: null,
                        limiter: null,
                        rateLimitBy: "debounce",
                        rateLimitWait: 300,
                        transform: b.identity,
                        transport: null
                    }, c = b.isString(c) ? {
                        url: c
                    } : c, c = b.mixin(d, c), !c.url && a.error("remote requires url to be set"), c.transform = c.filter || c.transform, c.prepare = f(c), c.limiter = g(c), c.transport = c.transport ? h(c.transport) : a.ajax, delete c.replace, delete c.wildcard, delete c.rateLimitBy, delete c.rateLimitWait, c
            }
            function f(a) {
                function b(a, b) {
                    return b.url = f(b.url, a), b
                }
                function c(a, b) {
                    return b.url = b.url.replace(g, encodeURIComponent(a)), b
                }
                function d(a, b) {
                    return b
                }
                var e,
                    f,
                    g;
                return e = a.prepare, f = a.replace, g = a.wildcard, e ? e : e = f ? b : a.wildcard ? c : d
            }
            function g(a) {
                function c(a) {
                    return function(c) {
                        return b.debounce(c, a)
                    }
                }
                function d(a) {
                    return function(c) {
                        return b.throttle(c, a)
                    }
                }
                var e,
                    f,
                    g;
                return e = a.limiter, f = a.rateLimitBy, g = a.rateLimitWait, e || (e = /^throttle$/i.test(f) ? d(g) : c(g)), e
            }
            function h(c) {
                return function(d) {
                    function e(a) {
                        b.defer(function() {
                            g.resolve(a)
                        })
                    }
                    function f(a) {
                        b.defer(function() {
                            g.reject(a)
                        })
                    }
                    var g = a.Deferred();
                    return c(d, e, f), g
                }
            }
            return function(c) {
                var f,
                    g;
                return f = {
                    initialize: !0,
                    identify: b.stringify,
                    datumTokenizer: null,
                    queryTokenizer: null,
                    sufficient: 5,
                    sorter: null,
                    local: [],
                    prefetch: null,
                    remote: null
                }, c = b.mixin(f, c || {}), !c.datumTokenizer && a.error("datumTokenizer is required"), !c.queryTokenizer && a.error("queryTokenizer is required"), g = c.sorter, c.sorter = g ? function(a) {
                    return a.sort(g)
                } : b.identity, c.local = b.isFunction(c.local) ? c.local() : c.local, c.prefetch = d(c.prefetch), c.remote = e(c.remote), c
            }
        }(),
        l = function() {
            "use strict";
            function c(a) {
                a = k(a), this.sorter = a.sorter, this.identify = a.identify, this.sufficient = a.sufficient, this.local = a.local, this.remote = a.remote ? new j(a.remote) : null, this.prefetch = a.prefetch ? new i(a.prefetch) : null, this.index = new h({
                    identify: this.identify,
                    datumTokenizer: a.datumTokenizer,
                    queryTokenizer: a.queryTokenizer
                }), a.initialize !== !1 && this.initialize()
            }
            var e;
            return e = window && window.Bloodhound, c.noConflict = function() {
                return window && (window.Bloodhound = e), c
            }, c.tokenizers = d, b.mixin(c.prototype, {
                __ttAdapter: function() {
                    function a(a, b, d) {
                        return c.search(a, b, d)
                    }
                    function b(a, b) {
                        return c.search(a, b)
                    }
                    var c = this;
                    return this.remote ? a : b
                },
                _loadPrefetch: function() {
                    function b(a, b) {
                        return a ? c.reject() : (e.add(b), e.prefetch.store(e.index.serialize()), void c.resolve())
                    }
                    var c,
                        d,
                        e = this;
                    return c = a.Deferred(), this.prefetch ? (d = this.prefetch.fromCache()) ? (this.index.bootstrap(d), c.resolve()) : this.prefetch.fromNetwork(b) : c.resolve(), c.promise()
                },
                _initialize: function() {
                    function a() {
                        b.add(b.local)
                    }
                    var b = this;
                    return this.clear(), (this.initPromise = this._loadPrefetch()).done(a), this.initPromise
                },
                initialize: function(a) {
                    return !this.initPromise || a ? this._initialize() : this.initPromise
                },
                add: function(a) {
                    return this.index.add(a), this
                },
                get: function(a) {
                    return a = b.isArray(a) ? a : [].slice.call(arguments), this.index.get(a)
                },
                search: function(a, c, d) {
                    function e(a) {
                        var c = [];
                        b.each(a, function(a) {
                            !b.some(f, function(b) {
                                return g.identify(a) === g.identify(b)
                            }) && c.push(a)
                        }), d && d(c)
                    }
                    var f,
                        g = this;
                    return f = this.sorter(this.index.search(a)), c(this.remote ? f.slice() : f), this.remote && f.length < this.sufficient ? this.remote.get(a, e) : this.remote && this.remote.cancelLastRequest(), this
                },
                all: function() {
                    return this.index.all()
                },
                clear: function() {
                    return this.index.reset(), this
                },
                clearPrefetchCache: function() {
                    return this.prefetch && this.prefetch.clear(), this
                },
                clearRemoteCache: function() {
                    return g.resetCache(), this
                },
                ttAdapter: function() {
                    return this.__ttAdapter()
                }
            }), c
        }();
    return l
}), function(a, b) {
    "function" == typeof define && define.amd ? define("typeahead.js", ["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    var b = function() {
            "use strict";
            return {
                isMsie: function() {
                    return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
                },
                isBlankString: function(a) {
                    return !a || /^\s*$/.test(a)
                },
                escapeRegExChars: function(a) {
                    return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                isString: function(a) {
                    return "string" == typeof a
                },
                isNumber: function(a) {
                    return "number" == typeof a
                },
                isArray: a.isArray,
                isFunction: a.isFunction,
                isObject: a.isPlainObject,
                isUndefined: function(a) {
                    return "undefined" == typeof a
                },
                isElement: function(a) {
                    return !(!a || 1 !== a.nodeType)
                },
                isJQuery: function(b) {
                    return b instanceof a
                },
                toStr: function(a) {
                    return b.isUndefined(a) || null === a ? "" : a + ""
                },
                bind: a.proxy,
                each: function(b, c) {
                    function d(a, b) {
                        return c(b, a)
                    }
                    a.each(b, d)
                },
                map: a.map,
                filter: a.grep,
                every: function(b, c) {
                    var d = !0;
                    return b ? (a.each(b, function(a, e) {
                        return (d = c.call(null, e, a, b)) ? void 0 : !1
                    }), !!d) : d
                },
                some: function(b, c) {
                    var d = !1;
                    return b ? (a.each(b, function(a, e) {
                        return (d = c.call(null, e, a, b)) ? !1 : void 0
                    }), !!d) : d
                },
                mixin: a.extend,
                identity: function(a) {
                    return a
                },
                clone: function(b) {
                    return a.extend(!0, {}, b)
                },
                getIdGenerator: function() {
                    var a = 0;
                    return function() {
                        return a++
                    }
                },
                templatify: function(b) {
                    function c() {
                        return String(b)
                    }
                    return a.isFunction(b) ? b : c
                },
                defer: function(a) {
                    setTimeout(a, 0)
                },
                debounce: function(a, b, c) {
                    var d,
                        e;
                    return function() {
                        var f,
                            g,
                            h = this,
                            i = arguments;
                        return f = function() {
                            d = null, c || (e = a.apply(h, i))
                        }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), e
                    }
                },
                throttle: function(a, b) {
                    var c,
                        d,
                        e,
                        f,
                        g,
                        h;
                    return g = 0, h = function() {
                        g = new Date, e = null, f = a.apply(c, d)
                    }, function() {
                        var i = new Date,
                            j = b - (i - g);
                        return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f
                    }
                },
                stringify: function(a) {
                    return b.isString(a) ? a : JSON.stringify(a)
                },
                noop: function() {}
            }
        }(),
        c = function() {
            "use strict";
            function a(a) {
                var g,
                    h;
                return h = b.mixin({}, f, a), g = {
                    css: e(),
                    classes: h,
                    html: c(h),
                    selectors: d(h)
                }, {
                    css: g.css,
                    html: g.html,
                    classes: g.classes,
                    selectors: g.selectors,
                    mixin: function(a) {
                        b.mixin(a, g)
                    }
                }
            }
            function c(a) {
                return {
                    wrapper: '<span class="' + a.wrapper + '"></span>',
                    menu: '<div class="' + a.menu + '"></div>'
                }
            }
            function d(a) {
                var c = {};
                return b.each(a, function(a, b) {
                    c[b] = "." + a
                }), c
            }
            function e() {
                var a = {
                    wrapper: {
                        position: "relative",
                        display: "inline-block"
                    },
                    hint: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        borderColor: "transparent",
                        boxShadow: "none",
                        opacity: "1"
                    },
                    input: {
                        position: "relative",
                        verticalAlign: "top",
                        backgroundColor: "transparent"
                    },
                    inputWithNoHint: {
                        position: "relative",
                        verticalAlign: "top"
                    },
                    menu: {
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        zIndex: "100",
                        display: "none"
                    },
                    ltr: {
                        left: "0",
                        right: "auto"
                    },
                    rtl: {
                        left: "auto",
                        right: " 0"
                    }
                };
                return b.isMsie() && b.mixin(a.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                }), a
            }
            var f = {
                wrapper: "twitter-typeahead",
                input: "tt-input",
                hint: "tt-hint",
                menu: "tt-menu",
                dataset: "tt-dataset",
                suggestion: "tt-suggestion",
                selectable: "tt-selectable",
                empty: "tt-empty",
                open: "tt-open",
                cursor: "tt-cursor",
                highlight: "tt-highlight"
            };
            return a
        }(),
        d = function() {
            "use strict";
            function c(b) {
                b && b.el || a.error("EventBus initialized without el"), this.$el = a(b.el)
            }
            var d,
                e;
            return d = "typeahead:", e = {
                render: "rendered",
                cursorchange: "cursorchanged",
                select: "selected",
                autocomplete: "autocompleted"
            }, b.mixin(c.prototype, {
                _trigger: function(b, c) {
                    var e;
                    return e = a.Event(d + b), (c = c || []).unshift(e), this.$el.trigger.apply(this.$el, c), e
                },
                before: function(a) {
                    var b,
                        c;
                    return b = [].slice.call(arguments, 1), c = this._trigger("before" + a, b), c.isDefaultPrevented()
                },
                trigger: function(a) {
                    var b;
                    this._trigger(a, [].slice.call(arguments, 1)), (b = e[a]) && this._trigger(b, [].slice.call(arguments, 1))
                }
            }), c
        }(),
        e = function() {
            "use strict";
            function a(a, b, c, d) {
                var e;
                if (!c)
                    return this;
                for (b = b.split(i), c = d ? h(c, d) : c, this._callbacks = this._callbacks || {}; e = b.shift();)
                    this._callbacks[e] = this._callbacks[e] || {
                        sync: [],
                        async: []
                    }, this._callbacks[e][a].push(c);
                return this
            }
            function b(b, c, d) {
                return a.call(this, "async", b, c, d)
            }
            function c(b, c, d) {
                return a.call(this, "sync", b, c, d)
            }
            function d(a) {
                var b;
                if (!this._callbacks)
                    return this;
                for (a = a.split(i); b = a.shift();)
                    delete this._callbacks[b];
                return this
            }
            function e(a) {
                var b,
                    c,
                    d,
                    e,
                    g;
                if (!this._callbacks)
                    return this;
                for (a = a.split(i), d = [].slice.call(arguments, 1); (b = a.shift()) && (c = this._callbacks[b]);)
                    e = f(c.sync, this, [b].concat(d)), g = f(c.async, this, [b].concat(d)), e() && j(g);
                return this
            }
            function f(a, b, c) {
                function d() {
                    for (var d, e = 0, f = a.length; !d && f > e; e += 1)
                        d = a[e].apply(b, c) === !1;
                    return !d
                }
                return d
            }
            function g() {
                var a;
                return a = window.setImmediate ? function(a) {
                    setImmediate(function() {
                        a()
                    })
                } : function(a) {
                    setTimeout(function() {
                        a()
                    }, 0)
                }
            }
            function h(a, b) {
                return a.bind ? a.bind(b) : function() {
                    a.apply(b, [].slice.call(arguments, 0))
                }
            }
            var i = /\s+/,
                j = g();
            return {
                onSync: c,
                onAsync: b,
                off: d,
                trigger: e
            }
        }(),
        f = function(a) {
            "use strict";
            function c(a, c, d) {
                for (var e, f = [], g = 0, h = a.length; h > g; g++)
                    f.push(b.escapeRegExChars(a[g]));
                return e = d ? "\\b(" + f.join("|") + ")\\b" : "(" + f.join("|") + ")", c ? new RegExp(e) : new RegExp(e, "i")
            }
            var d = {
                node: null,
                pattern: null,
                tagName: "strong",
                className: null,
                wordsOnly: !1,
                caseSensitive: !1
            };
            return function(e) {
                function f(b) {
                    var c,
                        d,
                        f;
                    return (c = h.exec(b.data)) && (f = a.createElement(e.tagName), e.className && (f.className = e.className), d = b.splitText(c.index), d.splitText(c[0].length), f.appendChild(d.cloneNode(!0)), b.parentNode.replaceChild(f, d)), !!c
                }
                function g(a, b) {
                    for (var c, d = 3, e = 0; e < a.childNodes.length; e++)
                        c = a.childNodes[e], c.nodeType === d ? e += b(c) ? 1 : 0 : g(c, b)
                }
                var h;
                e = b.mixin({}, d, e), e.node && e.pattern && (e.pattern = b.isArray(e.pattern) ? e.pattern : [e.pattern], h = c(e.pattern, e.caseSensitive, e.wordsOnly), g(e.node, f))
            }
        }(window.document),
        g = function() {
            "use strict";
            function c(c, e) {
                c = c || {}, c.input || a.error("input is missing"), e.mixin(this), this.$hint = a(c.hint), this.$input = a(c.input), this.query = this.$input.val(), this.queryWhenFocused = this.hasFocus() ? this.query : null, this.$overflowHelper = d(this.$input), this._checkLanguageDirection(), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = b.noop)
            }
            function d(b) {
                return a('<pre aria-hidden="true"></pre>').css({
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontFamily: b.css("font-family"),
                    fontSize: b.css("font-size"),
                    fontStyle: b.css("font-style"),
                    fontVariant: b.css("font-variant"),
                    fontWeight: b.css("font-weight"),
                    wordSpacing: b.css("word-spacing"),
                    letterSpacing: b.css("letter-spacing"),
                    textIndent: b.css("text-indent"),
                    textRendering: b.css("text-rendering"),
                    textTransform: b.css("text-transform")
                }).insertAfter(b)
            }
            function f(a, b) {
                return c.normalizeQuery(a) === c.normalizeQuery(b)
            }
            function g(a) {
                return a.altKey || a.ctrlKey || a.metaKey || a.shiftKey
            }
            var h;
            return h = {
                9: "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            }, c.normalizeQuery = function(a) {
                return b.toStr(a).replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
            }, b.mixin(c.prototype, e, {
                _onBlur: function() {
                    this.resetInputValue(), this.trigger("blurred")
                },
                _onFocus: function() {
                    this.queryWhenFocused = this.query, this.trigger("focused")
                },
                _onKeydown: function(a) {
                    var b = h[a.which || a.keyCode];
                    this._managePreventDefault(b, a), b && this._shouldTrigger(b, a) && this.trigger(b + "Keyed", a)
                },
                _onInput: function() {
                    this._setQuery(this.getInputValue()), this.clearHintIfInvalid(), this._checkLanguageDirection()
                },
                _managePreventDefault: function(a, b) {
                    var c;
                    switch (a) {
                    case "up":
                    case "down":
                        c = !g(b);
                        break;
                    default:
                        c = !1
                    }
                    c && b.preventDefault()
                },
                _shouldTrigger: function(a, b) {
                    var c;
                    switch (a) {
                    case "tab":
                        c = !g(b);
                        break;
                    default:
                        c = !0
                    }
                    return c
                },
                _checkLanguageDirection: function() {
                    var a = (this.$input.css("direction") || "ltr").toLowerCase();
                    this.dir !== a && (this.dir = a, this.$hint.attr("dir", a), this.trigger("langDirChanged", a))
                },
                _setQuery: function(a, b) {
                    var c,
                        d;
                    c = f(a, this.query), d = c ? this.query.length !== a.length : !1, this.query = a, b || c ? !b && d && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
                },
                bind: function() {
                    var a,
                        c,
                        d,
                        e,
                        f = this;
                    return a = b.bind(this._onBlur, this), c = b.bind(this._onFocus, this), d = b.bind(this._onKeydown, this), e = b.bind(this._onInput, this), this.$input.on("blur.tt", a).on("focus.tt", c).on("keydown.tt", d), !b.isMsie() || b.isMsie() > 9 ? this.$input.on("input.tt", e) : this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(a) {
                        h[a.which || a.keyCode] || b.defer(b.bind(f._onInput, f, a))
                    }), this
                },
                focus: function() {
                    this.$input.focus()
                },
                blur: function() {
                    this.$input.blur()
                },
                getLangDir: function() {
                    return this.dir
                },
                getQuery: function() {
                    return this.query || ""
                },
                setQuery: function(a, b) {
                    this.setInputValue(a), this._setQuery(a, b)
                },
                hasQueryChangedSinceLastFocus: function() {
                    return this.query !== this.queryWhenFocused
                },
                getInputValue: function() {
                    return this.$input.val()
                },
                setInputValue: function(a) {
                    this.$input.val(a), this.clearHintIfInvalid(), this._checkLanguageDirection()
                },
                resetInputValue: function() {
                    this.setInputValue(this.query)
                },
                getHint: function() {
                    return this.$hint.val()
                },
                setHint: function(a) {
                    this.$hint.val(a)
                },
                clearHint: function() {
                    this.setHint("")
                },
                clearHintIfInvalid: function() {
                    var a,
                        b,
                        c,
                        d;
                    a = this.getInputValue(), b = this.getHint(), c = a !== b && 0 === b.indexOf(a), d = "" !== a && c && !this.hasOverflow(), !d && this.clearHint()
                },
                hasFocus: function() {
                    return this.$input.is(":focus")
                },
                hasOverflow: function() {
                    var a = this.$input.width() - 2;
                    return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= a
                },
                isCursorAtEnd: function() {
                    var a,
                        c,
                        d;
                    return a = this.$input.val().length, c = this.$input[0].selectionStart, b.isNumber(c) ? c === a : document.selection ? (d = document.selection.createRange(), d.moveStart("character", -a), a === d.text.length) : !0
                },
                destroy: function() {
                    this.$hint.off(".tt"), this.$input.off(".tt"), this.$overflowHelper.remove(), this.$hint = this.$input = this.$overflowHelper = a("<div>")
                }
            }), c
        }(),
        h = function() {
            "use strict";
            function c(c, e) {
                c = c || {}, c.templates = c.templates || {}, c.templates.notFound = c.templates.notFound || c.templates.empty, c.source || a.error("missing source"), c.node || a.error("missing node"), c.name && !h(c.name) && a.error("invalid dataset name: " + c.name), e.mixin(this), this.highlight = !!c.highlight, this.name = c.name || j(), this.limit = c.limit || 5, this.displayFn = d(c.display || c.displayKey), this.templates = g(c.templates, this.displayFn), this.source = c.source.__ttAdapter ? c.source.__ttAdapter() : c.source, this.async = b.isUndefined(c.async) ? this.source.length > 2 : !!c.async, this._resetLastSuggestion(), this.$el = a(c.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name)
            }
            function d(a) {
                function c(b) {
                    return b[a]
                }
                return a = a || b.stringify, b.isFunction(a) ? a : c
            }
            function g(c, d) {
                function e(b) {
                    return a("<div>").text(d(b))
                }
                return {
                    notFound: c.notFound && b.templatify(c.notFound),
                    pending: c.pending && b.templatify(c.pending),
                    header: c.header && b.templatify(c.header),
                    footer: c.footer && b.templatify(c.footer),
                    suggestion: c.suggestion || e
                }
            }
            function h(a) {
                return /^[_a-zA-Z0-9-]+$/.test(a)
            }
            var i,
                j;
            return i = {
                val: "tt-selectable-display",
                obj: "tt-selectable-object"
            }, j = b.getIdGenerator(), c.extractData = function(b) {
                var c = a(b);
                return c.data(i.obj) ? {
                    val: c.data(i.val) || "",
                    obj: c.data(i.obj) || null
                } : null
            }, b.mixin(c.prototype, e, {
                _overwrite: function(a, b) {
                    b = b || [], b.length ? this._renderSuggestions(a, b) : this.async && this.templates.pending ? this._renderPending(a) : !this.async && this.templates.notFound ? this._renderNotFound(a) : this._empty(), this.trigger("rendered", this.name, b, !1)
                },
                _append: function(a, b) {
                    b = b || [], b.length && this.$lastSuggestion.length ? this._appendSuggestions(a, b) : b.length ? this._renderSuggestions(a, b) : !this.$lastSuggestion.length && this.templates.notFound && this._renderNotFound(a), this.trigger("rendered", this.name, b, !0)
                },
                _renderSuggestions: function(a, b) {
                    var c;
                    c = this._getSuggestionsFragment(a, b), this.$lastSuggestion = c.children().last(), this.$el.html(c).prepend(this._getHeader(a, b)).append(this._getFooter(a, b))
                },
                _appendSuggestions: function(a, b) {
                    var c,
                        d;
                    c = this._getSuggestionsFragment(a, b), d = c.children().last(), this.$lastSuggestion.after(c), this.$lastSuggestion = d
                },
                _renderPending: function(a) {
                    var b = this.templates.pending;
                    this._resetLastSuggestion(), b && this.$el.html(b({
                        query: a,
                        dataset: this.name
                    }))
                },
                _renderNotFound: function(a) {
                    var b = this.templates.notFound;
                    this._resetLastSuggestion(), b && this.$el.html(b({
                        query: a,
                        dataset: this.name
                    }))
                },
                _empty: function() {
                    this.$el.empty(), this._resetLastSuggestion()
                },
                _getSuggestionsFragment: function(c, d) {
                    var e,
                        g = this;
                    return e = document.createDocumentFragment(), b.each(d, function(b) {
                        var d,
                            f;
                        f = g._injectQuery(c, b), d = a(g.templates.suggestion(f)).data(i.obj, b).data(i.val, g.displayFn(b)).addClass(g.classes.suggestion + " " + g.classes.selectable), e.appendChild(d[0])
                    }), this.highlight && f({
                        className: this.classes.highlight,
                        node: e,
                        pattern: c
                    }), a(e)
                },
                _getFooter: function(a, b) {
                    return this.templates.footer ? this.templates.footer({
                        query: a,
                        suggestions: b,
                        dataset: this.name
                    }) : null
                },
                _getHeader: function(a, b) {
                    return this.templates.header ? this.templates.header({
                        query: a,
                        suggestions: b,
                        dataset: this.name
                    }) : null
                },
                _resetLastSuggestion: function() {
                    this.$lastSuggestion = a()
                },
                _injectQuery: function(a, c) {
                    return b.isObject(c) ? b.mixin({
                        _query: a
                    }, c) : c
                },
                update: function(b) {
                    function c(a) {
                        g || (g = !0, a = (a || []).slice(0, e.limit), h = a.length, e._overwrite(b, a), h < e.limit && e.async && e.trigger("asyncRequested", b))
                    }
                    function d(c) {
                        c = c || [], !f && h < e.limit && (e.cancel = a.noop, h += c.length, e._append(b, c.slice(0, e.limit - h)), e.async && e.trigger("asyncReceived", b))
                    }
                    var e = this,
                        f = !1,
                        g = !1,
                        h = 0;
                    this.cancel(), this.cancel = function() {
                        f = !0, e.cancel = a.noop, e.async && e.trigger("asyncCanceled", b)
                    }, this.source(b, c, d), !g && c([])
                },
                cancel: a.noop,
                clear: function() {
                    this._empty(), this.cancel(), this.trigger("cleared")
                },
                isEmpty: function() {
                    return this.$el.is(":empty")
                },
                destroy: function() {
                    this.$el = a("<div>")
                }
            }), c
        }(),
        i = function() {
            "use strict";
            function c(c, d) {
                function e(b) {
                    var c = f.$node.find(b.node).first();
                    return b.node = c.length ? c : a("<div>").appendTo(f.$node), new h(b, d)
                }
                var f = this;
                c = c || {}, c.node || a.error("node is required"), d.mixin(this), this.$node = a(c.node), this.query = null, this.datasets = b.map(c.datasets, e)
            }
            return b.mixin(c.prototype, e, {
                _onSelectableClick: function(b) {
                    this.trigger("selectableClicked", a(b.currentTarget))
                },
                _onRendered: function(a, b, c, d) {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetRendered", b, c, d)
                },
                _onCleared: function() {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetCleared")
                },
                _propagate: function() {
                    this.trigger.apply(this, arguments)
                },
                _allDatasetsEmpty: function() {
                    function a(a) {
                        return a.isEmpty()
                    }
                    return b.every(this.datasets, a)
                },
                _getSelectables: function() {
                    return this.$node.find(this.selectors.selectable)
                },
                _removeCursor: function() {
                    var a = this.getActiveSelectable();
                    a && a.removeClass(this.classes.cursor)
                },
                _ensureVisible: function(a) {
                    var b,
                        c,
                        d,
                        e;
                    b = a.position().top, c = b + a.outerHeight(!0), d = this.$node.scrollTop(), e = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10), 0 > b ? this.$node.scrollTop(d + b) : c > e && this.$node.scrollTop(d + (c - e))
                },
                bind: function() {
                    var a,
                        c = this;
                    return a = b.bind(this._onSelectableClick, this), this.$node.on("click.tt", this.selectors.selectable, a), b.each(this.datasets, function(a) {
                        a.onSync("asyncRequested", c._propagate, c).onSync("asyncCanceled", c._propagate, c).onSync("asyncReceived", c._propagate, c).onSync("rendered", c._onRendered, c).onSync("cleared", c._onCleared, c)
                    }), this
                },
                isOpen: function() {
                    return this.$node.hasClass(this.classes.open)
                },
                open: function() {
                    this.$node.addClass(this.classes.open)
                },
                close: function() {
                    this.$node.removeClass(this.classes.open), this._removeCursor()
                },
                setLanguageDirection: function(a) {
                    this.$node.attr("dir", a)
                },
                selectableRelativeToCursor: function(a) {
                    var b,
                        c,
                        d,
                        e;
                    return c = this.getActiveSelectable(), b = this._getSelectables(), d = c ? b.index(c) : -1, e = d + a, e = (e + 1) % (b.length + 1) - 1, e = -1 > e ? b.length - 1 : e, -1 === e ? null : b.eq(e)
                },
                setCursor: function(a) {
                    this._removeCursor(), (a = a && a.first()) && (a.addClass(this.classes.cursor), this._ensureVisible(a))
                },
                getSelectableData: function(a) {
                    return a && a.length ? h.extractData(a) : null
                },
                getActiveSelectable: function() {
                    var a = this._getSelectables().filter(this.selectors.cursor).first();
                    return a.length ? a : null
                },
                getTopSelectable: function() {
                    var a = this._getSelectables().first();
                    return a.length ? a : null
                },
                update: function(a) {
                    function c(b) {
                        b.update(a)
                    }
                    var d = a !== this.query;
                    return d && (this.query = a, b.each(this.datasets, c)), d
                },
                empty: function() {
                    function a(a) {
                        a.clear()
                    }
                    b.each(this.datasets, a), this.query = null, this.$node.addClass(this.classes.empty)
                },
                destroy: function() {
                    function c(a) {
                        a.destroy()
                    }
                    this.$node.off(".tt"), this.$node = a("<div>"), b.each(this.datasets, c)
                }
            }), c
        }(),
        j = function() {
            "use strict";
            function a() {
                i.apply(this, [].slice.call(arguments, 0))
            }
            var c = i.prototype;
            return b.mixin(a.prototype, i.prototype, {
                open: function() {
                    return !this._allDatasetsEmpty() && this._show(), c.open.apply(this, [].slice.call(arguments, 0))
                },
                close: function() {
                    return this._hide(), c.close.apply(this, [].slice.call(arguments, 0))
                },
                _onRendered: function() {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), c._onRendered.apply(this, [].slice.call(arguments, 0))
                },
                _onCleared: function() {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), c._onCleared.apply(this, [].slice.call(arguments, 0))
                },
                setLanguageDirection: function(a) {
                    return this.$node.css("ltr" === a ? this.css.ltr : this.css.rtl), c.setLanguageDirection.apply(this, [].slice.call(arguments, 0))
                },
                _hide: function() {
                    this.$node.hide()
                },
                _show: function() {
                    this.$node.css("display", "block")
                }
            }), a
        }(),
        k = function() {
            "use strict";
            function c(c, e) {
                var f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p;
                c = c || {}, c.input || a.error("missing input"), c.menu || a.error("missing menu"), c.eventBus || a.error("missing event bus"), e.mixin(this), this.eventBus = c.eventBus, this.minLength = b.isNumber(c.minLength) ? c.minLength : 1, this.input = c.input, this.menu = c.menu, this.enabled = !0, this.active = !1, this.input.hasFocus() && this.activate(), this.dir = this.input.getLangDir(), this._hacks(), this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this), f = d(this, "activate", "open", "_onFocused"), g = d(this, "deactivate", "_onBlurred"), h = d(this, "isActive", "isOpen", "_onEnterKeyed"), i = d(this, "isActive", "isOpen", "_onTabKeyed"), j = d(this, "isActive", "_onEscKeyed"), k = d(this, "isActive", "open", "_onUpKeyed"), l = d(this, "isActive", "open", "_onDownKeyed"), m = d(this, "isActive", "isOpen", "_onLeftKeyed"), n = d(this, "isActive", "isOpen", "_onRightKeyed"), o = d(this, "_openIfActive", "_onQueryChanged"), p = d(this, "_openIfActive", "_onWhitespaceChanged"), this.input.bind().onSync("focused", f, this).onSync("blurred", g, this).onSync("enterKeyed", h, this).onSync("tabKeyed", i, this).onSync("escKeyed", j, this).onSync("upKeyed", k, this).onSync("downKeyed", l, this).onSync("leftKeyed", m, this).onSync("rightKeyed", n, this).onSync("queryChanged", o, this).onSync("whitespaceChanged", p, this).onSync("langDirChanged", this._onLangDirChanged, this)
            }
            function d(a) {
                var c = [].slice.call(arguments, 1);
                return function() {
                    var d = [].slice.call(arguments);
                    b.each(c, function(b) {
                        return a[b].apply(a, d)
                    })
                }
            }
            return b.mixin(c.prototype, {
                _hacks: function() {
                    var c,
                        d;
                    c = this.input.$input || a("<div>"), d = this.menu.$node || a("<div>"), c.on("blur.tt", function(a) {
                        var e,
                            f,
                            g;
                        e = document.activeElement, f = d.is(e), g = d.has(e).length > 0, b.isMsie() && (f || g) && (a.preventDefault(), a.stopImmediatePropagation(), b.defer(function() {
                            c.focus()
                        }))
                    }), d.on("mousedown.tt", function(a) {
                        a.preventDefault()
                    })
                },
                _onSelectableClicked: function(a, b) {
                    this.select(b)
                },
                _onDatasetCleared: function() {
                    this._updateHint()
                },
                _onDatasetRendered: function(a, b, c, d) {
                    this._updateHint(), this.eventBus.trigger("render", c, d, b)
                },
                _onAsyncRequested: function(a, b, c) {
                    this.eventBus.trigger("asyncrequest", c, b)
                },
                _onAsyncCanceled: function(a, b, c) {
                    this.eventBus.trigger("asynccancel", c, b)
                },
                _onAsyncReceived: function(a, b, c) {
                    this.eventBus.trigger("asyncreceive", c, b)
                },
                _onFocused: function() {
                    this._minLengthMet() && this.menu.update(this.input.getQuery())
                },
                _onBlurred: function() {
                    this.input.hasQueryChangedSinceLastFocus() && this.eventBus.trigger("change", this.input.getQuery())
                },
                _onEnterKeyed: function(a, b) {
                    var c;
                    (c = this.menu.getActiveSelectable()) && this.select(c) && b.preventDefault()
                },
                _onTabKeyed: function(a, b) {
                    var c;
                    (c = this.menu.getActiveSelectable()) ? this.select(c) && b.preventDefault() : (c = this.menu.getTopSelectable()) && this.autocomplete(c) && b.preventDefault()
                },
                _onEscKeyed: function() {
                    this.close()
                },
                _onUpKeyed: function() {
                    this.moveCursor(-1)
                },
                _onDownKeyed: function() {
                    this.moveCursor(1)
                },
                _onLeftKeyed: function() {
                    "rtl" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onRightKeyed: function() {
                    "ltr" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onQueryChanged: function(a, b) {
                    this._minLengthMet(b) ? this.menu.update(b) : this.menu.empty()
                },
                _onWhitespaceChanged: function() {
                    this._updateHint()
                },
                _onLangDirChanged: function(a, b) {
                    this.dir !== b && (this.dir = b, this.menu.setLanguageDirection(b))
                },
                _openIfActive: function() {
                    this.isActive() && this.open()
                },
                _minLengthMet: function(a) {
                    return a = b.isString(a) ? a : this.input.getQuery() || "", a.length >= this.minLength
                },
                _updateHint: function() {
                    var a,
                        c,
                        d,
                        e,
                        f,
                        h,
                        i;
                    a = this.menu.getTopSelectable(), c = this.menu.getSelectableData(a), d = this.input.getInputValue(), !c || b.isBlankString(d) || this.input.hasOverflow() ? this.input.clearHint() : (e = g.normalizeQuery(d), f = b.escapeRegExChars(e), h = new RegExp("^(?:" + f + ")(.+$)", "i"), i = h.exec(c.val), i && this.input.setHint(d + i[1]))
                },
                isEnabled: function() {
                    return this.enabled
                },
                enable: function() {
                    this.enabled = !0
                },
                disable: function() {
                    this.enabled = !1
                },
                isActive: function() {
                    return this.active
                },
                activate: function() {
                    return this.isActive() ? !0 : !this.isEnabled() || this.eventBus.before("active") ? !1 : (this.active = !0, this.eventBus.trigger("active"), !0)
                },
                deactivate: function() {
                    return this.isActive() ? this.eventBus.before("idle") ? !1 : (this.active = !1, this.close(), this.eventBus.trigger("idle"), !0) : !0
                },
                isOpen: function() {
                    return this.menu.isOpen()
                },
                open: function() {
                    return this.isOpen() || this.eventBus.before("open") || (this.menu.open(), this._updateHint(), this.eventBus.trigger("open")), this.isOpen()
                },
                close: function() {
                    return this.isOpen() && !this.eventBus.before("close") && (this.menu.close(), this.input.clearHint(), this.input.resetInputValue(), this.eventBus.trigger("close")), !this.isOpen()
                },
                setVal: function(a) {
                    this.input.setQuery(b.toStr(a))
                },
                getVal: function() {
                    return this.input.getQuery()
                },
                select: function(a) {
                    var b = this.menu.getSelectableData(a);
                    return b && !this.eventBus.before("select", b.obj) ? (this.input.setQuery(b.val, !0), this.eventBus.trigger("select", b.obj), this.close(), !0) : !1
                },
                autocomplete: function(a) {
                    var b,
                        c,
                        d;
                    return b = this.input.getQuery(), c = this.menu.getSelectableData(a), d = c && b !== c.val, d && !this.eventBus.before("autocomplete", c.obj) ? (this.input.setQuery(c.val), this.eventBus.trigger("autocomplete", c.obj), !0) : !1
                },
                moveCursor: function(a) {
                    var b,
                        c,
                        d,
                        e,
                        f;
                    return b = this.input.getQuery(), c = this.menu.selectableRelativeToCursor(a), d = this.menu.getSelectableData(c), e = d ? d.obj : null, f = this._minLengthMet() && this.menu.update(b), f || this.eventBus.before("cursorchange", e) ? !1 : (this.menu.setCursor(c), d ? this.input.setInputValue(d.val) : (this.input.resetInputValue(), this._updateHint()), this.eventBus.trigger("cursorchange", e), !0)
                },
                destroy: function() {
                    this.input.destroy(), this.menu.destroy()
                }
            }), c
        }();
    !function() {
        "use strict";
        function e(b, c) {
            b.each(function() {
                var b,
                    d = a(this);
                (b = d.data(p.typeahead)) && c(b, d)
            })
        }
        function f(a, b) {
            return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(l(a)).prop("readonly", !0).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            })
        }
        function h(a, b) {
            a.data(p.attrs, {
                dir: a.attr("dir"),
                autocomplete: a.attr("autocomplete"),
                spellcheck: a.attr("spellcheck"),
                style: a.attr("style")
            }), a.addClass(b.classes.input).attr({
                autocomplete: "off",
                spellcheck: !1
            });
            try {
                !a.attr("dir") && a.attr("dir", "auto")
            } catch (c) {}
            return a
        }
        function l(a) {
            return {
                backgroundAttachment: a.css("background-attachment"),
                backgroundClip: a.css("background-clip"),
                backgroundColor: a.css("background-color"),
                backgroundImage: a.css("background-image"),
                backgroundOrigin: a.css("background-origin"),
                backgroundPosition: a.css("background-position"),
                backgroundRepeat: a.css("background-repeat"),
                backgroundSize: a.css("background-size")
            }
        }
        function m(a) {
            var c,
                d;
            c = a.data(p.www), d = a.parent().filter(c.selectors.wrapper), b.each(a.data(p.attrs), function(c, d) {
                b.isUndefined(c) ? a.removeAttr(d) : a.attr(d, c)
            }), a.removeData(p.typeahead).removeData(p.www).removeData(p.attr).removeClass(c.classes.input), d.length && (a.detach().insertAfter(d), d.remove())
        }
        function n(c) {
            var d,
                e;
            return d = b.isJQuery(c) || b.isElement(c), e = d ? a(c).first() : [], e.length ? e : null
        }
        var o,
            p,
            q;
        o = a.fn.typeahead, p = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        }, q = {
            initialize: function(e, l) {
                function m() {
                    var c,
                        m,
                        q,
                        r,
                        s,
                        t,
                        u,
                        v,
                        w,
                        x,
                        y;
                    b.each(l, function(a) {
                        a.highlight = !!e.highlight
                    }), c = a(this), m = a(o.html.wrapper), q = n(e.hint), r = n(e.menu), s = e.hint !== !1 && !q, t = e.menu !== !1 && !r, s && (q = f(c, o)), t && (r = a(o.html.menu).css(o.css.menu)), q && q.val(""), c = h(c, o), (s || t) && (m.css(o.css.wrapper), c.css(s ? o.css.input : o.css.inputWithNoHint), c.wrap(m).parent().prepend(s ? q : null).append(t ? r : null)), y = t ? j : i, u = new d({
                        el: c
                    }), v = new g({
                        hint: q,
                        input: c
                    }, o), w = new y({
                        node: r,
                        datasets: l
                    }, o), x = new k({
                        input: v,
                        menu: w,
                        eventBus: u,
                        minLength: e.minLength
                    }, o), c.data(p.www, o), c.data(p.typeahead, x)
                }
                var o;
                return l = b.isArray(l) ? l : [].slice.call(arguments, 1), e = e || {}, o = c(e.classNames), this.each(m)
            },
            isEnabled: function() {
                var a;
                return e(this.first(), function(b) {
                    a = b.isEnabled()
                }), a
            },
            enable: function() {
                return e(this, function(a) {
                    a.enable()
                }), this
            },
            disable: function() {
                return e(this, function(a) {
                    a.disable()
                }), this
            },
            isActive: function() {
                var a;
                return e(this.first(), function(b) {
                    a = b.isActive()
                }), a
            },
            activate: function() {
                return e(this, function(a) {
                    a.activate()
                }), this
            },
            deactivate: function() {
                return e(this, function(a) {
                    a.deactivate()
                }), this
            },
            isOpen: function() {
                var a;
                return e(this.first(), function(b) {
                    a = b.isOpen()
                }), a
            },
            open: function() {
                return e(this, function(a) {
                    a.open()
                }), this
            },
            close: function() {
                return e(this, function(a) {
                    a.close()
                }), this
            },
            select: function(b) {
                var c = !1,
                    d = a(b);
                return e(this.first(), function(a) {
                    c = a.select(d)
                }), c
            },
            autocomplete: function(b) {
                var c = !1,
                    d = a(b);
                return e(this.first(), function(a) {
                    c = a.autocomplete(d)
                }), c
            },
            moveCursor: function(a) {
                var b = !1;
                return e(this.first(), function(c) {
                    b = c.moveCursor(a)
                }), b
            },
            val: function(a) {
                var b;
                return arguments.length ? (e(this, function(b) {
                    b.setVal(a)
                }), this) : (e(this.first(), function(a) {
                    b = a.getVal()
                }), b)
            },
            destroy: function() {
                return e(this, function(a, b) {
                    m(b), a.destroy()
                }), this
            }
        }, a.fn.typeahead = function(a) {
            return q[a] ? q[a].apply(this, [].slice.call(arguments, 1)) : q.initialize.apply(this, arguments)
        }, a.fn.typeahead.noConflict = function() {
            return a.fn.typeahead = o, this
        }
    }()
});


/*!

 handlebars v4.0.5

Copyright (C) 2011-2015 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
!function(a, b) {
    "object" == typeof exports && "object" == typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? exports.Handlebars = b() : a.Handlebars = b()
}(this, function() {
    return function(a) {
        function b(d) {
            if (c[d])
                return c[d].exports;
            var e = c[d] = {
                exports: {},
                id: d,
                loaded: !1
            };
            return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
        }
        var c = {};
        return b.m = a, b.c = c, b.p = "", b(0)
    }([function(a, b, c) {
        "use strict";
        function d() {
            var a = r();
            return a.compile = function(b, c) {
                return k.compile(b, c, a)
            }, a.precompile = function(b, c) {
                return k.precompile(b, c, a)
            }, a.AST = i["default"], a.Compiler = k.Compiler, a.JavaScriptCompiler = m["default"], a.Parser = j.parser, a.parse = j.parse, a
        }
        var e = c(1)["default"];
        b.__esModule = !0;
        var f = c(2),
            g = e(f),
            h = c(21),
            i = e(h),
            j = c(22),
            k = c(27),
            l = c(28),
            m = e(l),
            n = c(25),
            o = e(n),
            p = c(20),
            q = e(p),
            r = g["default"].create,
            s = d();
        s.create = d, q["default"](s), s.Visitor = o["default"], s["default"] = s, b["default"] = s, a.exports = b["default"]
    }, function(a, b) {
        "use strict";
        b["default"] = function(a) {
            return a && a.__esModule ? a : {
                "default": a
            }
        }, b.__esModule = !0
    }, function(a, b, c) {
        "use strict";
        function d() {
            var a = new h.HandlebarsEnvironment;
            return n.extend(a, h), a.SafeString = j["default"], a.Exception = l["default"], a.Utils = n, a.escapeExpression = n.escapeExpression, a.VM = p, a.template = function(b) {
                return p.template(b, a)
            }, a
        }
        var e = c(3)["default"],
            f = c(1)["default"];
        b.__esModule = !0;
        var g = c(4),
            h = e(g),
            i = c(18),
            j = f(i),
            k = c(6),
            l = f(k),
            m = c(5),
            n = e(m),
            o = c(19),
            p = e(o),
            q = c(20),
            r = f(q),
            s = d();
        s.create = d, r["default"](s), s["default"] = s, b["default"] = s, a.exports = b["default"]
    }, function(a, b) {
        "use strict";
        b["default"] = function(a) {
            if (a && a.__esModule)
                return a;
            var b = {};
            if (null != a)
                for (var c in a)
                    Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
            return b["default"] = a, b
        }, b.__esModule = !0
    }, function(a, b, c) {
        "use strict";
        function d(a, b, c) {
            this.helpers = a || {}, this.partials = b || {}, this.decorators = c || {}, i.registerDefaultHelpers(this), j.registerDefaultDecorators(this)
        }
        var e = c(1)["default"];
        b.__esModule = !0, b.HandlebarsEnvironment = d;
        var f = c(5),
            g = c(6),
            h = e(g),
            i = c(7),
            j = c(15),
            k = c(17),
            l = e(k),
            m = "4.0.5";
        b.VERSION = m;
        var n = 7;
        b.COMPILER_REVISION = n;
        var o = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1",
            7: ">= 4.0.0"
        };
        b.REVISION_CHANGES = o;
        var p = "[object Object]";
        d.prototype = {
            constructor: d,
            logger: l["default"],
            log: l["default"].log,
            registerHelper: function(a, b) {
                if (f.toString.call(a) === p) {
                    if (b)
                        throw new h["default"]("Arg not supported with multiple helpers");
                    f.extend(this.helpers, a)
                } else
                    this.helpers[a] = b
            },
            unregisterHelper: function(a) {
                delete this.helpers[a]
            },
            registerPartial: function(a, b) {
                if (f.toString.call(a) === p)
                    f.extend(this.partials, a);
                else {
                    if ("undefined" == typeof b)
                        throw new h["default"]('Attempting to register a partial called "' + a + '" as undefined');
                    this.partials[a] = b
                }
            },
            unregisterPartial: function(a) {
                delete this.partials[a]
            },
            registerDecorator: function(a, b) {
                if (f.toString.call(a) === p) {
                    if (b)
                        throw new h["default"]("Arg not supported with multiple decorators");
                    f.extend(this.decorators, a)
                } else
                    this.decorators[a] = b
            },
            unregisterDecorator: function(a) {
                delete this.decorators[a]
            }
        };
        var q = l["default"].log;
        b.log = q, b.createFrame = f.createFrame, b.logger = l["default"]
    }, function(a, b) {
        "use strict";
        function c(a) {
            return k[a]
        }
        function d(a) {
            for (var b = 1; b < arguments.length; b++)
                for (var c in arguments[b])
                    Object.prototype.hasOwnProperty.call(arguments[b], c) && (a[c] = arguments[b][c]);
            return a
        }
        function e(a, b) {
            for (var c = 0, d = a.length; d > c; c++)
                if (a[c] === b)
                    return c;
            return -1
        }
        function f(a) {
            if ("string" != typeof a) {
                if (a && a.toHTML)
                    return a.toHTML();
                if (null == a)
                    return "";
                if (!a)
                    return a + "";
                a = "" + a
            }
            return m.test(a) ? a.replace(l, c) : a
        }
        function g(a) {
            return a || 0 === a ? p(a) && 0 === a.length ? !0 : !1 : !0
        }
        function h(a) {
            var b = d({}, a);
            return b._parent = a, b
        }
        function i(a, b) {
            return a.path = b, a
        }
        function j(a, b) {
            return (a ? a + "." : "") + b
        }
        b.__esModule = !0, b.extend = d, b.indexOf = e, b.escapeExpression = f, b.isEmpty = g, b.createFrame = h, b.blockParams = i, b.appendContextPath = j;
        var k = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;",
                "=": "&#x3D;"
            },
            l = /[&<>"'`=]/g,
            m = /[&<>"'`=]/,
            n = Object.prototype.toString;
        b.toString = n;
        var o = function(a) {
            return "function" == typeof a
        };
        o(/x/) && (b.isFunction = o = function(a) {
            return "function" == typeof a && "[object Function]" === n.call(a)
        }), b.isFunction = o;
        var p = Array.isArray || function(a) {
            return a && "object" == typeof a ? "[object Array]" === n.call(a) : !1
        };
        b.isArray = p
    }, function(a, b) {
        "use strict";
        function c(a, b) {
            var e = b && b.loc,
                f = void 0,
                g = void 0;
            e && (f = e.start.line, g = e.start.column, a += " - " + f + ":" + g);
            for (var h = Error.prototype.constructor.call(this, a), i = 0; i < d.length; i++)
                this[d[i]] = h[d[i]];
            Error.captureStackTrace && Error.captureStackTrace(this, c), e && (this.lineNumber = f, this.column = g)
        }
        b.__esModule = !0;
        var d = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        c.prototype = new Error, b["default"] = c, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        function d(a) {
            g["default"](a), i["default"](a), k["default"](a), m["default"](a), o["default"](a), q["default"](a), s["default"](a)
        }
        var e = c(1)["default"];
        b.__esModule = !0, b.registerDefaultHelpers = d;
        var f = c(8),
            g = e(f),
            h = c(9),
            i = e(h),
            j = c(10),
            k = e(j),
            l = c(11),
            m = e(l),
            n = c(12),
            o = e(n),
            p = c(13),
            q = e(p),
            r = c(14),
            s = e(r)
    }, function(a, b, c) {
        "use strict";
        b.__esModule = !0;
        var d = c(5);
        b["default"] = function(a) {
            a.registerHelper("blockHelperMissing", function(b, c) {
                var e = c.inverse,
                    f = c.fn;
                if (b === !0)
                    return f(this);
                if (b === !1 || null == b)
                    return e(this);
                if (d.isArray(b))
                    return b.length > 0 ? (c.ids && (c.ids = [c.name]), a.helpers.each(b, c)) : e(this);
                if (c.data && c.ids) {
                    var g = d.createFrame(c.data);
                    g.contextPath = d.appendContextPath(c.data.contextPath, c.name), c = {
                        data: g
                    }
                }
                return f(b, c)
            })
        }, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        var d = c(1)["default"];
        b.__esModule = !0;
        var e = c(5),
            f = c(6),
            g = d(f);
        b["default"] = function(a) {
            a.registerHelper("each", function(a, b) {
                function c(b, c, f) {
                    j && (j.key = b, j.index = c, j.first = 0 === c, j.last = !!f, k && (j.contextPath = k + b)), i += d(a[b], {
                        data: j,
                        blockParams: e.blockParams([a[b], b], [k + b, null])
                    })
                }
                if (!b)
                    throw new g["default"]("Must pass iterator to #each");
                var d = b.fn,
                    f = b.inverse,
                    h = 0,
                    i = "",
                    j = void 0,
                    k = void 0;
                if (b.data && b.ids && (k = e.appendContextPath(b.data.contextPath, b.ids[0]) + "."), e.isFunction(a) && (a = a.call(this)), b.data && (j = e.createFrame(b.data)), a && "object" == typeof a)
                    if (e.isArray(a))
                        for (var l = a.length; l > h; h++)
                            h in a && c(h, h, h === a.length - 1);
                    else {
                        var m = void 0;
                        for (var n in a)
                            a.hasOwnProperty(n) && (void 0 !== m && c(m, h - 1), m = n, h++);
                        void 0 !== m && c(m, h - 1, !0)
                    }
                return 0 === h && (i = f(this)), i
            })
        }, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        var d = c(1)["default"];
        b.__esModule = !0;
        var e = c(6),
            f = d(e);
        b["default"] = function(a) {
            a.registerHelper("helperMissing", function() {
                if (1 === arguments.length)
                    return void 0;
                throw new f["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
            })
        }, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        b.__esModule = !0;
        var d = c(5);
        b["default"] = function(a) {
            a.registerHelper("if", function(a, b) {
                return d.isFunction(a) && (a = a.call(this)), !b.hash.includeZero && !a || d.isEmpty(a) ? b.inverse(this) : b.fn(this)
            }), a.registerHelper("unless", function(b, c) {
                return a.helpers["if"].call(this, b, {
                    fn: c.inverse,
                    inverse: c.fn,
                    hash: c.hash
                })
            })
        }, a.exports = b["default"]
    }, function(a, b) {
        "use strict";
        b.__esModule = !0, b["default"] = function(a) {
            a.registerHelper("log", function() {
                for (var b = [void 0], c = arguments[arguments.length - 1], d = 0; d < arguments.length - 1; d++)
                    b.push(arguments[d]);
                var e = 1;
                null != c.hash.level ? e = c.hash.level : c.data && null != c.data.level && (e = c.data.level), b[0] = e, a.log.apply(a, b)
            })
        }, a.exports = b["default"]
    }, function(a, b) {
        "use strict";
        b.__esModule = !0, b["default"] = function(a) {
            a.registerHelper("lookup", function(a, b) {
                return a && a[b]
            })
        }, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        b.__esModule = !0;
        var d = c(5);
        b["default"] = function(a) {
            a.registerHelper("with", function(a, b) {
                d.isFunction(a) && (a = a.call(this));
                var c = b.fn;
                if (d.isEmpty(a))
                    return b.inverse(this);
                var e = b.data;
                return b.data && b.ids && (e = d.createFrame(b.data), e.contextPath = d.appendContextPath(b.data.contextPath, b.ids[0])), c(a, {
                    data: e,
                    blockParams: d.blockParams([a], [e && e.contextPath])
                })
            })
        }, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        function d(a) {
            g["default"](a)
        }
        var e = c(1)["default"];
        b.__esModule = !0, b.registerDefaultDecorators = d;
        var f = c(16),
            g = e(f)
    }, function(a, b, c) {
        "use strict";
        b.__esModule = !0;
        var d = c(5);
        b["default"] = function(a) {
            a.registerDecorator("inline", function(a, b, c, e) {
                var f = a;
                return b.partials || (b.partials = {}, f = function(e, f) {
                    var g = c.partials;
                    c.partials = d.extend({}, g, b.partials);
                    var h = a(e, f);
                    return c.partials = g, h
                }), b.partials[e.args[0]] = e.fn, f
            })
        }, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        b.__esModule = !0;
        var d = c(5),
            e = {
                methodMap: ["debug", "info", "warn", "error"],
                level: "info",
                lookupLevel: function(a) {
                    if ("string" == typeof a) {
                        var b = d.indexOf(e.methodMap, a.toLowerCase());
                        a = b >= 0 ? b : parseInt(a, 10)
                    }
                    return a
                },
                log: function(a) {
                    if (a = e.lookupLevel(a), "undefined" != typeof console && e.lookupLevel(e.level) <= a) {
                        var b = e.methodMap[a];
                        console[b] || (b = "log");
                        for (var c = arguments.length, d = Array(c > 1 ? c - 1 : 0), f = 1; c > f; f++)
                            d[f - 1] = arguments[f];
                        console[b].apply(console, d)
                    }
                }
            };
        b["default"] = e, a.exports = b["default"]
    }, function(a, b) {
        "use strict";
        function c(a) {
            this.string = a
        }
        b.__esModule = !0, c.prototype.toString = c.prototype.toHTML = function() {
            return "" + this.string
        }, b["default"] = c, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        function d(a) {
            var b = a && a[0] || 1,
                c = r.COMPILER_REVISION;
            if (b !== c) {
                if (c > b) {
                    var d = r.REVISION_CHANGES[c],
                        e = r.REVISION_CHANGES[b];
                    throw new q["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + d + ") or downgrade your runtime to an older version (" + e + ").")
                }
                throw new q["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + a[1] + ").")
            }
        }
        function e(a, b) {
            function c(c, d, e) {
                e.hash && (d = o.extend({}, d, e.hash), e.ids && (e.ids[0] = !0)), c = b.VM.resolvePartial.call(this, c, d, e);
                var f = b.VM.invokePartial.call(this, c, d, e);
                if (null == f && b.compile && (e.partials[e.name] = b.compile(c, a.compilerOptions, b), f = e.partials[e.name](d, e)), null != f) {
                    if (e.indent) {
                        for (var g = f.split("\n"), h = 0, i = g.length; i > h && (g[h] || h + 1 !== i); h++)
                            g[h] = e.indent + g[h];
                        f = g.join("\n")
                    }
                    return f
                }
                throw new q["default"]("The partial " + e.name + " could not be compiled when running in runtime-only mode")
            }
            function d(b) {
                function c(b) {
                    return "" + a.main(e, b, e.helpers, e.partials, g, i, h)
                }
                var f = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                    g = f.data;
                d._setup(f), !f.partial && a.useData && (g = j(b, g));
                var h = void 0,
                    i = a.useBlockParams ? [] : void 0;
                return a.useDepths && (h = f.depths ? b !== f.depths[0] ? [b].concat(f.depths) : f.depths : [b]), (c = k(a.main, c, e, f.depths || [], g, i))(b, f)
            }
            if (!b)
                throw new q["default"]("No environment passed to template");
            if (!a || !a.main)
                throw new q["default"]("Unknown template object: " + typeof a);
            a.main.decorator = a.main_d, b.VM.checkRevision(a.compiler);
            var e = {
                strict: function(a, b) {
                    if (!(b in a))
                        throw new q["default"]('"' + b + '" not defined in ' + a);
                    return a[b]
                },
                lookup: function(a, b) {
                    for (var c = a.length, d = 0; c > d; d++)
                        if (a[d] && null != a[d][b])
                            return a[d][b]
                },
                lambda: function(a, b) {
                    return "function" == typeof a ? a.call(b) : a
                },
                escapeExpression: o.escapeExpression,
                invokePartial: c,
                fn: function(b) {
                    var c = a[b];
                    return c.decorator = a[b + "_d"], c
                },
                programs: [],
                program: function(a, b, c, d, e) {
                    var g = this.programs[a],
                        h = this.fn(a);
                    return b || e || d || c ? g = f(this, a, h, b, c, d, e) : g || (g = this.programs[a] = f(this, a, h)), g
                },
                data: function(a, b) {
                    for (; a && b--;)
                        a = a._parent;
                    return a
                },
                merge: function(a, b) {
                    var c = a || b;
                    return a && b && a !== b && (c = o.extend({}, b, a)), c
                },
                noop: b.VM.noop,
                compilerInfo: a.compiler
            };
            return d.isTop = !0, d._setup = function(c) {
                c.partial ? (e.helpers = c.helpers, e.partials = c.partials, e.decorators = c.decorators) : (e.helpers = e.merge(c.helpers, b.helpers), a.usePartial && (e.partials = e.merge(c.partials, b.partials)), (a.usePartial || a.useDecorators) && (e.decorators = e.merge(c.decorators, b.decorators)))
            }, d._child = function(b, c, d, g) {
                if (a.useBlockParams && !d)
                    throw new q["default"]("must pass block params");
                if (a.useDepths && !g)
                    throw new q["default"]("must pass parent depths");
                return f(e, b, a[b], c, 0, d, g)
            }, d
        }
        function f(a, b, c, d, e, f, g) {
            function h(b) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                    h = g;
                return g && b !== g[0] && (h = [b].concat(g)), c(a, b, a.helpers, a.partials, e.data || d, f && [e.blockParams].concat(f), h)
            }
            return h = k(c, h, a, g, d, f), h.program = b, h.depth = g ? g.length : 0, h.blockParams = e || 0, h
        }
        function g(a, b, c) {
            return a ? a.call || c.name || (c.name = a, a = c.partials[a]) : a = "@partial-block" === c.name ? c.data["partial-block"] : c.partials[c.name], a
        }
        function h(a, b, c) {
            c.partial = !0, c.ids && (c.data.contextPath = c.ids[0] || c.data.contextPath);
            var d = void 0;
            if (c.fn && c.fn !== i && (c.data = r.createFrame(c.data), d = c.data["partial-block"] = c.fn, d.partials && (c.partials = o.extend({}, c.partials, d.partials))), void 0 === a && d && (a = d), void 0 === a)
                throw new q["default"]("The partial " + c.name + " could not be found");
            return a instanceof Function ? a(b, c) : void 0
        }
        function i() {
            return ""
        }
        function j(a, b) {
            return b && "root" in b || (b = b ? r.createFrame(b) : {}, b.root = a), b
        }
        function k(a, b, c, d, e, f) {
            if (a.decorator) {
                var g = {};
                b = a.decorator(b, g, c, d && d[0], e, f, d), o.extend(b, g)
            }
            return b
        }
        var l = c(3)["default"],
            m = c(1)["default"];
        b.__esModule = !0, b.checkRevision = d, b.template = e, b.wrapProgram = f, b.resolvePartial = g, b.invokePartial = h, b.noop = i;
        var n = c(5),
            o = l(n),
            p = c(6),
            q = m(p),
            r = c(4)
    }, function(a, b) {
        (function(c) {
            "use strict";
            b.__esModule = !0, b["default"] = function(a) {
                var b = "undefined" != typeof c ? c : window,
                    d = b.Handlebars;
                a.noConflict = function() {
                    return b.Handlebars === a && (b.Handlebars = d), a
                }
            }, a.exports = b["default"]
        }).call(b, function() {
            return this
        }())
    }, function(a, b) {
        "use strict";
        b.__esModule = !0;
        var c = {
            helpers: {
                helperExpression: function(a) {
                    return "SubExpression" === a.type || ("MustacheStatement" === a.type || "BlockStatement" === a.type) && !!(a.params && a.params.length || a.hash)
                },
                scopedId: function(a) {
                    return /^\.|this\b/.test(a.original)
                },
                simpleId: function(a) {
                    return 1 === a.parts.length && !c.helpers.scopedId(a) && !a.depth
                }
            }
        };
        b["default"] = c, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        function d(a, b) {
            if ("Program" === a.type)
                return a;
            h["default"].yy = n, n.locInfo = function(a) {
                return new n.SourceLocation(b && b.srcName, a)
            };
            var c = new j["default"](b);
            return c.accept(h["default"].parse(a))
        }
        var e = c(1)["default"],
            f = c(3)["default"];
        b.__esModule = !0, b.parse = d;
        var g = c(23),
            h = e(g),
            i = c(24),
            j = e(i),
            k = c(26),
            l = f(k),
            m = c(5);
        b.parser = h["default"];
        var n = {};
        m.extend(n, l)
    }, function(a, b) {
        "use strict";
        var c = function() {
            function a() {
                this.yy = {}
            }
            var b = {
                    trace: function() {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        root: 3,
                        program: 4,
                        EOF: 5,
                        program_repetition0: 6,
                        statement: 7,
                        mustache: 8,
                        block: 9,
                        rawBlock: 10,
                        partial: 11,
                        partialBlock: 12,
                        content: 13,
                        COMMENT: 14,
                        CONTENT: 15,
                        openRawBlock: 16,
                        rawBlock_repetition_plus0: 17,
                        END_RAW_BLOCK: 18,
                        OPEN_RAW_BLOCK: 19,
                        helperName: 20,
                        openRawBlock_repetition0: 21,
                        openRawBlock_option0: 22,
                        CLOSE_RAW_BLOCK: 23,
                        openBlock: 24,
                        block_option0: 25,
                        closeBlock: 26,
                        openInverse: 27,
                        block_option1: 28,
                        OPEN_BLOCK: 29,
                        openBlock_repetition0: 30,
                        openBlock_option0: 31,
                        openBlock_option1: 32,
                        CLOSE: 33,
                        OPEN_INVERSE: 34,
                        openInverse_repetition0: 35,
                        openInverse_option0: 36,
                        openInverse_option1: 37,
                        openInverseChain: 38,
                        OPEN_INVERSE_CHAIN: 39,
                        openInverseChain_repetition0: 40,
                        openInverseChain_option0: 41,
                        openInverseChain_option1: 42,
                        inverseAndProgram: 43,
                        INVERSE: 44,
                        inverseChain: 45,
                        inverseChain_option0: 46,
                        OPEN_ENDBLOCK: 47,
                        OPEN: 48,
                        mustache_repetition0: 49,
                        mustache_option0: 50,
                        OPEN_UNESCAPED: 51,
                        mustache_repetition1: 52,
                        mustache_option1: 53,
                        CLOSE_UNESCAPED: 54,
                        OPEN_PARTIAL: 55,
                        partialName: 56,
                        partial_repetition0: 57,
                        partial_option0: 58,
                        openPartialBlock: 59,
                        OPEN_PARTIAL_BLOCK: 60,
                        openPartialBlock_repetition0: 61,
                        openPartialBlock_option0: 62,
                        param: 63,
                        sexpr: 64,
                        OPEN_SEXPR: 65,
                        sexpr_repetition0: 66,
                        sexpr_option0: 67,
                        CLOSE_SEXPR: 68,
                        hash: 69,
                        hash_repetition_plus0: 70,
                        hashSegment: 71,
                        ID: 72,
                        EQUALS: 73,
                        blockParams: 74,
                        OPEN_BLOCK_PARAMS: 75,
                        blockParams_repetition_plus0: 76,
                        CLOSE_BLOCK_PARAMS: 77,
                        path: 78,
                        dataName: 79,
                        STRING: 80,
                        NUMBER: 81,
                        BOOLEAN: 82,
                        UNDEFINED: 83,
                        NULL: 84,
                        DATA: 85,
                        pathSegments: 86,
                        SEP: 87,
                        $accept: 0,
                        $end: 1
                    },
                    terminals_: {
                        2: "error",
                        5: "EOF",
                        14: "COMMENT",
                        15: "CONTENT",
                        18: "END_RAW_BLOCK",
                        19: "OPEN_RAW_BLOCK",
                        23: "CLOSE_RAW_BLOCK",
                        29: "OPEN_BLOCK",
                        33: "CLOSE",
                        34: "OPEN_INVERSE",
                        39: "OPEN_INVERSE_CHAIN",
                        44: "INVERSE",
                        47: "OPEN_ENDBLOCK",
                        48: "OPEN",
                        51: "OPEN_UNESCAPED",
                        54: "CLOSE_UNESCAPED",
                        55: "OPEN_PARTIAL",
                        60: "OPEN_PARTIAL_BLOCK",
                        65: "OPEN_SEXPR",
                        68: "CLOSE_SEXPR",
                        72: "ID",
                        73: "EQUALS",
                        75: "OPEN_BLOCK_PARAMS",
                        77: "CLOSE_BLOCK_PARAMS",
                        80: "STRING",
                        81: "NUMBER",
                        82: "BOOLEAN",
                        83: "UNDEFINED",
                        84: "NULL",
                        85: "DATA",
                        87: "SEP"
                    },
                    productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
                    performAction: function(a, b, c, d, e, f, g) {
                        var h = f.length - 1;
                        switch (e) {
                        case 1:
                            return f[h - 1];
                        case 2:
                            this.$ = d.prepareProgram(f[h]);
                            break;
                        case 3:
                            this.$ = f[h];
                            break;
                        case 4:
                            this.$ = f[h];
                            break;
                        case 5:
                            this.$ = f[h];
                            break;
                        case 6:
                            this.$ = f[h];
                            break;
                        case 7:
                            this.$ = f[h];
                            break;
                        case 8:
                            this.$ = f[h];
                            break;
                        case 9:
                            this.$ = {
                                type: "CommentStatement",
                                value: d.stripComment(f[h]),
                                strip: d.stripFlags(f[h], f[h]),
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 10:
                            this.$ = {
                                type: "ContentStatement",
                                original: f[h],
                                value: f[h],
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 11:
                            this.$ = d.prepareRawBlock(f[h - 2], f[h - 1], f[h], this._$);
                            break;
                        case 12:
                            this.$ = {
                                path: f[h - 3],
                                params: f[h - 2],
                                hash: f[h - 1]
                            };
                            break;
                        case 13:
                            this.$ = d.prepareBlock(f[h - 3], f[h - 2], f[h - 1], f[h], !1, this._$);
                            break;
                        case 14:
                            this.$ = d.prepareBlock(f[h - 3], f[h - 2], f[h - 1], f[h], !0, this._$);
                            break;
                        case 15:
                            this.$ = {
                                open: f[h - 5],
                                path: f[h - 4],
                                params: f[h - 3],
                                hash: f[h - 2],
                                blockParams: f[h - 1],
                                strip: d.stripFlags(f[h - 5], f[h])
                            };
                            break;
                        case 16:
                            this.$ = {
                                path: f[h - 4],
                                params: f[h - 3],
                                hash: f[h - 2],
                                blockParams: f[h - 1],
                                strip: d.stripFlags(f[h - 5], f[h])
                            };
                            break;
                        case 17:
                            this.$ = {
                                path: f[h - 4],
                                params: f[h - 3],
                                hash: f[h - 2],
                                blockParams: f[h - 1],
                                strip: d.stripFlags(f[h - 5], f[h])
                            };
                            break;
                        case 18:
                            this.$ = {
                                strip: d.stripFlags(f[h - 1], f[h - 1]),
                                program: f[h]
                            };
                            break;
                        case 19:
                            var i = d.prepareBlock(f[h - 2], f[h - 1], f[h], f[h], !1, this._$),
                                j = d.prepareProgram([i], f[h - 1].loc);
                            j.chained = !0, this.$ = {
                                strip: f[h - 2].strip,
                                program: j,
                                chain: !0
                            };
                            break;
                        case 20:
                            this.$ = f[h];
                            break;
                        case 21:
                            this.$ = {
                                path: f[h - 1],
                                strip: d.stripFlags(f[h - 2], f[h])
                            };
                            break;
                        case 22:
                            this.$ = d.prepareMustache(f[h - 3], f[h - 2], f[h - 1], f[h - 4], d.stripFlags(f[h - 4], f[h]), this._$);
                            break;
                        case 23:
                            this.$ = d.prepareMustache(f[h - 3], f[h - 2], f[h - 1], f[h - 4], d.stripFlags(f[h - 4], f[h]), this._$);
                            break;
                        case 24:
                            this.$ = {
                                type: "PartialStatement",
                                name: f[h - 3],
                                params: f[h - 2],
                                hash: f[h - 1],
                                indent: "",
                                strip: d.stripFlags(f[h - 4], f[h]),
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 25:
                            this.$ = d.preparePartialBlock(f[h - 2], f[h - 1], f[h], this._$);
                            break;
                        case 26:
                            this.$ = {
                                path: f[h - 3],
                                params: f[h - 2],
                                hash: f[h - 1],
                                strip: d.stripFlags(f[h - 4], f[h])
                            };
                            break;
                        case 27:
                            this.$ = f[h];
                            break;
                        case 28:
                            this.$ = f[h];
                            break;
                        case 29:
                            this.$ = {
                                type: "SubExpression",
                                path: f[h - 3],
                                params: f[h - 2],
                                hash: f[h - 1],
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 30:
                            this.$ = {
                                type: "Hash",
                                pairs: f[h],
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 31:
                            this.$ = {
                                type: "HashPair",
                                key: d.id(f[h - 2]),
                                value: f[h],
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 32:
                            this.$ = d.id(f[h - 1]);
                            break;
                        case 33:
                            this.$ = f[h];
                            break;
                        case 34:
                            this.$ = f[h];
                            break;
                        case 35:
                            this.$ = {
                                type: "StringLiteral",
                                value: f[h],
                                original: f[h],
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 36:
                            this.$ = {
                                type: "NumberLiteral",
                                value: Number(f[h]),
                                original: Number(f[h]),
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 37:
                            this.$ = {
                                type: "BooleanLiteral",
                                value: "true" === f[h],
                                original: "true" === f[h],
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 38:
                            this.$ = {
                                type: "UndefinedLiteral",
                                original: void 0,
                                value: void 0,
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 39:
                            this.$ = {
                                type: "NullLiteral",
                                original: null,
                                value: null,
                                loc: d.locInfo(this._$)
                            };
                            break;
                        case 40:
                            this.$ = f[h];
                            break;
                        case 41:
                            this.$ = f[h];
                            break;
                        case 42:
                            this.$ = d.preparePath(!0, f[h], this._$);
                            break;
                        case 43:
                            this.$ = d.preparePath(!1, f[h], this._$);
                            break;
                        case 44:
                            f[h - 2].push({
                                part: d.id(f[h]),
                                original: f[h],
                                separator: f[h - 1]
                            }), this.$ = f[h - 2];
                            break;
                        case 45:
                            this.$ = [{
                                part: d.id(f[h]),
                                original: f[h]
                            }];
                            break;
                        case 46:
                            this.$ = [];
                            break;
                        case 47:
                            f[h - 1].push(f[h]);
                            break;
                        case 48:
                            this.$ = [f[h]];
                            break;
                        case 49:
                            f[h - 1].push(f[h]);
                            break;
                        case 50:
                            this.$ = [];
                            break;
                        case 51:
                            f[h - 1].push(f[h]);
                            break;
                        case 58:
                            this.$ = [];
                            break;
                        case 59:
                            f[h - 1].push(f[h]);
                            break;
                        case 64:
                            this.$ = [];
                            break;
                        case 65:
                            f[h - 1].push(f[h]);
                            break;
                        case 70:
                            this.$ = [];
                            break;
                        case 71:
                            f[h - 1].push(f[h]);
                            break;
                        case 78:
                            this.$ = [];
                            break;
                        case 79:
                            f[h - 1].push(f[h]);
                            break;
                        case 82:
                            this.$ = [];
                            break;
                        case 83:
                            f[h - 1].push(f[h]);
                            break;
                        case 86:
                            this.$ = [];
                            break;
                        case 87:
                            f[h - 1].push(f[h]);
                            break;
                        case 90:
                            this.$ = [];
                            break;
                        case 91:
                            f[h - 1].push(f[h]);
                            break;
                        case 94:
                            this.$ = [];
                            break;
                        case 95:
                            f[h - 1].push(f[h]);
                            break;
                        case 98:
                            this.$ = [f[h]];
                            break;
                        case 99:
                            f[h - 1].push(f[h]);
                            break;
                        case 100:
                            this.$ = [f[h]];
                            break;
                        case 101:
                            f[h - 1].push(f[h])
                        }
                    },
                    table: [{
                        3: 1,
                        4: 2,
                        5: [2, 46],
                        6: 3,
                        14: [2, 46],
                        15: [2, 46],
                        19: [2, 46],
                        29: [2, 46],
                        34: [2, 46],
                        48: [2, 46],
                        51: [2, 46],
                        55: [2, 46],
                        60: [2, 46]
                    }, {
                        1: [3]
                    }, {
                        5: [1, 4]
                    }, {
                        5: [2, 2],
                        7: 5,
                        8: 6,
                        9: 7,
                        10: 8,
                        11: 9,
                        12: 10,
                        13: 11,
                        14: [1, 12],
                        15: [1, 20],
                        16: 17,
                        19: [1, 23],
                        24: 15,
                        27: 16,
                        29: [1, 21],
                        34: [1, 22],
                        39: [2, 2],
                        44: [2, 2],
                        47: [2, 2],
                        48: [1, 13],
                        51: [1, 14],
                        55: [1, 18],
                        59: 19,
                        60: [1, 24]
                    }, {
                        1: [2, 1]
                    }, {
                        5: [2, 47],
                        14: [2, 47],
                        15: [2, 47],
                        19: [2, 47],
                        29: [2, 47],
                        34: [2, 47],
                        39: [2, 47],
                        44: [2, 47],
                        47: [2, 47],
                        48: [2, 47],
                        51: [2, 47],
                        55: [2, 47],
                        60: [2, 47]
                    }, {
                        5: [2, 3],
                        14: [2, 3],
                        15: [2, 3],
                        19: [2, 3],
                        29: [2, 3],
                        34: [2, 3],
                        39: [2, 3],
                        44: [2, 3],
                        47: [2, 3],
                        48: [2, 3],
                        51: [2, 3],
                        55: [2, 3],
                        60: [2, 3]
                    }, {
                        5: [2, 4],
                        14: [2, 4],
                        15: [2, 4],
                        19: [2, 4],
                        29: [2, 4],
                        34: [2, 4],
                        39: [2, 4],
                        44: [2, 4],
                        47: [2, 4],
                        48: [2, 4],
                        51: [2, 4],
                        55: [2, 4],
                        60: [2, 4]
                    }, {
                        5: [2, 5],
                        14: [2, 5],
                        15: [2, 5],
                        19: [2, 5],
                        29: [2, 5],
                        34: [2, 5],
                        39: [2, 5],
                        44: [2, 5],
                        47: [2, 5],
                        48: [2, 5],
                        51: [2, 5],
                        55: [2, 5],
                        60: [2, 5]
                    }, {
                        5: [2, 6],
                        14: [2, 6],
                        15: [2, 6],
                        19: [2, 6],
                        29: [2, 6],
                        34: [2, 6],
                        39: [2, 6],
                        44: [2, 6],
                        47: [2, 6],
                        48: [2, 6],
                        51: [2, 6],
                        55: [2, 6],
                        60: [2, 6]
                    }, {
                        5: [2, 7],
                        14: [2, 7],
                        15: [2, 7],
                        19: [2, 7],
                        29: [2, 7],
                        34: [2, 7],
                        39: [2, 7],
                        44: [2, 7],
                        47: [2, 7],
                        48: [2, 7],
                        51: [2, 7],
                        55: [2, 7],
                        60: [2, 7]
                    }, {
                        5: [2, 8],
                        14: [2, 8],
                        15: [2, 8],
                        19: [2, 8],
                        29: [2, 8],
                        34: [2, 8],
                        39: [2, 8],
                        44: [2, 8],
                        47: [2, 8],
                        48: [2, 8],
                        51: [2, 8],
                        55: [2, 8],
                        60: [2, 8]
                    }, {
                        5: [2, 9],
                        14: [2, 9],
                        15: [2, 9],
                        19: [2, 9],
                        29: [2, 9],
                        34: [2, 9],
                        39: [2, 9],
                        44: [2, 9],
                        47: [2, 9],
                        48: [2, 9],
                        51: [2, 9],
                        55: [2, 9],
                        60: [2, 9]
                    }, {
                        20: 25,
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        20: 36,
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        4: 37,
                        6: 3,
                        14: [2, 46],
                        15: [2, 46],
                        19: [2, 46],
                        29: [2, 46],
                        34: [2, 46],
                        39: [2, 46],
                        44: [2, 46],
                        47: [2, 46],
                        48: [2, 46],
                        51: [2, 46],
                        55: [2, 46],
                        60: [2, 46]
                    }, {
                        4: 38,
                        6: 3,
                        14: [2, 46],
                        15: [2, 46],
                        19: [2, 46],
                        29: [2, 46],
                        34: [2, 46],
                        44: [2, 46],
                        47: [2, 46],
                        48: [2, 46],
                        51: [2, 46],
                        55: [2, 46],
                        60: [2, 46]
                    }, {
                        13: 40,
                        15: [1, 20],
                        17: 39
                    }, {
                        20: 42,
                        56: 41,
                        64: 43,
                        65: [1, 44],
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        4: 45,
                        6: 3,
                        14: [2, 46],
                        15: [2, 46],
                        19: [2, 46],
                        29: [2, 46],
                        34: [2, 46],
                        47: [2, 46],
                        48: [2, 46],
                        51: [2, 46],
                        55: [2, 46],
                        60: [2, 46]
                    }, {
                        5: [2, 10],
                        14: [2, 10],
                        15: [2, 10],
                        18: [2, 10],
                        19: [2, 10],
                        29: [2, 10],
                        34: [2, 10],
                        39: [2, 10],
                        44: [2, 10],
                        47: [2, 10],
                        48: [2, 10],
                        51: [2, 10],
                        55: [2, 10],
                        60: [2, 10]
                    }, {
                        20: 46,
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        20: 47,
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        20: 48,
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        20: 42,
                        56: 49,
                        64: 43,
                        65: [1, 44],
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        33: [2, 78],
                        49: 50,
                        65: [2, 78],
                        72: [2, 78],
                        80: [2, 78],
                        81: [2, 78],
                        82: [2, 78],
                        83: [2, 78],
                        84: [2, 78],
                        85: [2, 78]
                    }, {
                        23: [2, 33],
                        33: [2, 33],
                        54: [2, 33],
                        65: [2, 33],
                        68: [2, 33],
                        72: [2, 33],
                        75: [2, 33],
                        80: [2, 33],
                        81: [2, 33],
                        82: [2, 33],
                        83: [2, 33],
                        84: [2, 33],
                        85: [2, 33]
                    }, {
                        23: [2, 34],
                        33: [2, 34],
                        54: [2, 34],
                        65: [2, 34],
                        68: [2, 34],
                        72: [2, 34],
                        75: [2, 34],
                        80: [2, 34],
                        81: [2, 34],
                        82: [2, 34],
                        83: [2, 34],
                        84: [2, 34],
                        85: [2, 34]
                    }, {
                        23: [2, 35],
                        33: [2, 35],
                        54: [2, 35],
                        65: [2, 35],
                        68: [2, 35],
                        72: [2, 35],
                        75: [2, 35],
                        80: [2, 35],
                        81: [2, 35],
                        82: [2, 35],
                        83: [2, 35],
                        84: [2, 35],
                        85: [2, 35]
                    }, {
                        23: [2, 36],
                        33: [2, 36],
                        54: [2, 36],
                        65: [2, 36],
                        68: [2, 36],
                        72: [2, 36],
                        75: [2, 36],
                        80: [2, 36],
                        81: [2, 36],
                        82: [2, 36],
                        83: [2, 36],
                        84: [2, 36],
                        85: [2, 36]
                    }, {
                        23: [2, 37],
                        33: [2, 37],
                        54: [2, 37],
                        65: [2, 37],
                        68: [2, 37],
                        72: [2, 37],
                        75: [2, 37],
                        80: [2, 37],
                        81: [2, 37],
                        82: [2, 37],
                        83: [2, 37],
                        84: [2, 37],
                        85: [2, 37]
                    }, {
                        23: [2, 38],
                        33: [2, 38],
                        54: [2, 38],
                        65: [2, 38],
                        68: [2, 38],
                        72: [2, 38],
                        75: [2, 38],
                        80: [2, 38],
                        81: [2, 38],
                        82: [2, 38],
                        83: [2, 38],
                        84: [2, 38],
                        85: [2, 38]
                    }, {
                        23: [2, 39],
                        33: [2, 39],
                        54: [2, 39],
                        65: [2, 39],
                        68: [2, 39],
                        72: [2, 39],
                        75: [2, 39],
                        80: [2, 39],
                        81: [2, 39],
                        82: [2, 39],
                        83: [2, 39],
                        84: [2, 39],
                        85: [2, 39]
                    }, {
                        23: [2, 43],
                        33: [2, 43],
                        54: [2, 43],
                        65: [2, 43],
                        68: [2, 43],
                        72: [2, 43],
                        75: [2, 43],
                        80: [2, 43],
                        81: [2, 43],
                        82: [2, 43],
                        83: [2, 43],
                        84: [2, 43],
                        85: [2, 43],
                        87: [1, 51]
                    }, {
                        72: [1, 35],
                        86: 52
                    }, {
                        23: [2, 45],
                        33: [2, 45],
                        54: [2, 45],
                        65: [2, 45],
                        68: [2, 45],
                        72: [2, 45],
                        75: [2, 45],
                        80: [2, 45],
                        81: [2, 45],
                        82: [2, 45],
                        83: [2, 45],
                        84: [2, 45],
                        85: [2, 45],
                        87: [2, 45]
                    }, {
                        52: 53,
                        54: [2, 82],
                        65: [2, 82],
                        72: [2, 82],
                        80: [2, 82],
                        81: [2, 82],
                        82: [2, 82],
                        83: [2, 82],
                        84: [2, 82],
                        85: [2, 82]
                    }, {
                        25: 54,
                        38: 56,
                        39: [1, 58],
                        43: 57,
                        44: [1, 59],
                        45: 55,
                        47: [2, 54]
                    }, {
                        28: 60,
                        43: 61,
                        44: [1, 59],
                        47: [2, 56]
                    }, {
                        13: 63,
                        15: [1, 20],
                        18: [1, 62]
                    }, {
                        15: [2, 48],
                        18: [2, 48]
                    }, {
                        33: [2, 86],
                        57: 64,
                        65: [2, 86],
                        72: [2, 86],
                        80: [2, 86],
                        81: [2, 86],
                        82: [2, 86],
                        83: [2, 86],
                        84: [2, 86],
                        85: [2, 86]
                    }, {
                        33: [2, 40],
                        65: [2, 40],
                        72: [2, 40],
                        80: [2, 40],
                        81: [2, 40],
                        82: [2, 40],
                        83: [2, 40],
                        84: [2, 40],
                        85: [2, 40]
                    }, {
                        33: [2, 41],
                        65: [2, 41],
                        72: [2, 41],
                        80: [2, 41],
                        81: [2, 41],
                        82: [2, 41],
                        83: [2, 41],
                        84: [2, 41],
                        85: [2, 41]
                    }, {
                        20: 65,
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        26: 66,
                        47: [1, 67]
                    }, {
                        30: 68,
                        33: [2, 58],
                        65: [2, 58],
                        72: [2, 58],
                        75: [2, 58],
                        80: [2, 58],
                        81: [2, 58],
                        82: [2, 58],
                        83: [2, 58],
                        84: [2, 58],
                        85: [2, 58]
                    }, {
                        33: [2, 64],
                        35: 69,
                        65: [2, 64],
                        72: [2, 64],
                        75: [2, 64],
                        80: [2, 64],
                        81: [2, 64],
                        82: [2, 64],
                        83: [2, 64],
                        84: [2, 64],
                        85: [2, 64]
                    }, {
                        21: 70,
                        23: [2, 50],
                        65: [2, 50],
                        72: [2, 50],
                        80: [2, 50],
                        81: [2, 50],
                        82: [2, 50],
                        83: [2, 50],
                        84: [2, 50],
                        85: [2, 50]
                    }, {
                        33: [2, 90],
                        61: 71,
                        65: [2, 90],
                        72: [2, 90],
                        80: [2, 90],
                        81: [2, 90],
                        82: [2, 90],
                        83: [2, 90],
                        84: [2, 90],
                        85: [2, 90]
                    }, {
                        20: 75,
                        33: [2, 80],
                        50: 72,
                        63: 73,
                        64: 76,
                        65: [1, 44],
                        69: 74,
                        70: 77,
                        71: 78,
                        72: [1, 79],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        72: [1, 80]
                    }, {
                        23: [2, 42],
                        33: [2, 42],
                        54: [2, 42],
                        65: [2, 42],
                        68: [2, 42],
                        72: [2, 42],
                        75: [2, 42],
                        80: [2, 42],
                        81: [2, 42],
                        82: [2, 42],
                        83: [2, 42],
                        84: [2, 42],
                        85: [2, 42],
                        87: [1, 51]
                    }, {
                        20: 75,
                        53: 81,
                        54: [2, 84],
                        63: 82,
                        64: 76,
                        65: [1, 44],
                        69: 83,
                        70: 77,
                        71: 78,
                        72: [1, 79],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        26: 84,
                        47: [1, 67]
                    }, {
                        47: [2, 55]
                    }, {
                        4: 85,
                        6: 3,
                        14: [2, 46],
                        15: [2, 46],
                        19: [2, 46],
                        29: [2, 46],
                        34: [2, 46],
                        39: [2, 46],
                        44: [2, 46],
                        47: [2, 46],
                        48: [2, 46],
                        51: [2, 46],
                        55: [2, 46],
                        60: [2, 46]
                    }, {
                        47: [2, 20]
                    }, {
                        20: 86,
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        4: 87,
                        6: 3,
                        14: [2, 46],
                        15: [2, 46],
                        19: [2, 46],
                        29: [2, 46],
                        34: [2, 46],
                        47: [2, 46],
                        48: [2, 46],
                        51: [2, 46],
                        55: [2, 46],
                        60: [2, 46]
                    }, {
                        26: 88,
                        47: [1, 67]
                    }, {
                        47: [2, 57]
                    }, {
                        5: [2, 11],
                        14: [2, 11],
                        15: [2, 11],
                        19: [2, 11],
                        29: [2, 11],
                        34: [2, 11],
                        39: [2, 11],
                        44: [2, 11],
                        47: [2, 11],
                        48: [2, 11],
                        51: [2, 11],
                        55: [2, 11],
                        60: [2, 11]
                    }, {
                        15: [2, 49],
                        18: [2, 49]
                    }, {
                        20: 75,
                        33: [2, 88],
                        58: 89,
                        63: 90,
                        64: 76,
                        65: [1, 44],
                        69: 91,
                        70: 77,
                        71: 78,
                        72: [1, 79],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        65: [2, 94],
                        66: 92,
                        68: [2, 94],
                        72: [2, 94],
                        80: [2, 94],
                        81: [2, 94],
                        82: [2, 94],
                        83: [2, 94],
                        84: [2, 94],
                        85: [2, 94]
                    }, {
                        5: [2, 25],
                        14: [2, 25],
                        15: [2, 25],
                        19: [2, 25],
                        29: [2, 25],
                        34: [2, 25],
                        39: [2, 25],
                        44: [2, 25],
                        47: [2, 25],
                        48: [2, 25],
                        51: [2, 25],
                        55: [2, 25],
                        60: [2, 25]
                    }, {
                        20: 93,
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        20: 75,
                        31: 94,
                        33: [2, 60],
                        63: 95,
                        64: 76,
                        65: [1, 44],
                        69: 96,
                        70: 77,
                        71: 78,
                        72: [1, 79],
                        75: [2, 60],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        20: 75,
                        33: [2, 66],
                        36: 97,
                        63: 98,
                        64: 76,
                        65: [1, 44],
                        69: 99,
                        70: 77,
                        71: 78,
                        72: [1, 79],
                        75: [2, 66],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        20: 75,
                        22: 100,
                        23: [2, 52],
                        63: 101,
                        64: 76,
                        65: [1, 44],
                        69: 102,
                        70: 77,
                        71: 78,
                        72: [1, 79],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        20: 75,
                        33: [2, 92],
                        62: 103,
                        63: 104,
                        64: 76,
                        65: [1, 44],
                        69: 105,
                        70: 77,
                        71: 78,
                        72: [1, 79],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        33: [1, 106]
                    }, {
                        33: [2, 79],
                        65: [2, 79],
                        72: [2, 79],
                        80: [2, 79],
                        81: [2, 79],
                        82: [2, 79],
                        83: [2, 79],
                        84: [2, 79],
                        85: [2, 79]
                    }, {
                        33: [2, 81]
                    }, {
                        23: [2, 27],
                        33: [2, 27],
                        54: [2, 27],
                        65: [2, 27],
                        68: [2, 27],
                        72: [2, 27],
                        75: [2, 27],
                        80: [2, 27],
                        81: [2, 27],
                        82: [2, 27],
                        83: [2, 27],
                        84: [2, 27],
                        85: [2, 27]
                    }, {
                        23: [2, 28],
                        33: [2, 28],
                        54: [2, 28],
                        65: [2, 28],
                        68: [2, 28],
                        72: [2, 28],
                        75: [2, 28],
                        80: [2, 28],
                        81: [2, 28],
                        82: [2, 28],
                        83: [2, 28],
                        84: [2, 28],
                        85: [2, 28]
                    }, {
                        23: [2, 30],
                        33: [2, 30],
                        54: [2, 30],
                        68: [2, 30],
                        71: 107,
                        72: [1, 108],
                        75: [2, 30]
                    }, {
                        23: [2, 98],
                        33: [2, 98],
                        54: [2, 98],
                        68: [2, 98],
                        72: [2, 98],
                        75: [2, 98]
                    }, {
                        23: [2, 45],
                        33: [2, 45],
                        54: [2, 45],
                        65: [2, 45],
                        68: [2, 45],
                        72: [2, 45],
                        73: [1, 109],
                        75: [2, 45],
                        80: [2, 45],
                        81: [2, 45],
                        82: [2, 45],
                        83: [2, 45],
                        84: [2, 45],
                        85: [2, 45],
                        87: [2, 45]
                    }, {
                        23: [2, 44],
                        33: [2, 44],
                        54: [2, 44],
                        65: [2, 44],
                        68: [2, 44],
                        72: [2, 44],
                        75: [2, 44],
                        80: [2, 44],
                        81: [2, 44],
                        82: [2, 44],
                        83: [2, 44],
                        84: [2, 44],
                        85: [2, 44],
                        87: [2, 44]
                    }, {
                        54: [1, 110]
                    }, {
                        54: [2, 83],
                        65: [2, 83],
                        72: [2, 83],
                        80: [2, 83],
                        81: [2, 83],
                        82: [2, 83],
                        83: [2, 83],
                        84: [2, 83],
                        85: [2, 83]
                    }, {
                        54: [2, 85]
                    }, {
                        5: [2, 13],
                        14: [2, 13],
                        15: [2, 13],
                        19: [2, 13],
                        29: [2, 13],
                        34: [2, 13],
                        39: [2, 13],
                        44: [2, 13],
                        47: [2, 13],
                        48: [2, 13],
                        51: [2, 13],
                        55: [2, 13],
                        60: [2, 13]
                    }, {
                        38: 56,
                        39: [1, 58],
                        43: 57,
                        44: [1, 59],
                        45: 112,
                        46: 111,
                        47: [2, 76]
                    }, {
                        33: [2, 70],
                        40: 113,
                        65: [2, 70],
                        72: [2, 70],
                        75: [2, 70],
                        80: [2, 70],
                        81: [2, 70],
                        82: [2, 70],
                        83: [2, 70],
                        84: [2, 70],
                        85: [2, 70]
                    }, {
                        47: [2, 18]
                    }, {
                        5: [2, 14],
                        14: [2, 14],
                        15: [2, 14],
                        19: [2, 14],
                        29: [2, 14],
                        34: [2, 14],
                        39: [2, 14],
                        44: [2, 14],
                        47: [2, 14],
                        48: [2, 14],
                        51: [2, 14],
                        55: [2, 14],
                        60: [2, 14]
                    }, {
                        33: [1, 114]
                    }, {
                        33: [2, 87],
                        65: [2, 87],
                        72: [2, 87],
                        80: [2, 87],
                        81: [2, 87],
                        82: [2, 87],
                        83: [2, 87],
                        84: [2, 87],
                        85: [2, 87]
                    }, {
                        33: [2, 89]
                    }, {
                        20: 75,
                        63: 116,
                        64: 76,
                        65: [1, 44],
                        67: 115,
                        68: [2, 96],
                        69: 117,
                        70: 77,
                        71: 78,
                        72: [1, 79],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        33: [1, 118]
                    }, {
                        32: 119,
                        33: [2, 62],
                        74: 120,
                        75: [1, 121]
                    }, {
                        33: [2, 59],
                        65: [2, 59],
                        72: [2, 59],
                        75: [2, 59],
                        80: [2, 59],
                        81: [2, 59],
                        82: [2, 59],
                        83: [2, 59],
                        84: [2, 59],
                        85: [2, 59]
                    }, {
                        33: [2, 61],
                        75: [2, 61]
                    }, {
                        33: [2, 68],
                        37: 122,
                        74: 123,
                        75: [1, 121]
                    }, {
                        33: [2, 65],
                        65: [2, 65],
                        72: [2, 65],
                        75: [2, 65],
                        80: [2, 65],
                        81: [2, 65],
                        82: [2, 65],
                        83: [2, 65],
                        84: [2, 65],
                        85: [2, 65]
                    }, {
                        33: [2, 67],
                        75: [2, 67]
                    }, {
                        23: [1, 124]
                    }, {
                        23: [2, 51],
                        65: [2, 51],
                        72: [2, 51],
                        80: [2, 51],
                        81: [2, 51],
                        82: [2, 51],
                        83: [2, 51],
                        84: [2, 51],
                        85: [2, 51]
                    }, {
                        23: [2, 53]
                    }, {
                        33: [1, 125]
                    }, {
                        33: [2, 91],
                        65: [2, 91],
                        72: [2, 91],
                        80: [2, 91],
                        81: [2, 91],
                        82: [2, 91],
                        83: [2, 91],
                        84: [2, 91],
                        85: [2, 91]
                    }, {
                        33: [2, 93]
                    }, {
                        5: [2, 22],
                        14: [2, 22],
                        15: [2, 22],
                        19: [2, 22],
                        29: [2, 22],
                        34: [2, 22],
                        39: [2, 22],
                        44: [2, 22],
                        47: [2, 22],
                        48: [2, 22],
                        51: [2, 22],
                        55: [2, 22],
                        60: [2, 22]
                    }, {
                        23: [2, 99],
                        33: [2, 99],
                        54: [2, 99],
                        68: [2, 99],
                        72: [2, 99],
                        75: [2, 99]
                    }, {
                        73: [1, 109]
                    }, {
                        20: 75,
                        63: 126,
                        64: 76,
                        65: [1, 44],
                        72: [1, 35],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        5: [2, 23],
                        14: [2, 23],
                        15: [2, 23],
                        19: [2, 23],
                        29: [2, 23],
                        34: [2, 23],
                        39: [2, 23],
                        44: [2, 23],
                        47: [2, 23],
                        48: [2, 23],
                        51: [2, 23],
                        55: [2, 23],
                        60: [2, 23]
                    }, {
                        47: [2, 19]
                    }, {
                        47: [2, 77]
                    }, {
                        20: 75,
                        33: [2, 72],
                        41: 127,
                        63: 128,
                        64: 76,
                        65: [1, 44],
                        69: 129,
                        70: 77,
                        71: 78,
                        72: [1, 79],
                        75: [2, 72],
                        78: 26,
                        79: 27,
                        80: [1, 28],
                        81: [1, 29],
                        82: [1, 30],
                        83: [1, 31],
                        84: [1, 32],
                        85: [1, 34],
                        86: 33
                    }, {
                        5: [2, 24],
                        14: [2, 24],
                        15: [2, 24],
                        19: [2, 24],
                        29: [2, 24],
                        34: [2, 24],
                        39: [2, 24],
                        44: [2, 24],
                        47: [2, 24],
                        48: [2, 24],
                        51: [2, 24],
                        55: [2, 24],
                        60: [2, 24]
                    }, {
                        68: [1, 130]
                    }, {
                        65: [2, 95],
                        68: [2, 95],
                        72: [2, 95],
                        80: [2, 95],
                        81: [2, 95],
                        82: [2, 95],
                        83: [2, 95],
                        84: [2, 95],
                        85: [2, 95]
                    }, {
                        68: [2, 97]
                    }, {
                        5: [2, 21],
                        14: [2, 21],
                        15: [2, 21],
                        19: [2, 21],
                        29: [2, 21],
                        34: [2, 21],
                        39: [2, 21],
                        44: [2, 21],
                        47: [2, 21],
                        48: [2, 21],
                        51: [2, 21],
                        55: [2, 21],
                        60: [2, 21]
                    }, {
                        33: [1, 131]
                    }, {
                        33: [2, 63]
                    }, {
                        72: [1, 133],
                        76: 132
                    }, {
                        33: [1, 134]
                    }, {
                        33: [2, 69]
                    }, {
                        15: [2, 12]
                    }, {
                        14: [2, 26],
                        15: [2, 26],
                        19: [2, 26],
                        29: [2, 26],
                        34: [2, 26],
                        47: [2, 26],
                        48: [2, 26],
                        51: [2, 26],
                        55: [2, 26],
                        60: [2, 26]
                    }, {
                        23: [2, 31],
                        33: [2, 31],
                        54: [2, 31],
                        68: [2, 31],
                        72: [2, 31],
                        75: [2, 31]
                    }, {
                        33: [2, 74],
                        42: 135,
                        74: 136,
                        75: [1, 121]
                    }, {
                        33: [2, 71],
                        65: [2, 71],
                        72: [2, 71],
                        75: [2, 71],
                        80: [2, 71],
                        81: [2, 71],
                        82: [2, 71],
                        83: [2, 71],
                        84: [2, 71],
                        85: [2, 71]
                    }, {
                        33: [2, 73],
                        75: [2, 73]
                    }, {
                        23: [2, 29],
                        33: [2, 29],
                        54: [2, 29],
                        65: [2, 29],
                        68: [2, 29],
                        72: [2, 29],
                        75: [2, 29],
                        80: [2, 29],
                        81: [2, 29],
                        82: [2, 29],
                        83: [2, 29],
                        84: [2, 29],
                        85: [2, 29]
                    }, {
                        14: [2, 15],
                        15: [2, 15],
                        19: [2, 15],
                        29: [2, 15],
                        34: [2, 15],
                        39: [2, 15],
                        44: [2, 15],
                        47: [2, 15],
                        48: [2, 15],
                        51: [2, 15],
                        55: [2, 15],
                        60: [2, 15]
                    }, {
                        72: [1, 138],
                        77: [1, 137]
                    }, {
                        72: [2, 100],
                        77: [2, 100]
                    }, {
                        14: [2, 16],
                        15: [2, 16],
                        19: [2, 16],
                        29: [2, 16],
                        34: [2, 16],
                        44: [2, 16],
                        47: [2, 16],
                        48: [2, 16],
                        51: [2, 16],
                        55: [2, 16],
                        60: [2, 16]
                    }, {
                        33: [1, 139]
                    }, {
                        33: [2, 75]
                    }, {
                        33: [2, 32]
                    }, {
                        72: [2, 101],
                        77: [2, 101]
                    }, {
                        14: [2, 17],
                        15: [2, 17],
                        19: [2, 17],
                        29: [2, 17],
                        34: [2, 17],
                        39: [2, 17],
                        44: [2, 17],
                        47: [2, 17],
                        48: [2, 17],
                        51: [2, 17],
                        55: [2, 17],
                        60: [2, 17]
                    }],
                    defaultActions: {
                        4: [2, 1],
                        55: [2, 55],
                        57: [2, 20],
                        61: [2, 57],
                        74: [2, 81],
                        83: [2, 85],
                        87: [2, 18],
                        91: [2, 89],
                        102: [2, 53],
                        105: [2, 93],
                        111: [2, 19],
                        112: [2, 77],
                        117: [2, 97],
                        120: [2, 63],
                        123: [2, 69],
                        124: [2, 12],
                        136: [2, 75],
                        137: [2, 32]
                    },
                    parseError: function(a, b) {
                        throw new Error(a)
                    },
                    parse: function(a) {
                        function b() {
                            var a;
                            return a = c.lexer.lex() || 1, "number" != typeof a && (a = c.symbols_[a] || a), a
                        }
                        var c = this,
                            d = [0],
                            e = [null],
                            f = [],
                            g = this.table,
                            h = "",
                            i = 0,
                            j = 0,
                            k = 0;
                        this.lexer.setInput(a), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                        var l = this.lexer.yylloc;
                        f.push(l);
                        var m = this.lexer.options && this.lexer.options.ranges;
                        "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                        for (var n, o, p, q, r, s, t, u, v, w = {};;) {
                            if (p = d[d.length - 1], this.defaultActions[p] ? q = this.defaultActions[p] : ((null === n || "undefined" == typeof n) && (n = b()), q = g[p] && g[p][n]), "undefined" == typeof q || !q.length || !q[0]) {
                                var x = "";
                                if (!k) {
                                    v = [];
                                    for (s in g[p])
                                        this.terminals_[s] && s > 2 && v.push("'" + this.terminals_[s] + "'");
                                    x = this.lexer.showPosition ? "Parse error on line " + (i + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + v.join(", ") + ", got '" + (this.terminals_[n] || n) + "'" : "Parse error on line " + (i + 1) + ": Unexpected " + (1 == n ? "end of input" : "'" + (this.terminals_[n] || n) + "'"), this.parseError(x, {
                                        text: this.lexer.match,
                                        token: this.terminals_[n] || n,
                                        line: this.lexer.yylineno,
                                        loc: l,
                                        expected: v
                                    })
                                }
                            }
                            if (q[0] instanceof Array && q.length > 1)
                                throw new Error("Parse Error: multiple actions possible at state: " + p + ", token: " + n);
                            switch (q[0]) {
                            case 1:
                                d.push(n), e.push(this.lexer.yytext), f.push(this.lexer.yylloc), d.push(q[1]), n = null, o ? (n = o, o = null) : (j = this.lexer.yyleng, h = this.lexer.yytext, i = this.lexer.yylineno, l = this.lexer.yylloc, k > 0 && k--);
                                break;
                            case 2:
                                if (t = this.productions_[q[1]][1], w.$ = e[e.length - t], w._$ = {
                                    first_line: f[f.length - (t || 1)].first_line,
                                    last_line: f[f.length - 1].last_line,
                                    first_column: f[f.length - (t || 1)].first_column,
                                    last_column: f[f.length - 1].last_column
                                }, m && (w._$.range = [f[f.length - (t || 1)].range[0], f[f.length - 1].range[1]]), r = this.performAction.call(w, h, j, i, this.yy, q[1], e, f), "undefined" != typeof r)
                                    return r;
                                t && (d = d.slice(0, -1 * t * 2), e = e.slice(0, -1 * t), f = f.slice(0, -1 * t)), d.push(this.productions_[q[1]][0]), e.push(w.$), f.push(w._$), u = g[d[d.length - 2]][d[d.length - 1]], d.push(u);
                                break;
                            case 3:
                                return !0
                            }
                        }
                        return !0
                    }
                },
                c = function() {
                    var a = {
                        EOF: 1,
                        parseError: function(a, b) {
                            if (!this.yy.parser)
                                throw new Error(a);
                            this.yy.parser.parseError(a, b)
                        },
                        setInput: function(a) {
                            return this._input = a, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                                first_line: 1,
                                first_column: 0,
                                last_line: 1,
                                last_column: 0
                            }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                        },
                        input: function() {
                            var a = this._input[0];
                            this.yytext += a, this.yyleng++, this.offset++, this.match += a, this.matched += a;
                            var b = a.match(/(?:\r\n?|\n).*/g);
                            return b ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), a
                        },
                        unput: function(a) {
                            var b = a.length,
                                c = a.split(/(?:\r\n?|\n)/g);
                            this._input = a + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - b - 1), this.offset -= b;
                            var d = this.match.split(/(?:\r\n?|\n)/g);
                            this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), c.length - 1 && (this.yylineno -= c.length - 1);
                            var e = this.yylloc.range;
                            return this.yylloc = {
                                first_line: this.yylloc.first_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.first_column,
                                last_column: c ? (c.length === d.length ? this.yylloc.first_column : 0) + d[d.length - c.length].length - c[0].length : this.yylloc.first_column - b
                            }, this.options.ranges && (this.yylloc.range = [e[0], e[0] + this.yyleng - b]), this
                        },
                        more: function() {
                            return this._more = !0, this
                        },
                        less: function(a) {
                            this.unput(this.match.slice(a))
                        },
                        pastInput: function() {
                            var a = this.matched.substr(0, this.matched.length - this.match.length);
                            return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "")
                        },
                        upcomingInput: function() {
                            var a = this.match;
                            return a.length < 20 && (a += this._input.substr(0, 20 - a.length)), (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "")
                        },
                        showPosition: function() {
                            var a = this.pastInput(),
                                b = new Array(a.length + 1).join("-");
                            return a + this.upcomingInput() + "\n" + b + "^"
                        },
                        next: function() {
                            if (this.done)
                                return this.EOF;
                            this._input || (this.done = !0);
                            var a,
                                b,
                                c,
                                d,
                                e;
                            this._more || (this.yytext = "", this.match = "");
                            for (var f = this._currentRules(), g = 0; g < f.length && (c = this._input.match(this.rules[f[g]]), !c || b && !(c[0].length > b[0].length) || (b = c, d = g, this.options.flex)); g++)
                                ;
                            return b ? (e = b[0].match(/(?:\r\n?|\n).*/g), e && (this.yylineno += e.length), this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: e ? e[e.length - 1].length - e[e.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + b[0].length
                            }, this.yytext += b[0], this.match += b[0], this.matches = b, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(b[0].length), this.matched += b[0], a = this.performAction.call(this, this.yy, this, f[d], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), a ? a : void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                text: "",
                                token: null,
                                line: this.yylineno
                            })
                        },
                        lex: function() {
                            var a = this.next();
                            return "undefined" != typeof a ? a : this.lex()
                        },
                        begin: function(a) {
                            this.conditionStack.push(a)
                        },
                        popState: function() {
                            return this.conditionStack.pop()
                        },
                        _currentRules: function() {
                            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                        },
                        topState: function() {
                            return this.conditionStack[this.conditionStack.length - 2]
                        },
                        pushState: function(a) {
                            this.begin(a)
                        }
                    };
                    return a.options = {}, a.performAction = function(a, b, c, d) {
                        function e(a, c) {
                            return b.yytext = b.yytext.substr(a, b.yyleng - c)
                        }
                        switch (c) {
                        case 0:
                            if ("\\\\" === b.yytext.slice(-2) ? (e(0, 1), this.begin("mu")) : "\\" === b.yytext.slice(-1) ? (e(0, 1), this.begin("emu")) : this.begin("mu"), b.yytext)
                                return 15;
                            break;
                        case 1:
                            return 15;
                        case 2:
                            return this.popState(), 15;
                        case 3:
                            return this.begin("raw"), 15;
                        case 4:
                            return this.popState(), "raw" === this.conditionStack[this.conditionStack.length - 1] ? 15 : (b.yytext = b.yytext.substr(5, b.yyleng - 9), "END_RAW_BLOCK");
                        case 5:
                            return 15;
                        case 6:
                            return this.popState(), 14;
                        case 7:
                            return 65;
                        case 8:
                            return 68;
                        case 9:
                            return 19;
                        case 10:
                            return this.popState(), this.begin("raw"), 23;
                        case 11:
                            return 55;
                        case 12:
                            return 60;
                        case 13:
                            return 29;
                        case 14:
                            return 47;
                        case 15:
                            return this.popState(), 44;
                        case 16:
                            return this.popState(), 44;
                        case 17:
                            return 34;
                        case 18:
                            return 39;
                        case 19:
                            return 51;
                        case 20:
                            return 48;
                        case 21:
                            this.unput(b.yytext), this.popState(), this.begin("com");
                            break;
                        case 22:
                            return this.popState(), 14;
                        case 23:
                            return 48;
                        case 24:
                            return 73;
                        case 25:
                            return 72;
                        case 26:
                            return 72;
                        case 27:
                            return 87;
                        case 28:
                            break;
                        case 29:
                            return this.popState(), 54;
                        case 30:
                            return this.popState(), 33;
                        case 31:
                            return b.yytext = e(1, 2).replace(/\\"/g, '"'), 80;
                        case 32:
                            return b.yytext = e(1, 2).replace(/\\'/g, "'"), 80;
                        case 33:
                            return 85;
                        case 34:
                            return 82;
                        case 35:
                            return 82;
                        case 36:
                            return 83;
                        case 37:
                            return 84;
                        case 38:
                            return 81;
                        case 39:
                            return 75;
                        case 40:
                            return 77;
                        case 41:
                            return 72;
                        case 42:
                            return b.yytext = b.yytext.replace(/\\([\\\]])/g, "$1"), 72;
                        case 43:
                            return "INVALID";
                        case 44:
                            return 5
                        }
                    }, a.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/], a.conditions = {
                        mu: {
                            rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
                            inclusive: !1
                        },
                        emu: {
                            rules: [2],
                            inclusive: !1
                        },
                        com: {
                            rules: [6],
                            inclusive: !1
                        },
                        raw: {
                            rules: [3, 4, 5],
                            inclusive: !1
                        },
                        INITIAL: {
                            rules: [0, 1, 44],
                            inclusive: !0
                        }
                    }, a
                }();
            return b.lexer = c, a.prototype = b, b.Parser = a, new a
        }();
        b.__esModule = !0, b["default"] = c
    }, function(a, b, c) {
        "use strict";
        function d() {
            var a = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            this.options = a
        }
        function e(a, b, c) {
            void 0 === b && (b = a.length);
            var d = a[b - 1],
                e = a[b - 2];
            return d ? "ContentStatement" === d.type ? (e || !c ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(d.original) : void 0 : c
        }
        function f(a, b, c) {
            void 0 === b && (b = -1);
            var d = a[b + 1],
                e = a[b + 2];
            return d ? "ContentStatement" === d.type ? (e || !c ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(d.original) : void 0 : c
        }
        function g(a, b, c) {
            var d = a[null == b ? 0 : b + 1];
            if (d && "ContentStatement" === d.type && (c || !d.rightStripped)) {
                var e = d.value;
                d.value = d.value.replace(c ? /^\s+/ : /^[ \t]*\r?\n?/, ""), d.rightStripped = d.value !== e
            }
        }
        function h(a, b, c) {
            var d = a[null == b ? a.length - 1 : b - 1];
            if (d && "ContentStatement" === d.type && (c || !d.leftStripped)) {
                var e = d.value;
                return d.value = d.value.replace(c ? /\s+$/ : /[ \t]+$/, ""), d.leftStripped = d.value !== e, d.leftStripped
            }
        }
        var i = c(1)["default"];
        b.__esModule = !0;
        var j = c(25),
            k = i(j);
        d.prototype = new k["default"], d.prototype.Program = function(a) {
            var b = !this.options.ignoreStandalone,
                c = !this.isRootSeen;
            this.isRootSeen = !0;
            for (var d = a.body, i = 0, j = d.length; j > i; i++) {
                var k = d[i],
                    l = this.accept(k);
                if (l) {
                    var m = e(d, i, c),
                        n = f(d, i, c),
                        o = l.openStandalone && m,
                        p = l.closeStandalone && n,
                        q = l.inlineStandalone && m && n;
                    l.close && g(d, i, !0), l.open && h(d, i, !0), b && q && (g(d, i), h(d, i) && "PartialStatement" === k.type && (k.indent = /([ \t]+$)/.exec(d[i - 1].original)[1])), b && o && (g((k.program || k.inverse).body), h(d, i)), b && p && (g(d, i), h((k.inverse || k.program).body))
                }
            }
            return a
        }, d.prototype.BlockStatement = d.prototype.DecoratorBlock = d.prototype.PartialBlockStatement = function(a) {
            this.accept(a.program), this.accept(a.inverse);
            var b = a.program || a.inverse,
                c = a.program && a.inverse,
                d = c,
                i = c;
            if (c && c.chained)
                for (d = c.body[0].program; i.chained;)
                    i = i.body[i.body.length - 1].program;
            var j = {
                open: a.openStrip.open,
                close: a.closeStrip.close,
                openStandalone: f(b.body),
                closeStandalone: e((d || b).body)
            };
            if (a.openStrip.close && g(b.body, null, !0), c) {
                var k = a.inverseStrip;
                k.open && h(b.body, null, !0), k.close && g(d.body, null, !0), a.closeStrip.open && h(i.body, null, !0), !this.options.ignoreStandalone && e(b.body) && f(d.body) && (h(b.body), g(d.body))
            } else
                a.closeStrip.open && h(b.body, null, !0);
            return j
        }, d.prototype.Decorator = d.prototype.MustacheStatement = function(a) {
            return a.strip
        }, d.prototype.PartialStatement = d.prototype.CommentStatement = function(a) {
            var b = a.strip || {};
            return {
                inlineStandalone: !0,
                open: b.open,
                close: b.close
            }
        }, b["default"] = d, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        function d() {
            this.parents = []
        }
        function e(a) {
            this.acceptRequired(a, "path"), this.acceptArray(a.params), this.acceptKey(a, "hash")
        }
        function f(a) {
            e.call(this, a), this.acceptKey(a, "program"), this.acceptKey(a, "inverse")
        }
        function g(a) {
            this.acceptRequired(a, "name"), this.acceptArray(a.params), this.acceptKey(a, "hash")
        }
        var h = c(1)["default"];
        b.__esModule = !0;
        var i = c(6),
            j = h(i);
        d.prototype = {
            constructor: d,
            mutating: !1,
            acceptKey: function(a, b) {
                var c = this.accept(a[b]);
                if (this.mutating) {
                    if (c && !d.prototype[c.type])
                        throw new j["default"]('Unexpected node type "' + c.type + '" found when accepting ' + b + " on " + a.type);
                    a[b] = c
                }
            },
            acceptRequired: function(a, b) {
                if (this.acceptKey(a, b), !a[b])
                    throw new j["default"](a.type + " requires " + b)
            },
            acceptArray: function(a) {
                for (var b = 0, c = a.length; c > b; b++)
                    this.acceptKey(a, b), a[b] || (a.splice(b, 1), b--, c--)
            },
            accept: function(a) {
                if (a) {
                    if (!this[a.type])
                        throw new j["default"]("Unknown type: " + a.type, a);
                    this.current && this.parents.unshift(this.current), this.current = a;
                    var b = this[a.type](a);
                    return this.current = this.parents.shift(), !this.mutating || b ? b : b !== !1 ? a : void 0
                }
            },
            Program: function(a) {
                this.acceptArray(a.body)
            },
            MustacheStatement: e,
            Decorator: e,
            BlockStatement: f,
            DecoratorBlock: f,
            PartialStatement: g,
            PartialBlockStatement: function(a) {
                g.call(this, a), this.acceptKey(a, "program")
            },
            ContentStatement: function() {},
            CommentStatement: function() {},
            SubExpression: e,
            PathExpression: function() {},
            StringLiteral: function() {},
            NumberLiteral: function() {},
            BooleanLiteral: function() {},
            UndefinedLiteral: function() {},
            NullLiteral: function() {},
            Hash: function(a) {
                this.acceptArray(a.pairs)
            },
            HashPair: function(a) {
                this.acceptRequired(a, "value")
            }
        }, b["default"] = d, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        function d(a, b) {
            if (b = b.path ? b.path.original : b, a.path.original !== b) {
                var c = {
                    loc: a.path.loc
                };
                throw new q["default"](a.path.original + " doesn't match " + b, c)
            }
        }
        function e(a, b) {
            this.source = a, this.start = {
                line: b.first_line,
                column: b.first_column
            }, this.end = {
                line: b.last_line,
                column: b.last_column
            }
        }
        function f(a) {
            return /^\[.*\]$/.test(a) ? a.substr(1, a.length - 2) : a
        }
        function g(a, b) {
            return {
                open: "~" === a.charAt(2),
                close: "~" === b.charAt(b.length - 3)
            }
        }
        function h(a) {
            return a.replace(/^\{\{~?\!-?-?/, "").replace(/-?-?~?\}\}$/, "")
        }
        function i(a, b, c) {
            c = this.locInfo(c);
            for (var d = a ? "@" : "", e = [], f = 0, g = "", h = 0, i = b.length; i > h; h++) {
                var j = b[h].part,
                    k = b[h].original !== j;
                if (d += (b[h].separator || "") + j, k || ".." !== j && "." !== j && "this" !== j)
                    e.push(j);
                else {
                    if (e.length > 0)
                        throw new q["default"]("Invalid path: " + d, {
                            loc: c
                        });
                    ".." === j && (f++, g += "../")
                }
            }
            return {
                type: "PathExpression",
                data: a,
                depth: f,
                parts: e,
                original: d,
                loc: c
            }
        }
        function j(a, b, c, d, e, f) {
            var g = d.charAt(3) || d.charAt(2),
                h = "{" !== g && "&" !== g,
                i = /\*/.test(d);
            return {
                type: i ? "Decorator" : "MustacheStatement",
                path: a,
                params: b,
                hash: c,
                escaped: h,
                strip: e,
                loc: this.locInfo(f)
            }
        }
        function k(a, b, c, e) {
            d(a, c), e = this.locInfo(e);
            var f = {
                type: "Program",
                body: b,
                strip: {},
                loc: e
            };
            return {
                type: "BlockStatement",
                path: a.path,
                params: a.params,
                hash: a.hash,
                program: f,
                openStrip: {},
                inverseStrip: {},
                closeStrip: {},
                loc: e
            }
        }
        function l(a, b, c, e, f, g) {
            e && e.path && d(a, e);
            var h = /\*/.test(a.open);
            b.blockParams = a.blockParams;
            var i = void 0,
                j = void 0;
            if (c) {
                if (h)
                    throw new q["default"]("Unexpected inverse block on decorator", c);
                c.chain && (c.program.body[0].closeStrip = e.strip), j = c.strip, i = c.program
            }
            return f && (f = i, i = b, b = f), {
                type: h ? "DecoratorBlock" : "BlockStatement",
                path: a.path,
                params: a.params,
                hash: a.hash,
                program: b,
                inverse: i,
                openStrip: a.strip,
                inverseStrip: j,
                closeStrip: e && e.strip,
                loc: this.locInfo(g)
            }
        }
        function m(a, b) {
            if (!b && a.length) {
                var c = a[0].loc,
                    d = a[a.length - 1].loc;
                c && d && (b = {
                    source: c.source,
                    start: {
                        line: c.start.line,
                        column: c.start.column
                    },
                    end: {
                        line: d.end.line,
                        column: d.end.column
                    }
                })
            }
            return {
                type: "Program",
                body: a,
                strip: {},
                loc: b
            }
        }
        function n(a, b, c, e) {
            return d(a, c), {
                type: "PartialBlockStatement",
                name: a.path,
                params: a.params,
                hash: a.hash,
                program: b,
                openStrip: a.strip,
                closeStrip: c && c.strip,
                loc: this.locInfo(e)
            }
        }
        var o = c(1)["default"];
        b.__esModule = !0, b.SourceLocation = e, b.id = f, b.stripFlags = g, b.stripComment = h, b.preparePath = i, b.prepareMustache = j, b.prepareRawBlock = k, b.prepareBlock = l, b.prepareProgram = m, b.preparePartialBlock = n;
        var p = c(6),
            q = o(p)
    }, function(a, b, c) {
        "use strict";
        function d() {}
        function e(a, b, c) {
            if (null == a || "string" != typeof a && "Program" !== a.type)
                throw new k["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + a);
            b = b || {}, "data" in b || (b.data = !0), b.compat && (b.useDepths = !0);
            var d = c.parse(a, b),
                e = (new c.Compiler).compile(d, b);
            return (new c.JavaScriptCompiler).compile(e, b)
        }
        function f(a, b, c) {
            function d() {
                var d = c.parse(a, b),
                    e = (new c.Compiler).compile(d, b),
                    f = (new c.JavaScriptCompiler).compile(e, b, void 0, !0);
                return c.template(f)
            }
            function e(a, b) {
                return f || (f = d()), f.call(this, a, b)
            }
            if (void 0 === b && (b = {}), null == a || "string" != typeof a && "Program" !== a.type)
                throw new k["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + a);
            "data" in b || (b.data = !0), b.compat && (b.useDepths = !0);
            var f = void 0;
            return e._setup = function(a) {
                return f || (f = d()), f._setup(a)
            }, e._child = function(a, b, c, e) {
                return f || (f = d()), f._child(a, b, c, e)
            }, e
        }
        function g(a, b) {
            if (a === b)
                return !0;
            if (l.isArray(a) && l.isArray(b) && a.length === b.length) {
                for (var c = 0; c < a.length; c++)
                    if (!g(a[c], b[c]))
                        return !1;
                return !0
            }
        }
        function h(a) {
            if (!a.path.parts) {
                var b = a.path;
                a.path = {
                    type: "PathExpression",
                    data: !1,
                    depth: 0,
                    parts: [b.original + ""],
                    original: b.original + "",
                    loc: b.loc
                }
            }
        }
        var i = c(1)["default"];
        b.__esModule = !0, b.Compiler = d, b.precompile = e, b.compile = f;
        var j = c(6),
            k = i(j),
            l = c(5),
            m = c(21),
            n = i(m),
            o = [].slice;
        d.prototype = {
            compiler: d,
            equals: function(a) {
                var b = this.opcodes.length;
                if (a.opcodes.length !== b)
                    return !1;
                for (var c = 0; b > c; c++) {
                    var d = this.opcodes[c],
                        e = a.opcodes[c];
                    if (d.opcode !== e.opcode || !g(d.args, e.args))
                        return !1
                }
                b = this.children.length;
                for (var c = 0; b > c; c++)
                    if (!this.children[c].equals(a.children[c]))
                        return !1;
                return !0
            },
            guid: 0,
            compile: function(a, b) {
                this.sourceNode = [], this.opcodes = [], this.children = [], this.options = b, this.stringParams = b.stringParams, this.trackIds = b.trackIds, b.blockParams = b.blockParams || [];
                var c = b.knownHelpers;
                if (b.knownHelpers = {
                    helperMissing: !0,
                    blockHelperMissing: !0,
                    each: !0,
                    "if": !0,
                    unless: !0,
                    "with": !0,
                    log: !0,
                    lookup: !0
                }, c)
                    for (var d in c)
                        d in c && (b.knownHelpers[d] = c[d]);
                return this.accept(a)
            },
            compileProgram: function(a) {
                var b = new this.compiler,
                    c = b.compile(a, this.options),
                    d = this.guid++;
                return this.usePartial = this.usePartial || c.usePartial, this.children[d] = c, this.useDepths = this.useDepths || c.useDepths, d
            },
            accept: function(a) {
                if (!this[a.type])
                    throw new k["default"]("Unknown type: " + a.type, a);
                this.sourceNode.unshift(a);
                var b = this[a.type](a);
                return this.sourceNode.shift(), b
            },
            Program: function(a) {
                this.options.blockParams.unshift(a.blockParams);
                for (var b = a.body, c = b.length, d = 0; c > d; d++)
                    this.accept(b[d]);
                return this.options.blockParams.shift(), this.isSimple = 1 === c, this.blockParams = a.blockParams ? a.blockParams.length : 0, this
            },
            BlockStatement: function(a) {
                h(a);
                var b = a.program,
                    c = a.inverse;
                b = b && this.compileProgram(b), c = c && this.compileProgram(c);
                var d = this.classifySexpr(a);
                "helper" === d ? this.helperSexpr(a, b, c) : "simple" === d ? (this.simpleSexpr(a), this.opcode("pushProgram", b), this.opcode("pushProgram", c), this.opcode("emptyHash"), this.opcode("blockValue", a.path.original)) : (this.ambiguousSexpr(a, b, c), this.opcode("pushProgram", b), this.opcode("pushProgram", c), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
            },
            DecoratorBlock: function(a) {
                var b = a.program && this.compileProgram(a.program),
                    c = this.setupFullMustacheParams(a, b, void 0),
                    d = a.path;
                this.useDecorators = !0, this.opcode("registerDecorator", c.length, d.original)
            },
            PartialStatement: function(a) {
                this.usePartial = !0;
                var b = a.program;
                b && (b = this.compileProgram(a.program));
                var c = a.params;
                if (c.length > 1)
                    throw new k["default"]("Unsupported number of partial arguments: " + c.length, a);
                c.length || (this.options.explicitPartialContext ? this.opcode("pushLiteral", "undefined") : c.push({
                    type: "PathExpression",
                    parts: [],
                    depth: 0
                }));
                var d = a.name.original,
                    e = "SubExpression" === a.name.type;
                e && this.accept(a.name), this.setupFullMustacheParams(a, b, void 0, !0);
                var f = a.indent || "";
                this.options.preventIndent && f && (this.opcode("appendContent", f), f = ""), this.opcode("invokePartial", e, d, f), this.opcode("append")
            },
            PartialBlockStatement: function(a) {
                this.PartialStatement(a)
            },
            MustacheStatement: function(a) {
                this.SubExpression(a), a.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
            },
            Decorator: function(a) {
                this.DecoratorBlock(a)
            },
            ContentStatement: function(a) {
                a.value && this.opcode("appendContent", a.value)
            },
            CommentStatement: function() {},
            SubExpression: function(a) {
                h(a);
                var b = this.classifySexpr(a);
                "simple" === b ? this.simpleSexpr(a) : "helper" === b ? this.helperSexpr(a) : this.ambiguousSexpr(a)
            },
            ambiguousSexpr: function(a, b, c) {
                var d = a.path,
                    e = d.parts[0],
                    f = null != b || null != c;
                this.opcode("getContext", d.depth), this.opcode("pushProgram", b), this.opcode("pushProgram", c), d.strict = !0, this.accept(d), this.opcode("invokeAmbiguous", e, f)
            },
            simpleSexpr: function(a) {
                var b = a.path;
                b.strict = !0, this.accept(b), this.opcode("resolvePossibleLambda")
            },
            helperSexpr: function(a, b, c) {
                var d = this.setupFullMustacheParams(a, b, c),
                    e = a.path,
                    f = e.parts[0];
                if (this.options.knownHelpers[f])
                    this.opcode("invokeKnownHelper", d.length, f);
                else {
                    if (this.options.knownHelpersOnly)
                        throw new k["default"]("You specified knownHelpersOnly, but used the unknown helper " + f, a);
                    e.strict = !0, e.falsy = !0, this.accept(e), this.opcode("invokeHelper", d.length, e.original, n["default"].helpers.simpleId(e))
                }
            },
            PathExpression: function(a) {
                this.addDepth(a.depth), this.opcode("getContext", a.depth);
                var b = a.parts[0],
                    c = n["default"].helpers.scopedId(a),
                    d = !a.depth && !c && this.blockParamIndex(b);
                d ? this.opcode("lookupBlockParam", d, a.parts) : b ? a.data ? (this.options.data = !0, this.opcode("lookupData", a.depth, a.parts, a.strict)) : this.opcode("lookupOnContext", a.parts, a.falsy, a.strict, c) : this.opcode("pushContext")
            },
            StringLiteral: function(a) {
                this.opcode("pushString", a.value)
            },
            NumberLiteral: function(a) {
                this.opcode("pushLiteral", a.value)
            },
            BooleanLiteral: function(a) {
                this.opcode("pushLiteral", a.value)
            },
            UndefinedLiteral: function() {
                this.opcode("pushLiteral", "undefined")
            },
            NullLiteral: function() {
                this.opcode("pushLiteral", "null")
            },
            Hash: function(a) {
                var b = a.pairs,
                    c = 0,
                    d = b.length;
                for (this.opcode("pushHash"); d > c; c++)
                    this.pushParam(b[c].value);
                for (; c--;)
                    this.opcode("assignToHash", b[c].key);
                this.opcode("popHash")
            },
            opcode: function(a) {
                this.opcodes.push({
                    opcode: a,
                    args: o.call(arguments, 1),
                    loc: this.sourceNode[0].loc
                })
            },
            addDepth: function(a) {
                a && (this.useDepths = !0)
            },
            classifySexpr: function(a) {
                var b = n["default"].helpers.simpleId(a.path),
                    c = b && !!this.blockParamIndex(a.path.parts[0]),
                    d = !c && n["default"].helpers.helperExpression(a),
                    e = !c && (d || b);
                if (e && !d) {
                    var f = a.path.parts[0],
                        g = this.options;
                    g.knownHelpers[f] ? d = !0 : g.knownHelpersOnly && (e = !1)
                }
                return d ? "helper" : e ? "ambiguous" : "simple"
            },
            pushParams: function(a) {
                for (var b = 0, c = a.length; c > b; b++)
                    this.pushParam(a[b])
            },
            pushParam: function(a) {
                var b = null != a.value ? a.value : a.original || "";
                if (this.stringParams)
                    b.replace && (b = b.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), a.depth && this.addDepth(a.depth), this.opcode("getContext", a.depth || 0), this.opcode("pushStringParam", b, a.type), "SubExpression" === a.type && this.accept(a);
                else {
                    if (this.trackIds) {
                        var c = void 0;
                        if (!a.parts || n["default"].helpers.scopedId(a) || a.depth || (c = this.blockParamIndex(a.parts[0])), c) {
                            var d = a.parts.slice(1).join(".");
                            this.opcode("pushId", "BlockParam", c, d)
                        } else
                            b = a.original || b, b.replace && (b = b.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")), this.opcode("pushId", a.type, b)
                    }
                    this.accept(a)
                }
            },
            setupFullMustacheParams: function(a, b, c, d) {
                var e = a.params;
                return this.pushParams(e), this.opcode("pushProgram", b), this.opcode("pushProgram", c), a.hash ? this.accept(a.hash) : this.opcode("emptyHash", d), e
            },
            blockParamIndex: function(a) {
                for (var b = 0, c = this.options.blockParams.length; c > b; b++) {
                    var d = this.options.blockParams[b],
                        e = d && l.indexOf(d, a);
                    if (d && e >= 0)
                        return [b, e]
                }
            }
        }
    }, function(a, b, c) {
        "use strict";
        function d(a) {
            this.value = a
        }
        function e() {}
        function f(a, b, c, d) {
            var e = b.popStack(),
                f = 0,
                g = c.length;
            for (a && g--; g > f; f++)
                e = b.nameLookup(e, c[f], d);
            return a ? [b.aliasable("container.strict"), "(", e, ", ", b.quotedString(c[f]), ")"] : e
        }
        var g = c(1)["default"];
        b.__esModule = !0;
        var h = c(4),
            i = c(6),
            j = g(i),
            k = c(5),
            l = c(29),
            m = g(l);
        e.prototype = {
            nameLookup: function(a, b) {
                return e.isValidJavaScriptVariableName(b) ? [a, ".", b] : [a, "[", JSON.stringify(b), "]"]
            },
            depthedLookup: function(a) {
                return [this.aliasable("container.lookup"), '(depths, "', a, '")']
            },
            compilerInfo: function() {
                var a = h.COMPILER_REVISION,
                    b = h.REVISION_CHANGES[a];
                return [a, b]
            },
            appendToBuffer: function(a, b, c) {
                return k.isArray(a) || (a = [a]), a = this.source.wrap(a, b), this.environment.isSimple ? ["return ", a, ";"] : c ? ["buffer += ", a, ";"] : (a.appendToBuffer = !0, a)
            },
            initializeBuffer: function() {
                return this.quotedString("")
            },
            compile: function(a, b, c, d) {
                this.environment = a, this.options = b, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !d, this.name = this.environment.name, this.isChild = !!c, this.context = c || {
                    decorators: [],
                    programs: [],
                    environments: []
                }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = {
                    list: []
                }, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], this.compileChildren(a, b), this.useDepths = this.useDepths || a.useDepths || a.useDecorators || this.options.compat, this.useBlockParams = this.useBlockParams || a.useBlockParams;
                var e = a.opcodes,
                    f = void 0,
                    g = void 0,
                    h = void 0,
                    i = void 0;
                for (h = 0, i = e.length; i > h; h++)
                    f = e[h], this.source.currentLocation = f.loc, g = g || f.loc, this[f.opcode].apply(this, f.args);
                if (this.source.currentLocation = g, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length)
                    throw new j["default"]("Compile completed with content left on stack");
                this.decorators.isEmpty() ? this.decorators = void 0 : (this.useDecorators = !0, this.decorators.prepend("var decorators = container.decorators;\n"), this.decorators.push("return fn;"), d ? this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]) : (this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"), this.decorators.push("}\n"), this.decorators = this.decorators.merge()));
                var k = this.createFunctionContext(d);
                if (this.isChild)
                    return k;
                var l = {
                    compiler: this.compilerInfo(),
                    main: k
                };
                this.decorators && (l.main_d = this.decorators, l.useDecorators = !0);
                var m = this.context,
                    n = m.programs,
                    o = m.decorators;
                for (h = 0, i = n.length; i > h; h++)
                    n[h] && (l[h] = n[h], o[h] && (l[h + "_d"] = o[h], l.useDecorators = !0));
                return this.environment.usePartial && (l.usePartial = !0), this.options.data && (l.useData = !0), this.useDepths && (l.useDepths = !0), this.useBlockParams && (l.useBlockParams = !0), this.options.compat && (l.compat = !0), d ? l.compilerOptions = this.options : (l.compiler = JSON.stringify(l.compiler), this.source.currentLocation = {
                    start: {
                        line: 1,
                        column: 0
                    }
                }, l = this.objectLiteral(l), b.srcName ? (l = l.toStringWithSourceMap({
                    file: b.destName
                }), l.map = l.map && l.map.toString()) : l = l.toString()), l
            },
            preamble: function() {
                this.lastContext = 0, this.source = new m["default"](this.options.srcName), this.decorators = new m["default"](this.options.srcName)
            },
            createFunctionContext: function(a) {
                var b = "",
                    c = this.stackVars.concat(this.registers.list);
                c.length > 0 && (b += ", " + c.join(", "));
                var d = 0;
                for (var e in this.aliases) {
                    var f = this.aliases[e];
                    this.aliases.hasOwnProperty(e) && f.children && f.referenceCount > 1 && (b += ", alias" + ++d + "=" + e, f.children[0] = "alias" + d)
                }
                var g = ["container", "depth0", "helpers", "partials", "data"];
                (this.useBlockParams || this.useDepths) && g.push("blockParams"), this.useDepths && g.push("depths");
                var h = this.mergeSource(b);
                return a ? (g.push(h), Function.apply(this, g)) : this.source.wrap(["function(", g.join(","), ") {\n  ", h, "}"])
            },
            mergeSource: function(a) {
                var b = this.environment.isSimple,
                    c = !this.forceBuffer,
                    d = void 0,
                    e = void 0,
                    f = void 0,
                    g = void 0;
                return this.source.each(function(a) {
                    a.appendToBuffer ? (f ? a.prepend("  + ") : f = a, g = a) : (f && (e ? f.prepend("buffer += ") : d = !0, g.add(";"), f = g = void 0), e = !0, b || (c = !1))
                }), c ? f ? (f.prepend("return "), g.add(";")) : e || this.source.push('return "";') : (a += ", buffer = " + (d ? "" : this.initializeBuffer()), f ? (f.prepend("return buffer + "), g.add(";")) : this.source.push("return buffer;")), a && this.source.prepend("var " + a.substring(2) + (d ? "" : ";\n")), this.source.merge()
            },
            blockValue: function(a) {
                var b = this.aliasable("helpers.blockHelperMissing"),
                    c = [this.contextName(0)];
                this.setupHelperArgs(a, 0, c);
                var d = this.popStack();
                c.splice(1, 0, d), this.push(this.source.functionCall(b, "call", c))
            },
            ambiguousBlockValue: function() {
                var a = this.aliasable("helpers.blockHelperMissing"),
                    b = [this.contextName(0)];
                this.setupHelperArgs("", 0, b, !0), this.flushInline();
                var c = this.topStack();
                b.splice(1, 0, c), this.pushSource(["if (!", this.lastHelper, ") { ", c, " = ", this.source.functionCall(a, "call", b), "}"])
            },
            appendContent: function(a) {
                this.pendingContent ? a = this.pendingContent + a : this.pendingLocation = this.source.currentLocation, this.pendingContent = a
            },
            append: function() {
                if (this.isInline())
                    this.replaceStack(function(a) {
                        return [" != null ? ", a, ' : ""']
                    }), this.pushSource(this.appendToBuffer(this.popStack()));
                else {
                    var a = this.popStack();
                    this.pushSource(["if (", a, " != null) { ", this.appendToBuffer(a, void 0, !0), " }"]), this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"])
                }
            },
            appendEscaped: function() {
                this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]))
            },
            getContext: function(a) {
                this.lastContext = a
            },
            pushContext: function() {
                this.pushStackLiteral(this.contextName(this.lastContext))
            },
            lookupOnContext: function(a, b, c, d) {
                var e = 0;
                d || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(a[e++])), this.resolvePath("context", a, e, b, c)
            },
            lookupBlockParam: function(a, b) {
                this.useBlockParams = !0, this.push(["blockParams[", a[0], "][", a[1], "]"]), this.resolvePath("context", b, 1)
            },
            lookupData: function(a, b, c) {
                a ? this.pushStackLiteral("container.data(data, " + a + ")") : this.pushStackLiteral("data"), this.resolvePath("data", b, 0, !0, c)
            },
            resolvePath: function(a, b, c, d, e) {
                var g = this;
                if (this.options.strict || this.options.assumeObjects)
                    return void this.push(f(this.options.strict && e, this, b, a));
                for (var h = b.length; h > c; c++)
                    this.replaceStack(function(e) {
                        var f = g.nameLookup(e, b[c], a);
                        return d ? [" && ", f] : [" != null ? ", f, " : ", e]
                    })
            },
            resolvePossibleLambda: function() {
                this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"])
            },
            pushStringParam: function(a, b) {
                this.pushContext(), this.pushString(b), "SubExpression" !== b && ("string" == typeof a ? this.pushString(a) : this.pushStackLiteral(a))
            },
            emptyHash: function(a) {
                this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), this.pushStackLiteral(a ? "undefined" : "{}")
            },
            pushHash: function() {
                this.hash && this.hashes.push(this.hash), this.hash = {
                    values: [],
                    types: [],
                    contexts: [],
                    ids: []
                }
            },
            popHash: function() {
                var a = this.hash;
                this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(a.ids)), this.stringParams && (this.push(this.objectLiteral(a.contexts)), this.push(this.objectLiteral(a.types))), this.push(this.objectLiteral(a.values))
            },
            pushString: function(a) {
                this.pushStackLiteral(this.quotedString(a))
            },
            pushLiteral: function(a) {
                this.pushStackLiteral(a)
            },
            pushProgram: function(a) {
                null != a ? this.pushStackLiteral(this.programExpression(a)) : this.pushStackLiteral(null)
            },
            registerDecorator: function(a, b) {
                var c = this.nameLookup("decorators", b, "decorator"),
                    d = this.setupHelperArgs(b, a);
                this.decorators.push(["fn = ", this.decorators.functionCall(c, "", ["fn", "props", "container", d]), " || fn;"])
            },
            invokeHelper: function(a, b, c) {
                var d = this.popStack(),
                    e = this.setupHelper(a, b),
                    f = c ? [e.name, " || "] : "",
                    g = ["("].concat(f, d);
                this.options.strict || g.push(" || ", this.aliasable("helpers.helperMissing")), g.push(")"), this.push(this.source.functionCall(g, "call", e.callParams))
            },
            invokeKnownHelper: function(a, b) {
                var c = this.setupHelper(a, b);
                this.push(this.source.functionCall(c.name, "call", c.callParams))
            },
            invokeAmbiguous: function(a, b) {
                this.useRegister("helper");
                var c = this.popStack();
                this.emptyHash();
                var d = this.setupHelper(0, a, b),
                    e = this.lastHelper = this.nameLookup("helpers", a, "helper"),
                    f = ["(", "(helper = ", e, " || ", c, ")"];
                this.options.strict || (f[0] = "(helper = ", f.push(" != null ? helper : ", this.aliasable("helpers.helperMissing"))), this.push(["(", f, d.paramsInit ? ["),(", d.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", d.callParams), " : helper))"])
            },
            invokePartial: function(a, b, c) {
                var d = [],
                    e = this.setupParams(b, 1, d);
                a && (b = this.popStack(), delete e.name), c && (e.indent = JSON.stringify(c)), e.helpers = "helpers", e.partials = "partials", e.decorators = "container.decorators", a ? d.unshift(b) : d.unshift(this.nameLookup("partials", b, "partial")), this.options.compat && (e.depths = "depths"),
                e = this.objectLiteral(e), d.push(e), this.push(this.source.functionCall("container.invokePartial", "", d))
            },
            assignToHash: function(a) {
                var b = this.popStack(),
                    c = void 0,
                    d = void 0,
                    e = void 0;
                this.trackIds && (e = this.popStack()), this.stringParams && (d = this.popStack(), c = this.popStack());
                var f = this.hash;
                c && (f.contexts[a] = c), d && (f.types[a] = d), e && (f.ids[a] = e), f.values[a] = b
            },
            pushId: function(a, b, c) {
                "BlockParam" === a ? this.pushStackLiteral("blockParams[" + b[0] + "].path[" + b[1] + "]" + (c ? " + " + JSON.stringify("." + c) : "")) : "PathExpression" === a ? this.pushString(b) : "SubExpression" === a ? this.pushStackLiteral("true") : this.pushStackLiteral("null")
            },
            compiler: e,
            compileChildren: function(a, b) {
                for (var c = a.children, d = void 0, e = void 0, f = 0, g = c.length; g > f; f++) {
                    d = c[f], e = new this.compiler;
                    var h = this.matchExistingProgram(d);
                    null == h ? (this.context.programs.push(""), h = this.context.programs.length, d.index = h, d.name = "program" + h, this.context.programs[h] = e.compile(d, b, this.context, !this.precompile), this.context.decorators[h] = e.decorators, this.context.environments[h] = d, this.useDepths = this.useDepths || e.useDepths, this.useBlockParams = this.useBlockParams || e.useBlockParams) : (d.index = h, d.name = "program" + h, this.useDepths = this.useDepths || d.useDepths, this.useBlockParams = this.useBlockParams || d.useBlockParams)
                }
            },
            matchExistingProgram: function(a) {
                for (var b = 0, c = this.context.environments.length; c > b; b++) {
                    var d = this.context.environments[b];
                    if (d && d.equals(a))
                        return b
                }
            },
            programExpression: function(a) {
                var b = this.environment.children[a],
                    c = [b.index, "data", b.blockParams];
                return (this.useBlockParams || this.useDepths) && c.push("blockParams"), this.useDepths && c.push("depths"), "container.program(" + c.join(", ") + ")"
            },
            useRegister: function(a) {
                this.registers[a] || (this.registers[a] = !0, this.registers.list.push(a))
            },
            push: function(a) {
                return a instanceof d || (a = this.source.wrap(a)), this.inlineStack.push(a), a
            },
            pushStackLiteral: function(a) {
                this.push(new d(a))
            },
            pushSource: function(a) {
                this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0), a && this.source.push(a)
            },
            replaceStack: function(a) {
                var b = ["("],
                    c = void 0,
                    e = void 0,
                    f = void 0;
                if (!this.isInline())
                    throw new j["default"]("replaceStack on non-inline");
                var g = this.popStack(!0);
                if (g instanceof d)
                    c = [g.value], b = ["(", c], f = !0;
                else {
                    e = !0;
                    var h = this.incrStack();
                    b = ["((", this.push(h), " = ", g, ")"], c = this.topStack()
                }
                var i = a.call(this, c);
                f || this.popStack(), e && this.stackSlot--, this.push(b.concat(i, ")"))
            },
            incrStack: function() {
                return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
            },
            topStackName: function() {
                return "stack" + this.stackSlot
            },
            flushInline: function() {
                var a = this.inlineStack;
                this.inlineStack = [];
                for (var b = 0, c = a.length; c > b; b++) {
                    var e = a[b];
                    if (e instanceof d)
                        this.compileStack.push(e);
                    else {
                        var f = this.incrStack();
                        this.pushSource([f, " = ", e, ";"]), this.compileStack.push(f)
                    }
                }
            },
            isInline: function() {
                return this.inlineStack.length
            },
            popStack: function(a) {
                var b = this.isInline(),
                    c = (b ? this.inlineStack : this.compileStack).pop();
                if (!a && c instanceof d)
                    return c.value;
                if (!b) {
                    if (!this.stackSlot)
                        throw new j["default"]("Invalid stack pop");
                    this.stackSlot--
                }
                return c
            },
            topStack: function() {
                var a = this.isInline() ? this.inlineStack : this.compileStack,
                    b = a[a.length - 1];
                return b instanceof d ? b.value : b
            },
            contextName: function(a) {
                return this.useDepths && a ? "depths[" + a + "]" : "depth" + a
            },
            quotedString: function(a) {
                return this.source.quotedString(a)
            },
            objectLiteral: function(a) {
                return this.source.objectLiteral(a)
            },
            aliasable: function(a) {
                var b = this.aliases[a];
                return b ? (b.referenceCount++, b) : (b = this.aliases[a] = this.source.wrap(a), b.aliasable = !0, b.referenceCount = 1, b)
            },
            setupHelper: function(a, b, c) {
                var d = [],
                    e = this.setupHelperArgs(b, a, d, c),
                    f = this.nameLookup("helpers", b, "helper"),
                    g = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : {}");
                return {
                    params: d,
                    paramsInit: e,
                    name: f,
                    callParams: [g].concat(d)
                }
            },
            setupParams: function(a, b, c) {
                var d = {},
                    e = [],
                    f = [],
                    g = [],
                    h = !c,
                    i = void 0;
                h && (c = []), d.name = this.quotedString(a), d.hash = this.popStack(), this.trackIds && (d.hashIds = this.popStack()), this.stringParams && (d.hashTypes = this.popStack(), d.hashContexts = this.popStack());
                var j = this.popStack(),
                    k = this.popStack();
                (k || j) && (d.fn = k || "container.noop", d.inverse = j || "container.noop");
                for (var l = b; l--;)
                    i = this.popStack(), c[l] = i, this.trackIds && (g[l] = this.popStack()), this.stringParams && (f[l] = this.popStack(), e[l] = this.popStack());
                return h && (d.args = this.source.generateArray(c)), this.trackIds && (d.ids = this.source.generateArray(g)), this.stringParams && (d.types = this.source.generateArray(f), d.contexts = this.source.generateArray(e)), this.options.data && (d.data = "data"), this.useBlockParams && (d.blockParams = "blockParams"), d
            },
            setupHelperArgs: function(a, b, c, d) {
                var e = this.setupParams(a, b, c);
                return e = this.objectLiteral(e), d ? (this.useRegister("options"), c.push("options"), ["options=", e]) : c ? (c.push(e), "") : e
            }
        }, function() {
            for (var a = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), b = e.RESERVED_WORDS = {}, c = 0, d = a.length; d > c; c++)
                b[a[c]] = !0
        }(), e.isValidJavaScriptVariableName = function(a) {
            return !e.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a)
        }, b["default"] = e, a.exports = b["default"]
    }, function(a, b, c) {
        "use strict";
        function d(a, b, c) {
            if (f.isArray(a)) {
                for (var d = [], e = 0, g = a.length; g > e; e++)
                    d.push(b.wrap(a[e], c));
                return d
            }
            return "boolean" == typeof a || "number" == typeof a ? a + "" : a
        }
        function e(a) {
            this.srcFile = a, this.source = []
        }
        b.__esModule = !0;
        var f = c(5),
            g = void 0;
        try {} catch (h) {}
        g || (g = function(a, b, c, d) {
            this.src = "", d && this.add(d)
        }, g.prototype = {
            add: function(a) {
                f.isArray(a) && (a = a.join("")), this.src += a
            },
            prepend: function(a) {
                f.isArray(a) && (a = a.join("")), this.src = a + this.src
            },
            toStringWithSourceMap: function() {
                return {
                    code: this.toString()
                }
            },
            toString: function() {
                return this.src
            }
        }), e.prototype = {
            isEmpty: function() {
                return !this.source.length
            },
            prepend: function(a, b) {
                this.source.unshift(this.wrap(a, b))
            },
            push: function(a, b) {
                this.source.push(this.wrap(a, b))
            },
            merge: function() {
                var a = this.empty();
                return this.each(function(b) {
                    a.add(["  ", b, "\n"])
                }), a
            },
            each: function(a) {
                for (var b = 0, c = this.source.length; c > b; b++)
                    a(this.source[b])
            },
            empty: function() {
                var a = this.currentLocation || {
                    start: {}
                };
                return new g(a.start.line, a.start.column, this.srcFile)
            },
            wrap: function(a) {
                var b = arguments.length <= 1 || void 0 === arguments[1] ? this.currentLocation || {
                    start: {}
                } : arguments[1];
                return a instanceof g ? a : (a = d(a, this, b), new g(b.start.line, b.start.column, this.srcFile, a))
            },
            functionCall: function(a, b, c) {
                return c = this.generateList(c), this.wrap([a, b ? "." + b + "(" : "(", c, ")"])
            },
            quotedString: function(a) {
                return '"' + (a + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
            },
            objectLiteral: function(a) {
                var b = [];
                for (var c in a)
                    if (a.hasOwnProperty(c)) {
                        var e = d(a[c], this);
                        "undefined" !== e && b.push([this.quotedString(c), ":", e])
                    }
                var f = this.generateList(b);
                return f.prepend("{"), f.add("}"), f
            },
            generateList: function(a) {
                for (var b = this.empty(), c = 0, e = a.length; e > c; c++)
                    c && b.add(","), b.add(d(a[c], this));
                return b
            },
            generateArray: function(a) {
                var b = this.generateList(a);
                return b.prepend("["), b.add("]"), b
            }
        }, b["default"] = e, a.exports = b["default"]
    }])
});


/*
 * Funnelback auto-completion plugin
 * version 2.6
 *
 * author: Liliana Nowak
 * Copyright Funnelback, 2015-2017
 *
 * @requires jQuery https://jquery.com/
 * @requires typeahead.js https://twitter.github.io/typeahead.js/
 */
(function($) {
    'use strict';

	var qc = function(element, options) {
		// Global references
		this.$element = $(element);
		this.options  = options;

		this.init();
	}

	// Default options
	qc.defaults = {
		// set configuration
		datasets : null,				// {set1: {url: ''}, set2: {...}, set3: {...}}
		/*
		defaultCall   : {				// 'string'|[]|{}; use to trigger auto-completion when input value is empty and length=0
			filter    : customFunctionToMapData,// function(set, data); filter function used to map response data
			params    : {},						// {}; list of parameters added to request
			url       : '' 						// 'string'; URL to call request
		},
		defaultCall   : '',				// 'string'; query to replace empty value and call request
		defaultCall   : [],				// [{value: '', label: ''}, {value: '', label: ''}]; list of hardcoded data to fulfill dropdown menu
		defaultCall   : {
			data      : [],				// []; list of hardcoded data
			filter    : function 		// function(set, data); filter function used to map hardcoded data
		},
		*/
		callback 		: null,			// function(set, suggestions); callback function applied to suggestions before returning them to typeahead plugin
		filter 			: _processSetData, // function(set, suggestion, index); filter function used to map response data
		group 			: false,		// true|false; enable grouping suggestions based on parameter itemGroup
		groupOrder 		: [],			// []; list of group headers used to sort grouped suggestions in that order
		facets 			: {				// {}; list of parameters applied when default search-based auto-completion is enabled
			blacklist	: [],	// []; list of facet categories names not to displayed
			whitelist	: [],	// []; list of facet categories names to display
			show		: 2,	// integer; maximum number of facets values to display per facet category; if not set will display all facet category values
			url 		: null, // string; the target URL to apply facets parameters to; By default it'll be current location
		},
		itemGroup 		: 'category',	// 'string'; the name of field used to group suggestions and display as group header in dropdown
		itemLabel 		: 'value',		// 'string'; the name of a field to be displayed in input field
		template 		: {				// {notFound: '', pending: '', header: '', footer: '', group: '', suggestion: ''}
			group: function(context) { return $('<div>').html(String(context.label)); },
			suggestion: function(context) { return $('<div>').html(String(context.label)); }
		},
		templateMerge 	: true,			// true|false; to wrap notFound and pending template with header and footer template

		// URL settings
		collection 		: null,			// 'string'; the collection name
		dataType 		: 'json',		// 'json'|'jsonp'; the type of data returned back from the server
		alpha 			: '0.5',		// 'string'; adjust the balance between length and relevancy for spelling based suggestions
		format 			: 'extended',	// 'simple|extended'; mapping into 'json' or 'json++'
		params 			: null,			// {}; custom URL parameters
		profile 		: '_default',	// 'string'; the profile name
		program 		: '/s/suggest.json', // 'string'; program/URL used to generate auto-completion suggestions
		show 			: 10,			// integer; maximum number of suggestions to diplay in dropdown per set
		sort 			: 0,			// integer; set the auto-completion suggestions sort order when program='/s/suggest.json'
		queryKey 		: 'partial_query', // 'string'; the name of URL parameter to run search query
		queryVal 		: '%QUERY',		// 'string'; the value to be replaced in url with the URI encoded query

		// display settings
		length      	: 3,			// integer; the minimum character length to trigger query completion
		horizontal  	: false,		// true|false; if true, display datasets in columns, else one below the other
		scrollable  	: false,		// true|false; to limit height of a menu dropdown to maxheight by adding vertical scroll

		// logs
		logging 		: true,
		interactionLog 	: '/s/log',

		//typeahead settings
		typeahead: {
			classNames  : {},			// {}; to override any of default classes, more https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#class-names
			highlight   : true,			// true|false; when suggestions are rendered, pattern matches for the current query in text nodes will be wrapped in a strong element with its class set to {{classNames.highlight}}
			hint        : false,		// true|false; to show a hint in input field,
			events      : {				// {eventName: function}; events get triggered on the input element during the life-cycle of a typeahead
				select  : function(event, suggestion) {
					_selectItem(suggestion, $(event.target));
				},
				afterselect: function(event, suggestion) {
					if (suggestion.extra.action_t == 'E') $(event.target).focus();
				}
			}
		},
	};

	/* Public methods */
	
	qc.prototype.init = function() {
		this.option(this.options);

		if (_isEnabled(this.options)) this.initTypeahead();
		else this.destroy();
	}

	qc.prototype.destroy = function () {
		this.destroyTypeahead;

		this.$element = null;
		this.options  = {};
	}

	qc.prototype.option = function(key, val) {
		if (arguments.length === 0) {
			return this.options;
		}

		var that = this, options = $.isObject(key) ? key : {}, parts;
		if ($.isString(key)) {
			if (arguments.length === 1 || !$.isDefinied(val)) {
				return $.dataVals($.extend({}, that.options), key);
			}

			options[key] = val;
		}

		for (var k in options) _setOption(k, options[k]);

		function _setOption(key, val) {
			if (key === 'datasets') that.options[key] = _mapOptions(that.options, val);
			if (key === 'debug') _debug = val;
			if (key === 'horizontal' && val) {
				that.setTypeaheadClass('menu', 'tt-horizontal');

				that.options.typeahead.events.render = function(event) {
					_renderSetWidth(that.getTypeaheadMenu(), 'tt-horizontal', 'tt-dataset');
				};
			}
			if (key === 'scrollable' && val) that.setTypeaheadClass('menu', 'tt-scrollable');
		}
	}

	qc.prototype.horizontal = function(val) {
		return this.option('horizontal', val);
	}

	qc.prototype.scrollable = function(val) {
		return this.option('scrollable', val);
	}

	// Typeahead
	qc.prototype.initTypeahead = function() {
		var that = this, data = [];

		$.each(that.options.datasets, function(name, set) {
			data.push(_getSetData(set, name));
		});

		that.$element.typeahead({
			minLength : parseInt(that.options.length),
			hint      : that.options.typeahead.hint,
			highlight : that.options.typeahead.highlight,
			classNames: that.options.typeahead.classNames
		}, data);

		if (that.options.typeahead.events) {
			$.each(that.options.typeahead.events, function(eventName, func) {
				that.$element.on('typeahead:' + eventName, func);
			});
		}

		if (that.options.horizontal) {
			var data = that.$element.data(), menu = that.getTypeaheadMenu();

			/* 
			 * 37 - code for left arrow key
			 * 38 - code for up arrow key
			 * 39 - code for right arrow key
			 * 40 - code for down arrow key
			 */
			data.ttTypeahead._onDownKeyed = function() {
				_navCursorUD(40, menu, that.$element);
			};
			data.ttTypeahead._onUpKeyed = function() {
				_navCursorUD(38, menu, that.$element);
			}

			var cols = menu.children('.tt-dataset');
			if (cols.size() > 1) {
				data.ttTypeahead._onLeftKeyed = function() {
					_navCursorLR(37, cols, that.$element);
				};
				data.ttTypeahead._onRightKeyed = function() {
					_navCursorLR(39, cols, that.$element);
				}
			}

			that.$element.on('keydown', function(event) {
				var code = event.keyCode || event.which;
				if (code == 38 || code == 40) return false;
				if ((code == 37 || code == 39) && $.exist(_navCols.cursor)) return false;
			});
		}

		// Log interactions
		if (!that.options.logging) return;
		that.$element.on('typeahead:select', function(event, suggestion) {
			logInteraction(that.options, suggestion, $(event.target), 'select');
		});
	}

	qc.prototype.destroyTypeahead = function() {
		this.$element.typeahead('destroy');
	}

	qc.prototype.getTypeaheadMenu = function() {
		return this.$element.siblings('.tt-menu');
	}

	qc.prototype.setTypeaheadClass = function(name, className) {
		if (!$.exist(this.options.typeahead.classNames[name], true)) this.options.typeahead.classNames[name] = 'tt-' + name; // default class
		this.options.typeahead.classNames[name] += ' ' + className;
	}

	/* Private variables */
	var _debug = false,
	_mapKeys = ['collection', 'callback', 'dataType', 'alpha', 'facets', 'filter', 'format', 'group', 'groupOrder', 'itemGroup', 'itemLabel', 'params', 'profile', 'program', 'show', 'sort', 'queryKey', 'queryVal', 'template', 'templateMerge'],
	_navCols = {cursor : null, query  : ''};

	/* Private methods */
	
	// Check if there is enough data to trigger auto-completion
	function _isEnabled(options) {
		var bState = false;

		if (!$.isObject(options.datasets)) return bState;

		$.each(options.datasets, function(name, set) {
			if ($.exist(set.collection, true)) bState = true;
		});

		return bState;
	}

	// Map global options per dataset
	function _mapOptions(options, datasets) {
		var map = {};
		$.each(_mapKeys, function(i, key) { map[key] = options[key] });
		$.each(datasets, function(name, set) { datasets[name] = $.extend(true, {}, map, set) });
		return datasets;
	}

	// Handle set
	function _getSetData(set, name) {
		var engine = new Bloodhound({
			datumTokenizer : Bloodhound.tokenizers.obj.whitespace('value'),
			queryTokenizer : Bloodhound.tokenizers.whitespace,
			remote         : getBloodhoundRemote()
		});
		engine.initialize();

		return {
			name 	: name,
			limit 	: 10000, // hack to display all returned data
			source 	: source,
			display : displayVal,
			templates : _renderSetTemplate(set)
		}

		function displayVal(suggestion) {
			return $.isFunction(set.itemLabel) ? set.itemLabel.call(undefined, suggestion) : $.dataVals(suggestion, set.itemLabel);
		}

		function getBloodhoundRemote() {
			var remote = {
				url    : set.url ? set.url : _getSetUrl(set),
				filter : function (response) {
					var query = getQuery($(this).get(0).transport.lastReq);
					return _handleSetData(set, $.map(response, function(suggestion, i) { return set.filter(set, suggestion, i, name, query) }));
				}
			};
			if (set.dataType === 'jsonp') {
				remote['prepare'] = function(query, settings) {
					settings.dataType = 'jsonp';
					settings.url = settings.url.replace(set.queryVal, query);
					return settings;
				};
			} else {
				remote['wildcard'] = set.queryVal;
			}
			return remote;
		}

		function getQuery(str) {
			if (!$.exist(str, true)) return str;
			str = decodeURIComponent(str);
			return str.substring(str.lastIndexOf(set.queryKey + '=') + (set.queryKey.length + 1), str.lastIndexOf('GET'));
		}

		function displayVal(suggestion) {
			return $.isFunction(set.itemLabel) ? set.itemLabel.call(undefined, suggestion) : $.dataVals(suggestion, set.itemLabel);
		}

		function source(query, sync, async) {
			if (query.length < 1 && set.defaultCall) {
				if ($.isString(set.defaultCall)) {
					query = set.defaultCall;
				}
				else if ($.isArray(set.defaultCall)) {
					sync(_handleSetData(set, set.defaultCall));
					return;
				}
				else if ($.exist(set.defaultCall.data)) {
					sync(_handleSetData(set, set.defaultCall.filter(set, set.defaultCall.data)));
					return;
				}
				else if ($.exist(set.defaultCall.url, true)) {
					$.get(set.defaultCall.url, set.defaultCall.params, function(data) {
						async(_handleSetData(set.defaultCall.filter(set, data)));
						return;
					});
				}
			}

			engine.search(query, sync, async);
		}
	}

	// Returned request URL based on provided parameters
	function _getSetUrl(set) {
		var params = {collection: set.collection};

		if ($.exist(set.format, true)) params['fmt'] = set.format == 'simple' ? 'json' : 'json++';
		if ($.exist(set.alpha, true)) params['alpha'] = set.alpha;
		if ($.exist(set.profile, true)) params['profile'] = set.profile;
		if ($.exist(set.show, true)) params['show'] = set.show;
		if ($.exist(set.sort, true)) params['sort'] = set.sort;
		if ($.isObject(set.param)) params = $.extend(true, {}, params, set.params);

		return set.program + '?' + $.param(params) + '&' + set.queryKey + '=' + set.queryVal;
	}

	// Group results into categories
	function _groupSetData(set, results) {
		var grouped = {'':[]}, i, len;

		if ($.exist(set.groupOrder)) {
			for (i = 0, len = set.groupOrder.length; i < len; i++) {
				grouped[set.groupOrder[i]] = [{label: set.groupOrder[i]}];
			}
		}

		for (i = 0, len = results.length; i < len; i++) {
			if (!$.exist(grouped[results[i][set.itemGroup]])) grouped[results[i][set.itemGroup]] = [{label: results[i][set.itemGroup]}];
			grouped[results[i][set.itemGroup]].push(results[i]);
		}

		results = [];
		$.each(grouped, function(groupName, group) {
			if (group.length > 1) {
				if (!$.exist(groupName, true)) group.splice(0, 1);
				$.merge(results, group);
			}
		});

		return results;
	}

	// Limit number of returned results
	// Trigger grouping them or apply custom callback
	function _handleSetData(set, results) {
		results = results.slice(0, set.show);
		if (set.callback && $.isFunction(set.callback)) results = set.callback.call(undefined, set, results) || [];
		if (!set.group) return results;
		return _groupSetData(set, results);
	}

	function _processSetData(set, suggestion, i, name, query) {
		return $.autocompletion.processSetData(set, suggestion, i, name, query);
	}

	// Adjust columns width depends on columns number
	// If column has assigned CSS "width" property with "!important" declaration, this will be respected
	function _renderSetWidth(menu, classWrapper, className) {
		var cols = 0, colsW = 0, styles, parts, menuW = menu.width();
		className 	 = '.' + className;
		classWrapper = '.' + classWrapper;

		$.each(menu.children(className), function() {
			parts  = $(this).attr('class').split(' ');
			styles = $.cssStyle(classWrapper + ' .' + parts[1]) || $.cssStyle(classWrapper + ' .' + parts.join('.'));

			if (styles.width && styles.width.indexOf('important') && styles.width.indexOf('auto') < 0 && styles.width.indexOf('initial') < 0 && styles.width.indexOf('inherit') < 0) {
				if (styles.width.indexOf('%') > 0) colsW += menuW * parseFloat(styles.width) / 100;
				else colsW += parseFloat(styles.width);
			}
			else if ($.hasContent($(this))) cols++;
		});

		if (cols) {
			menuW -= colsW + 0.5;
			var minW = parseFloat(menu.children(className).css('min-width')), colW = menuW / cols;
			if (minW <= colW) menu.children(className).css('width', colW + 'px');
		}
	}

	// Pre-compile templates using Handlebars
	function _renderSetTemplate(set) {
		_setSetTemplateHeader(set);

		if (!set.template || $.isEmptyObject(set.template)) return {};

		$.each(set.template, function(k, obj) {
			if ($.isObject(obj)) set.template[k] = obj.prop('outerHTML');
		});

		if (set.templateMerge) {
			templateMerge('notFound');
			templateMerge('pending');
		}

		$.each(set.template, function(k, obj) {
			if ($.isString(obj)) set.template[k] = Handlebars.compile(obj);
		});

		return set.template;

		function templateMerge(temp) {
			if (set.template[temp] && $.isString(set.template[temp])) {
				if (set.template.header && $.isString(set.template.header)) set.template[temp] = set.template.header + set.template[temp];
				if (set.template.footer && $.isString(set.template.footer)) set.template[temp] += set.template.footer;
			}
		}
	}

	// Set default template to display column header if column name is defined
	function _setSetTemplateHeader(set) {
		if (!set.template.header && $.exist(set.name, true)) set.template.header = '<h5 class="tt-category">' + set.name + '</h5>';
	}

	// Handle selected item based on "action_t" parameter
	function _selectItem(item, target) {
		if ($.exist(item.extra)) {
			switch(item.extra.action_t) {
				case 'C':
					eval(item.extra.action); break;
				case 'U':
					document.location = item.extra.action; break;
				case 'E':
					target.typeahead('val', item.extra.action); break;
				case undefined:
				case '':
				case 'S':
				case 'Q':
				default:
					formSend(item.value); break;
			}
		} else {
			formSend(item.value);
		}

		function formSend(val) { // Submit form on select
			target.val(val);
			target.closest('form').submit();
		}
	}

	function _getSelectableLabel(item) {
		return $.exist(item.data()) ? item.data().ttSelectableDisplay : item.text();
	}

	/* Handle Typeahead navigation */
	
	// Navigate dropdown list  left - right (switching between columns)
	function _navCursorLR(code, cols, target) {
		if (!$.exist(_navCols.cursor)) return;

		var currCol      = _navCols.cursor.parent(),
			currColIdx   = cols.index(currCol),
			delta        = code == 37 ? -1 : 1,
			nextColItems = getNextColItems(currColIdx),
			cursorIdx    = $(currCol).children('.tt-selectable').index(_navCols.cursor),
			nextCursor   = $.exist(nextColItems[cursorIdx]) ? nextColItems[cursorIdx] : nextColItems[nextColItems.length - 1];

		$(_navCols.cursor).removeClass('tt-cursor');
		_navCols.cursor = $(nextCursor).addClass('tt-cursor');
		target.data().ttTypeahead.input.setInputValue(_getSelectableLabel(_navCols.cursor));

		function getNextColItems(currColIdx) {
			var nextColIdx = code == 37
				? $.exist(cols[currColIdx - 1]) ? currColIdx - 1 : cols.length - 1
				: $.exist(cols[currColIdx + 1]) ? currColIdx + 1 : 0,
				nextColItems = $(cols[nextColIdx]).children('.tt-selectable');

			return $.exist(nextColItems) ? nextColItems : getNextColItems(nextColIdx);
		}
	}

	// Navigate dropdown list  up - down
	function _navCursorUD(code, menu, target) {
		if (!$.exist(menu.find('.tt-cursor'))) {
			_navCols.cursor = code == 38 ? menu.find('.tt-selectable').last() : menu.find('.tt-selectable').first();
			_navCols.cursor.addClass('tt-cursor');
			_navCols.query  = target.val();
			target.data().ttTypeahead.input.setInputValue(_getSelectableLabel(_navCols.cursor));
			return;
		}

		var currCol      = _navCols.cursor.parent(),
			currColItems = $(currCol).children('.tt-selectable');

		if(!$.exist(currColItems)) return;

		var cursorIdx = currColItems.index(_navCols.cursor), delta = code == 38 ? -1 : 1;

		$(_navCols.cursor).removeClass('tt-cursor');

		if (!$.exist(currColItems[cursorIdx + delta])) {
			_navCols.cursor = null;
			target.data().ttTypeahead.input.resetInputValue();
			target.data().ttTypeahead._updateHint();
		}
		else {
			_navCols.cursor = $(currColItems[cursorIdx + delta]).addClass('tt-cursor');
			target.data().ttTypeahead.input.setInputValue(_getSelectableLabel(_navCols.cursor));
		}
	}

	// Debug
	function logDebug(options, input, output, msg) {
		if (!_debug || !window.console) return;

		console.log(msg);
		console.log('Options: ', options);
		console.log('Input: ', input);
		console.log('Output: ', output);
		console.log('--------');
	}

	function logInteraction(options, input, target, event) {
		if (!options.logging || !$.exist(options.interactionLog, true)) return;
		if (!input.dataset || !options.datasets[input.dataset]) return;

		$.ajax({
			dataType: 'jsonp',
			type: 'GET',
			url:  getInteractionUrl(options.datasets[input.dataset], input),
		}).fail(function(qXHR, textStatus, errorThrown) {
			logDebug(options, input, qXHR, 'Interaction log error: ' + textStatus + ' ' + errorThrown);
		});

		function getInteractionUrl(set, suggestion) {
			var params = {
				collection: set.collection,
				type: event,
				partial_query: suggestion.query,
				client_time: new Date().getTime()
			};

			if ($.exist(set.profile, true)) params['profile'] = set.profile;
			if ($.exist(suggestion.extra)) params = $.extend(true, {}, params, suggestion.extra);

			return options.interactionLog + '?' + $.param(params);
		}
	}

	// Generate plugin
	function Plugin() {
		var args = [].slice.call(arguments), option = args.shift();

		return this.each(function () {
			var $this = $(this),
				data    = $this.data('flb.qc'),
				options = $.extend(true, {}, qc.defaults, data || {}, $.isObject(option) && option);

			if (!data && /destroy|hide/.test(option)) return;
			if (!data) $this.data('flb.qc', (data = new qc(this, options)));
			if ($.isString(option) && $.isFunction(data[option])) data[option].apply($this, args);
		});
	}

	$.fn.qc             = Plugin;
	$.fn.qc.Constructor = qc;

	// List of predefnied mapping functions
	$.autocompletion = {
		// Map /s/suggest.json output
		processSetData: function(set, suggestion, i, name, query) {
			var value = suggestion.key, label = suggestion.key;
			if (suggestion.action_t == 'Q') value = suggestion.action;
			if (suggestion.action_t == 'S') value = suggestion.disp;
			if (suggestion.disp_t == 'C') label = eval(suggestion.disp);
			else if (suggestion.disp) label = suggestion.disp;

			return {
				label    : label,
				value    : value,
				extra    : suggestion,
				category : suggestion.cat ? suggestion.cat : '',
				rank     : i + 1,
				dataset	 : name,
				query    : query
			};
		},

		// Map /s/search.json output
		processSetDataFacets: function(set, suggestion, i, name, query) {
			if (i !== 'response' || !$.exist(suggestion.facets)) return;

			var suggestions = [], rank = 1;
			for (var i = 0, leni = suggestion.facets.length; i < leni; i++) {
				var facet = suggestion.facets[i];

				if (!$.exist(facet.allValues)) continue;
				if ($.exist(set.facets.blacklist) && set.facets.blacklist.indexOf(facet.name) > -1) continue;
				if ($.exist(set.facets.whitelist) && set.facets.whitelist.indexOf(facet.name) < 0) continue;

				for (var j = 0, lenj = facet.allValues.length; j < lenj; j++) {
					if ($.exist(set.facets.show) && j > parseInt(set.facets.show) - 1) break;
					if (!facet.allValues[j].count) continue;

					suggestions.push({
						label   : facet.allValues[j].label,
						value   : facet.allValues[j].data,
						extra   : {
							action  : getUrl(facet.allValues[j]),
							action_t: 'U'
						},
						category: facet.name,
						rank    : rank++,
						dataset	: name,
						query   : query
					});
				}
			}

			return suggestions;

			function getUrl(facet) {
				return ($.exist(set.facets.url, true) ? set.facets.url : window.location.origin + window.location.pathname) + facet.selectUrl;
			}
		}
	}

	// Helpers
	$.exist      = function(obj, bString) { if (!$.isDefinied(bString)) bString = false; var obj = bString ? obj : $(obj); return $.isDefinied(obj) && obj != null && ($.isString(obj) ? obj + '' : obj).length > 0; }
	$.hasContent = function(obj) { return obj.html().trim().length ? true : false; }
	$.isDefinied = function(obj) { return typeof(obj) !== 'undefined'; }
	$.isFunction = function(obj) { return typeof(obj) === 'function'; }
	$.isString   = function(obj) { return typeof(obj) === 'string'; }
	$.isObject   = function(obj) { return typeof(obj) === 'object'; }
	$.dataKeys   = function(obj) { return iterateKeys(obj, ''); function iterateKeys(obj, prefix) { return $.map(Object.keys(obj), function(key) { if(obj[key] && $.isObject(obj[key])) return iterateKeys(obj[key], key); else return (prefix ? prefix + '-' + key : key);}); }}
	$.dataVals   = function(obj, key) { var parts = key.split('.'), key = parts.shift(); if (parts.length) { for (var i = 0, len = parts.length; i < len; i++) { obj = obj[key] || {}; key = parts[i]; } } return obj[key]; }
	$.cssStyle	 = function(className) {
		var styleSheets = window.document.styleSheets,  styles = {};
		for(var i = 0, leni = styleSheets.length; i < leni; i++){
			if (styleSheets[i].href && styleSheets[i].href.indexOf(window.location.host) < 0) continue;

			var classes = styleSheets[i].rules || styleSheets[i].cssRules;
			if (!classes) continue;

			for (var j = 0, lenj = classes.length; j < lenj; j++) {
				if (classes[j].selectorText != className) continue;

				var properties = classes[j].style.cssText.split(';');
				for (var k = 0, lenk = properties.length; k < lenk; k++) {
					var part = properties[k].split(':');
					if (part.length == 2) styles[part[0].trim()] = part[1].trim();
				}
			}
		}
		return styles;
	}

}(jQuery));

String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.slice(1); }


Handlebars.registerHelper('replaceComma', function(value){
  var t = value.replace(/,/g, ', ');
  return t;
});
Handlebars.registerHelper('trimString', function(passedString) {
  var theString;
  if ( passedString !== null && passedString.length > 100){
    theString = passedString.substring(0,100) + "...";
  }
  theString.replace(/,/g, ', ');
  return new Handlebars.SafeString(theString);
});

jQuery('#header-search #query').qc({
  program: 'https://search.xavier.edu/s/suggest.json',
  alpha: '0.5',
  show: '10',
  sort: '0',
  length: '3',
  datasets:{
    organic: {
      name: 'Search Suggestions',
      collection: 'xavu-meta',
      profile: '_default',
      show: '5'
    }/*
,
    programs: {
      name: 'Programs',
      collection: 'xavu-programs',
      profile: 'auto-completion',
      show: '3',
      template: {
        suggestion: '<div class="tt-suggestion tt-selectable media"><div class="media-body"><h6>{{extra.disp.title}}</h6><p><em>{{extra.disp.metaData.stencilsCourseLevel}}</em><br />{{{trimString extra.disp.metaData.stencilsCourseDesc}}}...</p></div></div>'
      }
    },
    people: {
      name: 'People',
      collection: 'xavu-people',
      profile: 'auto-completion',
      show: '3',
      template: {
        suggestion: '<div class="media">{{#if extra.disp.metaData.I}}<img src="{{extra.disp.metaData.I}}" alt="{{extra.disp.title}}" />{{/if}}<div class="media-body"><h6>{{extra.disp.metaData.stencilsPeopleFirstName}} {{extra.disp.metaData.stencilsPeopleLastName}}</h6><p><em>{{{replaceComma extra.disp.metaData.stencilsPeoplePosition}}}</em>{{#if extra.disp.metaData.stencilsPeoplePhone}}<br />{{extra.disp.metaData.stencilsPeoplePhone}}{{/if}}</p></div></div>'
      }
    }
*/
  }
});
/**
  * base.sticky.js
  * =======================
  * 
  * Sets the offset for putting the header bar as a fixed nav item
  * when we scroll the page.
  *
  * -----------------------
  * Improvements:
  * 
**/

var h = document.getElementById("header");
var stuck = false;
var stickPoint = getDistance();

function getDistance() {
  var topDist = h.offsetTop;
  return topDist;
}

window.onscroll = function(e) {
  var distance = getDistance() - window.pageYOffset;
  var offset = window.pageYOffset;
  if ( (distance < 0) && !stuck) {
    h.classList.add('header--fixed');
    stuck = true;
  } else if (stuck && (offset <= stickPoint)){
    h.classList.remove('header--fixed');
    stuck = false;
  }
}
/**
  * base.toggles.js
  * =======================
  * 
  * Basic toggle functionality. Uses data-state as a method for
  * CSS targeting for visibility. Very simply, data-state="is-visible" is display:inherit;
  * data-state="is-hidden" is display:none;
  *
  * -----------------------
  * Improvements:
  *  - Hide entities that were open when a new item is clicked
**/
// Toggles the visible state as needed.
function toggleState(elem, stateOne){
  var elem = document.querySelectorAll(elem);
  if ( !elem ) return;
  elem.forEach( function(el){
    el.classList.toggle(stateOne);
  });
};

// Monitors the click events....Grabs the to be toggled item
function toggleStateEvent(event){
  event.preventDefault();
  toggleState(event.target.getAttribute('data-toggle'), 'visible');
  event.target.classList.toggle("on");
}

// Obvi...the event listener.
document.addEventListener('click', toggleStateEvent);