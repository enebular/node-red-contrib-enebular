var htmlspecialchars = require('htmlspecialchars');

var not_include_list = ['node-red', 'node-red-node-aws-lambda-io', 'node-red-contrib-enebular']

module.exports = function(RED) {
  console.log('##### eneublar lambda deploy ####');
  var ENEBULAR_URL = process.env.ISSUER || "https://enebular.com";
  var flowId = process.env.FLOW_ID;

	RED.httpAdmin.post("/enebular/deploy", function (req, res) {
    var flows = JSON.parse(req.body.flows);
    var creds = flows.reduce(function(creds, node) {
      var cred = RED.nodes.getCredentials(node.id);
      if (cred) {
        creds[node.id] = cred;
      }
      return creds;
    }, {});
    var nodeList = RED.nodes.getNodeList();
    var types = nodeList.reduce(function(types, node) {
      (node.types || []).forEach(function(type) {
        types[type] = [ node.module, node.version ];
      });
      return types;
    }, {});
    var packages = flows.reduce(function(packages, node) {
      var modVer = types[node.type];
      if (modVer) {
        var module = modVer[0], version = modVer[1];
        if (not_include_list.indexOf(module) < 0) {
          packages[module] = version;
        }
      }
      return packages;
    }, {});
    var deployPostUrl = ENEBULAR_URL + "/deploy/";
    var formPostHtml =
      '<html><body onload="document.form1.submit()">' +
      '<form name="form1" method="POST" action="' + deployPostUrl + '">' +
      '<input type="hidden" name="flowId" value="' + flowId + '"/>' +
      '</form>' +
      '</body></html>';
    res.set('Content-Type', 'text/html');
    res.send(formPostHtml);
	});
};
