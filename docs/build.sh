#!/usr/bin/env bash
docker build -t appotek/treatments:docs .
docker push appotek/treatments:docs
