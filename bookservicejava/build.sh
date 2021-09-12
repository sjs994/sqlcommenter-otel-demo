#! /bin/bash

script_name=$0
script_full_path=$(dirname "$0")
pushd ${script_full_path}

./gradlew build
docker build --build-arg JAR_FILE=build/libs/\*.jar -t bookservicejava .
popd