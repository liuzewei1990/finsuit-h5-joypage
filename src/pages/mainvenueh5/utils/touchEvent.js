export default {
    install: function (Vue) {
        Vue.directive("touchmove", {
            inserted: function (el, binding) {
                let fn = binding.value;
                //滑动处理
                let startX, startY, moveEndX, moveEndY, X, Y;
                el.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                }, false);

                el.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                    moveEndX = e.changedTouches[0].pageX;
                    moveEndY = e.changedTouches[0].pageY;
                    X = moveEndX - startX;
                    Y = moveEndY - startY;
                });

                el.addEventListener('touchend', function (e) {
                    if (Math.abs(X) > Math.abs(Y) && X > 0) {
                        fn("right");
                    }
                    else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                        fn("left");
                    }
                    else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
                        fn("bottom");
                    }
                    else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
                        fn("top");
                    }
                    else {
                        console.log("没滑动");
                    }
                })
            }
        })
    }
}