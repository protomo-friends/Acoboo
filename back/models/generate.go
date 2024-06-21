package models

//go:generate go run github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen -package models -generate models -o models.gen.go ../../openapi.yaml
//go:generate go run github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen -package models -generate echo-server -o api.gen.go ../../openapi.yaml
