#!/bin/bash
cd ~/hinton-build
claude --permission-mode bypassPermissions --print "$(cat prompt.md)" 2>&1 | tee claude-output.log