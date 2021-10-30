"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrackingEvent = exports.getTelemetryServiceInstance = void 0;
/*******************************************************************************
 * Copyright (c) 2021 Red Hat, Inc.
 * Distributed under license by Red Hat, Inc. All rights reserved.
 * This program is made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v20.html
 *
 * Contributors:
 * Red Hat, Inc. - initial API and implementation
 ******************************************************************************/
const vscode_redhat_telemetry_1 = require("@redhat-developer/vscode-redhat-telemetry");
const telemetryService = vscode_redhat_telemetry_1.getTelemetryService("redhat.vscode-rsp-ui");
function getTelemetryServiceInstance() {
    return __awaiter(this, void 0, void 0, function* () {
        return telemetryService;
    });
}
exports.getTelemetryServiceInstance = getTelemetryServiceInstance;
function createTrackingEvent(name, properties = {}) {
    return {
        type: 'track',
        name,
        properties
    };
}
exports.createTrackingEvent = createTrackingEvent;
function sendTelemetry(actionName, properties) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = yield getTelemetryServiceInstance();
        if (actionName === 'activation') {
            return service === null || service === void 0 ? void 0 : service.sendStartupEvent();
        }
        return service === null || service === void 0 ? void 0 : service.send(createTrackingEvent(actionName, properties));
    });
}
exports.default = sendTelemetry;
//# sourceMappingURL=telemetry.js.map