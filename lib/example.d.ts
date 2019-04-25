declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BUTTON_ID: string;
            DEPLOYMENT_ID: string;
            HOST: string;
            ORGANIZATION_ID: string;
            VERSION: '42';
        }
    }
}
export {};
//# sourceMappingURL=example.d.ts.map