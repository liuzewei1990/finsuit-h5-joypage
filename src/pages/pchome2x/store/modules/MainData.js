const user = {
    state: {
        permissions: [],
        // 拼人数产品列表
        personData: [],
        // 拼团产品列表
        teamData: []
    },
    mutations: {
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions;
        },
        SET_PERSON_DATA: (state, list) => {
            state.personData = list;
        },
        SET_TEAM_LIST_DATA: (state, data) => {
            state.teamData = data;
        },
    },
    actions: {
        getPermissions ({ commit, dispatch }) {
            queryPermissions().then(res => {
                sessionStorage.setItem('permissions', JSON.stringify(res))
                this.dispatch('setPermissions', res); // 调本module里的方法
            })
        },
        setPermissions ({ commit, dispatch, state, rootState }, data) {
            commit('SET_PERMISSIONS', data); // 本module的commit
            dispatch('setMenuData', data); // 调menu里的方法
            console.log(rootState.menu.menus); // 取menu里的参数
        }
    }
}

export default user;