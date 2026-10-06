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
	@echo "make style-capture NAME=<name> [ROLE=<role>]   capture computed styles (container)"
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

# With ROLE, Drush creates a one-time login link for the newest active user with
# that role on the host; the container only gets the link.
.PHONY: style-capture
style-capture:
	@test -n "$(NAME)" || (echo "NAME is missing, e.g. make style-capture NAME=before"; exit 1)
	$(COMPOSE) run --rm playwright npm run style-diff -- capture $(NAME) \
		$(if $(ROLE),--login-url "$$($(DRUSH) user:login --no-browser --uid=$$($(DRUSH) php:eval '$$ids = \Drupal::entityQuery("user")->accessCheck(FALSE)->condition("roles", "$(ROLE)")->condition("status", 1)->sort("uid", "DESC")->range(0, 1)->execute(); echo reset($$ids);'))" --role-label $(ROLE))

.PHONY: style-compare
style-compare:
	@test -n "$(A)" -a -n "$(B)" || (echo "A and B are missing, e.g. make style-compare A=before B=after"; exit 1)
	$(COMPOSE) run --rm node npm run style-diff -- compare $(A) $(B) $(if $(DETAILS),--details)

.PHONY: shell
shell:
	$(COMPOSE) run --rm node bash
