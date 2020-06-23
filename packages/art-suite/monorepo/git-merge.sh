#!/bin/bash
REPO_NAME=$1
SOURCE_REPO=~/dev/imikimi/npm/$REPO_NAME
TARGET_FOLDER=packages/$REPO_NAME

echo \# ================= EXCUTE THESE via COPY-PASTE ============
echo
echo \# --- COMMIT AND PUSH ALL CHANGES; START WITH CLEAN REPO!!!
git checkout master
git push
echo
echo \# --- WARNING - this overwrites the entire local copy of the repo!!!
git filter-repo --source $SOURCE_REPO --target . --tag-rename '':'$REPO_NAME-' --to-subdirectory-filter $TARGET_FOLDER --force
echo
echo \# --- BUT - this will pull back in all the original repo commits, all merged together
git pull origin master --allow-unrelated-histories
ls -la packages/