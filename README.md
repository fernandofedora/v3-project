
# V3Automation 🚀
 ---
This project was created with the objective of creating and implementing automated tests in javascript using the playwright framework, to facilitate the creation of functions and scripts for **ideal-sale-circular** functional tests. for the moment the project is built with a simple structure, so that the files are easy to identify.

The project is based on the "POM" (Page Object Model) design pattern to improve test maintenance and reduce code duplication. A page object is an object-oriented class that serves as an interface for a page of your AUT, this will help us to migrate the logic of the project without much difficulty.

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#install-visual-studio-code">Install-visual studio code</a></li>
    <li><a href="#rhel-fedora-and-centos-based-distributions">RHEL, Fedora, and CentOS based distributions</a></li>
    <li><a href="#install-node-js-on-windows">Install nodejs on windows</a></li>
    <li><a href="#install-homebrew">Install-homebrew</a></li>
    <li><a href="#install-node-js-on-mac">Install-node-js-on-mac</a></li>
     <li><a href="#project-installation">Project-installation</a></li>
     <li><a href="#install-Playwright">Install-Playwright</a></li>
     <li><a href="#running-the-tests-%EF%B8%8F">Running-the-tests-%EF%B8%8F</a></li>
  </ol>
</details>

## Prerequisites 📋
### Install Visual Studio Code
for the Windows operating systems version, there is an executable that you only have to download on the main page of Vs
```
https://code.visualstudio.com/
```
### To install it on mac there is also an executable version
```
https://code.visualstudio.com/docs/?dv=osx
```
#### RHEL, Fedora, and CentOS based distributions
We currently ship the stable 64-bit VS Code in a yum repository, the following script will install the key and repository:
```
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
```
```
sudo sh -c 'echo -e "[code] \ nname = Visual Studio Code \ nbaseurl = https: //packages.microsoft.com/yumrepos/vscode \ nenabled = 1 \ ngpgcheck = 1 \ ngpgkey = https: //packages.microsoft.com/keys/microsoft.asc "> /etc/yum.repos .d / vscode.repo '
```
Then update the package cache and install the package using dnf (Fedora 34 and above):
```
sudo dnf check-update
sudo dnf install code
```
Or on older versions using yum:
```
yum check-update
sudo yum install code
```
Due to the manual signing process and the system we use to publish, the yum repo may lag behind and not get the latest version of VS Code immediately.

#### Install node js on windows
for windows you just have to go to the page node js and click on the windows button to download the executable installer for your operating system
```
https://nodejs.org/es/download/
```
#### Install Homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
#### Install node js on Mac

We open our terminal and write:
```
brew install node
```
To ensure that have installed correctly we will write in the terminal:
```
node -v or npm -v
```
#### To install it in fedora 
```
sudo dnf install nodejs npm (I because I use fedora, you should look for the option for your operating system)
```
# Project installation 🔧
Download the project in a zip or you can is to clone it in the following way

HTTP 
```
[git@github.com:Fernoel/Test-idealSale-with-TestCafe.git](https://github.com/thedesignhouse/V3Automation.git)
```
SSH
```
git@github.com:thedesignhouse/V3Automation.git
```
CLI
```
gh repo clone thedesignhouse/V3Automation
```
# Install Playwright
```
npm init playwright@latest
```
# Running the tests ⚙️
Once the project is downloaded or cloned, you can open it with your favorite text editor , in this case we recommend that you use visual studio code.

Install the dependencies
```
npm install
```

Go into the root directory from your terminal and run the following code to run a test.

- Run Test
```
npx playwright test

```
Or
```
px playwright test tests/content.spec.ts --project=chromium --timeout=60000 --workers=2
```

Before run the tests we have to set the variable: testEnvironment
This variable is going to set the environment for the tests to run.
The environment values are: 

local ="https://admin.ideal.sale.local:4300/"
qa ="https://admin.qadigital-circular.com/"
automation ="https://admin.canary.sale"

For example if you want to run the test in the local environment

In Mac, Linux:
```
export testEnvironment=local or TEST_ENVIRONMENT=automation 
```
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/V3Automation.svg?style=for-the-badge
[contributors-url]: https://github.com/thedesignhouse/V3Automation/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/othneildrew/V3Automation.svg?style=for-the-badge
[issues-url]: https://github.com/thedesignhouse/V3Automation/issues
