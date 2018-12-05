## CONFIG
export PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash

## VARIABLES

## COMMANDS
install:
	@yarn

cleanup:
	@rm -rf dist coverage _book flow-typed node_modules  *.log

build:
	@echo 'building…'
	@rm -rf dist
	@babel src -d dist --ignore '**/__tests__/*.js'

flowtype:
	@echo 'flowtype-check…'
	@flow check

lint:
	@echo 'linting…'
	@eslint_d src

lint-fix:
	@echo 'lint-fixing…'
	@eslint_d src --fix

test:
	@jest

test-watch:
	@jest --watch

test-coverage:
	@jest --coverage

book:
	@rm -rf _book
	@gitbook serve

commit:
	@commit

release:
	@semantic-release
