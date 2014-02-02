#!/bin/bash
############################
# setup.sh
# This script creates symlinks from the home directory to any desired dotfiles in ~/dotfiles
# Assumes 'sudo' is installed
############################

###########################################################################
## Heavily modified from Michael Smalley's original.                     ##
## Original can be found at: https://github.com/michaeljsmalley/dotfiles ##
###########################################################################

########## Variables

dir=~/dotfiles                    # dotfiles directory
olddir=~/dotfiles_old             # old dotfiles backup directory
files="awesome vim vimrc Xdefaults xinitrc zshrc"    # list of files/folders to symlink in homedir

if [ -f /etc/os-release ]; then
    source /etc/os-release
fi

##########

# create dotfiles_old in homedir
echo -n "Creating $olddir for backup of any existing dotfiles in ~ ..."
mkdir -p $olddir
echo "done"

# change to the dotfiles directory
echo -n "Changing to the $dir directory ..."
cd $dir
echo "done"

# move any existing dotfiles in homedir to dotfiles_old directory, then create symlinks from the homedir to any files in the ~/dotfiles directory specified in $files
for file in $files; do
    if [ $file == 'awesome' ]; then
         if [[ -d ~/.config/awesome ]]; then
            mv ~/.config/awesome $olddir
         else
            if [[ ! -d ~/.config ]]; then 
                mkdir ~/.config
            fi
         ln -s $dir/awesome ~/.config/awesome
         fi
    else
        echo "Moving any existing dotfiles from ~ to $olddir"
        mv ~/.$file $olddir
        echo "Creating symlink to $file in home directory."
        ln -s $dir/$file ~/.$file
    fi
done

install_zsh () {
# Test to see if zshell is installed.  If it is:
if [ -f /bin/zsh -o -f /usr/bin/zsh ]; then
    # Clone official oh-my-zsh repository from GitHub only if it isn't already present
    if [[ ! -d $dir/oh-my-zsh/ ]]; then
        git submodule init
        git submodule update
    fi
    # Set the default shell to zsh if it isn't currently set to zsh
    if [[ ! $(echo $SHELL) == $(which zsh) ]]; then
        chsh -s $(which zsh)
    fi
else
    # If zsh isn't installed, get the platform of the current machine
    platform=$(uname);
    # If the platform is Linux, try an apt-get to install zsh and then recurse
    if [[ $platform == 'Linux' ]]; then
        case $NAME in
            'Arch Linux')
                sudo pacman -S zsh
                ;;
            'Ubuntu')
                sudo apt-get install zsh
                ;;
            'Debian')
                sudo apt-get install zsh
                ;;
            *)
                print 'zsh could not be installed. Please install zsh manually.'
                return
                ;;
        esac
        install_zsh
    fi
fi
}

install_zsh
