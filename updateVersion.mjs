import * as fs from 'fs';

const updateVersion = (version, branch) => {
    console.log('Updating version to', version, 'for branch', branch);
    fs.readFile('flightcontrol.json', 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        const fcData = JSON.parse(data);

        if (branch === 'production') {
            fcData.environments[0].services[0].envVariables.VITE_APP_VERSION = version;
            console.log(`Updated 'environments[${branch}].services[UI].envVariables.VITE_APP_VERSION' to ${version}`);

            fcData.environments[0].services[1].dockerLabels["com.datadoghq.tags.version"] = version;
            console.log(`Updated 'environments[${branch}].services[API].dockerLabels["com.datadoghq.tags.version"]' to ${version}`);

        } else if(branch === 'staging') {
            fcData.environments[1].services[0].envVariables.VITE_APP_VERSION = version;
            console.log(`Updated 'environments[${branch}].services[UI].envVariables.VITE_APP_VERSION' to ${version}`);

            fcData.environments[1].services[1].dockerLabels["com.datadoghq.tags.version"] = version;
            console.log(`Updated 'environments[${branch}].services[API].dockerLabels["com.datadoghq.tags.version"]' to ${version}`);
        } else {
            fcData.environments[2].services[0].envVariables.VITE_APP_VERSION = version;
            console.log(`Updated 'environments[${branch}].services[UI].envVariables.VITE_APP_VERSION' to ${version}`);

            fcData.environments[2].services[1].dockerLabels["com.datadoghq.tags.version"] = version;
            console.log(`Updated 'environments[${branch}].services[API].dockerLabels["com.datadoghq.tags.version"]' to ${version}`);
        }

        console.log(`PRODUCTION UI: ${fcData.environments[0].services[0].envVariables.VITE_APP_VERSION}`);
        console.log(`STAGING UI: ${fcData.environments[1].services[0].envVariables.VITE_APP_VERSION}`);
        console.log(`DEVELOPMENT UI: ${fcData.environments[2].services[0].envVariables.VITE_APP_VERSION}`);

        console.log(`PRODUCTION API`, fcData.environments[0].services[1].dockerLabels);
        console.log(`STAGING API`, fcData.environments[1].services[1].dockerLabels);
        console.log(`DEVELOPMENT API`, fcData.environments[2].services[1].dockerLabels);

      fs.writeFile('flightcontrol.json', JSON.stringify(fcData, null, 2), 'utf8', (err) => {
            if (err) {
                return console.log(err);
            }
        });
    });
};

updateVersion(process.argv[2], process.argv[3]);

