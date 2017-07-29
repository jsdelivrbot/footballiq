printjson( db.t_player.aggregate(
   [
     {
       $group:
         {
          _id: { area:"$domestic_competition_area_name",comp:"$domestic_competition_name" }
		  }
		  },
		  {
		  $sort:
		  { "_id.area": 1 }
		  }
		  ,
		  {
		  $project:{
		  _id : "$_id"
		  }
		  }
		  ]).toArray())