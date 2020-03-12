#!/bin/sh

set -e

git config --global user.name 'CircleCI';
git config --global user.email 'circleci@users.noreply.github.com';
npx documentation build src/** -f html -o docs
npx gh-pages -d docs -m 'Automated Github Page Update [skip ci]';
