export default function (cb) {
    window.html2canvasCallBack = (base64) => {
        document.getElementById("menuFrame").remove();
        cb(base64);
    }

    let iframeSrc = "";
    iframeSrc = window.location.href.split("#")[0];
    iframeSrc += `#/screenshot`;
    iframeSrc += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
    iframeSrc += `&INVITE_ID=${this.$store.state.ID}`;
    iframeSrc += `&PMP_FLAG=${this.$store.state.APP_FLAG}`;
    iframeSrc += `&MEMBER_ID=${this.$store.state.ID}`;
    iframeSrc += `&PHONE_NUM=${this.$store.state.PHONE_NUM}`;
    iframeSrc += `&TOKEN=${this.$store.state.TOKEN}`;
    iframeSrc += `&SESSION_ID=${this.$store.state.SESSION_ID}`;
    iframeSrc += `&SYSTEM_TYPE=${this.$store.state.SYSTEM_TYPE}`;
    iframeSrc += `&VERSION=${this.$store.state.VERSION}`;
    console.debug("当前iframe地址：", iframeSrc);

    let iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.src = iframeSrc;
    iframe.id = "menuFrame";
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.style.position = "absolute";
    iframe.style.left = "-1000px";
    iframe.style.bottom = "0px";
    iframe.height = "667px";
    iframe.width = "100%";
}
