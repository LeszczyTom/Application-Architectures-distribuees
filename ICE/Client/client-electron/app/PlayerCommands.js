//
// Copyright (c) ZeroC, Inc. All rights reserved.
//
//
// Ice version 3.7.7
//
// <auto-generated>
//
// Generated from file `PlayerCommands.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

/* eslint-disable */
/* jshint ignore: start */

(function(module, require, exports)
{
    const Ice = require("ice").Ice;
    const _ModuleRegistry = Ice._ModuleRegistry;
    const Slice = Ice.Slice;

    let tl = _ModuleRegistry.module("tl");

    Slice.defineSequence(tl, "fileHelper", "Ice.ByteHelper", true);

    const iceC_tl_PlayerCommands_ids = [
        "::Ice::Object",
        "::tl::PlayerCommands"
    ];

    tl.PlayerCommands = class extends Ice.Object
    {
    };

    tl.PlayerCommandsPrx = class extends Ice.ObjectPrx
    {
    };

    Slice.defineOperations(tl.PlayerCommands, tl.PlayerCommandsPrx, iceC_tl_PlayerCommands_ids, 1,
    {
        "play": [, , , , [1], [[1]], , , , ],
        "playSong": [, , , , [1], [[7]], , , , ],
        "stop": [, , , , [1], , , , , ],
        "repeat": [, , , , [1], [[1]], , , , ],
        "volume": [, , , , [1], [[3]], , , , ],
        "send": [, , , , , [["tl.fileHelper"]], , , , ],
        "receive": [, , , , , [["tl.fileHelper"]], , , , ]
    });
    exports.tl = tl;
}
(typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? module : undefined,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? require :
 (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) ? self.Ice._require : window.Ice._require,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? exports :
 (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) ? self : window));
