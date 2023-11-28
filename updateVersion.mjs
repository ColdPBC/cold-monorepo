import lod from 'lodash';
const {get, set} = lod;
import * as fs from 'fs';
import path from "path";
const getJson = (name) => {
    const firstPath = path.resolve('./', name);
    if (fs.existsSync(firstPath)) {
        return fs.readFileSync(firstPath).toString();
    } else {
        throw new Error(`${name} is not found in '${firstPath}'`);
    }
}
const updateVersion = () => {
    fs.readFile('flightcontrol.json', 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        const fcData = JSON.parse(data);
        const raw = getJson('package.json');
        if(raw && typeof raw === 'string'){
            const pkg = JSON.parse(raw);
            const version = get(pkg, 'version', '0.0.0');
            if(process.env.NODE_ENV === 'production'){
                set(fcData, 'environments[0].services[1].dockerLabels["com.datadoghq.tags.version"]', version);
            } else {
                set(fcData, 'environments[1].services[1].dockerLabels["com.datadoghq.tags.version"]', version);
                set(fcData, 'environments[2].services[1].dockerLabels["com.datadoghq.tags.version"]', version);
            }
            fs.writeFile('flightcontrol.json', JSON.stringify(fcData, null, 2), 'utf8', (err) => {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
};

updateVersion();
