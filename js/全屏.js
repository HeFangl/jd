window.onload = function() {
    // 获取ul盒子
    var contentLeft = document.querySelector(".ct_contentLeft");
    var ulBox = contentLeft.querySelector("ul:first-of-type");
    /*获取所有li元素*/
    var lis = ulBox.querySelectorAll("li");
    // left盒子高度
    var contentHeight = contentLeft.offsetHeight;
    // ul 高度
    var ulHeight = ulBox.offsetHeight;
    // 最大top值
    var maxTop = 0;
    // 最小top值
    var minTop = contentHeight - ulHeight;
    // 最大回弹值
    var bounceMax = maxTop + 100;
    // 最小回弹值
    var bounceMin = minTop - 100;
    console.log(contentHeight);
    console.log(ulHeight);


    console.log(bounceMax + ".----." + bounceMin)

    // 记录移动触发坐标
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var currentY = 0;

    // 触摸时位置
    ulBox.addEventListener("touchstart", function(e) {
            startY = e.targetTouches[0].clientY;

        })
        // 触摸移动的位置
    ulBox.addEventListener("touchmove", function(e) {
        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;
        // 判断移动是否大于设定值
        if ((currentY + distanceY) > bounceMax || (currentY + distanceY) < bounceMin) {
            console.log("超出距离了");
            return;
        }
        // 设置ul随触摸移动而移动
        ulBox.style.transition = "none";
        ulBox.style.top = (currentY + distanceY) + "px";
    })

    ulBox.addEventListener("touchend", function(e) {
        if (currentY + distanceY > maxTop) {
            currentY = maxTop;
            ulBox.style.transition = "top 0.5s"
            ulBox.style.top = maxTop + "px";
        } else if (currentY + distanceY < minTop) {
            currentY = minTop;
            ulBox.style.transition = "top 0.5s"
            ulBox.style.top = minTop + "px";
        } else {
            currentY += distanceY;
        }
    });

    /*为每一个li元素设置添加一个索引值*/
    for (var i = 0; i < lis.length; i++) {
        /*lis[i].setAttribute("index",i);*/
        lis[i].index = i;
    }

    /*绑定移动端的tap事件*/
    itcast.tap(ulBox, function(e) {
        /*1.修改li元素的样式：将所有li元素的active样式清除，再为当前被点击的li元素添加active样式*/
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
        }
        /*为当前被单击的li元素添加样式*/
        var li = e.target.parentNode;
        var liHeight = li.offsetHeight;
        li.classList.add("active");

        /*2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值*/
        /*获取当前li元素的索引值*/
        var index = li.index;
        /*开启过渡*/
        ulBox.style.transition = "top .5s";
        /*设置偏移*/
        if (-index * liHeight < minTop) {
            /*只能偏移到minTop位置*/
            ulBox.style.top = minTop + "px";
            currentY = minTop;
        } else {
            ulBox.style.top = -index * liHeight + "px";
            currentY = -index * liHeight;
        }
    });




}