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
    let prNumber = context.issue().number;

    let prMessage = "Hey there :wave: Thanks for the PR! \n";
    prMessage+= "Here\'s the link for the [deploy preview](https://deploy-preview-"+prNumber+"--sosc.netlify.com/) of the changes. \n";
    prMessage+= "Deploy preview will be available in a while if the changes didn\'t break anything. ";
    prMessage+= "Fingers crossed :crossed_fingers:";

    const prComment = context.issue({ body: prMessage});
    return context.github.issues.createComment(prComment);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
