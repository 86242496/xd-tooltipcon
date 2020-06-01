# xd-tooltipcon
基于xd-buttons样式的弹出层
<h3>1.触发元素上需添加 .xd-tooltipcon(必须)</h3>
<h3>2.调用方法</h3>
<code>
$('.xd-tooltipcon').xdToolTips({
        callback:function(resp){
            console.log(resp,'resp')
        }
    })
</code>
<h3>3.返回值说明</h3>

返回值为0时，单选题<br>
返回值为1时，多选题<br>
返回值为2时，填空题<br>
返回值为3时，简答题<br>
返回值为4时，判断题<br>

