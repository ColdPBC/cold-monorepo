.PHONY: clean build start restart stop

INITIAL_PATH=$(PWD)
RED='\033[0;31m'
NC='\033[0m' # No Color
YELLOW='\033[33;5m'
GREEN='\033[0;32m'

# This single command does everything to get the environment up and running
# WILL DELETE ALL REPOS AND RECREATE THEM; DO NOT RUN UNLESS YOU HAVE NO CHANGES TO PUSH
initialize: build


# Builds Docker Containers
login:
	@echo ${YELLOW}Logging in...${NC} ;
	@echo ________________________________ ;
	@aws sso login;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

# Restarts API service in PROD
# /ecs/cold-api-fc-vvac0727TaskDefinition

#aws ecs update-service --force-new-deployment --service my-service --cluster cluster-name
deploy-api-preview:
	@echo ${YELLOW}Deploying API On Preview...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-vvac0727 --cluster cold-api-fc-vvac0727
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-api-staging:
	@echo ${YELLOW}Deploying API On Staging...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-me4y0q8d --cluster cold-api-fc-me4y0q8d
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-api-production:
	@echo ${YELLOW}Deploying API On Production...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-vvac0727 --cluster cold-api-fc-vvac0727
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

# OpenAI
deploy-openai-preview:
	@echo ${YELLOW}Deploying OpenAI On Preview...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-platform-openai-h29e0mtq --cluster cold-platform-openai-h29e0mtq
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-openai-staging:
	@echo ${YELLOW}Deploying OpenAI On Staging...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-platform-openai-w71x0as5 --cluster cold-platform-openai-w71x0as5
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-openai-production:
	@echo ${YELLOW}Deploying OpenAI On Production...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-platform-openai-bcx086w --cluster cold-platform-openai-bcx086w
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

# Bayou Energy
deploy-bayou-preview:
	@echo ${YELLOW}Deploying Bayou On Preview...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-vvac0727 --cluster cold-api-fc-vvac0727
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-bayou-staging:
	@echo ${YELLOW}Deploying Bayou On Staging...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-vvac0727 --cluster cold-api-fc-vvac0727
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-bayou-production:
	@echo ${YELLOW}Deploying Bayou On Production...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-vvac0727 --cluster cold-api-fc-vvac0727
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;


# Climatiq
deploy-climatiq-preview:
	@echo ${YELLOW}Deploying Climatiq On Preview...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-vvac0727 --cluster cold-api-fc-vvac0727
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-climatiq-staging:
	@echo ${YELLOW}Deploying Climatiq On Staging...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-vvac0727 --cluster cold-api-fc-vvac0727
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-climatiq-production:
	@echo ${YELLOW}Deploying Climatiq On Production...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-vvac0727 --cluster cold-api-fc-vvac0727
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;
