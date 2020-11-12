FROM golang:1.14

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

EXPOSE 3000

CMD ["team-spirit"]

############################
# STEP 1 build executable binary
############################
#FROM golang:1.13-buster AS builder

#RUN apk update && apk add --no-cache git

#WORKDIR /go/src/app
#ADD . /go/src/app

#RUN go get -d -v ./...

#RUN go build -o /go/bin/app

############################
# STEP 2 build a small image
############################
#FROM gcr.io/distroless/base-debian10

# Copy our static executable.
#COPY --from=builder /go/bin/app /

#EXPOSE 3000
# Run the binary.
#CMD ["/app"]
