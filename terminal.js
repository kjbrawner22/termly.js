(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  text: "!!!!!asdasd MEssage",
  ao: 2
}

},{}],2:[function(require,module,exports){
(function (window, document, undefined) {
  const DEFAULT_COMMANDS = require('./commands');
  var terminal_row = '\
    <span class="term_head" style="color:lightgreen;">➜ </span> \
    <input type="text" class="command_input" size="1"> \
  ';

  var Terminal = {
    init: function ( terminal_container, commands ) {
      this.commands = commands || DEFAULT_COMMANDS;
      this.container = terminal_container;
      this.generateRow( terminal_container );
      window.addEventListener('click', function () {
        document.getElementsByClassName('current')[0].children[1].focus();
      });
      console.log(this);
    },
    generateRow: function ( terminal_container ) {
      var that = this;
      var t, current, input;
      t = document.createElement('div');
      current = document.querySelectorAll(".current")[0];
      if(current){
        current.children[1].disabled = true;
        current.className = 'inner_terminal';
      }
      t.className = 'current inner_terminal';
      t.innerHTML = terminal_row;
      terminal_container.appendChild(t);
      current = terminal_container.querySelector('.current');
      var input = current.children[1];
      input.focus();
      input.addEventListener('keydown', that.consoleTypingHandler );
      return t;
    },
    getSTDIN: function (command) {
      var that = this;
      var res = that.parseCommand(command);
      that.sendSTDOUT(res);
    },
    sendSTDOUT: function (message) {
      var res = document.createElement('p');
      res.innerText = message;
      this.container.appendChild(res);
      this.generateRow(this.container);
    },
    parseCommand:function (command) {
      console.log(command);
      return "OK";
    },
    consoleTypingHandler: function (e) {
      var input = this;
      var size = input.size;
      var key = e.which || e.keyCode;
      if (key === 13){
        Terminal.getSTDIN(input.value);
        return;
      } else {
        input.size += 1;
      }
    },

  };


  window.Terminal = Terminal;

  document.onkeydown = function (e) {
    var evtobj = window.event? event : e
    //if (evtobj.ctrlKey || evtobj.altKey || evtobj.shiftKey || evtobj.metaKey && !evtobj.Backspace) e.preventDefault();
  }

})(window, window.document)

},{"./commands":1}]},{},[2]);
