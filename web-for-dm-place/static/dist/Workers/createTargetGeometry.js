define([
        '../Core/defined',
        '../Scene/PrimitivePipeline',
        '../ThirdParty/when',
        './createTaskProcessorWorker'
     
    ], function(
        defined,
        PrimitivePipeline,
        when,
        createTaskProcessorWorker
      ) {
    'use strict';

  
 
    function createTargetGeometry(parameters, transferableObjects) {
        // var subTasks = parameters.subTasks;
        // var length = subTasks.length;
        // var resultsOrPromises = new Array(length);

        // for (var i = 0; i < length; i++) {
        //     var task = subTasks[i];
        //     var geometry = task.geometry;
        //     var moduleName = task.moduleName;

        //     if (defined(moduleName)) {
        //         var createFunction = getModule(moduleName);
        //         resultsOrPromises[i] = createFunction(geometry, task.offset);
        //     } else {
        //         //Already created geometry
        //         resultsOrPromises[i] = geometry;
        //     }
        // }

        // return when.all(resultsOrPromises, function(results) {
        //     return PrimitivePipeline.packCreateGeometryResults(results, transferableObjects);
        // });
        var parmas1 = parameters.userData;
        var parmas2 = transferableObjects.userData;
        
        return {parm1:parmas1,parm2:parmas2};
    }

    return createTaskProcessorWorker(createTargetGeometry);
});
