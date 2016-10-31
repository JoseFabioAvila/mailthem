'use strict';

//Service that help with sending mail, this service have the id of template to be send
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