#!/bin/bash

uglifyjs index.js -c -m toplevel=true,eval=true > index.min.js
wc index.min.js

#cat shim.1.html index.min.js shim.2.html > shim.html
