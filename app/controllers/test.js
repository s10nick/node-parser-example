exports.testGetBody = (req, res) => {
  return res.status(200).send(req.document)
}

exports.testGetLastPage = (req, res) => {
  return res.status(200).send(req.lastPage)
}

exports.testGetDiscussionListItems = (req, res) => {
  return res.status(200).send({loadedLink: req.loadedLink, loadedData: req.loadedData})
}

exports.testSaveLocalJSONData = (req, res) => {
  return res.status(200).send(req.loadedData)
}

exports.testReadLocalJSONData = (req, res) => {
  if (req.readeableFile) return res.status(200).send(req.readeableFile)
  return res.status(400).send(req.readeableFile)
}
