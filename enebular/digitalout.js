module.exports = function(RED) {
    function digitaloutNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function(msg) {
            var val = config.value;

            if (val === 'false' || val == false) {
                this.status({ fill: 'blue', shape: 'ring', text: config.pin + ' is false' });
            } else if (val === 'true' || val == true) {
                this.status({ fill: 'blue', shape: 'dot', text: config.pin + ' is true' });
            } else {
                if (msg[config.pin]) {
                    val = msg[config.pin];
                    if (val === 'false' || val == false) {
                        this.status({
                            fill: 'blue',
                            shape: 'ring',
                            text: config.pin + ' is false'
                        });
                    } else if (val === 'true' || val == true) {
                        this.status({ fill: 'blue', shape: 'dot', text: config.pin + ' is true' });
                    } else {
                        this.status({
                            fill: 'gray',
                            shape: 'dot',
                            text: config.pin + ' is unknown'
                        });
                    }
                } else {
                    this.status({ fill: 'gray', shape: 'dot', text: config.pin + ' is unknown' });
                }
            }

            node.send(msg);
        });
    }
    RED.nodes.registerType('digitalout', digitaloutNode);
};
