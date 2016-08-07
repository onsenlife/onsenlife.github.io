(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Util = require("util");
(function() {
  var utilObj = new Util();

  utilObj.addReadyEvent(function(){
    var s = skrollr.init({
      edgeStrategy: 'set',
      easing: {
        WTF: Math.random,
        inverted: function(p) {
          return 1-p;
        } 
      }
    });
  });
})();

},{"util":2}],2:[function(require,module,exports){
var Util = function(){

};


Util.prototype.addReadyEvent = function(event) {
  this.addEvent(document,'DOMContentLoaded', event);
};


Util.prototype.addHashChangeEvent = function(event) {
  var my = this;
  
  this.addReadyEvent(function(){
    my.addEvent(window, "hashchange", event);
    event();
  });
};


Util.prototype.fireReadyEvent = function(){
  this.fireEvent(document, "DOMContentLoaded");
};


Util.prototype.fireEvent = function(targetObj, eventName){
  var event = document.createEvent( "HTMLEvents" ); // イベントオブジェクトを作成
  event.initEvent(eventName, false, true); // イベントの内容を設定
  targetObj.dispatchEvent(event); // イベントを発火させる
};


Util.prototype.addEvent = function(targetObj, eventName, eventFunction){
  targetObj.addEventListener(eventName, eventFunction);
};



Util.prototype.delayedExecution = function(func){
  var timerId = setInterval(function(){
    clearInterval(timerId);
    func();
  }, 200);
};


Util.prototype.getEventSender = function(e){
  e=e||window.event;
  return (e.target||e.srcElement);
};


Util.prototype.delayedExecutionByFlag = function(func){
  var self = this;
  var timerId = setInterval(function(){
    if(!self){
      clearInterval(timerId);
      func();
    }
  }, 50);
};


Util.prototype.addLog = function(isSuccess, messages){
  var obj;

  if(isSuccess){
    obj = document.getElementById("logbox_success");
  }else{
    obj = document.getElementById("logbox_error");
    this.showToast("Error!");
  }

  if(messages.senddata != "")
    messages.senddata = JSON.stringify(JSON.parse(messages.senddata), null, '\t');

  if(messages.resdata != "")
    messages.resdata = JSON.stringify(JSON.parse(messages.resdata), null, '\t');

  document.getElementById("result_field").insertAdjacentHTML("beforeend",
    obj.innerHTML
      .replace("{title}", messages.title)
      .replace("{url}", messages.url )
      .replace("{method}", messages.method )
      .replace("{senddata}", messages.senddata)
      .replace("{resdata}", messages.resdata)
  );


  this.initHighlightjs();
};

Util.prototype.clearLog = function() {
  document.getElementById("result_field").innerHTML = "";
};

Util.prototype.showToast = function(str){
  var snackbarContainer = document.querySelector('#toast-box');
  var data = {message: str};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

Util.prototype.initHighlightjs = function(){
  hljs.initHighlighting.called = false;
  hljs.initHighlighting();
};


module.exports = Util;
},{}]},{},[1]);
