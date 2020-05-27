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

Starting the server seemed to kick of the generation of more files although this may have been a delayed impact of
WebPacker failing due to lack of installed `yarn` tool for node.

```
bin/rails server
```

This command starts the rails server on port 3000


### Adding the PWA app

Creating a new controller for the application

```
bin/rails generate controller pwa main login token
```


## Notes

### PWA

* [SSO OAuth2.0 login with full screen](https://medium.com/@jonnykalambay/progressive-web-apps-with-oauth-dont-repeat-my-mistake-16a4063ce113)
* [Is service worker ready https://pwabook.com/isswready](https://jakearchibald.github.io/isserviceworkerready/)

### Rails

* [Webpacker](https://github.com/rails/webpacker)
* Check the status of webpacker with this command

```
bin/rails webpacker:info
```

* Hit an issue with the following error being shown by this command

```
Ruby: ruby 2.7.0p0 (2019-12-25 revision 647ee6f091) [x86_64-linux-gnu]
Rails: 6.0.3.1
Webpacker: 4.2.2
Node: v10.19.0
Yarn: 1.22.4

npm ERR! missing: @rails/webpacker@4.2.2, required by rails_progressive_web_app@0.1.0
@rails/webpacker: 
rails_progressive_web_app@0.1.0 /home/fiona/wd/nps/playground/rails-progressive-web-app
└── UNMET DEPENDENCY @rails/webpacker@4.2.2 

Is bin/webpack present?: true
Is bin/webpack-dev-server present?: true
Is bin/yarn present?: true
```

* It seems that this is covered by this [bug](https://github.com/rails/webpacker/issues/1078)
* Also seems that `npm` shouldn't be used to handle dependencies


 
## References

### Rails

* [Asset pipeline](https://guides.rubyonrails.org/asset_pipeline.html)
* [Avoid CORS exceptions](https://die-antwort.eu/techblog/2018-08-avoid-invalid-cross-origin-request-with-catch-all-route/)
* [protect from forgery API](https://api.rubyonrails.org/classes/ActionController/RequestForgeryProtection/ClassMethods.html)


 


