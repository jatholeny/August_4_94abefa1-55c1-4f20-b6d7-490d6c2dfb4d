/**
 * Created by Layric on 8/6/2015.
 */


document.addEventListener('DOMContentLoaded', function () {

    var btn = document.querySelector('button');
    btn.addEventListener('click', function () {
        var allemaildata;
        var readandunread = [];
        var attachmentnumber = [];
        var attachmentalltype =[];

        // make an ajax call and upload the data ...
            var xhr = new XMLHttpRequest();
            xhr.open('get', '/read');
            xhr.addEventListener('readystatechange', function () {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    console.log("================");
                    allemaildata = JSON.parse(xhr.responseText);
                    for(ele in allemaildata){
                        if(ele === "readnumber" || ele === "unreadnumber" ){
                            readandunread.push({name:ele,y:allemaildata[ele]});

                        }else if(ele === "attachment" || ele === "total"){
                            attachmentnumber.push({name:ele,y:allemaildata[ele]});
                        }else if(ele === "attachmenttype"){
                            var obj = allemaildata[ele]
                            for (ele in obj){
                                attachmentalltype.push({name:ele,y:obj[ele]});

                            };
                        };
                    };


                        $('#container').highcharts({
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie'
                            },
                            title: {
                                text: 'Read email and Unread email'
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                        }
                                    }
                                }
                            },
                            series: [{
                                name: "Brands",
                                colorByPoint: true,
                                data: readandunread
                            }]

                        });
                        $('#container2').highcharts({
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie'
                            },
                            title: {
                                text: 'With or Without attachment'
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                        }
                                    }
                                }
                            },
                            series: [{
                                name: "Brands",
                                colorByPoint: true,
                                data: attachmentnumber
                            }]
                        });

                        $('#container3').highcharts({
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie'
                            },
                            title: {
                                text: 'Attachment type'
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                        }
                                    }
                                }
                            },
                            series: [{
                                name: "Brands",
                                colorByPoint: true,
                                data:attachmentalltype
                            }]
                        });







                };






            });
            xhr.send();


    });
});

