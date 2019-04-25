import { Messages, Requests, Responses } from './types';
export interface LiveagentConfig {
    host: string;
    version: '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '41' | '42';
    /** The ID of the Salesforce organization that’s associated with the Live Agent deployment */
    organizationId: string;
    /** The ID of theLive Agent deployment that the chat request was initiated from */
    deploymentId: string;
    buttonId: string;
}
export interface Visitor {
    id: string;
    name: string;
}
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
export declare class Api {
    visitor: Visitor;
    private config;
    private ack;
    private session;
    private client;
    private queue;
    private clientCancelToken;
    constructor(config: LiveagentConfig);
    /** Indicates whether a chat button is available to receive new chat requests. */
    availability: (data?: Requests.Availability | undefined) => Promise<Messages.Message<"Availability", Responses.Availability>>;
    /** Sets a breadcrumb value to the URL of the Web page that the chat visitor is viewing as the visitor chats with an agent. The agent can then see the value of the breadcrumb to determine the page the chat visitor is viewing. */
    breadcrumb: (data: Requests.Breadcrumb) => Promise<Responses.None>;
    /** Establishes a new Live Agent session. The SessionId request is required as the first request to create every new Live Agent session. */
    sessionId: () => Promise<void>;
    /** Initiates a new chat visitor session. The ChasitorInit request is always required as the first POST request in a new chat session. */
    chasitorInit: (data: Requests.ChasitorInit) => Promise<Responses.None>;
    /**
     * Reestablishes a customer’s chat session on a new server if the session is interrupted and the original server is unavailable.
     * This request should only be made if you receive a 503 response status code, indicating that the affinity token has changed for your Live Agent session. When you receive a 503 response status code, you must cancel any existing inbound or outbound requests.
     *
     * The data in outbound requests will be temporarily stored and resent once the session is reestablished. Upon receiving the response for the ResyncSession request, you can start polling for messages if the isValid response property is true.
     *
     * The first response will be a ChasitorSessionData message containing the data from the previous session that will be restored once the session is reestablished. After receiving that message, you can proceed to send the existing messages that were cancelled upon receiving the 503 response status code.
     */
    resyncSession: () => Promise<Responses.ResyncSession>;
    /** Reestablishes the chat visitor’s state, including the details of the chat, after a ResyncSession request is completed. */
    chasitorResyncState: (data: Requests.ChasitorResyncState) => Promise<Responses.ResyncSession>;
    /** Indicates that the chat visitor is not typing in the chat window. */
    chasitorNotTyping: () => Promise<Responses.None>;
    /** Provides a chat visitor’s message that was viewable through Sneak Peek. */
    chasitorSneakPeek: (data: Requests.ChasitorSneakPeak) => Promise<Responses.None>;
    /** Indicates that a chat visitor is typing a message in the chat window. */
    chasitorTyping: () => Promise<Responses.None>;
    /** Indicates that a chat visitor has ended the chat. */
    chatEnd: () => Promise<Messages.Message<"ChatEnd", Responses.ChatEnd>>;
    /** Returns the body of the chat message sent by the chat visitor. */
    chatMessage: (data: Requests.ChatMessage) => Promise<Messages.Message<"ChasitorChatMessage", Responses.ChatMessage>>;
    /** Indicates a custom event was sent from the chat visitor during the chat. */
    customEvent: (data: Requests.CustomEvent) => Promise<Responses.None>;
    /** Returns all messages that were sent between agents and chat visitors during a chat session. */
    messages: () => Promise<void | Responses.Messages>;
    /** Batches multiple POST requests together if you’re sending multiple messages at the same time. */
    multiNoun: (data: Requests.MultiNoun) => Promise<Responses.None>;
    /** Retrieves all settings information about the Live Agent deployment that’s associated with your chat session. The Settings request is required as the first request to establish a chat visitor’s session. */
    settings: (data: Requests.Settings) => Promise<Responses.Settings>;
    /** Generates a unique ID to track a chat visitor when they initiate a chat request and tracks the visitor’s activities as the visitor navigates from one Web page to another. */
    visitorId: () => Promise<Responses.VisitorId>;
    private makeRequest;
    private makeSessionRequest;
}
//# sourceMappingURL=api.d.ts.map