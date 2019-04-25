import { Observable } from 'rxjs';
import { Api, LiveagentConfig } from './api';
import { Messages, Requests } from './types';
export declare type Wrapper<T1, T2> = {
    [P in (keyof T1 & keyof T2)]: T2[P];
};
export interface Session {
    api: Api;
    /**
     *  Stream of all messages received by the chat session
     */
    all$: Observable<Messages.Availability | Messages.AgentDisconnect | Messages.AgentTyping | Messages.AgentNotTyping | Messages.ChasitorSessionData | Messages.ChatEnded | Messages.ChatEnd | Messages.ChatEstablished | Messages.ChatMessage | Messages.ChasitorChatMessage | Messages.ChatRequestFail | Messages.ChatRequestSuccess | Messages.ChatTransferred | Messages.CustomEvent | Messages.NewVisitorBreadcrumb | Messages.QueueUpdate | Error>;
    /**
     * The results of an availbity request with details about whether an agent is online for a button id.
     */
    availability$: Observable<Messages.Availability>;
    /**
     * Indicates that the agent has been disconnected from the chat.
     *
     * Though the agent has been disconnected from the chat, the chat session
     * is still active on the server. A new agent may accept the chat request
     * and continue the chat.
     */
    agentDisconnect$: Observable<Messages.AgentDisconnect>;
    /**
     * Indicates that the agent is typing a message to the chat visitor.
     */
    agentTyping$: Observable<Messages.AgentTyping>;
    /**
     * Indicates that the agent is not typing a message to the chat visitor.
     */
    agentNotTyping$: Observable<Messages.AgentNotTyping>;
    /**
     * Returns the current chat session data for the chat visitor. This request is used to
     * restore the session data for a chat visitor’s chat session after a ResyncSession
     * request is sent.
     *
     * The ChasitorSessionData request is the first message sent after a ResyncSession request is delivered.
     *
     * Note
     * No messages should be sent after a 503 status code is encountered until this message is processed.
     */
    chasitorSessionData$: Observable<Messages.ChasitorSessionData>;
    /**
     * Indicates that an agent has ended the chat.
     */
    chatEnded$: Observable<Messages.ChatEnded>;
    /**
     * Indicates that the user has ended the chat.
     */
    chatEnd$: Observable<Messages.ChatEnd>;
    /**
     * Indicates that an agent has accepted a chat request and is engaged in a chat with a visitor.
     */
    chatEstablished$: Observable<Messages.ChatEstablished>;
    /**
     * Indicates a new chat message has been sent from an agent to a chat visitor.
     */
    chatMessage$: Observable<Messages.ChatMessage>;
    /**
     * Indicates a new chat message has been sent from a chat visitor to an agent.
     */
    chasitorChatMessage$: Observable<Messages.ChasitorChatMessage>;
    /**
     * Indicates that the chat request was not successful.
     */
    chatRequestFail$: Observable<Messages.ChatRequestFail>;
    /**
     * Indicates that the chat request was successful and routed to available agents.
     *
     * Note
     * The ChatRequestSuccess response only indicates that a request has been routed to
     * available agents. The chat hasn’t been accepted until the ChatEstablished response
     * is received.
     */
    chatRequestSuccess$: Observable<Messages.ChatRequestSuccess>;
    /**
     * Indicates the chat was transferred from one agent to another.
     */
    chatTransferred$: Observable<Messages.ChatTransferred>;
    /**
     * Indicates a custom event was sent from an agent to a chat visitor during a chat.
     */
    customEvent$: Observable<Messages.CustomEvent>;
    /**
     * Indicates the URL of the Web page the chat visitor is currently viewing.
     */
    newVisitorBreadcrumb$: Observable<Messages.NewVisitorBreadcrumb>;
    /**
     * Indicates the new position of the chat visitor in the chat queue when the visitor’s position in the queue changes.
     */
    queueUpdate$: Observable<Messages.QueueUpdate>;
    /**
     * Indicates an unknown error ocurred in the chat stream.
     */
    error$: Observable<Error>;
}
export declare const startSession: (config: LiveagentConfig, visitorDetails: Requests.ChasitorInit) => Session;
//# sourceMappingURL=stream.d.ts.map