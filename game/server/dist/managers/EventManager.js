"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.events = new Map();
    }
    EventManager.prototype.initializeEvents = function () {
        this.events.set("visit-registation", {
            eventId: 1,
            eventType: "message",
            eventData: {
                messageId: 1,
                messageText: "Пациент ждет у окна регистратуры",
                messageButtons: [
                    {
                        buttonId: 1,
                        buttonText: "Обслужить сейчас",
                        buttonEmit: "accept-dialog",
                    },
                    {
                        buttonId: 2,
                        buttonText: "Поставить в очередь",
                        buttonEmit: "place-queue-registrature",
                    },
                ],
            },
            isActive: false,
        });
    };
    EventManager.prototype.createEvent = function (senderId, recepientId, eventEmit) { };
    return EventManager;
}());
exports.EventManager = EventManager;
