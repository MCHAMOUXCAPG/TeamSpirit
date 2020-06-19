# gorn-teamspirit
Gorn TeamSpirit backend project in Go [Golang](https://golang.org/)

# Dev requirement

- Download and install git ( if it's not installed in your machine )
- Download and install go ( https://golang.org/dl/ )
- Configure your go environment : PATH and GOPATH
  Add environment variable GOPATH=GO_PATH ( example on windows : C:\Users\USER\go ) if it doesn't exist
  Add bin directory to PATH environment variable ( example on windows : C:\Go\bin ) if not done yet
- Download and install tdm-gcc ( https://jmeubank.github.io/tdm-gcc/ ) ( Only for windows environment )
- Install CompileDaemon with $ go get github.com/githubnemo/CompileDaemon
- Download and install Visual studio code ( if it's not installed in your machine )
- Install go plugin in your Visual studio code
- Clone teamspirit project in your dev environment : $ git clone ....
- Compile the project :
  $ cd teamspirit_project
  $ CompileDaemon
- Run the project : $ packer.exe


## Build and Run

To simply run the app from code, start a cmd on this api folder and type:

```
 go build
```
to build the .exe from source

and run it with a double click or by cmd with
```
./packer.exe
```