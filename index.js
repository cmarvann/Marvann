// const fs = require('fs');
const { writeFile, copyFile } = require('./utils/generate-site.js');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');
// const { writeFile, copyFile } = require('./utils/generate-site');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => confirmAbout
    }
  ]);
};

const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter a project GitHub link!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};


// // Function Call
// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     console.log(portfolioData);
//     const pageHTML = generatePage(portfolioData);

//     fs.writeFile('./dist/index.html', pageHTML, err => {
//       if (err) {
//       console.log(err);
//       return;
//     }
//       console.log('Page created! Check out index.html in this directory to see it!');

      

//     });
//   });


// Promises
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });





// const mockData = {
//     name: 'MarvanCovington',
//     github: 'Marvannhub',
//         confirmAbout: true,
//         about: 'I love coding ',
//         projects: [
//           {
//             name: 'Professional -Portfolio-Generator',
//             description: 'Portfolio-Generator',
//             languages: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'],
//             link: 'https://github.com/cmarvann/Marvann.git',
//             feature: true,
//             confirmAddProject: true
//           },
//           {
//             name: 'BootCamp-Code-Quizer',
//             description: 'Test-Knowledge',
//             languages: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap'],
//             link: 'https://github.com/cmarvann/BootCamp-Code-Quizer.git',
//             feature: true,
//             confirmAddProject: true
//           },
//           {
//             name: 'Run-Buddy',
//             description: 'Training-Site',
//             languages: ['HTML', 'CSS'],
//             link: 'https://github.com/cmarvann/Runn-Buddy.git',
//             feature: true,
//             confirmAddProject: true
//           },
//           {
//             name: 'Robot-Gladiators',
//             description: 'Game',
//             languages: ['Javascript'],
//             link: 'https://github.com/cmarvann/Robot-',
//             feature: true,
//             confirmAddProject: true
//           },
//           {
//             name: 'Taskmaster-Pro',
//             description: 'create-task',
//             languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//             link: 'https://github.com/cmarvann/taskmaster-pro.git',
//             feature: true,
//             confirmAddProject: true
//           },
//           {
//             name: 'Weather-App',
//             description: 'Five-Day-Weather-Forecast',
//             languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//             link: 'https://github.com/cmarvann/weather-dashboard.git',
//             feature: true,
//             confirmAddProject: true
//           },
//           {
//             name: 'Just-Tech-News',
//             description: 'Articles',
//             languages: ['Node'],
//             link: 'https://github.com/cmarvann/just-tech-news.git',
//             feature: false,
//             confirmAddProject: false
//           }
//         ]
       
//   }
//   const pageHTML = generatePage(mockData);