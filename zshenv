export TERMINAL=termite
export VISUAL=vim
export EDITOR=vim
export PAGER=vimpager
export GOROOT=/usr/bin/go
export GOPATH=$HOME/code/go

typeset -U path
path=(~/bin $GOPATH/bin $path[@])
