import React from 'react';
import { observer } from 'mobx-react';
import 'reflect-metadata';
import { Container } from 'inversify';
export { inject as InjectStore, injectable as RegisterStore } from 'inversify';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
var RReact = require('react');
var originalCreateElement = RReact.createElement.bind(RReact);
RReact.createElement = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var functionReference = args[0], rest = args.slice(1);
    if (typeof functionReference !== 'function' || functionReference.prototype instanceof RReact.Component) {
        return originalCreateElement.apply(void 0, args);
    }
    if (functionReference.wrappedAsObserver) {
        return originalCreateElement.apply(void 0, [functionReference.wrappedAsObserver].concat(rest));
    }
    if (functionReference.avoidObservableWrapping || typeof functionReference !== 'function') {
        return originalCreateElement.apply(void 0, args);
    }
    var wrappedFunction = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            setComponentToBeRendered(functionReference);
            var result = functionReference.apply(void 0, args);
            setComponentToBeRendered(undefined);
            functionReference.avoidObservableWrapping = true;
            return result;
        }
        catch (error) {
            if (!error.isAbortRenderError) {
                throw error;
            }
        }
        return functionReference.wrappedAsObserver.apply(functionReference, args);
    };
    return originalCreateElement.apply(void 0, [wrappedFunction].concat(rest));
};

var componentToBeRendered;
function setComponentToBeRendered(component) {
    componentToBeRendered = component;
}
function getRenderingComponent() {
    return componentToBeRendered;
}

var AbortRenderError = /** @class */ (function (_super) {
    __extends(AbortRenderError, _super);
    function AbortRenderError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isAbortRenderError = true;
        return _this;
    }
    return AbortRenderError;
}(Error));

var UseStoreContext = React.createContext(undefined);
var UseStoreProvider = function (_a) {
    var children = _a.children;
    var container = new Container({ defaultScope: 'Singleton', autoBindInjectable: true });
    return React.createElement(UseStoreContext.Provider, { value: container }, children);
};

function useStore(type) {
    var renderingComponent = getRenderingComponent();
    if (renderingComponent.wrappedAsObserver) {
        var container = React.useContext(UseStoreContext);
        if (!container) {
            throw new Error('Missing InjectionContainerContext, you need to render InjectionContainerContext in app root');
        }
        return container.get(type);
    }
    var WrappedAsObserver = observer(renderingComponent);
    var WrappedComponent = function (props) {
        return React.createElement(WrappedAsObserver, __assign({}, props));
    };
    WrappedComponent.avoidObservableWrapping = true;
    renderingComponent.wrappedAsObserver = WrappedComponent;
    throw new AbortRenderError();
}

export { UseStoreProvider, useStore };
