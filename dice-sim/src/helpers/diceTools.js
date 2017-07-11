function rollAllDice(props){
    const sides = props.sides;
    const dice = props.dice;
    const trials = props.trials;
    
    const results = {};
    const now = Date.now();
    
    for(let die=dice; die<=sides*dice; die++){
        results[die] = { frequency: 0, die, percentage: 0 };
    }
    for(let trial=0; trial<trials; trial++){
        let total=0;
        for(let die=0; die<dice; die++){
            total += randomInt(1,sides);
        }
        if(Date.now() - now > 5000){
            alert("Took longer than 5 seconds to execute, ending process..");
            this.resetState();
            return;
        }
        
        results[total].frequency += 1;
    }
    
    for(let die=dice; die<=sides*dice; die++){
        results[die].percentage = (results[die].frequency / trials);
    }
    
    return results;
}