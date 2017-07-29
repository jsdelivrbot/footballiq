var app = angular.module('login', []);

app.controller('logincontroller', ["$scope","$http","$location", function ($scope,$http,$location) {
	$scope.uname='';
	$scope.pass='';
	$scope.login = function(){
		var data={
				uname : $scope.uname,
				pass : $scope.pass
		}
		$http.post('/userservice/login',data).then( function(response) {
			if(response.data=="Success"){
				window.location.href="/home";
			}
			else{
				$scope.error="Invalid Username/Password";
			}
			console.log(response);
		});
	}
	$scope.register = function(){
		if($scope.email==null|| $scope.passw==null ||$scope.name==null){
			$scope.succ="";
			$scope.errorr="Complete the form";
		}
		else if($scope.passw!=$scope.passwc){
			$scope.succ="";
		}
		else{
			var data={
					email : $scope.email,
					pass : $scope.passw,
					name : $scope.name
			}
			$http.post('/userservice/register',data).then( function(response) {
				if(response.data=="SUCCESS"){
					$scope.errorr="";
					$scope.succ="Successfully Registered";
					
				}else if(response.data=="DupError"){
					$scope.succ=""
					$scope.errorr="Username is already Used Please use a different one";
				}
				else{
					$scope.succ="";
					$scope.errorr="Complete the form";
				}
				console.log(response);
			});
		}
		
		
	}
	
	
}]);