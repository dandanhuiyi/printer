var LODOP;
var app =  new Vue({
    el:'#app',
    data:{
        template:'',
        webSocket : null,
        defaultPrinter:'',
        encodeTemplate:''
    },
    methods:
        {
            setTemplate:function(){
                LODOP.PRINT_INIT('test')
                LODOP.ADD_PRINT_TEXT(0,0,100,20,"文本内容一");
                LODOP.SET_SHOW_MODE('DESIGN_BROWSE',1);
                LODOP.PRINT_DESIGN();  
                
            },
            getTemplates:function() {	
                that = this;
                if (LODOP.CVERSION) LODOP.On_Return=function(TaskID,Value){
                    that.template = Value;
                };	
                LODOP.GET_VALUE("ProgramData",0);	//获得文档式模板        
            },
            printView:function(){
                LODOP.ADD_PRINT_DATA("ProgramData",this.template)
                LODOP.SET_PRINT_STYLEA("jj_xm","CONTENT","张三");
                LODOP.SET_PRINT_STYLEA("jj_dz","CONTENT","北京昌平昌盛路XX号");
                LODOP.SET_PRINT_STYLEA("jj_dh","CONTENT","18612345678");
                LODOP.SET_PRINT_STYLEA("sj_xm","CONTENT","李四");
                LODOP.SET_PRINT_STYLEA("sj_dz","CONTENT","山东泰安市泰山区青年路28号银泰大厦");
                LODOP.SET_PRINT_STYLEA("sj_dh","CONTENT","15612345678");
                LODOP.PREVIEW();
            },
            print:function(){
                LODOP.ADD_PRINT_DATA("ProgramData",this.template)
                LODOP.SET_PRINT_STYLEA("jj_xm","CONTENT","张三");
                LODOP.SET_PRINT_STYLEA("jj_dz","CONTENT","北京昌平昌盛路XX号");
                LODOP.SET_PRINT_STYLEA("jj_dh","CONTENT","18612345678");
                LODOP.SET_PRINT_STYLEA("sj_xm","CONTENT","李四");
                LODOP.SET_PRINT_STYLEA("sj_dz","CONTENT","山东泰安市泰山区青年路28号银泰大厦");
                LODOP.SET_PRINT_STYLEA("sj_dh","CONTENT","15612345678");
                LODOP.PRINT();
            }
        }   
})