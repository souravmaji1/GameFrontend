const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_API_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const thirtyMinutesInMs = 30 * 60 * 1000; // 30 minutes in milliseconds

exports.regenerateLife = async () => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - thirtyMinutesInMs);

    // Fetch all users with zero lives who haven't updated their lives in the last 30 minutes
    const { data, error } = await supabase
      .from("userdata")
      .select("*")
      .eq("lives", 0)
      .lt("updated_at", thirtyMinutesAgo.toISOString());

    if (error) {
      console.error("Error fetching user data:", error);
      return;
    }

    // Update each user's lives based on their tier
    for (const user of data) {
      const { id, tier } = user;
      const newLives = tier; // Set lives equal to the tier value

      const { error: updateError } = await supabase
        .from("userdata")
        .update({ lives: newLives, updated_at: new Date().toISOString() })
        .eq("userid", id);

      if (updateError) {
        console.error(`Error updating user data for user ${id}:`, updateError);
      } else {
        console.log(`Updated lives for user ${id} to ${newLives}`);
      }
    }
  } catch (error) {
    console.error("Error regenerating lives:", error);
  }
};