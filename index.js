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
      name: "license",
      type: 'rawlist',
      message: 'Please select an applicable license:',
      choices: [
        "MIT",
        "Apache License 2.0",
        "GNU GPLv3",
        "ISC License",
      ]
    },
  ]);

const generateMD = (answers) =>
  `# ${answers.projectname}       ![License Badge](https://img.shields.io/badge/license-${encodeURIComponent(answers.license)}-yellow)

### Usage Information

${answers.usage}

### Installation Instructions

${answers.installation}

### Contributors

${answers.contributors}



    `;

promptUser()
  .then((answers) => writeFileAsync(`./output/README.md`, generateMD(answers)))
  .then(() => console.log('Successfully wrote to README.md'))
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