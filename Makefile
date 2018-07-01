run:
	go run server.go

dep:
	dep ensure -update

migrationUp:
	sql-migrate up

migrationDown:
	sql-migrate down

migrationStatus:
	sql-migrate status