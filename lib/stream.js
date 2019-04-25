"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const api_1 = require("./api");
const takeWhileInclusive = (predicate) => {
    return (source) => source.pipe(operators_1.multicast(() => new rxjs_1.ReplaySubject(1), (shared) => shared.pipe(operators_1.takeWhile(predicate), operators_1.concat(shared.pipe(operators_1.take(1), operators_1.filter((t) => !predicate(t)))))));
};
const messages = (api) => rxjs_1.defer(() => rxjs_1.from(api.messages()).pipe(operators_1.switchMap((response) => response ? response.messages : []), operators_1.tap((message) => !api.visitor.id && message.type === 'ChatRequestSuccess' ? api.visitor.id = message.message.visitorId : undefined), operators_1.catchError((error) => rxjs_1.of(error)), operators_1.filter((message) => !(message instanceof Error))))
    .pipe(operators_1.repeat());
exports.startSession = (config, visitorDetails) => {
    const internal = new rxjs_1.Subject();
    const promiseApi = new api_1.Api(config);
    const api = {};
    Object.keys(promiseApi).forEach((key) => {
        const whitelist = [
            'availability',
            'breadcrumb',
            'chasitorInit',
            'resyncSession',
            'chasitorResyncState',
            'chasitorNotTyping',
            'chasitorSneakPeek',
            'chasitorTyping',
            'chatEnd',
            'chatMessage',
            'customEvent',
            'multiNoun',
            'settings',
            'visitorId',
        ];
        if (whitelist.includes(key) === false) {
            api[key] = promiseApi[key];
            return;
        }
        api[key] = async (...args) => {
            try {
                const result = await promiseApi[key](...args);
                internal.next(result);
                return result;
            }
            catch (error) {
                internal.next(error);
            }
        };
    });
    const all$ = rxjs_1.merge(internal, rxjs_1.of(api).pipe(operators_1.exhaustMap(() => rxjs_1.from(api.sessionId())), operators_1.exhaustMap(() => rxjs_1.from(api.chasitorInit(visitorDetails))), operators_1.exhaustMap(() => messages(api)), operators_1.catchError((error) => rxjs_1.of(error)))).pipe(takeWhileInclusive((event) => event instanceof Error || (event.type !== 'ChatEnd' && event.type !== 'ChatEnded')), operators_1.share());
    const availability$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'Availability'));
    const agentDisconnect$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'AgentDisconnect'));
    const agentTyping$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'AgentTyping'));
    const agentNotTyping$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'AgentNotTyping'));
    const chasitorSessionData$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'ChasitorSessionData'));
    const chatEnded$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'ChatEnded'));
    const chatEnd$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'ChatEnd'));
    const chatEstablished$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'ChatEstablished'));
    const chatMessage$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'ChatMessage'));
    const chasitorChatMessage$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'ChasitorChatMessage'));
    const chatRequestFail$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'ChatRequestFail'));
    const chatRequestSuccess$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'ChatRequestSuccess'));
    const chatTransferred$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'ChatTransferred'));
    const customEvent$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'CustomEvent'));
    const newVisitorBreadcrumb$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'NewVisitorBreadcrumb'));
    const queueUpdate$ = all$.pipe(operators_1.filter((event) => !(event instanceof Error) && event.type === 'QueueUpdate'));
    const error$ = all$.pipe(operators_1.filter((event) => event instanceof Error));
    return {
        api,
        all$,
        availability$,
        agentDisconnect$,
        agentTyping$,
        agentNotTyping$,
        chasitorSessionData$,
        chatEnded$,
        chatEnd$,
        chatEstablished$,
        chatMessage$,
        chasitorChatMessage$,
        chatRequestFail$,
        chatRequestSuccess$,
        chatTransferred$,
        customEvent$,
        newVisitorBreadcrumb$,
        queueUpdate$,
        error$,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFrRjtBQUNsRiw4Q0FBbUk7QUFFbkksK0JBQTZDO0FBVTdDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBSSxTQUF1QixFQUFZLEVBQUU7SUFDbEUsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDNUIscUJBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FDYixJQUFJLG9CQUFhLENBQUksQ0FBQyxDQUFDLEVBQ3ZCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNyQixxQkFBUyxDQUFDLFNBQVMsQ0FBQyxFQUNwQixrQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2hCLGdCQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1Asa0JBQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDN0IsQ0FBQyxDQUNILENBQ0YsQ0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLFlBQUssQ0FBQyxHQUFHLEVBQUUsQ0FDeEMsV0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDdkIscUJBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDMUQsZUFBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMs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