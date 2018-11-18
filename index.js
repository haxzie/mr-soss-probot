const newIssueController = require('./bin/newIssue');
const newPullRequestController = require('./bin/newPullRequest');

module.exports = app => {
  app.log('Yay, the app was loaded!')
  app.on('issues.opened', newIssueController);
  app.on('pull_request.opened', newPullRequestController);
}