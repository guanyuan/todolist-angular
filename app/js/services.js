'use strict';

/* Services */
Storage.prototype.setArray = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getArray = function(key) {
    return JSON.parse(this.getItem(key));
}




blogApp.service('taskStorageService', [
    function() {
        this.getTasks = function() {
            return localStorage.getArray("tasks") || new Array();
        };
        this.setTasks = function(taskList) {
            localStorage.setArray("tasks", taskList);
        };
    }
]);


blogApp.service('loginManage', [function() {
    this.islogin = false;
    this.login = function() {
        this.islogin = true;
    };
    this.logout = function() {
        this.islogin = false;
    }
}]);