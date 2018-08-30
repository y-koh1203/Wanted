DBNAME:=wanted
ENV:=development

run:
	go run server.go

deps:
	which dep || go get -u github.com/golang/dep/cmd/dep
	which sql-migrate || go get -u github.com/rubenv/sql-migrate/...
	dep ensure

migrate/init:
	mysql -u root -h localhost --protocol tcp -e "CREATE DATABASE \`$(DBNAME)\` DEFAULT CHARACTER SET utf8"

migrate/up:
	sql-migrate up -env=$(ENV)
