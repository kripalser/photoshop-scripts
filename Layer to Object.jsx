#target photoshop
#include Layer.js

var size = 12;
var radius = size / 2;

function createSmartObject(centerX, centerY, width, height) {
    var circle = new Ellipse(centerX, centerY, width, height);
    var idnewPlacedLayer = stringIDToTypeID( 'newPlacedLayer' );
    executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
}

function duplicateSmartObject(x, y) {
    var doc = app.activeDocument;
    var duplicatedLayer = doc.activeLayer.duplicate();

    duplicatedLayer.translate(x - doc.activeLayer.bounds[0].as('px'), y - doc.activeLayer.bounds[1].as('px'));
}

function processLayers() {
    var doc = app.activeDocument;
    var isSmartObjectCreated = false;

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

            if (isSmartObjectCreated === false) {
                createSmartObject(centerX - radius, centerY - radius, size, size);
                isSmartObjectCreated = true;
            } else {
                duplicateSmartObject(centerX - radius, centerY - radius);
            }

            layer.remove();
        }
    }
}

// Run the script
app.activeDocument.suspendHistory('Replace Layers with Objects', 'processLayers()');
