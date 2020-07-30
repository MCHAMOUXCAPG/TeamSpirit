# TeamSpirit
The Team Knows Best: so what are they actually thinking?


# GORN team


- **[Go](#go)** backend 
    - [Build and run](#build-and-run-the-app)
- **[React][2]** frontend for responsive Webapp
   
- **[ReactNative][3]** application (only Android for now)

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
    

[2]:https://github.com/MCHAMOUXCAPG/TeamSpirit/blob/dev/client/React
[3]:https://github.com/MCHAMOUXCAPG/TeamSpirit/blob/dev/client/ReactNative
