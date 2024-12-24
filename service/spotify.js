const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

spotifyApi.clientCredentialsGrant().then(data => {
  spotifyApi.setAccessToken(data.body['access_token']);
}).catch(error => console.error('Failed to retrieve access token', error));


// router.get('/search', authMiddleware, async (req, res) => {
//     const { query } = req.query;
//     try {
//       const data = await spotifyApi.searchTracks(query);
//       res.json(data.body.tracks.items);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to search for tracks" });
//     }
//   });
  