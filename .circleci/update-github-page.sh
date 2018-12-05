#!/bin/sh

set -e

LAST_COMMIT=$(git rev-parse HEAD)
LAST_DOCS_RELATED_COMMIT=$(git log -1 --format=format:%H \
  --full-diff -- docs -- .bookignore -- book.json -- README.md -- SUMMARY.md)

if [ $LAST_COMMIT = $LAST_DOCS_RELATED_COMMIT ] ; then
  git config --global user.name 'CircleCI';
  git config --global user.email 'circleci@users.noreply.github.com';
  npx documentation build src/** -f md --markdown-toc false > API.md;
  npx gitbook build;
  npx gh-pages -d _book -m 'Automated Github Page Update [skip ci]';
else
  echo 'Nothing related to docs have been changed. Skip.'
fi;
