#target photoshop
#include Layer.js

var size = 12;
var radius = size / 2;

function processLayers() {
    var doc = app.activeDocument;

    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];

        if (layer.kind === LayerKind.NORMAL) {
            var bounds = layer.bounds;
            var left = bounds[0].as('px');
            var top = bounds[1].as('px');
            var right = bounds[2].as('px');
            var bottom = bounds[3].as('px');
            var centerX = left + (right - left) / 2;
            var centerY = top + (bottom - top) / 2;

            var circle = new Ellipse(centerX - radius, centerY - radius, size, size);

            layer.remove();
        }
    }
}

// Run the script
app.activeDocument.suspendHistory('Replace Layers with Circles', 'processLayers()');
