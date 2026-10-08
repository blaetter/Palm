################################################################################
# Development tasks of the Palm theme.
#
# npm runs only in the containers of docker-compose.yml, Drush on the host
# (it needs PHP 8 in PATH). See `make help`.
################################################################################

COMPOSE	:= docker compose
DRUSH	:= ../../../../vendor/bin/drush --uri=https://web.blaetter

.PHONY: help
help:
	@echo "make install          install node modules from package-lock.json (container, without install scripts)"
	@echo "make storybook        start Storybook on http://localhost:6006 (container)"
	@echo "make stories          compile *.stories.twig to *.stories.json (Drush on the host)"
	@echo "make drupal-layer     rebuild css/drupal-layer.css (container)"
	@echo "make style-capture NAME=<name> [ROLE=<role>]   capture computed styles (container), ROLE as test user styletest"
	@echo "make style-compare A=<name> B=<name> [DETAILS=1] compare two captures (container)"
	@echo "make shell            shell in the node container, e.g. for npm install <package>"

# The node_modules volume is created owned by root, so hand it over first.
.PHONY: install
install:
	$(COMPOSE) run --rm --user root node chown node:node node_modules
	$(COMPOSE) run --rm node npm ci --ignore-scripts

.PHONY: storybook
storybook:
	$(COMPOSE) up storybook

.PHONY: stories
stories:
	cd ../../../.. && vendor/bin/drush --uri=https://web.blaetter storybook:generate-all-stories

.PHONY: drupal-layer
drupal-layer:
	$(COMPOSE) run --rm node npm run drupal-layer

# With ROLE, the pages are captured as the local test user "styletest" with
# that role (created or updated by Drush on the host); the container only gets
# a one-time login link. The capture stops with a message if the user or the
# link can not be created. Every capture starts with `drush cache:rebuild`, so
# no rendered markup or CSS is left over from earlier changes or roles. Carts and orders of the test user and the ones that
# the capture creates (cart, checkout) are removed before and afterwards, also
# when the capture fails.
STYLE_DIFF	:= $(CURDIR)/tests/style-diff
STYLE_MARKS	:= $(STYLE_DIFF)/snapshots/.marks.json

.PHONY: style-capture
style-capture:
	@test -n "$(NAME)" || (echo "NAME is missing, e.g. make style-capture NAME=before"; exit 1)
	@mkdir -p $(STYLE_DIFF)/snapshots
	@login=""; \
	if [ -n "$(ROLE)" ]; then \
		uid=$$($(DRUSH) php:script $(STYLE_DIFF)/drush/test-user.php -- $(ROLE)); \
		case "$$uid" in ''|*[!0-9]*) echo "Could not create the test user with role '$(ROLE)'."; exit 1;; esac; \
		login=$$($(DRUSH) user:login --no-browser --uid=$$uid | tail -n 1); \
		case "$$login" in http*) ;; *) echo "Could not create a login link for the test user ($$uid)."; exit 1;; esac; \
	fi; \
	$(DRUSH) cache:rebuild || exit 1; \
	$(DRUSH) php:script $(STYLE_DIFF)/drush/cleanup.php -- mark $(STYLE_MARKS) || exit 1; \
	$(COMPOSE) run --rm playwright npm run style-diff -- capture $(NAME) \
		$${login:+--login-url "$$login" --role-label "$(ROLE)"}; \
	status=$$?; \
	$(DRUSH) php:script $(STYLE_DIFF)/drush/cleanup.php -- clean $(STYLE_MARKS); \
	exit $$status

.PHONY: style-compare
style-compare:
	@test -n "$(A)" -a -n "$(B)" || (echo "A and B are missing, e.g. make style-compare A=before B=after"; exit 1)
	$(COMPOSE) run --rm node npm run style-diff -- compare $(A) $(B) $(if $(DETAILS),--details)

.PHONY: shell
shell:
	$(COMPOSE) run --rm node bash
