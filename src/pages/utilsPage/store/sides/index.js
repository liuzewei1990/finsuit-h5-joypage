export default {
    state: {
        sidesKey: "mains",
        sidesKeyPath: [],
        env: "https://app-test4.bicai365.com",
    },
    mutations: {
        ["CHANGESIDEKEY"](state, ploady) {
            state.sidesKey = ploady
        },
        ["CHANGEENV"](state, ploady) {
            state.env = ploady
        }
    },
    actions: {}
}
