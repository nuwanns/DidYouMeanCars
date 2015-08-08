(function(atomEventReader){

    var Q = require('q'),
        _ = require('underscore'),
        http = require('http'),
        url = require('url'),
        events = [],

        getEventsFromStream = function(streamHeadUrl, callback){
            events = [];
            readPage(streamHeadUrl, callback);
        },

        readPage = function(pageUrl, callback){
            if(!pageUrl){
                callback(events);
            }
            else{
                qHttpGet(pageUrl).then(function(response){
                    var streamData = '';
                    response.on('data', function(data){
                        streamData += data;
                    });
                    response.on('end', function(){
                        if (streamData) {
                            var parsedData = JSON.parse(streamData);
                            var next = processEvents(parsedData, events);
                            var previousPageUrl = getFeedLink(parsedData.links, 'next');
                            readPage(previousPageUrl, callback);
                        } else {
                            callback(events);
                        }
                    });
                })
            }
        },

        qHttpGet = function (pageUrl) {
            var options = url.parse(pageUrl);
            options.path = options.path + '?embed=content';
            options.headers = {'accept': 'application/vnd.eventstore.atom+json'};
            var deferred = Q.defer();
            http.get(options, deferred.resolve);
            return deferred.promise;
        },

        processEvents = function(data, events){
            if (data.entries) {
                for (var i = 0, n = data.entries.length; i < n; i += 1) {
                    var event = data.entries[i].content;
                    if (event)
                        events.unshift( event);
                }
            }
        },

        getFeedLink = function(links, linkRel) {
            var matchingList = _.filter(links, function(link) {
                return link.relation === linkRel;
            });
            return matchingList.length ? matchingList[0].uri : null;
        };

    atomEventReader.getEventsFromStream = getEventsFromStream;

})(module.exports);



