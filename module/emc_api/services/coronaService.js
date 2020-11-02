var {
  request
} = require('graphql-request');
var countries = require('../services/countries');
var coronavirus = require('../models/coronavirus');

const query = `{
  results(
 countries: [${countries}]
  date: {gt: "2020-2-2"})
  {
    country{
      name
    }
    date
    deaths
    confirmed
    recovered
  }
}`;

const endpoint = 'https://covid19-graphql.now.sh/';

function getYesterday(date) {
  let res = date.split("-");
  let month = res[1],
    day = res[2] - 1,
    year = res[0];
  return [year, month, day].join('-');
}

var coronaService = {
  importData: async function() {
    const data = await request(endpoint, query);
    const result = data["results"]

    const countryList = {};
    result.forEach((item, i) => {
      if (countryList[item["country"]["name"]] === undefined) {
        countryList[item["country"]["name"]] = [];
        countryList[item["country"]["name"]].push(item);
      } else {
        countryList[item["country"]["name"]].push(item);
      }
    });

    Object.keys(countryList).map(function(objectKey, index) {
      countryList[objectKey].forEach((item, i) => {
        let currentData = item;
        let yesterday = getYesterday(currentData["date"]);
        let prevData = countryList[objectKey].filter(item => item["date"] === yesterday)
        if (prevData.length > 0) {

          let new_confirmed = currentData["confirmed"] - prevData[0]["confirmed"];
          let new_deaths = currentData["deaths"] - prevData[0]["deaths"];

          let no_symptom = Math.round((currentData["confirmed"] / 82.1) * 17.9);

          let req = {
            name: currentData["country"]["name"],
            confirmed: currentData["confirmed"],
            recovered: currentData["recovered"],
            deaths: currentData["deaths"],
            new_confirmed: new_confirmed,
            new_deaths: new_deaths,
            no_symptom: no_symptom,
            create_time: currentData["date"]
          }

          coronavirus.import(req, function(err, results, fields) {
            if (err) {
              return console.error(err);
            }
          });
        }
      });
    });

    return {
      endpoint: endpoint
    };
  },
  formatDate: function(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    return [year, month, day].join('-');
  },
  info: function(info) {
    console.log('Info: ' + info);
  },
  warning: function(warning) {
    console.log('Warning: ' + warning);
  },
  error: function(error) {
    console.log('Error: ' + error);
  }
};

module.exports = coronaService