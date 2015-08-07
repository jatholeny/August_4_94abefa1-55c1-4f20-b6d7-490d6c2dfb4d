/**
 * Created by Layric on 8/5/2015.
 */

var storeinfo = require('../module/storeinfo.js');

var Imap = require('imap'),
    inspect = require('util').inspect;
var fs = require('fs'), fileStream;


function getunreadinfo(obj){
    var unreadcount = 0;

    var imap = new Imap({
        user: obj.id,
        password: obj.pass,
        host: 'imap.gmail.com',
        port: 993,
        tls: true
    });

    function openInbox(cb) {
        imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function() {
        openInbox(function(err, box) {
            if (err) throw err;
            imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2014'] ], function(err, results) {
                if (err) throw err;
                var f = imap.fetch(results, { bodies: '' });
                f.on('message', function(msg, seqno) {
                    console.log('Message #%d', seqno);
                    unreadcount ++;
                    var prefix = '(#' + seqno + ') ';
                    msg.on('body', function(stream, info) {
                        console.log(prefix + 'Body');
                        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
                    });
                    msg.once('attributes', function(attrs) {
                        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                    });
                    msg.once('end', function() {
                        console.log(prefix + 'Finished');
                    });
                });
                f.once('error', function(err) {
                    console.log('Fetch error: ' + err);
                });
                f.once('end', function() {
                    console.log('Done fetching all messages!');
                    storeinfo.storeunreadInfo(unreadcount);
                    imap.end();
                });
            });
        });


    });


    imap.once('error', function(err) {
        console.log(err);
    });

    imap.once('end', function() {
        console.log('Connection ended');
    });

    imap.connect();


}

function getreadinfo(obj){


    var readcount = 0;


    var imap = new Imap({
        user: obj.id,
        password: obj.pass,
        host: 'imap.gmail.com',
        port: 993,
        tls: true
    });

    function openInbox(cb) {
        imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function() {
        openInbox(function(err, box) {
            if (err) throw err;
            imap.search([ 'SEEN', ['SINCE', 'May 20, 2014'] ], function(err, results) {
                if (err) throw err;
                var f = imap.fetch(results, { bodies: '' });
                f.on('message', function(msg, seqno) {
                    console.log('Message #%d', seqno);
                    readcount ++;
                    var prefix = '(#' + seqno + ') ';
                    msg.on('body', function(stream, info) {
                        console.log(prefix + 'Body');
                        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
                    });
                    msg.once('attributes', function(attrs) {
                        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                    });
                    msg.once('end', function() {
                        console.log(prefix + 'Finished');
                    });
                });
                f.once('error', function(err) {
                    console.log('Fetch error: ' + err);
                });
                f.once('end', function() {
                    console.log('Done fetching all messages!');
                    storeinfo.storereadInfo(readcount);
                    imap.end();
                });
            });
        });


    });


    imap.once('error', function(err) {
        console.log(err);
    });

    imap.once('end', function() {
        console.log('Connection ended');
    });

    imap.connect();


}

function getattachmentinfo(obj){


    var imap = new Imap({
        user: obj.id,
        password: obj.pass,
        host: 'imap.gmail.com',
        port: 993,
        tls: true
    });

    var attachment = 0;
    var total = 0;
    var attachmenttype = {};

    function openInbox(cb) {
        imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function() {
        openInbox(function(err, box) {
            if (err) throw err;
            var f = imap.seq.fetch('1:10', {
                bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
                struct: true
            });
            f.on('message', function(msg, seqno) {
                console.log('Message #%d', seqno);
                var prefix = '(#' + seqno + ') ';
                total = seqno;
                msg.on('body', function(stream, info) {
                    var buffer = '';
                    stream.on('data', function(chunk) {
                        buffer += chunk.toString('utf8');
                    });
                    stream.once('end', function() {
                        console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                    });
                });
                msg.once('attributes', function(attrs) {
                    console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                    var attr = Array.prototype.slice.call(attrs.struct);
                    attr.shift();
                    attr.shift();
                    console.log("====================below============================");

                    for(var i =0; i<attr.length; i++){
                        //attr[i][0]
                        var disposition= attr[i][0].disposition;
                        var subtype = attr[i][0].subtype;
                        if(!attachmenttype[subtype]){
                            attachmenttype[subtype] = 1;
                        }else{
                            attachmenttype[subtype] ++;
                        };
                        console.log(attachmenttype);
                        if(disposition !== null){
                            if(disposition.type==='ATTACHMENT'){
                                attachment++;
                            };
                        };
                    };
                    console.log("====================up==========================")

                });
                msg.once('end', function() {

                    console.log(prefix + 'Finished');
                });
            });
            f.once('error', function(err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function() {
                console.log('Done fetching all messages!');
                storeinfo.storeattachmenttype(attachmenttype);
                storeinfo.storetotal(total);
                storeinfo.storeattachmentInfo(attachment);
                imap.end();
            });
        });
    });

    imap.once('error', function(err) {
        console.log(err);
    });

    imap.once('end', function() {
        console.log('Connection ended');
    });

    imap.connect();
};

module.exports = {
    getInfo: function(obj){
        return getunreadinfo(obj)
    },
    getreadInfo:function(obj){
        return getreadinfo(obj)
    },
    getattachmentInfo:function(obj){
        return getattachmentinfo(obj)
    }
}
