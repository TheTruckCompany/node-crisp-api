.PHONY: build
build:
	yarn build

.PHONY: publish
publish: build
	@NEXT_VERSION=`yarn info @bisondesk/crisp-api version | awk 'NR==2{print $$1}' | awk -F. -v OFS=. '{$$3++; print}'`; \
	echo "Next version: $$NEXT_VERSION"; \
	yarn publish --no-git-tag-version --new-version $$NEXT_VERSION
