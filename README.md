# TeamSpirit
The Team Knows Best: so what are they actually thinking?


# GORN team


- **[Go](#go)** backend 
    - [Build and run](#build-and-run-the-app)
- **[React](#react)** frontend for responsive Webapp
   
- **[ReactNative](#react-native)** application (only Android for now)
    - [Build and run](#build-and-run)

Both fronts share the same API


# GO

Backend of project is build with Golang, using SQLlite database. 
We base on [Echo](https://echo.labstack.com/) framework and [Gorn](https://gorm.io/) as ORM.


## Set-up / First steps

### **Discover Goloang**: 
You can follow the [official tour](https://tour.golang.org/) in order to have a base knowledge, it's all online.

### **Develop with Golang**: 

To have go working on your windows laptop:
Go to [Golang](https://golang.org/) page and install the package corresponding distribution.

Be sure go is in your path :

run ```go version``` to get something similar to:
```
go version go1.14.2 windows/amd64
```
If is not the case just add *GoInstalationFolder*/bin folder to your Path env. variable and retry on a new terminal.



### **Build and run** the app: 

How to build and run the app from code.

Prerequisite:  Golang must be installed and present in PATH

- clone or download code, navigate to project's root folder
- ```go build ``` to build exe file and execute it (p.ex.: ```.\packer.exe```)
- ```go run ``` to build and run the app directly


## DEV TIPS:
 
- VisualCodeStudio Plugin: **ms-vscode.go** (version 0.14.2)
    
- CompileDaemon    
    Install CompileDaemon : For Automatic build if some file has been changed
    ```
    go get github.com/githubnemo/CompileDaemon
    ```
    To compile and run the .exe file type this command : (Just for the first time, after the comamnd is automatically executed when some changes is saved)
    ````
    CompileDaemon -command="myapp_name.exe"`
    ````
    for more info about CompileDaemon : https://github.com/githubnemo/CompileDaemon

**[UP](#TeamSpirit)**


# React Native 



## Set-up / First steps

### **Discover ReactNative**: 

WIP

React Native Tutorial for Beginners - Crash Course 2020 (expo): https://www.youtube.com/watch?v=qSRrxpdMpVc

React Native Crash Course 2020 (react native cli) : https://www.youtube.com/watch?v=Hf4MJH0jDb4
 
Build a React Native App [2020] : https://www.youtube.com/watch?v=0-S5a0eXPoc&feature=youtu.be

### **Develop with ReactNative**: 

WIP

### **Build and run**: 

How to build and run the app from code.

Prerequisite:  
- **expo-cli** must be installed ```npm install expo-cli --global ```, don’t use VPN during this process. You will need an Android phone.
- Prepare your Android phone 
    - Download Expo in your device: https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www 

Follow: 
- clone or download code, navigate to project's root folder
- install modules with ```yarn install ``` p.ex., works also with npm
- Set your environnment for local BackEnd : 
    - Get your IPv4 Address with ```ipconfig``` p.ex.
    - Go to **src/services/environment/environment.tsx** and update the variable *IPv4_Address*
- Run the App with ```expo start```
- A browser window will be opened. 
- Open Expo in your phone. Scan the QR code in the browser window and wait until it’s loaded (first times it can take some minutes) 
- Enjoy your app

 
**[UP](#TeamSpirit)**

# React


### **Discover React**: 

WIP

### **Develop with React**: 

WIP

### **Build and run** the app: 

WIP

**[UP](#TeamSpirit)**
