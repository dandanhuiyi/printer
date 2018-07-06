var app =  new Vue({
    el:'#app',
    data:{
        message:'',
        webSocket : null,
        defaultPrinter:''
    },
    methods:
        {
            initWebSocket:function(){
                const address = "ws://localhost:13528";
                this.webSocket = new WebSocket(address);
                this.webSocket.onopen  = this.webSocketOpen;
                this.webSocket.onmessage = this.webSocketOnMessage;
                this.webSocket.onclose = this.webSocketOnClose;
                this.webSocket.onerror = this.webSocketOnError;
            },
            webSocketOpen:function(){   
                this.message = "WebSocket连接成功";
            },
            webSocketOnMessage:function(e){
                const redata = JSON.parse(e.data);
                this.message = redata;
            },
            webSocketOnClose:function(){
                this.message = "WebSocket关闭";
            },
            webSocketOnError:function(e){
                message = "WebSocket连接失败.    ";
                message += e + "";           
            },
            getUUID:function(len, radix) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length; 
                if (len) {
                  for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
                } else {
                  var r;
                  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                  uuid[14] = '4';
                  for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                      r = 0 | Math.random()*16;
                      uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                  } 
                }
                return uuid.join('');
            },
            getRequestObject:function(cmd) {
                var request  = new Object();
                request.requestID=this.getUUID(8, 16);
                request.version="1.0";
                request.cmd=cmd;
                return request;
            },
            findPrintCtrl:function(){
                var request  = this.getRequestObject("getPrinters");
                this.webSocket.send(JSON.stringify(request));
            },
            setPrinter:function(){
                var request = this.getRequestObject("getPrinterConfig");
                request.printer = "Microsoft Print to PDF";
                this.webSocket.send(JSON.stringify(request));
            },
            print:function(){
                var task ={
                    "taskID": this.getUUID(8, 16),
                    "preview": false,
                    "printer": this.defaultPrinter,
                    "previewType": "pdf",
                    "firstDocumentNumber": 10,
                    "totalDocumentCount": 100,
                    "documents": [{
                        "documentID": this.getUUID(8, 16),
                        "contents": [{
                            "data": {
                                "recipient": {
                                    "address": {
                                        "city": "杭州市",
                                        "detail": "良睦路999号乐佳国际大厦2号楼小邮局",
                                        "district": "余杭区",
                                        "province": "浙江省",
                                        "town": ""
                                    },
                                    "mobile": "13012345678",
                                    "name": "菜鸟网络",
                                    "phone": "057112345678"
                                },
                                "routingInfo": {
                                    "consolidation": {
                                        "name": "杭州",
                                        "code": "hangzhou"
                                    },
                                    "origin": {
                                        "name": "杭州",
                                        "code": "POSTB"
                                    },
                                    "sortation": {
                                        "name": "杭州"
                                    },
                                    "routeCode": "123A-456-789"
                                },
                                "sender": {
                                    "address": {
                                        "city": "杭州市",
                                        "detail": "文一西路1001号阿里巴巴淘宝城5号小邮局",
                                        "district": "余杭区",
                                        "province": "浙江省",
                                        "town": ""
                                    },
                                    "mobile": "13012345678",
                                    "name": "阿里巴巴",
                                    "phone": "057112345678"
                                },
                                "shippingOption": {
                                    "code": "COD",
                                    "services": {
                                        "SVC-COD": {
                                            "value": "200"
                                        },
                                        "TIMED-DELIVERY": {
                                            "value": "SEVERAL-DAYS"
                                        },
                                        "PAYMENT-TYPE": {
                                            "value": "ON-DELIVERY"
                                        },
                                        "SVC-INSURE": {
                                            "value": "1000000"
                                        },
                                        "SVC-PROMISE-DELIVERY": {
                                            "promise-type": "SAMEDAY_DELIVERY"
                                        }
                                    },
                                    "title": "代收货款"
                                },
                                "waybillCode": "0123456789"
                            },
                            "signature": "19d6f7759487e556ddcdd3d499af087080403277b7deed1a951cc3d9a93c42a7e22ccba94ff609976c5d3ceb069b641f541bc9906098438d362cae002dfd823a8654b2b4f655e96317d7f60eef1372bb983a4e3174cc8d321668c49068071eaea873071ed683dd24810e51afc0bc925b7a2445fdbc2034cdffb12cb4719ca6b7",
                            "templateURL": "http://cloudprint.cainiao.com/cloudprint/template/getStandardTemplate.json?template_id=101&version=4"
                        },
                        {
                            "data": {
                                "value": "测试字段值需要配合自定义区变量名"
                            },
                            "templateURL": "http://cloudprint.cainiao.com/template/customArea/440439"
                        }]
                    }]
                }

                var request = this.getRequestObject("print");
                request.task = task;
                this.webSocket.send(JSON.stringify(request));
            }
        }
})