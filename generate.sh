#!/bin/sh

# Auto generate OpenAPI Schema
cd front && npm install && npm run genschema
cd .. && cd back/models && go install && go generate
