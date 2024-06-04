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
        return 1; // Tier 1: 5 lives
      case 2:
        return 2; // Tier 2: 4 lives
      case 3:
        return 3; // Tier 3: 3 lives
      case 4:
        return 4; // Tier 4: 2 lives
      case 5:
        return 5;
      case 6:
        return 6;
      case 7:
        return 7;
      case 8:
        return 8;
      case 9:
        return 9;
      case 10:
        return 10; // Tiers 5-10: 1 life
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
      const { id, tier, consecutiveCorrectGuesses, currentPredictionIntervalStart } = user;
      const currentTime = new Date().getTime();
      const predictionInterval = getPredictionInterval(tier);

      // Check if the prediction interval has ended or if the user hasn't made any guesses after moving to a new tier
      if ((!currentPredictionIntervalStart || currentTime - currentPredictionIntervalStart >= predictionInterval * 1000)) {
        const requiredCorrectGuesses = tier;

        // Check if the user made the required number of consecutive correct guesses
        if (consecutiveCorrectGuesses === requiredCorrectGuesses) {
          const newTier = tier < 10 ? tier + 1 : 10; // Increment tier, but cap at Tier 10
          const newConsecutiveCorrectGuesses = 0; // Reset consecutive correct guesses
          const newLives = getNumberOfLives(newTier);


          const { error: updateError } = await supabase
            .from('userdata')
            .update({ tier: newTier, consecutiveCorrectGuesses: newConsecutiveCorrectGuesses, currentPredictionIntervalStart: currentTime, lives: newLives })
            .eq('id', id);

          if (updateError) {
            console.error(`Error updating user ${id}:`, updateError);
          }
        } else {
          const newConsecutiveCorrectGuesses = 0; // Reset consecutive correct guesses

          const { error: updateError } = await supabase
            .from('userdata')
            .update({ consecutiveCorrectGuesses: newConsecutiveCorrectGuesses, currentPredictionIntervalStart: currentTime })
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