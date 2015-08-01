
//		var todaystimeFajr;
		var todaysminuteFajr;
		var todaysminuteImsaac;
//		todaysTimeFajr = new Date(); 
		
<!--*****Step 1****  Change the day to today -->
//		var theDay = "Monday";
<!--*****End of Step 1************************-->

<!--*****Step 2**** Change the DATE to todays and enter the FAJR time for Toronto in the following format "July 29, 2001 3:56:00" -->		
//		todaysTimeFajr = new Date("July 29, 2001 3:58:00") ;
<!--*****End of Step 2************************-->
		todaysHourImsaac = todaysTimeImsaac.getHours(); 
		todaysMinuteImsaac = todaysTimeImsaac.getMinutes(); 

		todaysHourFajr = todaysTimeFajr.getHours(); 
		todaysMinuteFajr = todaysTimeFajr.getMinutes(); 
		todaysdate = todaysTimeFajr.getDate();
	    todaysmonth = todaysTimeFajr.getMonth()+1;
		todaysyear = todaysTimeFajr.getYear();		
		todaysfulldate = todaysdate + "-" + todaysmonth + "-" + todaysyear;
//		var todaystimeRise;
		var todaysminuteRise;
//		todaysTimeRise = new Date(); 

<!--*****Step 3**** Change the SUNRISE time for Toronto in the following format "5:30:00" -->		
//		todaysTimeRise = new Date("March 5, 2004 5:30:00") ;
<!--*****End of Step 3************************-->	
	
		todaysHourRise = todaysTimeRise.getHours(); 
		todaysMinuteRise = todaysTimeRise.getMinutes(); 
//		var todaystimeZuhr;
		var todaysminuteZuhr;
//		todaysTimeZuhr = new Date(); 
		
<!--*****Step 4**** Change the ZUHR time for Toronto in the following format "1:18:00" -->		
//		todaysTimeZuhr = new Date("March 1, 2004 1:18:00") ;
<!--*****End of Step 4************************-->				

		todaysHourZuhr = todaysTimeZuhr.getHours(); 
		todaysMinuteZuhr = todaysTimeZuhr.getMinutes(); 
//		var todaystimeSet;
		var todaysminuteSet;
//		todaysTimeSet = new Date(); 

<!--*****Step 5**** Change the SUNSET time for Toronto in the following format "8:58:00" -->		
//		todaysTimeSet = new Date("March 1, 2004 8:58:00") ;
<!--*****End of Step 5************************-->

		todaysHourSet = todaysTimeSet.getHours(); 
		todaysMinuteSet = todaysTimeSet.getMinutes(); 
//		var todaystimeMaghrib;
		var todaysminuteMaghrib;
//		todaysTimeMaghrib = new Date(); 

<!--*****Step 6**** Change the MAGHRIB time for Toronto in the following format "9:11:00" -->		
//		todaysTimeMaghrib = new Date("March 1, 2004 9:11:00") ;
<!--*****End of Step 6************************-->

		todaysHourMaghrib = todaysTimeMaghrib.getHours(); 
		todaysMinuteMaghrib = todaysTimeMaghrib.getMinutes(); 

		
		function mytime(marea,sala)	
		{
			var tminutes;
			var thours;
			var timeadd;
			var timeaddhours; 
			timeaddhours = 0;
			MonAdd = -16;
			OttAdd = -15;
			ToAdd = 0;
			HamAdd = 2;
			VanAdd = 7;
			if (marea == '1')
				{
				 timeadd=MonAdd;
				}
			else if (marea == '2')
				{
				 timeadd=OttAdd;
				}
			else if (marea == '3')
				{
				 timeadd=ToAdd;
				}
			else if (marea == '4')
				{
				 timeadd=HamAdd;
				}
			else if (marea == '5')
				{
				 timeadd=VanAdd;
				}				
	     	if (sala == '1')
			{
			tminutes = todaysMinuteFajr;
			thours = todaysHourFajr;
			}
			else if (sala =='2')
			{
			tminutes = todaysMinuteRise;
			thours = todaysHourRise;
			}
			else if (sala =='3')
			{
			tminutes = todaysMinuteZuhr;
			thours = todaysHourZuhr;
			}
			else if (sala =='4')
			{
			tminutes = todaysMinuteSet;
			thours = todaysHourSet;
			}
			else if (sala =='5')
			{
			tminutes = todaysMinuteMaghrib;
			thours = todaysHourMaghrib;
			}
			else if (sala =='6')
			{
			tminutes = todaysMinuteImsaac;
			thours = todaysHourImsaac;
			}
			
			if ((tminutes + timeadd) < 0)
			{
				temp = tminutes + timeadd;
				tminutes = 60 + temp;
				timeaddhours -= 1;
			}

     		else
			{
				if ((tminutes + timeadd) < 60)
				{
					tminutes += timeadd;
				}
				if ((tminutes + timeadd) > 60)
				{
					tminutes += timeadd;
					tminutes -= 60;
					timeaddhours += 1;
				}
			}
			if ((thours + timeaddhours) < 12)
			{				
			thours += timeaddhours;
			}
			else 
			{
				thours += timeaddhours;
				thours -=12;
			}	
			
			if (tminutes < 10)
			{ var temp;

				temp = tminutes;
				tminutes = "0" + temp;
			}
			if (thours == 0)
			{ 
				thours = 12;
				
			}
			//document.write (thours + ":" + tminutes);
			return thours + ":" + tminutes;
		}