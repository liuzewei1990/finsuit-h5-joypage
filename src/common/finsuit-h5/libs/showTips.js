
import Toast from "@common/finsuit-components/Toast"
export default (o = {}) => {
    let c = {
        duration: 1500,
        message: typeof o === 'string' ? o : o.message,
        position: "center",
        className: "common-show-tips",
        iconClass: "",
        trsiClass: "com-ani-tips",
        pointerEventsNone: false
    };
    Toast({ ...c, ...o })
};