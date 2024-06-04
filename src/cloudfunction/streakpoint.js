const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_API_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Cloud Function entry point
exports.checkGuessingStreaks = async () => {
  try {
      const { data: userData, error } = await supabase
        .from("userdata")
        .select("*");

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }

      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      userData.forEach(async (user) => {
        const { userid, lastGuessTime, points } = user;

        if (lastGuessTime >= oneWeekAgo) {
          const daysWithGuess = [];
          let currentDate = oneWeekAgo;

          while (currentDate <= today) {
            if (lastGuessTime.toDateString() === currentDate.toDateString()) {
              daysWithGuess.push(currentDate);
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }

          if (daysWithGuess.length >= 7) {
            const additionalPoints = 10; // Adjust this value as needed
            const newPoints = points + additionalPoints;

            const { error: updateError } = await supabase
              .from("userdata")
              .update({ points: newPoints })
              .eq("userid", userid);

            if (updateError) {
              console.error("Error updating user data:", updateError);
            } else {
              console.log(`Awarded ${additionalPoints} points to user with ID ${userid}`);
            }
          }
        }
      });
    
  } catch (error) {
    console.error('Error checking guessing streaks:', error);
  }
};