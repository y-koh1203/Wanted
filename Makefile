ENV	:=	development

run:
	go run server.go

dep:
	dep ensure

## Migrate db schema
migrate_up:
	sql-migrate up -env=$(ENV)
