
module.exports = {
  async getUploads(req, res) {
    try {
      res.status(200).json({ message: 'You are in uploads route' });
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },
}
