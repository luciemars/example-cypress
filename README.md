# Description  
Example code of test automation with Cypress using http://todomvc-app-for-testing.surge.sh/ as test app.  
Tests are located in the folder ```cypress/integration``` and use the page object functions in ```page-objects/todo-page.js```. 

# How to run the tests  
[Install node](https://nodejs.org/en/) if necessary and use ```npm install``` to install all the dependencies.  
To run the tests with Cypress' user interface, use the command  
```npx cypress open```   

To run the test with the command line interface (in headless mode) use  
```npx cypress run``` or the shortcut ```npm test```

To run only the tests in a specific file, add the option ```--spec cypress/integration/file-name.spec.js```
