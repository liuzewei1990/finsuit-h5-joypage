import bus from "./bus.js"

window.pageAppear = () => {
    bus.$emit("pageAppear");
    bus.$emit("pageAppear:updateStore");
}

window.pinCaiPageDidAppear = () => {
    bus.$emit("pinCaiPageDidAppear");
}