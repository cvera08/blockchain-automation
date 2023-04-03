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
- [MIT licence](#mit-licence)
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

 
