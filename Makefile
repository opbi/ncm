## CONFIG
export PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash -v

## VARIABLES

## COMMANDS
install:
	@yarn

cleanup:
	@rm -rf node_modules coverage dist types docs  *.log

build:
	@rm -rf dist
	@babel src -d dist --ignore '**/__tests__/*.js'

build-watch:
	@babel src -d dist --ignore '**/__tests__/*.js' --watch

type-check:
	@tsc

lint:
	@eslint_d src

lint-fix:
	@eslint_d src --fix

lint-reset:
	@eslint_d restart

test:
	@jest

test-watch:
	@jest --watch --coverage

test-coverage:
	@jest --coverage

docs:
	@documentation build src/** -f html -o docs

docs-watch:
	@documentation serve --watch src/**

commit:
	@commit

release:
	@semantic-release
