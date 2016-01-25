#Robut's Linux dot files
This is just a collection of my user specific configuration files (not system-wide settings).
I created this repository more for my own convenience than anything,
but I will try to provide limited support if you need it.
##Installation
- Clone the git repository into your home folder.
``` bash
cd ~
git clone https://github.com/therobut/dotfiles.git
```

- Edit the tools-\<distro\>.txt file that is relevant to you. This is a simple text file with a list of packages you want to be installed by the distro's package manager. Put each package on its own line. In the case of a package group, follow the group name by a blank line. "tools-arch.txt" has both the 'base-devel' and 'i3' package groups that exemplify this. Currently only Arch Linux's pacman is fully supported. Use the others at your own risk.

- Run the install script.
``` bash
cd ~/dotfiles
./install
```
This symlinks all the dotfiles (and folders) and runs "setup.sh." It's a simple script which attempts to install the tools listed in the relevent tools-\<distro\>.txt file.

###Compatibility for other Linux distributions
setup.sh tries to automatically detect which distribution you are running, and automatically
install the tools you specified by using the apropriate package manager. 
If setup.sh does not work with your distro, feel free
to fork the repo and send me a pull request with the updated code. If you would like ME to 
add support for your distro, help me out by sending me the following information.
* Command to install packages via your package manager (ex: sudo pacman -S zsh)
* Contents of '/etc/os-release'

If '/etc/os-release' does not exist, or is empty, then you might be out of luck. You can still mention to me
which distro you are on, and I will try to add it in my spare time. 

Please note that this script is not 
something I work on very often. Therefore if I have to do a lot of the research for a distro on my own, it may
be quite a while before compatibility is added, if ever. That said, I do enjoy testing new distros, so I will 
probably get around to it sooner or later.
