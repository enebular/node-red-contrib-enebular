module.exports = function(RED) {
    function analoginNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function(msg) {
            msg.topic = config.pin;
            if (config.vt === 'float') {
                msg.payload = 1.0;
                msg.analogin = 1.0;
            } else if (config.vt === 'int') {
                msg.payload = 0xffff;
                msg.analogin = 0xffff;
            } else if (config.vt === 'voltage') {
                msg.payload = 3.3;
                msg.analogin = 3.3;
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('analogin', analoginNode);
};
