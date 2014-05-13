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
Pretty self-explanatory. Just run setup.sh.
Example:
``` bash
cd ~/dotfiles
chmod +x setup.sh
./setup.sh
```

###Compatibility for other Linux distributions
setup.sh tries to automatically detect which distribution you are running, and automatically
install zsh by using the apropriate package manager. If setup.sh does not automatically install zsh, feel free
to fork the repo and send me a pull request with the updated code. If you would like ME to 
add support for your distro, help me out by sending me the following information.
* Command to install zsh via your package manager (ex: $sudo apt-get install zsh)
* Contents of '/etc/os-release'

If '/etc/os-release' does not exist, or is empty, then you might be out of luck. You can still mention to me
which distro you are on, and I will try to add it in my spare time. 

Please note that this script is not 
something I work on very often. Therefore if I have to do a lot of the research for a distro on my own, it may
be quite a while before compatibility is added, if ever. That said, I do enjoy testing new distros, so I will 
probably get around to it sooner or later.
