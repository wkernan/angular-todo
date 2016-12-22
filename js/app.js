"use strict";

var App = angular.module("todo", ["xeditable"]);

App.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

App.controller("TodoCtrl", function ($scope) {
	$scope.editing = false;
	$scope.init = function() {
		$scope.model = JSON.parse(localStorage.getItem('models')) || [];
		$scope.show = "All";
		$scope.currentShow = 0;
	};

	$scope.addTodo = function() {
		if($scope.newTodo) {
			$scope.model.push({name: $scope.newTodo, list: []});
			$scope.newTodo = "";
		}
	};

	$scope.changeTodo = function(e) {
		$scope.currentShow = e;
	};

	$scope.deleteTodo = function(index) {
		$scope.model.splice(index, 1);
	};

	$scope.findPercent = function(index) {
		var count = 0;
		for(var i=0; i<index.length; i++) {
			if (index[i].isDone) {
				count++;
			}
		}
		return (count/index.length)*100;
	}

	$scope.addItem = function(index) {
		if(this.newItem) {
			$scope.model[$scope.currentShow].list.push({item: this.newItem, isDone: false});
			this.newItem = "";
		};
	};

	$scope.loop = function() {
		var count = 0;
		for(var i=0;i<$scope.model[$index].list.length;i++) {
			if($scope.model[$index].list[i].isdone) {
				count++;
			}
		}
	}

	$scope.deleteItem = function(index) {
		$scope.model[$scope.currentShow].list.splice(index, 1);
	};

	$scope.showItem = function(todo) {
		if ($scope.show === "All") {
			return true;
		}else if(todo.isDone && $scope.show === "Complete"){
			return true;
		}else if(!todo.isDone && $scope.show === "Incomplete"){
			return true;
		}else{
			return false;
		}
	};

	$scope.$watch("model",function (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorage.setItem("models",angular.toJson(newVal));
		}
	},true);
})