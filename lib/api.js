"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const rx_promise_queue_1 = require("rx-promise-queue");
const types_1 = require("./types");
const isAxiosError = (error) => {
    return error.response && error.request;
};
/**
 * Message long polling notifies you of events that occur on the Live Agent server for your Live Agent session.
 * When you start a request, all pending messages will be immediately delivered to your session. If there are no pending messages, the connection to the server will remain open. The connection will return messages continuously as they are received on the server.
 *
 * If your session expires, you will receive a 200 (“OK”) response code and a resource that contains an array of the remaining messages. If no messages were received, you will receive a 204 (“No Content”) response code.
 *
 * When you receive a 200 (“OK”) or 204 (“No Content”) response code, immediately perform another Messages request to continue to retrieve messages that are registered on the Live Agent server.
 * Warning
 * If you don’t make another Messages request to continue the messaging loop, your session will end after a system timeout on the Live Agent server.
 *
 * If you don’t receive a response within the number of seconds indicated by the clientPollTimeout property in your SessionId request, your network connection to the server is likely experiencing an error, so you should terminate the request.
 *
 * To initiate a long polling loop, perform a Messages request.
 */
class Api {
    constructor(config) {
        this.ack = -1;
        this.session = {};
        this.queue = rx_promise_queue_1.createQueue();
        this.clientCancelToken = axios_1.default.CancelToken.source();
        /** Indicates whether a chat button is available to receive new chat requests. */
        this.availability = async (data) => {
            const result = await this.makeRequest({
                url: '/chat/rest/Visitor/Availability',
                method: 'get',
                params: {
                    org_id: this.config.organizationId,
                    deployment_id: this.config.deploymentId,
                    'Availability.ids': data && data.Availability && data.Availability.ids ? data.Availability.ids : this.config.buttonId,
                },
            });
            return {
                type: 'Availability',
                message: {
                    results: result.messages[0].message.results,
                },
            };
        };
        /** Sets a breadcrumb value to the URL of the Web page that the chat visitor is viewing as the visitor chats with an agent. The agent can then see the value of the breadcrumb to determine the page the chat visitor is viewing. */
        this.breadcrumb = async (data) => this.makeRequest({
            data,
            url: '/chat/rest/Visitor/Breadcrumb',
            method: 'post',
        });
        /** Establishes a new Live Agent session. The SessionId request is required as the first request to create every new Live Agent session. */
        this.sessionId = async () => {
            this.session = await this.makeRequest({
                url: '/chat/rest/System/SessionId',
            });
        };
        /** Initiates a new chat visitor session. The ChasitorInit request is always required as the first POST request in a new chat session. */
        this.chasitorInit = async (data) => this.makeSessionRequest({
            url: '/chat/rest/Chasitor/ChasitorInit',
            method: 'post',
            data: {
                buttonId: this.config.buttonId,
                deploymentId: this.config.deploymentId,
                organizationId: this.config.organizationId,
                sessionId: this.session.id,
                ...data,
            },
            sequence: true,
        });
        /**
         * Reestablishes a customer’s chat session on a new server if the session is interrupted and the original server is unavailable.
         * This request should only be made if you receive a 503 response status code, indicating that the affinity token has changed for your Live Agent session. When you receive a 503 response status code, you must cancel any existing inbound or outbound requests.
         *
         * The data in outbound requests will be temporarily stored and resent once the session is reestablished. Upon receiving the response for the ResyncSession request, you can start polling for messages if the isValid response property is true.
         *
         * The first response will be a ChasitorSessionData message containing the data from the previous session that will be restored once the session is reestablished. After receiving that message, you can proceed to send the existing messages that were cancelled upon receiving the 503 response status code.
         */
        this.resyncSession = async () => this.makeSessionRequest({
            url: '/chat/rest/Chasitor/ChasitorInit',
        });
        /** Reestablishes the chat visitor’s state, including the details of the chat, after a ResyncSession request is completed. */
        this.chasitorResyncState = async (data) => this.makeSessionRequest({
            data,
            url: '/chat/rest/Chasitor/ChasitorResyncState',
            method: 'post',
        });
        /** Indicates that the chat visitor is not typing in the chat window. */
        this.chasitorNotTyping = async () => this.makeSessionRequest({
            data: {},
            url: '/chat/rest/Chasitor/ChasitorNotTyping',
            method: 'post',
            sequence: true,
        });
        /** Provides a chat visitor’s message that was viewable through Sneak Peek. */
        this.chasitorSneakPeek = async (data) => this.makeSessionRequest({
            data,
            url: '/chat/rest/Chasitor/ChasitorSneakPeek',
            method: 'post',
            sequence: true,
        });
        /** Indicates that a chat visitor is typing a message in the chat window. */
        this.chasitorTyping = async () => this.makeSessionRequest({
            data: {},
            url: '/chat/rest/Chasitor/ChasitorTyping',
            method: 'post',
            sequence: true,
        });
        /** Indicates that a chat visitor has ended the chat. */
        this.chatEnd = async () => {
            await this.makeSessionRequest({
                data: {
                    reason: 'client',
                },
                url: '/chat/rest/Chasitor/ChatEnd',
                method: 'post',
                sequence: true,
            });
            this.clientCancelToken.cancel();
            return {
                type: 'ChatEnd',
                message: {},
            };
        };
        /** Returns the body of the chat message sent by the chat visitor. */
        this.chatMessage = async (data) => {
            await this.makeSessionRequest({
                data,
                url: '/chat/rest/Chasitor/ChatMessage',
                method: 'post',
                sequence: true,
            });
            return {
                type: 'ChasitorChatMessage',
                message: {
                    text: data.text,
                    name: this.visitor.name,
                    agentId: this.visitor.id,
                },
            };
        };
        /** Indicates a custom event was sent from the chat visitor during the chat. */
        this.customEvent = async (data) => this.makeSessionRequest({
            data,
            url: '/chat/rest/Chasitor/CustomEvent',
            method: 'post',
            sequence: true,
        });
        /** Returns all messages that were sent between agents and chat visitors during a chat session. */
        this.messages = async () => {
            const response = await this.makeSessionRequest({
                url: '/chat/rest/System/Messages',
                method: 'get',
                sequence: false,
                params: { ack: this.ack },
                useQueue: false,
            });
            if (response && response.sequence !== undefined)
                this.ack = response.sequence;
            return response;
        };
        /** Batches multiple POST requests together if you’re sending multiple messages at the same time. */
        this.multiNoun = async (data) => this.makeSessionRequest({
            data,
            url: '/chat/rest/System/MultiNoun',
            method: 'post',
            sequence: true,
        });
        /** Retrieves all settings information about the Live Agent deployment that’s associated with your chat session. The Settings request is required as the first request to establish a chat visitor’s session. */
        this.settings = async (data) => this.makeRequest({
            url: '/chat/rest/Visitor/Settings',
            method: 'get',
            params: {
                org_id: this.config.organizationId,
                deployment_id: this.config.deploymentId,
                'Settings.buttonIds': data.Settings.buttonIds,
                'Settings.updateBreadcrumb': data.Settings.updateBreadcrumb,
            },
        });
        /** Generates a unique ID to track a chat visitor when they initiate a chat request and tracks the visitor’s activities as the visitor navigates from one Web page to another. */
        this.visitorId = async () => this.makeRequest({
            url: '/chat/rest/Visitor/VisitorId',
            method: 'get',
            params: {
                org_id: this.config.organizationId,
                deployment_id: this.config.deploymentId,
            },
        });
        this.makeRequest = async (config) => {
            config.cancelToken = this.clientCancelToken.token;
            if (config.useQueue === undefined)
                config.useQueue = true;
            if (config && config.data && config.data.visitorName)
                this.visitor.name = config.data.visitorName;
            config.headers = config.headers || {};
            config.headers[types_1.Header.X_LIVEAGENT_AFFINITY] = config.affinityToken || 'null';
            if (config.key)
                config.headers[types_1.Header.X_LIVEAGENT_SESSION_KEY] = config.key;
            try {
                const response = config.useQueue ? (await this.queue.add(() => this.client.request(config))) : (await this.client.request(config));
                return response.data;
            }
            catch (error) {
                if (isAxiosError(error) && error.response) {
                    switch (error.response.status) {
                        case 400:
                            error.message = 'The request couldn’t be understood, usually because the JSON body contains an error.';
                            break;
                        case 403:
                            error.message = 'The request has been refused because the session isn’t valid.';
                            break;
                        case 404:
                            error.message = 'The requested resource couldn’t be found. Check the URI for errors.';
                            break;
                        case 405:
                            error.message = 'The method specified in the Request-Line isn’t allowed for the resource specified in the URI.';
                            break;
                        case 409:
                            error.message = `There is a conflict, probably a message acked out of order. ${error.response.data}`;
                            break;
                        case 500:
                            error.message = 'An error has occurred within the Live Agent server, so the request couldn’t be completed. Contact Customer Support.';
                            break;
                        case 503:
                            error.message = 'The affinity token has changed. You must make a ResyncSession request to get a new affinity token and session key, then make a ChasitorSessionData request to reestablish the chat visitor’s data within the new session.';
                            break;
                        default:
                            error.message = 'Unknown error.';
                    }
                }
                throw error;
            }
        };
        this.makeSessionRequest = async (config) => {
            if (!this.session || !this.session.id || !this.session.key)
                throw new Error('Session is invalid.  You must start a session before calling this method.  This usually happens if you have tried to use an API method before calling the sessionId method.');
            try {
                const result = await this.makeRequest({ ...config, ...this.session });
                return result;
            }
            catch (error) {
                throw error;
            }
        };
        this.config = config;
        this.visitor = { id: '', name: '' };
        this.client = axios_1.default.create({
            baseURL: this.config.host,
            headers: {
                [types_1.Header.X_LIVEAGENT_API_VERSION]: this.config.version || '42',
                Accept: 'content/json',
                'Content-Type': 'application/json',
            },
        });
    }
}
exports.Api = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBZ0c7QUFDaEcsdURBQTZEO0FBRTdELG1DQUFnRTtBQUNoRSxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQVUsRUFBdUIsRUFBRTtJQUN2RCxPQUFPLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUN6QyxDQUFDLENBQUM7QUFtQkY7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQWEsR0FBRztJQVVkLFlBQVksTUFBdUI7UUFOM0IsUUFBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1QsWUFBTyxHQUF3QixFQUFTLENBQUM7UUFFekMsVUFBSyxHQUFpQiw4QkFBVyxFQUFFLENBQUM7UUFDcEMsc0JBQWlCLEdBQXNCLGVBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7UUFlMUUsaUZBQWlGO1FBQzFFLGlCQUFZLEdBQUcsS0FBSyxFQUFFLElBQTRCLEVBQWtDLEVBQUU7WUFDM0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUEyRDtnQkFDOUYsR0FBRyxFQUFFLGlDQUFpQztnQkFDdEMsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFO29CQUNOLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWM7b0JBQ2xDLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVk7b0JBQ3ZDLGtCQUFrQixFQUFFLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2lCQUN0SDthQUNGLENBQUMsQ0FBQztZQUNILE9BQU87Z0JBQ0wsSUFBSSxFQUFFLGNBQWM7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