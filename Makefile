install:
	npm ci

make lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npx jest --coverage
