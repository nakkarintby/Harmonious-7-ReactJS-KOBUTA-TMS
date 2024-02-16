import { PublicClientApplication , LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    //https://login.microsoftonline.com/baf9db62-787f-4e77-8297-738b7509b47d
    auth: {
        clientId: "60b30165-972f-48af-8c59-4a97f98ca374",
        authority: "https://login.microsoftonline.com/baf9db62-787f-4e77-8297-738b7509b47d",
        redirectUri: "http://localhost:3000/menu",
    },
    cache: {
        /* cacheLocation: "localStorage", */
        storeAuthStateInCookie: true,
    },
    system: {
        loggerOptions: {
            logLevel: LogLevel.Trace,
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {	
                    return;	
                }
                switch (level) {	
                    case LogLevel.Error:	
                        console.error(message);	
                        return;	
                    case LogLevel.Info:	
                        console.info(message);	
                        return;	
                    case LogLevel.Verbose:	
                        console.debug(message);	
                        return;	
                    case LogLevel.Warning:	
                        console.warn(message);	
                        return;	
                    default:
                        console.log(message);
                        return;
                }    
            }
        },windowHashTimeout: 60000,
        iframeHashTimeout: 6000,
        loadFrameTimeout: 0,
        asyncPopups: false,
        
    }
};



/* export const msalConfig = {
    auth: {
        clientId: "60b30165-972f-48af-8c59-4a97f98ca374",
        authority: "https://login.microsoftonline.com/baf9db62-787f-4e77-8297-738b7509b47d",
        redirectUri: "http://localhost:3000",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    },
    system: {
        loggerOptions: {
            logLevel: LogLevel.Trace,
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {	
                    return;	
                }
                switch (level) {	
                    case LogLevel.Error:	
                        console.error(message);	
                        return;	
                    case LogLevel.Info:	
                        console.info(message);	
                        return;	
                    case LogLevel.Verbose:	
                        console.debug(message);	
                        return;	
                    case LogLevel.Warning:	
                        console.warn(message);	
                        return;	
                    default:
                        console.log(message);
                        return;
                }    
            }
        },windowHashTimeout: 60000,
        iframeHashTimeout: 6000,
        loadFrameTimeout: 0,
        asyncPopups: false,
        
    }
}; */
 
