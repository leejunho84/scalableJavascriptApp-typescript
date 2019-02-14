import Module from "./module";

export default class Header extends Module {
	constructor(){
		super('[data-module-header]', 'data-module-header');
	}

	moduleWillMount(...components:any[]):void{
		components.map((component)=>{});

		const $login:JQuery = $(this.context).find('.login');
		const modal = UIkit.modal('#common-modal', {center:true});
		$login.click((e)=>{
			e.preventDefault();
			this.ajax('/login.html', 'GET', {}, (reponseHtml:string)=>{
				this.moduleInitalize(reponseHtml);
				$('#common-modal').find('.contents').html(reponseHtml);
				modal.show();
			});
		});
	};
	moduleWillUnmount():void{};
}