export default interface IModule {
	context:HTMLElement;
	attributes:any
	moduleWillMount():void;
    moduleWillUnmount():void;
}

export interface IModulePromise {
	resolve:Function|null,
	reject:Function|null
}
