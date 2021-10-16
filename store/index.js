export const strict = false

export const state = () => ({
    launches: [],
    offset: 0,
    isLoading: false,
    noData: false
});

export const mutations = {
    SET_SEARCH(state, data) {
        state.launches = data
    },
    SET_LAUCNES(state, launches) {
        state.launches.push(...launches)
    },
    SET_LOADING(state, isLoading) {
        state.isLoading = isLoading
    },
    RESET_NO_DATA(state) {
        state.noData = false
    },
    RESET_OFFSET(state) {
        state.offset = 0
    }
};

export const actions = {
    async getLaunches({ commit, state }) {
        if(state.noData) {
            return false
        }

        commit('SET_LOADING', true);

        const data = await this.$axios.$get(`/?limit=10&offset=${state.offset}`);
        state.offset += 10

        if( data.length == 0 ) {
            state.noData = true
        } else {
            commit('SET_LAUCNES', data);
        }

        commit('SET_LOADING', false);
    },

    async getLaunch({ dispatch, commit, state }, search) {
        commit('SET_LOADING', true);

        console.log( search )

        if( search == '' ) {
            commit('SET_SEARCH', [])
            commit('RESET_OFFSET')
            commit('RESET_NO_DATA');
            dispatch('getLaunches')
        } else {
            const data = await this.$axios.$get();    

            const obj = data.filter(o => o.mission_name == search)

            if( obj.length == 0 ) {
                state.noData = true
            }

            commit('SET_SEARCH', obj);
        }
        
        commit('SET_LOADING', false);
    },
};
