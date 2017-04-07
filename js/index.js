/**
 * ITCAST WEB
 * Created by zhousg on 2016/9/19.
 */
$(function(){
    /*动态响应式轮播图*/
    banner();
    /*产品页签*/
    initTabs();
    /*初始化提示工具*/
    $('[data-toggle="tooltip"]').tooltip();
});
/*动态响应式轮播图*/
function banner(){
    /*
    * 1.准备  模拟  后台  数据  （在页面当中模拟  json对象）
    *
    * 2.动态渲染
    * 2.1 需要把后台数据转化成html结构  （动态创建dom元素  js字符串拼接  underscore.template模版方法 ）
    * 2.2 需要去判断当前的设备是  移动端还是非移动端 （判断设备的宽度就可以了 768px）
    * 2.3 转好html结构 渲染在html页面当中 （innerHTML append html）
    *
    * 3.模拟多重终端
    * 3.1当页面尺寸发生改变的时候  重新渲染 (监听页面尺寸发生改变事件  resize)
    * */

    /*1.准备数据 */
    var data = [
        {
            mImg:'images/slide_01_640x340.jpg',
            pcImg:'images/slide_01_2000x410.jpg'
        },
        {
            mImg:'images/slide_02_640x340.jpg',
            pcImg:'images/slide_02_2000x410.jpg'
        },
        {
            mImg:'images/slide_03_640x340.jpg',
            pcImg:'images/slide_03_2000x410.jpg'
        },
        {
            mImg:'images/slide_04_640x340.jpg',
            pcImg:'images/slide_04_2000x410.jpg'
        }
    ];

    /*2.动态渲染*/
    var renderHtml = function(){
        /*
         * 2.2 需要去判断当前的设备是  移动端还是非移动端 （判断设备的宽度就可以了 768px）
         * * 2.1 需要把后台数据转化成html结构  （动态创建dom元素  js字符串拼接  underscore.template模版方法 ）
         * 2.3 转好html结构 渲染在html页面当中 （innerHTML append html）
        * */

        /*2.2 需要去判断当前的设备是*/
        /*窗口宽度*/
        var width = $(window).width();
        /*是不是移动端*/
        var isMobile = width > 768 ? false : true;

        /*2.1 需要把后台数据转化成html结构  */
        var templatePointContent = $('#point_template').html();
        var templateImageContent = $('#image_template').html();

        var pointFuc = _.template(templatePointContent);
        var imageFuc = _.template(templateImageContent);

        var pointHtml = pointFuc({list:data});
        var imageHtml = imageFuc({list:data,isM:isMobile});

        //console.log(pointHtml);
        //console.log(imageHtml);

        /* 2.3 转好html结构 渲染在html页面当中*/
        //$('.carousel-indicators').html(pointHtml);
        $('.carousel-indicators').html(_.template($('#point_template').html())({list:data}));
        $('.carousel-inner').html(imageHtml);

    }

    /*3.模拟多重终端*/
    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');

    /*4.移动端手势滑动*/
    /*轮播图初始化*/
    /*$('.carousel').carousel({
        interval: 1000
    });*/
    var startX = 0;
    var moveX =0;
    var distanceX = 0;
    var isMove = false;

    $('.wjs_banner')
        .on('touchstart',function(e){
            /*jquery originalEvent 是用来装移动端事件对象*/
            startX = e.originalEvent.touches[0].clientX;
        })
        .on('touchmove',function(e){
            moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX - startX;
            isMove = true;
        })
        .on('touchend',function(e){
            /*手势滑动的条件*/
            /*
            * 1.滑动过
            * 2.滑动的距离要超过多少 50px
            * */
            if(isMove && Math.abs(distanceX) > 50){
                /*怎么样判断方向*/
                if(distanceX>0){
                    /*上一张*/
                    $('.carousel').carousel('prev');
                }else{
                    /*下一张*/
                    $('.carousel').carousel('next');
                }
            }

            /*重置*/
            startX = 0,moveX =0, distanceX = 0,isMove = false;
        })

}

/*初始化页签页*/
function initTabs(){
    /*
    * 1.添加一个父容器 自适应宽度 溢出隐藏
    * 2.需要子容器  宽度足够  并且能滑动显示
    * 3.获取所有页签的宽度只和 才能保证
    * 4.使用滑动组件
    * */

    /*父容器 */
    var parent = $('.nav-tabs-parent');
    /*子容器*/
    var child = parent.find('ul');
    /*所有的页签*/
    var lis = child.find('li');

    /*计算ul的宽度  = 所有li的宽度只和*/
    var width = 0;

    $.each(lis,function(){
        width += $(this).outerWidth(true);
    });

    /*把宽度设置在子容器上*/
    console.log(width);
    child.width(width);

    /*初始化滑动组件*/
    itcast.iScroll({
        swipeDom:parent.get(0),
        swipeType:'x',
        swipeDistance:50
    });
}
