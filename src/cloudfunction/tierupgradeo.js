const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_API_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const getPredictionInterval = (tier) => {
  switch (tier) {
    case 1:
      return 86400; // 24 hours (daily)
    case 2:
      return 43200; // 12 hours
    case 3:
      return 21600; // 6 hours
    case 4:
      return 10800; // 3 hours
    case 5:
      return 3600; // 1 hour
    case 6:
      return 1800; // 30 minutes
    case 7:
      return 900; // 15 minutes
    case 8:
      return 300; // 5 minutes
    case 9:
      return 180; // 3 minutes
    case 10:
      return 60; // 1 minute
    default:
      return 86400; // Default to daily (24 hours)
  }
};

const getNumberOfLives = (tier) => {
  switch (tier) {
    case 1:
      return 1; // Tier 1: 1 life
    case 2:
      return 2; // Tier 2: 2 lives
    case 3:
      return 3; // Tier 3: 3 lives
    case 4:
      return 4; // Tier 4: 4 lives
    case 5:
      return 5; // Tier 5: 5 lives
    case 6:
      return 6; // Tier 6: 6 lives
    case 7:
      return 7; // Tier 7: 7 lives
    case 8:
      return 8; // Tier 8: 8 lives
    case 9:
      return 9; // Tier 9: 9 lives
    case 10:
      return 10; // Tier 10: 10 lives
    default:
      return 1; // Default to 1 life
  }
};

exports.handlePredictionInterval = async () => {
  try {
    const { data: users, error } = await supabase
      .from('userdata')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    for (const user of users) {
      const { id, tier, consecutiveCorrectGuesses, currentPredictionIntervalStart, lastGuess, lastGuessTime, points } = user;
      const currentTime = new Date().getTime();
      const predictionInterval = getPredictionInterval(tier);

      // Check if the prediction interval has ended
      if (currentTime - currentPredictionIntervalStart >= predictionInterval * 1000) {
        // Fetch the current Bitcoin price
        const btcPrice = await fetchBitcoinPrice();

        // Check if the user made a guess during the prediction interval
        if (lastGuess && lastGuessTime >= currentPredictionIntervalStart) {
          const isCorrect = (lastGuess === 'up' && btcPrice > user.lastGuessPrice) ||
                            (lastGuess === 'down' && btcPrice < user.lastGuessPrice);

          let newTier = tier;
          let newLives = user.lives;
          let newConsecutiveCorrectGuesses = isCorrect ? consecutiveCorrectGuesses + 1 : 0;

           // Determine the tier level at which the guess was made
          const guessedTier = isCorrect ? tier : tier > 1 ? tier - 1 : 1;

          // Calculate points based on the guessed tier
          pointsToAward = guessedTier;

          if (isCorrect) {

            newLives--;
            // Check if the user made the required number of consecutive correct guesses to advance to the next tier
            if (newConsecutiveCorrectGuesses === tier && tier < 10) {
              newTier++;
              newLives = getNumberOfLives(newTier);
              newConsecutiveCorrectGuesses = 0;
            }
          } else {
            // Decrement the tier and lives if the user guessed incorrectly
            if (tier > 1) {
              newTier--;
            }
            newLives--;
            newConsecutiveCorrectGuesses = 0;
          }

          const newPoints = isCorrect ? points + pointsToAward : points;

          // Update the user data in the database
          const { error: updateError } = await supabase
            .from('userdata')
            .update({
              tier: newTier,
              lives: newLives,
              consecutiveCorrectGuesses: newConsecutiveCorrectGuesses,
              currentPredictionIntervalStart: currentTime,
              points: newPoints,
              resultDetermined: true,
            })
            .eq('id', id);

          if (updateError) {
            console.error(`Error updating user ${id}:`, updateError);
          }
        } else {
          // Reset the prediction interval start time if the user didn't make a guess during the interval
          const { error: updateError } = await supabase
            .from('userdata')
            .update({ currentPredictionIntervalStart: currentTime })
            .eq('id', id);

          if (updateError) {
            console.error(`Error updating user ${id}:`, updateError);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const fetchBitcoinPrice = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const bitcoinPrice = response.data.bitcoin.usd;
      return bitcoinPrice;
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
      throw error;
    }
  };