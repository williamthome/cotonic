/**
 * @preserve
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 */
(function (t, e) {
  typeof exports === "object" && typeof module !== "undefined"
    ? e(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], e)
    : (t = t || self, e(t.IncrementalDOM = {}));
})(this, function (t) {
  "use strict";
  var e = "key";
  function o() {
    return e;
  }
  function n(t) {
    e = t;
  }
  function i(t) {
    return t;
  }
  var r = Object.prototype.hasOwnProperty;
  function a() {}
  a.prototype = Object.create(null);
  function u(t, e) {
    return r.call(t, e);
  }
  function l() {
    return new a();
  }
  function v(t, e) {
    while (t.length > e) t.pop();
  }
  function f(t) {
    var e = new Array(t);
    v(e, 0);
    return e;
  }
  var c = { default: "__default" };
  function s(t) {
    if (t.lastIndexOf("xml:", 0) === 0) {
      return "http://www.w3.org/XML/1998/namespace";
    }
    if (t.lastIndexOf("xlink:", 0) === 0) return "http://www.w3.org/1999/xlink";
    return null;
  }
  function d(t, e, n) {
    if (n == null) t.removeAttribute(e);
    else {
      var r = s(e);
      if (r) t.setAttributeNS(r, e, String(n));
      else t.setAttribute(e, String(n));
    }
  }
  function p(t, e, n) {
    t[e] = n;
  }
  function h(t, e, n) {
    if (e.indexOf("-") >= 0) t.setProperty(e, n);
    else t[e] = n;
  }
  function g(t, e, n) {
    var r = t.style;
    if (typeof n === "string") r.cssText = n;
    else {
      r.cssText = "";
      for (var a in n) if (u(n, a)) h(r, a, n[a]);
    }
  }
  function y(t, e, n) {
    var r = typeof n;
    if (r === "object" || r === "function") p(t, e, n);
    else d(t, e, n);
  }
  var m = l();
  m[c.default] = y;
  m["style"] = g;
  function w(t, e, n) {
    var r = m[e] || m[c.default];
    r(t, e, n);
  }
  var x = { nodesCreated: null, nodesDeleted: null };
  var A = function () {
    function t() {
      this.created = [];
      this.deleted = [];
    }
    t.prototype.markCreated = function (t) {
      this.created.push(t);
    };
    t.prototype.markDeleted = function (t) {
      this.deleted.push(t);
    };
    t.prototype.notifyChanges = function () {
      if (x.nodesCreated && this.created.length > 0) {
        x.nodesCreated(this.created);
      }
      if (x.nodesDeleted && this.deleted.length > 0) {
        x.nodesDeleted(this.deleted);
      }
    };
    return t;
  }();
  function O(t) {
    return t.nodeType === 11 || t.nodeType === 9;
  }
  function b(t) {
    return t.nodeType === 1;
  }
  function D(t, e) {
    var n = [];
    var r = t;
    while (r !== e) {
      var a = i(r);
      n.push(a);
      r = a.parentNode;
    }
    return n;
  }
  var _ = typeof Node !== "undefined" && Node.prototype.getRootNode ||
    function () {
      var t = this;
      var e = t;
      while (t) {
        e = t;
        t = t.parentNode;
      }
      return e;
    };
  function C(t) {
    var e = _.call(t);
    return O(e) ? e.activeElement : null;
  }
  function N(t, e) {
    var n = C(t);
    if (!n || !t.contains(n)) return [];
    return D(n, e);
  }
  function S(t, e, n) {
    var r = e.nextSibling;
    var a = n;
    while (a !== null && a !== e) {
      var i = a.nextSibling;
      t.insertBefore(a, r);
      a = i;
    }
  }
  var k = function () {
    function t(t, e, n) {
      this._attrsArr = null;
      this.staticsApplied = false;
      this.nameOrCtor = t;
      this.key = e;
      this.text = n;
    }
    t.prototype.hasEmptyAttrsArr = function () {
      var t = this._attrsArr;
      return !t || !t.length;
    };
    t.prototype.getAttrsArr = function (t) {
      return this._attrsArr || (this._attrsArr = f(t));
    };
    return t;
  }();
  function M(t, e, n, r) {
    var a = new k(e, n, r);
    t["__incrementalDOMData"] = a;
    return a;
  }
  function E(t) {
    return Boolean(t["__incrementalDOMData"]);
  }
  function I(t, e) {
    var n = t.attributes;
    var r = n.length;
    if (!r) return;
    var a = e.getAttrsArr(r);
    for (var i = 0, u = 0; i < r; i += 1, u += 2) {
      var o = n[i];
      var l = o.name;
      var f = o.value;
      a[u] = l;
      a[u + 1] = f;
    }
  }
  function P(t, e) {
    if (t["__incrementalDOMData"]) return t["__incrementalDOMData"];
    var n = b(t) ? t.localName : t.nodeName;
    var r = o();
    var a = b(t) && r != null ? t.getAttribute(r) : null;
    var i = b(t) ? a || e : null;
    var u = M(t, n, i);
    if (b(t)) I(t, u);
    return u;
  }
  function j(t) {
    P(t);
    for (var e = t.firstChild; e; e = e.nextSibling) j(e);
  }
  function T(t, e) {
    return P(t, e);
  }
  function B(t) {
    i(t["__incrementalDOMData"]);
    return T(t).key;
  }
  function K(t) {
    t["__incrementalDOMData"] = null;
    for (var e = t.firstChild; e; e = e.nextSibling) K(e);
  }
  function L(t, e) {
    if (t === "svg") return "http://www.w3.org/2000/svg";
    if (t === "math") return "http://www.w3.org/1998/Math/MathML";
    if (e == null) return null;
    if (T(e).nameOrCtor === "foreignObject") return null;
    return e.namespaceURI;
  }
  function R(t, e, n, r) {
    var a;
    if (typeof n === "function") a = new n();
    else {
      var i = L(n, e);
      if (i) a = t.createElementNS(i, n);
      else a = t.createElement(n);
    }
    M(a, n, r);
    return a;
  }
  function z(t) {
    var e = t.createTextNode("");
    M(e, "#text", null);
    return e;
  }
  function U(t, e, n, r, a) {
    return e == n && r == a;
  }
  var V = null;
  var W = null;
  var X = null;
  var q = null;
  var F = [];
  var G = U;
  var H = [];
  var J = [];
  function Q() {
    return H;
  }
  function Y() {
    return J;
  }
  function Z(t, e, n) {
    var r = T(t, n);
    return G(t, e, r.nameOrCtor, n, r.key);
  }
  function $(t, e, n) {
    if (!t) return null;
    var r = t;
    do {
      if (Z(r, e, n)) return r;
    } while (n && (r = r.nextSibling));
    return null;
  }
  function tt(t, e, n) {
    var r = t;
    var a = e;
    while (a !== n) {
      var i = a.nextSibling;
      r.removeChild(a);
      V.markDeleted(a);
      a = i;
    }
  }
  function et() {
    if (W) return W.nextSibling;
    else return X.firstChild;
  }
  function nt() {
    X = W;
    W = null;
  }
  function rt() {
    tt(X, et(), null);
    W = X;
    X = X.parentNode;
  }
  function at() {
    W = et();
  }
  function it(t, e) {
    var n;
    if (t === "#text") n = z(q);
    else n = R(q, X, t, e);
    V.markCreated(n);
    return n;
  }
  function ut(t, e) {
    at();
    var n = $(W, t, e);
    var r = n || it(t, e);
    if (r === W) return;
    if (F.indexOf(r) >= 0) S(X, r, W);
    else X.insertBefore(r, W);
    W = r;
  }
  function ot(t, e) {
    ut(t, e);
    nt();
    return X;
  }
  function lt() {
    rt();
    return W;
  }
  function ft() {
    ut("#text", null);
    return W;
  }
  function ct() {
    return X;
  }
  function vt() {
    return et();
  }
  function st() {
    W = X.lastChild;
  }
  function dt(s, t) {
    if (t === void 0) t = {};
    var e = t.matches, d = e === void 0 ? U : e;
    var n = function (t, e, n) {
      var r = V;
      var a = q;
      var i = F;
      var u = H;
      var o = J;
      var l = W;
      var f = X;
      var c = G;
      q = t.ownerDocument;
      V = new A();
      G = d;
      H = [];
      J = [];
      W = null;
      X = t.parentNode;
      F = N(t, X);
      try {
        var v = s(t, e, n);
        return v;
      } finally {
        V.notifyChanges();
        q = a;
        V = r;
        G = c;
        H = u;
        J = o;
        W = l;
        X = f;
        F = i;
      }
    };
    return n;
  }
  function pt(t) {
    return dt(function (t, e, n) {
      W = t;
      nt();
      e(n);
      rt();
      return t;
    }, t);
  }
  function ht(t) {
    return dt(function (t, e, n) {
      var r = { nextSibling: t };
      W = r;
      e(n);
      if (X) tt(X, et(), t.nextSibling);
      return r === W ? null : W;
    }, t);
  }
  var gt = pt();
  var yt = ht();
  var mt = [];
  var wt = 0;
  function xt(t, e, n, r) {
    mt.push(t);
    mt.push(e);
    mt.push(n);
    mt.push(r);
  }
  function At() {
    var t = wt;
    var e = mt.length;
    wt = e;
    for (var n = t; n < e; n += 4) {
      var r = mt[n];
      r(mt[n + 1], mt[n + 2], mt[n + 3]);
    }
    wt = t;
    v(mt, t);
  }
  var Ot = l();
  function bt(t, e, n, r) {
    var a = !t.length;
    var i = 0;
    for (; i < e.length; i += 2) {
      var u = e[i];
      if (a) t[i] = u;
      else if (t[i] !== u) break;
      var o = e[i + 1];
      if (a || t[i + 1] !== o) {
        t[i + 1] = o;
        xt(r, n, u, o);
      }
    }
    if (i < e.length || i < t.length) {
      var l = i;
      for (i = l; i < t.length; i += 2) Ot[t[i]] = t[i + 1];
      for (i = l; i < e.length; i += 2) {
        var f = e[i];
        var o = e[i + 1];
        if (Ot[f] !== o) xt(r, n, f, o);
        t[i] = f;
        t[i + 1] = o;
        delete Ot[f];
      }
      v(t, e.length);
      for (var c in Ot) {
        xt(r, n, c, undefined);
        delete Ot[c];
      }
    }
    At();
  }
  var Dt = 3;
  var _t = l();
  function Ct(t, e) {
    var n = Y();
    var r = e.getAttrsArr(n.length);
    bt(r, n, t, w);
    v(n, 0);
  }
  function Nt(t, e, n) {
    if (e.staticsApplied) return;
    e.staticsApplied = true;
    if (!n || !n.length) return;
    if (e.hasEmptyAttrsArr()) {
      for (var r = 0; r < n.length; r += 2) w(t, n[r], n[r + 1]);
      return;
    }
    for (var r = 0; r < n.length; r += 2) _t[n[r]] = r + 1;
    var a = e.getAttrsArr(0);
    var i = 0;
    for (var r = 0; r < a.length; r += 2) {
      var u = a[r];
      var o = a[r + 1];
      var l = _t[u];
      if (l) {
        if (n[l] === o) delete _t[u];
        continue;
      }
      a[i] = u;
      a[i + 1] = o;
      i += 2;
    }
    v(a, i);
    for (var f in _t) {
      w(t, f, n[_t[f]]);
      delete _t[f];
    }
  }
  function St(t, e, n) {
    var r = Q();
    r[0] = t;
    r[1] = e;
    r[2] = n;
  }
  function kt(t) {
    var e = Q();
    e[1] = t;
  }
  function Mt(t, e) {
    var n = Y();
    n.push(t);
    n.push(e);
  }
  function Et() {
    var t = Q();
    var e = ot(t[0], t[1]);
    var n = T(e);
    Nt(e, n, t[2]);
    Ct(e, n);
    v(t, 0);
    return e;
  }
  function It(t, e, n) {
    var r = [];
    for (var a = 3; a < arguments.length; a++) r[a - 3] = arguments[a];
    St(t, e, n);
    for (var i = Dt; i < arguments.length; i += 2) {
      Mt(arguments[i], arguments[i + 1]);
    }
    return Et();
  }
  function Pt() {
    var t = ct();
    var e = T(t);
    Ct(t, e);
  }
  function jt(t) {
    var e = ct();
    var n = T(e);
    Nt(e, n, t);
  }
  function Tt(t) {
    var e = lt();
    return e;
  }
  function Bt(t, e, n) {
    var r = [];
    for (var a = 3; a < arguments.length; a++) r[a - 3] = arguments[a];
    It.apply(null, arguments);
    return Tt(t);
  }
  function Kt(t) {
    var e = [];
    for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    var r = ft();
    var a = T(r);
    if (a.text !== t) {
      a.text = t;
      var i = t;
      for (var u = 1; u < arguments.length; u += 1) {
        var o = arguments[u];
        i = o(i);
      }
      if (r.data !== i) r.data = i;
    }
    return r;
  }
  t.applyAttr = d;
  t.applyProp = p;
  t.attributes = m;
  t.alignWithDOM = ut;
  t.close = lt;
  t.createPatchInner = pt;
  t.createPatchOuter = ht;
  t.currentElement = ct;
  t.currentPointer = vt;
  t.open = ot;
  t.patch = gt;
  t.patchInner = gt;
  t.patchOuter = yt;
  t.skip = st;
  t.skipNode = at;
  t.setKeyAttributeName = n;
  t.clearCache = K;
  t.getKey = B;
  t.importNode = j;
  t.isDataInitialized = E;
  t.notifications = x;
  t.symbols = c;
  t.applyAttrs = Pt;
  t.applyStatics = jt;
  t.attr = Mt;
  t.elementClose = Tt;
  t.elementOpen = It;
  t.elementOpenEnd = Et;
  t.elementOpenStart = St;
  t.elementVoid = Bt;
  t.key = kt;
  t.text = Kt;
  Object.defineProperty(t, "__esModule", { value: true });
});

/* just a separator file */
/**
 * Copyright 2018-2021 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var cotonic = cotonic || {};

/* Current cotonic version */
cotonic.VERSION = "1.1.2";

(function(cotonic) {
    cotonic.config = cotonic.config || {};

    /* Get the data-base-worker-src from the script tag that loads
     * cotonic on this page.
     */
    (function() {
        const currentScript = document.currentScript || (function() {
            const scripts = document.getElementsByTagName("script");
            return scripts[scripts.length - 1];
        })();

        if(currentScript && currentScript.getAttribute("data-base-worker-src")) {
            load_config_defaults({base_worker_src:
                currentScript.getAttribute("data-base-worker-src")});
        } else {
            load_config_defaults({base_worker_src:
                "/lib/cotonic/cotonic-worker-bundle.js?v=1"})
        }
    })();

    let next_worker_id = 1;
    let workers = {};
    let named_worker_ids = {};
    let receive_handler = null;

    /**
     * Load config defaults into the cotonic.config object. Modules
     * can call this function to add their default config settings
     */
    function load_config_defaults(options) {
        for(let key in options) {
            if(!cotonic.config.hasOwnProperty(key)) {
                cotonic.config[key] = options[key];
            }
        }
    }

    /**
     * Handle incoming messages from workers
     */
    function message_from_worker(wid, msg) {
        var data = msg.data;

        if(receive_handler) {
            receive_handler(data, wid);
        } else {
            console.log("Unhandled message from worker", wid, msg);
        }
    }

    /**
     * Handle error from worker
     */
    function error_from_worker(wid, e) {
        // TODO, actually handle the error
        console.log("Error from worker", wid, e);
    }

    /**
     * Start a worker
     */
    function spawn(url, args) {
        if(!cotonic.config.base_worker_src){
            throw("Can't spawn worker, no data-base-worker-src attribute set.");
        }
        return spawn_named("", url, cotonic.config.base_worker_src, args);
    }

    /**
     * Start a named worker - named workers are unique
     * Use "" or 'undefined' for a nameless worker.
     */
    function spawn_named(name, url, base, args) {
        // Return the existing worker_id if already running.
        if (name && named_worker_ids[name]) {
            return named_worker_ids[name];
        }
        base = base || cotonic.config.base_worker_src;
        if(!base) {
            throw("Can't spawn worker, no data-base-worker-src attribute set.");
        }
        const worker_id = next_worker_id++;
        const worker = new Worker(base, {name: name?name:worker_id.toString()});

        worker.postMessage(["init", {
            url: ensure_hostname(url),
            args: args,
            wid: worker_id,
            name: name,
            location: {
                origin: window.location.origin,
                protocol: window.location.protocol,
                hostname: window.location.hostname,
                host: window.location.host,
                pathname: window.location.pathname,
                search: window.location.search,
                hash: window.location.hash
            },
        }]);

        worker.name = name;
        worker.onmessage = message_from_worker.bind(this, worker_id);
        worker.onerror = error_from_worker.bind(this, worker_id);

        workers[worker_id] = worker;
        if (name) {
            named_worker_ids[name] = worker_id;
        }
        return worker_id;
    }

    function ensure_hostname(url) {
        if (!url.startsWith("http:") && !url.startsWith('https:')) {
            if (!url.startsWith("/")) {
                url = "/" + url;
            }
            url = window.location.protocol + "//" + window.location.host + url;
        }
        return url;
    }

    /**
     * Send a message to a web-worker
     */
    function send(wid, message) {
        if(wid === 0) {
            setTimeout(function() { handler(message, wid) }, 0);
            return;
        }

        let worker = workers[wid];
        if(worker) {
            worker.postMessage(message);
        }
    }

    /**
     * Terminate a web-worker
     */
    function exit(wid) {
        if(wid === 0) return;

        const worker = workers[wid];
        if(!worker) return;

        if (worker.name) {
            delete named_worker_ids[worker.name];
        }
        worker.terminate();
        delete workers[wid];
    }

    /**
     * Lookup the wid of a named worker
     */
    function whereis(name) {
        if (name && named_worker_ids[name]) {
            return named_worker_ids[name];
        }
        return undefined;
    }

    function receive(handler) {
        receive_handler = handler;
    }

    /**
     * Clean the sessionStorage on open of new window.
     * Keep keys that are prefixed with "persist-".
     */
    function cleanupSessionStorage() {
        if (!window.name || window.name == "null") {
            window.name = makeid(32);
        }
        if (sessionStorage.getItem('windowName') != window.name) {
            let keys = Object.keys(sessionStorage);
            for (let i in keys) {
                let k = keys[i];
                if (!k.match(/^persist-/)) {
                    sessionStorage.removeItem(k);
                }
            }
        }
        sessionStorage.setItem('windowName', window.name);
    }

    /**
     * Generate a random id of length characters
     */
    function makeid(length) {
        let result     = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let len        = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * len));
        }
        return result;
    }

    if (!cotonic.ready) {
        cotonic.ready = new Promise(function(resolve) { cotonic.readyResolve = resolve; });
    }

    cleanupSessionStorage();

    cotonic.load_config_defaults = load_config_defaults;

    cotonic.spawn = spawn;
    cotonic.spawn_named = spawn_named;
    cotonic.whereis = whereis;
    cotonic.exit = exit;

    cotonic.send = send;
    cotonic.receive = receive;
}(cotonic));
/**
 * Copyright 2017 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cotonic = cotonic || {};

(function(cotonic, idom) {
"use strict";

    function render(tokens) {
        function renderToken(token) {
            if(token.type == "text") {
                return idom.text(token.data);
            }

            if(token.type == "close") {
                var currentTag = idom.currentElement().tagName;

                /* Safety measure. If the tag of the current element does not match, doc
                 * not close the element via IncrementalDOM
                 */
                if (currentTag.toLowerCase() != token.tag.toLowerCase()) {
                    return;
                }

                return idom.elementClose(token.tag);
            }

            if(token.type == "void") {
                return idom.elementVoid.apply(null,  [token.tag, token.hasOwnProperty("key")?token.key:null, null].concat(token.attributes));
            }

            if(token.type == "open") {
                return idom.elementOpen.apply(null,  [token.tag, token.hasOwnProperty("key")?token.key:null, null].concat(token.attributes));
            }
        }

        for(let i=0; i < tokens.length; i++) {
            renderToken(tokens[i]);
        }
    }

    function patch(patch, element, HTMLorTokens) {
        let tokens;

        if(Array.isArray(HTMLorTokens)) {
            tokens = HTMLorTokens;
        } else {
            tokens = cotonic.tokenizer.tokens(HTMLorTokens);
        }

        patch(element, function() { render(tokens); });
    }

    cotonic.idom = cotonic.idom || {};

    cotonic.idom.patchInner = patch.bind(this, idom.patch);
    cotonic.idom.patchOuter = patch.bind(this, idom.patchOuter);
}(cotonic, IncrementalDOM));
/**
 * Copyright 2016, 2017 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Tokenizer based on the erlang html tokenizer in https://github.com/mochi/mochiweb

var cotonic = cotonic || {};

(function (cotonic) {
"use strict";
    const TAB = 9,
          NEWLINE = 10,
          SPACE = 32,
          RETURN = 13,

          DASH = 45,
          LT = 60,
          GT = 62,

          SLASH = 47,
          UNDERSCORE = 95,
          AMPERSAND = 38,
          EQUALS = 61,
          QUESTION_MARK = 63,
          COLON = 59,

          QUOTE = 34,
          SQUOTE = 39,

          CHAR_A = 65,
          CHAR_Z = 90,

          CHAR_a = 97,
          CHAR_z = 122,

          DONE = 0,
          SCRIPT = 1,
          TEXTAREA = 2,
          NORMAL = 3;


    function TokenBuilder(acc) {
        /*
         * Token builder functions, this allows one to customize the tokens being generated.
         * Or call incrementalDOM directly during tokenization
         */

        function addKey(token, attributes) {
            for(let i=0; i < attributes.length; i = i + 2) {
                if(attributes[i] === "key") {
                    token.key = attributes[i+1];
                    break;
                }
            }
        }

        this.elementOpen = function (tag, attributes) {
            const t = { type: "open", tag: tag, attributes: attributes };
            addKey(t, attributes);
            acc.push(t);
        };

        this.elementVoid = function (tag, attributes) {
            const t = { type: "void", tag: tag, attributes: attributes };
            addKey(t, attributes);
            acc.push(t);
        };

        this.elementClose = function (tag) {
            acc.push({ type: "close", tag: tag });
        };

        this.processingInstruction = function (tag, attributes) {
            acc.push({ type: "pi", tag: tag, attributes: attributes });
        };

        this.doctype = function (attributes) {
            acc.push({ type: "doctype", attributes: attributes });
        };

        this.comment = function (data) {
            acc.push({ type: "comment", data: data });
        };

        this.text = function (data) {
            acc.push({ type: "text", data: data });
        };

        this.result = acc;
    }

    /*
     * Decoder State
     */
    function Decoder(builder) {
        this.line = 1;
        this.column = 1;
        this.offset = 0;

        this.builder = builder;

        this.adv_col = function (n) {
            this.column = this.column + n;
            this.offset = this.offset + n;
            return this;
        };

        this.inc_col = function () {
            this.column += 1;
            this.offset += 1;

            return this;
        };

        this.inc_line = function () {
            this.line += 1;
            this.column = 1;
            this.offset += 1;

            return this;
        };

        this.inc_char = function (c) {
            if (c === NEWLINE) {
                this.inc_line();
            } else {
                this.inc_col();
            }
            return this;
        };
    }

    let tokens = function (data, tokenBuilder) {
        if (tokenBuilder === undefined) {
            tokenBuilder = new TokenBuilder([]);
        }

        let decoder = new Decoder(tokenBuilder);
        tokens3(data, tokenBuilder, decoder);
        return tokenBuilder.result;
    };

    function tokens3(data, builder, decoder) {
        let cont=true;

        while (cont) {
            if (data.length <= decoder.offset) {
                return;
            }

            let rv = tokenize(data, builder, decoder);

            if (rv === DONE) {
                return;
            } else if (rv === NORMAL) {
                continue;
            } else if (rv === SCRIPT) {
                tokenize_script(data, decoder);
            } else if (rv === TEXTAREA) {
                tokenize_textarea(data, decoder);
            } else {
                throw "internal_error";
            }
        }
    }

    function tokenize(data, builder, d) {
        let tag, attributes, text_data, has_slash,
            c0, c1, c2, c3, c4, c5, c6, c7, c8;

        c0 = data.charAt(d.offset);
        if (c0 === undefined)
            return DONE;

        c1 = data.charAt(d.offset + 1);
        c2 = data.charAt(d.offset + 2);
        c3 = data.charAt(d.offset + 3);

        if (c0 === "<" && c1 === "!" && c2 === "-" && c3 === "-")
            return tokenize_comment(data, d.adv_col(4));

        c4 = data.charAt(d.offset + 4);
        c5 = data.charAt(d.offset + 5);
        c6 = data.charAt(d.offset + 6);
        c7 = data.charAt(d.offset + 7);
        c8 = data.charAt(d.offset + 8);

        if (c0 === "<" && c1 === "!" && c2 === "D" && c3 === "O" && c4 === "C"
            && c5 === "T" && c6 === "Y" && c7 === "P" && c8 === "E")
            return tokenize_doctype(data, d.adv_col(10));

        if (c0 === "<" && c1 === "!" && c2 === "d" && c3 === "o" && c4 === "c"
            && c5 === "t" && c6 === "y" && c7 === "p" && c8 === "e")
            return tokenize_doctype(data, d.adv_col(10));

        if (c0 === "<" && c1 === "!" && c2 === "[" && c3 === "C" && c4 === "D"
            && c5 === "A" && c6 === "T" && c7 === "A" && c8 === "[")
            return tokenize_cdata(data, d.adv_col(9));

        if (c0 === "<" && c1 === "?") {
            tag = tokenize_literal(data, d.adv_col(2), "tag");
            attributes = tokenize_attributes(data, d);
            find_qgt(data, d);

            d.builder.processingInstruction(tag.value, attributes.value);

            return NORMAL;
        }

        if (c0 === "&") {
            text_data = tokenize_charref(data, d.inc_col());
            builder.text(text_data.value);
            return NORMAL;
        }

        // end-tag
        if (c0 === "<" && c1 === "/") {
            tag = tokenize_literal(data, d.adv_col(2), "tag");
            has_slash = find_gt(data, d);

            builder.elementClose(tag.value);
            return NORMAL;
        }

        // data
        if (c0 === "<" && (is_whitespace(data.codePointAt(d.offset + 1))
            || !is_start_literal_safe(data.codePointAt(d.offset + 1)))) {
            // we are not doing strict html
            text_data = tokenize_data(data, d.inc_col(1));
            builder.text("<" + text_data.value);

            return NORMAL;
        }

        // open tag
        if (c0 === "<") {
            tag = tokenize_literal(data, d.inc_col(), "tag");
            attributes = tokenize_attributes(data, d);
            has_slash = find_gt(data, d);

            if (has_slash.value || is_singleton(tag.value)) {
                builder.elementVoid(tag.value, attributes.value);
            } else {
                builder.elementOpen(tag.value, attributes.value);
            }

            if (tag.value === "textarea") return TEXTAREA;
            if (tag.value === "script") return SCRIPT;

            return NORMAL;
        }

        // data
        text_data = tokenize_data(data, d);
        builder.text(text_data.value);

        return NORMAL;
    }

    function tokenize_textarea(data, d) {
        let cont=true, offsetStart = d.offset, lt, slash, n;

        while (cont) {
            lt = data.codePointAt(d.offset);
            if (lt === undefined) {
                if (offsetStart !== d.offset) d.builder.text(data.slice(offsetStart, d.offset));
                return;
            }

            lookahead: {
                if (lt !== LT) break lookahead;
                slash = data.codePointAt(d.offset + 1);
                if (slash !== SLASH) break lookahead;
                n = data[d.offset + 2];
                if (!(n === "t" || n === "T")) break lookahead;
                n = data[d.offset + 3];
                if (!(n === "e" || n === "E")) break lookahead;
                n = data[d.offset + 4];
                if (!(n === "x" || n === "X")) break lookahead;
                n = data[d.offset + 5];
                if (!(n === "t" || n === "T")) break lookahead;
                n = data[d.offset + 6];
                if (!(n === "a" || n === "A")) break lookahead;
                n = data[d.offset + 7];
                if (!(n === "r" || n === "R")) break lookahead;
                n = data[d.offset + 8];
                if (!(n === "e" || n === "E")) break lookahead;
                n = data[d.offset + 9];
                if (!(n === "a" || n === "A")) break lookahead;

                n = data.codePointAt(d.offset + 10);
                if (is_probable_close(n)) {
                    if (offsetStart !== d.offset) d.builder.text(data.slice(offsetStart, d.offset));
                    return;
                }
            }

            d.inc_char(lt);
        }
    }


    function tokenize_script(data, d) {
        let cont=true, offsetStart = d.offset, lt, slash, n;

        while (cont) {
            lt = data.codePointAt(d.offset);
            if (lt === undefined) {
                if (offsetStart !== d.offset) d.builder.text(data.slice(offsetStart, d.offset));
                return;
            }

            lookahead: {
                if (lt !== LT) break lookahead;
                slash = data.codePointAt(d.offset + 1);
                if (slash !== SLASH) break lookahead;
                n = data[d.offset + 2];
                if (!(n === "s" || n === "S")) break lookahead;
                n = data[d.offset + 3];
                if (!(n === "c" || n === "C")) break lookahead;
                n = data[d.offset + 4];
                if (!(n === "r" || n === "R")) break lookahead;
                n = data[d.offset + 5];
                if (!(n === "i" || n === "I")) break lookahead;
                n = data[d.offset + 6];
                if (!(n === "p" || n === "P")) break lookahead;
                n = data[d.offset + 7];
                if (!(n === "t" || n === "T")) break lookahead;

                n = data.codePointAt(d.offset + 8);
                if (is_probable_close(n)) {
                    if (offsetStart !== d.offset) d.builder.text(data.slice(offsetStart, d.offset));
                    return;
                }
            }

            d.inc_char(lt);
        }
    }

    /*
     * Tokenizeirs
     */

    function tokenize_doctype(data, d) {
        let c, acc = [], word, cont=true;

        while (cont) {
            c = data.codePointAt(d.offset);

            if (c === undefined || c === GT) {
                if (c === GT) d.inc_col();

                d.builder.doctype(acc);
                return NORMAL;
            }

            if (is_whitespace(c)) {
                d.inc_char(c);
                continue;
            }

            word = tokenize_word_or_literal(data, d);
            acc.push(word.value);
        }
    }

    function tokenize_comment(data, d) {
        let offsetStart = d.offset, cont=true;

        while (cont) {
            let c1 = data.codePointAt(d.offset);
            let c2 = data.codePointAt(d.offset + 1);
            let c3 = data.codePointAt(d.offset + 2);

            if (c1 === DASH && c2 === DASH && c3 === GT) {
                d.builder.comment(data.slice(offsetStart, d.offset));
                d.adv_col(3);

                return NORMAL;
            }

            if (c1 === undefined) {
                d.builder.comment(data.slice(offsetStart, d.offset));
                return NORMAL;
            }

            d.inc_col(c1);
        }
    }

    function tokenize_cdata() {
        throw "Not implemented";
    }

    function tokenize_word_or_literal(data, d) {
        let c = data.codePointAt(d.offset);

        if (c === QUOTE || c === SQUOTE)
            return tokenize_word(data, c, d.inc_col());

        if (!is_whitespace(c)) {
            return tokenize_literal(data, d, "tag");
        }

        throw "inconsistent";
    }

    function tokenize_word(data, quote, d) {
        let acc = [], i=0, cont=true;

        while (cont) {
            let c = data.codePointAt(d.offset);
            if (c === undefined) {
                return value(acc.join(""), d);
            }

            if (c === quote) {
                d.inc_col();
                return value(acc.join(""), d);
            }

            if (c === AMPERSAND) {
                let charref = tokenize_charref(data, d.inc_col());
                acc[i++] = charref.value;
            }

            acc[i++] = data[d.offset];
            d.inc_char(c);
        }
    }

    function tokenize_data(data, d) {
        let offsetStart = d.offset, cont=true;

        while (cont) {
            let c = data.codePointAt(d.offset);
            if (c === undefined || c === LT || c === AMPERSAND) {
                return value(data.slice(offsetStart, d.offset), d);
            }

            d.inc_char(c);
        }
    }

    function tokenize_literal(data, d, type) {
        let literal = [], i=0, cont=true, c = data.codePointAt(d.offset);

        // Handle case where tokenize_literal would consume
        // 0 chars. http://github.com/mochi/mochiweb/pull/13
        if (c === GT || c === SLASH || c === EQUALS) {
            return value(data.charAt(d.offset), d.inc_col());
        }

        while (cont) {
            c = data.codePointAt(d.offset);

            if (c === AMPERSAND) {
                charref = tokenize_charref(data, d.inc_col());
                literal[i++] = charref.value;
                continue;
            }

            if(c !== undefined)  {
                if (!((is_whitespace(c) || (c === GT) || (c === SLASH) || (c === EQUALS)))) {
                    literal[i++] = data[d.offset];
                    d.inc_col();
                    continue;
                }
            }

            literal = literal.join("");
            if (type === "tag") {
                literal = tokenize_tag(literal);
            } else if (type === "attribute") {
                literal = tokenize_attribute_name(literal);
            }

            return value(literal, d);
        }
    }

    function tokenize_attributes(data, d) {
        let cont=true, attributes = [], attribute, attribute_value;

        while (cont) {
            let c = data.codePointAt(d.offset);

            if (c === undefined)
                return value(attributes, d);

            if (c === GT || c === SLASH)
                return value(attributes, d);

            if (c === QUESTION_MARK && data.codePointAt(d.offset + 1) === GT) {
                return value(attributes, d);
            }

            if (is_whitespace(c)) {
                d.inc_char(c);
                continue;
            }

            attribute = tokenize_literal(data, d, "attributes");
            attribute_value = tokenize_attr_value(attribute.value, data, d);

            attributes.push(tokenize_attribute_name(attribute.value));
            attributes.push(attribute_value.value);
        }
    }

    function find_gt(data, d) {
        let has_slash = false, c, cont=true;

        while (cont) {
            c = data.codePointAt(d.offset);

            if (c === SLASH) {
                has_slash = true;
                d.inc_col();
                continue;
            }

            if (c === GT) {
                return value(has_slash, d.inc_col());
            }

            if (c === undefined) {
                return value(has_slash, d);
            }

            d.inc_char(c);
        }
    }

    function find_qgt(data, d) {
        let cont = true, offsetStart = d.offset, c1, c2;

        while (cont) {
            c1 = data.codePointAt(d.offset);

            if (c1 === undefined) {
                value(data.slice(offsetStart, d.offset), d);
            }

            c2 = data.codePointAt(d.offset + 1);

            if (c1 === QUESTION_MARK && c2 === GT) {
                return value(data.slice(offsetStart, d.offset), d.adv_col(2));
            }

            if (c1 === GT) {
                d.inc_col();
                continue;
            }

            if (c1 === SLASH && c2 === GT) {
                d.adv_col(2);
                continue;
            }

            // Should not be reached. Tokenize attributes takes care of this.
            throw "internal_error";
        }
    }

    function tokenize_attr_value(key, data, d) {
        let c;

        skip_whitespace(data, d);

        c = data.codePointAt(d.offset);

        if (c === EQUALS) {
            return tokenize_quoted_or_unquoted_attr_value(data, d.inc_col());
        }

        return value(key, d);
    }

    function tokenize_quoted_or_unquoted_attr_value(data, d) {
        let c;

        c = data.codePointAt(d.offset);
        if (c === undefined)
            return value("", d);


        if (c === QUOTE || c === SQUOTE) {
            return tokenize_quoted_attr_value(data, c, d.inc_col());
        }

        return tokenize_unquoted_attr_value(data, d);
    }

    function tokenize_quoted_attr_value(data, start_quote, d) {
        let v = [], i=0, cont = true;

        while (cont) {
            let c = data.codePointAt(d.offset);

            if (c === undefined) {
                return value(v.join(""), d);
            }

            if (c === AMPERSAND) {
                let charref = tokenize_charref(data, d.inc_col());

                v[i++] = charref.value;
                continue;
            }

            if (c === start_quote) { // Found the closing quote
                return value(v.join(""), d.inc_col());
            }

            v[i++] = data[d.offset];

            d.inc_char(c);
        }
    }

    function tokenize_unquoted_attr_value(data, d) {
        let v = [], i=0, cont = true;

        while (cont) {
            let c = data.codePointAt(d.offset);

            if (c === undefined) {
                return value(v.join(""), d);
            }

            if (c === AMPERSAND) {
                let charref = tokenize_charref(data, d.inc_col());
                v[i++] = charref.value;
                continue;
            }

            if (c === SLASH) {
                return value(v.join(""), d);
            }

            if (is_probable_close(c)) {
                return value(v.join(""), d);
            }

            v[i++] = data[d.offset];

            d.inc_col();
        }
    }

    function tokenize_tag(tag) {
        let ltag = tag.toLowerCase();
        if (is_html_tag(ltag)) return ltag;

        return tag;
    }

    function tokenize_attribute_name(name) {
        let lname = name.toLowerCase();
        if (is_html_attr(lname)) return lname;

        return name;
    }

    function tokenize_charref(data, d) {
        let column = d.column, line = d.line, offset = d.offset;

        try {
            return tokenize_charref1(data, d);
        } catch (err) {
            if (err !== "invalid_charref") throw err;

            // Reset the offset;
            d.offset = offset;
            d.line = line;
            d.column = column;

            return value("&", d);
        }
    }

    function tokenize_charref1(data, d) {
        let cont = true, offsetStart = d.offset, u;

        while (cont) {
            let c = data.codePointAt(d.offset);

            if (c === undefined)
                throw "invalid_charref";

            if (is_whitespace(c) || c === QUOTE || c === SQUOTE || c === SLASH
                || c === LT || c === GT || c === AMPERSAND) {

                u = charref(data.slice(offsetStart, d.offset));
                if (u === null) {
                    // Not a charref, use as-is
                    u = data.slice(offsetStart - 1, d.offset);
                }

                return value(u, d);
            }

            if (c === COLON) {
                u = charref(data.slice(offsetStart, d.offset));
                if (u === null) {
                    throw "invalid_charref";
                } else {
                    return value(u, d.inc_col());
                }
            }

            d.inc_col();
        }
    }

    function is_probable_close(c) {
        if (c === GT)
            return true;

        return is_whitespace(c);
    }

    function skip_whitespace(data, d) {
        let cont=true;

        while (cont) {
            let c = data.codePointAt(d.offset);
            if (is_whitespace(c)) {
                d.inc_char(c);
            }

            cont = false;
        }
    }

    function is_whitespace(c) {
        return (c === SPACE) || (c === NEWLINE) || (c === TAB) || (c === RETURN);
    }

    function is_start_literal_safe(c) {
        return (c >= CHAR_A && c <= CHAR_Z)
            || (c >= CHAR_a && c <= CHAR_z)
            || (c === UNDERSCORE);
    }

    function is_html_tag(tag) {
        return html_tags.hasOwnProperty(tag);
    }

    function is_html_attr(name) {
        return html_attrs.hasOwnProperty(name);
    }

    function is_singleton(tag) {
        let v = html_tags[tag];

        if (v === undefined)
            return false;

        return v;
    }

    function value(val, line, column, offset) {
        return { value: val, line: line, column: column, offset: offset };
    }

    // When an element is in the table it is a html tag, the boolean value
    // indicates wether the element is a sintleton tag.
    let html_tags = {
        // A
        a: false,
        abbr: false,
        acronym: false,
        address: false,
        applet: false,
        area: true,
        article: false,
        aside: false,
        audio: false,
        // B 
        b: false,
        base: true,
        basefont: false,
        bdi: false,
        bdo: false,
        bgsound: false,
        big: false,
        blink: false,
        blockquote: false,
        body: false,
        br: true,
        button: false,
        // C
        canvas: false,
        caption: false,
        center: false,
        cite: false,
        code: false,
        col: true,
        colgroup: false,
        command: true,
        content: false,
        // D
        data: false,
        datalist: false,
        dd: false,
        decorator: false,
        del: false,
        details: false,
        dfn: false,
        dir: false,
        div: false,
        dl: false,
        dt: false,
        // E
        element: true,
        em: false,
        embed: true,
        // F
        fieldset: false,
        figcaption: false,
        figure: false,
        font: false,
        footer: false,
        form: false,
        frame: false,
        frameset: false,
        // G H
        h1: false,
        h2: false,
        h3: false,
        h4: false,
        h5: false,
        h6: false,
        head: false,
        header: false,
        hgroup: false,
        hr: true,
        html: false,
        // I
        i: false,
        iframe: false,
        img: true,
        input: true,
        ins: false,
        isindex: false,
        // J K
        kbd: false,
        keygen: false,
        // L
        label: false,
        legend: false,
        li: false,
        link: true,
        listing: false,
        // M
        main: false,
        map: false,
        mark: false,
        marquee: false,
        menu: false,
        menuitem: false,
        meta: true,
        meter: false,
        // N
        nav: false,
        nobr: false,
        noframes: false,
        noscript: false,
        // O
        object: false,
        ol: false,
        optgroup: false,
        option: false,
        output: false,
        // P
        p: false,
        param: true,
        plaintext: false,
        pre: false,
        progress: false,
        // Q
        q: false,
        // S
        s: false,
        samp: false,
        script: false,
        selection: false,
        select: false,
        shadow: false,
        small: false,
        source: true,
        spacer: false,
        span: false,
        strike: false,
        strong: false,
        style: false,
        sub: false,
        summary: false,
        sup: false,
        // T
        table: false,
        tbody: false,
        td: false,
        template: false,
        textarea: false,
        tfoot: false,
        th: false,
        thead: false,
        time: false,
        title: false,
        tr: false,
        track: false,
        tt: false,
        // U
        u: false,
        ul: false,
        // V
        "var": false,
        video: false,
        // W
        wbr: true,
        // X Y Z
        xmp: false
    };

    let html_attrs = {
        accept: true,
        "accept-charset": true,
        accesskey: true,
        action: true,
        align: true,
        alt: true,
        async: true,
        autocomplete: true,
        autofocus: true,
        autoplay: true,

        bgcolor: true,
        border: true,
        buffered: true,

        challenge: true,
        charset: true,
        checked: true,
        cite: true,
        code: true,
        codebase: true,
        color: true,
        cols: true,
        colspan: true,
        content: true,
        contenteditable: true,
        contextmenu: true,
        controls: true,
        coords: true,

        data: true,
        // data-* handled elsewhere
        datetime: true,
        default: true,
        defer: true,
        dir: true,
        dirname: true,
        disabled: true,
        download: true,
        draggable: true,
        dropzone: true,

        enctype: true,

        "for": true,
        form: true,
        headers: true,
        height: true,
        hidden: true,
        high: true,
        href: true,
        hreflang: true,
        "http-equiv": true,

        icon: true,
        id: true,
        ismap: true,
        itemprop: true,

        keytype: true,
        kind: true,
        label: true,

        lang: true,
        language: true,
        list: true,
        loop: true,
        low: true,

        manifest: true,
        max: true,
        maxlength: true,
        media: true,
        method: true,
        min: true,
        multiple: true,

        name: true,
        novalidate: true,

        open: true,
        optimum: true,

        pattern: true,
        ping: true,
        placeholder: true,
        poster: true,
        preload: true,
        pubdate: true,

        radiogroup: true,
        readonly: true,
        rel: true,
        required: true,
        reversed: true,
        rows: true,
        rowspan: true,

        sandbox: true,
        spellcheck: true,
        scope: true,
        scoped: true,
        seamless: true,
        selected: true,
        shape: true,
        size: true,
        sizes: true,
        span: true,
        src: true,
        srcdoc: true,
        srclang: true,
        start: true,
        step: true,
        style: true,
        summary: true,

        tabindex: true,
        target: true,
        title: true,
        type: true,

        usemap: true,
        value: true,

        width: true,
        wrap: true
    };

    /**
     * Convert a decimal, hex, or html entity to a unicode char
     * Returns undefined on failure.
     *
     * Assumes the code can use document. Does not work inside a worker.
     */
    let charref = (function () {
        let element = document.createElement("div");

        const cache = {};

        return function (raw) {
            let d = cache[raw];
            if(d !== undefined) return d;

            if (raw.slice(-1) === ";") {
                element.innerHTML = "&" + raw;
            } else {
                element.innerHTML = "&" + raw + ";";
            }

            d = element.textContent;
            element.innerHTML = "";

            if (Array.from(d).length !== 1) {
                d = null; // This was not a charref;
            }

            cache[raw] = d;
            return d;
        };
    })();

    cotonic.tokenizer = cotonic.tokenizer || {};
    cotonic.tokenizer.tokens = tokens;
    cotonic.tokenizer.charref = charref;
}(cotonic));
/**
 * Copyright 2017 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cotonic = cotonic || {};

(function(cotonic) {
    "use strict";

    const state = {};
    const order = [];

    const stateData = {};
    const stateClass = {};

    let animationFrameRequestId;

    /**
     * insert element to the prioritized patch list.
     */
    function insert(id, mode, initialData, priority) {
        if(mode === true) {
            mode = "inner";
        } else if(mode === false) {
            mode = "outer";
        }

        state[id] = {
            id: id,
            mode: mode,
            data: initialData,
            dirty: true
        };

        insertSorted(order,
            {id: id, priority: priority},
            function(a, b) {
                return a.priority < b.priority;
            });

        publish("model/ui/event/insert/" + id, initialData);
    }

    function get(id) {
        return state[id];
    }

    function insertSorted(arr, item, compare) {
        // get the index we need to insert the item at
        let min = 0;
        let max = arr.length;
        let index = Math.floor((min + max) / 2);

        while (max > min) {
            if (compare(item, arr[index]) < 0) {
                max = index;
            } else {
                min = index + 1;
            }
            index = Math.floor((min + max) / 2);
        }

        // insert the item
        arr.splice(index, 0, item);

        requestRender();
    }

    /**
     * Remove element from the patch list.
     */
    function remove(id) {
        delete state[id];

        for(let i = 0; i < order.length; i++) {
            if(order.id != id) {
                continue;
            }

            delete order[i];
        }

        publish("model/ui/event/delete/" + id, undefined);
    }

    /**
     * Update representation of `id`
     */
    function update(id, htmlOrTokens) {
        let currentState = state[id];

        if(!currentState) {
            return;
        }

        currentState.data = htmlOrTokens;
        currentState.dirty = true;

        requestRender();
    }

    function renderId(id) {
        /* Lookup the element we want to update */
        const elt = document.getElementById(id);

        if(elt === null)  {
            /* It is not here, maybe it is the next time around */
            return false;
        }

        return renderElement(elt, id);
    }

    function initializeShadowRoot(elt, mode) {
        if(elt.shadowRoot)
            return elt.shadowRoot;

        if(mode === "shadow-closed") {
            mode = "closed";
        } else {
            mode = "open";
        }
        
        return elt.attachShadow({mode: mode});
    }

    function renderElement(elt, id) {
        const s = state[id];

        if(s === undefined || s.data === undefined || s.dirty === false) {
            /* The element is not here anymore or does not have data yet */
            return;
        }

        /* Patch the element */
        switch(s.mode) {
            case "inner": 
                cotonic.idom.patchInner(elt, s.data);
                break;
            case "outer":
                cotonic.idom.patchOuter(elt, s.data);
                break;
            case "shadow":
            case "shadow-open":
            case "shadow-closed":
                if(!s.shadowRoot) {
                    s.shadowRoot = initializeShadowRoot(elt, s.mode);
                    publish("model/ui/event/new-shadow-root/" + id, { id: id, shadow_root: s.shadowRoot });
                }

                cotonic.idom.patchInner(s.shadowRoot, s.data);
        }

        s.dirty = false;

        return true;
    }

    function render() {
        const updated_ids = [];

        for(let i = 0; i < order.length; i++) {
            if (renderId(order[i].id)) {
                updated_ids.push(order[i].id);
            }
        }

        setTimeout(
            function() {
                for(let i = 0; i < updated_ids.length; i++) {
                    publish("model/ui/event/dom-updated/" + updated_ids[i], { id: updated_ids[i] });
                }
            },
            0);
    }

    function publish(topic, message, pubopts) {
        if(!cotonic.broker) return;

        cotonic.broker.publish(topic, message, pubopts);
    }

    function on(topic, msg, event, options) {
        options = options || {};
        const payload = {
            message: msg,
            event: event ? cloneableEvent(event) : undefined,
            value: event ? eventTargetValue(event) : undefined,
            data: event ? eventDataAttributes(event) : undefined
        };
        const pubopts = {
            qos: typeof(options.qos) == 'number' ? options.qos : 0
        };

        if (options.response_topic) {
            cotonic.broker.call(topic, payload, pubopts)
                .then( function(resp) {
                    publish(options.response_topic, resp.payload, pubopts);
                });
        } else {
            publish(topic, payload, pubopts);
        }

        if (typeof event.type == 'string') {
            switch (options.cancel) {
                case false:
                    break;
                case 'preventDefault':
                    if (event.cancelable) {
                        event.preventDefault();
                    }
                    break;
                case true:
                default:
                    if (event.cancelable) {
                        event.preventDefault();
                    }
                    event.stopPropagation();
                    break;
            }
        }
        return false;
    }

    function cloneableEvent(e) {
        return {
            eventName: e.constructor.name,
            altKey: e.altKey,
            bubbles: e.bubbles,
            button: e.button,
            buttons: e.buttons,
            cancelBubble: e.cancelBubble,
            cancelable: e.cancelable,
            clientX: e.clientX,
            clientY: e.clientY,
            composed: e.composed,
            ctrlKey: e.ctrlKey,
            currentTargetId: e.currentTarget ? e.currentTarget.id : null,
            defaultPrevented: e.defaultPrevented,
            detail: e.detail,
            eventPhase: e.eventPhase,
            fromElementId: e.fromElement ? e.fromElement.id : null,
            isTrusted: e.isTrusted,
            keyCode: window.event ? e.keyCode : e.which,
            layerX: e.layerX,
            layerY: e.layerY,
            metaKey: e.metaKey,
            movementX: e.movementX,
            movementY: e.movementY,
            offsetX: e.offsetX,
            offsetY: e.offsetY,
            pageX: e.pageX,
            pageY: e.pageY,
            // path: pathToSelector(e.path && e.path.length ? e.path[0] : null),
            relatedTargetId: e.relatedTarget ? e.relatedTarget.id : null,
            returnValue: e.returnValue,
            screenX: e.screenX,
            screenY: e.screenY,
            shiftKey: e.shiftKey,
            // sourceCapabilities: e.sourceCapabilities ? e.sourceCapabilities.toString() : null,
            targetId: e.target ? e.target.id : null,
            timeStamp: e.timeStamp,
            toElementId: e.toElement ? e.toElement.id : null,
            type: e.type,
            // view: e.view ? e.view.toString() : null,
            which: e.which,
            x: e.x,
            y: e.y
        };
    }

    function eventDataAttributes(event) {
        const d = {};

        if(!event.target)
            return d;

        if(event.target.hasOwnProperty("attributes")) {
            const attrs = event.target.attributes;

            for (let i=0; i < attrs.length; i++) {
                if (attrs[i].name.startsWith("data-")) {
                    d[attrs[i].name.substr(5)] = attrs[i].value;
                }
            }
        }

        return d;
    }

    function eventTargetValue(event) {
        if (event.target && !event.target.disabled) {
            const elt = event.target;
            switch (event.target.nodeName) {
                case 'FORM':
                    return serializeForm(elt);
                case 'INPUT':
                case 'SELECT':
                    if (elt.type == 'select-multiple') {
                        const l = elt.options.length;
                        const v = [];
                        for (let j=0; j<l; j++) {
                            if(elt.options[j].selected) {
                                v[v.length] = elt.options[j].value;
                            }
                        }
                        return v;
                    } else if (elt.type == 'checkbox' || elt.type == 'radio') {
                        if (elt.checked) {
                            return elt.value;
                        } else {
                            return false;
                        }
                    } 
                    return elt.value;
                case 'TEXTAREA':
                    return elt.value;
                default:
                    return undefined;
            }
        } else {
            return undefined;
        }
    }

    // From https://plainjs.com/javascript/ajax/serialize-form-data-into-an-array-46/
    function serializeForm(form) {
        let field, l, v, s = {};
        if (typeof form == 'object' && form.nodeName == "FORM") {
            const len = form.elements.length;
            for (let i=0; i<len; i++) {
                field = form.elements[i];
                if ( field.name
                    && !field.disabled
                    && field.type != 'file'
                    && field.type != 'reset'
                    && field.type != 'submit'
                    && field.type != 'button')
                {
                    if (field.type == 'select-multiple') {
                        v = [];
                        l = form.elements[i].options.length;
                        for (let j=0; j<l; j++) {
                            if(field.options[j].selected) {
                                v[v.length] = field.options[j].value;
                            }
                        }
                        s[field.name] = v;
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[field.name] = field.value;
                    }
                }
            }
        }
        return s;
    }

    /**
     * Manage the model state and classes
     */

    function updateStateData( model, states ) {
        stateData[model] = states;
        syncStateData();
    }

    function updateStateClass( model, classes ) {
        stateClass[model] = classes;
        syncStateClass();
    }

    // Synchronize all the model classes with the ui-state- classes
    function syncStateClass() {
        let attr = document.body.parentElement.getAttribute("class") || "";
        let classes = attr.split(/\s+/);
        let keep = [];
        var i, j;

        for (i = classes.length - 1; i >= 0; i--) {
            if (!classes[i].startsWith("ui-state-")) {
                keep.push(classes[i]);
            }
        }
        let ms = Object.keys(stateClass);
        for (i = ms.length - 1; i >= 0; i--) {
            let m = ms[i];
            for (j = stateClass[m].length - 1; j >= 0; j--) {
                keep.push("ui-state-" + m + "-" + stateClass[m][j]);
            }
        }
        let new_attr = keep.sort().join(" ");
        if (new_attr != attr) {
            document.body.parentElement.setAttribute("class", new_attr);
        }
    }

    // Synchronize the model status data with the 'data-ui-state-' attributes
    function syncStateData() {
        let root = document.body.parentElement;
        var current = {};
        var attrs = {};
        var i, j;
        var ks;

        if (root.hasAttributes()) {
            var rs = root.attributes;
            for (i = rs.length-1; i >= 0; i--) {
                if (rs[i].name.startsWith("data-ui-state-")) {
                    current[rs[i].name] = rs[i].value;
                }
            }
        }
        let ms = Object.keys(stateData);
        for (i = ms.length - 1; i >= 0; i--) {
            let m = ms[i];
            let ks = Object.keys(stateData[m]);
            for (j = ks.length - 1; j >= 0; j--) {
                attrs["data-ui-state-" + m + "-" + ks[j]] = stateData[m][ks[j]];
            }
        }

        // Remove all attributes in current and not in attrs
        ks = Object.keys(current);
        for (i = ks.length-1; i >= 0; i--) {
            if (! (ks[i] in attrs)) {
                root.removeAttribute(ks[i]);
            }
        }

        // Add all new or changed attributes
        ks = Object.keys(attrs);
        for (i = ks.length-1; i >= 0; i--) {
            var k = ks[i];
            if (!(k in current) || attrs[k] != current[k]) {
                root.setAttribute(k, attrs[k]);
            }
        }
    }

    function requestRender() {
        if(animationFrameRequestId) {
            // A render is already requested.
            return;
        }

        function renderUpdate() {
            animationFrameRequestId = undefined;
            render();
        }

        animationFrameRequestId = window.requestAnimationFrame(renderUpdate);
    }


    cotonic.ui = cotonic.ui || {};

    cotonic.ui.insert = insert;
    cotonic.ui.get = get;
    cotonic.ui.update = update;
    cotonic.ui.remove = remove;
    cotonic.ui.delete = remove;
    cotonic.ui.render = render;
    cotonic.ui.renderId = renderId;
    cotonic.ui.updateStateData = updateStateData;
    cotonic.ui.updateStateClass = updateStateClass;
    cotonic.ui.on = on;
}(cotonic));
/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* Originial code from https://github.com/RangerMauve/mqtt-pattern */

var cotonic = cotonic || {};

(function(cotonic) {
"use strict";
    
    const SEPARATOR = "/";
    const SINGLE = "+";
    const ALL = "#";


    function exec(pattern, topic) {
	return matches(pattern, topic) ? extract(pattern, topic) : null;
    }

    function matches(pattern, topic) {
	var patternSegments = pattern.split(SEPARATOR);
	var topicSegments = topic.split(SEPARATOR);

	var patternLength = patternSegments.length;
	var topicLength = topicSegments.length;
	var lastIndex = patternLength - 1;

	for(var i = 0; i < patternLength; i++){
	    var currentPattern = patternSegments[i];
	    var patternChar = currentPattern[0];
	    var currentTopic = topicSegments[i];

            if(!currentTopic && !currentPattern)
                continue;

	    if(!currentTopic && currentPattern !== ALL) return false;

	    // Only allow # at end
	    if(patternChar === ALL)
		return i === lastIndex;
	    if(patternChar !== SINGLE && currentPattern !== currentTopic)
		return false;
	}

	return patternLength === topicLength;
    }

    function fill(pattern, params){
	var patternSegments = pattern.split(SEPARATOR);
	var patternLength = patternSegments.length;

	var result = [];

	for (var i = 0; i < patternLength; i++) {
	    var currentPattern = patternSegments[i];
	    var patternChar = currentPattern[0];
	    var patternParam = currentPattern.slice(1);
	    var paramValue = params[patternParam];

	    if(patternChar === ALL){
		// Check that it isn't undefined
		if(paramValue !== void 0)
		    result.push([].concat(paramValue).join(SEPARATOR)); // Ensure it's an array

		// Since # wildcards are always at the end, break out of the loop
		break;
	    } else if (patternChar === SINGLE)
		// Coerce param into a string, missing params will be undefined
		result.push("" + paramValue);
	    else result.push(currentPattern);
	}

	return result.join(SEPARATOR);
    }


    function extract(pattern, topic) {
	var params = {};
	var patternSegments = pattern.split(SEPARATOR);
	var topicSegments = topic.split(SEPARATOR);

	var patternLength = patternSegments.length;

	for(var i = 0; i < patternLength; i++){
	    var currentPattern = patternSegments[i];
	    var patternChar = currentPattern[0];

	    if(currentPattern.length === 1)
		continue;

	    if(patternChar === ALL){
		params[currentPattern.slice(1)] = topicSegments.slice(i);
		break;
	    } else if(patternChar === SINGLE){
		params[currentPattern.slice(1)] = topicSegments[i];
	    }
	}

	return params;
    }

    function remove_named_wildcards(pattern) {
	var patternSegments = pattern.split(SEPARATOR);
	var patternLength = patternSegments.length;
        var mqttPattern = [];

	for(var i = 0; i < patternLength; i++) {
	    var currentPattern = patternSegments[i];
	    var patternChar = currentPattern[0];

            if(patternChar === ALL || patternChar == SINGLE) {
                mqttPattern.push(patternChar);
            } else {
                mqttPattern.push(currentPattern);
            }
        }

        return mqttPattern.join(SEPARATOR);
    }

    cotonic.mqtt = cotonic.mqtt || {};
    cotonic.mqtt.matches = matches;
    cotonic.mqtt.extract = extract;
    cotonic.mqtt.exec = exec;
    cotonic.mqtt.fill = fill;
    cotonic.mqtt.remove_named_wildcards = remove_named_wildcards;
 
})(cotonic);
/**
 * Copyright 2017-2019 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cotonic = cotonic || {};

(function(cotonic) {
"use strict";

    let clients;
    let root;
    let response_nr = 0;
    let promised = {};

    /* Trie implementation */
    const CHILDREN = 0;
    const VALUE = 1;

    /* The key prefix used to store retained messages in sessionStorage */
    const RETAINED_PREFIX = "c_retained$";

    function new_node(value) { return [null, value]; }

    function flush() {
        clients = {};
        root = new_node(null);
    }

    function add(topic, thing) {
        const path = topic.split("/");

        let i = 0;
        let current = root;

        for(i = 0; i < path.length; i++) {
            let children = current[CHILDREN];
            if(children === null) {
                children = current[CHILDREN] = {};
            }

            if(!children.hasOwnProperty(path[i])) {
                children[path[i]] = new_node(null);
            }

            current = children[path[i]];
        }

        let v = current[VALUE];
        if(v === null) {
            v = current[VALUE] = [];
        }

        let index = indexOfSubscription(v, thing);
        if(index > -1) {
            v.splice(index, 1);
        }
        v.push(thing);
        return v;
    }

    function match(topic) {
        const path = topic.split("/");
        const matches = [];

        collect_matches(path, root, matches);

        return matches;
    }

    function collect_matches(path, trie, matches) {
        if(trie === undefined) return;

        if(path.length === 0) {
            if(trie[VALUE] !== null) {
                matches.push.apply(matches, trie[VALUE]);
                return;
            }
        }

        const children = trie[CHILDREN];
        if(children === null) return;

        const sub_path = path.slice(1);

        switch(path[0]) {
            case "+":
                throw Error("match on single level wildcard not possible");
            case "#":
                throw Error("match on wildcard not possible");
            default:
                collect_matches(sub_path, children[path[0]], matches);
                collect_matches(sub_path, children["+"], matches);
                collect_matches([], children["#"], matches);
        }
    }

    function remove(topic, thing) {
        const path = topic.split("/");
        let current = root;
        let i = 0;
        let visited = [current];

        for(i = 0; i < path.length; i++) {
            let children = current[CHILDREN];
            if(children === null) {
                return;
            }

            if(!children.hasOwnProperty(path[i])) {
                return;
            }

            current = children[path[i]];
            visited.unshift(current);
        }

        /* Remove the node, and check for empty nodes along the path */
        let v = current[VALUE];
        let index = indexOfSubscription(v, thing);
        if(index > -1) {
            v.splice(index, 1);

            if(v.length === 0) {
                current[VALUE] = null;
                path.reverse();
                for(i = 0; i < visited.length - 1; i++) {
                    let v = visited[i];

                    if(v[CHILDREN] === null && v[VALUE] === null) {
                        let v1 = visited[i+1];
                        delete v1[CHILDREN][path[i]];
                        if(Object.keys(v1[CHILDREN]).length == 0) {
                            v1[CHILDREN] = null;
                        }
                        continue;
                    }
                    return;
                }
            }
        }
    }

    function indexOfSubscription( v, thing ) {
        let index = v.indexOf(thing);
        if (index === -1) {
            for(index = v.length-1; index >= 0; index--) {
                const sub = v[index];
                if (thing.type === sub.type && sub.wid === thing.wid) {
                    return index;
                }
            }
        }
        return index;
    }

    /**
     * Find all subscribers "below" a certain topic
     * Used by the bridge to collect all subcriptions after a session restart
     */
    function find_subscriptions_below(topic) {
        const path = topic.split("/");
        let subs = [];
        collect_subscribers(path, root, subs);
        return subs;
    }

    function collect_subscribers(path, trie, subs) {
        if(trie === undefined) return;

        if(path.length === 0 && trie[VALUE] !== null) {
            subs.push.apply(subs, trie[VALUE]);
        }

        let children = trie[CHILDREN];
        if(children === null) return;

        if (path.length > 0) {
            let sub_path = path.slice(1);

            collect_subscribers(sub_path, children[path[0]], subs);
            collect_subscribers(sub_path, children["+"], subs);
            collect_subscribers([], children["#"], subs);
        } else {
            for (let m in children) {
                collect_subscribers(path, children[m], subs);
            }
        }
    }

    /* ----- end trie ---- */


    /* We assume every message is for the broker. */
    cotonic.receive(function(data, wid) {
        if(!data.type) return;

        switch(data.type) {
            case "connect":
                return handle_connect(wid, data);
            case "publish":
                return handle_publish(wid, data);
            case "subscribe":
                return handle_subscribe(wid, data);
            case "unsubscribe":
                return handle_unsubscribe(wid, data);
            case "pingreq":
                return handle_pingreq(wid, data);
            default:
                if(window.console)
                    window.console.error("Received unknown command", data);
        }
    });

    function handle_connect(wid, data) {
        // TODO: Start keep-alive timer for will handling if pingreq missing
        if (data.client_id !== wid) {
            if(window.console) window.console.error("Wrong client_id in connect from " + wid, data);
        }
        clients[wid] = data;
        cotonic.send(wid, {type: "connack", reason_code: 0});
    }

    function handle_subscribe(wid, data) {
        let result = subscribe_subscriber({type: "worker", wid: wid}, data);
        cotonic.send(wid, {type: "suback", packet_id: data.packet_id, acks: result.acks});
        send_retained(result.retained);
    }

    function send_retained( retained ) {
        for(let i = 0; i < retained.length; i++) {
            const r = retained[i];
            for (let j = 0; j < r.retained.length; j++) {
                publish_subscriber(r.subscription, r.retained[j].retained.message, r.subscription.wid);
            }
        }
    }

    function handle_unsubscribe(wid, data) {
        let acks = unsubscribe_subscriber({type: "worker", wid: wid}, data);
        cotonic.send(wid, {type: "unsuback", packet_id: data.packet_id, acks: acks});
    }

    function handle_publish(wid, data) {
        publish_mqtt_message(data, { wid: wid });
    }

    function handle_pingreq(wid) {
        // TODO: reset keep-alive timer
        cotonic.send(wid, {type: "pingresp"});
    }

    function send_promised(topics) {
        for (let k in topics) {
            const pattern = topics[k];
            for (let p in promised) {
                if (cotonic.mqtt.matches(pattern, p)) {
                    for (let m in promised[p]) {
                        let msg = promised[p][m];
                        publish_mqtt_message(msg.message, msg.options);
                    }
                    delete promised[p];
                }
            }
        }
    }

    /**
     * Subscribe from main page
     */
    function subscribe(topics, callback, options) {
        options = options || {};
        if(options.wid === undefined) options.wid = 0;

        let subtopics = [];

        if (typeof topics === "string") {
            topics = [ topics ];
        }

        for (let k = 0; k < topics.length; k++) {
            if (typeof topics[k] === "string") {
                subtopics.push({
                    topic: topics[k],
                    qos: options.qos || 0,
                    retain_handling: options.retain_handling || 0,
                    retain_as_published: options.retain_as_published || false,
                    no_local: options.no_local || false
                });
            } else {
                subtopics.push(topics[k]);
            }
        }
        const msg = {
            type: "subscribe",
            topics: subtopics,
            properties: options.properties || {}
        };

        const result = subscribe_subscriber({type: "page", wid: options.wid, callback: callback}, msg);
        send_retained(result.retained);
        window.setTimeout(send_promised, 0, topics);
        return result.acks;
    }

    function subscribe_subscriber(subscription, msg) {
        let bridge_topics = {};
        let acks = [];
        let retained = [];
        for(let k = 0; k < msg.topics.length; k++) {
            const t = msg.topics[k];
            const mqtt_topic = cotonic.mqtt.remove_named_wildcards(t.topic);
            subscription.sub = t;
            subscription.topic = t.topic;

            let allSubs = add(mqtt_topic, subscription);
            acks.push(0);

            if(t.retain_handling < 2) {
                // TODO optimization possible. Only check all topics when the subscribe
                // contains a wildcard.
                const rs = get_matching_retained(mqtt_topic);
                if (rs.length > 0) {
                    retained.push({
                        subscription: subscription,
                        retained: rs
                    });
                }
            }

            // Collect bridge topics per bridge
            let m = mqtt_topic.match(/^bridge\/([^\/]+)\/.*/);
            if (m !== null && m[1] != "+") {
                if (bridge_topics[ m[1] ] === undefined) {
                    bridge_topics[ m[1] ] = [];
                }
                bridge_topics[ m[1] ].push({ topic: mqtt_topic, subs: allSubs});
            }
        }

        // Relay bridge topics to the bridges
        // Forward the "best" (qos, retain_handling) subscription (assume it is changed)
        for(let b in bridge_topics) {
            let topics = [];
            for (let i = 0; i < bridge_topics[b].length; i++) {
                let merged = mergeSubscriptions(bridge_topics[b][i].subs);
                merged.topic = bridge_topics[b][i].topic;
                topics.push(merged);
            }
            let sub = {
                type: "subscribe",
                topics: topics,
                properties: msg.properties || {}
            };
            publish("$bridge/" + b + "/control", sub);
        }
        return { acks: acks, retained: retained };
    }

    function mergeSubscriptions( subs ) {
        var best = Object.assign({}, subs[0].sub);
        for (let i = 1; i < subs.length; i++) {
            let s = subs[i].sub;
            best.qos = Math.max(best.qos, s.qos);
            best.retain_handling = Math.min(best.retain_handling, s.retain_handling);
            best.retain_as_published = best.retain_as_published || s.retain_as_published;
            best.no_local = best.no_local && s.no_local;
        }
        return best;
    }

    /**
      * Unsubscribe
      */
    function unsubscribe( topics, options ) {
        options = options || {};
        if(options.wid === undefined) options.wid = 0;

        if (typeof topics === "string") {
            topics = [ topics ];
        }

        unsubscribe_subscriber({type: "page", wid: options.wid}, { topics: topics });
    }

    function unsubscribe_subscriber(sub, msg) {
        let bridge_topics = {};
        let acks = [];

        for (let i = 0; i < msg.topics.length; i++) {
            remove(msg.topics[i], sub);
            acks.push(0);

            // Collect bridge topics per bridge
            const mqtt_topic = cotonic.mqtt.remove_named_wildcards(msg.topics[i]);
            let m = mqtt_topic.match(/^bridge\/([^\/]+)\/.*/);
            if (m !== null && m[1] != "+") {
                if (bridge_topics[ m[1] ] === undefined) {
                    bridge_topics[ m[1] ] = [];
                }
                bridge_topics[ m[1] ].push(mqtt_topic);
            }
        }

        // Relay bridge topics to the bridges
        for(let b in bridge_topics) {
            let unsub = {
                type: "unsubscribe",
                topics: bridge_topics[b],
                properties: msg.properties || {}
            };
            publish("$bridge/" + b + "/control", unsub);
        }
        return acks;
    }

    /**
     * Publish from main page
     */
    function publish(topic, payload, options) {
        options = options || {};
        let msg = {
            type: "publish",
            topic: topic,
            payload: payload,
            qos: options.qos || 0,
            retain: options.retain || false,
            properties: options.properties || {}
        };
        publish_mqtt_message(msg, options);
    }

    function publish_mqtt_message(msg, options) {
        let isPromised = false;

        if (msg.topic.indexOf("$promised/") == 0) {
            isPromised = true;
            msg.topic = msg.topic.substr("$promised/".length);
        }

        const subscriptions = match(msg.topic);
        const wid = options ? options.wid : undefined;
        const subscriptionsCount = subscriptions.length;

        if(msg.retain) {
            retain(msg);
        }

        if (subscriptionsCount == 0 && isPromised) {
            if (!promised[msg.topic]) {
                promised[msg.topic] = [];
            }
            promised[msg.topic].push({ message: msg, options: options });
        } else {
            for(let i = 0; i < subscriptionsCount; i++) {
                publish_subscriber(subscriptions[i], msg, wid);
            }
        }
    }

    function publish_subscriber(sub, mqttmsg, wid) {
        if (wid && sub.wid && sub.wid === wid && sub.sub.no_local) {
            return;
        }

        if(sub.type === "worker") {
            cotonic.send(sub.wid, mqttmsg);
        } else if(sub.type === "page") {
            sub.callback(mqttmsg, cotonic.mqtt.extract(sub.topic, mqttmsg.topic), { topic: sub.topic, wid: sub.wid });
        } else {
            if(window.console) window.console.error("Unkown subscription type", sub);
        }
    }

    function retain_key(topic) {
        return RETAINED_PREFIX + topic;
    }

    function retain(message) {
        const key = retain_key(message.topic);

        if(message.payload !== undefined && message.payload !== null && message.payload !== "") {
            sessionStorage.setItem(key, JSON.stringify({
                message: message
            }));
        } else {
            sessionStorage.removeItem(key);
        }
    }

    function get_matching_retained(topic) {
        let matching = [];

        for(let i = 0; i < sessionStorage.length; i++) {
            let key = sessionStorage.key(i);

            if(key.substring(0, RETAINED_PREFIX.length) !== RETAINED_PREFIX) {
                continue;
            }

            const retained_topic = key.substring(RETAINED_PREFIX.length);
            if(!cotonic.mqtt.matches(topic, retained_topic)) {
                continue;
            }

            const retained = get_retained(retained_topic);
            if(retained !== null)
                matching.push({topic: topic, retained: retained});
        }

        return matching;
    }

    function get_retained(topic) {
        const key = retain_key(topic);
        const item = sessionStorage.getItem(key);
        if(item === null) {
            return null;
        }

        const Obj = JSON.parse(item);
        if(!Obj.message) {
            sessionStorage.removeItem(key);
            return null;
        }

        return Obj;
    }

    function delete_all_retained() {
        for(let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if(key.substring(0, RETAINED_PREFIX.length) !== RETAINED_PREFIX) {
                continue;
            }
            sessionStorage.removeItem(key);
        }
    }

    // Call a topic, return a promise for the response
    function call(topic, payload, options) {
        options = options || {};
        payload = payload || null;
        let timeout = options.timeout || 15000;
        let willRespond = new Promise(
            function(resolve, reject) {
                let resp_topic = response_topic();
                let wid = "wid-" + Math.random();

                let timer = setTimeout(function() {
                    unsubscribe(resp_topic, { wid: wid });
                    let reason = new Error("Timeout waiting for response on " + topic);
                    reject(reason);
                }, timeout);

                subscribe(resp_topic, function(msg) {
                    clearTimeout(timer);
                    unsubscribe(resp_topic, { wid: wid });
                    resolve(msg);
                }, { wid: wid });

                options.properties = options.properties || {};
                options.properties.response_topic = resp_topic;
                publish(topic, payload, options);
            });
        return willRespond;
    }

    function response_topic() {
        return "reply/page-" + (response_nr++) + "-" + Math.random();
    }


    // Start fresh
    flush();
    delete_all_retained();

    cotonic.broker = cotonic.broker || {};

    // For testing
    cotonic.broker._root = root;
    cotonic.broker._add = add;
    cotonic.broker._remove = remove;
    cotonic.broker._flush = flush;
    cotonic.broker._delete_all_retained = delete_all_retained;

    // External API
    cotonic.broker.find_subscriptions_below = find_subscriptions_below;
    cotonic.broker.match = match;
    cotonic.broker.publish = publish;
    cotonic.broker.subscribe = subscribe;
    cotonic.broker.unsubscribe = unsubscribe;
    cotonic.broker.call = call;

    // Bridge API for relaying publish messages
    cotonic.broker.publish_mqtt_message = publish_mqtt_message;
}(cotonic));
/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @doc Encoder/decoder for MQTT v5, see also http://docs.oasis-open.org/mqtt/mqtt/v5.0/cs01/mqtt-v5.0-cs01.html
 */

var cotonic = cotonic || {};

(function (cotonic) {

    /**
     * Unique message type identifiers, with associated
     * associated integer values.
     * @private
     */
    var MESSAGE_TYPE = {
        CONNECT: 1,
        CONNACK: 2,
        PUBLISH: 3,
        PUBACK: 4,
        PUBREC: 5,
        PUBREL: 6,
        PUBCOMP: 7,
        SUBSCRIBE: 8,
        SUBACK: 9,
        UNSUBSCRIBE: 10,
        UNSUBACK: 11,
        PINGREQ: 12,
        PINGRESP: 13,
        DISCONNECT: 14,
        AUTH : 15
    };

    var PROPERTY = {
        payload_format_indicator:   [ 0x01, "bool", false ],
        message_expiry_interval:    [ 0x02, "uint32", false ],
        content_type:               [ 0x03, "utf8", false ],
        response_topic:             [ 0x08, "utf8", false ],
        correlation_data:           [ 0x09, "bin", false ],
        subscription_identifier:    [ 0x0B, "varint", true ],
        session_expiry_interval:    [ 0x11, "uint32", false ],
        assigned_client_identifier: [ 0x12, "utf8", false ],
        server_keep_alive:          [ 0x13, "uint16", false ],
        authentication_method:      [ 0x15, "utf8", false ],
        authentication_data:        [ 0x16, "bin", false ],
        request_problem_information:[ 0x17, "bool", false ],
        will_delay_interval:        [ 0x18, "uint32", false ],
        request_response_information:[0x19, "bool", false ],
        response_information:       [ 0x1A, "bin", false ],
        server_reference:           [ 0x1C, "utf8", false ],
        reason_string:              [ 0x1F, "utf8", false ],
        receive_maximum:            [ 0x21, "uint16", false ],
        topic_alias_maximum:        [ 0x22, "uint16", false ],
        topic_alias:                [ 0x23, "uint16", false ],
        maximum_qos:                [ 0x24, "uint8", false ],
        retain_available:           [ 0x25, "bool", false ],
        __user:                     [ 0x26, "user", false ],
        maximum_packet_size:        [ 0x27, "uint32", false ],
        wildcard_subscription_available:   [ 0x28, "bool", false ],
        subscription_identifier_available: [ 0x29, "bool", false ],
        shared_subscription_available:     [ 0x2A, "bool", false ]
    };

    // Filled in from PROPERTY by the init code
    var PROPERTY_DECODE = [];

    //MQTT proto/version for v5          4    M    Q    T    T    5
    var MqttProtoIdentifierv5 = [0x00,0x04,0x4d,0x51,0x54,0x54,0x05];


    /******************************************************************/
    /*********************** Encoder functions ************************/
    /******************************************************************/

    /**
     * Encode a message into a binary packet
     * @public
     */
    var encoder = function(msg) {
        switch (msg.type) {
            case "connect":
                return encodeConnect(msg);
            case "connack":
                return encodeConnack(msg);
            case "publish":
                return encodePublish(msg);
            case "puback":
            case "pubrec":
            case "pubrel":
            case "pubcomp":
                return encodePubackEtAl(msg);
            case "subscribe":
                return encodeSubscribe(msg);
            case "suback":
                return encodeSuback(msg);
            case "unsubscribe":
                return encodeUnsubscribe(msg);
            case "unsuback":
                return encodeUnsuback(msg);
            case "pingreq":
                return encodePingReq(msg);
            case "pingresp":
                return encodePingResp(msg);
            case "disconnect":
                return encodeDisconnect(msg);
            case "auth":
                return encodeAuth(msg);
            default:
                throw "Unknown type for encode: " + msg;
        }
    };

    function encodeConnect( msg ) {
        var first = MESSAGE_TYPE.CONNECT << 4;
        var willFlag = msg.will_flag || false;
        var willRetain = msg.will_retain || false;
        var willQoS = msg.will_qos || 0;
        var cleanStart = msg.clean_start || false;
        var v = new binary();
        v.append(MqttProtoIdentifierv5);

        var flags = 0;
        if (typeof msg.username == "string") {
            flags |= 1 << 7;
        }
        if (typeof msg.password == "string") {
            flags |= 1 << 6;
        }
        flags |= (willRetain ? 1 : 0) << 5;
        flags |= (willQoS & 3) << 3;
        flags |= (willFlag ? 1 : 0) << 2;
        flags |= (cleanStart ? 1 : 0) << 1;
        v.append1(flags);
        v.appendUint16(msg.keep_alive || 0);
        v.appendProperties(msg.properties || {});
        v.appendUTF8(msg.client_id || "");

        if (willFlag) {
            v.appendProperties(msg.will_properties || {});
            v.appendUTF8(msg.will_topic);
            v.appendBin(msg.will_payload, true);
        }
        if (typeof msg.username == "string") {
            v.appendUTF8(msg.username);
        }
        if (typeof msg.password == "string") {
            v.appendUTF8(msg.password);
        }
        return packet(first, v);
    }

    function encodeConnack( msg ) {
        var first = MESSAGE_TYPE.CONNACK << 4;
        var flags = 0;
        var v = new binary();
        if (msg.session_present) {
            flags |= 1;
        }
        v.append1( flags );
        v.append1( msg.reason_code || 0 );
        v.appendProperties(msg.properties || {});
        return packet(first, v);
    }

    function encodePublish( msg ) {
        var first = MESSAGE_TYPE.PUBLISH << 4;
        var v = new binary();
        var qos = msg.qos || 0;
        var dup = msg.dup || false;
        var retain = msg.retain || false;
        first |= (dup ? 1 : 0) << 3;
        first |= (qos & 0x03) << 1;
        first |= (retain ? 1 : 0);
        v.appendUTF8( msg.topic );
        if (qos != 0) {
            v.appendUint16(msg.packet_id);
        }
        v.appendProperties(msg.properties || {});
        if (typeof msg.payload !== 'undefined') {
            v.appendBin(msg.payload);
        }
        return packet(first, v);
    }

    function encodePubackEtAl( msg ) {
        var first;
        var v = new binary();
        var rc = msg.reason_code || 0;
        var ps = msg.properties || {};
        switch (msg.type) {
            case 'puback':
                first |= MESSAGE_TYPE.PUBACK << 4;
                break;
            case 'pubrec':
                first |= MESSAGE_TYPE.PUBREC << 4;
                break;
            case 'pubrel':
                first |= MESSAGE_TYPE.PUBREL << 4 | 2;
                break;
            case 'pubcomp':
                first |= MESSAGE_TYPE.PUBCOMP << 4;
                break;
        }
        v.appendUint16(msg.packet_id);
        if (rc != 0 || Object.keys(ps).length != 0) {
            v.append1(rc);
            v.appendProperties(ps);
        }
        return packet(first, v);
    }

    function encodeSubscribe( msg ) {
        var first = MESSAGE_TYPE.SUBSCRIBE << 4;
        var v = new binary();
        first |= 1 << 1;
        v.appendUint16(msg.packet_id);
        v.appendProperties(msg.properties || {});
        serializeSubscribeTopics(v, msg.topics);
        return packet(first, v);
    }

    function encodeSuback( msg ) {
        var first = MESSAGE_TYPE.SUBACK << 4;
        var v = new binary();
        v.appendUint16(msg.packet_id);
        v.appendProperties(msg.properties || {});
        serializeSubscribeAcks(v, msg.acks);
        return packet(first, v);
    }

    function encodeUnsubscribe( msg ) {
        var first = (MESSAGE_TYPE.UNSUBSCRIBE << 4) | 0x2;
        var v = new binary();
        v.appendUint16(msg.packet_id);
        v.appendProperties(msg.properties || {});
        serializeUnsubscribeTopics(v, msg.topics);
        return packet(first, v);
    }

    function encodeUnsuback( msg ) {
        var first = MESSAGE_TYPE.UNSUBACK << 4;
        var v = new binary();
        v.appendUint16(msg.packet_id);
        v.appendProperties(msg.properties || {});
        serializeUnsubscribeAcks(v, msg.acks);
        return packet(first, v);
    }

    function encodePingReq( ) {
        var first = MESSAGE_TYPE.PINGREQ << 4;
        var v = new binary();
        return packet(first, v);
    }

    function encodePingResp( ) {
        var first = MESSAGE_TYPE.PINGRESP << 4;
        var v = new binary();
        return packet(first, v);
    }

    function encodeDisconnect( msg ) {
        var first = MESSAGE_TYPE.DISCONNECT << 4;
        var v = new binary();
        var reason_code = msg.reason_code || 0;
        var properties = msg.properties || {};

        if (reason_code != 0 || !isEmptyProperties(properties)) {
            v.append1(reason_code);
            v.appendProperties(properties);
        }
        return packet(first, v);
    }

    function encodeAuth( msg ) {
        var first = MESSAGE_TYPE.AUTH << 4;
        var v = new binary();
        var reason_code = msg.reason_code || 0;
        var properties = msg.properties || {};

        if (reason_code != 0 || !isEmptyProperties(properties)) {
            v.append1(reason_code);
            v.appendProperties(properties);
        }
        return packet(first, v);
    }

    /******************************************************************/
    /*********************** Decoder functions ************************/
    /******************************************************************/

    /**
     * Decode a binary packet into a message
     * @public
     */
    var decoder = function( binary ) {
        // At least a byte and 0 length varint.
        if (binary.length < 2) {
            throw "incomplete_packet";
        }
        // The following might throw 'incomplete_packet'
        var b = new decodeStream(binary);
        var first = b.decode1();
        var len = b.decodeVarint();
        var variable = b.decodeBin(len);
        var m;

        try {
            // Decode the complete packet
            var vb = new decodeStream(variable);
            switch (first >> 4) {
                case MESSAGE_TYPE.CONNECT:
                    m = decodeConnect(first, vb);
                    break;
                case MESSAGE_TYPE.CONNACK:
                    m = decodeConnack(first, vb);
                    break;
                case MESSAGE_TYPE.PUBLISH:
                    m = decodePublish(first, vb);
                    break;
                case MESSAGE_TYPE.PUBACK:
                case MESSAGE_TYPE.PUBREC:
                case MESSAGE_TYPE.PUBCOMP:
                    m = decodePubackEtAl(first, vb);
                    break;
                case MESSAGE_TYPE.PUBREL:
                    if ((first & 15) !== 2) {
                        throw "invalid_packet";
                    }
                    m = decodePubackEtAl(first, vb);
                    break;
                case MESSAGE_TYPE.SUBSCRIBE:
                    m = decodeSubscribe(first, vb);
                    break;
                case MESSAGE_TYPE.SUBACK:
                    m = decodeSuback(first, vb);
                    break;
                case MESSAGE_TYPE.UNSUBSCRIBE:
                    m = decodeUnsubscribe(first, vb);
                    break;
                case MESSAGE_TYPE.UNSUBACK:
                    m = decodeUnsuback(first, vb);
                    break;
                case MESSAGE_TYPE.PINGREQ:
                    m = decodePingReq(first, vb);
                    break;
                case MESSAGE_TYPE.PINGRESP:
                    m = decodePingResp(first, vb);
                    break;
                case MESSAGE_TYPE.DISCONNECT:
                    m = decodeDisconnect(first, vb);
                    break;
                case MESSAGE_TYPE.AUTH:
                    m = decodeAuth(first, vb);
                    break;
                default:
                    throw "invalid_packet";
            }
        }
        catch (E) {
            let err = E;
            // incomplete data within a complete packet
            if (err === 'incomplete_packet') {
                err = 'invalid_packet';
            }
            throw err; 
        }
        return [ m, b.remainingData() ];
    };

    function decodeConnect( first, vb ) {
        var protocolName = vb.decodeUtf8();
        var protocolLevel = vb.decode1();

        if (protocolName == "MQTT" && protocolLevel == 5) {
            var flags = vb.decode1();

            var usernameFlag = !!(flags & 0x80);
            var passwordFlag = !!(flags & 0x40);
            var willRetain   = !!(flags & 0x20);
            var willQos      = (flags >> 3) & 0x3;
            var willFlag     = !!(flags & 0x04);
            var cleanStart   = !!(flags & 0x02);

            var keepAlive = vb.decodeUint16();
            var props = vb.decodeProperties();
            var clientId = vb.decodeUtf8();
            var willProps = {};
            var willTopic;
            var willPayload;

            if (willFlag) {
                willProps = vb.decodeProperties();
                willTopic = vb.decodeUtf8();
                var willPayloadLen = vb.decodeUint16();
                willPayload = vb.decodeBin(willPayloadLen);
            }

            var username;
            var password;
            if (usernameFlag) {
                username = vb.decodeUtf8();
            }
            if (passwordFlag) {
                password = vb.decodeUtf8();
            }

            return {
                type: 'connect',
                protocol_name: protocolName,
                protocol_version: protocolLevel,
                client_id: clientId,
                clean_start: cleanStart,
                keep_alive: keepAlive,
                properties: props,
                username: username,
                password: password,
                will_flag: willFlag,
                will_retain: willRetain,
                will_qos: willQos,
                will_properties: willProps,
                will_topic: willTopic,
                will_payload: willPayload
            };
        } else {
            throw "unknown_protocol";
        }
    }

    function decodeConnack( first, vb ) {
        var flags = vb.decode1();
        var sessionPresent = !!(flags & 1);
        var connectReason = vb.decode1();
        var props = vb.decodeProperties();
        return {
            type: 'connack',
            session_present: sessionPresent,
            reason_code: connectReason,
            properties: props
        };
    }

    function decodePublish( first, vb ) {
        var dup    = !!(first & 0x08);
        var qos    = (first >> 1) & 0x03;
        var retain = !!(first & 0x01);
        var topic = vb.decodeUtf8();
        var packetId = null;

        if (qos > 0) {
            packetId = vb.decodeUint16();
        }
        var props = vb.decodeProperties();
        var payload = vb.remainingData();
        return {
            type: 'publish',
            dup: dup,
            qos: qos,
            retain: retain,
            topic: topic,
            packet_id: packetId,
            properties: props,
            payload: payload
        };
    }

    function decodePubackEtAl( first, vb ) {
        var packetId = vb.decodeUint16();
        var reasonCode = 0;
        var props = {};
        var type;

        if (vb.remainingLength() > 0) {
            reasonCode = vb.decode1();
            props = vb.decodeProperties();
        }
        switch (first >> 4) {
            case MESSAGE_TYPE.PUBACK:
                type = 'puback';
                break;
            case MESSAGE_TYPE.PUBREC:
                type = 'pubrec';
                break;
            case MESSAGE_TYPE.PUBREL:
                type = 'pubrel';
                break;
            case MESSAGE_TYPE.PUBCOMP:
                type = 'pubcomp';
                break;
        }
        return {
            type: type,
            packet_id: packetId,
            reason_code: reasonCode,
            properties: props
        };
    }

    function decodeSubscribe( first, vb ) {
        var packetId = vb.decodeUint16();
        var props = vb.decodeProperties();
        var topics = [];
        while (vb.remainingLength() > 0) {
            var name = vb.decodeUtf8();
            var flags = vb.decode1();
            topics.push({
                topic: name,
                retain_handling: (flags >> 4) % 0x03,
                retain_as_published: !!(flags & 0x08),
                no_local: !!(flags & 0x04),
                qos: flags & 0x03
            });
        }
        return {
            type: 'subscribe',
            packet_id: packetId,
            topics: topics,
            properties: props
        };
    }

    function decodeSuback( first, vb ) {
        var packetId = vb.decodeUint16();
        var props = vb.decodeProperties();
        var acks = [];
        while (vb.remainingLength() > 0) {
            //  0..2 is Qos, 0x80+ is error code
            var ack = vb.decode1();
            if (ack > 2 && ack < 0x80) {
                throw "Illegal suback";
            }
            acks.push(ack);
        }
        return {
            type: 'suback',
            packet_id: packetId,
            properties: props,
            acks: acks
        };
    }

    function decodeUnsubscribe( first, vb ) {
        var packetId = vb.decodeUint16();
        var props = vb.decodeProperties();
        var topics = [];
        while (vb.remainingLength() > 0) {
            var topic = vb.decodeUtf8();
            topics.push(topic);
        }
        return {
            type: 'unsubscribe',
            packet_id: packetId,
            properties: props,
            topics: topics
        };
    }

    function decodeUnsuback( first, vb ) {
        var packetId = vb.decodeUint16();
        var props = vb.decodeProperties();
        var acks = [];
        while (vb.remainingLength() > 0) {
            //  0..2 is Qos, 0x80+ is error code
            var ack = vb.decode1();
            if (ack != 0 && ack != 17 && ack < 0x80) {
                throw "Illegal unsuback";
            }
            acks.push(ack);
        }
        return {
            type: 'unsuback',
            packet_id: packetId,
            properties: props,
            acks: acks
        };
    }

    function decodePingReq( first, vb ) {
        if (vb.remainingLength() > 0) {
            throw "pingreq with variable part";
        }
        return {
            type: 'pingreq'
        };
    }

    function decodePingResp( first, vb ) {
        if (vb.remainingLength() > 0) {
            throw "pingresp with variable part";
        }
        return {
            type: 'pingresp'
        };
    }

    function decodeDisconnect( first, vb ) {
        var reasonCode;
        var props;
        if (vb.remainingLength() == 0) {
            reasonCode = 0;
            props = {};
        } else {
            reasonCode = vb.decode1();
            props = vb.decodeProperties();
        }
        return {
            type: 'disconnect',
            reason_code: reasonCode,
            properties: props
        };
    }

    function decodeAuth( first, vb ) {
        var reasonCode;
        var props;
        if (vb.remainingLength() == 0) {
            reasonCode = 0;
            props = {};
        } else {
            reasonCode = vb.decode1();
            props = vb.decodeProperties();
        }
        return {
            type: 'auth',
            reason_code: reasonCode,
            properties: props
        };
    }

    /******************************************************************/
    /************************ Decode Helpers **************************/
    /******************************************************************/


    /**
     * Simple binary buffer with helper functions for decoding
     * @private
     */
    function decodeStream ( binary ) {
        this.offset = 0;
        this.buf = binary;
        var self = this;

        this.remainingLength = function() {
            return self.buf.length - self.offset;
        };

        this.remainingData = function() {
            if (self.buf.length == self.offset) {
                return new Uint8Array(0);
            } else {
                return self.buf.slice(self.offset, self.buf.length);
            }
        };

        this.ensure = function( n ) {
            if (self.offset + n > self.buf.length) {
                throw "incomplete_packet";
            }
        };

        this.decodeVarint = function() {
            var multiplier = 1;
            var n = 0;
            var digits = 0;
            var digit;
            do {
                self.ensure(1);
                if (++digits > 4) {
                    throw "malformed";
                }
                digit = self.buf[self.offset++];
                n += ((digit & 0x7F) * multiplier);
                multiplier *= 128;
            } while ((digit & 0x80) !== 0);
            return n;
        };

        this.decode1 = function() {
            self.ensure(1);
            return self.buf[self.offset++];
        };

        this.decodeUint16 = function() {
            self.ensure(2);
            var msb = self.buf[self.offset++];
            var lsb = self.buf[self.offset++];
            return (msb << 8) + lsb;
        };

        this.decodeUint32 = function() {
            self.ensure(4);
            var b1 = self.buf[self.offset++];
            var b2 = self.buf[self.offset++];
            var b3 = self.buf[self.offset++];
            var b4 = self.buf[self.offset++];
            return (b1 << 24) + (b2 << 16) + (b3 << 8) + b4;
        };

        this.decodeBin = function( length ) {
            if (length == 0) {
                return new Uint8Array(0);
            } else {
                self.ensure(length);
                var offs = self.offset;
                self.offset += length;
                return self.buf.slice(offs, self.offset);
            }
        };

        this.decodeUtf8 = function() {
            var length = self.decodeUint16();
            return UTF8ToString( self.decodeBin(length) );
        };

        this.decodeProperties = function() {
            if (self.remainingLength() == 0) {
                return {};
            }
            var len = self.decodeVarint();
            var end = self.offset + len;
            var props = {};
            while (self.offset < end) {
                var c = self.decode1();
                var p = PROPERTY_DECODE[c];
                if (p) {
                    var v;
                    var k = p[0];
                    switch (p[1]) {
                        case "bool":
                            v = !!(self.decode1());
                            break;
                        case "uint32":
                            v = self.decodeUint32();
                            break;
                        case "uint16":
                            v = self.decodeUint16();
                            break;
                        case "uint8":
                            v = self.decode1();
                            break;
                        case "utf8":
                            v = self.decodeUtf8();
                            break;
                        case "bin":
                            var count = self.decodeUint16();
                            v = self.decodeBin(count);
                            break;
                        case "varint":
                            v = self.decodeVarint();
                            break;
                        case "user":
                        default:
                            // User property
                            k = self.decodeUtf8();
                            v = self.decodeUtf8();
                            break;
                    }
                    if (p[2]) {
                        switch (typeof props[k]) {
                            case 'undefined':
                                props[k] = v;
                                break;
                            case 'object':
                                // assume array
                                props[k].push(v);
                                break;
                            default:
                                props[k] = new Array(props[k], v);
                                break;
                        }
                    } else {
                        props[k] = v;
                    }
                } else {
                    throw "Illegal property";
                }
            }
            return props;
        };

    }


    /******************************************************************/
    /************************ Encode Helpers **************************/
    /******************************************************************/


    /**
     * Serialize the topics for a subscribe.
     * @private
     */
    function serializeSubscribeTopics( v, topics ) {
        for (var i = 0; i < topics.length; i++) {
            var topic = topics[i];
            if (typeof topic == "string") {
                topic = { topic: topic };
            }
            var qos = topic.qos || 0;
            var noLocal = topic.no_local || false;
            var retainAsPublished = topic.retain_as_published || false;
            var retainHandling = topic.retain_handling || 0;
            var flags = 0;
            flags |= retainHandling << 4;
            flags |= (retainAsPublished ? 1 : 0) << 3;
            flags |= (noLocal ? 1 : 0) << 2;
            flags |= qos;
            v.appendUTF8(topic.topic);
            v.append1(flags);
        }
    }

    /**
     * Serialize the ack returns for a subscribe.
     * @private
     */
    function serializeSubscribeAcks( v, acks ) {
        for (var i = 0; i < acks.length; i++) {
            var ack = acks[i];
            if (ack >= 0 && ack <= 2) {
                // ok result with QoS
                v.append1(ack);
            } else if (ack >= 0x80 && ack <= 0xff) {
                // error code
                v.append1(ack);
            } else {
                throw "Subscribe ack outside 0..2 and 0x80..0xff";
            }
        }
    }

    /**
     * Serialize the topics for a unsubscribe.
     * @private
     */
    function serializeUnsubscribeTopics( v, topics ) {
        for (var i = 0; i < topics.length; i++) {
            v.appendUTF8(topics[i]);
        }
    }

    /**
     * Serialize the ack returns for a unsubscribe.
     * @private
     */
    function serializeUnsubscribeAcks( v, acks ) {
        for (var i = 0; i < acks.length; i++) {
            var ack = acks[i];
            if (ack == 0 || ack == 17) {
                // found or not-found
                v.append1(ack);
            } else if (ack >= 0x80 && ack <= 0xff) {
                // error code
                v.append1(ack);
            } else {
                throw "Unsubscribe ack outside 0..2 and 0x80..0xff";
            }
        }
    }


    /**
     * Append the first byte and the variable part
     * Return the Uint8Array with the concatenated result
     * @private
     */
    function packet( first, binary ) {
        var mbi = encodeMBI(binary.length());
        var pack = new Uint8Array( 1 + mbi.length + binary.length());

        pack[0] = first;
        for (var i = 0; i < mbi.length; i++) {
            pack[ 1 + i ] = mbi[i];
        }
        binary.copyInto(pack, 1 + mbi.length);
        return pack;
    }

    /**
     * Binaries, implemented as Uint8Array
     * Simple append and val functions.
     * The internal buffer is expanded when needed.
     * @private
     */
    function binary() {
        this.size = 64;
        this.buf = new Uint8Array( this.size );
        this.len = 0;
        var self = this;

        this.length = function() {
            return this.len;
        };

        this.copyInto = function( buf, offset ) {
            for (var i = self.len-1; i >= 0; i--) {
                buf[i+offset] = self.buf[i];
            }
        };

        this.val = function() {
            return self.buf.slice( 0, self.len );
        };

        this.append = function( bytes ) {
            self.reserve( bytes.length );
            for (var i = 0; i < bytes.length; i++) {
                self.buf[ self.len++ ] = bytes[i];
            }
        };

        this.append1 = function( byte ) {
            self.reserve(1);
            self.buf[ self.len++ ] = byte;
        };

        this.appendUint32 = function( input ) {
            self.reserve(4);
            if (input < 0) {
                throw "Value uint32 below 0";
            }
            self.buf[ self.len++ ] = (input >> 24) & 255;
            self.buf[ self.len++ ] = (input >> 16) & 255;
            self.buf[ self.len++ ] = (input >> 8) & 255;
            self.buf[ self.len++ ] = input & 255;
        };

        this.appendUint16 = function( input ) {
            self.reserve(2);
            if (input < 0 || input >= 65536) {
                throw "Value too large for uint16";
            }
            self.buf[ self.len++ ] = input >> 8;
            self.buf[ self.len++ ] = input & 255;
        };

        this.appendVarint = function( number ) {
            if (number < 0) {
                throw "Negative varint";
            }
            var numBytes = 0;
            do {
                self.reserve(1);
                var digit = number % 128;
                number = number >> 7;
                if (number > 0) {
                    digit |= 0x80;
                }
                self.buf[ self.len++ ] = digit;
            } while ( (number > 0) && ( ++numBytes < 4) );
        };

        this.appendUTF8 = function ( s ) {
            var b = stringToUTF8(s);
            self.appendUint16(b.length);
            self.reserve(b.length);
            for (var i = 0; i < b.length; i++) {
                self.buf[ self.len++ ] = b[i];
            }
        };

        this.appendBin = function ( b, addlen ) {
            switch (typeof b) {
                case "undefined":
                    // Append empty data
                    if (addlen) {
                        this.appendUint16(0);
                    }
                    break;
                case "string":
                    b = stringToUTF8(b);
                    if (addlen) {
                        self.appendUint16(b.length);
                    }
                    self.reserve(b.length);
                    for (var i = 0; i < b.length; i++) {
                        self.buf[ self.len++ ] = b[i];
                    }
                    break;
                case "object":
                    if (b instanceof binary) {
                        if (addlen) {
                            self.appendUint16(b.length());
                        }
                        self.reserve(b.length());
                        b.copyInto(self.buf, self.len);
                        self.len += b.length();
                    } else if (typeof b.BYTES_PER_ELEMENT == "number") {
                        // Assume a TypedArray
                        var v;
                        if (b.BYTES_PER_ELEMENT == 1) {
                            v = b;
                        } else {
                            v = new Uint8Array( b.buffer );
                        }
                        self.reserve(v.length + 2);
                        if (addlen) {
                            self.appendUint16(v.length);
                        }
                        for (let i = 0; i < v.length; i++) {
                            self.buf[self.len++] = v[i];
                        }
                    } else {
                        throw "Can't serialize unknown object";
                    }
                    break;
                default:
                    throw "Can't serialize unsupported type: "+(typeof b);
            }
        };

        this.appendProperties = function ( props ) {
            var b = serializeProperties(props);

            self.appendVarint(b.length());
            self.appendBin(b);
        };

        this.reserve = function( count ) {
            if (self.size < self.len + count ) {
                var newsize = self.size * 2;
                while (newsize < self.size + count) {
                    newsize = newsize * 2;
                }
                var newbuf = new Uint8Array(newsize);

                for (var i = self.len-1; i >= 0; i--) {
                    newbuf[i] = self.buf[i];
                }
                self.size = newsize;
                self.buf = newbuf;
            }
        };
    }


    /**
     * Check if the properties object is empty
     * @private
     */
    function isEmptyProperties( props ) {
        for (var k in props) {
            if (!props.hasOwnProperty(k)) {
                continue;
            }
            return false;
        }
        return true;
    }

    /**
     * Serialize the properties.
     * Return a new 'binary' with the serialized properties.
     * @private
     */
    function serializeProperties( props ) {
        var b = new binary();
        for (var k in props) {
            if (!props.hasOwnProperty(k)) {
                continue;
            }
            var p = (PROPERTY[k] || PROPERTY.__user);
            if (p[2] && props[k].constructor === Array) {
                for (var i = 0; i < props[k].length; i++) {
                    b.append1(p[0]);
                    serializeProperty(p[1], k, props[k][i], b);
                }
            } else {
                b.append1(p[0]);
                serializeProperty(p[1], k, props[k], b);
            }
        }
        return b;
    }

    function serializeProperty( type, k, v, b ) {
        switch (type) {
            case "bool":
                b.append1(v ? 1 : 0);
                break;
            case "uint32":
                b.appendUint32(v);
                break;
            case "uint16":
                b.appendUint16(v);
                break;
            case "uint8":
                b.append1(v);
                break;
            case "utf8":
                b.appendUTF8(v);
                break;
            case "bin":
                b.appendBin(v, true);
                break;
            case "varint":
                b.appendVarint(v);
                break;
            case "user":
            default:
                // User property
                b.appendUTF8(k);
                b.appendUTF8(v);
                break;
        }
    }


    /**
     * Takes an Uint8Array with UTF8 encoded bytes and writes it into a String.
     * @public
     */
    function UTF8ToString ( input ) {
        return new TextDecoder("utf-8").decode(input);
    }

    /**
     * Takes a string, returns an Uint8Array with UTF8
     * @public
     */
    function stringToUTF8 ( input ) {
        return new TextEncoder("utf-8").encode(input);
    }

    /**
     * Encodes an MQTT Multi-Byte Integer
     * @private
     */
    function encodeMBI(number) {
        var output = new Array(1);
        var numBytes = 0;

        do {
            var digit = number % 128;
            number = number >> 7;
            if (number > 0) {
                digit |= 0x80;
            }
            output[numBytes++] = digit;
        } while ( (number > 0) && (numBytes<4) );

        return output;
    }

    /**
     * Initialize some lookup arrays etc
     */
    function init() {
        for (var k in PROPERTY) {
            var p = PROPERTY[k];
            PROPERTY_DECODE[p[0]] = [ k, p[1], p[2] ];
        }
    }

    init();

    // Publish the packet functions.
    cotonic.mqtt_packet = cotonic.mqtt_packet || {};
    cotonic.mqtt_packet.encode = encoder;
    cotonic.mqtt_packet.decode = decoder;

    // Some useful support functions
    cotonic.mqtt_packet.stringToUTF8 = stringToUTF8;
    cotonic.mqtt_packet.UTF8ToString = UTF8ToString;

}(cotonic));
/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cotonic = cotonic || {};

(function (cotonic) {

    /*************************************************************************************************/
    /********************************** Connections using Websocket **********************************/
    /*************************************************************************************************/

    const WS_CONTROLLER_PATH = '/mqtt-transport'; // Default controller for websocket connections etc.
    const WS_CONNECT_DELAY = 20;                  // Wait 20msec before connecting via ws
    const WS_PERIODIC_DELAY = 1000;               // Every second check the ws connection


    function newTransport( remote, mqttSession, options ) {
        return new ws(remote, mqttSession, options);
    }

    /**
     * Websocket connection.
     */
    function ws ( remote, mqttSession, options ) {
        this.remoteUrl = undefined;
        this.remoteHost = undefined;
        this.session = mqttSession;
        this.socket = undefined;
        this.randomPing = undefined;
        this.backoff = 0;
        this.errorsSinceLastData = 0;
        this.awaitPong = false;
        this.isConnected = false;
        this.isForceClosed = false;
        this.data = undefined;

        const controller_path = options.controller_path || WS_CONTROLLER_PATH;
        const connect_delay = options.connect_delay || WS_CONNECT_DELAY;
        const periodic_delay = options.periodic_delay || WS_PERIODIC_DELAY;
        const protocol = options.protocol || ((document.location.protocol==='http:')?"ws":"wss");

        var self = this;

        /**
         * Send a MQTT message to the other end. Encodes the message and
         * sends the data. Returns 'true' if able to send, 'false' when no
         * valid connection is available.
         * @todo: check socket.bufferedAmount to see if we are not sending
         *        too fast and should throttle
         */
        this.sendMessage = function( message ) {
            if (isStateConnected()) {
                var b = cotonic.mqtt_packet.encode( message );
                self.socket.send( b.buffer );
                if (message.type == 'disconnect') {
                    self.closeConnection();
                }
                return true;
            } else {
                return false;
            }
        }

        /**
         * Name used to identify this transport.
         */
        this.name = function() {
            return "mqtt_transport.ws: " + this.remoteUrl;
        }

        /**
         * Force a close of this ws connection.
         */
        this.closeConnection = function () {
            if (isStateConnected() || isStateConnecting()) {
                self.socket.close();
                self.isConnected = false;
                self.isForceClosed = true;

                cotonic.broker.unsubscribe("model/lifecycle/event/state", {wid: self.name()});
            }
        }

        /**
         * Protocol error, close the connection and retry after backoff
         */
        this.closeReconnect = function ( isNoBackOff ) {
            if (isStateConnected() || isStateConnecting()) {
                self.socket.close();
                self.isConnected = false;
            }
            self.isForceClosed = false;
            if (isNoBackOff === true) {
                self.backoff = 0;
                connect();
            } else {
                setBackoff();
            }
        }

        /**
         * Ask to reopen the connection.
         */
        this.openConnection = function () {
            self.isForceClosed = false;
            connect();
        }


        /**
         * State functions. Checks if the connection is in a certain state.
         */
        function isStateConnected() {
            return !self.awaitPong
                && self.isConnected
                && self.socket
                && self.socket.readyState == 1;
        }

        function isStateConnecting() {
            return !self.isConnected
                || self.awaitPing
                || (self.socket && self.socket.readyState == 0);
        }

        function isStateClosing() {
            return self.socket && self.socket.readyState == 2;
        }

        function isStateClosed() {
            return !self.socket || self.socket.readyState == 3;
        }

        function isStateForceClosed() {
            return self.isForceClosed;
        }

        function isStateBackoff() {
            return self.backoff > 0;
        }

        /**
         * Periodic state check. Checks if needs an action like connect.
         */
        function periodic() {
            if (isStateClosed() && !isStateForceClosed()) {
                if (self.backoff > 0) {
                    self.backoff--;
                } else {
                    connect();
                }
            }
        }

        function handleError( reason ) {
            console.log("Closing websocket connection to "+self.remoteUrl+" due to "+reason);
            self.errorsSinceLastData++;
            if (isStateConnected()) {
                self.socket.close();
                self.isConnected = false;
            } else {
                self.isConnected = (self.socket.readyState == 1);
            }
            setBackoff();
            self.session.disconnected('ws', reason);
        }

        /**
         * Connect to the remote server.
         */
        function connect() {
            if (!isStateClosed()) {
                return false;
            }
            if (isStateForceClosed()) {
                return false
            }
            self.data = new Uint8Array(0);
            self.isConnected = false;
            self.awaitPong = true;
            self.socket = undefined;

            let callOnOpen = false;
            let onopen = function() {
                self.isConnected = true;
                if (self.socket.protocol == 'mqtt.cotonic.org') {
                    // Send ping and await pong to check channel.
                    self.randomPing = new Uint8Array([
                        255, 254, 42, Math.floor(Math.random()*100), Math.floor(Math.random()*100)
                    ]);
                    self.socket.send( self.randomPing.buffer );
                    self.awaitPong = true;
                } else {
                    self.awaitPong = false;
                    self.session.connected('ws');
                }
            };

            if (cotonic.bridgeSocket && cotonic.bridgeSocket.url == self.remoteUrl) {
                switch (cotonic.bridgeSocket.readyState) {
                    case 0:
                        self.socket = cotonic.bridgeSocket;
                        break;
                    case 1:
                        callOnOpen = true;
                        self.socket = cotonic.bridgeSocket;
                        break;
                    default:
                        break;
                }
                cotonic.bridgeSocket = undefined;
            }
            if (!self.socket) {
                // EMQ is erronously accepting any protocol starting with `mqtt`, so it accepts
                // 'mqtt.cotonic.org', which starts the extra handshake.
                // self.socket = new WebSocket( self.remoteUrl, [ "mqtt.cotonic.org", "mqtt" ] );
                self.socket = new WebSocket( self.remoteUrl, [ "mqtt" ] );
            }
            self.socket.binaryType = 'arraybuffer';
            self.socket.onopen = onopen;
            self.socket.onclose = function() {
                handleError('ws-close');
            };;
            self.socket.onerror = function() {
                handleError('ws-error');
            };;
            self.socket.onmessage = function( message ) {
                if (message.data instanceof ArrayBuffer) {
                    var data = new Uint8Array(message.data);

                    if (self.awaitPong) {
                        if (equalData(data, self.randomPing)) {
                            self.awaitPong = false;
                            self.session.connected('ws');
                        } else {
                            handleError('ws-pongdata');
                        }
                    } else {
                        receiveData(data);
                    }
                }
            };
            if (callOnOpen) {
                onopen();
            }

            // Listen for ui state changes. Reset the backoff to allow quick reconnects
            // when a page is activated. 
            cotonic.broker.subscribe("model/lifecycle/event/state",
                function(m) {
                    if(m.payload === "active") {
                        self.backoff = 0;
                    }
                },
                {wid: self.name()}
            );

            return true;
        }

        function equalData( a, b ) {
            if (a.length == b.length) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i] != b[i]) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }

        }

        function receiveData ( rcvd ) {
            if (self.data.length == 0) {
                self.data = rcvd;
            } else {
                var i;
                var k = 0;
                var newdata = new Uint8Array(self.data.length, rcvd.length);
                for (i = 0; i < self.data.length; i++) {
                    newdata[k++] = self.data[i];
                }
                for (i = 0; i < rcvd.length; i++) {
                    newdata[k++] = rcvd[i];
                }
                self.data = newdata;
            }
            decodeReceivedData();
        }

        function decodeReceivedData () {
            var ok = true;
            while (ok && self.data.length > 0) {
                try {
                    var result = cotonic.mqtt_packet.decode(self.data);
                    handleBackoff( result[0] );
                    self.data = result[1];
                    self.session.receiveMessage(result[0]);
                } catch (e) {
                    if (e != 'incomplete_packet') {
                        handleError(e);
                    }
                    ok = false;
                }
            }
        }

        function setBackoff () {
            self.backoff = Math.min(30, self.errorsSinceLastData * self.errorsSinceLastData);
        }

        function handleBackoff ( msg ) {
            switch (msg.type) {
                case 'connack':
                    if (msg.reason_code > 0) {
                        self.errorsSinceLastData++;
                    }
                    break;
                case 'disconnect':
                    break;
                default:
                    self.errorsSinceLastData = 0
                    break;
            }
        }

        function init() {
            if (remote == 'origin') {
                self.remoteHost = document.location.host;
            } else {
                self.remoteHost = remote;
            }

            self.remoteUrl = protocol + "://" + self.remoteHost + controller_path;

            setTimeout(connect, connect_delay);
            setInterval(periodic, periodic_delay);

       }

        init();
    }


    // Publish the transport ws functions.
    cotonic.mqtt_transport = cotonic.mqtt_transport || {};
    cotonic.mqtt_transport.ws = cotonic.mqtt_transport.ws || {};
    cotonic.mqtt_transport.ws.newTransport = newTransport;

}(cotonic));

/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// TODO: change this into a web-worker

// TODO: Limit in-flight acks (both ways)
// TODO: Drop QoS 0 messages if sendQueue gets too large
// TODO: add support for WebRTC and SSE+post

var cotonic = cotonic || {};

(function (cotonic) {
    const console = window.console;

    /**
     * Possible transports for remotes.
     *
     * For 'origin':
     * - wss with mqtt-transport controller
     * - sse + post to mqtt-transport controller
     *
     * For other remotes (clients):
     * - WebRTC
     */

    // Lookup list of all remotes with their connections
    // One of them is 'origin' (which is a special case)
    var sessions = {};

    const MQTT_KEEP_ALIVE = 300;                  // Default PINGREQ interval in seconds
    const MQTT_SESSION_EXPIRY = 1800;             // Expire the session if we couldn't reconnect in 30 minutes

    const MQTT_RC_SUCCESS                  = 0;
    const MQTT_RC_DISCONNECT_WITH_WILL     = 4;
    const MQTT_RC_CLIENT_ID_INVALID        = 133;
    const MQTT_RC_BAD_USERNAME_OR_PASSWORD = 134;
    const MQTT_RC_PACKET_ID_IN_USE         = 145;
    const MQTT_RC_PACKET_ID_NOT_FOUND      = 146;

    var newSession = function( remote, bridgeTopics, options ) {
        remote = remote || 'origin';
        if (sessions[remote]) {
            return sessions[remote];
        } else {
            // console.log("new-session");
            var ch = new mqttSession(bridgeTopics);
            sessions[remote] = ch;
            ch.connect(remote, options);
            return ch;
        }
    };

    var findSession = function( remote ) {
        remote = remote || 'origin';
        return sessions[remote];
    };

    var deleteSession = function( remote ) {
        remote = remote || 'origin';

        delete sessions[remote];
    };

    function init() {
        /**
         * Called if the authentication on the origin connection is changing
         */
        cotonic.broker.subscribe('model/auth/event/auth-changing', function(_msg) {
            if (sessions['origin']) {
                sessions['origin'].disconnect( MQTT_RC_DISCONNECT_WITH_WILL );
            }
        });

        /**
         * Called if a new origin identity has been established
         */
        cotonic.broker.subscribe('model/auth/event/auth-user-id', function(_msg) {
            if (sessions['origin']) {
                sessions['origin'].reconnect('origin');
            }
        });

        /**
         * Called if there are new language / timezone preferences
         */
        cotonic.broker.subscribe("model/auth/event/auth", function(msg) {
            if (typeof msg.payload == 'object') {
                if (sessions['origin'] && sessions['origin'].isConnected()) {
                    let data = {
                        user_id: msg.payload.user_id,
                        options: msg.payload.options || {},
                        preferences: msg.payload.preferences || {}
                    }
                    let topic = 'bridge/origin/$client/' + sessions['origin'].clientId + "/auth";
                    cotonic.broker.publish(topic, data, { qos: 0 });
                }
            }
        });


        /**
         * Called if the cotonic-sid changes.
         */
        cotonic.broker.subscribe("model/sessionId/event", function(msg) {
            if (typeof msg.payload == 'string') {
                if (sessions['origin'] && sessions['origin'].isConnected()) {
                    let data = {
                        options: { sid: msg.payload }
                    }
                    let topic = 'bridge/origin/$client/' + sessions['origin'].clientId + "/sid";
                    cotonic.broker.publish(topic, data, { qos: 0 });
                }
            }
        });
    }


    /*************************************************************************************************/
    /****************************************** MQTT Session *****************************************/
    /*************************************************************************************************/


    /**
     * MQTT session to a remote server/client.
     * Keeps track of logged on user and authentication.
     * Tries to reconnect if needed.
     */
    function mqttSession( mqttBridgeTopics ) {
        this.bridgeTopics = mqttBridgeTopics;   // mqtt_bridge responsible for this session
        this.connections = {};                  // Websocket and other connections
        this.clientId = '';                     // Assigned by server
        this.cleanStart = true;
        this.sendQueue = [];                    // Queued outgoing messages
        this.receiveQueue = [];                 // Queued incoming messages
        this.isSentConnect = false;
        this.isWaitConnack = false;
        this.isWaitPingResp = false;
        this.connectProps = {};
        this.keepAliveTimer = false;
        this.keepAliveInterval = MQTT_KEEP_ALIVE;
        this.packetId = 1;
        this.messageNr = 0;
        this.awaitingAck = {};
        this.awaitingRel = {};
        this.authUserPassword = { username: undefined, password: undefined };
        this.disconnectReason = '';

        var self = this;

        /**
         * A message sent from the bridge, to be relayed to the server
         * The bridge took care of rewriting topics
         */
        function sessionToRemote( msg ) {
            switch (msg.payload.type) {
                case "publish":
                    publish(msg.payload);
                    break;
                case "subscribe":
                    subscribe(msg.payload);
                    break;
                case "unsubscribe":
                    unsubscribe(msg.payload);
                    break;
                case "auth":
                    self.sendMessage(msg.payload);
                    break;
                default:
                    // Error: unknown msg to relay
                    break;
            }
        }

        /**
         * Relay a publish to the bridge, the bridge will rewrite the topic
         * and republish it locally.
         */
        function sessionToBridge( msg ) {
            localPublish(self.bridgeTopics.session_in, msg);
        }

        /**
         * Control messages from the bridge for this session
         */
        function sessionControl( msg ) {
        }

        /**
         * Start a transport to the remote
         * Called by the bridge or other components that manage a MQTT connection
         */
        this.connect = function( remote, options ) {
            options = options || {};
            if (typeof options.client_id === "string") {
                self.clientId = options.client_id;
            }
            if (typeof options.clean_start === "boolean") {
                self.cleanStart = options.clean_start;
            }
            if (typeof options.username === "string") {
                self.authUserPassword.username = options.username;
                self.authUserPassword.password = options.password || undefined;
            }
            self.connections['ws'] = cotonic.mqtt_transport.ws.newTransport( remote, self, options );
        };

        this.disconnect = function (reasonCode) {
            if(reasonCode === undefined) {
                reasonCode = MQTT_RC_SUCCESS;
            }

            const msg = {
                type: 'disconnect',
                reason_code: reasonCode
            };
            
            self.sendMessage(msg);
            self.clientId = '';

            if(reasonCode === MQTT_RC_SUCCESS) {
                const transport = self.connections['ws'];
                if(transport) {
                    transport.closeConnection();
                    delete self.connections['ws'];
                    publishStatus(false);
                }
            }

            sessionToBridge({type: "disconnect"});
        };

        this.reconnect = function( remote ) {
            if (remote == 'origin' && self.connections['ws']) {
                self.connections['ws'].openConnection();
            }
        };

        this.isConnected = function() {
            return isStateConnected();
        };

        /**
         * Called by a transport after it has established a data-connection
         * Send the MQTT 'connect' message to establish a MQTT session over
         * the data-connection.
         */
        this.connected = function ( transportName ) {
            // Connection established - try to send out 'connect'
            if (transportName == 'ws') {
                if (isStateNew()) {
                    cotonic.broker
                        .call("model/sessionId/get")
                        .then(function(msg) {
                            let connectMessage = {
                                type: 'connect',
                                client_id: self.clientId,
                                clean_start: self.cleanStart,
                                keep_alive: MQTT_KEEP_ALIVE,
                                username: self.authUserPassword.username,
                                password: self.authUserPassword.password,
                                properties: {
                                    session_expiry_interval: MQTT_SESSION_EXPIRY,
                                    cotonic_sid: msg.payload
                                }
                            };
                            self.isSentConnect = self.sendMessage(connectMessage, true);
                            if (self.isSentConnect) {
                                self.isWaitConnack = true;
                            }
                        });
                }
            }
        };

        function publish( pubmsg ) {
            const payload = pubmsg.payload;
            let properties = pubmsg.properties || {};
            let encodedPayload;

            if (typeof payload == "undefined" || payload === null) {
                encodedPayload = new Uint8Array(0);
            } else {
                let contentType = properties.content_type || guessContentType(payload);
                encodedPayload = encodePayload(payload, contentType);
                properties.content_type = contentType;
            }
            let msg = {
                type: 'publish',
                topic: pubmsg.topic,
                payload: encodedPayload,
                qos: pubmsg.qos || 0,
                retain: pubmsg.retain || 0,
                properties: properties
            };
            self.sendMessage(msg);
        }

        function subscribe ( submsg ) {
            let topics = submsg.topics;
            if (typeof topics == "string") {
                topics = [ { topic: topics } ];
            }
            var msg = {
                type: 'subscribe',
                packet_id: nextPacketId(),
                topics: topics,
                properties: submsg.properties || {}
            };
            self.awaitingAck[msg.packet_id] = {
                type: 'suback',
                nr: self.messageNr++,
                msg: msg
            };
            self.sendMessage(msg);
        }

        function unsubscribe ( unsubmsg ) {
            let topics = unsubmsg.topics;
            if (typeof topics == "string") {
                topics = [ topics ];
            }
            var msg = {
                type: 'unsubscribe',
                packet_id: nextPacketId(),
                topics: topics,
                properties: unsubmsg.properties || {}
            };
            self.awaitingAck[msg.packet_id] = {
                type: 'unsuback',
                nr: self.messageNr++,
                msg: msg
            };
            self.sendMessage(msg);
        }

        this.keepAlive = function() {
            if (isStateWaitingPingResp()) {
                closeConnections();
            } else {
                self.isWaitPingResp = true;
                self.sendMessage({ type: 'pingreq' });
            }
        };

        // Handle incoming message from another server or client
        this.receiveMessage = function ( msg ) {
            self.receiveQueue.push(msg);
            if (!self.receiveTimer) {
                self.receiveTimer = setTimeout(function() { doReceive(); }, 1);
            }
        };

        this.sendMessage = function ( msg, connecting ) {
            var isSent = false;
            if (isStateConnected() || (connecting && isStateNew())) {
                switch (msg.type) {
                    case 'subscribe':
                        msg.packet_id = nextPacketId(),
                        self.awaitingAck[msg.packet_id] = {
                            type: 'suback',
                            nr: self.messageNr++,
                            msg: msg
                        };
                        break;
                    case 'publish':
                        switch (msg.qos) {
                            case 0:
                                break;
                            case 1:
                                msg.packet_id = nextPacketId();
                                self.awaitingAck[msg.packet_id] = {
                                    type: 'puback',
                                    nr: self.messageNr++,
                                    msg: msg
                                };
                                break;
                            case 2:
                                msg.packet_id = nextPacketId();
                                self.awaitingAck[msg.packet_id] = {
                                    type: 'pubrec',
                                    nr: self.messageNr++,
                                    msg: msg
                                };
                                break;
                        }
                        break;
                    default:
                        break;
                }
                isSent = self.sendTransport(msg);
            }
            if (!isSent) {
                self.queueMessage(msg);
            }
            return isSent;
        };

        this.sendTransport = function( msg ) {
            var isSent = false;
            for (var conn in self.connections) {
                if (!isSent) {
                    isSent = self.connections[conn].sendMessage(msg);
                }
            }
            return isSent;
        };

        this.queueMessage = function ( msg ) {
            switch (msg.type) {
                case 'pingresp':
                case 'pingreq':
                    break;
                default:
                    self.sendQueue.push(msg);
                    break;
            }
        };

        this.disconnected = function( ) {
            // Use timeout so that all incoming messages are handled
            setTimeout(function() {
                if (isStateWaitingConnAck()) {
                    // Something wrong during the connect - start with a new session
                    self.clientId = '';
                }
                self.isSentConnect = false;
                self.isWaitConnack = false;
                self.keepAliveInterval = 0;
                stopKeepAliveTimer();
            });
        };

        /**
         * State functions
         */
        function isStateNew() {
            return !self.isSentConnect;
        }

        function isStateWaitingConnAck() {
            return self.isSentConnect && self.isWaitConnack;
        }

        function isStateConnected() {
            return self.isSentConnect && !self.isWaitConnack;
        }

        function isStateWaitingPingResp() {
            return self.isWaitPingResp && isStateConnected();
        }

        /**
         * Payload encoder/decoder
         */
        function encodePayload( payload, contentType ) {
            switch (contentType) {
                case "binary/octet-stream":
                    return payload;
                case "text/plain":
                    return payload;
                case "text/x-integer":
                case "text/x-number":
                    return payload.toString();
                case "text/x-datetime":
                    return payload.toJSON();
                case "application/json":
                    return JSON.stringify(payload);
                default:
                    return payload;
            }
        }

        function decodePayload( payload, contentType ) {
            switch (contentType) {
                case "text/plain":
                    return cotonic.mqtt_packet.UTF8ToString(payload);
                case "text/x-integer":
                    return parseInt(cotonic.mqtt_packet.UTF8ToString(payload), 10);
                case "text/x-number":
                    return Number(cotonic.mqtt_packet.UTF8ToString(payload));
                case "text/x-datetime":
                    return new Date(cotonic.mqtt_packet.UTF8ToString(payload));
                case "application/json":
                    return JSON.parse(cotonic.mqtt_packet.UTF8ToString(payload));
                case "binary/octet-stream":
                    return payload;
                default:
                    if (payload.length == 0) {
                        return undefined;
                    }
                    return payload;
            }
        }

        function guessContentType( payload ) {
            switch (typeof(payload)) {
                case "string":
                    return "text/plain";
                case "number":
                    if (Number.isInteger(payload)) {
                        return "text/x-integer";
                    }
                    return "text/x-number";
                case "boolean":
                    return "application/json";
                case "object":
                    if (payload === null) {
                        return undefined;
                    } if (payload instanceof Date) {
                        return "text/x-datetime";
                    } else if (typeof payload.BYTES_PER_ELEMENT == "number") {
                        return "binary/octet-stream";
                    }
                    return "application/json";
                default:
                    console.log("Do not know how to serialize a ", typeof(payload));
                    return "application/json";
            }
        }

        /**
         * Receive the messages in the incoming message queue
         */
        function doReceive() {
            for (var i=0; i < self.receiveQueue.length; i++) {
                handleReceivedMessage( self.receiveQueue[i] );
            }
            self.receiveQueue = [];
            self.receiveTimer = false;
            self.isPacketReceived = true;
        }

        function resetKeepAliveTimer() {
            stopKeepAliveTimer();
            if (self.keepAliveInterval > 0) {
                self.keepAliveTimer = setInterval(function() { self.keepAlive(); }, self.keepAliveInterval * 1000);
            }
        }

        function stopKeepAliveTimer() {
            if (self.keepAliveTimer) {
                clearTimeout(self.keepAliveTimer);
                self.keepAliveTimer = false;
            }
            self.isWaitPingResp = false;
        }


        // Cleanup the sendQueue - remove:
        // - publish with QoS > 0
        // - ack messages
        // - expired publish (QoS 0) [TODO]
        function cleanupSendQueue() {
            var q = [];
            for (var k in self.sendQueue) {
                var msg = self.sendQueue[k];
                switch (msg.type) {
                    case 'publish':
                        if (msg.qos > 0) {
                            q.push(msg);
                        }
                        break;
                    default:
                        break;
                }
            }
            self.sendQueue = q;
        }

        // Send all queued messages
        function sendQueuedMessages() {
            var queue = self.sendQueue;
            self.sendQueue = [];
            for (var k = 0; k < queue.length; k++) {
                self.sendMessage(queue[k]);
            }
        }

        // Resend unacknowledged publish (QoS > 0) and pubrec messages
        function resendUnacknowledged() {
            var msgs = [];
            for (var packetId in self.awaitingAck) {
                var unack = self.awaitingAck[packetId];
                var msg;
                switch (unack.type) {
                    case 'puback':
                    case 'pubrec':
                        msg = unack.msg;
                        msg.dup = true;
                        msgs.push({ nr: unack.nr, msg: msg });
                        break;
                    case 'unsuback':
                    case 'suback':
                        msg = unack.msg;
                        msgs.push({ nr: unack.nr, msg: msg });
                        break;
                    case 'pubcomp':
                        msg = {
                            type: 'pubrec',
                            packet_id: packetId
                        };
                        msgs.push({ nr: unack.nr, msg: msg });
                        break;
                    default:
                        console.log("Unknown type in awaitingAck", unack);
                        break;
                }
            }
            msgs.sort(function(a, b) { return a.nr - b.nr; });
            for (var k in msgs) {
                self.sendMessage(msgs[k].msg);
            }
        }

        function handleReceivedMessage ( msg ) {
            var replyMsg;

            switch (msg.type) {
                case 'connack':
                    if (!isStateWaitingConnAck()) {
                        console.log("Unexpected CONNACK", msg);
                    }
                    self.isWaitConnack = false;
                    switch (msg.reason_code) {
                        case MQTT_RC_SUCCESS:
                            self.connectProps = msg.properties;
                            if (msg.properties.assigned_client_identifier) {
                                self.clientId = msg.properties.assigned_client_identifier;
                            }
                            cleanupSendQueue();
                            if (msg.session_present) {
                                // Resend pending connack and connrel messages
                                resendUnacknowledged();
                            } else {
                                self.clientId = msg.properties.assigned_client_identifier;
                                self.awaitingRel = {};
                                self.awaitingAck = {};
                                self.cleanStart = false;
                            }
                            if (typeof self.connectProps.server_keep_alive == "number") {
                                self.keepAliveInterval = self.connectProps.server_keep_alive;
                            } else {
                                self.keepAliveInterval = MQTT_KEEP_ALIVE;
                            }
                            resetKeepAliveTimer();

                            // Relay the connack to the bridge (might need to resubscribe)
                            publishStatus(true);
                            sessionToBridge({
                                type: "connack",
                                is_connected: true,
                                client_id: self.clientId,
                                connack: msg
                            });

                            // Now that the bridge resubscribed we can send the queued messages.
                            sendQueuedMessages();
                            break;
                        case MQTT_RC_BAD_USERNAME_OR_PASSWORD:
                            // Bad credentials, retry anonymous
                            self.authUserPassword.username = undefined;
                            self.authUserPassword.password = undefined;
                            /* falls through */
                        case MQTT_RC_CLIENT_ID_INVALID:
                            // On next retry let the server pick a client id.
                            self.clientId = '';
                            /* falls through */
                        default:
                            publishStatus(false);
                            sessionToBridge({
                                type: "connack",
                                is_connected: false,
                                connack: msg
                            });
                    }
                    break;
                case 'puback':
                    if (self.awaitingAck[msg.packet_id]) {
                        if (self.awaitingAck[msg.packet_id].type != 'puback') {
                            console.log("MQTT: Unexpected puback for ", self.awaitingAck[msg.packet_id]);
                        } else {
                            // TODO: associate the original publish command
                            // sessionToBridge(msg);
                        }
                        delete self.awaitingAck[msg.packet_id];
                    } else {
                        console.log("MQTT: puback for unknown packet_id", msg.packet_id);
                    }
                    break;
                case 'pubrec':
                    if (self.awaitingAck[msg.packet_id]) {
                        // TODO: associate the original publish command
                        // sessionToBridge(msg);
                    }
                    if (msg.reason_code < 0x80) {
                        if (self.awaitingAck[msg.packet_id]) {
                            if (self.awaitingAck[msg.packet_id].type != 'pubrec') {
                                console.log("MQTT: Unexpected pubrec for ", self.awaitingAck[msg.packet_id]);
                            }
                            self.awaitingAck[msg.packet_id].type = 'pubcomp';
                            self.awaitingAck[msg.packet_id].msg = undefined;
                            replyMsg = { type: 'pubrel', packet_id: msg.packet_id };
                        } else {
                            replyMsg = { type: 'pubrel', packet_id: msg.packet_id, reason_code: MQTT_RC_PACKET_ID_NOT_FOUND };
                        }
                    } else {
                        if (self.awaitingAck[msg.packet_id]) {
                            delete self.awaitingAck[msg.packet_id];
                        }
                    }
                    break;
                case 'pubcomp':
                    if (self.awaitingAck[msg.packet_id]) {
                        if (self.awaitingAck[msg.packet_id].type != 'pubcomp') {
                            console.log("MQTT: Unexpected pubcomp for ", self.awaitingAck[msg.packet_id]);
                        }
                        delete self.awaitingAck[msg.packet_id];
                    }
                    break;
                case 'suback':
                    if (self.awaitingAck[msg.packet_id]) {
                        if (self.awaitingAck[msg.packet_id].type != 'suback') {
                            console.log("MQTT: Unexpected suback for ", self.awaitingAck[msg.packet_id]);
                        } else {
                            let ackMsg = {
                                type: 'suback',
                                topics: self.awaitingAck[msg.packet_id].topics,
                                acks: msg.acks
                            };
                            sessionToBridge(ackMsg);
                        }
                        delete self.awaitingAck[msg.packet_id];
                    }
                    break;
                case 'unsuback':
                    if (self.awaitingAck[msg.packet_id]) {
                        if (self.awaitingAck[msg.packet_id].type != 'unsuback') {
                            console.log("MQTT: Unexpected unsuback for ", self.awaitingAck[msg.packet_id]);
                        } else {
                            let ackMsg = {
                                type: 'unsuback',
                                topics: self.awaitingAck[msg.packet_id].topics,
                                acks: msg.acks
                            };
                            sessionToBridge(ackMsg);
                        }
                        delete self.awaitingAck[msg.packet_id];
                    }
                    break;
                case 'publish':
                    var isPubOk = false;
                    var await;
                    switch (msg.qos) {
                        case 0:
                            isPubOk = true;
                            break;
                        case 1:
                            if (self.awaitingRel[msg.packet_id]) {
                                replyMsg = {
                                    type: 'puback',
                                    packet_id: msg.packet_id,
                                    reason_code: MQTT_RC_PACKET_ID_IN_USE
                                };
                            } else {
                                isPubOk = true;
                                replyMsg = {
                                    type: 'puback',
                                    packet_id: msg.packet_id
                                };
                            }
                            break;
                        case 2:
                            replyMsg = {
                                type: 'pubrec',
                                packet_id: msg.packet_id
                            };
                            if (self.awaitingRel[msg.packet_id]) {
                                await = self.awaitingRel[msg.packet_id];
                                replyMsg.reason_code = await.reason_code;
                            } else {
                                isPubOk = true;
                            }
                            self.awaitingRel[msg.packet_id] = {
                                type: 'pubrel',
                                nr: self.messageNr++
                            };
                    }
                    if (isPubOk) {
                        var ct = msg.properties.content_type;
                        msg.payload = decodePayload(msg.payload, ct);

                        sessionToBridge(msg);

                        if (replyMsg) {
                            replyMsg.reason_code = MQTT_RC_SUCCESS;
                        }
                        if (await) {
                            await.reason_code = MQTT_RC_SUCCESS;
                        }
                    }
                    break;
                case 'pubrel':
                    if (self.awaitingRel[msg.packet_id]) {
                        delete self.awaitingRel[msg.packet_id];
                        replyMsg = {
                            type: 'pubcomp',
                            packet_id: msg.packet_id
                        };
                    } else {
                        replyMsg = {
                            type: 'pubcomp',
                            packet_id: msg.packet_id,
                            reason_code: MQTT_RC_PACKET_ID_NOT_FOUND
                        };
                    }
                    break;
                case 'pingreq':
                    self.sendMessage({ type: 'pingresp' });
                    break;
                case 'pingresp':
                    self.isWaitPingResp = false;
                    break;
                case 'disconnect':
                    closeConnections();
                    break;
                case 'auth':
                    // TODO: pass AUTH message to the runtime for re-authentication
                    sessionToBridge(msg);
                    break;
                default:
                    break;
            }
            if (replyMsg) {
                setTimeout(function() { self.sendMessage(replyMsg); }, 0);
            }
        }


        /**
         * Force all connections closed - happens on:
         * - receive of 'DISCONNECT'
         * - keep-alive timeout
         */
        function closeConnections() {
            for (let k in self.connection) {
                self.connection[k].closeConnection();
            }
            self.connection = {};
            self.isWaitPingResp = false;
            self.isSentConnect = false;
            self.isWaitConnack = false;
            self.keepAliveInterval = 0;
            stopKeepAliveTimer();
            publishStatus(false);
        }

        /**
         * Set the packetId to the next unused number
         */
        function nextPacketId() {
            do {
                self.packetId++;
                if (self.packetId > 65535) {
                    self.packetId = 1;
                }
            } while (self.awaitingAck[self.packetId]);
            return self.packetId;
        }

        /**
         * Publish a message to the broker
         */
        function localPublish( topic, msg, opts ) {
            cotonic.broker.publish(topic, msg, opts);
        }

        /**
         * Subscribe to a topic on the broker
         */
        function localSubscribe( topic, callback ) {
            cotonic.broker.subscribe(topic, callback);
        }

        /**
         * Publish the current connection status
         */
        function publishStatus( isConnected ) {
            localPublish(
                self.bridgeTopics.session_status,
                { is_connected: isConnected, client_id: self.clientId  },
                { retain: true });
        }

        /**
         * Initialize, connect to local topics
         */
        function init() {
            publishStatus( false );
            localSubscribe(self.bridgeTopics.session_out, sessionToRemote);
            localSubscribe(self.bridgeTopics.session_control, sessionControl);
        }

        init();
    }

    // Publish the MQTT session functions.
    cotonic.mqtt_session = cotonic.mqtt_session || {};
    cotonic.mqtt_session.newSession = newSession;
    cotonic.mqtt_session.findSession = findSession;
    cotonic.mqtt_session.deleteSession = deleteSession;

    init();

}(cotonic));
/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cotonic = cotonic || {};

(function (cotonic) {
    const BRIDGE_LOCAL_TOPIC = "bridge/+name/#topic";
    const BRIDGE_STATUS_TOPIC = "$bridge/+name/status";
    const BRIDGE_AUTH_TOPIC = "$bridge/+name/auth";
    const BRIDGE_CONTROL_TOPIC = "$bridge/+name/control";

    const SESSION_IN_TOPIC = "session/+name/in";
    const SESSION_OUT_TOPIC = "session/+name/out";
    const SESSION_STATUS_TOPIC = "session/+name/status";
    const SESSION_CONTROL_TOPIC = "session/+name/control";

    // Bridges to remote servers and clients
    var bridges = {};

    var newBridge = function( remote, options ) {
        remote = remote || 'origin';
        options = options || {};
        if(!options.mqtt_session) {
            options.mqtt_session = cotonic.mqtt_session;
        }

        let bridge = bridges[remote];

        if (!bridge) {
            bridge = new mqttBridge();
            bridges[remote] = bridge;
            bridge.connect(remote, options);
        }
        return bridge;
    };

    var disconnectBridge = function( remote ) {
        const bridge = findBridge(remote);

        if(!bridge)
            return;

        return bridge.disconnect();
    };

    var findBridge = function( remote ) {
        remote = remote || 'origin';
        return bridges[remote];
    };

    var deleteBridge = function( remote ) {
        remote = remote || 'origin';
        delete bridges[remote];
    };


    /*************************************************************************************************/
    /****************************************** MQTT Bridge ******************************************/
    /*************************************************************************************************/

    function mqttBridge () {

        var remote;
        var name;
        var session;
        var clientId;
        var routingId;
        var local_topics = {};
        var sessionTopic;
        var is_connected = false;
        var is_ui_state = false;
        var session_present = false;
        var self = this;
        var wid;

        this.connect = function ( remote, options ) {
            self.mqtt_session = options.mqtt_session;
            self.name = (options.name || remote.replace(/[^0-9a-zA-Z\.]/g, '-'));
            self.remote = remote;
            self.wid = "bridge/" + self.name;
            self.is_ui_state = options.is_ui_state || (remote == 'origin');
            self.local_topics = {
                // Comm between local broker and bridge
                bridge_local: cotonic.mqtt.fill(BRIDGE_LOCAL_TOPIC, {name: self.name, topic: "#topic"}),
                bridge_status: cotonic.mqtt.fill(BRIDGE_STATUS_TOPIC, {name: self.name}),
                bridge_auth: cotonic.mqtt.fill(BRIDGE_AUTH_TOPIC, {name: self.name}),
                bridge_control: cotonic.mqtt.fill(BRIDGE_CONTROL_TOPIC, {name: self.name}),

                // Comm between session and bridge
                session_in: cotonic.mqtt.fill(SESSION_IN_TOPIC, {name: self.name}),
                session_out: cotonic.mqtt.fill(SESSION_OUT_TOPIC, {name: self.name}),
                session_status: cotonic.mqtt.fill(SESSION_STATUS_TOPIC, {name: self.name}),
                session_control: cotonic.mqtt.fill(SESSION_CONTROL_TOPIC, {name: self.name})
            };
            cotonic.broker.subscribe(self.local_topics.bridge_local, relayOut, {wid: self.wid, no_local: true});
            cotonic.broker.subscribe(self.local_topics.bridge_control, bridgeControl);
            cotonic.broker.subscribe(self.local_topics.session_in, relayIn);
            cotonic.broker.subscribe(self.local_topics.session_status, sessionStatus);

            // Start a mqtt_session for the remote
            self.session = self.mqtt_session.newSession(remote, self.local_topics, options);
            publishStatus();
        };

        // Disconnect the session of this bridge.
        this.disconnect = function() {
            self.session.disconnect();
            self.mqtt_session.deleteSession(self.remote);
            self.session = undefined;
            self.mqtt_session = undefined;
            publishStatus();
        };

        // Relay a publish message to the remote
        function relayOut ( msg, props ) {
            // console.log("handleBridgeLocal", msg, props)
            switch (msg.type) {
                case 'publish':
                    // - remove "bridge/+name/" from the topic
                    // - rewrite response_topic (prefix "bridge/+routingId/")
                    // - publish to local_topics.session_out
                    msg.topic = dropRoutingTopic(msg.topic);
                    if (msg.properties && msg.properties.response_topic) {
                        msg.properties.response_topic = remoteRoutingTopic(msg.properties.response_topic);
                    }
                    cotonic.broker.publish(self.local_topics.session_out, msg);
                    break;
                default:
                    console.log("Bridge relayOut received unknown message", msg);
                    break;
            }
        }

        // Handle a message from the session, maybe relay to the local broker
        function relayIn ( msg ) {
            let relay = msg.payload;
            switch (relay.type) {
                case 'publish':
                    let topic = relay.topic;
                    let m = topic.match(/^bridge\/([^\/]+)\/(.*)/);
                    if (m) {
                        if (m[1] != self.clientId && m[1] != self.routingId) {
                            console.log("Bridge relay for unknown routing-id", topic);
                            return;
                        }
                        relay.topic = m[2];
                    } else {
                        relay.topic = localRoutingTopic(relay.topic);
                    }
                    if (relay.properties && relay.properties.response_topic) {
                        relay.properties.response_topic = localRoutingTopic(relay.properties.response_topic);
                    }
                    cotonic.broker.publish_mqtt_message(relay, { wid: self.wid });
                    break;
                case 'connack':
                    sessionConnack(relay);
                    break;
                case 'disconnect':
                    self.is_connected = false;
                    publishStatus();
                    break;
                case 'auth':
                    // Publish authentication status changes, might need user interaction
                    cotonic.broker.publish(self.local_topics.bridge_auth, relay, { wid: self.wid });
                    break;
                case 'suback':
                    // suback (multiple topics)
                    // non-conformant: the topics are added to the ack
                    for (let k = 0; k < relay.acks; k++) {
                        // Relay acks to bridge?
                    }
                    break;
                case 'puback':
                case 'pubrec':
                    // puback (per topic)
                    // non-conformant: add the topic in the ack
                    for (let k = 0; k < relay.acks; k++) {
                        // Relay acks to bridge?
                    }
                    break;
                default:
                    console.log("Bridge relayIn received unknown message", msg);
                    break;
            }
        }

        // Bridge control, called by broker on subscribe, unsubscribe, and for auth
        function bridgeControl ( msg ) {
            let payload = msg.payload;
            switch (payload.type) {
                case 'subscribe':
                    // Fetch topics
                    // Remove "bridge/+/" from topic
                    for(let k = 0; k < payload.topics.length; k++) {
                        payload.topics[k].topic = dropRoutingTopic(payload.topics[k].topic);
                    }
                    // Check administration:
                    //  - drop if qos <= or retain_handling >=
                    //  - subscribe if new or qos > or retain_handling <
                    // Relay subscribe with new topic list
                    cotonic.broker.publish(self.local_topics.session_out, payload);
                    break;
                case 'unsubscribe':
                    // Fetch topics
                    // For all topics: check if subscriber exists on broker
                    // If no subscriber: add to unsub list
                    // If subscriber: remove from unsub list
                    // Remove "bridge/+/" from topic
                    // Relay unsubscribe with new topic list
                    break;
                case 'auth':
                    // Forward AUTH messages as-is via the session to the remote server
                    cotonic.broker.publish(self.local_topics.session_out, payload);
                    break;
                default:
                    console.log("Bridge bridgeControl received unknown message", msg);
                    break;
            }
        }

        function sessionConnack ( msg ) {
            // 1. Register the clientId and the optional 'cotonic-routing-id' property
            self.is_connected = msg.is_connected;
            if (msg.is_connected) {
                // Either the existing client-id or an assigned client-id
                self.clientId = msg.client_id;

                // Optional routing-id, assigned by the server
                let props = msg.connack.properties;
                if (props && props['cotonic-routing-id']) {
                    self.routingId = props['cotonic-routing-id'];
                } else {
                    self.routingId = msg.client_id;
                }

                if (!msg.connack.session_present) {
                    // Subscribe to the client + routing forward topics
                    let topics = [
                        { topic: "bridge/" + self.clientId + "/#", qos: 2, no_local: true }
                    ];
                    if (self.clientId != self.routingId) {
                        topics.push({ topic: "bridge/" + self.routingId + "/#", qos: 2, no_local: true });
                    }
                    let subscribe = {
                        type: "subscribe",
                        topics: topics,
                    };
                    cotonic.broker.publish(self.local_topics.session_out, subscribe);
                    resubscribeTopics();
                    self.session_present = !!msg.connack.session_present;
                } else {
                    self.session_present = true;
                }
            }
            publishStatus();
        }

        function resubscribeTopics ( ) {
            let subs = cotonic.broker.find_subscriptions_below("bridge/" + self.name);
            let topics = {};
            for (let i = 0; i < subs.length; i++) {
                if (subs[i].wid == self.wid) {
                    continue;
                }
                let sub = Object.assign({}, subs[i].sub);
                sub.topic = cotonic.mqtt.remove_named_wildcards(sub.topic);
                if (!topics[sub.topic]) {
                    topics[sub.topic] = sub;
                } else {
                    mergeSubscription(topics[sub.topic], sub);
                }
            }
            let ts = [];
            for (let t in topics) {
                ts.push(topics[t]);
            }
            if (ts.length > 0) {
                bridgeControl({ type: 'publish', payload: { type: 'subscribe', topics: ts } });
            }
        }

        function mergeSubscription ( subA, subB ) {
            let qosA = subA.qos || 0;
            let qosB = subB.qos || 0;
            subA.qos = Math.max(qosA, qosB);

            let rhA = subA.retain_handling || 0;
            let rhB = subB.retain_handling || 0;
            subA.retain_handling = Math.min(rhA, rhB);

            subA.retain_as_published = subA.retain_as_published || subB.retain_as_published || false;
            subA.no_local = subA.no_local && subB.no_local;
        }

        // Session status changes
        function sessionStatus ( msg ) {
            self.is_connected = msg.is_connected;
        }

        function remoteRoutingTopic ( topic ) {
            return "bridge/" + self.routingId + "/" + topic;
        }

        function remoteClientTopic ( topic ) {
            return "bridge/" + self.routingId + "/" + topic;
        }

        function localRoutingTopic ( topic ) {
            return "bridge/" + self.name + "/" + topic;
        }

        function dropRoutingTopic ( topic ) {
            return topic.replace(/^bridge\/[^\/]+\//, '');
        }

        function publishStatus() {
            cotonic.broker.publish(
                self.local_topics.bridge_status,
                {
                    is_connected: self.is_connected,
                    session_present: self.session_present,
                    client_id: self.clientId
                },
                { retain: true });

            cotonic.broker.publish(
                'model/sessionStorage/post/mqtt$clientBridgeTopic',
                remoteClientTopic(""));

            if (self.is_ui_state) {
                let ui = {
                    classes: [],
                    status: {
                        'remote': self.remote,
                        'name': self.name
                    }
                };
                if (self.is_connected) {
                    ui.classes.push('connected');
                } else {
                    ui.classes.push('disconnected');
                }
                cotonic.broker.publish("model/bridge/event/ui-status", ui);
            }
        }

    }


    // Publish the MQTT bridge functions.
    cotonic.mqtt_bridge = cotonic.mqtt_bridge || {};
    cotonic.mqtt_bridge.newBridge = newBridge;
    cotonic.mqtt_bridge.disconnectBridge = disconnectBridge;
    cotonic.mqtt_bridge.findBridge = findBridge;
    cotonic.mqtt_bridge.deleteBridge = deleteBridge;

    cotonic.mqtt_bridge.bridges = bridges;

}(cotonic));
/**
 * Copyright 2021 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var cotonic = cotonic || {};

(function(cotonic) {
"use strict";

    function isInputElementActive() {
        if (!document.activeElement) {
            return false;
        }
        switch (document.activeElement.tagName) {
            case "INPUT":
            case "TEXTAREA":
            case "SELECT":
                return true;
            default:
                return false;
        }
    }

    cotonic.broker.subscribe("model/ui/event/dom-updated/+key",
        function(msg, bindings) {
            if (!isInputElementActive()) {
                // Check if inside the element with id 'key' is a
                // visible element with the 'autofocus' attribute
                let selector = "#" + bindings.key + " [autofocus]";
                let element = document.querySelector(selector);

                if (element && window.getComputedStyle(element).display !== "none") {
                    element.focus();
                    cotonic.broker.publish(
                        cotonic.mqtt.fill("model/autofocus/event/focus/+key", bindings)
                    );
                }
            }
        }
    );

}(cotonic));
/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var cotonic = cotonic || {};

(function(cotonic) {
"use strict";

    function init() {
    }

    cotonic.broker.subscribe("model/document/get/+key",
        function(msg, bindings) {
            let value = {};
            switch (bindings.key) {
                case "all":
                    value = {
                        screen_width: window.screen.width,
                        screen_height: window.screen.height,
                        inner_width: window.innerWidth,
                        inner_height: window.innerHeight,
                        is_touch: is_touch_device(),
                        timezone: timezone_info(),
                        language: language_info()
                    };
                    break;
                case "intl":
                    value = {
                        timezone: timezone_info(),
                        language: language_info()
                    };
                    break;
                default:
                    value = null;
                    break;
            }
            if(msg.properties.response_topic) {
                cotonic.broker.publish(msg.properties.response_topic, value);
            }
        }
    );

    // Used to fetch z.tz and z.lang cookies

    cotonic.broker.subscribe("model/document/get/cookie/+key",
        function(msg, bindings) {
            if(msg.properties.response_topic) {
                cotonic.broker.publish(msg.properties.response_topic, getCookie(bindings.key));
            }
        }
    );

    cotonic.broker.subscribe("model/document/post/cookie/+key",
        function(msg, bindings) {
            setCookie(bindings.key, msg.payload.value, msg.payload.exdays);
            if(msg.properties.response_topic) {
                cotonic.broker.publish(msg.properties.response_topic, getCookie(bindings.key));
            }
        }
    );

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/; Secure; SameSite=None";
    }

    // TODO: handle case of fixed/guessed timezone
    function timezone_info() {
        return {
            cookie: getCookie("z.tz"),
            user_agent: timezone()
        };
    }

    function language_info() {
        return {
            cookie: getCookie("z.lang"),
            user_agent: navigator.language,
            document: document.body.parentElement.getAttribute("lang")
        };
    }

    // Return the timezone of the browser, return null if none could be determined
    function timezone() {
        if (typeof Intl === "object" && typeof Intl.DateTimeFormat === "function") {
            let options = Intl.DateTimeFormat().resolvedOptions();
            if (typeof options === "object" && options.timeZone) {
                return options.timeZone;
            }
        }
        if (typeof window.jstz === "object") {
            return window.jstz.determine().name();
        }
        if (typeof window.moment === "object" && typeof window.moment.tz === "function") {
            return window.moment.tz();
        }
        return null;
    }

    function is_touch_device() {
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        var mq = function(query) {
            return window.matchMedia(query).matches;
        };
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            return true;
        }
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }

    init();

}(cotonic));
/**
 * Copyright 2021 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var cotonic = cotonic || {};

(function(cotonic) {
"use strict";
    const model = {
        state: undefined,
        online: undefined
    };

    const actions = {};
    const state = {};
    
    /*
     * Diagram of state transitions.
     *
     * digraph state {
     *
     *   active -> passive;
     *   passive -> active;
     *
     *   passive -> hidden;
     *   hidden -> passive;
     *
     *   hidden -> terminated;
     *   hidden -> frozen;
     *
     *   frozen -> hidden;
     * }
     *
     * digraph online {
     *     online -> offline;
     *     offline -> online;
     * }
     */

    const validTransitions = {
        active:  {
            passive: [],
            hidden: ["passive"],
            frozen: ["passive", "hidden"],
            terminated: ["passive", "hidden"],
        },
        passive: {
            active: [],
            hidden: [],
            frozen: ["hidden"],
            terminated: ["hidden"]
        },
        hidden:  {
            active: ["passive"],
            passive: [],
            frozen: [],
            terminated: []
        },
        frozen:  {
            active: ["hidden", "passive"],
            passive: ["hidden"],
            hidden: [],
            terminated: ["hidden"]
        },
        terminated: {
        }
    };

    model.present = function(proposal) {
        if(proposal.is_init) {
            listenToLifecycleEvents();

            model.state = proposal.newState;
            model.online = proposal.online; 

            cotonic.broker.publish("model/lifecycle/event/ping", "pong", { retain: true });
            cotonic.broker.publish("model/lifecycle/event/state", model.state, { retain: true });
            cotonic.broker.publish("model/lifecycle/event/online", model.online, { retain: true });
        } else {
            if(proposal.type === "onlineState") {
                if(model.online !== proposal.online) {
                    model.online = proposal.online;
                    cotonic.broker.publish("model/lifecycle/event/online", model.online, { retain: true });
                }
            } else if(proposal.type === "blur") {
                if(model.state === "active") {
                    doPossibleStateChange(model, proposal.newState);
                }
            } else if(proposal.type === "visibilitychange") {
                if(model.state !== "frozen" && model.state !== "terminated") {
                    doPossibleStateChange(model, proposal.newState); 
                }
            } else {
                doPossibleStateChange(model, proposal.newState); 
            }
        }

        state.render(model);
    };

    //
    // State
    //
    
    state.nextAction = function(model) {
    };

    state.representation = function(model) {
    };

    state.render = function(model) {
        state.representation(model);
        state.nextAction(model) ;
    };

    //
    // Actions
    //
    
    actions.focus = function() {
        model.present({type: "focus", newState: "active"});
    };

    actions.freeze = function() {
        model.present({type: "freeze", newState: "frozen"});
    };

    actions.terminatedOrFrozen = function(evt) {
        model.present({type: evt.type, newState: evt.persisted ? "frozen" : "terminated"});
    };

    actions.handleEvent = function(evt) {
        model.present({type: evt.type, newState: getCurrentState()});
    };

    actions.handleOnlineStatus = function(evt) {
        model.present({type: "onlineState", online: navigator.onLine});
    };

    //
    // Helpers
    //
    
    function listenToLifecycleEvents() {
        const opts = { capture: true, passive: true };

        window.addEventListener("focus", actions.focus, opts);
        window.addEventListener("freeze", actions.freeze, opts);

        window.addEventListener("blur", actions.handleEvent, opts);
        window.addEventListener("visibilitychange", actions.handleEvent, opts);
        window.addEventListener("resume", actions.handleEvent, opts);
        window.addEventListener("pageshow", actions.handleEvent, opts);

        window.addEventListener("pagehide", actions.terminatedOrFrozen, opts);
        window.addEventListener("unload", actions.terminatedOrFrozen, opts);

        window.addEventListener("online", actions.handleOnlineStatus, opts);
        window.addEventListener("offline", actions.handleOnlineStatus, opts);
    }

    function getCurrentState() {
        if (document.visibilityState === "hidden") {
            return "hidden";
        }

        if (document.hasFocus()) {
            return "active";
        }

        return "passive";
    }

    function doPossibleStateChange(model, newState) {
        // Get the transition path
        const transitions = validTransitions[model.state];
        if(transitions === undefined) return;

        const transitionPath = transitions[newState];
        if(transitionPath === undefined) return;

        for(let i=0; i < transitionPath.length; i++) {
            cotonic.broker.publish("model/lifecycle/event/state", transitionPath[i], { retain: true });
        }
        cotonic.broker.publish("model/lifecycle/event/state", newState, { retain: true });

        model.state = newState;
    }


    //
    // Start
    //

    model.present({is_init: true, newState: getCurrentState(), online: navigator.onLine});
}(cotonic));
/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var cotonic = cotonic || {};

(function(cotonic) {
"use strict";

    cotonic.broker.subscribe("model/localStorage/get/+key", function(msg, bindings) {
        if (msg.properties.response_topic) {
            let value = window.localStorage.getItem(bindings.key);
            if (typeof value == "string") {
                try { value = JSON.parse(value); }
                catch (e) { }
            }
            cotonic.broker.publish(msg.properties.response_topic, value);
        }
    });

    cotonic.broker.subscribe("model/localStorage/post/+key", function(msg, bindings) {
        window.localStorage.setItem(bindings.key, JSON.stringify(msg.payload));
        if (msg.properties.response_topic) {
            cotonic.broker.publish(msg.properties.response_topic, msg.payload);
        }
        cotonic.broker.publish("model/localStorage/event/" + bindings.key, msg.payload);
    });

    cotonic.broker.subscribe("model/localStorage/delete/+key", function(msg, bindings) {
        window.localStorage.removeItem(bindings.key);
        if (msg.properties.response_topic) {
            cotonic.broker.publish(msg.properties.response_topic, null);
        }
        cotonic.broker.publish("model/localStorage/event/" + bindings.key, null);
    });

    // Called if localStorage is changed in another window
    window.addEventListener(
        'storage',
        function(evt) {
            if (evt.type == 'storage' && evt.storageArea === window.localStorage) {
                let value = evt.newValue;
                if (typeof value == "string") {
                    try { value = JSON.parse(value); }
                    catch (e) { }
                }
                cotonic.broker.publish("model/localStorage/event/" + evt.key, value);
            }
        },
        false);

    cotonic.broker.publish("model/localStorage/event/ping", "pong", { retain: true });

}(cotonic));
/**
 * Copyright 2019 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cotonic = cotonic || {};

(function(cotonic) {
"use strict";

    let location = {};
    let isNavigating = false;

    function init() {
        cotonic.broker.publish("model/location/event/ping", "pong", { retain: true });

        publishLocation( true );
        // Track navigation
        window.addEventListener("hashchange", publishLocation, false);
    }

    // Publish all info about our current location
    function publishLocation() {
        const oldhash = location.hash;
        const oldpathname = location.pathname;
        const oldsearch = location.search;
        const oldpathname_search = location.pathname_search;
        const pathname_search = cotonic.config.pathname_search || (document.body && document.body.getAttribute("data-cotonic-pathname-search")) || "";

        location.protocol = window.location.protocol;
        location.port = window.location.port;
        location.host = window.location.host;
        location.hostname = window.location.hostname;
        location.href = window.location.href;
        location.pathname = window.location.pathname;
        location.origin = window.location.origin;
        location.hash = window.location.hash;
        location.search = window.location.search;
        location.pathname_search = pathname_search;

        if (oldsearch !== location.search || oldpathname_search !== location.pathname_search) {
            // Merge query args from the dispatcher and the query string
            // The dispatcher's query args are derived from the pathname.
            let q = parseQs(window.location.search);
            const pathq = parseQs("?" + pathname_search);
            for (let k in pathq) {
                q[k] = pathq[k];
            }
            location.q = q;
        }

        cotonic.broker.publish(
            "model/location/event",
            location,
            { retain: true });

        if (oldpathname !== location.pathname) {
            cotonic.broker.publish(
                "model/location/event/pathname",
                location.pathname,
                { retain: true });
        }

        if (oldsearch !== location.search || oldpathname_search !== location.pathname_search) {
            cotonic.broker.publish(
                "model/location/event/q",
                location.q,
                { retain: true });
        }

        if (oldhash !== location.hash) {
            cotonic.broker.publish(
                "model/location/event/hash",
                location.hash === "" ? "#" : location.hash,
                { retain: true });
        }
    }

    // Parse the query string, keys with "[]" are appended as an array.
    function parseQs ( qs ) {
        let q = {};
        let ps = [];

        const searchParams = new URLSearchParams(qs);
        searchParams.forEach(function(value, key) {
            ps.push([ key, value ]);
        });

        for (let i = 0; i < ps.length; i++) {
            const name = ps[i][0];
            const indexed = name.match(/^(.*)\[([^\[]*)\]$/);
            if (indexed) {
                const iname = indexed[1] + '[]';
                if (typeof q[iname] === 'undefined') {
                    q[iname] = [];
                }
                if (indexed[2].length > 0) {
                    q[iname][indexed[2]] = ps[i][1];
                } else {
                    q[iname].push(ps[i][1]);
                }
            } else {
                q[name] = ps[i][1];
            }
        }
        return q;
    }

    // Bind to the authentication change events

    cotonic.broker.subscribe("model/auth/event/auth-changing",
        function(msg) {
            if (!isNavigating) {
                // Authentication is changing, possible actions:
                // - Reload page
                // - Redirect to other page (from the 'p' query argument, passed via 'onauth')
                // - Do nothing (the ui will adapt itself)
                let onauth = msg.payload.onauth || document.body.parentNode.getAttribute("data-onauth");

                if (onauth === null || onauth !== "#") {
                    setTimeout(function() {
                       if (onauth === null || onauth === '#reload') {
                            window.location.reload(true);
                        } else if (onauth.charAt(0) == '/') {
                            window.location.href = onauth;
                        } else if (onauth.charAt(0) == '#') {
                            window.location.hash = onauth;
                        }
                    }, 0);
                }
            }
        }
    );

    // Model functions

    cotonic.broker.subscribe("model/location/get/+what", function(msg, bindings) {
        var resp = location[bindings.what];
        maybeRespond(resp, msg);
    });

    cotonic.broker.subscribe("model/location/post/redirect", function(msg) {
        if (msg.payload.url) {
            window.location = msg.payload.url;
            willNavigate();
        }
    });

    cotonic.broker.subscribe("model/location/post/reload", function(msg) {
        window.location.reload(true);
        willNavigate();
    }); 

    cotonic.broker.subscribe("model/location/post/redirect/back", function() {
        if ('referrer' in document) {
            window.location = document.referrer;
        } else {
            window.history.back();
        }
    });

    function maybeRespond(result, msg) {
        if(msg.properties.response_topic) {
            cotonic.broker.publish(msg.properties.response_topic, result);
        }
    }

    function willNavigate() {
        // Set the isNavigate flag to trigger we are currently 
        // busy navigating. When an auth change message is received
        // this will not trigger extra reloads.
        isNavigating = true;
        setTimeout(function() { isNavigating = false; }, 1000);
    }

    init();

}(cotonic));
/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* Starts the service worker and adds message relay topics */

var cotonic = cotonic || {};

(function(cotonic) {
"use strict";
    const console = window.console;

    cotonic.load_config_defaults(
        {start_service_worker: true,
         service_worker_src: "/cotonic-service-worker.js"});

    if (cotonic.config.start_service_worker && navigator.serviceWorker) {
        navigator.serviceWorker
            .register(cotonic.config.service_worker_src)
            .catch(
                function(error) {
                    switch (error.name) {
                        case 'SecurityError':
                            console.log("Could not start serviceWorker due to a SecurityError.");
                            console.log("See https://cotonic.org/#model.serviceWorker for more information.");
                            break;
                        default:
                            console.log("Could not start serviceWorker: ", error.message);
                            break;
                    }
                });

        navigator.serviceWorker.addEventListener('message', function(event) {
            switch (event.data.type) {
                case "broadcast":
                    let message = event.data.message;
                    message.topic = "model/serviceWorker/event/broadcast/" + event.data.channel;
                    cotonic.broker.publish_mqtt_message(message);
                    break;
                default:
                    console.log("Unknown event from service worker", event);
                    break;
            }
        });
    }

    cotonic.broker.subscribe("model/serviceWorker/post/broadcast/+channel", function(msg, bindings) {
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            let data = {
                type: "broadcast",
                message: msg,
                channel: bindings.channel
            };
            navigator.serviceWorker.controller.postMessage(data);
        } else {
            msg.topic = "model/serviceWorker/event/broadcast/" + bindings.channel;
            cotonic.broker.publish_mqtt_message(msg);
        }
    });

    cotonic.broker.publish("model/serviceWorker/event/ping", "pong", { retain: true });

}(cotonic));
/**
 * Copyright 2021 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var cotonic = cotonic || {};

(function(cotonic) {
"use strict";

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    function setcookie(value) {
        cotonic.broker.publish("model/document/post/cookie/cotonic-sid",
                { value: value, exdays: 14 });
    }

    function generate() {
        let value = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        window.localStorage.setItem("cotonic-sid", JSON.stringify(value));
        cotonic.broker.publish("model/document/post/cookie/cotonic-sid",
                { value: value, exdays: 4 });
        cotonic.broker.publish("model/sessionId/event", value);
        return value;
    }

    cotonic.broker.subscribe("model/sessionId/get", function(msg, bindings) {
        if (msg.properties.response_topic) {
            let value = window.localStorage.getItem("cotonic-sid");
            if (typeof value == "string") {
                try { value = JSON.parse(value); }
                catch (e) {
                    value = generate();
                }
            } else {
                value = generate();
            }
            cotonic.broker.publish(msg.properties.response_topic, value);
        }
    });

    cotonic.broker.subscribe("model/sessionId/post/reset", function(msg, bindings) {
        let value = generate();
        if (msg.properties.response_topic) {
            cotonic.broker.publish(msg.properties.response_topic, value);
        }
    });

    cotonic.broker.subscribe("model/sessionId/delete", function(msg, bindings) {
        window.localStorage.removeItem("cotonic-sid");
        if (msg.properties.response_topic) {
            cotonic.broker.publish(msg.properties.response_topic, null);
        }
        cotonic.broker.publish("model/document/post/cookie/cotonic-sid",
                { value: "", exdays: 0 });
        cotonic.broker.publish("model/sessionId/event", null);
    });

    cotonic.broker.subscribe("model/localStorage/event/cotonic-sid", function(value) {
        cotonic.broker.publish("model/sessionId/event", value);
    });


    function init() {
        let value = window.localStorage.getItem("cotonic-sid");
        if (typeof value == "string") {
            try {
                value = JSON.parse(value);
                if (typeof value == "string" && value !== "") {
                    setcookie(value);
                } else {
                    generate();
                }
            }
            catch (e) {
                value = generate();
            }
        } else {
            value = generate();
        }
    }

    init();

    cotonic.broker.publish("model/sessionId/event/ping", "pong", { retain: true });

}(cotonic));
/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cotonic = cotonic || {};

(function(cotonic) {
"use strict";

    // Direct key / value
    cotonic.broker.subscribe("model/sessionStorage/get/+key", function(msg, bindings) {
        if (msg.properties.response_topic) {
            let value = window.sessionStorage.getItem(bindings.key);
            if (typeof value == "string") {
                try { value = JSON.parse(value); }
                catch (e) { }
            }
            cotonic.broker.publish(msg.properties.response_topic, value);
        }
    });

    cotonic.broker.subscribe("model/sessionStorage/post/+key", function(msg, bindings) {
        window.sessionStorage.setItem(bindings.key, JSON.stringify(msg.payload));
        if (msg.properties.response_topic) {
            cotonic.broker.publish(msg.properties.response_topic, msg.payload);
        }
        cotonic.broker.publish("model/sessionStorage/event/" + bindings.key, msg.payload);
    });

    cotonic.broker.subscribe("model/sessionStorage/delete/+key", function(msg, bindings) {
        window.sessionStorage.removeItem(bindings.key);
        if (msg.properties.response_topic) {
            cotonic.broker.publish(msg.properties.response_topic, null);
        }
        cotonic.broker.publish("model/sessionStorage/event/" + bindings.key, null);
    });


    // Item with subkeys
    cotonic.broker.subscribe("model/sessionStorage/get/+key/+subkey", function(msg, bindings) {
        if (msg.properties.response_topic) {
            let value = window.sessionStorage.getItem(bindings.key);
            if (typeof value == "string") {
                try { value = JSON.parse(value); }
                catch (e) { value = {}; }
            }
            value = value || {};
            cotonic.broker.publish(msg.properties.response_topic, value[bindings.subkey]);
        }
    });

    cotonic.broker.subscribe("model/sessionStorage/post/+key/+subkey", function(msg, bindings) {
        let value = window.sessionStorage.getItem(bindings.key);
        if (typeof value == "string") {
            try { value = JSON.parse(value); }
            catch (e) { value = {}; }
        }
        value = value || {};
        value[bindings.subkey] = msg.payload;
        window.sessionStorage.setItem(bindings.key, JSON.stringify(value));
        if (msg.properties.response_topic) {
            cotonic.broker.publish(msg.properties.response_topic, value);
        }
    });

    cotonic.broker.subscribe("model/sessionStorage/delete/+key/+subkey", function(msg, bindings) {
        let value = window.sessionStorage.getItem(bindings.key);
        if (typeof value == "string") {
            try { value = JSON.parse(value); }
            catch (e) { value = {}; }
        }
        value = value || {};
        delete value[bindings.subkey];
        window.sessionStorage.setItem(bindings.key, JSON.stringify(value));
        if (msg.properties.response_topic) {
            cotonic.broker.publish(msg.properties.response_topic, value);
        }
    });


    // Called if sessionStorage is changed in an iframe in the same tab
    window.addEventListener(
        'storage',
        function(evt) {
            if (evt.type == 'storage' && evt.storageArea === window.sessionStorage) {
                let value = evt.newValue;
                if (typeof value == "string") {
                    try { value = JSON.parse(value); }
                    catch (e) { }
                }
                cotonic.broker.publish("model/sessionStorage/event/" + evt.key, value);
            }
        },
        false);

    cotonic.broker.publish("model/sessionStorage/event/ping", "pong", { retain: true });

}(cotonic));
/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cotonic = cotonic || {};

(function(cotonic) {
"use strict";

    let is_activity_event = false;
    let render_serial = 1;
    const render_cache = {};

    function maybeRespond(result, properties) {
        if(properties.response_topic) {
            cotonic.broker.publish(properties.response_topic, result);
        }
    }

    function hashCode( s ) {
        let hash = 0, i = 0, len = s.length;
        while ( i < len ) {
            hash  = ((hash << 5) - hash + s.charCodeAt(i++)) << 0;
        }
        return hash;
    }

    function init() {
        // Track activity, for refreshing active sessions
        document.addEventListener("visibilitychange", activity_event, { passive: true });
        document.addEventListener("scroll", activity_event, { passive: true });
        document.addEventListener("keydown", activity_event, { passive: true });
        document.addEventListener("mousemove", activity_event, { passive: true });
        document.addEventListener("click", activity_event, { passive: true });
        document.addEventListener("focus", activity_event, { passive: true });
        setInterval(activity_publish, 10000);

        initTopicEvents(document);

        IncrementalDOM.notifications.nodesCreated = function(nodes) {
            for(const n in nodes) {
                if(!n.id) continue;
                cotonic.broker.publish("model/ui/event/node-created/" + n.id, {id: n.id});
            }
        };

        IncrementalDOM.notifications.nodesDeleted = function(nodes) {
            for(const n in nodes) {
                if(!n.id) continue;
                cotonic.broker.publish("model/ui/event/node-deleted/" + n.id, {id: n.id});
            }
        };

        if (cotonic.bufferedEvents) {
            for (const e in cotonic.bufferedEvents) {
                topic_event(cotonic.bufferedEvents[e], true);
            }
            cotonic.bufferedEvents = [];
        }
    }

    // Hook into topic-connected event handlers (submit, click, etc.)
    function initTopicEvents(elt) {
        elt.addEventListener("submit", topic_event);
        elt.addEventListener("click", topic_event);
    }

    // The topic 'model/ui/event/recent-activity' is periodically pinged with a flag
    // signifying if there was user activity in the previous period.

    function activity_event() {
        is_activity_event = true;
    }

    function activity_publish() {
        cotonic.broker.publish("model/ui/event/recent-activity", { is_active: is_activity_event });
        is_activity_event = false;
    }

    // Map form submit and element clicks to topics.

    function topic_event( event, isBuffered ) {
        const topicName = `on${ event.type }Topic`;
        let topicTarget = undefined;

        let elt = event.target;
        while(elt) {
            if(topicName in elt.dataset) {
                topicTarget = elt;
                break;
            } 

            elt = elt.parentElement;
        }

        if(!topicTarget)
            return;

        const topic = topicTarget.dataset[topicName]
        let msg;
        let cancel = true;

        if (isBuffered) {
            // Buffered events are already canceled
            cancel = false;
        } else {
            let cancel = getFromDataset(event.target, topicTarget, `on${ event.type }Cancel`);

            switch (cancel) {
                case "0":
                case "no":
                case "false":
                    cancel = false;
                    break;
                case "preventDefault":
                    cancel = 'preventDefault';
                    break;
                default:
                    cancel = true;
                    break;
            }
        }

        msg = getFromDataset(event.target, topicTarget, `on${ event.type }Message`);
        if(msg) {
            msg = JSON.parse(msg);
        } else {
            msg = getAttributes(event.target, topicTarget);
        }

        let options = {
            cancel: cancel
        };

        const responseTopic = getFromDataset(event.target, topicTarget, `on${ event.type }ResponseTopic`);
        if (responseTopic) {
            options.response_topic = responseTopic;
        }

        cotonic.ui.on(topic, msg, event, options);

        if(event.type === "submit" && "onsubmitReset" in topicTarget.dataset) {
            topicTarget.reset();
        }
    }

    function getFromDataset(startElt, endElt, name) {
        let elt = startElt;

        do {
            if(name in elt.dataset) {
                return elt.dataset[name];
            }

            if(elt === endElt) 
                break;

            elt = elt.parentElement;
        } while(elt);
    }

    function getAttributes(startElt, endElt) {
        let elt = startElt;
        let attrs = {};

        do {
            let attributes = elt.attributes;
            for(let i = attributes.length - 1; i >= 0; i--) {
                let name = attributes[i].name;

                if(!attrs[name]) {
                    attrs[name] = attributes[i].value;
                }
            }

            if(elt === endElt)
                break;

            elt = elt.parentElement;
        } while(elt);

        return attrs;
    }

    // Bind the ui composer to the 'model/ui/#' topics

    cotonic.broker.subscribe("model/ui/render",
        function(msg) {
            maybeRespond(cotonic.ui.render(), msg.properties);
        }
    );

    cotonic.broker.subscribe("model/ui/render/+key",
        function(msg, bindings) {
            maybeRespond(cotonic.ui.render(bindings.key), msg.properties);
        }
    );

    cotonic.broker.subscribe("model/ui/get/+key",
        function(msg, bindings) {
            if(msg.properties.response_topic) {
                cotonic.broker.publish(msg.properties.response_topic, cotonic.ui.get(bindings.key));
            }
        }
    );

    cotonic.broker.subscribe("model/ui/insert/+key",
        function(msg, bindings) {
            const p = msg.payload || {};
            if (typeof p === "object" && p.status === "ok" && typeof p.result === "string") {
                maybeRespond(cotonic.ui.insert(bindings.key, true, p.result, undefined), msg.properties);
            } else {
                maybeRespond(cotonic.ui.insert(bindings.key, p.inner, p.initialData, p.priority), msg.properties);
            }
        }
    );

    cotonic.broker.subscribe("model/ui/update/+key",
        function(msg, bindings) {
            const p = msg.payload || "";
            let html;
            if (typeof p === "object" && p.status === "ok" && typeof p.result === "string") {
                html = p.result;
            } else {
                html = p;
            }
            maybeRespond(cotonic.ui.update(bindings.key, html), msg.properties);
        }
    );

    cotonic.broker.subscribe("model/ui/render-template/+key",
        function(msg, bindings) {
            const topic = msg.payload.topic;
            const data = msg.payload.data || {};
            const key = bindings.key;
            const dedup = msg.payload.dedup || false;
            const newHash = hashCode( JSON.stringify([topic,data]) );

            if (!dedup || !render_cache[key] || render_cache[key].hash != newHash) {
                const serial = render_serial++;

                render_cache[key] = {
                    serial: serial,
                    dedup: dedup,
                    hash: newHash,
                    topic: topic,
                    data: data
                };

                cotonic.broker.call(topic, data, { qos: dedup ? 1 : 0 })
                    .then(function(rendermsg) {
                        if (serial === render_cache[key].serial) {
                            const p = rendermsg.payload || "";
                            let html;
                            if (typeof p === "object" && p.status === "ok" && typeof p.result === "string") {
                                html = p.result;
                            } else {
                                html = p;
                            }
                            maybeRespond(cotonic.ui.update(key, html), msg.properties);
                        } else {
                            maybeRespond({ is_changed: false }, msg.properties);
                        }
                    });
            } else {
                maybeRespond({ is_changed: false }, msg.properties);
            }
        }
    );

    cotonic.broker.subscribe("model/ui/delete/+key",
        function(msg, bindings) {
            maybeRespond(cotonic.ui.remove(bindings.key), msg.properties);
        }
    );

    // Bind to the model ui-status events and update the cotonic.ui

    cotonic.broker.subscribe("model/+model/event/ui-status",
        function(msg, bindings) {
            if ("status" in msg.payload) {
                cotonic.ui.updateStateData(bindings.model, msg.payload.status);
            }
            if ("classes" in msg.payload) {
                cotonic.ui.updateStateClass(bindings.model, msg.payload.classes);
            }
        }
    );

    // Init the topic event listener when new shadow roots are added.
    cotonic.broker.subscribe("model/ui/event/new-shadow-root/+",
        function(msg) {
            initTopicEvents(msg.payload.shadow_root);
        }
    );

    init();

}(cotonic));
/**
 * Copyright 2020 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cotonic = cotonic || {};

(function(cotonic) {
"use strict";

    function init() {
    }

    cotonic.broker.subscribe("model/window/post/close",
        function(msg) {
            let result;

            if (window.opener) {
                window.close();
                result = true;
            } else {
                result = false;
            }
            if(msg.properties.response_topic) {
                cotonic.broker.publish(msg.properties.response_topic, result);
            }
        });

    cotonic.broker.subscribe("model/window/post/open",
        function(msg) {
            let options = {
                full:0,             // set the height/width to the current window, show scrollbars etc.
                centerBrowser:1,    // center window over browser window? {1 (YES) or 0 (NO)}. overrides top and left
                centerScreen:0,     // center window over entire screen? {1 (YES) or 0 (NO)}. overrides top and left
                height:500,         // sets the height in pixels of the window.
                left:0,             // left position when the window appears.
                location:0,         // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
                menubar:0,          // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
                resizable:0,        // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
                scrollbars:0,       // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
                status:0,           // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
                width:500,          // sets the width in pixels of the window.
                name:null,          // name of window
                top:0,              // top position when the window appears.
                toolbar:0           // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
            };

            if (typeof msg.payload.message == "object") {
                let attrs = msg.payload.message;
                if (attrs.href) {
                    options.url = msg.payload.message.href;
                    if (msg.payload.message['data-window']) {
                        if (typeof msg.payload.message['data-window'] == "string") {
                            attrs = JSON.parse(msg.payload.message['data-window']);
                        }
                    } else {
                        attrs = {};
                    }
                }
                let keys = Object.keys(attrs);
                for (let k in keys) {
                    options[k] = attrs[k];
                }
                let features = 'height=' + options.height +
                               ',width=' + options.width +
                               ',toolbar=' + (options.toolbar?'yes':'no') +
                               ',scrollbars=' + (options.scrollbars?'yes':'no') +
                               ',status=' + (options.status?'yes':'no') +
                               ',resizable=' + (options.resizable?'yes':'no') +
                               ',location=' + (options.location?'yes':'no') +
                               ',menubar=' + (options.menubar?'yes':'no');

                let top, left;

                if (options.centerBrowser && !options.centerScreen) {
                    top = window.screenY + (((window.outerHeight/2) - (options.height/2)));
                    left = window.screenX + (((window.outerWidth/2) - (options.width/2)));
                } else if (options.centerScreen) {
                    top = (screen.height - options.height)/2;
                    left = (screen.width - options.width)/2;
                } else {
                    top = options.top;
                    left = options.left;
                }
                if (options.name) {
                    options.name = options.name.replace(/[^a-zA-Z0-9]/g,'_');
                }
                let w = window.open(options.url, options.name, features+',left='+Math.ceil(left)+',top='+Math.ceil(top));
                // setTimeout(
                //     function() {
                //         if (w.innerWidth != undefined && w.innerWidth > 0) {
                //             w.resizeBy(options.width - w.innerWidth, options.height - w.innerHeight);
                //         }
                //     }, 500);
                w.focus();
            }
        });

    init();

}(cotonic));

/**
 * Copyright 2018 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";
var cotonic = cotonic || {};

(function (cotonic) {
    // Sizes of keys, iv's and such.
    const KEY_BYTES = 32;        // 256 bits
    const IV_BYTES = 16;         // 128 bits
    const KEY_ID_BYTES = 4;      // 32 bits
    const NONCE_BYTES = 8;       // 64 bits
    const AES_GCM_TAG_SIZE = 16; // 128 bits

    // Codes used in messages
    const V1 = 49;

    const HELLO = 72;
    const PUBLISH = 80; 
    const SUBSCRIBE = 83; 
    const DIRECT = 68; 
    const TICKETS = 84;
    const SESSION_KEY = 75;
    const SECURE_PUBLISH = 69;

    let textEncoder = new TextEncoder("utf-8");
    let textDecoder = new TextDecoder("utf-8");

    function randomNonce() {
        let nonce = new Uint8Array(NONCE_BYTES);
        crypto.getRandomValues(nonce);

        return nonce;
    }

    function randomIV() {
        let iv = new Uint8Array(IV_BYTES);
        crypto.getRandomValues(iv);

        return iv;
    }

    function generateKey() {
        return crypto.subtle.generateKey(
            {name: "AES-GCM", length: KEY_BYTES * 8}, true, ["encrypt", "decrypt"]);
    }

    function publicEncKey() {
        return crypto.subtle.importKey(
            "jwk",
            keyserver_public_encrypt_key,
            {name: "RSA-OAEP", hash: {name: "SHA-256"} },
            false, ["encrypt"]
        ); 
    }

    function exportKey(key) {
        return crypto.subtle.exportKey("raw", key);
    }

    function encodeHelloMessage(id, encodedKey, encodedNonce) {
        const encodedId = textEncoder.encode(id);
        const eKey = new Uint8Array(encodedKey);
        
        let msg = new Uint8Array(2 + KEY_BYTES + NONCE_BYTES + encodedId.length);

        msg[0] = V1;
        msg[1] = HELLO;
        msg.set(encodedKey, 2);
        msg.set(encodedNonce, 2 + KEY_BYTES);
        msg.set(encodedId, 2 + KEY_BYTES + NONCE_BYTES);

        return msg;
    }
    
    function encryptConnectMessage(id, key, nonce, pubServerEncKey) {
        return exportKey(key)
            .then(function(encodedKey) {
                const msg = encodeHelloMessage(id, encodedKey, nonce);
                return crypto.subtle.encrypt({name: "RSA-OAEP"}, pubServerEncKey, msg);
            });
    }

    function encodePublish(request) {
        const topic = textEncoder.encode(request.topic);
        let msg = new Uint8Array(1 + topic.length);
        
        msg[0] = PUBLISH;
        msg.set(topic, 1);

        return msg;
    }

    function encodeSubscribe(request) {
        const topic = textEncoder.encode(request.topic);
        let msg = new Uint8Array(1 + KEY_ID_BYTES + topic.length);

        msg[0] = SUBSCRIBE;
        msg.set(request.keyId, 1);
        msg.set(topic, 1 + KEY_ID_BYTES);

        return msg;
    }

    function encodeDirect(request) {
        const otherId = textEncoder.encode(request.otherId);
        let msg = new Uint8Array(1 + otherId.length)

        msg[0] = DIRECT;
        msg.set(otherId, 1);

        return msg;
    }

    function encodeRequest(request) {
        switch(request.type) {
        case PUBLISH:
            return encodePublish(request);
        case SUBSCRIBE:
            return encodeSubscribe(request);
        case DIRECT:
            return encodeDirect(request);
        default:
            throw new Error("Unknown request")
        }
    }

    function encryptRequest(id, nonce, request, key, iv) {
        const encId = textEncoder.encode(id);
        let req = encodeRequest(request);
        let msg = new Uint8Array(1 + NONCE_BYTES + req.length);

        msg[0] = V1;
        msg.set(nonce, 1);
        msg.set(req, 1 + NONCE_BYTES);

        // In js subtle crypto the tag is appended to the ciphertext.
        return crypto.subtle.encrypt({name: "AES-GCM",
                                      iv: iv, 
                                      additionalData: encId,
                                      tagLength: AES_GCM_TAG_SIZE * 8},
                                     key,
                                     msg);
    }

    function decryptResponse(id, nonce, response, key, iv) {
        const encId = textEncoder.encode(id);
        
        return crypto.subtle.decrypt({name: "AES-GCM",
                               iv: iv, 
                               additionalData: encId,
                               tagLength: AES_GCM_TAG_SIZE * 8},
                              key,
                              response)
            .then(function(plain) {
                return decodeResponse(plain);
            })
    }

    function decodeResponse(data) {
        const d = new Uint8Array(data); 
        
        if(d[0] != V1) throw new Error("Unexpected message");

        const nonce = d.slice(1, NONCE_BYTES+1);
        let result = {nonce: nonce};

        const PAYLOAD = NONCE_BYTES+1;

        switch(d[PAYLOAD]) {
        case PUBLISH:
            result.payload = {type: PUBLISH,
                              topic: textDecoder.decode(d.slice(PAYLOAD+1))};
            break;
        case DIRECT:
            result.payload = {type: DIRECT,
                              otherId: textDecoder.decode(d.slice(PAYLOAD+1))};
            break;
        case SUBSCRIBE:
            result.payload = {type: SUBSCRIBE,
                              keyId: d.slice(PAYLOAD+1, PAYLOAD+KEY_ID_BYTES+1),
                              topic: textDecoder.decode(d.slice(PAYLOAD+KEY_ID_BYTES+1))};
            break;
        case TICKETS:
            const ticketASize = payload[PAYLOAD+1]; 
            const ticketBSize = payload[ticketASize+PAYLOAD+2];

            const ticketA = payload.slice(PAYLOAD+2, ticketASize+PAYLOAD+2); 
            const ticketB = payload.slice(ticketASize+PAYLOAD+3, ticketASize+PAYLOAD+3+ticketBSize); 

            result.payload = {type: TICKETS, ticketA: ticketA, ticketB: ticketB};
            break;
        case SESSION_KEY:
            const key_id = payload.slice(PAYLOAD+1, PAYLOAD+KEY_ID_BYTES+1);
            const key_data = payload.slice(PAYLOAD+KEY_ID_BYTES+1,
                                           PAYLOAD+KEY_ID_BYTES+KEY_BYTES+1);
            const timestamp = toBigUnsignedInt(64,
                payload.slice(PAYLOAD+KEY_ID_BYTES+KEY_BYTES+1,
                              PAYLOAD+KEY_ID_BYTES+KEY_BYTES+1+8));
            const lifetime = toBigUnsignedInt(16,
                payload.slice(PAYLOAD+KEY_ID_BYTES+KEY_BYTES+1+8,
                              PAYLOAD+KEY_ID_BYTES+KEY_BYTES+1+8+2));  

            result.payload = {type: SESSION_KEY, keyId: key_id, timestamp: toDate(timestamp), lifetime: lifetime};
            break;
        default:
            throw new Error("Unknown payload type");
        }

        return result;
    }

    function encryptSecurePublish(message, keyId, key) {
        const iv = randomIV();
        const alg = {name: "AES-GCM",
                     iv: iv, 
                     additionalData: keyId,
                     tagLength: AES_GCM_TAG_SIZE * 8};

        return crypto.subtle.encrypt(alg, key, message)
            .then(function(cipherText) {
                return encodeSecurePublish(iv, new Uint8Array(cipherText));
            })
    }

    function encodeSecurePublish(iv, cipherText) {
        let msg = new Uint8Array(2 + iv.length + cipherText.length);

        msg[0] = V1;
        msg[1] = SECURE_PUBLISH;
        msg.set(iv, 2);
        msg.set(cipherText, 2+iv.length);

        return msg;
    }

    function decodeSecurePublish(data) {
        if(data[0] != V1) throw new Error("Unknown message");
        if(data[1] != SECURE_PUBLISH) throw new Error("Wrong message type");

        let iv = data.slice(2, IV_BYTES+2);
        let message = data.slice(IV_BYTES+2);

        return {type: SECURE_PUBLISH, iv: iv, message: message};
    }

    function decryptSecurePublish(message, keyId, key) {
        const d = decodeSecurePublish(message);
        const alg = {name: "AES-GCM",
                     iv: d.iv, 
                     additionalData: keyId,
                     tagLength: AES_GCM_TAG_SIZE * 8};

        return crypto.subtle.decrypt(alg, key, d.message);
    }

    function toDate(t) {
        let d = new Date();
        d.setTime(t);

        return d;
    }

    function toBigUnsignedInt(bits, buf) {
        if(bits % 8 != 0)
            throw new Error("Bits must be a multiple of 8");

        const nrBytes = bits / 8;
        let lshift = bits - 8;
        let r = 0;

        if(buf.length < nrBytes)
            throw new Error("Buffer too small to convert.");

        for(let i=0; i < nrBytes; i++) {
            r += (buf[i] * Math.pow(2, lshift));
            lshift -= 8;
        }

        return r;
    }

    cotonic.keyserver = cotonic.keyserver || {};

    // Payload types
    cotonic.keyserver.PUBLISH = PUBLISH;
    cotonic.keyserver.DIRECT = DIRECT;
    cotonic.keyserver.SUBSCRIBE = SUBSCRIBE;
    cotonic.keyserver.TICKETS = TICKETS;
    cotonic.keyserver.SESSION_KEY = SESSION_KEY;

    cotonic.keyserver.encryptSecurePublish = encryptSecurePublish;
    cotonic.keyserver.decryptSecurePublish = decryptSecurePublish;

    cotonic.keyserver.publicEncKey = publicEncKey;

    cotonic.keyserver.randomNonce = randomNonce;
    cotonic.keyserver.randomIV = randomIV;

    cotonic.keyserver.generateKey = generateKey;

    cotonic.keyserver.encryptConnectMessage = encryptConnectMessage;
    cotonic.keyserver.encryptRequest = encryptRequest;

    cotonic.keyserver.decryptResponse = decryptResponse;

    cotonic.keyserver.encryptSecurePublish = encryptSecurePublish;
    cotonic.keyserver.decryptSecurePublish = decryptSecurePublish;

    cotonic.keyserver.toBigUnsignedInt = toBigUnsignedInt;

}(cotonic));
/**
 * Copyright 2019-2021 The Cotonic Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cotonic = cotonic || {};

(function(cotonic) {
"use strict";
    cotonic.ready.then(function() {
        window.dispatchEvent((new Event("cotonic-ready")));
    })

    // Resolve the cotonic.ready promise
    cotonic.readyResolve();
}(cotonic));
