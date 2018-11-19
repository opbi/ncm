## CONFIG
export PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash

## VARIABLES
APP_NAME := $(shell cat package.json | jq '.name')
IMAGE_TAG ?= latest
IMAGE_NAME := $(GCR_REGISTRY)/$(APP_NAME):$(IMAGE_TAG)

## COMMANDS
install:
	@yarn

cleanup:
	@rm -rf node_modules coverage *.log .webpack .build

run:
	@rm -rf .build
	@webpack

run-prod:
	@rm -rf .build
	@webpack -p
	@node .build/index.js

lint:
	@echo 'linting…'
	@eslint_d src

lint-fix:
	@echo 'lint-fixing…'
	@eslint_d src --fix

test:
	@jest --runInBand

test-watch:
	@jest --watch --runInBand

test-coverage:
	@jest --coverage --runInBand

build:
	docker build . -t $(IMAGE_NAME)

push:
	docker push $(IMAGE_NAME)
