export const fetchHistoricalEvents = async (month, day) => {
  try {
    const response = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`,
      {
        headers: {
          'User-Agent': 'TimeCapsule/1.0 (https://github.com/yourusername/time-capsule; your-email@example.com)'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch historical events: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching historical events:', error);
    throw error;
  }
}; 