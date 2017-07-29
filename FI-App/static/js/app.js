var app = angular.module('materializeApp', ['ui.materialize' , 'ngStorage',
                                            'ngRoute',
                                            'ui.router','rzModule','angularSpinners','ngTable']);
app.controller('BodyController', ["$scope", function ($scope) {
	$scope.showTabs = true;
	$scope.collapsibleElements = [{
		icon: 'whatshot',
		title: 'Match Report 1  - 20/02/2016',
		content: 'Lorem ipsum dolor sit amet.'
	},{
		icon: 'whatshot',
		title: 'Match Report 1  - 28/02/2016',
		content: 'Lorem ipsum dolor sit amet.'
	},{
		icon: 'whatshot',
		title: 'Match Report 1  - 16/03/2016',
		content: 'Lorem ipsum dolor sit amet.'
	}
	];

}]);
app.controller('TOTALCONTROL', ["$scope","$http", function ($scope,$http) {
	$scope.updateStatsPlayer = function(){
		$scope.addNewPlayer2();
		/*

		$http.get('/playersercice/playerupdate').then( function(response) {
			console.log(response);
			})
		 */}
	$scope.start=1;
	$scope.end=20;
	$scope.path='';
	$scope.addNewPlayer = function(){
		for(i=$scope.start;i<$scope.end;i++){
			var url = $scope.path+'/'+i+'.json';
			$http.get(url).then( function(response) {
				var updatePlayers = response.data.players; 


				fromdataforinsert(updatePlayers,function(response){
					console.log(response);
				})


			});
		}




	};
	$scope.addNewPlayer2 = function(){


		var url = '/data/output.json';
		$http.get(url).then( function(response) {
			var updatePlayers = response.data.constant; 
			for(i=$scope.start;i<$scope.end;i++){

				$http.post('/playersercice/playerattrupdate',updatePlayers[i]).then( function(response) {
					console.log('done');	
				});
			}

		});



	};
	$scope.attplayer = function(){
		$http.get('/data/leaguemax.json').then( function(respons) {
			var updatePlayersmax = respons.data; 
			$http.get('/data/leagueavg.json').then( function(respon) {
				var updatePlayersavg = respon.data; 
				conscal(updatePlayersmax,updatePlayersavg,function(t){
					console.log(t);
					var constant = {
							constant: t
					}
					$http.post('/constant',constant).then( function(respo) {
						var updatePlayersavg = respo.data; 
					});
				})
			});
		});
	};

	var conscal = function(a,b,callback){
		var tp=[];
		for(i=0;i<a.length;i++){
			var p ={};
			var pmax= a[i];
			var pavg = a[i];
			for(key in pmax){
				if(key!='_id'){
					var temp =(2*pmax[key]+pavg[key])/3;
					if(temp != null && temp > 0.001){
						p[key]= 20/temp;
					}else{
						p[key]=0.001;
					}

				}else{
					p[key]=pmax[key];
				}
			};
			tp.push(p);
		};
		callback(tp);
	}

	$scope.attplayer1 = function(){

		for(i=0;i<1;i++){
			var url = '/playersercice/players';
			$http.get(url).then( function(response) {
				var updatePlayers = response.data; 
				console.log('HERE IS THE MAX VALUES ::'+updatePlayers)
				var pl=[];
				updatePlayers.forEach(function(d){
					var a={};
					for(key in d){
						if(key !='_id'){
							if(d[key]!=null && d[key]!=0){
								a[key]=20/d[key];
							}else{
								a[key]=0.001;
							}

						}else{
							a[key]=d[key];
						}

					}
					console.log('HERE IS THE CONSTANTS VALUES ::'+a)
					pl.push(a);
				})
				console.log(pl);
				pl.forEach(function(pat){
					$http.post('/playersercice/playerattrupdate',pat).then( function(response) {
						console.log(response.data);

					})
				})

				/*fromdataforinsert(updatePlayers,function(players){
					console.log(players);

				} );*/



			});
		}

	};
	var fromdataforinsert = function(data,callback){
		var players=[];

		data.forEach(function(d){
			var p =d;
			p['_id']=d.id+'2016';
			p['season']='2016-2017';
			p['player-stage']='PREPROCESSED';
			var player={};
			player._id=d.id;
			player.player_id=d.id;
			player.name  =d.name  ;
			player.current_team_name  =d.current_team_name  ;
			player.positions  =d.positions  ;
			player.age  =d.age  ;
			player.market_value  =d.market_value  ;
			player.total_matches  =d.total_matches  ;
			player.minutes_on_field  =d.minutes_on_field  ;
			player.goals  =d.goals  ;
			player.assists  =d.assists  ;
			player.birth_country_name  =d.birth_country_name  ;
			player.passport_country_codes  =d.passport_country_codes  ;
			player.foot  =d.foot  ;
			player.height  =d.height  ;
			player.weight  =d.weight  ;
			player.on_loan  =d.on_loan  ;
			player.successful_defensive_actions_avg  =d.successful_defensive_actions_avg  ;
			player.defensive_duels_avg  =d.defensive_duels_avg  ;
			player.defensive_duels_won  =d.defensive_duels_won  ;
			player.aerial_duels_avg  =d.aerial_duels_avg  ;
			player.aerial_duels_won  =d.aerial_duels_won  ;
			player.tackle_avg  =d.tackle_avg  ;
			player.successful_tackle_percent  =d.successful_tackle_percent  ;
			player.interceptions_avg  =d.interceptions_avg  ;
			player.fouls_avg  =d.fouls_avg  ;
			player.yellow_cards  =d.yellow_cards  ;
			player.yellow_cards_avg  =d.yellow_cards_avg  ;
			player.red_cards  =d.red_cards  ;
			player.red_cards_avg  =d.red_cards_avg  ;
			player.successful_attacking_actions_avg  =d.successful_attacking_actions_avg  ;
			player.goals_avg  =d.goals_avg  ;
			player.head_goals  =d.head_goals  ;
			player.head_goals_avg  =d.head_goals_avg  ;
			player.shots  =d.shots  ;
			player.shots_avg  =d.shots_avg  ;
			player.shots_on_target_percent  =d.shots_on_target_percent  ;
			player.goal_conversion_percent  =d.goal_conversion_percent  ;
			player.assists_avg  =d.assists_avg  ;
			player.crosses_avg  =d.crosses_avg  ;
			player.accurate_crosses_percent  =d.accurate_crosses_percent  ;
			player.dribbles_avg  =d.dribbles_avg  ;
			player.successful_dribbles_percent  =d.successful_dribbles_percent  ;
			player.touch_in_box_avg  =d.touch_in_box_avg  ;
			player.passes_avg  =d.passes_avg  ;
			player.accurate_passes_percent  =d.accurate_passes_percent  ;
			player.forward_passes_avg  =d.forward_passes_avg  ;
			player.successful_forward_passes_percent  =d.successful_forward_passes_percent  ;
			player.back_passes_avg  =d.back_passes_avg  ;
			player.successful_back_passes_percent  =d.successful_back_passes_percent  ;
			player.vertical_passes_avg  =d.vertical_passes_avg  ;
			player.successful_vertical_passes_percent  =d.successful_vertical_passes_percent  ;
			player.average_pass_length  =d.average_pass_length  ;
			player.smart_passes_avg  =d.smart_passes_avg  ;
			player.accurate_smart_passes_percent  =d.accurate_smart_passes_percent  ;
			player.passes_to_final_third_avg  =d.passes_to_final_third_avg  ;
			player.accurate_passes_to_final_third_percent  =d.accurate_passes_to_final_third_percent  ;
			player.long_passes_avg   =d.long_passes_avg   ;
			player.successful_long_passes_percent  =d.successful_long_passes_percent  ;
			player.through_passes_avg  =d.through_passes_avg  ;
			player.successful_through_passes_percent  =d.successful_through_passes_percent  ;
			player.average_long_pass_length  =d.average_long_pass_length  ;
			player.clean_sheets  =d.clean_sheets  ;
			player.save_percent  =d.save_percent  ;
			player.goalkeeper_exits_avg  =d.goalkeeper_exits_avg  ;
			player.free_kicks_taken_avg  =d.free_kicks_taken_avg  ;
			player.direct_free_kicks_taken_avg  =d.direct_free_kicks_taken_avg  ;
			player.direct_free_kicks_on_target_percent  =d.direct_free_kicks_on_target_percent  ;
			player.corners_taken_avg  =d.corners_taken_avg  ;
			player.penalties_taken  =d.penalties_taken  ;
			player.penalties_conversion_percent  =d.penalties_conversion_percent ;
			$http.post('/playersercice/Addplayers',p).then( function(response) {
				console.log('Done');
			});
			players.push(player);
		})
		callback( players);

	}
}]);

app.controller('MainController', ["$scope","$http","spinnerService", function ($scope,$http,spinnerService) {
	$scope.showhidesidenav = function(){
		
	}
	
	$http.post('/userservice/mydetails').then( function(response) {
		$scope.fullnameuser=response.data.payload[0].fullname;

	});
}]);


app.controller('PLAYERCONTROLER', ["$scope","$http","player", function ($scope,$http,player) {

	$scope.select1={
			value:'Current Season',
			choices:['Current Season','Previous Season']
	}
	$scope.select2={
			value:'Overview',
			choices:['Overview','Passing','Attack','Aerial','Defence','Set Pieces']
	}
	$scope.involvement_subtab='biAttack';
	$scope.involvement_subtabselect = function(value){
		$scope.involvement_subtab=value;
	};
	var behaviourinit = function(adata,pdata,dudata,ddata,sdata,ardata){
		var ctx = document.getElementById("myChart").getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ["Involvement", "Productivity", "Losses","Efficiency"],

				datasets: [
				           {
				        	   label: "Attack",
				        	   backgroundColor: 'rgba(255, 51, 51,0.3)',
				        	   borderColor:'rgba(255, 51, 51,0.8)',
				        	   hoverBorderWidth:[3,3,3,3],
				        	   borderWidth:[1,1,1,1],
				        	   data: adata
				           },
				           {
				        	   label: "Passing",
				        	   backgroundColor: 'rgba(179, 60, 0,0.3)',
				        	   borderColor:'rgba(255, 51, 51,0.8)',
				        	   hoverBorderWidth:[3,3,3,3],
				        	   borderWidth:[1,1,1,1],
				        	   data: pdata
				           },
				           {
				        	   label: "Duels",
				        	   backgroundColor: 'rgba(0, 0, 179,0.3)',
				        	   borderColor:'rgba(255, 51, 51,0.8)',
				        	   hoverBorderWidth:[3,3,3,3],
				        	   borderWidth:[1,1,1,1],
				        	   data: dudata
				           },
				           {
				        	   label: "Aerial",
				        	   backgroundColor: 'rgba(0, 179, 60,0.3)', 
				        	   borderColor:'rgba(255, 51, 51,0.8)',
				        	   hoverBorderWidth:[3,3,3,3],
				        	   borderWidth:[1,1,1,1],
				        	   data: ardata
				           },
				           {
				        	   label: "Defence",
				        	   backgroundColor: 'rgba(204, 0, 204,0.3)', 
				        	   borderColor:'rgba(255, 51, 51,0.8)',
				        	   hoverBorderWidth:[3,3,3,3],
				        	   borderWidth:[1,1,1,1],
				        	   data: ddata
				           },
				           {
				        	   label: "Set Pieces",
				        	   backgroundColor: 'rgba(230, 230, 0,0.3)', 
				        	   borderColor:'rgba(255, 51, 51,0.8)',
				        	   hoverBorderWidth:[3,3,3,3],
				        	   borderWidth:[1,1,1,1],
				        	   data: sdata
				           }

				           ],
				           borderWidth: 1
			},
			options: {
				barPercentage:0.5,
				categoryPercentage:0.5,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
	};
	initgeneralsummery = function(d,LegendOptions){
		var w = 200,
		h = 200;

		var colorscale = d3.scale.category10();

		//Legend titles


		//Options for the Radar chart, other than default
		var mycfg = {
				w: w,
				h: h,
				maxValue : 1,

				ExtraWidthX: 300
		}

		//Call function to draw the Radar chart
		//Will expect that data is in %'s
		RadarChart.draw("#chart", d, mycfg);

		////////////////////////////////////////////
		/////////// Initiate legend ////////////////
		////////////////////////////////////////////

		var svg = d3.select('#body')
		.selectAll('svg')
		.append('svg')
		.attr("width", w+300)
		.attr("height", h)

		//Create the title for the legend
		var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", w +50)
		.attr("y", 10)
		.attr("font-size", "12px")
		.attr("fill", "#404040")
		.text("Timeline");

		//Initiate Legend	
		var legend = svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(90,20)') 
		;
		//Create colour squares
		legend.selectAll('rect')
		.data(LegendOptions)
		.enter()
		.append("rect")
		.attr("x", w +45)
		.attr("y", function(d, i){ return i * 20;})
		.attr("width", 10)
		.attr("height", 10)
		.style("fill", function(d, i){ return colorscale(i);})
		;
		//Create text next to squares
		legend.selectAll('text')
		.data(LegendOptions)
		.enter()
		.append("text")
		.attr("x", w +62)
		.attr("y", function(d, i){ return i * 20 + 9;})
		.attr("font-size", "11px")
		.attr("fill", "#737373")
		.text(function(d) { return d; })
		;	
	};
	var passingSummery= function(){
		var LegendOptions = ['2016-2017'];

		//Data
		var d = [
		         [
		          {axis:"Passes",value:$scope.pprofile.att_passes_avg/20},
		          {axis:"Short Medium Passes",value:$scope.pprofile.att_short_medium_pass_avg/20},
		          {axis:"Long Passes",value:$scope.pprofile.att_long_passes_avg/20},
		          {axis:"Forward Passes",value:$scope.pprofile.att_forward_passes_avg/20},
		          {axis:"Passes to final 3rd",value:$scope.pprofile.att_passes_to_final_third_avg/20},
		          {axis:"Passes to Penalty",value:$scope.pprofile.att_pass_to_penalty_area_avg/20},
		          {axis:"Key Passes",value:$scope.pprofile.att_key_passes_avg/20},
		          {axis:"Crosses",value:$scope.pprofile.att_crosses_avg/20},
		          {axis:"Through Passes",value:$scope.pprofile.att_through_passes_avg/20},
		          {axis:"Smart Passes",value:$scope.pprofile.att_smart_passes_avg/20},
		          {axis:"Assists",value:$scope.pprofile.att_assists_avg/20},
		          {axis:"Vertical Passes",value:$scope.pprofile.att_vertical_passes_avg/20}
		          ]
		         ];
		initgeneralsummery(d,LegendOptions);

	};
	var defenceSummery= function(){
		var LegendOptions = ['2016-2017'];

		//Data
		var d = [
		         [
		          {axis:"Defensive Duels",value:$scope.pprofile.att_defensive_duels_avg/20},
		          {axis:"Tackles",value:$scope.pprofile.att_tackle_avg/20},
		          {axis:"Yellow Cards per Foul",value:$scope.pprofile.att_yellow_cards_per_foul/20},
		          {axis:"Clearance",value:$scope.pprofile.att_clearance_avg/20},
		          {axis:"Recoveries",value:$scope.pprofile.att_recoveries_avg/20},
		          {axis:"Missed Balls",value:$scope.pprofile.att_missed_balls_avg/20},
		          {axis:"Blocks",value:$scope.pprofile.att_shot_block_avg/20},
		          {axis:"Interceptions",value:$scope.pprofile.att_interceptions_avg/20},
		          {axis:"Pressing Duels",value:$scope.pprofile.att_pressing_duels_avg/20},
		          {axis:"Loose Balls",value:$scope.pprofile.att_loose_ball_duels_avg/20},
		          {axis:"Duels",value:$scope.pprofile.att_duels_avg/20}
		          ]
		         ];
		initgeneralsummery(d,LegendOptions);

	};
	$scope.changedsummerytype = function(){

		if($scope.select2.value == 'Attack')
			attackingSummery();
		if($scope.select2.value == 'Passing')
			passingSummery();
		if($scope.select2.value == 'Defence')
			defenceSummery();
		if($scope.select2.value == 'Aerial')
			aerialSummery();
		if($scope.select2.value == 'Set Pieces')
			setpiecesSummery();
		if($scope.select2.value == 'Overview')
			overviewSummery();


	};
	var overviewSummery= function(){
		var LegendOptions = ['2016-2017'];
		var d = [
		         [
		          {axis:"Passing Ability",value:$scope.summerypassing.passingability/20},
		          {axis:"Passing Threat",value:$scope.summerypassing.passingthreat/20},
		          {axis:"Construction",value:$scope.summerypassing.construction/20},
		          {axis:"Creativity",value:$scope.summerypassing.creativity/20},
		          {axis:"Point of Referance",value:$scope.summeryattack.pointofref/20},
		          {axis:"Outragious Position",value:$scope.summeryattack.outragiouspos/20},
		          {axis:"Shooting Threat",value:$scope.summeryattack.shootingthrest/20},
		          {axis:"Goal Scoring Instinct",value:$scope.summeryattack.goalsc/20},
		          {axis:"1 vs 1",value:$scope.summeryattack.onevsone/20},
		          {axis:"Direct Opponent",value:$scope.summerydefence.directopp/20},
		          {axis:"Space",value:$scope.summerydefence.space/20},
		          {axis:"Duel",value:$scope.summerydefence.duel/20},
		          {axis:"Aerial Presence",value:$scope.summeryaerial.aerialpresence/20},
		          {axis:"Aerial Threat",value:$scope.summeryaerial.aerialthreat/20},
		          {axis:"Freekicks",value:$scope.summerysetpieces.freekicks/20},
		          {axis:"Direct Freekick",value:$scope.summerysetpieces.directfreekick/20},
		          {axis:"Corner",value:$scope.summerysetpieces.corner/20},
		          {axis:"Penalties",value:$scope.summerysetpieces.penalties/20}

		          ]
		         ];

		initgeneralsummery(d,LegendOptions);
	};
	var attackingSummery= function(){
		var LegendOptions = ['2016-2017'];

		//Data
		var d = [
		         [
		          {axis:"Point Of Reference",value:$scope.pprofile.att_received_pass_avg/20},
		          {axis:"Attacking Action",value:$scope.pprofile.att_successful_attacking_actions_avg/20},
		          {axis:"Linkup Play",value:$scope.pprofile.att_linkup_plays_avg/20},
		          {axis:"Received Dangerous Pass",value:$scope.pprofile.att_received_dangerous_pass_avg/20},
		          {axis:"Touches in Box",value:$scope.pprofile.att_touch_in_box_avg/20},
		          {axis:"Ball Entry in Final Third",value:$scope.pprofile.att_passes_to_final_third_avg/20},
		          {axis:"Avg Dribble Distance",value:$scope.pprofile.att_average_dribble_distance_from_opponent_goal/20},
		          {axis:"Shots Avg",value:$scope.pprofile.att_shots_avg/20},
		          {axis:"Offensive Duels",value:$scope.pprofile.att_offensive_duels_avg/20},
		          {axis:"Dribbles",value:$scope.pprofile.att_dribbles_avg/20},
		          {axis:"Shooting",value:$scope.pprofile.att_goals_wilson/20},
		          {axis:"Shots to near Corner",value:$scope.pprofile.att_shot_to_near_corner_avg/20},
		          {axis:"Shots to far Corner",value:$scope.pprofile.att_shot_to_far_corner_avg/20},
		          {axis:"Non Penalty Goal Avg",value:$scope.pprofile.att_shot_to_far_corner_avg/20},
		          {axis:"Goal Conversion %",value:$scope.pprofile.att_goal_conversion_percent/20},
		          {axis:"Goals per 90",value:$scope.pprofile.att_goals_avg/20}

		          ]
		         ];
		initgeneralsummery(d,LegendOptions);

	};
	var setpiecesSummery= function(){
		var LegendOptions = ['2016-2017'];

		//Data
		var d = [
		         [
		          {axis:"Free Kicks",value:$scope.pprofile.att_free_kicks_taken_avg/20},
		          {axis:"Direct Free Kicks",value:$scope.pprofile.att_direct_free_kicks_taken_avg/20},
		          {axis:"Corners",value:$scope.pprofile.att_corners_taken_avg/20},
		          {axis:"Penalties",value:$scope.pprofile.att_penalties_taken_avg/20}

		          ]
		         ];
		initgeneralsummery(d,LegendOptions);

	};
	var aerialSummery= function(){
		var LegendOptions = ['2016-2017'];

		//Data
		var d = [
		         [
		          {axis:"Aerial Duels",value:$scope.pprofile.att_aerial_duels_avg/20},
		          {axis:"Field Aerial Duels",value:$scope.pprofile.att_field_aerial_duels_avg/20},
		          {axis:"Head Shots",value:$scope.pprofile.att_head_shots_avg/20},
		          {axis:"Head Goals",value:$scope.pprofile.att_head_goals_avg/20},

		          ]
		         ];
		initgeneralsummery(d,LegendOptions);

	};
	var calculateSummery = function(){
		$scope.summeryattack={
				pointofref:($scope.pprofile.att_received_pass_avg+$scope.pprofile.att_successful_attacking_actions_avg+$scope.pprofile.att_linkup_plays_avg)/3,
				outragiouspos:($scope.pprofile.att_received_dangerous_pass_avg+$scope.pprofile.att_touch_in_box_avg+$scope.pprofile.att_passes_to_final_third_avg+$scope.pprofile.att_average_dribble_distance_from_opponent_goal+$scope.pprofile.att_shots_avg)/5,
				shootingthrest:($scope.pprofile.att_shot_to_far_corner_avg+$scope.pprofile.att_shot_to_near_corner_avg+$scope.pprofile.att_shots_avg)/3,
				goalsc:($scope.pprofile.att_goals_wilson+$scope.pprofile.att_goal_conversion_percent+$scope.pprofile.att_goals_avg)/3,
				onevsone:($scope.pprofile.att_offensive_duels_avg+$scope.pprofile.att_dribbles_avg)/2
		};
		$scope.summerydefence={
				directopp:($scope.pprofile.att_defensive_duels_avg+$scope.pprofile.att_tackle_avg+$scope.pprofile.att_yellow_cards_per_foul)/3,
				space:($scope.pprofile.att_clearance_avg+$scope.pprofile.att_interceptions_avg+$scope.pprofile.att_shot_block_avg+$scope.pprofile.att_recoveries_avg+$scope.pprofile.att_missed_balls_avg)/5,
				duel:($scope.pprofile.att_defensive_duels_avg+$scope.pprofile.att_duels_avg+$scope.pprofile.att_loose_ball_duels_avg+$scope.pprofile.att_pressing_duels_avg)/4
		};
		$scope.summerypassing={
				passingability:($scope.pprofile.att_passes_avg+$scope.pprofile.att_short_medium_pass_avg+$scope.pprofile.att_long_passes_avg+$scope.pprofile.att_forward_passes_avg+$scope.pprofile.att_passes_to_final_third_avg)/5,
				passingthreat:($scope.pprofile.att_pass_to_penalty_area_avg+$scope.pprofile.att_key_passes_avg+$scope.pprofile.att_key_passes_avg+$scope.pprofile.att_crosses_avg+$scope.pprofile.att_through_passes_avg+$scope.pprofile.att_smart_passes_avg+$scope.pprofile.att_assists_avg)/6,
				construction:($scope.pprofile.att_forward_passes_avg+$scope.pprofile.att_vertical_passes_avg+$scope.pprofile.att_passes_to_final_third_avg+$scope.pprofile.att_through_passes_avg+$scope.pprofile.att_smart_passes_avg)/5,
				creativity:($scope.pprofile.att_through_passes_avg+$scope.pprofile.att_crosses_avg+$scope.pprofile.att_passes_to_final_third_avg+$scope.pprofile.att_smart_passes_avg)/4
		};
		$scope.summeryaerial={
				aerialpresence:($scope.pprofile.att_aerial_duels_avg+$scope.pprofile.att_field_aerial_duels_avg)/2,
				aerialthreat:($scope.pprofile.att_head_shots_avg+$scope.pprofile.att_head_goals_avg)/2
		};
		$scope.summerysetpieces={
				freekicks:$scope.pprofile.att_free_kicks_taken_avg,
				directfreekick:$scope.pprofile.att_direct_free_kicks_taken_avg,
				corner:$scope.pprofile.att_corners_taken_avg,
				penalties:$scope.pprofile.att_penalties_taken_avg
		};

	};
	var calculatebehaviour = function(){
		$scope.attackbehv={
				involv:($scope.pprofile.att_successful_attacking_actions_avg+$scope.pprofile.att_dribbles_won_90+$scope.pprofile.att_offensive_duels_avg+$scope.pprofile.att_accelerations_avg+$scope.pprofile.att_losses_avg+$scope.pprofile.att_received_pass_avg+$scope.pprofile.att_linkup_plays_avg+$scope.pprofile.att_shots_avg+$scope.pprofile.att_goals_avg)/9,
				productivity:($scope.pprofile.att_successful_attacking_actions_avg+$scope.pprofile.att_successful_dribbles_percent+$scope.pprofile.att_offensive_duel_won_90+$scope.pprofile.att_successful_linkup_plays_percent+$scope.pprofile.att_accelerations_avg+$scope.pprofile.att_touch_in_box_avg+$scope.pprofile.att_goal_conversion_percent)/8,
				losses:($scope.pprofile.att_dribbles_lost_90+$scope.pprofile.att_offensive_duel_lost_90+$scope.pprofile.att_linkup_plays_avg+$scope.pprofile.att_losses_avg+$scope.pprofile.att_shots_offtarhet_90)/5,
				efficiency:($scope.pprofile.att_dribbles_won_90+$scope.pprofile.att_offensive_duel_won_90+$scope.pprofile.att_linkup_plays_avg+$scope.pprofile.att_shots_on_target_percent+$scope.pprofile.att_shot_to_far_corner_on_target_percent+$scope.pprofile.att_shot_to_near_cor_won_90+$scope.pprofile.att_head_shot_won_90+$scope.pprofile.att_goals_avg+$scope.pprofile.att_head_goals_avg)/9
		};
		$scope.deffencebehv={
				involv:($scope.pprofile.att_successful_defensive_actions_avg+$scope.pprofile.att_defensive_duels_avg+$scope.pprofile.att_tackle_avg+$scope.pprofile.att_shot_block_avg+$scope.pprofile.att_interceptions_avg+$scope.pprofile.att_recoveries_avg+$scope.pprofile.att_clearance_avg+$scope.pprofile.att_fouls_of_team_percent)/8,
				productivity:($scope.pprofile.att_successful_defensive_actions_avg+$scope.pprofile.att_defensive_duels_won+$scope.pprofile.att_tackle_won_90+$scope.pprofile.att_interceptions_avg+$scope.pprofile.att_recoveries_avg+$scope.pprofile.att_clearance_avg)/6,
				losses:($scope.pprofile.att_tackle_lost_90+$scope.pprofile.att_defensive_duels_lost_90+$scope.pprofile.att_fouls_avg+$scope.pprofile.att_yellow_cards_avg+$scope.pprofile.att_missed_balls_avg)/5,
				efficiency:($scope.pprofile.att_defensive_duels_won+$scope.pprofile.att_tackle_won_90+$scope.pprofile.att_fouls_avg)/3
		};
		$scope.passingbehv={
				involv:($scope.pprofile.att_passes_avg+$scope.pprofile.att_short_medium_pass_avg+$scope.pprofile.att_long_passes_avg+$scope.pprofile.att_smart_passes_avg+$scope.pprofile.att_through_passes_avg+$scope.pprofile.att_key_passes_avg+$scope.pprofile.att_crosses_avg+$scope.pprofile.att_back_passes_avg+$scope.pprofile.att_vertical_passes_avg+$scope.pprofile.att_forward_passes_avg+$scope.pprofile.att_passes_to_final_third_avg+$scope.pprofile.att_pass_to_penalty_area_avg)/12,
				productivity:($scope.pprofile.att_passes_to_penalty_won_90+$scope.pprofile.att_passes_to_final_third_won_90+$scope.pprofile.att_forward_passes_won_90+$scope.pprofile.att_vertical_passes_won_90+$scope.pprofile.att_back_passes_won_90+$scope.pprofile.att_cross_won_90+$scope.pprofile.att_key_pass_won_90+$scope.pprofile.att_throught_passes_won_90+$scope.pprofile.att_smart_pass_won_90+$scope.pprofile.att_long_passes_won_90+$scope.pprofile.att_short_medium_pass_won_90+$scope.pprofile.att_passes_won_90)/12,
				losses:($scope.pprofile.att_passes_to_penalty_lost_90+$scope.pprofile.att_passes_to_final_third_lost_90+$scope.pprofile.att_forward_passes_lost_90+$scope.pprofile.att_vertical_passes_lost_90+$scope.pprofile.att_back_passes_lost_90+$scope.pprofile.att_cross_lost_90+$scope.pprofile.att_key_pass_lost_90+$scope.pprofile.att_through_passes_lost_90+$scope.pprofile.att_smart_pass_lost_90+$scope.pprofile.att_long_passes_lost_90+$scope.pprofile.att_short_medium_pass_lost_90+$scope.pprofile.att_passes_won_90)/12,
				efficiency:($scope.pprofile.att_passes_won_90+$scope.pprofile.att_short_medium_pass_won_90+$scope.pprofile.att_long_passes_won_90+$scope.pprofile.att_smart_pass_won_90+$scope.pprofile.att_throught_passes_won_90+$scope.pprofile.att_key_pass_won_90+$scope.pprofile.att_cross_won_90+$scope.pprofile.att_back_passes_won_90+$scope.pprofile.att_vertical_passes_won_90+$scope.pprofile.att_forward_passes_won_90+$scope.pprofile.att_passes_to_final_third_won_90+$scope.pprofile.att_passes_to_penalty_won_90)/12
		};
		$scope.aerialsbehv={
				involv:($scope.pprofile.att_aerial_duels_avg+$scope.pprofile.att_field_aerial_duels_avg+$scope.pprofile.att_head_shots_avg)/3,
				productivity:($scope.pprofile.att_head_shot_won_90+$scope.pprofile.att_head_goals_avg+$scope.pprofile.att_field_aerial_won_90+$scope.pprofile.att_aerial_duels_won_90)/4,
				losses:($scope.pprofile.att_head_shot_lost_90+$scope.pprofile.att_field_aerial_lost_90+$scope.pprofile.att_aerial_duels_lost_90)/3,
				efficiency:($scope.pprofile.att_aerial_duels_won_90+$scope.pprofile.att_field_aerial_won_90+$scope.pprofile.att_head_shot_won_90+$scope.pprofile.att_goals_avg)/4
		};
		$scope.duelsbehv={
				involv:($scope.pprofile.att_duels_avg+$scope.pprofile.att_defensive_duels_avg+$scope.pprofile.att_offensive_duels_avg+$scope.pprofile.att_pressing_duels_avg+$scope.pprofile.att_loose_ball_duels_avg)/5,
				productivity:($scope.pprofile.att_aerial_duels_won_90+$scope.pprofile.att_field_aerial_won_90+$scope.pprofile.att_head_shot_won_90+$scope.pprofile.att_head_goals_avg)/4,
				losses:($scope.pprofile.att_duels_lost_90+$scope.pprofile.att_defensive_duels_lost_90+$scope.pprofile.att_offensive_duels_lost+$scope.pprofile.att_pressing_duels_avg+$scope.pprofile.att_loose_ball_duels_avg)/5,
				efficiency:($scope.pprofile.att_duels_won_90+$scope.pprofile.att_defensive_duels_won_90+$scope.pprofile.att_offensive_duels_won+$scope.pprofile.att_pressing_duels_avg+$scope.pprofile.att_loose_ball_duels_avg)/5
		};
		$scope.setpiecesbehv={
				involv:($scope.pprofile.att_free_kicks_taken_avg+$scope.pprofile.att_direct_free_kicks_taken_avg+$scope.pprofile.att_corners_taken_avg+$scope.pprofile.att_penalties_taken_avg)/4,
				productivity:(0),
				losses:(0),
				efficiency:(0)
		};

		dataforbhvoverall();


	}
	var dataforbhvoverall=function(){
		var adata =[];
		var pdata=[];
		var ddata=[];
		var dudata=[];
		var sdata=[];
		var ardata=[];
		adata.push($scope.attackbehv.involv);
		adata.push($scope.attackbehv.productivity);
		adata.push($scope.attackbehv.losses);
		adata.push($scope.attackbehv.efficiency);

		pdata.push($scope.passingbehv.involv);
		pdata.push($scope.passingbehv.productivity);
		pdata.push($scope.passingbehv.losses);
		pdata.push($scope.passingbehv.efficiency);

		ddata.push($scope.deffencebehv.involv);
		ddata.push($scope.deffencebehv.productivity);
		ddata.push($scope.deffencebehv.losses);
		ddata.push($scope.deffencebehv.efficiency);

		dudata.push($scope.duelsbehv.involv);
		dudata.push($scope.duelsbehv.productivity);
		dudata.push($scope.duelsbehv.losses);
		dudata.push($scope.duelsbehv.efficiency);

		sdata.push($scope.setpiecesbehv.involv);
		sdata.push($scope.setpiecesbehv.productivity);
		sdata.push($scope.setpiecesbehv.losses);
		sdata.push($scope.setpiecesbehv.efficiency);

		ardata.push($scope.aerialsbehv.involv);
		ardata.push($scope.aerialsbehv.productivity);
		ardata.push($scope.aerialsbehv.losses);
		ardata.push($scope.aerialsbehv.efficiency);

		behaviourinit(adata,pdata,dudata,ddata,sdata,ardata);
	}
	$scope.dataforbhvoverall=function(){
		var adata =[];
		var pdata=[];
		var ddata=[];
		var dudata=[];
		var sdata=[];
		var ardata=[];
		adata.push($scope.attackbehv.involv);
		adata.push($scope.attackbehv.productivity);
		adata.push($scope.attackbehv.losses);
		adata.push($scope.attackbehv.efficiency);

		pdata.push($scope.passingbehv.involv);
		pdata.push($scope.passingbehv.productivity);
		pdata.push($scope.passingbehv.losses);
		pdata.push($scope.passingbehv.efficiency);

		ddata.push($scope.deffencebehv.involv);
		ddata.push($scope.deffencebehv.productivity);
		ddata.push($scope.deffencebehv.losses);
		ddata.push($scope.deffencebehv.efficiency);

		dudata.push($scope.duelsbehv.involv);
		dudata.push($scope.duelsbehv.productivity);
		dudata.push($scope.duelsbehv.losses);
		dudata.push($scope.duelsbehv.efficiency);

		sdata.push($scope.setpiecesbehv.involv);
		sdata.push($scope.setpiecesbehv.productivity);
		sdata.push($scope.setpiecesbehv.losses);
		sdata.push($scope.setpiecesbehv.efficiency);

		ardata.push($scope.aerialsbehv.involv);
		ardata.push($scope.aerialsbehv.productivity);
		ardata.push($scope.aerialsbehv.losses);
		ardata.push($scope.aerialsbehv.efficiency);

		behaviourinit(adata,pdata,dudata,ddata,sdata,ardata);
	}
	$scope.productivity_subtab='bpAttack';
	$scope.productivity_subtabselect = function(value){
		$scope.productivity_subtab=value;
	}
	$http.post('/playersercice/player/'+player).then( function(response) {
		$scope.pprofile=response.data.playerprofile;

		calculateSummery();
		$scope.changedsummerytype();
		calculatebehaviour();

		$scope.dataforbhvoverall();

	});
}]);

app.controller('SearchController', ["$scope","$http", "spinnerService","NgTableParams","$q",function ($scope,$http,spinnerService,NgTableParams ,$q) {
	
	var self = this;
	var data = [{name: "Moroni", age: 50} /*,*/];
	
	$scope.selectsea={
			value: 'Select Season'
	};
	$scope.selectleague={
			value:'Select-League',
			pochoices:[
			           "AMF",
			           "CF",
			           "RB",
			           "LB",
			           "DMF",
			           "RDMF",
			           "LCMF",
			           "RCMF",
			           "LDMF",
			           "LCMF3",
			           "RCMF3",
			           "GK",
			           "LWF",
			           "RWF",
			           "LW",
			           "LAMF",
			           "RW",
			           "RAMF",
			           "RWB",
			           "LWB",
			           "LB5",
			           "RB5",
			           "RCB3",
			           "CB",
			           "LCB3",
			           "LCB",
			           "RCB"]
	};
	$scope.showTabs = true;
	$scope.agecheck=false;
	$scope.total=0;
	$scope.fil={};
	$scope.sortcr={
			sorttype: 'name',
			sortorder: 1
	};
	$scope.pageno=1;
	$scope.pagelist=[];
	$scope.showHide=function(idname,dataval){

		$scope.query[idname].show=dataval;

	};
	
	$scope.pageChange=function(pgno){
		$scope.pageno=pgno;
		//$scope.getSearchQuery();
	}
	$scope.addCollumn = function(){
		$("#example-table").tabulator("toggleColumn","age")
	}
	$scope.toggleSort=function(sortType){
		if($scope.sortcr.sorttype == sortType){
			if($scope.sortcr.sortorder == 1){
				$scope.sortcr.sortorder = -1;
			}else{
				$scope.sortcr.sortorder = 1;
			}
		}
		else{
			$scope.sortcr.sorttype = sortType;
			$scope.sortcr.sortorder = 1;
		}

		$scope.getSearchQuery();
	}

	$scope.query=[{name:'Age', id:'age',show:false,	sliderid:'fil.att2', minValue: 0, maxValue: 60, options: { floor: 0, ceil: 60, step: 1  }},
	              {name:'Height', id:'height',show:false, sliderid:'fil.att11', minValue: 0, maxValue: 100, options: { floor: 0, ceil: 100, step: 1  }},
	              {name:'Weight', id:'weight',show:false, sliderid:'fil.att12', minValue: 0, maxValue: 100, options: { floor: 0, ceil: 150, step: 1  }},
	              {name:'Def duels per 90',show:false, id:'defensive_duels_avg', sliderid:'fil.att15', minValue: 0, maxValue: 50, options: { floor: 0, ceil: 50, step: 1  }},
	              {name:'Def duels won %', show:false,id:'defensive_duels_won', sliderid:'fil.att16', minValue: 0, maxValue: 50, options: { floor: 0, ceil: 100, step: 1  }},
	              {name:'Tackles per 90', show:false,id:'tackle_avg', sliderid:'fil.att19', minValue: 0, maxValue: 40, options: { floor: 0, ceil: 40, step: 1  }},
	              {name:'Tackle succ %', show:false,id:'successful_tackle_percent', sliderid:'fil.att20', minValue: 0, maxValue: 100, options: { floor: 0, ceil: 100, step: 1  }},
	              {name:'Interceptions per 90',show:false, id:'interceptions_avg', sliderid:'fil.att21', minValue: 0, maxValue: 40, options: { floor: 0, ceil: 40, step: 1  }},
	              {name:'Market Value',show:false, id:'marketvalue', sliderid:'fil.marketvaluecheck', minValue: 0, maxValue: 100000, options: { floor: 0, ceil: 100000, step: 1  }},
	              {name:'Def Duels Won per 90',show:false, id:'defduelwonp90', sliderid:'fil.defduelwonp90', minValue: 0, maxValue: 50, options: { floor: 0, ceil: 50, step: 1  }},
	              {name:'Def duels Lost per 90',show:false, id:'fil.defDuelLostP90', sliderid:'fil.defDuelLostP90', minValue: 0, maxValue: 50, options: { floor: 0, ceil: 50, step: 1  }},
	              {name:'Tackles Won per 90',show:false, id:'fil.tacklesWonP90', sliderid:'fil.tacklesWonP90', minValue: 0, maxValue: 50, options: { floor: 0, ceil: 50, step: 1  }},
	              {name:'Tackles Lost per 90',show:false, id:'fil.tacklesLostP90', sliderid:'fil.tacklesLostP90', minValue: 0, maxValue: 50, options: { floor: 0, ceil:50, step: 1  }},
	              {name:'Succ def per 90',show:false, id:'fil.SuccdefP90', sliderid:'fil.SuccdefP90', minValue: 0, maxValue: 50, options: { floor: 0, ceil: 50, step: 1  }},
	              {name:'Yellow cards per 90',show:false, id:'fil.YellowCardsP90', sliderid:'fil.YellowCardsP90', minValue: 0, maxValue: 50, options: { floor: 0, ceil: 50, step: 1  }}
	              ];
	$scope.tab={};

//	var url ='/playersercice/players'
//	$http.get(url).then( function(response) {
//	$scope.players = response.data; 
//	});
	$http.get('data/league.json').then(function(data){
		$scope.selectleague.choices = data.data.league;
	})
	var headerclick = function(e,column){
		console.log('Testing')
	};
	
		
	
	
	

		$scope.getSearchQuery=function(){
			var deferred = $q.defer();
			spinnerService.show('booksSpinner');
			
			var data= resolveQuery();
			var url ='/playersercice/players'
				$http.post(url,data).then( function(response) {
					
					$scope.players = response.data.players; 
					$scope.total=response.data.total;
					$scope.pagelist =null;
					$scope.pagelist =[];
					for(var i=0,j=($scope.pageno-3);i<=($scope.total/50)-1;i++){
						if((i>=j && i<j+5)|| i>($scope.total/50)-2)
							$scope.pagelist.push(i+1)
					}
					$scope.jsonstrdata=data;
					
					//$("#example-table").tabulator("setData", $scope.players);
					 spinnerService.hide('booksSpinner');
					 spinnerService.hideAll();
					// return $scope.players;
					 $("#example-table").tabulator("setData", $scope.players);
					 
					 deferred.resolve( response.data);
				});
			return deferred.promise;


		};
		$scope.getSearchQuery2=function(query){
			var deferred = $q.defer();
			spinnerService.show('booksSpinner');
			
			var data= query;
			var url ='/playersercice/players'
				$http.post(url,data).then( function(response) {
					
					$scope.players = response.data.players; 
					$scope.total=response.data.total;
					$scope.pagelist =null;
					$scope.pagelist =[];
					for(var i=0,j=($scope.pageno-3);i<=($scope.total/50)-1;i++){
						if((i>=j && i<j+5)|| i>($scope.total/50)-2)
							$scope.pagelist.push(i+1)
					}
					$scope.jsonstrdata=data;
					
					//$("#example-table").tabulator("setData", $scope.players);
					 spinnerService.hide('booksSpinner');
					 spinnerService.hideAll();
					// return $scope.players;
					
					 
					 deferred.resolve( response.data);
				});
			return deferred.promise;


		};
	var resolveFilter=function(filters){
		var playerSerchBean={
				pageno: $scope.pageno,
				sortCriteria:$scope.sortcr,
				script:{}
		};
		var queryScript ={};
		for(var key in filters){
			if(key=='name'){
				queryScript['name'] = {'$regex': filters[key]} ;
			}else
				{
				queryScript[key]={$lt : parseInt(filters[key].max) ,$gt : parseInt(filters[key].min)};
				}
		}
		playerSerchBean.script=queryScript;
		return playerSerchBean;
	};
		
	var resolveQuery = function(){
		var playerSerchBean={
				pageno: $scope.pageno,
				sortCriteria:$scope.sortcr,
				script:{}
		};
		var minmaxsub = {$lt : 0,$gt : 100};
		var queryScript ={};
		if($scope.selectleague.searchname!=''&& $scope.selectleague.searchname!=null){
			queryScript['name'] = {'$regex': $scope.selectleague.searchname} ;
		}
		if($scope.selectleague.value!='Select-League'){
			var sp = $scope.selectleague.value.split('-');
			queryScript['domestic_competition_name'] = sp[1];
			queryScript['domestic_competition_area_name'] = sp[0];
		}
		if($scope.selectleague.povalue!='' && $scope.selectleague.povalue!=null){

			queryScript['primary_position'] = $scope.selectleague.povalue;

		}
		if($scope.selectsea.value!='' || $scope.selectsea.value==null){
			if($scope.selectsea.value=='Current Season')
				queryScript['season'] = '2016-2017';
			if($scope.selectsea.value=='Previous Season')
				queryScript['season'] = '2015-2016';
		}
		if($scope.fil.att2)
			queryScript['age']={$lt : $scope.query[0].maxValue ,$gt :$scope.query[0].minValue};
		if($scope.fil.att11)
			queryScript['height']={$lt : $scope.query[1].maxValue ,$gt :$scope.query[1].minValue};
		if($scope.fil.att12)
			queryScript['weight']={$lt : $scope.query[2].maxValue ,$gt :$scope.query[2].minValue};
		if($scope.fil.att15)
			queryScript['defensive_duels_avg']={$lt : $scope.query[3].maxValue ,$gt :$scope.query[3].minValue};
		if($scope.fil.att16)
			queryScript['defensive_duels_won']={$lt : $scope.query[4].maxValue ,$gt :$scope.query[4].minValue};
		if($scope.fil.att19)
			queryScript['tackle_avg']={$lt : $scope.query[5].maxValue ,$gt :$scope.query[5].minValue};
		if($scope.fil.att20)
			queryScript['successful_tackle_percent']={$lt : $scope.query[6].maxValue ,$gt :$scope.query[6].minValue};
		if($scope.fil.att21)
			queryScript['interceptions_avg']={$lt : $scope.query[7].maxValue ,$gt :$scope.query[7].minValue};
		if($scope.fil.marketvaluecheck)
			queryScript['market_value']={$lt : $scope.query[8].maxValue ,$gt :$scope.query[8].minValue};
		if($scope.fil.defduelwonp90)
			queryScript['defensive_duels_won_90']={$lt : $scope.query[9].maxValue ,$gt :$scope.query[9].minValue};
		if($scope.fil.defDuelLostP90)
			queryScript['defensive_duels_lost_90']={$lt : $scope.query[10].maxValue ,$gt :$scope.query[10].minValue};
		if($scope.fil.tacklesWonP90)
			queryScript['tackle_won_90']={$lt : $scope.query[11].maxValue ,$gt :$scope.query[11].minValue};
		if($scope.fil.tacklesLostP90)
			queryScript['tackle_lost_90']={$lt : $scope.query[12].maxValue ,$gt :$scope.query[12].minValue};
		if($scope.fil.YellowCardsP90)
			queryScript['yellow_cards_avg']={$lt : $scope.query[14].maxValue ,$gt :$scope.query[14].minValue};
		if($scope.fil.SuccdefP90)
			queryScript['successful_defensive_actions_avg']={$lt : $scope.query[13].maxValue ,$gt :$scope.query[13].minValue};
		playerSerchBean.script=queryScript;
		return playerSerchBean;
	};
	$scope.getSearchQuery();
	self.cols=[
{field: "full_name",title: "Full Name",filter:{full_name: "text"} ,class:"tableclass",show:true},
{field: "age",title: "Age",filter:{age: "number"},class:"tableclass",show:true},
{field: "birth_date",title: "Date of Birth",filter:{birth_date: "number"},class:"tableclass",show:true},
{field: "height",title: "Height",filter:{height: "number"},class:"tableclass",show:true},
{field: "weight",title: "Weight",filter:{weight: "number"},class:"tableclass",show:true},
{field: "foot",title: "Foot",filter:{foot: "text"},class:"tableclass",show:true},
{field: "birth_country_code",title: "Birth Country Code",filter:{birth_country_code: "text"}},
{field: "birth_country_name",title: "Birth Country",filter:{birth_country_name: "text"},class:"tableclass",show:true},
{field: "passport_country_names",title: "Nationalities",filter:{passport_country_names: "number"}},
{field: "market_value",title: "Market Value",filter:{market_value: "number"},class:"tableclass",show:true},
{field: "contract_expires",title: "Contract",filter:{contract_expires: "number"}},
{field: "on_loan",title: "On Loan",filter:{on_loan: "number"},class:"tableclass"},
{field: "recently_transferred",title: "Recently Transferred",filter:{recently_transferred: "number"},class:"tableclass"},
{field: "current_team_id",title: "Current Team ID",filter:{current_team_id: "number"},class:"tableclass"},
{field: "current_team_name",title: "Current Team Name",filter:{current_team_name: "text"},class:"tableclass",show:true},
{field: "primary_position",title: "1st Position",filter:{primary_position: "text"},class:"tableclass",show:true},
{field: "secondary_position",title: "2nd Position",filter:{secondary_position: "text"},class:"tableclass",show:true},
{field: "third_position",title: "3rd Position",filter:{third_position: "number"},class:"tableclass"},
{field: "primary_position_percent",title: "1st Position %",filter:{primary_position_percent: "number"},show:true},
{field: "secondary_position_percent",title: "2nd Position %",filter:{secondary_position_percent: "number"},class:"tableclass"},
{field: "third_position_percent",title: "3rd Position %",filter:{third_position_percent: "number"},class:"tableclass"},
{field: "positions",title: "Positions Used",filter:{positions: "number"},class:"tableclass"},
{field: "matches_played_for_national_team",title: "National Team Apps",filter:{matches_played_for_national_team: "number"},class:"tableclass"},
{field: "total_matches",title: "Apps",filter:{total_matches: "number"},class:"tableclass"},
{field: "matches_in_start",title: "Started",filter:{matches_in_start: "number"},class:"tableclass"}
/*{field: "matches_substituted",title: "Sub In",filter:{matches_substituted: "number"},class:"tableclass"},
{field: "matches_coming_off",title: "Sub Out",filter:{matches_coming_off: "number"}},
{field: "matches_played_percent",title: "Matches %",filter:{matches_played_percent: "number"}},
{field: "minutes_on_field",title: "Minutes",filter:{minutes_on_field: "number"}},
{field: "minutes_played_percent",title: "Minutes %",filter:{minutes_played_percent: "number"}},
{field: "minutes_per_app",title: "Min/App",filter:{minutes_per_app: "number"},show:true},
{field: "participations_percentage",title: "Participation",filter:{participations_percentage: "number"}},
{field: "win_percent",title: "Win %",filter:{win_percent: "number"}},
{field: "competition_ids",title: "Competition IDs",filter:{competition_ids: "number"}},
{field: "competition_names",title: "Competitions",filter:{competition_names: "number"}},
{field: "competition_types",title: "Competition Type",filter:{competition_types: "number"}},
{field: "competitions_level",title: "Competition Level",filter:{competitions_level: "number"}},
{field: "att_competition_coefficient",title: "Competition Coefficient",filter:{att_competition_coefficient: "number"}},
{field: "domestic_competition_name",title: "Domestic Competition",filter:{domestic_competition_name: "number"}},
{field: "domestic_competition_area_name",title: "Domestic Competition Country",filter:{domestic_competition_area_name: "number"}},
{field: "international_competition_ids",title: "International Competitions",filter:{international_competition_ids: "number"}},
{field: "international_competition_names",title: "International Competitions Names",filter:{international_competition_names: "number"}},
{field: "assists",title: "Total Assists",filter:{assists: "number"}},
{field: "assists_avg",title: "Assists",filter:{assists_avg: "number"}},
{field: "shot_assists_avg",title: "Total Shot Assists",filter:{shot_assists_avg: "number"}},
{field: "shot_on_goal_assists_avg",title: "Shot Assists",filter:{shot_on_goal_assists_avg: "number"}},
{field: "successful_shot_assists_percent",title: "Successful Shot Assists %",filter:{successful_shot_assists_percent: "number"}},
{field: "passes_avg",title: "Passes Attempted",filter:{passes_avg: "number"}},
{field: "passes_avg_won",title: "Successful Passes",filter:{passes_avg_won: "number"}},
{field: "passes_avg_lost",title: "Unsuccessful Passes",filter:{passes_avg_lost: "number"}},
{field: "accurate_passes_percent",title: "Pass Success %",filter:{accurate_passes_percent: "number"}},
{field: "passes_of_team_percent",title: "Passes of Team %",filter:{passes_of_team_percent: "number"}},
{field: "average_pass_length",title: "Average Pass Length",filter:{average_pass_length: "number"}},
{field: "passes_wilson",title: "Passes Wilson",filter:{passes_wilson: "number"}},
{field: "short_medium_pass_avg",title: "Short-Medium Passes Attempted",filter:{short_medium_pass_avg: "number"}},
{field: "short_medium_pass_avg_won",title: "Successful Short-Medium Passes",filter:{short_medium_pass_avg_won: "number"}},
{field: "short_medium_pass_avg_lost",title: "Unsuccessful Short-Medium Passes",filter:{short_medium_pass_avg_lost: "number"}},
{field: "accurate_short_medium_pass_percent",title: "Short-Medium Passes Success %",filter:{accurate_short_medium_pass_percent: "number"}},
{field: "short_medium_pass_own_percentage",title: "Short-Medium Passes %",filter:{short_medium_pass_own_percentage: "number"}},
{field: "long_passes_avg",title: "Long Passes Attempted",filter:{long_passes_avg: "number"}},
{field: "long_passes_won",title: "Successful Long Passes",filter:{long_passes_won: "number"}},
{field: "long_passes_lost",title: "Unsuccessful Long Passes",filter:{long_passes_lost: "number"}},
{field: "successful_long_passes_percent",title: "Long Passes Success %",filter:{successful_long_passes_percent: "number"}},
{field: "long_passes_of_team_percent",title: "Long Passes of Team %",filter:{long_passes_of_team_percent: "number"}},
{field: "long_passes_own_percentage",title: "Long Passes %",filter:{long_passes_own_percentage: "number"}},
{field: "average_long_pass_length",title: "Average Long Pass Length",filter:{average_long_pass_length: "number"}},
{field: "key_passes_avg",title: "Key Passes Attempted",filter:{key_passes_avg: "number"}},
{field: "key_passes_avg_won",title: "Successful Key Passes",filter:{key_passes_avg_won: "number"}},
{field: "key_passes_avg_lost",title: "Unsuccessful Key Passes",filter:{key_passes_avg_lost: "number"}},
{field: "successful_key_passes_percent",title: "Key Passes Success %",filter:{successful_key_passes_percent: "number"}},
{field: "key_passes_own_percentage",title: "Key Passes %",filter:{key_passes_own_percentage: "number"}},
{field: "smart_passes_avg",title: "Smart Passes Attempted",filter:{smart_passes_avg: "number"}},
{field: "smart_passes_avg_won",title: "Successful Smart Passes",filter:{smart_passes_avg_won: "number"}},
{field: "smart_passes_avg_lost",title: "Unsuccessful Smart Passes",filter:{smart_passes_avg_lost: "number"}},
{field: "accurate_smart_passes_percent",title: "Smart Passes Success %",filter:{accurate_smart_passes_percent: "number"}},
{field: "smart_passes_of_team_percent",title: "Smart Passes of Team %",filter:{smart_passes_of_team_percent: "number"}},
{field: "smart_passes_own_percentage",title: "Smart Passes %",filter:{smart_passes_own_percentage: "number"}},
{field: "through_passes_avg",title: "Through Passes Attempted",filter:{through_passes_avg: "number"}},
{field: "through_passes_avg_won",title: "Successful Through Passes",filter:{through_passes_avg_won: "number"}},
{field: "through_passes_avg_lost",title: "Unsuccessful Through Passes",filter:{through_passes_avg_lost: "number"}},
{field: "successful_through_passes_percent",title: "Through Passes Success %",filter:{successful_through_passes_percent: "number"}},
{field: "through_passes_own_percentage",title: "Through Passes %",filter:{through_passes_own_percentage: "number"}},
{field: "crosses_avg",title: "Crosses Attempted",filter:{crosses_avg: "number"}},
{field: "crosses_avg_won",title: "Successful Crosses",filter:{crosses_avg_won: "number"}},
{field: "crosses_avg_lost",title: "Unsuccessful Crosses",filter:{crosses_avg_lost: "number"}},
{field: "accurate_crosses_percent",title: "Crosses Success %",filter:{accurate_crosses_percent: "number"}},
{field: "crosses_wilson",title: "Crosses Wilson",filter:{crosses_wilson: "number"}},
{field: "crosses_own_percentage",title: "Crosses %",filter:{crosses_own_percentage: "number"}},
{field: "pass_to_penalty_area_avg",title: "Passes to Penalty Area Attempted",filter:{pass_to_penalty_area_avg: "number"}},
{field: "passes_to_penalty_area_avg_won",title: "Successful Passes to Penalty Area",filter:{passes_to_penalty_area_avg_won: "number"}},
{field: "passes_to_penalty_area_avg_lost",title: "Unsuccessful Passes to Penalty Area",filter:{passes_to_penalty_area_avg_lost: "number"}},
{field: "accurate_pass_to_penalty_area_percent",title: "Pass to Penalty Area Success %",filter:{accurate_pass_to_penalty_area_percent: "number"}},
{field: "pass_to_penalty_area_own_percentage",title: "Passes to Penalty Area %",filter:{pass_to_penalty_area_own_percentage: "number"}},
{field: "passes_to_final_third_avg",title: "Passes to Final Third Attempted",filter:{passes_to_final_third_avg: "number"}},
{field: "passes_to_final_third_avg_won",title: "Successful Passes to Final Third",filter:{passes_to_final_third_avg_won: "number"}},
{field: "passes_to_final_third_avg_lost",title: "Unsuccessful Passes to Final Third",filter:{passes_to_final_third_avg_lost: "number"}},
{field: "accurate_passes_to_final_third_percent",title: "Passes to Final Third Success %",filter:{accurate_passes_to_final_third_percent: "number"}},
{field: "passes_to_final_third_own_percentage",title: "Passes to Final Third %",filter:{passes_to_final_third_own_percentage: "number"}},
{field: "forward_passes_avg",title: "Forward Passes Attempted",filter:{forward_passes_avg: "number"}},
{field: "forward_passes_avg_won",title: "Successful Forward Passes",filter:{forward_passes_avg_won: "number"}},
{field: "forward_passes_avg_lost",title: "Unsuccessful Forward Passes",filter:{forward_passes_avg_lost: "number"}},
{field: "successful_forward_passes_percent",title: "Forward Passes Success %",filter:{successful_forward_passes_percent: "number"}},
{field: "forward_passes_own_percentage",title: "Forward Passes %",filter:{forward_passes_own_percentage: "number"}},
{field: "vertical_passes_avg",title: "Vertical Passes Attempted",filter:{vertical_passes_avg: "number"}},
{field: "vertical_passes_avg_won",title: "Successful Vertical Passes",filter:{vertical_passes_avg_won: "number"}},
{field: "vertical_passes_avg_lost",title: "Unsuccessful Vertical Passes",filter:{vertical_passes_avg_lost: "number"}},
{field: "successful_vertical_passes_percent",title: "Vertical Success %",filter:{successful_vertical_passes_percent: "number"}},
{field: "vertical_passes_own_percentage",title: "Vertical Passes vs Total Passes",filter:{vertical_passes_own_percentage: "number"}},
{field: "back_passes_avg",title: "Back Passes Attempted",filter:{back_passes_avg: "number"}},
{field: "back_passes_avg_won",title: "Successful Back Passes",filter:{back_passes_avg_won: "number"}},
{field: "back_passes_avg_lost",title: "Unsuccessful Back Passes",filter:{back_passes_avg_lost: "number"}},
{field: "successful_back_passes_percent",title: "Back Passes Success %",filter:{successful_back_passes_percent: "number"}},
{field: "back_passes_own_percentage",title: "Back Passes %",filter:{back_passes_own_percentage: "number"}},
{field: "successful_attacking_actions_avg",title: "Successful Attacking Actions",filter:{successful_attacking_actions_avg: "number"}},
{field: "received_pass_avg",title: "Received Passes",filter:{received_pass_avg: "number"}},
{field: "received_dangerous_pass_avg",title: "Received Dangerous Passes",filter:{received_dangerous_pass_avg: "number"}},
{field: "received_dangerous_pass_own_percentage",title: "Received Dangerous Passes %",filter:{received_dangerous_pass_own_percentage: "number"}},
{field: "received_long_pass_avg",title: "Received Long Passes",filter:{received_long_pass_avg: "number"}},
{field: "received_long_pass_own_percentage",title: "Received Long Passes %",filter:{received_long_pass_own_percentage: "number"}},
{field: "received_pass_of_team_percent",title: "Received Passes of Team %",filter:{received_pass_of_team_percent: "number"}},
{field: "linkup_plays",title: "Total Linkup Plays",filter:{linkup_plays: "number"}},
{field: "linkup_plays_avg",title: "Linkup Plays Attempted",filter:{linkup_plays_avg: "number"}},
{field: "linkup_plays_avg_won",title: "Successful Linkup Plays",filter:{linkup_plays_avg_won: "number"}},
{field: "linkup_plays_avg_lost",title: "Unsuccessful Linkup Plays",filter:{linkup_plays_avg_lost: "number"}},
{field: "successful_linkup_plays_percent",title: "Linkup Plays Success %",filter:{successful_linkup_plays_percent: "number"}},
{field: "touch_in_box_avg",title: "Touches in Box",filter:{touch_in_box_avg: "number"}},
{field: "ball_entry_in_final_third_avg",title: "Ball Entry in Final Third",filter:{ball_entry_in_final_third_avg: "number"}},
{field: "offsides_avg",title: "Caught Offside",filter:{offsides_avg: "number"}},
{field: "losses_avg",title: "Possession Losses",filter:{losses_avg: "number"}},
{field: "own_half_losses_avg",title: "Own Half Possession Losses,",filter:{own_half_losses_avg: "number"}},
{field: "own_half_losses_own_percentage",title: "Own Half PossessionLosses%",filter:{own_half_losses_own_percentage: "number"}},
{field: "dangerous_own_half_losses_avg",title: "Dangerous Own Half PossessionLosses",filter:{dangerous_own_half_losses_avg: "number"}},
{field: "dangerous_own_half_losses_own_percentage",title: "Dangerous Own Half Possession Losses%",filter:{dangerous_own_half_losses_own_percentage: "number"}},
{field: "lost_balls_to_saa_percent",title: "Lost Balls vs Successful Attacking Actions",filter:{lost_balls_to_saa_percent: "number"}},
{field: "accelerations_avg",title: "Accelerations",filter:{accelerations_avg: "number"}},
{field: "offensive_duels_avg",title: "Offensive Duels Attempted",filter:{offensive_duels_avg: "number"}},
{field: "offensive_duels_avg_won",title: "Offensive Duels Won",filter:{offensive_duels_avg_won: "number"}},
{field: "offensive_duels_avg_lost",title: "Offensive Duels Lost",filter:{offensive_duels_avg_lost: "number"}},
{field: "offensive_duels_won",title: "Offensive Duels %",filter:{offensive_duels_won: "number"}},
{field: "dribbles_avg",title: "Dribbles Attempted",filter:{dribbles_avg: "number"}},
{field: "dribbles_avg_won",title: "Successful Dribbles",filter:{dribbles_avg_won: "number"}},
{field: "dribbles_avg_lost",title: "Unsuccessful Dribbles",filter:{dribbles_avg_lost: "number"}},
{field: "successful_dribbles_percent",title: "Dribbles Success %",filter:{successful_dribbles_percent: "number"}},
{field: "dribbles_wilson",title: "Dribbles Wilson",filter:{dribbles_wilson: "number"}},
{field: "average_dribble_distance_from_opponent_goal",title: "Average Dribble Distance from Opp Goal",filter:{average_dribble_distance_from_opponent_goal: "number"}},
{field: "shots",title: "Total Shots",filter:{shots: "number"}},
{field: "shots_avg",title: "Shots Attempted",filter:{shots_avg: "number"}},
{field: "shots_avg_on_target",title: "Shots On Target",filter:{shots_avg_on_target: "number"}},
{field: "shots_avg_off_target",title: "Shots Off Target",filter:{shots_avg_off_target: "number"}},
{field: "shots_on_target_percent",title: "Shots on Target %",filter:{shots_on_target_percent: "number"}},
{field: "shot_on_target_per_goal",title: "Shooting Threat",filter:{shot_on_target_per_goal: "number"}},
{field: "shots_wilson",title: "Shots Wilson",filter:{shots_wilson: "number"}},
{field: "shot_to_near_corner_avg",title: "Shots Attempted Near Corner",filter:{shot_to_near_corner_avg: "number"}},
{field: "shot_to_near_corner_avg_on_target",title: "Shots On Target Near Corner",filter:{shot_to_near_corner_avg_on_target: "number"}},
{field: "shot_to_near_corner_avg_off_target",title: "Shots Off Target Near Corner",filter:{shot_to_near_corner_avg_off_target: "number"}},
{field: "shot_to_near_corner_on_target_percent",title: "Shots on Target Near Corner Success %",filter:{shot_to_near_corner_on_target_percent: "number"}},
{field: "shot_to_near_corner_own_percentage",title: "Shots Near Corner %",filter:{shot_to_near_corner_own_percentage: "number"}},
{field: "shot_to_far_corner_avg",title: "Shots Attempted Far Corner",filter:{shot_to_far_corner_avg: "number"}},
{field: "shot_to_far_corner_avg_on_target",title: "Shots On Target Far Corner",filter:{shot_to_far_corner_avg_on_target: "number"}},
{field: "shot_to_far_corner_avg_off_target",title: "Shots Off Target Far Corner",filter:{shot_to_far_corner_avg_off_target: "number"}},
{field: "shot_to_far_corner_on_target_percent",title: "Shots on Target Far Corner Success %",filter:{shot_to_far_corner_on_target_percent: "number"}},
{field: "shot_to_far_corner_own_percentage",title: "Shots Far Corner %",filter:{shot_to_far_corner_own_percentage: "number"}},
{field: "head_shots",title: "Total Head Shots",filter:{head_shots: "number"}},
{field: "head_shots_avg",title: "Head Shots Attempted",filter:{head_shots_avg: "number"}},
{field: "head_shots_avg_on_target",title: "Head Shots On Target",filter:{head_shots_avg_on_target: "number"}},
{field: "head_shots_avg_off_target",title: "Head Shots Off Target",filter:{head_shots_avg_off_target: "number"}},
{field: "head_shots_on_target_percent",title: "Head Shots On Target %",filter:{head_shots_on_target_percent: "number"}},
{field: "head_shot_on_target_per_goal",title: "Head Shooting Threat",filter:{head_shot_on_target_per_goal: "number"}},
{field: "head_shots_own_percentage",title: "Head Shots %",filter:{head_shots_own_percentage: "number"}},
{field: "goals",title: "Total Goals",filter:{goals: "number"}},
{field: "goals_avg",title: "Goals",filter:{goals_avg: "number"}},
{field: "goal_conversion_percent",title: "Goal Conversion %",filter:{goal_conversion_percent: "number"}},
{field: "goals_wilson",title: "Goals Wilson",filter:{goals_wilson: "number"}},
{field: "non_penalty_goal",title: "Total Non Penalty Goals",filter:{non_penalty_goal: "number"}},
{field: "non_penalty_goal_avg",title: "Non Penalty Goals",filter:{non_penalty_goal_avg: "number"}},
{field: "head_goals",title: "Total Head Goals",filter:{head_goals: "number"}},
{field: "head_goals_avg",title: "Head Goals",filter:{head_goals_avg: "number"}},
{field: "head_goals_conversion_percent",title: "Head Goals Conversion %",filter:{head_goals_conversion_percent: "number"}},
{field: "successful_defensive_actions_avg",title: "Successful Defensive Actions",filter:{successful_defensive_actions_avg: "number"}},
{field: "defensive_duels_avg",title: "Defensive Duels Attempted",filter:{defensive_duels_avg: "number"}},
{field: "defensive_duels_avg_won",title: "Defensive Duels Won",filter:{defensive_duels_avg_won: "number"}},
{field: "defensive_duels_avg_lost",title: "Defensive Duels Lost",filter:{defensive_duels_avg_lost: "number"}},
{field: "defensive_duels_won",title: "Defensive Duels %",filter:{defensive_duels_won: "number"}},
{field: "tackle_avg",title: "Tackles Attempted",filter:{tackle_avg: "number"}},
{field: "tackle_avg_won",title: "Tackles Won",filter:{tackle_avg_won: "number"}},
{field: "tackle_avg_lost",title: "Tackles Lost",filter:{tackle_avg_lost: "number"}},
{field: "successful_tackle_percent",title: "Tackles Success %",filter:{successful_tackle_percent: "number"}},
{field: "possession_adjusted_tackle",title: "Possession Adjusted Tackles",filter:{possession_adjusted_tackle: "number"}},
{field: "possession_adjusted_tackle_percentage",title: "Possession Adjusted Tackles %",filter:{possession_adjusted_tackle_percentage: "number"}},
{field: "interceptions_avg",title: "Interceptions",filter:{interceptions_avg: "number"}},
{field: "counterattack_interception_avg",title: "Counterattack Interceptions",filter:{counterattack_interception_avg: "number"}},
{field: "counterattack_interception_own_percentage",title: " Counterattack Interceptions %",filter:{counterattack_interception_own_percentage: "number"}},
{field: "possession_adjusted_interceptions",title: "Possession Adjusted Interceptions",filter:{possession_adjusted_interceptions: "number"}},
{field: "possession_adjusted_interceptions_own_percentage",title: "Possession Adjusted Interceptions %",filter:{possession_adjusted_interceptions_own_percentage: "number"}},
{field: "recoveries_avg",title: "Recoveries",filter:{recoveries_avg: "number"}},
{field: "opponent_half_recoveries_avg",title: "Opponent Half Recoveries",filter:{opponent_half_recoveries_avg: "number"}},
{field: "opponent_half_recoveries_own_percentage",title: "Opponent Half Recoveries %",filter:{opponent_half_recoveries_own_percentage: "number"}},
{field: "dangerous_opponent_half_recoveries_avg",title: "Dangerous Opponent Half Recoveries",filter:{dangerous_opponent_half_recoveries_avg: "number"}},
{field: "dangerous_opponent_half_recoveries_own_percentage",title: "Dangerous Opponent Half Recoveries %",filter:{dangerous_opponent_half_recoveries_own_percentage: "number"}},
{field: "clearance_impl",title: "Clearances",filter:{clearance_impl: "number"}},
{field: "clearance_avg",title: "Clearances Made",filter:{clearance_avg: "number"}},
{field: "missed_balls_avg",title: "Missed Balls",filter:{missed_balls_avg: "number"}},
{field: "clearances_made_percent",title: "Clearances Success %",filter:{clearances_made_percent: "number"}},
{field: "shot_block_avg",title: "Block Shot Attempted",filter:{shot_block_avg: "number"}},
{field: "shot_block_avg_won",title: "Successful Block Shot",filter:{shot_block_avg_won: "number"}},
{field: "shot_block_avg_lost",title: "Unsuccessful Block Shot",filter:{shot_block_avg_lost: "number"}},
{field: "shot_block_percent",title: "Block Shot Success %",filter:{shot_block_percent: "number"}},
{field: "yellow_cards",title: "Total Yellow Cards",filter:{yellow_cards: "number"}},
{field: "red_cards",title: "Total Red Cards",filter:{red_cards: "number"}},
{field: "direct_red_cards",title: "Total Direct Red Cards",filter:{direct_red_cards: "number"}},
{field: "yellow_cards_avg",title: "Yellow Cards",filter:{yellow_cards_avg: "number"}},
{field: "red_cards_avg",title: "Red Cards",filter:{red_cards_avg: "number"}},
{field: "direct_red_cards_avg",title: " Direct Red Cards",filter:{direct_red_cards_avg: "number"}},
{field: "yellow_cards_per_foul",title: "Yellow Cards per Foul",filter:{yellow_cards_per_foul: "number"}},
{field: "fouls_avg",title: "Fouls",filter:{fouls_avg: "number"}},
{field: "fouls_of_team_percent",title: "Fouls of Team Percent",filter:{fouls_of_team_percent: "number"}},
{field: "duels_avg",title: "Duels Attempted",filter:{duels_avg: "number"}},
{field: "duels_avg_won",title: "Duels Won",filter:{duels_avg_won: "number"}},
{field: "duels_avg_lost",title: "Duels Lost",filter:{duels_avg_lost: "number"}},
{field: "duels_won_percent",title: "Duels %",filter:{duels_won_percent: "number"}},
{field: "defensive_duels_avg",title: "Defensive Duels Attempted",filter:{defensive_duels_avg: "number"}},
{field: "defensive_duels_avg_won",title: "Defensive Duels Won",filter:{defensive_duels_avg_won: "number"}},
{field: "defensive_duels_avg_lost",title: "Defensive Duels Lost",filter:{defensive_duels_avg_lost: "number"}},
{field: "defensive_duels_won",title: "Defensive Duels %",filter:{defensive_duels_won: "number"}},
{field: "offensive_duels_avg",title: "Offensive Duels Attempted",filter:{offensive_duels_avg: "number"}},
{field: "offensive_duels_avg_won",title: "Offensive Duels Won",filter:{offensive_duels_avg_won: "number"}},
{field: "offensive_duels_avg_lost",title: "Offensive Duels Lost",filter:{offensive_duels_avg_lost: "number"}},
{field: "offensive_duels_won",title: "Offensive Duels %",filter:{offensive_duels_won: "number"}},
{field: "aerial_duels_avg",title: "Aerial Duels Attempted",filter:{aerial_duels_avg: "number"}},
{field: "aerial_duels_avg_won",title: "Aerial Duels Won",filter:{aerial_duels_avg_won: "number"}},
{field: "aerial_duels_avg_lost",title: "Aerial Duels Lost",filter:{aerial_duels_avg_lost: "number"}},
{field: "aerial_duels_won",title: "Aerial Duels %",filter:{aerial_duels_won: "number"}},
{field: "field_aerial_duels_avg",title: "Field Aerial Duels Attempted",filter:{field_aerial_duels_avg: "number"}},
{field: "field_aerial_duels_avg_won",title: "Field Aerial Duels Won",filter:{field_aerial_duels_avg_won: "number"}},
{field: "field_aerial_duels_avg_lost",title: "Field Aerial Duels Lost",filter:{field_aerial_duels_avg_lost: "number"}},
{field: "field_aerial_duels_won",title: "Field Aerial Duels Success %",filter:{field_aerial_duels_won: "number"}},
{field: "pressing_duels_avg",title: "PressingDuels",filter:{pressing_duels_avg: "number"}},
{field: "loose_ball_duels_avg",title: "LooseBallDuels",filter:{loose_ball_duels_avg: "number"}},
{field: "aerial_duels_avg",title: "Aerial Duels Attempted",filter:{aerial_duels_avg: "number"}},
{field: "aerial_duels_avg_won",title: "Aerial Duels Won",filter:{aerial_duels_avg_won: "number"}},
{field: "aerial_duels_avg_lost",title: "Aerial Duels Lost",filter:{aerial_duels_avg_lost: "number"}},
{field: "aerial_duels_won",title: "Aerial Duels %",filter:{aerial_duels_won: "number"}},
{field: "field_aerial_duels_avg",title: "Field Aerial Duels Attempted",filter:{field_aerial_duels_avg: "number"}},
{field: "field_aerial_duels_avg_won",title: "Field Aerial Duels Won",filter:{field_aerial_duels_avg_won: "number"}},
{field: "field_aerial_duels_avg_lost",title: "Field Aerial Duels Lost",filter:{field_aerial_duels_avg_lost: "number"}},
{field: "field_aerial_duels_won",title: "Field Aerial Duels Success %",filter:{field_aerial_duels_won: "number"}},
{field: "head_shots",title: "Total Head Shots",filter:{head_shots: "number"}},
{field: "head_shots_avg",title: "Head Shots Attempted",filter:{head_shots_avg: "number"}},
{field: "head_shots_avg_on_target",title: "Head Shots On Target",filter:{head_shots_avg_on_target: "number"}},
{field: "head_shots_avg_off_target",title: "Head Shots Off Target",filter:{head_shots_avg_off_target: "number"}},
{field: "head_shots_on_target_percent",title: "Head Shots On Target %",filter:{head_shots_on_target_percent: "number"}},
{field: "head_shot_on_target_per_goal",title: "Head Shooting Threat",filter:{head_shot_on_target_per_goal: "number"}},
{field: "head_shots_own_percentage",title: "Head Shots %",filter:{head_shots_own_percentage: "number"}},
{field: "head_goals",title: "Total Head Goals",filter:{head_goals: "number"}},
{field: "head_goals_avg",title: "Head Goals",filter:{head_goals_avg: "number"}},
{field: "head_goals_conversion_percent",title: "Head Goals Conversion %",filter:{head_goals_conversion_percent: "number"}},
{field: "free_kicks_taken_avg",title: "Freekicks",filter:{free_kicks_taken_avg: "number"}},
{field: "free_kicks_of_team_percent",title: "Freekicks of Team %",filter:{free_kicks_of_team_percent: "number"}},
{field: "direct_free_kicks_taken_avg",title: "Direct Freekicks Taken",filter:{direct_free_kicks_taken_avg: "number"}},
{field: "direct_free_kicks_taken_avg_won",title: "Direct Freekicks On Target",filter:{direct_free_kicks_taken_avg_won: "number"}},
{field: "direct_free_kicks_taken_avg_lost",title: "Direct Freekicks Off Target",filter:{direct_free_kicks_taken_avg_lost: "number"}},
{field: "direct_free_kicks_on_target_percent",title: "Direct Freekicks On Target Success %",filter:{direct_free_kicks_on_target_percent: "number"}},
{field: "corners_taken_avg",title: "Corners Taken",filter:{corners_taken_avg: "number"}},
{field: "penalties_taken",title: "Total Penalties Taken",filter:{penalties_taken: "number"}},
{field: "penalties_taken_avg",title: "Penalties Taken",filter:{penalties_taken_avg: "number"}},
{field: "penalties_conversion_percent",title: "Penalties Conversion %",filter:{penalties_conversion_percent: "number"}},
{field: "shots_against",title: "Total Shots Against",filter:{shots_against: "number"}},
{field: "shots_against_avg",title: "Shots Against",filter:{shots_against_avg: "number"}},
{field: "shots_against_saved",title: "Saved Shots",filter:{shots_against_saved: "number"}},
{field: "shots_against_not_saved",title: "Shots Beaten",filter:{shots_against_not_saved: "number"}},
{field: "save_percent",title: "Save Success %",filter:{save_percent: "number"}},
{field: "save_with_reflex_avg",title: "Saves with Reflex",filter:{save_with_reflex_avg: "number"}},
{field: "shots_against_saved_with_reflex",title: "Saved Shots with Reflex",filter:{shots_against_saved_with_reflex: "number"}},
{field: "shots_against_not_saved_with_reflex",title: "Shots Beaten with Reflex ",filter:{shots_against_not_saved_with_reflex: "number"}},
{field: "save_with_reflex_percent",title: "Saves with Reflex Success%",filter:{save_with_reflex_percent: "number"}},
{field: "save_with_reflex_own_percentage",title: "Saves with Reflex %",filter:{save_with_reflex_own_percentage: "number"}},
{field: "super_save_avg",title: "Super Save",filter:{super_save_avg: "number"}},
{field: "shots_against_super_save",title: "Saved Shots Super Save",filter:{shots_against_super_save: "number"}},
{field: "super_save_own_percentage",title: "Super Save %",filter:{super_save_own_percentage: "number"}},
{field: "saves_wilson",title: "Saves Wilson",filter:{saves_wilson: "number"}},
{field: "clean_sheets",title: "Total Clean Sheets",filter:{clean_sheets: "number"}},
{field: "conceded_goals",title: "Total Conceded Goals",filter:{conceded_goals: "number"}},
{field: "conceded_goals_avg",title: "Conceded Goals",filter:{conceded_goals_avg: "number"}},
{field: "easy_conceded_goal_avg",title: "Easy Conceded Goal",filter:{easy_conceded_goal_avg: "number"}},
{field: "easy_conceded_goal_own_percentage",title: "Easy Conceded Goals %",filter:{easy_conceded_goal_own_percentage: "number"}},
{field: "far_conceded_goals_avg",title: "Far Conceded Goals",filter:{far_conceded_goals_avg: "number"}},
{field: "far_conceded_goals_own_percentage",title: "Far Conceded Goals %",filter:{far_conceded_goals_own_percentage: "number"}},
{field: "near_conceded_goals_avg",title: "Near Conceded Goals",filter:{near_conceded_goals_avg: "number"}},
{field: "near_conceded_goals_own_percentage",title: "Near Conceded Goals %",filter:{near_conceded_goals_own_percentage: "number"}},
{field: "goalkeeper_exits_avg",title: "Goalkeeper Exits",filter:{goalkeeper_exits_avg: "number"}},
{field: "goalkeeper_exits_avg_won",title: "Successful Goalkeeper Exits",filter:{goalkeeper_exits_avg_won: "number"}},
{field: "goalkeeper_exits_avg_lost",title: "Unsuccesful Goalkeeper Exits",filter:{goalkeeper_exits_avg_lost: "number"}},
{field: "successful_goalkeeper_exits_percent",title: "Successful Goalkeeper Exits %",filter:{successful_goalkeeper_exits_percent: "number"}},
{field: "goalkeeper_claim_avg",title: "Goalkeeper Claim",filter:{goalkeeper_claim_avg: "number"}},
{field: "goalkeeper_claim_to_punch",title: "Goalkeeper Claim to Punch",filter:{goalkeeper_claim_to_punch: "number"}},
{field: "goalkeeper_punch_avg",title: "Goalkeeper Punch",filter:{goalkeeper_punch_avg: "number"}},
{field: "goalkeeper_punch_avg_won",title: "Successful Goalkeeper Punch",filter:{goalkeeper_punch_avg_won: "number"}},
{field: "goalkeeper_punch_avg_lost",title: "Unsuccessful Goalkeeper Punch",filter:{goalkeeper_punch_avg_lost: "number"}},
{field: "goalkeeper_punch_accuracy",title: "Goalkeeper Punch Accuracy %",filter:{goalkeeper_punch_accuracy: "number"}},
{field: "gk_aerial_duels_avg",title: "Goalkeeper Aerial Duels",filter:{gk_aerial_duels_avg: "number"}},
{field: "gk_aerial_duels_avg_won",title: "Successful Goalkeeper Aerial Duels",filter:{gk_aerial_duels_avg_won: "number"}},
{field: "gk_aerial_duels_avg_lost",title: "Unsuccessful Goalkeeper Aerial Duels",filter:{gk_aerial_duels_avg_lost: "number"}},
{field: "gk_aerial_duels_won",title: "Goalkeeper Aerial Duels Success %",filter:{gk_aerial_duels_won: "number"}}*/

];
self.tableParams = new NgTableParams({
	        count: 50 // initial page size
	       
   }, {
	   filterOptions: { filterDelay:5000},
 	  counts: [],
       // determines the pager buttons (left set of buttons in demo)
       paginationMaxBlocks: 13,
       paginationMinBlocks: 2,
			getData:function(params){
					//params.total($scope.total);
					//params.data=$scope.players;
				var a=resolveFilter(params.filter());
				
				$scope.pageChange(params.page())
					return $scope.getSearchQuery2(a).then(function(data){
						params.total(data.total);
						return data.players;
					});
			}
			 }
		);
	
//	$scope.getSearchQuery('data/query.json',function(res){
//	$scope.query=res ;
//	});

}]);

app.config(['$routeProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', function ($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {    
	$urlRouterProvider.otherwise("/home");
	$stateProvider
	.state("home", {
		url: "/home",
		templateUrl: "partials/searchhome.html",
		controller: 'SearchController',
		controllerAs: 'vm'
	})
	.state("myProfile", {
		url: "/watchlist",
		templateUrl: "partials/searchhome.html",
		controller: 'BodyController'
	})
	.state("loadData", {
		url: "/load",
		templateUrl: "partials/load.html",
		controller: 'TOTALCONTROL'
	})
	.state("playerProfile", {
		url: "/player/:playerid",
		templateUrl: "partials/playerprofile.html",
		controller: 'PLAYERCONTROLER',
		resolve:{
			player: function($stateParams){
				return $stateParams.playerid;
			}

		}

	});
	
}
]);

app.directive('headerNav', function() {
	return {
		templateUrl: 'partials/headernav.html'
	};
});
app.directive('filterModal', function() {
	return {
		templateUrl: 'partials/filtermodal.html'
	};
});
app.directive('tabcolModal', function() {
	return {
		templateUrl: 'partials/tabcolmodal.html'
	};
});
app.directive('fiterCriteria', function() {
	return {
		templateUrl: 'partials/filltercriteria.html'
	};
});
app.directive('searchTable', function() {
	return {
		templateUrl: 'partials/searchtable.html'
	};
});
app.directive('profileHeader', function() {
	return {
		templateUrl: 'partials/playerprofileheader.html'
	};
});
app.directive('behaViour', function() {
	return {
		templateUrl: 'partials/behaviour.html'
	};
});

angular.module("materializeApp").config(setConfigPhaseSettings);

setConfigPhaseSettings.$inject = ["ngTableFilterConfigProvider"];

function setConfigPhaseSettings(ngTableFilterConfigProvider) {
  var filterAliasUrls = {
	"text": "partials/ng-table/filters/text.html",
    "number": "partials/ng-table/filters/number.html"
  };
  ngTableFilterConfigProvider.setConfig({
    aliasUrls: filterAliasUrls
  });

  // optionally set a default url to resolve alias names that have not been explicitly registered
  // if you don't set one, then 'ng-table/filters/' will be used by default
  ngTableFilterConfigProvider.setConfig({
    defaultBaseUrl: "partials/ng-table/"
  });

};