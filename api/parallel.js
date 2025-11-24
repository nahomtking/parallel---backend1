export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let scenario = "No scenario provided";
    
    // Handle both GET and POST requests
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      scenario = body.scenario || scenario;
    }

    const timelines = [
      {
        title: "Positive Outcome",
        narrative: `Based on your scenario "${scenario}", this positive path would lead to wonderful opportunities and personal growth.`,
        outcome_type: "positive",
        confidence_score: 85
      },
      {
        title: "Neutral Outcome", 
        narrative: "This realistic path would maintain the status quo with minor variations from your actual experience.",
        outcome_type: "neutral",
        confidence_score: 75
      },
      {
        title: "Learning Experience",
        narrative: "Even if challenging, this path would provide valuable lessons and personal development.",
        outcome_type: "mixed", 
        confidence_score: 80
      }
    ];

    res.status(200).json({ timelines, received_scenario: scenario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 