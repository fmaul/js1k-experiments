#!/bin/bash

uglifyjs index.js -c -m toplevel=true,eval=true > index.min.js
wc index.min.js
