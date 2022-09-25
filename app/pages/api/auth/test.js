export default function handler(req, res) {
  res.status(200).json({ 
		user: true,
		test: 444
  })
}