/* global Datamap */
const map = new Datamap({
    element: document.getElementById("map"),
    geographyConfig: {
        highlightOnHover: false,
        borderColor: 'black',
        popupTemplate: function(geography,data) {
            return `
                <div class="hoverinfo">
                    <strong>${geography.properties.name}</strong><br/>
                    Winner: ${getFullWinner(data.fillKey)}<br/>
                    Electoral Votes: ${data.votes}<br/>
                    2016 Voters: ${data.popVote}
                </div>
            `
        }
    },
    scope: 'usa',
    fills: {
        defaultFill: '#AAAAAA',
        neutral: '#AAAAAA',
        rep: '#ED1C24', //'#E91D0E',
        dem: '#1E90FF', //'#232066'
    },
    data: {
        'AL': { fillKey: 'rep', votes: 9, repVote: 0.5, demVote: 0.5, popVote: 2123372  },
        'AK': { fillKey: 'rep', votes: 3, repVote: 0.5, demVote: 0.5, popVote: 318608  },
        'AZ': { fillKey: 'rep', votes: 11, repVote: 0.5, demVote: 0.5, popVote: 2604657  },
        'AR': { fillKey: 'rep', votes: 6, repVote: 0.5, demVote: 0.5, popVote: 1130635  },
        'CA': { fillKey: 'dem', votes: 55, repVote: 0.5, demVote: 0.5, popVote: 14237893  },
        'CO': { fillKey: 'dem', votes: 9, repVote: 0.5, demVote: 0.5, popVote: 2780247  },
        'CT': { fillKey: 'dem', votes: 7, repVote: 0.5, demVote: 0.5, popVote: 1644920  },
        'DE': { fillKey: 'dem', votes: 3, repVote: 0.5, demVote: 0.5, popVote: 443814  },
        'DC': { fillKey: 'dem', votes: 3, repVote: 0.5, demVote: 0.5, popVote: 311268  },
        'FL': { fillKey: 'rep', votes: 29, repVote: 0.5, demVote: 0.5, popVote: 9502747  },
        'GA': { fillKey: 'rep', votes: 16, repVote: 0.5, demVote: 0.5, popVote: 4141447  },
        'HI': { fillKey: 'dem', votes: 4, repVote: 0.5, demVote: 0.5, popVote: 428937  },
        'ID': { fillKey: 'rep', votes: 4, repVote: 0.5, demVote: 0.5, popVote: 690433  },
        'IL': { fillKey: 'dem', votes: 20, repVote: 0.5, demVote: 0.5, popVote: 5594825  },
        'IN': { fillKey: 'rep', votes: 11, repVote: 0.5, demVote: 0.5, popVote: 2757965  },
        'IA': { fillKey: 'rep', votes: 6, repVote: 0.5, demVote: 0.5, popVote: 1566031  },
        'KS': { fillKey: 'rep', votes: 6, repVote: 0.5, demVote: 0.5, popVote: 1194755  },
        'KY': { fillKey: 'rep', votes: 8, repVote: 0.5, demVote: 0.5, popVote: 1924150  },
        'LA': { fillKey: 'rep', votes: 8, repVote: 0.5, demVote: 0.5, popVote: 2029032  },
        'ME': { fillKey: 'dem', votes: 4, repVote: 0.5, demVote: 0.5, popVote: 747927  },
        'MD': { fillKey: 'dem', votes: 10, repVote: 0.5, demVote: 0.5, popVote: 2781446  },
        'MA': { fillKey: 'dem', votes: 11, repVote: 0.5, demVote: 0.5, popVote: 3325046  },
        'MI': { fillKey: 'rep', votes: 16, repVote: 0.5, demVote: 0.5, popVote: 4824542  },
        'MN': { fillKey: 'dem', votes: 10, repVote: 0.5, demVote: 0.5, popVote: 2945233  },
        'MS': { fillKey: 'rep', votes: 6, repVote: 0.5, demVote: 0.5, popVote: 1211088  },
        'MO': { fillKey: 'rep', votes: 10, repVote: 0.5, demVote: 0.5, popVote: 2828266  },
        'MT': { fillKey: 'rep', votes: 3, repVote: 0.5, demVote: 0.5, popVote: 501822  },
        'NE': { fillKey: 'rep', votes: 5, repVote: 0.5, demVote: 0.5, popVote: 844227  },
        'NV': { fillKey: 'dem', votes: 6, repVote: 0.5, demVote: 0.5, popVote: 1125385  },
        'NH': { fillKey: 'dem', votes: 4, repVote: 0.5, demVote: 0.5, popVote: 744296  },
        'NJ': { fillKey: 'dem', votes: 14, repVote: 0.5, demVote: 0.5, popVote: 3906723  },
        'NM': { fillKey: 'dem', votes: 5, repVote: 0.5, demVote: 0.5, popVote: 798319  },
        'NY': { fillKey: 'dem', votes: 29, repVote: 0.5, demVote: 0.5, popVote: 7721795  },
        'NC': { fillKey: 'rep', votes: 15, repVote: 0.5, demVote: 0.5, popVote: 4741564  },
        'ND': { fillKey: 'rep', votes: 3, repVote: 0.5, demVote: 0.5, popVote: 344360  },
        'OH': { fillKey: 'rep', votes: 18, repVote: 0.5, demVote: 0.5, popVote: 5536547  },
        'OK': { fillKey: 'rep', votes: 7, repVote: 0.5, demVote: 0.5, popVote: 1452992  },
        'OR': { fillKey: 'dem', votes: 7, repVote: 0.5, demVote: 0.5, popVote: 2001336  },
        'PA': { fillKey: 'rep', votes: 20, repVote: 0.5, demVote: 0.5, popVote: 6166729  },
        'RI': { fillKey: 'dem', votes: 4, repVote: 0.5, demVote: 0.5, popVote: 464144  },
        'SC': { fillKey: 'rep', votes: 9, repVote: 0.5, demVote: 0.5, popVote: 2103027  },
        'SD': { fillKey: 'rep', votes: 3, repVote: 0.5, demVote: 0.5, popVote: 370093  },
        'TN': { fillKey: 'rep', votes: 11, repVote: 0.5, demVote: 0.5, popVote: 2508027  },
        'TX': { fillKey: 'rep', votes: 38, repVote: 0.5, demVote: 0.5, popVote: 8993166  },
        'UT': { fillKey: 'rep', votes: 6, repVote: 0.5, demVote: 0.5, popVote: 1143601  },
        'VT': { fillKey: 'dem', votes: 3, repVote: 0.5, demVote: 0.5, popVote: 315067  },
        'VA': { fillKey: 'dem', votes: 13, repVote: 0.5, demVote: 0.5, popVote: 3982752  },
        'WA': { fillKey: 'dem', votes: 12, repVote: 0.5, demVote: 0.5, popVote: 3316996  },
        'WV': { fillKey: 'rep', votes: 5, repVote: 0.5, demVote: 0.5, popVote: 721233  },
        'WI': { fillKey: 'rep', votes: 10, repVote: 0.5, demVote: 0.5, popVote: 2976150  },
        'WY': { fillKey: 'rep', votes: 3, repVote: 0.5, demVote: 0.5, popVote: 255849  },
    }
});

map.labels({'labelColor': 'black'});
map.resize()

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE', 'DC', 'FL','GA','HI',
    'ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO',
    'MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
    'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

function getFullWinner(short){
    switch(short){
        case 'dem':
            return 'Democrat';
        case 'rep':
            return 'Republican';
        case 'neutral':
            return 'Neutral';
    }
}

function toggleState(state){
    const newColor = cycleColor(map.options.data[state].fillKey);
    const newData = {};
    newData[state] = {};
    newData[state].fillKey = newColor;
    map.updateChoropleth(newData);
    
    updateElectoralBar();
    updatePopularBar()
}

function cycleColor(color){
    const colors = ['dem','rep','neutral'];
    return colors[(colors.indexOf(color)+1)%3];
}

function updateElectoralBar(){
    const sums = {
        rep: 0,
        dem: 0,
        neutral: 0
    };
    for(const state in map.options.data){
        switch(map.options.data[state].fillKey){
            case 'rep':
                sums.rep += map.options.data[state].votes;
                break;
            case 'dem':
                sums.dem += map.options.data[state].votes;
                break;
            case 'neutral':
                sums.neutral += map.options.data[state].votes;
                break;
        }
    }
    
    for(const party in sums){
        document.querySelector(`#electoral-bar .${party}`).style.width = `${sums[party]*2}px`;
    }
    
    document.querySelector('#electoral-bar .rep-num').innerHTML = sums.rep;
    document.querySelector('#electoral-bar .dem-num').innerHTML = sums.dem;
}

function updatePopularBar(){
    const sums = {
        rep: 0,
        dem: 0,
        neutral: 0
    };
    for(const state in map.options.data){
        switch(map.options.data[state].fillKey){
            case 'rep':
                sums.rep += map.options.data[state].popVote;
                break;
            case 'dem':
                sums.dem += map.options.data[state].popVote;
                break;
            case 'neutral':
                sums.neutral += map.options.data[state].popVote;
                break;
        }
    }
    
    for(const party in sums){
        document.querySelector(`#popular-bar .${party}`).style.width = `${sums[party]/(63720*2)}px`;
    }
    
    document.querySelector('#popular-bar .rep-num').innerHTML = Math.round(sums.rep * 0.5);
    document.querySelector('#popular-bar .dem-num').innerHTML = Math.round(sums.dem * 0.5);
}


states.forEach(function(state) {
    document.querySelector(`.${state}`).addEventListener('click',function(){toggleState(state)});
});

updateElectoralBar();
updatePopularBar()