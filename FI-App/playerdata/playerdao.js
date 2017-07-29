var MongoClient = require('mongodb').MongoClient,
assert = require('assert');

function PlayerDAO(database){
   
	this.db= database;

	this.getPlayer=function(query,page,itemsPerpage,sort,callback){
		var skip=(page-1)*itemsPerpage;
		var pageItems=[];
		
		var docs = this.db.collection('t_player').find(query);
		docs.skip(skip);
		docs.limit(itemsPerpage);
		docs.sort(sort);
		docs.toArray(function(err,players){
		
			if(players!=null && players.length>0){
			players.forEach( function(doc){
				var pageItem = doc;
				pageItems.push(pageItem)
				//console.log(pageItem);
			});
			}
			callback(pageItems);

		});

	};
	
	this.getPlayerOne=function(query,callback){
		
		var docs = this.db.collection('t_player').find(query);
		var p;
		docs.each(function(err,player){
		console.log('entered  : '+player)
		if(player!=null)
			callback(player);
		});
		

	

	};
	
	
	this.updatePlayerData=function(){
		var dbf=this.db;
		var docs = this.db.collection('t_player').find({});
		var p;
		var i=0;
		docs.each(function(err,player){
		console.log('entered  : '+i++)
		if(player!=null){
			 
			dbf.collection('t_player').update({_id:player._id},{
				$set: {
					duels_won_90: player.duels_avg*player.duels_won/100,
					duels_lost_90:player.duels_avg*(100-player.duels_won)/100,
					shots_ontarget_90: player.shots_avg*player.shots_on_target_percent/100,
					shots_offtarget_90:player.shots_avg*(100-player.shots_on_target_percent)/100,
					head_shot_won_90:player.head_shots_avg*player.head_shots_on_target_percent/100,
					head_shot_lost_90:player.head_shots_avg*(100-player.head_shots_on_target_percent)/100,
					key_pass_won_90:player.key_passes_avg*player.successful_key_passes_percent/100,
					key_pass_lost_90:player.key_passes_avg*(100-player.successful_key_passes_percent)/100,
					vertical_passes_won_90:player.vertical_passes_avg*player.successful_vertical_passes_percent/100,
					gk_areial_duel_won_90:player.gk_aerial_duels_avg*player.gk_aerial_duels_won/100,
					gk_areial_duel_loss_90:player.gk_aerial_duels_avg*(100-player.gk_aerial_duels_won)/100,
					vertical_passes_lost_90:player.vertical_passes_avg*(100-player.successful_vertical_passes_percent)/100,
					defensive_duels_won_90 : player.defensive_duels_avg*player.defensive_duels_won/100,
					defensive_duels_lost_90 : player.defensive_duels_avg*(100-player.defensive_duels_won)/100,
					tackle_won_90: player.tackle_avg*player.successful_tackle_percent/100,
					tackle_lost_90: player.tackle_avg*(100-player.successful_tackle_percent)/100,
					offensive_duel_won_90: player.offensive_duels_avg*player.offensive_duels_won/100,
					offensive_duel_lost_90: player.offensive_duels_avg*(100-player.offensive_duels_won)/100,
					shot_to_near_cor_won_90: player.shot_to_near_corner_avg*player.shot_to_near_corner_on_target_percent/100,
					shot_to_near_cor_lost_90: player.shot_to_near_corner_avg*(100-player.shot_to_near_corner_on_target_percent)/100,
					shot_to_far_won_90: player.shot_to_far_corner_avg*player.shot_to_far_corner_on_target_percent/100,
					shot_to_far_lost_90: player.shot_to_far_corner_avg*(100-player.shot_to_far_corner_on_target_percent)/100,
					dribbles_won_90: player.dribbles_avg*player.successful_dribbles_percent/100,
					dribbles_lost_90: player.dribbles_avg*(100-player.successful_dribbles_percent)/100,
					passes_won_90: player.passes_avg*player.accurate_passes_percent/100,
					passes_lost_90: player.passes_avg*(100-player.accurate_passes_percent)/100,
					passes_to_penalty_won_90: player.pass_to_penalty_area_avg*player.accurate_pass_to_penalty_area_percent/100,
					passes_to_penalty_lost_90: player.pass_to_penalty_area_avg*(100-player.accurate_pass_to_penalty_area_percent)/100,
					short_medium_pass_won_90: player.short_medium_pass_avg*player.accurate_short_medium_pass_percent/100,
					short_medium_pass_lost_90: player.short_medium_pass_avg*(100-player.accurate_short_medium_pass_percent)/100,
					smart_pass_won_90: player.smart_passes_avg*player.accurate_smart_passes_percent/100,
					smart_pass_lost_90: player.smart_passes_avg*(100-player.accurate_smart_passes_percent)/100,
					passes_to_final_third_won_90: player.passes_to_final_third_avg*player.accurate_passes_to_final_third_percent/100,
					passes_to_final_third_lost_90: player.passes_to_final_third_avg*(100-player.accurate_passes_to_final_third_percent)/100,
					cross_won_90: player.crosses_avg*player.accurate_crosses_percent/100,
					cross_lost_90: player.crosses_avg*(100-player.accurate_crosses_percent)/100,
					forward_passes_won_90: player.forward_passes_avg*player.successful_forward_passes_percent/100,
					forward_passes_lost_90: player.forward_passes_avg*(100-player.successful_forward_passes_percent)/100,
					back_passes_won_90: player.back_passes_avg*player.successful_back_passes_percent/100,
					back_passes_lost_90: player.back_passes_avg*(100-player.successful_back_passes_percent)/100,
					throught_passes_won_90: player.through_passes_avg*player.successful_through_passes_percent/100,
					through_passes_lost_90: player.through_passes_avg*(100-player.successful_through_passes_percent)/100,
					long_passes_won_90: player.long_passes_avg*player.successful_long_passes_percent/100,
					long_passes_lost_90: player.long_passes_avg*(100-player.successful_long_passes_percent)/100,
					aerial_duels_won_90: player.aerial_duels_avg*player.aerial_duels_won/100,
					aerial_duels_lost_90: player.aerial_duels_avg*(100-player.aerial_duels_won)/100,
					field_aerial_won_90: player.field_aerial_duels_avg*player.field_aerial_duels_won/100,
					field_aerial_lost_90: player.field_aerial_duels_avg*(100-player.field_aerial_duels_won)/100,
					'player-stage':'PROCESSED'
				}
			},function(err, data){
				console.log('UPDATE Done: '+ data);
			});
			
			
		}
			
		});
		

	

	};
	
	this.getPlayerCount=function(query,callback){
		this.db.collection('t_player').count(query,function(err,count){
			callback(count);
		});
		
	}
	
	this.getPlayerMax=function(query,callback){
		var quer = [
{
    $group:
      {
        _id:{league:"$domestic_competition_name" , area: "$domestic_competition_area_name"} ,
matches_played_for_national_team: { $max: "$matches_played_for_national_team" },
total_matches: { $max: "$total_matches" },
matches_in_start: { $max: "$matches_in_start" },
matches_substituted: { $max: "$matches_substituted" },
matches_coming_off: { $max: "$matches_coming_off" },
matches_played_percent: { $max: "$matches_played_percent" },
minutes_on_field: { $max: "$minutes_on_field" },
minutes_tagged: { $max: "$minutes_tagged" },
minutes_played_percent: { $max: "$minutes_played_percent" },
duels_avg: { $max: "$duels_avg" },
duels_won: { $max: "$duels_won" },
duels_won_90: { $max: "$duels_won_90" },
duels_lost_90:{ $max: "$duels_lost_90" },
shots_ontarget_90: { $max: "$shots_ontarget_90" },
shots_offtarhet_90:{ $max: "$shots_offtarhet_90" },
head_shot_won_90:{ $max: "$head_shot_won_90" },
head_shot_lost_90:{ $max: "$head_shot_lost_90" },
key_pass_won_90:{ $max: "$key_pass_won_90" },
key_pass_lost_90:{ $max: "$key_pass_lost_90" },
vertical_passes_won_90:{ $max: "$vertical_passes_won_90" },
gk_areial_duel_won_90:{ $max: "$gk_areial_duel_won_90" },
gk_areial_duel_loss_90:{ $max: "$gk_areial_duel_loss_90" },
vertical_passes_lost_90:{ $max: "$vertical_passes_lost_90" },
defensive_duels_avg: { $max: "$defensive_duels_avg" },
defensive_duels_won: { $max: "$defensive_duels_won" },
offensive_duels_avg: { $max: "$offensive_duels_avg" },
offensive_duels_won: { $max: "$offensive_duels_won" },
aerial_duels_avg: { $max: "$aerial_duels_avg" },
aerial_duels_won: { $max: "$aerial_duels_won" },
fouls_avg: { $max: "$fouls_avg" },
fouls_of_team_percent: { $max: "$fouls_of_team_percent" },
goals: { $max: "$goals" },
goals_tagged: { $max: "$goals_tagged" },
goals_avg: { $max: "$goals_avg" },
goals_wilson: { $max: "$goals_wilson" },
head_goals: { $max: "$head_goals" },
head_goals_avg: { $max: "$head_goals_avg" },
assists: { $max: "$assists" },
assists_avg: { $max: "$assists_avg" },
passes_avg: { $max: "$passes_avg" },
passes_of_team_percent: { $max: "$passes_of_team_percent" },
accurate_passes_percent: { $max: "$accurate_passes_percent" },
passes_wilson: { $max: "$passes_wilson" },
pass_to_penalty_area_avg: { $max: "$pass_to_penalty_area_avg" },
accurate_pass_to_penalty_area_percent: { $max: "$accurate_pass_to_penalty_area_percent" },
short_medium_pass_avg: { $max: "$short_medium_pass_avg" },
accurate_short_medium_pass_percent: { $max: "$accurate_short_medium_pass_percent" },
smart_passes_avg: { $max: "$smart_passes_avg" },
smart_passes_of_team_percent: { $max: "$smart_passes_of_team_percent" },
accurate_smart_passes_percent: { $max: "$accurate_smart_passes_percent" },
passes_to_final_third_avg: { $max: "$passes_to_final_third_avg" },
accurate_passes_to_final_third_percent: { $max: "$accurate_passes_to_final_third_percent" },
crosses_avg: { $max: "$crosses_avg" },
accurate_crosses_percent: { $max: "$accurate_crosses_percent" },
crosses_wilson: { $max: "$crosses_wilson" },
dribbles_avg: { $max: "$dribbles_avg" },
successful_dribbles_percent: { $max: "$successful_dribbles_percent" },
dribbles_wilson: { $max: "$dribbles_wilson" },
shots: { $max: "$shots" },
shots_avg: { $max: "$shots_avg" },
shots_on_target_percent: { $max: "$shots_on_target_percent" },
shots_wilson: { $max: "$shots_wilson" },
shot_to_near_corner_avg: { $max: "$shot_to_near_corner_avg" },
shot_to_near_corner_on_target_percent: { $max: "$shot_to_near_corner_on_target_percent" },
shot_to_far_corner_avg: { $max: "$shot_to_far_corner_avg" },
shot_to_far_corner_on_target_percent: { $max: "$shot_to_far_corner_on_target_percent" },
head_shots: { $max: "$head_shots" },
head_shots_avg: { $max: "$head_shots_avg" },
head_shots_on_target_percent: { $max: "$head_shots_on_target_percent" },
goal_conversion_percent: { $max: "$goal_conversion_percent" },
interceptions_avg: { $max: "$interceptions_avg" },
successful_defensive_actions_avg: { $max: "$successful_defensive_actions_avg" },
yellow_cards: { $max: "$yellow_cards" },
red_cards: { $max: "$red_cards" },
direct_red_cards: { $max: "$direct_red_cards" },
yellow_cards_avg: { $max: "$yellow_cards_avg" },
red_cards_avg: { $max: "$red_cards_avg" },
direct_red_cards_avg: { $max: "$direct_red_cards_avg" },
yellow_cards_per_foul: { $max: "$yellow_cards_per_foul" },
successful_attacking_actions_avg: { $max: "$successful_attacking_actions_avg" },
free_kicks_taken_avg: { $max: "$free_kicks_taken_avg" },
free_kicks_of_team_percent: { $max: "$free_kicks_of_team_percent" },
direct_free_kicks_taken_avg: { $max: "$direct_free_kicks_taken_avg" },
direct_free_kicks_on_target_percent: { $max: "$direct_free_kicks_on_target_percent" },
corners_taken_avg: { $max: "$corners_taken_avg" },
penalties_taken: { $max: "$penalties_taken" },
penalties_taken_avg: { $max: "$penalties_taken_avg" },
penalties_conversion_percent: { $max: "$penalties_conversion_percent" },
market_value: { $max: "$market_value" },
clean_sheets: { $max: "$clean_sheets" },
conceded_goals: { $max: "$conceded_goals" },
conceded_goals_avg: { $max: "$conceded_goals_avg" },
shots_against: { $max: "$shots_against" },
shots_against_avg: { $max: "$shots_against_avg" },
save_percent: { $max: "$save_percent" },
save_with_reflex_avg: { $max: "$save_with_reflex_avg" },
save_with_reflex_percent: { $max: "$save_with_reflex_percent" },
average_pass_length: { $max: "$average_pass_length" },
average_long_pass_length: { $max: "$average_long_pass_length" },
average_dribble_distance_from_opponent_goal: { $max: "$average_dribble_distance_from_opponent_goal" },
win_percent: { $max: "$win_percent" },
accelerations_avg: { $max: "$accelerations_avg" },
pressing_duels_avg: { $max: "$pressing_duels_avg" },
loose_ball_duels_avg: { $max: "$loose_ball_duels_avg" },
missed_balls_avg: { $max: "$missed_balls_avg" },
forward_passes_avg: { $max: "$forward_passes_avg" },
successful_forward_passes_percent: { $max: "$successful_forward_passes_percent" },
back_passes_avg: { $max: "$back_passes_avg" },
successful_back_passes_percent: { $max: "$successful_back_passes_percent" },
through_passes_avg: { $max: "$through_passes_avg" },
successful_through_passes_percent: { $max: "$successful_through_passes_percent" },
key_passes_avg: { $max: "$key_passes_avg" },
successful_key_passes_percent: { $max: "$successful_key_passes_percent" },
long_passes_avg: { $max: "$long_passes_avg" },
successful_long_passes_percent: { $max: "$successful_long_passes_percent" },
long_passes_of_team_percent: { $max: "$long_passes_of_team_percent" },
vertical_passes_avg: { $max: "$vertical_passes_avg" },
successful_vertical_passes_percent: { $max: "$successful_vertical_passes_percent" },
goalkeeper_exits_avg: { $max: "$goalkeeper_exits_avg" },
successful_goalkeeper_exits_percent: { $max: "$successful_goalkeeper_exits_percent" },
saves_wilson: { $max: "$saves_wilson" },
shot_assists_avg: { $max: "$shot_assists_avg" },
shot_on_goal_assists_avg: { $max: "$shot_on_goal_assists_avg" },
successful_shot_assists_percent: { $max: "$successful_shot_assists_percent" },
linkup_plays: { $max: "$linkup_plays" },
linkup_plays_avg: { $max: "$linkup_plays_avg" },
successful_linkup_plays_percent: { $max: "$successful_linkup_plays_percent" },
recoveries_avg: { $max: "$recoveries_avg" },
opponent_half_recoveries_avg: { $max: "$opponent_half_recoveries_avg" },
dangerous_opponent_half_recoveries_avg: { $max: "$dangerous_opponent_half_recoveries_avg" },
losses_avg: { $max: "$losses_avg" },
own_half_losses_avg: { $max: "$own_half_losses_avg" },
dangerous_own_half_losses_avg: { $max: "$dangerous_own_half_losses_avg" },
lost_balls_to_saa_percent: { $max: "$lost_balls_to_saa_percent" },
gk_aerial_duels_avg: { $max: "$gk_aerial_duels_avg" },
gk_aerial_duels_won: { $max: "$gk_aerial_duels_won" },
field_aerial_duels_avg: { $max: "$field_aerial_duels_avg" },
field_aerial_duels_won: { $max: "$field_aerial_duels_won" },
touch_in_box_avg: { $max: "$touch_in_box_avg" },
received_pass_avg: { $max: "$received_pass_avg" },
received_pass_of_team_percent: { $max: "$received_pass_of_team_percent" },
received_dangerous_pass_avg: { $max: "$received_dangerous_pass_avg" },
received_long_pass_avg: { $max: "$received_long_pass_avg" },
tackle_avg: { $max: "$tackle_avg" },
successful_tackle_percent: { $max: "$successful_tackle_percent" },
counterattack_interception_avg: { $max: "$counterattack_interception_avg" },
possession_adjusted_tackle: { $max: "$possession_adjusted_tackle" },
possession_adjusted_interceptions: { $max: "$possession_adjusted_interceptions" },
far_conceded_goals_avg: { $max: "$far_conceded_goals_avg" },
near_conceded_goals_avg: { $max: "$near_conceded_goals_avg" },
super_save_avg: { $max: "$super_save_avg" },
easy_conceded_goal_avg: { $max: "$easy_conceded_goal_avg" },
clearance_avg: { $max: "$clearance_avg" },
shot_block_avg: { $max: "$shot_block_avg" },
shot_block_percent: { $max: "$shot_block_percent" },
defensive_duels_won_90: { $max: "$defensive_duels_won_90" },
defensive_duels_lost_90: { $max: "$defensive_duels_lost_90" },
tackle_won_90: { $max: "$tackle_won_90" },
tackle_lost_90: { $max: "$tackle_lost_90" },
offensive_duel_won_90: { $max: "$offensive_duel_won_90" },
offensive_duel_lost_90: { $max: "$offensive_duel_lost_90" },
shot_to_near_cor_won_90: { $max: "$shot_to_near_cor_won_90" },
shot_to_near_lost_90: { $max: "$shot_to_near_lost_90" },
shot_to_far_won_90: { $max: "$shot_to_far_won_90" },
shot_to_far_lost_90: { $max: "$shot_to_far_lost_90" },
dribbles_won_90: { $max: "$dribbles_won_90" },
dribbles_lost_90: { $max: "$dribbles_lost_90" },
passes_won_90: { $max: "$passes_won_90" },
passes_lost_90: { $max: "$passes_lost_90" },
passes_to_penalty_won_90: { $max: "$passes_to_penalty_won_90" },
passes_to_penalty_lost_90: { $max: "$passes_to_penalty_lost_90" },
short_medium_pass_won_90: { $max: "$short_medium_pass_won_90" },
short_medium_pass_lost_90: { $max: "$short_medium_pass_lost_90" },
smart_pass_won_90: { $max: "$smart_pass_won_90" },
smart_pass_lost_90: { $max: "$smart_pass_lost_90" },
passes_to_final_third_won_90: { $max: "$passes_to_final_third_won_90" },
passes_to_final_third_lost_90: { $max: "$passes_to_final_third_lost_90" },
cross_won_90: { $max: "$cross_won_90" },
cross_lost_90: { $max: "$cross_lost_90" },
forward_passes_won_90: { $max: "$forward_passes_won_90" },
forward_passes_lost_90: { $max: "$forward_passes_lost_90" },
back_passes_won_90: { $max: "$back_passes_won_90" },
back_passes_lost_90: { $max: "$back_passes_lost_90" },
throught_passes_won_90: { $max: "$throught_passes_won_90" },
through_passes_lost_90: { $max: "$through_passes_lost_90" },
long_passes_won_90: { $max: "$long_passes_won_90" },
long_passes_lost_90: { $max: "$long_passes_lost_90" },
aerial_duels_won_90: { $max: "$aerial_duels_won_90" },
aerial_duels_lost_90: { $max: "$aerial_duels_lost_90" },
field_aerial_won_90: { $max: "$field_aerial_won_90" },
field_aerial_lost_90: { $max: "$field_aerial_lost_90" }

      }
  }
		            ];
			
			this.db.collection('t_player').aggregate(quer,function(err, data){
				var pageitems=[];
				data.forEach(function(dat){
					console.log(dat);
					pageitems.push(dat);
				});
				callback(pageitems);
			})
				
				     
	}
	
	this.getPlayerMaxAvg=function(query,callback){
		var quer = [
{
    $group:
      {
        _id:{league:"$domestic_competition_name" , area: "$domestic_competition_area_name"} ,
        matches_played_for_national_team: { $avg: "$matches_played_for_national_team" },
        total_matches: { $avg: "$total_matches" },
        matches_in_start: { $avg: "$matches_in_start" },
        matches_substituted: { $avg: "$matches_substituted" },
        matches_coming_off: { $avg: "$matches_coming_off" },
        matches_played_percent: { $avg: "$matches_played_percent" },
        minutes_on_field: { $avg: "$minutes_on_field" },
        minutes_tagged: { $avg: "$minutes_tagged" },
        minutes_played_percent: { $avg: "$minutes_played_percent" },
        duels_avg: { $avg: "$duels_avg" },
        duels_won: { $avg: "$duels_won" },
        duels_won_90: { $avg: "$duels_won_90" },
        duels_lost_90:{ $avg: "$duels_lost_90" },
        shots_ontarget_90: { $avg: "$shots_ontarget_90" },
        shots_offtarhet_90:{ $avg: "$shots_offtarhet_90" },
        head_shot_won_90:{ $avg: "$head_shot_won_90" },
        head_shot_lost_90:{ $avg: "$head_shot_lost_90" },
        key_pass_won_90:{ $avg: "$key_pass_won_90" },
        key_pass_lost_90:{ $avg: "$key_pass_lost_90" },
        vertical_passes_won_90:{ $avg: "$vertical_passes_won_90" },
        gk_areial_duel_won_90:{ $avg: "$gk_areial_duel_won_90" },
        gk_areial_duel_loss_90:{ $avg: "$gk_areial_duel_loss_90" },
        vertical_passes_lost_90:{ $avg: "$vertical_passes_lost_90" },
        defensive_duels_avg: { $avg: "$defensive_duels_avg" },
        defensive_duels_won: { $avg: "$defensive_duels_won" },
        offensive_duels_avg: { $avg: "$offensive_duels_avg" },
        offensive_duels_won: { $avg: "$offensive_duels_won" },
        aerial_duels_avg: { $avg: "$aerial_duels_avg" },
        aerial_duels_won: { $avg: "$aerial_duels_won" },
        fouls_avg: { $avg: "$fouls_avg" },
        fouls_of_team_percent: { $avg: "$fouls_of_team_percent" },
        goals: { $avg: "$goals" },
        goals_tagged: { $avg: "$goals_tagged" },
        goals_avg: { $avg: "$goals_avg" },
        goals_wilson: { $avg: "$goals_wilson" },
        head_goals: { $avg: "$head_goals" },
        head_goals_avg: { $avg: "$head_goals_avg" },
        assists: { $avg: "$assists" },
        assists_avg: { $avg: "$assists_avg" },
        passes_avg: { $avg: "$passes_avg" },
        passes_of_team_percent: { $avg: "$passes_of_team_percent" },
        accurate_passes_percent: { $avg: "$accurate_passes_percent" },
        passes_wilson: { $avg: "$passes_wilson" },
        pass_to_penalty_area_avg: { $avg: "$pass_to_penalty_area_avg" },
        accurate_pass_to_penalty_area_percent: { $avg: "$accurate_pass_to_penalty_area_percent" },
        short_medium_pass_avg: { $avg: "$short_medium_pass_avg" },
        accurate_short_medium_pass_percent: { $avg: "$accurate_short_medium_pass_percent" },
        smart_passes_avg: { $avg: "$smart_passes_avg" },
        smart_passes_of_team_percent: { $avg: "$smart_passes_of_team_percent" },
        accurate_smart_passes_percent: { $avg: "$accurate_smart_passes_percent" },
        passes_to_final_third_avg: { $avg: "$passes_to_final_third_avg" },
        accurate_passes_to_final_third_percent: { $avg: "$accurate_passes_to_final_third_percent" },
        crosses_avg: { $avg: "$crosses_avg" },
        accurate_crosses_percent: { $avg: "$accurate_crosses_percent" },
        crosses_wilson: { $avg: "$crosses_wilson" },
        dribbles_avg: { $avg: "$dribbles_avg" },
        successful_dribbles_percent: { $avg: "$successful_dribbles_percent" },
        dribbles_wilson: { $avg: "$dribbles_wilson" },
        shots: { $avg: "$shots" },
        shots_avg: { $avg: "$shots_avg" },
        shots_on_target_percent: { $avg: "$shots_on_target_percent" },
        shots_wilson: { $avg: "$shots_wilson" },
        shot_to_near_corner_avg: { $avg: "$shot_to_near_corner_avg" },
        shot_to_near_corner_on_target_percent: { $avg: "$shot_to_near_corner_on_target_percent" },
        shot_to_far_corner_avg: { $avg: "$shot_to_far_corner_avg" },
        shot_to_far_corner_on_target_percent: { $avg: "$shot_to_far_corner_on_target_percent" },
        head_shots: { $avg: "$head_shots" },
        head_shots_avg: { $avg: "$head_shots_avg" },
        head_shots_on_target_percent: { $avg: "$head_shots_on_target_percent" },
        goal_conversion_percent: { $avg: "$goal_conversion_percent" },
        interceptions_avg: { $avg: "$interceptions_avg" },
        successful_defensive_actions_avg: { $avg: "$successful_defensive_actions_avg" },
        yellow_cards: { $avg: "$yellow_cards" },
        red_cards: { $avg: "$red_cards" },
        direct_red_cards: { $avg: "$direct_red_cards" },
        yellow_cards_avg: { $avg: "$yellow_cards_avg" },
        red_cards_avg: { $avg: "$red_cards_avg" },
        direct_red_cards_avg: { $avg: "$direct_red_cards_avg" },
        yellow_cards_per_foul: { $avg: "$yellow_cards_per_foul" },
        successful_attacking_actions_avg: { $avg: "$successful_attacking_actions_avg" },
        free_kicks_taken_avg: { $avg: "$free_kicks_taken_avg" },
        free_kicks_of_team_percent: { $avg: "$free_kicks_of_team_percent" },
        direct_free_kicks_taken_avg: { $avg: "$direct_free_kicks_taken_avg" },
        direct_free_kicks_on_target_percent: { $avg: "$direct_free_kicks_on_target_percent" },
        corners_taken_avg: { $avg: "$corners_taken_avg" },
        penalties_taken: { $avg: "$penalties_taken" },
        penalties_taken_avg: { $avg: "$penalties_taken_avg" },
        penalties_conversion_percent: { $avg: "$penalties_conversion_percent" },
        market_value: { $avg: "$market_value" },
        clean_sheets: { $avg: "$clean_sheets" },
        conceded_goals: { $avg: "$conceded_goals" },
        conceded_goals_avg: { $avg: "$conceded_goals_avg" },
        shots_against: { $avg: "$shots_against" },
        shots_against_avg: { $avg: "$shots_against_avg" },
        save_percent: { $avg: "$save_percent" },
        save_with_reflex_avg: { $avg: "$save_with_reflex_avg" },
        save_with_reflex_percent: { $avg: "$save_with_reflex_percent" },
        average_pass_length: { $avg: "$average_pass_length" },
        average_long_pass_length: { $avg: "$average_long_pass_length" },
        average_dribble_distance_from_opponent_goal: { $avg: "$average_dribble_distance_from_opponent_goal" },
        win_percent: { $avg: "$win_percent" },
        accelerations_avg: { $avg: "$accelerations_avg" },
        pressing_duels_avg: { $avg: "$pressing_duels_avg" },
        loose_ball_duels_avg: { $avg: "$loose_ball_duels_avg" },
        missed_balls_avg: { $avg: "$missed_balls_avg" },
        forward_passes_avg: { $avg: "$forward_passes_avg" },
        successful_forward_passes_percent: { $avg: "$successful_forward_passes_percent" },
        back_passes_avg: { $avg: "$back_passes_avg" },
        successful_back_passes_percent: { $avg: "$successful_back_passes_percent" },
        through_passes_avg: { $avg: "$through_passes_avg" },
        successful_through_passes_percent: { $avg: "$successful_through_passes_percent" },
        key_passes_avg: { $avg: "$key_passes_avg" },
        successful_key_passes_percent: { $avg: "$successful_key_passes_percent" },
        long_passes_avg: { $avg: "$long_passes_avg" },
        successful_long_passes_percent: { $avg: "$successful_long_passes_percent" },
        long_passes_of_team_percent: { $avg: "$long_passes_of_team_percent" },
        vertical_passes_avg: { $avg: "$vertical_passes_avg" },
        successful_vertical_passes_percent: { $avg: "$successful_vertical_passes_percent" },
        goalkeeper_exits_avg: { $avg: "$goalkeeper_exits_avg" },
        successful_goalkeeper_exits_percent: { $avg: "$successful_goalkeeper_exits_percent" },
        saves_wilson: { $avg: "$saves_wilson" },
        shot_assists_avg: { $avg: "$shot_assists_avg" },
        shot_on_goal_assists_avg: { $avg: "$shot_on_goal_assists_avg" },
        successful_shot_assists_percent: { $avg: "$successful_shot_assists_percent" },
        linkup_plays: { $avg: "$linkup_plays" },
        linkup_plays_avg: { $avg: "$linkup_plays_avg" },
        successful_linkup_plays_percent: { $avg: "$successful_linkup_plays_percent" },
        recoveries_avg: { $avg: "$recoveries_avg" },
        opponent_half_recoveries_avg: { $avg: "$opponent_half_recoveries_avg" },
        dangerous_opponent_half_recoveries_avg: { $avg: "$dangerous_opponent_half_recoveries_avg" },
        losses_avg: { $avg: "$losses_avg" },
        own_half_losses_avg: { $avg: "$own_half_losses_avg" },
        dangerous_own_half_losses_avg: { $avg: "$dangerous_own_half_losses_avg" },
        lost_balls_to_saa_percent: { $avg: "$lost_balls_to_saa_percent" },
        gk_aerial_duels_avg: { $avg: "$gk_aerial_duels_avg" },
        gk_aerial_duels_won: { $avg: "$gk_aerial_duels_won" },
        field_aerial_duels_avg: { $avg: "$field_aerial_duels_avg" },
        field_aerial_duels_won: { $avg: "$field_aerial_duels_won" },
        touch_in_box_avg: { $avg: "$touch_in_box_avg" },
        received_pass_avg: { $avg: "$received_pass_avg" },
        received_pass_of_team_percent: { $avg: "$received_pass_of_team_percent" },
        received_dangerous_pass_avg: { $avg: "$received_dangerous_pass_avg" },
        received_long_pass_avg: { $avg: "$received_long_pass_avg" },
        tackle_avg: { $avg: "$tackle_avg" },
        successful_tackle_percent: { $avg: "$successful_tackle_percent" },
        counterattack_interception_avg: { $avg: "$counterattack_interception_avg" },
        possession_adjusted_tackle: { $avg: "$possession_adjusted_tackle" },
        possession_adjusted_interceptions: { $avg: "$possession_adjusted_interceptions" },
        far_conceded_goals_avg: { $avg: "$far_conceded_goals_avg" },
        near_conceded_goals_avg: { $avg: "$near_conceded_goals_avg" },
        super_save_avg: { $avg: "$super_save_avg" },
        easy_conceded_goal_avg: { $avg: "$easy_conceded_goal_avg" },
        clearance_avg: { $avg: "$clearance_avg" },
        shot_block_avg: { $avg: "$shot_block_avg" },
        shot_block_percent: { $avg: "$shot_block_percent" },
        defensive_duels_won_90: { $avg: "$defensive_duels_won_90" },
        defensive_duels_lost_90: { $avg: "$defensive_duels_lost_90" },
        tackle_won_90: { $avg: "$tackle_won_90" },
        tackle_lost_90: { $avg: "$tackle_lost_90" },
        offensive_duel_won_90: { $avg: "$offensive_duel_won_90" },
        offensive_duel_lost_90: { $avg: "$offensive_duel_lost_90" },
        shot_to_near_cor_won_90: { $avg: "$shot_to_near_cor_won_90" },
        shot_to_near_lost_90: { $avg: "$shot_to_near_lost_90" },
        shot_to_far_won_90: { $avg: "$shot_to_far_won_90" },
        shot_to_far_lost_90: { $avg: "$shot_to_far_lost_90" },
        dribbles_won_90: { $avg: "$dribbles_won_90" },
        dribbles_lost_90: { $avg: "$dribbles_lost_90" },
        passes_won_90: { $avg: "$passes_won_90" },
        passes_lost_90: { $avg: "$passes_lost_90" },
        passes_to_penalty_won_90: { $avg: "$passes_to_penalty_won_90" },
        passes_to_penalty_lost_90: { $avg: "$passes_to_penalty_lost_90" },
        short_medium_pass_won_90: { $avg: "$short_medium_pass_won_90" },
        short_medium_pass_lost_90: { $avg: "$short_medium_pass_lost_90" },
        smart_pass_won_90: { $avg: "$smart_pass_won_90" },
        smart_pass_lost_90: { $avg: "$smart_pass_lost_90" },
        passes_to_final_third_won_90: { $avg: "$passes_to_final_third_won_90" },
        passes_to_final_third_lost_90: { $avg: "$passes_to_final_third_lost_90" },
        cross_won_90: { $avg: "$cross_won_90" },
        cross_lost_90: { $avg: "$cross_lost_90" },
        forward_passes_won_90: { $avg: "$forward_passes_won_90" },
        forward_passes_lost_90: { $avg: "$forward_passes_lost_90" },
        back_passes_won_90: { $avg: "$back_passes_won_90" },
        back_passes_lost_90: { $avg: "$back_passes_lost_90" },
        throught_passes_won_90: { $avg: "$throught_passes_won_90" },
        through_passes_lost_90: { $avg: "$through_passes_lost_90" },
        long_passes_won_90: { $avg: "$long_passes_won_90" },
        long_passes_lost_90: { $avg: "$long_passes_lost_90" },
        aerial_duels_won_90: { $avg: "$aerial_duels_won_90" },
        aerial_duels_lost_90: { $avg: "$aerial_duels_lost_90" },
        field_aerial_won_90: { $avg: "$field_aerial_won_90" },
        field_aerial_lost_90: { $avg: "$field_aerial_lost_90" }

      }
  }
		            ];
			
			this.db.collection('t_player').aggregate(quer,function(err, data){
				var pageitems=[];
				data.forEach(function(dat){
					console.log(dat);
					pageitems.push(dat);
				});
				callback(pageitems);
			})
				
				     
	}
	
	this.updateAttr=function(pos,q,callback){
		this.db.collection('t_player').update({primary_position: pos},q,{multi:true});
		
		callback("done")
	}
	
	this.findAndUpdate=function(q,callback){
		var DB = this.db;
		var i=1;
		this.db.collection('t_player').find({domestic_competition_name: q._id.league, domestic_competition_area_name:q._id.area},function(err,data){
			
			data.forEach(function(dat){
				Object.keys(q).forEach(function(key){
					if(key != '_id'){
						var temp = dat[key]*q[key];
						if(temp > 20){
							temp =20;}
						else if(temp<=0.001 || temp == undefined ){
							temp = 0;
						}else if(temp > 0.001 && temp < 0.5){
							temp = 0.5;
						}
						var fin=Math.round(temp * 100) / 100;
						dat['att_'+key]=fin;
					}
				});
				DB.collection('t_player').save(dat,function(err,dato){
					console.log(i+'  '+err+'  '+dato);
					i++;
				});		
				
			})
		});
		
		callback("done")
	}
	
	this.savePlayers=function(query,callback){
		
		var docs = this.db.collection('t_player').insert(query);
		callback('DOne');

	}

}

module.exports.PlayerDAO = PlayerDAO;