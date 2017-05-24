'use strict';

var fs = require('fs');
var parser = require('json-parser');


fs.readFile(__dirname + '/settings.json', function(err, data) {
  let settings = parser.parse(data);
  let params = settings.params;
  let rval = {};
  const amnt = params.length;
  const ip = settings.oscInputPort;
  const op = settings.oscOutputPort;

  rval.classArray = [];
  for (var i = 0; i < amnt; i++) {
    rval.classArray.push("Slider");
  }

  rval.keyArray = [];
  for (var i = 0; i < amnt; i++) {
    rval.keyArray.push(params[i]);
  }

  rval.uiBuilder = {};
  for (var i = 0; i < amnt; i++) {
    var o = [
        {
          "msgAddress" : "\/eyeposy",
          "normalizeFlag" : true,
          "floatInvertFlag" : false,
          "outputPort" : 57121,
          "boolInvertFlag" : false,
          "boolThreshVal" : 0.1,
          "highIntVal" : 100,
          "outputIPAddress" : "127.0.0.1",
          "outputLabel" : "OSC Out Port 1",
          "dataSenderType" : 2,
          "lowIntVal" : 0,
          "enabled" : true,
          "intInvertFlag" : false,
          "senderType" : 4
        }
      ];

    rval.uiBuilder[params[i]] = o;
  }
  rval.uiBuilder.VWGridSize = "{-1, -1}";
  fs.writeFile(__dirname +"/export.json", JSON.stringify(rval));
  console.log(JSON.parse(JSON.stringify(rval)));


  printObject({hallo:{hey:{hoe:"hoe"}}});
});

function printObject(o){
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      console.log(i + " : ");
      if (typeof o[i] == "object"){

        printObject(o[i]);
      } else {
        console.log(o[i]);
      }
    }
  }

}
