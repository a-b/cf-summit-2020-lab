APP_NAME ?= cf-summit-2020-lab
DOMAIN   ?= $$(cf domains | grep "name\s\+availability\s\+internal\s\+protocols" -A1 | tail -1 | cut -d\  -f 1)

deploy:
	cf push $(APP_NAME)

open:
	@echo open http://$(APP_NAME).$(DOMAIN)
