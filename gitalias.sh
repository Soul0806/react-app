#! /bin/zsh

if [ "$1" = "init" ]  
then 
    git config --global alias.br branch
    git config --global alias.co checkout
    git config --global alias.cm commit
    git config --global alias.st status
# else
    git config --global alias.log5 'log --oneline -5' 
    echo "git config alias init"
fi


# git config --global alias.lg 'log --oneline'

