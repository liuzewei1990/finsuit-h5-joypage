export const inPmp = {
    data() {
        return {
            isinpmp: false
        }
    },
    created() {
        this.inPmp()
    },
    methods: {
        inPmp() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                this.$wx.miniProgram.getEnv((res) => {
                    if (res.miniprogram) {
                        this.isinpmp = true;
                    } else {
                        this.isinpmp = false;
                    }
                })
            } else {
                this.isinpmp = false;
            }
        }
    },

}
