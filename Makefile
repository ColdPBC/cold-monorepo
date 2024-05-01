.PHONY: clean build start restart stop

INITIAL_PATH=$(PWD)
RED='\033[0;31m'
NC='\033[0m' # No Color
YELLOW='\033[33;5m'
GREEN='\033[0;32m'

DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=colddb
DB_HOST=localhost
DB_PORT=5432
OUTPUT_FILE=development_data.sql
# This single command does everything to get the environment up and running
# WILL DELETE ALL REPOS AND RECREATE THEM; DO NOT RUN UNLESS YOU HAVE NO CHANGES TO PUSH
initialize: build

backupDB:
	@echo ${YELLOW}Backing up DB...${NC} ;
	@echo ________________________________ ;
	@export PGPASSWORD=$(DB_PASSWORD) ;
	@pg_dump -h $(DB_HOST) -U $(DB_USER) -d $(DB_NAME) -f $(OUTPUT_FILE) --data-only -T _prisma_migrations -T category_definitions -T component_definitions -T emission_scopes -T news -T policy_definitions ;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

restoreDB:
	@echo ${YELLOW}Restoring DB...${NC} ;
	@echo ________________________________ ;
	@export PGPASSWORD=$(DB_PASSWORD) ;
	@psql -h $(DB_HOST) -U $(DB_USER) -d $(DB_NAME) -f $(OUTPUT_FILE) ;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

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

stop-api-preview:
	@echo ${YELLOW}Stopping API On Preview...${NC} ;
	@echo ________________________________ ;
	@for taskarn in $(aws ecs list-tasks --cluster cold-api-fc-vvac0727 --service cold-api-fc-vvac0727 --desired-status RUNNING --output text --query 'taskArns'); do aws ecs stop-task --cluster cold-api-fc-vvac0727 --task $taskarn; done;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-api-staging:
	@echo ${YELLOW}Deploying API On Staging...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-me4y0q8d --cluster cold-api-fc-me4y0q8d
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

stop-api-staging:
	@echo ${YELLOW}Stopping API On Staging...${NC} ;
	@echo ________________________________ ;
	@for taskarn in $(aws ecs list-tasks --cluster cold-api-fc-me4y0q8d --service cold-api-fc-me4y0q8d --desired-status RUNNING --output text --query 'taskArns'); do aws ecs stop-task --cluster cold-api-fc-me4y0q8d --task $taskarn; done;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-api-production:
	@echo ${YELLOW}Deploying API On Production...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-api-fc-vvac0727 --cluster cold-api-fc-vvac0727
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

# Stop API service in PROD
stop-api-production:
	@echo ${YELLOW}Stopping API On Preview...${NC} ;
	@echo ________________________________ ;
	@for taskarn in $(aws ecs list-tasks --cluster cold-api-fc-vvac0727 --service cold-api-fc-vvac0727 --desired-status RUNNING --output text --query 'taskArns'); do aws ecs stop-task --cluster cold-api-fc-vvac0727 --task $taskarn; done;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

# OpenAI
deploy-openai-preview:
	@echo ${YELLOW}Deploying OpenAI On Preview...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-platform-openai-h29e0mtq --cluster cold-platform-openai-h29e0mtq
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

stop-openai-preview:
	@echo ${YELLOW}Stopping OpenAI On Preview...${NC} ;
	@echo ________________________________ ;
	@for taskarn in $(aws ecs list-tasks --cluster cold-platform-openai-h29e0mtq --service cold-platform-openai-h29e0mtq --desired-status RUNNING --output text --query 'taskArns'); do aws ecs stop-task --cluster cold-platform-openai-h29e0mtq --task $taskarn; done;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-openai-staging:
	@echo ${YELLOW}Deploying OpenAI On Staging...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-platform-openai-w71x0as5 --cluster cold-platform-openai-w71x0as5
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

stop-openai-staging:
	@echo ${YELLOW}Stopping OpenAI On Staging...${NC} ;
	@echo ________________________________ ;
	@for taskarn in $(aws ecs list-tasks --cluster cold-platform-openai-w71x0as5 --service cold-platform-openai-w71x0as5 --desired-status RUNNING --output text --query 'taskArns'); do aws ecs stop-task --cluster cold-platform-openai-w71x0as5 --task $taskarn; done;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-openai-production:
	@echo ${YELLOW}Deploying OpenAI On Production...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-platform-openai-bcx086w --cluster cold-platform-openai-bcx086w
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

stop-openai-production:
	@echo ${YELLOW}Stopping OpenAI On Production...${NC} ;
	@echo ________________________________ ;
	@for taskarn in $(aws ecs list-tasks --cluster cold-platform-openai-bcx086w --service cold-platform-openai-bcx086w --desired-status RUNNING --output text --query 'taskArns'); do aws ecs stop-task --cluster cold-platform-openai-bcx086w --task $taskarn; done;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

# Bayou Energy
deploy-bayou-preview:
	@echo ${YELLOW}Deploying Bayou On Preview...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-platform-bayou-ty600xyq --cluster cold-platform-bayou-ty600xyq
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

stop-bayou-preview:
	@echo ${YELLOW}Stopping Bayou On Preview...${NC} ;
	@echo ________________________________ ;
	@for taskarn in $(aws ecs list-tasks --cluster cold-platform-bayou-ty600xyq --service cold-platform-bayou-ty600xyq --desired-status RUNNING --output text --query 'taskArns'); do aws ecs stop-task --cluster cold-platform-bayou-ty600xyq --task $taskarn; done;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-bayou-staging:
	@echo ${YELLOW}Deploying Bayou On Staging...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-platform-bayou-ty600xyq --cluster cold-platform-bayou-ty600xyq
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

stop-bayou-staging:
	@echo ${YELLOW}Stopping Bayou On Staging...${NC} ;
	@echo ________________________________ ;
	@for taskarn in $(aws ecs list-tasks --cluster cold-platform-bayou-ty600xyq  --service cold-platform-bayou-ty600xyq  --desired-status RUNNING --output text --query 'taskArns'); do aws ecs stop-task --cluster cold-platform-bayou-ty600xyq --task $taskarn; done;
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

deploy-bayou-production:
	@echo ${YELLOW}Deploying Bayou On Production...${NC} ;
	@echo ________________________________ ;
	@aws ecs update-service --force-new-deployment --service cold-platform-bayou-ex2b1zot --cluster cold-platform-bayou-ex2b1zot
	@echo ${GREEN} DONE! ${NC} ;
	@echo "" ;

stop-bayou-production:
	@echo ${YELLOW}Stopping Bayou On Production...${NC} ;
	@echo ________________________________ ;
	@for taskarn in $(aws ecs list-tasks --cluster cold-platform-bayou-ex2b1zot --service cold-platform-bayou-ex2b1zot --desired-status RUNNING --output text --query 'taskArns'); do aws ecs stop-task --cluster cold-platform-bayou-ex2b1zot --task $taskarn; done;
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
