## CONFIG
export PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash -v

## VARIABLES

## COMMANDS
install:
	@yarn

cleanup:
	@rm -rf dist coverage _book flow-typed node_modules  *.log

build:
	@rm -rf dist
	@babel src -d dist --ignore '**/__tests__/*.js'

build-watch:
	@babel src -d dist --ignore '**/__tests__/*.js' --watch

flowtype:
	@flow check

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

book:
	@rm -rf _book
	@gitbook serve

commit:
	@commit

release:
	@semantic-release
