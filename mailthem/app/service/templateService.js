'use strict';

angular.module('mailthemApp')
.service('TemplateService', function(){
    var id = "";
    
    return {
        getTemplateId: function(){
            if(id == ""){
                id = localStorage.getItem("id");
            }
            return id;
        },
        setTemplateId: function(value){
            localStorage.setItem("id",value);
            id = value;
        }
    };
});