module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    context.log("Issue opened");
    console.log("Hey its the issue number : "+context.payload.issue.number);
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' });
    console.log(issueComment);
    return context.github.issues.createComment(issueComment)
  });

  app.on('pull_request.opened', async context => {
    context.log("PR opened");
    console.log("Hey its the PR number : "+context.pull_request().number);
    const prComment = context.issue({ body: 'Thanks for opening this PR!' });
    console.log(prComment);
    //return context.github.issues.createComment(issueComment)
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
