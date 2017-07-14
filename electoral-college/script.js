/* global Datamap, d3 */
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
        'AL': { fillKey: 'rep', votes: 9, repVote: 0.644, popVote: 2123372  },
        'AK': { fillKey: 'rep', votes: 3, repVote: 0.584,  popVote: 318608  },
        'AZ': { fillKey: 'rep', votes: 11, repVote: 0.519, popVote: 2604657  },
        'AR': { fillKey: 'rep', votes: 6, repVote: 0.643,  popVote: 1130635  },
        'CA': { fillKey: 'dem', votes: 55, repVote: 0.339, popVote: 14237893  },
        'CO': { fillKey: 'dem', votes: 9, repVote: 0.473,  popVote: 2780247  },
        'CT': { fillKey: 'dem', votes: 7, repVote: 0.429,  popVote: 1644920  },
        'DE': { fillKey: 'dem', votes: 3, repVote: 0.440,  popVote: 443814  },
        'DC': { fillKey: 'dem', votes: 3, repVote: 0.043,  popVote: 311268  },
        'FL': { fillKey: 'rep', votes: 29, repVote: 0.506, popVote: 9502747  },
        'GA': { fillKey: 'rep', votes: 16, repVote: 0.527, popVote: 4141447  },
        'HI': { fillKey: 'dem', votes: 4, repVote: 0.326,  popVote: 428937  },
        'ID': { fillKey: 'rep', votes: 4, repVote: 0.683,  popVote: 690433  },
        'IL': { fillKey: 'dem', votes: 20, repVote: 0.410, popVote: 5594825  },
        'IN': { fillKey: 'rep', votes: 11, repVote: 0.600, popVote: 2757965  },
        'IA': { fillKey: 'rep', votes: 6, repVote: 0.551,  popVote: 1566031  },
        'KS': { fillKey: 'rep', votes: 6, repVote: 0.611,  popVote: 1194755  },
        'KY': { fillKey: 'rep', votes: 8, repVote: 0.657,  popVote: 1924150  },
        'LA': { fillKey: 'rep', votes: 8, repVote: 0.602,  popVote: 2029032  },
        'ME': { fillKey: 'dem', votes: 4, repVote: 0.484,  popVote: 747927  },
        'MD': { fillKey: 'dem', votes: 10, repVote: 0.360, popVote: 2781446  },
        'MA': { fillKey: 'dem', votes: 11, repVote: 0.353, popVote: 3325046  },
        'MI': { fillKey: 'rep', votes: 16, repVote: 0.501, popVote: 4824542  },
        'MN': { fillKey: 'dem', votes: 10, repVote: 0.492, popVote: 2945233  },
        'MS': { fillKey: 'rep', votes: 6, repVote: 0.591,  popVote: 1211088  },
        'MO': { fillKey: 'rep', votes: 10, repVote: 0.598, popVote: 2828266  },
        'MT': { fillKey: 'rep', votes: 3, repVote: 0.611,  popVote: 501822  },
        'NE': { fillKey: 'rep', votes: 5, repVote: 0.653,  popVote: 844227  },
        'NV': { fillKey: 'dem', votes: 6, repVote: 0.487,  popVote: 1125385  },
        'NH': { fillKey: 'dem', votes: 4, repVote: 0.498,  popVote: 744296  },
        'NJ': { fillKey: 'dem', votes: 14, repVote: 0.427, popVote: 3906723  },
        'NM': { fillKey: 'dem', votes: 5, repVote: 0.453,  popVote: 798319  },
        'NY': { fillKey: 'dem', votes: 29, repVote: 0.382, popVote: 7721795  },
        'NC': { fillKey: 'rep', votes: 15, repVote: 0.519, popVote: 4741564  },
        'ND': { fillKey: 'rep', votes: 3, repVote: 0.698,  popVote: 344360  },
        'OH': { fillKey: 'rep', votes: 18, repVote: 0.543, popVote: 5536547  },
        'OK': { fillKey: 'rep', votes: 7, repVote: 0.693,  popVote: 1452992  },
        'OR': { fillKey: 'dem', votes: 7, repVote: 0.438,  popVote: 2001336  },
        'PA': { fillKey: 'rep', votes: 20, repVote: 0.504, popVote: 6166729  },
        'RI': { fillKey: 'dem', votes: 4, repVote: 0.417,  popVote: 464144  },
        'SC': { fillKey: 'rep', votes: 9, repVote: 0.575,  popVote: 2103027  },
        'SD': { fillKey: 'rep', votes: 3, repVote: 0.660,  popVote: 370093  },
        'TN': { fillKey: 'rep', votes: 11, repVote: 0.636, popVote: 2508027  },
        'TX': { fillKey: 'rep', votes: 38, repVote: 0.547, popVote: 8993166  },
        'UT': { fillKey: 'rep', votes: 6, repVote: 0.624,  popVote: 1143601  },
        'VT': { fillKey: 'dem', votes: 3, repVote: 0.348,  popVote: 315067  },
        'VA': { fillKey: 'dem', votes: 13, repVote: 0.472, popVote: 3982752  },
        'WA': { fillKey: 'dem', votes: 12, repVote: 0.412, popVote: 3316996  },
        'WV': { fillKey: 'rep', votes: 5, repVote: 0.722,  popVote: 721233  },
        'WI': { fillKey: 'rep', votes: 10, repVote: 0.504, popVote: 2976150  },
        'WY': { fillKey: 'rep', votes: 3, repVote: 0.757,  popVote: 255849  },
    },
    done: (datamap) => {
        datamap.svg.call(d3.behavior.zoom().on('zoom', redraw));
        
        function redraw() {
            datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
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
    
    let newRepVote = '';
    const slider = document.getElementById(`${state}-input`) 
    
    if (newColor == 'dem') {
        newRepVote = 0.49;
        slider.value = 49;
    } else if (newColor == 'rep') {
        newRepVote = 0.51;
        slider.value = 51;
    } else {
        newRepVote = 0.5;
        slider.value = 50;
    }
    
    
    document.getElementById(`${state}-repLabel`).innerHTML = slider.value + '%';
    document.getElementById(`${state}-demLabel`).innerHTML = 100 - slider.value + '%';
    const newData2 = {}
    newData2[state] = {
        repVote: newRepVote
    }
    
    
    updatePopularBar();
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
                sums.rep += map.options.data[state].popVote * map.options.data[state].repVote;
                sums.dem += map.options.data[state].popVote * (1 - map.options.data[state].repVote);
                break;
            case 'dem':
                sums.rep += map.options.data[state].popVote * map.options.data[state].repVote;
                sums.dem += map.options.data[state].popVote * (1 - map.options.data[state].repVote);
                break;
            case 'neutral':
                sums.neutral += map.options.data[state].popVote;
                break;
        }
    }
    
    for(const party in sums){
        document.querySelector(`#popular-bar .${party}`).style.width = `${sums[party]/(63720 * 2)}px`;
    }
    
    document.querySelector('#popular-bar .rep-num').innerHTML = Math.round(sums.rep).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.querySelector('#popular-bar .dem-num').innerHTML = Math.round(sums.dem).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


states.forEach(function(state) {
    document.querySelector(`.${state}`).addEventListener('click',function(){toggleState(state)});
});

updateElectoralBar();
updatePopularBar();

let slider = '';

for (let state in map.options.data){
    let data = map.options.data;
    let initialValue = data[state].fillKey === 'rep' ? data[state].repVote*100 : (data[state].repVote)*100;
    initialValue = Math.round(initialValue);
    slider += `
        <label>${state}: <span id="${state}-repLabel">${initialValue}%</span></label>
        <input id="${state}-input" type="range" min="0" max="100" value="${initialValue}" data-show-value="true"/>
        <span id="${state}-demLabel">${100-initialValue}%</span>
        <br>
    `;
}

document.querySelector('#sliders').innerHTML = slider;

for (let state in map.options.data){
    const slider = document.getElementById(`${state}-input`)
    slider.addEventListener('input', () => {
        document.getElementById(`${state}-repLabel`).innerHTML = slider.value + '%';
        document.getElementById(`${state}-demLabel`).innerHTML = 100 - slider.value +'%';
        
        let newFillKey = '';
        
        if (slider.value < 50) {
            newFillKey = 'dem';
        } else if (slider.value == 50) {
            newFillKey = 'neutral';
        } else {
            newFillKey = 'rep';
        }
        
        const newData = {}
        newData[state] = {
                fillKey: newFillKey,
                repVote: slider.value / 100
        }
        
        map.updateChoropleth(newData);
        updateElectoralBar();
        updatePopularBar();
    })
}
