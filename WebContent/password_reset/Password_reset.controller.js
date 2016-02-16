sap.ui.controller("password_reset.Password_reset", {

	GENCODE : function (oEvent) {
	   
		//to get Id of button pressed 
		var gencode =(oEvent.getSource()).getId();
	  
		//to fetch values from Ui to controller
		var unlock=this.getView().byId('cb_unlock').getSelected();
		var pwdreset=this.getView().byId('cb_pwdreset').getSelected();
		var success = true ;
		var Username;
		var chkbox;
		var count_systemid;
		var count_clientno;
		var Systemid;
		var Clientno;
		
		
		// validations for all requires fields
		if((this.getView().byId('SystemId').getValue()=="")||(this.getView().byId('Clientno').getValue()=="")||(this.getView().byId('username').getValue()==""))
		{
			alert("Please enter all the required fields. ");
			success = false;
			
		}
		else
		{
			 Username = this.getView().byId('username').getValue();
			 Systemid = this.getView().byId('SystemId').getValue();
			 Clientno = this.getView().byId('Clientno').getValue();
			 count_systemid =Systemid.length ;
			 count_clientno =Clientno.length ;
			 if(count_systemid!=3 || count_clientno!=3)
			{
				alert("Systemid and Clientno should be 3 characters long");
				success = false ;
				
			}
		}
		
	// to check which option is selected
		if((unlock==true)&&(pwdreset==true))
		{
			alert("Select any one option");
			success = false ;
		}
		else
		{
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
					success = false ;
					alert("Select atleast one checkbox");
					app.to("idPassword_reset1");
				}
		 }
		
		Username = this.getView().byId('username').getValue();
		Systemid = this.getView().byId('SystemId').getValue();
  		Clientno = this.getView().byId('Clientno').getValue();
  	
		//oModel.setProperty("/z_es_pwd_reset_screen1/Username",Username);
		//oModel.setProperty("/z_es_pwd_reset_screen1/Systemid",Systemid);
		//oModel.setProperty("/z_es_pwd_reset_screen1/Clientno",Clientno);
		
  		oModel.read("/z_es_pwd_reset_screen1?$filter=Username eq '"+Username+"' and Systemid eq '"+Systemid+"' and Clientno eq '"+Clientno+"'", null, null,true,fsuccess);
  			function fsuccess(event)
  			{
  			//	success = true ;
  				alert("Random Code is generated and sent to your email .");
  			}
  			//function ffailure(event)
  			//{
  			//	success = false ;
  			//	alert("Random Code not generated successfully");
  				
  		//	}
		
		
		//sap.ui.getCore().setModel(oModel);

       //Fetching Values to send to next page of application		
				if(success == true)
	  		{
	  			//Odata call here..................
	  		//	oModel.read("/z_es_pwd_reset_screen1?$filter=Username eq '"+Username+"' and Systemid eq '"+Systemid+"' and Clientno eq '"+Clientno+"'", null, null,true,fsuccess,ffailure);
	  		//	function fsuccess(event)
	  		//	{
	  		//		alert("Random Code is generated and sent to email id.");
	  		//	}
	  		//	function ffailure(event)
	  		//	{
	  		//		alert("Random Code not generated successfully");
	  		//	}
	  			sap.ui.getCore().byId("app").to("generate_validate_rcode",{data1:unlock , data2:pwdreset , data3:Username , data4:Systemid, data5:Clientno ,data6:chkbox});
			
	  		}
	
	},


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf password_reset.Password_reset
*/
	onInit: function() {
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf password_reset.Password_reset
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf password_reset.Password_reset
*/
	onAfterRendering: function() {
		
		//app.to("generate_validate_rcode");
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf password_reset.Password_reset
*/
	onExit: function() {
	//	app.to("generate_validate_rcode");
	}

});