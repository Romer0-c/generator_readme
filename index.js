const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);



const promptUser = () =>
inquirer.prompt([
    {
      type: 'input',
      message: 'What is your project name?',
      name: 'projectname',
    },
    {
      type: 'input',
      message: 'Please describe installation instructions',
      name: 'installation',
    },
    {
      type: 'input',
      message: 'Please describe usage information',
      name: 'usage',
    },
    {
      type: 'input',
      message: 'Please provide all applicable contributors',
      name: 'contributors',
    },
    {
      name: "name",
      type: 'rawlist',
      message: 'Please select an applicable license:',
      choices: [
          "one", 
          "two", 
          "three",
      ]
    },
  ]);

  const generateMD = (answers) =>
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.projectname}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.contributors}</li>
      <li class="list-group-item">LinkedIn: ${answers.usage}</li>
    </ul>
  </div>
</div>
</body>
</html>`;

promptUser()
  .then((answers) => writeFileAsync('index.html', generateMD(answers)))
  .then(() => console.log('Successfully wrote to index.html'))
  .catch((err) => console.error(err));

  // .then((response) => {
  //   console.log(response);
  //   response.confirm === response.password
  //     ? console.log('Success!')
  //     : console.log('You forgot your password already?!')

  // .then((data) => {
  //      const filename = `${data.projectname.toLowerCase().split(' ').join('')}.json`;
    
  //       fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
  //         err ? console.log(err) : console.log('Success!')
  //       );
  // }); 

//i think i need to write this inquire data to a file 
//https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback
//   fs.writeFile(filename, './utils/generateMarkdown'), (err) =>
//  err ? console.error(err) : console.log('Success!')
//  );

// .then((data) => {
// //     const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;

//     fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
//       err ? console.log(err) : console.log('Success!')
//     );
//   });