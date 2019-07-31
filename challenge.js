'use strict';

/*
You are provided arrays A and B, and values M, X and Y:
    A contains the list of the weight of N people waiting to use the elevator.
    B contains the floors each of the N people need to visit.
    You are also given:
        M (number of floors in the building),
        X (maximum capacity of lift),
        Y (maximum weight limit on lift)

    Given that people must be served in the order they arrive,
    Write a function to calculate the number of floors the lift must stop at and come back
    to the ground floor in order to service all of the people.

    eg. A = [40, 40, 100, 60], B = [3, 3, 2, 2], M = 3, X = 3, Y = 200
    1) Lift will take person 1, 2, 3 to floor 3 and floor 2 => 2 floors
    2) Lift will return to ground floor => 1 floor
    3) Lift will take person 4 to floor 2 => 1 floor
    4) Lift will return to ground floor => 1 floor
    Total floors = 5

Your answer must be within:
    Worst time complexity = O(N)
    Auxillary space complexity = O(N)

Please provide your answer below
*/
module.exports = function (A, B, M, X, Y) {
    let trip = 0;
    let tripWeight = 0;
    let rounds = [];
    for (let i = 0; i < A.length; i++) {
        if (typeof rounds[trip] !== 'undefined') {
            // Check if we have filled the capacity for the current trip,
            // if so, then close the existing trip and create a new one
            if (rounds[trip].length === X || tripWeight + A[i] > Y) {
                // Increase trip count
                trip++;
                // Reset current weight
                tripWeight = 0;
            }
        }

        // Create an empty array for the current trip
        rounds[trip] = rounds[trip] || [];
        // Push passengers destination to current trip
        rounds[trip].push(B[i]);
        // Increase current load
        tripWeight += A[i];
    }

    // Remove duplicate floors from each trip, since
    // the elevator will make 1 stop for pessengers that
    // go to the same floor. Then add 1 (return to ground floor)
    rounds = rounds.map((round) => uniq(round).length + 1);

    // To get number of total stops, we sum up
    // destination count in each trip.
    return rounds.reduce((prev, curr) => prev + curr, 0);
};

function uniq(arr) {
    return arr.reduce((prev, curr) => {
        if (prev.indexOf(curr) === -1) {
            prev = prev.concat(curr);
        }
        return prev;
    }, []);
}

