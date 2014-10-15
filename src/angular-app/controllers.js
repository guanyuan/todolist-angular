'use strict';

/* Controllers */


blogApp.controller('loginCtrl', ['$scope', 'loginManage', 
    function($scope, loginManage) {
        $scope.username = "admin";
        $scope.password = "admin";
        $scope.verify = function() {
            if ($scope.user === $scope.username && $scope.password === $scope.code) {
                loginManage.login();
            } else {
                $scope.user = '';
                $scope.code = '';
                alert("Please try again.");
            }
        }
    }
]);

blogApp.controller('blogListCtrl', ['$scope', '$http', 'loginManage', 
    function($scope, $http, loginManage) {
        $scope.logout = function() {
            loginManage.logout();
        }
        if (loginManage.islogin) {
            $http.get("/assets/data/blogList.json").success(function(data) {
                $scope.blogList = data;
            });
        }
        else {
            $scope.logout();
        }
    }
]);

blogApp.controller('gtdCtrl', ['$scope', 'taskStorageService',
    function($scope, taskStorageService) {
        $scope.taskList = taskStorageService.getTasks();
        $scope.add = function() {
            $scope.taskList.push({
                "description": $scope.newTask,
                "status": "new"
            });
            $scope.newTask = '';
            taskStorageService.setTasks($scope.taskList);
        };

        $scope.delete = function(index) {
            $scope.taskList.splice(index, 1);
            taskStorageService.setTasks($scope.taskList);
        };
        $scope.check = function(index) {
            $scope.taskList[index].status = "completed";
            taskStorageService.setTasks($scope.taskList);
        };

    }
]);
