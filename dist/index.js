
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MyModule = factory());
})(this, (function () { 'use strict';

  function numberFormatSpeech(num) {
    if (num > 0) {
      if (num >= 1000000000) {
        if (num / 1000000000 % 1 == 0) {
          return num / 1000000000 + ' billion';
        } else {
          return (num / 1000000000).toFixed(1) + ' billion';
        }
      }
      if (num >= 1000000) {
        if (num / 1000000 % 1 == 0) {
          return num / 1000000 + ' million';
        } else {
          return (num / 1000000).toFixed(1) + ' million';
        }
      }
      if (num % 1 != 0) {
        return num.toFixed(2);
      } else {
        return num;
      }
    }
    if (num < 0) {
      var posNum = num * -1;
      if (posNum >= 1000000000) return ["-" + String((posNum / 1000000000).toFixed(1)) + ' billion'];
      if (posNum >= 1000000) return ["-" + String((posNum / 1000000).toFixed(1)) + ' million'];else {
        return num;
      }
    }
    return num;
  }

  return numberFormatSpeech;

}));
