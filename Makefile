install:
	npm ci

publish:
	npm publish --dry-run

make lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npx jest --coverage
