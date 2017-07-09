def initialize_results(sides,dice):
    """
    Returns a dictionary initialized to zero for every
    possible dice roll given the number of sides on each
    die and the number of die being rolled.  This
    dictionary will keep track of the number of times each
    possible dice roll has been rolled.
    
    Keyword arguments:
    sides -- the number of sides on each die (integer)
    dice -- the number of die being rolled (integer)
    """
    return {x:0 for x in range(dice, sides*dice+1)}

def initialize_percentages(sides,dice):
    """
    Returns a dictionary initialized to zero for every
    possible dice roll given the number of sides on each
    die and the number of die being rolled.  This
    dictionary will hold the values for the observed
    probability of a specific value being rolled.
    
    Keyword arguments:
    sides -- the number of sides on each die (integer)
    dice -- the number of die being rolled (integer)
    """
    return {x:None for x in range(dice, sides*dice+1)}
    
def update_results(results, trial_total):
    """
    Return a 
    """
    results[trial_total] = results[trial_total] + 1

#the 'random' module allows us to randomly generate numbers
import random

#get the values we need from the user
number_of_sides = int(input('# of sides:'))
number_of_dice = int(input('# of dice:'))
number_of_trials = int(input('# of trials:'))

#this data (results) will keep track of the results
#   of our rolls
results = initialize_results(number_of_sides, number_of_dice)

#repeat some code for each trial
for each_trial in range(number_of_trials):
    #total for this current trial starts at zero
    #   since we haven't rolled any dice
    trial_total = 0
    
    #then for each die in one trial...
    for each_die in range(number_of_dice):
        #generate a random number between 1 and the number of sides
        #   on the die
        die_roll = random.randint(1,number_of_sides)
        
        #then add that number to the total for the trial
        trial_total = trial_total + die_roll
        
    #update the results for the resulting trial total
    update_results(results, trial_total)

#from the trial totals, initialize the percentages
percentages = initialize_percentages(number_of_sides, number_of_dice)

#for each possible result in to calculate in percentages...
for each_result in percentages:
    #divide the number of occurrences by the total number of trials
    percentages[each_result] = round(results[each_result] / number_of_trials,2)

print()

#then print each one
for each_result in percentages:
    print('{} was rolled {} times. Event probability = {}, or {}%.'.format(
        each_result,
        results[each_result],
        percentages[each_result],
        percentages[each_result]*100
    )
