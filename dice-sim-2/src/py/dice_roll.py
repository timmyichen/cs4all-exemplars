import random

sides = input("# of sides: ")
dice = input("# of dice: ")
trials = input("# of trials: ")

# begin 0
results = {}
for dice_number in range(dice, sides*dice+1):
    results[dice_number] = 0
# end 0

for each_trial in range(trials):
    # begin 1
    trial_total = 0
    # end 1
    
    for each_die in range(dice):
        # begin 2
        dice_number = random.randint(1,sides)
        # end 2
        # begin 3
        trial_total = trial_total + dice_number
        # end 3
    
    # begin 4
    results[trial_total] = results[trial_total] + 1
    # end 4