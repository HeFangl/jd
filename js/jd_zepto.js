$(function() {
    // 获取banner的宽度
    var bannerWidth = $(".banner").width();
    // 获取 li的个数
    var liLength = $(".jd_bk").children("li").length;
    // 设置ul 的宽度
    var jd_bkWidth = bannerWidth * liLength;

})