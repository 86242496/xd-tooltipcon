!(function ($, window, document, undefined) {
    var Dimension = 'width', Position = 'right', Display = 'display', document = $(document), documentWidth = $(document).width();
    function xdToolTips(ele, options) {
        //默认参数设置
        this.defaults = {
            callback: function () { }
        };
        //合并传入的参数
        this.options = $.extend({}, this.defaults, options || {});
        //标记当前对象
        this.$ele = ele;
        //执行初始化操作
        this.init();

    }
    xdToolTips.prototype = {
        init: function () {
            //初始化操作
            this.getPosition();
        },
        // 获取当前元素垂直高度和水平高度
        getPosition: function () {
            var _this = this;
            this.$ele.on('click', function () {
                if ($('.xd-tooltips').length > 0) {
                    $(".xd-tooltips").remove();
                    return;
                }
                var LEFT = $(this).offset().left;
                var TOP = $(this).offset().top + 48;
                var ARROW = '';//向上或者向下箭头
                var ARROWLEFT = '';//箭头位置，在左边时，简单居左，在中间时，箭头居于元素的中间

                // 当距离左边小于按钮一半的宽度时，刚居右显示
                if (LEFT < 210 - 39) {
                    LEFT = LEFT;
                    ARROWLEFT = 30;
                } else {
                    LEFT = LEFT + 35 - 420 / 2
                }
                // 当按钮在页面底部时，向上生成元素
                if (TOP + 48 >= document.height()) {
                   
                    if ($(this).offset().left + 29 >210) {
                        ARROWLEFT = '';
                    } else {
                        ARROWLEFT = 30;
                    }
                    TOP = TOP - 60 - 48;
                    ARROW = '<span class="arrow-bottom" style="left:' + ARROWLEFT + 'px"></span>';
                } else {

                    ARROW = '<span class="arrow-top" style="left:' + ARROWLEFT + 'px"></span>';
                }

                $('body').append(_this.popHtml(LEFT, TOP, ARROW));
                _this.handleButtons();
                _this.closeThis();
            })

        },
        popHtml: function (left, top, arrowstr) {
            return '<div class="xd-tooltips" style="left:' + left + 'px;top:' + top + 'px"><div style="position:relative">' +
                '<button class="xd-buttons xd-button-highlight">单选题</button>' +
                '<button class="xd-buttons xd-button-highlight">多选题</button>' +
                '<button class="xd-buttons xd-button-highlight">填空题</button>' +
                '<button class="xd-buttons xd-button-highlight">简答题</button>' +
                '<button class="xd-buttons xd-button-highlight">判断题</button>' +
                arrowstr +
                '</div></div>';
        },
        handleButtons: function () {
            var _this = this;
            $('.xd-tooltips').find('.xd-buttons').on('click', function () {
                _this.options.callback($(this).index())
            })
        },
        // 点击添加或者生成的按钮之外的区域时，移除生成的部分
        closeThis: function () {
            document.on('click', function (e) {
                if (!$(e.target).closest('.xd-tooltipcon,.xd-tooltips').length) {
                   
                    $(".xd-tooltips").remove();
                }
            })
        },
        // 提示框
        toast: function () {
            $('body').append('<div class="splittoast">类型错误</div>');
        },
        isEmpty: function (obj) {
            if (obj == '' || obj == null || obj == undefined) {
                return true;
            }
            return false;
        },
        otherFn: function () {
            //定义可调用方法

            return this.$ele;//返回当前对象供链式调用
        }
    }
    $.fn.xdToolTips = function (options) {
        return new xdToolTips(this, options);
    };
})(jQuery, window, document);
