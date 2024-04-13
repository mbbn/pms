let fs = require('fs');
let {globSync} = require('glob');
let PropertiesReader = require('properties-reader');
let {mkdirpSync} = require('mkdirp');
let projectName = process.argv[2];

function getJsonMessages(resultProps: any, locale: string, pattern: string) {
    globSync(pattern)
        .map((filename: string) => {
            const props = PropertiesReader(filename)._properties;
            filename = filename.toString().substr(String(filename).lastIndexOf('\\') + 1, String(filename).length).replace(locale === 'fa' ? 'Messages.properties' : 'Messages_en.properties', '');
            for (let key in props) {
                if (props.hasOwnProperty(key)) {
                    resultProps[filename + '.' + key] = JSON.parse('"' + props[key].replace(/([^\\]|^)\"/g, '$1\\"') + '"');
                }
            }
        });
}

const jsonMessagesFa = {};



getJsonMessages(jsonMessagesFa, 'fa', '../common/src/main/java/**/*Messages.properties');
getJsonMessages(jsonMessagesFa, 'fa', '../common/src/main/resources/**/*Messages.properties');
getJsonMessages(jsonMessagesFa, 'fa', '../common/src/main/ts/**/*Messages.properties');
getJsonMessages(jsonMessagesFa, 'fa', '../data/src/main/java/**/*Messages.properties');
getJsonMessages(jsonMessagesFa, 'fa', '../data/src/main/resources/**/*Messages.properties');
getJsonMessages(jsonMessagesFa, 'fa', '../data/src/main/ts/**/*Messages.properties');
getJsonMessages(jsonMessagesFa, 'fa', `./src/main/java/**/*Messages.properties`);
getJsonMessages(jsonMessagesFa, 'fa', `./src/main/resources/**/*Messages.properties`);
getJsonMessages(jsonMessagesFa, 'fa', `./build/i18n/**/*Messages.properties`);
const jsonMessagesEn = {};
getJsonMessages(jsonMessagesEn, 'en', '../common/src/main/java/**/*Messages_en.properties');
getJsonMessages(jsonMessagesEn, 'en', '../common/src/main/resources/**/*Messages_en.properties');
getJsonMessages(jsonMessagesEn, 'en', '../common/src/main/ts/**/*Messages_en.properties');
getJsonMessages(jsonMessagesEn, 'en', '../data/src/main/java/**/*Messages_en.properties');
getJsonMessages(jsonMessagesEn, 'en', '../data/src/main/resources/**/*Messages_en.properties');
getJsonMessages(jsonMessagesEn, 'en', '../data/src/main/ts/**/*Messages_en.properties');
getJsonMessages(jsonMessagesEn, 'en', `./src/main/java/**/*Messages_en.properties`);
getJsonMessages(jsonMessagesEn, 'en', `./src/main/resources/**/*Messages_en.properties`);
getJsonMessages(jsonMessagesEn, 'en', `./build/i18n/**/*Messages_en.properties`);

const outputLanguageDataDir = './build/';
mkdirpSync(outputLanguageDataDir);
fs.writeFileSync(outputLanguageDataDir + 'messages.json', `{ "fa": ${JSON.stringify(jsonMessagesFa, null, 2)} ,"en": ${JSON.stringify(jsonMessagesEn, null, 2)} }`);
