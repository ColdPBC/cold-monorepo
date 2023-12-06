import * as fs from 'fs';

const files = () => ['flightcontrol.json', 'flightcontrol_platform.json'];

const updateFiles = (version) => {
    files().forEach((file) => {
        updateVersion(file, version);
    });
}
const updateVersion = (file, version) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }
      console.log(`Updating ${file} to`, version );
      const fcData = JSON.parse(data);
      for (let e = 0; e < fcData.environments.length; e++) {
        for (let s = 0; s < fcData.environments[e].services.length; s++) {
          if (fcData.environments[e].services[s].envVariables?.VITE_APP_VERSION) {
            fcData.environments[e].services[s].envVariables.VITE_APP_VERSION = version;
            console.log(`Set ${fcData.environments[e].name}.${fcData.environments[e].services[s].name}.VITE_APP_VERSION to ${version}`);
          }

          if (fcData.environments[e].services[s].dockerLabels) {
            Object.keys(fcData.environments[e].services[s].dockerLabels).forEach((key) => {
              if (key === "com.datadoghq.tags.version") {
                fcData.environments[e].services[s].dockerLabels[key] = version;
                console.log(`Set ${fcData.environments[e].name}.${fcData.environments[e].services[s].name}.["com.datadoghq.tags.version"] to ${version}`);
              }
            });
          }
        }
      }
      fs.writeFile(file, JSON.stringify(fcData, null, 2), 'utf8', (err) => {
        if (err) {
          return console.log(err);
        }
      });
    });
};

updateFiles(process.argv[2]);

