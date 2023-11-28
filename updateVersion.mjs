import lodash from 'lodash';
const {set} = lodash;
import * as fs from 'fs';

const updateVersion = (version) => {
    fs.readFile('flightcontrol.json', 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        const fcData = JSON.parse(data);

        if (process.env.NODE_ENV === 'production') {
            set(fcData, 'environments[0].services[0].envVariables.VITE_APP_VERSION', version);
            set(fcData, 'environments[0].services[1].dockerLabels["com.datadoghq.tags.version"]', version);
        } else {
            set(fcData, 'environments[1].services[0].envVariables.VITE_APP_VERSION', version);
            set(fcData, 'environments[1].services[1].dockerLabels["com.datadoghq.tags.version"]', version);
            set(fcData, 'environments[2].services[0].envVariables.VITE_APP_VERSION', version);
            set(fcData, 'environments[2].services[1].dockerLabels["com.datadoghq.tags.version"]', version);
        }
        fs.writeFile('flightcontrol.json', JSON.stringify(fcData, null, 2), 'utf8', (err) => {
            if (err) {
                return console.log(err);
            }
        });
    });
};

updateVersion(process.argv[2]);

