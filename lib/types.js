"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Axios = tslib_1.__importStar(require("axios"));
exports.Axios = Axios;
var Header;
(function (Header) {
    Header["X_LIVEAGENT_API_VERSION"] = "X-LIVEAGENT-API-VERSION";
    Header["X_LIVEAGENT_AFFINITY"] = "X-LIVEAGENT-AFFINITY";
    Header["X_LIVEAGENT_SESSION_KEY"] = "X-LIVEAGENT-SESSION-KEY";
    Header["X_LIVEAGENT_SEQUENCE"] = "X-LIVEAGENT-SEQUENCE";
})(Header = exports.Header || (exports.Header = {}));
var Messages;
(function (Messages) {
    Messages.AVAILABILITY = 'Availability';
    Messages.AGENT_DISCONNECT = 'AgentDisconnect';
    Messages.AGENT_TYPING = 'AgentTyping';
    Messages.AGENT_NOT_TYPING = 'AgentNotTyping';
    Messages.CHASITOR_SESSION_DATA = 'ChasitorSessionData';
    Messages.CHAT_ENDED = 'ChatEnded';
    Messages.CHAT_END = 'ChatEnd';
    Messages.CHAT_ESTABLISHED = 'ChatEstablished';
    Messages.CHAT_MESSAGE = 'ChatMessage';
    Messages.CHASITOR_CHAT_MESSAGE = 'ChasitorChatMessage';
    Messages.CHAT_REQUEST_FAIL = 'ChatRequestFail';
    Messages.CHAT_REQUEST_SUCCESS = 'ChatRequestSuccess';
    Messages.CHAT_TRANSFERRED = 'ChatTransferred';
    Messages.CUSTOM_EVENT = 'CustomEvent';
    Messages.NEW_VISITOR_BREADCRUMB = 'NewVisitorBreadcrumb';
    Messages.QUEUE_UPDATE = 'QueueUpdate';
})(Messages = exports.Messages || (exports.Messages = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQStCO0FBQ3RCLHNCQUFLO0FBUWQsSUFBWSxNQUtYO0FBTEQsV0FBWSxNQUFNO0lBQ2hCLDZEQUFtRCxDQUFBO0lBQ25ELHVEQUE2QyxDQUFBO0lBQzdDLDZEQUFtRCxDQUFBO0lBQ25ELHVEQUE2QyxDQUFBO0FBQy9DLENBQUMsRUFMVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFLakI7QUFzaEJELElBQWlCLFFBQVEsQ0EwSnhCO0FBMUpELFdBQWlCLFFBQVE7SUFNVixxQkFBWSxHQUFHLGNBQWMsQ0FBQztJQVU5Qix5QkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztJQU1yQyxxQkFBWSxHQUFHLGFBQWEsQ0FBQztJQU03Qix5QkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztJQWFwQyw4QkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztJQU05QyxtQkFBVSxHQUFHLFdBQVcsQ0FBQztJQU16QixpQkFBUSxHQUFHLFNBQVMsQ0FBQztJQU1yQix5QkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztJQU1yQyxxQkFBWSxHQUFHLGFBQWEsQ0FBQztJQU03Qiw4QkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztJQU05QywwQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztJQVd0Qyw2QkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztJQU01Qyx5QkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztJQU1yQyxxQkFBWSxHQUFHLGFBQWEsQ0FBQztJQU03QiwrQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztJQU1oRCxxQkFBWSxHQUFHLGFBQWEsQ0FBQztBQTBDNUMsQ0FBQyxFQTFKZ0IsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUEwSnhCIn0=