#!/bin/sh

echo "\n\n\nRun migration:"
# yarn typeorm:run-migrations
yarn typeorm:run-migrations

echo "\n\n\nStart server:"
yarn start:prod
