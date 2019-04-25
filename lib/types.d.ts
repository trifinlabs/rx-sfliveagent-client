import * as Axios from 'axios';
export { Axios };
export declare type Path = string;
export declare type SessionId = string;
export declare type SessionKey = string;
export declare type SequenceId = string;
export declare type ApiVersion = string;
export declare type AffinityToken = string;
export declare enum Header {
    X_LIVEAGENT_API_VERSION = "X-LIVEAGENT-API-VERSION",
    X_LIVEAGENT_AFFINITY = "X-LIVEAGENT-AFFINITY",
    X_LIVEAGENT_SESSION_KEY = "X-LIVEAGENT-SESSION-KEY",
    X_LIVEAGENT_SEQUENCE = "X-LIVEAGENT-SEQUENCE"
}
export declare namespace DataTypes {
    interface Button {
        id: string;
        type: 'Standard' | 'Invite' | 'ToAgent';
        endpointUrl?: string;
        prechatUrl?: string;
        langauge?: string;
        isAvailable: boolean;
        inviteImageUrl?: string;
        inviteImageWidth?: number;
        inviteImageHeight?: number;
        inviteRenderer?: 'Slide' | 'Fade' | 'Appear' | 'Custom';
        inviteStartPosition?: 'TopLeft' | 'TopLeftTop' | 'Top' | 'TopRightTop' | 'TopRight' | 'TopRightRight' | 'Right' | 'BottomRightRight' | 'BottomRight' | 'BottomRightBottom' | 'Bottom' | 'BottomLeftBottom' | 'BottomLeft' | 'BottomLeftLeft' | 'Left' | 'TopLeftLeft';
        inviteEndPosition?: 'TopLeft' | 'Top' | 'TopRight' | 'Left' | 'Center' | 'Right' | 'BottomLeft' | 'Bottom' | 'BottomRight';
        hasInviteAfterAccept?: boolean;
        hasInviteAfterReject?: boolean;
        inviteRejectTime?: number;
        inviteRules?: any;
    }
    interface CustomDetail {
        label: string;
        value: string;
        transcriptFields: string[];
        displayToAgent?: boolean;
    }
    interface Entity {
        entityName: string;
        showOnCreate?: boolean;
        entityFieldsMap: EntityFieldMaps[];
        linkToEntityName?: string;
        linkToEntityField?: string;
        saveToTranscript?: string;
    }
    interface EntityFieldMaps {
        fieldName: string;
        label: string;
        doFind: boolean;
        isExactMatch: boolean;
        doCreate: boolean;
    }
    interface GeoLocation {
        countryCode: string;
        countryName: string;
        region?: string;
        city?: string;
        organization?: string;
        latitude?: number;
        longitude?: number;
    }
    interface NounWrapper {
        prefix: string;
        noun: string;
        data?: string;
    }
    interface Result {
        id: string;
        isAvailable: boolean;
    }
    interface TranscriptEntry {
        type: 'Agent' | 'Chasitor' | 'OperatorTransferred';
        name: string;
        content: string;
        timestamp: number;
        sequence: number;
    }
}
export declare namespace Requests {
    interface Availability {
        Availability?: {
            ids: string[];
        };
    }
    interface Breadcrumb {
        location: string;
    }
    interface ChasitorInit {
        organizationId?: string;
        deploymentId?: string;
        buttonId?: string;
        sessionId?: string;
        userAgent?: string;
        buttonOverrides?: string[];
        screenResolution: string;
        language: string;
        visitorName: string;
        prechatDetails: DataTypes.CustomDetail[];
        prechatEntities: DataTypes.Entity[];
        receiveQueueUpdates: boolean;
        isPost: boolean;
    }
    interface ResyncSession {
        sessionId: SessionId;
    }
    interface ChasitorResyncState {
        organizationId: string;
    }
    interface ChasitorSneakPeak {
        position: number;
        test: string;
    }
    interface ChatEnded {
        reason: string;
    }
    interface ChatEnd {
        reason: string;
    }
    interface ChatMessage {
        text: string;
    }
    interface CustomEvent {
        type: string;
        data: string;
    }
    interface MultiNoun {
        nouns: DataTypes.NounWrapper[];
    }
    interface Settings {
        Settings: {
            buttonIds: string[];
            updateBreadcrumb: boolean;
        };
    }
    interface VisitorId {
    }
    type Any = Availability | Breadcrumb | ChasitorInit | ResyncSession | ChasitorResyncState | ChasitorSneakPeak | ChatEnded | ChatMessage | CustomEvent | MultiNoun | Settings | VisitorId;
    interface Adapter {
        availability: (data: Requests.Availability) => Promise<Responses.Availability>;
        breadcrumb: () => Promise<Responses.None>;
        sessionId: () => Promise<Responses.SessionId>;
        chasitorInit: () => Promise<Responses.None>;
        resyncSession: (data: Requests.ResyncSession) => Promise<Responses.ResyncSession>;
        chasitorResyncState: () => Promise<Responses.None>;
        chasitorSneakPeek: () => Promise<Responses.None>;
        chasitorTyping: () => Promise<Responses.None>;
        chatEnd: (data: Requests.ChatEnded) => Promise<Responses.ChatEnded>;
        chatMessage: (data: Requests.ChatMessage) => Promise<Responses.ChatMessage>;
        customEvent: (data: Requests.CustomEvent) => Promise<Responses.CustomEvent>;
        messages: () => Promise<Responses.Messages>;
        multiNoun: () => Promise<Responses.None>;
        settings: (data: Requests.Settings) => Promise<Responses.Settings>;
        visitorId: (data: Requests.VisitorId) => Promise<Responses.VisitorId>;
    }
}
export declare namespace Responses {
    interface None {
    }
    interface Availability {
        results: DataTypes.Result[];
    }
    interface AgentDisconnect {
    }
    interface AgentTyping {
    }
    interface AgentNotTyping {
    }
    interface ChasitorSessionData {
        queuePosition: number;
        geoLocation: DataTypes.GeoLocation;
        url: string;
        oref: string;
        postChatUrl: string;
        sneakPeakEnabled: boolean;
        chatMessages: DataTypes.TranscriptEntry[];
    }
    interface ChasitorIdleTimeoutWarningEvent {
        idleTimeoutWarningEvent: string;
    }
    interface ChatEstablished {
        name: string;
        userId: string;
        sneakPeakEnabled: boolean;
        chasitorIdleTimeout: number;
    }
    interface ChatEnded {
        attachedRecords: string[];
        reason: 'agent' | 'client';
    }
    interface ChatEnd {
    }
    interface ChatMessage {
        name: string;
        text: string;
        agentId: string;
    }
    interface ChatRequestFail {
        reason: string;
        postChatUrl: string;
    }
    interface ChatRequestSuccess {
        queuePosition: number;
        geoLocation: DataTypes.GeoLocation;
        url: string;
        oref: string;
        postChatUrl: string;
        customDetails: DataTypes.CustomDetail[];
        visitorId: string;
    }
    interface ChatTransferred {
        name: string;
        userId: string;
        sneakPeekEnabled: boolean;
        chasitorIdleTimeout: number;
    }
    interface CustomEvent {
        type: string;
        data: string;
    }
    interface Messages {
        messages: Messages.All[];
        sequence: number;
    }
    interface NewVisitorBreadcrumb {
        location: string;
    }
    interface QueueUpdate {
        position: number;
    }
    interface ResyncSession {
        isValid: boolean;
        key: SessionKey;
        affinityToken: AffinityToken;
    }
    interface SessionId {
        id: SessionId;
        key: SessionKey;
        affinityToken: AffinityToken;
        clientPollTimeout: number;
    }
    interface Settings {
        pingrate: number;
        contentServerUrl: string;
        button: DataTypes.Button[];
    }
    interface SwitchServer {
        newUrl: string;
    }
    interface VisitorId {
        sessionId: string;
    }
    type Any = None | Availability | AgentDisconnect | AgentTyping | AgentNotTyping | ChasitorSessionData | ChasitorIdleTimeoutWarningEvent | ChatEstablished | ChatEnded | ChatMessage | ChatRequestFail | ChatRequestSuccess | ChatTransferred | CustomEvent | Messages | NewVisitorBreadcrumb | QueueUpdate | ResyncSession | SessionId | Settings | SwitchServer;
}
export declare namespace Messages {
    /**
     * The results of an availbity request with details about whether an agent is online for a button id.
     */
    type Availability = Message<typeof AVAILABILITY, Responses.Availability>;
    const AVAILABILITY = "Availability";
    /**
     * Indicates that the agent has been disconnected from the chat.
     *
     * Though the agent has been disconnected from the chat, the chat session
     * is still active on the server. A new agent may accept the chat request
     * and continue the chat.
     */
    type AgentDisconnect = Message<typeof AGENT_DISCONNECT, Responses.AgentDisconnect>;
    const AGENT_DISCONNECT = "AgentDisconnect";
    /**
     * Indicates that the agent is typing a message to the chat visitor.
     */
    type AgentTyping = Message<typeof AGENT_TYPING, Responses.AgentTyping>;
    const AGENT_TYPING = "AgentTyping";
    /**
     * Indicates that the agent is not typing a message to the chat visitor.
     */
    type AgentNotTyping = Message<typeof AGENT_NOT_TYPING, Responses.AgentNotTyping>;
    const AGENT_NOT_TYPING = "AgentNotTyping";
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
    type ChasitorSessionData = Message<typeof CHASITOR_SESSION_DATA, Responses.ChasitorSessionData>;
    const CHASITOR_SESSION_DATA = "ChasitorSessionData";
    /**
     * Indicates that an agent has ended the chat.
     */
    type ChatEnded = Message<typeof CHAT_ENDED, Responses.ChatEnded>;
    const CHAT_ENDED = "ChatEnded";
    /**
     * Indicates that the user has ended the chat.
     */
    type ChatEnd = Message<typeof CHAT_END, Responses.ChatEnd>;
    const CHAT_END = "ChatEnd";
    /**
     * Indicates that an agent has accepted a chat request and is engaged in a chat with a visitor.
     */
    type ChatEstablished = Message<typeof CHAT_ESTABLISHED, Responses.ChatEstablished>;
    const CHAT_ESTABLISHED = "ChatEstablished";
    /**
     * Indicates a new chat message has been sent from an agent to a chat visitor.
     */
    type ChatMessage = Message<typeof CHAT_MESSAGE, Responses.ChatMessage>;
    const CHAT_MESSAGE = "ChatMessage";
    /**
     * Indicates a new chat message has been sent from a chat visitor to an agent.
     */
    type ChasitorChatMessage = Message<typeof CHASITOR_CHAT_MESSAGE, Responses.ChatMessage>;
    const CHASITOR_CHAT_MESSAGE = "ChasitorChatMessage";
    /**
     * Indicates that the chat request was not successful.
     */
    type ChatRequestFail = Message<typeof CHAT_REQUEST_FAIL, Responses.ChatRequestFail>;
    const CHAT_REQUEST_FAIL = "ChatRequestFail";
    /**
     * Indicates that the chat request was successful and routed to available agents.
     *
     * Note
     * The ChatRequestSuccess response only indicates that a request has been routed to
     * available agents. The chat hasn’t been accepted until the ChatEstablished response
     * is received.
     */
    type ChatRequestSuccess = Message<typeof CHAT_REQUEST_SUCCESS, Responses.ChatRequestSuccess>;
    const CHAT_REQUEST_SUCCESS = "ChatRequestSuccess";
    /**
     * Indicates the chat was transferred from one agent to another.
     */
    type ChatTransferred = Message<typeof CHAT_TRANSFERRED, Responses.ChatTransferred>;
    const CHAT_TRANSFERRED = "ChatTransferred";
    /**
     * Indicates a custom event was sent from an agent to a chat visitor during a chat.
     */
    type CustomEvent = Message<typeof CUSTOM_EVENT, Responses.CustomEvent>;
    const CUSTOM_EVENT = "CustomEvent";
    /**
     * Indicates the URL of the Web page the chat visitor is currently viewing.
     */
    type NewVisitorBreadcrumb = Message<typeof NEW_VISITOR_BREADCRUMB, Responses.NewVisitorBreadcrumb>;
    const NEW_VISITOR_BREADCRUMB = "NewVisitorBreadcrumb";
    /**
     * Indicates the new position of the chat visitor in the chat queue when the visitor’s position in the queue changes.
     */
    type QueueUpdate = Message<typeof QUEUE_UPDATE, Responses.QueueUpdate>;
    const QUEUE_UPDATE = "QueueUpdate";
    interface Message<TType = any, TMessage = any> {
        type: TType;
        message: TMessage;
    }
    type AllTypes = typeof AVAILABILITY | typeof AGENT_DISCONNECT | typeof AGENT_TYPING | typeof AGENT_NOT_TYPING | typeof CHASITOR_SESSION_DATA | typeof CHAT_ENDED | typeof CHAT_END | typeof CHAT_ESTABLISHED | typeof CHAT_MESSAGE | typeof CHASITOR_CHAT_MESSAGE | typeof CHAT_REQUEST_FAIL | typeof CHAT_REQUEST_SUCCESS | typeof CHAT_TRANSFERRED | typeof CUSTOM_EVENT | typeof NEW_VISITOR_BREADCRUMB | typeof QUEUE_UPDATE;
    type All = Availability | AgentDisconnect | AgentTyping | AgentNotTyping | ChasitorSessionData | ChatEnded | ChatEnd | ChatEstablished | ChatMessage | ChasitorChatMessage | ChatRequestFail | ChatRequestSuccess | ChatTransferred | CustomEvent | NewVisitorBreadcrumb | QueueUpdate;
}
//# sourceMappingURL=types.d.ts.map