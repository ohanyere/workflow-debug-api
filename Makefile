SHELL := /usr/bin/env bash

.PHONY: install lint test build validate-k8s validate

install:
	npm ci

lint:
	npm run lint

test:
	npm test

build:
	npm run build

validate-k8s:
	@if command -v kubectl >/dev/null 2>&1; then \
		for target in k8s/base k8s/overlays/dev k8s/overlays/stage k8s/overlays/prod; do \
			echo "Validating $$target"; \
			kubectl kustomize "$$target" >/dev/null; \
		done; \
	elif command -v kustomize >/dev/null 2>&1; then \
		for target in k8s/base k8s/overlays/dev k8s/overlays/stage k8s/overlays/prod; do \
			echo "Validating $$target"; \
			kustomize build "$$target" >/dev/null; \
		done; \
	else \
		echo "Skipping Kubernetes render validation: install kubectl or kustomize."; \
	fi

validate: lint test build validate-k8s
