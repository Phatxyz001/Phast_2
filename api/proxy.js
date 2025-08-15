export default async (req, res) => {
    const { id } = req.query;
    try {
      const response = await fetch(`https://khaidevapi.onrender.com/discord/data/profile/${id}`);
      const data = await response.json();
      
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Proxy failed' });
    }
  };