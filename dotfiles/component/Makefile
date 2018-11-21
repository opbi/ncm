## CONFIG
export PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash

## VARIABLES

## COMMANDS
install:
	@yarn

cleanup:
	@rm -rf dist coverage node_modules  *.log

build:
	@echo 'Building…'
	@rm -rf dist
	@babel src -d dist --ignore '**/__tests__/*.js'

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

commit:
	@commit

release:
	@semantic-release
