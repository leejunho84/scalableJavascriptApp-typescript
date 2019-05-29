// Type definitions for google recaptcha v3
// Project: google recaptcha
// Definitions: https://www.google.com/recaptcha/api.js

declare namespace grecaptcha {
    type Ready = (callbackFunc:()=>void) => void;
    type Execute = (reCaptchaKey:string, option?:recaptchaOption) => Promise<string>;
    interface recaptchaOption {
        action?:string;
    }

    const ready:Ready;
    const execute:Execute;
}