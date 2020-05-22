## Overview 

Simple progressive web application using rails as the server and 
REST API.

Testing out authentication and such things

## Quickstart

### Check out the code

```
git clone https://github.com/fionahiklas/rails-progressive-web-app
cd rails-progressive-web-app
```

### Install Gems

Run the following

```
export USER_GEMS=`gem env | grep USER | sed -e 's/^.*\(\/home.*\)$/\1/'`
export PATH=$PATH:$USER_GEMS/bin

gem install bundler --user-install

bundle install --path vendor
```





## Rails Setup

### Prerequites 

You need to install the following packages with apt on Ubuntu
 
* build-essential
* ruby-dev
* zlib1g-dev
* libxml2-dev
* yarnpkg
 
__Note__: There is a package mapping from "yarn" to "cmdtest" on Ubuntu 20.04.  The package that gets installed is
a testing tool that appears to be for python.  The Ubuntu package installs yarn as `yarnpkg` fixed with this hack

```
ln -s /usr/bin/yarnpkg /usr/local/bin/yarn
```


### Creating project

```
bundle exec rails new .
```

This creates alot of files that need to be committed to git





 


