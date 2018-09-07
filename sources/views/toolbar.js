import {JetView} from "webix-jet";
import NotificationView from "views/notifications";

export default class ToolView extends JetView {
	config(){
		return {
			view:"toolbar",
			height:60,
			elements:[
				{
					paddingY:7,
					rows:[
						{
							view:"icon", icon:"menu",
							click:() => this.app.callEvent("menu:toggle")
						}
					]
				},
				{ css:"logo" },
				{},
				{
					paddingY:7,
					rows:[
						{
							cols:[
								{
									view:"icon", icon:"bell",
									localId:"bell", badge:2,
									tooltip:"Open latest notifications",
									click:function(){
										this.$scope.notifications.showPopup(this.$view);
									}
								},
								{
									view:"icon", icon:"settings",
									tooltip:"Go to settings",
									click:() => this.show("/top/settings")
								}
							]
						}
					]
				}
			]
		};
	}
	init(){
		this.notifications = this.ui(NotificationView);

		this.on(this.app,"read:notifications",() => {
			this.$$("bell").config.badge = 0;
			this.$$("bell").refresh();

			setTimeout(() => {
				this.$$("bell").config.badge += 1;
				this.$$("bell").refresh();
				this.app.callEvent("new:notification");
			},10000);
		});
	}
}
