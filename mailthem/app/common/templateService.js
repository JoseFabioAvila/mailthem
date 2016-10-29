'use strict';

angular.module('mailthemApp')
.service('TemplateService', function(){
    var title = "";
    var description = "";
    var content = "";
    
    return {
        getTitle: function(){
            if(title == ""){
                title = localStorage.getItem("sTitle");
            }
            return title;
        },
        setTitle: function(value){
            localStorage.setItem("sTitle",value);
            title = value;
        },
        
        
        getDescription: function(){
            if(description == ""){
                description = localStorage.getItem("sDescription");
            }
            return description;
        },
        setDescription: function(value){
            localStorage.setItem("sDescription",value);
            description = value;
        },
        
        
        getContent: function(){
            if(content == ""){
                content = localStorage.getItem("sContent");
            }
            return content;
        },
        setContent: function(value){
            localStorage.setItem("sContent",value);
            content = value;
        }
    };
});