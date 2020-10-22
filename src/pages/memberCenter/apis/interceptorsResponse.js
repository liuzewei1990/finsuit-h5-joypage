

import showTips from '@common/finsuit-h5/libs/showTips'
export default function (data) {
    if (data.code == "S_SUCCESS") {
        return data.data || {};
    } else {
        showTips({ message: data.message || "未知错误", pointerEventsNone: true });
        return Promise.reject(new Error(data.message));
    }
}