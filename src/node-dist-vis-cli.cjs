#!/usr/bin/env node
// Originally built from https://github.com/hubmapconsortium/hra-ui/blob/main/libs/node-dist-vis/src/cli.ts
//   Git commit: e919a5131fd990805a79fe8d036062b6fc02da98
"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/papaparse/papaparse.min.js
  var require_papaparse_min = __commonJS({
    "node_modules/papaparse/papaparse.min.js"(exports, module) {
      ((e, t) => {
        "function" == typeof define && define.amd ? define([], t) : "object" == typeof module && "undefined" != typeof exports ? module.exports = t() : e.Papa = t();
      })(exports, function r() {
        var n = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {};
        var d, s = !n.document && !!n.postMessage, a = n.IS_PAPA_WORKER || false, o = {}, h = 0, v = {};
        function u(e) {
          this._handle = null, this._finished = false, this._completed = false, this._halted = false, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = true, this._completeResults = { data: [], errors: [], meta: {} }, function(e2) {
            var t = b(e2);
            t.chunkSize = parseInt(t.chunkSize), e2.step || e2.chunk || (t.chunkSize = null);
            this._handle = new i(t), (this._handle.streamer = this)._config = t;
          }.call(this, e), this.parseChunk = function(t, e2) {
            var i2 = parseInt(this._config.skipFirstNLines) || 0;
            if (this.isFirstChunk && 0 < i2) {
              let e3 = this._config.newline;
              e3 || (r2 = this._config.quoteChar || '"', e3 = this._handle.guessLineEndings(t, r2)), t = [...t.split(e3).slice(i2)].join(e3);
            }
            this.isFirstChunk && U(this._config.beforeFirstChunk) && void 0 !== (r2 = this._config.beforeFirstChunk(t)) && (t = r2), this.isFirstChunk = false, this._halted = false;
            var i2 = this._partialLine + t, r2 = (this._partialLine = "", this._handle.parse(i2, this._baseIndex, !this._finished));
            if (!this._handle.paused() && !this._handle.aborted()) {
              t = r2.meta.cursor, i2 = (this._finished || (this._partialLine = i2.substring(t - this._baseIndex), this._baseIndex = t), r2 && r2.data && (this._rowCount += r2.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview);
              if (a) n.postMessage({ results: r2, workerId: v.WORKER_ID, finished: i2 });
              else if (U(this._config.chunk) && !e2) {
                if (this._config.chunk(r2, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = true);
                this._completeResults = r2 = void 0;
              }
              return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(r2.data), this._completeResults.errors = this._completeResults.errors.concat(r2.errors), this._completeResults.meta = r2.meta), this._completed || !i2 || !U(this._config.complete) || r2 && r2.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = true), i2 || r2 && r2.meta.paused || this._nextChunk(), r2;
            }
            this._halted = true;
          }, this._sendError = function(e2) {
            U(this._config.error) ? this._config.error(e2) : a && this._config.error && n.postMessage({ workerId: v.WORKER_ID, error: e2, finished: false });
          };
        }
        function f(e) {
          var r2;
          (e = e || {}).chunkSize || (e.chunkSize = v.RemoteChunkSize), u.call(this, e), this._nextChunk = s ? function() {
            this._readChunk(), this._chunkLoaded();
          } : function() {
            this._readChunk();
          }, this.stream = function(e2) {
            this._input = e2, this._nextChunk();
          }, this._readChunk = function() {
            if (this._finished) this._chunkLoaded();
            else {
              if (r2 = new XMLHttpRequest(), this._config.withCredentials && (r2.withCredentials = this._config.withCredentials), s || (r2.onload = y(this._chunkLoaded, this), r2.onerror = y(this._chunkError, this)), r2.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !s), this._config.downloadRequestHeaders) {
                var e2, t = this._config.downloadRequestHeaders;
                for (e2 in t) r2.setRequestHeader(e2, t[e2]);
              }
              var i2;
              this._config.chunkSize && (i2 = this._start + this._config.chunkSize - 1, r2.setRequestHeader("Range", "bytes=" + this._start + "-" + i2));
              try {
                r2.send(this._config.downloadRequestBody);
              } catch (e3) {
                this._chunkError(e3.message);
              }
              s && 0 === r2.status && this._chunkError();
            }
          }, this._chunkLoaded = function() {
            4 === r2.readyState && (r2.status < 200 || 400 <= r2.status ? this._chunkError() : (this._start += this._config.chunkSize || r2.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((e2) => null !== (e2 = e2.getResponseHeader("Content-Range")) ? parseInt(e2.substring(e2.lastIndexOf("/") + 1)) : -1)(r2), this.parseChunk(r2.responseText)));
          }, this._chunkError = function(e2) {
            e2 = r2.statusText || e2;
            this._sendError(new Error(e2));
          };
        }
        function l(e) {
          (e = e || {}).chunkSize || (e.chunkSize = v.LocalChunkSize), u.call(this, e);
          var i2, r2, n2 = "undefined" != typeof FileReader;
          this.stream = function(e2) {
            this._input = e2, r2 = e2.slice || e2.webkitSlice || e2.mozSlice, n2 ? ((i2 = new FileReader()).onload = y(this._chunkLoaded, this), i2.onerror = y(this._chunkError, this)) : i2 = new FileReaderSync(), this._nextChunk();
          }, this._nextChunk = function() {
            this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
          }, this._readChunk = function() {
            var e2 = this._input, t = (this._config.chunkSize && (t = Math.min(this._start + this._config.chunkSize, this._input.size), e2 = r2.call(e2, this._start, t)), i2.readAsText(e2, this._config.encoding));
            n2 || this._chunkLoaded({ target: { result: t } });
          }, this._chunkLoaded = function(e2) {
            this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e2.target.result);
          }, this._chunkError = function() {
            this._sendError(i2.error);
          };
        }
        function c(e) {
          var i2;
          u.call(this, e = e || {}), this.stream = function(e2) {
            return i2 = e2, this._nextChunk();
          }, this._nextChunk = function() {
            var e2, t;
            if (!this._finished) return e2 = this._config.chunkSize, i2 = e2 ? (t = i2.substring(0, e2), i2.substring(e2)) : (t = i2, ""), this._finished = !i2, this.parseChunk(t);
          };
        }
        function p(e) {
          u.call(this, e = e || {});
          var t = [], i2 = true, r2 = false;
          this.pause = function() {
            u.prototype.pause.apply(this, arguments), this._input.pause();
          }, this.resume = function() {
            u.prototype.resume.apply(this, arguments), this._input.resume();
          }, this.stream = function(e2) {
            this._input = e2, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
          }, this._checkIsFinished = function() {
            r2 && 1 === t.length && (this._finished = true);
          }, this._nextChunk = function() {
            this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i2 = true;
          }, this._streamData = y(function(e2) {
            try {
              t.push("string" == typeof e2 ? e2 : e2.toString(this._config.encoding)), i2 && (i2 = false, this._checkIsFinished(), this.parseChunk(t.shift()));
            } catch (e3) {
              this._streamError(e3);
            }
          }, this), this._streamError = y(function(e2) {
            this._streamCleanUp(), this._sendError(e2);
          }, this), this._streamEnd = y(function() {
            this._streamCleanUp(), r2 = true, this._streamData("");
          }, this), this._streamCleanUp = y(function() {
            this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
          }, this);
        }
        function i(m2) {
          var n2, s2, a2, t, o2 = Math.pow(2, 53), h2 = -o2, u2 = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, d2 = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, i2 = this, r2 = 0, f2 = 0, l2 = false, e = false, c2 = [], p2 = { data: [], errors: [], meta: {} };
          function y2(e2) {
            return "greedy" === m2.skipEmptyLines ? "" === e2.join("").trim() : 1 === e2.length && 0 === e2[0].length;
          }
          function g2() {
            if (p2 && a2 && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + v.DefaultDelimiter + "'"), a2 = false), m2.skipEmptyLines && (p2.data = p2.data.filter(function(e3) {
              return !y2(e3);
            })), _2()) {
              let t3 = function(e3, t4) {
                U(m2.transformHeader) && (e3 = m2.transformHeader(e3, t4)), c2.push(e3);
              };
              var t2 = t3;
              if (p2) if (Array.isArray(p2.data[0])) {
                for (var e2 = 0; _2() && e2 < p2.data.length; e2++) p2.data[e2].forEach(t3);
                p2.data.splice(0, 1);
              } else p2.data.forEach(t3);
            }
            function i3(e3, t3) {
              for (var i4 = m2.header ? {} : [], r4 = 0; r4 < e3.length; r4++) {
                var n3 = r4, s3 = e3[r4], s3 = ((e4, t4) => ((e5) => (m2.dynamicTypingFunction && void 0 === m2.dynamicTyping[e5] && (m2.dynamicTyping[e5] = m2.dynamicTypingFunction(e5)), true === (m2.dynamicTyping[e5] || m2.dynamicTyping)))(e4) ? "true" === t4 || "TRUE" === t4 || "false" !== t4 && "FALSE" !== t4 && (((e5) => {
                  if (u2.test(e5)) {
                    e5 = parseFloat(e5);
                    if (h2 < e5 && e5 < o2) return 1;
                  }
                })(t4) ? parseFloat(t4) : d2.test(t4) ? new Date(t4) : "" === t4 ? null : t4) : t4)(n3 = m2.header ? r4 >= c2.length ? "__parsed_extra" : c2[r4] : n3, s3 = m2.transform ? m2.transform(s3, n3) : s3);
                "__parsed_extra" === n3 ? (i4[n3] = i4[n3] || [], i4[n3].push(s3)) : i4[n3] = s3;
              }
              return m2.header && (r4 > c2.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + c2.length + " fields but parsed " + r4, f2 + t3) : r4 < c2.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + c2.length + " fields but parsed " + r4, f2 + t3)), i4;
            }
            var r3;
            p2 && (m2.header || m2.dynamicTyping || m2.transform) && (r3 = 1, !p2.data.length || Array.isArray(p2.data[0]) ? (p2.data = p2.data.map(i3), r3 = p2.data.length) : p2.data = i3(p2.data, 0), m2.header && p2.meta && (p2.meta.fields = c2), f2 += r3);
          }
          function _2() {
            return m2.header && 0 === c2.length;
          }
          function k(e2, t2, i3, r3) {
            e2 = { type: e2, code: t2, message: i3 };
            void 0 !== r3 && (e2.row = r3), p2.errors.push(e2);
          }
          U(m2.step) && (t = m2.step, m2.step = function(e2) {
            p2 = e2, _2() ? g2() : (g2(), 0 !== p2.data.length && (r2 += e2.data.length, m2.preview && r2 > m2.preview ? s2.abort() : (p2.data = p2.data[0], t(p2, i2))));
          }), this.parse = function(e2, t2, i3) {
            var r3 = m2.quoteChar || '"', r3 = (m2.newline || (m2.newline = this.guessLineEndings(e2, r3)), a2 = false, m2.delimiter ? U(m2.delimiter) && (m2.delimiter = m2.delimiter(e2), p2.meta.delimiter = m2.delimiter) : ((r3 = ((e3, t3, i4, r4, n3) => {
              var s3, a3, o3, h3;
              n3 = n3 || [",", "	", "|", ";", v.RECORD_SEP, v.UNIT_SEP];
              for (var u3 = 0; u3 < n3.length; u3++) {
                for (var d3, f3 = n3[u3], l3 = 0, c3 = 0, p3 = 0, g3 = (o3 = void 0, new E({ comments: r4, delimiter: f3, newline: t3, preview: 10 }).parse(e3)), _3 = 0; _3 < g3.data.length; _3++) i4 && y2(g3.data[_3]) ? p3++ : (d3 = g3.data[_3].length, c3 += d3, void 0 === o3 ? o3 = d3 : 0 < d3 && (l3 += Math.abs(d3 - o3), o3 = d3));
                0 < g3.data.length && (c3 /= g3.data.length - p3), (void 0 === a3 || l3 <= a3) && (void 0 === h3 || h3 < c3) && 1.99 < c3 && (a3 = l3, s3 = f3, h3 = c3);
              }
              return { successful: !!(m2.delimiter = s3), bestDelimiter: s3 };
            })(e2, m2.newline, m2.skipEmptyLines, m2.comments, m2.delimitersToGuess)).successful ? m2.delimiter = r3.bestDelimiter : (a2 = true, m2.delimiter = v.DefaultDelimiter), p2.meta.delimiter = m2.delimiter), b(m2));
            return m2.preview && m2.header && r3.preview++, n2 = e2, s2 = new E(r3), p2 = s2.parse(n2, t2, i3), g2(), l2 ? { meta: { paused: true } } : p2 || { meta: { paused: false } };
          }, this.paused = function() {
            return l2;
          }, this.pause = function() {
            l2 = true, s2.abort(), n2 = U(m2.chunk) ? "" : n2.substring(s2.getCharIndex());
          }, this.resume = function() {
            i2.streamer._halted ? (l2 = false, i2.streamer.parseChunk(n2, true)) : setTimeout(i2.resume, 3);
          }, this.aborted = function() {
            return e;
          }, this.abort = function() {
            e = true, s2.abort(), p2.meta.aborted = true, U(m2.complete) && m2.complete(p2), n2 = "";
          }, this.guessLineEndings = function(e2, t2) {
            e2 = e2.substring(0, 1048576);
            var t2 = new RegExp(P(t2) + "([^]*?)" + P(t2), "gm"), i3 = (e2 = e2.replace(t2, "")).split("\r"), t2 = e2.split("\n"), e2 = 1 < t2.length && t2[0].length < i3[0].length;
            if (1 === i3.length || e2) return "\n";
            for (var r3 = 0, n3 = 0; n3 < i3.length; n3++) "\n" === i3[n3][0] && r3++;
            return r3 >= i3.length / 2 ? "\r\n" : "\r";
          };
        }
        function P(e) {
          return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        function E(C) {
          var S = (C = C || {}).delimiter, O = C.newline, x = C.comments, I = C.step, A = C.preview, T = C.fastMode, D = null, L = false, F = null == C.quoteChar ? '"' : C.quoteChar, j = F;
          if (void 0 !== C.escapeChar && (j = C.escapeChar), ("string" != typeof S || -1 < v.BAD_DELIMITERS.indexOf(S)) && (S = ","), x === S) throw new Error("Comment character same as delimiter");
          true === x ? x = "#" : ("string" != typeof x || -1 < v.BAD_DELIMITERS.indexOf(x)) && (x = false), "\n" !== O && "\r" !== O && "\r\n" !== O && (O = "\n");
          var z = 0, M = false;
          this.parse = function(i2, t, r2) {
            if ("string" != typeof i2) throw new Error("Input must be a string");
            var n2 = i2.length, e = S.length, s2 = O.length, a2 = x.length, o2 = U(I), h2 = [], u2 = [], d2 = [], f2 = z = 0;
            if (!i2) return w();
            if (T || false !== T && -1 === i2.indexOf(F)) {
              for (var l2 = i2.split(O), c2 = 0; c2 < l2.length; c2++) {
                if (d2 = l2[c2], z += d2.length, c2 !== l2.length - 1) z += O.length;
                else if (r2) return w();
                if (!x || d2.substring(0, a2) !== x) {
                  if (o2) {
                    if (h2 = [], k(d2.split(S)), R(), M) return w();
                  } else k(d2.split(S));
                  if (A && A <= c2) return h2 = h2.slice(0, A), w(true);
                }
              }
              return w();
            }
            for (var p2 = i2.indexOf(S, z), g2 = i2.indexOf(O, z), _2 = new RegExp(P(j) + P(F), "g"), m2 = i2.indexOf(F, z); ; ) if (i2[z] === F) for (m2 = z, z++; ; ) {
              if (-1 === (m2 = i2.indexOf(F, m2 + 1))) return r2 || u2.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: h2.length, index: z }), E2();
              if (m2 === n2 - 1) return E2(i2.substring(z, m2).replace(_2, F));
              if (F === j && i2[m2 + 1] === j) m2++;
              else if (F === j || 0 === m2 || i2[m2 - 1] !== j) {
                -1 !== p2 && p2 < m2 + 1 && (p2 = i2.indexOf(S, m2 + 1));
                var y2 = v2(-1 === (g2 = -1 !== g2 && g2 < m2 + 1 ? i2.indexOf(O, m2 + 1) : g2) ? p2 : Math.min(p2, g2));
                if (i2.substr(m2 + 1 + y2, e) === S) {
                  d2.push(i2.substring(z, m2).replace(_2, F)), i2[z = m2 + 1 + y2 + e] !== F && (m2 = i2.indexOf(F, z)), p2 = i2.indexOf(S, z), g2 = i2.indexOf(O, z);
                  break;
                }
                y2 = v2(g2);
                if (i2.substring(m2 + 1 + y2, m2 + 1 + y2 + s2) === O) {
                  if (d2.push(i2.substring(z, m2).replace(_2, F)), b2(m2 + 1 + y2 + s2), p2 = i2.indexOf(S, z), m2 = i2.indexOf(F, z), o2 && (R(), M)) return w();
                  if (A && h2.length >= A) return w(true);
                  break;
                }
                u2.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: h2.length, index: z }), m2++;
              }
            }
            else if (x && 0 === d2.length && i2.substring(z, z + a2) === x) {
              if (-1 === g2) return w();
              z = g2 + s2, g2 = i2.indexOf(O, z), p2 = i2.indexOf(S, z);
            } else if (-1 !== p2 && (p2 < g2 || -1 === g2)) d2.push(i2.substring(z, p2)), z = p2 + e, p2 = i2.indexOf(S, z);
            else {
              if (-1 === g2) break;
              if (d2.push(i2.substring(z, g2)), b2(g2 + s2), o2 && (R(), M)) return w();
              if (A && h2.length >= A) return w(true);
            }
            return E2();
            function k(e2) {
              h2.push(e2), f2 = z;
            }
            function v2(e2) {
              var t2 = 0;
              return t2 = -1 !== e2 && (e2 = i2.substring(m2 + 1, e2)) && "" === e2.trim() ? e2.length : t2;
            }
            function E2(e2) {
              return r2 || (void 0 === e2 && (e2 = i2.substring(z)), d2.push(e2), z = n2, k(d2), o2 && R()), w();
            }
            function b2(e2) {
              z = e2, k(d2), d2 = [], g2 = i2.indexOf(O, z);
            }
            function w(e2) {
              if (C.header && !t && h2.length && !L) {
                var s3 = h2[0], a3 = /* @__PURE__ */ Object.create(null), o3 = new Set(s3);
                let n3 = false;
                for (let r3 = 0; r3 < s3.length; r3++) {
                  let i3 = s3[r3];
                  if (a3[i3 = U(C.transformHeader) ? C.transformHeader(i3, r3) : i3]) {
                    let e3, t2 = a3[i3];
                    for (; e3 = i3 + "_" + t2, t2++, o3.has(e3); ) ;
                    o3.add(e3), s3[r3] = e3, a3[i3]++, n3 = true, (D = null === D ? {} : D)[e3] = i3;
                  } else a3[i3] = 1, s3[r3] = i3;
                  o3.add(i3);
                }
                n3 && console.warn("Duplicate headers found and renamed."), L = true;
              }
              return { data: h2, errors: u2, meta: { delimiter: S, linebreak: O, aborted: M, truncated: !!e2, cursor: f2 + (t || 0), renamedHeaders: D } };
            }
            function R() {
              I(w()), h2 = [], u2 = [];
            }
          }, this.abort = function() {
            M = true;
          }, this.getCharIndex = function() {
            return z;
          };
        }
        function g(e) {
          var t = e.data, i2 = o[t.workerId], r2 = false;
          if (t.error) i2.userError(t.error, t.file);
          else if (t.results && t.results.data) {
            var n2 = { abort: function() {
              r2 = true, _(t.workerId, { data: [], errors: [], meta: { aborted: true } });
            }, pause: m, resume: m };
            if (U(i2.userStep)) {
              for (var s2 = 0; s2 < t.results.data.length && (i2.userStep({ data: t.results.data[s2], errors: t.results.errors, meta: t.results.meta }, n2), !r2); s2++) ;
              delete t.results;
            } else U(i2.userChunk) && (i2.userChunk(t.results, n2, t.file), delete t.results);
          }
          t.finished && !r2 && _(t.workerId, t.results);
        }
        function _(e, t) {
          var i2 = o[e];
          U(i2.userComplete) && i2.userComplete(t), i2.terminate(), delete o[e];
        }
        function m() {
          throw new Error("Not implemented.");
        }
        function b(e) {
          if ("object" != typeof e || null === e) return e;
          var t, i2 = Array.isArray(e) ? [] : {};
          for (t in e) i2[t] = b(e[t]);
          return i2;
        }
        function y(e, t) {
          return function() {
            e.apply(t, arguments);
          };
        }
        function U(e) {
          return "function" == typeof e;
        }
        return v.parse = function(e, t) {
          var i2 = (t = t || {}).dynamicTyping || false;
          U(i2) && (t.dynamicTypingFunction = i2, i2 = {});
          if (t.dynamicTyping = i2, t.transform = !!U(t.transform) && t.transform, !t.worker || !v.WORKERS_SUPPORTED) return i2 = null, v.NODE_STREAM_INPUT, "string" == typeof e ? (e = ((e2) => 65279 !== e2.charCodeAt(0) ? e2 : e2.slice(1))(e), i2 = new (t.download ? f : c)(t)) : true === e.readable && U(e.read) && U(e.on) ? i2 = new p(t) : (n.File && e instanceof File || e instanceof Object) && (i2 = new l(t)), i2.stream(e);
          (i2 = (() => {
            var e2;
            return !!v.WORKERS_SUPPORTED && (e2 = (() => {
              var e3 = n.URL || n.webkitURL || null, t2 = r.toString();
              return v.BLOB_URL || (v.BLOB_URL = e3.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", t2, ")();"], { type: "text/javascript" })));
            })(), (e2 = new n.Worker(e2)).onmessage = g, e2.id = h++, o[e2.id] = e2);
          })()).userStep = t.step, i2.userChunk = t.chunk, i2.userComplete = t.complete, i2.userError = t.error, t.step = U(t.step), t.chunk = U(t.chunk), t.complete = U(t.complete), t.error = U(t.error), delete t.worker, i2.postMessage({ input: e, config: t, workerId: i2.id });
        }, v.unparse = function(e, t) {
          var n2 = false, _2 = true, m2 = ",", y2 = "\r\n", s2 = '"', a2 = s2 + s2, i2 = false, r2 = null, o2 = false, h2 = ((() => {
            if ("object" == typeof t) {
              if ("string" != typeof t.delimiter || v.BAD_DELIMITERS.filter(function(e2) {
                return -1 !== t.delimiter.indexOf(e2);
              }).length || (m2 = t.delimiter), "boolean" != typeof t.quotes && "function" != typeof t.quotes && !Array.isArray(t.quotes) || (n2 = t.quotes), "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (i2 = t.skipEmptyLines), "string" == typeof t.newline && (y2 = t.newline), "string" == typeof t.quoteChar && (s2 = t.quoteChar), "boolean" == typeof t.header && (_2 = t.header), Array.isArray(t.columns)) {
                if (0 === t.columns.length) throw new Error("Option columns is empty");
                r2 = t.columns;
              }
              void 0 !== t.escapeChar && (a2 = t.escapeChar + s2), t.escapeFormulae instanceof RegExp ? o2 = t.escapeFormulae : "boolean" == typeof t.escapeFormulae && t.escapeFormulae && (o2 = /^[=+\-@\t\r].*$/);
            }
          })(), new RegExp(P(s2), "g"));
          "string" == typeof e && (e = JSON.parse(e));
          if (Array.isArray(e)) {
            if (!e.length || Array.isArray(e[0])) return u2(null, e, i2);
            if ("object" == typeof e[0]) return u2(r2 || Object.keys(e[0]), e, i2);
          } else if ("object" == typeof e) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || r2), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : "object" == typeof e.data[0] ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [e.data])), u2(e.fields || [], e.data || [], i2);
          throw new Error("Unable to serialize unrecognized input");
          function u2(e2, t2, i3) {
            var r3 = "", n3 = ("string" == typeof e2 && (e2 = JSON.parse(e2)), "string" == typeof t2 && (t2 = JSON.parse(t2)), Array.isArray(e2) && 0 < e2.length), s3 = !Array.isArray(t2[0]);
            if (n3 && _2) {
              for (var a3 = 0; a3 < e2.length; a3++) 0 < a3 && (r3 += m2), r3 += k(e2[a3], a3);
              0 < t2.length && (r3 += y2);
            }
            for (var o3 = 0; o3 < t2.length; o3++) {
              var h3 = (n3 ? e2 : t2[o3]).length, u3 = false, d2 = n3 ? 0 === Object.keys(t2[o3]).length : 0 === t2[o3].length;
              if (i3 && !n3 && (u3 = "greedy" === i3 ? "" === t2[o3].join("").trim() : 1 === t2[o3].length && 0 === t2[o3][0].length), "greedy" === i3 && n3) {
                for (var f2 = [], l2 = 0; l2 < h3; l2++) {
                  var c2 = s3 ? e2[l2] : l2;
                  f2.push(t2[o3][c2]);
                }
                u3 = "" === f2.join("").trim();
              }
              if (!u3) {
                for (var p2 = 0; p2 < h3; p2++) {
                  0 < p2 && !d2 && (r3 += m2);
                  var g2 = n3 && s3 ? e2[p2] : p2;
                  r3 += k(t2[o3][g2], p2);
                }
                o3 < t2.length - 1 && (!i3 || 0 < h3 && !d2) && (r3 += y2);
              }
            }
            return r3;
          }
          function k(e2, t2) {
            var i3, r3;
            return null == e2 ? "" : e2.constructor === Date ? JSON.stringify(e2).slice(1, 25) : (r3 = false, o2 && "string" == typeof e2 && o2.test(e2) && (e2 = "'" + e2, r3 = true), i3 = e2.toString().replace(h2, a2), (r3 = r3 || true === n2 || "function" == typeof n2 && n2(e2, t2) || Array.isArray(n2) && n2[t2] || ((e3, t3) => {
              for (var i4 = 0; i4 < t3.length; i4++) if (-1 < e3.indexOf(t3[i4])) return true;
              return false;
            })(i3, v.BAD_DELIMITERS) || -1 < i3.indexOf(m2) || " " === i3.charAt(0) || " " === i3.charAt(i3.length - 1)) ? s2 + i3 + s2 : i3);
          }
        }, v.RECORD_SEP = String.fromCharCode(30), v.UNIT_SEP = String.fromCharCode(31), v.BYTE_ORDER_MARK = "\uFEFF", v.BAD_DELIMITERS = ["\r", "\n", '"', v.BYTE_ORDER_MARK], v.WORKERS_SUPPORTED = !s && !!n.Worker, v.NODE_STREAM_INPUT = 1, v.LocalChunkSize = 10485760, v.RemoteChunkSize = 5242880, v.DefaultDelimiter = ",", v.Parser = E, v.ParserHandle = i, v.NetworkStreamer = f, v.FileStreamer = l, v.StringStreamer = c, v.ReadableStreamStreamer = p, n.jQuery && ((d = n.jQuery).fn.parse = function(o2) {
          var i2 = o2.config || {}, h2 = [];
          return this.each(function(e2) {
            if (!("INPUT" === d(this).prop("tagName").toUpperCase() && "file" === d(this).attr("type").toLowerCase() && n.FileReader) || !this.files || 0 === this.files.length) return true;
            for (var t = 0; t < this.files.length; t++) h2.push({ file: this.files[t], inputElem: this, instanceConfig: d.extend({}, i2) });
          }), e(), this;
          function e() {
            if (0 === h2.length) U(o2.complete) && o2.complete();
            else {
              var e2, t, i3, r2, n2 = h2[0];
              if (U(o2.before)) {
                var s2 = o2.before(n2.file, n2.inputElem);
                if ("object" == typeof s2) {
                  if ("abort" === s2.action) return e2 = "AbortError", t = n2.file, i3 = n2.inputElem, r2 = s2.reason, void (U(o2.error) && o2.error({ name: e2 }, t, i3, r2));
                  if ("skip" === s2.action) return void u2();
                  "object" == typeof s2.config && (n2.instanceConfig = d.extend(n2.instanceConfig, s2.config));
                } else if ("skip" === s2) return void u2();
              }
              var a2 = n2.instanceConfig.complete;
              n2.instanceConfig.complete = function(e3) {
                U(a2) && a2(e3, n2.file, n2.inputElem), u2();
              }, v.parse(n2.file, n2.instanceConfig);
            }
          }
          function u2() {
            h2.splice(0, 1), e();
          }
        }), a && (n.onmessage = function(e) {
          e = e.data;
          void 0 === v.WORKER_ID && e && (v.WORKER_ID = e.workerId);
          "string" == typeof e.input ? n.postMessage({ workerId: v.WORKER_ID, results: v.parse(e.input, e.config), finished: true }) : (n.File && e.input instanceof File || e.input instanceof Object) && (e = v.parse(e.input, e.config)) && n.postMessage({ workerId: v.WORKER_ID, results: e, finished: true });
        }), (f.prototype = Object.create(u.prototype)).constructor = f, (l.prototype = Object.create(u.prototype)).constructor = l, (c.prototype = Object.create(c.prototype)).constructor = c, (p.prototype = Object.create(u.prototype)).constructor = p, v;
      });
    }
  });

  // node_modules/commander/lib/error.js
  var require_error = __commonJS({
    "node_modules/commander/lib/error.js"(exports) {
      var CommanderError2 = class extends Error {
        /**
         * Constructs the CommanderError class
         * @param {number} exitCode suggested exit code which could be used with process.exit
         * @param {string} code an id string representing the error
         * @param {string} message human-readable description of the error
         */
        constructor(exitCode, code, message) {
          super(message);
          Error.captureStackTrace(this, this.constructor);
          this.name = this.constructor.name;
          this.code = code;
          this.exitCode = exitCode;
          this.nestedError = void 0;
        }
      };
      var InvalidArgumentError2 = class extends CommanderError2 {
        /**
         * Constructs the InvalidArgumentError class
         * @param {string} [message] explanation of why argument is invalid
         */
        constructor(message) {
          super(1, "commander.invalidArgument", message);
          Error.captureStackTrace(this, this.constructor);
          this.name = this.constructor.name;
        }
      };
      exports.CommanderError = CommanderError2;
      exports.InvalidArgumentError = InvalidArgumentError2;
    }
  });

  // node_modules/commander/lib/argument.js
  var require_argument = __commonJS({
    "node_modules/commander/lib/argument.js"(exports) {
      var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
      var Argument2 = class {
        /**
         * Initialize a new command argument with the given name and description.
         * The default is that the argument is required, and you can explicitly
         * indicate this with <> around the name. Put [] around the name for an optional argument.
         *
         * @param {string} name
         * @param {string} [description]
         */
        constructor(name, description) {
          this.description = description || "";
          this.variadic = false;
          this.parseArg = void 0;
          this.defaultValue = void 0;
          this.defaultValueDescription = void 0;
          this.argChoices = void 0;
          switch (name[0]) {
            case "<":
              this.required = true;
              this._name = name.slice(1, -1);
              break;
            case "[":
              this.required = false;
              this._name = name.slice(1, -1);
              break;
            default:
              this.required = true;
              this._name = name;
              break;
          }
          if (this._name.endsWith("...")) {
            this.variadic = true;
            this._name = this._name.slice(0, -3);
          }
        }
        /**
         * Return argument name.
         *
         * @return {string}
         */
        name() {
          return this._name;
        }
        /**
         * @package
         */
        _collectValue(value, previous) {
          if (previous === this.defaultValue || !Array.isArray(previous)) {
            return [value];
          }
          previous.push(value);
          return previous;
        }
        /**
         * Set the default value, and optionally supply the description to be displayed in the help.
         *
         * @param {*} value
         * @param {string} [description]
         * @return {Argument}
         */
        default(value, description) {
          this.defaultValue = value;
          this.defaultValueDescription = description;
          return this;
        }
        /**
         * Set the custom handler for processing CLI command arguments into argument values.
         *
         * @param {Function} [fn]
         * @return {Argument}
         */
        argParser(fn) {
          this.parseArg = fn;
          return this;
        }
        /**
         * Only allow argument value to be one of choices.
         *
         * @param {string[]} values
         * @return {Argument}
         */
        choices(values) {
          this.argChoices = values.slice();
          this.parseArg = (arg, previous) => {
            if (!this.argChoices.includes(arg)) {
              throw new InvalidArgumentError2(
                `Allowed choices are ${this.argChoices.join(", ")}.`
              );
            }
            if (this.variadic) {
              return this._collectValue(arg, previous);
            }
            return arg;
          };
          return this;
        }
        /**
         * Make argument required.
         *
         * @returns {Argument}
         */
        argRequired() {
          this.required = true;
          return this;
        }
        /**
         * Make argument optional.
         *
         * @returns {Argument}
         */
        argOptional() {
          this.required = false;
          return this;
        }
      };
      function humanReadableArgName(arg) {
        const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
        return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
      }
      exports.Argument = Argument2;
      exports.humanReadableArgName = humanReadableArgName;
    }
  });

  // node_modules/commander/lib/help.js
  var require_help = __commonJS({
    "node_modules/commander/lib/help.js"(exports) {
      var { humanReadableArgName } = require_argument();
      var Help2 = class {
        constructor() {
          this.helpWidth = void 0;
          this.minWidthToWrap = 40;
          this.sortSubcommands = false;
          this.sortOptions = false;
          this.showGlobalOptions = false;
        }
        /**
         * prepareContext is called by Commander after applying overrides from `Command.configureHelp()`
         * and just before calling `formatHelp()`.
         *
         * Commander just uses the helpWidth and the rest is provided for optional use by more complex subclasses.
         *
         * @param {{ error?: boolean, helpWidth?: number, outputHasColors?: boolean }} contextOptions
         */
        prepareContext(contextOptions) {
          this.helpWidth = this.helpWidth ?? contextOptions.helpWidth ?? 80;
        }
        /**
         * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
         *
         * @param {Command} cmd
         * @returns {Command[]}
         */
        visibleCommands(cmd) {
          const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
          const helpCommand = cmd._getHelpCommand();
          if (helpCommand && !helpCommand._hidden) {
            visibleCommands.push(helpCommand);
          }
          if (this.sortSubcommands) {
            visibleCommands.sort((a, b) => {
              return a.name().localeCompare(b.name());
            });
          }
          return visibleCommands;
        }
        /**
         * Compare options for sort.
         *
         * @param {Option} a
         * @param {Option} b
         * @returns {number}
         */
        compareOptions(a, b) {
          const getSortKey = (option) => {
            return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
          };
          return getSortKey(a).localeCompare(getSortKey(b));
        }
        /**
         * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
         *
         * @param {Command} cmd
         * @returns {Option[]}
         */
        visibleOptions(cmd) {
          const visibleOptions = cmd.options.filter((option) => !option.hidden);
          const helpOption = cmd._getHelpOption();
          if (helpOption && !helpOption.hidden) {
            const removeShort = helpOption.short && cmd._findOption(helpOption.short);
            const removeLong = helpOption.long && cmd._findOption(helpOption.long);
            if (!removeShort && !removeLong) {
              visibleOptions.push(helpOption);
            } else if (helpOption.long && !removeLong) {
              visibleOptions.push(
                cmd.createOption(helpOption.long, helpOption.description)
              );
            } else if (helpOption.short && !removeShort) {
              visibleOptions.push(
                cmd.createOption(helpOption.short, helpOption.description)
              );
            }
          }
          if (this.sortOptions) {
            visibleOptions.sort(this.compareOptions);
          }
          return visibleOptions;
        }
        /**
         * Get an array of the visible global options. (Not including help.)
         *
         * @param {Command} cmd
         * @returns {Option[]}
         */
        visibleGlobalOptions(cmd) {
          if (!this.showGlobalOptions) return [];
          const globalOptions = [];
          for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
            const visibleOptions = ancestorCmd.options.filter(
              (option) => !option.hidden
            );
            globalOptions.push(...visibleOptions);
          }
          if (this.sortOptions) {
            globalOptions.sort(this.compareOptions);
          }
          return globalOptions;
        }
        /**
         * Get an array of the arguments if any have a description.
         *
         * @param {Command} cmd
         * @returns {Argument[]}
         */
        visibleArguments(cmd) {
          if (cmd._argsDescription) {
            cmd.registeredArguments.forEach((argument) => {
              argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
            });
          }
          if (cmd.registeredArguments.find((argument) => argument.description)) {
            return cmd.registeredArguments;
          }
          return [];
        }
        /**
         * Get the command term to show in the list of subcommands.
         *
         * @param {Command} cmd
         * @returns {string}
         */
        subcommandTerm(cmd) {
          const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
          return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
          (args ? " " + args : "");
        }
        /**
         * Get the option term to show in the list of options.
         *
         * @param {Option} option
         * @returns {string}
         */
        optionTerm(option) {
          return option.flags;
        }
        /**
         * Get the argument term to show in the list of arguments.
         *
         * @param {Argument} argument
         * @returns {string}
         */
        argumentTerm(argument) {
          return argument.name();
        }
        /**
         * Get the longest command term length.
         *
         * @param {Command} cmd
         * @param {Help} helper
         * @returns {number}
         */
        longestSubcommandTermLength(cmd, helper) {
          return helper.visibleCommands(cmd).reduce((max, command) => {
            return Math.max(
              max,
              this.displayWidth(
                helper.styleSubcommandTerm(helper.subcommandTerm(command))
              )
            );
          }, 0);
        }
        /**
         * Get the longest option term length.
         *
         * @param {Command} cmd
         * @param {Help} helper
         * @returns {number}
         */
        longestOptionTermLength(cmd, helper) {
          return helper.visibleOptions(cmd).reduce((max, option) => {
            return Math.max(
              max,
              this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
            );
          }, 0);
        }
        /**
         * Get the longest global option term length.
         *
         * @param {Command} cmd
         * @param {Help} helper
         * @returns {number}
         */
        longestGlobalOptionTermLength(cmd, helper) {
          return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
            return Math.max(
              max,
              this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
            );
          }, 0);
        }
        /**
         * Get the longest argument term length.
         *
         * @param {Command} cmd
         * @param {Help} helper
         * @returns {number}
         */
        longestArgumentTermLength(cmd, helper) {
          return helper.visibleArguments(cmd).reduce((max, argument) => {
            return Math.max(
              max,
              this.displayWidth(
                helper.styleArgumentTerm(helper.argumentTerm(argument))
              )
            );
          }, 0);
        }
        /**
         * Get the command usage to be displayed at the top of the built-in help.
         *
         * @param {Command} cmd
         * @returns {string}
         */
        commandUsage(cmd) {
          let cmdName = cmd._name;
          if (cmd._aliases[0]) {
            cmdName = cmdName + "|" + cmd._aliases[0];
          }
          let ancestorCmdNames = "";
          for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
            ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
          }
          return ancestorCmdNames + cmdName + " " + cmd.usage();
        }
        /**
         * Get the description for the command.
         *
         * @param {Command} cmd
         * @returns {string}
         */
        commandDescription(cmd) {
          return cmd.description();
        }
        /**
         * Get the subcommand summary to show in the list of subcommands.
         * (Fallback to description for backwards compatibility.)
         *
         * @param {Command} cmd
         * @returns {string}
         */
        subcommandDescription(cmd) {
          return cmd.summary() || cmd.description();
        }
        /**
         * Get the option description to show in the list of options.
         *
         * @param {Option} option
         * @return {string}
         */
        optionDescription(option) {
          const extraInfo = [];
          if (option.argChoices) {
            extraInfo.push(
              // use stringify to match the display of the default value
              `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
            );
          }
          if (option.defaultValue !== void 0) {
            const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
            if (showDefault) {
              extraInfo.push(
                `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
              );
            }
          }
          if (option.presetArg !== void 0 && option.optional) {
            extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
          }
          if (option.envVar !== void 0) {
            extraInfo.push(`env: ${option.envVar}`);
          }
          if (extraInfo.length > 0) {
            const extraDescription = `(${extraInfo.join(", ")})`;
            if (option.description) {
              return `${option.description} ${extraDescription}`;
            }
            return extraDescription;
          }
          return option.description;
        }
        /**
         * Get the argument description to show in the list of arguments.
         *
         * @param {Argument} argument
         * @return {string}
         */
        argumentDescription(argument) {
          const extraInfo = [];
          if (argument.argChoices) {
            extraInfo.push(
              // use stringify to match the display of the default value
              `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
            );
          }
          if (argument.defaultValue !== void 0) {
            extraInfo.push(
              `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
            );
          }
          if (extraInfo.length > 0) {
            const extraDescription = `(${extraInfo.join(", ")})`;
            if (argument.description) {
              return `${argument.description} ${extraDescription}`;
            }
            return extraDescription;
          }
          return argument.description;
        }
        /**
         * Format a list of items, given a heading and an array of formatted items.
         *
         * @param {string} heading
         * @param {string[]} items
         * @param {Help} helper
         * @returns string[]
         */
        formatItemList(heading, items, helper) {
          if (items.length === 0) return [];
          return [helper.styleTitle(heading), ...items, ""];
        }
        /**
         * Group items by their help group heading.
         *
         * @param {Command[] | Option[]} unsortedItems
         * @param {Command[] | Option[]} visibleItems
         * @param {Function} getGroup
         * @returns {Map<string, Command[] | Option[]>}
         */
        groupItems(unsortedItems, visibleItems, getGroup) {
          const result = /* @__PURE__ */ new Map();
          unsortedItems.forEach((item) => {
            const group = getGroup(item);
            if (!result.has(group)) result.set(group, []);
          });
          visibleItems.forEach((item) => {
            const group = getGroup(item);
            if (!result.has(group)) {
              result.set(group, []);
            }
            result.get(group).push(item);
          });
          return result;
        }
        /**
         * Generate the built-in help text.
         *
         * @param {Command} cmd
         * @param {Help} helper
         * @returns {string}
         */
        formatHelp(cmd, helper) {
          const termWidth = helper.padWidth(cmd, helper);
          const helpWidth = helper.helpWidth ?? 80;
          function callFormatItem(term, description) {
            return helper.formatItem(term, termWidth, description, helper);
          }
          let output = [
            `${helper.styleTitle("Usage:")} ${helper.styleUsage(helper.commandUsage(cmd))}`,
            ""
          ];
          const commandDescription = helper.commandDescription(cmd);
          if (commandDescription.length > 0) {
            output = output.concat([
              helper.boxWrap(
                helper.styleCommandDescription(commandDescription),
                helpWidth
              ),
              ""
            ]);
          }
          const argumentList = helper.visibleArguments(cmd).map((argument) => {
            return callFormatItem(
              helper.styleArgumentTerm(helper.argumentTerm(argument)),
              helper.styleArgumentDescription(helper.argumentDescription(argument))
            );
          });
          output = output.concat(
            this.formatItemList("Arguments:", argumentList, helper)
          );
          const optionGroups = this.groupItems(
            cmd.options,
            helper.visibleOptions(cmd),
            (option) => option.helpGroupHeading ?? "Options:"
          );
          optionGroups.forEach((options, group) => {
            const optionList = options.map((option) => {
              return callFormatItem(
                helper.styleOptionTerm(helper.optionTerm(option)),
                helper.styleOptionDescription(helper.optionDescription(option))
              );
            });
            output = output.concat(this.formatItemList(group, optionList, helper));
          });
          if (helper.showGlobalOptions) {
            const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
              return callFormatItem(
                helper.styleOptionTerm(helper.optionTerm(option)),
                helper.styleOptionDescription(helper.optionDescription(option))
              );
            });
            output = output.concat(
              this.formatItemList("Global Options:", globalOptionList, helper)
            );
          }
          const commandGroups = this.groupItems(
            cmd.commands,
            helper.visibleCommands(cmd),
            (sub) => sub.helpGroup() || "Commands:"
          );
          commandGroups.forEach((commands, group) => {
            const commandList = commands.map((sub) => {
              return callFormatItem(
                helper.styleSubcommandTerm(helper.subcommandTerm(sub)),
                helper.styleSubcommandDescription(helper.subcommandDescription(sub))
              );
            });
            output = output.concat(this.formatItemList(group, commandList, helper));
          });
          return output.join("\n");
        }
        /**
         * Return display width of string, ignoring ANSI escape sequences. Used in padding and wrapping calculations.
         *
         * @param {string} str
         * @returns {number}
         */
        displayWidth(str) {
          return stripColor(str).length;
        }
        /**
         * Style the title for displaying in the help. Called with 'Usage:', 'Options:', etc.
         *
         * @param {string} str
         * @returns {string}
         */
        styleTitle(str) {
          return str;
        }
        styleUsage(str) {
          return str.split(" ").map((word) => {
            if (word === "[options]") return this.styleOptionText(word);
            if (word === "[command]") return this.styleSubcommandText(word);
            if (word[0] === "[" || word[0] === "<")
              return this.styleArgumentText(word);
            return this.styleCommandText(word);
          }).join(" ");
        }
        styleCommandDescription(str) {
          return this.styleDescriptionText(str);
        }
        styleOptionDescription(str) {
          return this.styleDescriptionText(str);
        }
        styleSubcommandDescription(str) {
          return this.styleDescriptionText(str);
        }
        styleArgumentDescription(str) {
          return this.styleDescriptionText(str);
        }
        styleDescriptionText(str) {
          return str;
        }
        styleOptionTerm(str) {
          return this.styleOptionText(str);
        }
        styleSubcommandTerm(str) {
          return str.split(" ").map((word) => {
            if (word === "[options]") return this.styleOptionText(word);
            if (word[0] === "[" || word[0] === "<")
              return this.styleArgumentText(word);
            return this.styleSubcommandText(word);
          }).join(" ");
        }
        styleArgumentTerm(str) {
          return this.styleArgumentText(str);
        }
        styleOptionText(str) {
          return str;
        }
        styleArgumentText(str) {
          return str;
        }
        styleSubcommandText(str) {
          return str;
        }
        styleCommandText(str) {
          return str;
        }
        /**
         * Calculate the pad width from the maximum term length.
         *
         * @param {Command} cmd
         * @param {Help} helper
         * @returns {number}
         */
        padWidth(cmd, helper) {
          return Math.max(
            helper.longestOptionTermLength(cmd, helper),
            helper.longestGlobalOptionTermLength(cmd, helper),
            helper.longestSubcommandTermLength(cmd, helper),
            helper.longestArgumentTermLength(cmd, helper)
          );
        }
        /**
         * Detect manually wrapped and indented strings by checking for line break followed by whitespace.
         *
         * @param {string} str
         * @returns {boolean}
         */
        preformatted(str) {
          return /\n[^\S\r\n]/.test(str);
        }
        /**
         * Format the "item", which consists of a term and description. Pad the term and wrap the description, indenting the following lines.
         *
         * So "TTT", 5, "DDD DDDD DD DDD" might be formatted for this.helpWidth=17 like so:
         *   TTT  DDD DDDD
         *        DD DDD
         *
         * @param {string} term
         * @param {number} termWidth
         * @param {string} description
         * @param {Help} helper
         * @returns {string}
         */
        formatItem(term, termWidth, description, helper) {
          const itemIndent = 2;
          const itemIndentStr = " ".repeat(itemIndent);
          if (!description) return itemIndentStr + term;
          const paddedTerm = term.padEnd(
            termWidth + term.length - helper.displayWidth(term)
          );
          const spacerWidth = 2;
          const helpWidth = this.helpWidth ?? 80;
          const remainingWidth = helpWidth - termWidth - spacerWidth - itemIndent;
          let formattedDescription;
          if (remainingWidth < this.minWidthToWrap || helper.preformatted(description)) {
            formattedDescription = description;
          } else {
            const wrappedDescription = helper.boxWrap(description, remainingWidth);
            formattedDescription = wrappedDescription.replace(
              /\n/g,
              "\n" + " ".repeat(termWidth + spacerWidth)
            );
          }
          return itemIndentStr + paddedTerm + " ".repeat(spacerWidth) + formattedDescription.replace(/\n/g, `
${itemIndentStr}`);
        }
        /**
         * Wrap a string at whitespace, preserving existing line breaks.
         * Wrapping is skipped if the width is less than `minWidthToWrap`.
         *
         * @param {string} str
         * @param {number} width
         * @returns {string}
         */
        boxWrap(str, width) {
          if (width < this.minWidthToWrap) return str;
          const rawLines = str.split(/\r\n|\n/);
          const chunkPattern = /[\s]*[^\s]+/g;
          const wrappedLines = [];
          rawLines.forEach((line) => {
            const chunks = line.match(chunkPattern);
            if (chunks === null) {
              wrappedLines.push("");
              return;
            }
            let sumChunks = [chunks.shift()];
            let sumWidth = this.displayWidth(sumChunks[0]);
            chunks.forEach((chunk) => {
              const visibleWidth = this.displayWidth(chunk);
              if (sumWidth + visibleWidth <= width) {
                sumChunks.push(chunk);
                sumWidth += visibleWidth;
                return;
              }
              wrappedLines.push(sumChunks.join(""));
              const nextChunk = chunk.trimStart();
              sumChunks = [nextChunk];
              sumWidth = this.displayWidth(nextChunk);
            });
            wrappedLines.push(sumChunks.join(""));
          });
          return wrappedLines.join("\n");
        }
      };
      function stripColor(str) {
        const sgrPattern = /\x1b\[\d*(;\d*)*m/g;
        return str.replace(sgrPattern, "");
      }
      exports.Help = Help2;
      exports.stripColor = stripColor;
    }
  });

  // node_modules/commander/lib/option.js
  var require_option = __commonJS({
    "node_modules/commander/lib/option.js"(exports) {
      var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
      var Option2 = class {
        /**
         * Initialize a new `Option` with the given `flags` and `description`.
         *
         * @param {string} flags
         * @param {string} [description]
         */
        constructor(flags, description) {
          this.flags = flags;
          this.description = description || "";
          this.required = flags.includes("<");
          this.optional = flags.includes("[");
          this.variadic = /\w\.\.\.[>\]]$/.test(flags);
          this.mandatory = false;
          const optionFlags = splitOptionFlags(flags);
          this.short = optionFlags.shortFlag;
          this.long = optionFlags.longFlag;
          this.negate = false;
          if (this.long) {
            this.negate = this.long.startsWith("--no-");
          }
          this.defaultValue = void 0;
          this.defaultValueDescription = void 0;
          this.presetArg = void 0;
          this.envVar = void 0;
          this.parseArg = void 0;
          this.hidden = false;
          this.argChoices = void 0;
          this.conflictsWith = [];
          this.implied = void 0;
          this.helpGroupHeading = void 0;
        }
        /**
         * Set the default value, and optionally supply the description to be displayed in the help.
         *
         * @param {*} value
         * @param {string} [description]
         * @return {Option}
         */
        default(value, description) {
          this.defaultValue = value;
          this.defaultValueDescription = description;
          return this;
        }
        /**
         * Preset to use when option used without option-argument, especially optional but also boolean and negated.
         * The custom processing (parseArg) is called.
         *
         * @example
         * new Option('--color').default('GREYSCALE').preset('RGB');
         * new Option('--donate [amount]').preset('20').argParser(parseFloat);
         *
         * @param {*} arg
         * @return {Option}
         */
        preset(arg) {
          this.presetArg = arg;
          return this;
        }
        /**
         * Add option name(s) that conflict with this option.
         * An error will be displayed if conflicting options are found during parsing.
         *
         * @example
         * new Option('--rgb').conflicts('cmyk');
         * new Option('--js').conflicts(['ts', 'jsx']);
         *
         * @param {(string | string[])} names
         * @return {Option}
         */
        conflicts(names) {
          this.conflictsWith = this.conflictsWith.concat(names);
          return this;
        }
        /**
         * Specify implied option values for when this option is set and the implied options are not.
         *
         * The custom processing (parseArg) is not called on the implied values.
         *
         * @example
         * program
         *   .addOption(new Option('--log', 'write logging information to file'))
         *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
         *
         * @param {object} impliedOptionValues
         * @return {Option}
         */
        implies(impliedOptionValues) {
          let newImplied = impliedOptionValues;
          if (typeof impliedOptionValues === "string") {
            newImplied = { [impliedOptionValues]: true };
          }
          this.implied = Object.assign(this.implied || {}, newImplied);
          return this;
        }
        /**
         * Set environment variable to check for option value.
         *
         * An environment variable is only used if when processed the current option value is
         * undefined, or the source of the current value is 'default' or 'config' or 'env'.
         *
         * @param {string} name
         * @return {Option}
         */
        env(name) {
          this.envVar = name;
          return this;
        }
        /**
         * Set the custom handler for processing CLI option arguments into option values.
         *
         * @param {Function} [fn]
         * @return {Option}
         */
        argParser(fn) {
          this.parseArg = fn;
          return this;
        }
        /**
         * Whether the option is mandatory and must have a value after parsing.
         *
         * @param {boolean} [mandatory=true]
         * @return {Option}
         */
        makeOptionMandatory(mandatory = true) {
          this.mandatory = !!mandatory;
          return this;
        }
        /**
         * Hide option in help.
         *
         * @param {boolean} [hide=true]
         * @return {Option}
         */
        hideHelp(hide = true) {
          this.hidden = !!hide;
          return this;
        }
        /**
         * @package
         */
        _collectValue(value, previous) {
          if (previous === this.defaultValue || !Array.isArray(previous)) {
            return [value];
          }
          previous.push(value);
          return previous;
        }
        /**
         * Only allow option value to be one of choices.
         *
         * @param {string[]} values
         * @return {Option}
         */
        choices(values) {
          this.argChoices = values.slice();
          this.parseArg = (arg, previous) => {
            if (!this.argChoices.includes(arg)) {
              throw new InvalidArgumentError2(
                `Allowed choices are ${this.argChoices.join(", ")}.`
              );
            }
            if (this.variadic) {
              return this._collectValue(arg, previous);
            }
            return arg;
          };
          return this;
        }
        /**
         * Return option name.
         *
         * @return {string}
         */
        name() {
          if (this.long) {
            return this.long.replace(/^--/, "");
          }
          return this.short.replace(/^-/, "");
        }
        /**
         * Return option name, in a camelcase format that can be used
         * as an object attribute key.
         *
         * @return {string}
         */
        attributeName() {
          if (this.negate) {
            return camelcase(this.name().replace(/^no-/, ""));
          }
          return camelcase(this.name());
        }
        /**
         * Set the help group heading.
         *
         * @param {string} heading
         * @return {Option}
         */
        helpGroup(heading) {
          this.helpGroupHeading = heading;
          return this;
        }
        /**
         * Check if `arg` matches the short or long flag.
         *
         * @param {string} arg
         * @return {boolean}
         * @package
         */
        is(arg) {
          return this.short === arg || this.long === arg;
        }
        /**
         * Return whether a boolean option.
         *
         * Options are one of boolean, negated, required argument, or optional argument.
         *
         * @return {boolean}
         * @package
         */
        isBoolean() {
          return !this.required && !this.optional && !this.negate;
        }
      };
      var DualOptions = class {
        /**
         * @param {Option[]} options
         */
        constructor(options) {
          this.positiveOptions = /* @__PURE__ */ new Map();
          this.negativeOptions = /* @__PURE__ */ new Map();
          this.dualOptions = /* @__PURE__ */ new Set();
          options.forEach((option) => {
            if (option.negate) {
              this.negativeOptions.set(option.attributeName(), option);
            } else {
              this.positiveOptions.set(option.attributeName(), option);
            }
          });
          this.negativeOptions.forEach((value, key) => {
            if (this.positiveOptions.has(key)) {
              this.dualOptions.add(key);
            }
          });
        }
        /**
         * Did the value come from the option, and not from possible matching dual option?
         *
         * @param {*} value
         * @param {Option} option
         * @returns {boolean}
         */
        valueFromOption(value, option) {
          const optionKey = option.attributeName();
          if (!this.dualOptions.has(optionKey)) return true;
          const preset = this.negativeOptions.get(optionKey).presetArg;
          const negativeValue = preset !== void 0 ? preset : false;
          return option.negate === (negativeValue === value);
        }
      };
      function camelcase(str) {
        return str.split("-").reduce((str2, word) => {
          return str2 + word[0].toUpperCase() + word.slice(1);
        });
      }
      function splitOptionFlags(flags) {
        let shortFlag;
        let longFlag;
        const shortFlagExp = /^-[^-]$/;
        const longFlagExp = /^--[^-]/;
        const flagParts = flags.split(/[ |,]+/).concat("guard");
        if (shortFlagExp.test(flagParts[0])) shortFlag = flagParts.shift();
        if (longFlagExp.test(flagParts[0])) longFlag = flagParts.shift();
        if (!shortFlag && shortFlagExp.test(flagParts[0]))
          shortFlag = flagParts.shift();
        if (!shortFlag && longFlagExp.test(flagParts[0])) {
          shortFlag = longFlag;
          longFlag = flagParts.shift();
        }
        if (flagParts[0].startsWith("-")) {
          const unsupportedFlag = flagParts[0];
          const baseError = `option creation failed due to '${unsupportedFlag}' in option flags '${flags}'`;
          if (/^-[^-][^-]/.test(unsupportedFlag))
            throw new Error(
              `${baseError}
- a short flag is a single dash and a single character
  - either use a single dash and a single character (for a short flag)
  - or use a double dash for a long option (and can have two, like '--ws, --workspace')`
            );
          if (shortFlagExp.test(unsupportedFlag))
            throw new Error(`${baseError}
- too many short flags`);
          if (longFlagExp.test(unsupportedFlag))
            throw new Error(`${baseError}
- too many long flags`);
          throw new Error(`${baseError}
- unrecognised flag format`);
        }
        if (shortFlag === void 0 && longFlag === void 0)
          throw new Error(
            `option creation failed due to no flags found in '${flags}'.`
          );
        return { shortFlag, longFlag };
      }
      exports.Option = Option2;
      exports.DualOptions = DualOptions;
    }
  });

  // node_modules/commander/lib/suggestSimilar.js
  var require_suggestSimilar = __commonJS({
    "node_modules/commander/lib/suggestSimilar.js"(exports) {
      var maxDistance = 3;
      function editDistance(a, b) {
        if (Math.abs(a.length - b.length) > maxDistance)
          return Math.max(a.length, b.length);
        const d = [];
        for (let i = 0; i <= a.length; i++) {
          d[i] = [i];
        }
        for (let j = 0; j <= b.length; j++) {
          d[0][j] = j;
        }
        for (let j = 1; j <= b.length; j++) {
          for (let i = 1; i <= a.length; i++) {
            let cost = 1;
            if (a[i - 1] === b[j - 1]) {
              cost = 0;
            } else {
              cost = 1;
            }
            d[i][j] = Math.min(
              d[i - 1][j] + 1,
              // deletion
              d[i][j - 1] + 1,
              // insertion
              d[i - 1][j - 1] + cost
              // substitution
            );
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
              d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
            }
          }
        }
        return d[a.length][b.length];
      }
      function suggestSimilar(word, candidates) {
        if (!candidates || candidates.length === 0) return "";
        candidates = Array.from(new Set(candidates));
        const searchingOptions = word.startsWith("--");
        if (searchingOptions) {
          word = word.slice(2);
          candidates = candidates.map((candidate) => candidate.slice(2));
        }
        let similar = [];
        let bestDistance = maxDistance;
        const minSimilarity = 0.4;
        candidates.forEach((candidate) => {
          if (candidate.length <= 1) return;
          const distance = editDistance(word, candidate);
          const length = Math.max(word.length, candidate.length);
          const similarity = (length - distance) / length;
          if (similarity > minSimilarity) {
            if (distance < bestDistance) {
              bestDistance = distance;
              similar = [candidate];
            } else if (distance === bestDistance) {
              similar.push(candidate);
            }
          }
        });
        similar.sort((a, b) => a.localeCompare(b));
        if (searchingOptions) {
          similar = similar.map((candidate) => `--${candidate}`);
        }
        if (similar.length > 1) {
          return `
(Did you mean one of ${similar.join(", ")}?)`;
        }
        if (similar.length === 1) {
          return `
(Did you mean ${similar[0]}?)`;
        }
        return "";
      }
      exports.suggestSimilar = suggestSimilar;
    }
  });

  // node_modules/commander/lib/command.js
  var require_command = __commonJS({
    "node_modules/commander/lib/command.js"(exports) {
      var EventEmitter = __require("node:events").EventEmitter;
      var childProcess = __require("node:child_process");
      var path = __require("node:path");
      var fs = __require("node:fs");
      var process2 = __require("node:process");
      var { Argument: Argument2, humanReadableArgName } = require_argument();
      var { CommanderError: CommanderError2 } = require_error();
      var { Help: Help2, stripColor } = require_help();
      var { Option: Option2, DualOptions } = require_option();
      var { suggestSimilar } = require_suggestSimilar();
      var Command2 = class _Command extends EventEmitter {
        /**
         * Initialize a new `Command`.
         *
         * @param {string} [name]
         */
        constructor(name) {
          super();
          this.commands = [];
          this.options = [];
          this.parent = null;
          this._allowUnknownOption = false;
          this._allowExcessArguments = false;
          this.registeredArguments = [];
          this._args = this.registeredArguments;
          this.args = [];
          this.rawArgs = [];
          this.processedArgs = [];
          this._scriptPath = null;
          this._name = name || "";
          this._optionValues = {};
          this._optionValueSources = {};
          this._storeOptionsAsProperties = false;
          this._actionHandler = null;
          this._executableHandler = false;
          this._executableFile = null;
          this._executableDir = null;
          this._defaultCommandName = null;
          this._exitCallback = null;
          this._aliases = [];
          this._combineFlagAndOptionalValue = true;
          this._description = "";
          this._summary = "";
          this._argsDescription = void 0;
          this._enablePositionalOptions = false;
          this._passThroughOptions = false;
          this._lifeCycleHooks = {};
          this._showHelpAfterError = false;
          this._showSuggestionAfterError = true;
          this._savedState = null;
          this._outputConfiguration = {
            writeOut: (str) => process2.stdout.write(str),
            writeErr: (str) => process2.stderr.write(str),
            outputError: (str, write) => write(str),
            getOutHelpWidth: () => process2.stdout.isTTY ? process2.stdout.columns : void 0,
            getErrHelpWidth: () => process2.stderr.isTTY ? process2.stderr.columns : void 0,
            getOutHasColors: () => useColor() ?? (process2.stdout.isTTY && process2.stdout.hasColors?.()),
            getErrHasColors: () => useColor() ?? (process2.stderr.isTTY && process2.stderr.hasColors?.()),
            stripColor: (str) => stripColor(str)
          };
          this._hidden = false;
          this._helpOption = void 0;
          this._addImplicitHelpCommand = void 0;
          this._helpCommand = void 0;
          this._helpConfiguration = {};
          this._helpGroupHeading = void 0;
          this._defaultCommandGroup = void 0;
          this._defaultOptionGroup = void 0;
        }
        /**
         * Copy settings that are useful to have in common across root command and subcommands.
         *
         * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
         *
         * @param {Command} sourceCommand
         * @return {Command} `this` command for chaining
         */
        copyInheritedSettings(sourceCommand) {
          this._outputConfiguration = sourceCommand._outputConfiguration;
          this._helpOption = sourceCommand._helpOption;
          this._helpCommand = sourceCommand._helpCommand;
          this._helpConfiguration = sourceCommand._helpConfiguration;
          this._exitCallback = sourceCommand._exitCallback;
          this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
          this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
          this._allowExcessArguments = sourceCommand._allowExcessArguments;
          this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
          this._showHelpAfterError = sourceCommand._showHelpAfterError;
          this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
          return this;
        }
        /**
         * @returns {Command[]}
         * @private
         */
        _getCommandAndAncestors() {
          const result = [];
          for (let command = this; command; command = command.parent) {
            result.push(command);
          }
          return result;
        }
        /**
         * Define a command.
         *
         * There are two styles of command: pay attention to where to put the description.
         *
         * @example
         * // Command implemented using action handler (description is supplied separately to `.command`)
         * program
         *   .command('clone <source> [destination]')
         *   .description('clone a repository into a newly created directory')
         *   .action((source, destination) => {
         *     console.log('clone command called');
         *   });
         *
         * // Command implemented using separate executable file (description is second parameter to `.command`)
         * program
         *   .command('start <service>', 'start named service')
         *   .command('stop [service]', 'stop named service, or all if no name supplied');
         *
         * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
         * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
         * @param {object} [execOpts] - configuration options (for executable)
         * @return {Command} returns new command for action handler, or `this` for executable command
         */
        command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
          let desc = actionOptsOrExecDesc;
          let opts = execOpts;
          if (typeof desc === "object" && desc !== null) {
            opts = desc;
            desc = null;
          }
          opts = opts || {};
          const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
          const cmd = this.createCommand(name);
          if (desc) {
            cmd.description(desc);
            cmd._executableHandler = true;
          }
          if (opts.isDefault) this._defaultCommandName = cmd._name;
          cmd._hidden = !!(opts.noHelp || opts.hidden);
          cmd._executableFile = opts.executableFile || null;
          if (args) cmd.arguments(args);
          this._registerCommand(cmd);
          cmd.parent = this;
          cmd.copyInheritedSettings(this);
          if (desc) return this;
          return cmd;
        }
        /**
         * Factory routine to create a new unattached command.
         *
         * See .command() for creating an attached subcommand, which uses this routine to
         * create the command. You can override createCommand to customise subcommands.
         *
         * @param {string} [name]
         * @return {Command} new command
         */
        createCommand(name) {
          return new _Command(name);
        }
        /**
         * You can customise the help with a subclass of Help by overriding createHelp,
         * or by overriding Help properties using configureHelp().
         *
         * @return {Help}
         */
        createHelp() {
          return Object.assign(new Help2(), this.configureHelp());
        }
        /**
         * You can customise the help by overriding Help properties using configureHelp(),
         * or with a subclass of Help by overriding createHelp().
         *
         * @param {object} [configuration] - configuration options
         * @return {(Command | object)} `this` command for chaining, or stored configuration
         */
        configureHelp(configuration) {
          if (configuration === void 0) return this._helpConfiguration;
          this._helpConfiguration = configuration;
          return this;
        }
        /**
         * The default output goes to stdout and stderr. You can customise this for special
         * applications. You can also customise the display of errors by overriding outputError.
         *
         * The configuration properties are all functions:
         *
         *     // change how output being written, defaults to stdout and stderr
         *     writeOut(str)
         *     writeErr(str)
         *     // change how output being written for errors, defaults to writeErr
         *     outputError(str, write) // used for displaying errors and not used for displaying help
         *     // specify width for wrapping help
         *     getOutHelpWidth()
         *     getErrHelpWidth()
         *     // color support, currently only used with Help
         *     getOutHasColors()
         *     getErrHasColors()
         *     stripColor() // used to remove ANSI escape codes if output does not have colors
         *
         * @param {object} [configuration] - configuration options
         * @return {(Command | object)} `this` command for chaining, or stored configuration
         */
        configureOutput(configuration) {
          if (configuration === void 0) return this._outputConfiguration;
          this._outputConfiguration = {
            ...this._outputConfiguration,
            ...configuration
          };
          return this;
        }
        /**
         * Display the help or a custom message after an error occurs.
         *
         * @param {(boolean|string)} [displayHelp]
         * @return {Command} `this` command for chaining
         */
        showHelpAfterError(displayHelp = true) {
          if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
          this._showHelpAfterError = displayHelp;
          return this;
        }
        /**
         * Display suggestion of similar commands for unknown commands, or options for unknown options.
         *
         * @param {boolean} [displaySuggestion]
         * @return {Command} `this` command for chaining
         */
        showSuggestionAfterError(displaySuggestion = true) {
          this._showSuggestionAfterError = !!displaySuggestion;
          return this;
        }
        /**
         * Add a prepared subcommand.
         *
         * See .command() for creating an attached subcommand which inherits settings from its parent.
         *
         * @param {Command} cmd - new subcommand
         * @param {object} [opts] - configuration options
         * @return {Command} `this` command for chaining
         */
        addCommand(cmd, opts) {
          if (!cmd._name) {
            throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
          }
          opts = opts || {};
          if (opts.isDefault) this._defaultCommandName = cmd._name;
          if (opts.noHelp || opts.hidden) cmd._hidden = true;
          this._registerCommand(cmd);
          cmd.parent = this;
          cmd._checkForBrokenPassThrough();
          return this;
        }
        /**
         * Factory routine to create a new unattached argument.
         *
         * See .argument() for creating an attached argument, which uses this routine to
         * create the argument. You can override createArgument to return a custom argument.
         *
         * @param {string} name
         * @param {string} [description]
         * @return {Argument} new argument
         */
        createArgument(name, description) {
          return new Argument2(name, description);
        }
        /**
         * Define argument syntax for command.
         *
         * The default is that the argument is required, and you can explicitly
         * indicate this with <> around the name. Put [] around the name for an optional argument.
         *
         * @example
         * program.argument('<input-file>');
         * program.argument('[output-file]');
         *
         * @param {string} name
         * @param {string} [description]
         * @param {(Function|*)} [parseArg] - custom argument processing function or default value
         * @param {*} [defaultValue]
         * @return {Command} `this` command for chaining
         */
        argument(name, description, parseArg, defaultValue) {
          const argument = this.createArgument(name, description);
          if (typeof parseArg === "function") {
            argument.default(defaultValue).argParser(parseArg);
          } else {
            argument.default(parseArg);
          }
          this.addArgument(argument);
          return this;
        }
        /**
         * Define argument syntax for command, adding multiple at once (without descriptions).
         *
         * See also .argument().
         *
         * @example
         * program.arguments('<cmd> [env]');
         *
         * @param {string} names
         * @return {Command} `this` command for chaining
         */
        arguments(names) {
          names.trim().split(/ +/).forEach((detail) => {
            this.argument(detail);
          });
          return this;
        }
        /**
         * Define argument syntax for command, adding a prepared argument.
         *
         * @param {Argument} argument
         * @return {Command} `this` command for chaining
         */
        addArgument(argument) {
          const previousArgument = this.registeredArguments.slice(-1)[0];
          if (previousArgument?.variadic) {
            throw new Error(
              `only the last argument can be variadic '${previousArgument.name()}'`
            );
          }
          if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
            throw new Error(
              `a default value for a required argument is never used: '${argument.name()}'`
            );
          }
          this.registeredArguments.push(argument);
          return this;
        }
        /**
         * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
         *
         * @example
         *    program.helpCommand('help [cmd]');
         *    program.helpCommand('help [cmd]', 'show help');
         *    program.helpCommand(false); // suppress default help command
         *    program.helpCommand(true); // add help command even if no subcommands
         *
         * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
         * @param {string} [description] - custom description
         * @return {Command} `this` command for chaining
         */
        helpCommand(enableOrNameAndArgs, description) {
          if (typeof enableOrNameAndArgs === "boolean") {
            this._addImplicitHelpCommand = enableOrNameAndArgs;
            if (enableOrNameAndArgs && this._defaultCommandGroup) {
              this._initCommandGroup(this._getHelpCommand());
            }
            return this;
          }
          const nameAndArgs = enableOrNameAndArgs ?? "help [command]";
          const [, helpName, helpArgs] = nameAndArgs.match(/([^ ]+) *(.*)/);
          const helpDescription = description ?? "display help for command";
          const helpCommand = this.createCommand(helpName);
          helpCommand.helpOption(false);
          if (helpArgs) helpCommand.arguments(helpArgs);
          if (helpDescription) helpCommand.description(helpDescription);
          this._addImplicitHelpCommand = true;
          this._helpCommand = helpCommand;
          if (enableOrNameAndArgs || description) this._initCommandGroup(helpCommand);
          return this;
        }
        /**
         * Add prepared custom help command.
         *
         * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
         * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
         * @return {Command} `this` command for chaining
         */
        addHelpCommand(helpCommand, deprecatedDescription) {
          if (typeof helpCommand !== "object") {
            this.helpCommand(helpCommand, deprecatedDescription);
            return this;
          }
          this._addImplicitHelpCommand = true;
          this._helpCommand = helpCommand;
          this._initCommandGroup(helpCommand);
          return this;
        }
        /**
         * Lazy create help command.
         *
         * @return {(Command|null)}
         * @package
         */
        _getHelpCommand() {
          const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
          if (hasImplicitHelpCommand) {
            if (this._helpCommand === void 0) {
              this.helpCommand(void 0, void 0);
            }
            return this._helpCommand;
          }
          return null;
        }
        /**
         * Add hook for life cycle event.
         *
         * @param {string} event
         * @param {Function} listener
         * @return {Command} `this` command for chaining
         */
        hook(event, listener) {
          const allowedValues = ["preSubcommand", "preAction", "postAction"];
          if (!allowedValues.includes(event)) {
            throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
          }
          if (this._lifeCycleHooks[event]) {
            this._lifeCycleHooks[event].push(listener);
          } else {
            this._lifeCycleHooks[event] = [listener];
          }
          return this;
        }
        /**
         * Register callback to use as replacement for calling process.exit.
         *
         * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
         * @return {Command} `this` command for chaining
         */
        exitOverride(fn) {
          if (fn) {
            this._exitCallback = fn;
          } else {
            this._exitCallback = (err) => {
              if (err.code !== "commander.executeSubCommandAsync") {
                throw err;
              } else {
              }
            };
          }
          return this;
        }
        /**
         * Call process.exit, and _exitCallback if defined.
         *
         * @param {number} exitCode exit code for using with process.exit
         * @param {string} code an id string representing the error
         * @param {string} message human-readable description of the error
         * @return never
         * @private
         */
        _exit(exitCode, code, message) {
          if (this._exitCallback) {
            this._exitCallback(new CommanderError2(exitCode, code, message));
          }
          process2.exit(exitCode);
        }
        /**
         * Register callback `fn` for the command.
         *
         * @example
         * program
         *   .command('serve')
         *   .description('start service')
         *   .action(function() {
         *      // do work here
         *   });
         *
         * @param {Function} fn
         * @return {Command} `this` command for chaining
         */
        action(fn) {
          const listener = (args) => {
            const expectedArgsCount = this.registeredArguments.length;
            const actionArgs = args.slice(0, expectedArgsCount);
            if (this._storeOptionsAsProperties) {
              actionArgs[expectedArgsCount] = this;
            } else {
              actionArgs[expectedArgsCount] = this.opts();
            }
            actionArgs.push(this);
            return fn.apply(this, actionArgs);
          };
          this._actionHandler = listener;
          return this;
        }
        /**
         * Factory routine to create a new unattached option.
         *
         * See .option() for creating an attached option, which uses this routine to
         * create the option. You can override createOption to return a custom option.
         *
         * @param {string} flags
         * @param {string} [description]
         * @return {Option} new option
         */
        createOption(flags, description) {
          return new Option2(flags, description);
        }
        /**
         * Wrap parseArgs to catch 'commander.invalidArgument'.
         *
         * @param {(Option | Argument)} target
         * @param {string} value
         * @param {*} previous
         * @param {string} invalidArgumentMessage
         * @private
         */
        _callParseArg(target, value, previous, invalidArgumentMessage) {
          try {
            return target.parseArg(value, previous);
          } catch (err) {
            if (err.code === "commander.invalidArgument") {
              const message = `${invalidArgumentMessage} ${err.message}`;
              this.error(message, { exitCode: err.exitCode, code: err.code });
            }
            throw err;
          }
        }
        /**
         * Check for option flag conflicts.
         * Register option if no conflicts found, or throw on conflict.
         *
         * @param {Option} option
         * @private
         */
        _registerOption(option) {
          const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
          if (matchingOption) {
            const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
            throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
          }
          this._initOptionGroup(option);
          this.options.push(option);
        }
        /**
         * Check for command name and alias conflicts with existing commands.
         * Register command if no conflicts found, or throw on conflict.
         *
         * @param {Command} command
         * @private
         */
        _registerCommand(command) {
          const knownBy = (cmd) => {
            return [cmd.name()].concat(cmd.aliases());
          };
          const alreadyUsed = knownBy(command).find(
            (name) => this._findCommand(name)
          );
          if (alreadyUsed) {
            const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
            const newCmd = knownBy(command).join("|");
            throw new Error(
              `cannot add command '${newCmd}' as already have command '${existingCmd}'`
            );
          }
          this._initCommandGroup(command);
          this.commands.push(command);
        }
        /**
         * Add an option.
         *
         * @param {Option} option
         * @return {Command} `this` command for chaining
         */
        addOption(option) {
          this._registerOption(option);
          const oname = option.name();
          const name = option.attributeName();
          if (option.negate) {
            const positiveLongFlag = option.long.replace(/^--no-/, "--");
            if (!this._findOption(positiveLongFlag)) {
              this.setOptionValueWithSource(
                name,
                option.defaultValue === void 0 ? true : option.defaultValue,
                "default"
              );
            }
          } else if (option.defaultValue !== void 0) {
            this.setOptionValueWithSource(name, option.defaultValue, "default");
          }
          const handleOptionValue = (val, invalidValueMessage, valueSource) => {
            if (val == null && option.presetArg !== void 0) {
              val = option.presetArg;
            }
            const oldValue = this.getOptionValue(name);
            if (val !== null && option.parseArg) {
              val = this._callParseArg(option, val, oldValue, invalidValueMessage);
            } else if (val !== null && option.variadic) {
              val = option._collectValue(val, oldValue);
            }
            if (val == null) {
              if (option.negate) {
                val = false;
              } else if (option.isBoolean() || option.optional) {
                val = true;
              } else {
                val = "";
              }
            }
            this.setOptionValueWithSource(name, val, valueSource);
          };
          this.on("option:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "cli");
          });
          if (option.envVar) {
            this.on("optionEnv:" + oname, (val) => {
              const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
              handleOptionValue(val, invalidValueMessage, "env");
            });
          }
          return this;
        }
        /**
         * Internal implementation shared by .option() and .requiredOption()
         *
         * @return {Command} `this` command for chaining
         * @private
         */
        _optionEx(config, flags, description, fn, defaultValue) {
          if (typeof flags === "object" && flags instanceof Option2) {
            throw new Error(
              "To add an Option object use addOption() instead of option() or requiredOption()"
            );
          }
          const option = this.createOption(flags, description);
          option.makeOptionMandatory(!!config.mandatory);
          if (typeof fn === "function") {
            option.default(defaultValue).argParser(fn);
          } else if (fn instanceof RegExp) {
            const regex = fn;
            fn = (val, def) => {
              const m = regex.exec(val);
              return m ? m[0] : def;
            };
            option.default(defaultValue).argParser(fn);
          } else {
            option.default(fn);
          }
          return this.addOption(option);
        }
        /**
         * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
         *
         * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
         * option-argument is indicated by `<>` and an optional option-argument by `[]`.
         *
         * See the README for more details, and see also addOption() and requiredOption().
         *
         * @example
         * program
         *     .option('-p, --pepper', 'add pepper')
         *     .option('--pt, --pizza-type <TYPE>', 'type of pizza') // required option-argument
         *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
         *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
         *
         * @param {string} flags
         * @param {string} [description]
         * @param {(Function|*)} [parseArg] - custom option processing function or default value
         * @param {*} [defaultValue]
         * @return {Command} `this` command for chaining
         */
        option(flags, description, parseArg, defaultValue) {
          return this._optionEx({}, flags, description, parseArg, defaultValue);
        }
        /**
         * Add a required option which must have a value after parsing. This usually means
         * the option must be specified on the command line. (Otherwise the same as .option().)
         *
         * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
         *
         * @param {string} flags
         * @param {string} [description]
         * @param {(Function|*)} [parseArg] - custom option processing function or default value
         * @param {*} [defaultValue]
         * @return {Command} `this` command for chaining
         */
        requiredOption(flags, description, parseArg, defaultValue) {
          return this._optionEx(
            { mandatory: true },
            flags,
            description,
            parseArg,
            defaultValue
          );
        }
        /**
         * Alter parsing of short flags with optional values.
         *
         * @example
         * // for `.option('-f,--flag [value]'):
         * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
         * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
         *
         * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
         * @return {Command} `this` command for chaining
         */
        combineFlagAndOptionalValue(combine = true) {
          this._combineFlagAndOptionalValue = !!combine;
          return this;
        }
        /**
         * Allow unknown options on the command line.
         *
         * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
         * @return {Command} `this` command for chaining
         */
        allowUnknownOption(allowUnknown = true) {
          this._allowUnknownOption = !!allowUnknown;
          return this;
        }
        /**
         * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
         *
         * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
         * @return {Command} `this` command for chaining
         */
        allowExcessArguments(allowExcess = true) {
          this._allowExcessArguments = !!allowExcess;
          return this;
        }
        /**
         * Enable positional options. Positional means global options are specified before subcommands which lets
         * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
         * The default behaviour is non-positional and global options may appear anywhere on the command line.
         *
         * @param {boolean} [positional]
         * @return {Command} `this` command for chaining
         */
        enablePositionalOptions(positional = true) {
          this._enablePositionalOptions = !!positional;
          return this;
        }
        /**
         * Pass through options that come after command-arguments rather than treat them as command-options,
         * so actual command-options come before command-arguments. Turning this on for a subcommand requires
         * positional options to have been enabled on the program (parent commands).
         * The default behaviour is non-positional and options may appear before or after command-arguments.
         *
         * @param {boolean} [passThrough] for unknown options.
         * @return {Command} `this` command for chaining
         */
        passThroughOptions(passThrough = true) {
          this._passThroughOptions = !!passThrough;
          this._checkForBrokenPassThrough();
          return this;
        }
        /**
         * @private
         */
        _checkForBrokenPassThrough() {
          if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
            throw new Error(
              `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
            );
          }
        }
        /**
         * Whether to store option values as properties on command object,
         * or store separately (specify false). In both cases the option values can be accessed using .opts().
         *
         * @param {boolean} [storeAsProperties=true]
         * @return {Command} `this` command for chaining
         */
        storeOptionsAsProperties(storeAsProperties = true) {
          if (this.options.length) {
            throw new Error("call .storeOptionsAsProperties() before adding options");
          }
          if (Object.keys(this._optionValues).length) {
            throw new Error(
              "call .storeOptionsAsProperties() before setting option values"
            );
          }
          this._storeOptionsAsProperties = !!storeAsProperties;
          return this;
        }
        /**
         * Retrieve option value.
         *
         * @param {string} key
         * @return {object} value
         */
        getOptionValue(key) {
          if (this._storeOptionsAsProperties) {
            return this[key];
          }
          return this._optionValues[key];
        }
        /**
         * Store option value.
         *
         * @param {string} key
         * @param {object} value
         * @return {Command} `this` command for chaining
         */
        setOptionValue(key, value) {
          return this.setOptionValueWithSource(key, value, void 0);
        }
        /**
         * Store option value and where the value came from.
         *
         * @param {string} key
         * @param {object} value
         * @param {string} source - expected values are default/config/env/cli/implied
         * @return {Command} `this` command for chaining
         */
        setOptionValueWithSource(key, value, source) {
          if (this._storeOptionsAsProperties) {
            this[key] = value;
          } else {
            this._optionValues[key] = value;
          }
          this._optionValueSources[key] = source;
          return this;
        }
        /**
         * Get source of option value.
         * Expected values are default | config | env | cli | implied
         *
         * @param {string} key
         * @return {string}
         */
        getOptionValueSource(key) {
          return this._optionValueSources[key];
        }
        /**
         * Get source of option value. See also .optsWithGlobals().
         * Expected values are default | config | env | cli | implied
         *
         * @param {string} key
         * @return {string}
         */
        getOptionValueSourceWithGlobals(key) {
          let source;
          this._getCommandAndAncestors().forEach((cmd) => {
            if (cmd.getOptionValueSource(key) !== void 0) {
              source = cmd.getOptionValueSource(key);
            }
          });
          return source;
        }
        /**
         * Get user arguments from implied or explicit arguments.
         * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
         *
         * @private
         */
        _prepareUserArgs(argv, parseOptions) {
          if (argv !== void 0 && !Array.isArray(argv)) {
            throw new Error("first parameter to parse must be array or undefined");
          }
          parseOptions = parseOptions || {};
          if (argv === void 0 && parseOptions.from === void 0) {
            if (process2.versions?.electron) {
              parseOptions.from = "electron";
            }
            const execArgv = process2.execArgv ?? [];
            if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
              parseOptions.from = "eval";
            }
          }
          if (argv === void 0) {
            argv = process2.argv;
          }
          this.rawArgs = argv.slice();
          let userArgs;
          switch (parseOptions.from) {
            case void 0:
            case "node":
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
              break;
            case "electron":
              if (process2.defaultApp) {
                this._scriptPath = argv[1];
                userArgs = argv.slice(2);
              } else {
                userArgs = argv.slice(1);
              }
              break;
            case "user":
              userArgs = argv.slice(0);
              break;
            case "eval":
              userArgs = argv.slice(1);
              break;
            default:
              throw new Error(
                `unexpected parse option { from: '${parseOptions.from}' }`
              );
          }
          if (!this._name && this._scriptPath)
            this.nameFromFilename(this._scriptPath);
          this._name = this._name || "program";
          return userArgs;
        }
        /**
         * Parse `argv`, setting options and invoking commands when defined.
         *
         * Use parseAsync instead of parse if any of your action handlers are async.
         *
         * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
         *
         * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
         * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
         * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
         * - `'user'`: just user arguments
         *
         * @example
         * program.parse(); // parse process.argv and auto-detect electron and special node flags
         * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
         * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
         *
         * @param {string[]} [argv] - optional, defaults to process.argv
         * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
         * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
         * @return {Command} `this` command for chaining
         */
        parse(argv, parseOptions) {
          this._prepareForParse();
          const userArgs = this._prepareUserArgs(argv, parseOptions);
          this._parseCommand([], userArgs);
          return this;
        }
        /**
         * Parse `argv`, setting options and invoking commands when defined.
         *
         * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
         *
         * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
         * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
         * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
         * - `'user'`: just user arguments
         *
         * @example
         * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
         * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
         * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
         *
         * @param {string[]} [argv]
         * @param {object} [parseOptions]
         * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
         * @return {Promise}
         */
        async parseAsync(argv, parseOptions) {
          this._prepareForParse();
          const userArgs = this._prepareUserArgs(argv, parseOptions);
          await this._parseCommand([], userArgs);
          return this;
        }
        _prepareForParse() {
          if (this._savedState === null) {
            this.saveStateBeforeParse();
          } else {
            this.restoreStateBeforeParse();
          }
        }
        /**
         * Called the first time parse is called to save state and allow a restore before subsequent calls to parse.
         * Not usually called directly, but available for subclasses to save their custom state.
         *
         * This is called in a lazy way. Only commands used in parsing chain will have state saved.
         */
        saveStateBeforeParse() {
          this._savedState = {
            // name is stable if supplied by author, but may be unspecified for root command and deduced during parsing
            _name: this._name,
            // option values before parse have default values (including false for negated options)
            // shallow clones
            _optionValues: { ...this._optionValues },
            _optionValueSources: { ...this._optionValueSources }
          };
        }
        /**
         * Restore state before parse for calls after the first.
         * Not usually called directly, but available for subclasses to save their custom state.
         *
         * This is called in a lazy way. Only commands used in parsing chain will have state restored.
         */
        restoreStateBeforeParse() {
          if (this._storeOptionsAsProperties)
            throw new Error(`Can not call parse again when storeOptionsAsProperties is true.
- either make a new Command for each call to parse, or stop storing options as properties`);
          this._name = this._savedState._name;
          this._scriptPath = null;
          this.rawArgs = [];
          this._optionValues = { ...this._savedState._optionValues };
          this._optionValueSources = { ...this._savedState._optionValueSources };
          this.args = [];
          this.processedArgs = [];
        }
        /**
         * Throw if expected executable is missing. Add lots of help for author.
         *
         * @param {string} executableFile
         * @param {string} executableDir
         * @param {string} subcommandName
         */
        _checkForMissingExecutable(executableFile, executableDir, subcommandName) {
          if (fs.existsSync(executableFile)) return;
          const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
          const executableMissing = `'${executableFile}' does not exist
 - if '${subcommandName}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
          throw new Error(executableMissing);
        }
        /**
         * Execute a sub-command executable.
         *
         * @private
         */
        _executeSubCommand(subcommand, args) {
          args = args.slice();
          let launchWithNode = false;
          const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
          function findFile(baseDir, baseName) {
            const localBin = path.resolve(baseDir, baseName);
            if (fs.existsSync(localBin)) return localBin;
            if (sourceExt.includes(path.extname(baseName))) return void 0;
            const foundExt = sourceExt.find(
              (ext) => fs.existsSync(`${localBin}${ext}`)
            );
            if (foundExt) return `${localBin}${foundExt}`;
            return void 0;
          }
          this._checkForMissingMandatoryOptions();
          this._checkForConflictingOptions();
          let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
          let executableDir = this._executableDir || "";
          if (this._scriptPath) {
            let resolvedScriptPath;
            try {
              resolvedScriptPath = fs.realpathSync(this._scriptPath);
            } catch {
              resolvedScriptPath = this._scriptPath;
            }
            executableDir = path.resolve(
              path.dirname(resolvedScriptPath),
              executableDir
            );
          }
          if (executableDir) {
            let localFile = findFile(executableDir, executableFile);
            if (!localFile && !subcommand._executableFile && this._scriptPath) {
              const legacyName = path.basename(
                this._scriptPath,
                path.extname(this._scriptPath)
              );
              if (legacyName !== this._name) {
                localFile = findFile(
                  executableDir,
                  `${legacyName}-${subcommand._name}`
                );
              }
            }
            executableFile = localFile || executableFile;
          }
          launchWithNode = sourceExt.includes(path.extname(executableFile));
          let proc;
          if (process2.platform !== "win32") {
            if (launchWithNode) {
              args.unshift(executableFile);
              args = incrementNodeInspectorPort(process2.execArgv).concat(args);
              proc = childProcess.spawn(process2.argv[0], args, { stdio: "inherit" });
            } else {
              proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
            }
          } else {
            this._checkForMissingExecutable(
              executableFile,
              executableDir,
              subcommand._name
            );
            args.unshift(executableFile);
            args = incrementNodeInspectorPort(process2.execArgv).concat(args);
            proc = childProcess.spawn(process2.execPath, args, { stdio: "inherit" });
          }
          if (!proc.killed) {
            const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
            signals.forEach((signal) => {
              process2.on(signal, () => {
                if (proc.killed === false && proc.exitCode === null) {
                  proc.kill(signal);
                }
              });
            });
          }
          const exitCallback = this._exitCallback;
          proc.on("close", (code) => {
            code = code ?? 1;
            if (!exitCallback) {
              process2.exit(code);
            } else {
              exitCallback(
                new CommanderError2(
                  code,
                  "commander.executeSubCommandAsync",
                  "(close)"
                )
              );
            }
          });
          proc.on("error", (err) => {
            if (err.code === "ENOENT") {
              this._checkForMissingExecutable(
                executableFile,
                executableDir,
                subcommand._name
              );
            } else if (err.code === "EACCES") {
              throw new Error(`'${executableFile}' not executable`);
            }
            if (!exitCallback) {
              process2.exit(1);
            } else {
              const wrappedError = new CommanderError2(
                1,
                "commander.executeSubCommandAsync",
                "(error)"
              );
              wrappedError.nestedError = err;
              exitCallback(wrappedError);
            }
          });
          this.runningCommand = proc;
        }
        /**
         * @private
         */
        _dispatchSubcommand(commandName, operands, unknown) {
          const subCommand = this._findCommand(commandName);
          if (!subCommand) this.help({ error: true });
          subCommand._prepareForParse();
          let promiseChain;
          promiseChain = this._chainOrCallSubCommandHook(
            promiseChain,
            subCommand,
            "preSubcommand"
          );
          promiseChain = this._chainOrCall(promiseChain, () => {
            if (subCommand._executableHandler) {
              this._executeSubCommand(subCommand, operands.concat(unknown));
            } else {
              return subCommand._parseCommand(operands, unknown);
            }
          });
          return promiseChain;
        }
        /**
         * Invoke help directly if possible, or dispatch if necessary.
         * e.g. help foo
         *
         * @private
         */
        _dispatchHelpCommand(subcommandName) {
          if (!subcommandName) {
            this.help();
          }
          const subCommand = this._findCommand(subcommandName);
          if (subCommand && !subCommand._executableHandler) {
            subCommand.help();
          }
          return this._dispatchSubcommand(
            subcommandName,
            [],
            [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
          );
        }
        /**
         * Check this.args against expected this.registeredArguments.
         *
         * @private
         */
        _checkNumberOfArguments() {
          this.registeredArguments.forEach((arg, i) => {
            if (arg.required && this.args[i] == null) {
              this.missingArgument(arg.name());
            }
          });
          if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
            return;
          }
          if (this.args.length > this.registeredArguments.length) {
            this._excessArguments(this.args);
          }
        }
        /**
         * Process this.args using this.registeredArguments and save as this.processedArgs!
         *
         * @private
         */
        _processArguments() {
          const myParseArg = (argument, value, previous) => {
            let parsedValue = value;
            if (value !== null && argument.parseArg) {
              const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
              parsedValue = this._callParseArg(
                argument,
                value,
                previous,
                invalidValueMessage
              );
            }
            return parsedValue;
          };
          this._checkNumberOfArguments();
          const processedArgs = [];
          this.registeredArguments.forEach((declaredArg, index) => {
            let value = declaredArg.defaultValue;
            if (declaredArg.variadic) {
              if (index < this.args.length) {
                value = this.args.slice(index);
                if (declaredArg.parseArg) {
                  value = value.reduce((processed, v) => {
                    return myParseArg(declaredArg, v, processed);
                  }, declaredArg.defaultValue);
                }
              } else if (value === void 0) {
                value = [];
              }
            } else if (index < this.args.length) {
              value = this.args[index];
              if (declaredArg.parseArg) {
                value = myParseArg(declaredArg, value, declaredArg.defaultValue);
              }
            }
            processedArgs[index] = value;
          });
          this.processedArgs = processedArgs;
        }
        /**
         * Once we have a promise we chain, but call synchronously until then.
         *
         * @param {(Promise|undefined)} promise
         * @param {Function} fn
         * @return {(Promise|undefined)}
         * @private
         */
        _chainOrCall(promise, fn) {
          if (promise?.then && typeof promise.then === "function") {
            return promise.then(() => fn());
          }
          return fn();
        }
        /**
         *
         * @param {(Promise|undefined)} promise
         * @param {string} event
         * @return {(Promise|undefined)}
         * @private
         */
        _chainOrCallHooks(promise, event) {
          let result = promise;
          const hooks = [];
          this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
            hookedCommand._lifeCycleHooks[event].forEach((callback) => {
              hooks.push({ hookedCommand, callback });
            });
          });
          if (event === "postAction") {
            hooks.reverse();
          }
          hooks.forEach((hookDetail) => {
            result = this._chainOrCall(result, () => {
              return hookDetail.callback(hookDetail.hookedCommand, this);
            });
          });
          return result;
        }
        /**
         *
         * @param {(Promise|undefined)} promise
         * @param {Command} subCommand
         * @param {string} event
         * @return {(Promise|undefined)}
         * @private
         */
        _chainOrCallSubCommandHook(promise, subCommand, event) {
          let result = promise;
          if (this._lifeCycleHooks[event] !== void 0) {
            this._lifeCycleHooks[event].forEach((hook) => {
              result = this._chainOrCall(result, () => {
                return hook(this, subCommand);
              });
            });
          }
          return result;
        }
        /**
         * Process arguments in context of this command.
         * Returns action result, in case it is a promise.
         *
         * @private
         */
        _parseCommand(operands, unknown) {
          const parsed = this.parseOptions(unknown);
          this._parseOptionsEnv();
          this._parseOptionsImplied();
          operands = operands.concat(parsed.operands);
          unknown = parsed.unknown;
          this.args = operands.concat(unknown);
          if (operands && this._findCommand(operands[0])) {
            return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
          }
          if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
            return this._dispatchHelpCommand(operands[1]);
          }
          if (this._defaultCommandName) {
            this._outputHelpIfRequested(unknown);
            return this._dispatchSubcommand(
              this._defaultCommandName,
              operands,
              unknown
            );
          }
          if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
            this.help({ error: true });
          }
          this._outputHelpIfRequested(parsed.unknown);
          this._checkForMissingMandatoryOptions();
          this._checkForConflictingOptions();
          const checkForUnknownOptions = () => {
            if (parsed.unknown.length > 0) {
              this.unknownOption(parsed.unknown[0]);
            }
          };
          const commandEvent = `command:${this.name()}`;
          if (this._actionHandler) {
            checkForUnknownOptions();
            this._processArguments();
            let promiseChain;
            promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
            promiseChain = this._chainOrCall(
              promiseChain,
              () => this._actionHandler(this.processedArgs)
            );
            if (this.parent) {
              promiseChain = this._chainOrCall(promiseChain, () => {
                this.parent.emit(commandEvent, operands, unknown);
              });
            }
            promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
            return promiseChain;
          }
          if (this.parent?.listenerCount(commandEvent)) {
            checkForUnknownOptions();
            this._processArguments();
            this.parent.emit(commandEvent, operands, unknown);
          } else if (operands.length) {
            if (this._findCommand("*")) {
              return this._dispatchSubcommand("*", operands, unknown);
            }
            if (this.listenerCount("command:*")) {
              this.emit("command:*", operands, unknown);
            } else if (this.commands.length) {
              this.unknownCommand();
            } else {
              checkForUnknownOptions();
              this._processArguments();
            }
          } else if (this.commands.length) {
            checkForUnknownOptions();
            this.help({ error: true });
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        }
        /**
         * Find matching command.
         *
         * @private
         * @return {Command | undefined}
         */
        _findCommand(name) {
          if (!name) return void 0;
          return this.commands.find(
            (cmd) => cmd._name === name || cmd._aliases.includes(name)
          );
        }
        /**
         * Return an option matching `arg` if any.
         *
         * @param {string} arg
         * @return {Option}
         * @package
         */
        _findOption(arg) {
          return this.options.find((option) => option.is(arg));
        }
        /**
         * Display an error message if a mandatory option does not have a value.
         * Called after checking for help flags in leaf subcommand.
         *
         * @private
         */
        _checkForMissingMandatoryOptions() {
          this._getCommandAndAncestors().forEach((cmd) => {
            cmd.options.forEach((anOption) => {
              if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
                cmd.missingMandatoryOptionValue(anOption);
              }
            });
          });
        }
        /**
         * Display an error message if conflicting options are used together in this.
         *
         * @private
         */
        _checkForConflictingLocalOptions() {
          const definedNonDefaultOptions = this.options.filter((option) => {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0) {
              return false;
            }
            return this.getOptionValueSource(optionKey) !== "default";
          });
          const optionsWithConflicting = definedNonDefaultOptions.filter(
            (option) => option.conflictsWith.length > 0
          );
          optionsWithConflicting.forEach((option) => {
            const conflictingAndDefined = definedNonDefaultOptions.find(
              (defined) => option.conflictsWith.includes(defined.attributeName())
            );
            if (conflictingAndDefined) {
              this._conflictingOption(option, conflictingAndDefined);
            }
          });
        }
        /**
         * Display an error message if conflicting options are used together.
         * Called after checking for help flags in leaf subcommand.
         *
         * @private
         */
        _checkForConflictingOptions() {
          this._getCommandAndAncestors().forEach((cmd) => {
            cmd._checkForConflictingLocalOptions();
          });
        }
        /**
         * Parse options from `argv` removing known options,
         * and return argv split into operands and unknown arguments.
         *
         * Side effects: modifies command by storing options. Does not reset state if called again.
         *
         * Examples:
         *
         *     argv => operands, unknown
         *     --known kkk op => [op], []
         *     op --known kkk => [op], []
         *     sub --unknown uuu op => [sub], [--unknown uuu op]
         *     sub -- --unknown uuu op => [sub --unknown uuu op], []
         *
         * @param {string[]} args
         * @return {{operands: string[], unknown: string[]}}
         */
        parseOptions(args) {
          const operands = [];
          const unknown = [];
          let dest = operands;
          function maybeOption(arg) {
            return arg.length > 1 && arg[0] === "-";
          }
          const negativeNumberArg = (arg) => {
            if (!/^-(\d+|\d*\.\d+)(e[+-]?\d+)?$/.test(arg)) return false;
            return !this._getCommandAndAncestors().some(
              (cmd) => cmd.options.map((opt) => opt.short).some((short) => /^-\d$/.test(short))
            );
          };
          let activeVariadicOption = null;
          let activeGroup = null;
          let i = 0;
          while (i < args.length || activeGroup) {
            const arg = activeGroup ?? args[i++];
            activeGroup = null;
            if (arg === "--") {
              if (dest === unknown) dest.push(arg);
              dest.push(...args.slice(i));
              break;
            }
            if (activeVariadicOption && (!maybeOption(arg) || negativeNumberArg(arg))) {
              this.emit(`option:${activeVariadicOption.name()}`, arg);
              continue;
            }
            activeVariadicOption = null;
            if (maybeOption(arg)) {
              const option = this._findOption(arg);
              if (option) {
                if (option.required) {
                  const value = args[i++];
                  if (value === void 0) this.optionMissingArgument(option);
                  this.emit(`option:${option.name()}`, value);
                } else if (option.optional) {
                  let value = null;
                  if (i < args.length && (!maybeOption(args[i]) || negativeNumberArg(args[i]))) {
                    value = args[i++];
                  }
                  this.emit(`option:${option.name()}`, value);
                } else {
                  this.emit(`option:${option.name()}`);
                }
                activeVariadicOption = option.variadic ? option : null;
                continue;
              }
            }
            if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
              const option = this._findOption(`-${arg[1]}`);
              if (option) {
                if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                  this.emit(`option:${option.name()}`, arg.slice(2));
                } else {
                  this.emit(`option:${option.name()}`);
                  activeGroup = `-${arg.slice(2)}`;
                }
                continue;
              }
            }
            if (/^--[^=]+=/.test(arg)) {
              const index = arg.indexOf("=");
              const option = this._findOption(arg.slice(0, index));
              if (option && (option.required || option.optional)) {
                this.emit(`option:${option.name()}`, arg.slice(index + 1));
                continue;
              }
            }
            if (dest === operands && maybeOption(arg) && !(this.commands.length === 0 && negativeNumberArg(arg))) {
              dest = unknown;
            }
            if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
              if (this._findCommand(arg)) {
                operands.push(arg);
                unknown.push(...args.slice(i));
                break;
              } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
                operands.push(arg, ...args.slice(i));
                break;
              } else if (this._defaultCommandName) {
                unknown.push(arg, ...args.slice(i));
                break;
              }
            }
            if (this._passThroughOptions) {
              dest.push(arg, ...args.slice(i));
              break;
            }
            dest.push(arg);
          }
          return { operands, unknown };
        }
        /**
         * Return an object containing local option values as key-value pairs.
         *
         * @return {object}
         */
        opts() {
          if (this._storeOptionsAsProperties) {
            const result = {};
            const len = this.options.length;
            for (let i = 0; i < len; i++) {
              const key = this.options[i].attributeName();
              result[key] = key === this._versionOptionName ? this._version : this[key];
            }
            return result;
          }
          return this._optionValues;
        }
        /**
         * Return an object containing merged local and global option values as key-value pairs.
         *
         * @return {object}
         */
        optsWithGlobals() {
          return this._getCommandAndAncestors().reduce(
            (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
            {}
          );
        }
        /**
         * Display error message and exit (or call exitOverride).
         *
         * @param {string} message
         * @param {object} [errorOptions]
         * @param {string} [errorOptions.code] - an id string representing the error
         * @param {number} [errorOptions.exitCode] - used with process.exit
         */
        error(message, errorOptions) {
          this._outputConfiguration.outputError(
            `${message}
`,
            this._outputConfiguration.writeErr
          );
          if (typeof this._showHelpAfterError === "string") {
            this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
          } else if (this._showHelpAfterError) {
            this._outputConfiguration.writeErr("\n");
            this.outputHelp({ error: true });
          }
          const config = errorOptions || {};
          const exitCode = config.exitCode || 1;
          const code = config.code || "commander.error";
          this._exit(exitCode, code, message);
        }
        /**
         * Apply any option related environment variables, if option does
         * not have a value from cli or client code.
         *
         * @private
         */
        _parseOptionsEnv() {
          this.options.forEach((option) => {
            if (option.envVar && option.envVar in process2.env) {
              const optionKey = option.attributeName();
              if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(
                this.getOptionValueSource(optionKey)
              )) {
                if (option.required || option.optional) {
                  this.emit(`optionEnv:${option.name()}`, process2.env[option.envVar]);
                } else {
                  this.emit(`optionEnv:${option.name()}`);
                }
              }
            }
          });
        }
        /**
         * Apply any implied option values, if option is undefined or default value.
         *
         * @private
         */
        _parseOptionsImplied() {
          const dualHelper = new DualOptions(this.options);
          const hasCustomOptionValue = (optionKey) => {
            return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
          };
          this.options.filter(
            (option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(
              this.getOptionValue(option.attributeName()),
              option
            )
          ).forEach((option) => {
            Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
              this.setOptionValueWithSource(
                impliedKey,
                option.implied[impliedKey],
                "implied"
              );
            });
          });
        }
        /**
         * Argument `name` is missing.
         *
         * @param {string} name
         * @private
         */
        missingArgument(name) {
          const message = `error: missing required argument '${name}'`;
          this.error(message, { code: "commander.missingArgument" });
        }
        /**
         * `Option` is missing an argument.
         *
         * @param {Option} option
         * @private
         */
        optionMissingArgument(option) {
          const message = `error: option '${option.flags}' argument missing`;
          this.error(message, { code: "commander.optionMissingArgument" });
        }
        /**
         * `Option` does not have a value, and is a mandatory option.
         *
         * @param {Option} option
         * @private
         */
        missingMandatoryOptionValue(option) {
          const message = `error: required option '${option.flags}' not specified`;
          this.error(message, { code: "commander.missingMandatoryOptionValue" });
        }
        /**
         * `Option` conflicts with another option.
         *
         * @param {Option} option
         * @param {Option} conflictingOption
         * @private
         */
        _conflictingOption(option, conflictingOption) {
          const findBestOptionFromValue = (option2) => {
            const optionKey = option2.attributeName();
            const optionValue = this.getOptionValue(optionKey);
            const negativeOption = this.options.find(
              (target) => target.negate && optionKey === target.attributeName()
            );
            const positiveOption = this.options.find(
              (target) => !target.negate && optionKey === target.attributeName()
            );
            if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
              return negativeOption;
            }
            return positiveOption || option2;
          };
          const getErrorMessage = (option2) => {
            const bestOption = findBestOptionFromValue(option2);
            const optionKey = bestOption.attributeName();
            const source = this.getOptionValueSource(optionKey);
            if (source === "env") {
              return `environment variable '${bestOption.envVar}'`;
            }
            return `option '${bestOption.flags}'`;
          };
          const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
          this.error(message, { code: "commander.conflictingOption" });
        }
        /**
         * Unknown option `flag`.
         *
         * @param {string} flag
         * @private
         */
        unknownOption(flag) {
          if (this._allowUnknownOption) return;
          let suggestion = "";
          if (flag.startsWith("--") && this._showSuggestionAfterError) {
            let candidateFlags = [];
            let command = this;
            do {
              const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
              candidateFlags = candidateFlags.concat(moreFlags);
              command = command.parent;
            } while (command && !command._enablePositionalOptions);
            suggestion = suggestSimilar(flag, candidateFlags);
          }
          const message = `error: unknown option '${flag}'${suggestion}`;
          this.error(message, { code: "commander.unknownOption" });
        }
        /**
         * Excess arguments, more than expected.
         *
         * @param {string[]} receivedArgs
         * @private
         */
        _excessArguments(receivedArgs) {
          if (this._allowExcessArguments) return;
          const expected = this.registeredArguments.length;
          const s = expected === 1 ? "" : "s";
          const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
          const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
          this.error(message, { code: "commander.excessArguments" });
        }
        /**
         * Unknown command.
         *
         * @private
         */
        unknownCommand() {
          const unknownName = this.args[0];
          let suggestion = "";
          if (this._showSuggestionAfterError) {
            const candidateNames = [];
            this.createHelp().visibleCommands(this).forEach((command) => {
              candidateNames.push(command.name());
              if (command.alias()) candidateNames.push(command.alias());
            });
            suggestion = suggestSimilar(unknownName, candidateNames);
          }
          const message = `error: unknown command '${unknownName}'${suggestion}`;
          this.error(message, { code: "commander.unknownCommand" });
        }
        /**
         * Get or set the program version.
         *
         * This method auto-registers the "-V, --version" option which will print the version number.
         *
         * You can optionally supply the flags and description to override the defaults.
         *
         * @param {string} [str]
         * @param {string} [flags]
         * @param {string} [description]
         * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
         */
        version(str, flags, description) {
          if (str === void 0) return this._version;
          this._version = str;
          flags = flags || "-V, --version";
          description = description || "output the version number";
          const versionOption = this.createOption(flags, description);
          this._versionOptionName = versionOption.attributeName();
          this._registerOption(versionOption);
          this.on("option:" + versionOption.name(), () => {
            this._outputConfiguration.writeOut(`${str}
`);
            this._exit(0, "commander.version", str);
          });
          return this;
        }
        /**
         * Set the description.
         *
         * @param {string} [str]
         * @param {object} [argsDescription]
         * @return {(string|Command)}
         */
        description(str, argsDescription) {
          if (str === void 0 && argsDescription === void 0)
            return this._description;
          this._description = str;
          if (argsDescription) {
            this._argsDescription = argsDescription;
          }
          return this;
        }
        /**
         * Set the summary. Used when listed as subcommand of parent.
         *
         * @param {string} [str]
         * @return {(string|Command)}
         */
        summary(str) {
          if (str === void 0) return this._summary;
          this._summary = str;
          return this;
        }
        /**
         * Set an alias for the command.
         *
         * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
         *
         * @param {string} [alias]
         * @return {(string|Command)}
         */
        alias(alias) {
          if (alias === void 0) return this._aliases[0];
          let command = this;
          if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
            command = this.commands[this.commands.length - 1];
          }
          if (alias === command._name)
            throw new Error("Command alias can't be the same as its name");
          const matchingCommand = this.parent?._findCommand(alias);
          if (matchingCommand) {
            const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
            throw new Error(
              `cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`
            );
          }
          command._aliases.push(alias);
          return this;
        }
        /**
         * Set aliases for the command.
         *
         * Only the first alias is shown in the auto-generated help.
         *
         * @param {string[]} [aliases]
         * @return {(string[]|Command)}
         */
        aliases(aliases) {
          if (aliases === void 0) return this._aliases;
          aliases.forEach((alias) => this.alias(alias));
          return this;
        }
        /**
         * Set / get the command usage `str`.
         *
         * @param {string} [str]
         * @return {(string|Command)}
         */
        usage(str) {
          if (str === void 0) {
            if (this._usage) return this._usage;
            const args = this.registeredArguments.map((arg) => {
              return humanReadableArgName(arg);
            });
            return [].concat(
              this.options.length || this._helpOption !== null ? "[options]" : [],
              this.commands.length ? "[command]" : [],
              this.registeredArguments.length ? args : []
            ).join(" ");
          }
          this._usage = str;
          return this;
        }
        /**
         * Get or set the name of the command.
         *
         * @param {string} [str]
         * @return {(string|Command)}
         */
        name(str) {
          if (str === void 0) return this._name;
          this._name = str;
          return this;
        }
        /**
         * Set/get the help group heading for this subcommand in parent command's help.
         *
         * @param {string} [heading]
         * @return {Command | string}
         */
        helpGroup(heading) {
          if (heading === void 0) return this._helpGroupHeading ?? "";
          this._helpGroupHeading = heading;
          return this;
        }
        /**
         * Set/get the default help group heading for subcommands added to this command.
         * (This does not override a group set directly on the subcommand using .helpGroup().)
         *
         * @example
         * program.commandsGroup('Development Commands:);
         * program.command('watch')...
         * program.command('lint')...
         * ...
         *
         * @param {string} [heading]
         * @returns {Command | string}
         */
        commandsGroup(heading) {
          if (heading === void 0) return this._defaultCommandGroup ?? "";
          this._defaultCommandGroup = heading;
          return this;
        }
        /**
         * Set/get the default help group heading for options added to this command.
         * (This does not override a group set directly on the option using .helpGroup().)
         *
         * @example
         * program
         *   .optionsGroup('Development Options:')
         *   .option('-d, --debug', 'output extra debugging')
         *   .option('-p, --profile', 'output profiling information')
         *
         * @param {string} [heading]
         * @returns {Command | string}
         */
        optionsGroup(heading) {
          if (heading === void 0) return this._defaultOptionGroup ?? "";
          this._defaultOptionGroup = heading;
          return this;
        }
        /**
         * @param {Option} option
         * @private
         */
        _initOptionGroup(option) {
          if (this._defaultOptionGroup && !option.helpGroupHeading)
            option.helpGroup(this._defaultOptionGroup);
        }
        /**
         * @param {Command} cmd
         * @private
         */
        _initCommandGroup(cmd) {
          if (this._defaultCommandGroup && !cmd.helpGroup())
            cmd.helpGroup(this._defaultCommandGroup);
        }
        /**
         * Set the name of the command from script filename, such as process.argv[1],
         * or require.main.filename, or __filename.
         *
         * (Used internally and public although not documented in README.)
         *
         * @example
         * program.nameFromFilename(require.main.filename);
         *
         * @param {string} filename
         * @return {Command}
         */
        nameFromFilename(filename) {
          this._name = path.basename(filename, path.extname(filename));
          return this;
        }
        /**
         * Get or set the directory for searching for executable subcommands of this command.
         *
         * @example
         * program.executableDir(__dirname);
         * // or
         * program.executableDir('subcommands');
         *
         * @param {string} [path]
         * @return {(string|null|Command)}
         */
        executableDir(path2) {
          if (path2 === void 0) return this._executableDir;
          this._executableDir = path2;
          return this;
        }
        /**
         * Return program help documentation.
         *
         * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
         * @return {string}
         */
        helpInformation(contextOptions) {
          const helper = this.createHelp();
          const context = this._getOutputContext(contextOptions);
          helper.prepareContext({
            error: context.error,
            helpWidth: context.helpWidth,
            outputHasColors: context.hasColors
          });
          const text = helper.formatHelp(this, helper);
          if (context.hasColors) return text;
          return this._outputConfiguration.stripColor(text);
        }
        /**
         * @typedef HelpContext
         * @type {object}
         * @property {boolean} error
         * @property {number} helpWidth
         * @property {boolean} hasColors
         * @property {function} write - includes stripColor if needed
         *
         * @returns {HelpContext}
         * @private
         */
        _getOutputContext(contextOptions) {
          contextOptions = contextOptions || {};
          const error = !!contextOptions.error;
          let baseWrite;
          let hasColors;
          let helpWidth;
          if (error) {
            baseWrite = (str) => this._outputConfiguration.writeErr(str);
            hasColors = this._outputConfiguration.getErrHasColors();
            helpWidth = this._outputConfiguration.getErrHelpWidth();
          } else {
            baseWrite = (str) => this._outputConfiguration.writeOut(str);
            hasColors = this._outputConfiguration.getOutHasColors();
            helpWidth = this._outputConfiguration.getOutHelpWidth();
          }
          const write = (str) => {
            if (!hasColors) str = this._outputConfiguration.stripColor(str);
            return baseWrite(str);
          };
          return { error, write, hasColors, helpWidth };
        }
        /**
         * Output help information for this command.
         *
         * Outputs built-in help, and custom text added using `.addHelpText()`.
         *
         * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
         */
        outputHelp(contextOptions) {
          let deprecatedCallback;
          if (typeof contextOptions === "function") {
            deprecatedCallback = contextOptions;
            contextOptions = void 0;
          }
          const outputContext = this._getOutputContext(contextOptions);
          const eventContext = {
            error: outputContext.error,
            write: outputContext.write,
            command: this
          };
          this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", eventContext));
          this.emit("beforeHelp", eventContext);
          let helpInformation = this.helpInformation({ error: outputContext.error });
          if (deprecatedCallback) {
            helpInformation = deprecatedCallback(helpInformation);
            if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
              throw new Error("outputHelp callback must return a string or a Buffer");
            }
          }
          outputContext.write(helpInformation);
          if (this._getHelpOption()?.long) {
            this.emit(this._getHelpOption().long);
          }
          this.emit("afterHelp", eventContext);
          this._getCommandAndAncestors().forEach(
            (command) => command.emit("afterAllHelp", eventContext)
          );
        }
        /**
         * You can pass in flags and a description to customise the built-in help option.
         * Pass in false to disable the built-in help option.
         *
         * @example
         * program.helpOption('-?, --help' 'show help'); // customise
         * program.helpOption(false); // disable
         *
         * @param {(string | boolean)} flags
         * @param {string} [description]
         * @return {Command} `this` command for chaining
         */
        helpOption(flags, description) {
          if (typeof flags === "boolean") {
            if (flags) {
              if (this._helpOption === null) this._helpOption = void 0;
              if (this._defaultOptionGroup) {
                this._initOptionGroup(this._getHelpOption());
              }
            } else {
              this._helpOption = null;
            }
            return this;
          }
          this._helpOption = this.createOption(
            flags ?? "-h, --help",
            description ?? "display help for command"
          );
          if (flags || description) this._initOptionGroup(this._helpOption);
          return this;
        }
        /**
         * Lazy create help option.
         * Returns null if has been disabled with .helpOption(false).
         *
         * @returns {(Option | null)} the help option
         * @package
         */
        _getHelpOption() {
          if (this._helpOption === void 0) {
            this.helpOption(void 0, void 0);
          }
          return this._helpOption;
        }
        /**
         * Supply your own option to use for the built-in help option.
         * This is an alternative to using helpOption() to customise the flags and description etc.
         *
         * @param {Option} option
         * @return {Command} `this` command for chaining
         */
        addHelpOption(option) {
          this._helpOption = option;
          this._initOptionGroup(option);
          return this;
        }
        /**
         * Output help information and exit.
         *
         * Outputs built-in help, and custom text added using `.addHelpText()`.
         *
         * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
         */
        help(contextOptions) {
          this.outputHelp(contextOptions);
          let exitCode = Number(process2.exitCode ?? 0);
          if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
            exitCode = 1;
          }
          this._exit(exitCode, "commander.help", "(outputHelp)");
        }
        /**
         * // Do a little typing to coordinate emit and listener for the help text events.
         * @typedef HelpTextEventContext
         * @type {object}
         * @property {boolean} error
         * @property {Command} command
         * @property {function} write
         */
        /**
         * Add additional text to be displayed with the built-in help.
         *
         * Position is 'before' or 'after' to affect just this command,
         * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
         *
         * @param {string} position - before or after built-in help
         * @param {(string | Function)} text - string to add, or a function returning a string
         * @return {Command} `this` command for chaining
         */
        addHelpText(position, text) {
          const allowedValues = ["beforeAll", "before", "after", "afterAll"];
          if (!allowedValues.includes(position)) {
            throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
          }
          const helpEvent = `${position}Help`;
          this.on(helpEvent, (context) => {
            let helpStr;
            if (typeof text === "function") {
              helpStr = text({ error: context.error, command: context.command });
            } else {
              helpStr = text;
            }
            if (helpStr) {
              context.write(`${helpStr}
`);
            }
          });
          return this;
        }
        /**
         * Output help information if help flags specified
         *
         * @param {Array} args - array of options to search for help flags
         * @private
         */
        _outputHelpIfRequested(args) {
          const helpOption = this._getHelpOption();
          const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
          if (helpRequested) {
            this.outputHelp();
            this._exit(0, "commander.helpDisplayed", "(outputHelp)");
          }
        }
      };
      function incrementNodeInspectorPort(args) {
        return args.map((arg) => {
          if (!arg.startsWith("--inspect")) {
            return arg;
          }
          let debugOption;
          let debugHost = "127.0.0.1";
          let debugPort = "9229";
          let match;
          if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
            debugOption = match[1];
          } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
            debugOption = match[1];
            if (/^\d+$/.test(match[3])) {
              debugPort = match[3];
            } else {
              debugHost = match[3];
            }
          } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
            debugOption = match[1];
            debugHost = match[3];
            debugPort = match[4];
          }
          if (debugOption && debugPort !== "0") {
            return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
          }
          return arg;
        });
      }
      function useColor() {
        if (process2.env.NO_COLOR || process2.env.FORCE_COLOR === "0" || process2.env.FORCE_COLOR === "false")
          return false;
        if (process2.env.FORCE_COLOR || process2.env.CLICOLOR_FORCE !== void 0)
          return true;
        return void 0;
      }
      exports.Command = Command2;
      exports.useColor = useColor;
    }
  });

  // node_modules/commander/index.js
  var require_commander = __commonJS({
    "node_modules/commander/index.js"(exports) {
      var { Argument: Argument2 } = require_argument();
      var { Command: Command2 } = require_command();
      var { CommanderError: CommanderError2, InvalidArgumentError: InvalidArgumentError2 } = require_error();
      var { Help: Help2 } = require_help();
      var { Option: Option2 } = require_option();
      exports.program = new Command2();
      exports.createCommand = (name) => new Command2(name);
      exports.createOption = (flags, description) => new Option2(flags, description);
      exports.createArgument = (name, description) => new Argument2(name, description);
      exports.Command = Command2;
      exports.Option = Option2;
      exports.Argument = Argument2;
      exports.Help = Help2;
      exports.CommanderError = CommanderError2;
      exports.InvalidArgumentError = InvalidArgumentError2;
      exports.InvalidOptionArgumentError = InvalidArgumentError2;
    }
  });

  // libs/node-dist-vis/models/src/lib/data-view.ts
  var import_papaparse = __toESM(require_papaparse_min());

  // libs/node-dist-vis/models/src/lib/utils.ts
  function cachedAccessor(instance, accessor) {
    const cacheKey = Symbol();
    const obj = instance;
    return () => {
      obj[cacheKey] ??= accessor();
      return obj[cacheKey];
    };
  }
  async function batch(iterable, batchSize, itemCb, batchCb) {
    const iter = iterable[Symbol.iterator]();
    let index = 0;
    let done = false;
    while (!done) {
      for (let counter = 0; counter < batchSize; counter++) {
        const item = iter.next();
        if (item.done) {
          done = true;
          break;
        }
        itemCb(item.value, index);
        index++;
      }
      batchCb?.();
      await new Promise((res) => setTimeout(res, 0));
    }
  }

  // libs/node-dist-vis/models/src/lib/data-view.ts
  var NULL_DATA_ARRAY = Object.freeze([]);
  var DATA_VIEW_HEADER = Symbol("DataView header");
  var DATA_VIEW_DATA_OFFSET = Symbol("DataView data offset");
  function getKeyMappingExtra(mapping) {
    return mapping;
  }
  function createAccessorName(property, postfix) {
    const trimmedProperty = String(property).replace(/\s+/g, "");
    const capitalizedProperty = trimmedProperty.slice(0, 1).toUpperCase() + trimmedProperty.slice(1);
    return `get${capitalizedProperty}${postfix}`;
  }
  function createAccessor(instance, property, postfix) {
    const key = instance.keyMapping[property];
    if (key === void 0) {
      return () => void 0;
    }
    if (postfix === "At") {
      const { data, offset } = instance;
      return (index) => (data[index + offset] ?? {})[key];
    }
    return (obj) => obj[key];
  }
  function attachAccessors(instance, keys) {
    const postfixes = ["At", "For"];
    for (const key of keys) {
      for (const postfix of postfixes) {
        const name = createAccessorName(key, postfix);
        const accessor = createAccessor(instance, key, postfix);
        instance[name] = accessor;
      }
    }
  }
  function selectMaterializationKeyMapping(view, ...candidates) {
    const [mapping] = candidates.filter((candidate) => candidate !== void 0);
    const header = getKeyMappingExtra(mapping)[DATA_VIEW_HEADER];
    if (header === void 0) {
      return Object.entries(mapping);
    } else if (Array.isArray(view.at(0))) {
      return header.map((key, index) => [key, index]);
    }
    return header.map((key) => [key, key]);
  }
  function createDataViewClass(keys) {
    class DataViewImpl {
      constructor(data, keyMapping, offset = 0) {
        this.data = data;
        this.keyMapping = keyMapping;
        this.offset = offset;
        this.length = data.length - offset;
        attachAccessors(this, this.keys);
      }
      keys = keys;
      length;
      at = (index) => this.data[this.offset + index];
      getPropertyAt = (index, property) => {
        return this.getPropertyFor(this.data[this.offset + index] ?? {}, property);
      };
      getPropertyFor = (obj, property) => {
        const key = this.keyMapping[property];
        if (key === void 0) {
          return void 0;
        }
        return obj[key];
      };
      materializeAt = (index, keyMapping) => {
        return this.materializeFor(this.at(index), keyMapping);
      };
      materializeFor = (obj, keyMapping) => {
        const mapping = selectMaterializationKeyMapping(this, keyMapping, this.keyMapping);
        const result = {};
        for (const [key, prop] of mapping) {
          result[key] = obj[prop];
        }
        return result;
      };
      [Symbol.iterator]() {
        const iter = this.data[Symbol.iterator]();
        for (let index = 0; index < this.offset; index++) {
          iter.next();
        }
        return iter;
      }
    }
    return DataViewImpl;
  }
  function inferViewKeyMappingImpl(entry, mapping, keys) {
    const icase = (value) => String(value).toLowerCase();
    const isArrayEntry = Array.isArray(entry);
    let header = [];
    if (isArrayEntry) {
      const isAllNumeric = entry.every((value) => typeof value === "number");
      const isBackwardsIncompatibleEdges = entry.length === 7 && keys.length >= 7 && isAllNumeric;
      if (isBackwardsIncompatibleEdges) {
        console.warn("Legacy edge format detected! Edges csv now require a header.");
      } else {
        header = entry;
        getKeyMappingExtra(mapping)[DATA_VIEW_DATA_OFFSET] = 1;
      }
    } else {
      header = Object.keys(entry);
    }
    for (const key of keys) {
      const prop = mapping[key] ?? key;
      const propICase = icase(prop);
      const index = header.findIndex((candidate) => icase(candidate) === propICase);
      if (index >= 0) {
        mapping[key] = isArrayEntry ? index : header[index];
      } else if (key in mapping) {
        console.warn(`Could not find a matching column for '${String(mapping[key])}', key: ${String(key)}`);
        delete mapping[key];
      }
    }
    getKeyMappingExtra(mapping)[DATA_VIEW_HEADER] = header;
  }
  function validateViewKeyMapping(mapping, requiredKeys) {
    const missingKeys = [];
    for (const key of requiredKeys) {
      if (mapping[key] === void 0) {
        missingKeys.push(key);
      }
    }
    if (missingKeys.length > 0) {
      return new Error(`Missing required keys: ${missingKeys.join(", ")}`);
    }
  }

  // libs/node-dist-vis/models/src/lib/edges/generator.ts
  var CELL_NEIGHBORHOOD_OFFSETS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 0],
    [0, 1]
  ];
  var CellGrid = class {
    grid = {};
    addCellAt(x, y, cell) {
      this.ensureCellsExistsAt(x, y).push(cell);
    }
    getCellsAt(x, y) {
      return this.grid[x]?.[y];
    }
    *getNonEmptyIndices() {
      for (const x in this.grid) {
        for (const y in this.grid[x]) {
          yield [+x, +y];
        }
      }
    }
    *getNeighborhood(x, y) {
      for (const [xOffset, yOffset] of CELL_NEIGHBORHOOD_OFFSETS) {
        const cells = this.getCellsAt(x + xOffset, y + yOffset);
        if (cells !== void 0) {
          yield* cells;
        }
      }
    }
    ensureCellsExistsAt(x, y) {
      this.grid[x] ??= {};
      this.grid[x][y] ??= [];
      return this.grid[x][y];
    }
  };
  function partitionNodes(nodes, targetSelector, maxDistance) {
    const sourceCells = new CellGrid();
    const targetCells = new CellGrid();
    let index = 0;
    for (const node of nodes) {
      const type = nodes.getCellTypeFor(node);
      const cell = {
        index,
        type,
        x: nodes.getXFor(node),
        y: nodes.getYFor(node),
        z: nodes.getZFor(node) ?? 0,
        object: node
      };
      const grid = type === targetSelector ? targetCells : sourceCells;
      const gridX = Math.floor(cell.x / maxDistance);
      const gridY = Math.floor(cell.y / maxDistance);
      grid.addCellAt(gridX, gridY, cell);
      index++;
    }
    return { sourceCells, targetCells };
  }
  function cellDistanceSquared(cell1, cell2) {
    const x = cell1.x - cell2.x;
    const y = cell1.y - cell2.y;
    const z = cell1.z - cell2.z;
    return x * x + y * y + z * z;
  }
  function findClosestCell(cell, candidates, maxDistance) {
    let distance = maxDistance * maxDistance;
    let closest = void 0;
    for (const candidate of candidates) {
      const value = cellDistanceSquared(cell, candidate);
      if (value < distance) {
        distance = value;
        closest = candidate;
      }
    }
    return closest;
  }
  function* generateEdges(nodes, targetSelector, maxDistance) {
    const { sourceCells, targetCells } = partitionNodes(nodes, targetSelector, maxDistance);
    if (Object.keys(targetCells).length === 0) {
      console.warn(`No target cells found using selector '${targetSelector}'`);
      return;
    }
    for (const [x, y] of sourceCells.getNonEmptyIndices()) {
      const candidates = Array.from(targetCells.getNeighborhood(x, y));
      for (const cell of sourceCells.getCellsAt(x, y) ?? []) {
        const closest = findClosestCell(cell, candidates, maxDistance);
        if (closest !== void 0) {
          yield {
            "Cell ID": cell.index,
            "Target ID": closest.index,
            X1: cell.x,
            Y1: cell.y,
            Z1: cell.z,
            X2: closest.x,
            Y2: closest.y,
            Z2: closest.z
          };
        }
      }
    }
  }
  var progressTimeFormat = new Intl.DateTimeFormat(void 0, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3
  });

  // libs/node-dist-vis/models/src/lib/nodes.ts
  var REQUIRED_KEYS = ["Cell Type", "X", "Y"];
  var OPTIONAL_KEYS = ["Cell Ontology ID", "Z"];
  var BaseNodesView = createDataViewClass([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);
  var NodesView = class extends BaseNodesView {
    /**
     * Get the position of a node.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param index Index of data entry
     * @param info Optional accessor context
     * @returns The position in format [x, y, z]
     */
    getPositionAt = (index, info) => this.getPositionFor(this.at(index), info);
    /**
     * Get the position of a node.
     * If an accessor context is provided the preallocated target
     * array will be filled out and returned instead of a new array.
     *
     * @param obj Raw node data entry
     * @param info Optional accessor context
     * @returns The position in format [x, y, z]
     */
    getPositionFor = (obj, info) => {
      const position = info?.target ?? new Array(3);
      position[0] = this.getXFor(obj);
      position[1] = this.getYFor(obj);
      position[2] = this.getZFor(obj) ?? 0;
      return position;
    };
    /**
     * Get the dimensions (sometimes called 'extent') of all nodes
     * across the X, Y, and Z axes
     *
     * @returns An array of [minimum, maximum] values
     */
    getDimensions = cachedAccessor(this, () => {
      let min = Number.MAX_VALUE;
      let max = -Number.MAX_VALUE;
      for (const obj of this) {
        const x = this.getXFor(obj);
        const y = this.getYFor(obj);
        const z = this.getZFor(obj) ?? 0;
        min = Math.min(min, x, y, z);
        max = Math.max(max, x, y, z);
      }
      return [min, max];
    });
    getCounts = cachedAccessor(this, () => {
      const counts = {};
      for (const obj of this) {
        const type = this.getCellTypeFor(obj);
        counts[type] ??= 0;
        counts[type] += 1;
      }
      return new Map(Object.entries(counts));
    });
    createFilter = (filterView) => {
      return (obj, index) => filterView.includes(this.getCellTypeFor(obj), index);
    };
    createReindexer = async (filterView) => {
      const BATCH_SIZE = 2e4;
      const result = [];
      let acc = -1;
      await batch(this, BATCH_SIZE, (obj, index) => {
        const included = filterView.includes(this.getCellTypeFor(obj), index);
        acc += Number(included);
        result.push(acc);
      });
      return result;
    };
  };
  var EMPTY_NODES_VIEW = new NodesView([], {
    "Cell Type": 0,
    X: 1,
    Y: 2
  });

  // node_modules/commander/esm.mjs
  var import_index = __toESM(require_commander(), 1);
  var {
    program,
    createCommand,
    createArgument,
    createOption,
    CommanderError,
    InvalidArgumentError,
    InvalidOptionArgumentError,
    // deprecated old name
    Command,
    Argument,
    Option,
    Help
  } = import_index.default;

  // libs/node-dist-vis/src/cli.ts
  var import_node_fs = __require("node:fs");
  var import_node_zlib = __require("node:zlib");
  var import_papaparse2 = __toESM(require_papaparse_min());
  var VERSION = "0.0.1";
  async function* readLines(inputFile) {
    let inputStream = !inputFile || inputFile === "-" ? process.stdin : (0, import_node_fs.createReadStream)(inputFile, { autoClose: true });
    if (inputFile?.endsWith(".gz")) {
      inputStream = inputStream.pipe((0, import_node_zlib.createGunzip)());
    }
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    for await (const chunk of inputStream) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        yield line;
      }
    }
    if (buffer.length > 0) {
      yield buffer;
    }
  }
  async function* readCsv(input) {
    let header;
    const options = { skipEmptyLines: true, header: false };
    for await (const line of readLines(input)) {
      const parsed = (0, import_papaparse2.parse)(line, options);
      const row = parsed.data?.[0];
      if (!row) {
        continue;
      }
      if (!header) {
        header = row;
      } else {
        const result = {};
        for (let i = 0; i < header.length; i++) {
          result[header[i]] = row[i];
        }
        yield result;
      }
    }
  }
  function createBaseKeyMapping(mappings) {
    const result = {};
    for (const mapping of mappings) {
      const [from, to] = mapping.split(/(?<!\\):/, 2);
      result[from.replaceAll("\\:", ":")] = to.replaceAll("\\:", ":");
    }
    return result;
  }
  function createKeyMapping(entry, mappings) {
    const result = createBaseKeyMapping(mappings);
    inferViewKeyMappingImpl(entry, result, [...REQUIRED_KEYS, ...OPTIONAL_KEYS]);
    const error = validateViewKeyMapping(result, REQUIRED_KEYS);
    if (error) {
      throw error;
    }
    return result;
  }
  async function loadNodes2(file, mappings) {
    const data = [];
    for await (const row of readCsv(file)) {
      data.push(row);
    }
    const mapping = createKeyMapping(data[0], mappings);
    return new NodesView(data, mapping, 1);
  }
  var progressTimeFormat2 = new Intl.DateTimeFormat(void 0, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3
  });
  function reportProgress(processed, total) {
    const timestamp = Date.now();
    const percentage = Math.round(100 * processed / total);
    const time = progressTimeFormat2.format(timestamp);
    console.log(`Computing edges: ${percentage}% (${processed}/${total}) complete at ${time}`);
  }
  function edgeToRow(edge) {
    return `${edge["Cell ID"]},${edge["Target ID"]},${edge.X1},${edge.Y1},${edge.Z1},${edge.X2},${edge.Y2},${edge.Z2}
`;
  }
  async function streamEdgesToCsv(nodes, target, maxDistance, outputFile) {
    const { length } = nodes;
    const reportStep = Math.max(1, Math.floor(length / 20));
    const writeStream = (0, import_node_fs.createWriteStream)(outputFile, { encoding: "utf-8" });
    writeStream.write("Cell ID,Target ID,X1,Y1,Z1,X2,Y2,Z2\n");
    let edgeCount = 0;
    reportProgress(0, length);
    for (const edge of generateEdges(nodes, target, maxDistance)) {
      writeStream.write(edgeToRow(edge));
      edgeCount++;
      if (edgeCount % reportStep === 0) {
        reportProgress(edgeCount, length);
      }
    }
    reportProgress(length, length);
    return new Promise((resolve, reject) => {
      writeStream.end(() => resolve());
      writeStream.on("error", reject);
    });
  }
  async function generateEdgesAction(file, options) {
    const nodes = await loadNodes2(file, options.keys);
    await streamEdgesToCsv(nodes, options.target, Number(options.maxDistance), options.output);
  }
  var program2 = new Command().name("@hra-ui/node-dist-vis").description("Node distance visualization CLI").version(VERSION);
  program2.command("generate-edges").description("Generate edges from nodes").argument("<nodes>", "csv file with nodes").option("-t, --target <target>", "node target selector", "Endothelial").option("-k, --keys <mapping...>", "key mapping in the format 'from:to'", []).option("-d, --max-distance <maxDistance>", "max distance to target", "1000").option("-o, --output <filename>", "output file for generated edges", "edges.csv").action(generateEdgesAction);
  program2.parseAsync();
})();
/*! Bundled license information:

papaparse/papaparse.min.js:
  (* @license
  Papa Parse
  v5.5.3
  https://github.com/mholt/PapaParse
  License: MIT
  *)
*/
