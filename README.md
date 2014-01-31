#Robut's Linux dot files
This is just a collection of my user specific configuration files (not system-wide settings).
I created this repository more for my own convenience than anything,
but I will try to provide limited support if you need it.
##Installation
Just clone the git repository into your home folder.
``` bash
cd ~
git clone git://github.com/therobut/dotfiles.git
```
Pretty self-explanatory. Just run makesymlinks.sh.
Example:
``` bash
cd ~/dotfiles
chmod +x makesymlinks.sh
./makesymlinks.sh
```

makesymlinks.sh assumes you are on Arch Linux, and will
automatically try to install zsh if it is not already present.

To avoid errors, make sure zsh is already installed, if on a
distro other than Arch Linux.

Compatibility for more distros is coming soon.

###Optional: Installing oh-my-zsh
oh-my-zsh is already registered as a git submodule in my repository.
Installing it is simple. For example:
``` bash
cd ~/dotfiles
git submodule init
git submodule update
```

##Coming Soon
* Compatibility for more distros in makesymlinks.sh
