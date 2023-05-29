# blockchain-automation

Blockchain base automation project using: [Cypress](https://www.cypress.io/) - [JavaScript](https://developer.mozilla.org/en/JavaScript/) - [REMIX - Ethereum IDE](https://remix.ethereum.org/) to automate Solidity Smart Contracts.

___

<!--- Comment
* 1\. item 
    * 1.1\. item
    * 1.2\. item
* 2\. item 
-->

## [![](https://i.ibb.co/2kHmnLX/image.png)](#table-of-contents)Table of contents:
- [Getting started](#getting-started)
   - [1. Install Git locally](#1-install-git-locally)
   - [2. Install Node locally](#2-install-node-locally)
- [Configure this project](#configure-this-project)
- [Quick run](#quick-run)
- [Run tests in UI/GUI mode](#run-tests-in-uigui-mode)
- [Run tests in Headless mode](#run-tests-in-headless-mode-with-video-output-to-see-the-recording)
- [Different ways to use Cypress](#different-ways-to-use-cypress)
- [Miscellaneous](#miscellaneous)
- [Primary Authors](#primary-authors)
- [Other Contributors](#other-contributors)
- [MIT license](#mit-license)
- [Change Log](#change-log)

___

## [![](https://i.ibb.co/2kHmnLX/image.png)](#getting-started)Getting started:

<details>

<summary>

#### 1. Install Git locally
</summary>  

<br/>
You can follow one of these links:  
<br/>

|    Option           |              Link                                                |                          Command                      |
| ------------------- | ---------------------------------------------------------------- | ----------------------------------------------------- |
| ***Windows, Linux, Mac***| https://git-scm.com/book/en/v2/Getting-Started-Installing-Git|  _use the previous link depending on your OS_        |
| ***Homebrew***      | https://www.atlassian.com/git/tutorials/install-git         | `brew install git`                                         |

</details>  


<details>
<summary>

#### 2. Install Node locally</summary>  

<br/>
You can follow one of these links:  
<br/>

|    Option           |              Link                                                |                          Command                      |
| ------------------- | ---------------------------------------------------------------- | ----------------------------------------------------- |
| ***Windows, Linux, Mac***| https://nodejs.org/en/download/current                      |  _use the previous link depending on your OS_         |
| ***Homebrew***      | https://www.atlassian.com/git/tutorials/install-git              | `brew install node`                                   |

</details>  

___

## [![](https://i.ibb.co/2kHmnLX/image.png)](#configure-this-project)Configure this project:
Open your console/terminal and run this: 
```sh
cd </your/desired/project/path/>
```

```sh
git clone https://github.com/cvera08/blockchain-automation.git
```

<!--- 
<sub> *// HINT: you can copy all these commands with a single click on the copy icon that will be displayed when you mouse over the console/code sections* </sub>   
<img src="https://i.ibb.co/f8hX6sb/your-desired-path.png" alt="drawing" width="250"/>
<br/>
![alt text](https://i.ibb.co/4RwZnmZ/image.png)
--->

<img src="https://i.ibb.co/4RwZnmZ/image.png" alt="drawing" width="800"/>

```sh
cd blockchain-automation
npm i
```
___

## [![](https://i.ibb.co/2kHmnLX/image.png)](#quick-run)Quick run:
[Please follow to this section ▼](#run-tests-in-headless-mode-with-video-output-to-see-the-recording)
___

## [![](https://i.ibb.co/2kHmnLX/image.png)](#run-tests-in-uigui-mode)Run tests in UI/GUI mode:
By using your console/terminal, make sure you are in the right path and run this:
```sh
cd </your/desired/project/path>/blockchain-automation
npx cypress open
```
<sub> *// HINT: if the above command does not work for you, try this one instead:* 
>./node_modules/cypress/bin/cypress open --e2e </sub>   

<br/>

After this:
- You may select "E2E Testing" (if it is not displayed is fine),
- Choose a browser (it will grab your local browser installations, you can choose Electron or any of them),
- Click "Start E2E Testing in \<yourSelectedBrowser>".

Now you are able to run the test/s by clicking on any *.cy.js* file.  
After you clicked on your desired spec file Cypress will start automatically the execution and after a while you will see the output results.

<sub>
// Once you are done with the execution, you can type ctrl+c in your terminal or close the browser runner and cypress window.
</sub>

<br/>
<br/>

**Demo open/GUI mode:**  

![](https://user-images.githubusercontent.com/28716586/214140170-76e0a31d-5a4f-4b05-9d87-d02900d193ec.gif)

 
**Troubleshooting GUI mode:**  

_If you face some error you need to be sure you are in the base project folder (blockchain-automation) and run 'npm install' again (make sure not to have errors or fix them according to the printed help)_.
>npm install

If it still does not work, try restarting all the involved programs (like Cypress/VS Code/etc), even your computer if it is necessary and start over again.
___
## [![](https://i.ibb.co/2kHmnLX/image.png)](#run-tests-in-headless-mode-with-video-output-to-see-the-recording)Run tests in Headless mode (with video output to see the recording):
```sh
cd </your/project/path>/blockchain-automation
npx cypress run
```

<sub> *// HINT: if the above command does not work for you, try this one instead:* 
>./node_modules/cypress/bin/cypress run </sub>  

You will get something like this:  

![headless](https://user-images.githubusercontent.com/28716586/214966102-782521b2-f3cb-453e-8e00-ea5f76ea6c80.png)

___
## [![](https://i.ibb.co/2kHmnLX/image.png)](#different-ways-to-use-cypress)Different ways to use Cypress:
Make sure you already are located on your project path before trying to run one/many of the following commands.
```sh
cd </your/project/path>/blockchain-automation
```
<br/>

They are ALL going to pursue the same goal:
>./node_modules/.bin/cypress open

>$(npm bin)/cypress open

>npx cypress open

>yarn run cypress open

___


## [![](https://i.ibb.co/2kHmnLX/image.png)](#miscellaneous)Miscellaneous:


N/A.

___

## [![](https://i.ibb.co/2kHmnLX/image.png)](#primary-authors)Primary Authors:


* __[Carlos Vera](https://www.linkedin.com/in/carlos-vera-06a6b053)__

    [@cvera08](https://github.com/cvera08) is the current creator and maintainer of the code and has written much of the
    current code base, including complete refactors, bug fixing and general improvements to the existing code base.
    He started out by authoring many, if not all, of the available e2e automation test cases, has been assisting with maintenance and adding
    project documentation.

___

## [![](https://i.ibb.co/2kHmnLX/image.png)](#other-contributors)Other Contributors:


N/A.

___
## [![](https://i.ibb.co/2kHmnLX/image.png)](#mit-license)MIT license:

Copyright (c) 2023 Carlos Vera

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

___

## [![](https://i.ibb.co/2kHmnLX/image.png)](#change-log-)Change Log:

Stable Builds:

* Jan 21, 2023 -- v2.9.0
  * Deploy & Run Transactions Menu.
  * Delete First Contract.
  * Add New Smart Contract.
  * Create Hot Fudge Sauce Contract.
  * Compile Contract.
  * Deploy Contract.

* Jan 5, 2023 -- v2.0.0
  * Deploy & Run Transactions.

* Jan 3, 2023 -- v1.0.0
  * Initial Cypress Project.
