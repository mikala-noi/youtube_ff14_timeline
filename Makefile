DOCKER = docker run --rm -it -v .:/code -w /code -p 5173:5173 node:20
CURDIR := $(shell basename $(shell pwd))
.PHONY: dev
dev:
	$(DOCKER) npm run dev

.PHONY: sh
sh:
	$(DOCKER) bash

.PHONY: init
init:
	$(DOCKER) bash -c "npm create vite@latest && mv vite-project/.??* vite-project/* . && rm -r vite-project && npm i -D prettier"

.PHONY: fmt
fmt:
	$(DOCKER) npm run format