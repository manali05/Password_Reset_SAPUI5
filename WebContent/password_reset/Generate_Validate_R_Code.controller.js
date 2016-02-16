sap.ui.controller("password_reset.Generate_Validate_R_Code", {
	
	PREVIOUSPAGE : function(OEvent)
	{
		app.to("idPassword_reset1");
	},
	

	VALCODE : function(OEvent)
	{
			//var success= true ;
			var valcode =(OEvent.getSource()).getId('VCODE');
			
			var rcode = this.getView().byId('rcode').getValue();
			//alert(Rcode);
			if(rcode=="")
				{
				//	success = false ;
					alert("Please enter random code");
				}
			//var Username = this.getView().byId('username').getValue();
			//var Systemid = this.getView().byId('SystemId').getValue();
			//var Clientno = this.getView().byId('Clientno').getValue();
			var unlock=this.getView().byId('cb_unlock').getSelected();
			var pwdreset=this.getView().byId('cb_pwdreset').getSelected();
			//chkbox.selected = "true ";
			var chkbox;
			if(unlock==true)
				{
					chkbox="CB_UNLOCK";
				}
			else if(pwdreset==true)
				{
					chkbox="CB_PWDRESET";
				}
			else
				{
					chkbox="";
				//	success = false ;
					alert("Select atleast one checkbox.");
				}
			/*alert(chkbox);*/
			
			/*Can't use set Property method since we are using filters */
			
			/*	oModel.setProperty("/z_es_pwd_reset_rcode/Rcode",Username);
				oModel.setProperty("/z_es_pwd_reset_/Systemid",Systemid);
			  oModel.setProperty("/z_es_pwd_reset_screen1/Clientno",Clientno);
			*/
			
			
			oModel.read("/z_es_pwd_reset_rcode?$filter=Rcode eq '"+ rcode +"' and Chkbox eq '"+ chkbox +"' and Username eq '"+ Username +"' and Systemid eq '"+ Systemid +"' and Clientno eq '"+ Clientno +"'", null, null,true,fsuccess,ffailure);
				function fsuccess(event)
			{
					//checking user's state 
					oModel.read("/z_es_pwd_reset_user_state", null, null, true, fsuccess, ffailure);
					function fsuccess(event)
					{
						var modelresult = oModel(event.results);
						var user_state = modelresult.getProperty("/0/Userstate");
						
								if(chkbox == "CB_UNLOCK")
								{
									// if user account is already active
										if(user_state== 0)
										{
											alert("User account is already active. No action taken.");
										}
										else if(user_state==1)
										{
										//if user account has been unlocked
											alert("User account is activated successfully..");
										}
										else if (user_state==2)
										{
										//if account is locked by the local or global administrator 
											alert("User account cannot be unlocked. Kindly contact your system administrator.");
										}
										else
										{
										//User state undefined in any situation
											alert("Error occurred while activating the account");
										}
								}
						
						
								else if(chkbox == "CB_PWDRESET")
								{
										if(user_state== 0)
										{
											alert("Password changed successfully.");
										}
										else if(user_state==1)
										{
											alert("Password changed successfully.");
										}
										else if (user_state==2)
										{
											alert("Password cannot be changed because it is locked by system administrator");
										}
										else
										{
											alert("Error occurred while changing the password");
										}
								}
					
						//checkbox value if-elseif finished
						}
					//first fsuccess finished of user_state
						function ffailure(event)
						{
							alert("User state not known..");
						}
			}
			//second fsuccess finished of rcode..	
		
			function ffailure(event)
			{
				 // alert("Please enter correct Random code");
					if(chkbox == "CB_UNLOCK")
					{
						alert("User account has not been unlocked . ");
					}
					else if(chkbox == "CB_PWDRESET")
					{
						alert("Unable to reset your password");
					}
			}
		
	} ,
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf password_reset.Generate_Validate_R_Code
*/
	onInit: function(OEvent) {
		this.getView().addEventDelegate({
			onBeforeShow : jQuery.proxy(function(evt){
				this.onBeforeShow(evt);
			},this)}); 
	},
	
	onBeforeShow:function(evt){

		var unlock =  evt.data.data1;
		var pwdreset = evt.data.data2;
		var Username = evt.data.data3;
		var Systemid= evt.data.data4;
		var Clientno= evt.data.data5;
		var chkbox=evt.data.data6;
		//alert(chkbox);
		this.getView().byId("username").setValue(Username);
		this.getView().byId("Clientno").setValue(Clientno);
		this.getView().byId("SystemId").setValue(Systemid);
		this.getView().byId("cb_unlock").setSelected(unlock);
		this.getView().byId("cb_pwdreset").setSelected(pwdreset);
		//this.getView().byId("chkbx").setText(chkbox);

	}, 
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf password_reset.Generate_Validate_R_Code
*/
//	onBeforeRendering: function() {
//		
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf password_reset.Generate_Validate_R_Code
*/
	onAfterRendering: function(OEvent) {
		//	alert("Reset Code sent to the User's email ID. Once received, enter it in the Code field without quitting the session. ");
			
//			oModel.read("/z_es_pwd_reset_screen1", null, null,true,fSuccess);
//			
//			function fSuccess(event)
//			{
//				
//				sap.ui.getCore().setModel(oModel);
//				//alert("Hello..");
//				var status = oModel(event.results);
//				//console(status);
//				var uname = status.getProperty("/0/Username");
//				//alert(event.activate);
//				var txt1 = sap.ui.getCore().getControl("txt1");
//				txt1.setValue(uname);
//				//alert(activate);
//				var sysid =status.getProperty("/0/Systemid");
//				var txt3 = sap.ui.getCore().getControl("txt3");
//				txt3.setValue(sysid);
//				
//				var clientno = status.getProperty("/0/Clientno");
//				var txt4 = sap.ui.getCore().getControl("txt4");
//				txt4.setValue(clientno);
//			}
		
		
	
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf password_reset.Generate_Validate_R_Code
*/
//	onExit: function() {
//	alert("Reset");
//	}

});