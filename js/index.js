window.onload = function() {
        opacity();
        timeBack();
        effect();
        active()
    }
    // 搜索框透明度变化
function opacity() {
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    var search = document.querySelector(".jd_search");
    window.onscroll = function() {
        // 兼容性处理
        var offsetTop = document.body.scrollTop || document.documentElementscrollTop || window.pageYOffset;
        var opacity = 0;
        // 滚动距离小于banner盒子高度时触发
        if (offsetTop < bannerHeight) {
            opacity = offsetTop / bannerHeight;
            search.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
            console.log(offsetTop);
            console.log(bannerHeight);


        }
    }
}
// 倒计时

function timeBack() {
    // 获取展示时间的li
    var jd_sktop = document.querySelector(".jd_sktop");
    var ul = jd_sktop.querySelector("ul:first-of-type");
    var lis = ul.querySelectorAll('li');
    // 设置倒计时时间
    var totalTime = 3700;
    // 开启定时器
    var timeID = setInterval(function() {
        totalTime--;
        if (totalTime < 0) {
            clearInterval(timeID);
            return;
        } else {
            // 计算时分秒 Math.floor 取整
            var hour = Math.floor(totalTime / 3600);
            var minute = Math.floor(totalTime % 3600 / 60);
            var second = Math.floor(totalTime % 60);
            // 赋值
            lis[2].innerHTML = Math.floor(hour / 10);
            lis[3].innerHTML = Math.floor(hour % 10);
            lis[5].innerHTML = Math.floor(minute / 10);
            lis[6].innerHTML = Math.floor(minute % 10);
            lis[8].innerHTML = Math.floor(second / 10);
            lis[9].innerHTML = Math.floor(second % 10);
        }
    }, 1000)
}

//轮播图
function effect() {
    // 获取轮播图结构
    var banner = document.querySelector('.jd_banner');
    // 获取图片容器
    var imgBox = banner.querySelector("ul:first-of-type");
    // 获取第一张图
    var first = imgBox.querySelector("li:first-of-type");
    // 获取最后一张图
    var last = imgBox.querySelector("li:last-of-type");
    //在首尾插入图片
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

    // 设置对应的样式
    // 获取所有的li
    var lis = imgBox.querySelectorAll('li');
    // 获取li的个数
    var count = lis.length;
    // 获取banner的宽度
    var bannerWidth = banner.offsetWidth;
    //设置图片盒子的宽度
    imgBox.style.width = count * bannerWidth + "px";
    // 设置每个图片li的宽度
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = bannerWidth + 'px';
    }
    // 定义一个索引
    var index = 1;
    //设置默认的偏移
    imgBox.style.left = -bannerWidth + "px";

    // 小圆点切换
    var setIndicator = function(index) {
        var indicators = banner.querySelector("ul:last-of-type").querySelectorAll("li");
        //清除其他li元素的active样式
        for (var i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove("active");
        }
        indicators[index - 1].classList.add("active");
    }



    // 定时器轮播
    var timerId;
    var startTime = function() {
        timerId = setInterval(function() {
            // 索引自增
            index++
            // 设置偏移
            imgBox.style.left = -index * bannerWidth + "px";
            // 添加过渡效果
            imgBox.style.transition = "left 0.5s ease-in-out";
            setTimeout(function() {
                if (index == count - 1) {
                    index = 1;
                    imgBox.style.transition = "none";
                    imgBox.style.left = -bannerWidth + "px";
                }
            }, 500)
        }, 2000)
    }
    startTime();


    // 手动轮播
    var startX, moveX, result;
    // 触摸开始
    var isEnd = true;
    imgBox.addEventListener("touchstart", function(e) {
        clearInterval(timerId);
        startX = e.targetTouches[0].clientX;
    });
    // 触摸移动
    imgBox.addEventListener("touchmove", function(e) {
            if (isEnd == true) {
                moveX = e.targetTouches[0].clientX;
                result = moveX - startX;
                imgBox.style.transition = "none";
                imgBox.style.left = (-index * bannerWidth + result) + "px";
            }
        })
        // 结束触摸
    imgBox.addEventListener("touchend", function(e) {
            isEnd = false;
            if (Math.abs(result) > 100) {
                if (result > 0) {
                    // 上一张
                    index--;
                } else {
                    // 下一张
                    index++;
                }
                imgBox.style.transition = "left 0.5s ease-in-out";
                imgBox.style.left = -index * bannerWidth + "px";
            } else if (Math.abs(result) > 0) {

                imgBox.style.transition = "left 0.5s ease-in-out";
                imgBox.style.left = -index * bannerWidth + "px";
            }
            startX = 0;
            moveX = 0;
            result = 0;
        })
        // 事件结束后 webkitTransitionEnd 可以监听当前元素的过渡效果执行完毕
        // 当一个元素的过渡效果执行完毕时 会触发该事件
    imgBox.addEventListener("webkitTransitionEnd", function() {
        if (index == 0) {
            index = count - 2;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + "px";

        } else if (index == count - 1) {
            index = 1;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + "px";
        }
        // 设置标记
        setIndicator(index);
        setTimeout(function() {
            isEnd = true;
            clearInterval(timerId);
            startTime();
        }, 100);
    })
}