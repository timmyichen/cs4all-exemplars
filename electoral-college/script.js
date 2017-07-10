/* global Datamap */
const map = new Datamap({
    element: document.getElementById("map"),
    geographyConfig: {
        highlightOnHover: false,
        popupTemplate: function(geography,data) {
            return `
                <div class="hoverinfo">
                    <strong>${geography.properties.name}</strong><br/>
                    Winner: ${getFullWinner(data.fillKey)}<br/>
                    Electoral Votes: ${data.votes}
                </div>
            `
        }
    },
    scope: 'usa',
    fills: {
        defaultFill: '#AAAAAA',
        neutral: '#AAAAAA',
        rep: '#E91D0E',
        dem: '#232066'
    },
    data: {
        'AL': { fillKey: 'rep', votes: 9, repVote: 0.5, demVote: 0.5  },
        'AK': { fillKey: 'rep', votes: 3, repVote: 0.5, demVote: 0.5  },
        'AZ': { fillKey: 'rep', votes: 11, repVote: 0.5, demVote: 0.5  },
        'AR': { fillKey: 'rep', votes: 6, repVote: 0.5, demVote: 0.5  },
        'CA': { fillKey: 'dem', votes: 55, repVote: 0.5, demVote: 0.5  },
        'CO': { fillKey: 'dem', votes: 9, repVote: 0.5, demVote: 0.5  },
        'CT': { fillKey: 'dem', votes: 7, repVote: 0.5, demVote: 0.5  },
        'DE': { fillKey: 'dem', votes: 3, repVote: 0.5, demVote: 0.5  },
        'DC': { fillKey: 'dem', votes: 3, repVote: 0.5, demVote: 0.5  },
        'FL': { fillKey: 'rep', votes: 29, repVote: 0.5, demVote: 0.5  },
        'GA': { fillKey: 'rep', votes: 16, repVote: 0.5, demVote: 0.5  },
        'HI': { fillKey: 'dem', votes: 4, repVote: 0.5, demVote: 0.5  },
        'ID': { fillKey: 'rep', votes: 4, repVote: 0.5, demVote: 0.5  },
        'IL': { fillKey: 'dem', votes: 20, repVote: 0.5, demVote: 0.5  },
        'IN': { fillKey: 'rep', votes: 11, repVote: 0.5, demVote: 0.5  },
        'IA': { fillKey: 'rep', votes: 6, repVote: 0.5, demVote: 0.5  },
        'KS': { fillKey: 'rep', votes: 6, repVote: 0.5, demVote: 0.5  },
        'KY': { fillKey: 'rep', votes: 8, repVote: 0.5, demVote: 0.5  },
        'LA': { fillKey: 'rep', votes: 8, repVote: 0.5, demVote: 0.5  },
        'ME': { fillKey: 'dem', votes: 4, repVote: 0.5, demVote: 0.5  },
        'MD': { fillKey: 'dem', votes: 10, repVote: 0.5, demVote: 0.5  },
        'MA': { fillKey: 'dem', votes: 11, repVote: 0.5, demVote: 0.5  },
        'MI': { fillKey: 'rep', votes: 16, repVote: 0.5, demVote: 0.5  },
        'MN': { fillKey: 'dem', votes: 10, repVote: 0.5, demVote: 0.5  },
        'MS': { fillKey: 'rep', votes: 6, repVote: 0.5, demVote: 0.5  },
        'MO': { fillKey: 'rep', votes: 10, repVote: 0.5, demVote: 0.5  },
        'MT': { fillKey: 'rep', votes: 3, repVote: 0.5, demVote: 0.5  },
        'NE': { fillKey: 'rep', votes: 5, repVote: 0.5, demVote: 0.5  },
        'NV': { fillKey: 'dem', votes: 6, repVote: 0.5, demVote: 0.5  },
        'NH': { fillKey: 'dem', votes: 4, repVote: 0.5, demVote: 0.5  },
        'NJ': { fillKey: 'dem', votes: 14, repVote: 0.5, demVote: 0.5  },
        'NM': { fillKey: 'dem', votes: 5, repVote: 0.5, demVote: 0.5  },
        'NY': { fillKey: 'dem', votes: 29, repVote: 0.5, demVote: 0.5  },
        'NC': { fillKey: 'rep', votes: 15, repVote: 0.5, demVote: 0.5  },
        'ND': { fillKey: 'rep', votes: 3, repVote: 0.5, demVote: 0.5  },
        'OH': { fillKey: 'rep', votes: 18, repVote: 0.5, demVote: 0.5  },
        'OK': { fillKey: 'rep', votes: 7, repVote: 0.5, demVote: 0.5  },
        'OR': { fillKey: 'dem', votes: 7, repVote: 0.5, demVote: 0.5  },
        'PA': { fillKey: 'rep', votes: 20, repVote: 0.5, demVote: 0.5  },
        'RI': { fillKey: 'dem', votes: 4, repVote: 0.5, demVote: 0.5  },
        'SC': { fillKey: 'rep', votes: 9, repVote: 0.5, demVote: 0.5  },
        'SD': { fillKey: 'rep', votes: 3, repVote: 0.5, demVote: 0.5  },
        'TN': { fillKey: 'rep', votes: 11, repVote: 0.5, demVote: 0.5  },
        'TX': { fillKey: 'rep', votes: 38, repVote: 0.5, demVote: 0.5  },
        'UT': { fillKey: 'rep', votes: 6, repVote: 0.5, demVote: 0.5  },
        'VT': { fillKey: 'dem', votes: 3, repVote: 0.5, demVote: 0.5  },
        'VA': { fillKey: 'dem', votes: 13, repVote: 0.5, demVote: 0.5  },
        'WA': { fillKey: 'dem', votes: 12, repVote: 0.5, demVote: 0.5  },
        'WV': { fillKey: 'rep', votes: 5, repVote: 0.5, demVote: 0.5  },
        'WI': { fillKey: 'rep', votes: 10, repVote: 0.5, demVote: 0.5  },
        'WY': { fillKey: 'rep', votes: 3, repVote: 0.5, demVote: 0.5  },
    }
});

map.labels({'labelColor': 'white'});
map.resize()

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI',
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
    console.log(JSON.parse(JSON.stringify(newData)));
    newData[state] = {};
    console.log(JSON.parse(JSON.stringify(newData)));
    newData[state].fillKey = newColor;
    console.log(JSON.parse(JSON.stringify(newData)));
    map.updateChoropleth(newData);
    
    updateBars();
}

function cycleColor(color){
    const colors = ['dem','rep','neutral'];
    return colors[(colors.indexOf(color)+1)%3];
}

function updateBars(){
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
        document.querySelector(`#${party}`).style.width = `${sums[party]*2}px`;
    }
    
    document.querySelector('#rep-num').innerHTML = sums.rep;
    document.querySelector('#dem-num').innerHTML = sums.dem;
}

states.forEach(function(state) {
    document.querySelector(`.${state}`).addEventListener('click',function(){toggleState(state)});
});

updateBars();