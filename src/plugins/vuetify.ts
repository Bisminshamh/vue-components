import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#3f51b5',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
                iconOn: "#d40d21",
                iconOff: "#3d3a3a",
                green: "#06b817",
                red: "#b81206"

            },
        },
    },
});
