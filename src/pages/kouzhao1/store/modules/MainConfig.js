const user = {
    state: {
        // 口罩是否售罄 1-未售罄 0-售罄
        isSell: "",
    },
    mutations: {
        SET_IS_SELL: (state, isSell) => {
            state.isSell = isSell;
        }
    }
}

export default user;