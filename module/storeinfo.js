/**
 * Created by Layric on 8/5/2015.
 */
var unreadnumber;
var readnumber;
var attachment;
var total;
var attachmenttype;



module.exports = {

    storeunreadInfo: function(info){
        unreadnumber = info;
        console.log("There are ----",unreadnumber,"-----number of unread eamils");

    },
    storereadInfo:function(info){
        readnumber = info;
        console.log("There are ----",readnumber,"-----number of read eamils");

    },
    storeattachmentInfo: function(info){
        attachment = info;
        console.log("There are ----",attachment,"-----number of unread eamils");
    },
    storetotal:function(info){
        total = info;
    },
    storeattachmenttype:function(info){
        attachmenttype = info;
        console.log("Attachment type",attachmenttype,"=====================");
    },
    getunreadnumber : function(){
        return unreadnumber
    },
    getreadnumber : function(){
        return readnumber
    },

    getattachmentnumber : function(){
        return attachment;
    },
    gettotalnumber:function(){
        return total;

    },
    getattachmenttype:function(info){
        return attachmenttype;
    }



}
