require('dotenv').config();

const axios = require('axios').default;
const countries = require('i18n-iso-countries');
const { get: getCountryFlagEmoji } = require('node-emoji');
const moment = require('moment');

class OlympicsAPI {
    constructor() { }

    _getAPIURL(date) {
        switch (date) {
            case '2021-07-24': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%220009adf28987b375be88899a50e16b26966818ad14018f404016e6baacded970%22%7D%7D';
            }
            case '2021-07-25': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2201b5e23b530aaefcf57bf1b5809db565d0614388ba2aed48f5cf4e2c01534d13%22%7D%7D';
            }
            case '2021-07-26': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2246d33d70ef778aec78982bd30b505b515636df945ec7c06dec823f022ad1205f%22%7D%7D';
            }
            case '2021-07-27': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%224f163d930aeb75c24f153412f84af79aa74ad64759bc0fb633957d23753b8613%22%7D%7D';
            }
            case '2021-07-28': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22489ac7acc376f2306bdbbca5159ee97c73f26f8e180ffbc80054fd5cd18ce853%22%7D%7D';
            }
            case '2021-07-29': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2278cb9defd7af22f9879cf53cce625ad81da1229affc8bb0d8fd0b94b26885fa4%22%7D%7D';
            }
            case '2021-07-30': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%224873d5d526b06860474f60495b86648136cbf7b27e46dacd31f77a8a5e474bbf%22%7D%7D';
            }
            case '2021-07-31': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22d5ae5f922898697f7896269095b72eb8da0a6efb8674c804743b359c49547b8f%22%7D%7D';
            }
            case '2021-08-01': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22ac2200488da719dd01e8ea40f122101aa22975a80e84aaefe80b82b2c2082cbb%22%7D%7D';
            }
            case '2021-08-02': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%222a9d2ff0ac5e40c43b357e3769710e5f30d134df5a8d5579fc21e81c4dadc02f%22%7D%7D';
            }
            case '2021-08-03': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22712064a6ca3affdcd5888800add0159a0bae53ca4814e7408292f28c943a305f%22%7D%7D';
            }
            case '2021-08-04': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%228e5e0bba082e74ebe567dd505e00e8abbc967ddbdc25443edf6714691b55c2fd%22%7D%7D';
            }
            case '2021-08-05': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22efbeefcb187f37b8a347c0e9af98865ccd80fd8c461e5995162a115beec2272d%22%7D%7D';
            }
            case '2021-08-06': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22731a8fee3c861d764a0213a08dc925b264fb7cac7c8df13b6b1313b39ffedea4%22%7D%7D';
            }
            case '2021-08-07': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22e64b69e805c143f9f0e1b0bfc0f76940fb9fd9c049e66752761fead29fc6472f%22%7D%7D';
            }
            case '2021-08-08': {
                return 'https://geql.globo.com/graphql?operationName=olympicQuery&variables=%7B%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22f270ff84f908db604e012cc7b963e50c4c55835417d8a1c757c980f85dbd350e%22%7D%7D';
            }
            default: {
                return null;
            }
        }
    }

    _parseData(array) {
        try {
            function parseEachEvent(data) {
                function getOrigin(origin) {
                    const code = countries.getAlpha2Code(
                        origin.represents ?
                            origin.represents.name === 'Atletas da Rússia' ? 'Rússia' : origin.represents.name 
                        :
                            origin.name === 'Atletas da Rússia' ? 'Rússia' : origin.name, 
                        'pt'
                    );
    
                    return {
                        name: origin.represents ? origin.represents.name : origin.name,
                        code: code ? code : null
                    }
                }

                if(!data.startDate) {
                    return null;
                }
    
                return {
                    sport: data.sport ? data.sport.name : null,
                    modality: data.modality ? data.modality.name : null,
                    category: data.category ? data.category.name : null,
                    stage: data.stage ? data.stage : null,
                    starts_at: `${data.startDate} ${data.startHour}`,
                    participants: data.participants ? {
                        type: data.participants.a.__typename === 'Country' ? 'COUNTRIES' : 'ATHLETES',
                        entities: [
                            {
                                name: data.participants.a.name,
                                origin: getOrigin(data.participants.a),
                                emoji_flag: getOrigin(data.participants.a).code ? getCountryFlagEmoji(`flag-${getOrigin(data.participants.a).code.toLowerCase()}`) : '🏳️'
                            },
                            {
                                name: data.participants.b.name,
                                origin: getOrigin(data.participants.b),
                                emoji_flag: getOrigin(data.participants.b).code ? getCountryFlagEmoji(`flag-${getOrigin(data.participants.b).code.toLowerCase()}`) : '🏳️'
                            }
                        ]
                    } : null
                }
            }
        
            return array.map(eachData => parseEachEvent(eachData));
        } catch (error) {
            throw error;
        }
    }

    async _getData(type) {
        try {
            const url = this._getAPIURL(moment().format('YYYY-MM-DD'));

            if(!url) {
                throw new Error('URL do dia não encontrada!');
            }

            const response = await axios.get(url);
    
            const { data } = response.data;
    
            if(!data.brazilOlympicAgenda) {
                throw new Error('A agenda brasileira não está presente na resposta da requisição.');
            }
    
            return this._parseData(data.brazilOlympicAgenda[type]);
        } catch (error) {
            throw new Error('Erro ao obter os dados do GraphQL da Globo:', error);
        }
    }

    async getFutureGames() {
        try {
            const games = await this._getData('future');

            return games;
        } catch (error) {
            console.log('getFutureGames() ERROR!!!!', error);

            return null;
        }
    }
}

module.exports = new OlympicsAPI();