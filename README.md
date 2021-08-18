![Quick-React](https://quick-react-tool.netlify.app/static/media/quick_react_v3_trans.3314ba4c.png)

# quick-react
*A node application to create React hook-based boilerplate files automatically from a simple outline description.*

___
![Quick-React](https://quick-react-tool.netlify.app/images/quick_react_project.png)
___

### Description
Quick-React is a Website and VS Code extension developed to make the development of hook-based React projects much faster by eliminating some of the manual setup work.  Although scripts such as **create-react-app**, initialize a great deal of the scaffolding for a typical SPA Website, project setup could benefit from additional configuration assistance, as long as the process is simple, intuitive, and fast

Quick-React addresses this need by utilizing a simple JSX-style markup format, in a simple to understand outline format, that is parsed into a component data-structure by the Quick-React Website or VS Code extension.  This data is then used to generate either a ZIP archive of the starting React directories and files, when the Quick-React Website is used, or is injected directly into your project via the VS Code extension when working locally.

### Documentation
Full documentation regarding the n-ary tree JavaScript library and Quick-React markup is available on the Quick-React Website:  
https://quick-react-tool.netlify.app/documentation/


**Link to GitHub Repository site Quick-React Back-end API:**  
https://github.com/chicago29094/quick-react

**Link to GitHub Repository site Quick-React Front-End:**  
https://github.com/chicago29094/quick-react-frontend

**Link to GitHub Repository site Quick-React VS Code Extension:**  
https://github.com/chicago29094/quick-react-code

**Link to Deployed public Website:**  
https://quick-react-tool.netlify.app/


### Technologies used:
- HTML5
- Custom designed n-ary tree JavaScript class library and Quick-React lexing, parsing, and component generation library.
- Custom designed VS Code Extension for in-editor Quick-React markup coding and React project creation 
- CSS: Flexbox, React-Bootstrap, Nested Display Components, Responsive Design
- JavaScript: loops, aync/await JSON data fetching through structured API calls, math methods/randomization, array methods, complex object data structures, arrow functions, n-ary trees, stacks, queues, and map data structures.
- Testing: Mocha framework and Chai assertion testing of Quick-React tree library functions 
- SPA Website Architecture, React, Bootstrap, React-Bootstrap, controlled Components and Controlled Forms/User Input, useState, useEffect, props, and React hooks
- Node.js, Express, Mongoose, and MongoDB object-oriented database architecture
___
## Installation Requirements
- No additional libraries or special add-ons needed beyond what is specified in the repository package.json file.
- The site has the following module dependencies: bootstrap, react-bootstrap, react, bcrypt, chai, core-js, cors, dotenv, express, mongoose, node-fetch, passport, and passport-jwt.
- If for some reason the installation of a component is required use npm install in the project's root directory to install all of the dependencies.
- Download the repo from https://github.com/chicago29094/quick-react
- You will need your own MongoDB database and database credentials to deploy this API yourself.
- To deploy locally on your own computer, utilize nodemon server.js to start the execution of the server API.

## Contribution Instructions
- Contributions, suggestions, feature requests, or bug reports can be e-mailed to quickreact@uswide.net.
- Input can also be provided by contacting the developer Harry Anastopoulos via the public GitHub repository for Quick-React or the Quick-React website.

## Lessons Learned/Ongoing Issues:
### Lessons Learned
- VS Code is wonderful to work with and provides a rich API for extension building.
- The n-ary tree library was fairly easy to build using new features in JavaScript E6+ despite the immutable nature of JavaScript strings.
- The nested nature of React's components and prop passing lends itself readily to an outline or wire-frame markup/description.
- JWT is flexible but additional security can be utilized for more critical projects.

### Ongoing Issues / Future Updates
- More test should be performed for more edge cases and more complex markup.
- A JSX aware editor on the frontend for Web-based project markup would be a welcome addition.
- The introduction of project categories or keywords would be helpful in managing projects.
- A system for handling a larger volume of projects should be incorporated so that the user isn't forced to delete older projects.
- In-editor syntax highlighting, checking, and assistance within VS Code would be helpful when coding Quick-React project markup.
- A template based approach to component generation would add flexibility for users instead of fixed boilerplate content.
- More flexibility can be developed for sequenced markup attributes.
- Direct injection of components into files such as index.js and App.js would be a powerful addition.
- Direct in-place replacement of some of the other create-react-app generic boilerplate would add flexibility to the Quick-React system.




